import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { FilterSearch } from "../FilterSearch";

test("should match the snapshot when querystring search has a value", async () => {
	const dummyText = "SomeText";
	const {container} = render(
		<MemoryRouter initialEntries={[`/organisations?q=${dummyText}`]}>
			<FilterSearch label="Filter by organisation name" />
		</MemoryRouter>,
	);	
	expect(container).toMatchSnapshot();
});