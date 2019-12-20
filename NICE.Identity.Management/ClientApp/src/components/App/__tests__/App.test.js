import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { App } from "../App";

describe("App", () => {
	it("should mount without crashing", () => {
		const wrapper = shallow(<App />);
		expect(wrapper).toHaveLength(1);
	});
});
