import React, { Component } from "react";
import { RouteComponentProps, Link, Switch, Route } from "react-router-dom";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

import { Endpoints } from "../../data/endpoints";
import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { ServiceType, UserType } from "../../models/types";

type TParams = { id: string };

type SelectServiceProps = {} & RouteComponentProps<TParams>;

type SelectServiceState = {
	user: UserType;
	services: Array<ServiceType>;
	error?: Error;
	isLoading: boolean;
};

export class SelectService extends Component<
	SelectServiceProps,
	SelectServiceState
> {
	constructor(props: SelectServiceProps) {
		super(props);
		this.state = {
			user: {} as UserType,
			services: [],
			isLoading: true,
		};
	}

	async componentDidMount() {
		this.setState({ isLoading: true });

		let user = await fetchData(Endpoints.user(this.props.match.params.id)),
			services = await fetchData(Endpoints.servicesList);

		if (isDataError(user)) {
			this.setState({ error: user });
		}
		if (isDataError(services)) {
			this.setState({ error: services });
		}

		this.setState({ user, services, isLoading: false });
	}

	render() {
		const { user, services, error, isLoading } = this.state;
		const { id } = this.props.match.params;

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
					<Breadcrumb>Select service</Breadcrumb>
				</Breadcrumbs>

				{!error ? (
					<>
						<PageHeader preheading="Select service" heading="Service list" />

						<Grid>
							<GridItem cols={12}>
								<StackedNav>
									{services.map(service => {
										return (
											<StackedNavLink
												destination={`${this.props.match.url}/${service.serviceId}/environments`}
												elementType={Link}
											>
												{service.name}
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
