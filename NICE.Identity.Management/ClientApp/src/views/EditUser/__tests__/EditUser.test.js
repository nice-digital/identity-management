import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { Redirect } from "react-router-dom";
import toJson from "enzyme-to-json";
import { Alert } from "@nice-digital/nds-alert";
import { EditUser } from "../EditUser";
import singleUser from "./singleUser.json";
import singleUserWithEPPIEmail from "./singleUserWithEPPIEmail.json";
import { nextTick } from "../../../utils/nextTick";

import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

describe("EditUser", () => {
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
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		const wrapper = mount(<MemoryRouter initialEntries={["/users/1/edit"]}><EditUser match={match} /></MemoryRouter>);
		expect(wrapper.find("p").text()).toEqual("Loading...");
	});

    it("should match the snapshot after data has been loaded", async () => {
		console.error = jest.fn();
        fetch.mockResponseOnce(JSON.stringify(singleUser));
        const wrapper = mount(<MemoryRouter><EditUser match={match} /></MemoryRouter>);
        await nextTick();
        wrapper.update();
        expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
    });

    it("should disable form submit button when clicked", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		fetch.mockResponseOnce(JSON.stringify({}));
		const wrapper = mount(
			<MemoryRouter>
				<EditUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("form").simulate("submit");
		expect(wrapper.find("button").props().disabled).toEqual(true);
		expect(wrapper.find("button").text()).toEqual("Loading...");
	});

	it("should redirect if form is submitted without changes", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		const wrapper = mount(
			<MemoryRouter>
				<EditUser match={match} />
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

	it("should show error message when useFetch get call returns 401 error", async () => {	
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
		const wrapper = mount(
			<MemoryRouter>
				<EditUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when useFetch get call returns 500 error", async () => {
		console.error = jest.fn();
		fetch.mockRejectOnce(new Error("500 Internal Server Error"));
		const wrapper = mount(
			<MemoryRouter>
				<EditUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

	it("should show error message when useFetch patch fails", async () => {
		console.error = jest.fn();
		const error = new Error("Not allowed");
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		fetch.mockRejectOnce(error);
		const wrapper = mount(
			<MemoryRouter>
				<EditUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("#emailAddress").prop("onChange")({
			target: {
				name: "emailAddress",
				value: "john.holland@nice.org.uk",
				validity: { valid: true }
			}
		});
		await nextTick();
		wrapper.update();
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
	
	it("should show validation error when email is invalid format", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		const wrapper = mount(
			<MemoryRouter>
				<EditUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("#emailAddress").prop("onChange")({
			target: {
				name: "emailAddress",
				value: "john.holland@",
				validity: { valid: false }
			}
		});
		await nextTick();
		wrapper.update();		
		wrapper.find("#emailAddress").prop("onBlur")({
			target: {
				name: "emailAddress",
				value: "john.holland@",
				validity: { valid: false }
			}
		});
		await nextTick();
		wrapper.update();
		expect(wrapper.find({ label: "Email address" }).prop("error")).toEqual(true);
	});

	it("should show validation error when email is in use already", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		fetch.mockResponseOnce(JSON.stringify({ title: "Email address is already in use", status: 422 }), { status: 422 });
		const wrapper = mount(
			<MemoryRouter>
				<EditUser match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		wrapper.find("#emailAddress").prop("onChange")({
			target: {
				name: "emailAddress",
				value: "john.holland@hotmail.com",
				validity: { valid: true }
			}
		});
		await nextTick();
		wrapper.update();		
		wrapper.find("form").prop("onSubmit")({
			preventDefault: () => false, 
			currentTarget: { 
				checkValidity: () => true
			},
		});
		await nextTick();
		wrapper.update();
		await nextTick();
		wrapper.update();
		expect(wrapper.find({ label: "Email address" }).prop("error")).toEqual(true);
		expect(wrapper.find({ label: "Email address" }).prop("errorMessage")).toBe("Email address is already in use");
	});

	it("should display alert message if editing an EPPI user", async () => {
        console.error = jest.fn();
        fetch.mockResponseOnce(JSON.stringify(singleUserWithEPPIEmail));
        const wrapper = mount(
            <MemoryRouter>
                <EditUser match={match} />
            </MemoryRouter>,
        );
        await nextTick();
        wrapper.update();
        expect(wrapper.find("p").text()).toEqual("This user may have access to EPPI R5 - only a professional email address can be associated to this profile. Please verify via the EPPI user admin page before changing the email address.");
        expect(wrapper.find(Alert).exists()).toBe(true);
    });
});
