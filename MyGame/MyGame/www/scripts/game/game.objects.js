/// <reference path="game.js" />

game.objects = (function () {

    var DOMObjects = [];
    var CanvasObjects = [];
    var gameDimensions = { width: 640, height: 360 };
    var screenRatio = { width: 1, height: 1 };

    // Abstract game object
    var baseObject = function (object, context) {
        var that = {};
        var font = "10px Calibri";

        //private variables
        that.priceIndex = 0;
        that.lvlIndex = 0;

        that.get_name = function () {
            return object.name;
        };

        return that;
    }

    // Abstract DOM object
    var DOMObject = function (object, context) {
        var that = baseObject(object);

        //Draw image on DOM
        that.draw = function () {
            var img = document.createElement('img');
            img.style.position = 'absolute';
            img.style.clip = object.clip.x + 'px ' + object.clip.y + 'px ' + object.width * screenRatio.width + 'px ' + object.height * screenRatio.height + 'px';
            img.style.left = object.x;
            img.style.top = object.y;
            img.style.width = object.width;
            img.style.height = object.height;

            img.setAttribute('src', object.src);
        };

        return that;
    }

    // Abstract Canvas object
    var CanvasObject = function (object, context) {
        var that = baseObject(object);

        // Draw image on Canvas
        that.draw = function () {
            var img = new Image();
            img.onload = function () {
                context.drawImage(
                    img,
                    object.clip.x,
                    object.clip.y,
                    object.width * screenRatio.width,
                    object.height * screenRatio.height,
                    object.x,
                    object.y,
                    object.width * screenRatio.width,
                    object.height * screenRatio.height);

                context.font = font;
                context.fillText(object.name, object.x, object.y + object.height / 2 - 5);

            };
            img.src = object.src;
        };

        return that;
    }

    // Building game object
    var buildingObject = function (object) {
        var that = DOMObject(object);

        that.get_price = function () {
            return object.levels[that.lvlIndex].price;
        };

        that.get_level = function () {
            return that.lvlIndex;
        }

        that.buy = function () {
            that.lvlIndex++;

            object.clip.x += object.width;
            that.draw();
        };

        return that;
    };

    var createDOMObjects = function () {
        DOMObjects.push(buildingObject({
            name: 'Town Hall',
            x: 50,
            y: 330,
            width: 100,
            height: 100,
            clip: { x: 0, y: 0 },
            src: "images/object.png",
            levels: [{ price: 100 }, { price: 250 }, { price: 500 }]
        }));

        DOMObjects.push(buildingObject({
            name: 'Gold Mine',
            x: 155,
            y: 330,
            width: 100,
            height: 100,
            clip: { x: 320, y: 0 },
            src: "images/object.png",
            levels: [{ price: 100 }, { price: 250 }, { price: 500 }]
        }));

        DOMObjects.push(buildingObject({
            name: 'Diamond Mine',
            x: 260,
            y: 330,
            width: 100,
            height: 100,
            clip: { x: 210, y: 120 },
            src: "images/object.png",
            levels: [{ price: 100 }, { price: 250 }, { price: 500 }]
        }));
    };

    var createCanvasObjects = function () {

    };

    var init = function () {

        screenRatio.width = screen.width / gameDimensions.width;
        screenRatio.height = screen.height / gameDimensions.height;

        // Initialize background
        $(canvas).addClass('background');

        createDOMObjects();
        createCanvasObjects();

        for (var i = 0; i < DOMObjects.length; i++) {
            DOMObjects[i].draw();
        }
    };

    return {
        init: init,
        getDOMObjects: function () { return DOMObjects; },
        getCanvasObjects: function () { return CanvasObjects; }
    }
}());

