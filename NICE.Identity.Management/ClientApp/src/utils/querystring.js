import queryString from "query-string";

export function queryStringToObject(qryString) {
	return queryString.parse(qryString);
}

export const removeQueryParameter = (url, parameter, value = null) => {
	const urlParts = url.split("?");

	if (urlParts.length < 2) return url;

	let urlParams = urlParts[1].split(/[&;]/g);

	for (let i = urlParams.length; i-- > 0; ) {
		const parParts = urlParams[i].split("=");

		if (
			parParts[0].toLowerCase() === parameter.toLowerCase() &&
			(!value ||
				(value && value.toLowerCase() === (parParts[1] || "").toLowerCase()))
		) {
			urlParams.splice(i, 1);
		}
	}

	const queryString = urlParams.length > 0 ? "?" + urlParams.join("&") : "";
	return urlParts[0] + queryString;
};

export const stripMultipleQueries = (path, queries) => {
	let strippedPath = path;

	queries.forEach((query) => {
		strippedPath = removeQueryParameter(strippedPath, query);
	});

	return strippedPath;
};

export const appendQueryParameter = (url, parameter, value) =>
	`${url}${url.indexOf("?") === -1 ? "?" : "&"}${parameter}=${value}`;
