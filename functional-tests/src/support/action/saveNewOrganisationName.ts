import { waitForDisplayed } from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import {pressButton} from '@nice-digital/wdio-cucumber-steps/lib/support/action/pressButton';
import {setInputField} from '@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField';
import selectors from '../selectors';

export async function saveNewOrganisationName(): Promise<void> {

  waitForDisplayed(selectors.addNewOrganisation.saveNewOrgButton, "");
  clickElement('click', 'selector', selectors.addNewOrganisation.saveNewOrgButton); 

};

export default saveNewOrganisationName;