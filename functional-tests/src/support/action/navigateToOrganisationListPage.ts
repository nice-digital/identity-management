import clickElement from "../action/clickElement.js";
import selectors from "../selectors.js";

export async function navigateToOrganisationListPageFromAdminPage(): Promise<void> {
  await clickElement('click', 'selector', selectors.adminHomePage.manageOrganisationsButton);
}

export default navigateToOrganisationListPageFromAdminPage;