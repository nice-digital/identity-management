export const isDataError = (data: Record<string, unknown> | Error): boolean => {
	if (data instanceof Error) {
		return true;
	}

	return false;
};
