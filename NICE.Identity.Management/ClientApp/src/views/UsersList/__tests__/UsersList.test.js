import React from "react";
import { act } from "react-dom/test-utils";
import { render, waitFor, waitForElementToBeRemoved, fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router";
import { UsersList } from "../UsersList";
import { Endpoints } from "../../../data/endpoints";
import usersFour from "./usersFour.json";
import usersThirty from "./usersThirty.json";
import websites from "./websites.json";

const consoleErrorReset = console.error;

beforeEach(() => {
	console.error = consoleErrorReset;
});

const server = setupServer(
  rest.get(Endpoints.usersList, (req, res, ctx) => {
    return res(ctx.json(usersFour));
  }),
  rest.get(Endpoints.websitesList, (req, res, ctx) => {
    return res(ctx.json(websites));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should show loading message before data has been loaded", () => {
	const usersListProps = {
		location: {
			pathname: "/user",
			search: "?amount=all&page=1",
		},
		history: {
			push: jest.fn(),
		},
	};
	render(<UsersList {...usersListProps} />, {wrapper: MemoryRouter});
	const loadingMessage = screen.getByText("Loading...", { selector: "p" });
	expect(loadingMessage).toBeInTheDocument();
});

test("should match the snapshot after data has been loaded", async () => {
	const usersListProps = {
		location: {
			pathname: "/user",
			search: "?amount=all",
		},
		history: {
			push: jest.fn(),
		},
	};
	const {container} = render(<UsersList {...usersListProps} />, {wrapper: MemoryRouter});	
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	expect(container).toMatchSnapshot();
});

test("should show error message when fetch returns 401 error", async () => {
	console.error = jest.fn();	
	const usersListProps = {
		location: {
			pathname: "/user",
			search: "",
		},
		history: {
			push: jest.fn(),
		},
	};
	server.use(
		rest.get(Endpoints.usersList, (req, res, ctx) => {
		return res.once(
				ctx.status(401),
				ctx.json({})
			);
		})
	);
	const {container} = render(<UsersList {...usersListProps} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});

test("should show error message when fetch returns 500 error", async () => {
	console.error = jest.fn();	
	const usersListProps = {
		location: {
			pathname: "/user",
			search: "",
		},
		history: {
			push: jest.fn(),
		},
	};
	server.use(
		rest.get(Endpoints.usersList, (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
	const {container} = render(<UsersList {...usersListProps} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});

test("should show error message when fetch websites returns 401 error", async () => {
	console.error = jest.fn();	
	const usersListProps = {
		location: {
			pathname: "/user",
			search: "",
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
	const {container} = render(<UsersList {...usersListProps} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});

test("should show error message when fetch websites returns 500 error", async () => {
	console.error = jest.fn();	
	const usersListProps = {
		location: {
			pathname: "/user",
			search: "",
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
	const {container} = render(<UsersList {...usersListProps} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});

test("should show no results message when fetch returns an empty array", async () => {
	const usersListProps = {
		location: {
			pathname: "/user",
			search: "",
		},
		history: {
			push: jest.fn(),
		},
	};
	server.use(
		rest.get(Endpoints.usersList, (req, res, ctx) => {
			return res.once(
				ctx.json([])
			);
		})
	);
	render(<UsersList {...usersListProps} />, {wrapper: MemoryRouter});
	const noResultsMessage = await screen.findByText("No results found", { selector: "p" });
	expect(noResultsMessage).toBeInTheDocument();
});


test("should show no results found message after search returns empty array", async () => {
	jest.useFakeTimers();
	const usersListProps = {
		location: {
			pathname: "/user",
			search: "",
		},
		history: {
			push: jest.fn(),
		},
	};
	const dummyText = "SomeText";
	server.use(
		rest.get(Endpoints.usersList, (req, res, ctx) => {
			const search = req.url.searchParams.get('q');
			
			if (search === dummyText) {
				return res.once(
					ctx.json([])
				);
			} else {
				return res(ctx.json(usersFour));				
			}
		})
	);
	render(<UsersList {...usersListProps} />, {wrapper: MemoryRouter});
	const searchInput = screen.getByLabelText("Filter by name or email address");
	searchInput.focus();
	await act(async () => {
		fireEvent.change(searchInput, {target: {value: dummyText}});
		jest.advanceTimersByTime(1000);
	});
	const noResultsFoundMessage = await screen.findByText(`No results found for "${dummyText}"`);
	expect(noResultsFoundMessage).toBeInTheDocument();
	jest.useRealTimers();
});

test("should filter users to all active when radio button is clicked", async () => {
	const usersListProps = {
		location: {
			pathname: "/user",
			search: "",
		},
		history: {
			push: jest.fn(),
		},
	};
	render(<UsersList {...usersListProps} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const activeCheckbox = screen.getByLabelText("Active");
	const tagsBeforeFilter = screen.queryAllByText(/^(Active|Pending|Locked)/i, { selector: "span.tag"});
	expect(tagsBeforeFilter.length).toEqual(4);
	userEvent.click(activeCheckbox);
	await waitForElementToBeRemoved(() => screen.getAllByText("Locked", { selector: "span.tag" }));
	const tagsAfterFilter = screen.queryAllByText(/^(Active|Pending|Locked)/i, { selector: "span.tag"});
	const tagsAfterFilterCount = tagsAfterFilter.length;
	expect(tagsAfterFilterCount).toBeLessThan(4);
	tagsAfterFilter.forEach((tag) => {
		const {getByText} = within(tag);
		expect(getByText("Active", { selector: "span.tag"})).toBeInTheDocument();
	});
});

test("should filter users to those who have access to a specific website when radio button is clicked", async () => {
	const usersListProps = {
		location: {
			pathname: "/user",
			search: "",
		},
		history: {
			push: jest.fn(),
		},
	};
	render(<UsersList {...usersListProps} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const eppiDevCheckbox = screen.getByTitle("Dev - EPPI Reviewer");
	const tagsBeforeFilterCount = screen.queryAllByText(/^(Active|Pending|Locked)/i, { selector: "span.tag"}).length;
	expect(tagsBeforeFilterCount).toEqual(4);
	userEvent.click(eppiDevCheckbox);
	await waitFor(() => screen.getByRole("heading", { name: "Showing 2 users" }));
	const tagsAfterFilterCount = screen.queryAllByText(/^(Active|Pending|Locked)/i, { selector: "span.tag"}).length;	
	expect(tagsAfterFilterCount).toBeLessThan(4);
});

test("should show 25 (default page amount) or less results by default when paginated", async () => {
	const usersListProps = {
		location: {
			pathname: "/user",
			search: "",
		},
		history: {
			push: jest.fn(),
		},
	};
	server.use(
		rest.get(Endpoints.usersList, (req, res, ctx) => {
			return res.once(
				ctx.json(usersThirty)
			);
		})
	);
	render(<UsersList {...usersListProps} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const usersList = screen.getByRole("list", { name: "users"});
	const { getAllByRole } = within(usersList);
	const usersListItems = getAllByRole("listitem");
	expect(usersListItems.length).toEqual(25);
});

test("should go to page 2 when next button is clicked", async () => {
	const usersListProps = {
		location: {
			pathname: "/user",
			search: "",
		},
		history: {
			push: jest.fn(),
		},
	};
	server.use(
		rest.get(Endpoints.usersList, (req, res, ctx) => {
			return res.once(
				ctx.json(usersThirty)
			);
		})
	);
	render(<UsersList {...usersListProps} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const nextPageButton = screen.getByRole("link", { name: "Go to next page"});
	userEvent.click(nextPageButton);
	const usersListSummary = await screen.findByText("Showing 26 to 30 of 30 users", { selector: "h2" });
	const paginationCounter = screen.getByText("Page 2 of 2");
	const usersList = screen.getByRole("list", { name: "users"});
	const { getAllByRole } = within(usersList);
	const usersListItems = getAllByRole("listitem");
	expect(usersListSummary).toBeInTheDocument();
	expect(paginationCounter).toBeInTheDocument();
	expect(usersListItems.length).toEqual(5);
});

test("should go to first page when page 1 button is clicked", async () => {
	const usersListProps = {
		location: {
			pathname: "/user",
			search: "?page=2",
		},
		history: {
			push: jest.fn(),
		},
	};
	server.use(
		rest.get(Endpoints.usersList, (req, res, ctx) => {
			return res.once(
				ctx.json(usersThirty)
			);
		})
	);
	render(<UsersList {...usersListProps} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const previousPageButton = screen.getByRole("link", { name: "Go to page 1"});
	userEvent.click(previousPageButton);
	const usersListSummary = await screen.findByText("Showing 1 to 25 of 30 users", { selector: "h2" });
	const paginationCounter = screen.getByText("Page 1 of 2");
	const usersList = screen.getByRole("list", { name: "users"});
	const { getAllByRole } = within(usersList);
	const usersListItems = getAllByRole("listitem");
	expect(usersListSummary).toBeInTheDocument();
	expect(paginationCounter).toBeInTheDocument();
	expect(usersListItems.length).toEqual(25);
});