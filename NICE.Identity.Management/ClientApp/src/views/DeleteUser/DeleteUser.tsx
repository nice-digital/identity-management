import React, { Component } from "react";
import { RouteComponentProps, Link, Redirect } from "react-router-dom";

import { Endpoints } from "../../data/endpoints";

type TParams = { id: string };

type DeleteUserProps = {
	id: number;
	// onDeleteUser: Function;
	// onError: Function;
} & RouteComponentProps<TParams>;

type DeleteUserState = {
	isLoading: boolean;
	error?: Error;
};

export class DeleteUser extends Component<DeleteUserProps, DeleteUserState> {
	constructor(props: DeleteUserProps) {
		super(props);

		this.state = {
			isLoading: false,
		};
	}

	handleError = (error: Error) => {
		this.setState({ error });
	};

	fetchDeleteData = async () => {
		this.setState({ isLoading: true });

		let response, data;
		try {
			response = await fetch(Endpoints.user(this.props.match.params.id), {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: this.props.id }),
			});
			data = await response.json();
		} catch (err) {
			let error: Error = err;

			this.handleError(error);
			return;
		}

		this.setState({ isLoading: false });

		if (response.status === 200) {
			this.props.history.push("/users");
		} else {
			this.setState({ error: new Error(data.message) });
		}
	};

	render() {
		const { isLoading: isButtonDisabled } = this.state;

		return (
			<button
				className="btn"
				onClick={this.fetchDeleteData}
				type="button"
				disabled={isButtonDisabled}
			>
				{isButtonDisabled ? "Loading..." : "Delete user"}
			</button>
		);
	}
}
