from pydantic import BaseModel

class JobCreate(BaseModel):
    title: str
    price: float

class JobUpdate(BaseModel):
    title: str
    price: float