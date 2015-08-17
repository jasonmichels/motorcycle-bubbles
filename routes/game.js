var express = require('express');
var router = express.Router();
var GameRepository = require('../repositories/gameRepository');

/**
 * API to end specific game
 */
router.post('/:gameId/end', function(req, res, next) {

    var gameId = req.params.gameId;
    var json = req.body;

    var gameRepo = new GameRepository();

    gameRepo.on('success', function (result) {
        res.json({ data: result, message: "Your game has successfully ended and been saved. Please play again!" });
    }).on('error', function (err) {
        res.status(400);
        res.json({error: err, message: "An error occurred trying to end your game. Please try again."});
    });

    gameRepo.endGame(gameId, json);
});

module.exports = router;