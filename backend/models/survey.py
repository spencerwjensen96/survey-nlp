import uuid
from pydantic import BaseModel, Field

class Survey(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    title: str = Field()
    description: str = Field()
    questions: list = Field(default_factory=list)

    # class Config:
    #     allow_population_by_field_name = True
    #     schema_extra = {
    #         "example": {
    #             "_id": "123456",
    #             "title": "Survey Title",
    #             "description": "Survey Description",
    #             "questions": ["1", "2", "3"]
    #         }
    #     }