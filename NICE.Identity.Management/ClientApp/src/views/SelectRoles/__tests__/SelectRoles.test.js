import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import fetchMock from "fetch-mock";
import toJson from "enzyme-to-json";

import { nextTick } from "../../../utils/nextTick";
import singleUser from "./singleUser.json";
import singleUserRoles from "./singleUserRoles.json";
import { SelectRoles } from "../SelectRoles";

import * as fetchData from "../../../helpers/fetchData";
import { Endpoints } from "../../../data/endpoints";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { AddRoleConfirmation } from "../../../components/AddRoleConfirmation/AddRoleConfirmation";

describe("SelectRoles", () => {
	const match = {
		params: { id: 1, serviceId: 1, websiteId: 1 },
		isExact: true,
		path: "",
		url: "",
	};

	afterEach(fetchMock.reset);

	it("should show loading message before data has been loaded", () => {
		fetchMock.get("*", {});
		const wrapper = shallow(<SelectRoles match={match} />);
		expect(wrapper.find("p").text()).toEqual("Loading...");
	});

	it("should call fetchData during componentDidMount", () => {
		fetchMock.get("*", {});
		const wrapper = shallow(<SelectRoles match={match} />);
		const instance = wrapper.instance();
		jest.spyOn(fetchData, "fetchData");
		instance.componentDidMount();
		expect(fetchData.fetchData).toHaveBeenCalledTimes(1);
	});

	it("should match the snapshot after data has been loaded", async () => {
		fetchMock.get(Endpoints.user(match.params.id), singleUser);
		fetchMock.get(
			Endpoints.userRolesByWebsite(match.params.id, match.params.websiteId),
			singleUserRoles,
			{ overwriteRoutes: false },
		);
		const wrapper = shallow(<SelectRoles match={match} />);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when user fetchData function returns 500 error", async () => {
		fetchMock.get(Endpoints.user(match.params.id), 500);
		fetchMock.get(
			Endpoints.userRolesByWebsite(match.params.id, match.params.websiteId),
			singleUserRoles,
			{ overwriteRoutes: false },
		);
		const wrapper = mount(
			<MemoryRouter>
				<SelectRoles match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

	it("should show error message when user fetchData function returns 401 error", async () => {
		fetchMock.get(Endpoints.user(match.params.id), 401);
		fetchMock.get(
			Endpoints.userRolesByWebsite(match.params.id, match.params.websiteId),
			singleUserRoles,
			{ overwriteRoutes: false },
		);
		const wrapper = mount(
			<MemoryRouter>
				<SelectRoles match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

	it("should show error message when services fetchData function returns 500 error", async () => {
		fetchMock.get(Endpoints.user(match.params.id), singleUser);
		fetchMock.get(
			Endpoints.userRolesByWebsite(match.params.id, match.params.websiteId),
			500,
			{ overwriteRoutes: false },
		);
		const wrapper = mount(
			<MemoryRouter>
				<SelectRoles match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

	it("should show error message when services fetchData function returns 401 error", async () => {
		fetchMock.get(Endpoints.user(match.params.id), singleUser);
		fetchMock.get(
			Endpoints.userRolesByWebsite(match.params.id, match.params.websiteId),
			401,
			{ overwriteRoutes: false },
		);
		const wrapper = mount(
			<MemoryRouter>
				<SelectRoles match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

	it("should display confirmation message once fetchData patch is successfully complete", async () => {
		fetchMock.get(Endpoints.user(match.params.id), singleUser);
		fetchMock.get(
			Endpoints.userRolesByWebsite(match.params.id, match.params.websiteId),
			singleUserRoles,
			{ overwriteRoutes: false },
		);
		fetchMock.patch("*", singleUserRoles);
		const wrapper = mount(
			<MemoryRouter>
				<SelectRoles match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("form").simulate("submit");
		await nextTick();
		wrapper.update();
		expect(wrapper.find(AddRoleConfirmation).exists()).toBe(true);
	});

	it("should disable button when form submitted", async () => {
		fetchMock.get(Endpoints.user(match.params.id), singleUser);
		fetchMock.get(
			Endpoints.userRolesByWebsite(match.params.id, match.params.websiteId),
			singleUserRoles,
			{ overwriteRoutes: false },
		);
		fetchMock.patch("*", {});
		const wrapper = mount(
			<MemoryRouter>
				<SelectRoles match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("form").simulate("submit");
		wrapper.update();
		expect(wrapper.find("button").props().disabled).toEqual(true);
		expect(wrapper.find("button").text()).toEqual("Loading...");
	});

	it("should disable all checkboxes when form submitted", async () => {
		fetchMock.get(Endpoints.user(match.params.id), singleUser);
		fetchMock.get(
			Endpoints.userRolesByWebsite(match.params.id, match.params.websiteId),
			singleUserRoles,
			{ overwriteRoutes: false },
		);
		fetchMock.patch("*", {});
		const wrapper = mount(
			<MemoryRouter>
				<SelectRoles match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("form").simulate("submit");
		wrapper.update();
		wrapper.find({ type: "checkbox" }).forEach(checkbox => {
			expect(checkbox.props().disabled).toEqual(true);
		});
	});

	// fires handleCheckboxChange after checkbox changed

	// it("should trigger handleCheckboxChange prop function on checkbox change ", async () => {
	// 	fetchMock.get(Endpoints.user(match.params.id), singleUser);
	// 	fetchMock.get(
	// 		Endpoints.userRolesByWebsite(match.params.id, match.params.websiteId),
	// 		singleUserRoles,
	// 	);
	// 	const wrapper = mount(
	// 		<MemoryRouter>
	// 			<SelectRoles match={match} />
	// 		</MemoryRouter>,
	// 	);
	// 	await nextTick();
	// 	wrapper.update();
	// 	const spy = jest.spyOn(SelectRoles.prototype, "handleCheckboxChange");
	// 	wrapper.update();
	// 	wrapper
	// 		.find({ type: "checkbox" })
	// 		.first()
	// 		.simulate("change");
	// 	await nextTick();
	// 	expect(spy).toHaveBeenCalledTimes(1);
	// });
});
