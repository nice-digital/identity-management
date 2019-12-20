import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import fetchMock from "fetch-mock";
import toJson from "enzyme-to-json";

import { nextTick } from "../../../utils/nextTick";
import singleUser from "./singleUser.json";
import singleService from "./singleService.json";
import { SelectEnvironment } from "../SelectEnvironment";

import * as fetchData from "../../../helpers/fetchData";
import { Endpoints } from "../../../data/endpoints";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

describe("SelectEnvironment", () => {
	const match = {
		params: { id: 1, serviceId: 1 },
		isExact: true,
		path: "",
		url: "",
	};

	afterEach(fetchMock.reset);

	it("should show loading message before data has been loaded", () => {
		fetchMock.get("*", {});
		const wrapper = shallow(<SelectEnvironment match={match} />);
		expect(wrapper.find("p").text()).toEqual("Loading...");
	});

	it("should call fetchData during componentDidMount", () => {
		fetchMock.get("*", {});
		const wrapper = shallow(<SelectEnvironment match={match} />);
		const instance = wrapper.instance();
		jest.spyOn(fetchData, "fetchData");
		instance.componentDidMount();
		expect(fetchData.fetchData).toHaveBeenCalledTimes(1);
	});

	it("should match the snapshot after data has been loaded", async () => {
		fetchMock.get(Endpoints.user(match.params.id), singleUser);
		fetchMock.get(Endpoints.service(match.params.serviceId), singleService);
		const wrapper = shallow(<SelectEnvironment match={match} />);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when user fetchData function returns 500 error", async () => {
		fetchMock.get(Endpoints.user(match.params.id), 500);
		fetchMock.get(Endpoints.service(match.params.serviceId), singleService);
		const wrapper = mount(
			<MemoryRouter>
				<SelectEnvironment match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

	it("should show error message when user fetchData function returns 401 error", async () => {
		fetchMock.get(Endpoints.user(match.params.id), 401);
		fetchMock.get(Endpoints.service(match.params.serviceId), singleService);
		const wrapper = mount(
			<MemoryRouter>
				<SelectEnvironment match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

	it("should show error message when services fetchData function returns 500 error", async () => {
		fetchMock.get(Endpoints.user(match.params.id), singleUser);
		fetchMock.get(Endpoints.service(match.params.serviceId), 500);
		const wrapper = mount(
			<MemoryRouter>
				<SelectEnvironment match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

	it("should show error message when services fetchData function returns 401 error", async () => {
		fetchMock.get(Endpoints.user(match.params.id), singleUser);
		fetchMock.get(Endpoints.service(match.params.serviceId), 401);
		const wrapper = mount(
			<MemoryRouter>
				<SelectEnvironment match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});
});
