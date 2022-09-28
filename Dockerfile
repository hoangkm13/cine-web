FROM node:12.20.0 as BUILD

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install --unsafe-perm

COPY . .

RUN npm run build

EXPOSE 4200
CMD ["npx", "ng", "serve"]

