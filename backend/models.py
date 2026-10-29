from sqlalchemy import Column, Integer, Float
from database import Base


class Meter(Base):
    __tablename__ = "meters"

    id = Column(Integer, primary_key=True, index=True)
    meter_id = Column(Integer, unique=True, index=True)
    customer_id = Column(Integer)
    current_reading = Column(Float, default=0)
    previous_reading = Column(Float, default=0)