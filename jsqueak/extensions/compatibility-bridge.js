/** Provide very basic headless support 
 * Create a pseudo window object
 * The global namespace is dirty
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
