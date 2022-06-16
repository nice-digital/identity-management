import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { PaginationText } from "../PaginationText";

test("should match the snapshot when pagination is default and organisations props passed in", async () => {
    const paginationTextOrgProps = {
        dataLength: 32,
		labelSingular: "organisation",
		labelPlural: "organisations",
	};
	const {container} = render(<PaginationText {...paginationTextOrgProps} />, {wrapper: MemoryRouter});
	expect(container).toMatchSnapshot();
});

test("should match the snapshot when on page 2 and organisations props passed in", async () => {
	const paginationTextOrgProps = {
        dataLength: 32,
		labelSingular: "organisation",
		labelPlural: "organisations",
	};
	const {container} = render(
		<MemoryRouter initialEntries={['/organisations?page=2']}>
			<PaginationText {...paginationTextOrgProps} />
		</MemoryRouter>,
	);
	expect(container).toMatchSnapshot();
});