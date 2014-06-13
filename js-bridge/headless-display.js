// A JSAdapter object with proxy-like special hooks
var obj = new JSAdapter() {
    __get__: function(name) {
        print("getter called for '" + name + "'"); return name;
    },
 
    __put__: function(name, value) {
        print("setter called for '" + name + "' with " + value);
    },
 
    __call__: function(name, arg1, arg2) {
        print("method '" + name + "' called with " + arg1 + ", " + arg2);
    },
 
    __new__: function(arg1, arg2) {
        print("new with " + arg1 + ", " + arg2);
    },
 
    __getIds__: function() {
        print("__getIds__ called");
        return [ "foo", "bar" ];
    },
 
    __getValues__: function() {
        print("__getValues__ called");
        return [ "fooval", "barval" ];
    },
 
    __has__: function(name) { /*ECMAscript typed arrays*/
        print("__has__ called with '" + name + "'");
        return name == "js";
    },
 
    __delete__: function(name) {
        print("__delete__ called with '" + name + "'");
        return true;
    }
};
 
// calls __get__
print(obj.foo);
 
// calls __put__
obj.foo = 33;
 
// calls __call__
obj.func("hello", "world");
 
// calls __new__
new obj("hey!", "it works!");
 
// calls __getIds__ to get array of properties
for (i in obj) {
    print(i);
}
 
// calls __getValues__ to get array of property values
for each (i in obj) {
    print(i);
}
