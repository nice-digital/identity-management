import React, { Component } from "react";

import { Endpoints } from "../../data/endpoints";

type UnlockUserProps = {
	id: number;
	blocked: boolean;
	onToggleLock: Function;
};

export class UnlockUser extends Component<UnlockUserProps> {
	fetchPatchData = async (url: string, isBlocked: boolean) => {
		const response = await fetch(url, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				blocked: !isBlocked,
			}),
		});
		const data = await response.json();
		this.props.onToggleLock([data]);
	};

	handleClick = () => {
		const apiUrl = Endpoints.editUser(this.props.id);

		this.fetchPatchData(apiUrl, this.props.blocked);
	};

	render() {
		return (
			<>
				<button
					className="btn"
					onClick={() => this.handleClick()}
					type="button"
				>
					{this.props.blocked ? "Unlock user" : "Lock user"}
				</button>
			</>
		);
	}
}
