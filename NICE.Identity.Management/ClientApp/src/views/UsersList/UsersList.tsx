import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/hooks";
import { Filter } from "../../components/Filter/Filter";

export const UsersList: FunctionComponent = () => {
	const [data, isLoading] = useFetch(
		"https://www.json-generator.com/api/json/get/cfQXOXbwgO?indent=2",
	);

	return (
		<div className="grid">
			<div data-g="3">
				<Filter />
			</div>
			<div data-g="9">
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{data.map(({ _id, name, email }) => (
								<tr key={_id}>
									<td>
										<Link to={`/users/${_id}`}>{name}</Link>
									</td>
									<td>{email}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};
