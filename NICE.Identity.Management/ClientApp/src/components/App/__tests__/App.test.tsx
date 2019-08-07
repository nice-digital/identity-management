import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import App from "../App";

const fakeEvent = {
	preventDefault: function() {},
};

it("shows login sceren if logged out", () => {
	const wrapper = shallow(<App loggedIn={false} />);
	expect(toJson(wrapper)).toMatchSnapshot();
});

it("shows secret data if logged in", () => {
	const wrapper = shallow(<App loggedIn={true} />);
	expect(toJson(wrapper)).toMatchSnapshot();
});

it("lookup method should return correct names", () => {
	const lookupMethod = new App();
	const result = lookupMethod.lookupNameById(121, fakeEvent);
	expect(result).toEqual("Malcolm");
	const another = lookupMethod.lookupNameById(434343434, fakeEvent);
	expect(another).toEqual("user not found");
});

it("tests the click handler", () => {
	//assemble
	const wrapper = mount(<App loggedIn={true} />);
	const spy = jest.spyOn(wrapper.instance(), "lookupNameById");
	expect(spy).toHaveBeenCalledTimes(0);

	//act
	wrapper.find("button").simulate("click");

	//assert
	expect(spy).toHaveBeenCalled();
});
