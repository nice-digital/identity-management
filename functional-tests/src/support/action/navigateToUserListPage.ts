import {waitForDisplayed} from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from '../selectors';

export async function navigateToUserListPageUsingBreadscrumb(): Promise<void> {
  await clickElement('click', 'selector', selectors.adminUserPage.usersBreadcrumb);
  await waitForDisplayed(selectors.userListPage.userlist, "");
};

export async function navigateToUserListPageFromAdminPage(): Promise<void> {
  await clickElement('click', 'element', selectors.adminHomePage.manageUsersButton);
  await waitForDisplayed(selectors.userListPage.userlist, "");
};

export default navigateToUserListPageUsingBreadscrumb;
