import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import clickElement from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import pressButton from '@nice-digital/wdio-cucumber-steps/lib/support/action/pressButton';
import setInputField from '@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField';
import selectors from '../selectors';

export const saveNewOrganisationName = () => {


  waitForVisible(selectors.addNewOrganisation.saveNewOrgButton);
  clickElement('click', 'selector', selectors.addNewOrganisation.saveNewOrgButton);
 
};

export const saveEditOrgButton = () => {

  waitForVisible(selectors.manageOrgPage.saveEditOrgButton);
  clickElement('click', 'selector', selectors.manageOrgPage.saveEditOrgButton);
 

};

export default saveNewOrganisationName;