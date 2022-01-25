import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";

import { Organisation } from "../Organisation";
import { Endpoints } from "../../../data/endpoints";
import singleOrganisation from "./singleOrganisation.json";
import singleUser from "./singleUser.json";
import { nextTick } from "../../../utils/nextTick";

describe("Organisation", () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};

	const location = {
		state: {}
	};

	const consoleErrorReset = console.error;

	beforeEach(() => {
		fetch.resetMocks();
		console.error = consoleErrorReset;
	});

	it("should show loading message before data has been loaded", () => {
		fetch.mockResponseOnce(JSON.stringify(singleOrganisation));
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		const wrapper = shallow(<Organisation location={location} match={match} />);
		expect(wrapper.find(".OrganisationDateAddedLoadingMsg").text()).toEqual("Loading...")
		expect(wrapper.find(".OrganisationUsersListLoadingMsg").text()).toEqual("Loading...")
	});

	it("should call fetch during componentDidMount", () => {
		fetch.mockResponseOnce(JSON.stringify(singleOrganisation));
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		const wrapper = mount(<MemoryRouter><Organisation location={location} match={match} /></MemoryRouter>);
		const spy = jest.spyOn(wrapper.instance(), "componentDidMount");
		wrapper.instance().componentDidMount();
		wrapper.update();
		expect(spy).toHaveBeenCalled();
		expect(fetch.mock.calls.length).toEqual(1);
		expect(fetch.mock.calls[0][0]).toEqual(Endpoints.organisation(match.params.id));
		spy.mockClear();
	});

	it("should match the snapshot after data has been loaded", async () => {
		fetch.mockResponseOnce(JSON.stringify(singleOrganisation));
		fetch.mockResponseOnce(JSON.stringify(singleUser));
        const wrapper = shallow(<Organisation location={location} match={match} />);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when fetch returns 401 error", async () => {
		console.error = jest.fn();		
		fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
		fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
		const wrapper = mount(
			<MemoryRouter>
				<Organisation location={location} match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();		
	});

	it("should show error message when fetch returns 500 error", async () => {
		console.error = jest.fn();
		fetch.mockRejectOnce(new Error("500 Internal Server Error"));
		fetch.mockRejectOnce(new Error("500 Internal Server Error"));
		const wrapper = mount(
			<MemoryRouter>
				<Organisation location={location} match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});
});
