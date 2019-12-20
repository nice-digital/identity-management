export type UserType = {
	userId: number;
	emailAddress: string;
	nameIdentifier: string;
	firstName: string;
	lastName: string;
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
	id: number;
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
	id: number;
	name: string;
};

export type RoleType = {
	id: number;
	name: string;
	description: string;
	hasRole: boolean;
};
