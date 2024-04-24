import uuid
from enum import Enum

class Question:
    def __init__(self, question, question_type):
        self.uuid = uuid.uuid4()
        self.question = question
        self.question_type = question_type

    def create(self):
        # Code to create a new question in the survey database
        pass

    def read(self, question_id):
        # Code to retrieve a specific question from the survey database
        pass

    def update(self, question = None, question_type = None):
        # Code to update the question in the survey database
        pass

    def delete(self):
        # Code to delete the question from the survey database
        pass

class QuestionType(Enum):
    MULTIPLE_CHOICE = "Multiple Choice"
    SHORT_ANSWER = "Short Answer"
    RANKING = "Ranking"
    TRUE_FALSE = "True/False"
    # Add more question types as needed
