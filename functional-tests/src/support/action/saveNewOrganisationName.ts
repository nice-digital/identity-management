import waitForDisplayed from "../action/waitForDisplayed.js";
import clickElement from "../action/clickElement.js";
import pause from "../action/pause.js";
import selectors from '../selectors.js';


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


