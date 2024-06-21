import checkUrl from "./checkURL.js";
import selectors from "../selectors";

export async function manageUsersPage(): Promise<void> {
  await checkUrl(true, "http://idam:8080/users");
  // waitForDisplayed(selectors.adminHomepage.usernameField);
  // waitForDisplayed(selectors.adminHomepage.roleField);
  // checkContainsText('element', selectors.adminHomepage.pageTitle, 'User Admin Portal');
}

export default manageUsersPage;