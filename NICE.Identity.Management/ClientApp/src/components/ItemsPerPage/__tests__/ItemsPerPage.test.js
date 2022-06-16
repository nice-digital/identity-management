import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ItemsPerPage } from "../ItemsPerPage";

test("should match the snapshot when querystring amount is all", async () => {	
	const {container} = render(
		<MemoryRouter initialEntries={['/organisations?amount=all']}>
			<ItemsPerPage />
		</MemoryRouter>
	);	
	expect(container).toMatchSnapshot();
});