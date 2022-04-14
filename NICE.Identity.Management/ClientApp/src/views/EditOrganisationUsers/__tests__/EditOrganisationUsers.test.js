import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import toJson from "enzyme-to-json";
import { nextTick } from "../../../utils/nextTick";
import { Alert } from "@nice-digital/nds-alert";
import { EditOrganisationUsers } from "../EditOrganisationUsers";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import orgUsers from "./orgUsers.json";
import singleUser from "./singleUser.json";
import users from "./users.json";

describe("EditOrganisationUsers", () => {
    const match = {
        params: { id: 1 },
        isExact: true,
        path: "",
        url: "",
	};

    const orgUsersEmpty = {
        organisationId: 1,
        organisation: { "id": 1, "name": "NICE", "dateAdded": null },
        users: [],
    };
    

	const consoleErrorReset = console.error;

	beforeEach(() => {
		fetch.resetMocks();
		console.error = consoleErrorReset;
        
	});

    it("should show loading message before data has been loaded", () => {
		fetch.mockResponseOnce(JSON.stringify(orgUsers));
		const wrapper = shallow(<EditOrganisationUsers match={match} />);
		expect(wrapper.find("p").text()).toEqual("Loading...");
	});

    it("should match the snapshot after data has been loaded", async () => {
		fetch.mockResponseOnce(JSON.stringify(orgUsers));
		const wrapper = shallow(<EditOrganisationUsers match={match} />);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

    it("should show error message when fetchData function returns 401 error", async () => {
		console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
		const wrapper = mount(
			<MemoryRouter>
				<EditOrganisationUsers match={match} />
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
				<EditOrganisationUsers match={match} />
			</MemoryRouter>,
		);
		await nextTick();
		wrapper.update();
		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
	});

    it("should show no users found message when an organisation has no users assigned", async () => {
        console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(orgUsersEmpty));
		const wrapper = mount(
			<MemoryRouter>
				<EditOrganisationUsers match={match} />
			</MemoryRouter>,
		);
        await nextTick();
		wrapper.update();
        expect(wrapper.find({children: "No users found for this organisation."})).toHaveLength(1);
    });

    it("should add user to table when suggestion is clicked and show confirmation message", async () => {
        console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(orgUsersEmpty));
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		fetch.mockResponseOnce(JSON.stringify({}));
        const userFullName = `${singleUser[0].firstName} ${singleUser[0].lastName}`;
		const wrapper = mount(
			<MemoryRouter>
				<EditOrganisationUsers match={match} />
			</MemoryRouter>,
		);
        await nextTick();
		wrapper.update();
        // const filterSuggestion = wrapper.find('input');
        // filterSuggestion.instance().value = 'a';
        wrapper.find(EditOrganisationUsers).instance().filterUsersSearchList('a');
        await nextTick();
        wrapper.update();
        wrapper.find("a#suggestion1").simulate("click");
        await nextTick();
        wrapper.update();
        expect(wrapper.find("td").first().text()).toEqual(userFullName);
        expect(wrapper.find(Alert).exists()).toBe(true);
        expect(wrapper.find(Alert).text()).toBe("User has been successfully added.");
	});

    it("should remove user from org and show confirmation message when selected from table", async () => {
        console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(orgUsers));
		fetch.mockResponseOnce(JSON.stringify({}));
        const orgUsersCount = orgUsers.users.length;
        const wrapper = mount(
			<MemoryRouter>
				<EditOrganisationUsers match={match} />
			</MemoryRouter>,
		);
        await nextTick();
		wrapper.update();
        expect(wrapper.find("tbody").first().find("tr").length).toEqual(orgUsersCount);
        const lastRemoveUserLink = wrapper.find("[href='#remove-org-user']").last();
        lastRemoveUserLink.simulate('click');
        await nextTick();
        wrapper.update();
        expect(wrapper.find("tbody").first().find("tr").length).toEqual(orgUsersCount-1);
        expect(wrapper.find(Alert).exists()).toBe(true);
        expect(wrapper.find(Alert).text()).toBe("User has been successfully removed.");
    });

    it("should show 3 suggestions when search term has been entered", async () => {
        console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(orgUsersEmpty));
		fetch.mockResponseOnce(JSON.stringify(users));
		const wrapper = mount(
			<MemoryRouter>
				<EditOrganisationUsers match={match} />
			</MemoryRouter>,
		);
        await nextTick();
		wrapper.update();
        wrapper.find(EditOrganisationUsers).instance().filterUsersSearchList('a');
        await nextTick();
		wrapper.update();
        expect(wrapper.find("[href='#add-org-user']").length).toEqual(3);
    });

    it("should hide suggestions when clicked off", async () => {
        console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(orgUsersEmpty));
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		const wrapper = mount(
			<MemoryRouter>
				<EditOrganisationUsers match={match} />
			</MemoryRouter>,
		);
        await nextTick();
		wrapper.update();
        const filterSuggestion = wrapper.find('input');
        wrapper.find(EditOrganisationUsers).instance().filterUsersSearchList('a');
        await nextTick();
        wrapper.update();
        expect(wrapper.find("[href='#add-org-user']").length).toEqual(1);
        filterSuggestion.simulate("blur");
        expect(wrapper.find("[href='#add-org-user']").length).toEqual(0);
    });

    it("should hide existing confirmation/alert when suggestions search has been initiated again", async () => {
        console.error = jest.fn();
		fetch.mockResponseOnce(JSON.stringify(orgUsersEmpty));
		fetch.mockResponseOnce(JSON.stringify(singleUser));
		fetch.mockResponseOnce(JSON.stringify({}));
        fetch.mockResponseOnce(JSON.stringify(singleUser));
        const wrapper = mount(
			<MemoryRouter>
				<EditOrganisationUsers match={match} />
			</MemoryRouter>,
		);
        await nextTick();
		wrapper.update();
        wrapper.find(EditOrganisationUsers).instance().filterUsersSearchList('a');
        await nextTick();
        wrapper.update();
        wrapper.find("a#suggestion1").simulate("click");
        await nextTick();
        wrapper.update();
        expect(wrapper.find(Alert).exists()).toBe(true);
        wrapper.find(EditOrganisationUsers).instance().filterUsersSearchList('k');
        await nextTick();
        wrapper.update();
        expect(wrapper.find(Alert).exists()).toBe(false);
    });

});