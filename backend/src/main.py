import os
from datetime import datetime
from typing import List
from fastapi import Body, FastAPI, UploadFile, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from minio import InvalidResponseError
from urllib import parse
from .storage import bucket, minio_client
from .database import db
from .models import Post, UpdatePost
from .config import settings


# Using for testing 127.0.0.1
baseUrl = "http://0.0.0.0:9000/"
# minio:9000

allowed_types = ['image/png', 'image/jpeg']

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CLIENT_ORIGIN,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def get_root():
    return {"status": "ok"}


# Upload a file with a title and description
@app.post(
    "/upload",
    status_code=status.HTTP_201_CREATED,
    response_model=Post,
    response_description="Post created successfully",
    responses={
        400: {"detail": "Invalid type of file"},
        500: {"detail": "Internal error"}
    },
)
async def upload(image: UploadFile, title: str = "Image", desc: str = "No Description Available", author: str = "Unknown"):

    if image.content_type not in allowed_types:
        return JSONResponse(status_code=400, content={"detail": "Invalid type of file"})

    file_size = os.fstat(image.file.fileno()).st_size
    file_name = title.replace(" ", "_")+datetime.now().strftime("%m%d%Y%H%M%S")+"." + \
        image.content_type.split("/")[1]
    try:
        minio_client.put_object(
            bucket, file_name, image.file, file_size, image.content_type)
        publicUrl = baseUrl+bucket+"/"+parse.quote(file_name)
    except InvalidResponseError as err:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=err.message)

    post = Post(
        title=title,
        author=author,
        description=desc,
        src=publicUrl,
        date=datetime.now().strftime("%m_%d_%Y_%H_%M_%S"),
    )

    json_post = jsonable_encoder(post)
    new_post = await db[settings.MONGO_INITDB_DATABASE].insert_one(json_post)
    created_post = await db[settings.MONGO_INITDB_DATABASE].find_one({"_id": new_post.inserted_id})

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_post)


# Get a post by id
@app.get(
    "/post/{id}",
    response_description="Get post by id",
    response_model=Post,
    status_code=status.HTTP_200_OK,
    responses={
        404: {"detail": "Post not found"}
    }
)
async def get_post(id: str):
    res = await db[settings.MONGO_INITDB_DATABASE].find_one({"_id": id})
    if not res:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"detail": "Post not found"})
    return res


# Update an image based on an ID
@app.put(
    "/post/{id}",
    response_description="Post updated",
    response_model=Post, status_code=status.HTTP_202_ACCEPTED,
    responses={
        404: {"detail": "Post not found"}
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

    raise JSONResponse(status_code=status.HTTP_404_NOT_FOUND,
                       content=f"Post {id} not found")


# Delete an image, given its ID
@app.delete(
    "/post/{id}",
    response_description="Post deleted",
    status_code=status.HTTP_200_OK,
    responses={
        400: {"detail": "Invalid type of file"},
        404: {"detail": "Post not found"},
        500: {"detail": "Internal error"}
    }
)
async def delete_post(id: str):

    obj = await db[settings.MONGO_INITDB_DATABASE].find_one({"_id": id})
    if not obj:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content=f"Post {id} not found")
    post = jsonable_encoder(obj)
    name = post["src"].split("/")[4]
    print(name)

    try:
       res = minio_client.remove_object(bucket, name)
       print(res)
    except InvalidResponseError as err:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=err.message)

    result = await db[settings.MONGO_INITDB_DATABASE].delete_one({"_id": id})

    if result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_200_OK, content="deleted")
    else:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content=f"Post {id} not found")


# Get a list of all the images
@app.get("/images", response_description="List all images", response_model=List[Post])
async def get_image_urls():
    posts = await db[settings.MONGO_INITDB_DATABASE].find().to_list(1000)
    return posts
