import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import selectors from "../selectors";

export async function navigateToWebsiteListPageFromAdminPage(): Promise<void> {
  clickElement('click', 'element', selectors.adminHomePage.manageServicesButton);
  waitForDisplayed(selectors.websiteListPage.websitelist, "");
}

export default navigateToWebsiteListPageFromAdminPage;