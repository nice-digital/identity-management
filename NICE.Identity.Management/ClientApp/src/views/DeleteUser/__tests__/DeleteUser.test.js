import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import fetchMock from "fetch-mock";
import toJson from "enzyme-to-json";

import { nextTick } from "../../../utils/nextTick";
import singleUser from "./singleUser.json";
import { DeleteUser } from "../DeleteUser";

import * as fetchData from "../../../helpers/fetchData";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

describe("DeleteUser", () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};

	afterEach(fetchMock.reset);

	it("should show loading message before data has been loaded", () => {
		fetchMock.get("*", {});
		const wrapper = shallow(<DeleteUser match={match} />);
		expect(wrapper.find("p").text()).toEqual("Loading...");
	});

	it("should call fetchData during componentDidMount", () => {
		fetchMock.get("*", {});
		const wrapper = shallow(<DeleteUser match={match} />);
		const instance = wrapper.instance();
		jest.spyOn(fetchData, "fetchData");
		instance.componentDidMount();
		expect(fetchData.fetchData).toHaveBeenCalledTimes(1);
	});

	it("should match the snapshot after data has been loaded", async () => {
		fetchMock.get("*", singleUser);
		const wrapper = shallow(<DeleteUser match={match} />);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when fetchData function returns 401 error", async () => {
		fetchMock.get("*", 401);
		const wrapper = mount(
			<MemoryRouter>
				<DeleteUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when fetchData function returns 500 error", async () => {
		fetchMock.get("*", 500);
		const wrapper = mount(
			<MemoryRouter>
				<DeleteUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when fetchData delete fails", async () => {
		const error = new Error("Not allowed");
		fetchMock.get("*", {});
		fetchMock.delete("*", { throws: error });
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
	});

	it("should show error message when fetchData delete returns non-200 error", async () => {
		const serverErrorMessage = "Not authorized";
		fetchMock.get("*", {});
		fetchMock.delete("*", {
			body: { message: serverErrorMessage },
			status: 401,
		});
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
	});

	it("should disable delete button when clicked", async () => {
		fetchMock.mock("*", singleUser);
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
	});

	it("should display confirmation message once fetchDeleteData is successfully complete", async () => {
		fetchMock.mock("*", {});
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
	});
});
