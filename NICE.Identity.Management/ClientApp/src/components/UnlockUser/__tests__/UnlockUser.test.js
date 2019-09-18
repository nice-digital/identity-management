import React from "react";
import { mount, shallow } from "enzyme";
import fetchMock from "fetch-mock";

import { UnlockUser } from "../UnlockUser";
import { Endpoints } from "../../../data/endpoints";
import { nextTick } from "../../../utils/nextTick";
//import singleUser from "./singleUser.json";

const userProps = {
	id: 1,
	isBlocked: true,
	onToggleLock: jest.fn(),
	onError: jest.fn(),
};

afterEach(fetchMock.reset);

it("should trigger the fetchPatchData with correct arguments when when the lock/unlock button is clicked", () => {
	fetchMock.patch("*", {});
	const wrapper = mount(<UnlockUser {...userProps} />);
	const apiUrl = Endpoints.user(userProps.id);
	const spy = jest.spyOn(wrapper.instance(), "fetchPatchData");
	expect(spy).toHaveBeenCalledTimes(0);
	wrapper.find("button").simulate("click");
	expect(spy).toHaveBeenCalledWith(apiUrl, userProps.isBlocked);
});

it("should trigger onToggleLock prop function once fetch is complete", async () => {
	fetchMock.patch("*", {});
	const apiUrl = Endpoints.user(userProps.id);
	const wrapper = shallow(<UnlockUser {...userProps} />);
	wrapper.instance().fetchPatchData(apiUrl, false);
	expect(userProps.onToggleLock).toHaveBeenCalledTimes(1);
});

it("should show error message when fetch returns 401 error", async () => {
	fetchMock.patch("*", 401);
	const wrapper = shallow(<UnlockUser {...userProps} />);
	const spy = jest.spyOn(wrapper.instance(), "triggerError");
	expect(spy).toHaveBeenCalledTimes(0);
	wrapper.find("button").simulate("click");
	await nextTick();
	wrapper.update();
	expect(spy).toHaveBeenCalledTimes(1);
});

it("should show error message when fetch returns 500 error", async () => {
	fetchMock.patch("*", 500);
	const wrapper = shallow(<UnlockUser {...userProps} />);
	const spy = jest.spyOn(wrapper.instance(), "triggerError");
	expect(spy).toHaveBeenCalledTimes(0);
	wrapper.find("button").simulate("click");
	await nextTick();
	wrapper.update();
	expect(spy).toHaveBeenCalledTimes(1);
});
