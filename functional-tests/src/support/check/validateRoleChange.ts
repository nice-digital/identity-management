import waitForDisplayed from "../action/waitForDisplayed.js";
import checkContainsText from "./checkContainsText.js";
import pause from "../action/pause.js";
import selectors from "../selectors.js";

export async function validateRoleChange(): Promise<void> {
  await pause("1000");
  await waitForDisplayed(selectors.rolesListPage.roleChangeSuccess, "");
  await checkContainsText("element", selectors.rolesListPage.roleChangeSuccess, "", "Your changes have been saved.");
  await pause("1000");
};

export default validateRoleChange; 