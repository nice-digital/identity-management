import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible"
import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export const validateUserStatusActive = () => {
  pause(1000);
  waitForVisible(selectors.adminUserPage.userStatus);
  checkContainsText("element", selectors.adminUserPage.userStatus, "Active");
  pause(1000);
};

export const validateUserStatusLocked = () => {
  pause(1000);
  waitForVisible(selectors.adminUserPage.userStatus);
  checkContainsText("element", selectors.adminUserPage.userStatus, "Locked");
  pause(1000);
};

export const validateUserStatusListPageLocked = () => {
  pause(1000);
  waitForVisible(selectors.adminUserPage.userStatusLocked);
  checkContainsText("element", selectors.adminHomepage.userStatusListPage, "Locked");
  pause(1000);
};

export default validateUserStatusActive; 