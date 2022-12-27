
# Image Uploading/Sharing WebApp

This project is a simple example of an fullstack application 
for uploading, storing and sharing images. 



## Technologies used

**Frontend:** 
[React](https://reactjs.org/),
[React Bootstrap](https://react-bootstrap.github.io/)
and [React Icons](https://react-icons.github.io/react-icons)

**Backend:** [FastAPI](https://fastapi.tiangolo.com/)

**Database:** [MongoDB](https://www.mongodb.com/)

**Storage:** [MinIO](https://min.io/)




## Deployment

To run this project, you will need to install docker and create an .env file.
Save .env file in the root directory of the project with the following environment variables 

`MONGO_INITDB_ROOT_USERNAME=admin`__
`MONGO_INITDB_ROOT_PASSWORD=password123`__
`MONGO_INITDB_DATABASE=images`__
__
`DATABASE_URL=mongodb://admin:password123@mongodb:27017/images?authSource=admin&retryWrites=true&w=majority`__
__
`CLIENT_ORIGIN=http://localhost:3000`__
__
`MINIO_URL=minio:9000`__
`MINIO_ACCESS_KEY=minio`__
`MINIO_SECRET_KEY=minio123`__
`MINIO_SECURE=False`__

To start the webapp run the following command in the root directory of the project:

```bash
  docker-compose up -d --build
```

Once Docker created the containers you can access:

**Frontend:** 
```bash
  localhost:3000
````

**Backend Docs:**
```bash
  localhost:8000
```

**MinIO Console:**
```bash
http://localhost:9001/
```


## TODOs

- Unit Testing
- Styling

