import {selectOptionByIndex} from "@nice-digital/wdio-cucumber-steps/lib/support/action/selectOptionByIndex";
import selectors from "../selectors";

export async function selectFromDropdownByIndex(index: string): Promise<void> {
	await selectOptionByIndex(
		index,
		"obsolete",
		selectors.organisationListPage.numberResultsOnPage
	);
};

export default selectFromDropdownByIndex;
