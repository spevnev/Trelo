ENV URL="trelo-back.herokuapp.com";

RUN mkdir -p /usr/share/nginx/html
COPY ./build /usr/share/nginx/html

FROM nginx:1.21-alpine