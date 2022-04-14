import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Alert } from "@nice-digital/nds-alert";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Table } from "@nice-digital/nds-table";
import { Endpoints } from "../../data/endpoints";
import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { UsersAndJobIdsByOrganisationType, UserType } from "../../models/types";
import { UserStatus } from "../../components/UserStatus/UserStatus";
import { FilterSuggestions } from "../../components/FilterSuggestions/FilterSuggestions";
import { SuggestionUser } from "../../components/SuggestionUser/SuggestionUser";
import styles from "./EditOrganisationUsers.module.scss";

type TParams = { id: string };

type EditOrganisationProps = Record<string, unknown> &
	RouteComponentProps<TParams>;

type EditOrganisationUsersState = {
	organisation: UsersAndJobIdsByOrganisationType;
	usersSearch: UserType[];
	confirmationMessage: string;
	isLoading: boolean;
	error?: Error;
};
export class EditOrganisationUsers extends Component<
	EditOrganisationProps,
	EditOrganisationUsersState
> {
	constructor(props: EditOrganisationProps) {
		super(props);

		this.state = {
			organisation: {} as UsersAndJobIdsByOrganisationType,
			usersSearch: [],
			confirmationMessage: "",
			isLoading: true,
		};

		document.title = "NICE Accounts - Edit organisation users";
	}

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });
		const organisationId = this.props.match.params.id;

		const organisation = await fetchData(
			Endpoints.usersAndJobIdsByOrganisation(organisationId),
		);

		if (isDataError(organisation)) {
			this.setState({ error: organisation });
		}

		this.setState({ organisation, isLoading: false });
	}

	handleRemoveUserClick = async (
		e: React.MouseEvent<HTMLAnchorElement>,
		jobId: number,
	): Promise<void> => {
		e.preventDefault();
		this.setState({ isLoading: true });

		const organisation = { ...this.state.organisation };

		const fetchOptions = {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: jobId,
			}),
		};

		await fetchData(Endpoints.job(jobId), fetchOptions);

		organisation.users = organisation.users.filter(
			(orgUser) => orgUser.jobId !== jobId,
		);

		this.setState({
			organisation,
			confirmationMessage: "User has been successfully removed.",
			isLoading: false,
		});
	};

	filterUsersSearchList = async (
		searchQuery: string,
	): Promise<void | boolean> => {
		this.setState({ confirmationMessage: "" });

		if (!searchQuery.length) {
			this.setState({ usersSearch: [] });
			return false;
		}

		searchQuery = searchQuery.toLowerCase();

		let usersSearch = await fetchData(Endpoints.usersListSearch(searchQuery));

		if (isDataError(usersSearch)) {
			this.setState({ error: usersSearch });
		} else {
			const organisation = { ...this.state.organisation };
			const existingUsersIds = organisation.users.map((user) => user.userId);

			usersSearch = usersSearch.filter(
				(user: UserType) => !existingUsersIds.includes(user.userId),
			);
			usersSearch = usersSearch.filter(
				(user: UserType) =>
					`${user.firstName} ${user.lastName}`
						.toLowerCase()
						.indexOf(searchQuery) > -1 &&
					user.hasVerifiedEmailAddress &&
					!user.isLockedOut,
			);

			this.setState({ usersSearch });
		}
	};

	addUserToOrganisation = async (item: UserType): Promise<void | boolean> => {
		const itemIsEmpty = Object.keys(item).length === 0;

		if (itemIsEmpty) {
			this.setState({ usersSearch: [] });
			return false;
		}

		this.setState({ isLoading: true });

		const organisation = { ...this.state.organisation };

		const fetchOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: item.userId,
				organisationId: Number(this.props.match.params.id),
				isLead: false,
			}),
		};

		const job = await fetchData(Endpoints.jobs, fetchOptions);

		organisation.users = [
			...organisation.users,
			{ userId: item.userId, user: item, jobId: job.id },
		];

		this.setState({
			organisation,
			usersSearch: [],
			confirmationMessage: "User has been successfully added.",
			isLoading: false,
		});
	};

	render(): JSX.Element {
		const {
			organisation: { organisation, users },
			usersSearch,
			confirmationMessage,
			isLoading,
			error,
		} = this.state;
		const organisationId = this.props.match.params.id;

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb to="/overview" elementType={Link}>
						Administration
					</Breadcrumb>
					<Breadcrumb to="/organisations" elementType={Link}>
						Organisations
					</Breadcrumb>
					<Breadcrumb
						to={`/organisations/${organisationId}`}
						elementType={Link}
					>
						{isLoading ? "Loading organisation details" : organisation?.name}
					</Breadcrumb>
					<Breadcrumb>Edit users</Breadcrumb>
				</Breadcrumbs>

				<PageHeader
					preheading={
						isLoading ? "Loading Organisation Name" : organisation?.name
					}
					heading="Users"
					lead="Add or remove users from this organisation"
				/>

				{!error ? (
					<>
						<Grid>
							<GridItem cols={12} md={3}>
								<FilterSuggestions
									label="Find and add an active user account; search excludes Pending and Locked accounts"
									data={usersSearch}
									qaSelExtract="add-organisation-user"
									onInputChange={this.filterUsersSearchList}
									onResultClick={this.addUserToOrganisation}
									elementType={SuggestionUser}
								/>
							</GridItem>
							<GridItem cols={12} md={9} aria-busy={isLoading}>
								{confirmationMessage && (
									<Alert
										type="info"
										role="status"
										aria-live="polite"
										data-qa-sel="added-edit-organisation-users"
									>
										<p>{confirmationMessage}</p>
									</Alert>
								)}
								<h2 className={styles.orgUsersListSummary}>Current users</h2>
								{isLoading ? (
									<p>Loading...</p>
								) : users.length ? (
									<Table
										style={{ display: "table" }}
										data-qa-sel="list-of-organisation-users"
									>
										<thead>
											<tr>
												<th>User name</th>
												<th>Email address</th>
												<th>Status</th>
												<th>Remove user</th>
											</tr>
										</thead>
										<tbody>
											{users.map((orgUser) => {
												const {
													user: { firstName, lastName, emailAddress },
												} = orgUser;

												return (
													<tr key={orgUser.userId}>
														<td>{`${firstName} ${lastName}`}</td>
														<td>{emailAddress}</td>
														<td>
															<UserStatus user={orgUser.user} />
														</td>
														<td>
															<a
																onClick={(e) =>
																	this.handleRemoveUserClick(
																		e,
																		orgUser.jobId as number,
																	)
																}
																href={`#remove-org-user`}
															>
																Remove user
															</a>
														</td>
													</tr>
												);
											})}
										</tbody>
									</Table>
								) : (
									<p>No users found for this organisation.</p>
								)}
							</GridItem>
						</Grid>
					</>
				) : (
					<ErrorMessage error={error}></ErrorMessage>
				)}
			</>
		);
	}
}
