import checkContainsText from "./checkContainsText.js";
import waitForDisplayed from "../action/waitForDisplayed.js";
import checkUrl from "./checkURL.js";
import pause from "../action/pause.js";
import selectors from "../selectors.js";

export async function findWebsiteList(website: string): Promise<void> {
  await browser.refresh();
  await waitForDisplayed(selectors.websiteListPage.websitelist, "");
  await checkUrl(true, "http://idam:8080/services");
  await checkContainsText("element", selectors.websiteListPage.websitelist, "", website);
  await pause("1000");
};

export default findWebsiteList;