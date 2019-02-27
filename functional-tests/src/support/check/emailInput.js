import isExisting from "@nice-digital/wdio-cucumber-steps/lib/support/check/isExisting";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export const emailInput = (falseCase) => {
   isExisting(selectors.registrationPage.emailInput, falseCase);
};

export default emailInput;