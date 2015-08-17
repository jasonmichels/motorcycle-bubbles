# Motorcycle Bubble Popping Game

This is a slimmed down version of the bubble popping game found in the master and develop branches.
This simplified version will not rely on external dependencies such as MongoDB or the circuit breaker analytics platform.

### Installation Locally For Development
```sh
$ cd motorcycle-bubbles && npm install
$ bower install
$ DEBUG=motorcycle-bubbles:* BUBBLES_BASE_URL=bikefree.tv npm start
```

Once you have the application running, you can access it at http://localhost:3000/

### License
This code is maintained by Jason Michels and open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)