const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
	? process.env.REACT_APP_API_BASE_URL
	: "#{REACT_APP_API_BASE_URL}";

const APP_BASE_URL = `${API_BASE_URL}` == 'http://api:8090' ? `${API_BASE_URL}` : API_BASE_URL.replace("/api", '');

export const Endpoints = {
	identityManagementUser: `${APP_BASE_URL}/account/status`, // accesses the account controller to get the status endpoint which returns JSON data containing the username.
	job: (jobId: string | number): string => `${API_BASE_URL}/jobs/${jobId}`,
	jobs: `${API_BASE_URL}/jobs`,
	organisation: (organisationId: string | number): string => `${API_BASE_URL}/organisations/${organisationId}`,
	organisationsList: `${API_BASE_URL}/organisations`,
	organisationsListSearch: (searchQuery: string): string => `${API_BASE_URL}/organisations?q=${searchQuery}`,
	service: (serviceId: string | number): string => `${API_BASE_URL}/services/${serviceId}`,
	servicesList: `${API_BASE_URL}/services`,
	user: (userId: string | number): string => `${API_BASE_URL}/users/${userId}`,
	usersList: `${API_BASE_URL}/users`,
	usersListSearch: (searchQuery: string): string => `${API_BASE_URL}/users?q=${searchQuery}`,
	usersByOrganisation: (organisationId: string | number): string => `${API_BASE_URL}/users/usersbyorganisation/${organisationId}`,
	usersAndJobIdsByOrganisation: (organisationId: string | number): string => `${API_BASE_URL}/users/usersandjobidsbyorganisation/${organisationId}`,	
	userRolesByWebsite: (userId: string | number, websiteId: string | number): string => `${API_BASE_URL}/users/${userId}/rolesbywebsite/${websiteId}`,
	usersAndRolesByWebsite: (websiteId: string | number): string =>	`${API_BASE_URL}/websites/${websiteId}/usersandrolesbywebsite`,
	verificationEmail: `${API_BASE_URL}/VerificationEmail/VerificationEmail`,
	website: (websiteId: string | number): string => `${API_BASE_URL}/websites/${websiteId}`,		
	websitesList: `${API_BASE_URL}/websites`,
};
