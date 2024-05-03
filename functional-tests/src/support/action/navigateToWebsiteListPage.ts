import waitForDisplayed from "../action/waitForDisplayed.js";
import clickElement from "../action/clickElement.js";
import selectors from "../selectors.js";

export async function navigateToWebsiteListPageFromAdminPage(): Promise<void> {
  await waitForDisplayed(selectors.adminHomePage.manageServicesButton, "");
  await clickElement('click', 'selector', selectors.adminHomePage.manageServicesButton);
  await waitForDisplayed(selectors.websiteListPage.websitelist, "");
}

export default navigateToWebsiteListPageFromAdminPage;