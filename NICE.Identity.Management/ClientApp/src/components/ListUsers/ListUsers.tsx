import React from "react";
import { Link } from "react-router-dom";

class ListUsers extends React.Component {
	render() {
		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Service</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<Link to="/user/1">Bob Bobbington</Link>
						</td>
						<td>EPPI Reviewer</td>
					</tr>
					<tr>
						<td>
							<Link to="/user/2">David Davidson</Link>
						</td>
						<td>Pathways</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default ListUsers;
