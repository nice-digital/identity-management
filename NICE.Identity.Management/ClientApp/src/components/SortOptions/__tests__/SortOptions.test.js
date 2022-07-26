import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { SortOptions } from "../SortOptions";
import { sortOptions } from "src/helpers/sortOptions";

test("should set A-Z sort option to active when querystring sort is unset", async () => {
	render(
		<MemoryRouter initialEntries={['/organisations']}>
			<SortOptions />
		</MemoryRouter>
	);
	expect(screen.getByText(sortOptions["alpha-asc"], { selector: "span" })).toBeInTheDocument();
});

test("should set Date Descending sort option to active when querystring sort is set to date-desc", async () => {
	render(
		<MemoryRouter initialEntries={['/organisations?sort=date-desc']}>
			<SortOptions />
		</MemoryRouter>
	);
	expect(screen.getByText(sortOptions["date-desc"], { selector: "span" })).toBeInTheDocument();
});