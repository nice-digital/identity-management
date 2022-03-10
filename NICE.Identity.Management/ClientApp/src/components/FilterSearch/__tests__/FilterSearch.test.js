import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";
import { nextTick } from "../../../utils/nextTick";
import { FilterSearch } from "../FilterSearch";

describe("FilterSearch", () => {
    const dummyText = "SomeText";

    it("should match the snapshot when querystring search has a value", async () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={[`/organisations?q=${dummyText}`]}>
				<FilterSearch label="Filter by organisation name" />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});
});