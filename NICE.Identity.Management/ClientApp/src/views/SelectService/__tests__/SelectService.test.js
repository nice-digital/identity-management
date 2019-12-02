import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import fetchMock from "fetch-mock";
import toJson from "enzyme-to-json";

import { nextTick } from "../../../utils/nextTick";
import singleUser from "./singleUser.json";
import services from "./services.json";
import { SelectService } from "../SelectService";

import * as fetchData from "../../../helpers/fetchData";
import { Endpoints } from "../../../data/endpoints";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

describe("SelectService", () => {
	const match = {
		params: { id: 1 },
		isExact: true,
		path: "",
		url: "",
	};

	afterEach(fetchMock.reset);

	it("should show loading message before data has been loaded", () => {
		fetchMock.get("*", {});
		const wrapper = shallow(<SelectService match={match} />);
		expect(wrapper.find("p").text()).toEqual("Loading...");
	});

	it("should call fetchData during componentDidMount", () => {
		fetchMock.get("*", {});
		const wrapper = shallow(<SelectService match={match} />);
		const instance = wrapper.instance();
		jest.spyOn(fetchData, "fetchData");
		instance.componentDidMount();
		expect(fetchData.fetchData).toHaveBeenCalledTimes(1);
	});

	it("should match the snapshot after data has been loaded", async () => {
		fetchMock.get(Endpoints.user(match.params.id), singleUser);
		fetchMock.get(Endpoints.servicesList, services, { overwriteRoutes: false });
		const wrapper = shallow(<SelectService match={match} />);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when user fetchData function returns 500 error", async () => {
		fetchMock.get(Endpoints.user(match.params.id), 500);
		fetchMock.get(Endpoints.servicesList, services, { overwriteRoutes: false });
		const wrapper = mount(
			<MemoryRouter>
				<SelectService match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

	it("should show error message when user fetchData function returns 401 error", async () => {
		fetchMock.get(Endpoints.user(match.params.id), 401);
		fetchMock.get(Endpoints.servicesList, services, { overwriteRoutes: false });
		const wrapper = mount(
			<MemoryRouter>
				<SelectService match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

	it("should show error message when services fetchData function returns 500 error", async () => {
		fetchMock.get(Endpoints.user(match.params.id), singleUser);
		fetchMock.get(Endpoints.servicesList, 500, { overwriteRoutes: false });
		const wrapper = mount(
			<MemoryRouter>
				<SelectService match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

	it("should show error message when services fetchData function returns 401 error", async () => {
		fetchMock.get(Endpoints.user(match.params.id), singleUser);
		fetchMock.get(Endpoints.servicesList, 401, { overwriteRoutes: false });
		const wrapper = mount(
			<MemoryRouter>
				<SelectService match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});
});
