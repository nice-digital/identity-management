import {pause} from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {setInputField} from "@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField";
import {clearInputField} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clearInputField";

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


export default validateServiceEnvFilterChecked;
