import React, { Component } from "react";

import { RouteComponentProps} from "react-router-dom";
import { StaticContext } from "react-router";

import { fetchData } from "../../helpers/fetchData";
import { isDataError } from "../../helpers/isDataError";
import { WebsiteType } from "../../models/types";
import { Endpoints } from "../../data/endpoints";

type TParams = { id: string };

type LocationState = {
	hasBeenEdited: boolean;
};

type WebsiteProps = Record<string, unknown> &
	RouteComponentProps<TParams, StaticContext, LocationState>;

type WebsiteState = {
	website: WebsiteType;
	error?: Error;
	redirect: boolean;
	isLoading: boolean;
};

export class Website extends Component<WebsiteProps, WebsiteState> {
    constructor(props: WebsiteProps) {
		super(props);

		this.state = {
			website: {} as WebsiteType,
			redirect: false,
			isLoading: true,
		};
	}

    async componentDidMount(): Promise<void> {
		this.setState({ isLoading: true });

		const website = await fetchData(Endpoints.website(this.props.match.params.id));

		if (isDataError(website)) {
			this.setState({ error: website });
		}

		this.setState({ website, isLoading: false });
		document.title = `NICE Accounts - ${website.host}`;
	}

    render(): JSX.Element {
		const { website } = this.state;
        return(
            <div>
                <p>{`${this.props.match.params.id} - ${website.host}`}</p>
            </div>
        );
    }
}