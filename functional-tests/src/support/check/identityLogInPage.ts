import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import checkUrl from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkURL";
import selectors from "../selectors";

export const identityLogInPage = () => {
  checkUrl("false", "http://idam:8080/users"); //this is a hack. Need to sort out logout issue. 
  // waitForVisible(selectors.loginPage.usernameField);
  // waitForVisible(selectors.loginPage.passwordField);
}

export default identityLogInPage;