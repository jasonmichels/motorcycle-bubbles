var express = require('express');
var router = express.Router();
var GameRepository = require('../repositories/gameRepository');

/**
 * Get home page
 */
router.get('/', function(req, res, next) {

  var gameRepo = new GameRepository();

  gameRepo.on('success', function (result) {
    res.render('index', { result: result });
  }).on('error', function (err) {
    res.render('index', { result: null });
  });

  gameRepo.getBubbles();

});

module.exports = router;