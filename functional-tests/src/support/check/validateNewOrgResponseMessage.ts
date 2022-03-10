import { waitForDisplayed } from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {checkContainsText} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import {pause} from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";


export async function validateNewOrgResponseMessage(message: string): Promise<void> {
	waitForDisplayed(selectors.addNewOrganisation.submitResponseFeedback, "");
	checkContainsText("element", selectors.addNewOrganisation.submitResponseFeedback, "", message);
	pause("1000");
};

export async function validateErrorMessage(message: string): Promise<void> {

	waitForDisplayed('.input__error', "");
	checkContainsText("element", '.input__error', "", message);
	pause("1000");
  };


export default validateNewOrgResponseMessage;


	