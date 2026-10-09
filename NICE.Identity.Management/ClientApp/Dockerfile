FROM node:14.18.0-bullseye-slim

WORKDIR /app

# Uncomment line 15-18 to run locally
COPY ./certificates/company-ca.crt.cer \
  /usr/local/share/ca-certificates/corporate-root-ca.crt

# Uncomment line 6-12 to run locally
# RUN apt-get update \
#   && apt-get install -y --no-install-recommends \
#   git \
#   curl \
#   ca-certificates \
#   jq \
#   apt-get clean \
#   && rm -rf /var/lib/apt/lists/*

# RUN update-ca-certificates

#RUN npm install -g npm@9.5.1

COPY package*.json ./

ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/corporate-root-ca.crt

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:spa"]