import React from "react";
import { mount, shallow } from "enzyme";
import fetchMock from "fetch-mock";

import { UnlockUser } from "../UnlockUser";
import { Endpoints } from "../../../data/endpoints";
import { nextTick } from "../../../utils/nextTick";
//import singleUser from "./singleUser.json";

describe("UnlockUser", () => {
	let userProps;

	beforeEach(() => {
		userProps = {
			id: 1,
			isLocked: true,
			onToggleLock: jest.fn(),
			onError: jest.fn(),
		};
	});

	afterEach(fetchMock.reset);

	// show unlock/lock text
	it("should show unlock text when locked", () => {
		const wrapper = mount(<UnlockUser {...userProps} />);
		expect(wrapper.find("button").text()).toEqual("Unlock user");
	});

	it("should show lock text when unlocked", () => {
		userProps.isLocked = false;
		const wrapper = mount(<UnlockUser {...userProps} />);
		expect(wrapper.find("button").text()).toEqual("Lock user");
	});

	it("should disable button when clicked", async () => {
		fetchMock.patch("*", {});
		const wrapper = mount(<UnlockUser {...userProps} />);
		wrapper.find("button").simulate("click");
		wrapper.update();
		expect(wrapper.find("button").props().disabled).toEqual(true);
		expect(wrapper.find("button").text()).toEqual("Loading...");
	});

	it("should trigger onToggleLock prop function with server data once fetch is successfully complete", async () => {
		const responseData = { a: 1 };
		fetchMock.patch("*", responseData);
		const wrapper = mount(<UnlockUser {...userProps} />);
		wrapper.find("button").simulate("click");
		await nextTick();
		expect(userProps.onToggleLock).toHaveBeenCalledTimes(1);
		expect(userProps.onToggleLock).toHaveBeenCalledWith(responseData);
	});

	it("should show error message when fetch fails", async () => {
		const error = new Error("Not allowed");
		fetchMock.patch("*", { throws: error });
		const wrapper = mount(<UnlockUser {...userProps} />);
		wrapper.find("button").simulate("click");
		await nextTick();
		expect(userProps.onError).toHaveBeenCalledTimes(1);
		expect(userProps.onError).toHaveBeenCalledWith(error);
	});

	it("should show error message when fetch returns non-200 error", async () => {
		const serverErrorMessage = "Not authorized";
		fetchMock.patch("*", {
			body: { message: serverErrorMessage },
			status: 401,
		});
		const wrapper = mount(<UnlockUser {...userProps} />);
		wrapper.find("button").simulate("click");
		await nextTick();
		expect(userProps.onError).toHaveBeenCalledTimes(1);
		expect(userProps.onError).toHaveBeenCalledWith(
			new Error(serverErrorMessage),
		);
	});
});
