const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
	? process.env.REACT_APP_API_BASE_URL
	: "#{REACT_APP_API_BASE_URL}";

const APP_BASE_URL = API_BASE_URL.replace("/api", '');

export const Endpoints = {
	usersList: `${API_BASE_URL}/users`, // get all users
	user: (userId: string | number): string => `${API_BASE_URL}/users/${userId}`,
	usersByOrganisation: (organisationId: string | number): string => `${API_BASE_URL}/users/usersbyorganisation/${organisationId}`,
	servicesList: `${API_BASE_URL}/services`,
	service: (serviceId: string | number): string =>
		`${API_BASE_URL}/services/${serviceId}`,

	organisationsList: `${API_BASE_URL}/organisations`,

	organisation: (organisationId: string | number): string =>
		`${API_BASE_URL}/organisations/${organisationId}`,
	
	userRolesByWebsite: (userId: string | number, websiteId: string | number): string =>
		`${API_BASE_URL}/users/${userId}/rolesbywebsite/${websiteId}`,

	verificationEmail: `${API_BASE_URL}/VerificationEmail/VerificationEmail`,
	
	websitesList: `${API_BASE_URL}/websites`,
	identityManagementUser: `${APP_BASE_URL}/account/status`,
};
