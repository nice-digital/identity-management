import clickElement from "../action/clickElement.js";
import selectors from "../selectors.js";

export async function clickRegisterUncompleted(): Promise<void> {
  await clickElement('click', 'selector', selectors.registrationPage.registerButton);
  await browser.pause(3000);
}

export default clickRegisterUncompleted; 