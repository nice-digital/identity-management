import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { PageHeader } from "@nice-digital/nds-page-header";

import { DeleteUserConfirmation } from "../DeleteUserConfirmation/DeleteUserConfirmation";
import { UserType } from "../../models/types";
import { Endpoints } from "../../data/endpoints";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

import styles from "./DeleteUser.module.scss";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";

type TParams = { id: string };

type DeleteUserProps = {} & RouteComponentProps<TParams>;

type DeleteUserState = {
	user: UserType;
	hasBeenDeleted: boolean;
	error?: Error;
	isLoading: boolean;
	isDeleteButtonLoading: boolean;
};

export class DeleteUser extends Component<DeleteUserProps, DeleteUserState> {
	constructor(props: DeleteUserProps) {
		super(props);

		this.state = {
			user: {} as UserType,
			hasBeenDeleted: false,
			isLoading: true,
			isDeleteButtonLoading: false,
		};
	}

	handleDeleteClick = async () => {
		this.setState({ isDeleteButtonLoading: true });

		let fetchOptions = {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId: this.props.match.params.id }),
		};

		let deletedUser = await fetchData(
			Endpoints.user(this.props.match.params.id),
			fetchOptions,
		);

		if (isDataError(deletedUser)) {
            console.error(deletedUser);
			this.setState({ error: deletedUser });
		} else {
			this.setState({ hasBeenDeleted: true });
		}

		this.setState({ isDeleteButtonLoading: false });
	};

	async componentDidMount() {
		this.setState({ isLoading: true });

		let user = await fetchData(Endpoints.user(this.props.match.params.id));

		if (isDataError(user)) {
		    console.error(user);
			this.setState({ error: user });
		}

		this.setState({ user, isLoading: false });
	}

	render() {
		const {
			isLoading,
			isDeleteButtonLoading,
			error,
			hasBeenDeleted,
			user,
		} = this.state;
		const { id } = this.props.match.params;

		let lastBreadcrumb = `${user.firstName} ${user.lastName}`;

		if (isLoading) {
			lastBreadcrumb = "Loading user details";
		}

		return (
			<>
				{hasBeenDeleted ? (
					<DeleteUserConfirmation
						fullName={`${user.firstName} ${user.lastName}`}
					/>
				) : (
					<>
						<Breadcrumbs>
							<Breadcrumb to="/users" elementType={Link}>
								Users
							</Breadcrumb>
							{error ? (
								<Breadcrumb>Error</Breadcrumb>
							) : (
								<Breadcrumb to={`/users/${id}`} elementType={Link}>
									{lastBreadcrumb}
								</Breadcrumb>
							)}
							<Breadcrumb>Delete user</Breadcrumb>
						</Breadcrumbs>

						{!error ? (
							<>
								{isLoading ? (
									<>
										<PageHeader preheading="Confirm" heading="Delete user" />
										<p>Loading...</p>
									</>
								) : (
									<>
										<PageHeader
											preheading="Are you sure you want to delete user?"
											heading={`${user.firstName} ${user.lastName}`}
											cta={
												<>
													<Button
														data-qa-sel="confirm-delete-user"
														variant="cta"
														onClick={this.handleDeleteClick}
														disabled={isDeleteButtonLoading}
													>
														{isDeleteButtonLoading ? "Loading..." : "Confirm"}
													</Button>
													<Button
														to={`/users/${id}`}
														variant="secondary"
														elementType={Link}
														disabled={isDeleteButtonLoading}
													>
														Cancel
													</Button>
												</>
											}
										/>
										<hr className="mv--b" />
										<Grid className="pv--d">
											<GridItem cols={3}>
												<span className={styles.detailsLabel}>
													Email address
												</span>
											</GridItem>
											<GridItem cols={9}>
												<span>{user.emailAddress}</span>
											</GridItem>
										</Grid>
									</>
								)}
							</>
						) : (
							<>
								<PageHeader heading="Error" />
								<ErrorMessage error={error}></ErrorMessage>
							</>
						)}
					</>
				)}
			</>
		);
	}
}
