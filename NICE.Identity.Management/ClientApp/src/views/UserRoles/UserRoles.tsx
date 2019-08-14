import React from "react";
import { RouteComponentProps } from "react-router-dom";

type TParams = { userId: string; roleId: string };

type UserRolesProps = {} & RouteComponentProps<TParams>;

export const UserRoles = (props: UserRolesProps) => (
	<div>
		<p>User: {props.match.params.userId}</p>
		<p>Role: {props.match.params.roleId}</p>
	</div>
);
