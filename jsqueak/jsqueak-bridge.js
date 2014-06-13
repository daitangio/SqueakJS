
load("extensions/compatibility-bridge.js")
load("DataView.js")
print("Minimal bridge ok");
load("../demo/simple.js");

load("extensions/jsqueak.js")
// load primitive 1993  support 
load("extensions/java-prim1993.js")
console.jsqueak("Java-JSqueak Bridge v0.1");
// console.jsqueak("Browser-like   window="+window);
// console.jsqueak("Browser-like document="+document);


console.log("Console System Loaded");

// JavaFX still lacking
//load("extensions/javafx-display.js")
load("extensions/headless-display.js")

load("../vm.js");
console.jsqueak("vm.js loaded");
// load("../demo/SimplePlugin.js")

// "../demo/mini.image"
jsqueak.loadImageAndLaunch("java-interop.image")


