import waitForDisplayed from '../action/waitForDisplayed.js';
import clickElement from '../action/clickElement.js';
import selectors from '../selectors.js';


export async function editAudienceInsight(): Promise<void> {

  await waitForDisplayed(selectors.editUserProfile.optIn, "");
  await clickElement("click", "selector", selectors.editUserProfile.optIn);
 
};

export default editAudienceInsight;

