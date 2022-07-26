import React from "react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { UnlockUser } from "../UnlockUser";
import { Endpoints } from "src/data/endpoints";

const consoleErrorReset = console.error;

beforeEach(() => {
	console.error = consoleErrorReset;
});

const server = setupServer(
  rest.patch(Endpoints.user("1"), (req, res, ctx) => {
	return res(ctx.json({}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should show unlock text when locked", () => {
	const userProps = {
		id: 1,
		isLocked: true,
		onToggleLock: jest.fn(),
		onError: jest.fn(),
	};
	render(<UnlockUser {...userProps} />);
	const lockToggleButton = screen.getByText("Unlock user");
	expect(lockToggleButton).toBeInTheDocument();
});

test("should show lock text when unlocked", () => {
	const userProps = {
		id: 1,
		isLocked: false,
		onToggleLock: jest.fn(),
		onError: jest.fn(),
	};
	render(<UnlockUser {...userProps} />);
	const lockToggleButton = screen.getByText("Lock user");
	expect(lockToggleButton).toBeInTheDocument();
});

test("should disable button when clicked", async () => {
	const userProps = {
		id: 1,
		isLocked: false,
		onToggleLock: jest.fn(),
		onError: jest.fn(),
	};
	render(<UnlockUser {...userProps} />);
	const user = userEvent.setup();
	await user.click(screen.getByText('Lock user'));
	expect(screen.getByText('Loading...')).toBeDisabled();
});

test("should trigger onToggleLock prop function with server data once fetch is successfully complete", async () => {
	const userProps = {
		id: 1,
		isLocked: true,
		onToggleLock: jest.fn(),
		onError: jest.fn(),
	};
	const responseData = { a: 1 };
	server.use(
		rest.patch(Endpoints.user("1"), (req, res, ctx) => {
			return res.once(ctx.json(responseData));
		})
	);
	const {rerender} = render(<UnlockUser {...userProps} />);
	fireEvent.click(screen.getByText('Unlock user'));
	userProps.isLocked = false;
	rerender(<UnlockUser {...userProps} />);
	await waitFor(() => screen.getByText('Lock user'));
	expect(userProps.onToggleLock).toHaveBeenCalledTimes(1);
	expect(userProps.onToggleLock).toHaveBeenCalledWith(responseData);
});

test("should show error message when fetch fails", async () => {
	console.error = jest.fn();	
	const userProps = {
		id: 1,
		isLocked: true,
		onToggleLock: jest.fn(),
		onError: jest.fn(),
	};
	server.use(
		rest.patch(Endpoints.user("1"), (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
	const {rerender} = render(<UnlockUser {...userProps} />);
	fireEvent.click(screen.getByText('Unlock user'));
	rerender(<UnlockUser {...userProps} />);
	await waitFor(() => screen.getByText('Unlock user'));
	expect(userProps.onError).toHaveBeenCalledTimes(1);
});

test("should show error message when fetch returns non-200 error", async () => {
	console.error = jest.fn();
	const userProps = {
		id: 1,
		isLocked: true,
		onToggleLock: jest.fn(),
		onError: jest.fn(),
	};
	const serverErrorMessage = "Not authorized";
	server.use(
		rest.patch(Endpoints.user("1"), (req, res, ctx) => {
			return res.once(
				ctx.status(401),
				ctx.json({ message: serverErrorMessage })
			);
		})
	);
	const {rerender} = render(<UnlockUser {...userProps} />);
	fireEvent.click(screen.getByText('Unlock user'));
	rerender(<UnlockUser {...userProps} />);
	await waitFor(() => screen.getByText('Unlock user'));
	expect(userProps.onError).toHaveBeenCalledTimes(1);
});