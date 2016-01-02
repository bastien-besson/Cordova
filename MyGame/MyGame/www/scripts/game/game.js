/// <reference path="game.objects.js" />
/// <reference path="game.events.js" />

// Global variables
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = screen.width;
canvas.height = screen.height;
$(canvas).prependTo('body');

var game = (function () {
    // Initialize the game
    var init = function () {
        
        // Initialize game objects
        game.objects.init();

        //Initialize pointer events
        game.events.init();

        // Run game !
        main();
    };

    // Draw everything
    var render = function () {

        

    };


    // The main game loop
    var main = function () {
        var now = Date.now();
        var delta = now - then;

        render();

        then = now;

        // Request to do this again ASAP
        requestAnimationFrame(main);
    };

    // Cross-browser support for requestAnimationFrame
    var w = window;
    requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
    var then = Date.now();


    return {
        init: init
    };
}() );



