import React from "react";
import { mount, shallow } from "enzyme";
import fetchMock from "fetch-mock";
import toJson from "enzyme-to-json";
import { UsersList } from "../UsersList";
import users from "./users.json";
import { MemoryRouter } from "react-router";
import { nextTick } from "../../../utils/nextTick";

afterEach(fetchMock.reset);

it("should mount without crashing", () => {
	fetchMock.get("*", {});
	const wrapper = shallow(<UsersList />);
	expect(wrapper).toHaveLength(1);
});

it("should match the snapshot when loading", async () => {
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
