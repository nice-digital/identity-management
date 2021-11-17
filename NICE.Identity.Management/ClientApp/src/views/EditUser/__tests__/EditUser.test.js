import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { EditUser } from "../EditUser";
import singleUser from "./singleUser.json";
import { nextTick } from "../../../utils/nextTick";

describe("EditUser", () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};

    it("should match the snapshot after data has been loaded", async () => {
        fetch.mockResponseOnce(JSON.stringify(singleUser));
        const wrapper = shallow(<EditUser match={match} />);
        await nextTick();
        wrapper.update();
        expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
    });
});