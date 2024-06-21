import isExisting from "./isExisting.js";
import selectors from "../selectors";

export async function userNameInput(falseCase: string): Promise<void> {
   await isExisting(selectors.loginPage.usernameField, falseCase);
};

export default userNameInput;