import React from "react";
import {render, waitFor, screen} from "@testing-library/react";
import {rest} from "msw";
import {setupServer} from "msw/node";
import { App } from "../App";
import { Endpoints } from "src/data/endpoints";

const server = setupServer(
  rest.get(Endpoints.identityManagementUser.replace("/api", ""), (req, res, ctx) => {
    return res(ctx.json({ isAuthenticated: true, displayName: "John Holland", links: []}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('should mount without crashing', async () => {
	render(<App />);
	await waitFor(() => screen.getByText("My account", { selector: "button" }));
	expect(screen.getByRole("heading", { name: "Administration"})).toBeInTheDocument();
	expect(screen.getByText("John Holland", { selector: "span" })).toBeInTheDocument();
});

// Records the src of any script tags added to the page, e.g. the NICE Accounts script that global nav adds
const recordAddedScripts = () => {
	const srcs = [];
	const observer = new MutationObserver((mutations) =>
		mutations.forEach((mutation) =>
			mutation.addedNodes.forEach((node) => node.tagName === "SCRIPT" && srcs.push(node.src))
		)
	);
	observer.observe(document.body, { childList: true, subtree: true });
	return { srcs, stop: () => observer.disconnect() };
};

// Lets any request global nav makes after mounting happen, so we can assert it didn't
const settle = () => new Promise((resolve) => setTimeout(resolve, 300));

test("should not request NICE Accounts, as global nav should only be mounted once it has IdAM auth details", async () => {
	const scripts = recordAddedScripts();

	render(<App />);
	await waitFor(() => screen.getByText("John Holland", { selector: "span" }));
	await settle();
	scripts.stop();

	expect(scripts.srcs.filter((src) => src.includes("accounts.nice.org.uk"))).toEqual([]);
});

describe("when the account status request doesn't return account details", () => {
	let consoleError;

	beforeEach(() => {
		consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		consoleError.mockRestore();
	});

	const accountStatusUrl = Endpoints.identityManagementUser.replace("/api", "");

	test.each([
		[
			"a 200 response that isn't JSON",
			(req, res, ctx) =>
				res(ctx.status(200), ctx.set("Content-Type", "text/html"), ctx.body("<!doctype html><html></html>")),
		],
		["a 500 response", (req, res, ctx) => res(ctx.status(500), ctx.json({ message: "Server error" }))],
		["a network error", (req, res) => res.networkError("Failed to connect")],
		["a 200 response with a null body", (req, res, ctx) => res(ctx.status(200), ctx.json(null))],
	])("should finish loading and not request NICE Accounts for %s", async (_name, handler) => {
		server.use(rest.get(accountStatusUrl, handler));
		const scripts = recordAddedScripts();

		render(<App />);
		await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());
		await settle();
		scripts.stop();

		expect(scripts.srcs.filter((src) => src.includes("accounts.nice.org.uk"))).toEqual([]);
	});
});
