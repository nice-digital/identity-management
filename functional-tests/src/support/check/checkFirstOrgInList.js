import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import selectors from "../selectors";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";



export const checkFirstOrgInList = (countText) => {
    waitForVisible(selectors.organisationListPage.organisationlist);
    waitForVisible(selectors.organisationListPage.firstOrgCard);
    checkContainsText(-
        "element", selectors.organisationListPage.firstOrgCard, countText);
        pause(5000);
  };

export default checkFirstOrgInList;
