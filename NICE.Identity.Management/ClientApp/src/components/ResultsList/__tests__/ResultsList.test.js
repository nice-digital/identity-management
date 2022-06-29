import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ResultsList } from "../ResultsList";
import { ResultOrganisation } from "../../ResultOrganisation/ResultOrganisation";
import organisations from "./organisations.json";

test("should match the snapshot when ResultOrganisation has been passed into elementType", async () => {
	const resultsListOrganisationProps = {
		data: organisations,
		elementType: ResultOrganisation,
		qaSelExtract: "organisations",
	};
	const {container} =	render(<ResultsList {...resultsListOrganisationProps} />, {wrapper: MemoryRouter});
	expect(container).toMatchSnapshot();
});