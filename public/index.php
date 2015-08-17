<?php
require '../vendor/autoload.php';

use JasonMichels\Repositories\GameRepository;

$app = new \Slim\Slim();
$app->config(array(
    'debug' => true,
    'templates.path' => '../src/templates'
));

/**
 * Home page to show the game and load the bubbles
 */
$app->get('/', function () use ($app) {
    $gameRepo = new GameRepository();
    $app->render('template.php', array('videos' => $gameRepo->getBubbles()));
});

$app->run();