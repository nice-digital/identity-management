import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import click from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from '../selectors';

export const navigateToUserListPageUsingBreadscrumb = () => {
  click('click', 'element', selectors.adminUserPage.usersBreadcrumb);
  waitForVisible(selectors.userListPage.userlist);
};

export const navigateToUserListPageFromAdminPage = () => {
  click('click', 'element', selectors.adminHomePage.manageUsersButton);
  waitForVisible(selectors.userListPage.userlist);
};

export const navigateToServiceListPageFromAdminPage = () => {
  click('click', 'element', selectors.adminHomePage.manageServicesButton);
  waitForVisible(selectors.serviceListPage.servicelist);
};

export default navigateToUserListPageUsingBreadscrumb;
