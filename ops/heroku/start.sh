#!/bin/sh

mkdir -p /var/tmp/nginx
mkdir -p /run/nginx

sed -i -e "s/{NGINX_PORT}/"${NGINX_PORT}"/g" /etc/nginx/nginx.conf

cat /etc/nginx/nginx.conf

# Run nginx
exec /usr/bin/supervisord -n -c /etc/supervisord.conf