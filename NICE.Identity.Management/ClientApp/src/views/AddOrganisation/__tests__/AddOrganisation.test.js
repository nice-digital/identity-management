import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";
import { nextTick } from "../../../utils/nextTick";
import { Alert } from "@nice-digital/nds-alert";
import { AddOrganisation } from "../AddOrganisation";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import organisations from "./organisations.json";

describe("AddOrganisation", () => {
	const consoleErrorReset = console.error;

	beforeEach(() => {
		fetch.resetMocks();
		console.error = consoleErrorReset;
	});

    it("should match the snapshot on load", () => {
		const wrapper = shallow(<AddOrganisation />);
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should disable form submit button when clicked", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify({}));
		const wrapper = mount(
			<MemoryRouter>
				<AddOrganisation />
			</MemoryRouter>,
		);
		wrapper.find("#orgName").prop("onChange")({
			target: {
				name: "orgName",
				value: "Org Ninety Nine",
				validity: { valid: true }
			}
		});
		wrapper.find("form").simulate("submit");
		expect(wrapper.find("button").props().disabled).toEqual(true);
		expect(wrapper.find("button").text()).toEqual("Loading...");
	});

	it("should display confirmation message once fetchData post is successfully complete", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify({}));
		const wrapper = mount(
			<MemoryRouter>
				<AddOrganisation />
			</MemoryRouter>,
		);
		wrapper.find("#orgName").prop("onChange")({
			target: {
				name: "orgName",
				value: "Org Ninety Nine",
				validity: { valid: true }
			}
		});
		wrapper.find("form").prop("onSubmit")({
			preventDefault: () => false, 
			currentTarget: { 
				checkValidity: () => true
			},
		});
		await nextTick();
		wrapper.update();
		expect(wrapper.find("p").text()).toEqual("New organisation has been added successfully.");
		expect(wrapper.find(Alert).exists()).toBe(true);
	});

    it("should show error message when fetchData post fails", async () => {
		console.error = jest.fn();
		const error = new Error("Not allowed");
		fetch.mockRejectOnce(error);
		const wrapper = mount(
			<MemoryRouter>
				<AddOrganisation />
			</MemoryRouter>,
		);
		wrapper.find("#orgName").prop("onChange")({
			target: {
				name: "orgName",
				value: "Org Ninety Nine",
				validity: { valid: true }
			}
		});
		wrapper.find("form").prop("onSubmit")({
			preventDefault: () => false, 
			currentTarget: { 
				checkValidity: () => true
			},
		});
		await nextTick();
		wrapper.update();
		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
	});

	it("should show validation error when name is invalid format", async () => {
		console.error = jest.fn();
		const wrapper = mount(
			<MemoryRouter>
				<AddOrganisation />
			</MemoryRouter>,
		);
		wrapper.find("#orgName").prop("onChange")({
			target: {
				name: "orgName",
				value: "a",
				validity: { valid: false }
			}
		});
		wrapper.find("#orgName").prop("onBlur")({
			target: {
				name: "orgName",
				value: "a",
				validity: { valid: false }
			}
		});
		await nextTick();
		wrapper.update();
		expect(wrapper.find({ label: "Organisation name" }).prop("error")).toEqual(true);
	});

	it("should show validation error when org name is in use already", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(organisations));
		const wrapper = mount(
			<MemoryRouter>
				<AddOrganisation />
			</MemoryRouter>,
		);
		wrapper.find("#orgName").prop("onChange")({
			target: {
				name: "orgName",
				value: "Org 1",
				validity: { valid: true }
			}
		});
		wrapper.find("#orgName").prop("onBlur")({
			target: {
				name: "orgName",
				value: "Org 1",
				validity: { valid: true }
			}
		});
		await nextTick();
		wrapper.update();
		expect(wrapper.find({ label: "Organisation name" }).prop("error")).toEqual(true);
		expect(wrapper.find({ label: "Organisation name" }).prop("errorMessage")).toBe("Cannot add Org 1, that organisation already exists!");
	});

});