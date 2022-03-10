import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import click from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import selectors from "../selectors";

export const navigateToOrganisationListPageFromAdminPage = () => {
  click('click', 'element', selectors.adminHomePage.manageOrganisationsButton);

}

export default navigateToOrganisationListPageFromAdminPage;