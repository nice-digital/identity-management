import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export const validateServiceDownloadPageResultCount = (countText) => {
	waitForVisible(selectors.validateAdminUserServicePage.pageServiceResultCount);
	checkContainsText(
		"element",
		selectors.validateAdminUserServicePage.pageServiceResultCount,
		countText
	);
	pause(5000);
};

export const validateUserDownloadPageResultCount = (countText) => {
	waitForVisible(selectors.validateAdminUserServicePage.pageUserResultCount);
	checkContainsText(
		"element",
		selectors.validateAdminUserServicePage.pageUserResultCount,
		countText
	);
	pause(5000);
};

export default validateServiceDownloadPageResultCount;