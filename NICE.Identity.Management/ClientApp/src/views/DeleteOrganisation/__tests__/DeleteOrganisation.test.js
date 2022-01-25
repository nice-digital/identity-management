import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";

import { nextTick } from "../../../utils/nextTick";
import singleOrganisation from "./singleOrganisation.json";
import { DeleteOrganisation } from "../DeleteOrganisation";

import { Endpoints } from "../../../data/endpoints";

import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

describe("DeleteOrgaisation", () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};

	const consoleErrorReset = console.error;

	beforeEach(() => {
		fetch.resetMocks();
		console.error = consoleErrorReset;
	});


	it("should show loading message before data has been loaded", () => {
		fetch.mockResponseOnce(JSON.stringify(singleOrganisation));
		const wrapper = shallow(<DeleteOrganisation match={match} />);
		expect(wrapper.find("p").text()).toEqual("Loading...");
	});

	it("should call fetchData during componentDidMount", () => {
		fetch.mockResponseOnce(JSON.stringify(singleOrganisation));
		const wrapper = mount(<MemoryRouter><DeleteOrganisation match={match} /></MemoryRouter>);
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
		const wrapper = shallow(<DeleteOrganisation match={match} />);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when fetchData function returns 401 error", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
		const wrapper = mount(
			<MemoryRouter>
				<DeleteOrganisation match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when fetchData function returns 500 error", async () => {
		console.error = jest.fn();
		fetch.mockRejectOnce(new Error("500 Internal Server Error"));
		const wrapper = mount(
			<MemoryRouter>
				<DeleteOrganisation match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when fetchData delete fails", async () => {
		console.error = jest.fn();
		const error = new Error("Not allowed");
		fetch.mockResponseOnce(JSON.stringify({}));
		fetch.mockRejectOnce(error);
		const wrapper = mount(
			<MemoryRouter>
				<DeleteOrganisation match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("button").simulate("click");
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

	it("should show error message when fetchData delete returns non-200 error", async () => {
		console.error = jest.fn();
		const serverErrorMessage = "Not authorized";
		fetch.mockResponseOnce(JSON.stringify({}));
		fetch.mockResponseOnce({ message: serverErrorMessage }, { status: 401 });
		const wrapper = mount(
			<MemoryRouter>
				<DeleteOrganisation match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("button").simulate("click");
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

	it("should disable delete button when clicked", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(singleOrganisation));
		fetch.mockResponseOnce(JSON.stringify({}));
		const wrapper = mount(
			<MemoryRouter>
				<DeleteOrganisation match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("button").simulate("click");
		expect(wrapper.find("button").props().disabled).toEqual(true);
		expect(wrapper.find("button").text()).toEqual("Loading...");
	});

	it("should display confirmation message once fetchData delete is successfully complete", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(singleOrganisation));
		fetch.mockResponseOnce(JSON.stringify({}));
		const wrapper = mount(
			<MemoryRouter>
				<DeleteOrganisation match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("button").simulate("click");
		await nextTick();
		wrapper.update();
		expect(wrapper.find("h1").text()).toEqual("Organisation deleted");
	});
});
