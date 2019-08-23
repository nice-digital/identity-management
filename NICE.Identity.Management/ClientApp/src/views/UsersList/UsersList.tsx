import React, { FunctionComponent } from "react";

import { Link } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Card } from "@nice-digital/nds-card";
import { Tag } from "@nice-digital/nds-tag";

import { Endpoints } from "../../data/endpoints";
import { useFetch } from "../../hooks/hooks";
import { Filter } from "../../components/Filter/Filter";

export const UsersList: FunctionComponent = () => {
	const [data, isLoading] = useFetch(Endpoints.usersList);

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
					{isLoading ? (
						<p>Loading...</p>
					) : (
						<ul className="list--unstyled">
							{data.map(({ email_address, user_id, first_name, last_name }) => {
								const myHeading = {
									headingText: `${first_name} ${last_name}`,
									linkTag: Link,
									destination: `/users/${user_id}`,
								};
								const myMetadata: Array<any> = [
									{
										value: <Tag alpha>Active</Tag>,
									},
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
							})}
						</ul>
					)}
				</div>
			</div>
		</>
	);
};
