FROM node:8.14-alpine

WORKDIR /app/code

RUN apk update &&\
    apk add --update nginx supervisor

RUN mkdir -p /app/code

COPY ./code/package.json /app/code
COPY ./code/package-lock.json /app/code
RUN npm i

COPY ./code /app/code
COPY ./ops/heroku/start.sh /start.sh
COPY ./ops/heroku/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./ops/heroku/supervisor/supervisord.conf /etc/supervisord.conf

RUN mkdir -p /run/nginx &&\
    chmod +x /start.sh

CMD export NGINX_PORT=$PORT && sh /start.sh