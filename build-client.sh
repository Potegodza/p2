#!/bin/bash

# Build client with production environment variables
export VITE_API_URL="https://web-production-bf4ac.up.railway.app"

echo "🔧 Building client with production API URL: $VITE_API_URL"

cd client
npm run build
cd ..

echo "✅ Client build completed"
