import React, { Component } from "react";
import { RouteComponentProps, Link, Switch, Route } from "react-router-dom";

import { Endpoints } from "../../data/endpoints";
import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { UserType, ServiceType, EnvironmentType } from "../../models/types";
import { User } from "../User/User";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";

type TParams = { id: string; serviceId: string };

type SelectEnvironmentProps = {} & RouteComponentProps<TParams>;

type SelectEnvironmentState = {
	user: UserType;
	service: ServiceType;
	environments: Array<EnvironmentType>;
	error?: Error;
	isLoading: boolean;
};

export class SelectEnvironment extends Component<
	SelectEnvironmentProps,
	SelectEnvironmentState
> {
	constructor(props: SelectEnvironmentProps) {
		super(props);
		this.state = {
			user: {} as UserType,
			service: {} as ServiceType,
			environments: [],
			isLoading: true,
		};
	}

	async componentDidMount() {
		let user = await fetchData(Endpoints.user(this.props.match.params.id)),
			service = await fetchData(
				Endpoints.service(this.props.match.params.serviceId),
			);

		if (isDataError(user)) {
			this.setState({ error: user });
		}
		if (isDataError(service)) {
			this.setState({ error: service });
		}

		let environments = service.websites;

		this.setState({ user, service, environments, isLoading: false });
	}

	render() {
		const { user, service, environments, error, isLoading } = this.state;
		const { params, url } = this.props.match;
		const { id } = params;

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
					<Breadcrumb>Select environment</Breadcrumb>
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
									{environments.map(environment => {
										return (
											<StackedNavLink
												destination={`${url}/${environment.id}/roles`}
												elementType={Link}
											>
												{environment.environmentName}
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
