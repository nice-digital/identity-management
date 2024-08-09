import waitForDisplayed from "../action/waitForDisplayed.js";
import checkContainsText from "./checkContainsText.js";
import pause from "../action/pause.js";
import selectors from "../selectors.js";


export async function validateOrganisationsDownloadPageResultCount(countText: string): Promise<void> {
	await waitForDisplayed(selectors.validateAdminOrganisationPage.pageOrganisationResultCount, "");
	await checkContainsText(
		"element",
		selectors.validateAdminOrganisationPage.pageOrganisationResultCount,
		"",
		countText
	);
	await pause("5000");
};

export async function validateFirstLinkInPagination(linkText: string): Promise<void> {
	await waitForDisplayed(".pagination__inactive", "");
	await checkContainsText("element", ".pagination__inactive", "", linkText);
	await pause("1000");
};

export async function validatePreviousPage(falseCase: string): Promise<void> {
	await waitForDisplayed(".pagination__item:nth-of-type(1)", "");
	await checkContainsText("button", ".pagination__item:nth-of-type(1)", falseCase, "Previous page");
	await pause("1000");
};

export default validateOrganisationsDownloadPageResultCount;