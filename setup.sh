#!/bin/bash

# Setup script for Plant E-Commerce Platform

echo "🚀 Setting up Plant E-Commerce Platform..."

# Check if Python is installed
if ! command -v python3 &> /dev/null
then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check if pip is installed
if ! command -v pip &> /dev/null
then
    echo "❌ pip is not installed. Please install pip."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
cd apps/api
pip install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Failed to install Python dependencies."
    exit 1
fi

echo "✅ Python dependencies installed!"

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
cd ../..
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install Node.js dependencies."
    exit 1
fi

echo "✅ Node.js dependencies installed!"

# Create .env file if it doesn't exist
if [ ! -f apps/api/.env ]; then
    echo "📄 Creating .env file..."
    cat > apps/api/.env << EOF
DATABASE_URL=mongodb://localhost:27017/plant_ecommerce
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
EOF
    echo "✅ .env file created!"
else
    echo "✅ .env file already exists!"
fi

echo "🎉 Setup completed successfully!"

echo ""
echo "To run the application:"
echo "1. Start MongoDB (or run 'cd infra && docker-compose up -d' if using Docker)"
echo "2. Start the backend: cd apps/api && python -m uvicorn main:app --reload"
echo "3. Start the frontend: cd apps/web && npm run dev"
echo ""
echo "The application will be available at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend: http://localhost:8000"
echo "- API Docs: http://localhost:8000/docs"