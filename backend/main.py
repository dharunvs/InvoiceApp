from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.dialects.postgresql import JSONB

from dotenv import load_dotenv
import os

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Database models
class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)

class WebpageContent(Base):
    __tablename__ = "webpagecontent"
    id = Column(Integer, primary_key=True, index=True)
    language = Column(String, index=True)
    content = Column(JSONB)

class PriceList(Base):
    __tablename__ = "pricelist"
    id = Column(Integer, primary_key=True, index=True)
    articleno = Column(String, index=True)
    productservice = Column(Text)
    inprice = Column(Integer)
    price = Column(Integer)
    unit = Column(Text)
    instock = Column(Integer)
    description = Column(Text)

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root(db: Session = Depends(get_db)):
    return {"Hello": "World"}

@app.get("/webpagecontent/{lang}")
def read_item(lang: str, db: Session = Depends(get_db)):
    item = db.query(WebpageContent).filter(WebpageContent.language == lang).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.get("/pricelist/")
def read_pricelist(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    pricelist = db.query(PriceList).offset(skip).limit(limit).all()
    return pricelist

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)