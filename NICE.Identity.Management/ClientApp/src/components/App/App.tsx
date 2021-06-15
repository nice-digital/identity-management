import React from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Header, Footer, IdamProviderProps } from "@nice-digital/global-nav";

import { UsersList } from "../../views/UsersList/UsersList";
import { User } from "./../../views/User/User";
import { DeleteUser } from "./../../views/DeleteUser/DeleteUser";
import { ExistingRoles } from "./../../views/ExistingRoles/ExistingRoles";
import { SelectService } from "./../../views/SelectService/SelectService";
import { SelectEnvironment } from "./../../views/SelectEnvironment/SelectEnvironment";
import { SelectRoles } from "./../../views/SelectRoles/SelectRoles";

export class App extends React.Component {
	render() {
		const auth: IdamProviderProps = {
			links: [{ text: "Sign out", url: "/Account/Logout" }],
			displayName: "John",
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
					<Route path="/users/:id/roles" exact component={ExistingRoles} />
					<Route path="/users/:id/services" exact component={SelectService} />
					<Route
						path="/users/:id/services/:serviceId/environments"
						exact
						component={SelectEnvironment}
					/>
					<Route
						path="/users/:id/services/:serviceId/environments/:websiteId/roles"
						exact
						component={SelectRoles}
					/>
				</div>

				<Footer />
			</Router>
		);
	}
}
