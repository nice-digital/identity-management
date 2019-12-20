import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible"
import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export const validateRoleChange = () => {
  pause(1000);
  waitForVisible(selectors.rolesListPage.roleChangeSuccess);
  checkContainsText("element", selectors.rolesListPage.roleChangeSuccess, "Your changes have been saved.");
  pause(1000);
};

export default validateRoleChange; 