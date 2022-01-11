import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Input } from "@nice-digital/nds-input";
import { Endpoints } from "../../data/endpoints";
import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

type AddOrganisationProps = {};
type AddOrganisationState = {
	path: string;
	formName: string;
	hasSubmitted: boolean;
	error?: Error;
	isLoading: boolean;
	isSaveButtonLoading: boolean;
};
export class AddOrganisation extends Component<
	AddOrganisationProps,
	AddOrganisationState
> {
	constructor(props: AddOrganisationProps) {
		super(props);

		this.state = {
			path: "",
			formName: "",
			hasSubmitted: false,
			isLoading: false,
			isSaveButtonLoading: false,
		};

		document.title = "NICE Accounts - Add organisation";
	}

	componentDidMount(): void {
		this.setState({ isLoading: true });

		// something

		this.setState({ isLoading: false });
	}

	handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void | boolean> => {
		e.preventDefault();
		// do something
		this.setState({ isSaveButtonLoading: true });

		const fetchOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: this.state.formName,
			}),
		};

		//const data = await doFetch<UserType>(Endpoints.user(id), fetchOptions);

		let organisation = await fetchData(
			Endpoints.organisationsList,
			fetchOptions,
		);

		if (isDataError(organisation)) {
			this.setState({ error: organisation });
		}

		this.setState({ isSaveButtonLoading: false, hasSubmitted: true });
	};

	handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		// do something else
		this.setState({ formName: e.target.value });
	};

	render(): JSX.Element {
		const {
			path,
			formName,
			hasSubmitted,
			error,
			isLoading,
			isSaveButtonLoading,
		} = this.state;

		if (hasSubmitted) {
			return <Redirect to="/organisations" />;
		}

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
									onChange={this.handleChange}
									error={false}
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
				) : (
					<ErrorMessage error={error}></ErrorMessage>
				)}
			</>
		);
	}
}
