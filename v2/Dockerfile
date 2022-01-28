FROM node:lts-alpine

WORKDIR /app

COPY . /app/

RUN yarn install

RUN yarn run build

EXPOSE 80

ENTRYPOINT ["node", "dist/app.js"]