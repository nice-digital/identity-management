import waitForDisplayed from '../action/waitForDisplayed.js';
import checkContainsText from './checkContainsText.js';
import pause from '../action/pause.js';
import selectors from '../selectors.js';

export async function validateUserStatusActive(): Promise<void> {
  await pause("5000");
  await waitForDisplayed(selectors.adminUserPage.userStatus, "");
  await checkContainsText('element', selectors.adminUserPage.userStatus, "", "Active");
  await pause("1000");
};

export async function validateUserStatusLocked(): Promise<void> {
  await pause("1000");
  await waitForDisplayed(selectors.adminUserPage.userStatus, "");
  await checkContainsText('element', selectors.adminUserPage.userStatus, "", "Locked");
  await pause("1000");
};

export async function validateUserStatusListPageLocked(): Promise<void> {
  await pause("1000");
  await waitForDisplayed(selectors.adminUserPage.userStatus, "");
  await checkContainsText(
    'element',
    selectors.userListPage.secondUserStatus,
    "",
    'Locked'
  );
  await pause("1000");
};

export async function validateProfileSuccessfulMessage(): Promise<void> {
 await waitForDisplayed(selectors.UserProfile.SuccessfulMessage, "");
 await checkContainsText('element', selectors.UserProfile.SuccessfulMessage, "", "The user profile has been updated successfully.");
 await pause("1000");
};

export default validateUserStatusActive;
