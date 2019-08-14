import React, { Component } from "react";
import { Link } from "react-router-dom";

type User = {
	// TODO: Move model to shared model types file
	id: string;
	name: string;
};

type UsersListProps = {};

type UsersListState = {
	isLoading: boolean;
	users: User[];
};

export class UsersList extends Component<UsersListProps, UsersListState> {
	constructor(props: UsersListProps) {
		super(props);

		this.state = {
			isLoading: true,
			users: [],
		};
	}

	// Mimic async get request
	fetchUsers() {
		const users: User[] = [{ id: "1", name: "Ian" }, { id: "2", name: "John" }];

		return Promise.resolve(users);
	}

	componentDidMount() {
		this.fetchUsers().then(users => {
			this.setState({
				isLoading: false,
				users: users,
			});
		});
	}

	render() {
		return (
			<>
				{this.state.isLoading ? (
					<p>Loading...</p>
				) : (
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Service</th>
							</tr>
						</thead>
						<tbody>
							{this.state.users.map(user => (
								<tr key={user.id}>
									<td>
										<Link to={`/users/${user.id}`}>{user.name}</Link>
									</td>
									<td>EPPI Reviewer</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</>
		);
	}
}
