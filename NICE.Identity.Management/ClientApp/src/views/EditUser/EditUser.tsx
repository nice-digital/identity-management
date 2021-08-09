import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";

import { Grid, GridItem } from "@nice-digital/nds-grid";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";

import { useFetch } from "../../helpers/useFetch";
import { Endpoints } from "../../data/endpoints";
import { UserType } from "../../models/types";

import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

type TParams = { id: string };

type EditUserProps = Record<string, unknown> & RouteComponentProps<TParams>;

export const EditUser = (props: EditUserProps): React.ReactElement => {
	const {
		data: user,
		isLoading,
		error,
	} = useFetch<UserType>(Endpoints.user(props.match.params.id));

	const { id } = props.match.params;

	const usernameBreadcrumb = isLoading
		? "Loading user details"
		: error
		? "Error"
		: `${user.firstName} ${user.lastName}`;

	return (
		<>
			<Breadcrumbs>
				<Breadcrumb
					data-qa-sel="breadcrumb-user-link"
					to="/users"
					elementType={Link}
				>
					Users
				</Breadcrumb>
				<Breadcrumb to={`/users/${id}`} elementType={Link}>
					{usernameBreadcrumb}
				</Breadcrumb>
				<Breadcrumb>Edit user</Breadcrumb>
			</Breadcrumbs>

			{!error ? (
				<Grid equalHeight>
					<GridItem cols={12} md={4} className="mb--d">
						{`${user.firstName} ${user.lastName}`}
					</GridItem>
				</Grid>
			) : (
				<ErrorMessage error={error}></ErrorMessage>
			)}
		</>
	);
};
