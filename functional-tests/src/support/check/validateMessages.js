import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible"
import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import isEnabled from "@nice-digital/wdio-cucumber-steps/lib/support/check/isEnabled";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export const validateDeletionSuccessMessage = (message) => {
  pause(1000);
  waitForVisible(selectors.deletionAlertPage.deletionSuccessMessage);
  checkContainsText("element", selectors.deletionAlertPage.deletionSuccessMessage, message);
  pause(1000);
};

export default validateDeletionSuccessMessage;

