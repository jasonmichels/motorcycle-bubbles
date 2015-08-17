/**
 * Generate Game object
 * @constructor
 */
function Game(){
    this.id = null;
    this.isActive = false;
    this.canvas = null;
    this.context = null;
    this.bufferCanvas = null;
    this.bufferCanvasCtx = null;
    this.x = 10;
    this.y = 10;
    this.bubbleArray = [];
    this.bubbleTimer = null;
    this.gameTimer = null;
    this.maxBubbles = 50;
    this.poppedBubbles = 0;
    this.missedBubbles = 0;
    this.maxAllowedMissedBubbles = 5;
    this.imageSrc = "https://s3.amazonaws.com/BikeFreeTv-Output/user_videos/2/92/thumbs/hd--00001.png";
}

GAME = new Game();

/**
 * Start the game
 */
GAME.gameStart = function()
{
    GAME.isActive = true;
    var iouuid = window.innodbOptimizedUuid;
    GAME.id = iouuid.generate();
    GAME.canvas  = document.getElementById("canvasBubbles");
    GAME.context = GAME.canvas.getContext("2d");
    GAME.bufferCanvas = document.createElement("canvas");
    GAME.bufferCanvasCtx = GAME.bufferCanvas.getContext("2d");
    GAME.bufferCanvasCtx.canvas.width = GAME.context.canvas.width;
    GAME.bufferCanvasCtx.canvas.height = GAME.context.canvas.height;

    GAME.bubbleTimer = setInterval(GAME.addBubble, 400);

    GAME.canvas.addEventListener('mousedown', GAME.bubblePop, false);
    GAME.canvas.addEventListener('touchstart', GAME.bubbleTouchPop, false);

    GAME.draw();

    GAME.gameTimer = window.setInterval(GAME.animate, 30);
};

/**
 * Animate the game at the set interval
 */
GAME.animate = function()
{
    GAME.update();
};

/**
 * Nuke all bubbles in the game
 *
 */
GAME.nuke = function()
{
    GAME.bubbleArray = [];
};

/**
 * User is touching on some bubbles, at least trying
 *
 * @param event
 */
GAME.bubbleTouchPop = function(event)
{
    var touchX = event.targetTouches[0].pageX - GAME.canvas.offsetLeft;
    var touchY = event.targetTouches[0].pageY - GAME.canvas.offsetTop;

    GAME.pop(touchX, touchY);
};

/**
 * User is using mouse to try to pop bubbles
 *
 * @param event
 */
GAME.bubblePop = function(event)
{
    var clickX = event.clientX - GAME.canvas.offsetLeft;
    var clickY = event.clientY - GAME.canvas.offsetTop;

    GAME.pop(clickX, clickY);
};

/**
 * Try to pop a bubble
 *
 * @param clickX
 * @param clickY
 */
GAME.pop = function(clickX, clickY)
{
    var popped = false;

    GAME.bubbleArray.forEach(function (bubble, index, array) {
        if(clickX >= bubble.x && clickX <= bubble.x + bubble.width && clickY >= bubble.y && clickY <= bubble.y + bubble.height){

            GAME.bubbleArray.splice(index, 1);
            GAME.poppedBubbles++;

            popped = true;
            return false;
        }
    });

    if(popped === false){
        GAME.missedBubbles++;
    }
};

/**
 * Update the game
 */
GAME.update = function()
{
    GAME.updateScores();

    if (GAME.missedBubbles >= GAME.maxAllowedMissedBubbles) {
        GAME.endGame();
    }

    GAME.bubbleArray.forEach(function (bubble) {
        if (bubble.y < GAME.context.canvas.height){

            bubble.y += bubble.speed;

            if (bubble.y > GAME.context.canvas.height){
                bubble.y = -5;
            }

            bubble.x += bubble.drift;

            if (bubble.x >= GAME.context.canvas.width){
                bubble.x = 0;
            }

        }
    });

    GAME.draw();
};

/**
 * Draw the game to the screen
 *
 * @returns {boolean}
 */
GAME.draw = function()
{
    GAME.context.save();

    GAME.blank();

    var img = new Image();
    img.src = GAME.imageSrc;

    GAME.bubbleArray.forEach(function (bubble) {
        GAME.bufferCanvasCtx.drawImage(img, bubble.x, bubble.y, bubble.width, bubble.height);
    });

    GAME.context.drawImage(GAME.bufferCanvas, 0, 0, GAME.bufferCanvas.width, GAME.bufferCanvas.height);
    GAME.context.restore();

    return true;
};

/**
 * Add another bubble to the array
 */
GAME.addBubble = function()
{
    GAME.bubbleArray[GAME.bubbleArray.length] = new BUBBLE();

    if(GAME.bubbleArray.length == GAME.maxBubbles){
        clearInterval(GAME.bubbleTimer);
    }
};

/**
 * Canvas fill
 */
GAME.blank = function()
{
    GAME.bufferCanvasCtx.fillStyle = "rgba(0,0,0,0.8)";
    GAME.bufferCanvasCtx.fillRect(0, 0, GAME.bufferCanvasCtx.canvas.width, GAME.bufferCanvasCtx.canvas.height);
};

/**
 * Update users scores
 */
GAME.updateScores = function ()
{
    $("#js-popped-bubbles-text").text(GAME.poppedBubbles);
    $("#js-missed-bubbles-text").text(GAME.missedBubbles);
};

/**
 * End the game
 */
GAME.endGame = function ()
{
    clearInterval(GAME.bubbleTimer);
    clearInterval(GAME.gameTimer);
    GAME.isActive = false;

    alert('Game is over, you missed too many bubbles: ' + GAME.missedBubbles);

    GAME.poppedBubbles = 0;
    GAME.missedBubbles = 0;
    GAME.nuke();
    GAME.id = null;
};

/**
 * A bubble object
 *
 * @constructor
 */
function BUBBLE()
{
    this.x = Math.round(Math.random() * GAME.context.canvas.width);
    this.y = -10;
    this.drift = Math.random();
    this.speed = Math.round(Math.random() * 5) + 1;
    this.width = 100;
    this.height = 100;
}

var MOTORCYCLE = MOTORCYCLE || {};

(function($) {

    $(function() {
        // Initialize!
        MOTORCYCLE.Game.init();
    });

}(jQuery));

MOTORCYCLE.Game = {
    init: function(){
        var self = this;
        self.bind();
    },

    bind: function(){

        var body = $("body");
        var jumbotron = $(".jumbotron");

        /**
         * Start the first game
         */
        body.on("click", '.js-start-game', function(event)
        {
            event.preventDefault();
            jumbotron.hide();
            GAME.gameStart();
        });

        /**
         * Start a new game
         */
        body.on("click", '.js-new-game', function(event)
        {
            event.preventDefault();
            jumbotron.hide();

            if (GAME.isActive == true) {
                GAME.endGame();
            }

            GAME.gameStart();
        });

        /**
         * End the game
         */
        body.on("click", '.js-end-game', function(event)
        {
            event.preventDefault();
            GAME.endGame();
        });

        /**
         * Change the bubble that will be used as an image
         */
        body.on("click", '.js-choose-bubble-image', function(event)
        {
            event.preventDefault();
            GAME.imageSrc = $(this).children().prop("src");
        });
    }
};