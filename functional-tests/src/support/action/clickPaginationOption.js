import clickElement from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import selectors from "../selectors";

export const clickNextPagination = () => {
	waitForVisible(selectors.organisationListPage.nextPager);
	clickElement("click", "button", ".pagination__item pagination__item--bookend");
	pause(2000);
};

export const clickPreviousPagination = () => {
	clickElement("click", "button", ".pagination__link a[href=organisations?page=1']");
	pause(2000);
};

export default clickNextPagination;
