import clickElement from "../action/clickElement.js";
import pause from "../action/pause.js";
import selectors from "../selectors";

export async function clickGlobalNavAccountButton(): Promise<void> {
  await clickElement('click', 'selector', selectors.userListPage.globalNavMyAccount);
  await pause("1000");
  await clickElement('click', 'selector', selectors.userListPage.globalNavSignOut);
}

export default clickGlobalNavAccountButton; 