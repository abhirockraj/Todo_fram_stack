from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from  database import (fetch_one_todo,fetch_all_todos,create_todo,update_todo,remove_todo,)
from model import Todo
app = FastAPI()

origins = ['http://localhost:3000',]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials =True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/app/todo")
async def get_todo():
    reponse = await fetch_all_todos()
    return(reponse)

@app.get("/app/todo{title}",response_model= Todo)
async def get_todo_by_id(title):
    response=await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404 ,"There is no todo list with this item")

@app.post("/app/todo", response_model=Todo)
async def post_todo(todo:Todo):
    response = await create_todo(todo.dict())
    if(response):
        return response
    raise HTTPException(400, "Something went wrong")


@app.put("/app/todo{title}/",response_model=Todo)
async def put_todo(title:str,desc:str):
    response =   await update_todo(title,desc)
    if(response):
        return response
    raise HTTPException(404, f"No todo item is presnt like this {title}")   

@app.delete("/app/todo{title}")
async def delete_todo(title):
    response =   await remove_todo(title)
    if(response):
        return "Deleted successfully"
    raise HTTPException(404, f"No todo item is presnt like this {title}")