import React, { Component } from "react";
import { RouteComponentProps, Link, Redirect } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Input } from "@nice-digital/nds-input";
import { Endpoints } from "src/data/endpoints";
import { fetchData } from "src/helpers/fetchData";
import { isDataError } from "src/helpers/isDataError";
import { ErrorMessage } from "src/components/ErrorMessage/ErrorMessage";
import { type OrganisationType } from "src/models/types";

type TParams = { id: string };

type EditOrganisationProps = Record<string, unknown> &
	RouteComponentProps<TParams>;

type EditOrganisationState = {
	validationError: boolean;
	validationErrorMessage: string;
	fetchedOrgNameFound: boolean;
	organisation: OrganisationType;
	formName: string;
	isLoading: boolean;
	hasSubmitted: boolean;
	error?: Error;
	isSaveButtonLoading: boolean;
};
export class EditOrganisation extends Component<
	EditOrganisationProps,
	EditOrganisationState
> {
	constructor(props: EditOrganisationProps) {
		super(props);

		this.state = {
			validationError: false,
			validationErrorMessage:
				"Organisation name should be alphanumeric and be between 2-100 characters",
			fetchedOrgNameFound: false,
			organisation: {} as OrganisationType,
			formName: "",
			isLoading: true,
			hasSubmitted: false,
			isSaveButtonLoading: false,
		};

		document.title = "NICE Accounts - Edit organisation";
	}

	typingTimer = 0;

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const organisation = await fetchData(
			Endpoints.organisation(this.props.match.params.id),
		);

		if (isDataError(organisation)) {
			this.setState({ error: organisation });
		} else {
			this.setState({ formName: organisation.name });
		}

		this.setState({ organisation, isLoading: false });
	}

	checkOrgName = async (formName: string): Promise<void> => {
		const orgName = this.state.organisation.name.toLowerCase();
		formName = formName.toLowerCase();
		const namesAreDifferent = orgName !== formName;
		let fetchedOrgNameFound = false;

		if (namesAreDifferent) {
			const fetchOrgName = await fetchData(
				Endpoints.organisationsListSearch(formName),
			);

			if (isDataError(fetchOrgName)) {
				this.setState({ error: fetchOrgName });
			}

			fetchedOrgNameFound = fetchOrgName.length
				? fetchOrgName.some((org: any) => org.name.toLowerCase() === formName)
				: fetchedOrgNameFound;
		}

		this.setState({ fetchedOrgNameFound });
		this.typingTimer = 0;
	};

	toggleValidationMessage = (
		blockedOrgNameFound: boolean,
		orgName = "",
	): string => {
		const orgNameOrDefault = orgName || "organisation";
		return blockedOrgNameFound
			? `Cannot change to ${orgNameOrDefault}, that organisation already exists!`
			: "Organisation name should be alphanumeric and be between 2-100 characters";
	};

	handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void | boolean> => {
		e.preventDefault();
		this.setState({ isSaveButtonLoading: true });

		const { validationError } = this.state;
		const form = e.currentTarget;
		const formName = this.state.formName.trim();
		const formHasNotChanged = formName === this.state.organisation.name;

		if (formHasNotChanged) {
			this.setState({
				isSaveButtonLoading: false,
				hasSubmitted: true,
			});
			return false;
		}

		if (this.typingTimer) {
			clearTimeout(this.typingTimer);
			await this.checkOrgName(formName);
		}

		const { fetchedOrgNameFound } = this.state;

		if (!form.checkValidity() || validationError || fetchedOrgNameFound) {
			const validationErrorMessage = this.toggleValidationMessage(
				fetchedOrgNameFound,
				formName,
			);
			this.setState({
				validationError: true,
				validationErrorMessage,
				isSaveButtonLoading: false,
			});
			return false;
		}

		const fetchOptions = {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: formName,
			}),
		};

		const organisation = await fetchData(
			Endpoints.organisation(this.props.match.params.id),
			fetchOptions,
		);

		if (isDataError(organisation)) {
			this.setState({ error: organisation });
		}

		this.setState({
			isSaveButtonLoading: false,
			hasSubmitted: true,
		});
	};

	handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const formElement = e.target;
		const formName = formElement.value;
		const isNowValid = formElement.validity.valid;
		let { validationError } = this.state;

		if (isNowValid) {
			validationError = false;
		}

		clearTimeout(this.typingTimer);
		this.typingTimer = setTimeout(this.checkOrgName, 1000, formName.trim());

		this.setState({
			formName,
			validationError,
		});
	};

	handleBlur = async (
		e: React.ChangeEvent<HTMLInputElement>,
	): Promise<void> => {
		const formElement = e.target;
		const formName = this.state.formName.trim();

		if (this.typingTimer) {
			clearTimeout(this.typingTimer);
			await this.checkOrgName(formName);
		}

		const { fetchedOrgNameFound } = this.state;

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
		const {
			organisation,
			formName,
			isLoading,
			hasSubmitted,
			error,
			isSaveButtonLoading,
			validationError,
			validationErrorMessage,
		} = this.state;
		const organisationId = this.props.match.params.id;

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb to="/overview" elementType={Link}>
						Administration
					</Breadcrumb>
					<Breadcrumb to="/organisations" elementType={Link}>
						Organisations
					</Breadcrumb>
					<Breadcrumb
						to={`/organisations/${organisationId}`}
						elementType={Link}
					>
						{isLoading ? "Loading organisation details" : organisation.name}
					</Breadcrumb>
					<Breadcrumb>Edit organisation</Breadcrumb>
				</Breadcrumbs>

				{error ? (
					<>
						<PageHeader heading="Error" />
						<ErrorMessage error={error}></ErrorMessage>
					</>
				) : (
					<>
						<PageHeader heading="Edit organisation" />
						{isLoading ? (
							<p>Loading...</p>
						) : (
							<>
								{hasSubmitted && (
									<Redirect
										to={{
											pathname: `/organisations/${organisationId}`,
											state: { hasBeenEdited: true },
										}}
									/>
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
												onChange={this.handleChange}
												onBlur={this.handleBlur}
												error={validationError}
												errorMessage={validationErrorMessage}
												value={formName}
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
												to={`/organisations/${organisationId}`}
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
						)}
					</>
				)}
			</>
		);
	}
}
