#!/bin/bash

# Set production environment
export NODE_ENV=production

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "Installing root dependencies..."
    npm install
fi

if [ ! -d "client/node_modules" ]; then
    echo "Installing client dependencies..."
    cd client && npm install && cd ..
fi

if [ ! -d "server/node_modules" ]; then
    echo "Installing server dependencies..."
    cd server && npm install && cd ..
fi

# Build frontend
echo "Building frontend..."
cd client && npm run build && cd ..

# Generate Prisma client
echo "Generating Prisma client..."
cd server && npx prisma generate && cd ..

# Start the server
echo "Starting server..."
cd server && npm start
