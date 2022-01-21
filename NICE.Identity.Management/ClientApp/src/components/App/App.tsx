import React from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Header, Footer, IdamProviderProps } from "@nice-digital/global-nav";
import { Container } from "@nice-digital/nds-container";

import { Overview } from "../../views/Overview/Overview";
import { UsersList } from "../../views/UsersList/UsersList";
import { User } from "./../../views/User/User";
import { ServicesList } from "../../views/ServicesList/ServicesList";
import { OrganisationsList } from "../../views/OrganisationsList/OrganisationsList";
import { Organisation } from "../../views/Organisation/Organisation";
import { AddOrganisation } from "../../views/AddOrganisation/AddOrganisation";
import { DeleteUser } from "./../../views/DeleteUser/DeleteUser";
import { SelectService } from "./../../views/SelectService/SelectService";
import { SelectEnvironment } from "./../../views/SelectEnvironment/SelectEnvironment";
import { SelectRoles } from "./../../views/SelectRoles/SelectRoles";
import { EditUser } from "./../../views/EditUser/EditUser";

export class App extends React.Component {
	render(): JSX.Element {
		const auth: IdamProviderProps = {
			links: [
				{ text: "Health checks", url: "/healthchecks-ui" },
				{ text: "Sign out", url: "/Account/Logout" },
			],
			displayName: "John",
			provider: "idam",
		};

		return (
			<Router>
				<Header search={false} auth={auth} />

				<Container
					elementType="main"
					role="main"
					id="content-start"
					aria-label="Start of content"
					aria-live="polite"
				>
					<Route path="/" exact render={() => <Redirect to="/overview" />} />
					<Route path="/overview" exact component={Overview} />
					<Route path="/users" exact component={UsersList} />
					<Route path="/users/:id" exact component={User} />
					<Route path="/users/:id/delete" exact component={DeleteUser} />
					<Route path="/users/:id/services" exact component={SelectService} />
					<Route path="/users/:id/edit" exact component={EditUser} />
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
					<Route path="/services" exact component={ServicesList} />
					<Route path="/organisations" exact component={OrganisationsList} />
					<Route path="/organisations/add" exact component={AddOrganisation} />
					{/* <Route
						path={"/organisations/:id"}
						render={({ location }) => {
							// to stop rendering of component for 'add' route
							const idRegExp = new RegExp(/[0-9]+$/g);
							const endOfRoute = location.pathname.split("/").pop() ?? "";
							return idRegExp.test(endOfRoute) && <Organisation />;
						}}
					/> */}
				</Container>

				<Footer />
			</Router>
		);
	}
}
