import React, { Component } from "react";

import { RouteComponentProps, Link } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Panel } from "@nice-digital/nds-panel";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { UserType } from "../../models/types";
import { Endpoints } from "../../data/endpoints";
import { UnlockUser } from "../../components/UnlockUser/UnlockUser";
import { UserStatus } from "../../components/UserStatus/UserStatus";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

type TParams = { id: string };

type UserProps = {} & RouteComponentProps<TParams>;

type UserState = {
	data: UserType;
	error?: Error;
	isLoading: boolean;
};

export class User extends Component<UserProps, UserState> {
	constructor(props: UserProps) {
		super(props);

		this.state = {
			data: {} as UserType,
			isLoading: true,
		};
	}

	handleError = (error: Error) => {
		this.setState({ error });
	};

	updateData = (updatedData: UserType) => {
		this.setState({ data: updatedData });
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
			this.setState({ error: new Error(data.message) });
		}
	};

	componentDidMount() {
		this.fetchData(Endpoints.user(this.props.match.params.id));
	}

	render() {
		const { data, error, isLoading } = this.state;

		let lastBreadcrumb;

		if (isLoading) {
			lastBreadcrumb = "Loading user details";
		} else if (error) {
			lastBreadcrumb = "Error";
		} else {
			lastBreadcrumb = `${data.first_name} ${data.last_name}`;
		}

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb to="/" elementType={Link}>
						Home
					</Breadcrumb>
					<Breadcrumb to="/users" elementType={Link}>
						Users
					</Breadcrumb>
					<Breadcrumb>{lastBreadcrumb}</Breadcrumb>
				</Breadcrumbs>

				{!error ? (
					<>
						<PageHeader
							heading={
								isLoading
									? "User details"
									: `${data.first_name} ${data.last_name}`
							}
						/>
						<Grid>
							<GridItem cols={12} md={9} aria-busy={isLoading}>
								{isLoading ? (
									<p>Loading...</p>
								) : (
									<Panel>
										<UserStatus user={data} />
										<p>
											User: {data.first_name} {data.last_name}
										</p>

										<UnlockUser
											id={data.id}
											isLocked={data.blocked}
											onToggleLock={this.updateData}
											onError={this.handleError}
										/>
									</Panel>
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
