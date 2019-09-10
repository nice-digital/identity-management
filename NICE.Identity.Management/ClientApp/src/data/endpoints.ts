const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
	? process.env.REACT_APP_API_BASE_URL
	: "#{REACT_APP_API_BASE_URL}";

export const Endpoints = {
	usersList: `${API_BASE_URL}/users`, // get all users
	user: (userId: string) => {
		return `${API_BASE_URL}/users/?user_id=${userId}`;
	},
	unlock: (id: number) => {
		return `${API_BASE_URL}/users/${id}`;
	},
};
