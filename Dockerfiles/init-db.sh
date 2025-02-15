#!/bin/bash

# Database credentials
DB_NAME="login_db"
DB_USER="login_user"
DB_PASSWORD="admin"
ADMIN_EMAIL="admin@admin.com"
ADMIN_PASSWORD="admin"

# Hash password using bcrypt (requires Python)
HASHED_PASSWORD=$(python3 -c "import bcrypt; print(bcrypt.hashpw(b'$ADMIN_PASSWORD', bcrypt.gensalt()).decode())")

echo "Waiting for PostgreSQL to be ready..."
until psql -U postgres -c '\q' 2>/dev/null; do
  sleep 2
done

echo "Creating database and user..."
psql -U postgres <<EOSQL
CREATE DATABASE $DB_NAME;
CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOSQL

echo "Setting up tables..."
psql -U postgres -d $DB_NAME <<EOSQL
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);
EOSQL

echo "Creating admin user..."
psql -U postgres -d $DB_NAME <<EOSQL
INSERT INTO users (email, password, role) VALUES
('$ADMIN_EMAIL', '$HASHED_PASSWORD', 'admin')
ON CONFLICT (email) DO NOTHING;
EOSQL

echo "Database setup complete!"
