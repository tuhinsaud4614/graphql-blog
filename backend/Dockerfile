FROM node:19.6.0-alpine as development
WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build
