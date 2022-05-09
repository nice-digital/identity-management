import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import { Redirect } from "react-router-dom";
import toJson from "enzyme-to-json";
import { nextTick } from "../../../utils/nextTick";
import { Alert } from "@nice-digital/nds-alert";
import { EditOrganisation } from "../EditOrganisation";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import singleOrganisation from "./singleOrganisation.json";
import organisations from "./organisations.json";

describe("EditOrganisation", () => {
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

    it("should match the snapshot on load", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(singleOrganisation));
        const wrapper = mount(<MemoryRouter><EditOrganisation match={match} /></MemoryRouter>);
        await nextTick();
        wrapper.update();
        expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should disable form submit button when clicked", async () => {
		console.error = jest.fn();
        fetch.mockResponseOnce(JSON.stringify(singleOrganisation));
		fetch.mockResponseOnce(JSON.stringify([]));
		const wrapper = mount(
			<MemoryRouter>
				<EditOrganisation match={match} />
			</MemoryRouter>,
		);
        await nextTick();
		wrapper.update();
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

    it("should redirect if form is submitted without changes", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(singleOrganisation));
		const wrapper = mount(
			<MemoryRouter>
				<EditOrganisation match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("form").prop("onSubmit")({
			preventDefault: () => false, 
			currentTarget: { 
				checkValidity: () => true
			}
		});
		await nextTick();
		wrapper.update();
		expect(wrapper.find(Redirect).exists()).toBe(true);
	});

    it("should show error message when duplicate name fetchData get fails", async () => {
		console.error = jest.fn();
		const error = new Error("Not allowed");
		fetch.mockResponseOnce(JSON.stringify(singleOrganisation));
		fetch.mockRejectOnce(error);
		const wrapper = mount(
			<MemoryRouter>
				<EditOrganisation match={match} />
			</MemoryRouter>,
		);
        await nextTick();
		wrapper.update();
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
        fetch.mockResponseOnce(JSON.stringify(singleOrganisation));
		fetch.mockResponseOnce(JSON.stringify([]));
		const wrapper = mount(
			<MemoryRouter>
				<EditOrganisation match={match} />
			</MemoryRouter>,
		);
        await nextTick();
		wrapper.update();		
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
		fetch.mockResponseOnce(JSON.stringify(singleOrganisation));
		fetch.mockResponseOnce(JSON.stringify(organisations));
		const wrapper = mount(
			<MemoryRouter>
				<EditOrganisation match={match} />
			</MemoryRouter>,
		);
        await nextTick();
		wrapper.update();
		wrapper.find("#orgName").prop("onChange")({
			target: {
				name: "orgName",
				value: "Org 2",
				validity: { valid: true }
			}
		});
		wrapper.find("#orgName").prop("onBlur")({
			target: {
				name: "orgName",
				value: "Org 2",
				validity: { valid: true }
			}
		});
		await nextTick();
		wrapper.update();
		expect(wrapper.find({ label: "Organisation name" }).prop("error")).toEqual(true);
		expect(wrapper.find({ label: "Organisation name" }).prop("errorMessage")).toBe("Cannot change to Org 2, that organisation already exists!");
	});

});