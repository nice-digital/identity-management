import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";
import { nextTick } from "../../../utils/nextTick";
import { ItemsPerPage } from "../ItemsPerPage";

describe("ItemsPerPage", () => {
    it("should match the snapshot when querystring amount is all", async () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/organisations?amount=all']}>
				<ItemsPerPage />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});
});