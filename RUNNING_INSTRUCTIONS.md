# Running the Plant E-Commerce Application

This document provides detailed instructions on how to run the full-stack plant e-commerce application.

## Prerequisites

Before running the application, ensure you have the following installed:
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- MongoDB (v4.4 or higher) or Docker
- npm or yarn

## Project Structure

```
plant-ecommerce/
├── apps/
│   ├── web/               # Next.js frontend
│   └── api/               # FastAPI backend
├── packages/
│   ├── ui/                # Shared UI components
│   └── config/            # Shared configuration
├── infra/                 # Infrastructure files (Docker, Firebase)
├── seed/                  # Seed data
└── functions/             # Firebase Cloud Functions
```

## Running the Frontend (Next.js)

1. Navigate to the web directory:
   ```bash
   cd apps/web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## Running the Backend (FastAPI)

### Option 1: Using Python directly

1. Navigate to the API directory:
   ```bash
   cd apps/api
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the development server:
   ```bash
   python -m uvicorn main:app --reload
   ```

5. The API will be available at `http://localhost:8000`
   - API documentation: `http://localhost:8000/docs`
   - Alternative API documentation: `http://localhost:8000/redoc`

### Option 2: Using Docker

1. From the root directory, run:
   ```bash
   docker-compose up -d
   ```

2. The services will be available at:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`

## Database Setup

### Using MongoDB locally

1. Install MongoDB on your system or use Docker:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. The application will automatically connect to MongoDB at `mongodb://localhost:27017/plant_ecommerce`

### Using Docker Compose (Recommended)

The docker-compose.yml file in the infra directory includes MongoDB setup:
```bash
cd infra
docker-compose up -d
```

## Environment Variables

Create a `.env` file in the `apps/api` directory with the following variables:

```env
DATABASE_URL=mongodb://localhost:27017/plant_ecommerce
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Seeding Data

To populate the database with sample data:

1. Navigate to the seed directory:
   ```bash
   cd seed
   ```

2. Run the seed script:
   ```bash
   node seed.js
   ```

## Running with Firebase (Alternative Backend)

If you prefer to use Firebase instead of the FastAPI backend:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Start Firebase emulators:
   ```bash
   cd infra
   firebase emulators:start
   ```

4. Deploy Firebase functions:
   ```bash
   cd functions
   npm run deploy
   ```

## Development Workflow

### Frontend Development

- The frontend uses Next.js with App Router
- Components are organized in the `app` directory
- Shared components are in the `packages/ui` directory
- Styling is done with Tailwind CSS

### Backend Development

- The backend uses FastAPI with MongoDB
- Models are defined in `models.py`
- Database operations are handled in `services.py`
- Routes are defined in `main.py`

### Adding New Features

1. For frontend features:
   - Create new components in `packages/ui/components`
   - Add new pages in `apps/web/app`
   - Update shared configuration in `packages/config`

2. For backend features:
   - Add new models in `apps/api/models.py`
   - Add new services in `apps/api/services.py`
   - Add new routes in `apps/api/main.py`

## Testing

### Frontend Testing

```bash
cd apps/web
npm run test
```

### Backend Testing

```bash
cd apps/api
python -m pytest
```

## Deployment

### Frontend Deployment

For production deployment of the frontend:
```bash
cd apps/web
npm run build
npm start
```

### Backend Deployment

For production deployment of the backend:
```bash
cd apps/api
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

### Docker Deployment

To deploy using Docker:
```bash
cd infra
docker-compose up -d
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in the configuration files
2. **Database connection failed**: Ensure MongoDB is running and accessible
3. **Dependency installation errors**: Ensure you're using the correct Node.js and Python versions

### Getting Help

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all prerequisites are installed
3. Ensure environment variables are correctly set
4. Check that all services are running

For additional support, refer to the documentation of the respective technologies:
- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)