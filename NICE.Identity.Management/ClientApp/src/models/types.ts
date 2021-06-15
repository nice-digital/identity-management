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

export type EnvironmentType = {
	id: number;
	name: string;
};

export type ServiceWebsiteType = {
	id: number;
	host: string;
	environment: EnvironmentType;
};

export type ServiceType = {
	id: number;
	name: string;
	websites: Array<ServiceWebsiteType>;
};

export type WebsiteType = {
	id: number;
	service: ServiceType;
	serviceId: number;
	host: string;
	environment: EnvironmentType;
	environmentId: number;
};

export type RoleType = {
	id: number;
	name: string;
	description: string;
	hasRole: boolean;
};

export type UserRoleType = {
	id: number;
	website: WebsiteType;
	websiteId: number;
	name: string;
	description: string;
};

export type UserWithRolesType = {
	id: number;
	firstName: string;
	lastName: string;
	roleId: number;
	userId: number;
	role: UserRoleType;
};
