import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {checkContainsText} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText"
import {checkUrl} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkURL";
import selectors from "../selectors";

export async function manageUsersPage(): Promise<void> {
  await checkUrl("", "http://idam:8080/users");
  // waitForDisplayed(selectors.adminHomepage.usernameField);
  // waitForDisplayed(selectors.adminHomepage.roleField);
  // checkContainsText('element', selectors.adminHomepage.pageTitle, 'User Admin Portal');
}

export default manageUsersPage;