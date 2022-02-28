import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";
import { nextTick } from "../../../utils/nextTick";
import { OrganisationsList } from "../OrganisationsList";
import organisations from "./organisations.json";
import organisations2 from "./organisations2.json";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

describe("OrganisationsList", () => {
	const dummyText = "SomeText";

    const consoleErrorReset = console.error;

	beforeEach(() => {
		fetch.resetMocks();
		console.error = consoleErrorReset;
	});

    it("should show loading message before data has been loaded", () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(organisations));
		const wrapper = mount(<MemoryRouter><OrganisationsList /></MemoryRouter>);
		expect(wrapper.find("p").text()).toEqual("Loading...");
	});

	it("should match the snapshot after data has been loaded", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(organisations));
		const wrapper = mount(
			<MemoryRouter>
				<OrganisationsList />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when fetch organisations returns 401 error", async () => {
		console.error = jest.fn();		
		fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
		const wrapper = mount(<MemoryRouter><OrganisationsList /></MemoryRouter>);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

    it("should show error message when fetch organisations returns 500 error", async () => {
		console.error = jest.fn();
		fetch.mockRejectOnce(new Error("500 Internal Server Error"));
		const wrapper = mount(<MemoryRouter><OrganisationsList /></MemoryRouter>);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

	it("should show no results message when initial fetch returns an empty array", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify([]));
		const wrapper = mount(<MemoryRouter><OrganisationsList /></MemoryRouter>);
		await nextTick();
		wrapper.update();
		expect(wrapper.find("p").text()).toEqual("No results found");
	});

	it("should show no results message when search fetch returns an empty array", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify([]));
		const wrapper = mount(
			<MemoryRouter initialEntries={[`/organisations?q=${dummyText}`]}>
                <OrganisationsList />
            </MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find("p").text()).toEqual(`No results found for "${dummyText}"`);
	});

    it("should show 25 (default page amount) or less results by default when paginated", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(organisations2));
		const wrapper = mount(
			<MemoryRouter initialEntries={['/organisations']}>
				<OrganisationsList />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		const listContainer = wrapper.find("[data-qa-sel='list-of-organisations']");
		expect(listContainer.find(".card").length).toBeLessThanOrEqual(25);
	});

	it("should show all results when querystring amount is set as 'all'", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(organisations2));
		const wrapper = mount(
			<MemoryRouter initialEntries={['/organisations?amount=all']}>
				<OrganisationsList />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		const listContainer = wrapper.find("[data-qa-sel='list-of-organisations']");
		expect(listContainer.find(".card").length).toBeLessThanOrEqual(organisations2.length);
	});

	it("should show page 2 when querystring page is set to 2", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(organisations2));
		const wrapper = mount(
			<MemoryRouter initialEntries={['/organisations?page=2']}>
                <OrganisationsList />
            </MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		const listContainer = wrapper.find("[data-qa-sel='list-of-organisations']");
		const organisationsListSummary = wrapper.find(".paginationText");
		expect(organisationsListSummary.text()).toEqual("Showing 26 to 32 of 32 organisations");
		expect(wrapper.find(".pagination__item--count").text()).toEqual("Page 2 of 2");
		expect(listContainer.find(".card").length).toEqual(7);
	});

	it("should sort results by alphabetical descending when querystring sort is set to alpha-desc", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(organisations2));
		const wrapper = mount(
			<MemoryRouter initialEntries={['/organisations?sort=alpha-desc']}>
                <OrganisationsList />
            </MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		const listContainer = wrapper.find("[data-qa-sel='list-of-organisations']");
		const firstResult = listContainer.find(".card").first();
		expect(firstResult.find("a").text()).toEqual("Zulu");
	});

});