import waitForDisplayed from '../action/waitForDisplayed.js';
import clickElement from '../action/clickElement.js';
import selectors from '../selectors.js';


export async function saveUserEditButton(): Promise<void> {
  
  await waitForDisplayed(selectors.editUserProfile.saveProfileButton, "");
  await clickElement("click", "selector", selectors.editUserProfile.saveProfileButton);
  
};

export default saveUserEditButton;



