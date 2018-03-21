<img width="357" alt="screen shot 2018-03-20 at 10 45 11 pm" src="https://user-images.githubusercontent.com/8520661/37696081-290403f0-2c91-11e8-9611-2ee8cbbfe877.png">

## Features

1. add the random "Deepak Chopra Quote".
1. add Dockerfile in project.
2. put docker container to [bibbynet/express-cowsay](https://hub.docker.com/r/bibbynet/express-cowsay). 
 

## Build Container

```
docker build -t <YOUR CONTAINER NAME> .
```

## Run Container

```
docker run --rm -p 8080:8080 <YOUR CONTAINER NAME>
```

## docker-compose

```
version: "3.5"

services:
  cow-say: 
    build:
      context: ./
      dockerfile: ./Dockerfile
    ports:
      - 8080:8080
```

## docker-compose from Docker Hub

```
version: "3.5"

services:
  cow-say: 
    image: bibbynet/express-cowsay
    ports:
      - 8080:8080
```


Enjoy it. ^_____^ ..

Fork from [cassilup/cowsay-express](https://github.com/cassilup/cowsay-express).
