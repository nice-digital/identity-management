import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import {pause} from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";


export async function clickNextPagination(): Promise<void> {
	clickElement("click", "selector", ".pagination__item:nth-of-type(4)");
	pause("2000");
};

export async function clickPreviousPagination(): Promise<void> {
	clickElement("click", "selector", ".pagination__item:nth-of-type(1)");
	pause("2000");
};

export default clickNextPagination;
