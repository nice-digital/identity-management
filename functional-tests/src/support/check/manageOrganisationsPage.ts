import checkUrl from "./checkURL.js";

export async function manageOrganisationsPage(): Promise<void> {
  await checkUrl(false, "http://idam:8080/organisations");
  // waitForVisible(selectors.adminHomepage.usernameField);
  // waitForVisible(selectors.adminHomepage.roleField);
  // checkContainsText('element', selectors.adminHomepage.pageTitle, 'User Admin Portal');
}

export default manageOrganisationsPage;