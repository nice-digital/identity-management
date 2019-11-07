export type UserType = {
	userId: number;
	auth0UserId: string;
	firstName: string;
	lastName: string;
	emailAddress: string;
	hasVerifiedEmailAddress: boolean;
	isLockedOut: boolean;
	acceptedTerms: boolean;
	roles: Array<RoleType>;
};

export type EnvironmentType = {
	id: number;
	environmentName: string;
	host: string;
};

export type RoleType = {
	id: number;
	name: string;
	websiteId: number;
};

export type ServiceType = {
	id: number;
	name: string;
	websites: Array<EnvironmentType>;
	roles: Array<RoleType>;
};
