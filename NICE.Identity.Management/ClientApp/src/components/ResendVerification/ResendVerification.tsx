import React, { Component } from "react";
import { Button } from "@nice-digital/nds-button";
import { Endpoints } from "src/data/endpoints";
import { fetchData } from "src/helpers/fetchData";
import { isDataError } from "src/helpers/isDataError";

type ResendVerificationProps = {
	nameIdentifier: string;
	onError: (error: Error) => void;
};

type ResendVerificationState = {
	isLoading: boolean;
	hasSent: boolean;
};

export class ResendVerification extends Component<
	ResendVerificationProps,
	ResendVerificationState
> {
	constructor(props: ResendVerificationProps) {
		super(props);

		this.state = {
			isLoading: false,
			hasSent: false,
		};
	}

	handleClick = async (): Promise<void> => {
		this.setState({ isLoading: true });

		const fetchOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				user_id: this.props.nameIdentifier,
			}),
		};

		const jobStatus = await fetchData(
			Endpoints.verificationEmail,
			fetchOptions,
		);

		if (isDataError(jobStatus)) {
			this.props.onError(new Error(jobStatus.message));
		}

		this.setState({ isLoading: false, hasSent: true });
	};

	render(): JSX.Element {
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
