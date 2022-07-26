import React from "react";

import { Alert } from "@nice-digital/nds-alert";

type ErrorMessageProps = {
	error: Error;
	children?: React.ReactNode;
};

export const ErrorMessage = (props: ErrorMessageProps): React.ReactElement => (
	<Alert type="error" role="alert">
		{props.children ? (
			props.children
		) : (
			<>
				<h2>Whoops</h2>
				<p>Sorry, there&apos;s been an error!</p>
			</>
		)}

		{process.env.NODE_ENV === "development" && (
			<dl>
				<dt>Message:</dt>
				<dd>{props.error.message}</dd>
				<dt>Stack:</dt>
				<dd>{props.error.stack}</dd>
			</dl>
		)}
	</Alert>
);
