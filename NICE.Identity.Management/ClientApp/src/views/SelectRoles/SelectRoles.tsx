import React, { Component } from "react";
import { RouteComponentProps, Link, Switch, Route } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import {
	EnvironmentType,
	ServiceType,
	UserType,
	RoleType,
} from "../../models/types";
import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { Endpoints } from "../../data/endpoints";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

type TParams = { id: string; serviceId: string; environmentId: string };

type SelectRolesProps = {} & RouteComponentProps<TParams>;

type SelectRolesState = {
	user: UserType;
	service: ServiceType;
	environment: EnvironmentType;
	roles: Array<RoleType>;
	error?: Error;
	isLoading: boolean;
};

export class SelectRoles extends Component<SelectRolesProps, SelectRolesState> {
	constructor(props: SelectRolesProps) {
		super(props);
		this.state = {
			user: {} as UserType,
			service: {} as ServiceType,
			environment: {} as EnvironmentType,
			roles: [],
			isLoading: true,
		};
	}

	async componentDidMount() {
		this.setState({ isLoading: true });

		let user = await fetchData(Endpoints.user(this.props.match.params.id));
		let service = await fetchData(
			Endpoints.service(this.props.match.params.serviceId),
		);

		if (isDataError(user)) {
			this.setState({ error: user });
		}
		if (isDataError(service)) {
			this.setState({ error: service });
		}

		let environment = service.websites;
		let roles = service.roles.filter(
			(role: RoleType) =>
				role.websiteId.toString() === this.props.match.params.environmentId,
		);

		this.setState({ user, service, environment, roles, isLoading: false });
	}

	render() {
		const { user, service, environment, roles, error, isLoading } = this.state;
		const { id, serviceId } = this.props.match.params;

		let nameBreadcrumb = `${user.firstName} ${user.lastName}`;

		if (isLoading) {
			nameBreadcrumb = "Loading user details";
		}
		if (error) {
			nameBreadcrumb = "Error";
		}

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb to="/users" elementType={Link}>
						Users
					</Breadcrumb>
					<Breadcrumb to={`/users/${id}`} elementType={Link}>
						{nameBreadcrumb}
					</Breadcrumb>
					<Breadcrumb to={`/users/${id}/services`} elementType={Link}>
						Select service
					</Breadcrumb>
					<Breadcrumb
						to={`/users/${id}/services/${serviceId}/environments`}
						elementType={Link}
					>
						Select environment
					</Breadcrumb>
					<Breadcrumb>Select role</Breadcrumb>
				</Breadcrumbs>

				{!error ? (
					<>
						<PageHeader
							preheading="Select environment for"
							heading={service.name}
						/>

						<Grid>
							<GridItem cols={8}>
								<StackedNav>
									{roles.map(role => {
										return (
											<StackedNavLink destination="/" elementType={Link}>
												{role.name}
											</StackedNavLink>
										);
									})}
								</StackedNav>
							</GridItem>
						</Grid>
					</>
				) : (
					<>
						<PageHeader heading="Error" />
						<ErrorMessage error={error}></ErrorMessage>
					</>
				)}
			</>
		);
	}
}
