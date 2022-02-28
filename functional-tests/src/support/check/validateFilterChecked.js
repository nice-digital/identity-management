import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import checkContainsText from '@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText';
import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';

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

export const validateServiceEnvChecked = () => {
	browser.click("[for='filter_environments_dev']");
	pause(2000);
};

export const validateUserRolesFilterChecked = () => {
	browser.click("[for='filter_roles_product-administrator']");
	browser.click("[for='filter_roles_product-manager']");
	pause(2000);
};

export const validateUserRoleFilterChecked = () => {
	browser.click("[for='filter_roles_product-editor']");
	pause(2000);
};

export const clickCancelFilterServiceDetailPage = () => {
	browser.click("[for='filter_roles_product-administrator']");
	browser.click("[for='filter_roles_product-manager']");
	pause(2000);
};

export const validateServiceUserRoleChecked = () => {
	
	checkContainsText("element", ".userRecord:first-child td:nth-child(1)", 'Aisha Bartlett');
	checkContainsText("element", ".userRecord:first-child td:nth-child(2)", 'aisha.bartlett@example.com');
	checkContainsText("element", ".userRecord:first-child td:nth-child(3)", 'Product editor');
	checkContainsText("element", ".userRecord:first-child td:nth-child(4)", 'No');
};

export default validateServiceEnvFilterChecked;
