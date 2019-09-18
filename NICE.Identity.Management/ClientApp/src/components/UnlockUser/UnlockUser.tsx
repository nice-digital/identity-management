import React, { Component } from "react";

import { Endpoints } from "../../data/endpoints";

type UnlockUserProps = {
	id: number;
	isBlocked: boolean;
	onToggleLock: Function;
	onError: Function;
};

type UnlockUserState = {
	error: string;
	buttonDisable: boolean;
};

export class UnlockUser extends Component<UnlockUserProps, UnlockUserState> {
	constructor(props: UnlockUserProps) {
		super(props);

		this.state = {
			error: "",
			buttonDisable: false,
		};
	}

	triggerError = (message: string) => {
		this.props.onError(new Error(message));
	};

	fetchPatchData = async (
		url: string,
		isBlocked: boolean,
		callback: Function,
	) => {
		try {
			const response = await fetch(url, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					blocked: !isBlocked,
				}),
			});
			const data = await response.json();

			if (response.status !== 200) {
				this.triggerError("Not Found");
			}

			this.props.onToggleLock(data);
			callback();
		} catch (error) {
			this.triggerError(error.message);
		}
	};

	handleClick = () => {
		const apiUrl = Endpoints.user(`${this.props.id}`);
		const toggleDisability = () => {
			this.setState({ buttonDisable: !this.state.buttonDisable });
		};

		toggleDisability();

		this.fetchPatchData(apiUrl, this.props.isBlocked, toggleDisability);
	};

	render() {
		const { buttonDisable } = this.state;

		return (
			<button
				className="btn"
				onClick={this.handleClick}
				type="button"
				disabled={buttonDisable}
			>
				{this.props.isBlocked ? "Unlock user" : "Lock user"}
			</button>
		);
	}
}
