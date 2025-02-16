FROM node:18-alpine

WORKDIR /app
COPY backend/ ./
RUN npm install
EXPOSE 3000

CMD ["node", "server.js"]
