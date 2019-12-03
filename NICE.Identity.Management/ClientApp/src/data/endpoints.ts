const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
	? process.env.REACT_APP_API_BASE_URL
	: "#{REACT_APP_API_BASE_URL}";

export const Endpoints = {
	usersList: `${API_BASE_URL}/api/users`, // get all users
	user: (userId: string | number) => `${API_BASE_URL}/api/users/${userId}`,

	servicesList: `${API_BASE_URL}/api/services`,
	service: (serviceId: string | number) =>
		`${API_BASE_URL}/api/services/${serviceId}`,

	userRolesByWebsite: (userId: string | number, websiteId: string | number) =>
		`${API_BASE_URL}/api/users/${userId}/rolesbywebsite/${websiteId}`,
};
