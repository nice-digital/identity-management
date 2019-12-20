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
    statusFilter?: string;
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

		let statusFilter = e.target.value;
		let users = this.state.originalUsers;

		if (statusFilter) {
			users = this.usersByStatus(statusFilter, users);
		}

		this.setState({ users, statusFilter, isLoading: false });
	};

	filterUsersBySearch = async (searchQuery: string) => {
		this.setState({ isLoading: true });

		let originalUsers = await fetchData(`${Endpoints.usersList}?q=${searchQuery}`);
        let users = originalUsers;
        if (isDataError(originalUsers)) {
			this.setState({ error: originalUsers });
		}

        if (this.state.statusFilter) {
            users = this.usersByStatus(this.state.statusFilter, users);
        }

		this.setState({ originalUsers, users, searchQuery, isLoading: false });
	};

    usersByStatus = (statusFilter: string, users: Array<UserType>) : Array<UserType> => {
        return users = users.filter(user => {
            let userStatus = !user.isLockedOut ? "active" : "locked";
            if (userStatus === statusFilter) {
                return user;
            }
        });
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
