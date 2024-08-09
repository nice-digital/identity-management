import checkUrl from '../check/checkURL.js';

export async function adminHomepage(): Promise<void> {
  await checkUrl(false, "http://idam:8080/overview");
};

export default adminHomepage;
