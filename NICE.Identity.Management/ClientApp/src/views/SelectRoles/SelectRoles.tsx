import React, { Component } from "react";
import { RouteComponentProps, Link, Switch, Route } from "react-router-dom";
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

type TParams = { id: string; serviceId: string; websiteId: string };

type SelectRolesProps = {} & RouteComponentProps<TParams>;

type SelectRolesState = {
	user: UserType;
	environment: WebsiteType;
	roles: Array<RoleType>;
	//environment: EnvironmentType;
	editUser: UserType;
	error?: Error;
	isLoading: boolean;
};

export class SelectRoles extends Component<SelectRolesProps, SelectRolesState> {
	constructor(props: SelectRolesProps) {
		super(props);
		this.state = {
			user: {} as UserType,
			environment: {} as WebsiteType,
			roles: [],
			//environment: {} as EnvironmentType,
			editUser: {} as UserType,
			isLoading: true,
		};
	}

	handleClick = async (e: any) => {
		let roleId = e.target.value;
		//console.log(e.target.value);
		//this.setState({ isLoading: true });

		// let roles = this.state.user.roles;

		// roles.push({
		// 	id: 14,
		// 	name: "TESTSTSTSTSTSTS",
		// 	websiteId: 116,
		// });

		let fetchOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				roleId: roleId,
				userId: this.props.match.params.id,
			}),
		};

		let editUser = await fetchData(Endpoints.userRolesList, fetchOptions);

		console.log(editUser);

		// if (isDataError(editUser)) {
		// 	this.setState({ error: editUser });
		// }

		// this.setState({ editUser, isLoading: false });
	};

	async componentDidMount() {
		this.setState({ isLoading: true });

		let user = await fetchData(Endpoints.user(this.props.match.params.id));
		let environment = await fetchData(
			Endpoints.userRolesByWebsite(this.props.match.params.websiteId),
		);

		if (isDataError(user)) {
			this.setState({ error: user });
		}
		if (isDataError(environment)) {
			this.setState({ error: environment });
		}

		let roles = environment.roles;

		this.setState({ user, environment, roles, isLoading: false });
	}

	render() {
		const { user, environment, roles, error, isLoading, editUser } = this.state;
		const { id, serviceId, websiteId } = this.props.match.params;

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
							heading="Some text"
						/>

						<Grid>
							<GridItem cols={8}>
								<>
									{roles.map(role => {
										return (
											<div className="checkbox">
												<input
													type="checkbox"
													className="checkbox__input"
													id="service-role"
													name="service-role"
													value={role.id}
													checked={role.hasRole}
													onClick={this.handleClick}
												/>
												<label
													className="checkbox__label"
													htmlFor="service-role"
												>
													{role.name}
												</label>
											</div>
										);
									})}
								</>
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
