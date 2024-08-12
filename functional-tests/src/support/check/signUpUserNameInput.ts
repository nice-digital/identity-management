import isExisting from "./isExisting.js";
import selectors from "../selectors.js";

export async function signUpUserNameInput(falseCase: string): Promise<void> {
   await isExisting(selectors.registrationPage.firstNameInput, falseCase);
};

export default signUpUserNameInput;