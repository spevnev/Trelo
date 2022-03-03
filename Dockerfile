FROM nginx:1.21.6-alpine

ENV PORT=80

COPY nginx.conf /etc/nginx/nginx.conf.template

COPY build /usr/share/nginx/html

CMD envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx