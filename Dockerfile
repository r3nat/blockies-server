FROM node:8.11

COPY . /app
WORKDIR /app

RUN npm install
USER node
EXPOSE 8080

CMD node src/server.js
