import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import {pause} from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";


export async function clickNextPagination(): Promise<void> {
	await clickElement("click", "selector", ".pagination__item:nth-of-type(4)");
	await pause("await ");
};

export async function clickPreviousPagination(): Promise<void> {
	await clickElement("click", "selector", ".pagination__item:nth-of-type(1)");
	await pause("await ");
};

export default clickNextPagination;
