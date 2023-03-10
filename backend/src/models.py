from typing import Optional
from bson import ObjectId
from pydantic import BaseModel, Field


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class Post(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    author: str = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    src: str = Field(...)
    date: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "title": "My Picture",
                "description": "Picture taken at Lake with Ducks",
                "src": "src/bucket/media",
                "date": "1/1/2000"
            }
        }
        
class UpdatePost(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    src: Optional[str] = None
    date: Optional[str] = None

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "title": "My Picture [Optional]",
                "description": "Picture taken at Lake with Ducks [Optional]",
                "src": "src/bucket/media [Optional]",
                "date": "1/1/2000 [Optional]"
            }
        }
