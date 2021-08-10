import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";

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


export default validateServiceEnvFilterChecked;
