FROM node:16.16.0 AS production
WORKDIR /srv/app
COPY package*.json ./

RUN npm install --verbose
RUN npm install -g @angular/cli@16.2.9
COPY . .
RUN npm run build

EXPOSE 4200
