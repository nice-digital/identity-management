import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import { Redirect } from "react-router-dom";
import toJson from "enzyme-to-json";

import { nextTick } from "../../../utils/nextTick";
import { Endpoints } from "../../../data/endpoints";

import { OrganisationsList } from "../OrganisationsList";
import organisations from "./organisations.json";

import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

describe("OrganisationsList", () => {
	// const match = {
	// 	params: { id: 1 },
	// 	isExact: true,
	// 	path: "",
	// 	url: "",
	// };

    const organisationsListProps = {
		location: {
			search: "?amount=all&page=1",
		},
		history: {
			push: jest.fn(),
		},
	};

    const organisationsListPropsOnePerPage = {
		...organisationsListProps,
		location: { search: "?amount=1&page=4" },
	};

	const organisationsListPropsThreePerPage = {
		...organisationsListProps,
		location: { search: "?amount=3&page=1" },
	};

    const dummyText = "SomeText";

    const consoleErrorReset = console.error;

	beforeEach(() => {
		fetch.resetMocks();
		console.error = consoleErrorReset;
	});

    it("should show loading message before data has been loaded", () => {
		fetch.mockResponseOnce(JSON.stringify(organisations));
		const wrapper = shallow(<OrganisationsList {...organisationsListProps} />);
		expect(wrapper.find("p").text()).toEqual("Loading...");
	});

    it("should call fetchData during componentDidMount", () => {
		fetch.mockResponseOnce(JSON.stringify(organisations));
		const wrapper = mount(<MemoryRouter><OrganisationsList {...organisationsListProps} /></MemoryRouter>);
		const spy = jest.spyOn(wrapper.instance(), "componentDidMount");
		wrapper.instance().componentDidMount();
		wrapper.update();
		expect(spy).toHaveBeenCalled();
		expect(fetch.mock.calls.length).toEqual(1);
		expect(fetch.mock.calls[0][0]).toEqual(Endpoints.organisationsList);
		spy.mockClear();
	});

    it("should match the snapshot after data has been loaded", async () => {
		fetch.mockResponseOnce(JSON.stringify(organisations));
		const wrapper = mount(
			<MemoryRouter>
				<OrganisationsList {...organisationsListProps} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

    it("should show error message when fetch organisations returns 401 error", async () => {
		console.error = jest.fn();		
		fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
		const wrapper = mount(<MemoryRouter><OrganisationsList {...organisationsListProps} /></MemoryRouter>);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

    it("should show error message when fetch organisations returns 500 error", async () => {
		console.error = jest.fn();
		fetch.mockRejectOnce(new Error("500 Internal Server Error"));
		const wrapper = mount(<MemoryRouter><OrganisationsList {...organisationsListProps} /></MemoryRouter>);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

    it("should show no results message when fetch returns an empty array", async () => {
		fetch.mockResponseOnce(JSON.stringify([]));
		const wrapper = shallow(<OrganisationsList {...organisationsListProps} />);
		await nextTick();
		wrapper.update();
		expect(wrapper.find("p").text()).toEqual("No results found");
	});

    it("should show no results found message after search returns empty array", async () => {
		fetch.mockResponseOnce(JSON.stringify(organisations));
        fetch.mockResponseOnce(JSON.stringify([]));
		const wrapper = shallow(<OrganisationsList {...organisationsListProps} />);
		const instance = wrapper.instance();
		await nextTick();
		wrapper.update();
		instance.filterOrganisationsBySearch(dummyText);
		await nextTick();
		wrapper.update();
        console.log(wrapper.debug());
		expect(wrapper.find("p").text()).toEqual(
			`No results found for "${dummyText}"`,
		);
	});

    it("should show 25 (default page amount) or less results by default when paginated", async () => {
		fetch.mockResponseOnce(JSON.stringify(organisations));
		const wrapper = mount(
			<MemoryRouter>
				<OrganisationsList {...organisationsListProps} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		const listContainer = wrapper.find("[data-qa-sel='list-of-organisations']");
		expect(listContainer.find(".card").length).toBeLessThanOrEqual(25);
	});

	it("should go to page 2 when next button is clicked", async () => {
		fetch.mockResponseOnce(JSON.stringify(organisations));
		const wrapper = mount(
			<MemoryRouter>
                <OrganisationsList {...organisationsListPropsThreePerPage} />
            </MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("[data-pager='next']").simulate("click");
		await nextTick();
		wrapper.update();
		const listContainer = wrapper.find("[data-qa-sel='list-of-organisations']");
		const usersListSummary = wrapper.find(".organisationsListSummary");
		expect(usersListSummary.text()).toEqual("Showing 4 to 4 of 4 organisations");
		expect(wrapper.find(".paginationCounter").text()).toEqual("Page 2 of 2");
		expect(listContainer.find(".card").length).toEqual(1);
	});

	it("should go to first page when page 1 button is clicked", async () => {
		fetch.mockResponseOnce(JSON.stringify(organisations));
		const wrapper = mount(
			<MemoryRouter>
				<OrganisationsList {...organisationsListPropsOnePerPage} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("[data-pager='1']").simulate("click");
		await nextTick();
		wrapper.update();
		const listContainer = wrapper.find("[data-qa-sel='list-of-organisations']");
		const usersListSummary = wrapper.find(".organisationsListSummary");
		expect(usersListSummary.text()).toEqual("Showing 1 to 1 of 4 organisations");
		expect(wrapper.find(".paginationCounter").text()).toEqual("Page 1 of 4");
		expect(listContainer.find(".card").length).toEqual(1);
	});

});