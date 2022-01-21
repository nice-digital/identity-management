import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import selectors from "../selectors";
import click from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";




export const sortAlphaOrganisationList = () => {

	waitForVisible(selectors.organisationListPage.sortAlphaDescending);
    click('click', 'selector', selectors.organisationListPage.sortAlphaDescending);
  
};

export const sortDateOrganisationList = () => {

	waitForVisible(selectors.organisationListPage.sortDateDescending);
    click('click', 'selector', selectors.organisationListPage.sortDateDescending);
};


export default sortAlphaOrganisationList;
