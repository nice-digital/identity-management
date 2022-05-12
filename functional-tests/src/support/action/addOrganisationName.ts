import {waitForDisplayed} from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed'
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from '../selectors';
import {setInputField} from '@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField';



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