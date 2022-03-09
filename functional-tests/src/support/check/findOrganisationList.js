
import clickElement from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import selectors from "../selectors";


export const findOrganisationList = () => {
    waitForVisible(selectors.organisationListPage.firstOrgCard);
    clickElement("click", "selector", selectors.organisationListPage.firstOrgCard);
  };
export default findOrganisationList;










