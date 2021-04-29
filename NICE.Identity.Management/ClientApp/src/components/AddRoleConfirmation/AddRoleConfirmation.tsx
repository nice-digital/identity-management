import React from "react";
import { Link } from "react-router-dom";

import { Alert } from "@nice-digital/nds-alert";

type AddRoleConfirmationProps = {
	id: number;
	fullName: string;
};

export const AddRoleConfirmation = (props: AddRoleConfirmationProps) => {
	const { id, fullName } = props;

	return (
		<Alert type="success">
			<p>Your changes have been saved.</p>
			<Link to={`/users/${id}`}>Back to {fullName}</Link>
		</Alert>
	);
};
