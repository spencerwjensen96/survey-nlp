from fastapi import FastAPI
import uvicorn
from pymongo import MongoClient
from routes.survey import router as survey

app = FastAPI()

@app.on_event("startup")
async def startup():
    app.mongodb_client = MongoClient("mongodb://user:password@mongo&directConnection=True")
    app.database = app.mongodb_client['survey']
    print("Connected to the MongoDB database!")

@app.on_event("shutdown")
async def shutdown():
    app.mongodb_client.close()

app.include_router(survey, tags=["survey"], prefix="/survey")

@app.get("/")
def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)