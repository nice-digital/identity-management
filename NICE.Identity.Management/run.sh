#!/bin/bash

# Replace values in appsettings.json from envirionent variables
# And run .NET webapp

set -e

jq \
    --arg defaultConnection "$DEFAULT_CONNECTION" \
    --arg webappdomain "$WEBAPP_DOMAIN" \
    --arg webappclientid "$WEBAPP_CLIENTID" \
    --arg webappclientsecret "$WEBAPP_CLIENTSECRECT" \
    --arg webappredirecturi "$WEBAPP_REDIRECT_URI" \
    --arg webapplogoutredirecturi "$WEBAPP_LOGOUT_REDIRECT_URI" \
    --arg webappapiidentifier "$WEBAPP_API_IDENTIFIER" \
    --arg webappauthorisationserviceuri "$WEBAPP_AUTH_SERVICE_URI" \
    --arg webappgoogletrackingid "$WEBAPP_GOOGLE_TRACK_ID" \
    --arg identityapiauthorisationserviceuri "$IDENTITYAPI_AUTH_SERVICE_URI" \
    --arg identityapiidentifier "$IDENTITYAPI_IDENTIFIER" \
    --arg identityapiclientid "$IDENTITYAPI_API_CLIENTID" \
    --arg identityapiclientsecret "$IDENTITYAPI_API_CLIENTSECRECT" \
    --arg RedisConnectionString "$REDIS_CONNECTION_STRING" \
    '
    .ConnectionStrings.DefaultConnection = $defaultConnection |
    .WebAppConfiguration.Domain = $webappdomain |
    .WebAppConfiguration.ClientId = $webappclientid |
    .WebAppConfiguration.ClientSecret = $webappclientsecret |
    .WebAppConfiguration.RedirectUri = $webappredirecturi |
    .WebAppConfiguration.PostLogoutRedirectUri = $webapplogoutredirecturi |
    .WebAppConfiguration.ApiIdentifier = $webappapiidentifier |
    .WebAppConfiguration.AuthorisationServiceUri = $webappauthorisationserviceuri |
    .WebAppConfiguration.GoogleTrackingId = $webappgoogletrackingid |
    .WebAppConfiguration.RedisServiceConfiguration.ConnectionString = $RedisConnectionString |
    .WebAppConfiguration.RedisServiceConfiguration.Enabled = true |
    .IdentityApiConfiguration.AuthorisationServiceUri = $identityapiauthorisationserviceuri |
    .IdentityApiConfiguration.ApiIdentifier = $identityapiidentifier |
    .IdentityApiConfiguration.ClientId = $identityapiclientid |
    .IdentityApiConfiguration.ClientSecret = $identityapiclientsecret
    '\
    appsettings.json > _appsettings.json \
    && mv _appsettings.json appsettings.json

replace "#{REACT_APP_API_BASE_URL}" "$REACT_APP_API_BASE_URL" ClientApp/build/static/js/ -r --include="*.js"

dotnet NICE.Identity.Management.dll

# See https://stackoverflow.com/questions/39082768/what-does-set-e-and-exec-do-for-docker-entrypoint-scripts
exec "$@"
