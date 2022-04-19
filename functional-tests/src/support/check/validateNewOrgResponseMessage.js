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

	waitForVisible(selectors.addNewOrganisation.errorMessage);
	checkContainsText("element", selectors.addNewOrganisation.errorMessage, message);
	pause(1000);
  };

  export const validateOrganisationDate = (date) => {

	waitForVisible(selectors.manageOrgPage.dateAdded);
	checkContainsText("element", selectors.manageOrgPage.dateAdded, date);
	pause(1000);
  };

  export const validateEditOrgResponseMessage = (message) => {
	waitForVisible(selectors.manageOrgPage.editResponseFeedback);
	checkContainsText("element", selectors.manageOrgPage.editResponseFeedback, message);
	pause(1000);
};

export default validateNewOrgResponseMessage;


	