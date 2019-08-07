import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import { Tag } from "@nice-digital/nds-tag";

const App: React.FC = () => {
	return (
		<div className={styles.App}>
			<header className={styles.AppHeader}>
				<img src={logo} className={styles.AppLogo} alt="logo" />
				<p>
					This is a <Tag alpha>tag</Tag> right here.
					<Tag outline flush>
						Things!
					</Tag>
				</p>
			</header>
		</div>
	);
};

export default App;
