import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import toJson from "enzyme-to-json";

import { Website } from "../Website";
import usersAndRoles from "./UsersAndRoles.json";
import emptyUsersAndRoles from "./EmptyUsersAndRoles.json";

import { nextTick } from "../../../utils/nextTick";

import { Endpoints } from "../../../data/endpoints";

describe("Website", () => {
    const websiteProps = {
		location: {
			pathname: "/websites",
			search: "?amount=all&page=1",
		},
		history: {
			push: jest.fn(),
		},
        match: {
            params: { id: 1 },
        }
	};

	const websitePropsOnePerPage = {
		...websiteProps,
		location: { search: "?amount=1&page=4" },
	};

	const websitePropsThreePerPage = {
		...websiteProps,
		location: { search: "?amount=3&page=1" },
	};

    const consoleErrorReset = console.error;

    beforeEach(() => {
		fetch.resetMocks();
		console.error = consoleErrorReset;
	});

    it("should show loading message before data has been loaded", () => {
		fetch.mockResponseOnce(JSON.stringify(usersAndRoles));
		const wrapper = shallow(<Website {...websiteProps} />);
		expect(wrapper.find("p").text()).toEqual("Loading...");
	});

    it("should call fetchData during componentDidMount", () => {
		fetch.mockResponseOnce(JSON.stringify(usersAndRoles));
		const wrapper = mount(<MemoryRouter><Website {...websiteProps} /></MemoryRouter>);
		const spy = jest.spyOn(wrapper.instance(), "componentDidMount");
		wrapper.instance().componentDidMount();
		wrapper.update();
		expect(spy).toHaveBeenCalled();
		expect(fetch.mock.calls.length).toEqual(1);
		expect(fetch.mock.calls[0][0]).toEqual(Endpoints.usersAndRolesByWebsite(websiteProps.match.params.id));
		spy.mockClear();
	});

    it("should match the snapshot after data has been loaded", async () => {
		fetch.mockResponseOnce(JSON.stringify(usersAndRoles));
		const wrapper = mount(
			<MemoryRouter>
				<Website {...websiteProps} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

    it("should show error message when fetch returns 401 error", async () => {
		console.error = jest.fn();		
		fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
		const wrapper = mount(<MemoryRouter><Website {...websiteProps} /></MemoryRouter>);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

    it("should show error message when fetch returns 500 error", async () => {
		console.error = jest.fn();
		fetch.mockRejectOnce(new Error("500 Internal Server Error"));
		const wrapper = mount(<MemoryRouter><Website {...websiteProps} /></MemoryRouter>);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

    it("should show no results message when fetch returns an empty array", async () => {
		fetch.mockResponseOnce(JSON.stringify(emptyUsersAndRoles));
		const wrapper = shallow(<Website {...websiteProps} />);
		await nextTick();
		wrapper.update();
		expect(wrapper.find("p").text()).toEqual("No results found");
	});

    it("should filter users to all in admins when checkbox is clicked", async () => {
		fetch.mockResponseOnce(JSON.stringify(usersAndRoles));
		const wrapper = mount(
			<MemoryRouter>
				<Website {...websiteProps} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("#filter_roles_administrator").simulate("change", {
			target: { value: "Administrator" },
		});
		await nextTick();
		wrapper.update();
		wrapper.find(".tag").forEach((tag) => {
			expect(tag.text()).toEqual("Administrator");
		});
	});

    it("should show 25 (default page amount) or less results by default when paginated", async () => {
		fetch.mockResponseOnce(JSON.stringify(usersAndRoles));
		const wrapper = mount(
			<MemoryRouter>
				<Website {...websiteProps} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		const listContainer = wrapper.find("[data-qa-sel='list-of-users']");
		expect(listContainer.find("tr").length).toBeLessThanOrEqual(25);
        expect(listContainer.find("tr").length).toBeGreaterThanOrEqual(1);
	});

	it("should go to page 2 when next button is clicked", async () => {
		fetch.mockResponseOnce(JSON.stringify(usersAndRoles));
		const wrapper = mount(
			<MemoryRouter>
				<Website {...websitePropsThreePerPage} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("[data-pager='next']").simulate("click");
		await nextTick();
		wrapper.update();
		const table = wrapper.find("[data-qa-sel='list-of-users']");
		const webisteSummary = wrapper.find(".websiteSummary");
		expect(webisteSummary.text()).toEqual("Showing 4 to 4 of 4 users");
		expect(wrapper.find(".paginationCounter").text()).toEqual("Page 2 of 2");
		expect(table.find(".userRecord").length).toEqual(1);

		
	});

	it("should go to first page when page 1 button is clicked", async () => {
		fetch.mockResponseOnce(JSON.stringify(usersAndRoles));
		const wrapper = mount(
			<MemoryRouter>
				<Website {...websitePropsOnePerPage} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("[data-pager='1']").simulate("click");
		await nextTick();
		wrapper.update();
		const table = wrapper.find("[data-qa-sel='list-of-users']");
		const webisteSummary = wrapper.find(".websiteSummary");
		expect(webisteSummary.text()).toEqual("Showing 1 to 1 of 4 users");
		expect(wrapper.find(".paginationCounter").text()).toEqual("Page 1 of 4");
		expect(table.find(".userRecord").length).toEqual(1);
	});
});