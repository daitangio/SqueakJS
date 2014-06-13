#!/home/jj/jdk1.8.0_05/bin/jjs -fv -fx -Djavafx.animation.fullspeed=true 
## #!/usr/bin/env 
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
 
var WIDTH = 1200;
var HEIGHT = 900;
 
var canvas = new Canvas(WIDTH, HEIGHT);
var imageUrl = fileToURL("/c/giorgi/images/eva01.png");
var img = new Image(imageUrl);
var font = new Font("Arial", 16);
var fpsLabel = new Text();
 
function renderFrame() {
    var t = new Date().getTime();
    var gc = canvas.graphicsContext2D;
 
    gc.setFill(Color.web("#cccccc"));
    gc.fillRect(0, 0, WIDTH, HEIGHT);
    gc.setStroke(Color.web("#000000"));
 
    gc.setLineWidth(1);
    gc.strokeRect(5, 5, WIDTH - 10, HEIGHT - 10);
 
    var c = 200;
    var msc= 0.5 * HEIGHT / img.height;
    var sp0 = 0.003;
    for (var h = 0; h < c; h++) {
        gc.setTransform(1, 0, 0, 1, 0, 0);
        var yh = h / (c - 1);
        gc.translate((0.5 + Math.sin(t * sp0 + h * 0.1) / 3) * WIDTH, 25 + (HEIGHT * 3 / 4 - 40) * (yh * yh));
        var sc = 30 / img.height + msc * yh * yh;
        gc.rotate(90 * Math.sin(t * sp0 + h * 0.1 + Math.PI));
        gc.scale(sc, sc);
        gc.drawImage(img, -img.width / 2, -img.height / 2);
     }
 
    gc.setTransform(1, 0, 0, 1, 0, 0);
 
    fpsLabel.setText(Math.floor(tracker.getAverageFPS() + 0.5) + " FPS");
}
 
function fileToURL(file) {
    return new File(file).toURI().toURL().toExternalForm();
}
 
var timer = new AnimationTimerExtend() {
    handle: function handle(now) {
        renderFrame();
    }
};
 
var stack = new StackPane();
var pane = new BorderPane();
pane.setCenter(canvas);
 
fpsLabel.setManaged(false);
fpsLabel.setFont(font);
fpsLabel.setFontSmoothingType(FontSmoothingType.LCD);
fpsLabel.setX(10);
fpsLabel.setY(24);
 
stack.getChildren().add(pane);
stack.getChildren().add(fpsLabel);
 
$STAGE.scene = new Scene(stack);
var tracker = PerformanceTracker.getSceneTracker($STAGE.scene);
 
timer.start();
