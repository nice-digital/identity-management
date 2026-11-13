import checkUrl from "./checkURL.js";


export async function identityLogInPage(): Promise<void> {
  await checkUrl(false, "https://idam/Account/Logout"); //this is a hack. Need to sort out logout issue.
}

export default identityLogInPage;