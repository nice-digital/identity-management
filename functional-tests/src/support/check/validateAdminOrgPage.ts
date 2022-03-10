import { waitForDisplayed } from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {checkContainsText} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import {pause} from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";


export async function validateOrganisationsDownloadPageResultCount(countText: string): Promise<void> {
	waitForDisplayed(selectors.validateAdminOrganisationPage.pageOrganisationResultCount, "");
	checkContainsText(
		"element",
		selectors.validateAdminOrganisationPage.pageOrganisationResultCount,
		"",
		countText
	);
	pause("5000");
};

export async function validateFirstLinkInPagination(linkText: string): Promise<void> {
	waitForDisplayed(".pagination__inactive", "");
	checkContainsText("element", ".pagination__inactive", "", linkText);
	pause("1000");
};

export async function validatePreviousPage(falseCase: string): Promise<void> {
	waitForDisplayed(".pagination__item:nth-of-type(1)", "");
	checkContainsText("button", ".pagination__item:nth-of-type(1)", falseCase, "Previous page");
	pause("1000");
};

export default validateOrganisationsDownloadPageResultCount;