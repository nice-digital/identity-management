FROM node:14.18.0-bullseye-slim

WORKDIR /app

RUN npm install -g npm@9.5.1

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:spa"]