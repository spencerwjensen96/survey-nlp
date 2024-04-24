from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models.survey import Survey
from config import connection

survey = APIRouter()

@survey.post("/", response_description="Create a new survey", status_code=status.HTTP_201_CREATED, response_model=Survey)
def create_survey(request: Request, survey: Survey = Body(...)):
    survey = jsonable_encoder(survey)
    new_survey = request.app.database["survey"].insert_one(survey)
    created_survey = request.app.database["survey"].find_one(
        {"_id": new_survey.inserted_id}
    )
    return create_survey

@survey.get("/", response_description="List all surveys", response_model=List[Survey])
def list_surveys(request: Request):
    surveys = list(request.app.database["survey"].find(limit=100))
    return surveys