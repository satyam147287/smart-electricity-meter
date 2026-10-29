
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from database import engine, Base, SessionLocal
import models
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
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
def home():
    return {"message": "Smart Electricity Meter API is running"}


@app.post("/meter")
def create_meter(
    meter: schemas.MeterCreate,
    db: Session = Depends(get_db)
):
    new_meter = models.Meter(
        meter_id=meter.meter_id,
        customer_id=meter.customer_id,
        current_reading=meter.current_reading
    )

    try:
        db.add(new_meter)
        db.commit()
        db.refresh(new_meter)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Ye Meter ID pehle se maujood hai."
        )

    return new_meter


@app.get("/meter")
def get_meters(db: Session = Depends(get_db)):
    return db.query(models.Meter).all()



@app.put("/meter/{meter_id}")
def update_meter(
    meter_id: int,
    current_reading: int,
    db: Session = Depends(get_db)
):
    meter = db.query(models.Meter).filter(
        models.Meter.meter_id == meter_id
    ).first()

    if meter is None:
        raise HTTPException(
            status_code=404,
            detail="Meter nahi mila."
        )

    if current_reading < meter.current_reading:
        raise HTTPException(
            status_code=400,
            detail="New reading current reading se kam nahi ho sakti."
        )

    meter.previous_reading = meter.current_reading
    meter.current_reading = current_reading

    db.commit()
    db.refresh(meter)

    return meter


@app.get("/meter/{meter_id}/bill")
def calculate_bill(
    meter_id: int,
    db: Session = Depends(get_db)
):
    meter = db.query(models.Meter).filter(
        models.Meter.meter_id == meter_id
    ).first()

    if meter is None:
        raise HTTPException(
            status_code=404,
            detail="Meter nahi mila."
        )

    units_consumed = (
        meter.current_reading - meter.previous_reading
    )

    rate_per_unit = 8
    total_bill = units_consumed * rate_per_unit

    return {
        "meter_id": meter.meter_id,
        "previous_reading": meter.previous_reading,
        "current_reading": meter.current_reading,
        "units_consumed": units_consumed,
        "rate_per_unit": rate_per_unit,
        "total_bill": total_bill
    }
