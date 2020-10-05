FROM node:12.18.4
# FROM node:14.13.0

WORKDIR /usr/src/vlog

COPY ./package*.json ./

RUN npm install

COPY ./ ./

CMD [ "/bin/bash" ]