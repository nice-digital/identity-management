import React from "react";
import { render, screen } from "@testing-library/react";
import { Pagination } from "../Pagination";

test("shows first page pager when there are 6 pages or more", () => {
	const paginationProps = {
		onChangePage: jest.fn(),
		onChangeAmount: jest.fn(),
		consultationCount: 300,
		itemsPerPage: 25,
		currentPage: 8,
	};	
	render(<Pagination {...paginationProps} />);
	expect(screen.getByRole("link", { name: "Go to first page" })).toBeInTheDocument();
});

test("shows last page pager when there are 6 pages or more", () => {
	const paginationProps = {
		onChangePage: jest.fn(),
		onChangeAmount: jest.fn(),
		consultationCount: 300,
		itemsPerPage: 25,
		currentPage: 8,
	};	
	render(<Pagination {...paginationProps} />);
	expect(screen.getByRole("link", { name: "Go to last page" })).toBeInTheDocument();
});

test("shows previous page pager when there are multiple pages", () => {
	const paginationProps = {
		onChangePage: jest.fn(),
		onChangeAmount: jest.fn(),
		consultationCount: 300,
		itemsPerPage: 25,
		currentPage: 8,
	};	
	render(<Pagination {...paginationProps} />);
	expect(screen.getByRole("link", { name: "Go to previous page" })).toBeInTheDocument();
});

test("shows next page pager when there are multiple pages", () => {
	const paginationProps = {
		onChangePage: jest.fn(),
		onChangeAmount: jest.fn(),
		consultationCount: 300,
		itemsPerPage: 25,
		currentPage: 8,
	};	
	render(<Pagination {...paginationProps} />);
	expect(screen.getByRole("link", { name: "Go to next page" })).toBeInTheDocument();
});

test("hides pagers when all is selected in amount dropdown", () => {
	const paginationProps = {
		onChangePage: jest.fn(),
		onChangeAmount: jest.fn(),
		consultationCount: 300,
		itemsPerPage: "all",
		currentPage: 1,
	};
	render(<Pagination {...paginationProps} />);
	expect(screen.queryByRole("navigation", { name: "Select page to navigate to" })).not.toBeInTheDocument();
});

test("shows correct value in amount dropdown", () => {
	const paginationProps = {
		onChangePage: jest.fn(),
		onChangeAmount: jest.fn(),
		consultationCount: 300,
		itemsPerPage: "all",
		currentPage: 1,
	};
	render(<Pagination {...paginationProps} />);
	expect(screen.getByRole("option", { name: "All" }).selected).toBe(true);
});
