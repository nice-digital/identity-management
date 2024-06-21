import pause from "../action/pause.js";
import waitForDisplayed from "../action/waitForDisplayed.js";
import setInputField from "../action/setInputField.js";
import clearInputField from "../action/clearInputField.js";
import clickElement from "../action/clickElement.js";
import checkContainsText from "./checkContainsText.js";

export async function validateServiceEnvFilterChecked(): Promise<void> {
	await $("[for='filter_environments_alpha']").click();
	await pause("2000");
	await $("[for='filter_environments_test']").click();
};

export async function validateUserStatusFilterChecked(): Promise<void> {
	await $("[for='filter_status_active']").click();
	await pause("2000");
	await $("[for='filter_status_pending']").click();
};

export async function validateUserEnvFilterChecked(): Promise<void> {
	await $("[for='filter_alpha_4']").click();
	await pause("2000");
	await $("[for='filter_test_2']").click();
	await pause("2000");
};

export async function enterNameToFilter(name: string): Promise<void> {
	await setInputField("set", name, "[data-qa-sel='filter-search-input']");
	await pause("2000");
};

export async function clickCancelFilter(): Promise<void> {
	await waitForDisplayed("[data-qa-sel='filter-search-input']", "");
	await clearInputField("[data-qa-sel='filter-search-input']");
	await pause("2000");
};

export async function validateServiceEnvChecked(): Promise<void> {
	await clickElement("click", "selector", "[for='filter_environments_dev']");
	await pause("2000");
};

export async function validateUserRolesFilterChecked(): Promise<void> {
	await clickElement("click", "selector", "[for='filter_roles_product-administrator']");
	await clickElement("click", "selector", "[for='filter_roles_product-manager']");
	await pause("2000");
};

export async function validateUserRoleFilterChecked(): Promise<void> {
	await clickElement("click", "selector", "[for='filter_roles_product-editor']");
	await pause("2000");
};

export async function clickCancelFilterServiceDetailPage(): Promise<void> {
	await clickElement("click", "selector", "[for='filter_roles_product-administrator']");
	await clickElement("click", "selector", "[for='filter_roles_product-manager']");
	await pause("2000");
};

export async function validateServiceUserRoleChecked(): Promise<void> {

	await checkContainsText("element", ".userRecord:first-child td:nth-child(1)", "", 'Aisha Bartlett');
	await checkContainsText("element", ".userRecord:first-child td:nth-child(2)", "", 'aisha.bartlett@example.com');
	await checkContainsText("element", ".userRecord:first-child td:nth-child(3)", "", 'Product editor');
	await checkContainsText("element", ".userRecord:first-child td:nth-child(4)", "", 'No');
};


export default validateServiceEnvFilterChecked;
