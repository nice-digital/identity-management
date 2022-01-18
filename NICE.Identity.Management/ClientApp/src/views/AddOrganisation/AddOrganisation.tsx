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

type CustomError = {
	error: Error;
	dataMessage: string;
};

type AddOrganisationState = {
	formName: string;
	validationError: boolean;
	validationErrorMessage: string;
	orgNameBlockedArray: Array<string>;
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
			orgNameBlockedArray: [],
			hasSubmitted: false,
			isSaveButtonLoading: false,
		};

		document.title = "NICE Accounts - Add organisation";
	}

	toggleValidationMessage = (blockedOrgNameFound: boolean): string => {
		return blockedOrgNameFound
			? "Organisation already exists - name should be unique"
			: "Organisation name should be alphanumeric and be between 2-100 characters";
	};

	handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void | boolean> => {
		e.preventDefault();
		this.setState({ isSaveButtonLoading: true });

		const form = e.currentTarget;
		const blockedOrgNameFound = this.state.orgNameBlockedArray.includes(
			this.state.formName,
		);
		let hasSubmitted = true;
		let formName = "";

		if (!form.checkValidity() || blockedOrgNameFound) {
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
			true,
		);

		if (isDataError(organisation)) {
			const errorObject = organisation as CustomError;

			if (errorObject.dataMessage.indexOf("that organisation already exists")) {
				const orgNameBlockedArray = [...this.state.orgNameBlockedArray];
				hasSubmitted = false;
				formName = this.state.formName;
				orgNameBlockedArray.push(formName);
				this.setState({
					validationError: true,
					validationErrorMessage:
						"Organisation already exists - name should be unique",
					orgNameBlockedArray,
				});
			} else {
				this.setState({ error: organisation });
			}
		}

		this.setState({
			isSaveButtonLoading: false,
			hasSubmitted,
			formName,
		});
	};

	handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const formElement = e.target;
		const blockedOrgNameFound = this.state.orgNameBlockedArray.includes(
			e.target.value,
		);
		const isNowValid = formElement.validity.valid
			? !blockedOrgNameFound
			: false;
		const validationErrorMessage =
			this.toggleValidationMessage(blockedOrgNameFound);
		let { validationError } = this.state;

		if (validationError && isNowValid) {
			validationError = false;
		}

		this.setState({
			formName: e.target.value,
			validationError,
			validationErrorMessage,
		});
	};

	handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const formElement = e.target;
		const blockedOrgNameFound = this.state.orgNameBlockedArray.includes(
			this.state.formName,
		);
		const isNowValid = formElement.validity.valid
			? !blockedOrgNameFound
			: false;

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
