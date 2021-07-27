const toDataQASelAttr = (attrValue) => `[data-qa-sel='${attrValue}']`;
const toNthChildAttr = (attrValue) => `> :nth-child(${attrValue}) a`;
const toChildAndQASel = (childIndex, attrValue) =>
  toDataQASelAttr(attrValue) + ' ' + toNthChildAttr(childIndex);

export default {
  loginPage: {
    wrongEmailPasswordMessage: 'body .alert',
    usernameField: toDataQASelAttr('login-email'),
    passwordField: toDataQASelAttr('login-password'),
    registerLink: toDataQASelAttr('Signup-link-login'),
    signInButton: toDataQASelAttr('login-button'),
  },
  registrationPage: {
    signInLink: toDataQASelAttr('Signin-link-login'),
    emailInput: toDataQASelAttr('email-register'),
    confirmEmailInput: toDataQASelAttr('confirm-email-register'),
    passwordInput: toDataQASelAttr('password-register'),
    confirmPasswordInput: toDataQASelAttr('confirm-password-register'),
    firstNameInput: toDataQASelAttr('name-register'),
    surnameInput: toDataQASelAttr('surname-register'),
    aiCheckBox: toDataQASelAttr('ai-checkbox-register'),
    tcCheckBox: toDataQASelAttr('tc-checkbox-register'),
    registerButton: toDataQASelAttr('Register-button'),
    emailValidationMessage: '.input.input--error:nth-child(3)',
    passwordValidationMessage: '.input.input--error:nth-child(4)',
    confirmPasswordValidationMessage: '.input.input--error:nth-child(5)',
    firstNameValidationMessage: '.input.input--error:nth-child(6)',
    lastNameValidationMessage: '.input.input--error:nth-child(7)',
  },
  adminHomePage:{
    manageUsersButton: toDataQASelAttr('manage-users'),
    manageServicesButton: toDataQASelAttr('manage-services')
  },
  userListPage: {
    userlist: toDataQASelAttr('list-of-users'),
    firstUserCard: toChildAndQASel(1, 'list-of-users'),
    secondUserCard: toChildAndQASel(2, 'list-of-users'),
    thirdUserCard: toChildAndQASel(3, 'list-of-users'),
    fourthUserCard: toChildAndQASel(4, 'list-of-users'),
    secondUserStatus: "body [data-qa-sel='list-of-users'] > :nth-child(2) span",
    lastUserCard:
      'body [data-qa-sel="list-of-users"] > li:last-of-type > .card:last-of-type a',
    roleField: toChildAndQASel(1, 'list-of-users'),
    pageTitle: 'h1',
    globalNavMyAccount: "[id$='my-account-button']",
    globalNavSignOut: "[id$='my-account']",
    userStatusListPage:
      "[data-qa-sel='list-of-users'] [data-qa-sel='user-status']",
  },
  adminUserPage: {
    deleteUserLink: toDataQASelAttr('delete-user-link'),
    lockUserButton: toDataQASelAttr('lock-user-button'),
    AddRoleButton: toDataQASelAttr('add-user-role-button'),
    usersBreadcrumb: toDataQASelAttr('breadcrumb-user-link'),
    userStatusActive: '.tag--live',
    userStatusLocked: '.tag--alpha',
    userStatus: toDataQASelAttr('user-status'),
  },
  confirmUserDeletionPage: {
    confirmDeleteUser: toDataQASelAttr('confirm-delete-user'),
  },
  deletionAlertPage: {
    deletionSuccessMessage: toDataQASelAttr('deletion-success'),
    backToUsersLink: toDataQASelAttr('back-to-users'),
  },
  forgotPassword: {
    forgotPasswordEmail: toDataQASelAttr('forgotPassword-email'),
    forgotPasswordButton: toDataQASelAttr('forgotPassword-button'),
    forgotReturnToSignIn: toDataQASelAttr('forgotPassword-link-to-login'),
  },
  serviceListPage: {
    firstService: '.stacked-nav__list-item:nth-of-type(1)',
    secondService: '.stacked-nav__list-item:nth-of-type(2)',
    thirdService: '.stacked-nav__list-item:nth-of-type(3)',
    fourthService: '.stacked-nav__list-item:nth-of-type(4)',
  },
  environmentListPage: {
    firstEnvironment: '.stacked-nav__list-item:nth-of-type(1)',
    secondEnvironment: '.stacked-nav__list-item:nth-of-type(2)',
    thirdEnvironment: '.stacked-nav__list-item:nth-of-type(3)',
    fourthEnvironment: '.stacked-nav__list-item:nth-of-type(4)',
  },
  rolesListPage: {
    firstRole: '.checkbox:nth-of-type(1)',
    secondRole: '.checkbox:nth-of-type(2)',
    thirdRole: '.checkbox:nth-of-type(3)',
    fourthRole: '.checkbox:nth-of-type(4)',
    saveButton: '.btn',
    roleChangeSuccess: '.alert--success',
  },
  serviceListPage: {
    servicelist: toDataQASelAttr('list-of-websites'),
  },
  adminDownloadPage: {
    filterByServiceNameUrl: toDataQASelAttr("filter-search-input"),
	  pageResultCount: toDataQASelAttr("services-returned"),
  //numberResultsOnPage: toDataQASelAttr("result-on-the-page-index"),
  // paginationSection: toDataQASelAttr("pagination-section"),
  //firstPager: toQAselAndChild("pagination-section", 1),
	//secondPager: toQAselAndChild("pagination-section", 2),
	//nextPager: "body .pagination__pager.next",
  //id="user-search" for filter
	},
};
