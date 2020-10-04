FROM node:12.18.4
# FROM node:14.13.0

WORKDIR /usr/src/vlog

COPY ./ ./

RUN npm install

CMD [ "/bin/bash" ]