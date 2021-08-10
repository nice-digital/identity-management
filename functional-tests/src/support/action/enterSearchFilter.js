import setInputField from "@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField";
import selectors from "../selectors";


export const enterServicesSearchFilter = (url) => {
	setInputField("set", url, selectors.validateAdminUserServicePage.filterByServiceURL);
	browser.pause(5000);
};

export const enterUsersSearchFilter = (email) => {
	setInputField("set", email, selectors.validateAdminUserServicePage.filterByNameEmail);
	browser.pause(5000);
};

export default enterServicesSearchFilter;