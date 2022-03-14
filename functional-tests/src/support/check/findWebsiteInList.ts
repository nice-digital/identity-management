import {checkContainsText} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {checkUrl} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkURL";
import {pause} from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export async function findWebsiteList(website: string): Promise<void> {
  await browser.refresh();
  await waitForDisplayed(selectors.websiteListPage.websitelist, "");
  await checkUrl("", "http://idam:8080/services");
  await checkContainsText("element", selectors.websiteListPage.websitelist, "", website);
  await pause("1000");
};

export default findWebsiteList;