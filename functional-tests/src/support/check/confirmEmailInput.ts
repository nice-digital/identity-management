import isExisting from '../check/isExisting.js';
import selectors from "../selectors";

export async function confirmEmailInput(falseCase: boolean): Promise<void> {
   await isExisting(selectors.registrationPage.confirmEmailInput, falseCase);
};

export default confirmEmailInput;