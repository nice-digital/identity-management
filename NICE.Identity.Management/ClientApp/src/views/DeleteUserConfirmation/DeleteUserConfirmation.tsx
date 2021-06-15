import React from "react";
import { Link } from "react-router-dom";

import { Alert } from "@nice-digital/nds-alert";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

type DeleteUserConfirmationProps = {
	fullName: string;
};

export const DeleteUserConfirmation = (props: DeleteUserConfirmationProps) => {
	const { fullName } = props;

	document.title = `NICE Accounts - ${fullName} deleted`

	return (
		<>
			<Breadcrumbs>
				<Breadcrumb to="/users" elementType={Link}>
					Users
				</Breadcrumb>
				<Breadcrumb>{fullName}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader heading="User deleted" />

			<Alert type="success" data-qa-sel="deletion-success">
				<p>The user {fullName} was successfully deleted.</p>
				<Link data-qa-sel="back-to-users" to="/users">
					Back to users
				</Link>
			</Alert>
		</>
	);
};
