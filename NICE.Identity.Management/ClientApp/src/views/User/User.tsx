import React, { Component } from "react";

import { RouteComponentProps, Link, Redirect } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { UserType } from "../../models/types";
import { Endpoints } from "../../data/endpoints";
import { UnlockUser } from "../../components/UnlockUser/UnlockUser";
import { UserStatus } from "../../components/UserStatus/UserStatus";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

import styles from "./User.module.scss";

type TParams = { id: string };

type UserProps = {} & RouteComponentProps<TParams>;

type UserState = {
	data: UserType;
	error?: Error;
	redirect: boolean;
	isLoading: boolean;
};

export class User extends Component<UserProps, UserState> {
	constructor(props: UserProps) {
		super(props);

		this.state = {
			data: {} as UserType,
			redirect: false,
			isLoading: true,
		};
	}

	handleError = (error: Error) => {
		this.setState({ error });
	};

	updateData = (updatedData: UserType) => {
		if (!Object.keys(updatedData).length) {
			this.setState({ redirect: true });
		} else {
			this.setState({ data: updatedData });
		}
	};

	fetchData = async (url: string) => {
		this.setState({ isLoading: true });

		let response, data;
		try {
			response = await fetch(url);
			data = await response.json();
		} catch (err) {
			let error: Error = err;

			this.setState({ error, isLoading: false });
			return;
		}

		this.setState({ isLoading: false });

		if (response.status === 200) {
			this.setState({ data });
		} else {
			this.setState({
				error: new Error(data.message),
			});
		}
	};

	componentDidMount() {
		this.fetchData(Endpoints.user(this.props.match.params.id));
	}

	render() {
		const { data, error, redirect, isLoading } = this.state;

		if (redirect) {
			return <Redirect to="/users" />;
		}

		let lastBreadcrumb = `${data.firstName} ${data.lastName}`;

		if (isLoading) {
			lastBreadcrumb = "Loading user details";
		}
		if (error) {
			lastBreadcrumb = "Error";
		}

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb to="/users" elementType={Link}>
						Users
					</Breadcrumb>
					<Breadcrumb>{lastBreadcrumb}</Breadcrumb>
				</Breadcrumbs>

				{!error ? (
					<>
						<PageHeader
							preheading="User profile for"
							heading={
								isLoading
									? "User details"
									: `${data.firstName} ${data.lastName}`
							}
						/>
						<Grid>
							<GridItem cols={12} md={9} aria-busy={isLoading}>
								{isLoading ? (
									<p>Loading...</p>
								) : (
									<>
										<div className={`${styles.summaryList} pv--c`}>
											<span className={styles.summaryListLabel}>
												Account information
											</span>
											<div className={styles.summaryListDetail}>
												<UserStatus user={data} />

												<UnlockUser
													id={data.userId}
													isLocked={data.isLockedOut}
													onToggleLock={this.updateData}
													onError={this.handleError}
												/>
											</div>
										</div>

										<div className={`${styles.summaryList} pv--c mb--d`}>
											<span className={styles.summaryListLabel}>
												Email address
											</span>
											<span className={styles.summaryListDetail}>
												{data.emailAddress}
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
											to={`/users/${data.userId}/delete`}
										>
											Delete user
										</Link>
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
