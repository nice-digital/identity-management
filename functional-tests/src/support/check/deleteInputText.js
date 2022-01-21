import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import clickElement from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from "../selectors";
import pressButton from '@nice-digital/wdio-cucumber-steps/lib/support/action/pressButton';

export const deleteEnteredText = () => {

	waitForVisible(selectors.organisationListPage.deleteOrgName);
	clickElement('click', 'selector', selectors.organisationListPage.deleteOrgName);
	pressButton(['Control', 'a', 'Delete']);
	pause(2000);
};

export const deleteNewOrgEnteredText = () => {

	waitForVisible(selectors.manageNewOrgPage.deleteNewOrgName);
	clickElement('click', 'selector', selectors.manageNewOrgPage.deleteNewOrgName);
	pressButton(['Control', 'a', 'Delete']);
	pause(2000);
};

export default deleteEnteredText;

