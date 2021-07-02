import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";

import { nextTick } from "../../../utils/nextTick";
import singleUser from "./singleUser.json";
import { DeleteUser } from "../DeleteUser";

import { Endpoints } from "../../../data/endpoints";

import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

describe("DeleteUser", () => {
	const match = {
		params: { id: 1 },
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
		const wrapper = shallow(<DeleteUser match={match} />);
		expect(wrapper.find("p").text()).toEqual("Loading...");
	});

	it("should call fetchData during componentDidMount", () => {
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		const wrapper = mount(<MemoryRouter><DeleteUser match={match} /></MemoryRouter>);
		const spy = jest.spyOn(wrapper.instance(), "componentDidMount");
		wrapper.instance().componentDidMount();
		wrapper.update();
		expect(spy).toHaveBeenCalled();
		expect(fetch.mock.calls.length).toEqual(1);
		expect(fetch.mock.calls[0][0]).toEqual(Endpoints.user(match.params.id));
		spy.mockClear();
	});

	it("should match the snapshot after data has been loaded", async () => {
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		const wrapper = shallow(<DeleteUser match={match} />);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when fetchData function returns 401 error", async () => {
		console.error = jest.fn(); // hide console error from fetchData
		fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
		const wrapper = mount(
			<MemoryRouter>
				<DeleteUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
		console.error = consoleErrorReset; // reset console error
	});

	it("should show error message when fetchData function returns 500 error", async () => {
		console.error = jest.fn(); // hide console error from fetchData
		fetch.mockRejectOnce(new Error("500 Internal Server Error"));
		const wrapper = mount(
			<MemoryRouter>
				<DeleteUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
		console.error = consoleErrorReset; // reset console error
	});

	it("should show error message when fetchData delete fails", async () => {
		console.error = jest.fn(); // hide console error from fetchData
		const error = new Error("Not allowed");
		// fetchMock.get("*", {});
		// fetchMock.delete("*", { throws: error });
		fetch.mockResponseOnce(JSON.stringify({}));
		fetch.mockRejectOnce(error);
		const wrapper = mount(
			<MemoryRouter>
				<DeleteUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("button").simulate("click");
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
		console.error = consoleErrorReset; // reset console error
	});

	it("should show error message when fetchData delete returns non-200 error", async () => {
		console.error = jest.fn(); // hide console error from fetchData
		const serverErrorMessage = "Not authorized";
		// fetchMock.get("*", {});
		// fetchMock.delete("*", {
		// 	body: { message: serverErrorMessage },
		// 	status: 401,
		// });
		fetch.mockResponseOnce(JSON.stringify({}));
		fetch.mockResponseOnce({ message: serverErrorMessage }, { status: 401 });
		const wrapper = mount(
			<MemoryRouter>
				<DeleteUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("button").simulate("click");
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
		console.error = consoleErrorReset; // reset console error
	});

	it("should disable delete button when clicked", async () => {
		//fetchMock.mock("*", singleUser);
		console.error = jest.fn(); // hide console error from fetchData
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		fetch.mockResponseOnce(JSON.stringify({}));
		const wrapper = mount(
			<MemoryRouter>
				<DeleteUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("button").simulate("click");
		expect(wrapper.find("button").props().disabled).toEqual(true);
		expect(wrapper.find("button").text()).toEqual("Loading...");
		console.error = consoleErrorReset; // reset console error
	});

	it("should display confirmation message once fetchData delete is successfully complete", async () => {
		//fetchMock.mock("*", {});
		console.error = jest.fn(); // hide console error from fetchData
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		fetch.mockResponseOnce(JSON.stringify({}));
		const wrapper = mount(
			<MemoryRouter>
				<DeleteUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("button").simulate("click");
		await nextTick();
		wrapper.update();
		expect(wrapper.find("h1").text()).toEqual("User deleted");
		console.error = consoleErrorReset; // reset console error
	});
});
