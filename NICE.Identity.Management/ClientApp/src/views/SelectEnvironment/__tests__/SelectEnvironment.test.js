import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";

import { nextTick } from "../../../utils/nextTick";
import singleUser from "./singleUser.json";
import singleService from "./singleService.json";
import { SelectEnvironment } from "../SelectEnvironment";

import { Endpoints } from "../../../data/endpoints";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

describe("SelectEnvironment", () => {
	const match = {
		params: { id: 1, serviceId: 1 },
		isExact: true,
		path: "",
		url: "",
	};

	const consoleErrorReset = console.error;

	beforeEach(() => {
		fetch.resetMocks();
	});	

	it("should show loading message before data has been loaded", () => {
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		fetch.mockResponseOnce(JSON.stringify(singleService));
		const wrapper = shallow(<SelectEnvironment match={match} />);
		expect(wrapper.find("p").text()).toEqual("Loading...");
	});

	it("should call fetch during componentDidMount", async () => {
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		fetch.mockResponseOnce(JSON.stringify(singleService));
		const wrapper = mount(<MemoryRouter><SelectEnvironment match={match} /></MemoryRouter>);
		const spy = jest.spyOn(wrapper.instance(), "componentDidMount");
		wrapper.instance().componentDidMount();
		await nextTick();
		wrapper.update();
		expect(spy).toHaveBeenCalled();
		expect(fetch.mock.calls.length).toEqual(2);
		expect(fetch.mock.calls[0][0]).toEqual(Endpoints.user(match.params.id));
		expect(fetch.mock.calls[1][0]).toEqual(Endpoints.service(match.params.serviceId));
		spy.mockClear();
	});

	it("should match the snapshot after data has been loaded", async () => {
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		fetch.mockResponseOnce(JSON.stringify(singleService));
		const wrapper = shallow(<SelectEnvironment match={match} />);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when user fetchData function returns 500 error", async () => {
		console.error = jest.fn(); // hide console error from fetchData		
		fetch.mockRejectOnce(new Error("500 Internal Server Error"));
		fetch.mockResponseOnce(JSON.stringify(singleService));
		const wrapper = mount(
			<MemoryRouter>
				<SelectEnvironment match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
		console.error = consoleErrorReset; // reset console error
	});

	it("should show error message when user fetchData function returns 401 error", async () => {
		console.error = jest.fn(); // hide console error from fetchData		
		fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
		fetch.mockResponseOnce(JSON.stringify(singleService));
		const wrapper = mount(
			<MemoryRouter>
				<SelectEnvironment match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
		console.error = consoleErrorReset; // reset console error
	});

	it("should show error message when services fetchData function returns 500 error", async () => {
		console.error = jest.fn(); // hide console error from fetchData		
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		fetch.mockRejectOnce(new Error("500 Internal Server Error"));
		const wrapper = mount(
			<MemoryRouter>
				<SelectEnvironment match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
		console.error = consoleErrorReset; // reset console error
	});

	it("should show error message when services fetchData function returns 401 error", async () => {
		console.error = jest.fn(); // hide console error from fetchData		
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
		const wrapper = mount(
			<MemoryRouter>
				<SelectEnvironment match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
		console.error = consoleErrorReset; // reset console error
	});
});
