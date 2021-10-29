import React from "react";
import { mount } from "enzyme";

import { ResendVerification } from "../ResendVerification";
import { nextTick } from "../../../utils/nextTick";

describe("ResendVerification", () => {
	let userProps;
	
	const consoleErrorReset = console.error;

	beforeEach(() => {
		userProps = {
			nameIdentifier: "some_id",
			onClick: jest.fn(),
			onError: jest.fn(),
		};
		fetch.resetMocks();
		console.error = consoleErrorReset;
	});

	it("should show correct text on load", () => {
		const wrapper = mount(<ResendVerification {...userProps} />);
		expect(wrapper.find("button").text()).toEqual("Resend verification email");
	});

	it("should disable button when clicked", () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify({}));
		const wrapper = mount(<ResendVerification {...userProps} />);
		wrapper.find("button").simulate("click");
		wrapper.update();
		expect(wrapper.find("button").props().disabled).toEqual(true);
		expect(wrapper.find("button").text()).toEqual("Loading...");
	});

	it("should show error message when fetch fails", async () => {
		console.error = jest.fn();
		fetch.mockRejectOnce(new Error("500 Internal Server Error"));
		const wrapper = mount(<ResendVerification {...userProps} />);
		wrapper.find("button").simulate("click");
		await nextTick();
		expect(userProps.onError).toHaveBeenCalledTimes(1);
	});

	it("should show error message when fetch returns non-200 error", async () => {
		console.error = jest.fn();
		const serverErrorMessage = "Not authorized";
		fetch.mockResponseOnce({ message: serverErrorMessage }, { status: 401 });
		const wrapper = mount(<ResendVerification {...userProps} />);
		wrapper.find("button").simulate("click");
		await nextTick();
		expect(userProps.onError).toHaveBeenCalledTimes(1);
	});
});
