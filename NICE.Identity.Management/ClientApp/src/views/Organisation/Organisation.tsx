import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { StaticContext } from "react-router";

import { OrganisationType } from "../../models/types";

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

	render(): JSX.Element {
		const { organisation} = this.state;

		return (
			<div>
				<p>Org Details</p>

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
