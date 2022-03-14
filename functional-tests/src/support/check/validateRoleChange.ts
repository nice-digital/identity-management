import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed"
import {checkContainsText} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import {pause} from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export async function validateRoleChange(): Promise<void> {
  await pause("1000");
  await waitForDisplayed(selectors.rolesListPage.roleChangeSuccess, "");
  await checkContainsText("element", selectors.rolesListPage.roleChangeSuccess, "", "Your changes have been saved.");
  await pause("1000");
};

export default validateRoleChange; 