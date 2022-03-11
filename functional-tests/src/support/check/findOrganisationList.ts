import { waitForDisplayed } from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import selectors from "../selectors";


export async function findOrganisationList(): Promise<void> {
    await waitForDisplayed(selectors.organisationListPage.firstOrgCard, "");
    await clickElement("click", "selector", selectors.organisationListPage.firstOrgCard);
  };
  
export default findOrganisationList;










