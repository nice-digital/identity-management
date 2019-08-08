import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import { Tag } from "@nice-digital/nds-tag";
import List from "./../List/List";

class App extends React.Component {
	render() {
		return (
			<div className={styles.App}>
				<header>
					<img src={logo} alt="logo" />
					<h1>Hello</h1>
					<h2>There</h2>

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
				<List />
			</div>
		);
	}
}

export default App;
