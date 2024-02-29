FROM node:16.16.0 AS production
WORKDIR /srv/app
COPY package*.json ./

RUN npm install --verbose
RUN npm install -g http-server
COPY . .
RUN npm run build

EXPOSE 4200
