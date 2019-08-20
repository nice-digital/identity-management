import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/hooks";
import { Filter } from "../../components/Filter/Filter";
import { Card } from "@nice-digital/nds-card";
import { Tag } from "@nice-digital/nds-tag";

export const UsersList: FunctionComponent = () => {
	const apiUrl = `${
		process.env.REACT_APP_API_BASE_URL
	}/users?_sort=given_name&_order=asc`;

	const [data, isLoading] = useFetch(apiUrl);

	return (
		<div className="grid">
			<div data-g="3">
				<Filter />
			</div>
			<div data-g="9">
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<ul className="list--unstyled">
						{data.map(({ email, user_id, given_name, family_name }) => {
							const myHeading = {
								headingText: `${given_name} ${family_name}`,
								linkTag: Link,
								destination: `/users/${user_id}`,
							};
							const myMetadata: Array<any> = [
								{
									value: <Tag alpha>Active</Tag>,
								},
								{
									label: "Email address",
									value: email,
								},
							];
							return (
								<Card heading={myHeading} metadata={myMetadata} key={user_id} />
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
};
