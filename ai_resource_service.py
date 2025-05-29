from fastapi import FastAPI, Request
from pydantic import BaseModel
from resource_gen import generate_resource  # Your AI logic

app = FastAPI()

class ResourceRequest(BaseModel):
    topic: str
    domain: str

@app.post("/resource-generator")
def resource_generator(req: ResourceRequest):
    html = generate_resource(req.topic, req.domain)
    return {"title": req.topic.title(), "html": html}