import { waitForDisplayed } from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import selectors from "../selectors";

export async function sortAlphaOrganisationList(): Promise<void> {

	await waitForDisplayed(selectors.organisationListPage.sortAlphaDescending, "");
    await clickElement('click', 'selector', selectors.organisationListPage.sortAlphaDescending);
  
};

export async function sortDateOrganisationList(): Promise<void> {

	await waitForDisplayed(selectors.organisationListPage.sortDateDescending, "");
    await clickElement('click', 'selector', selectors.organisationListPage.sortDateDescending);
};


export default sortAlphaOrganisationList;
