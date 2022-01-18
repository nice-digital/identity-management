import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";

import { nextTick } from "../../../utils/nextTick";
import { AddOrganisation } from "../AddOrganisation";

import { Endpoints } from "../../../data/endpoints";

import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

describe("AddOrganisation", () => {
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

    it("should match the snapshot on load", async () => {
		const wrapper = shallow(<AddOrganisation />);
		// await nextTick();
		// wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

    // it("should show error message when fetchData post call returns 401 error", async () => {	
	// 	console.error = jest.fn();
	// 	fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
	// 	const wrapper = mount(
	// 		<MemoryRouter>
	// 			<AddOrganisation />
	// 		</MemoryRouter>,
	// 	);
	// 	// await nextTick();
	// 	// wrapper.update();
    //     // NEEDS INPUT VALUE - CHECK EDITUSER
    //     wrapper.find("form").simulate("submit");
	// 	await nextTick();
	// 	wrapper.update();
	// 	expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	// });

});