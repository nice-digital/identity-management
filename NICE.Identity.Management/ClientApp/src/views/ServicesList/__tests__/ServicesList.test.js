import React from "react";
import { act } from "react-dom/test-utils";
import { render, waitFor, waitForElementToBeRemoved, fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router";
import { ServicesList } from "../ServicesList";
import { Endpoints } from "src/data/endpoints";
import websitesFive from "./websitesFive.json";
import websitesThirty from "./websitesThirty.json";

const consoleErrorReset = console.error;

beforeEach(() => {
	console.error = consoleErrorReset;
});

const server = setupServer(
  rest.get(Endpoints.websitesList, (req, res, ctx) => {
    return res(ctx.json(websitesFive));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should show loading message before data has been loaded", () => {
	const servicesListProps = {
		location: {
			pathname: "/services",
			search: "?amount=all&page=1",
		},
		history: {
			push: jest.fn(),
		},
	};
	render(<ServicesList {...servicesListProps} />, {wrapper: MemoryRouter});
	const loadingMessage = screen.getByText("Loading...", { selector: "p" });
	expect(loadingMessage).toBeInTheDocument();
});

test("should match the snapshot after data has been loaded", async () => {
	const servicesListProps = {
		location: {
			pathname: "/services",
			search: "?amount=all&page=1",
		},
		history: {
			push: jest.fn(),
		},
	};
	const {container} = render(<ServicesList {...servicesListProps} />, {wrapper: MemoryRouter});	
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	expect(container).toMatchSnapshot();
});

test("should show error message when fetch returns 401 error", async () => {
	console.error = jest.fn();	
	const servicesListProps = {
		location: {
			pathname: "/services",
			search: "?amount=all&page=1",
		},
		history: {
			push: jest.fn(),
		},
	};
	server.use(
		rest.get(Endpoints.websitesList, (req, res, ctx) => {
		return res.once(
				ctx.status(401),
				ctx.json({})
			);
		})
	);
	const {container} = render(<ServicesList {...servicesListProps} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});

test("should show error message when fetch returns 500 error", async () => {
	console.error = jest.fn();	
	const servicesListProps = {
		location: {
			pathname: "/services",
			search: "?amount=all&page=1",
		},
		history: {
			push: jest.fn(),
		},
	};
	server.use(
		rest.get(Endpoints.websitesList, (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
	const {container} = render(<ServicesList {...servicesListProps} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});

test("should show no results message when fetch returns an empty array", async () => {
	const servicesListProps = {
		location: {
			pathname: "/services",
			search: "?amount=all&page=1",
		},
		history: {
			push: jest.fn(),
		},
	};
	server.use(
		rest.get(Endpoints.websitesList, (req, res, ctx) => {
			return res.once(
				ctx.json([])
			);
		})
	);
	render(<ServicesList {...servicesListProps} />, {wrapper: MemoryRouter});
	const noResultsMessage = await screen.findByText("No results found", { selector: "p" });
	expect(noResultsMessage).toBeInTheDocument();
});

test("should show no results found message after search returns empty array", async () => {
	jest.useFakeTimers();
	const servicesListProps = {
		location: {
			pathname: "/services",
			search: "?amount=all&page=1",
		},
		history: {
			push: jest.fn(),
		},
	};
	const dummyText = "SomeText";
	server.use(
		rest.get(Endpoints.websitesList, (req, res, ctx) => {
			const search = req.url.searchParams.get('q')
			
			if (search === dummyText) {
				return res.once(
					ctx.json([])
				);
			} else {
				return res(ctx.json(websitesFive));				
			}
		})
	);
	render(<ServicesList {...servicesListProps} />, {wrapper: MemoryRouter});
	const searchInput = screen.getByLabelText("Filter by service name or URL");
	searchInput.focus();
	await act(async () => {
		fireEvent.change(searchInput, {target: {value: dummyText}});
		jest.advanceTimersByTime(1000);
	});
	const noResultsFoundMessage = await screen.findByText(`No results found for "${dummyText}"`);
	expect(noResultsFoundMessage).toBeInTheDocument();
	jest.useRealTimers();
});

test("should filter websites to all in dev environment when checkbox is clicked", async () => {
	const servicesListProps = {
		location: {
			pathname: "/services",
			search: "?amount=all&page=1",
		},
		history: {
			push: jest.fn(),
		},
	};
	render(<ServicesList {...servicesListProps} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const activeCheckbox = screen.getByLabelText("Dev");
	const tagsBeforeFilter = screen.queryAllByText(/^(Alpha|Beta|Test|Dev|Local)/i, { selector: "span.tag"});
	expect(tagsBeforeFilter.length).toEqual(5);
	userEvent.click(activeCheckbox);
	await waitForElementToBeRemoved(() => screen.getAllByText("Alpha", { selector: "span.tag" }));
	const tagsAfterFilter = screen.queryAllByText(/^(Alpha|Beta|Test|Dev|Local)/i, { selector: "span.tag"});
	const tagsAfterFilterCount = tagsAfterFilter.length;
	expect(tagsAfterFilterCount).toBeLessThan(5);
	tagsAfterFilter.forEach((tag) => {
		const {getByText} = within(tag);
		expect(getByText("Dev", { selector: "span.tag"})).toBeInTheDocument();
	});
});

test("should show 25 (default page amount) or less results by default when paginated", async () => {
	const servicesListProps = {
		location: {
			pathname: "/services",
			search: "",
		},
		history: {
			push: jest.fn(),
		},
	};
	server.use(
		rest.get(Endpoints.websitesList, (req, res, ctx) => {
			return res.once(
				ctx.json(websitesThirty)
			);
		})
	);
	render(<ServicesList {...servicesListProps} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const websitesList = screen.getByRole("list", { name: "websites"});
	const { getAllByRole } = within(websitesList);
	const websitesListItems = getAllByRole("listitem");
	expect(websitesListItems.length).toEqual(25);
});

test("should go to page 2 when next button is clicked", async () => {
	const servicesListProps = {
		location: {
			pathname: "/services",
			search: "",
		},
		history: {
			push: jest.fn(),
		},
	};
	server.use(
		rest.get(Endpoints.websitesList, (req, res, ctx) => {
			return res.once(
				ctx.json(websitesThirty)
			);
		})
	);
	render(<ServicesList {...servicesListProps} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const nextPageButton = screen.getByRole("link", { name: "Go to next page"});
	userEvent.click(nextPageButton);
	const websitesListSummary = await screen.findByText("Showing 26 to 30 of 30 services", { selector: "h2" });
	const paginationCounter = screen.getByText("Page 2 of 2");
	const websitesList = screen.getByRole("list", { name: "websites"});
	const { getAllByRole } = within(websitesList);
	const websitesListItems = getAllByRole("listitem");
	expect(websitesListSummary).toBeInTheDocument();
	expect(paginationCounter).toBeInTheDocument();
	expect(websitesListItems.length).toEqual(5);
});

test("should go to first page when page 1 button is clicked", async () => {
	const servicesListProps = {
		location: {
			pathname: "/services",
			search: "?page=2",
		},
		history: {
			push: jest.fn(),
		},
	};
	server.use(
		rest.get(Endpoints.websitesList, (req, res, ctx) => {
			return res.once(
				ctx.json(websitesThirty)
			);
		})
	);
	render(<ServicesList {...servicesListProps} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const previousPageButton = screen.getByRole("link", { name: "Go to page 1"});
	userEvent.click(previousPageButton);
	const websitesListSummary = await screen.findByText("Showing 1 to 25 of 30 services", { selector: "h2" });
	const paginationCounter = screen.getByText("Page 1 of 2");
	const websitesList = screen.getByRole("list", { name: "websites"});
	const { getAllByRole } = within(websitesList);
	const websitesListItems = getAllByRole("listitem");
	expect(websitesListSummary).toBeInTheDocument();
	expect(paginationCounter).toBeInTheDocument();
	expect(websitesListItems.length).toEqual(25);
});