import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import checkURL from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkURL";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export const findWebsiteList = (website) => {
  browser.refresh();
  waitForVisible(selectors.websiteListPage.websitelist);
  checkURL("http://idam:8080/services");
  checkContainsText("element", selectors.websiteListPage.websitelist, website);
  pause(1000);
};

export default findWebsiteList;