import React from "react";
import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { AddOrganisation } from "../AddOrganisation";
import { Endpoints } from "src/data/endpoints";
import organisations from "./organisations.json";

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
  jest.useFakeTimers();
  render(<AddOrganisation />, {wrapper: MemoryRouter});
  const orgNameInput = screen.getByLabelText("Organisation name");
  let submitButton = screen.getByText("Save organisation");
  await act(async () => {
    fireEvent.change(orgNameInput, {target: {value: "Org Ninety Nine"}});
    jest.advanceTimersByTime(1000);
  });
  userEvent.click(submitButton);
  submitButton = await screen.findByText("Loading...");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
  jest.useRealTimers();
});

test("should display confirmation message once fetchData post is successfully complete", async () => {
  jest.useFakeTimers();
  render(<AddOrganisation />, {wrapper: MemoryRouter});
  const orgNameInput = screen.getByLabelText("Organisation name");
  const submitButton = screen.getByText("Save organisation");
  await act(async () => {
    fireEvent.change(orgNameInput, {target: {value: "Org Ninety Nine"}});
  });
  userEvent.click(submitButton);
  const orgAddedMessage = await screen.findByText("New organisation has been added successfully.");
  expect(orgAddedMessage).toBeInTheDocument();
  expect(screen.getByRole("status")).toBeInTheDocument();
  jest.useRealTimers();
});

test("should show error message when fetchData post fails", async () => {
  jest.useFakeTimers();
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
  const submitButton = screen.getByText("Save organisation");
  await act(async () => {
    fireEvent.change(orgNameInput, {target: {value: "Org Ninety Nine"}});
  });
  userEvent.click(submitButton);
  const errorAlert = await screen.findByRole("alert");
  expect(errorAlert).toBeInTheDocument();
  jest.useRealTimers();
});

test("should show validation error when name is invalid format", async () => {
  jest.useFakeTimers();
  render(<MemoryRouter><AddOrganisation /></MemoryRouter>);
  const orgNameInput = screen.getByLabelText("Organisation name");
  const user = userEvent.setup();
  orgNameInput.focus();
  await act(async () => {
    user.type(orgNameInput, 'a');
  });
  user.tab();
  const orgNotFoundMessage = await screen.findByText("Organisation name should be alphanumeric and be between 2-100 characters");
  expect(screen.getByText("Save organisation")).toHaveFocus();
  expect(orgNotFoundMessage).toBeInTheDocument();
  expect(orgNameInput).toBeInvalid();
  jest.useRealTimers();
});

test("should show validation error when org name is in use already", async () => {
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
    //user.paste("Org 1");
    fireEvent.change(orgNameInput, {target: {value: "Org 1"}});
    jest.advanceTimersByTime(1000);
  });   
  user.tab();
  const orgInUseMessage = await screen.findByText("Cannot add Org 1, that organisation already exists!");
  expect(orgInUseMessage).toBeInTheDocument();
  jest.useRealTimers();
});

