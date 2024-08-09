import waitForDisplayed from "../action/waitForDisplayed.js";
import clickElement from "../action/clickElement.js";
import selectors from '../selectors.js';

export async function navigateToUserListPageUsingBreadscrumb(): Promise<void> {
  await clickElement('click', 'selector', selectors.adminUserPage.usersBreadcrumb);
  await waitForDisplayed(selectors.userListPage.userlist, "");
};

export async function navigateToUserListPageFromAdminPage(): Promise<void> {
  await waitForDisplayed(selectors.adminHomePage.manageUsersButton, "");
  await clickElement('click', 'selector', selectors.adminHomePage.manageUsersButton);
  await waitForDisplayed(selectors.userListPage.userlist, "");
};

export default navigateToUserListPageUsingBreadscrumb;
