import React from "react";
// import { shallow } from "enzyme";
// import { App } from "../App";

// describe("App", () => {
// 	beforeEach(() => {
// 		fetch.resetMocks();
// 	});

// 	it("should mount without crashing", () => {
// 		fetch.mockResponseOnce(JSON.stringify({ displayName: "John Holland", links: []}));
// 		const wrapper = shallow(<App />);
// 		expect(wrapper).toHaveLength(1);
// 	});
// });

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
	//fetch.mockResponseOnce(JSON.stringify({ displayName: "John Holland", links: []}));
	render(<App />);

	//fireEvent.click(screen.getByText('Load Greeting'))

  	await waitFor(() => screen.getByLabelText('Site header'));
	//const linkElement = screen.getByText(/Loading.../i);
	expect(screen.getByRole('heading', { name: "Administration"})).toBeInTheDocument();
  	// expect(screen.getByRole('button')).toBeDisabled()
	//screen.debug(undefined, 30000000);
	//expect(screen.getByText('John Holland')).toBeInTheDocument();
});

