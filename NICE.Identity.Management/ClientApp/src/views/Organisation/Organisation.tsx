import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { StaticContext } from "react-router";

import { OrganisationType, UserType } from "../../models/types";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { Alert } from "@nice-digital/nds-alert";

import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { Endpoints } from "../../data/endpoints";

import { Button } from "@nice-digital/nds-button";

import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import styles from "./Organisation.module.scss";

import { UserStatus } from "../../components/UserStatus/UserStatus";
import { ToFormattedDateString } from "../../helpers/dateHelpers";

type TParams = { id: string };

type LocationState = {
	hasBeenEdited: boolean;
};

type OrganisationProps = Record<string, unknown> &
	RouteComponentProps<TParams, StaticContext, LocationState>;

type OrganisationState = {
	organisation: OrganisationType;
	users: Array<UserType>;
	error?: Error;
	redirect: boolean;
	isLoading: boolean;
};

export class Organisation extends Component<OrganisationProps, OrganisationState> {
		constructor(props: OrganisationProps) {
			super(props);
	
			this.state = {
				organisation: {} as OrganisationType,
				users: [],
				redirect: false,
				isLoading: true,
			};
		}

		async componentDidMount(): Promise<void> {
			this.setState({ isLoading: true });
	
			const organisation = await fetchData(Endpoints.organisation(this.props.match.params.id));
			const users = await fetchData(Endpoints.usersByOrganisation(this.props.match.params.id));

			if (isDataError(users)) {
				this.setState({ error: users });
			}

			this.setState({ organisation, users, isLoading: false });
		}

	render(): JSX.Element {
		const { organisation, users, error, isLoading } = this.state;

		return (
		<>
			
			<Breadcrumbs>
				<Breadcrumb to="/overview" elementType={Link}>
					Administration
				</Breadcrumb>
				<Breadcrumb>Organisation</Breadcrumb>
				<Breadcrumb>{organisation.name}</Breadcrumb>
			</Breadcrumbs>

			{!error ? (
				<>
					<PageHeader heading={organisation.name} className="page-header mb--d" />
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
					<Grid>
						<GridItem cols={12} md={9} aria-busy={isLoading}>
									<div className={`${styles.summaryList} pv--c`}>
										<span className={styles.summaryListLabel}>
											Date added
										</span>
										<span
											className={styles.summaryListDetail}
											data-qa-sel="dateAdded-organisation"
										>
											{ToFormattedDateString(organisation.dateAdded)}
										</span>
									</div>
						</GridItem>

						<GridItem cols={12} md={9} aria-busy={isLoading}>
						{isLoading ? (
								<p>Loading...</p>
							) : users.length ? (
									<div className={`${styles.summaryList} pv--c`}>
										<span className={styles.summaryListLabel}>
											Users
										</span>
										<span className={styles.summaryListDetail}>
											<ul className="list--unstyled" data-qa-sel="list-of-users">
												{users.map((user) => {
												return (
													<li key={user.userId}>
														<UserStatus user={user} />
														<span className={styles.userName}>{user.firstName + " " + user.lastName}</span>
													</li>
												);
											})}
											</ul>
										</span>
									</div>
							) : <p>Three are currently no users assigned to this oragnisation</p>
						}
						</GridItem>
					</Grid>
					<hr className="mv--b" />

					<h2 className="h3">Permanently delete this organisation</h2>
					<p>
						This organisation will no longer be available, and all data in associated with the
						organisation will be permanently deleted.
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
