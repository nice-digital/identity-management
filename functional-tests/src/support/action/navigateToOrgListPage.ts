import waitForDisplayed from "../action/waitForDisplayed.js";
import clickElement from "../action/clickElement.js";

export async function navigateToOrgListPageUsingBreadscrumb(): Promise<void> {

  await waitForDisplayed(".breadcrumbs__crumb a[href='/organisations']", "");
  await clickElement("click", "selector", ".breadcrumbs__crumb a[href='/organisations']");
  
};

export async function navigateDetailPage(): Promise<void> {

  await waitForDisplayed(".btn.btn--secondary", "");
  await clickElement("click", "selector", ".btn.btn--secondary");
  
};
export default navigateToOrgListPageUsingBreadscrumb;
