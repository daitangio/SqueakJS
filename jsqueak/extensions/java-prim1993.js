(function(global) {

    if(global.JavaPrim1993) return; 
    if(!global.jsqueak) fail("jsqueak.js is needed!");

    var jsqueak=global.jsqueak;

    global.JavaPrim1993={
	primitive:function(argCount){
	    jsqueak.log("JavaPrim1993 UNIMPLEMENTED YET");
	    return false;
	}
    };
    // Low level guy
    function fail(msg) { throw new Error(msg); }
    jsqueak.log("Loaded","java-prim1993");
})(this);
