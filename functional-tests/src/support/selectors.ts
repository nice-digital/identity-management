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
  adminHomePage: {
    manageUsersButton: toDataQASelAttr('manage-users'),
    manageServicesButton: toDataQASelAttr('manage-services'),
    manageOrganisationsButton: toDataQASelAttr('manage-organisations'),
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
  websiteListPage: {
    websitelist: toDataQASelAttr('list-of-websites'),
    firstWebsiteCard: toChildAndQASel(1, 'list-of-websites'),
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
  validateAdminUserServicePage: {
    pageServiceResultCount: toDataQASelAttr("services-returned"),
    pageUserResultCount: toDataQASelAttr("users-returned"),
  },
  validateAdminOrganisationPage: {
    pageOrganisationResultCount: toDataQASelAttr("organisations-returned"),
  },
  UserProfile: {
    editButton: toDataQASelAttr('edit-profile-button'),
    updatedUserName: toDataQASelAttr('name-user-profile'),
    updatedEmailAddress: toDataQASelAttr('email-user-profile'),
    updatedAudienceInsight: toDataQASelAttr('audience-user-profile'),
    SuccessfulMessage: toDataQASelAttr('successful-message-user-profile'),

   },
  editUserProfile: {
   
    EmailAddress: toDataQASelAttr('email-input-edit-user'),
    FirstName: toDataQASelAttr('firstname-input-edit-user'),
    LastName: toDataQASelAttr('lastname-input-edit-user'),
    optIn: '.radio__label',
    optOut: toDataQASelAttr('optOut-radio-edit-user'),
    saveProfileButton: toDataQASelAttr('save-button-edit-user'),
    userBreadcrumb: toDataQASelAttr('breadcrumb-user-link'), 
   },

  organisationListPage: {

    addNewOrganisation: toDataQASelAttr('add-organisation'),
    deleteOrgName: toDataQASelAttr('filter-search-input'),
    numberResultsOnPage: toDataQASelAttr("result-on-the-page-index"),
		sortAlphaDescending: toDataQASelAttr("sort-alpha-desc"),
		sortDateDescending: toDataQASelAttr("sort-date-desc"),
    organisationlist: toDataQASelAttr("list-of-organisations"),
    firstOrgCard: toChildAndQASel(1, "list-of-organisations"),
    
     },
  manageOrgPage: {
    
    deleteNewOrgName: toDataQASelAttr('name-input-add-organisation'),
    dateAdded: toDataQASelAttr('dateAdded-organisation'),
    findUser: '.list--unstyled > li:nth-child(2) > span:nth-child(2)',
    editOrganisation: toDataQASelAttr('edit-organisation-button'),
    editOrganisationName: toDataQASelAttr('name-input-edit-organisation'),
    saveEditOrgButton: toDataQASelAttr('save-button-edit-organisation'),
    editResponseFeedback: toDataQASelAttr('successful-message-edit-organisation'),

    }, 

  addNewOrganisation: {
    
    inputOrganisationName: toDataQASelAttr('name-input-add-organisation'),
    saveNewOrgButton: toDataQASelAttr('save-button-add-organisation'),
    submitResponseFeedback: toDataQASelAttr('successful-message-add-organisation'),
    errorMessage: '.input__error',
   },
 
};