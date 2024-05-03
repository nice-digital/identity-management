import waitForDisplayed from "../action/waitForDisplayed.js";
import clickElement from "../action/clickElement.js";
import setInputField from "../action/setInputField.js";
import selectors from '../selectors.js';

export async function editOrganisationName(name: string): Promise<void> {


  await waitForDisplayed(selectors.addNewOrganisation.inputOrganisationName, "");
  await clickElement('click', 'selector', selectors.addNewOrganisation.inputOrganisationName);
  await browser.keys(['Control', 'a', 'Delete']);
  await setInputField(
    'set',
    name,
    selectors.addNewOrganisation.inputOrganisationName
  );

};

export default editOrganisationName;