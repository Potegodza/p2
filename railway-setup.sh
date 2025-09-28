#!/bin/bash

# Railway Setup Script
# This script sets up the database and starts the application

echo "🚀 Starting Railway deployment setup..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client && npm install && cd ..

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server && npm install && cd ..

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd server && npx prisma generate && cd ..

# Push database schema
echo "🗄️ Setting up database..."
cd server && npx prisma db push && cd ..

# Setup database with initial data
echo "🌱 Setting up initial data..."
cd server && npm run setup-db && cd ..

# Build client
echo "🏗️ Building client..."
cd client && npm run build && cd ..

# Start server
echo "🚀 Starting server..."
cd server && npm start
