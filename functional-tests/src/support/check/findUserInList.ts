import checkContainsText from "./checkContainsText.js";
import clickElement from "../action/clickElement.js";
import waitForDisplayed from "../action/waitForDisplayed.js";
import checkUrl from "../check/checkURL.js";
import pause from "../action/pause.js";
import selectors from "../selectors.js";

export async function findUserList(userName: string): Promise<void> {
  await browser.refresh();
  await waitForDisplayed(selectors.userListPage.userlist, "");
  await checkUrl(false, "http://idam:8080/users");
  await checkContainsText("element", selectors.userListPage.userlist, "", userName);
  await pause("1000");
};

export async function userNotInList(userName: string): Promise<void> {
  await waitForDisplayed(selectors.userListPage.userlist, "");
  await checkUrl(true, "http://idam:8080/users");
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
  await checkContainsText("element", selectors.manageOrgPage.findUser, "", text);
  // await clickElement("click", "selector", selectors.manageOrgPage.findUser, text);
};

export async function findCurrentUserOrganisation(text: string): Promise<void> {
  await waitForDisplayed(selectors.manageOrgPage.findCurrentUser, "");
  await checkContainsText("element", selectors.manageOrgPage.findCurrentUser, "", text);
};


export default findUserList;