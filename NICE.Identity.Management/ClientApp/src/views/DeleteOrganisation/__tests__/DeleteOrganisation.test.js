import React from "react";
import { render, waitForElementToBeRemoved, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router";
import { DeleteOrganisation } from "../DeleteOrganisation";
import { Endpoints } from "src/data/endpoints";
import singleOrganisation from "./singleOrganisation.json";

const consoleErrorReset = console.error;

beforeEach(() => {
	console.error = consoleErrorReset;
});

const server = setupServer(
  rest.get(Endpoints.organisation("1"), (req, res, ctx) => {
    return res(ctx.json(singleOrganisation));
  }),
  rest.delete(Endpoints.organisation("1"), (req, res, ctx) => {
    return res(ctx.json({}));
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
  render(<DeleteOrganisation match={match} />, {wrapper: MemoryRouter});
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("should match the snapshot after data has been loaded", async () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	const {container} = render(<DeleteOrganisation match={match} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	expect(container).toMatchSnapshot();
});

test("should show error message when fetchData function returns 401 error", async () => {
	console.error = jest.fn();
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	server.use(
		rest.get(Endpoints.organisation(match.params.id), (req, res, ctx) => {
			return res.once(
				ctx.status(401),
				ctx.json({})
			);
		})
	);
	const {container} = render(<DeleteOrganisation match={match} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	expect(container).toMatchSnapshot();
});

test("should show error message when fetchData function returns 500 error", async () => {
	console.error = jest.fn();
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	server.use(
		rest.get(Endpoints.organisation(match.params.id), (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
	const {container} = render(<DeleteOrganisation match={match} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	expect(container).toMatchSnapshot();
});

test("should show error message when fetchData delete fails", async () => {
	console.error = jest.fn();
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	server.use(
		rest.get(Endpoints.organisation(match.params.id), (req, res, ctx) => {
			return res.once(
				ctx.json({})
			);
		}),
		rest.delete(Endpoints.organisation(match.params.id), (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
	render(<DeleteOrganisation match={match} />, {wrapper: MemoryRouter});
	const confirmButton = await screen.findByText("Confirm", { selector: "button" });
	userEvent.click(confirmButton);
	const errorMessage = await screen.findByRole("heading", { name: "Error" });
	expect(errorMessage).toBeInTheDocument();
});

test("should show error message when fetchData delete returns non-200 error", async () => {
	console.error = jest.fn();
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	server.use(
		rest.get(Endpoints.organisation(match.params.id), (req, res, ctx) => {
			return res.once(
				ctx.json({})
			);
		}),
		rest.delete(Endpoints.organisation(match.params.id), (req, res, ctx) => {
			return res.once(
				ctx.status(401),
				ctx.json({})
			);
		})
	);
	render(<DeleteOrganisation match={match} />, {wrapper: MemoryRouter});
	const confirmButton = await screen.findByText("Confirm", { selector: "button" });
	userEvent.click(confirmButton);
	const errorMessage = await screen.findByRole("heading", { name: "Error" });
	expect(errorMessage).toBeInTheDocument();
});

test("should disable delete button when clicked", async () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	render(<DeleteOrganisation match={match} />, {wrapper: MemoryRouter});
	let confirmButton = await screen.findByText("Confirm", { selector: "button" });
	userEvent.click(confirmButton);
	confirmButton = await screen.findByRole("button", { name: "Loading..." });
	expect(confirmButton).toHaveAttribute("disabled");
	expect(confirmButton).toBeInTheDocument();
});

test("should display confirmation message once fetchData delete is successfully complete", async () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	render(<DeleteOrganisation match={match} />, {wrapper: MemoryRouter});
	const confirmButton = await screen.findByText("Confirm", { selector: "button" });
	userEvent.click(confirmButton);
	const successMessage = await screen.findByRole("heading", { name: "Organisation deleted" });
	expect(successMessage).toBeInTheDocument();
});