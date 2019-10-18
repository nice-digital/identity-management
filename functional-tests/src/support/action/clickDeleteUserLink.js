import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import clickElement from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import checkURL from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkURL";
import isEnabled from "@nice-digital/wdio-cucumber-steps/lib/support/check/isEnabled";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export const clickDeleteUserLink = () => {
  waitForVisible(selectors.adminUserPage.deleteUserLink);
  clickElement("click", "selector", selectors.adminUserPage.deleteUserLink);
};

export default clickDeleteUserLink;