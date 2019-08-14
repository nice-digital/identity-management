import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";

type TParams = { id: string };

type UserProps = {} & RouteComponentProps<TParams>;

export const User = (props: UserProps) => {
	const { match } = props;
	const { params } = match;

	return (
		<div>
			<p>User: {params.id}</p>
			<Link to={`/users/${params.id}/roles`}>Roles</Link>
		</div>
	);
};