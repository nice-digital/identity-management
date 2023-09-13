FROM node:latest

WORKDIR /data

COPY package.json /data
COPY package-lock.json /data

RUN npm install

COPY . .
