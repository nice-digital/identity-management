import React from "react";
import { RouteComponentProps } from "react-router-dom";

type TParams = { userId: string; roleId: string };

type UserRolesProps = {} & RouteComponentProps<TParams>;

export const UserRoles = (props: UserRolesProps) => {
	const { match } = props;
	const { params } = match;

	return (
		<div className="grid">
			<div data-g="12">
				<p>User: {params.userId}</p>
				<p>Role: {params.roleId}</p>
			</div>
		</div>
	);
};
