import { waitForDisplayed } from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from '../selectors';

export async function navigateToOrgListPageUsingBreadscrumb(): Promise<void> {

  await waitForDisplayed(".breadcrumbs__crumb a[href='/organisations']", "");
  await clickElement("click", "selector", ".breadcrumbs__crumb a[href='/organisations']");
  
};
export default navigateToOrgListPageUsingBreadscrumb;
