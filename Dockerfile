FROM node:14.15.0 as BUILD

RUN mkdir /app
WORKDIR /app

RUN npm install -g npm@6.14.17
RUN npm i @angular/cli@12.2.0
RUN npm link @angular/cli@12.2.0
RUN npm cache clean -f
COPY . .
RUN npm config set legacy-peer-deps true
RUN npm install --save --legacy-peer-deps

RUN npm i lru-cache

RUN #ng version

RUN npm run build

EXPOSE 4200
#CMD ["ng", "serve", "--host", "0.0.0.0"]

