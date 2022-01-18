export type UserType = {
	userId: number;
	emailAddress: string;
	nameIdentifier: string;
	firstName: string;
	lastName: string;
	hasVerifiedEmailAddress: boolean;
	isLockedOut: boolean;
	acceptedTerms: boolean;
	initialRegistrationDate: Date;
	lastLoggedInDate: Date;
	isMigrated: boolean;
	isInAuthenticationProvider: boolean;
	allowContactMe: boolean;
	isStaffMember: boolean;
	hasAccessToWebsiteIds: Array<number>;
	userEmailHistory: Array<UserEmailHistoryType>;
};

export type UserEmailHistoryType = {
    userEmailHistoryId: number;
    userId: number;
    emailAddress: string;
    archivedByUserId?: number;
    archivedDateUTC: string;
    archivedByUserDisplayName?: string;
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

export type OrganisationType = {
	id: number;
	name: string;
	dateAdded: Date;
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
	environmentId: number;
	service: ServiceType;
};

export type EnvironmentType = {
	id: number;
	name: string;
	order: number;
};

export type RoleType = {
	id: number;
	name: string;
	description: string;
	hasRole: boolean;
};

export type HistoryLocationType = {
	pathname: string;
	search: string;
	hash: string;
	state?: any;
	key?: string;
};

export type HistoryType = {
	push: (url: string) => void;
	listen: (
		location: HistoryLocationType,
		action: "PUSH" | "REPLACE" | "POP" | null,
	) => void;
	location: HistoryLocationType;
};
