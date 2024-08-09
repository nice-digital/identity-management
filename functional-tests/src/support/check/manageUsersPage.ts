import checkUrl from "./checkURL.js";

export async function manageUsersPage(): Promise<void> {
  await checkUrl(false, "http://idam:8080/users");
  // waitForDisplayed(selectors.adminHomepage.usernameField);
  // waitForDisplayed(selectors.adminHomepage.roleField);
  // checkContainsText('element', selectors.adminHomepage.pageTitle, 'User Admin Portal');
}

export default manageUsersPage;