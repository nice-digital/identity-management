import React from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Header, Footer } from "@nice-digital/global-nav";

import { UsersList } from "../../views/UsersList/UsersList";
import { User } from "./../../views/User/User";
import { UserRoles } from "./../../views/UserRoles/UserRoles";
import { DeleteUser } from "./../../views/DeleteUser/DeleteUser";

type LinkType = {
	key: String;
	value: String;
};

type AuthType = {
	links: Array<LinkType>;
	displayName: String;
	provider?: String;
};

export class App extends React.Component {
	render() {
		const links: Array<LinkType> = [
			{ key: "Sign out", value: "/Account/Logout" },
		];

		const auth: any = {
			links: [{ key: "Sign out", value: "/Account/Logout" }],
			displayName: "Alice",
			provider: "idam",
		};

		return (
			<Router>
				<Header search={false} auth={auth} />

				<div className="container">
					<Route path="/" exact render={() => <Redirect to="/users" />} />
					<Route path="/users" exact component={UsersList} />
					<Route path="/users/:id" exact component={User} />
					<Route path="/users/:id/delete" exact component={DeleteUser} />
					<Route path="/users/:id/roles" exact component={User} />
					<Route
						path="/users/:userId/roles/:roleId"
						exact
						component={UserRoles}
					/>
				</div>

				<Footer />
			</Router>
		);
	}
}
