import { waitForDisplayed } from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import {pressButton} from '@nice-digital/wdio-cucumber-steps/lib/support/action/pressButton';
import {setInputField} from '@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField';
import selectors from '../selectors';

export async function editOrganisationName(name: string): Promise<void> {


  waitForDisplayed(selectors.addNewOrganisation.inputOrganisationName, "");
  clickElement('click', 'selector', selectors.addNewOrganisation.inputOrganisationName);
  pressButton("['Ctrl', 'A', 'Delete']");
  setInputField(
    'set',
    name,
    selectors.addNewOrganisation.inputOrganisationName
  );

};

export default editOrganisationName;