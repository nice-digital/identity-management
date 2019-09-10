import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { App } from "../App";

it("should mount without crashing", () => {
	const wrapper = mount(<App />);
	expect(wrapper).toHaveLength(1);
	wrapper.unmount();
});
