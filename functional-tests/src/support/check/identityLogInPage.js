import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import selectors from "../selectors";

export const identityLogInPage = () => {
  waitForVisible(selectors.loginPage.usernameField);
  waitForVisible(selectors.loginPage.passwordField);
}

export default identityLogInPage;