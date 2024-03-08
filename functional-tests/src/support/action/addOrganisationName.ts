import waitForDisplayed from "../action/waitForDisplayed.js";
import clickElement from "../action/clickElement.js";
import setInputField from "../action/setInputField.js";
import selectors from '../selectors';



export async function addOrganisationName(name: string): Promise<void> {

  await waitForDisplayed(selectors.addNewOrganisation.inputOrganisationName, "");
  await clickElement('click', 'selector', selectors.addNewOrganisation.inputOrganisationName);
  await browser.keys(['Control', 'a', 'Delete']);
  await setInputField(
    "set",
    name,
    selectors.addNewOrganisation.inputOrganisationName
  );
};

export async function editOrganisationName(name: string): Promise<void> {
await waitForDisplayed(selectors.manageOrgPage.editOrganisationName, "");
await clickElement('click', 'selector', selectors.manageOrgPage.editOrganisationName);
await browser.keys(['Control', 'a', 'Delete']);
await setInputField(
  'set',
  name,
  selectors.manageOrgPage.editOrganisationName
);

};

export default addOrganisationName;