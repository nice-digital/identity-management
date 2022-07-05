import React, { Component } from "react";
import { Button } from "@nice-digital/nds-button";

import { Endpoints } from "src/data/endpoints";
import { UserType } from "src/models/types";
import { fetchData } from "src/helpers/fetchData";
import { isDataError } from "src/helpers/isDataError";

type UnlockUserProps = {
	id: number;
	isLocked: boolean;
	onToggleLock: (user: UserType) => void;
	onError: (error: Error) => void;
};

type UnlockUserState = {
	isLoading: boolean;
};

export class UnlockUser extends Component<UnlockUserProps, UnlockUserState> {
	constructor(props: UnlockUserProps) {
		super(props);

		this.state = {
			isLoading: false,
		};
	}

	handleClick = async (): Promise<void> => {
		this.setState({ isLoading: true });

		const fetchOptions = {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				isLockedOut: !this.props.isLocked,
			}),
		};

		const updatedUser = await fetchData(
			Endpoints.user(this.props.id),
			fetchOptions,
		);

		if (isDataError(updatedUser)) {
			this.props.onError(new Error(updatedUser.message));
		}

		this.props.onToggleLock(updatedUser);

		this.setState({ isLoading: false });
	};

	render(): JSX.Element {
		const { isLocked } = this.props;
		const { isLoading: isButtonDisabled } = this.state;

		return (
			<Button
				data-qa-sel="lock-user-button"
				variant="secondary"
				onClick={this.handleClick}
				disabled={isButtonDisabled}
			>
				{isButtonDisabled
					? "Loading..."
					: isLocked
					? "Unlock user"
					: "Lock user"}
			</Button>
		);
	}
}
