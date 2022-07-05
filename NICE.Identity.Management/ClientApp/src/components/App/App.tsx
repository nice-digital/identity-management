import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Header, Footer, IdamProviderProps } from "@nice-digital/global-nav";
import { Container } from "@nice-digital/nds-container";
import { Overview } from "src/views/Overview/Overview";
import { UsersList } from "src/views/UsersList/UsersList";
import { User } from "src/views/User/User";
import { ServicesList } from "src/views/ServicesList/ServicesList";
import { OrganisationsList } from "src/views/OrganisationsList/OrganisationsList";
import { Organisation } from "src/views/Organisation/Organisation";
import { AddOrganisation } from "src/views/AddOrganisation/AddOrganisation";
import { EditOrganisation } from "src/views/EditOrganisation/EditOrganisation";
import { EditOrganisationUsers } from "src/views/EditOrganisationUsers/EditOrganisationUsers";
import { DeleteUser } from "src/views/DeleteUser/DeleteUser";
import { SelectService } from "src/views/SelectService/SelectService";
import { SelectEnvironment } from "src/views/SelectEnvironment/SelectEnvironment";
import { SelectRoles } from "src/views/SelectRoles/SelectRoles";
import { EditUser } from "src/views/EditUser/EditUser";
import { DeleteOrganisation } from "src/views/DeleteOrganisation/DeleteOrganisation";
import { Website } from "src/views/Website/Website";

import { Endpoints } from "src/data/endpoints";
import { fetchData } from "src/helpers/fetchData";
import { isDataError } from "src/helpers/isDataError";

type AppState = {
	isLoading: boolean;
	auth: IdamProviderProps;
	error?: Error;
};

export type MyAccountDetails = {
	displayName: string;
	links: [];
};

export class App extends React.Component<Record<string, never>, AppState> {
	constructor(props = {}) {
		super(props);

		this.state = {
			isLoading: false,
			auth: {} as IdamProviderProps,
		};
	}

	async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const myAccountDetails = await fetchData(Endpoints.identityManagementUser);

		if (isDataError(myAccountDetails)) {
			this.setState({ error: myAccountDetails });
		}

		const auth: IdamProviderProps = {
			links: [
				{ text: "Health checks", url: "/healthchecks-ui" },
				{ text: "Sign out", url: "/Account/Logout" },
			],
			displayName: myAccountDetails.displayName,
			provider: "idam",
		};

		this.setState({
			isLoading: false,
			auth,
		});
	}

	render(): JSX.Element {
		return (
			<Router>
				{this.state.isLoading ? (
					<p>Loading...</p>
				) : (
					<Header search={false} auth={this.state.auth} />
				)}
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
					<Route
						path="/organisations/:id(\d+)"
						exact
						component={Organisation}
					/>
					<Route
						path="/organisations/:id/delete"
						exact
						component={DeleteOrganisation}
					/>
					<Route
						path="/organisations/:id/edit"
						exact
						component={EditOrganisation}
					/>
					<Route
						path="/organisations/:id/users"
						exact
						component={EditOrganisationUsers}
					/>
					<Route path="/websites/:id" exact component={Website} />
				</Container>

				<Footer />
			</Router>
		);
	}
}
