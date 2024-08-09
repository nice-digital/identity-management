import clickElement from "../action/clickElement.js";
import waitForDisplayed from "../action/waitForDisplayed.js";
import pause from "../action/pause.js";
import selectors from "../selectors.js";

export async function clickDeleteUserLink(): Promise<void> {
  await waitForDisplayed(selectors.adminUserPage.deleteUserLink, "");
  await clickElement("click", "selector", selectors.adminUserPage.deleteUserLink);
};

export async function clickConfirmDelete(): Promise<void> {
  await waitForDisplayed(selectors.confirmUserDeletionPage.confirmDeleteUser, "");
  await clickElement("click", "selector", selectors.confirmUserDeletionPage.confirmDeleteUser);
};

export async function clickBackToUsersLink(): Promise<void> {
  await pause("1000");
  await waitForDisplayed(selectors.deletionAlertPage.backToUsersLink, "");
  await clickElement("click", "selector", selectors.deletionAlertPage.backToUsersLink);
  await pause("1000");
};

export async function deleteOrgButton(): Promise<void> {
  await waitForDisplayed(selectors.manageOrgPage.deleteOrgButton, "");
  await clickElement("click", "selector", selectors.manageOrgPage.deleteOrgButton);
};

export default clickDeleteUserLink;