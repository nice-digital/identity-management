import React from "react";
import { Link } from "react-router-dom";

import { Alert } from "@nice-digital/nds-alert";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Grid, GridItem } from "@nice-digital/nds-grid";

type DeleteUserConfirmationProps = {
	fullName: string;
};

export const DeleteUserConfirmation = (
	props: DeleteUserConfirmationProps,
): React.ReactElement => {
	const { fullName } = props;

	document.title = `NICE Accounts - ${fullName} deleted`;

	return (
		<>
			<Breadcrumbs>
				<Breadcrumb
					data-qa-sel="breadcrumb-administration-link"
					to="/"
					elementType={Link}
				>
					Administration
				</Breadcrumb>
				<Breadcrumb
					data-qa-sel="breadcrumb-user-link"
					to="/users"
					elementType={Link}
				>
					Users
				</Breadcrumb>
				<Breadcrumb>{fullName}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader heading="User deleted" />

			<Grid>
				<GridItem cols={12} md={9}>
					<Alert type="success" data-qa-sel="deletion-success">
						<p>The user {fullName} was successfully deleted.</p>
						<Link data-qa-sel="back-to-users" to="/users">
							Back to users
						</Link>
					</Alert>
				</GridItem>
			</Grid>
		</>
	);
};
