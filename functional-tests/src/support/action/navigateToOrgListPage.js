import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import click from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from '../selectors';

export const navigateToOrgListPageUsingBreadscrumb = () => {

  waitForVisible(".breadcrumbs__crumb a[href='/organisations']");
  browser.click(".breadcrumbs__crumb a[href='/organisations']");
  
};
export default navigateToOrgListPageUsingBreadscrumb;
