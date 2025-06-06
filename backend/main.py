from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from passlib.context import CryptContext

from .database import SessionLocal, engine, Base
from . import models, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Calioris API")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

@app.post("/signup", response_model=schemas.UserRead)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    org = db.query(models.Organization).filter(models.Organization.name == user.organization).first()
    if not org:
        org = models.Organization(name=user.organization)
        db.add(org)
        db.flush()

    db_user = models.User(
        email=user.email,
        hashed_password=get_password_hash(user.password),
        organization=org,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return schemas.UserRead(id=db_user.id, email=db_user.email, organization=org.name)

@app.post("/login", response_model=schemas.UserRead)
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == credentials.email).first()
    if not db_user or not verify_password(credentials.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    org = db_user.organization.name if db_user.organization else None
    return schemas.UserRead(id=db_user.id, email=db_user.email, organization=org)


@app.post("/assets", response_model=schemas.AssetRead)
def create_asset(asset: schemas.AssetCreate, db: Session = Depends(get_db)):
    db_asset = models.Asset(name=asset.name, owner=asset.owner)
    db.add(db_asset)
    db.commit()
    db.refresh(db_asset)
    return db_asset


@app.get("/assets", response_model=List[schemas.AssetRead])
def list_assets(db: Session = Depends(get_db)):
    return db.query(models.Asset).all()


@app.get("/assets/{asset_id}", response_model=schemas.AssetRead)
def get_asset(asset_id: int, db: Session = Depends(get_db)):
    asset = db.query(models.Asset).filter(models.Asset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset


@app.put("/assets/{asset_id}", response_model=schemas.AssetRead)
def update_asset(asset_id: int, asset_update: schemas.AssetUpdate, db: Session = Depends(get_db)):
    asset = db.query(models.Asset).filter(models.Asset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    asset.name = asset_update.name
    asset.owner = asset_update.owner
    db.commit()
    db.refresh(asset)
    return asset


@app.delete("/assets/{asset_id}")
def delete_asset(asset_id: int, db: Session = Depends(get_db)):
    asset = db.query(models.Asset).filter(models.Asset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    db.delete(asset)
    db.commit()
    return {"detail": "deleted"}


@app.post("/stock_items", response_model=schemas.StockItemRead)
def create_stock_item(item: schemas.StockItemCreate, db: Session = Depends(get_db)):
    db_item = models.StockItem(
        name=item.name, quantity=item.quantity, location=item.location
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.get("/stock_items", response_model=List[schemas.StockItemRead])
def list_stock_items(db: Session = Depends(get_db)):
    return db.query(models.StockItem).all()


@app.get("/stock_items/{item_id}", response_model=schemas.StockItemRead)
def get_stock_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.StockItem).filter(models.StockItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.put("/stock_items/{item_id}", response_model=schemas.StockItemRead)
def update_stock_item(
    item_id: int, item_update: schemas.StockItemUpdate, db: Session = Depends(get_db)
):
    item = db.query(models.StockItem).filter(models.StockItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    item.name = item_update.name
    item.quantity = item_update.quantity
    item.location = item_update.location
    db.commit()
    db.refresh(item)
    return item


@app.delete("/stock_items/{item_id}")
def delete_stock_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.StockItem).filter(models.StockItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"detail": "deleted"}
