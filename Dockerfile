FROM node:12.22.9 as BUILD

RUN mkdir /app
WORKDIR /app

RUN npm install -g npm@8.5.1
RUN npm i @angular/cli@13.3.11
RUN npm link @angular/cli@13.3.11
RUN npm cache clean -f
COPY . .
RUN npm config set legacy-peer-deps true
RUN npm install --save --legacy-peer-deps

RUN ng version

RUN npm run build

EXPOSE 4200
#CMD ["ng", "serve", "--host", "0.0.0.0"]

