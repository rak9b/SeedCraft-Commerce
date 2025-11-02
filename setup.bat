@echo off
title Plant E-Commerce Platform Setup

echo 🚀 Setting up Plant E-Commerce Platform...

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18 or higher.
    pause
    exit /b 1
)

:: Check if pip is installed
pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ pip is not installed. Please install pip.
    pause
    exit /b 1
)

:: Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

:: Install Python dependencies
echo 🐍 Installing Python dependencies...
cd apps\api
pip install -r requirements.txt

if %errorlevel% neq 0 (
    echo ❌ Failed to install Python dependencies.
    pause
    exit /b 1
)

echo ✅ Python dependencies installed!

:: Install Node.js dependencies
echo 📦 Installing Node.js dependencies...
cd ..\..
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install Node.js dependencies.
    pause
    exit /b 1
)

echo ✅ Node.js dependencies installed!

:: Create .env file if it doesn't exist
if not exist apps\api\.env (
    echo 📄 Creating .env file...
    echo DATABASE_URL=mongodb://localhost:27017/plant_ecommerce> apps\api\.env
    echo SECRET_KEY=your-secret-key-here>> apps\api\.env
    echo ALGORITHM=HS256>> apps\api\.env
    echo ACCESS_TOKEN_EXPIRE_MINUTES=30>> apps\api\.env
    echo ✅ .env file created!
) else (
    echo ✅ .env file already exists!
)

echo 🎉 Setup completed successfully!

echo.
echo To run the application:
echo 1. Start MongoDB (or run 'cd infra && docker-compose up -d' if using Docker)
echo 2. Start the backend: cd apps\api && python -m uvicorn main:app --reload
echo 3. Start the frontend: cd apps\web && npm run dev
echo.
echo The application will be available at:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:8000
echo - API Docs: http://localhost:8000/docs

pause