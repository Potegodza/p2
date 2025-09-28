#!/bin/bash

# Build script for Railway deployment
echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..

# Build frontend
echo "Building frontend..."
cd client && npm run build && cd ..

# Generate Prisma client
echo "Generating Prisma client..."
cd server && npx prisma generate && cd ..

echo "Build completed successfully!"
