FROM nginx:1.21-alpine

ENV URL="trelo-back.herokuapp.com";
ENV PORT=80

COPY build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf.template
RUN envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

ARG nginx_uid=33
ARG nginx_gid=33

RUN usermod -u $nginx_uid -o nginx && groupmod -g $nginx_gid -o nginx