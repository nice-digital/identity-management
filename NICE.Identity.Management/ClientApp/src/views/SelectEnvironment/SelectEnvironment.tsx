import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";
import { Endpoints } from "src/data/endpoints";
import { fetchData } from "src/helpers/fetchData";
import { isDataError } from "src/helpers/isDataError";
import type { UserType, ServiceType, WebsiteType } from "src/models/types";
import { ErrorMessage } from "src/components/ErrorMessage/ErrorMessage";

type TParams = { id: string; serviceId: string };

type SelectEnvironmentProps = Record<string, unknown> &
	RouteComponentProps<TParams>;

type SelectEnvironmentState = {
	user: UserType;
	service: ServiceType;
	websites: Array<WebsiteType>;
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
			websites: [],
			isLoading: true,
		};
		document.title = "NICE Accounts - Select environment";
	}

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const user = await fetchData(Endpoints.user(this.props.match.params.id));
		const service = await fetchData(
			Endpoints.service(this.props.match.params.serviceId),
		);

		if (isDataError(user)) {
			this.setState({ error: user });
		}
		if (isDataError(service)) {
			this.setState({ error: service });
		}

		const websites = service.websites;

		this.setState({ user, service, websites, isLoading: false });
	}

	render(): JSX.Element {
		const { user, service, websites, error, isLoading } = this.state;
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
					<Breadcrumb
						data-qa-sel="breadcrumb-administration-link"
						to="/"
						elementType={Link}
					>
						Administration
					</Breadcrumb>
					<Breadcrumb
						data-qa-sel="breadcrumb-user-link"
						to="/users"
						elementType={Link}
					>
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
							heading={isLoading ? "Service name" : service.name}
						/>

						<Grid>
							<GridItem cols={8}>
								{isLoading ? (
									<p>Loading...</p>
								) : (
									<StackedNav aria-label="Environments">
										{websites.map((website) => {
											return (
												<StackedNavLink
													destination={`${url}/${website.id}/roles`}
													elementType={Link}
													key={website.id}
												>
													{website.environment.name}
												</StackedNavLink>
											);
										})}
									</StackedNav>
								)}
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
