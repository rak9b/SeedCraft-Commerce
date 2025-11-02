# Setup Guide - Plant E-Commerce Platform

This guide will help you set up and run the Plant E-Commerce Platform without errors.

## Prerequisites

Before starting, ensure you have the following installed:
- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn
- MongoDB (or Docker for containerized MongoDB)

## Step 1: Install Python Dependencies

Navigate to the API directory and install the required Python packages:

```bash
cd apps/api
pip install -r requirements.txt
```

If you encounter any issues, try installing packages individually:

```bash
pip install fastapi==0.104.0
pip install uvicorn[standard]==0.23.2
pip install motor==3.3.1
pip install pydantic==2.4.2
pip install pydantic-settings==2.0.3
pip install python-jose==3.3.0
pip install passlib==1.7.4
pip install bcrypt==4.0.1
pip install python-multipart==0.0.6
pip install pytz==2023.3
pip install bson==0.5.10
```

## Step 2: Install Node.js Dependencies

From the root directory, install all Node.js dependencies:

```bash
npm install
```

This will install dependencies for all workspaces (web, ui, config packages).

## Step 3: Set Up MongoDB

You can set up MongoDB in two ways:

### Option 1: Install MongoDB Locally

1. Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start the MongoDB service

### Option 2: Use Docker (Recommended)

From the infra directory, run:

```bash
cd infra
docker-compose up -d
```

This will start MongoDB and other services in containers.

## Step 4: Environment Variables

Create a `.env` file in the `apps/api` directory:

```env
DATABASE_URL=mongodb://localhost:27017/plant_ecommerce
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Step 5: Run the Applications

### Run the Backend (FastAPI)

```bash
cd apps/api
python -m uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Run the Frontend (Next.js)

In a separate terminal:

```bash
cd apps/web
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Step 6: Verify Installation

1. Visit `http://localhost:8000` to verify the backend is running
2. Visit `http://localhost:8000/docs` to see the API documentation
3. Visit `http://localhost:3000` to verify the frontend is running

## Troubleshooting Common Issues

### ImportError Issues

If you see import errors like "Import could not be resolved", it means the dependencies are not installed correctly:

1. Make sure you're in the correct directory when running pip install
2. Try creating a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

### MongoDB Connection Issues

If you see connection errors:

1. Ensure MongoDB is running
2. Check that the DATABASE_URL in your .env file is correct
3. If using Docker, make sure the containers are running:
   ```bash
   docker-compose ps
   ```

### Port Conflicts

If you see port already in use errors:

1. Change the port in the run commands:
   ```bash
   python -m uvicorn main:app --reload --port 8001
   ```
2. Update the frontend API client to use the new port

### TypeScript Errors in Frontend

If you see TypeScript errors:

1. Make sure all Node.js dependencies are installed:
   ```bash
   cd apps/web
   npm install
   ```
2. Check that the tsconfig.json file is properly configured

## Running with Docker

For a completely containerized setup:

```bash
cd infra
docker-compose up -d
```

This will start:
- MongoDB database
- FastAPI backend
- Next.js frontend

Access the applications at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`

## Development Workflow

### Backend Development

1. Make changes to files in `apps/api/`
2. The server will automatically reload with `--reload` flag
3. Check API documentation at `http://localhost:8000/docs`

### Frontend Development

1. Make changes to files in `apps/web/app/`
2. The Next.js dev server will automatically reload
3. Check the browser for changes

### Shared Packages

For changes to shared packages (ui, config):

1. Make changes in `packages/ui/` or `packages/config/`
2. The changes will be reflected in both frontend and other packages
3. You may need to restart the dev servers for changes to take effect

## Testing

### Backend Testing

```bash
cd apps/api
python -m pytest
```

### Frontend Testing

```bash
cd apps/web
npm run test
```

## Deployment

### Backend Deployment

```bash
cd apps/api
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend Deployment

```bash
cd apps/web
npm run build
npm start
```

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Docker Documentation](https://docs.docker.com/)

If you continue to experience issues, please check the console logs for specific error messages and ensure all prerequisites are properly installed.