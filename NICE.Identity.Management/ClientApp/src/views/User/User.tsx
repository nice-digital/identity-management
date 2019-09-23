import React, { Component } from "react";

import { RouteComponentProps, Link } from "react-router-dom";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Panel } from "@nice-digital/nds-panel";
import { Tag } from "@nice-digital/nds-tag";

import { UserType } from "../../models/types";
import { Endpoints } from "../../data/endpoints";
import { UnlockUser } from "../../components/UnlockUser/UnlockUser";

type TParams = { id: string };

type UserProps = {} & RouteComponentProps<TParams>;

type UserState = {
	data: UserType;
	error: string;
	isLoading: boolean;
};

export class User extends Component<UserProps, UserState> {
	constructor(props: UserProps) {
		super(props);

		this.state = {
			data: {} as UserType,
			error: "",
			isLoading: true,
		};
	}

	handleError = (error: Error) => {
		this.setState({ error: error.message });
	};

	updateData = (updatedData: UserType) => {
		this.setState({ data: updatedData });
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
		const { data, error, isLoading } = this.state;

		return (
			<>
				<Breadcrumbs>
					<Breadcrumb to="/" elementType={Link}>
						Home
					</Breadcrumb>
					<Breadcrumb to="/users" elementType={Link}>
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
