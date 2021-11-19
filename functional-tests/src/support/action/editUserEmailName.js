import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import selectors from '../selectors';



export const editUserEmailName = (email, firstname, lastname) => {

  waitForVisible(selectors.editUserProfile.EmailAddress);
  browser.clearElement(selectors.editUserProfile.EmailAddress);
  browser.click(selectors.editUserProfile.EmailAddress);
  browser.addValue(selectors.editUserProfile.EmailAddress, process.env[email]);

  waitForVisible(selectors.editUserProfile.FirstName);
  browser.clearElement(selectors.editUserProfile.FirstName);
  browser.click(selectors.editUserProfile.FirstName);
  browser.addValue(selectors.editUserProfile.FirstName, process.env[firstname]);

  waitForVisible(selectors.editUserProfile.LastName);
  browser.clearElement(selectors.editUserProfile.LastName);
  browser.click(selectors.editUserProfile.LastName);
  browser.addValue(selectors.editUserProfile.LastName, process.env[lastname]);
};

export default editUserEmailName;

