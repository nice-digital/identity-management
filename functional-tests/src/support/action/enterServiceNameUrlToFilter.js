import setInputField from "@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField";
import selectors from "../selectors";

export const enterServiceNameUrlToFilter = (ServiceNameUrl) => {
	setInputField("set", ServiceNameUrl, selectors.adminDownloadPage.filterByServiceNameUrl);
	browser.pause(5000);
};

export default enterServiceNameUrlToFilter;
