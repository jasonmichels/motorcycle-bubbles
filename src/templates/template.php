<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Motorcycle Bubble Popping Game</title>
    <link href="/stylesheets/global.css" rel="stylesheet">
    <script src="/components/jquery/dist/jquery.min.js"></script>
    <link href="/components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="/components/bootstrap/dist/css/bootstrap-theme.min.css" rel="stylesheet">
</head>
<body>

<div class="jumbotron">
    <div class="container">
        <h1>Motorycle Bubble Popping Game</h1>
        <p>Simple game popping bubbles made out of pictures of motorcycles</p>
        <p><a class="btn btn-primary btn-lg js-start-game" href="#" role="button">Start Game »</a></p>
    </div>
</div>

<div class="container-fluid">
    <div class="row">

        <div class="col-md-7">
            <canvas id="canvasBubbles" width="750" height="600">Canvas not supported</canvas>
        </div>

        <div class="col-md-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">Statistics</div>
                        <div class="panel-body">
                            <div class="btn-group btn-group-lg" role="group" aria-label="...">
                                <button type="button" class="btn btn-success js-new-game">New Game</button>
                                <button type="button" class="btn btn-danger js-end-game">End Game</button>
                            </div>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item">Popped: <span id="js-popped-bubbles-text">0</span></li>
                            <li class="list-group-item">Missed: <span id="js-missed-bubbles-text">0</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="alert alert-info" role="alert">Choose the image to use as your bubble in the game. This can be changed mid-game.</div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <?php
                    foreach ($videos as $video) {
                    ?>
                        <a href="#" class="js-choose-bubble-image">
                            <img class="bubble-thumb" src="<?= htmlspecialchars(strip_tags(stripslashes($video["thumbnail"])), ENT_QUOTES); ?>" alt="<?= htmlspecialchars(strip_tags(stripslashes($video["title"])), ENT_QUOTES); ?>">
                        </a>
                    <?php
                    }
                    ?>
                </div>
            </div>
        </div>

    </div>
</div>

<script src="/components/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="/javascripts/global.js"></script>
<script src="/components/innodb-optimized-uuid/dist/innodb-optimized-uuid.js"></script>
</body>
</html>