/**
 *  Returns a new promise that resolves after a 0ms setTimeout, effectively clearing the call stack
 */
export const nextTick = async () => {
	return new Promise(resolve => {
		setTimeout(resolve, 0);
	});
};