import { waitForDisplayed } from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from '../selectors';
import { pause } from '@nice-digital/wdio-cucumber-steps/lib/support/action/pause';

export async function saveNewOrganisationName(): Promise<void> {

  await waitForDisplayed(selectors.addNewOrganisation.saveNewOrgButton, "");
  await clickElement('click', 'selector', selectors.addNewOrganisation.saveNewOrgButton); 

};

export async function saveEditOrgButton(): Promise<void> {

  await pause("5000")
  await waitForDisplayed(selectors.manageOrgPage.saveEditOrgButton, "");
  await clickElement('click', 'selector', selectors.manageOrgPage.saveEditOrgButton);
  await pause("5000");
 
};

export default saveNewOrganisationName;


