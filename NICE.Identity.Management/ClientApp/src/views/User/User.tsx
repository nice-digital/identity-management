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
	data: UserType;
	error: string;
	redirect: boolean;
	isLoading: boolean;
};

export class User extends Component<UserProps, UserState> {
	constructor(props: UserProps) {
		super(props);

		this.state = {
			data: {} as UserType,
			error: "",
			redirect: false,
			isLoading: true,
		};
	}

	handleError = (error: Error) => {
		this.setState({ error: error.message });
	};

	updateData = (updatedData: UserType) => {
		// if user has been deleted redirect, otherwise reload data
		if (!Object.keys(updatedData).length) {
			this.setState({ redirect: true });
		} else {
			this.setState({ data: updatedData });
		}
	};

	fetchData = async (url: string) => {
		try {
			const response = await fetch(url);
			const data = await response.json();
			this.setState({ data, isLoading: false });
		} catch (error) {
			this.setState({ error });
		}
	};

	componentDidMount() {
		this.fetchData(Endpoints.user(this.props.match.params.id));
	}

	render() {
		const { data, error, redirect, isLoading } = this.state;

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
						<div data-g="12 md:9" aria-busy={isLoading}>
							{isLoading ? (
								<p>Loading...</p>
							) : (
								<Panel>
									<Tag>{!data.blocked ? "Active" : "Locked"}</Tag>
									<p>
										User: {data.first_name} {data.last_name}
									</p>

									<UnlockUser
										id={data.id}
										isBlocked={data.blocked}
										onToggleLock={this.updateData}
										onError={this.handleError}
									/>

									<DeleteUser id={data.id} onDeleteUser={this.updateData} />
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
