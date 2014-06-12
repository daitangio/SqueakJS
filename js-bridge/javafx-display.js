var File                 = Java.type("java.io.File");
var Image                = Java.type("javafx.scene.image.Image");
var Color                = Java.type("javafx.scene.paint.Color");
var Canvas               = Java.type("javafx.scene.canvas.Canvas");
var BorderPane           = Java.type("javafx.scene.layout.BorderPane");
var StackPane            = Java.type("javafx.scene.layout.StackPane");
var Scene                = Java.type("javafx.scene.Scene");
var Font                 = Java.type("javafx.scene.text.Font");
var FontSmoothingType    = Java.type("javafx.scene.text.FontSmoothingType");
var Text                 = Java.type("javafx.scene.text.Text");
var AnimationTimer       = Java.type("javafx.animation.AnimationTimer");
var PerformanceTracker   = Java.type("com.sun.javafx.perf.PerformanceTracker");
var AnimationTimerExtend = Java.extend(AnimationTimer);

var WIDTH =  800;
var HEIGHT = 600;

var internalCanvas = new Canvas(WIDTH, HEIGHT);


var canvas = new Object(){
    getContext:function(){
	// Get gc
	return internalCanvas.graphicsContext2D;
    }
}

//var canvas = new Canvas(WIDTH, HEIGHT);

function createDisplay() {
        var display = {
            ctx: canvas.getContext("2d"),
            width: canvas.width,
            height: canvas.height,
            mouseX: 0,
            mouseY: 0,
            buttons: 0,
            keys: [],
            clipboardString: '',
            clipboardStringChanged: false,
        };
        canvas.onmousedown = function(evt) {
            canvas.focus();
            display.buttons = display.buttons & ~7 | (4 >> evt.button);
        };
        canvas.onmouseup = function(evt) {
            display.buttons = display.buttons & ~7;
        };
        canvas.onmousemove = function(evt) {
            display.mouseX = evt.pageX - this.offsetLeft;
            display.mouseY = evt.pageY - this.offsetTop;
        };
        canvas.oncontextmenu = function() {
            return false;
        };
        canvas.ontouchstart = function(evt) {
            canvas.focus();
            display.buttons = 4;
            canvas.ontouchmove(evt);
        };
        canvas.ontouchmove = function(evt) {
            canvas.onmousemove(evt.touches[0]);
        };
        canvas.ontouchend = function(evt) {
            display.buttons = 0;
            canvas.ontouchmove(evt);
        };
        canvas.ontouchcancel = function(evt) {
            display.buttons = 0;
        };
        canvas.onkeypress = function(evt) {
            display.keys.push(evt.charCode);
        };
        canvas.onkeydown = function(evt) {
            var code = ({46:127, 8:8, 45:5, 9:9, 13:13, 27:27, 36:1, 35:4,
                33:11, 34:12, 37:28, 39:29, 38:30, 40:31})[evt.keyCode];
            if (code) {display.keys.push(code); return evt.preventDefault()};
            var modifier = ({16:8, 17:16, 91:64, 18:64})[evt.keyCode];
            if (modifier) {
                display.buttons |= modifier;
                if (modifier > 8) display.keys = [];
                return evt.preventDefault();
            }
            if ((evt.metaKey || evt.altKey) && evt.which) {
                code = evt.which;
                if (code >= 65 && code <= 90) if (!evt.shiftKey) code += 32;
                else if (evt.keyIdentifier && evt.keyIdentifier.slice(0,2) == 'U+')
                    code = parseInt(evt.keyIdentifier.slice(2), 16);
                display.keys.push(code)
                return evt.preventDefault();
            }
        };
        canvas.onkeyup = function(evt) {
            var modifier = ({16:8, 17:16, 91:64, 18:64})[evt.keyCode];
            if (modifier) { display.buttons &= ~modifier; return evt.preventDefault(); }
        };
        return display;
};

console.log("JSqueakBridge Display ok");
