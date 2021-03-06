import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

// https://twitter.com/kentcdodds/status/1163644392789250048?s=19
beforeEach(() => {
	jest.spyOn(window, "fetch").mockImplementation((...args) => {
		console.warn("window.fetch is not mocked for this call", ...args);
		throw new Error("This must be mocked!");
	});
});
afterEach(() => {
	window.fetch.mockRestore();
});
