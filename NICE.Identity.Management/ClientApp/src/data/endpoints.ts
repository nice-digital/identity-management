const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
	? process.env.REACT_APP_API_BASE_URL
	: "#{REACT_APP_API_BASE_URL}";

const AUTH0_API_URL = process.env.REACT_APP_AUTH0_API_URL
	? process.env.REACT_APP_AUTH0_API_URL
	: "#{REACT_APP_AUTH0_API_URL}";

export const Endpoints = {
	usersList: `${API_BASE_URL}/users`, // get all users
	user: (userId: string | number) => `${API_BASE_URL}/users/${userId}`,

	servicesList: `${API_BASE_URL}/services`,
	service: (serviceId: string | number) =>
		`${API_BASE_URL}/services/${serviceId}`,

	userRolesByWebsite: (userId: string | number, websiteId: string | number) =>
		`${API_BASE_URL}/users/${userId}/rolesbywebsite/${websiteId}`,
	managementApiToken: `${API_BASE_URL}/admin/getmanagementapitoken`,
	statistics: `${AUTH0_API_URL}/stats/daily`,
};
