# Motorcycle Bubble Popping Game (PHP)

This is a slimmed down version of the Motorcycle bubble popping game, built in PHP.
An API call is made to the BikeFree.TV website to get a list of motorcycle videos. The thumbnails are used as options for the bubbles you can pop.
If you want the full version build with Node.js and with MongoDB, use the Master branch (https://github.com/jasonmichels/motorcycle-bubbles)
If you want the slimmed down version built in Node.js, checkout the repo and use the simple-node branch.
The easiest way to run this PHP application is to have a new version of PHP installed, and to run the following commands.

### Run Game
```sh
$ composer install
$ bower install
$ cd public
$ php -S localhost:8000
```

### Run Unit Tests
```sh
$ vendor/bin/phing test
```

### Alternative Run With Docker Compose
```sh
$ composer install
$ bower install
$ docker-compose up -d
```

Once you have the application running, you can access it from http://localhost:8000/ or port 9000 if using Docker Compose and using the Docker IP address.

### License
This code is maintained by Jason Michels and open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)