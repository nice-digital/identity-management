import React from "react";
import { mount, shallow } from "enzyme";
import fetchMock from "fetch-mock";
import toJson from "enzyme-to-json";
import { User } from "../User";
import singleUser from "./singleUser.json";
import { MemoryRouter } from "react-router";
import { nextTick } from "../../../utils/nextTick";

const match = {
	params: { id: 1 },
	isExact: true,
	path: "",
	url: "",
};

afterEach(fetchMock.reset);

it("should show loading message before data has been loaded", () => {
	fetchMock.get("*", {});
	const wrapper = shallow(<User match={match} />);
	expect(wrapper.find("p").text()).toEqual("Loading...");
});

it("should call fetchData during componentDidMount", () => {
	fetchMock.get("*", {});
	const wrapper = shallow(<User match={match} />);
	const instance = wrapper.instance();
	jest.spyOn(instance, "fetchData");
	instance.componentDidMount();
	expect(instance.fetchData).toHaveBeenCalledTimes(1);
});

it("should match the snapshot after data has been loaded", async () => {
	fetchMock.get("*", singleUser);
	const wrapper = mount(
		<MemoryRouter>
			<User match={match} />
		</MemoryRouter>,
	);
	await nextTick();
	wrapper.update();
	expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
});

it("should show error message when fetch returns 401 error", async () => {
	fetchMock.get("*", 401);
	const wrapper = shallow(<User match={match} />);
	await nextTick();
	wrapper.update();
	expect(wrapper.find("#user-error")).toHaveLength(1);
});

it("should show error message when fetch returns 500 error", async () => {
	fetchMock.get("*", 500);
	const wrapper = shallow(<User match={match} />);
	await nextTick();
	wrapper.update();
	expect(wrapper.find("#user-error")).toHaveLength(1);
});
