import json, os
from fastapi import FastAPI, UploadFile
from minio import Minio, InvalidResponseError

app = FastAPI()

minio_client = Minio(
    "minio:9000",
    access_key="minio",
    secret_key="minio123",
    secure=False
)

bucket = "media"

if not minio_client.bucket_exists(bucket):
    minio_client.make_bucket(bucket)

bucket_policy = json.dumps(
    {
        "Statement": [
            {
                "Action": ["s3:GetBucketLocation", "s3:ListBucket"],
                "Effect": "Allow",
                "Principal": {
                    "AWS": ["*"]
                },
                "Resource": [f"arn:aws:s3:::{bucket}"]
            }, {
                "Action": ["s3:GetObject"],
                "Effect": "Allow",
                "Principal": {
                    "AWS": ["*"]
                },
                "Resource": [f"arn:aws:s3:::{bucket}/*"]
            }],
        "Version": "2012-10-17"
    }
)

result = minio_client.set_bucket_policy(bucket, bucket_policy)

@app.get("/")
def get_root():
    return {"status":"ok"}

@app.post("/upload")
def upload(image: UploadFile, name: str = "Image", desc: str = "No Description Available"):
    file_size = os.fstat(image.file.fileno()).st_size
    try:
        minio_client.put_object(bucket, "test.png", image.file, file_size, image.content_type)
        publicUrl = "https://minio:9000"+"/"+bucket+"/"+"test.png"
        return {"message": publicUrl}
    except InvalidResponseError as err:
        return {"message": err.message}
