import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";

import { OrganisationType, UserType } from "../../models/types";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Grid, GridItem } from "@nice-digital/nds-grid";

//import { Button } from "@nice-digital/nds-button";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { UserStatus } from "../../components/UserStatus/UserStatus";
import { ToFormattedDateString } from "../../helpers/dateHelpers";

import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { Endpoints } from "../../data/endpoints";

import styles from "./Organisation.module.scss";

type TParams = { id: string };

type OrganisationProps = {
	location: RouteComponentProps["location"];
	history: RouteComponentProps["history"];
} & RouteComponentProps<TParams>;

type OrganisationState = {
	organisation: OrganisationType;
	users: Array<UserType>;
	error?: Error;
	isLoading: boolean;
};

export class Organisation extends Component<
	OrganisationProps,
	OrganisationState
> {
	constructor(props: OrganisationProps) {
		super(props);

		this.state = {
			organisation: {} as OrganisationType,
			users: [],
			isLoading: true,
		};

		document.title = "NICE Accounts - Organisation details";
	}

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const organisation = await fetchData(
			Endpoints.organisation(this.props.match.params.id),
		);
		const users = await fetchData(
			Endpoints.usersByOrganisation(this.props.match.params.id),
		);

		if (isDataError(users)) {
			this.setState({ error: users });
		}

		if (isDataError(organisation)) {
			this.setState({ error: organisation });
		}

		this.setState({ organisation, users, isLoading: false });
	}

	render(): JSX.Element {
		const { organisation, users, error, isLoading } = this.state;
		const lastBreadcrumb = `${organisation.name}`;
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
						data-qa-sel="breadcrumb-organisation-link"
						to="/organisations"
						elementType={Link}
					>
						Organisation
					</Breadcrumb>
					<Breadcrumb>{lastBreadcrumb}</Breadcrumb>
				</Breadcrumbs>

				{!error ? (
					<>
						<PageHeader
							heading={
								isLoading ? "Organisation details" : `${organisation.name}`
							}
							className="page-header mb--d"
							/* 							cta={ reinstate this after the edit org and edit user pages are created
								<>
									<Button
										data-qa-sel="edit-organisation-button"
										variant="cta"
										to={`/organisations/${this.props.match.params.id}/edit`}
										elementType={Link}
										disabled={isLoading}
									>
										{isLoading ? "Loading..." : "Edit organisation"}
									</Button>
									<Button
										data-qa-sel="edit-organisations-users-button"
										to={`/users-organisations/${this.props.match.params.id}/edit`}
										elementType={Link}
										disabled={isLoading}
									>
										Edit users
									</Button>
								</>
							} */
						/>
						<Grid>
							<GridItem cols={12} md={9} aria-busy={isLoading}>
								{isLoading ? (
									<p className="OrganisationDateAddedLoadingMsg">Loading...</p>
								) : organisation.dateAdded != null ? (
									<div className={`${styles.summaryList} pv--c`}>
										<span className={styles.summaryListLabel}>Date added</span>
										<span
											className={styles.summaryListDetail}
											data-qa-sel="dateAdded-organisation"
										>
											{ToFormattedDateString(new Date(organisation.dateAdded))}
										</span>
									</div>
								) : (
									<p>This organisation does not have a date added value.</p>
								)}
							</GridItem>
							<GridItem cols={12} md={9} aria-busy={isLoading}>
								{isLoading ? (
									<p className="OrganisationUsersListLoadingMsg">Loading...</p>
								) : users.length ? (
									<div className={`${styles.summaryList} pv--c`}>
										<span className={styles.summaryListLabel}>Users</span>
										<span className={styles.summaryListDetail}>
											<ul
												className="list--unstyled"
												data-qa-sel="list-of-organisations"
											>
												{users.map((user) => {
													return (
														<li key={user.userId}>
															<UserStatus user={user} />
															<span className={styles.userName}>
																{user.firstName + " " + user.lastName}
															</span>
														</li>
													);
												})}
											</ul>
										</span>
									</div>
								) : (
									<p>
										There are currently no users assigned to this organisation.
									</p>
								)}
							</GridItem>
						</Grid>
						<hr className="mv--b" />

						<h2 className="h3">Permanently delete this organisation</h2>
						<p>
							This organisation will no longer be available, and all associated
							data will be permanently deleted.
						</p>
						<Link
							data-qa-sel="delete-organisation-link"
							to={`/organisations/${organisation.id}/delete`}
							className="pv--c mb--d"
							style={{ display: "inline-block" }}
						>
							Delete organisation
						</Link>
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
