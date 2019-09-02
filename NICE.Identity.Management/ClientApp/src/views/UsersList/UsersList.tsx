import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Card } from "@nice-digital/nds-card";
import { Tag } from "@nice-digital/nds-tag";

import { Endpoints } from "../../data/endpoints";
import { UserType } from "../../models/types";
import { Filter } from "../../components/Filter/Filter";

type CardMetaData = {
	label?: string;
	value: React.ReactNode;
};

type UsersListState = {
	data: Array<UserType>;
	error: string;
};

type UsersListProps = {};

export class UsersList extends Component<UsersListProps, UsersListState> {
	constructor(props: UsersListProps) {
		super(props);
		this.state = {
			data: [],
			error: "",
		};
	}

	fetchData = async (url: string) => {
		try {
			const response = await fetch(url);
			const data = await response.json();
			this.setState({ data });
		} catch (error) {
			this.setState({ error });
		}
	};

	componentDidMount() {
		this.fetchData(Endpoints.usersList);
	}

	render() {
		const { data } = this.state;

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb to="/" tag={Link}>
						Home
					</Breadcrumb>
					<Breadcrumb>Users</Breadcrumb>
				</Breadcrumbs>

				<div className="page-header" id="content-start">
					<h1 className="page-header__heading">Users</h1>
				</div>

				{this.state.error ? (
					<p>Whoops... There's a been an error.</p>
				) : (
					<div className="grid">
						<div data-g="12 md:3">
							<Filter />
						</div>
						<div data-g="12 md:9" aria-busy={!data.length}>
							{!data.length ? (
								<p>Loading...</p>
							) : (
								<ul className="list--unstyled">
									{data.map(
										({ email_address, user_id, first_name, last_name }) => {
											const usersListHeading = {
												headingText: `${first_name} ${last_name}`,
												linkTag: Link,
												destination: `/users/${user_id}`,
											};

											const usersListMetadata: Array<CardMetaData> = [
												{ value: <Tag alpha>Active</Tag> },
												{
													label: "Email address",
													value: email_address,
												},
											];

											return (
												<Card
													heading={usersListHeading}
													metadata={usersListMetadata}
													key={user_id}
												/>
											);
										},
									)}
								</ul>
							)}
						</div>
					</div>
				)}
			</>
		);
	}
}
