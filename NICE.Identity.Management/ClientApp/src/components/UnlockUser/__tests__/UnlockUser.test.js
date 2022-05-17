// import { mount } from "enzyme";

// import { nextTick } from "../../../utils/nextTick";

// describe("UnlockUser", () => {
// 	let userProps;

// 	const consoleErrorReset = console.error;

// 	beforeEach(() => {
// 		userProps = {
// 			id: 1,
// 			isLocked: true,
// 			onToggleLock: jest.fn(),
// 			onError: jest.fn(),
// 		};
// 		fetch.resetMocks();
// 		console.error = consoleErrorReset;
// 	});

// 	it("should show unlock text when locked", () => {
// 		const wrapper = mount(<UnlockUser {...userProps} />);
// 		expect(wrapper.find("button").text()).toEqual("Unlock user");
// 	});

// 	it("should show lock text when unlocked", () => {
// 		userProps.isLocked = false;
// 		const wrapper = mount(<UnlockUser {...userProps} />);
// 		expect(wrapper.find("button").text()).toEqual("Lock user");
// 	});

// 	it("should disable button when clicked", () => {
// 		console.error = jest.fn();
// 		fetch.mockResponseOnce(JSON.stringify({}));
// 		const wrapper = mount(<UnlockUser {...userProps} />);
// 		wrapper.find("button").simulate("click");
// 		wrapper.update();
// 		expect(wrapper.find("button").props().disabled).toEqual(true);
// 		expect(wrapper.find("button").text()).toEqual("Loading...");
// 	});

// 	it("should trigger onToggleLock prop function with server data once fetch is successfully complete", async () => {
// 		const responseData = { a: 1 };
// 		fetch.mockResponseOnce(JSON.stringify(responseData));
// 		const wrapper = mount(<UnlockUser {...userProps} />);
// 		wrapper.find("button").simulate("click");
// 		await nextTick();
// 		expect(userProps.onToggleLock).toHaveBeenCalledTimes(1);
// 		expect(userProps.onToggleLock).toHaveBeenCalledWith(responseData);
// 	});

// 	it("should show error message when fetch fails", async () => {
// 		console.error = jest.fn();
// 		const error = new Error("Not allowed");
// 		fetch.mockRejectOnce(error);
// 		const wrapper = mount(<UnlockUser {...userProps} />);
// 		wrapper.find("button").simulate("click");
// 		await nextTick();
// 		expect(userProps.onError).toHaveBeenCalledTimes(1);
// 		expect(userProps.onError).toHaveBeenCalledWith(error);
// 	});

// 	it("should show error message when fetch returns non-200 error", async () => {
// 		console.error = jest.fn();
// 		const serverErrorMessage = "Not authorized";
// 		fetch.mockResponseOnce({ message: serverErrorMessage }, { status: 401 });
// 		const wrapper = mount(<UnlockUser {...userProps} />);
// 		wrapper.find("button").simulate("click");
// 		await nextTick();
// 		expect(userProps.onError).toHaveBeenCalledTimes(1);
// 	});
// });


import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UnlockUser } from "../UnlockUser";

test("should show unlock text when locked", () => {
	const userProps = {
		id: 1,
		isLocked: true,
		onToggleLock: jest.fn(),
		onError: jest.fn(),
	};
	render(<UnlockUser {...userProps} />);
	const lockToggleButton = screen.getByText("Unlock user");
	expect(lockToggleButton).toBeInTheDocument();
});

test("should show lock text when unlocked", () => {
	const userProps = {
		id: 1,
		isLocked: false,
		onToggleLock: jest.fn(),
		onError: jest.fn(),
	};
	render(<UnlockUser {...userProps} />);
	const lockToggleButton = screen.getByText("Lock user");
	expect(lockToggleButton).toBeInTheDocument();
});

test("should disable button when clicked", async () => {
	const userProps = {
		id: 1,
		isLocked: false,
		onToggleLock: jest.fn(),
		onError: jest.fn(),
	};
	render(<UnlockUser {...userProps} />);
	const user = userEvent.setup();
	await user.click(screen.getByText('Lock user'));
	expect(screen.getByText('Loading...')).toBeDisabled();
});
