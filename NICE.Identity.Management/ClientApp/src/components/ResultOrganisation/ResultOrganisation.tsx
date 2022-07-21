import React, { FC } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import { Card } from "@nice-digital/nds-card";
import { type OrganisationType } from "src/models/types";

type CardMetaData = {
	label?: string;
	value: string;
};

type ResultsOrganisationProps = {
	item: OrganisationType;
};

export const ResultOrganisation: FC<ResultsOrganisationProps> = ({ item }) => {
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
