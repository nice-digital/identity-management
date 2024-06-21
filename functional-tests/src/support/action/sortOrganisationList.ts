import waitForDisplayed from '../action/waitForDisplayed.js';
import clickElement from '../action/clickElement.js';
import selectors from "../selectors.js";

export async function sortAlphaOrganisationList(): Promise<void> {

	await waitForDisplayed(selectors.organisationListPage.sortAlphaDescending, "");
    await clickElement('click', 'selector', selectors.organisationListPage.sortAlphaDescending);
  
};

export async function sortDateOrganisationList(): Promise<void> {

	await waitForDisplayed(selectors.organisationListPage.sortDateDescending, "");
    await clickElement('click', 'selector', selectors.organisationListPage.sortDateDescending);
};


export default sortAlphaOrganisationList;
