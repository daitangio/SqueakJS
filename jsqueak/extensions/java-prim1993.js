/*
 * Java Nashorn implementation
 *
 * SimplePlugin.js: Example for an external Squeak VM module
 *
 * (Object javaNew: 'java.lang.Object') hashCode asString
 * javaNew: aString
 *     <primitive: 'javaNew' module: 'JavaPlugin'>
 *     ^ self primitiveFailed
 */
 
var JavaPlugin = function() {
    var proxy;

    function initializeModule(interpreterProxy) {
        // interpreterProxy is vm.primHandler - might change to a real proxy later?
        proxy = interpreterProxy;
    };

    function javaNew(argCount) {
	console.log("Called JavaNew:"+argCount);
        if (argCount !== 1) return false; // fail
        var which = proxy.stackNonInteger(0);
        if (!proxy.success) return false; // fail
        var resultObj = proxy.makeStString('Ready 2 implement:'+which);
        proxy.vm.popNandPush(1 + argCount, resultObj);
        return true; // success
    };

    return {
        exports: {
            initializeModule: initializeModule,
            javaNew: javaNew,
        }
    }
};

// register plugin in global Squeak object
Squeak.registerExternalModule('JavaPlugin', JavaPlugin());


/**********************************
NOTE: the mini.image does not have compiler support for
named primitives, yet. You need to declare it manually 
using prim 117:

Behavior>>javaNew (instance method)

javaNew: anInteger
    <primitive: 117>
    #(JavaPlugin javaNew 0 0).
    ^ self primitiveFailed
***********************************/
