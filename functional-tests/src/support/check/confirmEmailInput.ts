import isExisting from '../check/isExisting.js';
import selectors from "../selectors.js";

export async function confirmEmailInput(falseCase: string): Promise<void> {
   await isExisting(selectors.registrationPage.confirmEmailInput, falseCase);
};

export default confirmEmailInput;