var createDisplay=function(){

    var headlessCtx={
	// var pixels = ctx.createImageData(rect.w, rect.h);
	// pixels.width
	// ctx.putImageData(pixels, rect.x, rect.y);
	// ctx.pointers
	createImageData:null
    };

    var display={
	ctx:headlessCtx,
	width: 800,
	height: 600,
        mouseX: 0,
        mouseY: 0,
        buttons: 0,
        keys: [],
        clipboardString: '',
        clipboardStringChanged: false,
    };

    // A JSAdapter object with proxy-like special hooks
    var obj = new JSAdapter() {

	// log:function(m){
	//     print("HEADLESS ISPLAY "+m);
	// },

	__get__: function(name) {
	    var r=display[name];
            print("HEADLESS "+"getter called for '" + name + "' Returns:"+r); 
	    
	    return r;
	},
	
	__put__: function(name, value) {
            print("HEADLESS "+"setter called for '" + name + "' with " + value);
	},
	
	__call__: function(name, arg1, arg2) {
            print("HEADLESS "+"method '" + name + "' called with " + arg1 + ", " + arg2);
	},
	
	__new__: function(arg1, arg2) {
            print("HEADLESS "+"new with " + arg1 + ", " + arg2);
	},
	
	__getIds__: function() {
            print("HEADLESS "+"__getIds__ called");
            return [ "foo", "bar" ];
	},
	
	__getValues__: function() {
            print("HEADLESS "+"__getValues__ called");
            return [ "fooval", "barval" ];
	},
	
	__has__: function(name) { /*ECMAscript typed arrays*/
            print("HEADLESS "+"__has__ called with '" + name + "'");
            return name == "js";
	},
	
	__delete__: function(name) {
            print("HEADLESS "+"__delete__ called with '" + name + "'");
            return true;
	}
    };


    return obj;
}


