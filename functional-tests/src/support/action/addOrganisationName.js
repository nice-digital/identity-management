import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import clickElement from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import pressButton from '@nice-digital/wdio-cucumber-steps/lib/support/action/pressButton';
import setInputField from '@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField';
import selectors from '../selectors';

export const addOrganisationName = (name) => {


  waitForVisible(selectors.addNewOrganisation.inputOrganisationName);
  clickElement('click', 'selector', selectors.addNewOrganisation.inputOrganisationName);
  pressButton(['Control', 'a', 'Delete']);
  setInputField(
    'set',
    name,
    selectors.addNewOrganisation.inputOrganisationName
  );
};


export const editOrganisationName = (name) => {
waitForVisible(selectors.manageOrgPage.editOrganisationName);
clickElement('click', 'selector', selectors.manageOrgPage.editOrganisationName);
pressButton(['Control', 'a', 'Delete']);
setInputField(
  'set',
  name,
  selectors.manageOrgPage.editOrganisationName
);

};

export default addOrganisationName;