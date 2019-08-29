import React from "react";
import { mount, shallow } from "enzyme";
import fetchMock from "fetch-mock";
import toJson from "enzyme-to-json";
import { UsersList } from "../UsersList";
import users from "./users.json";
import { MemoryRouter } from "react-router";
import { nextTick } from "../../../utils/nextTick";

afterEach(fetchMock.reset);

it("should show loading message before data has been loaded", () => {
	fetchMock.get("*", {});
	const wrapper = shallow(<UsersList />);
	expect(wrapper.find("p").text()).toEqual("Loading...");
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
