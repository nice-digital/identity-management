import React from "react";
import { Link } from "react-router-dom";

import { Alert } from "@nice-digital/nds-alert";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Grid, GridItem } from "@nice-digital/nds-grid";

type DeleteOrganisationConfirmationProps = {
	name: string;
};

export const DeleteOrganisationConfirmation = (
	props: DeleteOrganisationConfirmationProps,
): React.ReactElement => {
	const { name } = props;

	document.title = `NICE Accounts - ${name} deleted`;

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
					data-qa-sel="breadcrumb-organisation-link"
					to="/organisations"
					elementType={Link}
				>
					Organisations
				</Breadcrumb>
				<Breadcrumb>{name}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader heading="Organisation deleted" />

			<Grid>
				<GridItem cols={12} md={9}>
					<Alert type="success" data-qa-sel="deletion-success">
						<p>The organisation {name} was successfully deleted.</p>
						<Link data-qa-sel="back-to-organisations" to="/organisations">
							Back to organisations
						</Link>
					</Alert>
				</GridItem>
			</Grid>
		</>
	);
};
