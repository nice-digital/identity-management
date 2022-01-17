import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { StaticContext } from "react-router";

import { OrganisationType } from "../../models/types";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { Endpoints } from "../../data/endpoints";

type TParams = { id: string };

type LocationState = {
	hasBeenEdited: boolean;
};

type OrganisationProps = Record<string, unknown> &
	RouteComponentProps<TParams, StaticContext, LocationState>;

type OrganisationState = {
	organisation: OrganisationType;
	error?: Error;
	redirect: boolean;
	isLoading: boolean;
};

export class Organisation extends Component<OrganisationProps, OrganisationState> {
		constructor(props: OrganisationProps) {
			super(props);
	
			this.state = {
				organisation: {} as OrganisationType,
				redirect: false,
				isLoading: true,
			};
		}

		async componentDidMount(): Promise<void> {
			this.setState({ isLoading: true });
	
			const organisation = await fetchData(Endpoints.organisation(this.props.match.params.id));
	
			if (isDataError(organisation)) {
				this.setState({ error: organisation });
			}


			this.setState({ organisation, isLoading: false });
		}

	render(): JSX.Element {
		const { organisation, error, isLoading } = this.state;
		return (
			<div>
				<Breadcrumbs>
					<Breadcrumb to="/overview" elementType={Link}>
						Administration
					</Breadcrumb>
					<Breadcrumb>Organisation</Breadcrumb>
					<Breadcrumb>{organisation.name}</Breadcrumb>
				</Breadcrumbs>

				<PageHeader heading="Organisation Details" className="page-header mb--d" />

				<hr className="mv--b" />

				<h2 className="h3">Permanently delete this organisation</h2>
				<p>
					This organisation will no longer be available, and all data in associated with the
					organisation will be permanently deleted.
				</p>
				<Link
					data-qa-sel="delete-organisation-link"
					to={`/organisations/${organisation.id}/delete`}
					className="pv--c mb--d"
					style={{ display: "inline-block" }}
				>
					Delete organisation
				</Link> 
			</div>
		);
	}
}
