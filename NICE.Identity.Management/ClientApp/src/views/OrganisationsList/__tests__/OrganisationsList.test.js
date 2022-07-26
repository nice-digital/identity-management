import React from "react";
import { act } from "react-dom/test-utils";
import { render, waitFor, waitForElementToBeRemoved, fireEvent, screen, within } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router";
import { OrganisationsList } from "../OrganisationsList";
import { Endpoints } from "src/data/endpoints";
import organisations from "./organisations.json";
import organisations2 from "./organisations2.json";

const consoleErrorReset = console.error;

beforeEach(() => {
	console.error = consoleErrorReset;
});

const server = setupServer(
  rest.get(Endpoints.organisationsList, (req, res, ctx) => {
    return res(ctx.json(organisations));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should show loading message before data has been loaded", () => {
	render(<OrganisationsList />, {wrapper: MemoryRouter});
	const loadingMessage = screen.getByText("Loading...", { selector: "p" });
	expect(loadingMessage).toBeInTheDocument();
});

test("should match the snapshot after data has been loaded", async () => {
	const {container} = render(<OrganisationsList />, {wrapper: MemoryRouter});	
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	expect(container).toMatchSnapshot();
});

test("should show error message when fetch organisations returns 401 error", async () => {
	console.error = jest.fn();	
	server.use(
		rest.get(Endpoints.organisationsList, (req, res, ctx) => {
		return res.once(
				ctx.status(401),
				ctx.json({})
			);
		})
	);
	const {container} = render(<OrganisationsList />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});

test("should show error message when fetch organisations returns 500 error", async () => {
	console.error = jest.fn();	
	server.use(
		rest.get(Endpoints.organisationsList, (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
	const {container} = render(<OrganisationsList />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});

test("should show no results message when initial fetch returns an empty array", async () => {
	server.use(
		rest.get(Endpoints.organisationsList, (req, res, ctx) => {
			return res.once(
				ctx.json([])
			);
		})
	);
	render(<OrganisationsList />, {wrapper: MemoryRouter});
	const noResultsMessage = await screen.findByText("No results found", { selector: "p" });
	expect(noResultsMessage).toBeInTheDocument();
});

test("should show no results message when search fetch returns an empty array", async () => {
	jest.useFakeTimers();
	const dummyText = "SomeText";
	server.use(
		rest.get(Endpoints.organisationsList, (req, res, ctx) => {
			const search = req.url.searchParams.get('q')
			
			if (search === dummyText) {
				return res.once(
					ctx.json([])
				);
			} else {
				return res(ctx.json(organisations));				
			}
		})
	);
	render(<OrganisationsList />, {wrapper: MemoryRouter});
	const searchInput = screen.getByLabelText("Filter by organisation name");
	searchInput.focus();
	await act(async () => {
		fireEvent.change(searchInput, {target: {value: dummyText}});
		jest.advanceTimersByTime(1000);
	});
	const noResultsFoundMessage = await screen.findByText(`No results found for "${dummyText}"`);
	expect(noResultsFoundMessage).toBeInTheDocument();
	jest.useRealTimers();
});

test("should show 25 (default page amount) or less results by default when paginated", async () => {
	server.use(
		rest.get(Endpoints.organisationsList, (req, res, ctx) => {
			return res.once(
				ctx.json(organisations2)
			);
		})
	);
	render(<OrganisationsList />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const organisationsList = screen.getByRole("list", { name: "organisations"});
	const { getAllByRole } = within(organisationsList);
	const organisationsListItems = getAllByRole("listitem");
	expect(organisationsListItems.length).toEqual(25);
});

test("should show all results when querystring amount is set as 'all'", async () => {
	server.use(
		rest.get(Endpoints.organisationsList, (req, res, ctx) => {
			return res.once(
				ctx.json(organisations2)
			);
		})
	);
	render(<MemoryRouter initialEntries={['/organisations?amount=all']}><OrganisationsList /></MemoryRouter>);
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const organisationsList = screen.getByRole("list", { name: "organisations"});
	const { getAllByRole } = within(organisationsList);
	const organisationsListItems = getAllByRole("listitem");
	expect(organisationsListItems.length).toEqual(organisations2.length);
});

test("should show page 2 when querystring page is set to 2", async () => {
	server.use(
		rest.get(Endpoints.organisationsList, (req, res, ctx) => {
			return res.once(
				ctx.json(organisations2)
			);
		})
	);
	render(<MemoryRouter initialEntries={['/organisations?page=2']}><OrganisationsList /></MemoryRouter>);
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const organisationsListSummary = await screen.findByText("Showing 26 to 32 of 32 organisations", { selector: "h2" });
	const organisationsList = screen.getByRole("list", { name: "organisations"});
	const { getAllByRole } = within(organisationsList);
	const organisationsListItems = getAllByRole("listitem");
	expect(organisationsListSummary).toBeInTheDocument();
	expect(organisationsListItems.length).toEqual(7);
});

test("should sort results by alphabetical descending when querystring sort is set to alpha-desc", async () => {
	server.use(
		rest.get(Endpoints.organisationsList, (req, res, ctx) => {
			return res.once(
				ctx.json(organisations2)
			);
		})
	);
	render(<MemoryRouter initialEntries={['/organisations?sort=alpha-desc']}><OrganisationsList /></MemoryRouter>);
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const organisationsList = screen.getByRole("list", { name: "organisations"});
	const { getAllByRole } = within(organisationsList);
	const organisationsListItems = getAllByRole("listitem");
	const { getByText } = within(organisationsListItems[0]);
	const firstOrgListItem = getByText("Zulu", { selector: "a" });
	expect(firstOrgListItem).toBeInTheDocument();
});