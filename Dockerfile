FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY . /app/

RUN yarn run build

ENTRYPOINT ["node", "dist/app.js"]