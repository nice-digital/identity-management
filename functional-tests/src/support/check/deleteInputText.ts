import waitForDisplayed from "../action/waitForDisplayed.js";
import clickElement from "../action/clickElement.js";
import pause from '../action/pause.js';
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