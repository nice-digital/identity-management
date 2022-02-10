import React from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import { OrganisationType } from "../../models/types";
import { Card } from "@nice-digital/nds-card";

type CardMetaData = {
	label?: string;
	value: string;
};

type ResultsOrganisationProps = {
	item: OrganisationType;
};

export const ResultOrganisation = ({
	item,
}: ResultsOrganisationProps): React.ReactElement => {
	const { id, name, dateAdded } = item;
	const organisationsListHeading = {
		headingText: `${name}`,
		link: {
			elementType: Link,
			destination: `/organisations/${id}`,
		},
	};

	const organisationsListMetadata: Array<CardMetaData> = [
		{
			label: "Date created",
			value: Moment(dateAdded).format("D MMMM YYYY HH:mm"),
		},
	];

	return (
		<Card {...organisationsListHeading} metadata={organisationsListMetadata} />
	);
};
