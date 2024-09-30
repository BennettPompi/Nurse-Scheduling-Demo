#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if pnpm is installed
if ! command_exists pnpm; then
  echo "pnpm is not installed. Please install it and try again."
  exit 1
fi

# Check if Docker is installed
if ! command_exists docker; then
  echo "Docker is not installed. Please install it and try again."
  exit 1
fi

# Install dependencies for both projects
echo "Installing dependencies for backend..."
cd backend && pnpm install
echo "Installing dependencies for frontend..."
cd ../frontend && pnpm install
cd ..

# Start the MySQL database
echo "Starting MySQL database..."
cd backend
docker compose up -d

# Wait for the database to be ready
echo "Waiting for the database to be ready..."
sleep 10

# Run migrations
echo "Running migrations..."
pnpm run migrations:run

# Start the backend server
echo "Starting backend server..."
pnpm start:dev &

# Start the frontend server
echo "Starting frontend server..."
cd ../frontend
pnpm dev &

echo "Project started successfully!"
echo "Backend is running on http://localhost:3000"
echo "Frontend is running on http://localhost:5174"
echo "Press Ctrl+C to stop all processes"

# Wait for user input to keep the script running
read -p "Press Enter to exit..."

# Kill all background processes
kill $(jobs -p)