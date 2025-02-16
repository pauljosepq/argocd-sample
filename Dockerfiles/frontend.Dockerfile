FROM node:18-alpine

WORKDIR /app
COPY frontend/ ./
RUN npm install && npm run build
EXPOSE 4000

CMD ["npm", "run", "dev"]
