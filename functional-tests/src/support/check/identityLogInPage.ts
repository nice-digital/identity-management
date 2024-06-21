import checkUrl from "./checkURL.js";


export async function identityLogInPage(): Promise<void> {
  await checkUrl(false, "http://idam:8080/users"); //this is a hack. Need to sort out logout issue.
}

export default identityLogInPage;