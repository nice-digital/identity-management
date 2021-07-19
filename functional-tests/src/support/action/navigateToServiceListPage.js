import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import click from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import selectors from "../selectors";

export const navigateToServiceListPageFromAdminPage = () => {
  click('click', 'element', selectors.adminHomePage.manageServicesButton);
  waitForVisible(selectors.serviceListPage.servicelist);
}

export default navigateToServiceListPageFromAdminPage;