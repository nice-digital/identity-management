import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Button } from "@nice-digital/nds-button";
import { PageHeader } from "@nice-digital/nds-page-header";

import { OrganisationType } from "../../models/types";
import { Endpoints } from "../../data/endpoints";

import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";

type TParams = { id: string };

type DeleteOrganisationProps = Record<string, unknown> & RouteComponentProps<TParams>;

type DeleteOrganisationState = {
	organisation: OrganisationType;
	hasBeenDeleted: boolean;
	error?: Error;
	isLoading: boolean;
	isDeleteButtonLoading: boolean;
};

export class DeleteOrganisation extends Component<DeleteOrganisationProps, DeleteOrganisationState> {
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

		const organisation = await fetchData(Endpoints.organisation(this.props.match.params.id));

		if (isDataError(organisation)) {
			this.setState({ error: organisation });
		}

		this.setState({ organisation, isLoading: false });
		document.title = `NICE Accounts - Delete ${organisation.name}`;
	}

	render(): JSX.Element {
		const { isLoading, isDeleteButtonLoading, error, hasBeenDeleted, organisation } = this.state;
		const { id } = this.props.match.params;

		let lastBreadcrumb = `${organisation.name}`;

		if (isLoading) {
			lastBreadcrumb = "Loading organisation details";
		}

		return (
			<>
				{/* Delete Confirmation */}
				
				<>
					<Breadcrumbs>
						<Breadcrumb to="/organisations" elementType={Link}>
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
				</>


				<PageHeader
					preheading="Are you sure you want to delete organisation?"
					heading={`${organisation.name}`}
					cta={
						<>
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
						</>
					}
				/>
			</>
		)
	}
}