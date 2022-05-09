import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";

import { Alert } from "@nice-digital/nds-alert";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Grid, GridItem } from "@nice-digital/nds-grid";

import { DeleteOrganisationConfirmation } from "../DeleteOrganisationConfirmation/DeleteOrganisationConfirmation";
import { OrganisationType } from "../../models/types";
import { Endpoints } from "../../data/endpoints";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";

type TParams = { id: string };

type DeleteOrganisationProps = Record<string, unknown> &
	RouteComponentProps<TParams>;

type DeleteOrganisationState = {
	organisation: OrganisationType;
	hasBeenDeleted: boolean;
	error?: Error;
	isLoading: boolean;
	isDeleteButtonLoading: boolean;
};

export class DeleteOrganisation extends Component<
	DeleteOrganisationProps,
	DeleteOrganisationState
> {
	constructor(props: DeleteOrganisationProps) {
		super(props);

		this.state = {
			organisation: {} as OrganisationType,
			hasBeenDeleted: false,
			isLoading: true,
			isDeleteButtonLoading: false,
		};
	}

	handleDeleteClick = async (): Promise<void> => {
		this.setState({ isDeleteButtonLoading: true });

		const fetchOptions = {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: this.props.match.params.id }),
		};

		const deletedOrganisation = await fetchData(
			Endpoints.organisation(this.props.match.params.id),
			fetchOptions,
		);

		if (isDataError(deletedOrganisation)) {
			this.setState({ error: deletedOrganisation });
		} else {
			this.setState({ hasBeenDeleted: true });
		}

		this.setState({ isDeleteButtonLoading: false });
	};

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const organisation = await fetchData(
			Endpoints.organisation(this.props.match.params.id),
		);

		if (isDataError(organisation)) {
			this.setState({ error: organisation });
		}

		this.setState({ organisation, isLoading: false });
		document.title = `NICE Accounts - Delete ${organisation.name}`;
	}

	render(): JSX.Element {
		const {
			isLoading,
			isDeleteButtonLoading,
			error,
			hasBeenDeleted,
			organisation,
		} = this.state;
		const { id } = this.props.match.params;

		let lastBreadcrumb = organisation.name;

		if (isLoading) {
			lastBreadcrumb = "Loading organisation details";
		}

		return (
			<>
				{hasBeenDeleted ? (
					<DeleteOrganisationConfirmation name={organisation.name} />
				) : (
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
							{error ? (
								<Breadcrumb>Error</Breadcrumb>
							) : (
								<Breadcrumb to={`/organisations/${id}`} elementType={Link}>
									{lastBreadcrumb}
								</Breadcrumb>
							)}
							<Breadcrumb>Delete organisation</Breadcrumb>
						</Breadcrumbs>

						{!error ? (
							<>
								{isLoading ? (
									<>
										<PageHeader
											preheading="Confirm"
											heading="Delete organisation"
										/>
										<Grid>
											<GridItem cols={12} md={9}>
												<p>Loading...</p>
											</GridItem>
										</Grid>
									</>
								) : (
									<>
										<PageHeader heading={`${organisation.name}`} />
										<Grid>
											<GridItem cols={12} md={9}>
												<Alert
													type="info"
													role="status"
													aria-live="polite"
													data-qa-sel="warning-message-delete-organisation"
												>
													<p>
														Once you delete an organisation, the action cannot
														be undone. Are you sure you want to proceed?
													</p>
												</Alert>

												<Button
													data-qa-sel="confirm-delete-organisation"
													variant="cta"
													onClick={this.handleDeleteClick}
													disabled={isDeleteButtonLoading}
												>
													{isDeleteButtonLoading ? "Loading..." : "Confirm"}
												</Button>
												<Button
													to={`/organisations/${id}`}
													variant="secondary"
													elementType={Link}
													disabled={isDeleteButtonLoading}
												>
													Cancel
												</Button>
											</GridItem>
										</Grid>
									</>
								)}
							</>
						) : (
							<>
								<PageHeader heading="Error" />
								<ErrorMessage error={error}></ErrorMessage>
							</>
						)}
					</>
				)}
			</>
		);
	}
}
