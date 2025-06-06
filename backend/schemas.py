from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    email: str
    password: str
    organization: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserRead(BaseModel):
    id: int
    email: str
    organization: str

    class Config:
        orm_mode = True


class AssetBase(BaseModel):
    name: str
    owner: str


class AssetCreate(AssetBase):
    pass


class AssetUpdate(AssetBase):
    pass


class AssetRead(AssetBase):
    id: int

    class Config:
        orm_mode = True


class StockItemBase(BaseModel):
    name: str
    quantity: int
    location: Optional[str] = None


class StockItemCreate(StockItemBase):
    pass


class StockItemUpdate(StockItemBase):
    pass


class StockItemRead(StockItemBase):
    id: int

    class Config:
        orm_mode = True
