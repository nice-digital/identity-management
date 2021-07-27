import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export const validateDownloadPageResultCount = (countText) => {
	waitForVisible(selectors.adminDownloadPage.pageResultCount);
	checkContainsText(
		"element",
		selectors.adminDownloadPage.pageResultCount,
		countText
	);
	pause(5000);
};

export default validateDownloadPageResultCount;
