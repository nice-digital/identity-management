import clickElement from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import selectors from '../selectors';


export const editUserProfile = () => {
  waitForVisible(selectors.UserProfile.editButton);
  clickElement('click', 'selector', selectors.UserProfile.editButton);
};

export default editUserProfile;