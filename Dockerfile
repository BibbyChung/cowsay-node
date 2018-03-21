FROM node:alpine

RUN mkdir -p /app
WORKDIR /app
EXPOSE 8080

COPY package.json /app
RUN npm install
COPY . /app

CMD [ "npm", "start" ]