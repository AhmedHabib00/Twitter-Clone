FROM node:16-alpine3.14 as base


RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY package.json ./

COPY package-lock.json ./


COPY . .

RUN npm install


EXPOSE 8000

CMD ["npm", "start"]