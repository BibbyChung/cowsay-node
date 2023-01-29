FROM node:16.19-alpine

RUN mkdir -p /app/code
WORKDIR /app/code

COPY ./code/package.json /app/code
COPY ./code/package-lock.json /app/code
RUN npm i

COPY ./code /app/code

CMD export PORT=$PORT && npm start