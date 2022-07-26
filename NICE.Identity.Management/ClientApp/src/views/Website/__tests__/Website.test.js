import React from "react";
import { render, waitFor, waitForElementToBeRemoved, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router";
import { Website } from "../Website";
import { Endpoints } from "src/data/endpoints";
import usersAndRoles from "./UsersAndRoles.json";

const consoleErrorReset = console.error;

beforeEach(() => {
	console.error = consoleErrorReset;
});

const server = setupServer(
  rest.get(Endpoints.usersAndRolesByWebsite("1"), (req, res, ctx) => {
    return res(ctx.json(usersAndRoles));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should show loading message before data has been loaded", () => {
	const websiteProps = {
		match: {
			params: { id: 1 },
		},
		location: {
			state: {}
		}
	};
	render(<Website  {...websiteProps} />, {wrapper: MemoryRouter});
	const loadingMessage = screen.getByText("Loading...", { selector: "p" });
	expect(loadingMessage).toBeInTheDocument();
});

test("should match the snapshot after data has been loaded", async () => {
	const websiteProps = {
		match: {
			params: { id: 1 },
		},
		location: {
			state: {}
		}
	};
	const {container} = render(<Website {...websiteProps} />, {wrapper: MemoryRouter});	
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	expect(container).toMatchSnapshot();
});

test("should show error message when fetch returns 401 error", async () => {
	console.error = jest.fn();	
	const websiteProps = {
		match: {
			params: { id: 1 },
		},
		location: {
			state: {}
		}
	};
	server.use(
		rest.get(Endpoints.usersAndRolesByWebsite("1"), (req, res, ctx) => {
		return res.once(
				ctx.status(401),
				ctx.json({})
			);
		})
	);
	const {container} = render(<Website {...websiteProps} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});

test("should show error message when fetch returns 500 error", async () => {
	console.error = jest.fn();	
	const websiteProps = {
		match: {
			params: { id: 1 },
		},
		location: {
			state: {}
		}
	};
	server.use(
		rest.get(Endpoints.usersAndRolesByWebsite("1"), (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
	const {container} = render(<Website {...websiteProps} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});

test("should show no results message when filter returns 0 results", async () => {
	const websiteProps = {
		match: {
			params: { id: 1 },
		},
		location: {
			state: {}
		}
	};
	render(<Website {...websiteProps} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const ownerRoleCheckbox = screen.getByLabelText("Owner");
	userEvent.click(ownerRoleCheckbox);
	const noResultsFoundMessage = await screen.findByText("0 results found", { selector: "td"});
	expect(noResultsFoundMessage).toBeInTheDocument();
});

test("should filter users to all in admins when checkbox is clicked", async () => {
	const websiteProps = {
		match: {
			params: { id: 1 },
		},
		location: {
			state: {}
		}
	};
	render(<Website {...websiteProps} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Showing 4 users" }));
	let userRoles = screen.queryAllByText(/^(Creator|Editor|Owner|ReadOnly)/i, { selector: "div"});
	expect(userRoles.length).toEqual(6);
	const ownerRoleCheckbox = screen.getByLabelText("Administrator");
	userEvent.click(ownerRoleCheckbox);
	await waitFor(() => screen.getByRole("heading", { name: "Showing 2 users"}));
	userRoles = screen.queryAllByText(/^(Creator|Editor|Owner|ReadOnly)/i, { selector: "div"});
	const adminRoleTableCells = await screen.findAllByText("Administrator", { selector: "div"});
	expect(userRoles.length).toEqual(0);
	expect(adminRoleTableCells.length).toEqual(2);
});

test("should show 25 (default page amount) or less results by default when paginated", async () => {
	const websiteProps = {
		match: {
			params: { id: 1 },
		},
		location: {
			state: {}
		}
	};
	render(<Website {...websiteProps} />, {wrapper: MemoryRouter});	
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	expect(screen.getAllByRole("row").length).toBeLessThanOrEqual(26);
});

test("should go to page 2 when next button is clicked", async () => {
	const websiteProps = {
		match: {
			params: { id: 1 },
		},
		location: {
			state: {},
			search: "?amount=3&page=1"
		},
		history: {
			push: jest.fn(),
		}
	};
	render(<Website {...websiteProps} />, {wrapper: MemoryRouter});	
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const nextPageButton = screen.getByRole("link", { name: "Go to next page"});
	userEvent.click(nextPageButton);
	const usersListSummary = await screen.findByText("Showing 4 to 4 of 4 users", { selector: "h2" });
	const paginationCounter = screen.getByText("Page 2 of 2");
	expect(usersListSummary).toBeInTheDocument();
	expect(paginationCounter).toBeInTheDocument();	

});

test("should go to first page when page 1 button is clicked", async () => {
	const websiteProps = {
		match: {
			params: { id: 1 },
		},
		location: {
			state: {},
			search: "?amount=1&page=4"
		},
		history: {
			push: jest.fn(),
		}
	};
	render(<Website {...websiteProps} />, {wrapper: MemoryRouter});	
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	let usersListSummary = screen.getByText("Showing 4 to 4 of 4 users", { selector: "h2" });
	let paginationCounter = screen.getByText("Page 4 of 4");
	expect(usersListSummary).toBeInTheDocument();
	expect(paginationCounter).toBeInTheDocument();
	const firstPageButton = screen.getByRole("link", { name: "Go to page 1"});
	userEvent.click(firstPageButton);
	usersListSummary = await screen.findByText("Showing 1 to 1 of 4 users", { selector: "h2" });
	paginationCounter = screen.getByText("Page 1 of 4");
	expect(usersListSummary).toBeInTheDocument();
	expect(paginationCounter).toBeInTheDocument();	
});