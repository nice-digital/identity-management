export const isDataError = (data: Record<string, unknown> | Error): boolean => {
	if (data instanceof Error || Object.prototype.hasOwnProperty.call(data, "error")) {
		return true;
	}

	return false;
};
