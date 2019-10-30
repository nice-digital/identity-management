const toDataQASelAttr = (attrValue) => `[data-qa-sel='${attrValue}']`;
const toNthChildAttr = (attrValue) => `.card:nth-child(${attrValue})`;
const toChildAndQASel = (childIndex, attrValue) => toNthChildAttr(childIndex) + ' ' + toDataQASelAttr(attrValue);

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
    userlist: toDataQASelAttr("list-of-users"),
    userCard: toNthChildAttr(1),
    roleField: toChildAndQASel(1, "list-of-users"),
    pageTitle: "h1",
  },
  adminUserPage: {
    deleteUserLink: toDataQASelAttr("delete-user-link"),
  },
  confirmUserDeletionPage: {
    confirmDeleteUser: toDataQASelAttr("confirm-delete-user"),
  },
  deletionAlertPage: {
    deletionSuccessMessage: toDataQASelAttr("deletion-success"),
    backToUsersLink: toDataQASelAttr("back-to-users"),
  },
  forgotPassword: {
    forgotPasswordEmail: toDataQASelAttr("forgotPassword-email"),
    forgotPasswordButton: toDataQASelAttr("forgotPassword-button"),
    forgotReturnToSignIn: toDataQASelAttr("forgotPassword-link-to-login"),
  }
};
