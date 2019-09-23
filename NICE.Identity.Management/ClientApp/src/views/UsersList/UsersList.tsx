import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Card } from "@nice-digital/nds-card";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Endpoints } from "../../data/endpoints";
import { UserType } from "../../models/types";
import { Filter } from "../../components/Filter/Filter";
import { UserStatus } from "../../components/UserStatus/UserStatus";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

type CardMetaData = {
	label?: string;
	value: React.ReactNode;
};

type UsersListProps = {};

type UsersListState = {
	data: Array<UserType>;
	error?: Error;
};

export class UsersList extends Component<UsersListProps, UsersListState> {
	constructor(props: UsersListProps) {
		super(props);
		this.state = {
			data: [],
		};
	}

	fetchData = async (url: string) => {
		let response, data;
		try {
			response = await fetch(url);
			data = await response.json();
		} catch (err) {
			let error: Error = err;

			this.setState({ error });
			return;
		}

		if (response.status === 200) {
			this.setState({ data });
		} else {
			this.setState({ error: new Error(data.message) });
		}
	};

	componentDidMount() {
		this.fetchData(Endpoints.usersList);
	}

	render() {
		const { data, error } = this.state;

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb to="/" elementType={Link}>
						Home
					</Breadcrumb>
					<Breadcrumb>Users</Breadcrumb>
				</Breadcrumbs>

				<PageHeader heading="Users" />

				{!error ? (
					<Grid>
						<GridItem cols={12} md={3}>
							<Filter />
						</GridItem>
						<GridItem cols={12} md={9} aria-busy={!data.length}>
							{!data.length ? (
								<p>Loading...</p>
							) : (
								<ul className="list--unstyled">
									{data.map(user => {
										const {
											id,
											email_address,
											user_id,
											first_name,
											last_name,
										} = user;
										const usersListHeading = {
											headingText: `${first_name} ${last_name}`,
											link: {
												elementType: Link,
												destination: `/users/${id}`,
											},
										};

										const usersListMetadata: Array<CardMetaData> = [
											{
												value: <UserStatus user={user} />,
											},
											{
												label: "Email address",
												value: email_address,
											},
										];

										return (
											<Card
												{...usersListHeading}
												metadata={usersListMetadata}
												key={user_id}
											/>
										);
									})}
								</ul>
							)}
						</GridItem>
					</Grid>
				) : (
					<ErrorMessage error={error}></ErrorMessage>
				)}
			</>
		);
	}
}
