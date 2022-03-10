import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";
import { nextTick } from "../../../utils/nextTick";
import { PaginationText } from "../PaginationText";

describe("PaginationText", () => {
    const paginationTextOrgProps = {
        dataLength: 32,
	    labelSingular: "organisation",
	    labelPlural: "organisations",
	};

	it("should match the snapshot when pagination is default and organisations props passed in", async () => {
		const wrapper = mount(
			<MemoryRouter>
				<PaginationText {...paginationTextOrgProps} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

    it("should match the snapshot when on page 2 and organisations props passed in", async () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/organisations?page=2']}>
				<PaginationText {...paginationTextOrgProps} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});
});