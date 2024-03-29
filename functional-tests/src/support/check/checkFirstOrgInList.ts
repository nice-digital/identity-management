import { waitForDisplayed } from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {checkContainsText} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import {pause} from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export async function checkFirstOrgInList(countText: string): Promise<void> {
    await waitForDisplayed(selectors.organisationListPage.organisationlist, "");
    await waitForDisplayed(selectors.organisationListPage.firstOrgCard, "");
    await checkContainsText("element", selectors.organisationListPage.firstOrgCard, "", countText);
    await pause("5000");
  };

export default checkFirstOrgInList;
