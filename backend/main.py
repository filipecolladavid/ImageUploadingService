import os
from datetime import datetime
from typing import List
from fastapi import Body, FastAPI, HTTPException, Response, UploadFile, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from minio import InvalidResponseError
from urllib import parse
from storage import minio_client, bucket
from database import db
from models import Post, UpdatePost
from config import settings

app = FastAPI()


@app.get("/")
def get_root():
    return {"status": "ok"}

# minio:9000 using for testing 127.0.0.1
baseUrl = "http://127.0.0.1:9000/"


@app.post("/upload")
async def upload(image: UploadFile, title: str = "Image", desc: str = "No Description Available"):

    file_size = os.fstat(image.file.fileno()).st_size
    file_name = title+datetime.now().strftime("%m%d%Y%H%M%S")+"."+image.content_type.split("/")[1]
    try:
        minio_client.put_object(bucket, file_name, image.file, file_size, image.content_type)
        publicUrl = baseUrl+bucket+"/"+parse.quote(file_name)
    except InvalidResponseError as err:
        return {"message": err.message}

    post = Post(
        title=title,
        description=desc,
        src=publicUrl,
        date=datetime.now().strftime("%m_%d_%Y_%H_%M_%S"),
    )

    json_post = jsonable_encoder(post)
    new_post = await db[settings.MONGO_INITDB_DATABASE].insert_one(json_post)
    created_post = await db[settings.MONGO_INITDB_DATABASE].find_one({"_id": new_post.inserted_id})
    

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_post)

@app.get("/images", response_description="List all images", response_model = List[Post])
async def get_image_urls():
    posts = await db[settings.MONGO_INITDB_DATABASE].find().to_list(1000)
    return posts

@app.put("/{id}", response_description="Update a post", response_model=Post)
async def update_post(id: str, post: UpdatePost = Body(...)):
    post = {k: v for k, v in post.dict().items() if v is not None}

    if len(post) >= 1:
        update_result = await db[settings.MONGO_INITDB_DATABASE].update_one({"_id": id}, {"$set": post})

        if update_result.modified_count == 1:
            if (
                updated_post := await db[settings.MONGO_INITDB_DATABASE].find_one({"_id": id})
            ) is not None:
                return updated_post

    if (existing_post := await db[settings.MONGO_INITDB_DATABASE].find_one({"_id": id})) is not None:
        return existing_post

    raise HTTPException(status_code=404, detail=f"Post {id} not found")

@app.delete("/{id}", response_description="Delete a post")
async def delete_post(id: str):
    delete_result = await db[settings.MONGO_INITDB_DATABASE].delete_one({"_id": id})
    print(delete_result.deleted_count)

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    else:
        raise HTTPException(status_code=404, detail=f"Post {id} not found")
