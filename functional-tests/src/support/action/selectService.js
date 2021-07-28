import clickElement from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import selectors from '../selectors';

export const clickIdamDockerService = () => {
  waitForVisible(selectors.serviceListPage.thirdService);
  clickElement('click', 'selector', selectors.serviceListPage.thirdService);
};

export const clickTestEnvironment = () => {
  waitForVisible(selectors.environmentListPage.firstEnvironment);
  clickElement(
    'click',
    'selector',
    selectors.environmentListPage.firstEnvironment
  );
};

export const clickFirstRole = () => {
  waitForVisible(selectors.rolesListPage.firstRole);
  clickElement('click', 'selector', selectors.rolesListPage.firstRole);
};

export const clickSecondRole = () => {
  waitForVisible(selectors.rolesListPage.secondRole);
  clickElement('click', 'selector', selectors.rolesListPage.secondRole);
};

export const clickThirdRole = () => {
  waitForVisible(selectors.rolesListPage.thirdRole);
  clickElement('click', 'selector', selectors.rolesListPage.thirdRole);
};

export const clickFourthRole = () => {
  waitForVisible(selectors.rolesListPage.fourthRole);
  clickElement('click', 'selector', selectors.rolesListPage.fourthRole);
};

export const clickSave = () => {
  waitForVisible(selectors.rolesListPage.saveButton);
  clickElement('click', 'selector', selectors.rolesListPage.saveButton);
};

export default clickIdamDockerService;
