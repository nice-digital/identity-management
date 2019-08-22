import React from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Header, Footer } from "@nice-digital/global-nav";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";

import { UsersList } from "../../views/UsersList/UsersList";
import { User } from "./../../views/User/User";
import { UserRoles } from "./../../views/UserRoles/UserRoles";

export class App extends React.Component {
	render() {
		return (
			<Router>
				<Header search={false} />

				<div className="container">
					<Route
						path="/"
						exact
						render={() => (
							<>
								<Breadcrumbs>
									<Breadcrumb>Home</Breadcrumb>
								</Breadcrumbs>
								<div className="page-header">
									<h1 className="page-header__heading">Identity admin</h1>
									<p className="page-header__lead">
										Admin site for managing users, services and roles for Auth0
										identity
									</p>
								</div>

								<nav>
									<ul className="list list--piped">
										<li>
											<Link to="/users">Users</Link>
										</li>
									</ul>
								</nav>
							</>
						)}
					/>
					<Route path="/users" exact component={UsersList} />
					<Route path="/users/:id" exact component={User} />
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
