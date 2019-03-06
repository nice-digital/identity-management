import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText"
import selectors from "../selectors";
import emailInput from "../check/emailInput";

export const identityAdminHomepage = () => {
  waitForVisible(selectors.adminHomepage.usernameField);
  waitForVisible(selectors.adminHomepage.roleField);
  checkContainsText('element', selectors.adminHomepage.pageTitle, 'User Admin Portal');
}

export default identityAdminHomepage;