FROM node:lts-alpine

WORKDIR /app

COPY . /app/

RUN yarn install

RUN yarn run build

ENTRYPOINT ["node", "dist/app.js"]