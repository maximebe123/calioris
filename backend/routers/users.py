from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..dependencies import get_db, get_password_hash, verify_password

router = APIRouter()


@router.post("/signup", response_model=schemas.UserRead)
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


@router.post("/login", response_model=schemas.UserRead)
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == credentials.email).first()
    if not db_user or not verify_password(credentials.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    org = db_user.organization.name if db_user.organization else None
    return schemas.UserRead(id=db_user.id, email=db_user.email, organization=org)
