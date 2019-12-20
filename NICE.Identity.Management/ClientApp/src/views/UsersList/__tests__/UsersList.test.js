import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import fetchMock from "fetch-mock";
import toJson from "enzyme-to-json";

import { UsersList } from "../UsersList";
import { FilterSearch } from "../../../components/FilterSearch/FilterSearch";
import users from "./users.json";

import { nextTick } from "../../../utils/nextTick";

import * as fetchData from "../../../helpers/fetchData";
import { Endpoints } from "../../../data/endpoints";

describe("UsersList", () => {
	afterEach(fetchMock.reset);

	const filterSearchProps = {
		onInputChange: jest.fn(),
	};

	const dummyText = "SomeText";

	it("should show loading message before data has been loaded", () => {
		fetchMock.get("*", {});
		const wrapper = shallow(<UsersList />);
		expect(wrapper.find("p").text()).toEqual("Loading...");
	});

	it("should call fetchData during componentDidMount", () => {
		fetchMock.get("*", {});
		const wrapper = shallow(<UsersList />);
		const instance = wrapper.instance();
		jest.spyOn(fetchData, "fetchData");
		instance.componentDidMount();
		expect(fetchData.fetchData).toHaveBeenCalledTimes(1);
	});

	it("should match the snapshot after data has been loaded", async () => {
		fetchMock.get("*", users);
		const wrapper = mount(
			<MemoryRouter>
				<UsersList />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when fetch returns 401 error", async () => {
		fetchMock.get("*", 401);
		const wrapper = mount(<UsersList />);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when fetch returns 500 error", async () => {
		fetchMock.get("*", 500);
		const wrapper = mount(<UsersList />);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show no results message when fetch returns an empty array", async () => {
		fetchMock.get("*", []);
		const wrapper = shallow(<UsersList />);
		await nextTick();
		wrapper.update();
		expect(wrapper.find("p").text()).toEqual("No results found");
	});

	it("should show no results found message after search returns empty array", async () => {
		fetchMock.get(Endpoints.usersList, users);
		fetchMock.get(`${Endpoints.usersList}?q=${dummyText}`, []);
		const wrapper = shallow(<UsersList />);
		const instance = wrapper.instance();
		await nextTick();
		wrapper.update();
		instance.filterUsersBySearch(dummyText);
		await nextTick();
		wrapper.update();
		expect(wrapper.find("p").text()).toEqual(
			`No results found for ${dummyText}`,
		);
	});

	it("should show all filter by default", () => {
		fetchMock.get("*", {});
		const wrapper = mount(<UsersList />);
		expect(wrapper.find("#filter-status-all").props().defaultChecked).toEqual(
			true,
		);
	});

	it("should filter users to all active when radio button is clicked", async () => {
		fetchMock.get("*", users);
		const wrapper = mount(
			<MemoryRouter>
				<UsersList />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("#filter-status-active").simulate("change", {
			target: { value: "active" },
		});
		await nextTick();
		wrapper.update();
		wrapper.find(".tag").forEach(tag => {
			expect(tag.text()).toEqual("Active");
		});
	});
});
