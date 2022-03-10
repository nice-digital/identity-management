import { waitForDisplayed } from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from '../selectors';

export const navigateToOrgListPageUsingBreadscrumb = () => {

  waitForDisplayed(".breadcrumbs__crumb a[href='/organisations']", "");
  clickElement("click", "selector", ".breadcrumbs__crumb a[href='/organisations']");
  
};
export default navigateToOrgListPageUsingBreadscrumb;
