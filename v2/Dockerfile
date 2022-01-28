FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY src /app/src

COPY views /app/views

COPY styles /app/styles

COPY media /app/media

COPY tsconfig.json /app/

RUN yarn run build

EXPOSE 80

ENTRYPOINT ["node", "dist/app.js"]