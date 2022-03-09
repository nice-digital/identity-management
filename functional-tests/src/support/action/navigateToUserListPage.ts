import {waitForDisplayed} from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from '../selectors';

export async function navigateToUserListPageUsingBreadscrumb(): Promise<void> {
  clickElement('click', 'selector', selectors.adminUserPage.usersBreadcrumb);
  waitForDisplayed(selectors.userListPage.userlist, "");
};

export const navigateToUserListPageFromAdminPage = () => {
  clickElement('click', 'element', selectors.adminHomePage.manageUsersButton);
  waitForDisplayed(selectors.userListPage.userlist, "");
};

export default navigateToUserListPageUsingBreadscrumb;
