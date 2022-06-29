import React from "react";
import { act } from "react-dom/test-utils";
import { render, waitForElementToBeRemoved, fireEvent, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { EditUser } from "../EditUser";
import { Endpoints } from "../../../data/endpoints";
import singleUser from "./singleUser.json";
import singleUserWithEPPIEmail from "./singleUserWithEPPIEmail.json";

const consoleErrorReset = console.error;

beforeEach(() => {
	console.error = consoleErrorReset;
});

const server = setupServer(
  rest.get(Endpoints.user("1"), (req, res, ctx) => {
    return res(ctx.json(singleUser));
  }),
  rest.patch(Endpoints.user("1"), (req, res, ctx) => {
    return res(ctx.json({}));
  }),
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
	render(<MemoryRouter initialEntries={["/users/1/edit"]}><EditUser match={match} /></MemoryRouter>);
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
	const {container} = render(<MemoryRouter><EditUser match={match} /></MemoryRouter>);
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	expect(container).toMatchSnapshot();
});

test("should disable form submit button when clicked", async () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	render(<MemoryRouter><EditUser match={match} /></MemoryRouter>);
	let saveProfileButton = await screen.findByText("Save profile", { selector: "button" });
	fireEvent.click(saveProfileButton);
	saveProfileButton = await screen.findByText("Loading...", { selector: "button" });
	expect(saveProfileButton).toBeInTheDocument();
	expect(saveProfileButton).toBeDisabled();
});

test("should show error message when useFetch get call returns 401 error", async () => {
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
	const {container} = render(<MemoryRouter><EditUser match={match} /></MemoryRouter>);
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();
});

test("should show error message when useFetch get call returns 500 error", async () => {
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
	const {container} = render(<MemoryRouter><EditUser match={match} /></MemoryRouter>);
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});


test("should show error message when useFetch patch fails", async () => {
	console.error = jest.fn();	
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	server.use(
		rest.patch(Endpoints.user("1"), (req, res, ctx) => {
			return res.once(
				ctx.status(422),
				ctx.json({})
			);
		})
	);
	const {container} = render(<MemoryRouter><EditUser match={match} /></MemoryRouter>);
	const emailAddressInput = await screen.findByLabelText("Email address");
	const saveProfileButton = screen.getByText("Save profile", { selector: "button" });
	fireEvent.change(emailAddressInput, {target: {value: "john.holland@nice.org.uk"}});
	fireEvent.click(saveProfileButton);
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();
});

test("should show validation error when email is invalid format", async () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	render(<MemoryRouter><EditUser match={match} /></MemoryRouter>);
	const emailAddressInput = await screen.findByLabelText("Email address");
	const user = userEvent.setup();
	emailAddressInput.focus();
	user.paste("john.holland@");
	user.tab();
	const emailInvalidMessage = await screen.findByText("Email address is in an invalid format", { selector: "p" });
	expect(emailInvalidMessage).toBeInTheDocument();
	expect(emailAddressInput).toBeInvalid();
});

test("should show validation error when email is in use already", async () => {
	console.error = jest.fn();	
	jest.useFakeTimers();
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	server.use(
		rest.patch(Endpoints.user("1"), (req, res, ctx) => {
			return res.once(
				ctx.status(422),
				ctx.json({ title: "Email address is already in use", status: 422 })
			);
		})
	);
	render(<MemoryRouter><EditUser match={match} /></MemoryRouter>);
	const emailAddressInput = await screen.findByLabelText("Email address");
	const user = userEvent.setup();
	emailAddressInput.focus();
	await act(async () => {
		user.clear(emailAddressInput);
		user.paste("john.holland@hotmail.com");
		jest.advanceTimersByTime(1000);
	});  
	const saveProfileButton = screen.getByText("Save profile", { selector: "button" });
	user.click(saveProfileButton);
	const orgInUseMessage = await screen.findByText("Email address is already in use");
	expect(orgInUseMessage).toBeInTheDocument();
	jest.useRealTimers();
});

test("should display alert message if editing an EPPI user", async () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	server.use(
		rest.get(Endpoints.user("1"), (req, res, ctx) => {
			return res.once(ctx.json(singleUserWithEPPIEmail));
		})
	);
	render(<MemoryRouter><EditUser match={match} /></MemoryRouter>);
	const eppiUserAlertMessage = await screen.findByText("This user may have access to EPPI R5 - only a professional email address can be associated to this profile. Please verify via the EPPI user admin page before changing the email address.", { selector: "p" });
	expect(eppiUserAlertMessage).toMatchSnapshot();
});
