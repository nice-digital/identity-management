import React from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Header, Footer, IdamProviderProps, Link } from "@nice-digital/global-nav";
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
import { DeleteOrganisation } from "./../../views/DeleteOrganisation/DeleteOrganisation";

import { Endpoints } from "../../data/endpoints";
import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";

export type MyAccountDetails = {
	displayName: string,
	links: []
};

export class App extends React.Component {
	state = {
		isLoading: false,
		auth: {} as IdamProviderProps
	}
	async componentDidMount(): Promise<void> {
               this.setState({ isLoading: true });
               
		const fetchOptions = {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		};
		const myAccountDetails = await fetchData(
			Endpoints.identityManagementUser,
			fetchOptions,
		) as MyAccountDetails;
		
		if (isDataError(myAccountDetails)) {
			this.setState({ error: myAccountDetails });
		}
		const auth: IdamProviderProps = {
			links: [
				{ text: myAccountDetails.displayName, url: "#" },
				{ text: "Health checks", url: "/healthchecks-ui" },
				{ text: "Sign out", url: "/Account/Logout" },
			],
			displayName:  myAccountDetails.displayName,
			provider: "idam",
		};



		this.setState({
			isLoading: false
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
						path={"/organisations/:id"}
						render={(props) => {
							// to stop rendering of component for 'add' route
							const idRegExp = new RegExp(/[0-9]+$/g);
							const endOfRoute = props.location.pathname.split("/").pop() ?? "";
							return idRegExp.test(endOfRoute) && <Organisation {...props} />;
						}}
					/>
					<Route
						path="/organisations/:id/delete"
						exact
						component={DeleteOrganisation}
					/>
				</Container>

				<Footer />
			</Router>
		);
	}
}
