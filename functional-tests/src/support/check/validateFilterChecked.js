import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";

export const validateServiceEnvFilterChecked = () => {
	browser.click("[for='filter_environments_alpha']");
	pause(2000);
	browser.click("[for='filter_environments_test']");
};

export const validateUserStatusFilterChecked = () => {
	browser.click("[for='filter_status_active']");
	pause(2000);
	browser.click("[for='filter_status_pending']");
};

export const validateUserEnvFilterChecked = () => {
	browser.click("[for='filter_alpha_4']");
	pause(2000);
	browser.click("[for='filter_test_2']");
	pause(2000);
};

export const enterNameToFilter = (name) => {
	browser.addValue("[data-qa-sel='filter-search-input']", name )
	pause(2000);
};

export const clickCancelFilter = () => {
	browser.waitForVisible("[data-qa-sel='filter-search-input']");
	browser.clearElement("[data-qa-sel='filter-search-input']");
	pause(2000);
};


export default validateServiceEnvFilterChecked;
