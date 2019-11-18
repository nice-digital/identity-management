export type UserType = {
	userId: number;
	auth0UserId: string;
	firstName: string;
	lastName: string;
	emailAddress: string;
	hasVerifiedEmailAddress: boolean;
	isLockedOut: boolean;
	acceptedTerms: boolean;
};

export type WebsiteType = {
	websiteId: number;
	host: string;
	environment: EnvironmentType;
	service: ServiceType;
	roles: Array<RoleType>;
};

export type EnvironmentType = {
	environmentId: number;
	name: string;
};

export type RoleType = {
	id: number;
	name: string;
	hasRole: boolean;
};

export type UserRoleType = {
	userRoleId: number;
	roleId: number;
	userId: number;
};

export type ServiceType = {
	serviceId: number;
	name: string;
	websites: Array<EnvironmentType>;
};
