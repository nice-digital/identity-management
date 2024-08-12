import waitForDisplayed  from '../action/waitForDisplayed.js';
import checkContainsText from '../check/checkContainsText.js';
import pause from '../action/pause.js';
import selectors from "../selectors.js";

export async function checkFirstOrgInList(countText: string): Promise<void> {
    await waitForDisplayed(selectors.organisationListPage.organisationlist, "");
    await waitForDisplayed(selectors.organisationListPage.firstOrgCard, "");
    await checkContainsText("element", selectors.organisationListPage.firstOrgCard, "", countText);
    await pause("5000");
  };

export default checkFirstOrgInList;
