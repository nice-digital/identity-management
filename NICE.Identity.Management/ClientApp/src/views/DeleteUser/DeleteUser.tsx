import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import type { UserType } from "src/models/types";
import { Endpoints } from "src/data/endpoints";
import { fetchData } from "src/helpers/fetchData";
import { isDataError } from "src/helpers/isDataError";
import { ErrorMessage } from "src/components/ErrorMessage/ErrorMessage";
import { DeleteUserConfirmation } from "../DeleteUserConfirmation/DeleteUserConfirmation";
import styles from "./DeleteUser.module.scss";

type TParams = { id: string };

type DeleteUserProps = Record<string, unknown> & RouteComponentProps<TParams>;

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

	handleDeleteClick = async (): Promise<void> => {
		this.setState({ isDeleteButtonLoading: true });

		const fetchOptions = {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId: this.props.match.params.id }),
		};

		const deletedUser = await fetchData(
			Endpoints.user(this.props.match.params.id),
			fetchOptions,
		);

		if (isDataError(deletedUser)) {
			this.setState({ error: deletedUser });
		} else {
			this.setState({ hasBeenDeleted: true });
		}

		this.setState({ isDeleteButtonLoading: false });
	};

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const user = await fetchData(Endpoints.user(this.props.match.params.id));

		if (isDataError(user)) {
			this.setState({ error: user });
		}

		this.setState({ user, isLoading: false });
		document.title = `NICE Accounts - Delete ${user.firstName} ${user.lastName}`;
	}

	render(): JSX.Element {
		const { isLoading, isDeleteButtonLoading, error, hasBeenDeleted, user } =
			this.state;
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
