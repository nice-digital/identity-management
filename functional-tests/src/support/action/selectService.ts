import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import {waitForDisplayed} from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import selectors from '../selectors';

export async function clickIdamDockerService(): Promise<void> {
  await waitForDisplayed(selectors.serviceListPage.thirdService, "");
  await clickElement('click', 'selector', selectors.serviceListPage.thirdService);
};

export async function clickTestEnvironment(): Promise<void> {
  await waitForDisplayed(selectors.environmentListPage.firstEnvironment, "");
  await clickElement('click', 'selector', selectors.environmentListPage.firstEnvironment);
};

export async function clickFirstRole(): Promise<void> {
  await waitForDisplayed(selectors.rolesListPage.firstRole, "");
  await clickElement('click', 'selector', selectors.rolesListPage.firstRole);
};

export async function clickSecondRole(): Promise<void> {
  await waitForDisplayed(selectors.rolesListPage.secondRole, "");
  await clickElement('click', 'selector', selectors.rolesListPage.secondRole);
};

export async function clickThirdRole(): Promise<void> {
  await waitForDisplayed(selectors.rolesListPage.thirdRole, "");
  await clickElement('click', 'selector', selectors.rolesListPage.thirdRole);
};

export async function clickFourthRole(): Promise<void> {
  await waitForDisplayed(selectors.rolesListPage.fourthRole, "");
  await clickElement('click', 'selector', selectors.rolesListPage.fourthRole);
};

export async function clickSave(): Promise<void> {
  await waitForDisplayed(selectors.rolesListPage.saveButton, "");
  await clickElement('click', 'selector', selectors.rolesListPage.saveButton);
};

export async function clickFirstService(): Promise<void> {
  await waitForDisplayed("[data-qa-sel='list-of-websites']", "");
  await clickElement('click', 'selector',"[data-qa-sel='list-of-websites']");
};

export default clickIdamDockerService;
