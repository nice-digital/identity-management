import clickElement from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import selectors from "../selectors";

export const clickDeleteUserLink = () => {
  waitForVisible(selectors.adminUserPage.lockUserButton);
  clickElement("click", "selector", selectors.adminUserPage.lockUserButton);
};

export const clickAddRoleButton = () => {
  waitForVisible(selectors.adminUserPage.AddRoleButton);
  clickElement("click", "selector", selectors.adminUserPage.AddRoleButton);
};

export default clickDeleteUserLink;