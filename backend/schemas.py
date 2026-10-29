
from pydantic import BaseModel


class MeterCreate(BaseModel):
    meter_id: int
    customer_id: int
    current_reading: float = 0
