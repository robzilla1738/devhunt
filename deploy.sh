#!/bin/bash
set -e

echo "🚀 Starting deployment process..."

# Pull latest changes
echo "📥 Pulling latest changes from repository..."
git pull

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Build the application
echo "🏗️ Building the application..."
npm run build

# Restart the application (using PM2 as an example)
echo "🔄 Restarting the application..."
# Uncomment and modify the line below based on your process manager
# pm2 restart devhunt

echo "✅ Deployment completed successfully!" 