import isExisting from "./isExisting.js";
import selectors from "../selectors.js";

export async function passwordInput(falseCase: string): Promise<void> {
   await isExisting(selectors.loginPage.passwordField, falseCase);
};

export default passwordInput;