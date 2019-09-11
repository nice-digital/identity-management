import React, { Component } from "react";

import { RouteComponentProps, Link } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Panel } from "@nice-digital/nds-panel";
import { Tag } from "@nice-digital/nds-tag";

import { UserType } from "../../models/types";
import { Endpoints } from "../../data/endpoints";
import { Unlock } from "../../components/UnlockUser/UnlockUser";

type TParams = { id: string };

type UserProps = {} & RouteComponentProps<TParams>;

type UserState = {
	data: Array<UserType>;
	error: string;
};

export class User extends Component<UserProps, UserState> {
	constructor(props: UserProps) {
		super(props);

		this.state = {
			data: [],
			error: "",
		};
	}

	updateData = (updatedData: Array<UserType>) => {
		this.setState({ data: updatedData });
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
		const { data, error } = this.state;
		const userDetails = data[0];

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
