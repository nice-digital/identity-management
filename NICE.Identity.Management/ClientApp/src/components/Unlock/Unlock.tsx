import React, { Component } from "react";

import { Endpoints } from "../../data/endpoints";

type UnlockProps = {
	id: number;
	blocked: boolean;
	onToggleLock: Function;
};

export class Unlock extends Component<UnlockProps> {
	fetchPatchData = async (url: string, isBlocked: boolean) => {
		const response = await fetch(Endpoints.unlock(this.props.id), {
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
		const apiUrl = Endpoints.unlock(this.props.id);

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
