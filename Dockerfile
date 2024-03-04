FROM node:12.20.0 as BUILD

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm i @angular/cli@12.2.0

RUN npm install --unsafe-perm

COPY . .

RUN npm run build

EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]

