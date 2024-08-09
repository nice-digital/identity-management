import pause from "../action/pause.js";
import clickElement from "../action/clickElement.js";
import selectors from "../selectors.js";

export async function navigateToOrganisationListPageFromAdminPage(): Promise<void> {
  await pause("5000");
  await clickElement('click', 'selector', selectors.adminHomePage.manageOrganisationsButton);
}

export default navigateToOrganisationListPageFromAdminPage;