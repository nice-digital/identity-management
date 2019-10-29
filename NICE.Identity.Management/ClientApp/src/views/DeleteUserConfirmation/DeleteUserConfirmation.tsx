import React from "react";
import { Link } from "react-router-dom";

import { Alert } from "@nice-digital/nds-alert";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

type DeleteUserConfirmationProps = {
	full_name: string;
};

export const DeleteUserConfirmation = (props: DeleteUserConfirmationProps) => {
	const { full_name } = props;

	return (
		<>
			<Breadcrumbs>
				<Breadcrumb to="/users" elementType={Link}>
					Users
				</Breadcrumb>
				<Breadcrumb>{full_name}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader heading="User deleted" />

			<Alert type="success" data-qa-sel="deletion-success">
				<p>The user {full_name} was successfully deleted.</p>
				<Link data-qa-sel="back-to-users" to="/users">Back to users</Link>
			</Alert>
		</>
	);
};
