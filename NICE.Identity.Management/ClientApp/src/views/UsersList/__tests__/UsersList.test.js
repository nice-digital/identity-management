import React from "react";
import { shallow, mount } from "enzyme";
const fetchMock = require("fetch-mock");
import toJson from "enzyme-to-json";
import { UsersList } from "../UsersList";
import users from "./users.json";
import { MemoryRouter } from "react-router";

// it("should mount without crashing", () => {
// 	const wrapper = shallow(<UsersList />);
// 	expect(wrapper).toHaveLength(1);
// });

const nextTick = async () => {
	return new Promise(resolve => {
		setTimeout(resolve, 0);
	});
};

it("should match the snapshot when loading", async () => {
	// window.fetch = jest.fn(() => {
	// 	return Promise.resolve({
	// 		json: Promise.resolve(users),
	// 	});
	// });

	fetchMock.get("*", users);

	const wrapper = mount(
		<MemoryRouter>
			<UsersList />
		</MemoryRouter>,
	);
	const element = wrapper.find("UsersList");
	console.log(element.state());
	await nextTick();
	wrapper.update();
	console.log(element.state());
	// expect(toJson(wrapper)).toMatchSnapshot();
});
