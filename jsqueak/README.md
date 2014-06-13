
## About Java-SqueakJS bridge: jsqueak

Java 1.8 ships with Nashorn Javascript interpreter, which take advantage of the new invokedynamic java bytecode and it is a major revamp over old Rhino  interpreter.
*So why not use the Nashorn to run SquakJS?*

The major advantage is you can access to Java in a very straighforward way.

Maximum care was put to avoid big modification of vm.js, so you can run 'jsqueak' without problem.

At the current time of writing there is an "headless mode" which exposes a dummy display of 1x1 pixel and it is able to boot mini.image.

JavaFX integration is the next step to provide a true display

## Java Interoperatility (early stage)

To gain java interoperability you need the new primitive 1993.

The new primitive javaNew (number 1993) is able to create a java object instance, so you can write something like

```smalltalk
(Object javaNew: 'java.lang.Object') hashCode asString
```

Or try out a simple test class:

```smalltalk
(Object javaNew: 'org.squeak.potato.javainterop.Tester')
				test: 1 two: 2
```



## Documentation

1. [nashorn-extensions][nashorn-extensions]
2. DataView [is expected to make it into jdk8u20 release] [https://wiki.openjdk.java.net/display/Nashorn/Nashorn+extensions]. 
   This [Dataview backport][dataview-backport] was used to solve the issue in the meantime.
   

## References
[nashorn-extensions]: https://wiki.openjdk.java.net/display/Nashorn/Nashorn+extensions
[dataview-backport]: https://github.com/davidflanagan/DataView.js/blob/master/DataView.js
