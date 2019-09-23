const toDataQASelAttr = (attrValue) => `[data-qa-sel='${attrValue}']`;

export default {
  loginPage: {
    wrongEmailPasswordMessage: "body .alert",
    usernameField: toDataQASelAttr("login-email"),
    passwordField: toDataQASelAttr("login-password"),
    registerLink: toDataQASelAttr("Signup-link-login"),
    signInButton: toDataQASelAttr("login-button"),
  },
  registrationPage: {  
    signInLink: toDataQASelAttr("Signin-link-login"),  
    emailInput: toDataQASelAttr("email-register"),
    confirmEmailInput: toDataQASelAttr("confirm-email-register"),
    passwordInput: toDataQASelAttr("password-register"),
    confirmPasswordInput: toDataQASelAttr("confirm-password-register"),
    firstNameInput: toDataQASelAttr("name-register"),
    surnameInput: toDataQASelAttr("surname-register"),
    aiCheckBox: toDataQASelAttr("ai-checkbox-register"),
    tcCheckBox: toDataQASelAttr("tc-checkbox-register"),
    registerButton: toDataQASelAttr("Register-button"),
  },
  adminHomepage: {
    usernameField: "body input[name='userName']",
    roleField: "body input[name='role']",
    pageTitle: "h1",
  },
  forgotPassword: {
    forgotPasswordEmail: toDataQASelAttr("forgotPassword-email"),
    forgotPasswordButton: toDataQASelAttr("forgotPassword-button"),
    forgotReturnToSignIn: toDataQASelAttr("forgotPassword-link-to-login"),
  }
};
