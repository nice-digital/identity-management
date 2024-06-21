import waitForDisplayed  from '../action/waitForDisplayed.js';
import checkContainsText from '../check/checkContainsText.js';
import pause from '../action/pause.js';
import selectors from '../selectors';


export async function checkNewOrgOnList(): Promise<void> {

  await waitForDisplayed(selectors.UserProfile.updatedUserName, "");
  await checkContainsText("element", selectors.UserProfile.updatedUserName, "", 'Barry Bahamas');
	await pause("1000");
  
  await waitForDisplayed(selectors.UserProfile.updatedEmailAddress, "");
  await checkContainsText("element", selectors.UserProfile.updatedEmailAddress, "", 'donaldbahamas@vilennin.com');
	await pause("1000");

  await waitForDisplayed(selectors.UserProfile.updatedAudienceInsight, "");
  await checkContainsText("element", selectors.UserProfile.updatedAudienceInsight, "", 'Yes'); 
  await pause("1000");

};

export default checkNewOrgOnList;
