import { waitForDisplayed } from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import selectors from "../selectors";

export const navigateToOrganisationListPageFromAdminPage = () => {
  clickElement('click', 'element', selectors.adminHomePage.manageOrganisationsButton);
}

export default navigateToOrganisationListPageFromAdminPage;