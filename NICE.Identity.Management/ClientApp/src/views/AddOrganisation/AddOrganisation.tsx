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
	validationErrorMessage: string;
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
			validationErrorMessage:
				"Organisation name should be alphanumeric and be between 2-100 characters",
			hasSubmitted: false,
			isSaveButtonLoading: false,
		};

		document.title = "NICE Accounts - Add organisation";
	}

	toggleValidationMessage = (
		blockedOrgNameFound: boolean,
		orgName = "",
	): string => {
		const orgNameOrDefault = orgName || "organisation";
		return blockedOrgNameFound
			? `Cannot add ${orgNameOrDefault}, that organisation already exists!`
			: "Organisation name should be alphanumeric and be between 2-100 characters";
	};

	fetchedOrgNameFound = async (formName: string): Promise<boolean> => {
		let fetchedOrgNameFound = false;

		const fetchOrgName = await fetchData(
			`${Endpoints.organisationsList}?q=${formName}`,
		);

		fetchedOrgNameFound = fetchOrgName.length
			? fetchOrgName.some((org: any) => org.name === formName)
			: fetchedOrgNameFound;

		return fetchedOrgNameFound;
	};

	handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void | boolean> => {
		e.preventDefault();
		this.setState({ isSaveButtonLoading: true });

		const { formName, validationError } = this.state;
		const form = e.currentTarget;
		const trimmedFormName = formName.trim();
		const fetchedOrgNameFound =
			document.activeElement?.id === "orgName" && !validationError
				? await this.fetchedOrgNameFound(trimmedFormName)
				: false;

		if (!form.checkValidity() || validationError || fetchedOrgNameFound) {
			const validationErrorMessage = fetchedOrgNameFound
				? this.toggleValidationMessage(true, trimmedFormName)
				: this.state.validationErrorMessage;
			this.setState({
				validationError: true,
				validationErrorMessage,
				isSaveButtonLoading: false,
			});
			return false;
		}

		const fetchOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: trimmedFormName,
			}),
		};

		const organisation = await fetchData(
			Endpoints.organisationsList,
			fetchOptions,
			true,
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

		this.setState({
			formName: e.target.value,
			validationError,
		});
	};

	handleBlur = async (
		e: React.ChangeEvent<HTMLInputElement>,
	): Promise<void> => {
		const formElement = e.target;
		const formName = this.state.formName.trim();
		let fetchedOrgNameFound = false;

		if (formElement.validity.valid) {
			fetchedOrgNameFound = await this.fetchedOrgNameFound(formName);
		}

		const isNowValid = formElement.validity.valid
			? !fetchedOrgNameFound
			: false;

		const validationErrorMessage = this.toggleValidationMessage(
			fetchedOrgNameFound,
			formName,
		);

		this.setState({
			validationError: !isNowValid,
			validationErrorMessage,
			formName,
		});
	};

	render(): JSX.Element {
		const { formName, hasSubmitted, error, isSaveButtonLoading } = this.state;

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
										errorMessage={this.state.validationErrorMessage}
										value={formName}
										disabled={isSaveButtonLoading}
										placeholder="Add organisation name"
										className={"mb--e"}
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
