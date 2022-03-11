import {waitForDisplayed} from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed'
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from '../selectors';

export async function addNewOrganisation(): Promise<void> {

  await waitForDisplayed(selectors.organisationListPage.addNewOrganisation, "");
  await clickElement('click', 'selector', selectors.organisationListPage.addNewOrganisation);
};

export default addNewOrganisation;