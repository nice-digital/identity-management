import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import clickElement from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import checkURL from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkURL";
import isEnabled from "@nice-digital/wdio-cucumber-steps/lib/support/check/isEnabled";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export const findUserList = (userName) => {
  browser.refresh();
  waitForVisible(selectors.adminHomepage.userlist);
  checkURL("http://idam:8080/users");
  checkContainsText("element", selectors.adminHomepage.userlist, userName);
  pause(1000);
};

export const userNotInList = (userName) => {
  waitForVisible(selectors.adminHomepage.userlist);
  checkURL("http://idam:8080/users");
  checkContainsText("element", selectors.adminHomepage.userlist, " not", userName);
  pause(1000);
};

export const clickFirstUserInList = () => {
  waitForVisible(selectors.adminHomepage.userlist);
  clickElement("click", "selector", selectors.adminHomepage.firstUserCard);
};

export const clickSecondUserInList = () => {
  waitForVisible(selectors.adminHomepage.userlist);
  clickElement("click", "selector", selectors.adminHomepage.secondUserCard);
};

export default findUserList;