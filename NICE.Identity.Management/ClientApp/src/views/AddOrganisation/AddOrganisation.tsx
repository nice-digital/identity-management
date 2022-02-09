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

type AddOrganisationState = {
	formName: string;
	validationError: boolean;
	hasSubmitted: boolean;
	error?: Error;
	isSaveButtonLoading: boolean;
};
export class AddOrganisation extends Component<
	Record<string, never>,
	AddOrganisationState
> {
	constructor(props = {}) {
		super(props);

		this.state = {
			formName: "",
			validationError: false,
			hasSubmitted: false,
			isSaveButtonLoading: false,
		};

		document.title = "NICE Accounts - Add organisation";
	}

	handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void | boolean> => {
		e.preventDefault();
		this.setState({ isSaveButtonLoading: true });

		const form = e.currentTarget;

		if (!form.checkValidity()) {
			this.setState({ validationError: true, isSaveButtonLoading: false });
			return false;
		}

		const fetchOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: this.state.formName,
			}),
		};

		const organisation = await fetchData(
			Endpoints.organisationsList,
			fetchOptions,
		);

		if (isDataError(organisation)) {
			this.setState({ error: organisation });
		}

		this.setState({
			isSaveButtonLoading: false,
			hasSubmitted: true,
			formName: "",
		});
	};

	handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const formElement = e.target;
		const isNowValid = formElement.validity.valid;
		let { validationError } = this.state;

		if (validationError && isNowValid) {
			validationError = false;
		}

		this.setState({ formName: e.target.value, validationError });
	};

	handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const formElement = e.target;
		const isNowValid = formElement.validity.valid;

		this.setState({ validationError: !isNowValid });
	};

	render(): JSX.Element {
		const { formName, hasSubmitted, error, isSaveButtonLoading } = this.state;

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
					<Breadcrumb>Add organisation</Breadcrumb>
				</Breadcrumbs>

				<PageHeader heading="Add organisation" />

				{!error ? (
					<>
						{hasSubmitted && (
							<Alert
								type="info"
								role="status"
								aria-live="polite"
								data-qa-sel="successful-message-add-organisation"
							>
								<p>New organisation has been added successfully.</p>
								<Link to={`/organisations`}>
									Back to organisation admin page
								</Link>
							</Alert>
						)}
						<Grid>
							<GridItem cols={12} md={6} lg={4}>
								<form onSubmit={this.handleSubmit} noValidate>
									<Input
										data-qa-sel="name-input-add-organisation"
										label="Organisation name"
										name="orgName"
										type="text"
										required
										autoComplete="off"
										minLength="2"
										maxLength="100"
										pattern="^((?![<>]).)*$"
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										error={this.state.validationError}
										errorMessage="Organisation name should be alphanumeric and should not exceed 100 characters"
										value={formName}
										disabled={isSaveButtonLoading}
									/>
									<Button
										data-qa-sel="save-button-add-organisation"
										variant="cta"
										type="submit"
										disabled={isSaveButtonLoading}
									>
										{isSaveButtonLoading ? "Loading..." : "Save organisation"}
									</Button>
									<Button
										to={`/organisations`}
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
