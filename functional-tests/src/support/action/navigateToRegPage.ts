import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import click from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from '../selectors';

export const navigateToRegPage = () => {
  waitForVisible('body #ccc-recommended-settings');
  click('click', 'element', 'body #ccc-recommended-settings');
  waitForVisible(selectors.loginPage.registerLink);
  click('click', 'element', selectors.loginPage.registerLink);
  waitForVisible(selectors.registrationPage.emailInput);
};

export default navigateToRegPage;
