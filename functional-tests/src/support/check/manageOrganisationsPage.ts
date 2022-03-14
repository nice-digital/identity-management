import {checkUrl} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkURL";

export async function manageOrganisationsPage(): Promise<void> {
  await checkUrl("", "http://idam:8080/organisations");
  // waitForVisible(selectors.adminHomepage.usernameField);
  // waitForVisible(selectors.adminHomepage.roleField);
  // checkContainsText('element', selectors.adminHomepage.pageTitle, 'User Admin Portal');
}

export default manageOrganisationsPage;