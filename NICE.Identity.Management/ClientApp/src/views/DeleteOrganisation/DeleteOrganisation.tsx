import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

import { OrganisationType } from "../../models/types";

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

	render(): JSX.Element {
		const { isLoading, isDeleteButtonLoading, error, hasBeenDeleted, organisation } = this.state;
		const { id } = this.props.match.params;

		//let lastBreadcrumb = `${user.firstName} ${user.lastName}`;

		// if (isLoading) {
		// lastBreadcrumb = "Loading organisation details";
		// }

		return (
			<></>
		)
	}
}