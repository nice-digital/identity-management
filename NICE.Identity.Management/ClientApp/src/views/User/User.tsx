import React from "react";

type PropsType = {
	match: any;
};

class User extends React.Component<PropsType> {
	render() {
		return (
			<div>
				<p>User: {this.props.match.params.id}</p>
			</div>
		);
	}
}

export default User;
