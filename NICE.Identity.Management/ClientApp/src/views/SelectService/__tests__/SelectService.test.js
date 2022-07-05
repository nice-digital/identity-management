import React from "react";
import { render, waitFor, waitForElementToBeRemoved, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router";
import { SelectService } from "../SelectService";
import { Endpoints } from "src/data/endpoints";
import singleUser from "./singleUser.json";
import services from "./services.json";

const consoleErrorReset = console.error;

beforeEach(() => {
	console.error = consoleErrorReset;
});

const server = setupServer(
  rest.get(Endpoints.user("1"), (req, res, ctx) => {
    return res(ctx.json(singleUser));
  }),
  rest.get(Endpoints.servicesList, (req, res, ctx) => {
    return res(ctx.json(services));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should show loading message before data has been loaded", () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	render(<SelectService match={match} />, {wrapper: MemoryRouter});
	const loadingMessage = screen.getByText("Loading...", { selector: "p" });
	expect(loadingMessage).toBeInTheDocument();
});

test("should match the snapshot after data has been loaded", async () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	const {container} = render(<SelectService match={match} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	expect(container).toMatchSnapshot();
});

test("should show error message when user fetchData function returns 500 error", async () => {
	console.error = jest.fn();
	const match = {
		params: { id: 1 },
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
	const {container} = render(<SelectService match={match} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();
});

test("should show error message when user fetchData function returns 401 error", async () => {
	console.error = jest.fn();	
	const match = {
		params: { id: 1 },
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
	const {container} = render(<SelectService match={match} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});

test("should show error message when services fetchData function returns 500 error", async () => {
	console.error = jest.fn();
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	server.use(
		rest.get(Endpoints.servicesList, (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
	const {container} = render(<SelectService match={match} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();
});

test("should show error message when services fetchData function returns 401 error", async () => {
	console.error = jest.fn();	
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	server.use(
		rest.get(Endpoints.servicesList, (req, res, ctx) => {
			return res.once(
				ctx.status(401),
				ctx.json({})
			);
		})
	);
	const {container} = render(<SelectService match={match} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();
});