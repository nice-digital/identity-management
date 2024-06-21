import waitForDisplayed from "../action/waitForDisplayed.js";
import clickElement from "../action/clickElement.js";
import selectors from "../selectors.js";


export async function findOrganisationList(): Promise<void> {
    await waitForDisplayed(selectors.organisationListPage.firstOrgCard, "");
    await clickElement("click", "selector", selectors.organisationListPage.firstOrgCard);
  };
  
export default findOrganisationList;










