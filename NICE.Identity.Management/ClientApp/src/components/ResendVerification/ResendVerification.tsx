import React, { Component } from "react";
import { Button } from "@nice-digital/nds-button";

import { Endpoints } from "../../data/endpoints";
import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";

type ResendVerificationProps = {
	id: number;
	onError: (error: Error) => void;
};

type ResendVerificationState = {
	isLoading: boolean;
	hasSent: boolean;
};

export class ResendVerification extends Component<ResendVerificationProps, ResendVerificationState> {
	constructor(props: ResendVerificationProps) {
		super(props);

		this.state = {
			isLoading: false,
			hasSent: false
		};
	}

	handleClick = async () => {
		this.setState({ isLoading: true });

		let fetchOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				user_id: this.props.id,
			}),
		};

		console.log(`fetchOptions: ${JSON.stringify(fetchOptions)}`);
		console.log(`Endpoints.verificationEmail: ${Endpoints.verificationEmail}`);

		let jobStatus = await fetchData(
			Endpoints.verificationEmail,
			fetchOptions,
		);
		console.log(`jobstatus: ${JSON.stringify(jobStatus)}`);

		if (isDataError(jobStatus)) {
			this.props.onError(new Error(jobStatus.message));
		}

		this.setState({ isLoading: false, hasSent: true });
	};

	render() {
		const { isLoading, hasSent } = this.state;
		const isButtonDisabled = isLoading || hasSent;

		return (
			<Button
				data-qa-sel="resend-verification-user-button"
				variant="secondary"
				onClick={this.handleClick}
				disabled={isButtonDisabled}
			>
				{isLoading
					? "Loading..."
					: hasSent
					? "Email sent"
					: "Resend verification email"}
			</Button>
		);
	}
}
