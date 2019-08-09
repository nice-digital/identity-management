import React from "react";
import styles from "./App.module.scss";
import List from "./../../views/List/List";
import User from "./../../views/User/User";
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
						</ul>
					</nav>

					<Route path="/" exact component={List} />
					<Route path="/user/:id" exact component={User} />
				</div>
			</Router>
		);
	}
}

export default App;
