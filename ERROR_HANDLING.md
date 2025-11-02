# Error Handling Guide - Plant E-Commerce Platform

This guide explains how errors are handled in the Plant E-Commerce Platform and how to resolve common issues.

## Common Error Types

### 1. Import Errors
**Error Message**: "Import could not be resolved"
**Cause**: Missing or incorrectly installed dependencies
**Solution**:
1. Verify all dependencies are installed:
   ```bash
   pip install -r apps/api/requirements.txt
   npm install
   ```
2. Check if you're in the correct virtual environment (for Python)
3. Restart your IDE to refresh the language server

### 2. MongoDB Connection Errors
**Error Message**: "Connection refused" or "Unable to connect to MongoDB"
**Cause**: MongoDB service is not running or incorrect connection string
**Solution**:
1. Start MongoDB service:
   ```bash
   # If using Docker
   cd infra
   docker-compose up -d
   
   # If using local MongoDB
   sudo systemctl start mongod  # Linux
   # Or start MongoDB service from Services.msc (Windows)
   ```
2. Verify the DATABASE_URL in your .env file
3. Check if MongoDB is listening on the correct port:
   ```bash
   netstat -an | grep 27017
   ```

### 3. Port Already in Use Errors
**Error Message**: "Address already in use" or "Port 8000 is already in use"
**Cause**: Another process is using the same port
**Solution**:
1. Find and kill the process using the port:
   ```bash
   # Linux/Mac
   lsof -i :8000
   kill -9 <PID>
   
   # Windows
   netstat -ano | findstr :8000
   taskkill /PID <PID> /F
   ```
2. Or change the port in the run command:
   ```bash
   python -m uvicorn main:app --reload --port 8001
   ```

### 4. TypeScript Compilation Errors
**Error Message**: Various TypeScript errors in frontend files
**Cause**: Missing type definitions or incorrect imports
**Solution**:
1. Install all Node.js dependencies:
   ```bash
   npm install
   ```
2. Check tsconfig.json configuration
3. Restart TypeScript language server in your IDE

### 5. CORS Errors
**Error Message**: "Blocked by CORS policy"
**Cause**: Frontend and backend are running on different ports without proper CORS configuration
**Solution**:
1. The backend already has CORS enabled, but verify the configuration in main.py:
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],  # In production, specify exact origins
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

### 6. Authentication Errors
**Error Message**: "401 Unauthorized" or "403 Forbidden"
**Cause**: Missing or invalid authentication tokens
**Solution**:
1. Ensure you're properly authenticated in your requests
2. Check if the user has the required role for the operation
3. Verify JWT token expiration and refresh if needed

## Backend Error Handling

### Error Response Format
All API errors follow a consistent format:
```json
{
  "error": "Error message describing what went wrong"
}
```

### HTTP Status Codes
- 200: Success
- 400: Bad Request (validation errors)
- 401: Unauthorized (authentication required)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Internal Server Error

### Custom Error Classes
The backend uses custom error classes for consistent error handling:
- `AppError`: Base error class
- `NetworkError`: Network connectivity issues
- `ValidationError`: Input validation errors
- `AuthenticationError`: Authentication failures
- `AuthorizationError`: Permission denied errors
- `NotFoundError`: Resource not found

## Frontend Error Handling

### Error Boundaries
React error boundaries catch JavaScript errors in components:
```typescript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### API Error Handling
The frontend uses a centralized error handler:
```typescript
export const handleApiError = (error: any): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  // Handle network errors
  if (!error.response) {
    return new NetworkError('Network error - please check your connection');
  }

  // Handle HTTP errors
  const { status, data } = error.response;
  const message = data?.error || data?.message || 'An unexpected error occurred';

  switch (status) {
    case 400:
      return new ValidationError(message);
    case 401:
      return new AuthenticationError(message);
    case 403:
      return new AuthorizationError(message);
    case 404:
      return new NotFoundError(message);
    case 500:
      return new AppError('Internal server error', 'SERVER_ERROR', 500);
    default:
      return new AppError(message, 'UNKNOWN_ERROR', status);
  }
};
```

## Database Error Handling

### Connection Errors
Database connection errors are handled with retry logic:
```python
# In database.py
class Database:
    client: Optional[AsyncIOMotorClient] = None
    
    @classmethod
    def get_client(cls) -> AsyncIOMotorClient:
        if cls.client is None:
            try:
                cls.client = AsyncIOMotorClient(settings.DATABASE_URL)
            except Exception as e:
                logger.error(f"Failed to connect to database: {e}")
                raise
        return cls.client
```

### Query Errors
Database query errors are caught and logged:
```python
# In services.py
async def get_user_by_id(user_id: str) -> Optional[User]:
    try:
        collection = db.get_database().users
        user_data = await collection.find_one({"_id": ObjectId(user_id)})
        if user_data:
            return User(**user_data)
        return None
    except Exception as e:
        logger.error(f"Error fetching user {user_id}: {e}")
        raise
```

## Logging

### Backend Logging
The backend uses Python's built-in logging module:
```python
import logging

logger = logging.getLogger(__name__)

# Log levels:
# DEBUG: Detailed information for diagnosing problems
# INFO: General information about program execution
# WARNING: Something unexpected happened
# ERROR: A serious problem occurred
# CRITICAL: A very serious error occurred
```

### Frontend Logging
The frontend uses console logging for development:
```typescript
// In development
console.error('Error:', error);

// In production, consider using a logging service
// like Sentry or LogRocket
```

## Debugging Tips

### 1. Enable Debug Mode
For the backend, run with debug flags:
```bash
python -m uvicorn main:app --reload --log-level debug
```

### 2. Use Logging
Add logging statements to trace execution flow:
```python
import logging

logger = logging.getLogger(__name__)

logger.debug("Debug information")
logger.info("General information")
logger.warning("Warning message")
logger.error("Error message")
```

### 3. Check Environment Variables
Verify all required environment variables are set:
```bash
# Linux/Mac
printenv | grep DATABASE

# Windows
set | findstr DATABASE
```

### 4. Use Development Tools
- **Backend**: FastAPI's built-in docs at `/docs`
- **Frontend**: React DevTools browser extension
- **Database**: MongoDB Compass for database inspection

## Testing Error Handling

### Unit Tests for Error Cases
Test error scenarios in your unit tests:
```python
def test_get_user_not_found():
    # Test that the function handles missing users correctly
    result = await UserService.get_user_by_id("nonexistent")
    assert result is None
```

### Integration Tests for API Errors
Test API error responses:
```python
def test_unauthorized_access():
    response = client.get("/admin/users")
    assert response.status_code == 401
    assert "error" in response.json()
```

## Production Considerations

### 1. Error Monitoring
Use services like:
- Sentry for error tracking
- New Relic for performance monitoring
- Loggly or similar for log aggregation

### 2. Security
Never expose sensitive information in error messages:
```python
# DON'T do this
raise Exception(f"Database password: {settings.DATABASE_PASSWORD}")

# DO this instead
logger.error(f"Database connection failed for user {username}")
raise Exception("Unable to connect to database")
```

### 3. Graceful Degradation
Handle errors gracefully to maintain user experience:
```typescript
try {
  const products = await apiClient.getProducts();
  setProducts(products.data);
} catch (error) {
  // Show cached data or default content
  setProducts(cachedProducts);
  // Notify user of the issue
  setError("Unable to load products. Showing cached data.");
}
```

By following this error handling guide, you should be able to identify, resolve, and prevent most errors in the Plant E-Commerce Platform.