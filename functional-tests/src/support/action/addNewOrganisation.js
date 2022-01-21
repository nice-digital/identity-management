import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import click from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from '../selectors';

export const addNewOrganisation = () => {

  waitForVisible(selectors.organisationListPage.addNewOrganisation);
  click('click', 'selector', selectors.organisationListPage.addNewOrganisation);
};

export default addNewOrganisation;