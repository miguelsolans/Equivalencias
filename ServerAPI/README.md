# API Server

## Running the Application

There are several steps in order to start the API Server. First off, it is important to install all dependencies defined under package JSON file. In order to do such, it is important to run the following command under the same package JSON file directory.
 
```
$ npm install 
```  

Before running the server, one must configure required app parameters, such database connection string, running Port and other import details. This can be done on the `.env` file, under the same directory as the package JSON file. 

```
APP_PORT=3030      # Leave it this way, if you use this app via frontend Vue app
APP_URL=http://localhost:3030      # Leave it this way, if you use this app via frontend Vue app
API_URL=http://localhost:3030/api      # Leave it this way, if you use this app via frontend Vue app

MONGO_CONNECTION=YOUR_MONGO_DB_CONNECTION_STRING

# You can leave the last parameters as they are
AUTH_SECRET=anticonstitucionalissimamente
AUTH_TOKEN_TIMETOLIVE=1h
AUTH_TOKEN_ALGORITHM: RS256
```


After successfully completing the steps above, you can finally run the Application by using two distinct commands under equally distinct environments 

1. Run application in production mode 
```
$ npm start
```

2. Run application in development mode: routes requests will be displayed for debugging purposes 
```
$ npm test
```

## Running with Docker

You can also run the API Server as a microservice by using Docker, with very few steps

1. Go to the same directory as Dockerfile and build an image
```
$ docker build -t mantis-backend .
```
2. Run the image 
```
$ docker run -p mantis-backend
```

This server, unlike the previous chapter, will always run on production mode.

