module('users.bert.SqueakJS.vm').requires().toRun(function() {
/*
 * Copyright (c) 2013 Bert Freudenberg
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


Squeak = {
    // system attributes
    vmVersion: "SqueakJS 0.1",
    vmBuild: "unknown",                 // replace at runtime by last-modified?
    vmPath: "/users/bert/SqueakJS/",    // entirely made up
    osName: "Web",
    osVersion: navigator.userAgent,
    windowSystem: "HTML",
    cpuType: "unknown",

    // object headers
    HeaderTypeMask: 3,
    HeaderTypeSizeAndClass: 0, //3-word header
    HeaderTypeClass: 1,        //2-word header
    HeaderTypeFree: 2,         //free block
    HeaderTypeShort: 3,        //1-word header
    
    // Indices into SpecialObjects array
    splOb_NilObject: 0,
    splOb_FalseObject: 1,
    splOb_TrueObject: 2,
    splOb_SchedulerAssociation: 3,
    splOb_ClassBitmap: 4,
    splOb_ClassInteger: 5,
    splOb_ClassString: 6,
    splOb_ClassArray: 7,
    splOb_SmalltalkDictionary: 8,
    splOb_ClassFloat: 9,
    splOb_ClassMethodContext: 10,
    splOb_ClassBlockContext: 11,
    splOb_ClassPoint: 12,
    splOb_ClassLargePositiveInteger: 13,
    splOb_TheDisplay: 14,
    splOb_ClassMessage: 15,
    splOb_ClassCompiledMethod: 16,
    splOb_TheLowSpaceSemaphore: 17,
    splOb_ClassSemaphore: 18,
    splOb_ClassCharacter: 19,
    splOb_SelectorDoesNotUnderstand: 20,
    splOb_SelectorCannotReturn: 21,
    splOb_TheInputSemaphore: 22,
    splOb_SpecialSelectors: 23,
    splOb_CharacterTable: 24,
    splOb_SelectorMustBeBoolean: 25,
    splOb_ClassByteArray: 26,
    splOb_ClassProcess: 27,
    splOb_CompactClasses: 28,
    splOb_TheTimerSemaphore: 29,
    splOb_TheInterruptSemaphore: 30,
    splOb_FloatProto: 31,
    splOb_SelectorCannotInterpret: 34,
    splOb_MethodContextProto: 35,
    splOb_BlockContextProto: 37,
    splOb_ExternalObjectsArray: 38,
    splOb_ClassPseudoContext: 39,
    splOb_ClassTranslatedMethod: 40,
    splOb_TheFinalizationSemaphore: 41,
    splOb_ClassLargeNegativeInteger: 42,
    splOb_ClassExternalAddress: 43,
    splOb_ClassExternalStructure: 44,
    splOb_ClassExternalData: 45,
    splOb_ClassExternalFunction: 46,
    splOb_ClassExternalLibrary: 47,
    splOb_SelectorAboutToReturn: 48,
    
    // Class layout:
    Class_superclass: 0,
    Class_mdict: 1,
    Class_format: 2,
    Class_instVars: null,   // 3 or 4 depending on image, see instVarNames()
    Class_name: 6,
    // Context layout:
    Context_sender: 0,
    Context_instructionPointer: 1,
    Context_stackPointer: 2,
    Context_method: 3,
    Context_receiver: 5,
    Context_tempFrameStart: 6,
    Context_smallFrameSize: 17,
    Context_largeFrameSize: 57,
    BlockContext_caller: 0,
    BlockContext_argumentCount: 3,
    BlockContext_initialIP: 4,
    BlockContext_home: 5,
    // Stream layout:
    Stream_array: 0,
    Stream_position: 1,
    Stream_limit: 2,
    //ProcessorScheduler layout:
    ProcSched_processLists: 0,
    ProcSched_activeProcess: 1,
    //Link layout:
    Link_nextLink: 0,
    //LinkedList layout:
    LinkedList_firstLink: 0,
    LinkedList_lastLink: 1,
    //Semaphore layout:
    Semaphore_excessSignals: 2,
    //Process layout:
    Proc_suspendedContext: 1,
    Proc_priority: 2,
    Proc_myList: 3,	
    // Association layout:
    Assn_key: 0,
    Assn_value: 1,
    // MethodDict layout:
    MethodDict_array: 1,
    MethodDict_selectorStart: 2,
    // Message layout
    Message_selector: 0,
    Message_arguments: 1,
    Message_lookupClass: 2,
    // Point layout:
    Point_x: 0,
    Point_y: 1,
    // LargetInteger layout:
    LargeInteger_bytes: 0,
    LargeInteger_neg: 1,
    // BitBlt layout:
    BitBlt_dest: 0,
    BitBlt_source: 1,
    BitBlt_halftone: 2,
    BitBlt_combinationRule: 3,
    BitBlt_destX: 4,
    BitBlt_destY: 5,
    BitBlt_width: 6,
    BitBlt_height: 7,
    BitBlt_sourceX: 8,
    BitBlt_sourceY: 9,
    BitBlt_clipX: 10,
    BitBlt_clipY: 11,
    BitBlt_clipW: 12,
    BitBlt_clipH: 13,
    BitBlt_colorMap: 14,
    BitBlt_warpBase: 15,
    // Form layout:
    Form_bits: 0,
    Form_width: 1,
    Form_height: 2,
    Form_depth: 3,
    
    // Event constants
    Mouse_Blue: 1,
    Mouse_Yellow: 2,
    Mouse_Red: 4,
    Keyboard_Shift: 8,
    Keyboard_Ctrl: 16,
    Keyboard_Alt: 32,
    Keyboard_Cmd: 64,
    Mouse_All: 1 + 2 + 4,
    Keyboard_All: 8 + 16 + 32 + 64,

    // other constants
    Epoch: Date.UTC(1901,0,1)/1000 + (new Date()).getTimezoneOffset()*60,         // local timezone
    
    // External modules
    externalModules: {},
    registerExternalModule: function(name, module) {
        this.externalModules[name] = module;
    },
};

Object.subclass('users.bert.SqueakJS.vm.Image',
'about', {
    about: function() {
    /*
    Object Format
    =============
    Each Squeak object is a users.bert.SqueakJS.vm.Object, only SmallIntegers are JS numbers.
    Instance variables/fields reference other objects directly via the "pointers" property.
    {
        sqClass: reference to class object
        format: format integer as in Squeak oop header
        hash: identity hash integer
        pointers: (optional) Array referencing inst vars + indexable fields
        words: (optional) Array of numbers (words)
        bytes: (optional) Array of numbers (bytes)
        float: (optional) float value if this is a Float object
        isNil: (optional) true if this is the nil object
        isTrue: (optional) true if this is the true object
        isFalse: (optional) true if this is the false object
        isFloat: (optional) true if this is a Float object
        isFloatClass: (optional) true if this is the Float class
        isCompact: (optional) true if this is a compact class
        oop: identifies this object in a snapshot (assigned on GC, new space object oops are negative)
        mark: boolean (used only during GC, otherwise false)
        nextObject: linked list of objects in old space (new space objects do not have this yet)
    }

    Object Table
    ============
    There is no actual object table. Instead, objects in old space are a linked list.
    New objects are only referenced by other objects' pointers, and thus can be garbage-collected
    at any time by the Javascript GC.
    
    There is no support for weak references yet.

    */    
    }
},
'initializing', {
    initialize: function(arraybuffer, name) {
        this.totalMemory = 100000000; 
        this.name = name;
        this.readFromBuffer(arraybuffer);
    },
    readFromBuffer: function(arraybuffer) {
        var data = new DataView(arraybuffer),
            littleEndian = false,
            pos = 0;
        var readWord = function() {
            var int = data.getUint32(pos, littleEndian);
            pos += 4;
            return int;
        };
        var readBits = function(nWords, format) {
            if (format < 5) { // pointers (do endian conversion)
                var oops = [];
                while (oops.length < nWords)
                    oops.push(readWord());
                return oops;
            } else { // words (no endian conversion yet)
                var bits = new Uint32Array(arraybuffer, pos, nWords);
                pos += nWords*4;
                return bits;
            }
        };
        // read version
        var version = readWord();
        if (version != 6502) {
            littleEndian = true; pos = 0;
            version = readWord();
            if (version != 6502) throw Error("bad image version");
        }
        // read header
        var headerSize = readWord();
        var endOfMemory = readWord(); //first unused location in heap
        var oldBaseAddr = readWord(); //object memory base address of image
        var specialObjectsOopInt = readWord(); //oop of array of special oops
        this.lastHash = readWord(); //Should be loaded from, and saved to the image header
        var savedWindowSize = readWord();
        var fullScreenFlag = readWord();
        var extraVMMemory = readWord();
        pos += headerSize - (9 * 4); //skip to end of header
        // read objects
        this.gcCount = 0;
        this.oldSpaceCount = 0;
        this.newSpaceCount = 0;
        var prevObj;
        var oopMap = {};
        console.log('squeak: reading objects');
        for (var ptr = 0; ptr < endOfMemory; ) {
            var nWords = 0;
            var classInt = 0;
            var header = readWord();
            switch (header & Squeak.HeaderTypeMask) {
                case Squeak.HeaderTypeSizeAndClass:
                    nWords = header >> 2;
                    classInt = readWord();
                    header = readWord();
                    ptr += 12;
                    break;
                case Squeak.HeaderTypeClass:
                    classInt = header - Squeak.HeaderTypeClass;
                    header = readWord();
                    nWords = (header >> 2) & 63;
                    ptr += 8;
                    break;
                case Squeak.HeaderTypeShort:
                    nWords = (header >> 2) & 63;
                    classInt = (header >> 12) & 31; //compact class index
                    //Note classInt<32 implies compact class index
                    ptr += 4;
                    break;
                case Squeak.HeaderTypeFree:
                    throw Error("Unexpected free block");
            }
            nWords--;  //length includes base header which we have already read
            var oop = ptr - 4, //0-rel byte oop of this object (base header)
                format = (header>>8) & 15,
                hash = (header>>17) & 4095,
                bits = readBits(nWords, format);
            ptr += nWords * 4;

            var object = new users.bert.SqueakJS.vm.Object();
            object.initFromImage(oop, classInt, format, hash, bits);
            if (prevObj) prevObj.nextObject = object;
            this.oldSpaceCount++;
            prevObj = object;
            //oopMap is from old oops to new objects
            oopMap[oldBaseAddr + oop] = object;
        }
        //create proper objects
        var splObs         = oopMap[specialObjectsOopInt];
        var compactClasses = oopMap[splObs.bits[Squeak.splOb_CompactClasses]].bits;
        var floatClass     = oopMap[splObs.bits[Squeak.splOb_ClassFloat]];
        console.log('squeak: mapping oops');
        for (var oop in oopMap)
            oopMap[oop].installFromImage(oopMap, compactClasses, floatClass, littleEndian);
        this.specialObjectsArray = splObs;
        this.decorateKnownObjects();
        this.firstOldObject = oopMap[oldBaseAddr+4];
        this.lastOldObject = prevObj;
        this.oldSpaceBytes = endOfMemory;
     },
    decorateKnownObjects: function() {
        var splObjs = this.specialObjectsArray.pointers;
        splObjs[Squeak.splOb_NilObject].isNil = true;
        splObjs[Squeak.splOb_TrueObject].isTrue = true;
        splObjs[Squeak.splOb_FalseObject].isFalse = true;
        splObjs[Squeak.splOb_ClassFloat].isFloatClass = true;
        this.compactClasses = this.specialObjectsArray.pointers[Squeak.splOb_CompactClasses].pointers;
        for (var i = 0; i < this.compactClasses.length; i++)
            if (!this.compactClasses[i].isNil)
                this.compactClasses[i].isCompact = true;
        if (!Number.prototype.sqInstName)
            Object.defineProperty(Number.prototype, 'sqInstName', {
                enumerable: false,
                value: function() { return this.toString() }
            });
    }

},
'garbage collection', {
    partialGC: function() {
        // no partial GC needed since new space uses the Javascript GC
        return this.totalMemory - this.oldSpaceBytes;
    },
    fullGC: function() {
        // Old space is a linked list of objects - each object has an "nextObject" reference.
        // New space objects do not have that pointer, they are garbage-collected by JavaScript.
        // But they have an allocation id so the survivors can be ordered on tenure.
        // The "nextObject" references are created by collecting all new objects, 
        // sorting them by id, and then linking them into old space.
        // Note: after an old object is released, its "nextObject" ref must still allow traversal
        // of all remaining objects. This is so enumeration works despite GC.

        var newObjects = this.markReachableObjects();
        var removedObjects = this.removeUnmarkedOldObjects();
        this.appendToOldObjects(newObjects);
        this.oldSpaceCount += newObjects.length - removedObjects.length;
        this.newSpaceCount = 0;
        this.gcCount++;
        return this.totalMemory - this.oldSpaceBytes;
    },
    markReachableObjects: function() {
        // Visit all reachable objects and mark them.
        // Return surviving new objects
        // Contexts are handled specially: they have garbage beyond the stack pointer
        // which must not be traced, and is cleared out here
        this.vm.storeContextRegisters();        // update active context
        var todo = [this.specialObjectsArray, this.vm.activeContext];
        var newObjects = [];
        while (todo.length > 0) {
            var object = todo.pop();
            if (object.mark) continue;             // objects are added to todo more than once 
            if (!object.nextObject && object !== this.lastOldObject)       // it's a new object
                newObjects.push(object);
            object.mark = true;           // mark it
            if (!object.sqClass.mark)     // trace class if not marked
                todo.push(object.sqClass);
            var body = object.pointers;
            if (body) {                   // trace all unmarked pointers
                var n = body.length;
                if (this.vm.isContext(object)) {    // contexts have garbage beyond SP
                    var sp = object.pointers[Squeak.Context_stackPointer];
                    n = this.vm.decodeSqueakSP(typeof sp == "number" ? sp : 0) + 1;
                }
                for (var i = 0; i < n; i++)
                    if (typeof body[i] === "object" && !body[i].mark)      // except SmallInts
                        todo.push(body[i]);
                while (n < body.length)             // clean garbage from contexts 
                    body[n++] = this.vm.nilObj;
            }
        }
        // sort by oop to preserve creation order
        return newObjects.sort(function(a,b){return b.oop - a.oop});
    },
    removeUnmarkedOldObjects: function() {
        // Unlink unmarked old objects from the nextObject linked list
        // Reset marks of remaining objects, and adjust their oops
        // Set this.lastOldObject to last old object
        // Return removed old objects (to support finalization later)
        var removed = [],
            removedBytes = 0,
            obj = this.firstOldObject;
        obj.mark = false; // we know the first object (nil) was marked
        while (true) {
            var next = obj.nextObject;
            if (!next) {// we're done
                this.lastOldObject = obj;
                this.oldSpaceBytes -= removedBytes;
                return removed;
            }
            // if marked, continue with next object
            if (next.mark) {
                next.mark = false;     // unmark for next GC
                next.oop -= removedBytes;
                obj = next;
            } else { // otherwise, remove it
                var corpse = next; 
                obj.nextObject = corpse.nextObject; // drop from list
                removedBytes += corpse.totalBytes(); 
                removed.push(corpse);
            }
        }
    },
    appendToOldObjects: function(newObjects) {
        // append new objects to linked list of old objects
        // and unmark them
        var oldObj = this.lastOldObject;
        for (var i = 0; i < newObjects.length; i++) {
            var newObj = newObjects[i];
            newObj.mark = false;
            this.oldSpaceBytes = newObj.setAddr(this.oldSpaceBytes);     // add at end of memory
            oldObj.nextObject = newObj;
            oldObj = newObj;
        }
        this.lastOldObject = oldObj;
    },
},
'creating', {
    registerObject: function(obj) {
        // We don't actually register the object yet, because that would prevent
        // it from being garbage-collected by the Javascript collector
        obj.oop = -(++this.newSpaceCount); // temp oops are negative. Real oop assigned when surviving GC
        this.lastHash = (13849 + (27181 * this.lastHash)) & 0xFFFFFFFF;
        return this.lastHash & 0xFFF;
    },
    instantiateClass: function(aClass, indexableSize, filler) {
        var newObject = new users.bert.SqueakJS.vm.Object();
        var hash = this.registerObject(newObject);
        newObject.initInstanceOf(aClass, indexableSize, hash, filler);
        return newObject;
    },
    clone: function(object) {
        var newObject = new users.bert.SqueakJS.vm.Object();
        var hash = this.registerObject(newObject);
        newObject.initAsClone(object, hash);
        return newObject;
    },
},
'operations', {
    bulkBecome: function(fromArray, toArray, twoWay) {
        var n = fromArray.length;
        if (n !== toArray.length)
            return false;
        var mutations = {};
        for (var i = 0; i < n; i++) {
            var obj = fromArray[i];
            if (!obj.sqClass) return false;  //non-objects in from array
            if (mutations[obj.oop]) return false; //repeated oops in from array
            else mutations[obj.oop] = toArray[i];
        }
        if (twoWay) for (var i = 0; i < n; i++) {
            var obj = toArray[i];
            if (!obj.sqClass) return false;  //non-objects in to array
            if (mutations[obj.oop]) return false; //repeated oops in to array
            else mutations[obj.oop] = fromArray[i];
        }
        // ensure new objects have nextObject pointers
        if (this.newSpaceCount > 0)
            this.fullGC();
        // Now, for every object...
        var obj = this.firstOldObject;
        while (obj) {
            // mutate the class
            var mut = mutations[obj.sqClass.oop];
            if (mut) obj.sqClass = mut;
            // and mutate body pointers
            var body = obj.pointers;
            if (body) for (var j = 0; j < body.length; j++) {
                mut = mutations[body[j].oop];
                if (mut) body[j] = mut;
            }
            obj = obj.nextObject;
        }
        this.vm.flushMethodCacheAfterBecome(mutations);
        return true;
    },
    someInstanceOf: function(clsObj) {
        var obj = this.firstOldObject;
        while (true) {
            if (obj.sqClass === clsObj)
                return obj;
            if (!obj.nextObject) {
                // this was the last old object, tenure new objects and try again
                if (this.newSpaceCount > 0) this.fullGC();
                // if this really was the last object, we're done
                if (!obj.nextObject) return null;
            }
            obj = obj.nextObject;
        }
    },
    objectAfter: function(obj) {
        // if this was the last old object, tenure new objects and try again
        if (!obj.nextObject && this.newSpaceCount > 0)
            this.fullGC();
        return obj.nextObject;
    },
    nextInstanceAfter: function(obj) {
        var clsObj = obj.sqClass;
        while (true) {
            if (!obj.nextObject) {
                // this was the last old object, tenure new objects and try again
                if (this.newSpaceCount > 0) this.fullGC();
                // if this really was the last object, we're done
                if (!obj.nextObject) return null;
            }
            obj = obj.nextObject;
            if (obj.sqClass === clsObj)
                return obj;
        }
    },
    writeToBuffer: function() {
        var headerSize = 64,
            data = new DataView(new ArrayBuffer(headerSize + this.oldSpaceBytes)),
            pos = 0;
        var writeWord = function(word) {
            data.setUint32(pos, word);
            pos += 4;
        };
        writeWord(6502); // magic number
        writeWord(headerSize);
        writeWord(this.oldSpaceBytes); // end of memory
        writeWord(this.firstOldObject.addr()); // base addr (0)
        writeWord(this.objectToOop(this.specialObjectsArray));
        writeWord(this.lastHash);
        writeWord((800 << 16) + 600);  // window size
        while (pos < headerSize)
            writeWord(0);
        // objects
        var obj = this.firstOldObject,
            n = 0;
        while (obj) {
            pos = obj.writeTo(data, pos, this);
            obj = obj.nextObject;
            n++;
        }
        if (pos !== data.byteLength) throw Error("wrong image size");
        if (n !== this.oldSpaceCount) throw Error("wrong object count");
        return data.buffer;
    },
    objectToOop: function(obj) {
        // unsigned word for use in snapshot
        if (typeof obj ===  "number")
            return (obj * 2 + 0x100000001) & 0xFFFFFFFF; // add tag bit, make unsigned
        if (obj.oop < 0) throw Error("temporary oop");
        return obj.oop;
    },
});

Object.subclass('users.bert.SqueakJS.vm.Object',
'initialization', {
    initInstanceOf: function(aClass, indexableSize, hash, nilObj) {
        this.sqClass = aClass;
        this.hash = hash;
        var instSpec = aClass.getPointer(Squeak.Class_format),
            instSize = ((instSpec>>1) & 0x3F) + ((instSpec>>10) & 0xC0) - 1; //0-255
        this.format = (instSpec>>7) & 0xF; //This is the 0-15 code

        if (this.format < 8) {
            if (this.format != 6) {
                if (instSize + indexableSize > 0)
                    this.pointers = this.fillArray(instSize + indexableSize, nilObj);
            } else // Words
                if (indexableSize > 0)
                    if (aClass.isFloatClass) {
                        this.isFloat = true;
                        this.float = 0.0;
                    } else
                        this.words = new Uint32Array(indexableSize); 
        } else // Bytes
            if (indexableSize > 0)
                this.bytes = new Uint8Array(indexableSize); //Methods require further init of pointers

//      Definition of Squeak's format code...
//
//      Pointers only...
//        0      no fields
//        1      fixed fields only (all containing pointers)
//        2      indexable fields only (all containing pointers)
//        3      both fixed and indexable fields (all containing pointers)
//        4      both fixed and indexable weak fields (all containing pointers).
//        5      unused
//      Bits only...
//        6      indexable word fields only (no pointers)
//        7      unused
//        8-11   indexable byte fields only (no pointers) (low 2 bits are low 2 bits of size)
//      Pointer and bits (CompiledMethods only)...
//       12-15   compiled methods:
//               # of literal oops specified in method header,
//               followed by indexable bytes (same interpretation of low 2 bits as above)
    },
    initAsClone: function(original, hash) {
        this.sqClass = original.sqClass;
        this.hash = hash;
        this.format = original.format;
        if (original.isFloat) {
            this.isFloat = original.isFloat;
            this.float = original.float;
        } else {
            if (original.pointers) this.pointers = original.pointers.slice(0);   // copy
            if (original.words) this.words = new Uint32Array(original.words);    // copy
            if (original.bytes) this.bytes = new Uint8Array(original.bytes);     // copy
        }
    },
    initFromImage: function(oop, cls, fmt, hsh, data) {
        // initial creation from Image, with unmapped data
        this.oop = oop;
        this.sqClass = cls;
        this.format = fmt;
        this.hash = hsh;
        this.bits = data;
    },
    installFromImage: function(oopMap, ccArray, floatClass, littleEndian) {
        //Install this object by decoding format, and rectifying pointers
        var ccInt = this.sqClass;
        // map compact classes
        if ((ccInt>0) && (ccInt<32))
            this.sqClass = oopMap[ccArray[ccInt-1]];
        else
            this.sqClass = oopMap[ccInt];
        var nWords = this.bits.length;
        if (this.format < 5) {
            //Formats 0...4 -- Pointer fields
            if (nWords > 0)
                this.pointers = this.decodePointers(nWords, this.bits, oopMap);
        } else if (this.format >= 12) {
            //Formats 12-15 -- CompiledMethods both pointers and bits
            var words = this.decodeWords(nWords, this.bits, littleEndian),
                methodHeader = words[0],
                numLits = (methodHeader>>10) & 255;
            this.pointers = this.decodePointers(numLits+1, words, oopMap); //header+lits
            this.bytes = this.decodeBytes(nWords-(numLits+1), this.bits, numLits+1, this.format & 3);
        } else if (this.format >= 8) {
            //Formats 8..11 -- ByteArrays (and ByteStrings)
            if (nWords > 0)
                this.bytes = this.decodeBytes(nWords, this.bits, 0, this.format & 3);
        } else if (this.sqClass == floatClass) {
            //Floats need two ints to be converted to double
            this.isFloat = true;
            this.float = this.decodeFloat(this.bits, littleEndian);
        } else {
            if (nWords > 0)
                this.words = this.decodeWords(nWords, this.bits, littleEndian);
        }
        delete this.bits;
        this.mark = false; // for GC
    },
    decodePointers: function(nWords, theBits, oopMap) {
        //Convert small ints and look up object pointers in oopMap
        var ptrs = [];
        for (var i = 0; i < nWords; i++) {
            var oldOop = theBits[i];
            if ((oldOop&1) == 1)
                ptrs[i] = oldOop >> 1;      // SmallInteger
            else
                ptrs[i] = oopMap[oldOop];   // Object
        }
        return ptrs;        
    },
    decodeWords: function(nWords, theBits, littleEndian) {
        var data = new DataView(theBits.buffer, theBits.byteOffset),
            words = new Uint32Array(nWords);
        for (var i = 0; i < nWords; i++)
            words[i] = data.getUint32(i*4, littleEndian);
        return words;
    },
    decodeBytes: function (nWords, theBits, wordOffset, fmtLowBits) {
        // Adjust size for low bits and make a copy
        var nBytes = (nWords * 4) - fmtLowBits,
            wordsAsBytes = new Uint8Array(theBits.buffer, theBits.byteOffset + wordOffset * 4, nBytes),
            bytes = new Uint8Array(nBytes);
        bytes.set(wordsAsBytes);
        return bytes;
    },
    decodeFloat: function(theBits, littleEndian) {
        var data = new DataView(theBits.buffer, theBits.byteOffset),
            float = data.getFloat64(0, littleEndian);
        return float;
    },
    fillArray: function(length, filler) {
        for (var array = [], i = 0; i < length; i++)
            array[i] = filler;
        return array;
    },
},
'printing', {
    toString: function() {
        return "sqObj(" + (this.sqClass.constructor == users.bert.SqueakJS.vm.Object ? this.sqInstName() : this.sqClass) + ")";
    },
    bytesAsString: function() {
        if (!this.bytes) return '';
        var chars = [];
        for (var i = 0; i < this.bytes.length; i++)
            chars.push(String.fromCharCode(this.bytes[i]));
        return chars.join('');
    },
    assnKeyAsString: function() {
        return this.getPointer(Squeak.Assn_key).bytesAsString();  
    },
    slotNameAt: function(index) {
        // one-based index
        var instSize = this.instSize();
        if (index <= instSize)
            return this.sqClass.allInstVarNames()[index - 1];
        else
            return (index - instSize).toString();
    },
    sqInstName: function() {
        if (this.isNil) return "nil";
        if (this.isTrue) return "true";
        if (this.isFalse) return "false";
        if (this.isFloat) {var str = this.float.toString(); if (!/\./.test(str)) str += '.0'; return str; }
        var className = this.sqClass.className();
        if (/ /.test(className))
            return 'the ' + className;
        var inst = '';
        switch (className) {
            case 'String':
            case 'ByteString':
            case 'WideString':
            case 'Symbol':
            case 'WideSymbol':
            case 'ByteSymbol':
                inst = ' "'+this.bytesAsString()+'"'; break;            
        }
        return  (/^[aeiou]/i.test(className) ? 'an ' + className : 'a ' + className) + inst;
    },
},
'accessing', {
    isWordsOrBytes: function() {
        var fmt = this.format;
        return fmt == 6  || (fmt >= 8 && fmt <= 11);
    },
    getPointer: function(zeroBasedIndex){
        return this.pointers[zeroBasedIndex];
    },
    setPointer: function(zeroBasedIndex, value){
        return this.pointers[zeroBasedIndex] = value;
    },
    pointersSize: function() {
    	return this.pointers ? this.pointers.length : 0;
    },
    bytesSize: function() {
        return this.bytes ? this.bytes.length : 0;
    },
    wordsSize: function() {
        return this.isFloat ? 2 : this.words ? this.words.length : 0;
    },
    instSize: function() {//same as class.classInstSize, but faster from format
        if (this.format>4 || this.format==2) return 0; //indexable fields only
        if (this.format<2) return this.pointers.length; //indexable fields only
        return this.sqClass.classInstSize(); //0-255
    },
    floatData: function() {
        var buffer = new ArrayBuffer(8);
        var data = new DataView(buffer);
        data.setFloat64(0, this.float, false);
        //1st word is data.getUint32(0, false);
        //2nd word is data.getUint32(4, false);
        return data;
    },
    setAddr: function(addr) {
        // Move this object to addr by setting its oop. Answer address after this object.
        // Used to assign an oop for the first time when tenuring this object during GC.
        // When compacting, the oop is adjusted directly, since header size does not change.
        var words = this.snapshotSize();
        this.oop = addr + words.header * 4;
        return addr + (words.header + words.body) * 4; 
    },
    snapshotSize: function() {
        // words of extra object header and body this object would take up in image snapshot
        // body size includes one header word that is always present
        var nWords =
            this.isFloat ? 2 :
            this.words ? this.words.length :
            this.pointers ? this.pointers.length : 0;
        if (this.bytes) nWords += (this.bytes.length + 3) >> 2;
        nWords++; // include one header word
        var extraHeader = nWords > 63 ? 2 : this.sqClass.isCompact ? 0 : 1;
        return {header: extraHeader, body: nWords};
    },
    addr: function() { // start addr of this object in a snapshot
        return this.oop - this.snapshotSize().header * 4;
    },
    totalBytes: function() {
        // size in bytes this object would take up in image snapshot
        var words = this.snapshotSize();
        return (words.header + words.body) * 4;
    },
    writeTo: function(data, pos, image) {
        // Write 1 to 3 header words encoding type, class, and size, then instance data
        var beforePos = pos,
            size = this.snapshotSize(),
            formatAndHash = ((this.format & 15) << 8) | ((this.hash & 4095) << 17);
        // write header words first
        switch (size.header) {
            case 2:
                data.setUint32(pos, size.body << 2 | Squeak.HeaderTypeSizeAndClass); pos += 4;
                data.setUint32(pos, this.sqClass.oop | Squeak.HeaderTypeSizeAndClass); pos += 4;
                data.setUint32(pos, formatAndHash | Squeak.HeaderTypeSizeAndClass); pos += 4;
                break;
            case 1:
                data.setUint32(pos, this.sqClass.oop | Squeak.HeaderTypeClass); pos += 4;
                data.setUint32(pos, formatAndHash | size.body << 2 | Squeak.HeaderTypeClass); pos += 4;
                break;
            case 0:
                var classIndex = image.compactClasses.indexOf(this.sqClass) + 1;
                data.setUint32(pos, formatAndHash | classIndex << 12 | size.body << 2 | Squeak.HeaderTypeShort); pos += 4;
        }
        // now write body, if any
        if (this.isFloat) {
            data.setFloat64(pos, this.float); pos += 8;
        } else if (this.words) {
            for (var i = 0; i < this.words.length; i++) {
                data.setUint32(pos, this.words[i]); pos += 4;
            }
        } else if (this.pointers) {
            for (var i = 0; i < this.pointers.length; i++) { 
                data.setUint32(pos, image.objectToOop(this.pointers[i])); pos += 4;
            }
        }
        // no "else" because CompiledMethods have both pointers and bytes
        if (this.bytes) {
            for (var i = 0; i < this.bytes.length; i++)
                data.setUint8(pos++, this.bytes[i]);
            // skip to next word
            pos += -this.bytes.length & 3;
        }
        // done
        if (pos !== beforePos + this.totalBytes()) throw Error("written size does not match");
        return pos;
    },
},
'as class', {
    classInstSize: function() {
        // this is a class, answer number of named inst vars
        var format = this.getPointer(Squeak.Class_format);
        return ((format >> 10) & 0xC0) + ((format >> 1) & 0x3F) - 1;
    },
    instVarNames: function() {
        var index = this.pointers.length > 9 ? 3 : 4; // index changed in newer images
        return (this.pointers[index].pointers || []).map(function(each) {
            return each.bytesAsString();
        });
    },
    allInstVarNames: function() {
        var superclass = this.superclass();
        if (superclass.isNil)
            return this.instVarNames();
        else
            return superclass.allInstVarNames().concat(this.instVarNames());
    },
    superclass: function() {
        return this.pointers[0];
    },
    className: function() {
        if (!this.pointers) return "?!?";
        var size = this.pointers.length;
        var isMeta = size < 9;  // true for all Squeak versions, hopefully
        var cls = isMeta ? this.pointers[size == 7 ? 6 : 5] : this;
        var nameObj = cls.pointers && cls.pointers[Squeak.Class_name];
        var name = nameObj && nameObj.bytes ? nameObj.bytesAsString() : "???";
        return isMeta ? name + " class" : name;
    }
},
'as method', {
    methodHeader: function() {
        return this.getPointer(0);
    },
    methodNumLits: function() {
        return (this.methodHeader()>>9) & 0xFF;
    },
    methodNumArgs: function() {
        return (this.methodHeader()>>24) & 0xF;
    },
    methodPrimitiveIndex: function() {
        var primBits = (this.methodHeader()) & 0x300001FF;
        if (primBits > 0x1FF)
            return (primBits & 0x1FF) + (primBits >> 19);
        else
            return primBits;
    },
    methodClassForSuper: function() {//assn found in last literal
        var assn = this.getPointer(this.methodNumLits());
        return assn.getPointer(Squeak.Assn_value);
    },
    methodNeedsLargeFrame: function() {
        return (this.methodHeader() & 0x20000) > 0; 
    },
    methodAddPointers: function(headerAndLits) {
        this.pointers = headerAndLits; 
    },
    methodTempCount: function() {
        return (this.methodHeader()>>18) & 63; 
    },
    methodGetLiteral: function(zeroBasedIndex) {
        return this.getPointer(1+zeroBasedIndex); // step over header
    },
    methodGetSelector: function(zeroBasedIndex) {
        return this.getPointer(1+zeroBasedIndex); // step over header 
    },
    methodSetLiteral: function(zeroBasedIndex, value) {
        this.setPointer(1+zeroBasedIndex, value); // step over header
    },
    methodEndPC: function() {
    	// index after the last bytecode
    	var length = this.bytes.length;
    	var flagByte = this.bytes[length - 1];
    	if (flagByte === 0) // If last byte == 0, may be either 0, 0, 0, 0 or just 0
    		for (var i = 2; i <= 5 ; i++) 
    		    if (this.bytes[length - i] !== 0)
    		        return length - i + 1;
    	if (flagByte < 252) // Magic sources (tempnames encoded in last few bytes)
    	    return length - flagByte - 1;
    	// Normal 4-byte source pointer
    	return length - 4;
    },
},
'as context',
{
    contextHome: function() {
        return this.contextIsBlock() ? this.pointers[Squeak.BlockContext_home] : this;
    },
    contextIsBlock: function() {
        return typeof this.pointers[Squeak.BlockContext_argumentCount] === 'number';
    },
    contextMethod: function() {
        return this.contextHome().pointers[Squeak.Context_method];
    },
    contextSender: function() {
        return this.pointers[Squeak.Context_sender];
    },
});

Object.subclass('users.bert.SqueakJS.vm.Interpreter',
'initialization', {
    initialize: function(image, display) {
        console.log('squeak: initializing interpreter');
        this.image = image;
        this.image.vm = this;
        this.initConstants();
        this.primHandler = new users.bert.SqueakJS.vm.Primitives(this, display);
        this.loadImageState();
        this.initVMState();
        this.loadInitialContext();
        console.log('squeak: interpreter ready');
    },
    initConstants: function() {
        this.minSmallInt = -0x40000000;
        this.maxSmallInt =  0x3FFFFFFF;
        this.nonSmallInt = -0x50000000; //non-small and neg (so non pos32 too)
        this.millisecondClockMask = this.maxSmallInt >> 1; //keeps ms logic in small int range
    },
    loadImageState: function() {
        this.specialObjects = this.image.specialObjectsArray.pointers;
        this.specialSelectors = this.specialObjects[Squeak.splOb_SpecialSelectors].pointers;
        this.nilObj = this.specialObjects[Squeak.splOb_NilObject];
        this.falseObj = this.specialObjects[Squeak.splOb_FalseObject];
        this.trueObj = this.specialObjects[Squeak.splOb_TrueObject];
    },
    initVMState: function() {
        this.byteCodeCount = 0;
        this.sendCount = 0;
        this.interruptCheckCounter = 0;
        this.interruptCheckCounterFeedBackReset = 1000;
        this.interruptChecksEveryNms = 3;
        this.nextPollTick = 0;
        this.nextWakeupTick = 0;
        this.lastTick = 0;
        this.interruptKeycode = 2094;  //"cmd-."
        this.interruptPending = false;
        //this.semaphoresToSignal = [];
        //this.deferDisplayUpdates = false;
        //this.pendingFinalizationSignals = 0;
        this.freeContexts = this.nilObj;
        this.freeLargeContexts = this.nilObj;
        this.reclaimableContextCount = 0;
        this.nRecycledContexts = 0;
        this.nAllocatedContexts = 0;
        this.methodCacheSize = 1024;
        this.methodCacheMask = this.methodCacheSize - 1;
        this.methodCacheRandomish = 0;
        this.methodCache = [];
        for (var i = 0; i < this.methodCacheSize; i++)
            this.methodCache[i] = {lkupClass: null, selector: null, method: null, primIndex: 0, argCount: 0};
        this.breakOutOfInterpreter = false;
        this.breakOutTick = 0;
        this.breakOnMethod = null; // method to break on
        this.breakOnNewMethod = false;
        this.breakOnContextChanged = false;
        this.breakOnContextReturned = null; // context to break on
        this.startupTime = Date.now(); // base for millisecond clock
    },
    loadInitialContext: function() {
        var schedAssn = this.specialObjects[Squeak.splOb_SchedulerAssociation];
        var sched = schedAssn.getPointer(Squeak.Assn_value);
        var proc = sched.getPointer(Squeak.ProcSched_activeProcess);
        this.activeContext = proc.getPointer(Squeak.Proc_suspendedContext);
        this.fetchContextRegisters(this.activeContext);
        this.reclaimableContextCount = 0;
    },
},
'interpreting', {
    interpretOne: function() {
        var b, b2;
        this.byteCodeCount++;
        b = this.nextByte();
        switch (b) { /* The Main Bytecode Dispatch Loop */

            // load receiver variable
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: 
            case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: 
                this.push(this.receiver.getPointer(b&0xF)); break;

            // load temporary variable
            case 16: case 17: case 18: case 19: case 20: case 21: case 22: case 23: 
            case 24: case 25: case 26: case 27: case 28: case 29: case 30: case 31: 
                this.push(this.homeContext.getPointer(Squeak.Context_tempFrameStart+(b&0xF))); break;

            // loadLiteral
            case 32: case 33: case 34: case 35: case 36: case 37: case 38: case 39: 
            case 40: case 41: case 42: case 43: case 44: case 45: case 46: case 47: 
            case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55: 
            case 56: case 57: case 58: case 59: case 60: case 61: case 62: case 63: 
                this.push(this.method.methodGetLiteral(b&0x1F)); break;

            // loadLiteralIndirect
            case 64: case 65: case 66: case 67: case 68: case 69: case 70: case 71: 
            case 72: case 73: case 74: case 75: case 76: case 77: case 78: case 79: 
            case 80: case 81: case 82: case 83: case 84: case 85: case 86: case 87: 
            case 88: case 89: case 90: case 91: case 92: case 93: case 94: case 95: 
                this.push((this.method.methodGetLiteral(b&0x1F)).getPointer(Squeak.Assn_value)); break;

            // storeAndPop rcvr, temp
            case 96: case 97: case 98: case 99: case 100: case 101: case 102: case 103: 
                this.receiver.setPointer(b&7, this.pop()); break;
            case 104: case 105: case 106: case 107: case 108: case 109: case 110: case 111: 
                this.homeContext.setPointer(Squeak.Context_tempFrameStart+(b&7), this.pop()); break;

            // Quick push
            case 112: this.push(this.receiver); break;
            case 113: this.push(this.trueObj); break;
            case 114: this.push(this.falseObj); break;
            case 115: this.push(this.nilObj); break;
            case 116: this.push(-1); break;
            case 117: this.push(0); break;
            case 118: this.push(1); break;
            case 119: this.push(2); break;

            // Quick return
            case 120: this.doReturn(this.receiver, this.homeContext.getPointer(Squeak.Context_sender)); break;
            case 121: this.doReturn(this.trueObj, this.homeContext.getPointer(Squeak.Context_sender)); break;
            case 122: this.doReturn(this.falseObj, this.homeContext.getPointer(Squeak.Context_sender)); break;
            case 123: this.doReturn(this.nilObj, this.homeContext.getPointer(Squeak.Context_sender)); break;
            case 124: this.doReturn(this.pop(), this.homeContext.getPointer(Squeak.Context_sender)); break;
            case 125: this.doReturn(this.pop(), this.activeContext.getPointer(Squeak.BlockContext_caller)); break; // blockReturn
            case 126: this.nono(); break;
            case 127: this.nono(); break;

            // Sundry
            case 128: this.extendedPush(this.nextByte()); break;
            case 129: this.extendedStore(this.nextByte()); break;
            case 130: this.extendedStorePop(this.nextByte()); break;
            // singleExtendedSend
            case 131: b2 = this.nextByte(); this.send(this.method.methodGetSelector(b2&31), b2>>5, false); break;
            case 132: this.doubleExtendedDoAnything(this.nextByte()); break;
            // singleExtendedSendToSuper
            case 133: b2= this.nextByte(); this.send(this.method.methodGetSelector(b2&31), b2>>5, true); break;
            // secondExtendedSend
            case 134: b2= this.nextByte(); this.send(this.method.methodGetSelector(b2&63), b2>>6, false); break;
            case 135: this.pop(); break;	// pop
            case 136: this.push(this.top()); break;	// dup
            // thisContext
            case 137: this.push(this.activeContext); this.reclaimableContextCount = 0; break;

            //Unused...
            case 138: case 139: case 140: case 141: case 142: case 143: 
                this.nono(); break;

            // Short jmp
            case 144: case 145: case 146: case 147: case 148: case 149: case 150: case 151: 
                this.pc += (b&7)+1; break;
            // Short conditional jump on false
            case 152: case 153: case 154: case 155: case 156: case 157: case 158: case 159: 
                this.jumpIfFalse((b&7)+1); break;
            // Long jump, forward and back
            case 160: case 161: case 162: case 163: case 164: case 165: case 166: case 167: 
                b2 = this.nextByte();
                this.pc += (((b&7)-4)*256 + b2);
                if ((b&7)<4) this.checkForInterrupts();  //check on backward jumps (loops)
                break;
            // Long conditional jump on true
            case 168: case 169: case 170: case 171:
                this.jumpIfTrue((b&3)*256 + this.nextByte()); break;
            // Long conditional jump on false
            case 172: case 173: case 174: case 175: 
                this.jumpIfFalse((b&3)*256 + this.nextByte()); break;

            // Arithmetic Ops... + - < > <= >= = ~=    * / \ @ lshift: lxor: land: lor:
            case 176: this.success = true;
                if(!this.pop2AndPushIntResult(this.stackInteger(1) + this.stackInteger(0))) this.sendSpecial(b&0xF); break;	// PLUS +
            case 177: this.success = true;
                if(!this.pop2AndPushIntResult(this.stackInteger(1) - this.stackInteger(0))) this.sendSpecial(b&0xF); break;	// PLUS +
            case 178: this.success = true;
                if(!this.pop2AndPushBoolResult(this.stackInteger(1) < this.stackInteger(0))) this.sendSpecial(b&0xF); break;  // LESS <
            case 179: this.success = true;
                if(!this.pop2AndPushBoolResult(this.stackInteger(1) > this.stackInteger(0))) this.sendSpecial(b&0xF); break;  // GRTR >
            case 180: this.success = true;
                if(!this.pop2AndPushBoolResult(this.stackInteger(1) <= this.stackInteger(0))) this.sendSpecial(b&0xF); break;  // LEQ <=
            case 181: this.success = true;
                if(!this.pop2AndPushBoolResult(this.stackInteger(1) >= this.stackInteger(0))) this.sendSpecial(b&0xF); break;  // GEQ >=
            case 182: this.success = true;
                if(!this.pop2AndPushBoolResult(this.stackInteger(1) === this.stackInteger(0))) this.sendSpecial(b&0xF); break;  // EQU =
            case 183: this.success = true;
                if(!this.pop2AndPushBoolResult(this.stackInteger(1) !== this.stackInteger(0))) this.sendSpecial(b&0xF); break;  // NEQ ~=
            case 184: this.success = true;
                if(!this.pop2AndPushIntResult(this.stackInteger(1) * this.stackInteger(0))) this.sendSpecial(b&0xF); break;  // TIMES *
            case 185: this.success = true;
                if(!this.pop2AndPushIntResult(this.quickDivide(this.stackInteger(1),this.stackInteger(0)))) this.sendSpecial(b&0xF); break;  // Divide /
            case 186: this.success = true;
                if(!this.pop2AndPushIntResult(this.mod(this.stackInteger(1),this.stackInteger(0)))) this.sendSpecial(b&0xF); break;  // MOD \\
            case 187: this.success = true;
                if(!this.primHandler.primitiveMakePoint(1)) this.sendSpecial(b&0xF); break;  // MakePt int@int
            case 188: this.success = true;
                if(!this.pop2AndPushIntResult(this.safeShift(this.stackInteger(1),this.stackInteger(0)))) this.sendSpecial(b&0xF); break; // bitShift:
            case 189: this.success = true;
                if(!this.pop2AndPushIntResult(this.div(this.stackInteger(1),this.stackInteger(0)))) this.sendSpecial(b&0xF); break;  // Divide //
            case 190: this.success = true;
                if(!this.pop2AndPushIntResult(this.stackInteger(1) & this.stackInteger(0))) this.sendSpecial(b&0xF); break; // bitAnd:
            case 191: this.success = true;
                if(!this.pop2AndPushIntResult(this.stackInteger(1) | this.stackInteger(0))) this.sendSpecial(b&0xF); break; // bitOr:

            // at:, at:put:, size, next, nextPut:, ...
            case 192: case 193: case 194: case 195: case 196: case 197: case 198: case 199: 
            case 200: case 201: case 202: case 203: case 204: case 205: case 206: case 207: 
                if (!this.primHandler.quickSendOther(this.receiver, b&0xF))
                    this.sendSpecial((b&0xF)+16); break;

            // Send Literal Selector with 0, 1, and 2 args
            case 208: case 209: case 210: case 211: case 212: case 213: case 214: case 215: 
            case 216: case 217: case 218: case 219: case 220: case 221: case 222: case 223: 
                this.send(this.method.methodGetSelector(b&0xF), 0, false); break;
            case 224: case 225: case 226: case 227: case 228: case 229: case 230: case 231: 
            case 232: case 233: case 234: case 235: case 236: case 237: case 238: case 239: 
                this.send(this.method.methodGetSelector(b&0xF), 1, false); break;
            case 240: case 241: case 242: case 243: case 244: case 245: case 246: case 247: 
            case 248: case 249: case 250: case 251: case 252: case 253: case 254: case 255:
                this.send(this.method.methodGetSelector(b&0xF), 2, false); break;
        }
    },
    interpret: function(forMilliseconds, thenDo) {
        // run until idle, but at most for a couple milliseconds
        // answer milliseconds to sleep (until next timer wakeup)
        // or 'break' if reached breakpoint
        // call thenDo with that result when done
        if (this.frozen) return 'frozen';
        this.isIdle = false;
        this.breakOutOfInterpreter = false;
        this.breakOutTick = this.lastTick + (forMilliseconds || 500);
        while (!this.breakOutOfInterpreter)
            this.interpretOne();
        // this is to allow 'freezing' the interpreter and restarting it asynchronously. See freeze()
        if (typeof this.breakOutOfInterpreter == "function")
            return this.breakOutOfInterpreter(thenDo);
        // normally, we answer regularly
        var result = this.breakOutOfInterpreter == 'break' ? 'break'
            : !this.isIdle ? 0
            : !this.nextWakeupTick ? 'sleep'        // all processes waiting
            : Math.max(200, this.nextWakeupTick - this.primHandler.millisecondClockValue());
        if (thenDo) thenDo(result);
        return result;
    },
    freeze: function(externalContinueFunc) {
        // Stop the interpreter. Answer a function that can be
        // called to continue interpreting.
        var continueFunc = externalContinueFunc; // only needed if called from outside the interpreter
        this.primHandler.displayFlush(); // make sure display is up to date
        this.frozen = true;
        this.breakOutOfInterpreter = function(thenDo) {
            if (!thenDo) throw Error("need function to restart interpreter");
            continueFunc = thenDo;
            return "frozen";
        }.bind(this);
        return function unfreeze() {
            this.frozen = false;
            if (!continueFunc) throw Error("no continue function");
            continueFunc(0);    //continue without timeout
        }.bind(this);
    },
    nextByte: function() {
        return this.methodBytes[this.pc++] & 0xFF;
    },
    nono: function() {
        throw Error("Oh No!");
    },
    checkForInterrupts: function() {
        //Check for interrupts at sends and backward jumps
        if (this.interruptCheckCounter-- > 0) return; //only really check every 100 times or so
        var now = this.primHandler.millisecondClockValue();
        if (now < this.lastTick) { // millisecond clock wrapped
            this.nextPollTick = now + (this.nextPollTick - this.lastTick);
            this.breakOutTick = now + (this.breakOutTick - this.lastTick);
            if (this.nextWakeupTick !== 0)
                this.nextWakeupTick = now + (this.nextWakeupTick - this.lastTick);
        }
        //Feedback logic attempts to keep interrupt response around 3ms...
        if ((now - this.lastTick) < this.interruptChecksEveryNms)  //wrapping is not a concern
            this.interruptCheckCounterFeedBackReset += 10;
        else {
            if (this.interruptCheckCounterFeedBackReset <= 1000)
                this.interruptCheckCounterFeedBackReset = 1000;
            else
                this.interruptCheckCounterFeedBackReset -= 12;
        }
    	this.interruptCheckCounter = this.interruptCheckCounterFeedBackReset; //reset the interrupt check counter
    	this.lastTick = now; //used to detect wraparound of millisecond clock
        //	if(signalLowSpace) {
        //            signalLowSpace= false; //reset flag
        //            sema= getSpecialObject(Squeak.splOb_TheLowSpaceSemaphore);
        //            if(sema != nilObj) synchronousSignal(sema); }
        //	if(now >= nextPollTick) {
        //            ioProcessEvents(); //sets interruptPending if interrupt key pressed
        //            nextPollTick= now + 500; } //msecs to wait before next call to ioProcessEvents"
        if (this.interruptPending) {
            this.interruptPending = false; //reset interrupt flag
            var sema = this.specialObjects[Squeak.splOb_TheInterruptSemaphore];
            if (!sema.isNil) this.primHandler.synchronousSignal(sema);
        }
        if ((this.nextWakeupTick !== 0) && (now >= this.nextWakeupTick)) {
            this.nextWakeupTick = 0; //reset timer interrupt
            var sema = this.specialObjects[Squeak.splOb_TheTimerSemaphore];
            if (!sema.isNil) this.primHandler.synchronousSignal(sema);
        }
        //	if (pendingFinalizationSignals > 0) { //signal any pending finalizations
        //            sema= getSpecialObject(Squeak.splOb_ThefinalizationSemaphore);
        //            pendingFinalizationSignals= 0;
        //            if(sema != nilObj) primHandler.synchronousSignal(sema); }
        //if (this.semaphoresToSignal.length)
        //    this.signalExternalSemaphores();  //signal all semaphores in semaphoresToSignal
        if (now >= this.breakOutTick) // have to return to web browser once in a while
            this.breakOutOfInterpreter = this.breakOutOfInterpreter || true; // do not overwrite break string
    },
    extendedPush: function(nextByte) {
        var lobits = nextByte & 63;
        switch (nextByte>>6) {
            case 0: this.push(this.receiver.getPointer(lobits));break;
            case 1: this.push(this.homeContext.getPointer(Squeak.Context_tempFrameStart+lobits)); break;
            case 2: this.push(this.method.methodGetLiteral(lobits)); break;
            case 3: this.push(this.method.methodGetLiteral(lobits).getPointer(Squeak.Assn_value)); break;
        }
    },
    extendedStore: function( nextByte) {
        var lobits = nextByte & 63;
        switch (nextByte>>6) {
            case 0: this.receiver.setPointer(lobits, this.top()); break;
            case 1: this.homeContext.setPointer(Squeak.Context_tempFrameStart+lobits, this.top()); break;
            case 2: this.nono(); break;
            case 3: this.method.methodGetLiteral(lobits).setPointer(Squeak.Assn_value, this.top()); break;
        }
    },
    extendedStorePop: function(nextByte) {
        var lobits = nextByte & 63;
        switch (nextByte>>6) {
            case 0: this.receiver.setPointer(lobits, this.pop()); break;
            case 1: this.homeContext.setPointer(Squeak.Context_tempFrameStart+lobits, this.pop()); break;
            case 2: this.nono(); break;
            case 3: this.method.methodGetLiteral(lobits).setPointer(Squeak.Assn_value, this.pop()); break;
        }
    },
    doubleExtendedDoAnything: function(byte2) {
        var byte3 = this.nextByte();
        switch (byte2>>5) {
            case 0: this.send(this.method.methodGetSelector(byte3), byte2&31, false); break;
            case 1: this.send(this.method.methodGetSelector(byte3), byte2&31, true); break;
            case 2: this.push(this.receiver.getPointer(byte3)); break;
            case 3: this.push(this.method.methodGetLiteral(byte3)); break;
            case 4: this.push(this.method.methodGetLiteral(byte3).getPointer(Squeak.Assn_value)); break;
            case 5: this.receiver.setPointer(byte3, this.top()); break;
            case 6: this.receiver.setPointer(byte3, this.pop()); break;
            case 7: this.method.methodGetLiteral(byte3).setPointer(Squeak.Assn_value, this.top()); break;
        }
    },
    jumpIfTrue: function(delta) {
        var top = this.pop();
        if (top.isTrue) {this.pc += delta; return;}
        if (top.isFalse) return;
        this.push(top); //Uh-oh it's not even a boolean (that we know of ;-).  Restore stack...
        this.send(this.specialObjects[Squeak.splOb_SelectorMustBeBoolean], 1, false);
    },
    jumpIfFalse: function(delta) {
        var top = this.pop();
        if (top.isFalse) {this.pc += delta; return;}
        if (top.isTrue) return;
        this.push(top); //Uh-oh it's not even a boolean (that we know of ;-).  Restore stack...
        this.send(this.specialObjects[Squeak.splOb_SelectorMustBeBoolean], 1, false);
    },
    sendSpecial: function(lobits) {
        this.send(this.specialSelectors[lobits*2],
            this.specialSelectors[(lobits*2)+1],
            false);  //specialSelectors is  {...sel,nArgs,sel,nArgs,...)
    },
},
'sending', {
    send: function(selector, argCount, doSuper) {
        var newRcvr = this.stackValue(argCount);
        var lookupClass = this.getClass(newRcvr);
        if (doSuper) {
            lookupClass = this.method.methodClassForSuper();
            lookupClass = lookupClass.getPointer(Squeak.Class_superclass);
        }
        var entry = this.findSelectorInClass(selector, argCount, lookupClass);
        if (entry.primIndex) {
            //note details for verification of at/atput primitives
            this.verifyAtSelector = selector;
            this.verifyAtClass = lookupClass;
        }
        this.executeNewMethod(newRcvr, entry.method, entry.argCount, entry.primIndex);
    },
    findSelectorInClass: function(selector, argCount, startingClass) {
        var cacheEntry = this.findMethodCacheEntry(selector, startingClass);
        if (cacheEntry.method) return cacheEntry; // Found it in the method cache
        var currentClass = startingClass;
        var mDict;
        while (!currentClass.isNil) {
            mDict = currentClass.getPointer(Squeak.Class_mdict);
            if (mDict.isNil) {
//                ["MethodDict pointer is nil (hopefully due a swapped out stub)
//                        -- raise exception #cannotInterpret:."
//                self createActualMessageTo: class.
//                messageSelector _ self splObj: SelectorCannotInterpret.
//                ^ self lookupMethodInClass: (self superclassOf: currentClass)]
                throw Error("cannotInterpret");
            }
            var newMethod = this.lookupSelectorInDict(mDict, selector);
            if (!newMethod.isNil) {
                //load cache entry here and return
                cacheEntry.method = newMethod;
                cacheEntry.primIndex = newMethod.methodPrimitiveIndex();
                cacheEntry.argCount = argCount;
                return cacheEntry;
            }  
            currentClass = currentClass.getPointer(Squeak.Class_superclass);
        }
        //Cound not find a normal message -- send #doesNotUnderstand:
        var dnuSel = this.specialObjects[Squeak.splOb_SelectorDoesNotUnderstand];
        if (selector === dnuSel) // Cannot find #doesNotUnderstand: -- unrecoverable error.
            throw Error("Recursive not understood error encountered");
        var dnuMsg = this.createActualMessage(selector, argCount, startingClass); //The argument to doesNotUnderstand:
        this.popNandPush(argCount, dnuMsg);
        return this.findSelectorInClass(dnuSel, 1, startingClass);
    },
    lookupSelectorInDict: function(mDict, messageSelector) {
        //Returns a method or nilObject
        var dictSize = mDict.pointersSize();
        var mask = (dictSize - Squeak.MethodDict_selectorStart) - 1;
        var index = (mask & messageSelector.hash) + Squeak.MethodDict_selectorStart;
    	// If there are no nils (should always be), then stop looping on second wrap.
    	var hasWrapped = false;
        while (true) {
            var nextSelector = mDict.getPointer(index);
            if (nextSelector === messageSelector) {
                var methArray = mDict.getPointer(Squeak.MethodDict_array);
                return methArray.getPointer(index - Squeak.MethodDict_selectorStart);
            }
            if (nextSelector.isNil) return this.nilObj;
            if (++index === dictSize) {
                if (hasWrapped) return this.nilObj;
                index = Squeak.MethodDict_selectorStart;
                hasWrapped = true;
            }
        }
    },
    executeNewMethod: function(newRcvr, newMethod, argumentCount, primitiveIndex) {
        this.sendCount++;
        if (newMethod === this.breakOnMethod) this.breakOutOfInterpreter = 'break';
        if (this.logSends) console.log(this.sendCount + ' ' + this.printMethod(newMethod));
        if (this.breakOnContextChanged) {
            this.breakOnContextChanged = false;
            this.breakOutOfInterpreter = 'break';
        }
        if (primitiveIndex > 0)
            if (this.tryPrimitive(primitiveIndex, argumentCount, newMethod))
                return;  //Primitive succeeded -- end of story
        var newContext = this.allocateOrRecycleContext(newMethod.methodNeedsLargeFrame());
    	var tempCount = newMethod.methodTempCount();
        var newPC = 0; // direct zero-based index into byte codes
        var newSP = Squeak.Context_tempFrameStart + tempCount - 1; // direct zero-based index into context pointers
        newContext.setPointer(Squeak.Context_method, newMethod);
        //Following store is in case we alloc without init; all other fields get stored
        newContext.setPointer(Squeak.BlockContext_initialIP, this.nilObj);
        newContext.setPointer(Squeak.Context_sender, this.activeContext);
        //Copy receiver and args to new context
        //Note this statement relies on the receiver slot being contiguous with args...
        this.arrayCopy(this.activeContext.pointers, this.sp-argumentCount, newContext.pointers, Squeak.Context_tempFrameStart-1, argumentCount+1);
        //...and fill the remaining temps with nil
        this.arrayFill(newContext.pointers, Squeak.Context_tempFrameStart+argumentCount, Squeak.Context_tempFrameStart+tempCount, this.nilObj);
        this.popN(argumentCount+1);
	    this.reclaimableContextCount++;
        this.storeContextRegisters();
        /////// Woosh //////
        this.activeContext = newContext; //We're off and running...
        //Following are more efficient than fetchContextRegisters() in newActiveContext()
        this.homeContext = newContext;
        this.method = newMethod;
        this.methodBytes = newMethod.bytes;
        this.pc = newPC;
        this.sp = newSP;
        this.storeContextRegisters(); // not really necessary, I claim
        this.receiver = newContext.getPointer(Squeak.Context_receiver);
        if (this.receiver !== newRcvr)
            throw Error("receivers don't match");
        this.checkForInterrupts();
    },
    doReturn: function(returnValue, targetContext) {
        if (targetContext.isNil || targetContext.getPointer(Squeak.Context_instructionPointer).isNil)
            this.cannotReturn();
        // search up stack for unwind
        var thisContext = this.activeContext;
        while (thisContext !== targetContext) {
            if (thisContext.isNil)
                this.cannotReturn();
            if (this.isUnwindMarked(thisContext))
                this.aboutToReturn(returnValue,thisContext);
            thisContext = thisContext.getPointer(Squeak.Context_sender);
        }
        // no unwind to worry about, just peel back the stack (usually just to sender)
        var nextContext;
        thisContext = this.activeContext;
        while (thisContext !== targetContext) {
            if (this.breakOnContextReturned === thisContext) {
                this.breakOnContextReturned = null;
                this.breakOutOfInterpreter = 'break';
            }
            nextContext = thisContext.getPointer(Squeak.Context_sender);
            thisContext.setPointer(Squeak.Context_sender, this.nilObj);
            thisContext.setPointer(Squeak.Context_instructionPointer, this.nilObj);
            if (this.reclaimableContextCount > 0) {
                this.reclaimableContextCount--;
                this.recycleIfPossible(thisContext);
            }
            thisContext = nextContext;
        }
        this.activeContext = thisContext;
        this.fetchContextRegisters(this.activeContext);
        this.push(returnValue);
        if (this.breakOnContextChanged) {
            this.breakOnContextChanged = false;
            this.breakOutOfInterpreter = 'break';
        }
    },
    tryPrimitive: function(primIndex, argCount, newMethod) {
        if ((primIndex > 255) && (primIndex < 520)) {
            if (primIndex >= 264) {//return instvars
                this.popNandPush(1, this.top().getPointer(primIndex - 264));
                return true;
            }
            switch (primIndex) {
                case 256: //return self
                    return true;
                case 257: this.popNandPush(1, this.trueObj); //return true
                    return true;
                case 258: this.popNandPush(1, this.falseObj); //return false
                    return true;
                case 259: this.popNandPush(1, this.nilObj); //return nil
                    return true;
            }
            this.popNandPush(1, primIndex - 261); //return -1...2
            return true;
        }
        var success = this.primHandler.doPrimitive(primIndex, argCount, newMethod);
        return success;
    },
    createActualMessage: function(selector, argCount, cls) {
        //Bundle up receiver, args and selector as a messageObject
        var message = this.instantiateClass(this.specialObjects[Squeak.splOb_ClassMessage], 0);
        var argArray = this.instantiateClass(this.specialObjects[Squeak.splOb_ClassArray], argCount);
        this.arrayCopy(this.activeContext.pointers, this.sp-argCount+1, argArray.pointers, 0, argCount); //copy args from stack
        message.setPointer(Squeak.Message_selector, selector);
        message.setPointer(Squeak.Message_arguments, argArray);
        if (message.pointers.length > Squeak.Message_lookupClass) //Early versions don't have lookupClass
            message.setPointer(Squeak.Message_lookupClass, cls);
        return message;
    },
    primitivePerform: function(argCount) {
        var selector = this.stackValue(argCount-1);
        var rcvr = this.stackValue(argCount);
        // NOTE: findNewMethodInClass may fail and be converted to #doesNotUnderstand:,
        //       (Whoah) so we must slide args down on the stack now, so that would work
        var trueArgCount = argCount - 1;
        var selectorIndex = this.sp - trueArgCount;
        var stack = this.activeContext.pointers; // slide eveything down...
        this.arrayCopy(stack, selectorIndex+1, stack, selectorIndex, trueArgCount);
        this.sp--; // adjust sp accordingly
        var entry = this.findSelectorInClass(selector, trueArgCount, this.getClass(rcvr));
        this.executeNewMethod(rcvr, entry.method, entry.argCount, entry.primIndex);
        return true;
    },
    primitivePerformWithArgs: function(argCount, supered) {
        var rcvr = this.stackValue(argCount);
        var selector = this.stackValue(argCount - 1);
        var args = this.stackValue(argCount - 2);
        if (args.sqClass !== this.specialObjects[Squeak.splOb_ClassArray])
            return false;
        var lookupClass = supered ? this.stackValue(argCount - 3) : this.getClass(rcvr);
        if (supered) { // verify that lookupClass is in fact in superclass chain of receiver;
            var cls = this.getClass(rcvr);
            while (cls !== lookupClass) {
                cls = cls.pointers[Squeak.Class_superclass];
		        if (cls.isNil) return false;
            }
        }
        var trueArgCount = args.pointersSize();
        var stack = this.activeContext.pointers;
        this.arrayCopy(args.pointers, 0, stack, this.sp - 1, trueArgCount);
        this.sp += trueArgCount - argCount; //pop selector and array then push args
        var entry = this.findSelectorInClass(selector, trueArgCount, lookupClass);
        this.executeNewMethod(rcvr, entry.method, entry.argCount, entry.primIndex);
        return true;
    },
    findMethodCacheEntry: function(selector, lkupClass) {
        //Probe the cache, and return the matching entry if found
        //Otherwise return one that can be used (selector and class set) with method == null.
        //Initial probe is class xor selector, reprobe delta is selector
        //We do not try to optimize probe time -- all are equally 'fast' compared to lookup
        //Instead we randomize the reprobe so two or three very active conflicting entries
        //will not keep dislodging each other
        var entry;
        this.methodCacheRandomish = (this.methodCacheRandomish + 1) & 3;
        var firstProbe = (selector.hash ^ lkupClass.hash) & this.methodCacheMask;
        var probe = firstProbe;
        for (var i = 0; i < 4; i++) { // 4 reprobes for now
            entry = this.methodCache[probe];
            if (entry.selector === selector && entry.lkupClass === lkupClass) return entry;
            if (i === this.methodCacheRandomish) firstProbe = probe;
            probe = (probe + selector.hash) & this.methodCacheMask;
        }
        entry = this.methodCache[firstProbe];
        entry.lkupClass = lkupClass;
        entry.selector = selector;
        entry.method = null;
        return entry;
    },
    flushMethodCache: function() { //clear all cache entries (prim 89)
        for (var i = 0; i < this.methodCacheSize; i++) {
            this.methodCache[i].selector = null;   // mark it free
            this.methodCache[i].method = null;  // release the method
        }
        return true;
    },
    flushMethodCacheForSelector: function(selector) { //clear cache entries for selector (prim 119)
        for (var i = 0; i < this.methodCacheSize; i++)
            if (this.methodCache[i].selector === selector) {
                this.methodCache[i].selector = null;   // mark it free
                this.methodCache[i].method = null;  // release the method
            }
        return true;
    },
    flushMethodCacheForMethod: function(method) { //clear cache entries for method (prim 116)
        for (var i = 0; i < this.methodCacheSize; i++)
            if (this.methodCache[i].method === method) {
                this.methodCache[i].selector = null;   // mark it free
                this.methodCache[i].method = null;  // release the method
            }
        return true;
    },
    flushMethodCacheAfterBecome: function(mutations) {
        // could be selective by checking lkupClass, selector,
        // and method against mutations dict
        this.flushMethodCache();
    },
},
'contexts', {
    isUnwindMarked: function(ctx) {
        return false;
    },
    newActiveContext: function(newContext) {
        // Note: this is inlined in executeNewMethod() and doReturn()
        this.storeContextRegisters();
        this.activeContext = newContext; //We're off and running...
        this.fetchContextRegisters(newContext);
    },
    fetchContextRegisters: function(ctxt) {
        var meth = ctxt.getPointer(Squeak.Context_method);
        if (this.isSmallInt(meth)) { //if the Method field is an integer, activeCntx is a block context
            this.homeContext = ctxt.getPointer(Squeak.BlockContext_home);
            meth = this.homeContext.getPointer(Squeak.Context_method);
        } else { //otherwise home==ctxt
            this.homeContext = ctxt;
        }
        this.receiver = this.homeContext.getPointer(Squeak.Context_receiver);
        this.method = meth;
        this.methodBytes = meth.bytes;
        this.pc = this.decodeSqueakPC(ctxt.getPointer(Squeak.Context_instructionPointer), meth);
        if (this.pc < -1)
            throw Error("bad pc");
        this.sp = this.decodeSqueakSP(ctxt.getPointer(Squeak.Context_stackPointer));
    },
    storeContextRegisters: function() {
        //Save pc, sp into activeContext object, prior to change of context
        //   see fetchContextRegisters for symmetry
        //   expects activeContext, pc, sp, and method state vars to still be valid
        this.activeContext.setPointer(Squeak.Context_instructionPointer,this.encodeSqueakPC(this.pc, this.method));
        this.activeContext.setPointer(Squeak.Context_stackPointer,this.encodeSqueakSP(this.sp));
    },
    encodeSqueakPC: function(intPC, method) {
        // Squeak pc is offset by header and literals
        // and 1 for z-rel addressing
        return intPC + (((method.methodNumLits()+1)*4) + 1);
    },
    decodeSqueakPC: function(squeakPC, method) {
        return squeakPC - (((method.methodNumLits()+1)*4) + 1);
    },
    encodeSqueakSP: function(intSP) {
        // sp is offset by tempFrameStart, -1 for z-rel addressing
        return intSP - (Squeak.Context_tempFrameStart - 1);
    },
    decodeSqueakSP: function(squeakSP) {
        return squeakSP + (Squeak.Context_tempFrameStart - 1);
    },
    recycleIfPossible: function(ctxt) {
        if (!this.isMethodContext(ctxt)) return;
        if (ctxt.pointersSize() === (Squeak.Context_tempFrameStart+Squeak.Context_smallFrameSize)) {
            // Recycle small contexts
            ctxt.setPointer(0, this.freeContexts);
            this.freeContexts = ctxt;
        } else { // Recycle large contexts
            if (ctxt.pointersSize() !== (Squeak.Context_tempFrameStart+Squeak.Context_largeFrameSize))
                return;
            ctxt.setPointer(0, this.freeLargeContexts);
            this.freeLargeContexts = ctxt;
        }
    },
    allocateOrRecycleContext: function(needsLarge) {
        //Return a recycled context or a newly allocated one if none is available for recycling."
        var freebie;
        if (needsLarge) {
            if (!this.freeLargeContexts.isNil) {
                freebie = this.freeLargeContexts;
                this.freeLargeContexts = freebie.getPointer(0);
                this.nRecycledContexts++;
                return freebie;
            }
            this.nAllocatedContexts++;
            return this.instantiateClass(this.specialObjects[Squeak.splOb_ClassMethodContext], Squeak.Context_largeFrameSize);
        } else {
            if (!this.freeContexts.isNil) {
                freebie = this.freeContexts;
                this.freeContexts = freebie.getPointer(0);
                this.nRecycledContexts++;
                return freebie;
            }
            this.nAllocatedContexts++;
            return this.instantiateClass(this.specialObjects[Squeak.splOb_ClassMethodContext], Squeak.Context_smallFrameSize);
        }
    },
},
'stack access', {
    pop: function() {
        //Note leaves garbage above SP.  Cleaned out by fullGC.
        return this.activeContext.pointers[this.sp--];  
    },
    popN: function(nToPop) {
        this.sp -= nToPop;
    },
    push: function(oop) {
        this.activeContext.pointers[++this.sp] = oop;
    },
    popNandPush: function(nToPop, oop) {
        this.activeContext.pointers[this.sp -= nToPop - 1] = oop;
    },
    top: function() {
        return this.activeContext.pointers[this.sp];
    },
    stackValue: function(depthIntoStack) {
        return this.activeContext.pointers[this.sp - depthIntoStack];
    },
    stackInteger: function(depthIntoStack) {
        return this.checkSmallInt(this.stackValue(depthIntoStack));
    },
    pop2AndPushIntResult: function(intResult) {// returns success boolean
        if (this.success && this.canBeSmallInt(intResult)) {
            this.popNandPush(2, intResult);
            return true;
        }
        return false;
    },
    pop2AndPushBoolResult: function(boolResult) {
        if (!this.success) return false;
        this.popNandPush(2, boolResult ? this.trueObj : this.falseObj);
        return true;
    },
},
'numbers', {
    getClass: function(obj) {
        if (this.isSmallInt(obj))
            return this.specialObjects[Squeak.splOb_ClassInteger];
        return obj.sqClass;
    },
    canBeSmallInt: function(anInt) {
        return (anInt >= this.minSmallInt) && (anInt <= this.maxSmallInt);
    },
    isSmallInt: function(object) {
        return typeof object === "number";
    },
    checkSmallInt: function(maybeSmall) { // returns an int and sets success
        if (this.isSmallInt(maybeSmall))
            return maybeSmall;
        this.success = false;
        return 1;
    },
    quickDivide: function(rcvr, arg) { // must only handle exact case
        if (arg === 0) return this.nonSmallInt;  // fail if divide by zero
        var result = rcvr / arg | 0;
        if (result * arg === rcvr) return result;
        return this.nonSmallInt;     // fail if result is not exact
    },
    div: function(rcvr, arg) {
        if (arg === 0) return this.nonSmallInt;  // fail if divide by zero
        return Math.floor(rcvr/arg);
    },
    mod: function(rcvr, arg) {
        if (arg === 0) return this.nonSmallInt;  // fail if divide by zero
        return rcvr - Math.floor(rcvr/arg) * arg;
    },
    safeShift: function(bitsToShift, shiftCount) {
        if (shiftCount<0) return bitsToShift>>-shiftCount; //OK to lose bits shifting right
        //check for lost bits by seeing if computation is reversible
        var shifted = bitsToShift<<shiftCount;
        if  ((shifted>>shiftCount) === bitsToShift) return shifted;
        return this.nonSmallInt;  //non-small result will cause failure
    },
},
'utils',
{
    isContext: function(obj) {//either block or methodContext
        if (obj.sqClass === this.specialObjects[Squeak.splOb_ClassMethodContext]) return true;
        if (obj.sqClass === this.specialObjects[Squeak.splOb_ClassBlockContext]) return true;
        return false;
    },
    isMethodContext: function(obj) {
        return obj.sqClass === this.specialObjects[Squeak.splOb_ClassMethodContext];
    },
    isMethod: function(obj, index) {
        return  obj.sqClass === this.specialObjects[Squeak.splOb_ClassCompiledMethod];
    },
    instantiateClass: function(aClass, indexableSize) {
        return this.image.instantiateClass(aClass, indexableSize, this.nilObj);
    },
    arrayFill: function(array, fromIndex, toIndex, value) {
        // assign value to range from fromIndex (inclusive) to toIndex (exclusive)
        for (var i = fromIndex; i < toIndex; i++)
            array[i] = value;
    },
    arrayCopy: function(src, srcPos, dest, destPos, length) {
        // copy length elements from src at srcPos to dest at destPos
        if (src === dest && srcPos < destPos)
            for (var i = length - 1; i >= 0; i--)
                dest[destPos + i] = src[srcPos + i];
        else
            for (var i = 0; i < length; i++)
                dest[destPos + i] = src[srcPos + i];
    },
},
'debugging', {
    printMethod: function(aMethod) {
        // return a 'class>>selector' description for the method
        // in old images this is expensive, we have to search all classes
        if (!aMethod) aMethod = this.activeContext.contextMethod();
        var found;
        this.allMethodsDo(function(classObj, methodObj, selectorObj) {
            if (methodObj === aMethod)
                return found = classObj.className() + '>>' + selectorObj.bytesAsString();
        });
        return found || "?>>?";
    },
    allMethodsDo: function(callback) {
        // callback(classObj, methodObj, selectorObj) should return true to break out of iteration
        var globals = this.specialObjects[Squeak.splOb_SmalltalkDictionary].pointers[1].pointers;
        for (var i = 0; i < globals.length; i++) {
            var assn = globals[i];
            if (!assn.isNil) {
                var assnVal = assn.pointers[1];
                if (assnVal.pointers && assnVal.pointers.length >= 9) {
                    var clsAndMeta = [assnVal, assnVal.sqClass];
                    for (var c = 0; c < clsAndMeta.length; c++) {
                        var cls = clsAndMeta[c];
                        var mdict = cls.pointers[1];
                        if (!mdict.pointers || !mdict.pointers[1]) continue;
                        var methods = mdict.pointers[1].pointers;
                        if (!methods) continue;
                        var selectors = mdict.pointers;
                        for (var j = 0; j < methods.length; j++) {
                            if (callback.call(this, cls, methods[j], selectors[2+j]))
                                return;
                        }
                    }
                }
            }
        }
    },
    printStack: function(ctx, limit) {
        // both args are optional
        if (typeof ctx == "number") {limit = ctx; ctx = null;}
        if (!ctx) ctx = this.activeContext;
        if (!limit) limit = 100;
        var stack = '';
        while (!ctx.isNil && limit-- > 0) {
            var block = '';
            var method = ctx.pointers[Squeak.Context_method];
            if (typeof method === 'number') { // it's a block context, fetch home
                method = ctx.pointers[Squeak.BlockContext_home].pointers[Squeak.Context_method];
                block = '[] in ';
            };
            stack = block + this.printMethod(method) + '\n' + stack;
            ctx = ctx.pointers[Squeak.Context_sender];
        }
        return stack;
    },
    breakOn: function(classAndMethodString) {
        // classAndMethodString is 'Class>>method'
        var found;
        this.allMethodsDo(function(classObj, methodObj, selectorObj) {
            if (classAndMethodString == (classObj.className() + '>>' + selectorObj.bytesAsString()))
                return found = methodObj;
        });
        this.breakOnMethod = found;
        return found;
    },
    breakOnReturn: function() {
        this.breakOnContextChanged = false;
        this.breakOnContextReturned = this.activeContext;
    },
    breakOnSendOrReturn: function() {
        this.breakOnContextChanged = true;
        this.breakOnContextReturned = null;
    },
    printActiveContext: function() {
        // temps and stack in current context
        var ctx = this.activeContext;
        var isBlock = typeof ctx.pointers[Squeak.BlockContext_argumentCount] === 'number';
        var homeCtx = isBlock ? ctx.pointers[Squeak.BlockContext_home] : ctx;
        var tempCount = homeCtx.pointers[Squeak.Context_method].methodTempCount();
        var stackBottom = this.decodeSqueakSP(0);
        var stackTop = isBlock
            ? this.decodeSqueakSP(homeCtx.pointers[Squeak.Context_stackPointer])
            : this.sp;
        var firstTemp = stackBottom + 1;
        var lastTemp = firstTemp + tempCount - 1;
        var stack = '';
        for (var i = stackBottom; i <= stackTop; i++) {
            var obj = homeCtx.pointers[i];
            var value = obj.sqInstName ? obj.sqInstName() : obj.toString();
            var label = '';
            if (i == stackBottom) label = '=rcvr'; else
            if (i <= lastTemp) label = '=tmp' + (i - firstTemp);
            stack += '\nctx[' + i + ']' + label +': ' + value;
        }
        if (isBlock) {
            stack += '\n';
            var nArgs = ctx.pointers[3];
            var firstArg = this.decodeSqueakSP(1);
            var lastArg = firstArg + nArgs;
            for (var i = firstArg; i <= this.sp; i++) {
                var obj = ctx.pointers[i];
                var value = obj.sqInstName ? obj.sqInstName() : obj.toString();
                var label = '';
                if (i <= lastArg) label = '=arg' + (i - firstArg);
                stack += '\nblk[' + i + ']' + label +': ' + value;
            }
        }
        return stack;
    },
    printByteCodes: function(aMethod, optionalIndent, optionalHighlight, optionalPC) {
        if (!aMethod) aMethod = this.method;
        var printer = new users.bert.SqueakJS.vm.InstructionPrinter(aMethod, this);
        return printer.printInstructions(optionalIndent, optionalHighlight, optionalPC);
    },
    willSendOrReturn: function() {
        // Answer whether the next bytecode corresponds to a Smalltalk
        // message send or return
        var byte = this.method.bytes[this.pc];
        if (byte >= 120 && byte <= 125) return true; // return
        /* 
        if (byte < 96) return false;    // 96-103 storeAndPopReceiverVariableBytecode
        if (byte <= 111) return true;   // 104-111 storeAndPopTemporaryVariableBytecode
        if (byte == 129        // 129 extendedStoreBytecode
            || byte == 130     // 130 extendedStoreAndPopBytecode
            || byte == 141	   // 141 storeRemoteTempLongBytecode
            || byte == 142	   // 142 storeAndPopRemoteTempLongBytecode
            || (byte == 132 && 
                this.method.bytes[this.pc + 1] >= 160)) // 132 doubleExtendedDoAnythingBytecode
                    return true;
        */
        if (byte < 131 || byte == 200) return false;
        if (byte >= 176) return true; // special send or short send
        if (byte <= 134) {         // long sends
			// long form support demands we check the selector
			var litIndex;
			if (byte === 132) {
                if ((this.method.bytes[this.pc + 1] >> 5) > 1) return false;
                litIndex = this.method.bytes[this.pc + 2];
			} else
                litIndex = this.method.bytes[this.pc + 1] & (byte === 134 ? 63 : 31);
            var selectorObj = this.method.pointers[litIndex + 1];
            if (selectorObj.bytesAsString() != 'blockCopy:') return true;
        }
        return false;
    },
});

Object.subclass('users.bert.SqueakJS.vm.Primitives',
'initialization', {
    initialize: function(vm, display) {
        this.vm = vm;
        this.display = display;
        this.display.vm = this.vm;
        this.initAtCache();
        this.initModules();
        this.indexedColors = [
            0xFFFFFFFF, 0xFF000001, 0xFFFFFFFF, 0xFF808080, 0xFFFF0000, 0xFF00FF00, 0xFF0000FF, 0xFF00FFFF,
            0xFFFFFF00, 0xFFFF00FF, 0xFF202020, 0xFF404040, 0xFF606060, 0xFF9F9F9F, 0xFFBFBFBF, 0xFFDFDFDF,
            0xFF080808, 0xFF101010, 0xFF181818, 0xFF282828, 0xFF303030, 0xFF383838, 0xFF484848, 0xFF505050,
            0xFF585858, 0xFF686868, 0xFF707070, 0xFF787878, 0xFF878787, 0xFF8F8F8F, 0xFF979797, 0xFFA7A7A7,
            0xFFAFAFAF, 0xFFB7B7B7, 0xFFC7C7C7, 0xFFCFCFCF, 0xFFD7D7D7, 0xFFE7E7E7, 0xFFEFEFEF, 0xFFF7F7F7,
            0xFF000001, 0xFF003300, 0xFF006600, 0xFF009900, 0xFF00CC00, 0xFF00FF00, 0xFF000033, 0xFF003333,
            0xFF006633, 0xFF009933, 0xFF00CC33, 0xFF00FF33, 0xFF000066, 0xFF003366, 0xFF006666, 0xFF009966,
            0xFF00CC66, 0xFF00FF66, 0xFF000099, 0xFF003399, 0xFF006699, 0xFF009999, 0xFF00CC99, 0xFF00FF99, 
            0xFF0000CC, 0xFF0033CC, 0xFF0066CC, 0xFF0099CC, 0xFF00CCCC, 0xFF00FFCC, 0xFF0000FF, 0xFF0033FF, 
            0xFF0066FF, 0xFF0099FF, 0xFF00CCFF, 0xFF00FFFF, 0xFF330000, 0xFF333300, 0xFF336600, 0xFF339900, 
            0xFF33CC00, 0xFF33FF00, 0xFF330033, 0xFF333333, 0xFF336633, 0xFF339933, 0xFF33CC33, 0xFF33FF33, 
            0xFF330066, 0xFF333366, 0xFF336666, 0xFF339966, 0xFF33CC66, 0xFF33FF66, 0xFF330099, 0xFF333399, 
            0xFF336699, 0xFF339999, 0xFF33CC99, 0xFF33FF99, 0xFF3300CC, 0xFF3333CC, 0xFF3366CC, 0xFF3399CC,
            0xFF33CCCC, 0xFF33FFCC, 0xFF3300FF, 0xFF3333FF, 0xFF3366FF, 0xFF3399FF, 0xFF33CCFF, 0xFF33FFFF,
            0xFF660000, 0xFF663300, 0xFF666600, 0xFF669900, 0xFF66CC00, 0xFF66FF00, 0xFF660033, 0xFF663333,
            0xFF666633, 0xFF669933, 0xFF66CC33, 0xFF66FF33, 0xFF660066, 0xFF663366, 0xFF666666, 0xFF669966, 
            0xFF66CC66, 0xFF66FF66, 0xFF660099, 0xFF663399, 0xFF666699, 0xFF669999, 0xFF66CC99, 0xFF66FF99, 
            0xFF6600CC, 0xFF6633CC, 0xFF6666CC, 0xFF6699CC, 0xFF66CCCC, 0xFF66FFCC, 0xFF6600FF, 0xFF6633FF, 
            0xFF6666FF, 0xFF6699FF, 0xFF66CCFF, 0xFF66FFFF, 0xFF990000, 0xFF993300, 0xFF996600, 0xFF999900, 
            0xFF99CC00, 0xFF99FF00, 0xFF990033, 0xFF993333, 0xFF996633, 0xFF999933, 0xFF99CC33, 0xFF99FF33, 
            0xFF990066, 0xFF993366, 0xFF996666, 0xFF999966, 0xFF99CC66, 0xFF99FF66, 0xFF990099, 0xFF993399, 
            0xFF996699, 0xFF999999, 0xFF99CC99, 0xFF99FF99, 0xFF9900CC, 0xFF9933CC, 0xFF9966CC, 0xFF9999CC, 
            0xFF99CCCC, 0xFF99FFCC, 0xFF9900FF, 0xFF9933FF, 0xFF9966FF, 0xFF9999FF, 0xFF99CCFF, 0xFF99FFFF, 
            0xFFCC0000, 0xFFCC3300, 0xFFCC6600, 0xFFCC9900, 0xFFCCCC00, 0xFFCCFF00, 0xFFCC0033, 0xFFCC3333, 
            0xFFCC6633, 0xFFCC9933, 0xFFCCCC33, 0xFFCCFF33, 0xFFCC0066, 0xFFCC3366, 0xFFCC6666, 0xFFCC9966,
            0xFFCCCC66, 0xFFCCFF66, 0xFFCC0099, 0xFFCC3399, 0xFFCC6699, 0xFFCC9999, 0xFFCCCC99, 0xFFCCFF99,
            0xFFCC00CC, 0xFFCC33CC, 0xFFCC66CC, 0xFFCC99CC, 0xFFCCCCCC, 0xFFCCFFCC, 0xFFCC00FF, 0xFFCC33FF, 
            0xFFCC66FF, 0xFFCC99FF, 0xFFCCCCFF, 0xFFCCFFFF, 0xFFFF0000, 0xFFFF3300, 0xFFFF6600, 0xFFFF9900, 
            0xFFFFCC00, 0xFFFFFF00, 0xFFFF0033, 0xFFFF3333, 0xFFFF6633, 0xFFFF9933, 0xFFFFCC33, 0xFFFFFF33,
            0xFFFF0066, 0xFFFF3366, 0xFFFF6666, 0xFFFF9966, 0xFFFFCC66, 0xFFFFFF66, 0xFFFF0099, 0xFFFF3399, 
            0xFFFF6699, 0xFFFF9999, 0xFFFFCC99, 0xFFFFFF99, 0xFFFF00CC, 0xFFFF33CC, 0xFFFF66CC, 0xFFFF99CC, 
            0xFFFFCCCC, 0xFFFFFFCC, 0xFFFF00FF, 0xFFFF33FF, 0xFFFF66FF, 0xFFFF99FF, 0xFFFFCCFF, 0xFFFFFFFF];
    },
    initModules: function() {
        this.missingPrimitives = {};
        this.loadedModules = {};
        this.externalModules = {};
        this.builtinModules = {
            MiscPrimitivePlugin: {
                exports: {
                    primitiveStringHash: this.primitiveStringHash.bind(this),
                }
            },
            FilePlugin: {
                exports: {
                    primitiveDirectoryDelimitor: this.primitiveDirectoryDelimitor.bind(this),
                    primitiveDirectoryCreate: this.primitiveDirectoryCreate.bind(this),
                    primitiveDirectoryDelete: this.primitiveDirectoryDelete.bind(this),
                    primitiveDirectoryDelimitor: this.primitiveDirectoryDelimitor.bind(this),
                    primitiveDirectoryEntry: this.primitiveDirectoryEntry.bind(this),
                    primitiveDirectoryLookup: this.primitiveDirectoryLookup.bind(this),
                    primitiveFileAtEnd: this.primitiveFileAtEnd.bind(this),
                    primitiveFileClose: this.primitiveFileClose.bind(this),
                    primitiveFileDelete: this.primitiveFileDelete.bind(this),
                    primitiveFileFlush: this.primitiveFileFlush.bind(this),
                    primitiveFileGetPosition: this.primitiveFileGetPosition.bind(this),
                    primitiveFileOpen: this.primitiveFileOpen.bind(this),
                    primitiveFileRead: this.primitiveFileRead.bind(this),
                    primitiveFileRename: this.primitiveFileRename.bind(this),
                    primitiveFileSetPosition: this.primitiveFileSetPosition.bind(this),
                    primitiveFileSize: this.primitiveFileSize.bind(this),
                    primitiveFileStdioHandles: this.primitiveFileStdioHandles.bind(this),
                    primitiveFileTruncate: this.primitiveFileTruncate.bind(this),
                    primitiveFileWrite: this.primitiveFileWrite.bind(this),
                }
            },
            BitBltPlugin: {
                exports: {
                    primitiveCopyBits: this.primitiveCopyBits.bind(this),
                    primitiveWarpBits: this.primitiveWarpBits.bind(this),
                }
            },
            B2DPlugin: {
                exports: {
                    // curry the primitive name and return value
                    primitiveAddActiveEdgeEntry: this.fakePrimitive.bind(this, "B2DPlugin.primitiveAddActiveEdgeEntry", 0),
                    primitiveAddBezier: this.fakePrimitive.bind(this, "B2DPlugin.primitiveAddBezier", 0),
                    primitiveAddBezierShape: this.fakePrimitive.bind(this, "B2DPlugin.primitiveAddBezierShape", 0),
                    primitiveAddBitmapFill: this.fakePrimitive.bind(this, "B2DPlugin.primitiveAddBitmapFill", 0),
                    primitiveAddCompressedShape: this.fakePrimitive.bind(this, "B2DPlugin.primitiveAddCompressedShape", 0),
                    primitiveAddGradientFill: this.fakePrimitive.bind(this, "B2DPlugin.primitiveAddGradientFill", 0),
                    primitiveAddLine: this.fakePrimitive.bind(this, "B2DPlugin.primitiveAddLine", 0),
                    primitiveAddOval: this.fakePrimitive.bind(this, "B2DPlugin.primitiveAddOval", 0),
                    primitiveAddPolygon: this.fakePrimitive.bind(this, "B2DPlugin.primitiveAddPolygon", 0),
                    primitiveAddRect: this.fakePrimitive.bind(this, "B2DPlugin.primitiveAddRect", 0),
                    primitiveChangedActiveEdgeEntry: this.fakePrimitive.bind(this, "B2DPlugin.primitiveChangedActiveEdgeEntry", 0),
                    primitiveCopyBuffer: this.fakePrimitive.bind(this, "B2DPlugin.primitiveCopyBuffer", 0),
                    primitiveDisplaySpanBuffer: this.fakePrimitive.bind(this, "B2DPlugin.primitiveDisplaySpanBuffer", 0),
                    primitiveDoProfileStats: this.fakePrimitive.bind(this, "B2DPlugin.primitiveDoProfileStats", 0),
                    primitiveFinishedProcessing: this.fakePrimitive.bind(this, "B2DPlugin.primitiveFinishedProcessing", true),
                    primitiveGetAALevel: this.fakePrimitive.bind(this, "B2DPlugin.primitiveGetAALevel", 0),
                    primitiveGetBezierStats: this.fakePrimitive.bind(this, "B2DPlugin.primitiveGetBezierStats", 0),
                    primitiveGetClipRect: this.fakePrimitive.bind(this, "B2DPlugin.primitiveGetClipRect", 0),
                    primitiveGetCounts: this.fakePrimitive.bind(this, "B2DPlugin.primitiveGetCounts", 0),
                    primitiveGetDepth: this.fakePrimitive.bind(this, "B2DPlugin.primitiveGetDepth", 1),
                    primitiveGetFailureReason: this.fakePrimitive.bind(this, "B2DPlugin.primitiveGetFailureReason", 0),
                    primitiveGetOffset: this.fakePrimitive.bind(this, "B2DPlugin.primitiveGetOffset", 0),
                    primitiveGetTimes: this.fakePrimitive.bind(this, "B2DPlugin.primitiveGetTimes", 0),
                    primitiveInitializeBuffer: this.fakePrimitive.bind(this, "B2DPlugin.primitiveInitializeBuffer", 0),
                    primitiveInitializeProcessing: this.fakePrimitive.bind(this, "B2DPlugin.primitiveInitializeProcessing", 0),
                    primitiveMergeFillFrom: this.fakePrimitive.bind(this, "B2DPlugin.primitiveMergeFillFrom", 0),
                    primitiveNeedsFlush: this.fakePrimitive.bind(this, "B2DPlugin.primitiveNeedsFlush", false),
                    primitiveNeedsFlushPut: this.fakePrimitive.bind(this, "B2DPlugin.primitiveNeedsFlushPut", 0),
                    primitiveNextActiveEdgeEntry: this.fakePrimitive.bind(this, "B2DPlugin.primitiveNextActiveEdgeEntry", 0),
                    primitiveNextFillEntry: this.fakePrimitive.bind(this, "B2DPlugin.primitiveNextFillEntry", 0),
                    primitiveNextGlobalEdgeEntry: this.fakePrimitive.bind(this, "B2DPlugin.primitiveNextGlobalEdgeEntry", 0),
                    primitiveRegisterExternalEdge: this.fakePrimitive.bind(this, "B2DPlugin.primitiveRegisterExternalEdge", 0),
                    primitiveRegisterExternalFill: this.fakePrimitive.bind(this, "B2DPlugin.primitiveRegisterExternalFill", 0),
                    primitiveRenderImage: this.fakePrimitive.bind(this, "B2DPlugin.primitiveRenderImage", 0),
                    primitiveRenderScanline: this.fakePrimitive.bind(this, "B2DPlugin.primitiveRenderScanline", 0),
                    primitiveSetAALevel: this.fakePrimitive.bind(this, "B2DPlugin.primitiveSetAALevel", 0),
                    primitiveSetBitBltPlugin: this.fakePrimitive.bind(this, "B2DPlugin.primitiveSetBitBltPlugin", 0),
                    primitiveSetClipRect: this.fakePrimitive.bind(this, "B2DPlugin.primitiveSetClipRect", 0),
                    primitiveSetColorTransform: this.fakePrimitive.bind(this, "B2DPlugin.primitiveSetColorTransform", 0),
                    primitiveSetDepth: this.fakePrimitive.bind(this, "B2DPlugin.primitiveSetDepth", 0),
                    primitiveSetEdgeTransform: this.fakePrimitive.bind(this, "B2DPlugin.primitiveSetEdgeTransform", 0),
                    primitiveSetOffset: this.fakePrimitive.bind(this, "B2DPlugin.primitiveSetOffset", 0),
                }
            },
            FloatArrayPlugin: {
                exports: {
                    primitiveAt: this.primitiveFloatArrayAtAndPut.bind(this),
                    primitiveAtPut: this.primitiveFloatArrayAtAndPut.bind(this),
                }
            },
        };
    },
},
'dispatch', {
    quickSendOther: function(rcvr, lobits) {
        // returns true if it succeeds
        this.success = true;
        switch (lobits) {
            case 0x0: return this.popNandPushIfOK(2, this.objectAt(true,true,false)); // at:
            case 0x1: return this.popNandPushIfOK(3, this.objectAtPut(true,true,false)); // at:put:
            case 0x2: return this.popNandPushIfOK(1, this.objectSize(0)); // size
            //case 0x3: return false; // next
            //case 0x4: return false; // nextPut:
            //case 0x5: return false; // atEnd
            case 0x6: return this.pop2andPushBoolIfOK(this.vm.stackValue(1) === this.vm.stackValue(0)); // ==
            case 0x7: return this.popNandPushIfOK(1,this.vm.getClass(this.vm.top())); // class
            case 0x8: return this.popNandPushIfOK(2,this.doBlockCopy()); // blockCopy:
            case 0x9: return this.primitiveBlockValue(0); // value
            case 0xA: return this.primitiveBlockValue(1); // value:
            //case 0xB: return false; // do:
            //case 0xC: return false; // new
            //case 0xD: return false; // new:
            //case 0xE: return false; // x
            //case 0xF: return false; // y
        }
        return false;
    },
    doPrimitive: function(index, argCount, newMethod) {
        this.success = true;
        switch (index) {
            case 1: return this.popNandPushIntIfOK(2,this.stackInteger(1) + this.stackInteger(0));  // Integer.add
            case 2: return this.popNandPushIntIfOK(2,this.stackInteger(1) - this.stackInteger(0));  // Integer.subtract
            case 3: return this.pop2andPushBoolIfOK(this.stackInteger(1) < this.stackInteger(0));   // Integer.less
            case 4: return this.pop2andPushBoolIfOK(this.stackInteger(1) > this.stackInteger(0));   // Integer.greater
            case 5: return this.pop2andPushBoolIfOK(this.stackInteger(1) <= this.stackInteger(0));  // Integer.leq
            case 6: return this.pop2andPushBoolIfOK(this.stackInteger(1) >= this.stackInteger(0));  // Integer.geq
            case 7: return this.pop2andPushBoolIfOK(this.stackInteger(1) === this.stackInteger(0)); // Integer.equal
            case 8: return this.pop2andPushBoolIfOK(this.stackInteger(1) !== this.stackInteger(0)); // Integer.notequal
            case 9: return this.popNandPushIntIfOK(2,this.stackInteger(1) * this.stackInteger(0));  // Integer.multiply *
            case 10: return this.popNandPushIntIfOK(2,this.vm.quickDivide(this.stackInteger(1),this.stackInteger(0)));  // Integer.divide /  (fails unless exact)
            case 11: return this.popNandPushIntIfOK(2,this.vm.mod(this.stackInteger(1),this.stackInteger(0)));  // Integer.mod \\
            case 12: return this.popNandPushIntIfOK(2,this.vm.div(this.stackInteger(1),this.stackInteger(0)));  // Integer.div //
            case 13: return this.popNandPushIntIfOK(2,this.stackInteger(1) / this.stackInteger(0) | 0);  // Integer.quo
            case 14: return this.popNandPushIfOK(2,this.doBitAnd());  // SmallInt.bitAnd
            case 15: return this.popNandPushIfOK(2,this.doBitOr());  // SmallInt.bitOr
            case 16: return this.popNandPushIfOK(2,this.doBitXor());  // SmallInt.bitXor
            case 17: return this.popNandPushIfOK(2,this.doBitShift());  // SmallInt.bitShift
            case 18: return this.primitiveMakePoint(argCount);
            case 19: return false;                                 // Guard primitive for simulation -- *must* fail
            case 20: return false;
            case 21: return false; // primitiveAddLargeIntegers
            case 22: return false; // primitiveSubtractLargeIntegers
            case 23: return false; // primitiveLessThanLargeIntegers
            case 24: return false; // primitiveGreaterThanLargeIntegers
            case 25: return false; // primitiveLessOrEqualLargeIntegers
            case 26: return false; // primitiveGreaterOrEqualLargeIntegers
            case 27: return false; // primitiveEqualLargeIntegers
            case 28: return false; // primitiveNotEqualLargeIntegers
            case 29: return false; // primitiveMultiplyLargeIntegers
            case 30: return false; // primitiveDivideLargeIntegers
            case 31: return false; // primitiveModLargeIntegers
            case 32: return false; // primitiveDivLargeIntegers
            case 33: return false; // primitiveQuoLargeIntegers
            case 34: return false; // primitiveBitAndLargeIntegers
            case 35: return false; // primitiveBitOrLargeIntegers
            case 36: return false; // primitiveBitXorLargeIntegers
            case 37: return false; // primitiveBitShiftLargeIntegers
            //case 38: return false; // TODO: primitiveFloatAt
            //case 39: return false; // TODO: primitiveFloatAtPut
            case 40: return this.popNandPushFloatIfOK(1,this.stackInteger(0)); // primitiveAsFloat
            case 41: return this.popNandPushFloatIfOK(2,this.stackFloat(1)+this.stackFloat(0));  // Float +
            case 42: return this.popNandPushFloatIfOK(2,this.stackFloat(1)-this.stackFloat(0));  // Float -	
            case 43: return this.pop2andPushBoolIfOK(this.stackFloat(1)<this.stackFloat(0));  // Float <
            case 44: return this.pop2andPushBoolIfOK(this.stackFloat(1)>this.stackFloat(0));  // Float >
            case 45: return this.pop2andPushBoolIfOK(this.stackFloat(1)<=this.stackFloat(0));  // Float <=
            case 46: return this.pop2andPushBoolIfOK(this.stackFloat(1)>=this.stackFloat(0));  // Float >=
            case 47: return this.pop2andPushBoolIfOK(this.stackFloat(1)===this.stackFloat(0));  // Float =
            case 48: return this.pop2andPushBoolIfOK(this.stackFloat(1)!==this.stackFloat(0));  // Float !=
            case 49: return this.popNandPushFloatIfOK(2,this.stackFloat(1)*this.stackFloat(0));  // Float.mul
            case 50: return this.popNandPushFloatIfOK(2,this.safeFDiv(this.stackFloat(1),this.stackFloat(0)));  // Float.div
            case 51: return this.popNandPushIfOK(1, this.checkSmallInt(this.stackFloat(0)|0));  // Float.asInteger
            case 52: return false;  // Float.fractionPart
            case 53: return this.popNandPushIfOK(1, Math.log(this.stackFloat(0)) / Math.log(2) | 0); // Exponent
            case 54: return this.popNandPushFloatIfOK(2, this.stackFloat(1) * Math.pow(2, this.stackFloat(0))); // TimesTwoPower
            case 55: return this.popNandPushFloatIfOK(1, Math.sqrt(this.stackFloat(0))); // SquareRoot
            case 56: return this.popNandPushFloatIfOK(1, Math.sin(this.stackFloat(0))); // Sine
            case 57: return this.popNandPushFloatIfOK(1, Math.atan(this.stackFloat(0))); // Arctan
            case 58: return this.popNandPushFloatIfOK(1, Math.log(this.stackFloat(0))); // LogN
            case 59: return this.popNandPushFloatIfOK(1, Math.exp(this.stackFloat(0))); // Exp
            case 60: return this.popNandPushIfOK(2, this.objectAt(false,false,false)); // basicAt:
            case 61: return this.popNandPushIfOK(3, this.objectAtPut(false,false,false)); // basicAt:put:
            case 62: return this.popNandPushIfOK(1, this.objectSize()); // size
            case 63: return this.popNandPushIfOK(2, this.objectAt(false,true,false)); // String.basicAt:
            case 64: return this.popNandPushIfOK(3, this.objectAtPut(false,true,false)); // String.basicAt:put:
            case 65: return false; // primitiveNext
            case 66: return false; // primitiveNextPut
            case 67: return false; // primitiveAtEnd
            case 68: return this.popNandPushIfOK(2, this.objectAt(false,false,true)); // Method.objectAt:
            case 69: return this.popNandPushIfOK(3, this.objectAtPut(false,false,true)); // Method.objectAt:put:
            case 70: return this.popNandPushIfOK(1, this.vm.instantiateClass(this.stackNonInteger(0), 0)); // Class.new
            case 71: return this.popNandPushIfOK(2, this.vm.instantiateClass(this.stackNonInteger(1), this.stackPos32BitInt(0))); // Class.new:
            case 72: return this.popNandPushIfOK(2, this.doArrayBecome(false)); //arrayBecomeOneWay
            case 73: return this.popNandPushIfOK(2, this.objectAt(false,false,true)); // instVarAt:
            case 74: return this.popNandPushIfOK(3, this.objectAtPut(false,false,true)); // instVarAt:put:
            case 75: return this.popNandPushIfOK(1, this.stackNonInteger(0).hash); // Object.identityHash
            case 76: return this.primitiveStoreStackp(argCount);  // (Blue Book: primitiveAsObject)
            case 77: return this.popNandPushIfOK(1, this.someInstanceOf(this.stackNonInteger(0))); // Class.someInstance
            case 78: return this.popNandPushIfOK(1, this.nextInstanceAfter(this.stackNonInteger(0))); // Object.nextInstance
            case 79: return this.primitiveNewMethod(argCount); // Compiledmethod.new
            case 80: return this.popNandPushIfOK(2,this.doBlockCopy()); // blockCopy:
            case 81: return this.primitiveBlockValue(argCount); // BlockContext.value
            case 82: return this.primitiveValueWithArgs(argCount); // BlockContext.valueWithArguments:
            case 83: return this.vm.primitivePerform(argCount); // Object.perform:(with:)*
            case 84: return this.vm.primitivePerformWithArgs(argCount, false); //  Object.perform:withArguments:
            case 85: return this.primitiveSignal(); // Semaphore.wait
            case 86: return this.primitiveWait(); // Semaphore.wait
            case 87: return this.primitiveResume(); // Process.resume
            case 88: return this.primitiveSuspend(); // Process.suspend
            case 89: return this.vm.flushMethodCache(); //primitiveFlushCache
            case 90: return this.primitiveMousePoint(argCount); // mousePoint
            case 91: return this.primitiveTestDisplayDepth(argCount); // cursorLocPut in old images
            case 92: return false; // primitiveSetDisplayMode				"Blue Book: primitiveCursorLink"
            case 93: return false; // primitiveInputSemaphore
            case 94: return false; // primitiveGetNextEvent				"Blue Book: primitiveSampleInterval"
            case 95: return false; // primitiveInputWord
            case 96: return this.primitiveCopyBits(argCount);  // BitBlt.copyBits
            case 97: return this.primitiveSnapshot(argCount);
            //case 98: return false; // primitiveStoreImageSegment
            //case 99: return false; // primitiveLoadImageSegment
            case 100: return this.vm.primitivePerformWithArgs(argCount, true); // Object.perform:withArguments:inSuperclass: (Blue Book: primitiveSignalAtTick)
            case 101: return this.primitiveBeCursor(argCount); // Cursor.beCursor
            case 102: return this.primitiveBeDisplay(argCount); // DisplayScreen.beDisplay
            case 103: return false; // primitiveScanCharacters
            case 104: return false; // primitiveDrawLoop
            case 105: return this.popNandPushIfOK(5, this.doStringReplace()); // string and array replace
            case 106: return this.primitiveScreenSize(argCount); // actualScreenSize
            case 107: return this.primitiveMouseButtons(argCount); // Sensor mouseButtons
            case 108: return this.primitiveKeyboardNext(argCount); // Sensor kbdNext
            case 109: return this.primitiveKeyboardPeek(argCount); // Sensor kbdPeek
            case 110: return this.pop2andPushBoolIfOK(this.vm.stackValue(1) === this.vm.stackValue(0)); // ==
            case 111: return this.popNandPushIfOK(1, this.vm.getClass(this.vm.top())); // Object.class
            case 112: return this.popNandPushIfOK(1, 1000000); //primitiveBytesLeft
            case 113: return this.primitiveQuit(argCount);
            case 114: return this.primitiveExitToDebugger(argCount);
            //case 115: return false; //TODO primitiveChangeClass					"Blue Book: primitiveOopsLeft"
            case 116: return this.vm.flushMethodCacheForMethod(this.vm.top());
            case 117: return this.doNamedPrimitive(argCount, newMethod); // named prims
            //case 118: return false; //TODO primitiveDoPrimitiveWithArgs
            case 119: return this.vm.flushMethodCacheForSelector(this.vm.top());
            case 120: return false; //primitiveCalloutToFFI
            case 121: return this.primitiveImageName(argCount); //get+set imageName
            case 122: return this.primitiveReverseDisplay(argCount); // Blue Book: primitiveImageVolume
            //case 123: return false; //TODO primitiveValueUninterruptably
            case 124: return this.popNandPushIfOK(2, this.registerSemaphore(Squeak.splOb_TheLowSpaceSemaphore));
            case 125: return this.popNandPushIfOK(2, this.setLowSpaceThreshold());
            case 126: return false; //TODO primitiveDeferDisplayUpdates
    		case 127: return false; //TODO primitiveShowDisplayRect
            case 128: return this.popNandPushIfOK(2, this.doArrayBecome(true)); //arrayBecome
            case 129: return this.popNandPushIfOK(1, this.vm.image.specialObjectsArray); //specialObjectsOop
            case 130: return this.popNandPushIfOK(1, this.vm.image.fullGC()); // GC
            case 131: return this.popNandPushIfOK(1, this.vm.image.partialGC()); // GCmost
            case 132: return this.pop2andPushBoolIfOK(this.pointsTo(this.stackNonInteger(1), this.vm.top())); //Object.pointsTo
            case 133: return true; //TODO primitiveSetInterruptKey
            case 134: return this.popNandPushIfOK(2, this.registerSemaphore(Squeak.splOb_TheInterruptSemaphore));
            case 135: return this.popNandPushIfOK(1, this.millisecondClockValue());
            case 136: return this.primitiveSignalAtMilliseconds(argCount); //Delay signal:atMs:());
            case 137: return this.popNandPushIfOK(1, this.secondClock()); // seconds since Jan 1, 1901
            case 138: return this.popNandPushIfOK(1, this.someObject()); // Object.someObject
            case 139: return this.popNandPushIfOK(1, this.nextObject(this.vm.top())); // Object.nextObject
            case 140: return true; // TODO primitiveBeep
            case 141: return this.primitiveClipboardText(argCount);
            case 142: return this.popNandPushIfOK(1, this.makeStString(Squeak.vmPath));
            case 143: // short at and shortAtPut
            case 144: return this.primitiveShortAtAndPut(argCount);
            case 145: return this.primitiveConstantFill(argCount);
            case 146: return false; // TODO primitiveReadJoystick
            case 147: return this.primitiveWarpBits(argCount);
            case 148: return this.popNandPushIfOK(1, this.vm.image.clone(this.vm.top())); //shallowCopy
            case 149: return this.primitiveGetAttribute(argCount);
            case 150: return this.primitiveFileAtEnd(argCount);
            case 151: return this.primitiveFileClose(argCount);
            case 152: return this.primitiveFileGetPosition(argCount);
            case 153: return this.primitiveFileOpen(argCount);
            case 154: return this.primitiveFileRead(argCount);
            case 155: return this.primitiveFileSetPosition(argCount);
            case 156: return this.primitiveFileDelete(argCount);
            case 157: return this.primitiveFileSize(argCount);
            case 158: return this.primitiveFileWrite(argCount);
            case 159: return this.primitiveFileRename(argCount);
            //case 160: return false; // TODO primitiveAdoptInstance
            case 161: return this.primitiveDirectoryDelimitor(argCount);
            case 162: return this.primitiveDirectoryLookup(argCount);
            case 167: return false; // Processor.yield
            case 188: return this.primitiveExecuteMethodArgsArray(argCount);
            case 195: return false; // Context.findNextUnwindContextUpTo:
            case 196: return false; // Context.terminateTo:
            case 197: return false; // Context.findNextHandlerContextStarting
            case 198: return false; // MarkUnwindMethod (must fail)
            case 199: return false; // MarkHandlerMethod (must fail)
            case 230: return this.primitiveRelinquishProcessorForMicroseconds(argCount);
            case 231: return this.primitiveForceDisplayUpdate(argCount);
            case 233: return this.primitiveSetFullScreen(argCount);
            case 234: return false; // primBitmapdecompressfromByteArrayat
            case 235: return false; // primStringcomparewithcollated
            case 236: return false; // primSampledSoundconvert8bitSignedFromto16Bit
            case 237: return false; // primBitmapcompresstoByteArray
            case 238: case 239: case 240: case 241: return false; // serial port primitives
            case 243: return false; // primStringtranslatefromtotable
            case 244: return false; // primStringfindFirstInStringinSetstartingAt
            case 245: return false; // primStringindexOfAsciiinStringstartingAt
            case 246: return false; // primStringfindSubstringinstartingAtmatchTable
            case 254: return this.primitiveVMParameter(argCount);
        }
        throw Error("primitive " + index + " not implemented yet");
        return false;
    },
    doNamedPrimitive: function(argCount, newMethod) {
        if (newMethod.pointersSize() < 2) return false;
        var firstLiteral = newMethod.pointers[1]; // skip method header
        if (firstLiteral.pointersSize() !== 4) return false;
        var moduleName = firstLiteral.pointers[0].bytesAsString();
        var functionName = firstLiteral.pointers[1].bytesAsString();
        var module = this.loadedModules[moduleName];
        if (!module) {
            if (module !== undefined) return false; // earlier load failed
            module = this.loadModule(moduleName);
            this.loadedModules[moduleName] = module;
        }
        if (module) {
            var primitive = module.exports[functionName];
            if (primitive) return primitive(argCount);
        }
        this.missingPrimitive(moduleName + '.' + functionName);
        return false;
    },
    missingPrimitive: function(prim) {
        // warn once about missing primitives
        if (this.missingPrimitives[prim]) {
            this.missingPrimitives[prim]++;
        } else {
            this.missingPrimitives[prim] = 1;
            console.warn('primitive missing: ' + prim);
        }
    },
    fakePrimitive: function(prim, retVal, argCount) {
        // fake a named primitive
        // prim and retVal need to be curried when used:
        //  this.fakePrimitive.bind(this, "Module.primitive", 42)
        this.missingPrimitive(prim);
        if (retVal === undefined) this.vm.popN(argCount);
        else this.vm.popNandPush(argCount+1, this.makeStObject(retVal));
        return true;
    },
    loadModule: function(moduleName) {
        var module = Squeak.externalModules[moduleName] || this.builtinModules[moduleName];
        if (!module || !module.exports) return null;
        if (module.exports.initializeModule)
            module.exports.initializeModule(this);
        return module;
    },
},
'stack access', {
    pop2andPushBoolIfOK: function(bool) {
        this.vm.success = this.success;
        return this.vm.pop2AndPushBoolResult(bool);
    },
    popNandPushIfOK: function(nToPop, returnValue) {
        if (!this.success || returnValue == null) return false;
        this.vm.popNandPush(nToPop, returnValue);
        return true;
    },
    popNandPushIntIfOK: function(nToPop, returnValue) {
        if (!this.success || !this.vm.canBeSmallInt(returnValue)) return false; 
        return this.popNandPushIfOK(nToPop, returnValue);
    },
    popNandPushFloatIfOK: function(nToPop, returnValue) {
        if (!this.success) return false;
        return this.popNandPushIfOK(nToPop, this.makeFloat(returnValue));
    },
    stackNonInteger: function(nDeep) {
        return this.checkNonInteger(this.vm.stackValue(nDeep));
    },
    stackInteger: function(nDeep) {
        return this.checkSmallInt(this.vm.stackValue(nDeep));
    },
    stackPos32BitInt: function(nDeep) {
        var stackVal = this.vm.stackValue(nDeep);
        if (this.vm.isSmallInt(stackVal)) {
            if (stackVal >= 0)
                return stackVal;
            this.success = false;
            return 0;
        }
        if (!this.isA(stackVal, Squeak.splOb_ClassLargePositiveInteger) || stackVal.bytesSize() !== 4) {
            this.success = false;
            return 0;
        }
        var bytes = stackVal.bytes;
        var value = 0;
        for (var i=0; i<4; i++)
            value += ((bytes[i]&255)<<(8*i));
        return value;
    },
    pos32BitIntFor: function(pos32Val) {
        // Return the 32-bit quantity as a positive 32-bit integer
        if (pos32Val >= 0)
            if (this.vm.canBeSmallInt(pos32Val)) return pos32Val;
        var lgIntClass = this.vm.specialObjects[Squeak.splOb_ClassLargePositiveInteger];
        var lgIntObj = this.vm.instantiateClass(lgIntClass, 4);
        var bytes = lgIntObj.bytes;
        for (var i=0; i<4; i++)
            bytes[i] = (pos32Val>>>(8*i))&255;
        return lgIntObj;
    },
    stackFloat: function(nDeep) {
        return this.checkFloat(this.vm.stackValue(nDeep));
    },
},
'numbers', {
    doBitAnd: function() {
        var rcvr = this.stackPos32BitInt(1);
        var arg = this.stackPos32BitInt(0);
        if (!this.success) return 0;
        return this.pos32BitIntFor(rcvr & arg);
    },
    doBitOr: function() {
        var rcvr = this.stackPos32BitInt(1);
        var arg = this.stackPos32BitInt(0);
        if (!this.success) return 0;
        return this.pos32BitIntFor(rcvr | arg);
    },
    doBitXor: function() {
        var rcvr = this.stackPos32BitInt(1);
        var arg = this.stackPos32BitInt(0);
        if (!this.success) return 0;
        return this.pos32BitIntFor(rcvr ^ arg);
    },
    doBitShift: function() {
        var rcvr = this.stackPos32BitInt(1);
        var arg = this.stackInteger(0);
        if (!this.success) return 0;
        var result = this.vm.safeShift(rcvr, arg); // returns negative result if failed
        if (result > 0)
            return this.pos32BitIntFor(this.vm.safeShift(rcvr, arg));
        this.success = false;
        return 0;
    },
    safeFDiv: function(dividend, divisor) {
        if (divisor === 0.0) {
            this.success = false;
            return 1.0;
        }
        return dividend / divisor;
    },
},
'utils', {
    checkFloat: function(maybeFloat) { // returns a float and sets success
        if (maybeFloat.isFloat)
            return maybeFloat.float;
        this.success = false;
        return 0.0;
    },
    checkSmallInt: function(maybeSmall) { // returns an int and sets success
        if (this.vm.isSmallInt(maybeSmall))
            return maybeSmall;
        this.success = false;
        return 0;
    },
    checkNonInteger: function(obj) { // returns a SqObj and sets success
        if (!this.vm.isSmallInt(obj))
            return obj;
        this.success = false;
        return this.vm.nilObj;
    },
    indexableSize: function(obj) {
        if (this.vm.isSmallInt(obj)) return -1; // -1 means not indexable
        var fmt = obj.format;
        if (fmt<2) return -1; //not indexable
        if (fmt===3 && this.vm.isContext(obj))
            return obj.getPointer(Squeak.Context_stackPointer); // no access beyond top of stack?
        if (fmt<6) return obj.pointersSize() - obj.instSize(); // pointers
        if (fmt<8) return obj.wordsSize(); // words
        if (fmt<12) return obj.bytesSize(); // bytes
        return obj.bytesSize() + (4 * obj.pointersSize()); // methods
    },
    isA: function(obj, knownClass) {
        return obj.sqClass === this.vm.specialObjects[knownClass];
    },
    isKindOf: function(obj, knownClass) {
        var classOrSuper = obj.sqClass;
        var theClass = this.vm.specialObjects[knownClass];
        while (!classOrSuper.isNil) {
            if (classOrSuper === theClass) return true;
            classOrSuper = classOrSuper.pointers[Squeak.Class_superclass];
        }
        return false;
    },
    charFromInt: function(ascii) {
        var charTable = this.vm.specialObjects[Squeak.splOb_CharacterTable];
        return charTable.getPointer(ascii);
    },
    makeFloat: function(value) {
        var floatClass = this.vm.specialObjects[Squeak.splOb_ClassFloat];
        var newFloat = this.vm.instantiateClass(floatClass, 2);
        newFloat.float = value;
        return newFloat;
	},
    makeLargeIfNeeded: function(integer) {
        return this.vm.canBeSmallInt(integer) ? integer : this.makeLargeInt(integer);
    },
    makeLargeInt: function(integer) {
        if (integer < 0) throw Error("negative large ints not implemented yet");
        if (integer > 0xFFFFFFFF) throw Error("large large ints not implemented yet");
        return this.pos32BitIntFor(integer);
    },
    makePointWithXandY: function(x, y) {
        var pointClass = this.vm.specialObjects[Squeak.splOb_ClassPoint];
        var newPoint = this.vm.instantiateClass(pointClass, 0);
        newPoint.setPointer(Squeak.Point_x, x);
        newPoint.setPointer(Squeak.Point_y, y);
        return newPoint;
    },
    makeStArray: function(jsArray) {
        var array = this.vm.instantiateClass(this.vm.specialObjects[Squeak.splOb_ClassArray], jsArray.length);
        for (var i = 0; i < jsArray.length; i++)
            array.pointers[i] = this.makeStObject(jsArray[i]);
        return array;
    },
    makeStString: function(jsString) {
        var bytes = [];
        for (var i = 0; i < jsString.length; ++i)
            bytes.push(jsString.charCodeAt(i) & 0xFF);
        var stString = this.vm.instantiateClass(this.vm.specialObjects[Squeak.splOb_ClassString], bytes.length);
        stString.bytes = bytes;
        return stString;
    },
    makeStObject: function(obj) {
        if (obj === undefined || obj === null) return this.vm.nilObj;
        if (obj === true) return this.vm.trueObj;
        if (obj === false) return this.vm.falseObj;
        if (obj.stClass) return obj;
        if (typeof obj === "string" || obj.constructor === Uint8Array) return this.makeStString(obj);
        if (obj.constructor === Array) return this.makeStArray(obj);
        if (typeof obj === "number")
            if (obj === (obj|0)) return this.makeLargeIfNeeded(obj);
            else return this.makeFloat(obj)
        throw Error("cannot make smalltalk object");
    },
    pointsTo: function(rcvr, arg) {
        if (!rcvr.pointers) return false;
        return rcvr.pointers.indexOf(arg) >= 0;
    },
    asUint8Array: function(buffer) {
        if (buffer.constructor === Uint8Array) return buffer;
        if (buffer.constructor === ArrayBuffer) return new Uint8Array(buffer);
        if (typeof buffer === "string") {
            var array = new Uint8Array(buffer.length);
            for (var i = 0; i < buffer.length; i++)
                array[i] = buffer.charCodeAt(i);
            return array;
        }
        throw Error("unknown buffer type");
    },
},
'indexing', {
    objectAt: function(cameFromBytecode, convertChars, includeInstVars) {
        //Returns result of at: or sets success false
        var array = this.stackNonInteger(1);
        var index = this.stackPos32BitInt(0); //note non-int returns zero
        if (!this.success) return array;
        var info;
        if (cameFromBytecode) {// fast entry checks cache
            info = this.atCache[array.hash & this.atCacheMask];
            if (info.array !== array) {this.success = false; return array;}
        } else {// slow entry installs in cache if appropriate
            if (array.isFloat) { // present float as word array
                var floatData = array.floatData();
                if (index==1) return this.pos32BitIntFor(floatData.getUint32(0, false));
                if (index==2) return this.pos32BitIntFor(floatData.getUint32(4, false));
                this.success = false; return array;
            }
            info = this.makeAtCacheInfo(this.atCache, this.vm.specialSelectors[32], array, convertChars, includeInstVars);
        }
        if (index < 1 || index > info.size) {this.success = false; return array;}
        if (includeInstVars)  //pointers...   instVarAt and objectAt
            return array.pointers[index-1];
        if (array.format<6)   //pointers...   normal at:
            return array.pointers[index-1+info.ivarOffset];
        if (array.format<8) // words...
            return this.pos32BitIntFor(array.words[index-1]);
        if (array.format<12) // bytes...
            if (info.convertChars) return this.charFromInt(array.bytes[index-1] & 0xFF);
            else return array.bytes[index-1] & 0xFF;
        // methods (format>=12) must simulate Squeak's method indexing
        var offset = array.pointersSize() * 4;
        if (index-1-offset < 0) {this.success = false; return array;} //reading lits as bytes
        return array.bytes[index-1-offset] & 0xFF;
    },
    objectAtPut: function(cameFromBytecode, convertChars, includeInstVars) {
        //Returns result of at:put: or sets success false
        var array = this.stackNonInteger(2);
        var index = this.stackPos32BitInt(1); //note non-int returns zero
        if (!this.success) return array;
        var info;
        if (cameFromBytecode) {// fast entry checks cache
            info = this.atPutCache[array.hash & this.atCacheMask];
            if (info.array !== array) {this.success = false; return array;}
        } else {// slow entry installs in cache if appropriate
            if (array.isFloat) { // present float as word array
                var wordToPut = this.stackPos32BitInt(0);
                if (this.success && (index == 1 || index == 2)) {
                    var floatData = array.floatData();
                    floatData.setUint32(index == 1 ? 0 : 4, wordToPut, false);
                    array.float = floatData.getFloat64(0);
                    debugger;
                } else this.success = false;
                return this.vm.stackValue(0);
            }
            info = this.makeAtCacheInfo(this.atPutCache, this.vm.specialSelectors[34], array, convertChars, includeInstVars);
        }
        if (index<1 || index>info.size) {this.success = false; return array;}
        var objToPut = this.vm.stackValue(0);
        if (includeInstVars)  // pointers...   instVarAtPut and objectAtPut
            return array.pointers[index-1] = objToPut; //eg, objectAt:
        if (array.format<6)  // pointers...   normal atPut
            return array.pointers[index-1+info.ivarOffset] = objToPut;
        var intToPut;
        if (array.format<8) {  // words...
            intToPut = this.stackPos32BitInt(0);
            if (this.success) array.words[index-1] = intToPut;
            return objToPut;
        }
        // bytes...
        if (convertChars) {
            // put a character...
            if (this.vm.isSmallInt(objToPut)) {this.success = false; return objToPut;}
            if (objToPut.sqClass !== this.vm.specialObjects[Squeak.splOb_ClassCharacter])
                {this.success = false; return objToPut;}
            intToPut = objToPut.getPointer(0);
            if (!(this.vm.isSmallInt(intToPut))) {this.success = false; return objToPut;}
        } else { // put a byte...
            if(!(this.vm.isSmallInt(objToPut))) {this.success = false; return objToPut;}
            intToPut = objToPut;
        }
        if (intToPut<0 || intToPut>255) {this.success = false; return objToPut;}
        if (array.format<8)  // bytes...
            return array.bytes[index-1] = intToPut;
        // methods (format>=12) must simulate Squeak's method indexing
        var offset = array.pointersSize() * 4;
        if (index-1-offset < 0) {this.success = false; return array;} //writing lits as bytes
        array.bytes[index-1-offset] = intToPut;
        return objToPut;
    },
    objectSize: function(argCount) {
        var rcvr = this.vm.stackValue(0);
        var size = this.indexableSize(rcvr);
        if (size === -1) {this.success = false; return -1}; //not indexable
        return this.pos32BitIntFor(size);
    },
    initAtCache: function() {
        // The purpose of the at-cache is to allow fast (bytecode) access to at/atput code
        // without having to check whether this object has overridden at, etc.
        this.atCacheSize = 32; // must be power of 2
        this.atCacheMask = this.atCacheSize - 1; //...so this is a mask
        this.atCache = [];
        this.atPutCache = [];
        this.nonCachedInfo = {};
        for (var i= 0; i < this.atCacheSize; i++) {
            this.atCache.push({});
            this.atPutCache.push({});
        }
    },
    clearAtCache: function() { //clear at-cache pointers (prior to GC)
        this.nonCachedInfo.array = null;
        for (var i= 0; i < this.atCacheSize; i++) {
            this.atCache[i].array = null;
            this.atPutCache[i].array = null;
        }
    },
    makeAtCacheInfo: function(atOrPutCache, atOrPutSelector, array, convertChars, includeInstVars) {
        //Make up an info object and store it in the atCache or the atPutCache.
        //If it's not cacheable (not a non-super send of at: or at:put:)
        //then return the info in nonCachedInfo.
        //Note that info for objectAt (includeInstVars) will have
        //a zero ivarOffset, and a size that includes the extra instVars
        var info;
        var cacheable =
            (this.vm.verifyAtSelector === atOrPutSelector)         //is at or atPut
		    && (this.vm.verifyAtClass === array.sqClass)           //not a super send
            && !(array.format === 3 && this.vm.isContext(array));  //not a context (size can change)
        info = cacheable ? atOrPutCache[array.hash & this.atCacheMask] : this.nonCachedInfo;
        info.array = array;
        info.convertChars = convertChars;
        if (includeInstVars) {
            info.size = array.instSize() + Math.max(0, this.indexableSize(array));
            info.ivarOffset = 0;
        } else {
            info.size = this.indexableSize(array);
            info.ivarOffset = (array.format < 6) ? array.instSize() : 0;
        }
        return info;
    },
},
'basic',{
    someObject: function() {
        return this.vm.image.firstOldObject;
    },
    nextObject: function(obj) {
        var nextObj = this.vm.image.objectAfter(obj);
        return nextObj ? nextObj : 0;
    },
    someInstanceOf: function(clsObj) {
        var someInstance = this.vm.image.someInstanceOf(clsObj);
        if (someInstance) return someInstance;
        this.success = false;
        return 0;
    },
    nextInstanceAfter: function(obj) {
        var nextInstance = this.vm.image.nextInstanceAfter(obj);
        if (nextInstance) return nextInstance;
        this.success = false;
        return 0;
    },
    primitiveMakePoint: function(argCount) {
        var x = this.vm.stackValue(1);
        var y = this.vm.stackValue(0);
        this.vm.popNandPush(1+argCount, this.makePointWithXandY(x, y));
        return true;
    },
    primitiveStoreStackp: function(argCount) {
        var ctxt = this.stackNonInteger(1),
            newStackp = this.stackInteger(0);       
        if (!this.success || newStackp < 0 || this.vm.decodeSqueakSP(newStackp) >= ctxt.pointers.length)
            return false;
        var stackp = ctxt.pointers[Squeak.Context_stackPointer];
        while (stackp < newStackp)
            ctxt.pointers[this.vm.decodeSqueakSP(++stackp)] = this.vm.nilObj;
        ctxt.pointers[Squeak.Context_stackPointer] = newStackp;
        this.vm.pop(argCount);
        return true;
    },
    primitiveShortAtAndPut:  function(argCount) {
        var rcvr = this.stackNonInteger(argCount),
            index = this.stackInteger(argCount-1) - 1, // make zero-based
            array = rcvr.int16Array || (rcvr.words && (rcvr.int16Array = new Int16Array(rcvr.words.buffer)));
        if (!this.success || !array || index < 0 || index >= array.length)
            return false;
        var value;
        if (argCount < 2) { // shortAt:
            value = array[index];
        } else { // shortAt:put:
            value = this.stackInteger(0);
            if (value < -32768 || value > 32767)
                return false;
            array[index] = value;
        }
        this.popNandPushIfOK(argCount+1, value);
        return true;
    },
    primitiveConstantFill:  function(argCount) {
        var rcvr = this.stackNonInteger(1),
            value = this.stackPos32BitInt(0);
        if (!this.success || !rcvr.isWordsOrBytes())
            return false;
        var array = rcvr.words || rcvr.bytes;
        if (array) {
            if (array === rcvr.bytes && value > 255)
                return false;
            for (var i = 0; i < array.length; i++)
                array[i] = value;
        }
        this.vm.popN(argCount);
        return true;
    },
    primitiveNewMethod: function(argCount) {
        var header = this.stackInteger(0);
        var byteCount = this.stackInteger(1);
        if (!this.success) return 0;
        var litCount = (header>>9) & 0xFF;
        var method = this.vm.instantiateClass(this.vm.stackValue(2), byteCount);
        method.pointers = [header];
        while (method.pointers.length < litCount+1)
            method.pointers.push(this.vm.nilObj);
        this.vm.popNandPush(1+argCount, method);
        if (this.vm.breakOnNewMethod)
            this.vm.breakOnMethod = method;
        return true;
    },
    primitiveExecuteMethodArgsArray: function(argCount) {
        // receiver, argsArray, then method are on top of stack.  Execute method with
        // receiver and args.
        var methodObj = this.stackNonInteger(0),
            argsArray = this.stackNonInteger(1),
            receiver = this.vm.stackValue(2);
        // Allow for up to two extra arguments (e.g. for mirror primitives).
        if (!this.success || !this.vm.isMethod(methodObj) || argCount > 4) return false;
        var numArgs = methodObj.methodNumArgs();
        if (numArgs !== argsArray.pointersSize()) return false;
        // drop all args, push receiver, and new arguments
        this.vm.popNandPush(argCount+1, receiver);
        for (var i = 0; i < numArgs; i++) 
            this.vm.push(argsArray.pointers[i]);
        this.vm.executeNewMethod(receiver, methodObj, numArgs, methodObj.methodPrimitiveIndex());
        return true;
    },
    doArrayBecome: function(doBothWays) {
	    var rcvr = this.stackNonInteger(1);
        var arg = this.stackNonInteger(0);
    	if (!this.success) return rcvr;
        this.success = this.vm.image.bulkBecome(rcvr.pointers, arg.pointers, doBothWays);
        return rcvr;
    },
    doStringReplace: function() {
        var dst = this.stackNonInteger(4);
        var dstPos = this.stackInteger(3) - 1;
        var count = this.stackInteger(2) - dstPos;
        //	if (count<=0) {this.success = false; return dst;} //fail for compat, later succeed
        var src = this.stackNonInteger(1);
        var srcPos = this.stackInteger(0) - 1;
        if (!this.success) return dst; //some integer not right
        var srcFmt = src.format;
        var dstFmt = dst.format;
    	if (dstFmt < 8)
            if (dstFmt != srcFmt) {this.success = false; return dst;} //incompatible formats
        else
            if ((dstFmt&0xC) != (srcFmt&0xC)) {this.success = false; return dst;} //incompatible formats
        if (srcFmt<4) {//pointer type objects
            var totalLength = src.pointersSize();
            var srcInstSize = src.instSize();
            srcPos += srcInstSize;
            if ((srcPos < 0) || (srcPos + count) > totalLength)
                {this.success = false; return dst;} //would go out of bounds
            totalLength = dst.pointersSize();
            var dstInstSize= dst.instSize();
            dstPos += dstInstSize;
            if ((dstPos < 0) || (dstPos + count) > totalLength)
                {this.success= false; return dst;} //would go out of bounds
            this.vm.arrayCopy(src.pointers, srcPos, dst.pointers, dstPos, count);
            return dst;
        } else if (srcFmt < 8) { //words type objects
            var totalLength = src.wordsSize();
            if ((srcPos < 0) || (srcPos + count) > totalLength)
                {this.success = false; return dst;} //would go out of bounds
            totalLength = dst.wordsSize();
            if ((dstPos < 0) || (dstPos + count) > totalLength)
                {this.success = false; return dst;} //would go out of bounds
            this.vm.arrayCopy(src.words, srcPos, dst.words, dstPos, count);
            return dst;
        } else { //bytes type objects
            var totalLength = src.bytesSize();
            if ((srcPos < 0) || (srcPos + count) > totalLength)
                {this.success = false; return dst;} //would go out of bounds
            totalLength = dst.bytesSize();
            if ((dstPos < 0) || (dstPos + count) > totalLength)
                {this.success = false; return dst;} //would go out of bounds
            this.vm.arrayCopy(src.bytes, srcPos, dst.bytes, dstPos, count);
            return dst;
        }
    },
},
'blocks', {
    doBlockCopy: function() {
        var rcvr = this.vm.stackValue(1);
        var sqArgCount = this.stackInteger(0);
        var homeCtxt = rcvr;
        if(!this.vm.isContext(homeCtxt)) this.success = false;
        if(!this.success) return rcvr;
        if (this.vm.isSmallInt(homeCtxt.getPointer(Squeak.Context_method)))
            // ctxt is itself a block; get the context for its enclosing method
            homeCtxt = homeCtxt.getPointer(Squeak.BlockContext_home);
        var blockSize = homeCtxt.pointersSize() - homeCtxt.instSize(); // could use a const for instSize
        var newBlock = this.vm.instantiateClass(this.vm.specialObjects[Squeak.splOb_ClassBlockContext], blockSize);
        var initialPC = this.vm.encodeSqueakPC(this.vm.pc + 2, this.vm.method); //*** check this...
        newBlock.setPointer(Squeak.BlockContext_initialIP, initialPC);
        newBlock.setPointer(Squeak.Context_instructionPointer, initialPC); // claim not needed; value will set it
        newBlock.setPointer(Squeak.Context_stackPointer, 0);
        newBlock.setPointer(Squeak.BlockContext_argumentCount, sqArgCount);
        newBlock.setPointer(Squeak.BlockContext_home, homeCtxt);
        newBlock.setPointer(Squeak.Context_sender, this.vm.nilObj); // claim not needed; just initialized
        return newBlock;
    },
    primitiveBlockValue: function(argCount) {
        var rcvr = this.vm.stackValue(argCount);
        if (!this.isA(rcvr, Squeak.splOb_ClassBlockContext)) return false;
        var block = rcvr;
        var blockArgCount = block.getPointer(Squeak.BlockContext_argumentCount);
        if (!this.vm.isSmallInt(blockArgCount)) return false;
        if (blockArgCount != argCount) return false;
        if (!block.getPointer(Squeak.BlockContext_caller).isNil) return false;
        this.vm.arrayCopy(this.vm.activeContext.pointers, this.vm.sp-argCount+1, block.pointers, Squeak.Context_tempFrameStart, argCount);
        var initialIP = block.getPointer(Squeak.BlockContext_initialIP);
        block.setPointer(Squeak.Context_instructionPointer, initialIP);
        block.setPointer(Squeak.Context_stackPointer, argCount);
        block.setPointer(Squeak.BlockContext_caller, this.vm.activeContext);
        this.vm.popN(argCount+1);
        this.vm.newActiveContext(block);
        return true;
    },
    primitiveValueWithArgs: function(argCount) {
        var block = this.vm.stackValue(1);
        var array = this.vm.stackValue(0);
        if (!this.isA(block, Squeak.splOb_ClassBlockContext)) return false;
        if (!this.isA(array, Squeak.splOb_ClassArray)) return false;
        var blockArgCount = block.getPointer(Squeak.BlockContext_argumentCount);
        if (!this.vm.isSmallInt(blockArgCount)) return false;
        if (blockArgCount != array.pointersSize()) return false;
        if (!block.getPointer(Squeak.BlockContext_caller).isNil) return false;
        this.vm.arrayCopy(array.pointers, 0, block.pointers, Squeak.Context_tempFrameStart, blockArgCount);
        var initialIP = block.getPointer(Squeak.BlockContext_initialIP);
        block.setPointer(Squeak.Context_instructionPointer, initialIP);
        block.setPointer(Squeak.Context_stackPointer, blockArgCount);
        block.setPointer(Squeak.BlockContext_caller, this.vm.activeContext);
        this.vm.popN(argCount+1);
        this.vm.newActiveContext(block);
        return true;
    },
},
'scheduling',
{
    primitiveResume: function() {
        this.resume(this.vm.top());
        return true;
	},
    primitiveSuspend: function() {
        var activeProc = this.getScheduler().getPointer(Squeak.ProcSched_activeProcess);
        if (this.vm.top() !== activeProc) return false;
        this.vm.popNandPush(1, this.vm.nilObj);
        this.transferTo(this.pickTopProcess());
        return true;
    },
    getScheduler: function() {
        var assn = this.vm.specialObjects[Squeak.splOb_SchedulerAssociation];
        return assn.getPointer(Squeak.Assn_value);
    },
    resume: function(newProc) {
        var activeProc = this.getScheduler().getPointer(Squeak.ProcSched_activeProcess);
        var activePriority = activeProc.getPointer(Squeak.Proc_priority);
        var newPriority = newProc.getPointer(Squeak.Proc_priority);
        if (newPriority > activePriority) {
            this.putToSleep(activeProc);
            this.transferTo(newProc);
        } else {
            this.putToSleep(newProc);
        }
    },
    putToSleep: function(aProcess) {
        //Save the given process on the scheduler process list for its priority.
        var priority = aProcess.getPointer(Squeak.Proc_priority);
        var processLists = this.getScheduler().getPointer(Squeak.ProcSched_processLists);
        var processList = processLists.getPointer(priority - 1);
        this.linkProcessToList(aProcess, processList);
    },
    transferTo: function(newProc) {
        //Record a process to be awakened on the next interpreter cycle.
        var sched = this.getScheduler();
        var oldProc = sched.getPointer(Squeak.ProcSched_activeProcess);
        sched.setPointer(Squeak.ProcSched_activeProcess, newProc);
        oldProc.setPointer(Squeak.Proc_suspendedContext, this.vm.activeContext);
        this.vm.newActiveContext(newProc.getPointer(Squeak.Proc_suspendedContext));
        newProc.setPointer(Squeak.Proc_suspendedContext, this.vm.nilObj);
        this.vm.reclaimableContextCount = 0;
        if (this.vm.breakOnContextChanged) {
            this.vm.breakOnContextChanged = false;
            this.vm.breakOutOfInterpreter = 'break';
        }
    },
    pickTopProcess: function() { // aka wakeHighestPriority
        //Return the highest priority process that is ready to run.
        //Note: It is a fatal VM error if there is no runnable process.
        var schedLists = this.getScheduler().getPointer(Squeak.ProcSched_processLists);
        var p = schedLists.pointersSize() - 1;  // index of last indexable field
        var processList;
        do {
            if (p < 0) throw Error("scheduler could not find a runnable process");
            processList = schedLists.getPointer(p--);
        } while (this.isEmptyList(processList));
        return this.removeFirstLinkOfList(processList);
	},    
    linkProcessToList: function(proc, aList) {
        // Add the given process to the given linked list and set the backpointer
        // of process to its new list.
        if (this.isEmptyList(aList))
            aList.setPointer(Squeak.LinkedList_firstLink, proc);
        else {
            var lastLink = aList.getPointer(Squeak.LinkedList_lastLink);
            lastLink.setPointer(Squeak.Link_nextLink, proc);
        }
        aList.setPointer(Squeak.LinkedList_lastLink, proc);
        proc.setPointer(Squeak.Proc_myList, aList);
    },
    isEmptyList: function(aLinkedList) {
        return aLinkedList.getPointer(Squeak.LinkedList_firstLink).isNil;
    },
    removeFirstLinkOfList: function(aList) {
        //Remove the first process from the given linked list.
        var first = aList.getPointer(Squeak.LinkedList_firstLink);
        var last = aList.getPointer(Squeak.LinkedList_lastLink);
        if (first === last) {
            aList.setPointer(Squeak.LinkedList_firstLink, this.vm.nilObj);
            aList.setPointer(Squeak.LinkedList_lastLink, this.vm.nilObj);
        } else {
            var next = first.getPointer(Squeak.Link_nextLink);
            aList.setPointer(Squeak.LinkedList_firstLink, next);
        }
        first.setPointer(Squeak.Link_nextLink, this.vm.nilObj);
        return first;
    },
    registerSemaphore: function(specialObjIndex) {
        var sema = this.vm.top();
        if (this.isA(sema, Squeak.splOb_ClassSemaphore))
            this.vm.specialObjects[specialObjIndex] = sema;
        else
            this.vm.specialObjects[specialObjIndex] = this.vm.nilObj;
        return this.vm.stackValue(1);
    },
    primitiveWait: function() {
    	var sema = this.vm.top();
        if (!this.isA(sema, Squeak.splOb_ClassSemaphore)) return false;
        var excessSignals = sema.getPointer(Squeak.Semaphore_excessSignals);
        if (excessSignals > 0)
            sema.setPointer(Squeak.Semaphore_excessSignals, excessSignals - 1);
        else {
            var activeProc = this.getScheduler().getPointer(Squeak.ProcSched_activeProcess);
            this.linkProcessToList(activeProc, sema);
            this.transferTo(this.pickTopProcess());
        }
        return true;
    },
    primitiveSignal: function() {
	    var sema = this.vm.top();
        if (!this.isA(sema, Squeak.splOb_ClassSemaphore)) return false;
        this.synchronousSignal(sema);
        return true;
    },
    synchronousSignal: function(sema) {
    	if (this.isEmptyList(sema)) {
            // no process is waiting on this semaphore
            sema.pointers[Squeak.Semaphore_excessSignals]++;
        } else
            this.resume(this.removeFirstLinkOfList(sema));
        return;
    },
    primitiveSignalAtMilliseconds: function(argCount) { //Delay signal:atMs:
        var msTime = this.stackInteger(0);
        var sema = this.stackNonInteger(1);
        var rcvr = this.stackNonInteger(2);
        if (!this.success) return false;
        if (this.isA(sema, Squeak.splOb_ClassSemaphore)) {
            this.vm.specialObjects[Squeak.splOb_TheTimerSemaphore] = sema;
            this.vm.nextWakeupTick = msTime;
        } else {
            this.vm.specialObjects[Squeak.splOb_TheTimerSemaphore] = this.vm.nilObj;
            this.vm.nextWakeupTick = 0;
        }
        this.vm.popN(argCount); // return self
        return true;
	},
},
'vm functions', {
    primitiveGetAttribute: function(argCount) {
        var attr = this.stackInteger(0);
        if (!this.success) return false;
        var value;
        switch (attr) {
            case 0: value = Squeak.vmPath + 'vm.js'; break;
            case 1: value = this.vm.image.name; break;
            case 1001: value = Squeak.osName; break;
            case 1002: value = Squeak.osVersion; break;
            case 1003: value = Squeak.cpuType; break;
            case 1004: value = Squeak.vmVersion; break;
            case 1005: value = Squeak.windowSystem; break;
            case 1006: value = Squeak.vmBuild; break;
            default: return false;
        }
        this.vm.popNandPush(argCount+1, this.makeStString(value));
        return true;
	},
    setLowSpaceThreshold: function() {
        var nBytes = this.stackInteger(0);
        if (this.success) this.vm.lowSpaceThreshold = nBytes;
        return this.vm.stackValue(1);
    },
    primitiveVMParameter: function(argCount) {
        /* Behaviour depends on argument count:
		0 args:	return an Array of VM parameter values;
		1 arg:	return the indicated VM parameter;
		2 args:	set the VM indicated parameter. */
		var paramsArraySize = 40;
		switch (argCount) {
		    case 0:
		        var arrayObj = this.vm.instantiateClass(this.vm.specialObjects[Squeak.splOb_ClassArray], paramsArraySize);
		        arrayObj.pointers = this.vm.fillArray(paramsArraySize, 0);
		        return this.popNandPushIfOK(1, arrayObj);
		    case 1:
		        return this.popNandPushIfOK(2, 0);
		    case 2:
		        return this.popNandPushIfOK(3, 0);
		};
		return false;
    },
    primitiveImageName: function(argCount) {
        if (argCount == 0)
            return this.popNandPushIfOK(1, this.makeStString(this.vm.image.name));
        this.vm.image.name = this.vm.top().bytesAsString();
        window.localStorage['squeakImageName'] = this.vm.image.name;
        return true;
    },
    primitiveSnapshot: function(argCount) {
        this.vm.popNandPush(1, this.vm.trueObj);        // put true on stack for saved snapshot
        this.vm.storeContextRegisters();                // store current state for snapshot
        var proc = this.getScheduler().getPointer(Squeak.ProcSched_activeProcess);
        proc.setPointer(Squeak.Proc_suspendedContext, this.vm.activeContext); // store initial context
        this.vm.image.fullGC();                        // before cleanup so traversal works
        var buffer = this.vm.image.writeToBuffer();
        Squeak.flushAllFiles();                         // so there are no more writes pending
        Squeak.filePut(this.vm.image.name, buffer);
        this.vm.popNandPush(1, this.vm.falseObj);       // put false on stack for continuing
        return true;
    },
    primitiveQuit: function(argCount) {
        Squeak.flushAllFiles();
        this.vm.breakOutOfInterpreter = 'break'; 
        return true;
    },
    primitiveExitToDebugger: function(argCount) {
        this.vm.breakOutOfInterpreter = 'break';
        debugger;
        return true;
    },
},
'display', {
    primitiveBeCursor: function(argCount) {
        this.vm.popN(argCount); // return self
        return true;
    },
    primitiveBeDisplay: function(argCount) {
        var displayObj = this.vm.stackValue(0);
        this.vm.specialObjects[Squeak.splOb_TheDisplay] = displayObj;
        this.vm.popN(argCount); // return self
        return true;
	},
    primitiveReverseDisplay: function(argCount) {
        this.reverseDisplay = !this.reverseDisplay;
        this.redrawFullDisplay();
        return true;
    },
    redrawFullDisplay: function() {
        var displayObj = this.vm.specialObjects[Squeak.splOb_TheDisplay];
        var display = (new users.bert.SqueakJS.vm.BitBlt()).loadForm(displayObj);
        var bounds = {x: 0, y: 0, w: display.width, h: display.height};
        this.showOnDisplay(display, bounds);
    },
    showOnDisplay: function(form, rect) {
        if (!rect) return;
        var ctx = this.display.ctx;
        var pixels = ctx.createImageData(rect.w, rect.h);
        var dest = new Uint32Array(pixels.data.buffer);
        switch (form.depth) {
            case 1:
            case 2:
            case 4:
            case 8:
                var colors = this.indexedColors;
                if (this.reverseDisplay) {
                    if (!this.reversedColors)
                        this.reversedColors = colors.map(function(c){return c ^ 0x00FFFFFF});
                    colors = this.reversedColors;
                }
                var mask = (1 << form.depth) - 1;
                var leftSrcShift = 32 - (rect.x % form.pixPerWord + 1) * form.depth;
                var srcY = rect.y;
                for (var y = 0; y < rect.h; y++) {
                    var srcIndex = form.pitch * srcY + (rect.x / form.pixPerWord | 0);
                    var srcShift = leftSrcShift;
                    var src = form.bits[srcIndex];
                    var dstIndex = pixels.width * y;
                    for (var x = 0; x < rect.w; x++) {
                        dest[dstIndex++] = colors[(src >>> srcShift) & mask]; 
                        if ((srcShift -= form.depth) < 0) {
                            srcShift = 32 - form.depth;
                            src = form.bits[++srcIndex];
                        }
                    }
                    srcY++;
                };
                break;
            case 16:
                var leftSrcShift = rect.x % 2 ? 0 : 16;
                var srcY = rect.y;
                for (var y = 0; y < rect.h; y++) {
                    var srcIndex = form.pitch * srcY + (rect.x / 2 | 0);
                    var srcShift = leftSrcShift;
                    var src = form.bits[srcIndex];
                    var dstIndex = pixels.width * y;
                    for (var x = 0; x < rect.w; x++) {
                        var rgb = src >>> srcShift;
                        dest[dstIndex++] =
                            ((rgb & 0x7C00) >> 7)     // shift red   down 2*5, up 0*8 + 3
                            + ((rgb & 0x03E0) << 6)   // shift green down 1*5, up 1*8 + 3
                            + ((rgb & 0x001F) << 19)  // shift blue  down 0*5, up 2*8 + 3
                            + 0xFF000000;             // set alpha to opaque 
                        if ((srcShift -= 16) < 0) {
                            srcShift = 16;
                            src = form.bits[++srcIndex];
                        }
                    }
                    srcY++;
                };
                break;
            case 32:
                var srcY = rect.y;
                for (var y = 0; y < rect.h; y++) {
                    var srcIndex = form.pitch * srcY + rect.x;
                    var dstIndex = pixels.width * y;
                    for (var x = 0; x < rect.w; x++) {
                        var argb = form.bits[srcIndex++];  // convert ARGB -> ABGR
                        var abgr = (argb & 0x0000FF00)     // green is okay
                            + ((argb & 0x00FF0000) >> 16)  // shift red down
                            + ((argb & 0x000000FF) << 16)  // shift blue up
                            + 0xFF000000;                  // set alpha to opaque
                        dest[dstIndex++] = abgr;
                    }
                    srcY++;
                };
                break;
            default: throw Error("depth not implemented");
        };
        ctx.putImageData(pixels, rect.x, rect.y);
    },
    primitiveForceDisplayUpdate: function(argCount) {
        // not needed, we show everything immediately
        return true;
    },
    primitiveScreenSize: function(argCount) {
        return this.popNandPushIfOK(argCount+1, this.makePointWithXandY(this.display.width, this.display.height));
    },
    primitiveSetFullScreen: function(argCount) {
        return false; // fail for now
    },
    primitiveTestDisplayDepth: function(argCount) {
        var supportedDepths =  [1, 2, 4, 8, 16, 32]; // match showOnDisplay()
        return this.pop2andPushBoolIfOK(supportedDepths.indexOf(this.stackInteger(0)) >= 0);
    },
    displayFlush: function(){
        // no-op for now
        // TODO: copy damage rect code from Smalltalk-78 VM
    },
},
'input', {
	primitiveClipboardText: function(argCount) {
        if (argCount === 0) { // read from clipboard
            if (typeof(this.display.clipboardString) !== 'string') return false;
            this.vm.popNandPush(1, this.makeStString(this.display.clipboardString));
        } else if (argCount === 1) { // write to clipboard
            var stringObj = this.vm.top();
            if (!stringObj.bytes) return false;
            this.display.clipboardString = stringObj.bytesAsString();
            this.display.clipboardStringChanged = true;
            this.vm.pop();
        }
        return true;
	},
    primitiveKeyboardNext: function(argCount) {
        return this.popNandPushIfOK(argCount+1, this.checkSmallInt(this.display.keys.shift()));
    },
    primitiveKeyboardPeek: function(argCount) {
        var length = this.display.keys.length;
        return this.popNandPushIfOK(argCount+1, length ? this.checkSmallInt(this.display.keys[0] || 0) : this.vm.nilObj);
    },
    primitiveMouseButtons: function(argCount) {
        return this.popNandPushIfOK(argCount+1, this.checkSmallInt(this.display.buttons));
    },
    primitiveMousePoint: function(argCount) {
        return this.popNandPushIfOK(argCount+1, this.makePointWithXandY(this.checkSmallInt(this.display.mouseX), this.checkSmallInt(this.display.mouseY)));
    },
},
'time', {
    primitiveRelinquishProcessorForMicroseconds: function(argCount) {
        var millis = 100;
        if (argCount > 1) return false;
        if (argCount > 0) {
            var micros = this.stackInteger(0);
            if (!this.success) return false;
            this.vm.pop();
            millis = micros / 1000;
        }
        // make sure we tend to pending delays
        this.vm.interruptCheckCounter = 0;
        this.vm.isIdle = true;
        this.vm.breakOutOfInterpreter = true;
        return true;
    },
	millisecondClockValue: function() {
        //Return the value of the millisecond clock as an integer.
        //Note that the millisecond clock wraps around periodically.
        //The range is limited to SmallInteger maxVal / 2 to allow
        //delays of up to that length without overflowing a SmallInteger.
        return (Date.now() - this.vm.startupTime) & this.vm.millisecondClockMask;
	},
	millisecondClockValueSet: function(clock) {
        // set millisecondClock to the (previously saved) clock value 
        // to allow "stopping" the VM clock while debugging
        this.vm.startupTime = Date.now() - clock;
	},
	secondClock: function() {
        return this.pos32BitIntFor(Squeak.totalSeconds()); // will overflow 32 bits in 2037
    },
},
'MiscPrimitivePlugin', {
    primitiveStringHash: function(argCount) {
        // need to implement this because in older Etoys image the fallback code is wrong
        var initialHash = this.stackInteger(0);
        var stringObj = this.stackNonInteger(1);
        if (!this.success) return false;
        var stringSize = stringObj.bytesSize();
        var string = stringObj.bytes;
    	var hash = initialHash & 0x0FFFFFFF;
    	for (var i = 0; i < stringSize; i++) {
    		hash += string[i];
    		var low = hash & 0x3FFF;
    		hash = (0x260D * low + ((0x260D * (hash >>> 14) + (0x0065 * low) & 16383) * 16384)) & 0x0FFFFFFF;
    	}
    	this.vm.popNandPush(3, hash);
        return true;
    }
},
'FilePlugin', {
    primitiveDirectoryCreate: function(argCount) {
        console.log("Not yet implemented: primitiveDirectoryCreate");
        return false;
    },
    primitiveDirectoryDelete: function(argCount) {
        console.log("Not yet implemented: primitiveDirectoryDelete");
        return false;
    },
    primitiveDirectoryDelimitor: function(argCount) {
        var delimitor = '/';
        return this.popNandPushIfOK(1, this.charFromInt(delimitor.charCodeAt(0)));
    },
    primitiveDirectoryEntry: function(argCount) {
        return false; // image falls back on primitiveDirectoryLookup
    },
    primitiveDirectoryLookup: function(argCount) {
        var index = this.stackInteger(0),
            dirNameObj = this.stackNonInteger(1);
        if (!this.success) return false;
        var entries = Squeak.dirList(dirNameObj.bytesAsString());
        if (!entries) return false;
        var keys = Object.keys(entries);
        this.popNandPushIfOK(argCount+1, this.makeStObject(entries[keys[index - 1]]));  // entry or nil
        return true;
    },
    primitiveFileAtEnd: function(argCount) {
        var handle = this.stackNonInteger(0);
        if (!this.success || !handle.file) return false;
        this.popNandPushIfOK(argCount+1, this.makeStObject(handle.filePos >= handle.file.size));
        return true;
    },
    primitiveFileClose: function(argCount) {
        var handle = this.stackNonInteger(0);
        if (!this.success || !handle.file) return false;
        this.fileClose(handle.file);
        handle.file = null;
        return true;
    },
    primitiveFileDelete: function(argCount) {
        var fileNameObj = this.stackNonInteger(0);
        if (!this.success) return false;
        var success = Squeak.fileDelete(fileNameObj.bytesAsString());
        return success;
    },
    primitiveFileFlush: function(argCount) {
        var handle = this.stackNonInteger(0);
        if (!this.success || !handle.file) return false;
        Squeak.flushFile(handle.file);
        return true;
    },
    primitiveFileGetPosition: function(argCount) {
        var handle = this.stackNonInteger(0);
        if (!this.success || !handle.file) return false;
        this.popNandPushIfOK(argCount + 1, this.makeLargeIfNeeded(handle.filePos));
        return true;
    },
    primitiveFileOpen: function(argCount) {
        var writeFlag = !!this.stackNonInteger(0).isTrue,
            nameObj = this.stackNonInteger(1);
        if (!this.success) return false;
        var file = this.fileOpen(nameObj.bytesAsString(), writeFlag);
        if (!file) return false;
        var handle = this.makeStArray([file.name]); // array contents irrelevant
        handle.file = file;             // shared between handles
        handle.fileWrite = writeFlag;   // specific to this handle
        handle.filePos = 0;             // specific to this handle
        this.popNandPushIfOK(argCount+1, handle);
        return true;
    },
    primitiveFileRead: function(argCount) {
        var count = this.stackInteger(0),
            startIndex = this.stackInteger(1) - 1, // make zero based
            arrayObj = this.stackNonInteger(2),
            handle = this.stackNonInteger(3);
        if (!this.success || !handle.file) return false;
        if (!count) return this.popNandPushIfOK(argCount+1, 0);
        if (!arrayObj.bytes) {
            console.log("File reading into non-bytes object not implemented yet");
            return false;
        }
        if (startIndex < 0 || startIndex + count > arrayObj.bytes.length)
            return false;

        return this.fileContentsDo(handle.file, function(file) {
            if (!file.contents)
                return this.popNandPushIfOK(argCount+1, 0);
            var srcArray = file.contents,
                dstArray = arrayObj.bytes;
            count = Math.min(count, file.size - handle.filePos);
            for (var i = 0; i < count; i++)
                dstArray[startIndex + i] = srcArray[handle.filePos++];
            this.popNandPushIfOK(argCount+1, count);
        }.bind(this));
    },
    primitiveFileRename: function(argCount) {
        console.log("Not yet implemented: primitiveFileRename");
        return false;
    },
    primitiveFileSetPosition: function(argCount) {
        var pos = this.stackPos32BitInt(0),
            handle = this.stackNonInteger(1);
        if (!this.success || !handle.file) return false;
        handle.filePos = pos;
        this.vm.pop(argCount);
        return true;
    },
    primitiveFileSize: function(argCount) {
        var handle = this.stackNonInteger(0);
        if (!this.success || !handle.file) return false;
        this.popNandPushIfOK(argCount+1, this.makeLargeIfNeeded(handle.file.size));
        return true;
    },
    primitiveFileStdioHandles: function(argCount) {
        console.log("Not yet implemented: primitiveFileStdioHandles");
        return false;
    },
    primitiveFileTruncate: function(argCount) {
        console.log("Not yet implemented: primitiveFileTruncate");
        return false;
    },
    primitiveFileWrite: function(argCount) {
        var count = this.stackInteger(0),
            startIndex = this.stackInteger(1) - 1, // make zero based
            arrayObj = this.stackNonInteger(2),
            handle = this.stackNonInteger(3);
        if (!this.success || !handle.file || !handle.fileWrite) return false;
        if (!count) return this.popNandPushIfOK(argCount+1, 0);
        if (!arrayObj.bytes) {
            console.log("File writing from non-bytes object not implemented yet");
            return false;
        }
        if (startIndex < 0 || startIndex + count > arrayObj.bytes.length)
            return false;

        return this.fileContentsDo(handle.file, function(file) {
            var srcArray = arrayObj.bytes,
                dstArray = file.contents || [];
            if (handle.filePos + count > dstArray.length) {
                var newSize = dstArray.length === 0 ? handle.filePos + count :
                    Math.max(handle.filePos + count, dstArray.length + 10000);
                file.contents = new Uint8Array(newSize);
                file.contents.set(dstArray);
                dstArray = file.contents;
            }
            for (var i = 0; i < count; i++)
                dstArray[handle.filePos++] = srcArray[startIndex + i];
            if (handle.filePos > file.size) file.size = handle.filePos;
            file.modified = true;
            this.popNandPushIfOK(argCount+1, count);
        }.bind(this));
    },
    fileOpen: function(filename, writeFlag) {
        // if a file is opened for read and write at the same time,
        // they must share the contents. That's why all open files
        // are held in the ref-counted global SqueakFiles
        if (typeof SqueakFiles == 'undefined')
            SqueakFiles = {};
        var path = Squeak.splitFilePath(filename);
        if (!path.basename) return null;    // malformed filename
        // if it is open already, return it   
        var file = SqueakFiles[path.fullname];
        if (file) {
            ++file.refCount;
            return file;
        }
        // otherwise, fetch or create its directory entry
        var directory = Squeak.dirList(path.dirname);
        if (!directory) return null;
        var entry = directory[path.basename],
            contents = null;
        if (!entry) {
            if (!writeFlag) return null;
            contents = new Uint8Array();
            entry = Squeak.filePut(path.fullname, contents.buffer);
            if (!entry) return null;
        }
        // make the file object
        file = {
            name: path.fullname,
            size: entry[4],         // actual file size, may differ from contents.length
            contents: contents,     // possibly null, fetched when needed
            modified: false,
            refCount: 1
        };
        SqueakFiles[file.name] = file;
        return file;
    },
    fileClose: function(file) {
        Squeak.flushFile(file);
        if (--file.refCount == 0)
            delete SqueakFiles[file.name];
    },
    fileContentsDo: function(file, func) {
        if (file.contents) {
            func(file);
        } else {
            if (file.contents === false) // failed to get contents before
                return false;
            var unfreeze = this.vm.freeze();
            Squeak.fileGet(file.name,
                function success(contents){
                    file.contents = this.asUint8Array(contents);
                    unfreeze();
                    func(file);
                }.bind(this),
                function error(msg) {
                    console.log("File get failed: " + msg);
                    file.contents = false;
                    unfreeze();
                    func(file);
                }.bind(this));
        }
        return true;
    },
},
'BitBltPlugin', {
	primitiveCopyBits: function(argCount) {
        var bitbltObj = this.stackNonInteger(argCount),
            bitblt = new users.bert.SqueakJS.vm.BitBlt(this.vm);
        if (!bitblt.loadBitBlt(bitbltObj)) return false;

        if (bitblt.combinationRule === 30 || bitblt.combinationRule === 31) {
            // fetch source alpha parameter for alpha blend
        	if (argCount !== 1) return false;
            bitblt.sourceAlpha = this.stackInteger(0);
            if (!this.success || bitblt.sourceAlpha < 0 || bitblt.sourceAlpha > 255)
				return false;
			this.vm.pop();
    	}
    	
        bitblt.copyBits();
        
        if (bitblt.combinationRule === 22 || bitblt.combinationRule === 32)
            this.vm.popNandPush(1, bitblt.bitCount);
        else if (bitblt.destForm === this.vm.specialObjects[Squeak.splOb_TheDisplay])
            this.showOnDisplay(bitblt.dest, bitblt.affectedRect());
        return true;
	},
	primitiveWarpBits: function(argCount) {
        var bitbltObj = this.stackNonInteger(argCount),
            smoothing = argCount == 2 ? Math.max(1, this.stackInteger(1)) : 1,
            sourceMap = argCount == 2 ? this.stackNonInteger(0).words : null;
        if (!this.success) return false;
        var bitblt = new users.bert.SqueakJS.vm.BitBlt(this.vm);
        if (!bitblt.loadBitBlt(bitbltObj, smoothing, sourceMap)) return false;
        // color map is required to smooth non-RGB dest
		if (smoothing > 1 && bitblt.source.depth < 16)
            if (!sourceMap || sourceMap.length < (1 << bitblt.source.depth))
                return false; 	// sourceMap must be long enough for source depth
        bitblt.warpBits();
        if (bitblt.destForm === this.vm.specialObjects[Squeak.splOb_TheDisplay])
            this.showOnDisplay(bitblt.dest, bitblt.affectedRect());
        this.vm.popN(argCount);
        return true;
	},
},
'FloatArrayPlugin', {
    primitiveFloatArrayAtAndPut: function(argCount) {
        var rcvr = this.stackNonInteger(argCount),
            index = this.stackPos32BitInt(argCount-1) - 1,
            array = rcvr.float32Array || (rcvr.words && (rcvr.float32Array = new Float32Array(rcvr.words.buffer)));
        if (!this.success || index < 0 || index >= array.length)
            return false;
        if (argCount < 2) {// at:
            var value = array[index];
            this.vm.popNandPush(argCount+1, this.makeFloat(value));
        } else { // at:put:
            var value = this.stackFloat(0);
            if (!this.success) return false;
            array[index] = value;
            this.vm.popNandPush(argCount+1, this.vm.stackValue(0));
        }
        return true;
    },
});
Object.subclass('users.bert.SqueakJS.vm.BitBlt',
'initialization', {
    initialize: function(vm) {
        this.vm = vm;
        this.maskTable = [
            0x0, 0x1, 0x3, 0x7, 0xF, 0x1F, 0x3F, 0x7F, 0xFF, 0x1FF, 0x3FF, 0x7FF, 0xFFF,
            0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF, 0x1FFFF, 0x3FFFF, 0x7FFFF, 0xFFFFF,
            0x1FFFFF, 0x3FFFFF, 0x7FFFFF, 0xFFFFFF, 0x1FFFFFF, 0x3FFFFFF, 0x7FFFFFF,
            0xFFFFFFF, 0x1FFFFFFF, 0x3FFFFFFF, 0x7FFFFFFF, 0xFFFFFFFF];
    }, 
    loadBitBlt: function(bitbltObj, warpSmoothing, warpSourceMap) {
        var bitblt = bitbltObj.pointers;
        this.success = true;
        this.destForm = bitblt[Squeak.BitBlt_dest];
        this.dest = this.loadForm(this.destForm);
        if (!this.dest) return false;
        this.sourceForm = bitblt[Squeak.BitBlt_source];
        if (!this.sourceForm.isNil) {
            this.source = this.loadForm(this.sourceForm);
            if (!this.source) return false;
        }
        this.halftone = this.loadHalftone(bitblt[Squeak.BitBlt_halftone]);
        this.combinationRule = bitblt[Squeak.BitBlt_combinationRule];
        this.destX = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_destX], 0);
        this.destY = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_destY], 0);
        this.width = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_width], this.dest.width);
        this.height = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_height], this.dest.height);
        this.clipX = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_clipX], 0);
        this.clipY = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_clipY], 0);
        this.clipW = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_clipW], this.dest.width);
        this.clipH = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_clipH], this.dest.height);
        if (!this.success) return false;
        if (!this.source)
            this.sourceX = this.sourceY = 0;
        else {
            if (!this.loadColorMap(bitblt[Squeak.BitBlt_colorMap])) return false;
            this.sourceX = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_sourceX], 0);
            this.sourceY = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_sourceY], 0);
        }
        this.mergeFn = this.makeMergeFn(this.combinationRule);
        if (warpSmoothing) { // this is a warp blt
            this.warpSmoothing = warpSmoothing;
            this.warpSourceMap = warpSourceMap; // maps indexed to rgb for smoothing
            this.p1x = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_warpBase], 0);
            this.p1y = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_warpBase+1], 0);
            this.p2x = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_warpBase+3], 0);
            this.p2y = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_warpBase+4], 0);
            this.p3x = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_warpBase+6], 0);
            this.p3y = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_warpBase+7], 0);
            this.p4x = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_warpBase+9], 0);
            this.p4y = this.intOrFloatIfNil(bitblt[Squeak.BitBlt_warpBase+10], 0);
        }
        return this.success;
    },
    loadHalftone: function(halftoneObj) {
        return halftoneObj.words;
    },
    loadForm: function(formObj) {
        if (formObj.isNil) return null;
        var form = {};
        form.bits = formObj.pointers[Squeak.Form_bits].words;
        form.depth = formObj.pointers[Squeak.Form_depth];
        form.width = formObj.pointers[Squeak.Form_width];
        form.height = formObj.pointers[Squeak.Form_height];
        if (form.width === 0 || form.height === 0) return form;
        if (!(form.width > 0 && form.height > 0)) return null;
        if (!form.bits) return null;    // checks for words
        form.msb = form.depth > 0;
        if (!form.msb) form.depth = -form.depth;
        if (!(form.depth > 0)) return null; // happens if not int
        form.pixPerWord = 32 / form.depth;
        form.pitch = (form.width + (form.pixPerWord - 1)) / form.pixPerWord | 0;
        if (form.bits.length !== (form.pitch * form.height)) return null;
        return form;
    },
    loadColorMap: function(colorMapObj) {
        // ColorMap, if not nil, must be words, and 
        // 2^N long, where N = sourceDepth for 1, 2, 4, 8 bits, 
        // or N = 9, 12, or 15 (3, 4, 5 bits per color) for 16 or 32 bits.
        if (colorMapObj.isNil) return true;
        var oldStyle = !!colorMapObj.words,
            colors, shifts, masks;
        if (oldStyle) {
            // This is an old-style color map (indexed only, with implicit RGBA conversion)
		    colors = colorMapObj.words;
        } else {
            // A new-style color map (fully qualified)
            if (colorMapObj.pointersSize() < 3) return false;
            shifts = colorMapObj.pointers[0].words,
            masks = colorMapObj.pointers[1].words;
            colors = colorMapObj.pointers[2].words;
            if (!shifts || shifts.length != 4 || !masks || masks.length != 4) return false;
            this.cmShiftTable = new Int32Array(shifts.buffer);
            this.cmMaskTable = masks;
            this.cmLookupTable = colors;
        }
        if (colors && colors.length) {
            this.cmLookupTable = colors;
            this.cmSize = colors.length;
            this.cmMask = this.cmSize - 1;
            if (this.cmSize & this.cmMask) return false; // not a power of 2
            this.cmBitsPerColor = 
                this.cmSize == 512 ? 3 :
                this.cmSize == 4096 ? 4 :
                this.cmSize == 32768 ? 5 : 0;
        }
        if (oldStyle && this.source.depth > 8) { // needs implicit conversion
            var srcBits = this.source.depth == 16 ? 5 : 8,
                dstBits = this.cmBitsPerColor ? this.cmBitsPerColor 
                    : this.dest.depth == 16 ? 5
                    : this.dest.depth == 32 ? 8
                    : srcBits;
            if (srcBits != dstBits)
                this.setupColorMasks(srcBits, dstBits);
        }
        return true;
    },
    intOrFloatIfNil: function(intOrFloat, valueIfNil) {
        if (this.vm.isSmallInt(intOrFloat)) return intOrFloat;
        if (intOrFloat.isNil) return valueIfNil;
        if (intOrFloat.isFloat) {
            var floatValue = intOrFloat.float;
            if (floatValue >= -0x80000000 && floatValue <= 0x7FFFFFFF)
                return floatValue | 0; // make int
        }
        this.success = false;
        return 0;
    },
},
'blitting', {
    copyBits: function() {
        this.bitCount = 0;
        this.clipRange();
        if (this.bbW <= 0 || this.bbH <= 0) return;
        this.destMaskAndPointerInit();
        /* Choose and perform the actual copy loop. */
        if (!this.source) {
            this.copyLoopNoSource();
        } else {
            this.checkSourceOverlap();
            if (this.source.depth !== this.dest.depth) {
                this.copyLoopPixMap();
            } else {
                this.sourceSkewAndPointerInit();
                this.copyLoop();
            }
        }
    },
    copyLoopNoSource: function() {
        //	Faster copyLoop when source not used.  hDir and vDir are both
        //	positive, and perload and skew are unused
        var halftoneWord = 0xFFFFFFFF;
        for (var i = 0; i < this.bbH; i++) { // vertical loop
            if (this.halftone) halftoneWord = this.halftone[(this.dy + i) % this.halftone.length];
            // First word in row is masked
            var destMask = this.mask1;
            var destWord = this.dest.bits[this.destIndex];
            var mergeWord = this.mergeFn(halftoneWord, destWord, destMask);
            destWord = (destMask & mergeWord) | (destWord & (~destMask));
            this.dest.bits[this.destIndex++] = destWord;
            destMask = 0xFFFFFFFF;
            //the central horizontal loop requires no store masking */
            if (this.combinationRule === 3) // Store rule requires no dest merging
                for (var word = 2; word < this.nWords; word++)
                    this.dest.bits[this.destIndex++] = halftoneWord;
            else
                for (var word = 2; word < this.nWords; word++) {
                        destWord = this.dest.bits[this.destIndex];
                        mergeWord = this.mergeFn(halftoneWord, destWord, 0xFFFFFFFF);
                        this.dest.bits[this.destIndex++] = mergeWord;
                }
            //last word in row is masked
            if (this.nWords > 1) {
                    destMask = this.mask2;
                    destWord = this.dest.bits[this.destIndex];
                    mergeWord = this.mergeFn(halftoneWord, destWord, destMask);
                    destWord = (destMask & mergeWord) | (destWord & (~destMask));
                    this.dest.bits[this.destIndex++] = destWord;
            }
            this.destIndex += this.destDelta;
        }
    },
    copyLoop: function() {
        // this version of the inner loop assumes we do have a source
        var sourceLimit = this.source.bits.length;
        var hInc = this.hDir;
        // init skew (the difference in word alignment of source and dest)
        var unskew;
        var skewMask;
        if (this.skew == -32) {
            this.skew = unskew = skewMask = 0;
        } else {
            if (this.skew < 0) {
                unskew = this.skew + 32;
                skewMask = 0xFFFFFFFF << -this.skew;
            } else {
                if (this.skew === 0) {
                    unskew = 0;
                    skewMask = 0xFFFFFFFF;
                } else {
                    unskew = this.skew - 32;
                    skewMask = 0xFFFFFFFF >>> this.skew;
                }
            }
        }
        var notSkewMask = ~skewMask;
        // init halftones
        var halftoneWord;
        var halftoneHeight;
       	if (this.halftone) {
            halftoneWord = this.halftone[0];
            halftoneHeight = this.halftone.length;
        } else {
            halftoneWord = 0xFFFFFFFF;
            halftoneHeight = 0;
        }
        // now loop over all lines
        var y = this.dy;
        for (var i = 1; i <= this.bbH; i++) {
            if (halftoneHeight > 1) {
                halftoneWord = this.halftone.words[y % halftoneHeight];
                y += this.vDir;
            }
            var prevWord;
            if (this.preload) {
                prevWord = this.source.bits[this.sourceIndex];
                this.sourceIndex += hInc;
            } else {
                prevWord = 0;
            }
            var destMask = this.mask1;
            /* pick up next word */
            var thisWord = this.source.bits[this.sourceIndex];
            this.sourceIndex += hInc;
            /* 32-bit rotate */
            var skewWord = ((unskew < 0 ? ( (prevWord & notSkewMask) >>> -unskew) : ( (prevWord & notSkewMask) << unskew)))
                | (((this.skew < 0) ? ( (thisWord & skewMask) >>> -this.skew) : ( (thisWord & skewMask) << this.skew)));
            prevWord = thisWord;
            var destWord = this.dest.bits[this.destIndex];
            var mergeWord = this.mergeFn(skewWord & halftoneWord, destWord, destMask);
            destWord = (destMask & mergeWord) | (destWord & (~destMask));
            this.dest.bits[this.destIndex] = destWord;
            //The central horizontal loop requires no store masking */
            this.destIndex += hInc;
            destMask = 0xFFFFFFFF;
            if (this.combinationRule == 3) { //Store mode avoids dest merge function
                if ((this.skew === 0) && (halftoneWord === 0xFFFFFFFF)) {
                    //Non-skewed with no halftone
                    var n = this.nWords - 2; // without first and last word
                    if (n > 0) {
                        if (hInc > 0) {
                            this.dest.bits[this.destIndex] = prevWord;
                            if (n > 1) {
                                var somebits = this.source.bits.subarray(this.sourceIndex, this.sourceIndex-1 + n);
                                this.dest.bits.set(somebits, this.destIndex+1);
                            }
                            prevWord = this.source.bits[this.sourceIndex-1 + n];
                        } else {
                            if (n == 1) {
                                this.dest.bits[this.destIndex] = this.source.bits[this.sourceIndex];
                            } else {
                                var somebits = this.source.bits.subarray(this.sourceIndex - n + 1, this.sourceIndex - 1);
                                this.dest.bits.set(somebits, this.destIndex - n + 1);
                            }
                        }
                        this.sourceIndex += hInc * n;
                        this.destIndex += hInc * n;
                    }
                } else {
                    //skewed and/or halftoned
                    for (var word = 2; word < this.nWords; word++) {
                        thisWord = this.source.bits[this.sourceIndex];
                        this.sourceIndex += hInc;
                        /* 32-bit rotate */
                        skewWord = (((unskew < 0) ? ( (prevWord & notSkewMask) >>> -unskew) : ( (prevWord & notSkewMask) << unskew)))
                            | (((this.skew < 0) ? ( (thisWord & skewMask) >>> -this.skew) : ( (thisWord & skewMask) << this.skew)));
                        prevWord = thisWord;
                        this.dest.bits[this.destIndex] = skewWord & halftoneWord;
                        this.destIndex += hInc;
                    }
                }
            } else { //Dest merging here...
                for (var word = 2; word < this.nWords; word++) {
                    thisWord = this.source.bits[this.sourceIndex]; //pick up next word
                    this.sourceIndex += hInc;
                    /* 32-bit rotate */
                    skewWord = (((unskew < 0) ? ( (prevWord & notSkewMask) >>> -unskew) : ( (prevWord & notSkewMask) << unskew)))
                        | (((this.skew < 0) ? ( (thisWord & skewMask) >>> -this.skew) : ( (thisWord & skewMask) << this.skew)));
                    prevWord = thisWord;
                    mergeWord = this.mergeFn(skewWord & halftoneWord, this.dest.bits[this.destIndex], 0xFFFFFFFF);
                    this.dest.bits[this.destIndex] = mergeWord;
                    this.destIndex += hInc;
                }
            } 
            // last word with masking and all
            if (this.nWords > 1) {
                destMask = this.mask2;
                if (this.sourceIndex >= 0 && this.sourceIndex < sourceLimit)
                //NOTE: we are currently overrunning source bits in some cases
                //this test makes up for it.
                    thisWord = this.source.bits[this.sourceIndex]; //pick up next word
                this.sourceIndex += hInc;
                /* 32-bit rotate */
                skewWord = (((unskew < 0) ? ((prevWord & notSkewMask) >>> -unskew) : ((prevWord & notSkewMask) << unskew)))
                    | (((this.skew < 0) ? ( (thisWord & skewMask) >>> -this.skew) : ( (thisWord & skewMask) << this.skew)));
                destWord = this.dest.bits[this.destIndex];
                mergeWord = this.mergeFn(skewWord & halftoneWord, destWord, destMask);
                destWord = (destMask & mergeWord) | (destWord & (~destMask));
                this.dest.bits[this.destIndex] = destWord;
                this.destIndex += hInc;
            }
            this.sourceIndex += this.sourceDelta;
            this.destIndex += this.destDelta;
        }
    },
    copyLoopPixMap: function() {
        /*	This version of the inner loop maps source pixels
        to a destination form with different depth.  Because it is already
        unweildy, the loop is not unrolled as in the other versions.
        Preload, skew and skewMask are all overlooked, since pickSourcePixels
        delivers its destination word already properly aligned.
        Note that pickSourcePixels could be copied in-line at the top of
        the horizontal loop, and some of its inits moved out of the loop. */
        /*	The loop has been rewritten to use only one pickSourcePixels call.
        The idea is that the call itself could be inlined. If we decide not
        to inline pickSourcePixels we could optimize the loop instead. */
        var sourcePixMask = this.maskTable[this.source.depth];
        var destPixMask = this.maskTable[this.dest.depth];
        //var mapperFlags = cmFlags & (~8);
        this.sourceIndex = (this.sy * this.source.pitch) + (this.sx / this.source.pixPerWord | 0);
        var scrStartBits = this.source.pixPerWord - (this.sx & (this.source.pixPerWord - 1));
        var nSourceIncs = (this.bbW < scrStartBits) ? 0 : ((this.bbW - scrStartBits) / this.source.pixPerWord | 0) + 1;
        /* Note following two items were already calculated in destmask setup! */
        this.sourceDelta = this.source.pitch - nSourceIncs;
        var startBits = this.dest.pixPerWord - (this.dx & (this.dest.pixPerWord - 1));
        var endBits = (((this.dx + this.bbW) - 1) & (this.dest.pixPerWord - 1)) + 1;
        if (this.bbW < startBits) startBits = this.bbW; // ?!
        var srcShift = (this.sx & (this.source.pixPerWord - 1)) * this.source.depth;
        var dstShift = (this.dx & (this.dest.pixPerWord - 1)) * this.dest.depth;
        var srcShiftInc = this.source.depth;
        var dstShiftInc = this.dest.depth;
        var dstShiftLeft = 0;
        if (this.source.msb) {
            srcShift = (32 - this.source.depth) - srcShift;
            srcShiftInc = -srcShiftInc;
        }
        if (this.dest.msb) {
            dstShift = (32 - this.dest.depth) - dstShift;
            dstShiftInc = -dstShiftInc;
            dstShiftLeft = 32 - this.dest.depth;
        }
        for (var i = 0; i < this.bbH; i++) {
            var halftoneWord = this.halftone ? this.halftone[(this.dy + i) % this.halftone.length] : 0xFFFFFFFF;
		    this.srcBitShift = srcShift;
		    this.dstBitShift = dstShift;
		    this.destMask = this.mask1;
            var nPix = startBits;
            var words = this.nWords;
            /* Here is the horizontal loop... */
            do {
                var skewWord = this.pickSourcePixels(nPix, sourcePixMask, destPixMask, srcShiftInc, dstShiftInc);
                /* align next word to leftmost pixel */
                this.dstBitShift = dstShiftLeft;
                if (this.destMask === 0xFFFFFFFF) { // avoid read-modify-write
                    this.dest.bits[this.destIndex] = this.mergeFn(skewWord & halftoneWord, this.dest.bits[this.destIndex], 0xFFFFFFFF);
                } else { // General version using dest masking
                    var destWord = this.dest.bits[this.destIndex];
                    var mergeWord = this.mergeFn(skewWord & halftoneWord, destWord & this.destMask, this.destMask);
                    destWord = (this.destMask & mergeWord) | (destWord & (~this.destMask));
                    this.dest.bits[this.destIndex] = destWord;
                }
                this.destIndex++;
                if (words === 2) { // is the next word the last word?
                    this.destMask = this.mask2;
                    nPix = endBits;
                } else { // use fullword mask for inner loop
                    this.destMask = 0xFFFFFFFF;
                    nPix = this.dest.pixPerWord;
                }
            } while (--words);
            this.sourceIndex += this.sourceDelta;
            this.destIndex += this.destDelta;
        }
    },
    sourceSkewAndPointerInit: function() {
        var pixPerM1 = this.dest.pixPerWord - 1;  //Pix per word is power of two, so this makes a mask
        var sxLowBits = this.sx & pixPerM1;
        var dxLowBits = this.dx & pixPerM1;
        // check if need to preload buffer
        // (i.e., two words of source needed for first word of destination)
        var dWid;
        if (this.hDir > 0) {
            dWid = ((this.bbW < (this.dest.pixPerWord - dxLowBits)) ? this.bbW : (this.dest.pixPerWord - dxLowBits));
            this.preload = (sxLowBits + dWid) > pixPerM1;
        } else {
            dWid = ((this.bbW < (dxLowBits + 1)) ? this.bbW : (dxLowBits + 1));
            this.preload = ((sxLowBits - dWid) + 1) < 0;
        }
        this.skew = (this.source.msb) ? (sxLowBits - dxLowBits) * this.dest.depth
            : (dxLowBits - sxLowBits) * this.dest.depth;
        if (this.preload) {
            if (this.skew < 0) this.skew += 32;
            else this.skew -= 32;
        }
        /* calculate increments from end of one line to start of next */
        this.sourceIndex = (this.sy * this.source.pitch) + (this.sx / (32 / this.source.depth) |0);
        this.sourceDelta = (this.source.pitch * this.vDir) - (this.nWords * this.hDir);
        if (this.preload) this.sourceDelta -= this.hDir;
    },
    destMaskAndPointerInit: function() {
        var pixPerM1 = this.dest.pixPerWord - 1;  //Pix per word is power of two, so this makes a mask
        var startBits = this.dest.pixPerWord - (this.dx & pixPerM1); //how many pixels in first word
        var endBits = (((this.dx + this.bbW) - 1) & pixPerM1) + 1;
        this.mask1 = this.dest.msb ? 0xFFFFFFFF >>> (32 - (startBits * this.dest.depth))
            : 0xFFFFFFFF << (32 - (startBits * this.dest.depth));
        this.mask2 = this.dest.msb ? 0xFFFFFFFF << (32 - (endBits * this.dest.depth))
            : 0xFFFFFFFF >>> (32 - (endBits * this.dest.depth));
        if (this.bbW < startBits) { //start and end in same word, so merge masks
            this.mask1 = this.mask1 & this.mask2;
            this.mask2 = 0;
            this.nWords = 1;
        } else
            this.nWords = (((this.bbW - startBits) + pixPerM1) / this.dest.pixPerWord | 0) + 1;
        this.hDir = this.vDir = 1; //defaults for no overlap with source
        this.destIndex = (this.dy * this.dest.pitch) + (this.dx / this.dest.pixPerWord | 0); //both these in words, not bytes
        this.destDelta = (this.dest.pitch * this.vDir) - (this.nWords * this.hDir);
    },
    clipRange: function() {
        // initialize sx,sy, dx,dy, bbW,bbH to the intersection of source, dest, and clip
        
        // intersect with destForm bounds
        if (this.clipX < 0) {this.clipW += this.clipX; this.clipX = 0; }
        if (this.clipY < 0) {this.clipH += this.clipY; this.clipY = 0; }
        if ((this.clipX + this.clipW) > this.dest.width) {this.clipW = this.dest.width - this.clipX; }
        if ((this.clipY + this.clipH) > this.dest.height) {this.clipH = this.dest.height - this.clipY; }
        // intersect with clipRect
        var leftOffset = Math.max(this.clipX - this.destX, 0);
        this.sx = this.sourceX + leftOffset;
        this.dx = this.destX + leftOffset;
        this.bbW = this.width - leftOffset;
        var rightOffset = (this.dx + this.bbW) - (this.clipX + this.clipW);
    	if (rightOffset > 0)
    		this.bbW -= rightOffset;
        var topOffset = Math.max(this.clipY - this.destY, 0);
        this.sy = this.sourceY + topOffset;
        this.dy = this.destY + topOffset;
        this.bbH = this.height - topOffset;
        var bottomOffset = (this.dy + this.bbH) - (this.clipY + this.clipH);
    	if (bottomOffset > 0)
    		this.bbH -= bottomOffset;
        // intersect with sourceForm bounds
    	if (!this.source) return;
    	if (this.sx < 0) {
    		this.dx -= this.sx;
    		this.bbW += this.sx;
    		this.sx = 0;
    	}
    	if ((this.sx + this.bbW) > this.source.width)
    		this.bbW -= (this.sx + this.bbW) - this.source.width;
    	if (this.sy < 0) {
    		this.dy -= this.sy;
    		this.bbH += this.sy;
    		this.sy = 0;
    	}
    	if ((this.sy + this.bbH) > this.source.height)
    		this.bbH -= (this.sy + this.bbH) - this.source.height;
	},
    checkSourceOverlap: function() {
        if (this.sourceForm === this.destForm && this.dy >= this.sy) {
            if (this.dy > this.sy) {
                this.vDir = -1;
                this.sy = (this.sy + this.bbH) - 1;
                this.dy = (this.dy + this.bbH) - 1;
            } else {
                if (this.dy === this.sy && this.dx > this.sx) {
                    this.hDir = -1;
                    this.sx = (this.sx + this.bbW) - 1; //start at right
                    this.dx = (this.dx + this.bbW) - 1;
                    if (this.nWords > 1) {
                        var t = this.mask1; //and fix up masks
                        this.mask1 = this.mask2;
                        this.mask2 = t;
                    }
                }
            }
            this.destIndex = (this.dy * this.dest.pitch) + (this.dx / this.dest.pixPerWord | 0); //recompute since dx, dy change
            this.destDelta = (this.dest.pitch * this.vDir) - (this.nWords * this.hDir);
		}
    },
    warpBits: function() {
        var source = this.source;
        if (!source) {this.bbW = this.bbH = 0; return} // so affectedRect() answers correctly
        this.source = null; // suppresses sourceRect clipping
        this.clipRange();
        this.source = source;
        if (this.bbW <= 0 || this.bbH <= 0) return;
        this.destMaskAndPointerInit();
        this.warpLoop();
    },
    warpLoop:  function() {
        // This version of the bitblt loop traverses an arbitrary quadrilateral
        // source, thus producing a general affine transformation.
        // The quad vertices are p1 to p4. The outer loop traverses vertically
        // from p1 to p4, the inner loop horizontally from p1 to p2
        var ySteps = Math.max(1, this.height-1),
            deltaP12x = this.warpDelta(this.p1x, this.p2x, ySteps),
            deltaP12y = this.warpDelta(this.p1y, this.p2y, ySteps),
            deltaP43x = this.warpDelta(this.p4x, this.p3x, ySteps),
            deltaP43y = this.warpDelta(this.p4y, this.p3y, ySteps);
        if (deltaP12x < 0) this.p1x = this.p2x - (ySteps*deltaP12x);
        if (deltaP12y < 0) this.p1y = this.p2y - (ySteps*deltaP12y);
        if (deltaP43x < 0) this.p4x = this.p3x - (ySteps*deltaP43x);
        if (deltaP43y < 0) this.p4y = this.p3y - (ySteps*deltaP43y);
    
        var xSteps = Math.max(1, this.width - 1),
            startBits = this.dest.pixPerWord - (this.dx & this.dest.pixPerWord-1),
            endBits = ((this.dx + this.bbW - 1) & this.dest.pixPerWord-1) + 1;
        if (this.bbW < startBits) startBits = this.bbW;
        // Advance increments if there was clipping in y
        if (this.destY < this.clipY) {
            this.p1x += (this.clipY - this.destY) * deltaP12x;
            this.p1y += (this.clipY - this.destY) * deltaP12y;
            this.p4x += (this.clipY - this.destY) * deltaP43x;
            this.p4y += (this.clipY - this.destY) * deltaP43y;
        }
        // Setup values for faster pixel fetching
        this.warpPickSetup();
        // Setup color mapping if not provided
        if (this.warpSmoothing > 1 && !this.cmMaskTable) {
            if (!this.cmLookupTable) {
                if (this.dest.depth == 16) this.setupColorMasks(8, 5);
            } else {
                this.setupColorMasks(8, this.cmBitsPerColor);
            }
        }

        var dstShiftInc = this.dest.msb ? -this.dest.depth : this.dest.depth,
            dstShiftLeft = this.dest.msb ? 32 - this.dest.depth : 0,
            halftoneWord = this.halftone ? this.halftone[0] : 0xFFFFFFFF,
            halftoneHeight = this.halftone ? this.halftone.length : 0,
            destIndex = this.destIndex;

        // here is the vertical loop ...
        for (var i = 0; i < this.bbH; i++) {
            var xDelta = this.warpDelta(this.p1x, this.p4x, xSteps),
                yDelta = this.warpDelta(this.p1y, this.p4y, xSteps);
            this.sx = xDelta >= 0 ? this.p1x : this.p4x - (xSteps*xDelta),
            this.sy = yDelta >= 0 ? this.p1y : this.p4y - (xSteps*yDelta);
            // Advance increments if there was clipping in x
            if (this.destX < this.clipX) {
                this.sx += (this.clipX - this.destX) * xDelta;
                this.sy += (this.clipX - this.destX) * yDelta;
            }
            var dstBitShift = this.dest.msb
                ? (32 - ((this.dx & this.dest.pixPerWord - 1) + 1) * this.dest.depth)
                : (this.dx & this.dest.pixPerWord - 1) * this.dest.depth;
            if (halftoneHeight > 1)
                halftoneWord = this.halftone.words[(this.dy+i) % halftoneHeight];
            var destMask = this.mask1,
                nPix = startBits,
                words = this.nWords;
            // Here is the inner loop ...
            do {
                var skewWord = this.warpSmoothing == 1
                    ? this.warpPickSourcePixels(nPix, xDelta, yDelta, dstBitShift, dstShiftInc)
                    : this.warpPickSmoothPixels(nPix, xDelta, yDelta, deltaP12x, deltaP12y, dstBitShift, dstShiftInc);
                var destWord = this.dest.bits[destIndex],
                    mergeWord = this.mergeFn(skewWord & halftoneWord, destWord & destMask, destMask);
                this.dest.bits[destIndex] = (destMask & mergeWord) | (destWord & ~destMask);
                destIndex++;
                dstBitShift = dstShiftLeft; // align next word access to left most pixel
                if (words == 2) { // is the next word the last word?
                    destMask = this.mask2;
                    nPix = endBits;
                } else {
                    destMask = 0xFFFFFFFF;
                    nPix = this.dest.pixPerWord;
                }
            } while (--words);
            // end of inner loop ---
            this.p1x += deltaP12x;
            this.p1y += deltaP12y;
            this.p4x += deltaP43x;
            this.p4y += deltaP43y;
            destIndex += this.destDelta;
        }
	},
    warpDelta: function(a, b, n) {
        if (a == b) return 0;
        return b > a
            ?  ((b - a + 16384) / (n+1) + 1)
            : -((a - b + 16384) / (n+1) + 1);
	},
},
'mapping',
{
    setupColorMasks: function(srcBits, targetBits) {
	    // Setup color masks for converting an incoming RGB pixel value from srcBits to targetBits per pixel
        var deltaBits = targetBits - srcBits;
        if (deltaBits == 0) return;
        if (deltaBits < 0) { // e.g. from 8 to 5
            var mask = (1 << targetBits) - 1;
            this.cmMaskTable = [
                mask << (srcBits*2 - deltaBits), mask << (srcBits - deltaBits), mask << (0 - deltaBits), 0];
        } else { // e.g. from 5 to 8
            var mask = (1 << srcBits) - 1;
            this.cmMaskTable = [mask << (srcBits*2), mask << srcBits, mask, 0];
        }
        this.cmShiftTable = [deltaBits * 3, deltaBits * 2, deltaBits, 0];
    },
    mapPixel: function(val) {
        if (this.cmMaskTable) {
            var result = 0;
            for (var i = 0; i < 4; i ++)
                result |= this.cmShiftTable[i] < 0
                    ? (val & this.cmMaskTable[i]) >> -this.cmShiftTable[i]
                    : (val & this.cmMaskTable[i]) << this.cmShiftTable[i];
            val = result;
        }
        if (this.cmLookupTable)
            val = this.cmLookupTable[val & this.cmMask];
        return val;
    },
    rgbMap16To32: function(pix) {
        return ((pix & 0x1F) << 3) | ((pix & 0x3E0) << 6) | ((pix & 0x7C00) << 9);
    },
    pickSourcePixels: function(nPixels, srcMask, dstMask, srcShiftInc, dstShiftInc) {
        /*	Pick nPix pixels starting at srcBitIndex from the source, map by the
        color map, and justify them according to dstBitIndex in the resulting destWord. */
        var sourceWord = this.source.bits[this.sourceIndex];
        var destWord = 0;
        var srcShift = this.srcBitShift; // put into temp for speed
        var dstShift = this.dstBitShift;
        var nPix = nPixels;
        // always > 0 so we can use do { } while(--nPix);
        if (this.cmLookupTable) { // a little optimization for (pretty crucial) blits using indexed lookups only
            do {
                var sourcePix = (sourceWord >>> srcShift) & srcMask;
                var destPix = this.cmLookupTable[sourcePix & this.cmMask];
                // adjust dest pix index
                destWord = destWord | ((destPix & dstMask) << dstShift);
                // adjust source pix index
                dstShift += dstShiftInc;
                if ((srcShift += srcShiftInc) & 0xFFFFFFE0) {
                    if (this.source.msb) { srcShift += 32; }
                    else { srcShift -= 32; }
                    sourceWord = this.source.bits[++this.sourceIndex];
                }
            } while (--nPix);
		} else {
           do {
                var sourcePix = (sourceWord >>> srcShift) & srcMask;
                var destPix = this.mapPixel(sourcePix);
                // adjust dest pix index
                destWord = destWord | ((destPix & dstMask) << dstShift);
                // adjust source pix index
                dstShift += dstShiftInc;
                if ((srcShift += srcShiftInc) & 0xFFFFFFE0) {
                    if (this.source.msb) { srcShift += 32; }
                    else { srcShift -= 32; }
                    sourceWord = this.src.bits[++this.sourceIndex];
                }
            } while (--nPix);
        }
        this.srcBitShift = srcShift;  // Store back
        return destWord;
    },
    warpPickSetup: function() {
        // Setup values for faster pixel fetching
        var log2 = [0,0,1,1,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5],
            warpSrcShift = log2[this.source.depth];
        // Mask for extracting one pixel from source word
        this.warpSrcMask = this.maskTable[this.source.depth];
        // Shift for aligning x position to word boundary
        this.warpAlignShift = 5 - warpSrcShift;
        // Mask for extracting the pixel position from an x position
        this.warpAlignMask = (1 << this.warpAlignShift) - 1;
        // Shifts for each sub-word x value
        this.warpBitShiftTable = [];
        for (var i = 0; i <= this.warpAlignMask; i++)
            this.warpBitShiftTable[i] = this.source.msb
                ? 32 - ((i + 1) << warpSrcShift)
                : i << warpSrcShift;
    },
    warpPickPixel: function(xx, yy) {
        // Pick a single pixel from the source for WarpBlt
        if (xx < 0  || yy < 0) return 0;
        var x = xx >> 14,
            y = yy >> 14;
        if (x >= this.source.width || y >= this.source.height) return 0;
        var sourceWord = this.source.bits[this.source.pitch * y + (x >> this.warpAlignShift)],
            srcBitShift = this.warpBitShiftTable[x & this.warpAlignMask];
        return (sourceWord >> srcBitShift) & this.warpSrcMask;
	},
    warpPickSmoothPixels:  function(nPixels, xDeltaH, yDeltaH, xDeltaV, yDeltaV, dstShift, dstShiftInc) {
        // Pick n (sub-) pixels from the source form, mapped by sourceMap,
        // average the RGB values, map by colorMap and return the new word;
        // This version is only called from WarpBlt with smoothingCount > 1
        var dstMask = this.maskTable[this.dest.depth],
            painting = this.combinationRule == 25,
            n = this.warpSmoothing,
            threshold = painting ? n*n/2 : 0, // number of pixels to be non-transparent
            xdh = xDeltaH / n, ydh = yDeltaH / n, 
            xdv = xDeltaV / n, ydv = yDeltaV / n,
            destWord = 0;
        for (var i = 0; i < nPixels; i++) {
            var x = this.sx,
                y = this.sy,
                a = 0, r = 0, g = 0, b = 0;
            // Pick and average n*n subpixels
            var nPix = 0; // actual number of pixels (not clipped and not transparent)
            for (var j = 0; j < n; j++) {
                var xx = x, yy = y;
                for (var k = 0; k < n; k++) {
                    // get a single subpixel
                    var pix = this.warpPickPixel(xx, yy);
                    xx += xdh;
                    yy += ydh;
                    if (painting && pix == 0) continue;
                    // If not clipped and not transparent, then tally rgb values
                    nPix++;
                    var pix32 = this.source.depth < 16 ? this.warpSourceMap[pix] :
                        this.source.depth == 16 ? this.rgbMap16To32(pix) : 
                        pix;
                    r += (pix32 >> 16) & 255;
                    g += (pix32 >> 8) & 255;
                    b += pix32 & 255;
                    a += pix32 >> 24;
                }
                x += xdv;
                y += ydv;
            }
            var destPix = 0;
            if (nPix > threshold) { // if not transparent
                // normalize rgba sums
                r /= nPix; g /= nPix; b /= nPix; a /= nPix;
                var rgb = (a << 24) + (r << 16) + (g << 8) + b;
                // map the pixel
                if (rgb == 0 && r + g + b + a > 0) {
                    // only generate zero if pixel is really transparent
                    rgb = 1;
                }
                destPix = this.mapPixel(rgb);
            }
            // Mix it in
            destWord |= (destPix & dstMask) << dstShift;
            dstShift += dstShiftInc;
            this.sx += xDeltaH;
            this.sy += yDeltaH;
        }
        return destWord;
    },
    warpPickSourcePixels:  function(nPixels, xDeltaH, yDeltaH, dstShift, dstShiftInc) {
        // Pick n pixels from the source form,
        // map by colorMap and return aligned by dstShift
        // This version is only called from WarpBlt with smoothingCount == 1
        var dstMask = this.maskTable[this.dest.depth],
            destWord = 0;
        while (nPixels--) {
            var sourcePix = this.warpPickPixel(this.sx, this.sy),
                destPix = this.mapPixel(sourcePix);
			destWord |= (destPix & dstMask) << dstShift;
			dstShift += dstShiftInc;
			this.sx += xDeltaH;
			this.sy += yDeltaH;
        }
        return destWord;
    },
},
'rules', {
    makeMergeFn: function(rule) {
        var self = this;
        switch(rule) {
            case 0: return function() { return 0 };
            case 1: return function(src, dst) { return src & dst };
            case 2: return function(src, dst) { return src & (~dst) };
            case 3: return function(src, dst) { return src };
            case 4: return function(src, dst) { return (~src) & dst };
            case 5: return function(src, dst) { return dst };
            case 6: return function(src, dst) { return src ^ dst };
            case 7: return function(src, dst) { return src | dst };
            case 8: return function(src, dst) { return (~src) & (~dst) };
            case 9: return function(src, dst) { return (~src) ^ dst };
            case 10: return function(src, dst) { return ~dst };
            case 11: return function(src, dst) { return src | (~dst) };
            case 12: return function(src, dst) { return ~src };
            case 13: return function(src, dst) { return (~src) | dst };
            case 14: return function(src, dst) { return (~src) | (~dst) };
            case 15: return function(src, dst) { return dst };
            case 16: return function(src, dst) { return dst };
            case 17: return function(src, dst) { return dst };
            case 18: return function(src, dst) { return src + dst };
            case 19: return function(src, dst) { return src - dst };
            case 20: return function(src, dst) { return src };
            case 21: return function(src, dst) { return src };
            case 22: return function(src, dst) { return src };
            case 23: return function(src, dst) { return src };
            case 24: return function(src, dst) { return src };
            case 25: return function(src, dst) { return src === 0 ? dst
                : src | self.partitionedAND(~src, dst, self.dest.depth, self.dest.pixPerWord) };
            case 26: return function(src, dst) {
                return self.partitionedAND(~src, dst, self.dest.depth, self.dest.pixPerWord) };
            case 30: return function(src, dst, mask) { return self.alphaBlendConst(src, dst, mask, false) };
            case 31: return function(src, dst, mask) { return self.alphaBlendConst(src, dst, mask, true) };
            case 32: return function(src, dst, mask) { // accumulate differences, do not modify dst 
                self.rgbDiff(src, dst, mask, self.dest.depth, self.dest.pixPerWord);
                return dst; };
            case 34: return function(src, dst) { return self.alphaBlendScaled(src, dst) };
        }
        throw Error("bitblt rule " + rule + " not implemented yet");
    },
    rgbDiff: function(src, dst, mask, nBits, nParts) {
        var pixMask = this.maskTable[nBits],
            bitsPerColor = nBits == 16 ? 5 : 8,
            rgbMask = this.maskTable[bitsPerColor];
        var diff = 0;
        for (var i = 0; i < nParts; i++) {
            if (mask & pixMask) { // Only tally pixels within the destination rectangle
                var dstPix = dst & pixMask,
                    srcPix = src & pixMask;
                if (nBits < 16) { // count whether pixel differs
                    if (dstPix !== srcPix) this.bitCount++;
                } else { // count rgb difference
                    var diff = this.partitionedSub(srcPix, dstPix, bitsPerColor, 3);
                    this.bitCount += (diff & rgbMask)
                        + ((diff>>bitsPerColor) & rgbMask)
                        + ((diff>>(bitsPerColor*2)) & rgbMask);
                }
            }
            // shift next pixel into low bits 
            src = src >>> nBits;
            dst = dst >>> nBits;
            mask = mask >>> nBits;
        }
    },
    alphaBlendScaled: function(src, dst) {
        // 	Blend srcWord with dstWord using the alpha value from srcWord.
        // 	Alpha is encoded as 0 meaning 0.0, and 255 meaning 1.0.
        // 	In contrast to alphaBlend() the color produced is
        // 		srcColor + (1-srcAlpha) * dstColor
        // 	i.e., it is assumed that the source color is already scaled.
        var unAlpha = (255 - (src >>> 24)) / 255,
            b = Math.min(255, unAlpha * (dst & 255) + (src & 255)),
            g = Math.min(255, unAlpha * ((dst>>>8) & 255) + ((src>>>8) & 255)),
            r = Math.min(255, unAlpha * ((dst>>>16) & 255) + ((src>>>16) & 255)),
            a = Math.min(255, unAlpha * (dst>>>24) + (src>>>24));
        return ((((((a << 8) + r) << 8) + g) << 8) + b) | 0;
	},
    alphaBlendConst: function(sourceWord, destWord, destMask, paintMode) {
        // Blend sourceWord with destWord using a constant alpha.
        // Alpha is encoded as 0 meaning 0.0, and 255 meaning 1.0.
        // The blend produced is alpha*source + (1.0-alpha)*dest, with the
        // computation being performed independently on each color component.
        // This function could eventually blend into any depth destination,
        // using the same color averaging and mapping as warpBlt.
        // paintMode == true means do nothing if the source pixel value is zero.
        if (this.dest.depth < 16 || (paintMode && sourceWord == 0))
            return destWord; // no-op
        var alpha = this.sourceAlpha,
            unAlpha = 255 - alpha,
            pixMask = this.maskTable[this.dest.depth],
            bitsPerColor = this.dest.depth == 16 ? 5: 8,
            rgbMask = (1<<bitsPerColor) - 1,
            maskShifted = destMask,
            destShifted = destWord,
            sourceShifted = sourceWord,
            result = destWord;
        if (this.dest.depth == 32) { // 32bpp blends include alpha
            result = 0;
            for (var shift = 0; shift <= 24; shift += 8) {
                var blend = ((((sourceWord>>shift) & rgbMask) * alpha
                    + ((destWord>>shift) & rgbMask) * unAlpha
                    + 254) / 255) & rgbMask;
                result |= blend<<shift;
            };
        } else { // 16bpp
            for (var j = 0; j < 2; j++) {
                var sourcePixVal = sourceShifted & pixMask;
                // no effect if outside of dest rectangle or painting a transparent pixel
                if ((maskShifted & pixMask) && (!paintMode || sourcePixVal)) {
                    var destPixVal = destShifted & pixMask,
                        pixBlend = 0;
                    for (var shift = 0; shift <= 10; shift += 5) {
                        var blend = ((((sourcePixVal>>shift) & rgbMask) * alpha
                            + ((destPixVal>>shift) & rgbMask) * unAlpha
                            + 254) / 255) & rgbMask;
                        pixBlend |= blend<<shift;
                    }
                    result = result & ~(pixMask << (j*16)) | (pixBlend << (j*16));
                }
                maskShifted = maskShifted >> 16;
                sourceShifted = sourceShifted >> 16;
                destShifted = destShifted >> 16;
            }
        }
        return result;
	},
    partitionedSub: function(src, dst, nBits, nParts) {
        var mask = this.maskTable[nBits],
            result = 0;
        for (var i = 0; i < nParts; i++) {
            result |= (dst & mask) - (src & mask);
        	mask = mask << nBits;
    	}
        return result;
	},
    partitionedAdd: function(src, dst, nBits, nParts) {
        var mask = this.maskTable[nBits],
            result = 0;
        for (var i = 0; i < nParts; i++) {
            result |= (dst & mask) + (src & mask);
        	mask = mask << nBits;
    	}
        return result;
	},
    partitionedAND: function(word1, word2, nBits, nParts) {
        // AND word1 to word2 as nParts partitions of nBits each.
        // Any field of word1 not all-ones is treated as all-zeroes.
        // Used for erasing, eg, brush shapes prior to ORing in a color
        var mask = this.maskTable[nBits],
            result = 0;
        for (var i = 0; i < nParts; i++) {
        	if ((word1 & mask) === mask)
        		result = result | (word2 & mask);
        	mask = mask << nBits;
    	}
        return result;
	},
},
'accessing', {
    affectedRect: function() {
        if (this.bbW <= 0 || this.bbH <= 0) return null;
        var affectedL, affectedR, affectedT, affectedB;
        if (this.hDir > 0) {
            affectedL = this.dx;
            affectedR = this.dx + this.bbW;
        } else {
            affectedL = (this.dx - this.bbW) + 1;
            affectedR = this.dx + 1;
        }
        if (this.vDir > 0) {
            affectedT = this.dy;
            affectedB = this.dy + this.bbH;
        } else {
            affectedT = (this.dy - this.bbH) + 1;
            affectedB = this.dy + 1; }
        return {x: affectedL, y: affectedT, w: affectedR-affectedL, h: affectedB-affectedT};
    },
});

Object.extend(Squeak, {
    dbTransaction: function(mode, transactionFunc) {
        // File contents is stored in the IndexedDB named "squeak" in object store "files"
        // and directory entries in localStorage with prefix "squeak:"
        if (typeof indexedDB == "undefined")
            return transactionFunc(this.dbFake());

        var startTransaction = function() {
            var trans = SqueakDB.transaction("files", mode),
                fileStore = trans.objectStore("files");
            transactionFunc(fileStore);
        };

        // if database connection already opened, just do transaction
        if (window.SqueakDB) return startTransaction();
        
        // otherwise, open SqueakDB first
        var openReq = indexedDB.open("squeak");
        openReq.onsuccess = function(e) {
            window.SqueakDB = this.result;
            SqueakDB.onversionchange = function(e) {
                delete window.SqueakDB;
                this.close();
            };
            startTransaction();
        };
        openReq.onupgradeneeded = function (e) {
            // run only first time, or when version changed
            console.log("Creating database version " + e.newVersion);
            var db = e.target.result;
            db.createObjectStore("files");
        };
        openReq.onerror = function(e) {
            console.log("Error opening database: " + e.target.errorCode);
        };
        openReq.onblocked = function(e) {
            // If some other tab is loaded with the database, then it needs to be closed
            // before we can proceed upgrading the database.
            alert("Database upgrade needed. Please close all other tabs with this site open!");
        };
    },
    dbFake: function() {
        // indexedDB is not supported by this browser, fake it in memory
        if (typeof SqueakDBFake == "undefined") {
            console.warn("IndexedDB not supported by this browser, Squeak files will not be persisted");
            SqueakDBFake = {
                files: {},
                get: function(filename) {
                    var req = { result: SqueakDBFake.files[filename] };
                    window.setTimeout(function(){if (req.onsuccess) req.onsuccess()}, 0);
                    return req;
                },
                put: function(contents, filename) {
                    SqueakDBFake.files[filename] = contents;
                    var req = {};
                    window.setTimeout(function(){if (req.onsuccess) req.onsuccess()}, 0);
                    return req;
                },
                delete: function(filename) {
                    delete SqueakDBFake.files[filename];
                    var req = {};
                    window.setTimeout(function(){if (req.onsuccess) req.onsuccess()}, 0);
                    return req;
                },
            }
        }
        return SqueakDBFake;
    },
    fileGet: function(filepath, thenDo, errorDo) {
        if (!errorDo) errorDo = console.log;
        var path = this.splitFilePath(filepath);
        if (!path.basename) return errorDo("Invalid path: " + filepath);
        this.dbTransaction("readonly", function(fileStore) {
            var getReq = fileStore.get(path.fullname);
            getReq.onerror = function(e) { errorDo(e.target.errorCode) };
            getReq.onsuccess = function(e) {
                if (this.result == undefined) 
                    return errorDo("file not found: " + path.fullname);
                thenDo(this.result);
            };
        });
    },
    filePut: function(filepath, contents) {
        // store file, return dir entry if successful
        var path = this.splitFilePath(filepath); if (!path.basename) return null;
        var directory = this.dirList(path.dirname); if (!directory) return null;
        // get or create entry
        var entry = directory[path.basename],
            now = this.totalSeconds();
        if (!entry) { // new file
            entry = [/*name*/ path.basename, /*ctime*/ now, /*mtime*/ 0, /*dir*/ false, /*size*/ 0];
            directory[path.basename] = entry;
        } else if (entry[3]) // is a directory
            return null;
        // update directory entry
        entry[2] = now; // modification time
        entry[4] = contents.byteLength || contents.length || 0;
        localStorage["squeak:" + path.dirname] = JSON.stringify(directory);
        // put file contents (async)
        this.dbTransaction("readwrite", function(fileStore) {
            fileStore.put(contents, path.fullname);
        });
        return entry;
    },
    fileDelete: function(filepath) {
        var path = this.splitFilePath(filepath); if (!path.basename) return false;
        var directory = this.dirList(path.dirname); if (!directory) return false;
        var entry = directory[path.basename]; if (!entry || entry[3]) return false; // not found or is a directory
        // delete entry from directory
        delete directory[path.basename];
        localStorage["squeak:" + path.dirname] = JSON.stringify(directory);
        // delete file contents (async)
        this.dbTransaction("readwrite", function(fileStore) {
            fileStore['delete'](path.fullname);    // workaround for ometa parser
        });
        return true;
    },
    dirList: function(dirpath) {
        // return directory entries or null
        var path = this.splitFilePath(dirpath),
            entries = localStorage["squeak:" + path.fullname];
        if (entries) return JSON.parse(entries);
        if (path.fullname == "/") return {};
        return null;
    },
    splitFilePath: function(filepath) {
        if (filepath[0] !== '/') filepath = '/' + filepath;
        if (filepath[1] == '/') filepath = filepath.slice(1);      // make old images happy
        var matches = filepath.match(/(.*)\/(.*)/),
            dirname = matches[1] || '/',
            basename = matches[2];
        return {fullname: filepath, dirname: dirname, basename: basename};
    },
    flushFile: function(file) {
        if (file.modified) {
            var buffer = file.contents.buffer;
            if (buffer.byteLength !== file.size) {
                buffer = new ArrayBuffer(file.size);
                (new Uint8Array(buffer)).set(file.contents.subarray(0, file.size));
            }
            Squeak.filePut(file.name, buffer);
            file.modified = false;
        }
    },
    flushAllFiles: function() {
        if (typeof SqueakFiles == 'undefined') return;
        for (var name in SqueakFiles)
            this.flushFile(SqueakFiles[name]);
    },
    closeAllFiles: function() {
        // close the files held open in memory
        Squeak.flushAllFiles();
        delete SqueakFiles;
    },
    totalSeconds: function() {
        // seconds since 1901-01-01, local time
        return Math.floor(Date.now()/1000) - Squeak.Epoch;
    },
});

Object.subclass('users.bert.SqueakJS.vm.InstructionPrinter',
'initialization', {
    initialize: function(method, vm) {
        this.method = method;
        this.vm = vm;
    },
},
'printing', {
    printInstructions: function(indent, highlight, highlightPC) {
        // all args are optional
        this.indent = indent;           // prepend to every line except if highlighted
        this.highlight = highlight;     // prepend to highlighted line
        this.highlightPC = highlightPC; // PC of highlighted line
        this.result = '';
        this.scanner = new users.bert.SqueakJS.vm.InstructionStream(this.method, this.vm);
        this.oldPC = this.scanner.pc;
        var end = this.method.methodEndPC();
    	while (this.scanner.pc < end)
        	this.scanner.interpretNextInstructionFor(this);
        return this.result;
    },
    print: function(instruction) {
        if (this.oldPC === this.highlightPC) {
            if (this.highlight) this.result += this.highlight;
        } else {
            if (this.indent) this.result += this.indent;
        }
        this.result += this.oldPC + " <";
        for (var i = this.oldPC; i < this.scanner.pc; i++) {
            if (i > this.oldPC) this.result += " ";
            this.result += (this.method.bytes[i]+0x100).toString(16).substr(-2).toUpperCase(); // padded hex
        }
        this.result += "> " + instruction + "\n";
        this.oldPC = this.scanner.pc;
    }
},
'decoding', {
    blockReturnTop: function() {
    	this.print('blockReturn');
    },
    doDup: function() {
    	this.print('dup');
    },
    doPop: function() {
    	this.print('pop');
    },
	jump: function(offset) {
        this.print('jumpTo: ' + (this.scanner.pc + offset));
    },
    jumpIf: function(condition, offset) {
        this.print((condition ? 'jumpIfTrue: ' : 'jumpIfFalse: ') + (this.scanner.pc + offset));
    },
    methodReturnReceiver: function() {
	    this.print('return: receiver');
    },
    methodReturnTop: function() {
	    this.print('return: topOfStack');
    },
    methodReturnConstant: function(obj) {
    	this.print('returnConst: ' + obj.toString());
    },
    popIntoLiteralVariable: function(anAssociation) { 
    	this.print('popIntoBinding: ' + anAssociation.assnKeyAsString());
    },
    popIntoReceiverVariable: function(offset) { 
    	this.print('popIntoInstVar: ' + offset);
    },
    popIntoTemporaryVariable: function(offset) { 
    	this.print('popIntoTemp: ' + offset);
    },
	pushActiveContext: function() {
	    this.print('push: thisContext');
    },
    pushConstant: function(obj) {
        var value = obj.sqInstName ? obj.sqInstName() : obj.toString();
        this.print('pushConst: ' + value);
    },
    pushLiteralVariable: function(anAssociation) {
    	this.print('pushBinding: ' + anAssociation.assnKeyAsString());
    },
	pushReceiver: function() {
	    this.print('push: self');
    },
    pushReceiverVariable: function(offset) { 
    	this.print('pushInstVar: ' + offset);
    },
	pushTemporaryVariable: function(offset) {
	    this.print('pushTemp: ' + offset);
    },
    send: function(selector, numberArguments, supered) {
    	this.print( (supered ? 'superSend: #' : 'send: #') + (selector.bytesAsString ? selector.bytesAsString() : selector));
    },
    storeIntoLiteralVariable: function(anAssociation) {
    	this.print('storeIntoBinding: ' + anAssociation.assnKeyAsString());
    },
    storeIntoReceiverVariable: function(offset) { 
    	this.print('storeIntoInstVar: ' + offset);
    },
	storeIntoTemporaryVariable: function(offset) {
	    this.print('storeIntoTemp: ' + offset);
    },
});

Object.subclass('users.bert.SqueakJS.vm.InstructionStream',
'initialization', {
    initialize: function(method, vm) {
        this.vm = vm;
        this.method = method;
        this.pc = 0;
        this.specialConstants = ['true', 'false', 'nil', '-1', '0', '1', '2'];
        this.specialSelectors = ['+', '-', '<', '>', '<=', '>=', '=', '~=', '*', '/', '\\', '@',
            'bitShift:', '//', 'bitAnd:', 'bitOr:', 'at:', 'at:put:', 'size', 'next', 'nextPut:',
            'atEnd', '==', 'class', 'blockCopy:', 'value', 'value:', 'do:', 'new', 'new:', 'x', 'y'];
        this.specialSelectorsNArgs = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 1,
            0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0];
    },
},
'decoding',
{
    interpretNextInstructionFor: function(client) {
    	// Send to the argument, client, a message that specifies the type of the next instruction.
    	var method = this.method;
    	var byte = method.bytes[this.pc++];
    	var type = (byte / 16) | 0;  
    	var offset = byte % 16;
    	if (type === 0) return client.pushReceiverVariable(offset);
    	if (type === 1) return client.pushTemporaryVariable(offset);
    	if (type === 2) return client.pushConstant(method.methodGetLiteral(offset));
    	if (type === 3) return client.pushConstant(method.methodGetLiteral(offset + 16));
    	if (type === 4) return client.pushLiteralVariable(method.methodGetLiteral(offset));
    	if (type === 5) return client.pushLiteralVariable(method.methodGetLiteral(offset + 16));
    	if (type === 6)
    		if (offset<8) return client.popIntoReceiverVariable(offset)
    		else return client.popIntoTemporaryVariable(offset-8);
    	if (type === 7) {
            if (offset===0) return client.pushReceiver()
			if (offset < 8) return client.pushConstant(this.specialConstants[offset - 1])
			if (offset===8) return client.methodReturnReceiver();
			if (offset < 12) return client.methodReturnConstant(this.specialConstants[offset - 9]);
			if (offset===12) return client.methodReturnTop();
			if (offset===13) return client.blockReturnTop();
			if (offset > 13) throw Error("unusedBytecode");
    	}
    	if (type === 8) return this.interpretExtension(offset, method, client);
    	if (type === 9) // short jumps
    			if (offset<8) return client.jump(offset+1);
    			else return client.jumpIf(false, offset-8+1);
    	if (type === 10) {// long jumps
    		byte = this.method.bytes[this.pc++];
			if (offset<8) return client.jump((offset-4)*256 + byte);
			else return client.jumpIf(offset<12, (offset & 3)*256 + byte);
    	}
    	if (type === 11)
            return client.send(this.specialSelectors[offset], 
				this.specialSelectorsNArgs[offset],
				false);
    	if (type === 12)
            return client.send(this.specialSelectors[offset+16], 
				this.specialSelectorsNArgs[offset+16],
				false);
    	if (type > 12)
    		return client.send(method.methodGetLiteral(offset), type-13, false);
    },
    interpretExtension: function(offset, method, client) {
    	if (offset <= 6) { // Extended op codes 128-134
    		var byte2 = this.method.bytes[this.pc++];
    		if (offset <= 2) { // 128-130:  extended pushes and pops
    			var type = byte2 / 64 | 0;
    			var offset2 = byte2 % 64;
    			if (offset === 0) {
    			    if (type === 0) return client.pushReceiverVariable(offset2);
    				if (type === 1) return client.pushTemporaryVariable(offset2);
    				if (type === 2) return client.pushConstant(this.method.methodGetLiteral(offset2));
    				if (type === 3) return client.pushLiteralVariable(this.method.methodGetLiteral(offset2));
    			}
    			if (offset === 1) {
    			    if (type === 0) return client.storeIntoReceiverVariable(offset2);
    				if (type === 1) return client.storeIntoTemporaryVariable(offset2);
    				if (type === 2) throw Error("illegalStore");
    				if (type === 3) return client.storeIntoLiteralVariable(this.method.methodGetLiteral(offset2));
    			}
    			if (offset === 2) {
        			if (type === 0) return client.popIntoReceiverVariable(offset2);
    				if (type === 1) return client.popIntoTemporaryVariable(offset2);
    				if (type === 2) throw Error("illegalStore");
    				if (type === 3) return client.popIntoLiteralVariable(this.method.methodGetLiteral(offset2));
    			}
    		}
    		// 131-134 (extended sends)
    		if (offset === 3) // Single extended send
    			return client.send(this.method.methodGetLiteral(byte2 % 32), byte2 / 32 | 0, false);
    		if (offset === 4) { // Double extended do-anything
    			var byte3 = this.method.bytes[this.pc++];
    			var type = byte2 / 32 | 0;
    			if (type === 0) return client.send(this.method.methodGetLiteral(byte3), byte2 % 32, false);
    			if (type === 1) return client.send(this.method.methodGetLiteral(byte3), byte2 % 32, true);
    			if (type === 2) return client.pushReceiverVariable(byte3);
    			if (type === 3) return client.pushConstant(this.method.methodGetLiteral(byte3));
    			if (type === 4) return client.pushLiteralVariable(this.method.methodGetLiteral(byte3));
    			if (type === 5) return client.storeIntoReceiverVariable(byte3);
    			if (type === 6) return client.popIntoReceiverVariable(byte3);
    			if (type === 7) return client.storeIntoLiteralVariable(this.method.methodGetLiteral(byte3));
    		}
    		if (offset === 5) // Single extended send to super
    			return client.send(this.method.methodGetLiteral(byte2 % 32), byte2 % 32, true);
    		if (offset === 6) // Second extended super send
    			return client.send(this.method.methodGetLiteral(byte2 % 64), byte2 % 64, true);
    	}
    	if (offset === 7) return client.doPop();
    	if (offset === 8) return client.doDup();
    	if (offset === 9) return client.pushActiveContext();
    	throw Error("unusedBytecode");
    }
});

}) // end of module
