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

interface StateType {
	data: Array<User>;
}

interface PropsType {}

export class UsersList extends Component<PropsType, StateType> {
	constructor(props: PropsType) {
		super(props);
		this.state = {
			data: [],
		};
	}

	fetchData = async (url: string) => {
		const response = await fetch(url);
		const data = await response.json();
		this.setState({ data });
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

				<div className="page-header">
					<h1 className="page-header__heading">Users</h1>
				</div>

				<div className="grid">
					<div data-g="12 md:3">
						<Filter />
					</div>
					<div data-g="12 md:9">
						{!data.length ? (
							<p>Loading...</p>
						) : (
							<ul className="list--unstyled">
								{data.map(
									({ email_address, user_id, first_name, last_name }) => {
										const myHeading = {
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
												heading={myHeading}
												metadata={myMetadata}
												key={user_id}
											/>
										);
									},
								)}
							</ul>
						)}
					</div>
				</div>
			</>
		);
	}
}
