import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";
import { nextTick } from "../../../utils/nextTick";
import { ResultsList } from "../ResultsList";
import { ResultOrganisation } from "../../ResultOrganisation/ResultOrganisation";
import organisations from "./organisations.json";

describe("ResultsList", () => {
    const resultsListOrganisationProps = {
		data: organisations,
        elementType: ResultOrganisation,
		qaSelExtract: "organisations",
	};

	it("should match the snapshot when ResultOrganisation has been passed into elementType", async () => {
		const wrapper = mount(
			<MemoryRouter>
				<ResultsList {...resultsListOrganisationProps} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});
});