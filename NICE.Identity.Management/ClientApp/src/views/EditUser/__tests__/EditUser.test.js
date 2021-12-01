import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import { Redirect } from "react-router-dom";
import toJson from "enzyme-to-json";

import { EditUser } from "../EditUser";
import singleUser from "./singleUser.json";
import { nextTick } from "../../../utils/nextTick";

describe("EditUser", () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};

    const consoleErrorReset = console.error;

	beforeEach(() => {
		fetch.resetMocks();
		console.error = consoleErrorReset;
	});

    it("should show loading message before data has been loaded", () => {
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		const wrapper = shallow(<EditUser match={match} />);
		expect(wrapper.find("p").text()).toEqual("Loading...");
	});

    it("should match the snapshot after data has been loaded", async () => {
        fetch.mockResponseOnce(JSON.stringify(singleUser));
        const wrapper = shallow(<EditUser match={match} />);
        await nextTick();
        wrapper.update();
        expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
    });

    it("should disable form submit button when clicked", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		fetch.mockResponseOnce(JSON.stringify({}));
		const wrapper = mount(
			<MemoryRouter>
				<EditUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("form").simulate("submit");
		expect(wrapper.find("button").props().disabled).toEqual(true);
		expect(wrapper.find("button").text()).toEqual("Loading...");
	});

	it("should display confirmation message once submit is complete", async () => {
		console.error = jest.fn();
		const singleUserEdited = { ...singleUser };
		singleUserEdited.firstName = "John";
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		fetch.mockResponseOnce(JSON.stringify(singleUserEdited));
		const wrapper = mount(
			<MemoryRouter>
				<EditUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("form").prop("onSubmit")({
			preventDefault: () => false, 
			currentTarget: { 
				checkValidity: () => true
			}
			//target: { emailAddress: { value: "johnz.olland@outlook.com" }},
		});
		await nextTick();
		wrapper.update();
		expect(wrapper.find(Redirect).exists()).toBe(true);
	});

});