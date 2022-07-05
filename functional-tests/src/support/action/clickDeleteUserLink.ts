import {checkContainsText} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
// import {checkURL} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkURL";
import {isEnabled} from "@nice-digital/wdio-cucumber-steps/lib/support/check/isEnabled";
import {pause} from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

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