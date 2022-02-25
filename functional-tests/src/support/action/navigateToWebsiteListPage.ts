import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import click from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import selectors from "../selectors";

export const navigateToWebsiteListPageFromAdminPage = () => {
  click('click', 'element', selectors.adminHomePage.manageServicesButton);
  waitForVisible(selectors.websiteListPage.websitelist);
}

export default navigateToWebsiteListPageFromAdminPage;