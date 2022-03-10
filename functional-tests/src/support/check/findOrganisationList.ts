import { waitForDisplayed } from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import selectors from "../selectors";


export async function findOrganisationList(): Promise<void> {
    waitForDisplayed(selectors.organisationListPage.firstOrgCard, "");
    clickElement("click", "selector", selectors.organisationListPage.firstOrgCard);
  };
  
export default findOrganisationList;










