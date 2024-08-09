import selectOptionByIndex from '../action/selectOptionByIndex.js';
import selectors from "../selectors.js";

export async function selectFromDropdownByIndex(index: string): Promise<void> {
	await selectOptionByIndex(
		index,
		selectors.organisationListPage.numberResultsOnPage
	);
};

export default selectFromDropdownByIndex;
