import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import click from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import selectors from "../selectors";

export const navigateToUserListPage = () => {
  click('click', 'element', selectors.adminUserPage.usersBreadcrumb);
  waitForVisible(selectors.adminHomepage.userlist);
}

export default navigateToUserListPage;