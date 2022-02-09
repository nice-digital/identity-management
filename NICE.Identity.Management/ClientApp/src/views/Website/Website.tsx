import React, { Component } from "react";

import { RouteComponentProps, Link } from "react-router-dom";
import { StaticContext } from "react-router";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Table } from "@nice-digital/nds-table";
import { Grid, GridItem } from "@nice-digital/nds-grid";

import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { UserAndRolesType, WebsiteUsersAndRolesType } from "../../models/types";
import { Endpoints } from "../../data/endpoints";
import { FilterBox } from "../../components/FilterBox/FilterBox";

type TParams = { id: string };

type LocationState = {
	hasBeenEdited: boolean;
};

type WebsiteProps = Record<string, unknown> &
	RouteComponentProps<TParams, StaticContext, LocationState>;

type WebsiteState = {
	websiteUsersAndRoles: WebsiteUsersAndRolesType;
	usersAndRoles: Array<UserAndRolesType>;
	error?: Error;
	redirect: boolean;
	isLoading: boolean;
	rolesForFilter: Array<string>;
	roleFiltersChecked: Array<string>;
};

export class Website extends Component<WebsiteProps, WebsiteState> {
    constructor(props: WebsiteProps) {
		super(props);

		this.state = {
			websiteUsersAndRoles: {} as WebsiteUsersAndRolesType,
			usersAndRoles: [],
			redirect: false,
			isLoading: true,
			rolesForFilter: [],
			roleFiltersChecked: []
		};
	}

    async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const websiteUsersAndRoles = await fetchData(Endpoints.usersAndRolesByWebsite(this.props.match.params.id));

		if (isDataError(websiteUsersAndRoles)) {
			this.setState({ error: websiteUsersAndRoles });
		} else {
			const allRoles: Array<string> = []
			websiteUsersAndRoles.usersAndRoles
				.slice(0)
				.map((user: UserAndRolesType) => {
					user.roles
						.slice(0)
						.map((roles) => {
							allRoles.push(roles.name)
						})
				});	
			
			const rolesForFilter = allRoles.reduce(function (
				accumulatedRoles: string[],
				currentRoles: string,
			) {
				if (accumulatedRoles.indexOf(currentRoles) === -1) {
					accumulatedRoles.push(currentRoles);
				}
				return accumulatedRoles;
			},
			[]);

			this.setState({ rolesForFilter });

		}

		this.setState({ websiteUsersAndRoles, usersAndRoles: websiteUsersAndRoles.usersAndRoles, isLoading: false });
		document.title = `NICE Accounts - ${websiteUsersAndRoles.website.host}`;
	}

	getListOfUsersByFilteredRole = (
		roleFiltersChecked: Array<string>,
		usersAndRoles: Array<UserAndRolesType>
	): Array<UserAndRolesType> => {
		const usersfilteredByRoles: Array<UserAndRolesType> = []

		usersAndRoles
			.slice(0)
			.map((user: UserAndRolesType) => {
				user.roles
					.slice(0)
					.map((role) => {
						if (roleFiltersChecked.includes(role.name)) {
							if (usersfilteredByRoles.indexOf(user) === -1) {
								usersfilteredByRoles.push(user)
							}
						}
					})
			});	

		return usersfilteredByRoles
	}

	filterUsersByRoles = (role: string): void => {
		this.setState({ isLoading: true });

		let roleFiltersChecked = this.state.roleFiltersChecked;

		roleFiltersChecked = roleFiltersChecked.includes(role)
			? roleFiltersChecked.filter(
					(roleFilter) => roleFilter !== role,
					)
			: roleFiltersChecked.concat(role);

		// const itemsPerPage = Number(this.state.itemsPerPage)
		// 	? Number(this.state.itemsPerPage)
		// 	: this.state.itemsPerPage;

		let usersAndRoles = this.state.websiteUsersAndRoles.usersAndRoles;
		// 	pageNumber = this.state.pageNumber;

		if (roleFiltersChecked.length) {
			usersAndRoles = this.getListOfUsersByFilteredRole(
				roleFiltersChecked,
				usersAndRoles,
			);
		}

		// pageNumber = this.pastPageRange(
		// 	itemsPerPage,
		// 	pageNumber,
		// 	this.state.websites.length,
		// );

		this.setState({ usersAndRoles, isLoading: false, roleFiltersChecked });
	}

    render(): JSX.Element {
		const { websiteUsersAndRoles, usersAndRoles, isLoading } = this.state;
		const lastBreadcrumb = isLoading ? "Loading service details" : websiteUsersAndRoles.website.service.name;

        return(
            <>
				<Breadcrumbs>
					<Breadcrumb to="/overview" elementType={Link}>
						Services
					</Breadcrumb>
					<Breadcrumb>{lastBreadcrumb}</Breadcrumb>
				</Breadcrumbs>

				<PageHeader
					heading={isLoading ? "Service name" : `${websiteUsersAndRoles.website.service.name} (${websiteUsersAndRoles.website.environment.name})`}
				/>

				{isLoading ? (
					<p>Loading...</p>
				) : (
					<Grid>
						<GridItem cols={12} md={3}>
							<FilterBox
								name="Roles"
								filters={this.state.rolesForFilter}
								selected={this.state.roleFiltersChecked}
								onCheckboxChange={this.filterUsersByRoles}
								hideFilterPanelHeading={true}
							/>
						</GridItem>
						<GridItem cols={12} md={9} aria-busy={true} >
							<h2 className="h3">Showing XX to 25 of XX of all roles</h2>
							<Table style={{ display: "table" }}>
								<thead>
									<tr>
										<th>User name</th>
										<th>Email address</th>
										<th>Roles(s)</th>
										<th>Is staff</th>
									</tr>
								</thead>
								<tbody>
									{usersAndRoles
										.slice(0)
										.map((user) => (
											<tr key={user.user.nameIdentifier}>
												<td>
													{user.user.firstName} {user.user.lastName}
												</td>
												<td>
													{user.user.emailAddress}
												</td>
												<td>
													{user.roles
														.slice(0)
														.map((roles, index) => (
															<div key={index}>{roles.name}</div>
													))}
												</td>
												<td>
													{user.user.isStaffMember ? "Yes" : "No"}
												</td>
											</tr>
									))}
								</tbody>
							</Table>
						</GridItem>
					</Grid>
				)}
            </>
        );
    }
}