import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { nextTick } from "../../../utils/nextTick";
import { SortOptions } from "../SortOptions";
import { sortOptions } from "../../../helpers/sortOptions";

describe("SortOptions", () => {
    it("should set A-Z sort option to active when querystring sort is unset", async () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/organisations']}>
				<SortOptions />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
    	expect(wrapper.find('span').text()).toEqual(sortOptions["alpha-asc"]);
	});

    it("should set Date Descending sort option to active when querystring sort is set to date-desc", async () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/organisations?sort=date-desc']}>
				<SortOptions />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
    	expect(wrapper.find('span').text()).toEqual(sortOptions["date-desc"]);
	});
});