import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Card } from "@nice-digital/nds-card";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { Endpoints } from "../../data/endpoints";
import { UserType } from "../../models/types";
import { FilterSearch } from "../../components/FilterSearch/FilterSearch";
import { FilterStatus } from "../../components/FilterStatus/FilterStatus";
import { UserStatus } from "../../components/UserStatus/UserStatus";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

type CardMetaData = {
	label?: string;
	value: React.ReactNode;
};

type UsersListProps = {};

type UsersListState = {
	originalUsers: Array<UserType>;
	users: Array<UserType>;
	searchQuery?: string;
	error?: Error;
	isLoading: boolean;
};

export class UsersList extends Component<UsersListProps, UsersListState> {
	constructor(props: UsersListProps) {
		super(props);
		this.state = {
			originalUsers: [],
			users: [],
			isLoading: true,
		};
	}

	async componentDidMount() {
		this.setState({ isLoading: true });

		let users = await fetchData(Endpoints.usersList);

		if (isDataError(users)) {
			this.setState({ error: users });
		}

		this.setState({ originalUsers: users, users, isLoading: false });
	}

	filterUsersByStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ isLoading: true });

		let checkbox = e.target;
		let users = this.state.originalUsers;

		if (checkbox.value) {
			users = users.filter(user => {
				let activeCheckbox = !user.isLockedOut ? "active" : "locked";

				if (activeCheckbox === checkbox.value) {
					return user;
				}
			});
		}

		this.setState({ users, isLoading: false });
	};

	filterUsersBySearch = async (searchQuery: string) => {
		this.setState({ isLoading: true });

		let users = await fetchData(`${Endpoints.usersList}?q=${searchQuery}`);

		if (isDataError(users)) {
			this.setState({ error: users });
		}

		this.setState({ users, searchQuery, isLoading: false });
	};

	render() {
		const { users, searchQuery, error, isLoading } = this.state;

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb>Users</Breadcrumb>
				</Breadcrumbs>

				<PageHeader heading="Users" />

				{!error ? (
					<Grid>
						<GridItem cols={12} md={3}>
							<FilterSearch onInputChange={this.filterUsersBySearch} />
							<FilterStatus onCheckboxChange={this.filterUsersByStatus} />
						</GridItem>
						<GridItem cols={12} md={9} aria-busy={!users.length}>
							{isLoading ? (
								<p>Loading...</p>
							) : users.length ? (
								<ul className="list--unstyled" data-qa-sel="list-of-users">
									{users.map(user => {
										const {
											userId,
											emailAddress,
											nameIdentifier,
											firstName,
											lastName,
										} = user;
										const usersListHeading = {
											headingText: `${firstName} ${lastName}`,
											link: {
												elementType: Link,
												destination: `/users/${userId}`,
											},
										};

										const usersListMetadata: Array<CardMetaData> = [
											{
												value: <UserStatus user={user} />,
											},
											{
												label: "Email address",
												value: emailAddress,
											},
										];

										return (
											<Card
												{...usersListHeading}
												metadata={usersListMetadata}
												key={nameIdentifier}
											/>
										);
									})}
								</ul>
							) : searchQuery ? (
								<p>No results found for {searchQuery}</p>
							) : (
								<p>No results found</p>
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
