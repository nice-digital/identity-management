import React from "react";
import { render, waitFor, waitForElementToBeRemoved, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router";
import { SelectRoles } from "../SelectRoles";
import { Endpoints } from "src/data/endpoints";
import singleUser from "./singleUser.json";
import singleUserRoles from "./singleUserRoles.json";

const consoleErrorReset = console.error;

beforeEach(() => {
	console.error = consoleErrorReset;
});

const server = setupServer(
  rest.get(Endpoints.user("1"), (req, res, ctx) => {
    return res(ctx.json(singleUser));
  }),
  rest.get(Endpoints.userRolesByWebsite("1", "1"), (req, res, ctx) => {
    return res(ctx.json(singleUserRoles));
  }),
  rest.patch(Endpoints.userRolesByWebsite("1", "1"), (req, res, ctx) => {
	return res(ctx.json({}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should show loading message before data has been loaded", () => {
	const match = {
		params: { id: 1, serviceId: 1, websiteId: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	render(<SelectRoles match={match} />, {wrapper: MemoryRouter});
	const loadingMessage = screen.getByText("Loading...", { selector: "p" });
	expect(loadingMessage).toBeInTheDocument();
});

test("should match the snapshot after data has been loaded", async () => {
	const match = {
		params: { id: 1, serviceId: 1, websiteId: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	const {container} = render(<SelectRoles match={match} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	expect(container).toMatchSnapshot();
});

test("should show error message when user fetchData function returns 500 error", async () => {
	console.error = jest.fn();
	const match = {
		params: { id: 1, serviceId: 1, websiteId: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	server.use(
		rest.get(Endpoints.user("1"), (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
	const {container} = render(<SelectRoles match={match} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();
});

test("should show error message when user fetchData function returns 401 error", async () => {
	console.error = jest.fn();	
	const match = {
		params: { id: 1, serviceId: 1, websiteId: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	server.use(
		rest.get(Endpoints.user("1"), (req, res, ctx) => {
			return res.once(
				ctx.status(401),
				ctx.json({})
			);
		})
	);
	const {container} = render(<SelectRoles match={match} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});

test("should show error message when user roles fetchData function returns 500 error", async () => {
	console.error = jest.fn();
	const match = {
		params: { id: 1, serviceId: 1, websiteId: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	server.use(
		rest.get(Endpoints.userRolesByWebsite("1", "1"), (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
	const {container} = render(<SelectRoles match={match} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();
});

test("should show error message when user roles fetchData function returns 401 error", async () => {
	console.error = jest.fn();	
	const match = {
		params: { id: 1, serviceId: 1, websiteId: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	server.use(
		rest.get(Endpoints.userRolesByWebsite("1", "1"), (req, res, ctx) => {
			return res.once(
				ctx.status(401),
				ctx.json({})
			);
		})
	);
	const {container} = render(<SelectRoles match={match} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();
});

test("should display confirmation message once fetchData patch is successfully complete", async () => {
	console.error = jest.fn();	
	const match = {
		params: { id: 1, serviceId: 1, websiteId: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	render(<SelectRoles match={match} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const saveButton = screen.getByText("Save", { selector: "button" });
	userEvent.click(saveButton);
	const successMessage = await screen.findByText("Your changes have been saved.", { selector: "p"});
	expect(successMessage).toBeInTheDocument();
});

test("should disable button when form submitted", async () => {
	const match = {
		params: { id: 1, serviceId: 1, websiteId: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	render(<SelectRoles match={match} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	let saveButton = screen.getByText("Save", { selector: "button" });
	userEvent.click(saveButton);
	saveButton = await screen.findByText("Loading...", { selector: "button" });
	expect(saveButton).toBeInTheDocument();
	expect(saveButton).toHaveAttribute("disabled");
});

test("should disable all checkboxes when form submitted", async () => {
	const match = {
		params: { id: 1, serviceId: 1, websiteId: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	render(<SelectRoles match={match} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	let saveButton = screen.getByText("Save", { selector: "button" });
	userEvent.click(saveButton);
	saveButton = await screen.findByText("Loading...", { selector: "button" });
	const roleCheckboxes = screen.getAllByRole("checkbox");
	roleCheckboxes.forEach(role => {
		expect(role).toHaveAttribute("disabled");
	});
});