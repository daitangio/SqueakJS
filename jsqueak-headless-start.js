

var startTime=java.lang.System.currentTimeMillis();
/** Basic API Debug support **/
log = function(msg, level){ 
    if(!level) {
	level="DEBUG";
    }
    var ms=java.lang.System.currentTimeMillis()-startTime;
    java.lang.System.err.println(ms+" "+level+"\t" +this+"\t"+msg); 
}

info=function(msg){
    log(msg,"INFO");
}




// Use the simple.js to define an object (400ms to come here)
Object.subclass('users.jj.JSqueak',
'about', {
    version:function(){
	return 'jsqueak-bridge-0.1';
    }
});

log("Browser-like   window="+window);
log("Browser-like document="+document);
j=new users.jj.JSqueak();
log(""+j.version());


// https://github.com/davidflanagan/DataView.js/blob/master/DataView.js
var global=this;

// Provide console.log (crude hacks but works)
//var console=this;
global.console={};

global.console.log=function (m) { log(m,"CONSOLE"); }
console.log("Console System Loaded");

load("js-bridge/DataView.js")
// Still to be proviuded
load("js-bridge/javafx-display.js")
load("vm.js");
log("vm.js loaded");
load("demo/SimplePlugin.js")


var file =  new java.io.File("demo/mini.image");
log("Loading:"+file);
var byteArray=org.apache.commons.io.FileUtils.readFileToByteArray(file);
log("Size:"+byteArray.length);
var arrayBuffer = new ArrayBuffer(byteArray.length);
var bufView = new Uint8Array(arrayBuffer);

log("Making ArrayBuffer....");
// Very slow: but works
for(var i=0; i< byteArray.length; i++){
    bufView[i]=byteArray[i];
}
log("....ArrayBuffer Ready");
// Fill the ArrayBuffer
info("Ready to enter in ClubHouse...");
var image = new users.bert.SqueakJS.vm.Image(arrayBuffer,(file+""));

var vm = new    users.bert.SqueakJS.vm.Interpreter(image, createDisplay());
var run = function() {
    while(true){
        var ms = vm.interpret(20);
	if (typeof ms === 'number') { // continue running
	    console.log("Running...."+ms);
	}else{
	    exit(0);
	}
    }
};
run();


//log("Running Headless image....ImageObject="+users.bert.SqueakJS.vm.Image);
// Export window object in the environment
//window.onload();
