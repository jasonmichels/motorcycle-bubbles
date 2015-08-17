# Motorcycle Bubble Popping Game

The easiest way to run this full application is to use Docker (http://docs.docker.com/mac/started/) and Docker Compose.
Once docker is installed you can use docker-compose tool to get application environment setup and running.
This will setup the application, a mongo database, and a circuit breaker analytics platform I have built using Node.js.

### Development with Docker Compose
```sh
$ bower install
$ docker-compose up -d
```

Once you have the application running, you can access it from the docker-machine ip address, using port 3000. eg. (http://192.168.99.100:3000)
The circuit breaker analytics can be accessed from the same ip with port 3001, and with url /dashboard. eg. (http://192.168.99.100:3001/dashboard)
If you are having issues getting Docker setup, I have setup a different branch on Github that has a slimmed down version of the app you can use.  Directions are in that README.md file.

### License
This code is maintained by Jason Michels and open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)