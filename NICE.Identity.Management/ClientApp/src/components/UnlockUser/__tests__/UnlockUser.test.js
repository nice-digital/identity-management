import React from "react";
import { mount, shallow } from "enzyme";
import fetchMock from "fetch-mock";
import { toJson } from "enzyme-to-json";
import { UnlockUser } from "../UnlockUser";

it("should mount without crashing", () => {
	const wrapper = mount(<UnlockUser />);
	expect(wrapper).toHaveLength(1);
	wrapper.unmount();
});
