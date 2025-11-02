from typing import List, Optional
from bson import ObjectId
from datetime import datetime

# Fix relative imports
try:
    from .database import db
    from .models import User, Product, Order, Delivery, FinanceRecord, ProductionRecord, AuditLog
except ImportError:
    # Fallback for direct execution
    from database import db
    from models import User, Product, Order, Delivery, FinanceRecord, ProductionRecord, AuditLog

class UserService:
    @staticmethod
    async def get_user_by_id(user_id: str) -> Optional[User]:
        collection = db.get_database().users
        user_data = await collection.find_one({"_id": ObjectId(user_id)})
        if user_data:
            return User(**user_data)
        return None

    @staticmethod
    async def get_user_by_email(email: str) -> Optional[User]:
        collection = db.get_database().users
        user_data = await collection.find_one({"email": email})
        if user_data:
            return User(**user_data)
        return None

    @staticmethod
    async def create_user(user: User) -> User:
        collection = db.get_database().users
        user_dict = user.dict(by_alias=True)
        result = await collection.insert_one(user_dict)
        user.id = result.inserted_id
        return user

    @staticmethod
    async def update_user_role(user_id: str, role: str) -> bool:
        collection = db.get_database().users
        result = await collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"role": role, "updated_at": datetime.utcnow()}}
        )
        return result.modified_count > 0

class ProductService:
    @staticmethod
    async def get_products() -> List[Product]:
        collection = db.get_database().products
        cursor = collection.find()
        products = []
        async for product_data in cursor:
            products.append(Product(**product_data))
        return products

    @staticmethod
    async def get_product_by_id(product_id: str) -> Optional[Product]:
        collection = db.get_database().products
        product_data = await collection.find_one({"_id": ObjectId(product_id)})
        if product_data:
            return Product(**product_data)
        return None

    @staticmethod
    async def get_product_by_slug(slug: str) -> Optional[Product]:
        collection = db.get_database().products
        product_data = await collection.find_one({"slug": slug})
        if product_data:
            return Product(**product_data)
        return None

    @staticmethod
    async def create_product(product: Product) -> Product:
        collection = db.get_database().products
        product_dict = product.dict(by_alias=True)
        result = await collection.insert_one(product_dict)
        product.id = result.inserted_id
        return product

    @staticmethod
    async def update_product_stock(product_id: str, quantity: int) -> bool:
        collection = db.get_database().products
        result = await collection.update_one(
            {"_id": ObjectId(product_id)},
            {"$inc": {"stock": -quantity}}
        )
        return result.modified_count > 0

class OrderService:
    @staticmethod
    async def get_orders_by_user(user_id: str) -> List[Order]:
        collection = db.get_database().orders
        cursor = collection.find({"user_id": user_id})
        orders = []
        async for order_data in cursor:
            orders.append(Order(**order_data))
        return orders

    @staticmethod
    async def get_order_by_id(order_id: str) -> Optional[Order]:
        collection = db.get_database().orders
        order_data = await collection.find_one({"_id": ObjectId(order_id)})
        if order_data:
            return Order(**order_data)
        return None

    @staticmethod
    async def create_order(order: Order) -> Order:
        collection = db.get_database().orders
        order_dict = order.dict(by_alias=True)
        result = await collection.insert_one(order_dict)
        order.id = result.inserted_id
        return order

class DeliveryService:
    @staticmethod
    async def get_deliveries_by_order(order_id: str) -> List[Delivery]:
        collection = db.get_database().deliveries
        cursor = collection.find({"order_id": order_id})
        deliveries = []
        async for delivery_data in cursor:
            deliveries.append(Delivery(**delivery_data))
        return deliveries

    @staticmethod
    async def create_delivery(delivery: Delivery) -> Delivery:
        collection = db.get_database().deliveries
        delivery_dict = delivery.dict(by_alias=True)
        result = await collection.insert_one(delivery_dict)
        delivery.id = result.inserted_id
        return delivery

class FinanceService:
    @staticmethod
    async def get_finances_by_order(order_id: str) -> List[FinanceRecord]:
        collection = db.get_database().finances
        cursor = collection.find({"order_id": order_id})
        finances = []
        async for finance_data in cursor:
            finances.append(FinanceRecord(**finance_data))
        return finances

    @staticmethod
    async def create_finance_record(finance: FinanceRecord) -> FinanceRecord:
        collection = db.get_database().finances
        finance_dict = finance.dict(by_alias=True)
        result = await collection.insert_one(finance_dict)
        finance.id = result.inserted_id
        return finance

class ProductionService:
    @staticmethod
    async def get_production_records_by_product(product_id: str) -> List[ProductionRecord]:
        collection = db.get_database().production
        cursor = collection.find({"product_id": product_id})
        records = []
        async for record_data in cursor:
            records.append(ProductionRecord(**record_data))
        return records

    @staticmethod
    async def create_production_record(record: ProductionRecord) -> ProductionRecord:
        collection = db.get_database().production
        record_dict = record.dict(by_alias=True)
        result = await collection.insert_one(record_dict)
        record.id = result.inserted_id
        return record

class AuditService:
    @staticmethod
    async def log_audit_event(log: AuditLog) -> AuditLog:
        collection = db.get_database().audit_logs
        log_dict = log.dict(by_alias=True)
        result = await collection.insert_one(log_dict)
        log.id = result.inserted_id
        return log
