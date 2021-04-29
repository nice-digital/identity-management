import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import {
	EnvironmentType,
	ServiceType,
	UserType,
	RoleType,
	WebsiteType,
} from "../../models/types";
import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { Endpoints } from "../../data/endpoints";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Grid, GridItem } from "@nice-digital/nds-grid";
//import { Checkbox } from "@nice-digital/nds-checkbox";
import "@nice-digital/nds-checkbox/scss/checkbox.scss";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { AddRoleConfirmation } from "../../components/AddRoleConfirmation/AddRoleConfirmation";
import { ToggleCheckbox } from "../../components/ToggleCheckbox/ToggleCheckbox";
import { Button } from "@nice-digital/nds-button";

type TParams = { id: string; serviceId: string; websiteId: string };

type SelectRolesProps = {} & RouteComponentProps<TParams>;

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

		document.title = "NICE Accounts - Select role"
	}

	handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let checkbox = e.target;
		let roles = this.state.roles;

		roles.forEach(role => {
			if (role.id.toString() === checkbox.value) {
				role.hasRole = !role.hasRole;
			}
		});

		this.setState({ roles });
	};

	handleFormSubmission = async (e: any) => {
		e.preventDefault();

		this.setState({ isButtonDisabled: true });

		let fetchOptions = {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ roles: this.state.roles }),
		};

		let roles = await fetchData(
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

	async componentDidMount() {
		this.setState({ isLoading: true });

		let user = await fetchData(Endpoints.user(this.props.match.params.id));
		let userRolesByWebsite = await fetchData(
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

		let environment = website ? website.environment : {};

		this.setState({
			user,
			roles,
			service,
			website,
			environment,
			isLoading: false,
		});
	}

	render() {
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
					<Breadcrumb to="/users" elementType={Link}>
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
							<AddRoleConfirmation
								id={user.userId}
								fullName={`${user.firstName} ${user.lastName}`}
							/>
						)}

						<Grid>
							<GridItem cols={8}>
								{isLoading ? (
									<p>Loading...</p>
								) : (
									<form onSubmit={this.handleFormSubmission}>
										{roles.map(role => {
											let props = {
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
