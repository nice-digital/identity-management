import React from "react";
import { mount, shallow } from "enzyme";
import fetchMock from "fetch-mock";

import { UnlockUser } from "../UnlockUser";
import { Endpoints } from "../../../data/endpoints";
//import singleUser from "./singleUser.json";

const userProps = {
	id: 1,
	blocked: true,
	onToggleLock: jest.fn(),
};

afterEach(fetchMock.reset);

it("should trigger the fetchPatchData with correct arguments when when the lock/unlock button is clicked", () => {
	fetchMock.patch("*", {});
	const wrapper = mount(<UnlockUser {...userProps} />);
	const apiUrl = Endpoints.editUser(userProps.id);
	const spy = jest.spyOn(wrapper.instance(), "fetchPatchData");
	expect(spy).toHaveBeenCalledTimes(0);
	wrapper.find("button").simulate("click");
	expect(spy).toHaveBeenCalledWith(apiUrl, userProps.blocked);
});

it("should trigger onToggleLock prop function once fetch is complete", async () => {
	fetchMock.patch("*", {});
	const apiUrl = Endpoints.editUser(userProps.id);
	const wrapper = shallow(<UnlockUser {...userProps} />);
	wrapper.instance().fetchPatchData(apiUrl, false);
	expect(userProps.onToggleLock).toHaveBeenCalledTimes(1);
});
