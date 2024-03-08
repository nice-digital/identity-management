import waitForDisplayed from "../action/waitForDisplayed.js";
import clickElement from "../action/clickElement.js";
import setInputField from "../action/setInputField.js";
import pause from "../action/pause.js";
import selectors from '../selectors';

export async function addNewOrganisation(): Promise<void> {

  await waitForDisplayed(selectors.organisationListPage.addNewOrganisation, "");
  await clickElement('click', 'selector', selectors.organisationListPage.addNewOrganisation);
};

export async function editOrganisationButton(): Promise<void> {

  await waitForDisplayed(selectors.manageOrgPage.editOrganisation, "");
  await clickElement('click', 'selector', selectors.manageOrgPage.editOrganisation);
};

export async function editUsersButton(): Promise<void> {

  await waitForDisplayed(selectors.manageOrgPage.editUsers, "");
  await clickElement('click', 'selector', selectors.manageOrgPage.editUsers);
};

export async function searchAddUser(name: string): Promise<void> {
	await setInputField("set", name, "[data-qa-sel='filter-suggestions-input']");
  await waitForDisplayed(selectors.manageOrgPage.addUser, "");
  await clickElement('click', 'selector', selectors.manageOrgPage.addUser);
	await pause("2000");
};
"[data-qa-sel='suggestions-for-add-organisation-user']"



export default addNewOrganisation;


