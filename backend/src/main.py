import os
from datetime import datetime
from typing import List
from fastapi import Body, FastAPI, HTTPException, Response, UploadFile, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from minio import InvalidResponseError
from urllib import parse
from .storage import bucket, minio_client
from .database import db
from .models import Post, UpdatePost
from .config import settings

# Using for testing 127.0.0.1
baseUrl = "http://127.0.0.1:9000/"
# minio:9000

allowed_types = ['image/png', 'image/jpeg']

app = FastAPI()


@app.get("/")
def get_root():
    return {"status": "ok"}


# Upload a file with a title and description
@app.post(
    "/upload",
    response_description="Post created successful",
    status_code=status.HTTP_201_CREATED,
    responses={
        400: {"descriprion": "Invalid type of file"},
        500: {"description": "Internal error"}
    },
)
async def upload(image: UploadFile, title: str = "Image", desc: str = "No Description Available"):

    if image.content_type not in allowed_types:
        return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid type of file")

    file_size = os.fstat(image.file.fileno()).st_size
    file_name = title+datetime.now().strftime("%m%d%Y%H%M%S")+"." + \
        image.content_type.split("/")[1]
    try:
        minio_client.put_object(
            bucket, file_name, image.file, file_size, image.content_type)
        publicUrl = baseUrl+bucket+"/"+parse.quote(file_name)
    except InvalidResponseError as err:
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=err.message)

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


# Get a list of all the images
@ app.get("/images", response_description="List all images", response_model=List[Post])
async def get_image_urls():
    posts = await db[settings.MONGO_INITDB_DATABASE].find().to_list(1000)
    return posts


# Update an image based on an ID
@ app.put(
    "/{id}",
    response_description="Post updated",
    response_model=Post, status_code=status.HTTP_202_ACCEPTED,
    responses={
        404: {"description": "Post not found"}
    }
)
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


# Delete an image, given its ID
@ app.delete(
    "/{id}",
    response_description="Post deleted",
    status_code=204,
    responses={404: {"description": "Post not found"}}
)
async def delete_post(id: str):
    result = await db[settings.MONGO_INITDB_DATABASE].delete_one({"_id": id})

    print(result.deleted_count)

    if result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT, content="Post deleted with success")
    else:
        raise HTTPException(status_code=404, detail=f"Post {id} not found")
