# Identity Management Admin Interface

## Development

### Mock API

The mock api can be run from the [NICE.Identity.Management.MockApi](/NICE.Identity.Management.MockApi/) directory using `npm start` and will run on http://localhost:3001 by default.

In order for the app to consume this data you will need to add an `.env` file into this directory and declare the following environment variable for the API_BASE_URL:

    REACT_APP_API_BASE_URL=http://localhost:3001

See the Create React App documentation for [more information on custom environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables).
