import os
from fastapi import FastAPI, UploadFile, status
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
def upload(image: UploadFile, title: str = "Image", desc: str = "No Description Available", date: str = "1/1/2000"):

    file_size = os.fstat(image.file.fileno()).st_size
    file_name = title+(date.replace("/","_"))
    try:
        minio_client.put_object(bucket, file_name, image.file, file_size, image.content_type)
        publicUrl = baseUrl+bucket+"/"+parse.quote(file_name)
    except InvalidResponseError as err:
        return {"message": err.message}

    post = Post(
        title=title,
        description=desc,
        src=publicUrl,
        date=date,
    )

    json_post = jsonable_encoder(post)
    new_student = db[settings.MONGO_INITDB_DATABASE].insert_one(json_post)
    created_student = db[settings.MONGO_INITDB_DATABASE].find_one({"_id": new_student.inserted_id})
    

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_student)

@app.get("/images")
def get_image_urls():
    try:
        objects = minio_client.list_objects(bucket, recursive=True)
        image_urls = []
        for obj in objects:
            image_url = minio_client.presigned_get_object(
                bucket, obj.object_name)
            image_urls.append(image_url.split(
                "?")[0].replace("minio", "127.0.0.1"))
        return {"image_urls": image_urls}
    except InvalidResponseError as err:
        return {"message": err.message}
