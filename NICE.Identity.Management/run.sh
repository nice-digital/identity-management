#!/bin/bash

# Replace values in appsettings.json from envirionent variables
# And run .NET webapp

set -e

jq \
    --arg defaultConnection "$DEFAULT_CONNECTION" \
    --arg auth0domain "$AUTHCONFIGURATION_DOMAIN" \
    --arg auth0clientid "$AUTHCONFIGURATION_CLIENTID" \
    --arg auth0clientsecret "$AUTHCONFIGURATION_CLIENTSECRECT" \
    --arg auth0redirecturi "$AUTHCONFIGURATION_REDIRECT_URI" \
    --arg auth0logoutredirecturi "$AUTHCONFIGURATION_LOGOUT_REDIRECT_URI" \
    --arg auth0authserviceuri "$AUTHCONFIGURATION_AUTH_SERVICE_URI" \
    --arg auth0apiidentifier "$AUTHCONFIGURATION_API_IDENTIFIER" \
    '
    .ConnectionStrings.DefaultConnection = $defaultConnection |
    .AuthConfiguration.Domain = $auth0domain |
    .AuthConfiguration.ClientId = $auth0clientid |
    .AuthConfiguration.ClientSecret = $auth0clientsecret |
    .AuthConfiguration.RedirectUri = $auth0redirecturi |
    .AuthConfiguration.PostLogoutRedirectUri = $auth0logoutredirecturi |
    .AuthConfiguration.AuthorisationServiceUri = $auth0authserviceuri |
    .AuthConfiguration.ApiIdentifier = $auth0apiidentifier
    '\
    appsettings.json > _appsettings.json \
    && mv _appsettings.json appsettings.json

dotnet NICE.Identity.Management.dll

# See https://stackoverflow.com/questions/39082768/what-does-set-e-and-exec-do-for-docker-entrypoint-scripts
exec "$@"
