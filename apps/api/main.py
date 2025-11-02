from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import os

# Import our models and services
try:
    from .models import User, Product, Order, OrderItem, Delivery, FinanceRecord, ProductionRecord, AuditLog
    from .services import UserService, ProductService, OrderService, DeliveryService, FinanceService, ProductionService, AuditService
    from .database import db
except ImportError:
    # Fallback for direct execution
    from models import User, Product, Order, OrderItem, Delivery, FinanceRecord, ProductionRecord, AuditLog
    from services import UserService, ProductService, OrderService, DeliveryService, FinanceService, ProductionService, AuditService
    from database import db

# Initialize FastAPI app
app = FastAPI(
    title="Plant E-Commerce API",
    description="API for the Plant E-Commerce Platform",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup and shutdown events
@app.on_event("startup")
async def startup_db_client():
    pass  # Database connection is handled in the database module

@app.on_event("shutdown")
async def shutdown_db_client():
    db.close_client()

# Authentication dependency (simplified for this example)
class RoleChecker:
    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, role: str = "Customer"):
        if role not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Operation not permitted"
            )
        return role

# Routes
@app.get("/")
async def root():
    return {"message": "Plant E-Commerce API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# User routes
@app.get("/users", dependencies=[Depends(RoleChecker(["Admin"]))])
async def get_users():
    # In a real implementation, this would fetch users from MongoDB
    return {"message": "List of users"}

@app.post("/users/role", dependencies=[Depends(RoleChecker(["Admin"]))])
async def set_user_role(uid: str, role: str):
    try:
        success = await UserService.update_user_role(uid, role)
        if success:
            # Log the audit event
            audit_log = AuditLog(
                action="user_role_updated",
                user_id=uid,
                details={"new_role": role}
            )
            await AuditService.log_audit_event(audit_log)
            return {"message": f"User {uid} role updated to {role}"}
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Product routes
@app.get("/products")
async def get_products():
    try:
        products = await ProductService.get_products()
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/products/{product_id}")
async def get_product(product_id: str):
    try:
        product = await ProductService.get_product_by_id(product_id)
        if product:
            return product
        else:
            raise HTTPException(status_code=404, detail="Product not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/products", dependencies=[Depends(RoleChecker(["Admin", "Moderator"]))])
async def create_product(product: Product):
    try:
        new_product = await ProductService.create_product(product)
        # Log the audit event
        audit_log = AuditLog(
            action="product_created",
            user_id="system",  # In a real app, this would be the actual user ID
            resource_id=str(new_product.id),
            resource_type="product",
            details={"title": product.title}
        )
        await AuditService.log_audit_event(audit_log)
        return new_product
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Order routes
@app.get("/orders", dependencies=[Depends(RoleChecker(["Admin", "Finance"]))])
async def get_orders():
    # In a real implementation, this would fetch orders from MongoDB
    return {"message": "List of orders"}

@app.get("/orders/user/{user_id}")
async def get_user_orders(user_id: str):
    try:
        orders = await OrderService.get_orders_by_user(user_id)
        return orders
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/orders")
async def create_order(order: Order):
    try:
        # Create the order
        new_order = await OrderService.create_order(order)
        
        # Update product stock
        for item in order.items:
            await ProductService.update_product_stock(item.product_id, item.quantity)
        
        # Create delivery record
        delivery = Delivery(
            order_id=str(new_order.id),
            status="pending"
        )
        await DeliveryService.create_delivery(delivery)
        
        # Create finance record
        finance = FinanceRecord(
            order_id=str(new_order.id),
            amount=order.total,
            type="sale",
            status="pending",
            payment_method="cod"  # Default to COD, would be dynamic in real app
        )
        await FinanceService.create_finance_record(finance)
        
        # Log the audit event
        audit_log = AuditLog(
            action="order_created",
            user_id=order.user_id,
            resource_id=str(new_order.id),
            resource_type="order",
            details={"total": order.total}
        )
        await AuditService.log_audit_event(audit_log)
        
        return new_order
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Delivery routes
@app.get("/deliveries", dependencies=[Depends(RoleChecker(["Admin", "Delivery"]))])
async def get_deliveries():
    # In a real implementation, this would fetch deliveries from MongoDB
    return {"message": "List of deliveries"}

@app.get("/deliveries/order/{order_id}")
async def get_order_deliveries(order_id: str):
    try:
        deliveries = await DeliveryService.get_deliveries_by_order(order_id)
        return deliveries
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Finance routes
@app.get("/finance", dependencies=[Depends(RoleChecker(["Admin", "Finance"]))])
async def get_finance_data():
    # In a real implementation, this would fetch finance data from MongoDB
    return {"message": "Finance data"}

@app.get("/finance/order/{order_id}")
async def get_order_finance(order_id: str):
    try:
        finances = await FinanceService.get_finances_by_order(order_id)
        return finances
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Production routes
@app.get("/production", dependencies=[Depends(RoleChecker(["Admin", "Production"]))])
async def get_production_data():
    # In a real implementation, this would fetch production data from MongoDB
    return {"message": "Production data"}

@app.get("/production/product/{product_id}")
async def get_product_production(product_id: str):
    try:
        records = await ProductionService.get_production_records_by_product(product_id)
        return records
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)