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

export type ServiceType = {
	id: number;
	name: string;
	websites: Array<ServiceWebsiteType>;
};

export type ServiceWebsiteType = {
	websiteId: number;
	host: string;
	environment: EnvironmentType;
};

export type UserRoleType = {
	userId: number;
	websites: Array<WebsiteType>;
};

export type WebsiteType = {
	id: number;
	serviceId: number;
	host: string;
	environment: EnvironmentType;
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
