import { waitForDisplayed } from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import {pressButton} from '@nice-digital/wdio-cucumber-steps/lib/support/action/pressButton';
import {pause} from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export async function deleteEnteredText(): Promise<void> {

	await waitForDisplayed(selectors.organisationListPage.deleteOrgName, "");
	await clickElement('click', 'selector', selectors.organisationListPage.deleteOrgName);
	await browser.keys(['Control', 'a', 'Delete']);
	await pause("2000");
};

export async function deleteNewOrgEnteredText(): Promise<void> {

	await waitForDisplayed(selectors.manageOrgPage.deleteNewOrgName, "");
	await clickElement('click', 'selector', selectors.manageOrgPage.deleteNewOrgName);
	await browser.keys(['Control', 'a', 'Delete']);
	await pause("2000");
};

export default deleteEnteredText;