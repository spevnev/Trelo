FROM nginx:1.21-alpine

ENV URL="trelo-back.herokuapp.com";

RUN ls -al
COPY build /usr/share/nginx/html