FROM node:16-alpine3.14 as base


RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install

COPY . .



EXPOSE 8000

CMD ["npm", "start"]