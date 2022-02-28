FROM nginx:1.21-alpine

COPY nginx.conf /etc/nginx/nginx.conf.template
ENV PORT=80
RUN envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

COPY build /usr/share/nginx/html

CMD nginx