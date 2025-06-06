from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..dependencies import get_db

router = APIRouter(prefix="/stock_items", tags=["stock_items"])


@router.post("/", response_model=schemas.StockItemRead)
def create_stock_item(item: schemas.StockItemCreate, db: Session = Depends(get_db)):
    db_item = models.StockItem(name=item.name, quantity=item.quantity, location=item.location)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.get("/", response_model=List[schemas.StockItemRead])
def list_stock_items(db: Session = Depends(get_db)):
    return db.query(models.StockItem).all()


@router.get("/{item_id}", response_model=schemas.StockItemRead)
def get_stock_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.StockItem).filter(models.StockItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.put("/{item_id}", response_model=schemas.StockItemRead)
def update_stock_item(item_id: int, item_update: schemas.StockItemUpdate, db: Session = Depends(get_db)):
    item = db.query(models.StockItem).filter(models.StockItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    item.name = item_update.name
    item.quantity = item_update.quantity
    item.location = item_update.location
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def delete_stock_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.StockItem).filter(models.StockItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"detail": "deleted"}
