import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Grid, GridItem } from "@nice-digital/nds-grid";
import { Button } from "@nice-digital/nds-button";
import { Hero } from "@nice-digital/nds-hero";
import { Panel } from "@nice-digital/nds-panel";

export const Overview = (): React.ReactElement => {
	const [error] = useState(false);

	return (
		<>
			<Hero
				title="Administration"
				intro="Manage NICE digital services, users and organisations."
			/>

			{!error ? (
				<Grid equalHeight>
					<GridItem cols={12} md={4} className="mb--d">
						<Panel>
							<h2>User admin</h2>
							<p>Find and manage user accounts; includes editing permissions and updating user profiles.</p>
							<Button variant="inverse" to="/users" elementType={Link} data-qa-sel="manage-users">
								Manage users
							</Button>
						</Panel>
					</GridItem>

					<GridItem cols={12} md={4} className="mb--d">
						<Panel>
							<h2>Services admin</h2>
							<p>Find and manage services and their roles; includes searches for users assigned to roles.</p>
							<Button variant="inverse" to="/services">
								Manage services
							</Button>
						</Panel>
					</GridItem>

					{/* To be added once the organisation page is added in IDAM-433 */}
					{/* <GridItem cols={12} md={4} className="mb--d">
						<Panel>
							<h2>Organisation admin</h2>
							<p>Find and manage organisations; includes viewing and managing user accounts associated to an organisation.</p>
							<Button variant="inverse" to="/">
								Manage organisations
							</Button>
						</Panel>
					</GridItem> */}

				</Grid>
			) : (
				<p>Error</p>
			)}
		</>
	);
};
