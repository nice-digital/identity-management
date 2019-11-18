import React, { Component } from "react";
import { Button } from "@nice-digital/nds-button";

import { Endpoints } from "../../data/endpoints";
import { UserType } from "../../models/types";

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

	fetchPatchData = async () => {
		this.setState({ isLoading: true });

		let response, data;
		try {
			response = await fetch(Endpoints.user(this.props.id), {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
                    isLockedOut: !this.props.isLocked,
				}),
			});
			data = await response.json();
		} catch (err) {
			let error: Error = err;

			this.props.onError(error);
			this.setState({ isLoading: false });
			return;
		}

		this.setState({ isLoading: false });

		if (response.status === 200) {
			this.props.onToggleLock(data);
		} else {
			this.props.onError(new Error(data.message));
		}
	};

	render() {
		const { isLocked } = this.props;
		const { isLoading: isButtonDisabled } = this.state;

		return (
			<Button
				data-qa-sel="lock-user-button"
				variant="secondary"
				onClick={this.fetchPatchData}
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
