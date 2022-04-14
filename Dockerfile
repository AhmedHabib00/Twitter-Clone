## STAGE 1 (Production Base)
# Get prod deps. installed.
FROM node:17-alpine3.14 as base

EXPOSE 3000

ENV NODE_ENV=production 

WORKDIR /app

COPY package*.json ./

RUN npm ci \
    && npm cache clean --force


## Stage 2 (COPY SRC)
# just an intermediate stage to use in both testing & prod, so we don't have to copy twice
FROM base as source

COPY . . 


## Stage 3 (Testing)
#automated CI
FROM source as test

ENV NODE_ENV=development

ENV PATH=/app/node_modules/.bin:$PATH

WORKDIR /app 

RUN npm install --only=development

RUN eslint .

RUN npm test 

CMD ["npm", "run", "int-test"]

## Stage 4 (Security)
FROM test as audit

RUN npm audit 

# aqua microscanner, which needs a token for API access
# not super secret, so we'll use an ARG here
# https://github.com/aquasecurity/microscanner
ARG MICROSCANNER_TOKEN
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
RUN apk add --no-cache ca-certificates && update-ca-certificates
RUN /microscanner $MICROSCANNER_TOKEN --continue-on-failure

## Stage 5 (default, production)
FROM source as prod

CMD [ "node", "./bin/www" ]