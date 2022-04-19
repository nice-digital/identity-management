import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import clickElement from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import checkURL from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkURL";
import isEnabled from "@nice-digital/wdio-cucumber-steps/lib/support/check/isEnabled";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export const findUserList = (userName) => {
  browser.refresh();
  waitForVisible(selectors.userListPage.userlist);
  checkURL("http://idam:8080/users");
  checkContainsText("element", selectors.userListPage.userlist, userName);
  pause(1000);
};

export const userNotInList = (userName) => {
  waitForVisible(selectors.userListPage.userlist);
  checkURL("http://idam:8080/users");
  checkContainsText("element", selectors.userListPage.userlist, " not", userName);
  pause(1000);
};

export const clickFirstUserInList = () => {
  waitForVisible(selectors.userListPage.userlist);
  clickElement("click", "selector", selectors.userListPage.firstUserCard);
};

export const clickSecondUserInList = () => {
  waitForVisible(selectors.userListPage.userlist);
  clickElement("click", "selector", selectors.userListPage.secondUserCard);
};

export const clickLastUserInList = () => {
  waitForVisible(selectors.userListPage.userlist);
  clickElement("click", "selector", selectors.userListPage.lastUserCard);
};

export const findUserOrganisation = (text) => {

  waitForVisible(selectors.manageOrgPage.findUser);
	checkContainsText("element", selectors.manageOrgPage.findUser, text);
 	pause(1000);
  };

export default findUserList;