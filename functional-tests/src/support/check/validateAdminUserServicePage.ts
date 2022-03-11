import {checkContainsText} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {pause} from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export async function validateServiceDownloadPageResultCount(countText: string): Promise<void> {
	await waitForDisplayed(selectors.validateAdminUserServicePage.pageServiceResultCount, "");
	await checkContainsText(
		"element",
		selectors.validateAdminUserServicePage.pageServiceResultCount,
		"",
		countText
	);
	await pause("5000");
};

export async function validateUserDownloadPageResultCount(countText: string): Promise<void> {
	await waitForDisplayed(selectors.validateAdminUserServicePage.pageUserResultCount, "");
	await checkContainsText(
		"element",
		selectors.validateAdminUserServicePage.pageUserResultCount,
		"",
		countText
	);
	await pause("5000");
};

export default validateServiceDownloadPageResultCount;