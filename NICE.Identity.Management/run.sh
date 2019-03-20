#!/bin/bash

# Replace values in appsettings.json from envirionent variables
# And run .NET webapp

set -e

jq \
    --arg defaultConnection "$DEFAULT_CONNECTION" \
    --arg auth0domain "$AUTH0_DOMAIN" \
    --arg auth0clientid "$AUTH0_CLIENTID" \
    --arg auth0clientsecret "$AUTH0_CLIENTSECRECT" \
    --arg auth0redirecturi "$AUTH0_REDIRECT_URI" \
    --arg auth0logoutredirecturi "$AUTH0_LOGOUT_REDIRECT_URI" \
    '
    .ConnectionStrings.DefaultConnection = $defaultConnection |
    .Auth0.Domain = $auth0domain |
    .Auth0.ClientId = $auth0clientid |
    .Auth0.ClientSecret = $auth0clientsecret |
    .Auth0.RedirectUri = $auth0redirecturi |
    .Auth0.PostLogoutRedirectUri = $auth0logoutredirecturi
    '\
    appsettings.json > _appsettings.json \
    && mv _appsettings.json appsettings.json

dotnet NICE.Identity.Management.dll

# See https://stackoverflow.com/questions/39082768/what-does-set-e-and-exec-do-for-docker-entrypoint-scripts
exec "$@"
