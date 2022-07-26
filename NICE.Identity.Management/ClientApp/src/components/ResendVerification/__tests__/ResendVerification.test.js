import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { ResendVerification } from "../ResendVerification";
import { Endpoints } from "src/data/endpoints";

const consoleErrorReset = console.error;

beforeEach(() => {
	console.error = consoleErrorReset;
});

const server = setupServer(
  rest.post(Endpoints.verificationEmail, (req, res, ctx) => {
    return res(ctx.json({}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should show correct text on load", () => {
	const userProps = {
		nameIdentifier: "some_id",
		onClick: jest.fn(),
		onError: jest.fn(),
	};
	render(<ResendVerification {...userProps} />);
	expect(screen.getByText("Resend verification email", { selector: "button" })).toBeInTheDocument();
});

test("should disable button when clicked", async () => {
	const userProps = {
		nameIdentifier: "some_id",
		onClick: jest.fn(),
		onError: jest.fn(),
	};
	render(<ResendVerification {...userProps} />);
	let resendVerificationButton = screen.getByRole("button", { name: "Resend verification email"});
	userEvent.click(resendVerificationButton);
	resendVerificationButton = await screen.findByRole("button", { name: "Loading..." });
	expect(resendVerificationButton).toHaveAttribute("disabled");
	expect(resendVerificationButton).toBeInTheDocument();
});

test("should show error message when fetch fails", async () => {
	console.error = jest.fn();
	const userProps = {
		nameIdentifier: "some_id",
		onClick: jest.fn(),
		onError: jest.fn(),
	};
	server.use(
		rest.post(Endpoints.verificationEmail, (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
	render(<ResendVerification {...userProps} />);
	let resendVerificationButton = screen.getByRole("button", { name: "Resend verification email"});
	userEvent.click(resendVerificationButton);
	resendVerificationButton = await screen.findByRole("button", { name: "Loading..." });
	resendVerificationButton = await screen.findByRole("button", { name: "Email sent" });
	expect(userProps.onError).toHaveBeenCalledTimes(1);
});

test("should show error message when fetch returns non-200 error", async () => {
	console.error = jest.fn();
	const userProps = {
		nameIdentifier: "some_id",
		onClick: jest.fn(),
		onError: jest.fn(),
	};
	server.use(
		rest.post(Endpoints.verificationEmail, (req, res, ctx) => {
			return res.once(
				ctx.status(401),
				ctx.json({})
			);
		})
	);
	render(<ResendVerification {...userProps} />);
	let resendVerificationButton = screen.getByRole("button", { name: "Resend verification email"});
	userEvent.click(resendVerificationButton);
	resendVerificationButton = await screen.findByRole("button", { name: "Loading..." });
	resendVerificationButton = await screen.findByRole("button", { name: "Email sent" });
	expect(userProps.onError).toHaveBeenCalledTimes(1);
});