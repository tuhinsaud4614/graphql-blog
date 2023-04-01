FROM node:19.6.0-alpine as development
WORKDIR /app/client
COPY package*.json ./
RUN npm install
COPY . .
