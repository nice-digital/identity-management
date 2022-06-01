// import React from "react";
// import { mount, shallow } from "enzyme";
// import { MemoryRouter } from "react-router";
// import toJson from "enzyme-to-json";
// import { nextTick } from "../../../utils/nextTick";
// import { Alert } from "@nice-digital/nds-alert";
// import { AddOrganisation } from "../AddOrganisation";
// import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
// import organisations from "./organisations.json";

// describe("AddOrganisation", () => {
// 	const consoleErrorReset = console.error;

// 	beforeEach(() => {
// 		fetch.resetMocks();
// 		console.error = consoleErrorReset;
// 	});

//     it("should match the snapshot on load", () => {
// 		const wrapper = shallow(<AddOrganisation />);
// 		expect(toJson(wrapper, { noKey: true, mode: "deep" })).toMatchSnapshot();
// 	});

// 	it("should disable form submit button when clicked", async () => {
// 		console.error = jest.fn();
// 		fetch.mockResponseOnce(JSON.stringify({}));
// 		const wrapper = mount(
// 			<MemoryRouter>
// 				<AddOrganisation />
// 			</MemoryRouter>,
// 		);
// 		wrapper.find("#orgName").prop("onChange")({
// 			target: {
// 				name: "orgName",
// 				value: "Org Ninety Nine",
// 				validity: { valid: true }
// 			}
// 		});
// 		wrapper.find("form").simulate("submit");
// 		expect(wrapper.find("button").props().disabled).toEqual(true);
// 		expect(wrapper.find("button").text()).toEqual("Loading...");
// 	});

// 	it("should display confirmation message once fetchData post is successfully complete", async () => {
// 		console.error = jest.fn();
// 		fetch.mockResponseOnce(JSON.stringify([]));
// 		fetch.mockResponseOnce(JSON.stringify({}));
// 		const wrapper = mount(
// 			<MemoryRouter>
// 				<AddOrganisation />
// 			</MemoryRouter>,
// 		);
// 		wrapper.find("#orgName").prop("onChange")({
// 			target: {
// 				name: "orgName",
// 				value: "Org Ninety Nine",
// 				validity: { valid: true }
// 			}
// 		});
// 		wrapper.find("form").prop("onSubmit")({
// 			preventDefault: () => false, 
// 			currentTarget: { 
// 				checkValidity: () => true
// 			},
// 		});
// 		await nextTick();
// 		wrapper.update();
// 		expect(wrapper.find("p").text()).toEqual("New organisation has been added successfully.");
// 		expect(wrapper.find(Alert).exists()).toBe(true);
// 	});

//     it("should show error message when fetchData post fails", async () => {
// 		console.error = jest.fn();
// 		const error = new Error("Not allowed");
// 		fetch.mockResponseOnce(JSON.stringify([]));
// 		fetch.mockRejectOnce(error);
// 		const wrapper = mount(
// 			<MemoryRouter>
// 				<AddOrganisation />
// 			</MemoryRouter>,
// 		);
// 		wrapper.find("#orgName").prop("onChange")({
// 			target: {
// 				name: "orgName",
// 				value: "Org Ninety Nine",
// 				validity: { valid: true }
// 			}
// 		});
// 		wrapper.find("form").prop("onSubmit")({
// 			preventDefault: () => false, 
// 			currentTarget: { 
// 				checkValidity: () => true
// 			},
// 		});
// 		await nextTick();
// 		wrapper.update();
// 		expect(wrapper.find(ErrorMessage).exists()).toBe(true);
// 	});

// 	it("should show validation error when name is invalid format", async () => {
// 		console.error = jest.fn();
// 		fetch.mockResponseOnce(JSON.stringify([]));
// 		const wrapper = mount(
// 			<MemoryRouter>
// 				<AddOrganisation />
// 			</MemoryRouter>,
// 		);
		
// 		wrapper.find("#orgName").prop("onChange")({
// 			target: {
// 				name: "orgName",
// 				value: "a",
// 				validity: { valid: false }
// 			}
// 		});
// 		wrapper.find("#orgName").prop("onBlur")({
// 			target: {
// 				name: "orgName",
// 				value: "a",
// 				validity: { valid: false }
// 			}
// 		});
// 		await nextTick();
// 		wrapper.update();
// 		expect(wrapper.find({ label: "Organisation name" }).prop("error")).toEqual(true);
// 	});

// 	it("should show validation error when org name is in use already", async () => {
// 		console.error = jest.fn();
// 		fetch.mockResponseOnce(JSON.stringify(organisations));
// 		const wrapper = mount(
// 			<MemoryRouter>
// 				<AddOrganisation />
// 			</MemoryRouter>,
// 		);
// 		wrapper.find("#orgName").prop("onChange")({
// 			target: {
// 				name: "orgName",
// 				value: "Org 1",
// 				validity: { valid: true }
// 			}
// 		});
// 		wrapper.find("#orgName").prop("onBlur")({
// 			target: {
// 				name: "orgName",
// 				value: "Org 1",
// 				validity: { valid: true }
// 			}
// 		});
// 		await nextTick();
// 		wrapper.update();
// 		expect(wrapper.find({ label: "Organisation name" }).prop("error")).toEqual(true);
// 		expect(wrapper.find({ label: "Organisation name" }).prop("errorMessage")).toBe("Cannot add Org 1, that organisation already exists!");
// 	});

// });

import React from "react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { AddOrganisation } from "../AddOrganisation";
import { Endpoints } from "../../../data/endpoints";
import organisations from "./organisations.json";
import { act } from 'react-dom/test-utils';
//import singleUser from "./singleUser.json";

const consoleErrorReset = console.error;

beforeEach(() => {
	console.error = consoleErrorReset;
});

const server = setupServer(
  rest.get(Endpoints.organisationsList, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.post(Endpoints.organisationsList, (req, res, ctx) => {
    return res(ctx.json({}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should match the snapshot on load", () => {
  const {container} = render(<AddOrganisation />, {wrapper: MemoryRouter});
	expect(container).toMatchSnapshot();
});

test("should disable form submit button when clicked", async () => {
  render(<AddOrganisation />, {wrapper: MemoryRouter});
  const orgNameInput = screen.getByLabelText("Organisation name");
  fireEvent.change(orgNameInput, {target: {value: "Org Ninety Nine"}});
  fireEvent.submit(orgNameInput);
  const submitButton = screen.getByText("Loading...");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});

it("should display confirmation message once fetchData post is successfully complete", async () => {
  render(<AddOrganisation />, {wrapper: MemoryRouter});
  const orgNameInput = screen.getByLabelText("Organisation name");
  fireEvent.change(orgNameInput, {target: {value: "Org Ninety Nine"}});
  fireEvent.submit(orgNameInput);
  const orgAddedMessage = await screen.findByText("New organisation has been added successfully.");
  expect(orgAddedMessage).toBeInTheDocument();
  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("should show error message when fetchData post fails", async () => {
  console.error = jest.fn();	
  server.use(
		rest.post(Endpoints.organisationsList, (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
  render(<AddOrganisation />, {wrapper: MemoryRouter});
  const orgNameInput = screen.getByLabelText("Organisation name");
  fireEvent.change(orgNameInput, {target: {value: "Org Ninety Nine"}});
  fireEvent.submit(orgNameInput);
  const errorAlert = await screen.findByRole("alert");
  expect(errorAlert).toBeInTheDocument();
});

test("should show validation error when name is invalid format", async () => {
  render(<AddOrganisation />, {wrapper: MemoryRouter});
  const orgNameInput = screen.getByLabelText("Organisation name");
  const user = userEvent.setup();
  orgNameInput.focus();
	user.type(orgNameInput, 'a');
  user.tab();
  const orgNotFoundMessage = await screen.findByText("Organisation name should be alphanumeric and be between 2-100 characters");
  expect(screen.getByText("Save organisation")).toHaveFocus();
  expect(orgNotFoundMessage).toBeInTheDocument();
  expect(orgNameInput).toBeInvalid();
});

test.only("should show validation error when org name is in use already", async () => {
  jest.useFakeTimers();
  server.use(
    rest.get(Endpoints.organisationsList, (req, res, ctx) => {
      return res.once(ctx.json(organisations));
    })
  );
  const user = userEvent.setup();
  render(<AddOrganisation />, {wrapper: MemoryRouter});
  const orgNameInput = screen.getByLabelText("Organisation name");
  orgNameInput.focus();
  await act(async () => {
    //user.type(orgNameInput, 'Org 1');
    fireEvent.change(orgNameInput, {target: {value: "Org 1"}});
    jest.runOnlyPendingTimers();
  });   
  user.tab();
  // await waitFor(()=> {
  //   user.type(orgNameInput, "Org 1");
  // });
  const orgInUseMessage = await screen.findByText("Cannot add Org 1, that organisation already exists!");
  screen.debug();
  expect(orgInUseMessage).toBeInTheDocument();
  //await waitFor(() => screen.getByText("Cannot add Org 1, that organisation already exists!"), {timeout: 2000});
  //screen.debug();
  //expect(screen.getByText("Cannot add Org 1, that organisation already exists!")).toBeInTheDocument();
  jest.useRealTimers();
  // something
});

