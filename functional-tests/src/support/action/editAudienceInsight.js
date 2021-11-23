import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import selectors from '../selectors';


export const editAudienceInsight = () => {

  waitForVisible(selectors.editUserProfile.optIn);
  browser.click(selectors.editUserProfile.optIn);
 
};

export default editAudienceInsight;

