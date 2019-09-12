import React, { Component } from "react";

import { Endpoints } from "../../data/endpoints";

type DeleteUserProps = {
	id: Number;
	onDeleteUser: Function;
};

export class DeleteUser extends Component<DeleteUserProps> {
	fetchDeleteData = async (url: string, id: Number) => {
		const response = await fetch(url, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id }),
		});
		const data = await response.json();
		this.props.onDeleteUser([data]);
	};

	handleClick = () => {
		const apiUrl = Endpoints.editUser(this.props.id);

		this.fetchDeleteData(apiUrl, this.props.id);
	};

	render() {
		return (
			<>
				<button
					className="btn"
					onClick={() => this.handleClick()}
					type="button"
				>
					Delete user
				</button>
			</>
		);
	}
}
