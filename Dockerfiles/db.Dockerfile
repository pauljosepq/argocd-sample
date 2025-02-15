FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin

# Copy the initialization script
COPY init-db.sh /docker-entrypoint-initdb.d/init-db.sh

# Set permissions and make it executable
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh

EXPOSE 5432
