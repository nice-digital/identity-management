import React from "react";
import styles from "./App.module.scss";
import { UsersList } from "../../views/UsersList/UsersList";
import { User } from "./../../views/User/User";
import { UserRoles } from "./../../views/UserRoles/UserRoles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className={styles.App}>
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/users">Users</Link>
							</li>
						</ul>
					</nav>

					<Route path="/users" exact component={UsersList} />
					<Route path="/users/:id" exact component={User} />
					<Route path="/users/:id/roles" exact component={User} />
					<Route
						path="/users/:userId/roles/:roleId"
						exact
						component={UserRoles}
					/>
				</div>
			</Router>
		);
	}
}

export default App;