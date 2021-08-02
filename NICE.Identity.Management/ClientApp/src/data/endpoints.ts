const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
	? process.env.REACT_APP_API_BASE_URL
	: "#{REACT_APP_API_BASE_URL}";

export const Endpoints = {
	usersList: `${API_BASE_URL}/users`, // get all users
	user: (userId: string | number): string => `${API_BASE_URL}/users/${userId}`,

	servicesList: `${API_BASE_URL}/services`,
	service: (serviceId: string | number): string =>
		`${API_BASE_URL}/services/${serviceId}`,
	
	userRolesByWebsite: (userId: string | number, websiteId: string | number): string =>
		`${API_BASE_URL}/users/${userId}/rolesbywebsite/${websiteId}`,

	verificationEmail: `${API_BASE_URL}/VerificationEmail/VerificationEmail`,
	websitesList: `${API_BASE_URL}/websites`,
};
