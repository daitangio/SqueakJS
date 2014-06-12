



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


// ?Try to implement DataView
// DataView is expected to make it into jdk8u20 release.
// https://wiki.openjdk.java.net/display/Nashorn/Nashorn+extensions
// DataView=function(){
//     print("No data view support!");
//     return window;
// }

print("Minimal bridge ok");

