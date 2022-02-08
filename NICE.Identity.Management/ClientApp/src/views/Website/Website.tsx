import React, { Component } from "react";

import { RouteComponentProps, Link } from "react-router-dom";
import { StaticContext } from "react-router";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Table } from "@nice-digital/nds-table";
import { Grid, GridItem } from "@nice-digital/nds-grid";

import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { RoleType, WebsiteUsersAndRolesType } from "../../models/types";
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
	error?: Error;
	redirect: boolean;
	isLoading: boolean;
};

export class Website extends Component<WebsiteProps, WebsiteState> {
    constructor(props: WebsiteProps) {
		super(props);

		this.state = {
			websiteUsersAndRoles: {} as WebsiteUsersAndRolesType,
			redirect: false,
			isLoading: true,
		};
	}

    async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const websiteUsersAndRoles = await fetchData(Endpoints.usersAndRolesByWebsite(this.props.match.params.id));

		if (isDataError(websiteUsersAndRoles)) {
			this.setState({ error: websiteUsersAndRoles });
		}

		this.setState({ websiteUsersAndRoles, isLoading: false });
		document.title = `NICE Accounts - ${websiteUsersAndRoles.website.host}`;
	}

	getRolesToFilterBy = (websiteUsersAndRoles: WebsiteUsersAndRolesType): Array<string> => {

		const rolesList: Array<string> = []

		websiteUsersAndRoles.usersAndRoles
			.slice(0)
			.map((user) => {
				user.roles
					.slice(0)
					.map((roles) => {
						if (!rolesList.includes(roles.name))	{
							rolesList.push(roles.name)
						}
					})
			});	

		console.log(rolesList)
		return rolesList
	}

	filterUsersByRoles = (): void => {
		this.setState({ isLoading: true });
	}

    render(): JSX.Element {
		const { websiteUsersAndRoles, isLoading } = this.state;
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
								filters={this.getRolesToFilterBy(websiteUsersAndRoles)}
								selected={[""]}
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
									{websiteUsersAndRoles.usersAndRoles
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