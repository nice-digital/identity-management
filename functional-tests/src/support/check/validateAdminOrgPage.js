import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";


export const validateOrganisationsDownloadPageResultCount = (countText) => {
	waitForVisible(selectors.validateAdminOrganisationPage.pageOrganisationResultCount);
	checkContainsText(
		"element",
		selectors.validateAdminOrganisationPage.pageOrganisationResultCount,
		countText
	);
	pause(5000);
};

export const validateFirstLinkInPagination = (linkText) => {
	waitForVisible(".pagination__inactive");
	checkContainsText("element", ".pagination__inactive", linkText);
	pause(1000);
};

export const validatePreviousPage = (falseCase) => {
	waitForVisible(".pagination__item:nth-of-type(1)");
	checkContainsText("button", ".pagination__item:nth-of-type(1)", falseCase, "Previous page");
	pause(1000);
};

export default validateOrganisationsDownloadPageResultCount;