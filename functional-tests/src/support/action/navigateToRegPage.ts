import waitForDisplayed from "../action/waitForDisplayed.js";
import clickElement from "../action/clickElement.js";
import selectors from '../selectors.js';

export async function navigateToRegPage(): Promise<void> {
  await waitForDisplayed('body #ccc-recommended-settings', "");
  await clickElement('click', 'selector', 'body #ccc-recommended-settings');
  await waitForDisplayed(selectors.loginPage.registerLink, "");
  await clickElement('click', 'selector', selectors.loginPage.registerLink);
  await waitForDisplayed(selectors.registrationPage.emailInput, "");
};

export default navigateToRegPage;
