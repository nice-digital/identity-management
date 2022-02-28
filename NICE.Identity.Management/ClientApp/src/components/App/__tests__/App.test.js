import React from "react";
import { shallow } from "enzyme";
//import toJson from "enzyme-to-json";
import { App } from "../App";

describe("App", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it("should mount without crashing", () => {
		fetch.mockResponseOnce(JSON.stringify({ displayName: "John Holland", links: []}));
		const wrapper = shallow(<App />);
		expect(wrapper).toHaveLength(1);
	});
});
