import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import { Tag } from "@nice-digital/nds-tag";

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	lookupNameById(id, event) {
		event.preventDefault();
		if (id === 121) return "Malcolm";
		if (id === 232) return "jess";
		return "user not found";
	}

	render() {
		if (!this.props.loggedIn) return <h1>you need to log in!</h1>;
		if (this.props.loggedIn) {
			return (
				<div className={styles.App}>
					<button onClick={event => this.lookupNameById(121, event)} />
					<header>
						<img src={logo} alt="logo" />
						<h1>Hello</h1>
						<h2>There</h2>
						{this.props.monkey === "gerald" && (
							<p>this monkey is called gerald</p>
						)}
						<p>
							This is a <Tag alpha>tag</Tag> right here.
							<Tag outline flush>
								Things!
							</Tag>
							<span>
								<Tag flush>Hello!</Tag>
							</span>
						</p>
					</header>
				</div>
			);
		}
	}
}

export default App;
