import React, { Component } from "react";

import { Endpoints } from "../../data/endpoints";

type UnlockUserProps = {
	id: number;
	isBlocked: boolean;
	onToggleLock: Function;
	onError: Function;
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
					blocked: !this.props.isBlocked,
				}),
			});
			data = await response.json();
		} catch (error) {
			this.props.onError(error);
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
		const { isLoading: isButtonDisabled } = this.state;

		return (
			<button
				className="btn"
				onClick={this.fetchPatchData}
				type="button"
				disabled={isButtonDisabled}
			>
				{this.props.isBlocked ? "Unlock user" : "Lock user"}
			</button>
		);
	}
}
