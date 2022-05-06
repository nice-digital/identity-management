import { waitForDisplayed } from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from '../selectors';

export async function saveNewOrganisationName(): Promise<void> {

  await waitForDisplayed(selectors.addNewOrganisation.saveNewOrgButton, "");
  await clickElement('click', 'selector', selectors.addNewOrganisation.saveNewOrgButton); 

};

export async function saveEditOrgButton(): Promise<void> {

  await waitForDisplayed(selectors.manageOrgPage.saveEditOrgButton, "");
  await clickElement('click', 'selector', selectors.manageOrgPage.saveEditOrgButton);
 
};

export default saveNewOrganisationName;


