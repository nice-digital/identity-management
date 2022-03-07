import clickElement from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";


export const clickNextPagination = () => {
	clickElement("click", "selector", ".pagination__item:nth-of-type(4)");
	pause(2000);
};

export const clickPreviousPagination = () => {
	clickElement("click", "selector", ".pagination__item:nth-of-type(1)");
	pause(2000);
};

export default clickNextPagination;
