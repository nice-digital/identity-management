const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ? 
    process.env.REACT_APP_API_BASE_URL : 
    '#{REACT_APP_API_BASE_URL}';

export const Endpoints = {
    usersList: `${API_BASE_URL}/users` // get all users
};
