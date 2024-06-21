import isExisting from "./isExisting.js";
import selectors from "../selectors.js";

export async function signUpSurnameInput(falseCase: string): Promise<void> {
   await isExisting(selectors.registrationPage.surnameInput, falseCase);
};

export default signUpSurnameInput;