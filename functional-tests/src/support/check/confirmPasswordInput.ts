import {isExisting} from "@nice-digital/wdio-cucumber-steps/lib/support/check/isExisting";
import {pause} from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export async function confirmPasswordInput(falseCase: string): Promise<void> {
   await isExisting(selectors.registrationPage.confirmPasswordInput, falseCase);
};

export default confirmPasswordInput;