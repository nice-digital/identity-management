const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
	? process.env.REACT_APP_API_BASE_URL
	: "#{REACT_APP_API_BASE_URL}";

export const Endpoints = {
	usersList: `${API_BASE_URL}/users`, // get all users
	user: (userId: string | number) => `${API_BASE_URL}/users/${userId}`,

	servicesList: `${API_BASE_URL}/services`,
	service: (serviceId: string | number) =>
		`${API_BASE_URL}/services/${serviceId}`,

	userRolesList: `${API_BASE_URL}/userRoles/`,
	userRole: (userRoleId: string | number) =>
		`${API_BASE_URL}/userRoles/${userRoleId}`,

	userRolesByWebsiteList: `${API_BASE_URL}/userRolesByWebsite/`,
	userRolesByWebsite: (websiteId: string | number) =>
		`${API_BASE_URL}/userRolesByWebsite/${websiteId}`,
};
