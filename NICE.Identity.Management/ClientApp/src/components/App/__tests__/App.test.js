import React from "react";
import {render, waitFor, screen} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import { App } from '../App';
import { Endpoints } from "../../../data/endpoints";

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
	//screen.debug(undefined, 30000000);
});