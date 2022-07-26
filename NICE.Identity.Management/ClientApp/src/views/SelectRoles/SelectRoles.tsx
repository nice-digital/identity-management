import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { type EnvironmentType, type ServiceType, type UserType, type RoleType, type WebsiteType } from "src/models/types";
import { fetchData } from "src/helpers/fetchData";
import { isDataError } from "src/helpers/isDataError";
import { Endpoints } from "src/data/endpoints";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { Button } from "@nice-digital/nds-button";

import { ErrorMessage } from "src/components/ErrorMessage/ErrorMessage";
import { AddRoleConfirmation } from "src/components/AddRoleConfirmation/AddRoleConfirmation";
import { ToggleCheckbox } from "src/components/ToggleCheckbox/ToggleCheckbox";

import "@nice-digital/nds-checkbox/scss/checkbox.scss";

type TParams = { id: string; serviceId: string; websiteId: string };

type SelectRolesProps = Record<string, unknown> & RouteComponentProps<TParams>;

type SelectRolesState = {
	user: UserType;
	roles: Array<RoleType>;
	service: ServiceType;
	website: WebsiteType;
	environment: EnvironmentType;
	hasBeenUpdated: boolean;
	error?: Error;
	isLoading: boolean;
	isButtonDisabled: boolean;
};

export class SelectRoles extends Component<SelectRolesProps, SelectRolesState> {
	constructor(props: SelectRolesProps) {
		super(props);
		this.state = {
			user: {} as UserType,
			roles: [],
			service: {} as ServiceType,
			website: {} as WebsiteType,
			environment: {} as EnvironmentType,
			hasBeenUpdated: false,
			isLoading: true,
			isButtonDisabled: false,
		};

		document.title = "NICE Accounts - Select role";
	}

	handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const checkbox = e.target;
		const roles = this.state.roles;

		roles.forEach((role) => {
			if (role.id.toString() === checkbox.value) {
				role.hasRole = !role.hasRole;
			}
		});

		this.setState({ roles });
	};

	handleFormSubmission = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();

		this.setState({ isButtonDisabled: true });

		const fetchOptions = {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ roles: this.state.roles }),
		};

		const roles = await fetchData(
			Endpoints.userRolesByWebsite(
				this.props.match.params.id,
				this.props.match.params.websiteId,
			),
			fetchOptions,
		);

		if (isDataError(roles)) {
			this.setState({ error: roles });
		} else {
			this.setState({ hasBeenUpdated: true });
		}

		this.setState({ isButtonDisabled: false });
	};

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const user = await fetchData(Endpoints.user(this.props.match.params.id));
		const userRolesByWebsite = await fetchData(
			Endpoints.userRolesByWebsite(
				this.props.match.params.id,
				this.props.match.params.websiteId,
			),
		);

		if (isDataError(user)) {
			this.setState({ error: user });
		}

		if (isDataError(userRolesByWebsite)) {
			this.setState({ error: userRolesByWebsite });
		}

		const { roles, service, website } = userRolesByWebsite;

		const environment = website ? website.environment : {};

		this.setState({
			user,
			roles,
			service,
			website,
			environment,
			isLoading: false,
		});
	}

	render(): JSX.Element {
		const {
			user,
			roles,
			service,
			environment,
			hasBeenUpdated,
			error,
			isLoading,
			isButtonDisabled,
		} = this.state;
		const { id, serviceId } = this.props.match.params;

		let nameBreadcrumb = `${user.firstName} ${user.lastName}`;

		if (isLoading) {
			nameBreadcrumb = "Loading user details";
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
					{error ? (
						<Breadcrumb>Error</Breadcrumb>
					) : (
						<Breadcrumb to={`/users/${id}`} elementType={Link}>
							{nameBreadcrumb}
						</Breadcrumb>
					)}
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
							preheading="Select roles for"
							heading={
								isLoading
									? "User details"
									: `${service.name} (${environment.name})`
							}
						/>

						{hasBeenUpdated && (
							<Grid>
								<GridItem cols={12} md={9}>
									<AddRoleConfirmation
										id={user.userId}
										fullName={`${user.firstName} ${user.lastName}`}
									/>
								</GridItem>
							</Grid>
						)}

						<Grid>
							<GridItem cols={12} md={9}>
								{isLoading ? (
									<p>Loading...</p>
								) : (
									<form onSubmit={this.handleFormSubmission}>
										{roles.map((role) => {
											const props = {
												id: role.id,
												name: role.name,
												description: role.description,
												isSelected: role.hasRole,
												isDisabled: isButtonDisabled,
												onCheckboxChange: this.handleCheckboxChange,
											};

											return <ToggleCheckbox {...props} key={role.id} />;
										})}
										<Button
											buttonType="submit"
											disabled={isButtonDisabled}
											className="mt--d"
										>
											{isButtonDisabled ? "Loading..." : "Save"}
										</Button>
									</form>
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
