import React from "react";
import { mount, shallow } from "enzyme";
import fetchMock from "fetch-mock";

import { ResendVerification } from "../ResendVerification";
import { nextTick } from "../../../utils/nextTick";

describe("ResendVerification", () => {
	let userProps;

	beforeEach(() => {
		userProps = {
			nameIdentifier: "some_id",
			onClick: jest.fn(),
			onError: jest.fn(),
		};
	});

	afterEach(fetchMock.reset);

	it("should show correct text on load", () => {
		const wrapper = mount(<ResendVerification {...userProps} />);
		expect(wrapper.find("button").text()).toEqual("Resend verification email");
	});


	it("should disable button when clicked", async () => {
		fetchMock.patch("*", {});
		const wrapper = mount(<ResendVerification {...userProps} />);
		wrapper.find("button").simulate("click");
		wrapper.update();
		expect(wrapper.find("button").props().disabled).toEqual(true);
		expect(wrapper.find("button").text()).toEqual("Loading...");
	});

	it("should show error message when fetch fails", async () => {
		const error = new Error("Not allowed");
		fetchMock.patch("*", { throws: error });
		const wrapper = mount(<ResendVerification {...userProps} />);
		wrapper.find("button").simulate("click");
		await nextTick();
		expect(userProps.onError).toHaveBeenCalledTimes(1);
	});

	it("should show error message when fetch returns non-200 error", async () => {
		const serverErrorMessage = "Not authorized";
		fetchMock.patch("*", {
			body: { message: serverErrorMessage },
			status: 401,
		});
		const wrapper = mount(<ResendVerification {...userProps} />);
		wrapper.find("button").simulate("click");
		await nextTick();
		expect(userProps.onError).toHaveBeenCalledTimes(1);
	});
});
