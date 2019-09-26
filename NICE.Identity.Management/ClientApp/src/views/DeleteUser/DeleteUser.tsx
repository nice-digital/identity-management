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

type TParams = { id: string };

type DeleteUserProps = {} & RouteComponentProps<TParams>;

type DeleteUserState = {
	isLoading: boolean;
	isDeleteButtonLoading: boolean;
	error?: Error;
	hasBeenDeleted: boolean;
	data: UserType;
};

export class DeleteUser extends Component<DeleteUserProps, DeleteUserState> {
	constructor(props: DeleteUserProps) {
		super(props);

		this.state = {
			isLoading: true,
			isDeleteButtonLoading: false,
			hasBeenDeleted: false,
			data: {} as UserType,
		};
	}

	handleError = (error: Error) => {
		this.setState({ error });
	};

	fetchData = async (url: string) => {
		this.setState({ isLoading: true });

		let response, data;
		try {
			response = await fetch(url);
			data = await response.json();
		} catch (err) {
			let error: Error = err;

			this.setState({ error });
			return;
		}

		this.setState({ isLoading: false });

		if (response.status === 200) {
			this.setState({ data });
		} else {
			this.setState({ error: new Error(data.message) });
		}
	};

	fetchDeleteData = async () => {
		this.setState({ isDeleteButtonLoading: true });

		let response, data;
		try {
			response = await fetch(Endpoints.user(this.props.match.params.id), {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: this.props.match.params.id }),
			});
			data = await response.json();
		} catch (err) {
			let error: Error = err;

			this.handleError(error);
			return;
		}

		this.setState({ isDeleteButtonLoading: false });

		if (response.status === 200) {
			this.setState({ hasBeenDeleted: true });
		} else {
			this.setState({ error: new Error(data.message) });
		}
	};

	componentDidMount() {
		this.fetchData(Endpoints.user(this.props.match.params.id));
	}

	render() {
		const {
			isLoading,
			isDeleteButtonLoading,
			error,
			hasBeenDeleted,
			data,
		} = this.state;
		const { id } = this.props.match.params;

		let lastBreadcrumb = `${data.first_name} ${data.last_name}`;

		if (isLoading) {
			lastBreadcrumb = "Loading user details";
		}

		if (error) {
			lastBreadcrumb = "";
		}

		return (
			<>
				{hasBeenDeleted ? (
					<DeleteUserConfirmation
						full_name={`${data.first_name} ${data.last_name}`}
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
											heading={`${data.first_name} ${data.last_name}`}
										/>

										<Grid className="pv--d">
											<GridItem cols={3}>
												<span className={styles.detailsLabel}>
													Email address
												</span>
											</GridItem>
											<GridItem cols={9}>
												<span>{data.email_address}</span>
											</GridItem>
										</Grid>

										<Button
											onClick={this.fetchDeleteData}
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
