import isExisting from '../check/isExisting.js';
import selectors from "../selectors";

export async function confirmPasswordInput(falseCase: string): Promise<void> {
   await isExisting(selectors.registrationPage.confirmPasswordInput, falseCase);
};

export default confirmPasswordInput;