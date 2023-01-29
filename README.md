<img width="357" alt="screen shot 2018-03-20 at 10 45 11 pm" src="https://user-images.githubusercontent.com/8520661/37696081-290403f0-2c91-11e8-9611-2ee8cbbfe877.png">

## Features

1. show random "Deepak Chopra Quote".
2. put docker container to [bibbynet/cowsay-node](https://hub.docker.com/r/bibbynet/cowsay-node). 
 

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
    image: bibbynet/cowsay-node
    ports:
      - 8080:8080
```

## demo
https://cowsay.onrender.com


Enjoy it. ^_____^ ..
