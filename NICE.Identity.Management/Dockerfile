# Runs the Identity management webapp.
# Assumes you've published the app to ./published-app

FROM microsoft/dotnet:2.1-aspnetcore-runtime

ENV ASPNETCORE_URLS http://+:8080

# Install Git
RUN apt-get update && apt-get install git -y
RUN git --version

# Install node and npm
# Latest Nodejs LTS as of 03/05/2018
ENV NODE_VERSION 8.11.1
ENV NODE_DOWNLOAD_SHA 0e20787e2eda4cc31336d8327556ebc7417e8ee0a6ba0de96a09b0ec2b841f60
ENV NODE_DOWNLOAD_URL https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz

RUN curl -SL "$NODE_DOWNLOAD_URL" --output nodejs.tar.gz \
  && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
  && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
  && rm nodejs.tar.gz \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs
RUN node -v
RUN npm -v

# Install jq for JSON file replacement and nc for checking sql port is available
RUN apt-get update && apt-get install jq -y \
  && rm -rf /var/lib/apt/lists/*

# Download wait-for-it as binary waitforit, see  https://github.com/vishnubob/wait-for-it
ENV WAITFORIT_VERSION db04971
ENV WAITFORIT_DOWNLOAD_SHA dd7511b88c5eaf3f8953167ab498f66589143649142a9a2f49a8f33e08584aaf
ENV WAITFORIT_DOWNLOAD_URL https://github.com/vishnubob/wait-for-it/archive/$WAITFORIT_VERSION.tar.gz
RUN curl -SL "$WAITFORIT_DOWNLOAD_URL" --output waitforit.tar.gz \
  && echo "$WAITFORIT_DOWNLOAD_SHA waitforit.tar.gz" | sha256sum -c - \
  && mkdir -p /usr/local/waitforit \
  && tar -xzf "waitforit.tar.gz" -C /usr/local/waitforit --strip-components=1 \
  && rm waitforit.tar.gz \
  && mv /usr/local/waitforit/wait-for-it.sh /usr/local/bin/waitforit \
  && chmod +x /usr/local/bin/waitforit \
  && rm -rf /usr/local/waitforit

# Install frontend packages with node
COPY ./published-app/Administration/package.json ./app/Administration/
#COPY ./published-app/Administration/package-lock.json ./app/Administration/
WORKDIR /app/Administration
RUN npm i --production

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