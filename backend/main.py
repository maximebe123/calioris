from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
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
