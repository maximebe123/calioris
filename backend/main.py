from fastapi import FastAPI

from .database import Base, engine
from .routers import assets, stock_items, users

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Calioris API")

app.include_router(users.router)
app.include_router(assets.router)
app.include_router(stock_items.router)
