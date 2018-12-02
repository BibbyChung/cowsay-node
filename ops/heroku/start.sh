#!/bin/sh

mkdir /var/tmp/nginx

domain="cowsay-node.herokuapp.com"
echo ${NGINX_DOMAIN}
if [ "${NGINX_DOMAIN}" != "" ]; then
  domain="${NGINX_DOMAIN}"
fi
echo ${domain}

sed -i -e "s/ENV{NGINX_PORT}/"${NGINX_PORT}"/g" /etc/nginx/sites-available/localhost.conf
sed -i -e "s/ENV{NGINX_DOMAIN}/"${domain}"/g" /etc/nginx/sites-available/localhost.conf

cat /etc/nginx/sites-available/localhost.conf

# Run nginx
exec /usr/bin/supervisord -n -c /etc/supervisord.conf