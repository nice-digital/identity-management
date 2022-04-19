import { waitForDisplayed } from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import selectors from '../selectors';

export async function navigateToRegPage(): Promise<void> {
  await waitForDisplayed('body #ccc-recommended-settings', "");
  await clickElement('click', 'selector', 'body #ccc-recommended-settings');
  await waitForDisplayed(selectors.loginPage.registerLink, "");
  await clickElement('click', 'selector', selectors.loginPage.registerLink);
  await waitForDisplayed(selectors.registrationPage.emailInput, "");
};

export default navigateToRegPage;
