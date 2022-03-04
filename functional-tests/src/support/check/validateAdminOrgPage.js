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
	checkContainsText("element", ".pagination__inactive", linkText
	);
	pause(1000);
};



export default validateOrganisationsDownloadPageResultCount;