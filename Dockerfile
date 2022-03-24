FROM nginx:1.21.6-alpine

ENV PORT=80
ENV BACKEND_URL="node-service"

COPY nginx/nginx.conf /etc/nginx/nginx.conf.template
COPY nginx/headers.conf /etc/nginx/headers.conf

COPY build /usr/share/nginx/html

CMD envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx