import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import selectors from "../selectors";

export async function clickDeleteUserLink(): Promise<void> {
  await waitForDisplayed(selectors.adminUserPage.lockUserButton, "");
  await clickElement("click", "selector", selectors.adminUserPage.lockUserButton);
};

export async function clickAddRoleButton(): Promise<void> {
  await waitForDisplayed(selectors.adminUserPage.AddRoleButton, "");
  await clickElement("click", "selector", selectors.adminUserPage.AddRoleButton);
};

export default clickDeleteUserLink;