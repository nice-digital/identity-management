export const isDataError = (data: {} | Error) => {
	if (data instanceof Error) {
		return true;
	}

	return false;
};
