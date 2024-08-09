# Runs the Identity management webapp.
# Assumes you've published the app to ./published-app

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

ENV ASPNETCORE_URLS=http://+:8080

# Install Git
RUN apt-get update && apt-get install git -y
RUN git --version

# bash will load volta() function via .bashrc 
# using $VOLTA_HOME/load.sh
SHELL ["/bin/bash", "-c"]

# since we're starting non-interactive shell, 
# we will need to tell bash to load .bashrc manually
ENV BASH_ENV="~/.bashrc"
# needed by volta() function
ENV VOLTA_HOME="/root/.volta"
# make sure packages managed by volta will be in PATH
ENV PATH=$VOLTA_HOME/bin:$PATH

# install volta
RUN curl https://get.volta.sh | bash
RUN volta install node

RUN node -v
RUN npm -v

# Install replace globally for endpoints.ts replacement
RUN npm i -g replace

# Install jq for JSON file replacement and nc for checking sql port is available
RUN apt-get update && apt-get install jq -y \
  && rm -rf /var/lib/apt/lists/*

# Download wait-for-it as binary waitforit, see  https://github.com/vishnubob/wait-for-it
ENV WAITFORIT_VERSION=db04971
ENV WAITFORIT_DOWNLOAD_SHA=dd7511b88c5eaf3f8953167ab498f66589143649142a9a2f49a8f33e08584aaf
ENV WAITFORIT_DOWNLOAD_URL=https://github.com/vishnubob/wait-for-it/archive/$WAITFORIT_VERSION.tar.gz
RUN curl -SL "$WAITFORIT_DOWNLOAD_URL" --output waitforit.tar.gz \
  && echo "$WAITFORIT_DOWNLOAD_SHA waitforit.tar.gz" | sha256sum -c - \
  && mkdir -p /usr/local/waitforit \
  && tar -xzf "waitforit.tar.gz" -C /usr/local/waitforit --strip-components=1 \
  && rm waitforit.tar.gz \
  && mv /usr/local/waitforit/wait-for-it.sh /usr/local/bin/waitforit \
  && chmod +x /usr/local/bin/waitforit \
  && rm -rf /usr/local/waitforit

# Install frontend packages with node
COPY ./published-app/ClientApp/package.json ./app/ClientApp/
#COPY ./published-app/ClientApp/package-lock.json ./app/ClientApp/
WORKDIR /app/ClientApp
RUN npm i --production
RUN node -v

# Copy .net app to a location on container and run application
WORKDIR /app

# Script for running the dotnet app and setting appsettings.json values
COPY ./run.sh ./
RUN chmod +x ./run.sh

# Assume dotner core app's already been published...
COPY ./published-app ./

EXPOSE 8080

# Wait for SQL Server to be available before running the dotnet app
ENTRYPOINT ["waitforit", "-t", "60", "--strict", "database:1433", "--", "./run.sh"]

# "waitforit", "-t", "60", "--strict", "database:1433", "--", 