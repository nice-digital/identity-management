import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router";
import { Organisation } from "../Organisation";
import { Endpoints } from "../../../data/endpoints";
import singleOrganisation from "./singleOrganisation.json";
import singleUser from "./singleUser.json";

const consoleErrorReset = console.error;

beforeEach(() => {
	console.error = consoleErrorReset;
});

const server = setupServer(
  rest.get(Endpoints.organisation("1"), (req, res, ctx) => {
    return res(ctx.json(singleOrganisation));
  }),
  rest.get(Endpoints.usersByOrganisation("1"), (req, res, ctx) => {
    return res(ctx.json(singleUser));
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
	const location = {
		state: {}
	};	
	render(<Organisation match={match} location={location} />, {wrapper: MemoryRouter});
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
	const location = {
		state: {}
	};	
	const {container} = render(<Organisation match={match} location={location} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "TEST"}));
	expect(container).toMatchSnapshot();
});

test("should show error message when fetch returns 401 error", async () => {
	console.error = jest.fn();	
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	const location = {
		state: {}
	};
	server.use(
		rest.get(Endpoints.organisation("1"), (req, res, ctx) => {
		return res.once(
				ctx.status(401),
				ctx.json({})
			);
		})
	);
	const {container} = render(<Organisation match={match} location={location} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});

test("should show error message when fetch returns 500 error", async () => {
	console.error = jest.fn();	
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	const location = {
		state: {}
	};
	server.use(
		rest.get(Endpoints.organisation("1"), (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
	const {container} = render(<Organisation match={match} location={location} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});