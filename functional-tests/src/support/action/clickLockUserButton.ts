import clickElement from "../action/clickElement.js";
import waitForDisplayed from "../action/waitForDisplayed.js";
import selectors from "../selectors.js";

export async function clickDeleteUserLink(): Promise<void> {
  await waitForDisplayed(selectors.adminUserPage.lockUserButton, "");
  await clickElement("click", "selector", selectors.adminUserPage.lockUserButton);
};

export async function clickAddRoleButton(): Promise<void> {
  await waitForDisplayed(selectors.adminUserPage.AddRoleButton, "");
  await clickElement("click", "selector", selectors.adminUserPage.AddRoleButton);
};

export default clickDeleteUserLink;