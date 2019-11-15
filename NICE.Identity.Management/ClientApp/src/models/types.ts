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

export type WebsiteType = {
	websiteId: number;
	host: string;
	environment: EnvironmentType;
};

export type EnvironmentType = {
	EnvironmentId: number;
	name: string;
};

export type RoleType = {
	id: number;
	name: string;
	hasRole: boolean;
};

export type ServiceType = {
	serviceId: number;
	name: string;
	websites: Array<EnvironmentType>;
};
