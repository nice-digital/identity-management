import isExisting from "./isExisting.js";
import selectors from "../selectors.js";

export async function emailInput(falseCase: string): Promise<void> {
   await isExisting(selectors.registrationPage.emailInput, falseCase);
};

export default emailInput;