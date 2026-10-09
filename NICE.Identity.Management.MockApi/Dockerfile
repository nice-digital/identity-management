FROM node:lts-trixie

# Uncomment line 4-17 to run locally
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  git \
  curl \
  ca-certificates \
  jq \
  && rm -rf /var/lib/apt/lists/*

COPY ./certificates/company-ca.crt.cer \
  /usr/local/share/ca-certificates/corporate-root-ca.crt

RUN update-ca-certificates

ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/corporate-root-ca.crt

WORKDIR /data

COPY package.json /data
COPY package-lock.json /data

RUN npm install

COPY . .
