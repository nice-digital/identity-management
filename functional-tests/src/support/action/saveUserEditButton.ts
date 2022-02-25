import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import selectors from '../selectors';


export const saveUserEditButton = () => {

  waitForVisible(selectors.editUserProfile.saveProfileButton);
  browser.click(selectors.editUserProfile.saveProfileButton);
  
};

export default saveUserEditButton;



