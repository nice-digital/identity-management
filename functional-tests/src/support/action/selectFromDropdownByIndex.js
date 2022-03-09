import selectOptionByIndex from "@nice-digital/wdio-cucumber-steps/lib/support/action/selectOptionByIndex";
import selectors from "../selectors";

export const selectFromDropdownByIndex = (index) => {
	selectOptionByIndex(
		index,
		"obsolete",
		selectors.organisationListPage.numberResultsOnPage
	);
};

export default selectFromDropdownByIndex;
