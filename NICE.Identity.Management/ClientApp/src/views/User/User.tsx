import React, { Component } from "react";

import { RouteComponentProps, Link, Redirect } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Panel } from "@nice-digital/nds-panel";
import { Tag } from "@nice-digital/nds-tag";

import { UserType } from "../../models/types";
import { Endpoints } from "../../data/endpoints";
import { UnlockUser } from "../../components/UnlockUser/UnlockUser";
import { DeleteUser } from "../../components/DeleteUser/DeleteUser";

type TParams = { id: string };

type UserProps = {} & RouteComponentProps<TParams>;

type UserState = {
	data: Array<UserType>;
	error: string;
	redirect: boolean;
};

export class User extends Component<UserProps, UserState> {
	constructor(props: UserProps) {
		super(props);

		this.state = {
			data: [],
			error: "",
			redirect: false,
		};
	}

	updateData = (updatedData: Array<UserType>) => {
		// if user has been deleted redirect, otherwise reload data
		if (!Object.keys(updatedData[0]).length) {
			this.setState({ redirect: true });
		} else {
			this.setState({ data: updatedData });
		}
	};

	fetchData = async (url: string) => {
		try {
			const response = await fetch(url);
			const data = await response.json();
			this.setState({ data });
		} catch (error) {
			this.setState({ error });
		}
	};

	componentDidMount() {
		this.fetchData(Endpoints.user(this.props.match.params.id));
	}

	render() {
		const { data, error, redirect } = this.state;
		const userDetails = data[0];

		if (redirect) {
			return <Redirect to="/users" />;
		}

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb to="/" tag={Link}>
						Home
					</Breadcrumb>
					<Breadcrumb to="/users" tag={Link}>
						Users
					</Breadcrumb>
				</Breadcrumbs>

				<div className="page-header" id="content-start">
					<h1 className="page-header__heading">User details</h1>
				</div>

				{!error ? (
					<div className="grid">
						<div data-g="12 md:9" aria-busy={!data.length}>
							{!data.length ? (
								<p>Loading...</p>
							) : (
								<Panel>
									<Tag>{!userDetails.blocked ? "Active" : "Locked"}</Tag>
									<p>
										User: {userDetails.first_name} {userDetails.last_name}
									</p>

									<UnlockUser
										id={userDetails.id}
										blocked={userDetails.blocked}
										onToggleLock={this.updateData}
									/>

									<DeleteUser
										id={userDetails.id}
										onDeleteUser={this.updateData}
									/>
								</Panel>
							)}
						</div>
					</div>
				) : (
					<p id="user-error">Whoops... There's a been an error.</p>
				)}
			</>
		);
	}
}
