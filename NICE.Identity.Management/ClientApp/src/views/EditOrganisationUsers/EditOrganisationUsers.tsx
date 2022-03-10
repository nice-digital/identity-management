import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "@nice-digital/nds-alert";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Input } from "@nice-digital/nds-input";
// import { Endpoints } from "../../data/endpoints";
// import { fetchData } from "../../helpers/fetchData";
// import { isDataError } from "../../helpers/isDataError";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

type EditOrganisationUsersState = {
	// formName: string;
	// validationError: boolean;
	hasSubmitted: boolean;
	error?: Error;
	isSaveButtonLoading: boolean;
};
export class EditOrganisationUsers extends Component<
	Record<string, never>,
	EditOrganisationUsersState
> {
	constructor(props = {}) {
		super(props);

		this.state = {
			// formName: "",
			// validationError: false,
			hasSubmitted: false,
			isSaveButtonLoading: false,
		};

		document.title = "NICE Accounts - Edit users";
	}

	handleSubmit = (): void => {
		console.log("mark");
	};

	render(): JSX.Element {
		//const { formName, hasSubmitted, error, isSaveButtonLoading } = this.state;
		const { hasSubmitted, error, isSaveButtonLoading } = this.state;

		// if (hasSubmitted) {
		// 	return <Redirect to="/organisations" />;
		// }

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb to="/overview" elementType={Link}>
						Administration
					</Breadcrumb>
					<Breadcrumb to="/organisations" elementType={Link}>
						Organisations
					</Breadcrumb>
					<Breadcrumb to="/organisations/:id">ORG NAME</Breadcrumb>
					<Breadcrumb>Edit users</Breadcrumb>
				</Breadcrumbs>

				<PageHeader heading="Edit users" />

				{!error ? (
					<>
						{hasSubmitted && (
							<Alert
								type="info"
								role="status"
								aria-live="polite"
								data-qa-sel="successful-message-edit-organisation"
							>
								<p>Org EDITED.</p>
								{/* IS THIS :id ok */}
								<Link to={`/organisations/:id`}>Back to organisation page</Link>
							</Alert>
						)}

						<Grid>
							<GridItem cols={12} md={6} lg={4}>
								<p>Edit users for org</p>
							</GridItem>
						</Grid>
					</>
				) : (
					<ErrorMessage error={error}></ErrorMessage>
				)}
			</>
		);
	}
}
