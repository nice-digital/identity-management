import React from "react";

import { Alert } from "@nice-digital/nds-alert";

type ErrorMessageProps = {
	error: Error;
	children?: React.ReactNode;
};

export const ErrorMessage = (props: ErrorMessageProps) => (
	<Alert type="error">
		{props.children ? (
			props.children
		) : (
			<>
				<h2>Whoops</h2>
				<p>Sorry, there's been an error!</p>
			</>
		)}
        <dl style={{visibility:"hidden"}}>
            <dt>Message:</dt>
            <dd>{props.error.message}</dd>
            <dt>Stack:</dt>
            <dd>{props.error.stack}</dd>
        </dl>
	</Alert>
);
