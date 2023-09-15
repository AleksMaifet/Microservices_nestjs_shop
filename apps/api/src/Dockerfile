FROM node:alpine as builder

WORKDIR opt/src

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build:api

FROM node:alpine

WORKDIR opt/src

COPY package*.json ./

RUN npm install --production --frozen-lockfile

COPY --from=builder opt/src/dist ./dist

EXPOSE 8080

CMD [ "node", "dist/apps/api/main.js" ]
