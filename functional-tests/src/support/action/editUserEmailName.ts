import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import clickElement from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import pressButton from '@nice-digital/wdio-cucumber-steps/lib/support/action/pressButton';
import setInputField from '@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField';
import selectors from '../selectors';

export const editUserEmailName = (email, firstname, lastname) => {
  waitForVisible(selectors.editUserProfile.EmailAddress);
  clickElement('click', 'selector', selectors.editUserProfile.EmailAddress);
  pressButton(['Control', 'a', 'Delete']);
  setInputField(
    'set',
    process.env[email],
    selectors.editUserProfile.EmailAddress
  );

  waitForVisible(selectors.editUserProfile.FirstName);
  clickElement('click', 'selector', selectors.editUserProfile.FirstName);
  pressButton(['Control', 'a', 'Delete']);
  setInputField(
    'set',
    process.env[firstname],
    selectors.editUserProfile.FirstName
  );

  waitForVisible(selectors.editUserProfile.LastName);
  clickElement('click', 'selector', selectors.editUserProfile.LastName);
  pressButton(['Control', 'a', 'Delete']);
  setInputField(
    'set',
    process.env[lastname],
    selectors.editUserProfile.LastName
  );
};

export default editUserEmailName;
