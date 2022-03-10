import { waitForDisplayed } from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import {pressButton} from '@nice-digital/wdio-cucumber-steps/lib/support/action/pressButton';
import {pause} from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export async function deleteEnteredText(): Promise<void> {

	waitForDisplayed(selectors.organisationListPage.deleteOrgName, "");
	clickElement('click', 'selector', selectors.organisationListPage.deleteOrgName);
	pressButton("['Ctrl', 'A', 'Delete']");
	pause("2000");
};

export async function deleteNewOrgEnteredText(): Promise<void> {

	waitForDisplayed(selectors.manageNewOrgPage.deleteNewOrgName, "");
	clickElement('click', 'selector', selectors.manageNewOrgPage.deleteNewOrgName);
	pressButton("['Ctrl', 'A', 'Delete']");
	pause("2000");
};

export default deleteEnteredText;

