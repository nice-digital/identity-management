import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import checkContainsText from '@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText';
import selectors from '../selectors';
import emailInput from './emailInput';
import checkUrl from '@nice-digital/wdio-cucumber-steps/lib/support/check/checkURL';

export const adminHomepage = () => {
  checkUrl('http://idam:8080/overview');
  // waitForVisible(selectors.adminHomepage.usernameField);
  // waitForVisible(selectors.adminHomepage.roleField);
  // checkContainsText('element', selectors.adminHomepage.pageTitle, 'User Admin Portal');
};

export default adminHomepage;
