import checkContainsText from "./checkContainsText.js";
import waitForDisplayed from "../action/waitForDisplayed.js";
import pause from "../action/pause.js";
import selectors from "../selectors.js";

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