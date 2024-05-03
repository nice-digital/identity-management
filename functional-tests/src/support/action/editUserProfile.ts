import clickElement from "../action/clickElement.js";
import waitForDisplayed from "../action/waitForDisplayed.js";
import selectors from '../selectors.js';


export async function editUserProfile(): Promise<void> {
  await waitForDisplayed(selectors.UserProfile.editButton, "");
  await clickElement('click', 'selector', selectors.UserProfile.editButton);
};

export default editUserProfile;