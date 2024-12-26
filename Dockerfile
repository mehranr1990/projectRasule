FROM node:18.17.0-alpine3.18 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest AS ngi


COPY --from=builder app/dist/primeng-panel-core /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf


ENV PORT=8080

EXPOSE 80



