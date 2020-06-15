import React from "react";
import { shallow, mount } from "enzyme";

import { Pagination } from "../Pagination";

const paginationBaseFakeProps = {
	onChangePage: jest.fn(),
	onChangeAmount: jest.fn(),
	consultationCount: 300,
};

const paginationLargeFakeProps = {
	itemsPerPage: 25,
	currentPage: 8,
};

const paginationNoneFakeProps = {
	itemsPerPage: "all",
	currentPage: 1,
};

describe("Pagination", () => {
	it("shows first page pager when there are 6 pages or more", () => {
		const pagination = mount(
			<Pagination {...paginationBaseFakeProps} {...paginationLargeFakeProps} />,
		);

		expect(pagination.find(".first").exists()).toBe(true);
	});

	it("shows last page pager when there are 6 pages or more", () => {
		const pagination = mount(
			<Pagination {...paginationBaseFakeProps} {...paginationLargeFakeProps} />,
		);

		expect(pagination.find(".last").exists()).toBe(true);
	});

	it("shows previous page pager when there are multiple pages", () => {
		const pagination = mount(
			<Pagination {...paginationBaseFakeProps} {...paginationLargeFakeProps} />,
		);

		expect(pagination.find("[data-pager='previous']").exists()).toBe(true);
	});

	it("shows next page pager when there are multiple pages", () => {
		const pagination = mount(
			<Pagination {...paginationBaseFakeProps} {...paginationLargeFakeProps} />,
		);

		expect(pagination.find("[data-pager='next']").exists()).toBe(true);
	});

	it("hides pagers when all is selected in amount dropdown", () => {
		const pagination = shallow(
			<Pagination {...paginationBaseFakeProps} {...paginationNoneFakeProps} />,
		);

		expect(pagination.find(".pagination").exists()).toBe(false);
	});

	it("shows correct value in amount dropdown", () => {
		const pagination = shallow(
			<Pagination {...paginationBaseFakeProps} {...paginationNoneFakeProps} />,
		);

		expect(pagination.find("#itemsPerPage").prop("value")).toEqual(
			paginationNoneFakeProps.itemsPerPage,
		);
	});
});
