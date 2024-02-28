FROM node:alpine AS production
WORKDIR /srv/app
COPY package*.json ./

RUN npm install --verbose
COPY . .
RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main" ]
