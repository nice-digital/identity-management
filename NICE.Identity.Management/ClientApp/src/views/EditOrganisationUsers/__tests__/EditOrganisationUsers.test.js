import React from "react";
import { act } from "react-dom/test-utils";
import { render, waitForElementToBeRemoved, screen, waitFor, within } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { EditOrganisationUsers } from "../EditOrganisationUsers";
import { Endpoints } from "src/data/endpoints";
import orgUsers from "./orgUsers.json";
import users from "./users.json";
import usersMore from "./usersMore.json";

const consoleErrorReset = console.error;

beforeEach(() => {
	console.error = consoleErrorReset;
});

const server = setupServer(
  rest.get(Endpoints.usersAndJobIdsByOrganisation("1"), (req, res, ctx) => {
    return res(ctx.json(orgUsers));
  }),
  rest.get(Endpoints.usersList, (req, res, ctx) => {
    return res(ctx.json(users));
  }),
  rest.delete(Endpoints.job("1082"), (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.post(Endpoints.jobs, (req, res, ctx) => {
    return res(ctx.json({}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should show loading message before data has been loaded", () => {
  const match = {
    params: { id: 1 },
    isExact: true,
    path: "",
    url: "",
  };
	render(<EditOrganisationUsers match={match} />, {wrapper: MemoryRouter});
	const loadingMessage = screen.getByText("Loading...", { selector: "p" });
	expect(loadingMessage).toBeInTheDocument();
});

test("should match the snapshot after data has been loaded", async () => {
  const match = {
    params: { id: 1 },
    isExact: true,
    path: "",
    url: "",
  };
	const {container} = render(<EditOrganisationUsers match={match} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
	expect(container).toMatchSnapshot();
});

test("should show error message when fetchData function returns 401 error", async () => {
	console.error = jest.fn();	
	const match = {
    params: { id: 1 },
    isExact: true,
    path: "",
    url: "",
  };
	server.use(
		rest.get(Endpoints.usersAndJobIdsByOrganisation("1"), (req, res, ctx) => {
			return res.once(
				ctx.status(401),
				ctx.json({})
			);
		})
	);
	const {container} = render(<EditOrganisationUsers match={match} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();
});

test("should show error message when fetchData function returns 500 error", async () => {
	console.error = jest.fn();	
	const match = {
    params: { id: 1 },
    isExact: true,
    path: "",
    url: "",
  };
	server.use(
		rest.get(Endpoints.usersAndJobIdsByOrganisation("1"), (req, res, ctx) => {
			return res.once(
				ctx.status(500),
				ctx.json({})
			);
		})
	);
	const {container} = render(<EditOrganisationUsers match={match} />, {wrapper: MemoryRouter});
	await waitFor(() => screen.getByRole("heading", { name: "Error"}));
	expect(container).toMatchSnapshot();	
});

test("should show no users found message when an organisation has no users assigned", async () => {
  const match = {
    params: { id: 1 },
    isExact: true,
    path: "",
    url: "",
  };
  const orgUsersEmpty = {
    organisationId: 1,
    organisation: { "id": 1, "name": "NICE", "dateAdded": null },
    usersAndJobIds: [],
  };
	server.use(
		rest.get(Endpoints.usersAndJobIdsByOrganisation("1"), (req, res, ctx) => {
			return res.once(
				ctx.json(orgUsersEmpty)
			);
		})
	);
	render(<EditOrganisationUsers match={match} />, {wrapper: MemoryRouter});
	const noUsersFoundMessage = await screen.findByText("No users found for this organisation.");
  expect(noUsersFoundMessage).toBeInTheDocument();
});

test("should add user to table when suggestion is clicked and show confirmation message", async () => {
  jest.useFakeTimers();
  console.error = jest.fn();
  const match = {
    params: { id: 1 },
    isExact: true,
    path: "",
    url: "",
  }; 
  const orgUsersEmpty = {
    organisationId: 1,
    organisation: { "id": 1, "name": "NICE", "dateAdded": null },
    usersAndJobIds: [],
  };
  server.use(
		rest.get(Endpoints.usersAndJobIdsByOrganisation("1"), (req, res, ctx) => {
			return res.once(ctx.json(orgUsersEmpty));
		})
	);
  render(<MemoryRouter><EditOrganisationUsers match={match} /></MemoryRouter>);
  await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
  const filterSearchInput = screen.getByRole("searchbox");
  filterSearchInput.focus();
  await act(async () => {
		userEvent.paste("kri")
		jest.advanceTimersByTime(1000);	
  });
  let suggestion = await screen.findByText("Kristin Patrick", { selector: "a" });
  expect(suggestion).toBeInTheDocument();
  userEvent.click(suggestion);
  const userAdded = await screen.findByText("Kristin Patrick", { selector: "td" });
  expect(userAdded).toBeInTheDocument();
  expect(screen.getByText("User has been successfully added.", { selector: "p" })).toBeInTheDocument();
  jest.useFakeTimers();
});

test("should remove user from org and show confirmation message when selected from table", async () => {
  console.error = jest.fn();	
  const match = {
    params: { id: 1 },
    isExact: true,
    path: "",
    url: "",
  };  
	render(<EditOrganisationUsers match={match} />, {wrapper: MemoryRouter});
	await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
  const user = userEvent.setup();
	let removeUserLinks = screen.getAllByRole("link", { name: "Remove user" });
  const lastRemoveUserLink = removeUserLinks[removeUserLinks.length - 1];
  expect(removeUserLinks.length).toEqual(4);
  user.click(lastRemoveUserLink);
  const userRemovedMessage = await screen.findByText("User has been successfully removed.");
  removeUserLinks = screen.getAllByRole("link", { name: "Remove user" });
  expect(userRemovedMessage).toBeInTheDocument();
  expect(removeUserLinks.length).toEqual(3);
});

test("should show 3 suggestions when search term has been entered", async () => {
  jest.useFakeTimers();
  console.error = jest.fn();
  const match = {
    params: { id: 1 },
    isExact: true,
    path: "",
    url: "",
  };
  const orgUsersEmpty = {
    organisationId: 1,
    organisation: { "id": 1, "name": "NICE", "dateAdded": null },
    usersAndJobIds: [],
  };
	server.use(
		rest.get(Endpoints.usersAndJobIdsByOrganisation("1"), (req, res, ctx) => {
			return res.once(ctx.json(orgUsersEmpty));
		}),
    rest.get(Endpoints.usersList, (req, res, ctx) => {
			return res.once(ctx.json(usersMore));
		}),
	);
  render(<MemoryRouter><EditOrganisationUsers match={match} /></MemoryRouter>);
  await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
  const filterSearchInput = screen.getByRole("searchbox");
  filterSearchInput.focus();
  await act(async () => {
		userEvent.paste("kri")
		jest.advanceTimersByTime(1000);	
  });
  await waitFor(() => screen.getByText("Kristin Patrick"));
  const suggestionsList= await screen.findByRole("list", { name: "suggestions-add-organisation-user"});
	const { queryAllByRole } = within(suggestionsList);
	const suggestionsListItems = queryAllByRole("listitem");
  expect(suggestionsListItems.length).toEqual(3);
  jest.useFakeTimers();
});

test("should hide suggestions when clicked off", async () => {
  jest.useFakeTimers();
  console.error = jest.fn();
  const match = {
    params: { id: 1 },
    isExact: true,
    path: "",
    url: "",
  };  
  render(<MemoryRouter><EditOrganisationUsers match={match} /></MemoryRouter>);
  await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
  const filterSearchInput = screen.getByRole("searchbox");
  filterSearchInput.focus();
  await act(async () => {
		userEvent.paste("kri")
		jest.advanceTimersByTime(1000);	
  });
  let suggestion = await screen.findAllByText("Kristin Patrick");
  expect(suggestion.length).toEqual(1);
  userEvent.tab();
  suggestion = screen.queryAllByText("Kristin Patrick");
  expect(suggestion.length).toEqual(0);
  jest.useFakeTimers();
});

test("should hide existing confirmation/alert when suggestions search has been initiated again", async () => {
  jest.useFakeTimers();
  console.error = jest.fn();
  const match = {
    params: { id: 1 },
    isExact: true,
    path: "",
    url: "",
  }; 
  const orgUsersEmpty = {
    organisationId: 1,
    organisation: { "id": 1, "name": "NICE", "dateAdded": null },
    usersAndJobIds: [],
  };
  server.use(
		rest.get(Endpoints.usersAndJobIdsByOrganisation("1"), (req, res, ctx) => {
			return res.once(ctx.json(orgUsersEmpty));
		})
	);
  render(<MemoryRouter><EditOrganisationUsers match={match} /></MemoryRouter>);
  await waitForElementToBeRemoved(() => screen.getByText("Loading...", { selector: "p" }));
  const filterSearchInput = screen.getByRole("searchbox");
  filterSearchInput.focus();
  await act(async () => {
		userEvent.paste("kri")
		jest.advanceTimersByTime(1000);	
  });
  let suggestion = await screen.findByText("Kristin Patrick", { selector: "a" });
  expect(suggestion).toBeInTheDocument();
  userEvent.click(suggestion);
  const userAddedMessage = await screen.findByText("User has been successfully added.", { selector: "p" });
  expect(userAddedMessage).toBeInTheDocument();
  filterSearchInput.focus();
  await act(async () => {
		userEvent.paste("a")
		jest.advanceTimersByTime(1000);	
  });
  expect(userAddedMessage).not.toBeInTheDocument();
  jest.useFakeTimers();
});