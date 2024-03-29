import React, { Component } from "react";
import { RouteComponentProps, Link, Redirect } from "react-router-dom";
import { StaticContext } from "react-router";
import Moment from "moment";
import { Alert } from "@nice-digital/nds-alert";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Table } from "@nice-digital/nds-table";
import { fetchData } from "src/helpers/fetchData";
import { isDataError } from "src/helpers/isDataError";
import { type UserType } from "src/models/types";
import { Endpoints } from "src/data/endpoints";
import { UnlockUser } from "src/components/UnlockUser/UnlockUser";
import { ResendVerification } from "src/components/ResendVerification/ResendVerification";
import { UserStatus } from "src/components/UserStatus/UserStatus";
import { ErrorMessage } from "src/components/ErrorMessage/ErrorMessage";
import { ToFormattedDateString } from "src/helpers/dateHelpers";
import styles from "./User.module.scss";

type TParams = { id: string };

type LocationState = {
	hasBeenEdited: boolean;
};

type UserProps = Record<string, unknown> &
	RouteComponentProps<TParams, StaticContext, LocationState>;

type UserState = {
	user: UserType;
	error?: Error;
	redirect: boolean;
	isLoading: boolean;
};

export class User extends Component<UserProps, UserState> {
	constructor(props: UserProps) {
		super(props);

		this.state = {
			user: {} as UserType,
			redirect: false,
			isLoading: true,
		};
	}

	handleError = (error: Error): void => {
		this.setState({ error });
	};

	updateData = (updatedData: UserType): void => {
		if (!Object.keys(updatedData).length) {
			this.setState({ redirect: true });
		} else {
			this.setState({ user: updatedData });
		}
	};

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const user = await fetchData(Endpoints.user(this.props.match.params.id));

		if (isDataError(user)) {
			this.setState({ error: user });
		}

		this.setState({ user, isLoading: false });
		document.title = `NICE Accounts - ${user.firstName} ${user.lastName}`;
	}

	render(): JSX.Element {
		const { user, error, redirect, isLoading } = this.state;
		const showResendVerificationButton = !user.hasVerifiedEmailAddress;

		if (redirect) {
			return <Redirect to="/users" />;
		}

		let lastBreadcrumb = `${user.firstName} ${user.lastName}`;

		if (isLoading) {
			lastBreadcrumb = "Loading user details";
		}
		if (error) {
			lastBreadcrumb = "Error";
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
					<Breadcrumb>{lastBreadcrumb}</Breadcrumb>
				</Breadcrumbs>

				{!error ? (
					<>
						<PageHeader
							data-qa-sel="name-user-profile"
							preheading="User profile for"
							heading={
								isLoading
									? "User details"
									: `${user.firstName} ${user.lastName}`
							}
							cta={
								<>
									<Button
										data-qa-sel="add-user-role-button"
										variant="cta"
										to={`/users/${this.props.match.params.id}/services`}
										elementType={Link}
										disabled={isLoading}
									>
										{isLoading ? "Loading..." : "Add role"}
									</Button>
									<Button
										data-qa-sel="edit-profile-button"
										to={`/users/${this.props.match.params.id}/edit`}
										elementType={Link}
										disabled={isLoading}
									>
										Edit profile
									</Button>
								</>
							}
						/>
						<Grid>
							<GridItem cols={12} md={9} aria-busy={isLoading}>
								{isLoading ? (
									<p>Loading...</p>
								) : (
									<>
										{this.props.location.state?.hasBeenEdited && (
											<Alert
												type="info"
												role="status"
												aria-live="polite"
												data-qa-sel="successful-message-user-profile"
											>
												<p>The user profile has been updated successfully.</p>
											</Alert>
										)}

										<div className={`${styles.summaryList} pv--c`}>
											<span className={styles.summaryListLabel}>
												Account information
											</span>
											<div className={styles.summaryListDetail}>
												<div>
													<UserStatus user={user} />
												</div>
												{showResendVerificationButton && (
													<ResendVerification
														nameIdentifier={user.nameIdentifier}
														onError={this.handleError}
													/>
												)}

												<UnlockUser
													id={user.userId}
													isLocked={user.isLockedOut}
													onToggleLock={this.updateData}
													onError={this.handleError}
												/>
											</div>
										</div>

										<div className={`${styles.summaryList} pv--c mb--d`}>
											<span className={styles.summaryListLabel}>
												Email address
											</span>
											<span
												className={styles.summaryListDetail}
												data-qa-sel="email-user-profile"
											>
												{user.emailAddress}
											</span>
										</div>

										<div className={`${styles.summaryList} pv--c mb--d`}>
											<span className={styles.summaryListLabel}>
												Initial registration date
											</span>
											<span className={styles.summaryListDetail}>
												{ToFormattedDateString(user.initialRegistrationDate)}
											</span>
										</div>

										<div className={`${styles.summaryList} pv--c mb--d`}>
											<span className={styles.summaryListLabel}>
												Last logged in date
											</span>
											<span className={styles.summaryListDetail}>
												{ToFormattedDateString(user.lastLoggedInDate)}
											</span>
										</div>

										<div className={`${styles.summaryList} pv--c mb--d`}>
											<span className={styles.summaryListLabel}>
												Marked for deletion
											</span>
											<span className={styles.summaryListDetail}>
												{user.isMarkedForDeletion ? "Yes" : "No"}
											</span>
										</div>

										<div className={`${styles.summaryList} pv--c mb--d`}>
											<span className={styles.summaryListLabel}>
												Name identifier (internal id)
											</span>
											<span className={styles.summaryListDetail}>
												{user.nameIdentifier}
											</span>
										</div>

										<div className={`${styles.summaryList} pv--c mb--d`}>
											<span className={styles.summaryListLabel}>
												Audience insight community membership
											</span>
											<span
												className={styles.summaryListDetail}
												data-qa-sel="audience-user-profile"
											>
												{user.allowContactMe ? "Yes" : "No"}
											</span>
										</div>

										<div className={`${styles.summaryList} pv--c mb--d`}>
											<span className={styles.summaryListLabel}>
												Is migrated from NICE Accounts
											</span>
											<span className={styles.summaryListDetail}>
												{user.isMigrated ? "Yes" : "No"}
											</span>
										</div>

										<div className={`${styles.summaryList} pv--c mb--d`}>
											<span className={styles.summaryListLabel}>
												Is in Authentication Provider (Auth0)
											</span>
											<span className={styles.summaryListDetail}>
												{user.isInAuthenticationProvider ? "Yes" : "No"}
											</span>
										</div>

										<hr className="mv--b" />

										<h2 className="h3">Permanently delete this account</h2>
										<p>
											The account will no longer be available, and all data in
											the account will be permanently deleted.
										</p>
										<Link
											data-qa-sel="delete-user-link"
											to={`/users/${user.userId}/delete`}
											className="pv--c mb--d"
											style={{ display: "inline-block" }}
										>
											Delete user
										</Link>

										{user.userEmailHistory.length > 0 && (
											<>
												<hr className="mv--b" />

												<h2 className="h3">Email audit trail</h2>
												<Table style={{ display: "table" }}>
													<thead>
														<tr>
															<th>Who modified user profile</th>
															<th>Date modified</th>
															<th>Previous email address</th>
														</tr>
													</thead>
													<tbody>
														{user.userEmailHistory
															.slice(0)
															.reverse()
															.map((historicalEmail) => (
																<tr key={historicalEmail.userEmailHistoryId}>
																	<td>
																		{historicalEmail.archivedByUserDisplayName}
																	</td>
																	<td>
																		{Moment(
																			historicalEmail.archivedDateUTC,
																		).format("DD-MM-YYYY HH:mm")}
																	</td>
																	<td>{historicalEmail.emailAddress}</td>
																</tr>
															))}
													</tbody>
												</Table>
											</>
										)}
									</>
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
