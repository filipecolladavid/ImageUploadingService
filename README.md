# User Management and Image Upload API

This is starter project for a social media API developed with [FastAPI](https://fastapi.tiangolo.com/), [MongoDB](https://www.mongodb.com/) and [MinIO](https://min.io/). It provides functionalities such as user registration, user authentication and authorization, creating and updating posts, and changing user settings. The API also implements token-based authentication using OAuth2 for security. The API is developed using the RESTful architectural style and is designed to be scalable, performant, and easy to use. The project serves as a template for developers looking to create social media like applications using FastAPI and MongoDB.




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

MongoDB

`MONGO_INITDB_ROOT_USERNAME`

`MONGO_INITDB_ROOT_PASSWORD`

`MONGO_INITDB_DATABASE`

`DATABASE_URL`


JWT

`ACCESS_TOKEN_EXPIRES_IN`

`REFRESH_TOKEN_EXPIRES_IN`

`JWT_ALGORITHM`

`JWT_PRIVATE_KEY` 

`JWT_PUBLIC_KEY`
## Usage

```bash
  docker-compose up
```

And start development - backend has auto-reload enabled in the docker-container
## Running Tests

To run tests, the database must be empty. Go to the ```backend/src/tests``` directory and run the following command:

```bash
  pytest
```
or
```bash
  pytest -v 
```
for a more detailed view of each individual test

## Roadmap

- Add endpoints to retreive users it's own posts
- Improve MinIO storage organization

