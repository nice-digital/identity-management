// import React from "react";
// import { mount, shallow } from "enzyme";
// import { MemoryRouter } from "react-router";
// import toJson from "enzyme-to-json";

// import { User } from "../User";
// import { Endpoints } from "../../../data/endpoints";
// import singleUser from "./singleUser.json";
// import { nextTick } from "../../../utils/nextTick";

// describe("User", () => {
// 	const match = {
// 		params: { id: 1 },
// 		isExact: true,
// 		path: "",
// 		url: "",
// 	};

// 	const location = {
// 		state: {}
// 	};

// 	const consoleErrorReset = console.error;

// 	beforeEach(() => {
// 		fetch.resetMocks();
// 		console.error = consoleErrorReset;
// 	});

// 	it("should show loading message before data has been loaded", () => {
// 		fetch.mockResponseOnce(JSON.stringify(singleUser));
// 		const wrapper = shallow(<User location={location} match={match} />);
// 		expect(wrapper.find("p").text()).toEqual("Loading...");
// 	});

// 	it("should call fetch during componentDidMount", () => {
// 		fetch.mockResponseOnce(JSON.stringify(singleUser));
// 		const wrapper = mount(<MemoryRouter><User location={location} match={match} /></MemoryRouter>);
// 		const spy = jest.spyOn(wrapper.instance(), "componentDidMount");
// 		wrapper.instance().componentDidMount();
// 		wrapper.update();
// 		expect(spy).toHaveBeenCalled();
// 		expect(fetch.mock.calls.length).toEqual(1);
// 		expect(fetch.mock.calls[0][0]).toEqual(Endpoints.user(match.params.id));
// 		spy.mockClear();
// 	});

// 	it("should match the snapshot after data has been loaded", async () => {
// 		fetch.mockResponseOnce(JSON.stringify(singleUser));
// 		const wrapper = shallow(<User location={location} match={match} />);
// 		await nextTick();
// 		wrapper.update();
// 		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
// 	});

// 	it("should show error message when fetch returns 401 error", async () => {
// 		console.error = jest.fn();		
// 		fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
// 		const wrapper = mount(
// 			<MemoryRouter>
// 				<User location={location} match={match} />
// 			</MemoryRouter>,
// 		);
// 		await nextTick();
// 		wrapper.update();
// 		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();		
// 	});

// 	it("should show error message when fetch returns 500 error", async () => {
// 		console.error = jest.fn();
// 		fetch.mockRejectOnce(new Error("500 Internal Server Error"));
// 		const wrapper = mount(
// 			<MemoryRouter>
// 				<User location={location} match={match} />
// 			</MemoryRouter>,
// 		);
// 		await nextTick();
// 		wrapper.update();
// 		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
// 	});
// });

import React from "react";
import {render, waitFor, screen} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
//import userEvent from "@testing-library/user-event";
import { User } from "../User";
import { Endpoints } from "../../../data/endpoints";
import singleUser from "./singleUser.json";

const server = setupServer(
  rest.get(Endpoints.user("1"), (req, res, ctx) => {
    return res(ctx.json(singleUser))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// 	it("should match the snapshot after data has been loaded", async () => {
// 		fetch.mockResponseOnce(JSON.stringify(singleUser));
// 		const wrapper = shallow(<User location={location} match={match} />);
// 		await nextTick();
// 		wrapper.update();
// 		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
// 	});

test("should match the snapshot after data has been loaded", async () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};
	render(<User match={match} />);
	//fireEvent.click(screen.getByText('Load Greeting'))
  	await waitFor(() => screen.getByRole(heading, { name: "Kristin Patrick"}));

	expect(screen.getByRole(heading, { name: "Kristin Patrick"})).toBeInTheDocument();
});

