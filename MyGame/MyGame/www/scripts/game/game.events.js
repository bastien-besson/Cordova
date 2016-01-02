/// <reference path="game.js" />

game.events = (function () {
    
    //pointer events listener
    var pointerDownListener = function (evt) {
        var i;
        //We are going to pay attention to the layering order of the objects so that if a pointer down occurs over more than object,
        //only the topmost one will be dragged.
        var highestIndex = -1;

        //getting pointer position correctly, being mindful of resizing that may have occured in the browser:
        var bRect = canvas.getBoundingClientRect();
        pointerX = (evt.clientX - bRect.left) * (canvas.width / bRect.width);
        pointerY = (evt.clientY - bRect.top) * (canvas.height / bRect.height);

        //find which shape was clicked
        for (i = 0; i < gameObjects.length; i++) {
            if (hitTest(gameObjects[i], pointerX, pointerY)) {
                dragging = true;
                if (i > highestIndex) {
                    //We will pay attention to the point on the object where the pointer is "holding" the object:
                    dragHoldX = pointerX - gameObjects[i].x;
                    dragHoldY = pointerY - gameObjects[i].y;
                    highestIndex = i;
                    dragIndex = i;
                }
            }
        }

        if (dragging) {
            window.addEventListener("pointermove", pointerMoveListener, false);
        }
        canvas.removeEventListener("pointerdown", pointerDownListener, false);
        window.addEventListener("pointerup", pointerUpListener, false);

        //code below prevents the pointer down from having an effect on the main browser window:
        if (evt.preventDefault) {
            evt.preventDefault();
        } //standard
        else if (evt.returnValue) {
            evt.returnValue = false;
        } //older IE
        return false;
    };

    var pointerUpListener = function (evt) {
        canvas.addEventListener("pointerdown", pointerDownListener, false);
        window.removeEventListener("pointerup", pointerUpListener, false);
        if (dragging) {
            dragging = false;
            window.removeEventListener("pointermove", pointerMoveListener, false);
        }
    };

    var pointerMoveListener = function (evt) {
        var posX;
        var posY;
        var shapeRad = gameObjects[dragIndex].rad;
        var minX = shapeRad;
        var maxX = canvas.width - shapeRad;
        var minY = shapeRad;
        var maxY = canvas.height - shapeRad;
        //getting pointer position correctly 
        var bRect = canvas.getBoundingClientRect();
        pointerX = (evt.clientX - bRect.left) * (canvas.width / bRect.width);
        pointerY = (evt.clientY - bRect.top) * (canvas.height / bRect.height);

        //clamp x and y positions to prevent object from dragging outside of canvas
        posX = pointerX - dragHoldX;
        posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
        posY = pointerY - dragHoldY;
        posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

        gameObjects[dragIndex].x = posX;
        gameObjects[dragIndex].y = posY;
        console.info('game objects : ' + gameObjects.length);
    };

    var init = function () {

        //initialize pointer events listener
        canvas.addEventListener("pointerdown", pointerDownListener, false);
    };

    return {
        init: init
    };

}());