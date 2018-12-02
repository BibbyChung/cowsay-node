FROM node:8.11-alpine

WORKDIR /app/code

RUN apk update &&\
    apk add --update nginx supervisor

RUN mkdir -p /app/code

COPY ./code/package.json /app/code
COPY ./code/package-lock.json /app/code
RUN npm i

COPY ./code /app/code
COPY ./ops/heroku/start.sh /app
COPY ./ops/heroku/nginx /etc/nginx
COPY ./ops/heroku/supervisor/supervisord.conf /etc/supervisord.conf

RUN mkdir -p /run/nginx &&\
    chmod +x /app/start.sh

CMD export NGINX_PORT=$PORT &&\
    export NGINX_DOMAIN=$DOMAIN &&\
    sh /app/start.sh