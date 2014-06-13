



/** Provide very basic headless support 
 * Create a pswudo window object
 */

var window=this;

// Signal simple.js we are here:
window.jsqueak=true;

var navigator={};
navigator.standalone=false;
document={};
document.getElementsByTagName=function(obj){
    print("asked for element:"+obj);
    return {};
}



// Create a pseudo-local-storage guy
localStorage={}
///////////////////////////////////////////////////////////////
////////// Minimal Bridge ends here ///////////////////////////
///////////////////////////////////////////////////////////////

print("Minimal bridge ok");


load("../demo/simple.js");

var startTime=java.lang.System.currentTimeMillis();


/** Basic API Debug support **/
log = function(msg, level){ 
    if(!level) {
	level="DEBUG";
    }
    // DISABLE: DEBUG
    //if(level=="DEBUG") {return; }
    var ms=java.lang.System.currentTimeMillis()-startTime;
    // java.lang.System.err.println(ms+" "+level+"\t" +this+"\t"+msg); 
    java.lang.System.err.println(ms+" "+level+"\t" +msg); 
}



info=function(msg){
    log(msg,"INFO");
}



info("Java-JSqueak Bridge v0.1");

log("Browser-like   window="+window);
log("Browser-like document="+document);


// https://github.com/davidflanagan/DataView.js/blob/master/DataView.js
var global=this;

// Provide console.log (crude hacks but works)
//var console=this;
global.console={};

global.console.log=function (m) { log(m,"CONSOLE"); }
console.log("Console System Loaded");

load("DataView.js")
// Still to be provided
//load("js-bridge/javafx-display.js")
load("extensions/headless-display.js")
load("../vm.js");
info("vm.js loaded");
// load("../demo/SimplePlugin.js")


var file =  new java.io.File("../demo/mini.image");
//var file =  new java.io.File("java-interop.image");
log("Loading:"+file);
var byteArray=org.apache.commons.io.FileUtils.readFileToByteArray(file);
log("Size:"+byteArray.length);
var arrayBuffer = new ArrayBuffer(byteArray.length);
var bufView = new Uint8Array(arrayBuffer);

log("Making ArrayBuffer....");

/*
    public static native void arraycopy(Object src,  int  srcPos,
                                        Object dest, int destPos,
                                        int length);

// Does not work...
java.lang.System.arraycopy(byteArray,0,bufView,0, byteArray.length);
*/

// Very slow: but works
for(var i=0; i< byteArray.length; i++){
    bufView[i]=byteArray[i];
}
log("....ArrayBuffer Ready");

info("Ready to enter in ClubHouse...");
var image = new users.bert.SqueakJS.vm.Image(arrayBuffer,(file+""));

var vm = new    users.bert.SqueakJS.vm.Interpreter(image, createDisplay());
var run = function() {
    while(true){
        var ms = vm.interpret(20);
	// console.log("RETURNED:"+ms);
	// exit(0);
	if (typeof ms === 'number') { // continue running
	    console.log("Running...."+ms);
	    java.lang.Thread.sleep(ms+1000);
	}else{
	    exit(0);
	}
    }
};
run();


//log("Running Headless image....ImageObject="+users.bert.SqueakJS.vm.Image);
// Export window object in the environment
//window.onload();
