



(function(global) {
    var startTime=java.lang.System.currentTimeMillis();

    /** Basic API Debug support **/
    var log = function(msg, level){ 
	if(!level) {
	    level="DEBUG";
	}
	// DISABLE: DEBUG
	//if(level=="DEBUG") {return; }
	var ms=java.lang.System.currentTimeMillis()-startTime;
	// java.lang.System.err.println(ms+" "+level+"\t" +this+"\t"+msg); 
	java.lang.System.err.println(ms+" "+level+"\t" +msg); 
    }



    var info=function(msg){
	log(msg,"INFO");
    }


    var loadImageAndLaunch=function(fname){
	var mylog=function(msg){ log(msg,"loadImageAndLaunch"); }
	var file =  new java.io.File(fname);
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

	mylog("Ready to enter in ClubHouse...");
	var image = new users.bert.SqueakJS.vm.Image(arrayBuffer,(file+""));
	var vm = new    users.bert.SqueakJS.vm.Interpreter(image, createDisplay());
	var run = function() {
	    while(true){
		var ms = vm.interpret(20);
		// console.log("RETURNED:"+ms);
		// exit(0);
		if (typeof ms === 'number') { // continue running
		    console.jsqueak("Running...."+ms);
		    java.lang.Thread.sleep(ms+1000);
		}else{
		    exit(0);
		}
	    }
	};
	run();
    }

    // Exports
    global.jsqueak={
	log:log,
	info:info,
	loadImageAndLaunch:loadImageAndLaunch
    }

    // Provide console.log (crude hacks but works)
    //var console=this;
    global.console={
	log:function (m) { log(m,"CONSOLE"); },
	jsqueak:function(m){ log(m,"JSQUEAK-BRIDGE"); }
    }


}(this));
// console.log("JSqueak Loaded");
