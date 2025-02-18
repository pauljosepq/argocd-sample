# Stage 1: Build the React app
FROM node:18-alpine AS builder

WORKDIR /app

COPY frontend/ ./

RUN npm install && npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]