import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "@nice-digital/nds-alert";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Input } from "@nice-digital/nds-input";
import { Endpoints } from "../../data/endpoints";
import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

type EditOrganisationState = {
	// formName: string;
	// validationError: boolean;
	hasSubmitted: boolean;
	error?: Error;
	isSaveButtonLoading: boolean;
};
export class EditOrganisation extends Component<
	Record<string, never>,
	EditOrganisationState
> {
	constructor(props = {}) {
		super(props);

		this.state = {
			// formName: "",
			// validationError: false,
			hasSubmitted: false,
			isSaveButtonLoading: false,
		};

		document.title = "NICE Accounts - Edit organisation";
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
					<Breadcrumb>Edit organisation</Breadcrumb>
				</Breadcrumbs>

				<PageHeader heading="Edit organisation" />

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
								<form onSubmit={this.handleSubmit} noValidate>
									<Input
										data-qa-sel="name-input-edit-organisation"
										label="Organisation name"
										name="orgName"
										type="text"
										required
										autoComplete="off"
										minLength="2"
										maxLength="100"
										pattern="^((?![<>]).)*$"
										// onChange={this.handleChange}
										// onBlur={this.handleBlur}
										// error={this.state.validationError}
										errorMessage="Organisation name should be alphanumeric and should not exceed 100 characters"
										//value={formName}
										disabled={isSaveButtonLoading}
									/>
									<Button
										data-qa-sel="save-button-edit-organisation"
										variant="cta"
										type="submit"
										disabled={isSaveButtonLoading}
									>
										{isSaveButtonLoading ? "Loading..." : "Save changes"}
									</Button>
									<Button
										to={`/organisations/:id`}
										variant="secondary"
										elementType={Link}
										disabled={isSaveButtonLoading}
									>
										Cancel
									</Button>
								</form>
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
