from pydantic import BaseModel
from starlette.responses import StreamingResponse

class Todo(BaseModel):
    title: str
    description : str