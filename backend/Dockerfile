FROM node:19.6.0 as development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build
