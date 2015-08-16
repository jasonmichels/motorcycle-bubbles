# Motorcycle Bubble Popping Game

### Installation Locally For Development (Environment variables need set locally)
```sh
$ cd motorcycle-bubbles && npm install
$ DEBUG=motorcycle-bubbles:* npm start
```

### Development with Docker
```sh
$ docker build -t jasonmichels/motorcycle-bubbles .
$ docker run -it -p 3000:3000 -e "PORT=3000" --rm --name motorcycle-bubbles jasonmichels/motorcycle-bubbles
```

### Production Docker
```sh
$ docker build -t jasonmichels/motorcycle-bubbles .
$ docker run -d -p 3000:3000 -e "PORT=3000" --rm --name motorcycle-bubbles jasonmichels/motorcycle-bubbles
```

### Development with Docker Composer
```sh
$ docker-compose up -d
```

### Debugging
To debug ExpressJS framework during development, add the following environment variable to the docker run command
- DEBUG=history-service:*

### Dependencies
 - Running Mongodb server. Suggest using docker and https://registry.hub.docker.com/u/tutum/mongodb/
 ```sh
 $ docker run -d -e AUTH=no --name mongodb tutum/mongodb
 ```