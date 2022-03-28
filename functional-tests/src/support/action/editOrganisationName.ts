import { waitForDisplayed } from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import {pressButton} from '@nice-digital/wdio-cucumber-steps/lib/support/action/pressButton';
import {setInputField} from '@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField';
import selectors from '../selectors';

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