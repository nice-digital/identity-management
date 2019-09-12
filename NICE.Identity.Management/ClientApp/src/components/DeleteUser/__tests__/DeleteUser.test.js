import React from "react";
import { mount, shallow } from "enzyme";
import fetchMock from "fetch-mock";
import { toJson } from "enzyme-to-json";
import { DeleteUser } from "../DeleteUser";

it("should mount without crashing", () => {
	const wrapper = mount(<DeleteUser />);
	expect(wrapper).toHaveLength(1);
	wrapper.unmount();
});
