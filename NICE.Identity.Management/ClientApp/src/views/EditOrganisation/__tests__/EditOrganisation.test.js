import React from "react";
import { act } from "react-dom/test-utils";
import { render, waitForElementToBeRemoved, fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { EditOrganisation } from "../EditOrganisation";
import { Endpoints } from "../../../data/endpoints";
import singleOrganisation from "./singleOrganisation.json";
import organisations from "./organisations.json";

const consoleErrorReset = console.error;

beforeEach(() => {
	console.error = consoleErrorReset;
});

const server = setupServer(
  rest.get(Endpoints.organisation("1"), (req, res, ctx) => {
    return res(ctx.json(singleOrganisation));
  }),
  rest.get(Endpoints.organisationsList, (req, res, ctx) => {
	//const search = req.url.searchParams.get('q');

	return res(ctx.json(organisations));
  }),
  rest.patch(Endpoints.organisation("1"), (req, res, ctx) => {
    return res(ctx.json({}));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should match the snapshot on load", async () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	const {container} = render(<EditOrganisation match={match} />, {wrapper: MemoryRouter});	
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	expect(container).toMatchSnapshot();
});

test("should disable form submit button when clicked", async () => {
	jest.useFakeTimers();
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	const dummyText = "SomeText";
	render(<EditOrganisation match={match} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const orgNameInput = screen.getByLabelText("Organisation name");
	orgNameInput.focus();
	await act(async () => {
		fireEvent.change(orgNameInput, {target: {value: dummyText}});
		jest.advanceTimersByTime(1000);
	});
	let saveButton = await screen.findByText("Save changes", { selector: "button" });
	userEvent.click(saveButton);
	saveButton = await screen.findByRole("button", { name: "Loading..." });
	expect(saveButton).toHaveAttribute("disabled");
	expect(saveButton).toBeInTheDocument();
	jest.useRealTimers();
});

test("should show error message when duplicate name fetchData get fails", async () => {
	jest.useFakeTimers();
	console.error = jest.fn();	
	server.use(
		rest.get(Endpoints.organisationsList, (req, res, ctx) => {
		return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	const dummyText = "Org Ninety Nine";
	render(<EditOrganisation match={match} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const orgNameInput = screen.getByLabelText("Organisation name");
	orgNameInput.focus();
	await act(async () => {
		fireEvent.change(orgNameInput, {target: {value: dummyText}});
		jest.advanceTimersByTime(1000);
	});
	const saveButton = await screen.findByText("Save changes", { selector: "button" });
	userEvent.click(saveButton);
	const errorMessage = await screen.findByRole("heading", { name: "Error"});
	expect(errorMessage).toBeInTheDocument();
	jest.useRealTimers();
});

test("should show validation error when name is invalid format", async () => {
	jest.useFakeTimers();
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	render(<MemoryRouter><EditOrganisation match={match} /></MemoryRouter>);
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	const orgNameInput = screen.getByLabelText("Organisation name");
	orgNameInput.focus();
	await act(async () => {
		fireEvent.change(orgNameInput, {target: {value: ""}});
		jest.advanceTimersByTime(1000);
	});
	userEvent.tab();
	const orgNotFoundMessage = await screen.findByText("Organisation name should be alphanumeric and be between 2-100 characters");
	expect(screen.getByText("Save changes")).toHaveFocus();
	expect(orgNotFoundMessage).toBeInTheDocument();
	expect(orgNameInput).toBeInvalid();
	jest.useRealTimers();
});