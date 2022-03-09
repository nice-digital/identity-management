import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";


export const validateNewOrgResponseMessage = (message) => {
	waitForVisible(selectors.addNewOrganisation.submitResponseFeedback);
	checkContainsText("element", selectors.addNewOrganisation.submitResponseFeedback, message);
	pause(1000);
};

export const validateErrorMessage = (message) => {

	waitForVisible('.input__error');
	checkContainsText('.input__error', message);
	pause(1000);
  };


export default validateNewOrgResponseMessage;


	