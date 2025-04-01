from typing import Union
from fastapi import FastAPI, File, Request, UploadFile
from pydantic import BaseModel
# Database functions
from db import *


# Schemas
class Todo(BaseModel):
    title: str
    description: str | None = None
    isComplete: float



app = FastAPI()


# Routes
@app.get("/")
def read_root():
    return {"Hello": "World"}


# Todos
@app.get("/todos")
def read():
    return get_todos()

@app.get("/todos/{todo_id}")
def read_all(todo_id: str):
    return get_todo(todo_id)


@app.post("/todos")
async def create(request: Request):
    data = await request.json()
    return create_todo(data)

@app.patch("/todos/{todo_id}")
async def update(request: Request, todo_id: str):
    data = await request.json()
    return update_todos(todo_id, data)

@app.delete("/todos/{todo_id}")
async def delete(todo_id: str):
    return delete_todo(todo_id)




# File upload
@app.post("/files")
async def create_upload_file(file: UploadFile):
    return {"filename": file.filename}