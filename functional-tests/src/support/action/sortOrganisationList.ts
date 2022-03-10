import { waitForDisplayed } from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import selectors from "../selectors";

export async function sortAlphaOrganisationList(): Promise<void> {

	waitForDisplayed(selectors.organisationListPage.sortAlphaDescending, "");
    clickElement('click', 'selector', selectors.organisationListPage.sortAlphaDescending);
  
};

export async function sortDateOrganisationList(): Promise<void> {

	waitForDisplayed(selectors.organisationListPage.sortDateDescending, "");
    clickElement('click', 'selector', selectors.organisationListPage.sortDateDescending);
};


export default sortAlphaOrganisationList;
