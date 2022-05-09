import {checkContainsText} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {checkUrl} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkURL";
import {isEnabled} from "@nice-digital/wdio-cucumber-steps/lib/support/check/isEnabled";
import {pause} from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export async function findUserList(userName: string): Promise<void> {
  await browser.refresh();
  await waitForDisplayed(selectors.userListPage.userlist, "");
  await checkUrl("", "http://idam:8080/users");
  await checkContainsText("element", selectors.userListPage.userlist, "", userName);
  await pause("1000");
};

export async function userNotInList(userName: string): Promise<void> {
  await waitForDisplayed(selectors.userListPage.userlist, "");
  await checkUrl("", "http://idam:8080/users");
  await checkContainsText("element", selectors.userListPage.userlist, " not", userName);
  await pause("1000");
};

export async function clickFirstUserInList(): Promise<void> {
  await waitForDisplayed(selectors.userListPage.userlist, "");
  await clickElement("click", "selector", selectors.userListPage.firstUserCard);
};

export async function clickSecondUserInList(): Promise<void> {
  await waitForDisplayed(selectors.userListPage.userlist, "");
  await clickElement("click", "selector", selectors.userListPage.secondUserCard);
};

export async function clickLastUserInList(): Promise<void> {
  await waitForDisplayed(selectors.userListPage.userlist, "");
  await clickElement("click", "selector", selectors.userListPage.lastUserCard);
};


export async function findUserOrganisation(text: string): Promise<void> {
  await waitForDisplayed(selectors.manageOrgPage.findUser, "");
  await clickElement("click", "selector", selectors.manageOrgPage.findUser, text);
};

export async function findCurrentUserOrganisation(text: string): Promise<void> {
  await waitForDisplayed(selectors.manageOrgPage.findCurrentUser, "");
  await clickElement("click", "selector", selectors.manageOrgPage.findCurrentUser, text);
};


export default findUserList;