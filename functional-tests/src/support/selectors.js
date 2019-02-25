export default {
  loginPage: {
    wrongEmailPasswordMessage: "#auth0-lock-container-1 > div > div.auth0-lock-center > form > div > div > div:nth-child(2) > div > div > span > span",
    userNameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    confirmEmailInput: 'input[name="username"]',
    confirmPasswordInput: 'input[name="password"]',
    registerLink: 'a[href ="#/register"]',
  },
  registrationPage: {    
    emailInput: 'input[name="email"]',
    passwordInput: 'input[name="password"]',
    confirmEmailInput: 'input[name="confirmEmail"]',
    confirmPasswordInput: 'input[name="confirmPassword"]',
    nameInput: 'input[name="name"]',
    surnameInput: 'input[name="surname"]',
    registerLink: 'a[href ="#/register"]',
  }
};
