const toDataQASelAttr = (attrValue) => `[data-qa-sel='${attrValue}']`;
const toNthChildAttr = (attrValue) => `li:nth-child(${attrValue})`;
const toChildAndQASel = (childIndex, attrValue) => toDataQASelAttr(attrValue) + ' ' + toNthChildAttr(childIndex);

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
    emailValidationMessage: ".input.input--error:nth-child(3)",
    confirmEmailValidationMessage: ".input.input--error:nth-child(4)",
    passwordValidationMessage: ".input.input--error:nth-child(5)",
    confirmPasswordValidationMessage: ".input.input--error:nth-child(6)",
    firstNameValidationMessage: ".input.input--error:nth-child(7)",
    lastNameValidationMessage: ".input.input--error:nth-child(8)"
  },
  adminHomepage: {
    userlist: toDataQASelAttr("list-of-users"),
    firstUserCard: toChildAndQASel(1, "list-of-users"),
    secondUserCard: toChildAndQASel(2, "list-of-users"),
    thirdUserCard: toChildAndQASel(3, "list-of-users"),
    fourthUserCard: toChildAndQASel(4, "list-of-users"),
    roleField: toChildAndQASel(1, "list-of-users"),
    pageTitle: "h1",
    globalNavMyAccount: "[id$='my-account-button']",
    globalNavSignOut: "[id$='my-account']",
    userStatusListPage: "[data-qa-sel='list-of-users'] li:nth-child(2) .tag--alpha",
  },
  adminUserPage: {
    deleteUserLink: toDataQASelAttr("delete-user-link"),
    lockUserButton: toDataQASelAttr("lock-user-button"),
    usersBreadcrumb: toDataQASelAttr("breadcrumb-user-link"),
    userStatusActive: ".tag--live",
    userStatusLocked: ".tag--alpha",
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
