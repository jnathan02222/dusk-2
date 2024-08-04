"use strict";
var main;
(function() {
var $rt_seed = 2463534242;
function $rt_nextId() {
    var x = $rt_seed;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
}
function $rt_compare(a, b) {
    return a > b ? 1 : a < b ?  -1 : 0;
}
function $rt_isInstance(obj, cls) {
    return obj !== null && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls);
}
function $rt_isAssignable(from, to) {
    if (from === to) {
        return true;
    }
    var supertypes = from.$meta.supertypes;
    for (var i = 0;i < supertypes.length;i = i + 1 | 0) {
        if ($rt_isAssignable(supertypes[i], to)) {
            return true;
        }
    }
    return false;
}
function $rt_createArray(cls, sz) {
    var data = new Array(sz);
    var arr = new $rt_array(cls, data);
    if (sz > 0) {
        var i = 0;
        do  {
            data[i] = null;
            i = i + 1 | 0;
        }while (i < sz);
    }
    return arr;
}
function $rt_wrapArray(cls, data) {
    return new $rt_array(cls, data);
}
function $rt_createUnfilledArray(cls, sz) {
    return new $rt_array(cls, new Array(sz));
}
function $rt_createLongArray(sz) {
    var data = new Array(sz);
    var arr = new $rt_array($rt_longcls(), data);
    for (var i = 0;i < sz;i = i + 1 | 0) {
        data[i] = Long_ZERO;
    }
    return arr;
}
function $rt_createNumericArray(cls, nativeArray) {
    return new $rt_array(cls, nativeArray);
}
function $rt_createCharArray(sz) {
    return $rt_createNumericArray($rt_charcls(), new Uint16Array(sz));
}
function $rt_createByteArray(sz) {
    return $rt_createNumericArray($rt_bytecls(), new Int8Array(sz));
}
function $rt_createShortArray(sz) {
    return $rt_createNumericArray($rt_shortcls(), new Int16Array(sz));
}
function $rt_createIntArray(sz) {
    return $rt_createNumericArray($rt_intcls(), new Int32Array(sz));
}
function $rt_createBooleanArray(sz) {
    return $rt_createNumericArray($rt_booleancls(), new Int8Array(sz));
}
function $rt_createFloatArray(sz) {
    return $rt_createNumericArray($rt_floatcls(), new Float32Array(sz));
}
function $rt_createDoubleArray(sz) {
    return $rt_createNumericArray($rt_doublecls(), new Float64Array(sz));
}
function $rt_arraycls(cls) {
    var result = cls.$array;
    if (result === null) {
        var arraycls = {  };
        var name = "[" + cls.$meta.binaryName;
        arraycls.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false };
        arraycls.classObject = null;
        arraycls.$array = null;
        result = arraycls;
        cls.$array = arraycls;
    }
    return result;
}
function $rt_createcls() {
    return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
}
function $rt_createPrimitiveCls(name, binaryName) {
    var cls = $rt_createcls();
    cls.$meta.primitive = true;
    cls.$meta.name = name;
    cls.$meta.binaryName = binaryName;
    cls.$meta.enum = false;
    cls.$meta.item = null;
    return cls;
}
var $rt_booleanclsCache = null;
function $rt_booleancls() {
    if ($rt_booleanclsCache === null) {
        $rt_booleanclsCache = $rt_createPrimitiveCls("boolean", "Z");
    }
    return $rt_booleanclsCache;
}
var $rt_charclsCache = null;
function $rt_charcls() {
    if ($rt_charclsCache === null) {
        $rt_charclsCache = $rt_createPrimitiveCls("char", "C");
    }
    return $rt_charclsCache;
}
var $rt_byteclsCache = null;
function $rt_bytecls() {
    if ($rt_byteclsCache === null) {
        $rt_byteclsCache = $rt_createPrimitiveCls("byte", "B");
    }
    return $rt_byteclsCache;
}
var $rt_shortclsCache = null;
function $rt_shortcls() {
    if ($rt_shortclsCache === null) {
        $rt_shortclsCache = $rt_createPrimitiveCls("short", "S");
    }
    return $rt_shortclsCache;
}
var $rt_intclsCache = null;
function $rt_intcls() {
    if ($rt_intclsCache === null) {
        $rt_intclsCache = $rt_createPrimitiveCls("int", "I");
    }
    return $rt_intclsCache;
}
var $rt_longclsCache = null;
function $rt_longcls() {
    if ($rt_longclsCache === null) {
        $rt_longclsCache = $rt_createPrimitiveCls("long", "J");
    }
    return $rt_longclsCache;
}
var $rt_floatclsCache = null;
function $rt_floatcls() {
    if ($rt_floatclsCache === null) {
        $rt_floatclsCache = $rt_createPrimitiveCls("float", "F");
    }
    return $rt_floatclsCache;
}
var $rt_doubleclsCache = null;
function $rt_doublecls() {
    if ($rt_doubleclsCache === null) {
        $rt_doubleclsCache = $rt_createPrimitiveCls("double", "D");
    }
    return $rt_doubleclsCache;
}
var $rt_voidclsCache = null;
function $rt_voidcls() {
    if ($rt_voidclsCache === null) {
        $rt_voidclsCache = $rt_createPrimitiveCls("void", "V");
    }
    return $rt_voidclsCache;
}
function $rt_throw(ex) {
    throw $rt_exception(ex);
}
function $rt_exception(ex) {
    var err = ex.$jsException;
    if (!err) {
        err = new Error("Java exception thrown");
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(err);
        }
        err.$javaException = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return err;
}
function $rt_fillStack(err, ex) {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        var stack = $rt_decodeStack(err.stack);
        var javaStack = $rt_createArray($rt_objcls(), stack.length);
        var elem;
        var noStack = false;
        for (var i = 0;i < stack.length;++i) {
            var element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
}
function $rt_createMultiArray(cls, dimensions) {
    var first = 0;
    for (var i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
        if (dimensions[i] === 0) {
            first = i;
            break;
        }
    }
    if (first > 0) {
        for (i = 0;i < first;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
        }
        if (first === dimensions.length - 1) {
            return $rt_createArray(cls, dimensions[first]);
        }
    }
    var arrays = new Array($rt_primitiveArrayCount(dimensions, first));
    var firstDim = dimensions[first] | 0;
    for (i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createArray(cls, firstDim);
    }
    return $rt_createMultiArrayImpl(cls, arrays, dimensions, first);
}
function $rt_createByteMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_bytecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createByteArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_bytecls(), arrays, dimensions);
}
function $rt_createCharMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_charcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createCharArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_charcls(), arrays, dimensions, 0);
}
function $rt_createBooleanMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_booleancls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createBooleanArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_booleancls(), arrays, dimensions, 0);
}
function $rt_createShortMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_shortcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createShortArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_shortcls(), arrays, dimensions, 0);
}
function $rt_createIntMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_intcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createIntArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_intcls(), arrays, dimensions, 0);
}
function $rt_createLongMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_longcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createLongArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_longcls(), arrays, dimensions, 0);
}
function $rt_createFloatMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_floatcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createFloatArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_floatcls(), arrays, dimensions, 0);
}
function $rt_createDoubleMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_doublecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createDoubleArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_doublecls(), arrays, dimensions, 0);
}
function $rt_primitiveArrayCount(dimensions, start) {
    var val = dimensions[start + 1] | 0;
    for (var i = start + 2;i < dimensions.length;i = i + 1 | 0) {
        val = val * (dimensions[i] | 0) | 0;
        if (val === 0) {
            break;
        }
    }
    return val;
}
function $rt_createMultiArrayImpl(cls, arrays, dimensions, start) {
    var limit = arrays.length;
    for (var i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
        cls = $rt_arraycls(cls);
        var dim = dimensions[i];
        var index = 0;
        var packedIndex = 0;
        while (index < limit) {
            var arr = $rt_createUnfilledArray(cls, dim);
            for (var j = 0;j < dim;j = j + 1 | 0) {
                arr.data[j] = arrays[index];
                index = index + 1 | 0;
            }
            arrays[packedIndex] = arr;
            packedIndex = packedIndex + 1 | 0;
        }
        limit = packedIndex;
    }
    return arrays[0];
}
function $rt_assertNotNaN(value) {
    if (typeof value === 'number' && isNaN(value)) {
        throw "NaN";
    }
    return value;
}
var $rt_stdoutBuffer = "";
var $rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : function(ch) {
    if (ch === 0xA) {
        if (console) {
            console.info($rt_stdoutBuffer);
        }
        $rt_stdoutBuffer = "";
    } else {
        $rt_stdoutBuffer += String.fromCharCode(ch);
    }
};
var $rt_stderrBuffer = "";
var $rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : function(ch) {
    if (ch === 0xA) {
        if (console) {
            console.error($rt_stderrBuffer);
        }
        $rt_stderrBuffer = "";
    } else {
        $rt_stderrBuffer += String.fromCharCode(ch);
    }
};
var $rt_packageData = null;
function $rt_packages(data) {
    var i = 0;
    var packages = new Array(data.length);
    for (var j = 0;j < data.length;++j) {
        var prefixIndex = data[i++];
        var prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
}
function $rt_metadata(data) {
    var packages = $rt_packageData;
    var i = 0;
    while (i < data.length) {
        var cls = data[i++];
        cls.$meta = {  };
        var m = cls.$meta;
        var className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            var packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        var superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
            m.supertypes.push(m.superclass);
            cls.prototype = Object.create(m.superclass.prototype);
        } else {
            cls.prototype = {  };
        }
        var flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        var clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function() {
        };
        var virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (var j = 0;j < virtualMethods.length;j += 2) {
                var name = virtualMethods[j];
                var func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (var k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
        cls.$array = null;
    }
}
function $rt_threadStarter(f) {
    return function() {
        var args = Array.prototype.slice.apply(arguments);
        $rt_startThread(function() {
            f.apply(this, args);
        });
    };
}
function $rt_mainStarter(f) {
    return function(args, callback) {
        if (!args) {
            args = [];
        }
        var javaArgs = $rt_createArray($rt_objcls(), args.length);
        for (var i = 0;i < args.length;++i) {
            javaArgs.data[i] = $rt_str(args[i]);
        }
        $rt_startThread(function() {
            f.call(null, javaArgs);
        }, callback);
    };
}
var $rt_stringPool_instance;
function $rt_stringPool(strings) {
    $rt_stringPool_instance = new Array(strings.length);
    for (var i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
}
function $rt_s(index) {
    return $rt_stringPool_instance[index];
}
function $rt_eraseClinit(target) {
    return target.$clinit = function() {
    };
}
var $rt_numberConversionView = new DataView(new ArrayBuffer(8));
function $rt_doubleToLongBits(n) {
    $rt_numberConversionView.setFloat64(0, n, true);
    return new Long($rt_numberConversionView.getInt32(0, true), $rt_numberConversionView.getInt32(4, true));
}
function $rt_longBitsToDouble(n) {
    $rt_numberConversionView.setInt32(0, n.lo, true);
    $rt_numberConversionView.setInt32(4, n.hi, true);
    return $rt_numberConversionView.getFloat64(0, true);
}
function $rt_floatToIntBits(n) {
    $rt_numberConversionView.setFloat32(0, n);
    return $rt_numberConversionView.getInt32(0);
}
function $rt_intBitsToFloat(n) {
    $rt_numberConversionView.setInt32(0, n);
    return $rt_numberConversionView.getFloat32(0);
}
function $rt_javaException(e) {
    return e instanceof Error && typeof e.$javaException === 'object' ? e.$javaException : null;
}
function $rt_jsException(e) {
    return typeof e.$jsException === 'object' ? e.$jsException : null;
}
function $rt_wrapException(err) {
    var ex = err.$javaException;
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err.$javaException = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
}
function $dbg_class(obj) {
    var cls = obj.constructor;
    var arrayDegree = 0;
    while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
    }
    var clsName = "";
    if (cls === $rt_booleancls()) {
        clsName = "boolean";
    } else if (cls === $rt_bytecls()) {
        clsName = "byte";
    } else if (cls === $rt_shortcls()) {
        clsName = "short";
    } else if (cls === $rt_charcls()) {
        clsName = "char";
    } else if (cls === $rt_intcls()) {
        clsName = "int";
    } else if (cls === $rt_longcls()) {
        clsName = "long";
    } else if (cls === $rt_floatcls()) {
        clsName = "float";
    } else if (cls === $rt_doublecls()) {
        clsName = "double";
    } else {
        clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
}
function Long(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
}
Long.prototype.__teavm_class__ = function() {
    return "long";
};
Long.prototype.toString = function() {
    var result = [];
    var n = this;
    var positive = Long_isPositive(n);
    if (!positive) {
        n = Long_neg(n);
    }
    var radix = new Long(10, 0);
    do  {
        var divRem = Long_divRem(n, radix);
        result.push(String.fromCharCode(48 + divRem[1].lo));
        n = divRem[0];
    }while (n.lo !== 0 || n.hi !== 0);
    result = (result.reverse()).join('');
    return positive ? result : "-" + result;
};
Long.prototype.valueOf = function() {
    return Long_toNumber(this);
};
var Long_ZERO = new Long(0, 0);
var Long_MAX_NORMAL = 1 << 18;
function Long_fromInt(val) {
    return val >= 0 ? new Long(val, 0) : new Long(val,  -1);
}
function Long_fromNumber(val) {
    if (val >= 0) {
        return new Long(val | 0, val / 0x100000000 | 0);
    } else {
        return Long_neg(new Long( -val | 0,  -val / 0x100000000 | 0));
    }
}
function Long_toNumber(val) {
    var lo = val.lo;
    var hi = val.hi;
    if (lo < 0) {
        lo += 0x100000000;
    }
    return 0x100000000 * hi + lo;
}
var $rt_imul = Math.imul || function(a, b) {
    var ah = a >>> 16 & 0xFFFF;
    var al = a & 0xFFFF;
    var bh = b >>> 16 & 0xFFFF;
    var bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
};
var $rt_udiv = function(a, b) {
    if (a < 0) {
        a += 0x100000000;
    }
    if (b < 0) {
        b += 0x100000000;
    }
    return a / b | 0;
};
var $rt_umod = function(a, b) {
    if (a < 0) {
        a += 0x100000000;
    }
    if (b < 0) {
        b += 0x100000000;
    }
    return a % b | 0;
};
function $rt_setCloneMethod(target, f) {
    target.$clone = f;
}
function $rt_cls(cls) {
    return jl_Class_getClass(cls);
}
function $rt_str(str) {
    if (str === null) {
        return null;
    }
    var characters = $rt_createCharArray(str.length);
    var charsBuffer = characters.data;
    for (var i = 0; i < str.length; i = (i + 1) | 0) {
        charsBuffer[i] = str.charCodeAt(i) & 0xFFFF;
    }
    return jl_String__init_(characters);
}
function $rt_ustr(str) {
    if (str === null) {
        return null;
    }
    var data = str.$characters.data;
    var result = "";
    for (var i = 0; i < data.length; i = (i + 1) | 0) {
        result += String.fromCharCode(data[i]);
    }
    return result;
}
function $rt_objcls() { return jl_Object; }
function $rt_nullCheck(val) {
    if (val === null) {
        $rt_throw(jl_NullPointerException__init_());
    }
    return val;
}
function $rt_intern(str) {
    return str;
}
function $rt_getThread() {
    return jl_Thread_currentThread();
}
function $rt_setThread(t) {
    return jl_Thread_setCurrentThread(t);
}
function $rt_createException(message) {
    return jl_RuntimeException__init_(message);
}
function $rt_createStackElement(className, methodName, fileName, lineNumber) {
    return null;
}
function $rt_setStack(e, stack) {
}
var $java = Object.create(null);
function jl_Object() {
    this.$monitor = null;
    this.$id$ = 0;
}
function jl_Object__init_() {
    var var_0 = new jl_Object();
    jl_Object__init_0(var_0);
    return var_0;
}
function jl_Object_monitorEnterSync($o) {
    var var$2;
    if ($o.$monitor === null)
        jl_Object_createMonitor($o);
    if ($o.$monitor.$owner === null)
        $o.$monitor.$owner = jl_Thread_currentThread();
    else if ($o.$monitor.$owner !== jl_Thread_currentThread())
        $rt_throw(jl_IllegalStateException__init_($rt_s(0)));
    var$2 = $o.$monitor;
    var$2.$count = var$2.$count + 1 | 0;
}
function jl_Object_monitorExitSync($o) {
    var var$2, var$3;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === jl_Thread_currentThread()) {
        var$2 = $o.$monitor;
        var$3 = var$2.$count - 1 | 0;
        var$2.$count = var$3;
        if (!var$3)
            $o.$monitor.$owner = null;
        jl_Object_isEmptyMonitor($o);
        return;
    }
    $rt_throw(jl_IllegalMonitorStateException__init_());
}
function jl_Object_monitorEnter($o) {
    jl_Object_monitorEnter0($o, 1);
}
function jl_Object_monitorEnter0($o, $count) {
    var var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();$count = $thread.pop();$o = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($o.$monitor === null)
            jl_Object_createMonitor($o);
        if ($o.$monitor.$owner === null)
            $o.$monitor.$owner = jl_Thread_currentThread();
        if ($o.$monitor.$owner === jl_Thread_currentThread()) {
            var$3 = $o.$monitor;
            var$3.$count = var$3.$count + $count | 0;
            return;
        }
        $ptr = 1;
    case 1:
        jl_Object_monitorEnterWait($o, $count);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($o, $count, var$3, $ptr);
}
function jl_Object_createMonitor($o) {
    $o.$monitor = jl_Object$Monitor__init_();
}
function jl_Object_monitorEnterWait(var$1, var$2) {
    var thread = $rt_nativeThread();
    var javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        var result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    var callback = function() {};
    callback.$complete = function(val) {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = function(e) {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    return thread.suspend(function() {
        try {
            jl_Object_monitorEnterWait0(var$1, var$2, callback);
        } catch($e) {
            callback.$error($rt_exception($e));
        }
    });
}
function jl_Object_monitorEnterWait0($o, $count, $callback) {
    var $thread, var$5, $monitor;
    $thread = jl_Thread_currentThread();
    if ($o.$monitor === null) {
        jl_Object_createMonitor($o);
        jl_Thread_setCurrentThread($thread);
        var$5 = $o.$monitor;
        var$5.$count = var$5.$count + $count | 0;
        $callback.$complete(null);
        return;
    }
    if ($o.$monitor.$owner === null) {
        $o.$monitor.$owner = $thread;
        jl_Thread_setCurrentThread($thread);
        var$5 = $o.$monitor;
        var$5.$count = var$5.$count + $count | 0;
        $callback.$complete(null);
        return;
    }
    $monitor = $o.$monitor;
    if ($monitor.$enteringThreads === null)
        $monitor.$enteringThreads = otp_Platform_createQueue();
    otp_PlatformQueue_add$static($monitor.$enteringThreads, jl_Object$monitorEnterWait$lambda$_6_0__init_($thread, $o, $count, $callback));
}
function jl_Object_monitorExit($o) {
    jl_Object_monitorExit0($o, 1);
}
function jl_Object_monitorExit0($o, $count) {
    var $monitor;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === jl_Thread_currentThread()) {
        $monitor = $o.$monitor;
        $monitor.$count = $monitor.$count - $count | 0;
        if ($monitor.$count > 0)
            return;
        $monitor.$owner = null;
        if ($monitor.$enteringThreads !== null && !otp_PlatformQueue_isEmpty$static($monitor.$enteringThreads))
            otp_Platform_postpone(jl_Object$monitorExit$lambda$_8_0__init_($o));
        else
            jl_Object_isEmptyMonitor($o);
        return;
    }
    $rt_throw(jl_IllegalMonitorStateException__init_());
}
function jl_Object_waitForOtherThreads($o) {
    var $monitor, $enteringThreads, $r;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === null) {
        $monitor = $o.$monitor;
        if ($monitor.$enteringThreads !== null && !otp_PlatformQueue_isEmpty$static($monitor.$enteringThreads)) {
            $enteringThreads = $monitor.$enteringThreads;
            $r = otp_PlatformQueue_remove$static($enteringThreads);
            if ($enteringThreads === null)
                $monitor.$enteringThreads = null;
            $r.$run();
        }
        return;
    }
}
function jl_Object_isEmptyMonitor($this) {
    var $monitor, var$2;
    $monitor = $this.$monitor;
    if ($monitor === null)
        return 1;
    a: {
        b: {
            if ($monitor.$owner === null) {
                if ($monitor.$enteringThreads !== null) {
                    var$2 = $monitor.$enteringThreads;
                    if (!otp_PlatformQueue_isEmpty$static(var$2))
                        break b;
                }
                if ($monitor.$notifyListeners === null)
                    break a;
                var$2 = $monitor.$notifyListeners;
                if (otp_PlatformQueue_isEmpty$static(var$2))
                    break a;
            }
        }
        return 0;
    }
    jl_Object_deleteMonitor($this);
    return 1;
}
function jl_Object_deleteMonitor($this) {
    $this.$monitor = null;
}
function jl_Object_holdsLock($o) {
    return $o.$monitor !== null && $o.$monitor.$owner === jl_Thread_currentThread() ? 1 : 0;
}
function jl_Object__init_0($this) {
    return;
}
function jl_Object_getClass($this) {
    return jl_Class_getClass($this.constructor);
}
function jl_Object_hashCode($this) {
    return jl_Object_identity($this);
}
function jl_Object_equals($this, $other) {
    return $this !== $other ? 0 : 1;
}
function jl_Object_toString($this) {
    return jl_StringBuilder__init_().$append(jl_Object_getClass($this).$getName()).$append($rt_s(1)).$append(jl_Integer_toHexString(jl_Object_identity($this))).$toString();
}
function jl_Object_identity($this) {
    var $platformThis, var$2;
    $platformThis = $this;
    if (!$platformThis.$id$) {
        var$2 = $rt_nextId();
        $platformThis.$id$ = var$2;
    }
    return $this.$id$;
}
function jl_Object_clone($this) {
    var var$1, $result, var$3;
    if (!$rt_isInstance($this, jl_Cloneable)) {
        var$1 = $this;
        if (var$1.constructor.$meta.item === null)
            $rt_throw(jl_CloneNotSupportedException__init_());
    }
    $result = otp_Platform_clone($this);
    var$1 = $result;
    var$3 = $rt_nextId();
    var$1.$id$ = var$3;
    return $result;
}
function jl_Object_notify($this) {
    var $listeners, $listener;
    if (!jl_Object_holdsLock($this))
        $rt_throw(jl_IllegalMonitorStateException__init_());
    $listeners = $this.$monitor.$notifyListeners;
    if ($listeners === null)
        return;
    a: {
        while (true) {
            if (otp_PlatformQueue_isEmpty$static($listeners))
                break a;
            $listener = otp_PlatformQueue_remove$static($listeners);
            if (!$listener.$expired())
                break;
        }
        otp_Platform_postpone($listener);
    }
    if (otp_PlatformQueue_isEmpty$static($listeners))
        $this.$monitor.$notifyListeners = null;
}
function jl_Object_notifyAll($this) {
    var $listeners, $listener;
    if (!jl_Object_holdsLock($this))
        $rt_throw(jl_IllegalMonitorStateException__init_());
    $listeners = $this.$monitor.$notifyListeners;
    if ($listeners === null)
        return;
    while (!otp_PlatformQueue_isEmpty$static($listeners)) {
        $listener = otp_PlatformQueue_remove$static($listeners);
        if (!$listener.$expired())
            otp_Platform_postpone($listener);
    }
    $this.$monitor.$notifyListeners = null;
}
function jl_Object_wait($this, $timeout) {
    var var$2, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$timeout = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        try {
            var$2 = 0;
            $ptr = 1;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_InterruptedException) {
                $rt_throw(jl_InterruptedException__init_());
            } else {
                throw $$e;
            }
        }
    case 1:
        a: {
            try {
                jl_Object_wait0($this, $timeout, var$2);
                if ($rt_suspending()) {
                    break main;
                }
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
            return;
        }
        $rt_throw(jl_InterruptedException__init_());
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $timeout, var$2, $ptr);
}
function jl_Object_wait0($this, $timeout, $nanos) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$nanos = $thread.pop();$timeout = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (!jl_Object_holdsLock($this))
            $rt_throw(jl_IllegalMonitorStateException__init_());
        $ptr = 1;
    case 1:
        jl_Object_waitImpl($this, $timeout, $nanos);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $timeout, $nanos, $ptr);
}
function jl_Object_waitImpl(var$0, var$1, var$2) {
    var thread = $rt_nativeThread();
    var javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        var result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    var callback = function() {};
    callback.$complete = function(val) {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = function(e) {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    return thread.suspend(function() {
        try {
            jl_Object_waitImpl0(var$0, var$1, var$2, callback);
        } catch($e) {
            callback.$error($rt_exception($e));
        }
    });
}
function jl_Object_waitImpl0($this, $timeout, $nanos, $callback) {
    var $monitor, $listener, $timeoutToSchedule;
    $monitor = $this.$monitor;
    $listener = jl_Object$NotifyListenerImpl__init_($this, $callback, $monitor.$count);
    if ($monitor.$notifyListeners === null)
        $monitor.$notifyListeners = otp_Platform_createQueue();
    otp_PlatformQueue_add$static($monitor.$notifyListeners, $listener);
    jl_Thread_currentThread().$interruptHandler = $listener;
    if (!(Long_le($timeout, Long_ZERO) && $nanos <= 0)) {
        $timeoutToSchedule = Long_lt($timeout, Long_fromInt(2147483647)) ? $timeout.lo : 2147483647;
        $listener.$timerId = otp_Platform_schedule($listener, $timeoutToSchedule);
    }
    jl_Object_monitorExit0($this, $monitor.$count);
}
function jl_Object_wait1($this) {
    var var$1, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        try {
            var$1 = Long_ZERO;
            $ptr = 1;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_InterruptedException) {
                $rt_throw(jl_InterruptedException__init_());
            } else {
                throw $$e;
            }
        }
    case 1:
        a: {
            try {
                jl_Object_wait($this, var$1);
                if ($rt_suspending()) {
                    break main;
                }
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
            return;
        }
        $rt_throw(jl_InterruptedException__init_());
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function jl_Object_lambda$monitorExit$2($o) {
    jl_Object_waitForOtherThreads($o);
}
function jl_Object_lambda$monitorEnterWait$0($thread, $o, $count, $callback) {
    var var$5;
    jl_Thread_setCurrentThread($thread);
    $o.$monitor.$owner = $thread;
    var$5 = $o.$monitor;
    var$5.$count = var$5.$count + $count | 0;
    $callback.$complete(null);
}
function jl_Throwable() {
    var a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
    a.$stackTrace = null;
}
function jl_Throwable__init_() {
    var var_0 = new jl_Throwable();
    jl_Throwable__init_0(var_0);
    return var_0;
}
function jl_Throwable__init_1(var_0) {
    var var_1 = new jl_Throwable();
    jl_Throwable__init_2(var_1, var_0);
    return var_1;
}
function jl_Throwable__init_3(var_0) {
    var var_1 = new jl_Throwable();
    jl_Throwable__init_4(var_1, var_0);
    return var_1;
}
function jl_Throwable__init_0($this) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
}
function jl_Throwable__init_2($this, $message) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$message = $message;
}
function jl_Throwable__init_4($this, $cause) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$cause = $cause;
}
function jl_Throwable_fillInStackTrace($this) {
    return $this;
}
function jl_Throwable_getMessage($this) {
    return $this.$message;
}
function jl_Throwable_getLocalizedMessage($this) {
    return $this.$getMessage();
}
function jl_Throwable_printStackTrace($this) {
    $this.$printStackTrace(jl_System_err());
}
function jl_Throwable_printStackTrace0($this, $stream) {
    var $message, var$3, var$4, var$5, $element;
    $stream.$print(jl_Object_getClass($this).$getName());
    $message = $this.$getLocalizedMessage();
    if ($message !== null)
        $stream.$print(jl_StringBuilder__init_().$append($rt_s(2)).$append($message).$toString());
    $stream.$println();
    if ($this.$stackTrace !== null) {
        var$3 = $this.$stackTrace.data;
        var$4 = var$3.length;
        var$5 = 0;
        while (var$5 < var$4) {
            $element = var$3[var$5];
            $stream.$print($rt_s(3));
            $stream.$println0($element);
            var$5 = var$5 + 1 | 0;
        }
    }
    if ($this.$cause !== null && $this.$cause !== $this) {
        $stream.$print($rt_s(4));
        $this.$cause.$printStackTrace($stream);
    }
}
function jl_Exception() {
    jl_Throwable.call(this);
}
function jl_Exception__init_() {
    var var_0 = new jl_Exception();
    jl_Exception__init_0(var_0);
    return var_0;
}
function jl_Exception__init_1(var_0) {
    var var_1 = new jl_Exception();
    jl_Exception__init_2(var_1, var_0);
    return var_1;
}
function jl_Exception__init_0($this) {
    jl_Throwable__init_0($this);
}
function jl_Exception__init_2($this, $message) {
    jl_Throwable__init_2($this, $message);
}
function jl_RuntimeException() {
    jl_Exception.call(this);
}
function jl_RuntimeException__init_0() {
    var var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_1(var_0);
    return var_0;
}
function jl_RuntimeException__init_(var_0) {
    var var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_2(var_1, var_0);
    return var_1;
}
function jl_RuntimeException__init_1($this) {
    jl_Exception__init_0($this);
}
function jl_RuntimeException__init_2($this, $message) {
    jl_Exception__init_2($this, $message);
}
function jl_IndexOutOfBoundsException() {
    jl_RuntimeException.call(this);
}
function jl_IndexOutOfBoundsException__init_() {
    var var_0 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_0(var_0);
    return var_0;
}
function jl_IndexOutOfBoundsException__init_1(var_0) {
    var var_1 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_2(var_1, var_0);
    return var_1;
}
function jl_IndexOutOfBoundsException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function jl_IndexOutOfBoundsException__init_2($this, $message) {
    jl_RuntimeException__init_2($this, $message);
}
function g_Actor() {
    var a = this; jl_Object.call(a);
    a.$x = 0;
    a.$y = 0;
    a.$mySequenceNumber = 0;
    a.$lastPaintSequenceNumber = 0;
    a.$rotation = 0;
    a.$world = null;
    a.$image = null;
    a.$data = null;
    a.$boundingRect = null;
    a.$boundingXs = null;
    a.$boundingYs = null;
    a.$imageWidth = 0;
    a.$imageHeight = 0;
}
var g_Actor_sequenceNumber = 0;
var g_Actor_greenfootImage = null;
var g_Actor_delegate = null;
function g_Actor_$callClinit() {
    g_Actor_$callClinit = $rt_eraseClinit(g_Actor);
    g_Actor__clinit_();
}
function g_Actor__init_() {
    var var_0 = new g_Actor();
    g_Actor__init_0(var_0);
    return var_0;
}
function g_Actor_initialise() {
    var var$1, var$2, $e, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$e = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        try {
            g_Actor_$callClinit();
            var$1 = new g_GreenfootImage;
            var$2 = gu_GreenfootUtil_getGreenfootLogoPath();
            $ptr = 1;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Exception) {
                $e = $$je;
                $e.$printStackTrace0();
                jl_System_err().$println1($rt_s(5));
                return;
            } else {
                throw $$e;
            }
        }
    case 1:
        a: {
            try {
                g_GreenfootImage__init_(var$1, var$2);
                if ($rt_suspending()) {
                    break main;
                }
                g_Actor_greenfootImage = var$1;
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    $e = $$je;
                    $e.$printStackTrace0();
                    jl_System_err().$println1($rt_s(5));
                    break a;
                } else {
                    throw $$e;
                }
            }
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push(var$1, var$2, $e, $ptr);
}
function g_Actor__init_0($this) {
    var var$1, $image, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();$image = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        g_Actor_$callClinit();
        jl_Object__init_0($this);
        $this.$rotation = 0;
        $this.$boundingXs = $rt_createIntArray(4);
        $this.$boundingYs = $rt_createIntArray(4);
        var$1 = g_Actor_sequenceNumber;
        g_Actor_sequenceNumber = var$1 + 1 | 0;
        $this.$mySequenceNumber = var$1;
        $ptr = 1;
    case 1:
        $tmp = g_Actor_getClassImage($this);
        if ($rt_suspending()) {
            break main;
        }
        $image = $tmp;
        if ($image === null)
            $image = g_Actor_greenfootImage;
        var$3 = $image.$getCopyOnWriteClone();
        $this.$setImage(var$3);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $image, var$3, $ptr);
}
function g_Actor_act($this) {
    return;
}
function g_Actor_getX($this) {
    g_Actor_failIfNotInWorld($this);
    return $this.$x;
}
function g_Actor_getY($this) {
    g_Actor_failIfNotInWorld($this);
    return $this.$y;
}
function g_Actor_getRotation($this) {
    return $this.$rotation;
}
function g_Actor_setRotation($this, $rotation) {
    if ($rotation >= 360)
        $rotation = $rotation >= 720 ? $rotation % 360 | 0 : $rotation + (-360) | 0;
    else if ($rotation < 0)
        $rotation = $rotation >= (-360) ? $rotation + 360 | 0 : 360 + ($rotation % 360 | 0) | 0;
    if ($this.$rotation != $rotation) {
        $this.$rotation = $rotation;
        $this.$boundingRect = null;
        g_Actor_sizeChanged($this);
    }
}
function g_Actor_setLocation($this, $x, $y) {
    g_Actor_setLocationDrag($this, $x, $y);
}
function g_Actor_setLocationDrag($this, $x, $y) {
    var $oldX, $oldY, $dx, $dy, $i, var$8;
    if ($this.$world !== null) {
        $oldX = $this.$x;
        $oldY = $this.$y;
        if (!$this.$world.$isBounded()) {
            $this.$x = $x;
            $this.$y = $y;
        } else {
            $this.$x = g_Actor_limitValue($this, $x, $this.$world.$width);
            $this.$y = g_Actor_limitValue($this, $y, $this.$world.$height);
        }
        if (!($this.$x == $oldX && $this.$y == $oldY)) {
            if ($this.$boundingRect !== null) {
                $dx = $rt_imul($this.$x - $oldX | 0, $this.$world.$cellSize);
                $dy = $rt_imul($this.$y - $oldY | 0, $this.$world.$cellSize);
                gci_Rect_setX($this.$boundingRect, gci_Rect_getX($this.$boundingRect) + $dx | 0);
                gci_Rect_setY($this.$boundingRect, gci_Rect_getY($this.$boundingRect) + $dy | 0);
                $i = 0;
                while ($i < 4) {
                    var$8 = $this.$boundingXs.data;
                    var$8[$i] = var$8[$i] + $dx | 0;
                    var$8 = $this.$boundingYs.data;
                    var$8[$i] = var$8[$i] + $dy | 0;
                    $i = $i + 1 | 0;
                }
            }
            g_Actor_locationChanged($this, $oldX, $oldY);
        }
    }
}
function g_Actor_limitValue($this, $v, $limit) {
    if ($v < 0)
        $v = 0;
    if ($limit <= $v)
        $v = $limit - 1 | 0;
    return $v;
}
function g_Actor_getWorld($this) {
    return $this.$world;
}
function g_Actor_addedToWorld($this, $world) {
    return;
}
function g_Actor_getImage($this) {
    return $this.$image;
}
function g_Actor_setImage($this, $filename) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$filename = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$2 = new g_GreenfootImage;
        $ptr = 1;
    case 1:
        g_GreenfootImage__init_(var$2, $filename);
        if ($rt_suspending()) {
            break main;
        }
        $this.$setImage(var$2);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $filename, var$2, $ptr);
}
function g_Actor_setImage0($this, $image) {
    var $sizeChanged;
    if ($image === null && $this.$image === null)
        return;
    $sizeChanged = 1;
    if ($image !== null) {
        if ($image.$getWidth() == $this.$imageWidth && $image.$getHeight() == $this.$imageHeight)
            $sizeChanged = 0;
        else {
            $this.$imageWidth = $image.$getWidth();
            $this.$imageHeight = $image.$getHeight();
        }
    } else {
        $sizeChanged = !$this.$imageHeight && !$this.$imageWidth ? 0 : 1;
        $this.$imageWidth = 0;
        $this.$imageHeight = 0;
    }
    $this.$image = $image;
    if ($sizeChanged) {
        $this.$boundingRect = null;
        g_Actor_sizeChanged($this);
    }
}
function g_Actor_setWorld($this, $world) {
    $this.$world = $world;
}
function g_Actor_addToWorld($this, $x, $y, $world) {
    if ($world.$isBounded()) {
        $x = g_Actor_limitValue($this, $x, $world.$getWidth());
        $y = g_Actor_limitValue($this, $y, $world.$getHeight());
    }
    $this.$x = $x;
    $this.$y = $y;
    $this.$boundingRect = null;
    $this.$setWorld($world);
    $this.$setLocation($x, $y);
}
function g_Actor_getBoundingRect($this) {
    if ($this.$boundingRect === null)
        g_Actor_calcBounds($this);
    return $this.$boundingRect;
}
function g_Actor_calcBounds($this) {
    var $w, $cellSize, $wx, $wy, $i, $minX, $maxX, $minY, $maxY, var$10, var$11, $x, $y;
    $w = $this.$getActiveWorld();
    if ($w === null)
        return;
    $cellSize = $w.$getCellSize();
    if ($this.$image === null) {
        $wx = $rt_imul($this.$x, $cellSize) + ($cellSize / 2 | 0) | 0;
        $wy = $rt_imul($this.$y, $cellSize) + ($cellSize / 2 | 0) | 0;
        $this.$boundingRect = gci_Rect__init_($wx, $wy, 0, 0);
        $i = 0;
        while ($i < 4) {
            $this.$boundingXs.data[$i] = $wx;
            $this.$boundingYs.data[$i] = $wy;
            $i = $i + 1 | 0;
        }
        return;
    }
    if ($this.$rotation % 90 | 0) {
        g_Actor_getRotatedCorners($this, $this.$boundingXs, $this.$boundingYs, $cellSize);
        $minX = 2147483647;
        $maxX = (-2147483648);
        $minY = 2147483647;
        $maxY = (-2147483648);
        $i = 0;
        while ($i < 4) {
            $minX = jl_Math_min($this.$boundingXs.data[$i] - 1 | 0, $minX);
            $maxX = jl_Math_max($this.$boundingXs.data[$i] + 1 | 0, $maxX);
            $minY = jl_Math_min($this.$boundingYs.data[$i] - 1 | 0, $minY);
            $maxY = jl_Math_max($this.$boundingYs.data[$i] + 1 | 0, $maxY);
            $i = $i + 1 | 0;
        }
        $this.$boundingRect = gci_Rect__init_($minX, $minY, ($maxX - $minX | 0) + 1 | 0, ($maxY - $minY | 0) + 1 | 0);
    } else {
        if ($this.$rotation % 180 | 0) {
            var$10 = $this.$image.$getHeight();
            var$11 = $this.$image.$getWidth();
        } else {
            var$10 = $this.$image.$getWidth();
            var$11 = $this.$image.$getHeight();
        }
        $x = $rt_imul($cellSize, $this.$x) + ((($cellSize - var$10 | 0) - 1 | 0) / 2 | 0) | 0;
        $y = $rt_imul($cellSize, $this.$y) + ((($cellSize - var$11 | 0) - 1 | 0) / 2 | 0) | 0;
        $this.$boundingRect = gci_Rect__init_($x, $y, var$10, var$11);
        $this.$boundingXs.data[0] = $x;
        $this.$boundingYs.data[0] = $y;
        $this.$boundingXs.data[1] = ($x + var$10 | 0) - 1 | 0;
        $this.$boundingYs.data[1] = $y;
        $this.$boundingXs.data[2] = $this.$boundingXs.data[1];
        $this.$boundingYs.data[2] = ($y + var$11 | 0) - 1 | 0;
        $this.$boundingXs.data[3] = $x;
        $this.$boundingYs.data[3] = $this.$boundingYs.data[2];
    }
}
function g_Actor_setData($this, $o) {
    $this.$data = $o;
}
function g_Actor_getData($this) {
    return $this.$data;
}
function g_Actor_getClassImage($this) {
    var $clazz, $image, var$3, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();$image = $thread.pop();$clazz = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $clazz = jl_Object_getClass($this);
        while (true) {
            if ($clazz === null)
                return g_Actor_greenfootImage;
            $image = null;
            try {
                $ptr = 1;
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                } else {
                    throw $$e;
                }
            }
            var$3 = $image;
            if (var$3 !== null)
                break;
            $clazz = $clazz.$getSuperclass();
        }
        return var$3;
    case 1:
        a: {
            try {
                $tmp = $this.$getImage($clazz);
                if ($rt_suspending()) {
                    break main;
                }
                var$3 = $tmp;
                $image = var$3;
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                    var$3 = $image;
                    break a;
                } else {
                    throw $$e;
                }
            }
        }
        while (var$3 === null) {
            $clazz = $clazz.$getSuperclass();
            if ($clazz === null)
                return g_Actor_greenfootImage;
            $image = null;
            try {
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                } else {
                    throw $$e;
                }
            }
            var$3 = $image;
        }
        return var$3;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $clazz, $image, var$3, $ptr);
}
function g_Actor_sizeChanged($this) {
    if ($this.$world !== null)
        $this.$world.$updateObjectSize($this);
}
function g_Actor_locationChanged($this, $oldX, $oldY) {
    if ($this.$world !== null)
        $this.$world.$updateObjectLocation($this, $oldX, $oldY);
}
function g_Actor_failIfNotInWorld($this) {
    if ($this.$world !== null)
        return;
    $rt_throw(jl_IllegalStateException__init_($rt_s(6)));
}
function g_Actor_getRotatedCorners($this, $xs, $ys, $cellSize) {
    var var$4, var$5, $width, $height, $rotR, $sinR, $cosR, var$11, var$12, $xc, $yc, $i, $nx, $ny;
    var$4 = $ys.data;
    var$5 = $xs.data;
    $width = $this.$image.$getWidth();
    $height = $this.$image.$getHeight();
    var$5[0] =  -$width / 2 | 0;
    var$5[1] = (var$5[0] + $width | 0) - 1 | 0;
    var$5[2] = var$5[1];
    var$5[3] = var$5[0];
    var$4[0] =  -$height / 2 | 0;
    var$4[1] = var$4[0];
    var$4[2] = (var$4[1] + $height | 0) - 1 | 0;
    var$4[3] = var$4[2];
    $rotR = jl_Math_toRadians($this.$rotation);
    $sinR = jl_Math_sin($rotR);
    $cosR = jl_Math_cos($rotR);
    var$11 = $rt_imul($cellSize, $this.$x);
    var$12 = $cellSize;
    $xc = var$11 + var$12 / 2.0;
    $yc = $rt_imul($cellSize, $this.$y) + var$12 / 2.0;
    $i = 0;
    while ($i < 4) {
        $nx = var$5[$i] * $cosR - var$4[$i] * $sinR + $xc | 0;
        $ny = var$4[$i] * $cosR + var$5[$i] * $sinR + $yc | 0;
        var$5[$i] = $nx;
        var$4[$i] = $ny;
        $i = $i + 1 | 0;
    }
}
function g_Actor_checkOutside($myX, $myY, $otherX, $otherY) {
    var $v, var$6, var$7, $v1, $edgeX, $edgeY, $reX, $e, var$13, $scalar;
    g_Actor_$callClinit();
    $v = 0;
    while ($v < 4) {
        var$6 = $myY.data;
        var$7 = $myX.data;
        $v1 = ($v + 1 | 0) & 3;
        $edgeX = var$7[$v] - var$7[$v1] | 0;
        $edgeY = var$6[$v] - var$6[$v1] | 0;
        $reX =  -$edgeY;
        if (!(!$reX && !$edgeX)) {
            $e = 0;
            while (true) {
                if ($e >= 4)
                    return 1;
                var$13 = $otherY.data;
                $scalar = $rt_imul($reX, $otherX.data[$e] - var$7[$v1] | 0) + $rt_imul($edgeX, var$13[$e] - var$6[$v1] | 0) | 0;
                if ($scalar < 0)
                    break;
                $e = $e + 1 | 0;
            }
        }
        $v = $v + 1 | 0;
    }
    return 0;
}
function g_Actor_intersects($this, $other) {
    var $cellSize, $thisBounds, $otherBounds, $myX, $myY, $otherX, $otherY;
    if ($this.$image === null) {
        if ($other.$image !== null) {
            $cellSize = $this.$world.$getCellSize();
            return $other.$containsPoint($rt_imul($this.$x, $cellSize) + ($cellSize / 2 | 0) | 0, $rt_imul($this.$y, $cellSize) + ($cellSize / 2 | 0) | 0);
        }
        return $this.$x == $other.$x && $this.$y == $other.$y ? 1 : 0;
    }
    if ($other.$image === null) {
        $cellSize = $this.$world.$getCellSize();
        return $this.$containsPoint($rt_imul($other.$x, $cellSize) + ($cellSize / 2 | 0) | 0, $rt_imul($other.$y, $cellSize) + ($cellSize / 2 | 0) | 0);
    }
    $thisBounds = $this.$getBoundingRect();
    $otherBounds = $other.$getBoundingRect();
    if (!$this.$rotation && !$other.$rotation)
        return gci_Rect_intersects($thisBounds, $otherBounds);
    if (!gci_Rect_intersects($thisBounds, $otherBounds))
        return 0;
    $myX = $this.$boundingXs;
    $myY = $this.$boundingYs;
    $otherX = $other.$boundingXs;
    $otherY = $other.$boundingYs;
    if (g_Actor_checkOutside($myX, $myY, $otherX, $otherY))
        return 0;
    if (!g_Actor_checkOutside($otherX, $otherY, $myX, $myY))
        return 1;
    return 0;
}
function g_Actor_containsPoint($this, $px, $py) {
    var $v, $v1, $edgeX, $edgeY, $reX, $scalar, var$9, var$10;
    g_Actor_failIfNotInWorld($this);
    if ($this.$image === null)
        return 0;
    if ($this.$boundingRect === null)
        g_Actor_calcBounds($this);
    if ($this.$rotation && $this.$rotation != 90 && $this.$rotation != 270) {
        $v = 0;
        while ($v < 4) {
            $v1 = ($v + 1 | 0) & 3;
            $edgeX = $this.$boundingXs.data[$v] - $this.$boundingXs.data[$v1] | 0;
            $edgeY = $this.$boundingYs.data[$v] - $this.$boundingYs.data[$v1] | 0;
            $reX =  -$edgeY;
            if (!(!$reX && !$edgeX)) {
                $scalar = $rt_imul($reX, $px - $this.$boundingXs.data[$v1] | 0) + $rt_imul($edgeX, $py - $this.$boundingYs.data[$v1] | 0) | 0;
                if ($scalar >= 0)
                    return 0;
            }
            $v = $v + 1 | 0;
        }
        return 1;
    }
    a: {
        if ($px >= gci_Rect_getX($this.$boundingRect) && $px < gci_Rect_getRight($this.$boundingRect)) {
            var$9 = $this.$boundingRect;
            if ($py >= gci_Rect_getY(var$9) && $py < gci_Rect_getTop($this.$boundingRect)) {
                var$10 = 1;
                break a;
            }
        }
        var$10 = 0;
    }
    return var$10;
}
function g_Actor_getSequenceNumber($this) {
    return $this.$mySequenceNumber;
}
function g_Actor_getLastPaintSeqNum($this) {
    return $this.$lastPaintSequenceNumber;
}
function g_Actor_setLastPaintSeqNum($this, $num) {
    $this.$lastPaintSequenceNumber = $num;
}
function g_Actor_setDelegate($d) {
    g_Actor_$callClinit();
    g_Actor_delegate = $d;
}
function g_Actor_getDelegate() {
    g_Actor_$callClinit();
    return g_Actor_delegate;
}
function g_Actor_getImage0($this, $clazz) {
    var var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$clazz = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$2 = g_Actor_delegate;
        var$3 = $clazz.$getName();
        $ptr = 1;
    case 1:
        $tmp = var$2.$getImage0(var$3);
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $tmp;
        return var$2;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $clazz, var$2, var$3, $ptr);
}
function g_Actor_getActiveWorld($this) {
    var $handler;
    if ($this.$world !== null)
        return $this.$world;
    $handler = gc_WorldHandler_getInstance();
    if ($handler === null)
        return null;
    return $handler.$getWorld();
}
function g_Actor__clinit_() {
    g_Actor_sequenceNumber = 0;
}
function ScrollableActor() {
    var a = this; g_Actor.call(a);
    a.$x0 = 0.0;
    a.$y0 = 0.0;
    a.$z = 0.0;
    a.$zConstant = 0.0;
    a.$previousZoom = 0.0;
    a.$xOffset = 0.0;
    a.$yOffset = 0.0;
    a.$scalingConstant = 0.0;
    a.$screenXPos = 0;
    a.$screenYPos = 0;
    a.$scrollableWorld = null;
    a.$previousImage = null;
    a.$collider = null;
    a.$currentImage = null;
    a.$crop = 0;
    a.$chunk = null;
}
function ScrollableActor__init_() {
    var var_0 = new ScrollableActor();
    ScrollableActor__init_0(var_0);
    return var_0;
}
function ScrollableActor__init_0($this) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        g_Actor__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        var$1 = new Collider;
        $ptr = 2;
    case 2:
        Collider__init_(var$1, $this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$collider = var$1;
        $this.$xOffset = 0.0;
        $this.$yOffset = 0.0;
        $this.$crop = 0;
        $this.$scalingConstant = 1.0;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function ScrollableActor_getChunk($this) {
    return $this.$chunk;
}
function ScrollableActor_setChunk($this, $chunk) {
    $this.$chunk = $chunk;
    $chunk.$add($this);
}
function ScrollableActor_addedToWorld($this, $w) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$w = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $tmp;
        $this.$zConstant = var$2.$getHeight() / 2 | 0;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $w, var$2, $ptr);
}
function ScrollableActor_run($this) {
    return;
}
function ScrollableActor_render($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        $this.$resize();
        if ($rt_suspending()) {
            break main;
        }
        $this.$updateScreenPos();
        $ptr = 2;
    case 2:
        $this.$load();
        if ($rt_suspending()) {
            break main;
        }
        $this.$position();
        $this.$unload();
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function ScrollableActor_updateScreenPos($this) {
    $this.$screenXPos = ($this.$x0 - $this.$scrollableWorld.$getCameraX()) * $this.$scrollableWorld.$getZoom() + $this.$scrollableWorld.$getX() + ($this.$scrollableWorld.$getWidth() / 2 | 0) + $this.$xOffset | 0;
    $this.$screenYPos = ($this.$y0 - $this.$scrollableWorld.$getCameraY()) * $this.$scrollableWorld.$getZoom() + $this.$scrollableWorld.$getY() + ($this.$scrollableWorld.$getHeight() / 2 | 0) + $this.$yOffset | 0;
}
function ScrollableActor_position($this) {
    if ($this.$getWorld() !== null) {
        g_Actor_setLocation($this, $this.$screenXPos, $this.$screenYPos);
        $this.$collider.$setLocation($this.$x0 | 0, $this.$y0 | 0);
        $this.$z = $this.$y0 + $this.$zConstant;
    }
}
function ScrollableActor_resize($this) {
    var $zoomChange, $imageUpdate, $scaledImage, $width, $height, $croppedWidth, $croppedHeight, $croppedImage, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$croppedImage = $thread.pop();$croppedHeight = $thread.pop();$croppedWidth = $thread.pop();$height = $thread.pop();$width = $thread.pop();$scaledImage = $thread.pop();$imageUpdate = $thread.pop();$zoomChange = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $zoomChange = $this.$previousZoom === $this.$scrollableWorld.$getZoom() ? 0 : 1;
        $imageUpdate = $this.$previousImage === $this.$getImage1() ? 0 : 1;
        if (!$zoomChange && !$imageUpdate && !$this.$crop) {
            $this.$previousZoom = $this.$scrollableWorld.$getZoom();
            $this.$previousImage = $this.$getImage1();
            return;
        }
        $ptr = 1;
    case 1:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        $scaledImage = $tmp;
        if ($scaledImage !== null) {
            $width = jl_Math_max0($scaledImage.$getWidth() * $this.$getScrollableWorld().$getZoom() * $this.$scalingConstant, 1.0) | 0;
            $height = jl_Math_max0($scaledImage.$getHeight() * $this.$getScrollableWorld().$getZoom() * $this.$scalingConstant, 1.0) | 0;
            $scaledImage.$scale($width, $height);
            if (!$this.$crop)
                $this.$setImage0($scaledImage, 1);
            else {
                $croppedWidth = ($width + jl_Math_min($this.$getScreenXNoOffset() - ($width / 2 | 0) | 0, 0) | 0) - jl_Math_max(($this.$getScreenXNoOffset() + ($width / 2 | 0) | 0) - $this.$getScrollableWorld().$getWidth() | 0, 0) | 0;
                $croppedHeight = ($height + jl_Math_min($this.$getScreenYNoOffset() - ($height / 2 | 0) | 0, 0) | 0) - jl_Math_max(($this.$getScreenYNoOffset() + ($height / 2 | 0) | 0) - $this.$getScrollableWorld().$getHeight() | 0, 0) | 0;
                $croppedImage = g_GreenfootImage__init_0(jl_Math_max($croppedWidth, 1), jl_Math_max($croppedHeight, 1));
                $croppedImage.$drawImage($scaledImage, jl_Math_min($this.$getScreenXNoOffset() - ($width / 2 | 0) | 0, 0), jl_Math_min($this.$getScreenYNoOffset() - ($height / 2 | 0) | 0, 0));
                $this.$setXOffset( -jl_Math_min($this.$getScreenXNoOffset() - ($croppedWidth / 2 | 0) | 0, 0) - jl_Math_max(($this.$getScreenXNoOffset() + ($croppedWidth / 2 | 0) | 0) - $this.$getScrollableWorld().$getWidth() | 0, 0) | 0);
                $this.$setYOffset( -jl_Math_min($this.$getScreenYNoOffset() - ($croppedHeight / 2 | 0) | 0, 0) - jl_Math_max(($this.$getScreenYNoOffset() + ($croppedHeight / 2 | 0) | 0) - $this.$getScrollableWorld().$getHeight() | 0, 0) | 0);
                $this.$setImage0($croppedImage, 1);
            }
        }
        $this.$previousZoom = $this.$scrollableWorld.$getZoom();
        $this.$previousImage = $this.$getImage1();
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $zoomChange, $imageUpdate, $scaledImage, $width, $height, $croppedWidth, $croppedHeight, $croppedImage, $ptr);
}
function ScrollableActor_load($this) {
    var $onScreenXLeft, $onScreenXRight, $onScreenYDown, $onScreenYTop, var$5, var$6, var$7, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();$onScreenYTop = $thread.pop();$onScreenYDown = $thread.pop();$onScreenXRight = $thread.pop();$onScreenXLeft = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($this.$getWorld() !== null)
            return 1;
        $onScreenXLeft = ($this.$screenXPos + ($this.$getImage1().$getWidth() / 2 | 0) | 0) <= 0 ? 0 : 1;
        $onScreenXRight = ($this.$screenXPos - ($this.$getImage1().$getWidth() / 2 | 0) | 0) >= $this.$scrollableWorld.$getWidth() ? 0 : 1;
        if ($onScreenXLeft && $onScreenXRight) {
            $onScreenYDown = ($this.$screenYPos + ($this.$getImage1().$getHeight() / 2 | 0) | 0) <= 0 ? 0 : 1;
            $onScreenYTop = ($this.$screenYPos - ($this.$getImage1().$getHeight() / 2 | 0) | 0) >= $this.$scrollableWorld.$getHeight() ? 0 : 1;
            if ($onScreenYDown && $onScreenYTop) {
                var$5 = $this.$scrollableWorld.$getWorld();
                var$6 = $this.$screenXPos;
                var$7 = $this.$screenYPos;
                $ptr = 1;
                continue main;
            }
        }
        return 0;
    case 1:
        var$5.$addObject($this, var$6, var$7);
        if ($rt_suspending()) {
            break main;
        }
        return 1;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $onScreenXLeft, $onScreenXRight, $onScreenYDown, $onScreenYTop, var$5, var$6, var$7, $ptr);
}
function ScrollableActor_unload($this) {
    var $onScreenXLeft, $onScreenXRight, $onScreenYDown, $onScreenYTop;
    a: {
        b: {
            if ($this.$getWorld() !== null) {
                $onScreenXLeft = ($this.$getX() + ($this.$getImage1().$getWidth() / 2 | 0) | 0) <= $this.$scrollableWorld.$getX() ? 0 : 1;
                $onScreenXRight = ($this.$getX() - ($this.$getImage1().$getWidth() / 2 | 0) | 0) >= ($this.$scrollableWorld.$getX() + $this.$scrollableWorld.$getWidth() | 0) ? 0 : 1;
                if ($onScreenXLeft && $onScreenXRight) {
                    $onScreenYDown = ($this.$getY() + ($this.$getImage1().$getHeight() / 2 | 0) | 0) <= $this.$scrollableWorld.$getY() ? 0 : 1;
                    $onScreenYTop = ($this.$getY() - ($this.$getImage1().$getHeight() / 2 | 0) | 0) >= ($this.$scrollableWorld.$getY() + $this.$scrollableWorld.$getHeight() | 0) ? 0 : 1;
                    if (!$onScreenYDown)
                        break a;
                    if ($onScreenYTop)
                        break b;
                    else
                        break a;
                }
                $this.$getWorld().$removeObject($this);
                return 1;
            }
        }
        return 0;
    }
    $this.$getWorld().$removeObject($this);
    return 1;
}
function ScrollableActor_getExactX($this) {
    return $this.$x0;
}
function ScrollableActor_getExactY($this) {
    return $this.$y0;
}
function ScrollableActor_getZ($this) {
    return $this.$z;
}
function ScrollableActor_setLocation($this, $x, $y) {
    $this.$x0 = $x;
    $this.$y0 = $y;
    $this.$z = $y + $this.$zConstant;
    $this.$collider.$setLocation($x | 0, $y | 0);
    $this.$getScrollableWorld().$updateChunk($this);
}
function ScrollableActor_getScrollableWorld($this) {
    return $this.$scrollableWorld;
}
function ScrollableActor_setScrollableWorld($this, $scrollableWorld) {
    $this.$scrollableWorld = $scrollableWorld;
}
function ScrollableActor_getObjectsInRange($this, $radius, $cls) {
    var $getObjectsInRange, var$4, $a, var$6, var$7, var$8;
    $getObjectsInRange = ju_ArrayList__init_();
    var$4 = $this.$getScrollableWorld().$getObjectsOfType($cls).$iterator();
    while (var$4.$hasNext()) {
        $a = var$4.$next();
        if ($this !== $a) {
            var$6 = $this.$x0;
            var$7 = $this.$y0;
            var$8 = $a;
            if (Calc_getDistance(var$6, var$7, var$8.$getExactX(), var$8.$getExactY()) <= $radius)
                $getObjectsInRange.$add0($a);
        }
    }
    return $getObjectsInRange;
}
function ScrollableActor_getIntersectingObjects($this, $cls) {
    var $getIntersectingObjects, var$3, $a, $otherActor, $otherCollider;
    $getIntersectingObjects = ju_ArrayList__init_();
    var$3 = $this.$getScrollableWorld().$getObjectsOfType($cls).$iterator();
    while (var$3.$hasNext()) {
        $a = var$3.$next();
        if ($this !== $a) {
            $otherActor = $a;
            $otherCollider = $otherActor.$getCollider();
            if ($this.$collider.$intersects0($otherCollider))
                $getIntersectingObjects.$add0($a);
        }
    }
    return $getIntersectingObjects;
}
function ScrollableActor_getCollider($this) {
    return $this.$collider;
}
function ScrollableActor_getScreenXNoOffset($this) {
    return ($this.$x0 - $this.$scrollableWorld.$getCameraX()) * $this.$scrollableWorld.$getZoom() + $this.$scrollableWorld.$getX() + ($this.$scrollableWorld.$getWidth() / 2 | 0) | 0;
}
function ScrollableActor_getScreenYNoOffset($this) {
    return ($this.$y0 - $this.$scrollableWorld.$getCameraY()) * $this.$scrollableWorld.$getZoom() + $this.$scrollableWorld.$getY() + ($this.$scrollableWorld.$getHeight() / 2 | 0) | 0;
}
function ScrollableActor_setXOffset($this, $xOffset) {
    $this.$xOffset = $xOffset;
}
function ScrollableActor_setYOffset($this, $yOffset) {
    $this.$yOffset = $yOffset;
}
function ScrollableActor_setImage($this, $image) {
    $this.$setImage0($image, 0);
}
function ScrollableActor_setImage0($this, $image, $updateImage) {
    $this.$currentImage = $image;
    if ($updateImage)
        g_Actor_setImage0($this, $image);
}
function ScrollableActor_getImage($this) {
    return $this.$currentImage;
}
function Entity() {
    ScrollableActor.call(this);
}
function Entity__init_() {
    var var_0 = new Entity();
    Entity__init_0(var_0);
    return var_0;
}
function Entity__init_0($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        ScrollableActor__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function Entity_addedToWorld($this, $w) {
    var var$2, var$3, var$4, var$5, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$w = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        ScrollableActor_addedToWorld($this, $w);
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $w.$getWorld();
        var$3 = $this.$getCollider();
        var$4 = $this.$getExactX() | 0;
        var$5 = $this.$getExactY() | 0;
        $ptr = 2;
    case 2:
        var$2.$addObject(var$3, var$4, var$5);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $w, var$2, var$3, var$4, var$5, $ptr);
}
function Entity_removeCollider($this, $w) {
    $w.$removeObject($this.$getCollider());
}
function gp_GreenfootUtilDelegate() {
}
function gj_GreenfootUtilJsDelegate() {
    jl_Object.call(this);
}
function gj_GreenfootUtilJsDelegate__init_() {
    var var_0 = new gj_GreenfootUtilJsDelegate();
    gj_GreenfootUtilJsDelegate__init_0(var_0);
    return var_0;
}
function gj_GreenfootUtilJsDelegate__init_0($this) {
    jl_Object__init_0($this);
}
function gj_GreenfootUtilJsDelegate_getGreenfootLogoPath($this) {
    return $rt_s(7);
}
function jl_AutoCloseable() {
}
function ji_Closeable() {
}
function ji_InputStream() {
    jl_Object.call(this);
}
function ji_InputStream__init_() {
    var var_0 = new ji_InputStream();
    ji_InputStream__init_0(var_0);
    return var_0;
}
function ji_InputStream__init_0($this) {
    jl_Object__init_0($this);
}
function ji_InputStream_read($this, $b) {
    return $this.$read($b, 0, $b.data.length);
}
function ji_FilterInputStream() {
    ji_InputStream.call(this);
    this.$in = null;
}
function ji_FilterInputStream__init_(var_0) {
    var var_1 = new ji_FilterInputStream();
    ji_FilterInputStream__init_0(var_1, var_0);
    return var_1;
}
function ji_FilterInputStream__init_0($this, $in) {
    ji_InputStream__init_0($this);
    $this.$in = $in;
}
function ji_BufferedInputStream() {
    var a = this; ji_FilterInputStream.call(a);
    a.$buf = null;
    a.$count0 = 0;
    a.$marklimit = 0;
    a.$markpos = 0;
    a.$pos = 0;
}
function ji_BufferedInputStream__init_(var_0) {
    var var_1 = new ji_BufferedInputStream();
    ji_BufferedInputStream__init_0(var_1, var_0);
    return var_1;
}
function ji_BufferedInputStream__init_0($this, $in) {
    ji_FilterInputStream__init_0($this, $in);
    $this.$markpos = (-1);
    $this.$buf = $rt_createByteArray(8192);
}
function ji_BufferedInputStream_fillbuf($this, $localIn, $localBuf) {
    var var$3, var$4, var$5, $newLength, $newbuf, $bytesread, $result;
    if ($this.$markpos != (-1) && ($this.$pos - $this.$markpos | 0) < $this.$marklimit) {
        a: {
            if (!$this.$markpos) {
                var$3 = $localBuf.data;
                var$4 = $this.$marklimit;
                var$5 = var$3.length;
                if (var$4 > var$5) {
                    $newLength = var$5 * 2 | 0;
                    if ($newLength > $this.$marklimit)
                        $newLength = $this.$marklimit;
                    $newbuf = $rt_createByteArray($newLength);
                    jl_System_arraycopy($localBuf, 0, $newbuf, 0, var$5);
                    $this.$buf = $newbuf;
                    $localBuf = $this.$buf;
                    break a;
                }
            }
            if ($this.$markpos > 0) {
                var$3 = $localBuf.data;
                jl_System_arraycopy($localBuf, $this.$markpos, $localBuf, 0, var$3.length - $this.$markpos | 0);
            }
        }
        var$3 = $localBuf.data;
        $this.$pos = $this.$pos - $this.$markpos | 0;
        $this.$count0 = 0;
        $this.$markpos = 0;
        $bytesread = $localIn.$read($localBuf, $this.$pos, var$3.length - $this.$pos | 0);
        $this.$count0 = $bytesread <= 0 ? $this.$pos : $this.$pos + $bytesread | 0;
        return $bytesread;
    }
    $result = $localIn.$read0($localBuf);
    if ($result > 0) {
        $this.$markpos = (-1);
        $this.$pos = 0;
        $this.$count0 = $result;
    }
    return $result;
}
function ji_BufferedInputStream_read($this) {
    var $localBuf, $localIn, var$3, var$4;
    jl_Object_monitorEnterSync($this);
    try {
        $localBuf = $this.$buf;
        $localIn = $this.$in;
        if ($localBuf !== null && $localIn !== null) {
            if ($this.$pos >= $this.$count0 && ji_BufferedInputStream_fillbuf($this, $localIn, $localBuf) == (-1))
                return (-1);
            if ($localBuf !== $this.$buf) {
                $localBuf = $this.$buf;
                if ($localBuf === null)
                    $rt_throw(ji_IOException__init_($rt_s(8)));
            }
            if (($this.$count0 - $this.$pos | 0) <= 0)
                return (-1);
            var$3 = $localBuf.data;
            var$4 = $this.$pos;
            $this.$pos = var$4 + 1 | 0;
            return var$3[var$4] & 255;
        }
        $rt_throw(ji_IOException__init_($rt_s(8)));
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
function ju_Enumeration() {
}
function jl_Runnable() {
}
function gj_MouseManager$handleTouchEvent$lambda$_11_0() {
    var a = this; jl_Object.call(a);
    a.$_0 = null;
    a.$_1 = null;
    a.$_2 = null;
}
function gj_MouseManager$handleTouchEvent$lambda$_11_0__init_(var_0, var_1, var_2) {
    var var_3 = new gj_MouseManager$handleTouchEvent$lambda$_11_0();
    gj_MouseManager$handleTouchEvent$lambda$_11_0__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function gj_MouseManager$handleTouchEvent$lambda$_11_0__init_0(var$0, var$1, var$2, var$3) {
    jl_Object__init_0(var$0);
    var$0.$_0 = var$1;
    var$0.$_1 = var$2;
    var$0.$_2 = var$3;
}
function gj_MouseManager$handleTouchEvent$lambda$_11_0_run(var$0) {
    gj_MouseManager_lambda$handleTouchEvent$1(var$0.$_0, var$0.$_1, var$0.$_2);
}
function jnci_BufferedEncoder$Controller() {
    var a = this; jl_Object.call(a);
    a.$in0 = null;
    a.$out = null;
    a.$inPosition = 0;
    a.$outPosition = 0;
}
function jnci_BufferedEncoder$Controller__init_(var_0, var_1) {
    var var_2 = new jnci_BufferedEncoder$Controller();
    jnci_BufferedEncoder$Controller__init_0(var_2, var_0, var_1);
    return var_2;
}
function jnci_BufferedEncoder$Controller__init_0($this, $in, $out) {
    jl_Object__init_0($this);
    $this.$in0 = $in;
    $this.$out = $out;
}
function jnci_BufferedEncoder$Controller_hasMoreInput($this) {
    return jn_Buffer_hasRemaining($this.$in0);
}
function jnci_BufferedEncoder$Controller_hasMoreOutput($this, $sz) {
    return jn_Buffer_remaining($this.$out) < $sz ? 0 : 1;
}
function jnci_BufferedEncoder$Controller_setInPosition($this, $inPosition) {
    $this.$inPosition = $inPosition;
}
function jnci_BufferedEncoder$Controller_setOutPosition($this, $outPosition) {
    $this.$outPosition = $outPosition;
}
function g_World() {
    var a = this; jl_Object.call(a);
    a.$collisionChecker = null;
    a.$objectsDisordered = null;
    a.$objectsInPaintOrder = null;
    a.$objectsInActOrder = null;
    a.$textLabels = null;
    a.$cellSize = 0;
    a.$width = 0;
    a.$height = 0;
    a.$backgroundImage = null;
    a.$backgroundIsClassImage = 0;
    a.$isBounded0 = 0;
}
var g_World_DEFAULT_BACKGROUND_COLOR = null;
function g_World_$callClinit() {
    g_World_$callClinit = $rt_eraseClinit(g_World);
    g_World__clinit_();
}
function g_World__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new g_World();
    g_World__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function g_World__init_0($this, $worldWidth, $worldHeight, $cellSize, $bounded) {
    var var$5, $wHandler, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$wHandler = $thread.pop();var$5 = $thread.pop();$bounded = $thread.pop();$cellSize = $thread.pop();$worldHeight = $thread.pop();$worldWidth = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        g_World_$callClinit();
        jl_Object__init_0($this);
        $this.$collisionChecker = gc_ColManager__init_();
        $this.$objectsDisordered = g_TreeActorSet__init_();
        $this.$textLabels = ju_ArrayList__init_();
        $this.$cellSize = 1;
        $this.$backgroundIsClassImage = 1;
        g_World_initialize($this, $worldWidth, $worldHeight, $cellSize);
        $this.$isBounded0 = $bounded;
        $this.$backgroundIsClassImage = 1;
        $ptr = 1;
    case 1:
        $tmp = g_World_getClassImage($this);
        if ($rt_suspending()) {
            break main;
        }
        var$5 = $tmp;
        g_World_setBackground($this, var$5);
        $wHandler = gc_WorldHandler_getInstance();
        if ($wHandler !== null)
            $wHandler.$setInitialisingWorld($this);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $worldWidth, $worldHeight, $cellSize, $bounded, var$5, $wHandler, $ptr);
}
function g_World_setBackground($this, $image) {
    var $imgWidth, $imgHeight, $worldWidth, $worldHeight, $tile, $x, $y;
    if ($image === null) {
        $this.$backgroundIsClassImage = 0;
        $this.$backgroundImage = null;
    } else {
        $imgWidth = $image.$getWidth();
        $imgHeight = $image.$getHeight();
        $worldWidth = $this.$getWidthInPixels();
        $worldHeight = $this.$getHeightInPixels();
        $tile = $imgWidth >= $worldWidth && $imgHeight >= $worldHeight ? 0 : 1;
        if (!$tile)
            $this.$backgroundImage = $image;
        else {
            $this.$backgroundIsClassImage = 0;
            $this.$backgroundImage = g_GreenfootImage__init_0($worldWidth, $worldHeight);
            $this.$backgroundImage.$setColor(g_World_DEFAULT_BACKGROUND_COLOR);
            $this.$backgroundImage.$fill();
            $x = 0;
            while ($x < $worldWidth) {
                $y = 0;
                while ($y < $worldHeight) {
                    $this.$backgroundImage.$drawImage($image, $x, $y);
                    $y = $y + $imgHeight | 0;
                }
                $x = $x + $imgWidth | 0;
            }
        }
    }
}
function g_World_setBackground0($this, $filename) {
    var $bg, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$bg = $thread.pop();$filename = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $bg = new g_GreenfootImage;
        $ptr = 1;
    case 1:
        g_GreenfootImage__init_($bg, $filename);
        if ($rt_suspending()) {
            break main;
        }
        g_World_setBackground($this, $bg);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $filename, $bg, $ptr);
}
function g_World_getBackground($this) {
    if ($this.$backgroundImage === null) {
        $this.$backgroundImage = g_GreenfootImage__init_0($this.$getWidthInPixels(), $this.$getHeightInPixels());
        $this.$backgroundImage.$setColor(g_World_DEFAULT_BACKGROUND_COLOR);
        $this.$backgroundImage.$fill();
        $this.$backgroundIsClassImage = 0;
    } else if ($this.$backgroundIsClassImage) {
        $this.$backgroundImage = $this.$backgroundImage.$getCopyOnWriteClone();
        $this.$backgroundIsClassImage = 0;
    }
    return $this.$backgroundImage;
}
function g_World_getWidth($this) {
    return $this.$width;
}
function g_World_getHeight($this) {
    return $this.$height;
}
function g_World_getCellSize($this) {
    return $this.$cellSize;
}
function g_World_setPaintOrder($this, $classes) {
    var var$2;
    if ($classes === null) {
        if ($this.$objectsInPaintOrder === $this.$objectsDisordered) {
            if ($this.$objectsInActOrder !== null)
                $this.$objectsDisordered = $this.$objectsInActOrder;
            else {
                var$2 = $rt_createArray(jl_Class, 0);
                $this.$objectsDisordered.$setClassOrder(1, var$2);
            }
        }
        $this.$objectsInPaintOrder = null;
        return;
    }
    if ($this.$objectsInPaintOrder === null) {
        if ($this.$objectsInActOrder === $this.$objectsDisordered) {
            $this.$objectsInPaintOrder = g_TreeActorSet__init_();
            $this.$objectsInPaintOrder.$setClassOrder(1, $classes);
            $this.$objectsInPaintOrder.$addAll($this.$objectsDisordered);
            return;
        }
        $this.$objectsInPaintOrder = $this.$objectsDisordered;
    }
    $this.$objectsInPaintOrder.$setClassOrder(1, $classes);
}
function g_World_addObject($this, $object, $x, $y) {
    var $whInstance, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$whInstance = $thread.pop();$y = $thread.pop();$x = $thread.pop();$object = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($object.$world !== null) {
            if ($object.$world === $this)
                return;
            $object.$world.$removeObject($object);
        }
        $this.$objectsDisordered.$add1($object);
        g_World_addInPaintOrder($this, $object);
        g_World_addInActOrder($this, $object);
        $object.$addToWorld($x, $y, $this);
        $this.$collisionChecker.$addObject0($object);
        $ptr = 1;
    case 1:
        $object.$addedToWorld0($this);
        if ($rt_suspending()) {
            break main;
        }
        $whInstance = gc_WorldHandler_getInstance();
        if ($whInstance !== null)
            gc_WorldHandler_getInstance().$objectAddedToWorld($object);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $object, $x, $y, $whInstance, $ptr);
}
function g_World_removeObject($this, $object) {
    if ($object !== null && $object.$world === $this) {
        $this.$objectsDisordered.$remove($object);
        $this.$collisionChecker.$removeObject($object);
        if ($this.$objectsDisordered !== $this.$objectsInActOrder && $this.$objectsInActOrder !== null)
            $this.$objectsInActOrder.$remove($object);
        else if ($this.$objectsDisordered !== $this.$objectsInPaintOrder && $this.$objectsInPaintOrder !== null)
            $this.$objectsInPaintOrder.$remove($object);
        $object.$setWorld(null);
        return;
    }
}
function g_World_getObjects($this, $cls) {
    var $result, $i, $actor;
    $result = ju_ArrayList__init_();
    $i = $this.$objectsDisordered.$iterator();
    while ($i.$hasNext()) {
        $actor = $i.$next();
        if (!($cls !== null && !$cls.$isInstance($actor)))
            $result.$add0($actor);
    }
    return $result;
}
function g_World_act($this) {
    return;
}
function g_World_started($this) {
    return;
}
function g_World_isBounded($this) {
    return $this.$isBounded0;
}
function g_World_getHeightInPixels($this) {
    return $rt_imul($this.$height, $this.$cellSize);
}
function g_World_getWidthInPixels($this) {
    return $rt_imul($this.$width, $this.$cellSize);
}
function g_World_toCellFloor($this, $pixel) {
    return jl_Math_floor($pixel / $this.$cellSize) | 0;
}
function g_World_getObjectsAtPixel($this, $x, $y) {
    var $result, $objects, var$5, $actor, $bounds;
    $result = ju_LinkedList__init_();
    $objects = $this.$getObjectsListInPaintOrder();
    var$5 = $objects.$iterator();
    while (var$5.$hasNext()) {
        $actor = var$5.$next();
        $bounds = $actor.$getBoundingRect();
        if ($x >= gci_Rect_getX($bounds) && $x <= gci_Rect_getRight($bounds) && $y >= gci_Rect_getY($bounds) && $y <= gci_Rect_getTop($bounds) && $actor.$containsPoint($x, $y))
            $result.$add0($actor);
    }
    return $result;
}
function g_World_updateObjectLocation($this, $object, $oldX, $oldY) {
    $this.$collisionChecker.$updateObjectLocation($object, $oldX, $oldY);
}
function g_World_updateObjectSize($this, $object) {
    $this.$collisionChecker.$updateObjectSize($object);
}
function g_World_startSequence($this) {
    $this.$collisionChecker.$startSequence();
}
function g_World_getObjectsListInPaintOrder($this) {
    if ($this.$objectsInPaintOrder === null)
        return $this.$objectsDisordered;
    return $this.$objectsInPaintOrder;
}
function g_World_getObjectsListInActOrder($this) {
    if ($this.$objectsInActOrder === null)
        return $this.$objectsDisordered;
    return $this.$objectsInActOrder;
}
function g_World_initialize($this, $width, $height, $cellSize) {
    $this.$width = $width;
    $this.$height = $height;
    $this.$cellSize = $cellSize;
    $this.$collisionChecker.$initialize0($width, $height, $cellSize, 0);
}
function g_World_getClassImage($this) {
    var $clazz, $image, var$3, var$4, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();$image = $thread.pop();$clazz = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $clazz = jl_Object_getClass($this);
        while (true) {
            if ($clazz === null)
                return null;
            $image = null;
            try {
                var$3 = g_Actor_getDelegate();
                var$4 = $clazz.$getName();
                $ptr = 1;
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                } else {
                    throw $$e;
                }
            }
            var$3 = $image;
            if (var$3 !== null)
                break;
            $clazz = $clazz.$getSuperclass();
        }
        return var$3;
    case 1:
        a: {
            try {
                $tmp = var$3.$getImage0(var$4);
                if ($rt_suspending()) {
                    break main;
                }
                var$3 = $tmp;
                $image = var$3;
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                    var$3 = $image;
                    break a;
                } else {
                    throw $$e;
                }
            }
        }
        while (var$3 === null) {
            $clazz = $clazz.$getSuperclass();
            if ($clazz === null)
                return null;
            $image = null;
            try {
                var$3 = g_Actor_getDelegate();
                var$4 = $clazz.$getName();
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                } else {
                    throw $$e;
                }
            }
            var$3 = $image;
        }
        return var$3;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $clazz, $image, var$3, var$4, $ptr);
}
function g_World_addInActOrder($this, $object) {
    if ($this.$objectsInActOrder !== null)
        $this.$objectsInActOrder.$add1($object);
}
function g_World_addInPaintOrder($this, $object) {
    if ($this.$objectsInPaintOrder !== null)
        $this.$objectsInPaintOrder.$add1($object);
}
function g_World__clinit_() {
    g_Color_$callClinit();
    g_World_DEFAULT_BACKGROUND_COLOR = g_Color_WHITE;
}
function GameWorld() {
    var a = this; g_World.call(a);
    a.$city = null;
    a.$instructions = null;
    a.$difficultyButton = null;
    a.$playButton = null;
    a.$linkBox = null;
    a.$highlightEnabler = null;
    a.$titleDisplay = null;
    a.$loggedIn = 0;
    a.$score = null;
    a.$resultScore = null;
    a.$resultPercentFinished = null;
    a.$deathScreen = null;
    a.$winScreen = null;
    a.$finishScore = 0;
    a.$titleButton = null;
    a.$replayButton = null;
}
function GameWorld__init_() {
    var var_0 = new GameWorld();
    GameWorld__init_0(var_0);
    return var_0;
}
function GameWorld__init_0($this) {
    var var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$9 = $thread.pop();var$8 = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = 960;
        var$2 = 600;
        var$3 = 1;
        var$4 = 0;
        $ptr = 1;
    case 1:
        g_World__init_0($this, var$1, var$2, var$3, var$4);
        if ($rt_suspending()) {
            break main;
        }
        var$5 = $rt_s(9);
        $ptr = 2;
    case 2:
        g_World_setBackground0($this, var$5);
        if ($rt_suspending()) {
            break main;
        }
        var$6 = $rt_createArray(jl_Class, 12);
        var$7 = var$6.data;
        var$7[0] = $rt_cls(LoadingScreen);
        var$7[1] = $rt_cls(Label);
        var$7[2] = $rt_cls(Instructions);
        var$7[3] = $rt_cls(Button);
        var$7[4] = $rt_cls(EndScreen);
        var$7[5] = $rt_cls(ProgressBar);
        var$7[6] = $rt_cls(Stat);
        var$7[7] = $rt_cls(PlayerImage);
        var$7[8] = $rt_cls(EnemyImage);
        var$7[9] = $rt_cls(Building);
        var$7[10] = $rt_cls(BuildingImage);
        var$7[11] = $rt_cls(Slope);
        $this.$setPaintOrder(var$6);
        var$5 = new LinkBox;
        $ptr = 3;
    case 3:
        LinkBox__init_(var$5);
        if ($rt_suspending()) {
            break main;
        }
        $this.$linkBox = var$5;
        var$5 = new City;
        var$8 = $this.$linkBox;
        $ptr = 4;
    case 4:
        City__init_(var$5, var$8);
        if ($rt_suspending()) {
            break main;
        }
        $this.$city = var$5;
        var$5 = new DifficultyButton;
        var$8 = $this.$city;
        $ptr = 5;
    case 5:
        DifficultyButton__init_(var$5, var$8);
        if ($rt_suspending()) {
            break main;
        }
        $this.$difficultyButton = var$5;
        var$5 = new PlayButton;
        var$8 = $this.$city;
        var$9 = $this.$linkBox;
        $ptr = 6;
    case 6:
        PlayButton__init_(var$5, var$8, var$9);
        if ($rt_suspending()) {
            break main;
        }
        $this.$playButton = var$5;
        var$5 = new Instructions;
        var$8 = $this.$city;
        var$9 = $this.$playButton;
        $ptr = 7;
    case 7:
        Instructions__init_(var$5, var$8, var$9);
        if ($rt_suspending()) {
            break main;
        }
        $this.$instructions = var$5;
        var$5 = new HighlightEnabler;
        var$8 = $this.$city;
        $ptr = 8;
    case 8:
        HighlightEnabler__init_(var$5, var$8);
        if ($rt_suspending()) {
            break main;
        }
        $this.$highlightEnabler = var$5;
        var$5 = new TitleDisplay;
        $ptr = 9;
    case 9:
        TitleDisplay__init_(var$5);
        if ($rt_suspending()) {
            break main;
        }
        $this.$titleDisplay = var$5;
        var$5 = new RestartButton;
        var$8 = $this.$city;
        $ptr = 10;
    case 10:
        RestartButton__init_(var$5, var$8);
        if ($rt_suspending()) {
            break main;
        }
        $this.$replayButton = var$5;
        var$5 = new TitleButton;
        var$8 = $this.$city;
        $ptr = 11;
    case 11:
        TitleButton__init_(var$5, var$8);
        if ($rt_suspending()) {
            break main;
        }
        $this.$titleButton = var$5;
        var$5 = new EndScreen;
        var$1 = 0;
        $ptr = 12;
    case 12:
        EndScreen__init_(var$5, var$1);
        if ($rt_suspending()) {
            break main;
        }
        $this.$deathScreen = var$5;
        var$5 = new EndScreen;
        var$1 = 1;
        $ptr = 13;
    case 13:
        EndScreen__init_(var$5, var$1);
        if ($rt_suspending()) {
            break main;
        }
        $this.$winScreen = var$5;
        $this.$finishScore = 0;
        var$5 = new Stat;
        var$8 = $rt_s(10);
        $ptr = 14;
    case 14:
        Stat__init_(var$5, var$8);
        if ($rt_suspending()) {
            break main;
        }
        $this.$score = var$5;
        $ptr = 15;
    case 15:
        $this.$addUI();
        if ($rt_suspending()) {
            break main;
        }
        var$5 = $this.$city;
        var$1 = 0;
        var$2 = 0;
        $ptr = 16;
    case 16:
        $this.$addObject(var$5, var$1, var$2);
        if ($rt_suspending()) {
            break main;
        }
        g_Greenfoot_setSpeed(50);
        var$5 = $this.$city;
        $ptr = 17;
    case 17:
        SoundManager_reset(var$5);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, $ptr);
}
function GameWorld_addUI($this) {
    var var$1, var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $this.$score.$setStat(0);
        var$1 = $this.$playButton;
        var$2 = 480;
        var$3 = 300;
        $ptr = 1;
    case 1:
        $this.$addObject(var$1, var$2, var$3);
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $this.$difficultyButton;
        var$2 = 910;
        var$3 = 50;
        $ptr = 2;
    case 2:
        $this.$addObject(var$1, var$2, var$3);
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $this.$highlightEnabler;
        var$2 = 910;
        var$3 = 120;
        $ptr = 3;
    case 3:
        $this.$addObject(var$1, var$2, var$3);
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $this.$instructions;
        var$2 = 910;
        var$3 = 190;
        $ptr = 4;
    case 4:
        $this.$addObject(var$1, var$2, var$3);
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $this.$titleDisplay;
        var$2 = 188;
        var$3 = 460;
        $ptr = 5;
    case 5:
        $this.$addObject(var$1, var$2, var$3);
        if ($rt_suspending()) {
            break main;
        }
        if (!$this.$loggedIn)
            return;
        var$1 = $this.$linkBox;
        var$2 = 100;
        var$3 = 25;
        $ptr = 6;
    case 6:
        $this.$addObject(var$1, var$2, var$3);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, var$3, $ptr);
}
function GameWorld_removeUI($this) {
    var var$1, var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $this.$removeObject($this.$playButton);
        $this.$removeObject($this.$difficultyButton);
        $this.$removeObject($this.$instructions);
        $this.$removeObject($this.$highlightEnabler);
        $this.$removeObject($this.$titleDisplay);
        var$1 = $this.$score;
        var$2 = 960;
        var$3 = (-45);
        $ptr = 1;
    case 1:
        $this.$addObject(var$1, var$2, var$3);
        if ($rt_suspending()) {
            break main;
        }
        if ($this.$linkBox.$getWorld() !== null)
            $this.$removeObject($this.$linkBox);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, var$3, $ptr);
}
function GameWorld_addEndUI($this, $win) {
    var var$2, var$3, var$4, var$5, var$6, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$win = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $this.$finishScore = $this.$score.$getStat();
        $this.$removeObject($this.$score);
        var$2 = new Label;
        var$3 = jl_Integer_toString($this.$finishScore);
        $ptr = 1;
    case 1:
        Label__init_(var$2, var$3);
        if ($rt_suspending()) {
            break main;
        }
        $this.$resultScore = var$2;
        var$2 = new Label;
        var$3 = jl_Integer_toString($this.$city.$getPercentageFinished());
        var$4 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append0(var$4, var$3), 37);
        var$3 = jl_StringBuilder_toString(var$4);
        $ptr = 2;
    case 2:
        Label__init_(var$2, var$3);
        if ($rt_suspending()) {
            break main;
        }
        $this.$resultPercentFinished = var$2;
        var$2 = $this.$resultScore;
        var$5 = 700;
        var$6 = 175;
        $ptr = 3;
    case 3:
        $this.$addObject(var$2, var$5, var$6);
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $this.$replayButton;
        var$5 = 380;
        var$6 = 500;
        $ptr = 4;
    case 4:
        $this.$addObject(var$2, var$5, var$6);
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $this.$titleButton;
        var$5 = 580;
        var$6 = 500;
        $ptr = 5;
    case 5:
        $this.$addObject(var$2, var$5, var$6);
        if ($rt_suspending()) {
            break main;
        }
        if (!$win) {
            var$2 = $this.$resultPercentFinished;
            var$5 = 690;
            var$6 = 300;
            $ptr = 6;
            continue main;
        }
        var$2 = $this.$winScreen;
        var$5 = 480;
        var$6 = 250;
        $ptr = 8;
        continue main;
    case 6:
        $this.$addObject(var$2, var$5, var$6);
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $this.$deathScreen;
        var$5 = 480;
        var$6 = 250;
        $ptr = 7;
    case 7:
        $this.$addObject(var$2, var$5, var$6);
        if ($rt_suspending()) {
            break main;
        }
        return;
    case 8:
        $this.$addObject(var$2, var$5, var$6);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $win, var$2, var$3, var$4, var$5, var$6, $ptr);
}
function GameWorld_removeEndUI($this) {
    $this.$removeObject($this.$resultScore);
    $this.$removeObject($this.$resultPercentFinished);
    $this.$removeObject($this.$replayButton);
    $this.$removeObject($this.$titleButton);
    $this.$removeObject($this.$deathScreen);
    $this.$removeObject($this.$winScreen);
}
function GameWorld_increaseScore($this, $increase) {
    $this.$score.$increaseStat($increase);
}
function GameWorld_stopped($this) {
    SoundManager_stopMusic();
}
function ji_Serializable() {
}
function jl_Number() {
    jl_Object.call(this);
}
function jl_Number__init_() {
    var var_0 = new jl_Number();
    jl_Number__init_0(var_0);
    return var_0;
}
function jl_Number__init_0($this) {
    jl_Object__init_0($this);
}
function jl_Comparable() {
}
function jl_Integer() {
    jl_Number.call(this);
    this.$value = 0;
}
var jl_Integer_TYPE = null;
var jl_Integer_integerCache = null;
function jl_Integer_$callClinit() {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
}
function jl_Integer__init_(var_0) {
    var var_1 = new jl_Integer();
    jl_Integer__init_0(var_1, var_0);
    return var_1;
}
function jl_Integer__init_0($this, $value) {
    jl_Integer_$callClinit();
    jl_Number__init_0($this);
    $this.$value = $value;
}
function jl_Integer_toString0($i, $radix) {
    jl_Integer_$callClinit();
    if (!($radix >= 2 && $radix <= 36))
        $radix = 10;
    return jl_AbstractStringBuilder__init_(20).$append2($i, $radix).$toString();
}
function jl_Integer_toHexString($i) {
    jl_Integer_$callClinit();
    return otci_IntegerUtil_toUnsignedLogRadixString($i, 4);
}
function jl_Integer_toString($i) {
    jl_Integer_$callClinit();
    return jl_Integer_toString0($i, 10);
}
function jl_Integer_parseInt($s, $radix) {
    var $negative, $index, $value, var$6, $digit;
    jl_Integer_$callClinit();
    if ($radix >= 2 && $radix <= 36) {
        if ($s !== null && !$s.$isEmpty()) {
            a: {
                $negative = 0;
                $index = 0;
                switch ($s.$charAt(0)) {
                    case 43:
                        $index = 1;
                        break a;
                    case 45:
                        $negative = 1;
                        $index = 1;
                        break a;
                    default:
                }
            }
            $value = 0;
            if ($index == $s.$length())
                $rt_throw(jl_NumberFormatException__init_());
            while ($index < $s.$length()) {
                var$6 = $index + 1 | 0;
                $digit = jl_Character_getNumericValue($s.$charAt($index));
                if ($digit < 0)
                    $rt_throw(jl_NumberFormatException__init_0(jl_StringBuilder__init_().$append($rt_s(11)).$append($s).$toString()));
                if ($digit >= $radix)
                    $rt_throw(jl_NumberFormatException__init_0(jl_StringBuilder__init_().$append($rt_s(12)).$append3($radix).$append($rt_s(2)).$append($s).$toString()));
                $value = $rt_imul($radix, $value) + $digit | 0;
                if ($value < 0) {
                    if (var$6 == $s.$length() && $value == (-2147483648) && $negative)
                        return (-2147483648);
                    $rt_throw(jl_NumberFormatException__init_0(jl_StringBuilder__init_().$append($rt_s(13)).$append($s).$toString()));
                }
                $index = var$6;
            }
            if ($negative)
                $value =  -$value;
            return $value;
        }
        $rt_throw(jl_NumberFormatException__init_0($rt_s(14)));
    }
    $rt_throw(jl_NumberFormatException__init_0(jl_StringBuilder__init_().$append($rt_s(15)).$append3($radix).$toString()));
}
function jl_Integer_parseInt0($s) {
    jl_Integer_$callClinit();
    return jl_Integer_parseInt($s, 10);
}
function jl_Integer_valueOf($i) {
    jl_Integer_$callClinit();
    if ($i >= (-128) && $i <= 127) {
        jl_Integer_ensureIntegerCache();
        return jl_Integer_integerCache.data[$i + 128 | 0];
    }
    return jl_Integer__init_($i);
}
function jl_Integer_ensureIntegerCache() {
    var $j;
    jl_Integer_$callClinit();
    if (jl_Integer_integerCache === null) {
        jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
        $j = 0;
        while ($j < jl_Integer_integerCache.data.length) {
            jl_Integer_integerCache.data[$j] = jl_Integer__init_($j - 128 | 0);
            $j = $j + 1 | 0;
        }
    }
}
function jl_Integer_intValue($this) {
    return $this.$value;
}
function jl_Integer_hashCode($this) {
    return $this.$value >>> 4 ^ $this.$value << 28 ^ $this.$value << 8 ^ $this.$value >>> 24;
}
function jl_Integer_equals($this, $other) {
    if ($this === $other)
        return 1;
    return $other instanceof jl_Integer && $other.$value == $this.$value ? 1 : 0;
}
function jl_Integer_numberOfLeadingZeros($i) {
    var $n;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    if ($i >>> 16) {
        $i = $i >>> 16;
        $n = 16;
    }
    if ($i >>> 8) {
        $i = $i >>> 8;
        $n = $n | 8;
    }
    if ($i >>> 4) {
        $i = $i >>> 4;
        $n = $n | 4;
    }
    if ($i >>> 2) {
        $i = $i >>> 2;
        $n = $n | 2;
    }
    if ($i >>> 1)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
}
function jl_Integer__clinit_() {
    jl_Integer_TYPE = $rt_cls($rt_intcls());
}
function gs_SoundFactory$2$handleEvent$lambda$_1_0() {
    jl_Object.call(this);
    this.$_00 = null;
}
function gs_SoundFactory$2$handleEvent$lambda$_1_0__init_(var_0) {
    var var_1 = new gs_SoundFactory$2$handleEvent$lambda$_1_0();
    gs_SoundFactory$2$handleEvent$lambda$_1_0__init_0(var_1, var_0);
    return var_1;
}
function gs_SoundFactory$2$handleEvent$lambda$_1_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_00 = var$1;
}
function gs_SoundFactory$2$handleEvent$lambda$_1_0_run(var$0) {
    gs_SoundFactory$2_lambda$handleEvent$0(var$0.$_00);
}
function jl_CloneNotSupportedException() {
    jl_Exception.call(this);
}
function jl_CloneNotSupportedException__init_() {
    var var_0 = new jl_CloneNotSupportedException();
    jl_CloneNotSupportedException__init_0(var_0);
    return var_0;
}
function jl_CloneNotSupportedException__init_0($this) {
    jl_Exception__init_0($this);
}
function otj_JSObject() {
}
function otj_JSObject_cast$static($this) {
    return $this;
}
function otjt_ArrayBufferView() {
    jl_Object.call(this);
}
function otjt_Uint8Array() {
    otjt_ArrayBufferView.call(this);
}
function UI() {
    g_Actor.call(this);
}
function UI__init_() {
    var var_0 = new UI();
    UI__init_0(var_0);
    return var_0;
}
function UI__init_0($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        g_Actor__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function SoundManager() {
    UI.call(this);
}
var SoundManager_soundNames = null;
var SoundManager_soundsList = null;
var SoundManager_muteLevel = 0;
var SoundManager_music = null;
var SoundManager_world = null;
function SoundManager_$callClinit() {
    SoundManager_$callClinit = $rt_eraseClinit(SoundManager);
    SoundManager__clinit_();
}
function SoundManager__init_() {
    var var_0 = new SoundManager();
    SoundManager__init_0(var_0);
    return var_0;
}
function SoundManager__init_0($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        SoundManager_$callClinit();
        $ptr = 1;
    case 1:
        UI__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function SoundManager_reset($w) {
    var var$2, var$3, var$4, var$5, var$6, $name, $sound, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$sound = $thread.pop();$name = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$w = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        SoundManager_$callClinit();
        SoundManager_world = $w;
        var$2 = $rt_createArray(jl_String, 3).data;
        var$2[0] = $rt_s(16);
        var$2[1] = $rt_s(17);
        var$2[2] = $rt_s(18);
        var$3 = var$2.length;
        var$4 = 0;
        if (var$4 >= var$3) {
            var$5 = new g_GreenfootSound;
            var$6 = $rt_s(19);
            $ptr = 1;
            continue main;
        }
        $name = var$2[var$4];
        $sound = new Sound;
        $ptr = 2;
        continue main;
    case 1:
        g_GreenfootSound__init_(var$5, var$6);
        if ($rt_suspending()) {
            break main;
        }
        SoundManager_music = var$5;
        SoundManager_music.$setVolume(10);
        return;
    case 2:
        Sound__init_($sound, $name);
        if ($rt_suspending()) {
            break main;
        }
        SoundManager_soundsList.$put($name, $sound);
        var$4 = var$4 + 1 | 0;
        if (var$4 >= var$3) {
            var$5 = new g_GreenfootSound;
            var$6 = $rt_s(19);
            $ptr = 1;
            continue main;
        }
        $name = var$2[var$4];
        $sound = new Sound;
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($w, var$2, var$3, var$4, var$5, var$6, $name, $sound, $ptr);
}
function SoundManager_playMusic() {
    SoundManager_$callClinit();
    SoundManager_music.$playLoop();
}
function SoundManager_stopMusic() {
    SoundManager_$callClinit();
    SoundManager_music.$stop();
}
function SoundManager_playSound($name, $volume) {
    var $sound;
    SoundManager_$callClinit();
    $sound = SoundManager_soundsList.$get($name);
    $sound.$playSound($volume * 0.75 * SoundManager_muteLevel | 0);
}
function SoundManager__clinit_() {
    SoundManager_soundNames = $rt_createArray(jl_String, 0);
    SoundManager_soundsList = ju_HashMap__init_();
    SoundManager_muteLevel = 1;
}
function jl_AbstractStringBuilder$Constants() {
    jl_Object.call(this);
}
var jl_AbstractStringBuilder$Constants_intPowersOfTen = null;
var jl_AbstractStringBuilder$Constants_longPowersOfTen = null;
var jl_AbstractStringBuilder$Constants_longLogPowersOfTen = null;
var jl_AbstractStringBuilder$Constants_doubleAnalysisResult = null;
var jl_AbstractStringBuilder$Constants_floatAnalysisResult = null;
function jl_AbstractStringBuilder$Constants_$callClinit() {
    jl_AbstractStringBuilder$Constants_$callClinit = $rt_eraseClinit(jl_AbstractStringBuilder$Constants);
    jl_AbstractStringBuilder$Constants__clinit_();
}
function jl_AbstractStringBuilder$Constants__init_() {
    var var_0 = new jl_AbstractStringBuilder$Constants();
    jl_AbstractStringBuilder$Constants__init_0(var_0);
    return var_0;
}
function jl_AbstractStringBuilder$Constants__init_0($this) {
    jl_AbstractStringBuilder$Constants_$callClinit();
    jl_Object__init_0($this);
}
function jl_AbstractStringBuilder$Constants__clinit_() {
    var var$1, var$2;
    var$1 = $rt_createIntArray(10);
    var$2 = var$1.data;
    var$2[0] = 1;
    var$2[1] = 10;
    var$2[2] = 100;
    var$2[3] = 1000;
    var$2[4] = 10000;
    var$2[5] = 100000;
    var$2[6] = 1000000;
    var$2[7] = 10000000;
    var$2[8] = 100000000;
    var$2[9] = 1000000000;
    jl_AbstractStringBuilder$Constants_intPowersOfTen = var$1;
    var$1 = $rt_createLongArray(19);
    var$2 = var$1.data;
    var$2[0] = Long_fromInt(1);
    var$2[1] = Long_fromInt(10);
    var$2[2] = Long_fromInt(100);
    var$2[3] = Long_fromInt(1000);
    var$2[4] = Long_fromInt(10000);
    var$2[5] = Long_fromInt(100000);
    var$2[6] = Long_fromInt(1000000);
    var$2[7] = Long_fromInt(10000000);
    var$2[8] = Long_fromInt(100000000);
    var$2[9] = Long_fromInt(1000000000);
    var$2[10] = new Long(1410065408, 2);
    var$2[11] = new Long(1215752192, 23);
    var$2[12] = new Long(3567587328, 232);
    var$2[13] = new Long(1316134912, 2328);
    var$2[14] = new Long(276447232, 23283);
    var$2[15] = new Long(2764472320, 232830);
    var$2[16] = new Long(1874919424, 2328306);
    var$2[17] = new Long(1569325056, 23283064);
    var$2[18] = new Long(2808348672, 232830643);
    jl_AbstractStringBuilder$Constants_longPowersOfTen = var$1;
    var$1 = $rt_createLongArray(6);
    var$2 = var$1.data;
    var$2[0] = Long_fromInt(1);
    var$2[1] = Long_fromInt(10);
    var$2[2] = Long_fromInt(100);
    var$2[3] = Long_fromInt(10000);
    var$2[4] = Long_fromInt(100000000);
    var$2[5] = new Long(1874919424, 2328306);
    jl_AbstractStringBuilder$Constants_longLogPowersOfTen = var$1;
    jl_AbstractStringBuilder$Constants_doubleAnalysisResult = otcit_DoubleAnalyzer$Result__init_();
    jl_AbstractStringBuilder$Constants_floatAnalysisResult = otcit_FloatAnalyzer$Result__init_();
}
function otp_PlatformRunnable() {
}
function otr_EventQueue$Event() {
}
function jl_Object$NotifyListener() {
}
function otjb_TimerHandler() {
}
function jl_ThreadInterruptHandler() {
}
function jl_Object$NotifyListenerImpl() {
    var a = this; jl_Object.call(a);
    a.$obj = null;
    a.$callback = null;
    a.$currentThread0 = null;
    a.$timerId = 0;
    a.$expired0 = 0;
    a.$performed = 0;
    a.$lockCount = 0;
}
function jl_Object$NotifyListenerImpl__init_(var_0, var_1, var_2) {
    var var_3 = new jl_Object$NotifyListenerImpl();
    jl_Object$NotifyListenerImpl__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jl_Object$NotifyListenerImpl__init_0($this, $obj, $callback, $lockCount) {
    jl_Object__init_0($this);
    $this.$currentThread0 = jl_Thread_currentThread();
    $this.$timerId = (-1);
    $this.$obj = $obj;
    $this.$callback = $callback;
    $this.$lockCount = $lockCount;
}
function jl_Object$NotifyListenerImpl_expired($this) {
    var $result;
    $result = $this.$expired0;
    $this.$expired0 = 1;
    return $result;
}
function jl_Object$NotifyListenerImpl_onTimer($this) {
    otp_Platform_postpone(jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0__init_($this));
}
function jl_Object$NotifyListenerImpl_run($this) {
    if ($this.$performed)
        return;
    $this.$performed = 1;
    if ($this.$timerId >= 0) {
        otp_Platform_killSchedule($this.$timerId);
        $this.$timerId = (-1);
    }
    jl_Thread_setCurrentThread($this.$currentThread0);
    jl_Object_monitorEnterWait0($this.$obj, $this.$lockCount, $this.$callback);
}
function jl_Object$NotifyListenerImpl_interrupted($this) {
    if ($this.$performed)
        return;
    $this.$performed = 1;
    if ($this.$timerId >= 0) {
        otp_Platform_killSchedule($this.$timerId);
        $this.$timerId = (-1);
    }
    otp_Platform_postpone(jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0__init_($this));
}
function jl_Object$NotifyListenerImpl_lambda$interrupted$3($this) {
    $this.$callback.$error(jl_InterruptedException__init_());
}
function jl_Object$NotifyListenerImpl_lambda$onTimer$1($this) {
    if (!$this.$expired())
        $this.$run();
}
function jl_Object$NotifyListenerImpl_onTimer$exported$0(var$0) {
    var$0.$onTimer();
}
function otjdx_Node() {
}
function otjdx_Document() {
}
function otjde_EventTarget() {
}
function otjdh_HTMLDocument() {
}
function otjdh_HTMLDocument_current() {
    return window.document;
}
function Button() {
    UI.call(this);
}
function Button__init_() {
    var var_0 = new Button();
    Button__init_0(var_0);
    return var_0;
}
function Button__init_0($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        UI__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function jl_Long() {
    jl_Number.call(this);
}
var jl_Long_TYPE = null;
function jl_Long_$callClinit() {
    jl_Long_$callClinit = $rt_eraseClinit(jl_Long);
    jl_Long__clinit_();
}
function jl_Long_divideUnsigned(var$1, var$2) {
    return Long_udiv(var$1, var$2);
}
function jl_Long_remainderUnsigned(var$1, var$2) {
    return Long_urem(var$1, var$2);
}
function jl_Long__clinit_() {
    jl_Long_TYPE = $rt_cls($rt_longcls());
}
function ju_Map() {
}
function jl_Thread() {
    var a = this; jl_Object.call(a);
    a.$id = Long_ZERO;
    a.$priority = 0;
    a.$timeSliceStart = Long_ZERO;
    a.$finishedLock = null;
    a.$interruptedFlag = 0;
    a.$interruptHandler = null;
    a.$name = null;
    a.$alive = 0;
    a.$target = null;
}
var jl_Thread_mainThread = null;
var jl_Thread_currentThread0 = null;
var jl_Thread_nextId = Long_ZERO;
var jl_Thread_activeCount = 0;
function jl_Thread_$callClinit() {
    jl_Thread_$callClinit = $rt_eraseClinit(jl_Thread);
    jl_Thread__clinit_();
}
function jl_Thread__init_() {
    var var_0 = new jl_Thread();
    jl_Thread__init_0(var_0);
    return var_0;
}
function jl_Thread__init_1(var_0) {
    var var_1 = new jl_Thread();
    jl_Thread__init_2(var_1, var_0);
    return var_1;
}
function jl_Thread__init_3(var_0) {
    var var_1 = new jl_Thread();
    jl_Thread__init_4(var_1, var_0);
    return var_1;
}
function jl_Thread__init_5(var_0, var_1) {
    var var_2 = new jl_Thread();
    jl_Thread__init_6(var_2, var_0, var_1);
    return var_2;
}
function jl_Thread__init_0($this) {
    jl_Thread_$callClinit();
    jl_Thread__init_6($this, null, null);
}
function jl_Thread__init_2($this, $name) {
    jl_Thread_$callClinit();
    jl_Thread__init_6($this, null, $name);
}
function jl_Thread__init_4($this, $target) {
    jl_Thread_$callClinit();
    jl_Thread__init_6($this, $target, null);
}
function jl_Thread__init_6($this, $target, $name) {
    var var$3;
    jl_Thread_$callClinit();
    jl_Object__init_0($this);
    $this.$finishedLock = jl_Object__init_();
    $this.$alive = 1;
    $this.$name = $name;
    $this.$target = $target;
    var$3 = jl_Thread_nextId;
    jl_Thread_nextId = Long_add(var$3, Long_fromInt(1));
    $this.$id = var$3;
}
function jl_Thread_start($this) {
    otp_Platform_startThread(jl_Thread$start$lambda$_4_0__init_($this));
}
function jl_Thread_runThread($this) {
    var var$1, var$2, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        try {
            jl_Thread_activeCount = jl_Thread_activeCount + 1 | 0;
            jl_Thread_setCurrentThread($this);
            $ptr = 2;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$2 = $$je;
            var$1 = $this.$finishedLock;
            $ptr = 1;

        }
    case 1:
        jl_Object_monitorEnter(var$1);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            try {
                jl_Object_notifyAll($this.$finishedLock);
                jl_Object_monitorExit(var$1);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$2 = $$je;

            }
            jl_Object_monitorExit(var$1);
            $rt_throw(var$2);
        }
        $this.$alive = 0;
        jl_Thread_activeCount = jl_Thread_activeCount - 1 | 0;
        jl_Thread_setCurrentThread(jl_Thread_mainThread);
        $rt_throw(var$2);
    case 2:
        a: {
            try {
                $this.$run();
                if ($rt_suspending()) {
                    break main;
                }
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$2 = $$je;
                break a;

            }
            var$2 = $this.$finishedLock;
            $ptr = 3;
            continue main;
        }
        var$1 = $this.$finishedLock;
        $ptr = 1;
        continue main;
    case 3:
        jl_Object_monitorEnter(var$2);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            try {
                jl_Object_notifyAll($this.$finishedLock);
                jl_Object_monitorExit(var$2);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$1 = $$je;

            }
            jl_Object_monitorExit(var$2);
            $rt_throw(var$1);
        }
        $this.$alive = 0;
        jl_Thread_activeCount = jl_Thread_activeCount - 1 | 0;
        jl_Thread_setCurrentThread(jl_Thread_mainThread);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, $ptr);
}
function jl_Thread_setCurrentThread($thread) {
    jl_Thread_$callClinit();
    if (jl_Thread_currentThread0 !== $thread)
        jl_Thread_currentThread0 = $thread;
    jl_Thread_currentThread0.$timeSliceStart = jl_System_currentTimeMillis();
}
function jl_Thread_run($this) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($this.$target === null)
            return;
        var$1 = $this.$target;
        $ptr = 1;
    case 1:
        var$1.$run();
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function jl_Thread_currentThread() {
    jl_Thread_$callClinit();
    return jl_Thread_currentThread0;
}
function jl_Thread_interrupt($this) {
    $this.$interruptedFlag = 1;
    if ($this.$interruptHandler !== null) {
        $this.$interruptHandler.$interrupted();
        $this.$interruptHandler = null;
    }
}
function jl_Thread_interrupted() {
    var $thread, $result;
    jl_Thread_$callClinit();
    $thread = jl_Thread_currentThread();
    $result = $thread.$interruptedFlag;
    $thread.$interruptedFlag = 0;
    return $result;
}
function jl_Thread_sleep(var$1) {
    var thread = $rt_nativeThread();
    var javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        var result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    var callback = function() {};
    callback.$complete = function(val) {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = function(e) {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    return thread.suspend(function() {
        try {
            jl_Thread_sleep0(var$1, callback);
        } catch($e) {
            callback.$error($rt_exception($e));
        }
    });
}
function jl_Thread_sleep0($millis, $callback) {
    var $current, $handler, $intMillis;
    jl_Thread_$callClinit();
    $current = jl_Thread_currentThread();
    $handler = jl_Thread$SleepHandler__init_($current, $callback);
    $intMillis = Long_ge($millis, Long_fromInt(2147483647)) ? 2147483647 : $millis.lo;
    $handler.$scheduleId = otp_Platform_schedule($handler, $intMillis);
    $current.$interruptHandler = $handler;
}
function jl_Thread_setPriority($this, $newPriority) {
    $this.$priority = $newPriority;
}
function jl_Thread_access$002($x0, $x1) {
    jl_Thread_$callClinit();
    $x0.$interruptedFlag = $x1;
    return $x1;
}
function jl_Thread__clinit_() {
    jl_Thread_mainThread = jl_Thread__init_1($rt_s(20));
    jl_Thread_currentThread0 = jl_Thread_mainThread;
    jl_Thread_nextId = Long_fromInt(1);
    jl_Thread_activeCount = 1;
}
function gj_ContentReceiver() {
}
function gj_Client$getResourceBytes$lambda$_12_0() {
    var a = this; jl_Object.call(a);
    a.$_01 = null;
    a.$_10 = null;
}
function gj_Client$getResourceBytes$lambda$_12_0__init_(var_0, var_1) {
    var var_2 = new gj_Client$getResourceBytes$lambda$_12_0();
    gj_Client$getResourceBytes$lambda$_12_0__init_0(var_2, var_0, var_1);
    return var_2;
}
function gj_Client$getResourceBytes$lambda$_12_0__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$_01 = var$1;
    var$0.$_10 = var$2;
}
function gj_Client$getResourceBytes$lambda$_12_0_gotContent(var$0, var$1) {
    gj_Client_lambda$getResourceBytes$8(var$0.$_01, var$0.$_10, var$1);
}
function gj_Client$getResourceBytes$lambda$_12_0_gotContent$exported$0(var$0, var$1) {
    var$0.$gotContent(var$1);
}
function gj_ErrorCallback() {
}
function gj_Client$getResourceBytes$lambda$_12_1() {
    var a = this; jl_Object.call(a);
    a.$_02 = null;
    a.$_11 = null;
}
function gj_Client$getResourceBytes$lambda$_12_1__init_(var_0, var_1) {
    var var_2 = new gj_Client$getResourceBytes$lambda$_12_1();
    gj_Client$getResourceBytes$lambda$_12_1__init_0(var_2, var_0, var_1);
    return var_2;
}
function gj_Client$getResourceBytes$lambda$_12_1__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$_02 = var$1;
    var$0.$_11 = var$2;
}
function gj_Client$getResourceBytes$lambda$_12_1_gotError(var$0) {
    gj_Client_lambda$getResourceBytes$9(var$0.$_02, var$0.$_11);
}
function gj_Client$getResourceBytes$lambda$_12_1_gotError$exported$0(var$0) {
    var$0.$gotError();
}
function otp_PlatformQueue() {
    jl_Object.call(this);
}
function otp_PlatformQueue_wrap($obj) {
    return $obj;
}
function otp_PlatformQueue_isEmpty$static($this) {
    return $this.length ? 0 : 1;
}
function otp_PlatformQueue_add$static($this, $e) {
    var var$3;
    var$3 = otp_PlatformQueue_wrap($e);
    $this.push(var$3);
}
function otp_PlatformQueue_remove$static($this) {
    return $this.shift();
}
function jl_CharSequence() {
}
function jl_Error() {
    jl_Throwable.call(this);
}
function jl_Error__init_() {
    var var_0 = new jl_Error();
    jl_Error__init_0(var_0);
    return var_0;
}
function jl_Error__init_1(var_0) {
    var var_1 = new jl_Error();
    jl_Error__init_2(var_1, var_0);
    return var_1;
}
function jl_Error__init_3(var_0) {
    var var_1 = new jl_Error();
    jl_Error__init_4(var_1, var_0);
    return var_1;
}
function jl_Error__init_0($this) {
    jl_Throwable__init_0($this);
}
function jl_Error__init_2($this, $message) {
    jl_Throwable__init_2($this, $message);
}
function jl_Error__init_4($this, $cause) {
    jl_Throwable__init_4($this, $cause);
}
function jl_LinkageError() {
    jl_Error.call(this);
}
function jl_LinkageError__init_() {
    var var_0 = new jl_LinkageError();
    jl_LinkageError__init_0(var_0);
    return var_0;
}
function jl_LinkageError__init_1(var_0) {
    var var_1 = new jl_LinkageError();
    jl_LinkageError__init_2(var_1, var_0);
    return var_1;
}
function jl_LinkageError__init_0($this) {
    jl_Error__init_0($this);
}
function jl_LinkageError__init_2($this, $message) {
    jl_Error__init_2($this, $message);
}
function Background() {
    var a = this; g_Actor.call(a);
    a.$xPos = 0.0;
    a.$yPos = 0.0;
    a.$scaleFactor = 0.0;
}
function Background__init_() {
    var var_0 = new Background();
    Background__init_0(var_0);
    return var_0;
}
function Background__init_0($this) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        g_Actor__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $rt_s(21);
        $ptr = 2;
    case 2:
        $this.$setImage1(var$1);
        if ($rt_suspending()) {
            break main;
        }
        $this.$xPos = 0.0;
        $this.$yPos = 0.0;
        $this.$scaleFactor = 0.05;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function Background_addedToWorld($this, $w) {
    $this.$xPos = $this.$getX();
    $this.$yPos = $this.$getY();
}
function Background_act($this) {
    $this.$setLocation($this.$xPos | 0, $this.$yPos | 0);
}
function Background_moveRelative($this, $xChange, $yPos) {
    var $overflow;
    $this.$xPos = $this.$xPos + $xChange * $this.$scaleFactor;
    $this.$yPos = 300.0 - $yPos * $this.$scaleFactor;
    if ($this.$xPos < ( -$this.$getImage1().$getWidth() / 2 | 0)) {
        $overflow = jl_Math_abs(( -$this.$getImage1().$getWidth() / 2 | 0) - $this.$xPos) % 960.0;
        $this.$xPos = (($this.$getImage1().$getWidth() / 2 | 0) + 960 | 0) - $overflow;
    }
}
function Collider() {
    var a = this; g_Actor.call(a);
    a.$yOffset0 = 0;
    a.$s = null;
}
function Collider__init_0(var_0) {
    var var_1 = new Collider();
    Collider__init_(var_1, var_0);
    return var_1;
}
function Collider__init_($this, $s) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$s = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        g_Actor__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$s = $s;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $s, $ptr);
}
function Collider_intersects($this, $other) {
    $this.$setRotation($this.$s.$getRotation());
    return g_Actor_intersects($this, $other);
}
function Collider_addedToWorld($this, $w) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$w = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        $this.$update();
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $w, $ptr);
}
function Collider_update($this, $heightDivisor, $widthDivisor, $alignBottom) {
    var var$4, $width, $height, $image, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$image = $thread.pop();$height = $thread.pop();$width = $thread.pop();var$4 = $thread.pop();$alignBottom = $thread.pop();$widthDivisor = $thread.pop();$heightDivisor = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$4 = $this.$s;
        $ptr = 1;
    case 1:
        $tmp = var$4.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$4 = $tmp;
        $width = jl_Math_max(var$4.$getWidth() / $widthDivisor | 0, 1);
        var$4 = $this.$s;
        $ptr = 2;
    case 2:
        $tmp = var$4.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$4 = $tmp;
        $height = jl_Math_max(var$4.$getHeight() / $heightDivisor | 0, 1);
        if (!$alignBottom) {
            $this.$yOffset0 = 0;
            $image = g_GreenfootImage__init_0($width, $height);
            $this.$setImage($image);
            return;
        }
        var$4 = $this.$s;
        $ptr = 3;
    case 3:
        $tmp = var$4.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$4 = $tmp;
        $this.$yOffset0 = (var$4.$getHeight() / 2 | 0) - ($height / 2 | 0) | 0;
        $image = g_GreenfootImage__init_0($width, $height);
        $this.$setImage($image);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $heightDivisor, $widthDivisor, $alignBottom, var$4, $width, $height, $image, $ptr);
}
function Collider_update0($this) {
    var var$1, var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = 1;
        var$2 = 1;
        var$3 = 0;
        $ptr = 1;
    case 1:
        $this.$update0(var$1, var$2, var$3);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, var$3, $ptr);
}
function Collider_setLocation($this, $x, $y) {
    g_Actor_setLocation($this, $x, $y + $this.$yOffset0 | 0);
}
function otjde_LoadEventTarget() {
}
function otjde_LoadEventTarget_listenLoad$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(22);
    $this.addEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function jl_StringIndexOutOfBoundsException() {
    jl_IndexOutOfBoundsException.call(this);
}
function jl_StringIndexOutOfBoundsException__init_() {
    var var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_0(var_0);
    return var_0;
}
function jl_StringIndexOutOfBoundsException__init_0($this) {
    jl_IndexOutOfBoundsException__init_0($this);
}
function Sound() {
    var a = this; jl_Object.call(a);
    a.$iterator0 = 0;
    a.$soundCopies = null;
}
function Sound__init_0(var_0) {
    var var_1 = new Sound();
    Sound__init_(var_1, var_0);
    return var_1;
}
function Sound__init_($this, $name) {
    var $i, $sound, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$sound = $thread.pop();$i = $thread.pop();$name = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        jl_Object__init_0($this);
        $this.$iterator0 = 0;
        $this.$soundCopies = $rt_createArray(g_GreenfootSound, 32);
        $i = 0;
        if ($i >= 32)
            return;
        $sound = new g_GreenfootSound;
        $ptr = 1;
    case 1:
        g_GreenfootSound__init_($sound, $name);
        if ($rt_suspending()) {
            break main;
        }
        $this.$soundCopies.data[$i] = $sound;
        $i = $i + 1 | 0;
        if ($i >= 32)
            return;
        $sound = new g_GreenfootSound;
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $name, $i, $sound, $ptr);
}
function Sound_playSound($this, $volume) {
    $this.$soundCopies.data[$this.$iterator0].$setVolume($volume);
    $this.$soundCopies.data[$this.$iterator0].$play();
    $this.$iterator0 = $this.$iterator0 + 1 | 0;
    if ($this.$iterator0 >= 32)
        $this.$iterator0 = 0;
}
function otjde_EventListener() {
}
function gj_TouchManager() {
    jl_Object.call(this);
    this.$mouseManager = null;
}
function gj_TouchManager__init_(var_0) {
    var var_1 = new gj_TouchManager();
    gj_TouchManager__init_0(var_1, var_0);
    return var_1;
}
function gj_TouchManager__init_0($this, $mouseManager) {
    jl_Object__init_0($this);
    $this.$mouseManager = $mouseManager;
}
function gj_TouchManager_handleEvent($this, $e) {
    $this.$mouseManager.$handleTouchEvent($e);
}
function gj_TouchManager_handleEvent0($this, var$1) {
    $this.$handleEvent(var$1);
}
function gj_TouchManager_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function jn_ByteOrder() {
    jl_Object.call(this);
    this.$name0 = null;
}
var jn_ByteOrder_BIG_ENDIAN = null;
var jn_ByteOrder_LITTLE_ENDIAN = null;
function jn_ByteOrder_$callClinit() {
    jn_ByteOrder_$callClinit = $rt_eraseClinit(jn_ByteOrder);
    jn_ByteOrder__clinit_();
}
function jn_ByteOrder__init_(var_0) {
    var var_1 = new jn_ByteOrder();
    jn_ByteOrder__init_0(var_1, var_0);
    return var_1;
}
function jn_ByteOrder__init_0($this, $name) {
    jn_ByteOrder_$callClinit();
    jl_Object__init_0($this);
    $this.$name0 = $name;
}
function jn_ByteOrder__clinit_() {
    jn_ByteOrder_BIG_ENDIAN = jn_ByteOrder__init_($rt_s(23));
    jn_ByteOrder_LITTLE_ENDIAN = jn_ByteOrder__init_($rt_s(24));
}
function otci_Base46() {
    jl_Object.call(this);
}
function otci_Base46__init_() {
    var var_0 = new otci_Base46();
    otci_Base46__init_0(var_0);
    return var_0;
}
function otci_Base46__init_0($this) {
    jl_Object__init_0($this);
}
function otci_Base46_decodeUnsigned($seq) {
    var $number, $pos, var$4, var$5, $digit, $hasMore;
    $number = 0;
    $pos = 1;
    while (true) {
        var$4 = $seq.$characters0.data;
        var$5 = $seq.$pointer;
        $seq.$pointer = var$5 + 1 | 0;
        $digit = otci_Base46_decodeDigit(var$4[var$5]);
        $hasMore = ($digit % 2 | 0) != 1 ? 0 : 1;
        $number = $number + $rt_imul($pos, $digit / 2 | 0) | 0;
        $pos = $pos * 46 | 0;
        if (!$hasMore)
            break;
    }
    return $number;
}
function otci_Base46_decode($seq) {
    var $number, $result;
    $number = otci_Base46_decodeUnsigned($seq);
    $result = $number / 2 | 0;
    if ($number % 2 | 0)
        $result =  -$result;
    return $result;
}
function otci_Base46_decodeDigit($c) {
    if ($c < 34)
        return $c - 32 | 0;
    if ($c >= 92)
        return ($c - 32 | 0) - 2 | 0;
    return ($c - 32 | 0) - 1 | 0;
}
function gs_Sound() {
    jl_Object.call(this);
    this.$element = null;
}
function gs_Sound__init_(var_0) {
    var var_1 = new gs_Sound();
    gs_Sound__init_0(var_1, var_0);
    return var_1;
}
function gs_Sound__init_0($this, $element) {
    jl_Object__init_0($this);
    $this.$element = $element;
}
function gs_Sound_play($this) {
    $this.$element.play();
}
function gs_Sound_loop($this) {
    var var$1, var$2;
    var$1 = $this.$element;
    var$2 = !!1;
    var$1.loop = var$2;
    $this.$element.play();
}
function gs_Sound_stop($this) {
    var var$1, var$2;
    $this.$element.pause();
    var$1 = $this.$element;
    var$2 = 0.0;
    var$1.currentTime = var$2;
}
function gs_Sound_setVolume($this, $vol) {
    var var$2, var$3;
    var$2 = $this.$element;
    var$3 = $vol / 100.0;
    var$2.volume = var$3;
}
function jl_AbstractStringBuilder() {
    var a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
function jl_AbstractStringBuilder__init_0() {
    var var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_1(var_0);
    return var_0;
}
function jl_AbstractStringBuilder__init_(var_0) {
    var var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_2(var_1, var_0);
    return var_1;
}
function jl_AbstractStringBuilder__init_1($this) {
    jl_AbstractStringBuilder__init_2($this, 16);
}
function jl_AbstractStringBuilder__init_2($this, $capacity) {
    jl_Object__init_0($this);
    $this.$buffer = $rt_createCharArray($capacity);
}
function jl_AbstractStringBuilder_append($this, $string) {
    return $this.$insert($this.$length0, $string);
}
function jl_AbstractStringBuilder_insert($this, $index, $string) {
    var $i, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length0) {
        if ($string === null)
            $string = $rt_s(25);
        else if ($string.$isEmpty())
            return $this;
        $this.$ensureCapacity($this.$length0 + $string.$length() | 0);
        $i = $this.$length0 - 1 | 0;
        while ($i >= $index) {
            $this.$buffer.data[$i + $string.$length() | 0] = $this.$buffer.data[$i];
            $i = $i + (-1) | 0;
        }
        $this.$length0 = $this.$length0 + $string.$length() | 0;
        $i = 0;
        while ($i < $string.$length()) {
            var$4 = $this.$buffer.data;
            var$5 = $index + 1 | 0;
            var$4[$index] = $string.$charAt($i);
            $i = $i + 1 | 0;
            $index = var$5;
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_AbstractStringBuilder_append0($this, $value) {
    return $this.$append2($value, 10);
}
function jl_AbstractStringBuilder_append1($this, $value, $radix) {
    return $this.$insert0($this.$length0, $value, $radix);
}
function jl_AbstractStringBuilder_insert0($this, $target, $value, $radix) {
    var $positive, var$5, var$6, $pos, $sz, $posLimit, var$10, var$11;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value;
    }
    if ($value < $radix) {
        if ($positive)
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
        else {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
            var$5 = $this.$buffer.data;
            var$6 = $target + 1 | 0;
            var$5[$target] = 45;
            $target = var$6;
        }
        $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
    } else {
        $pos = 1;
        $sz = 1;
        $posLimit = 2147483647 / $radix | 0;
        a: {
            while (true) {
                var$10 = $rt_imul($pos, $radix);
                if (var$10 > $value) {
                    var$10 = $pos;
                    break a;
                }
                $sz = $sz + 1 | 0;
                if (var$10 > $posLimit)
                    break;
                $pos = var$10;
            }
        }
        if (!$positive)
            $sz = $sz + 1 | 0;
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
        if ($positive)
            var$11 = $target;
        else {
            var$5 = $this.$buffer.data;
            var$11 = $target + 1 | 0;
            var$5[$target] = 45;
        }
        while (var$10 > 0) {
            var$5 = $this.$buffer.data;
            var$6 = var$11 + 1 | 0;
            var$5[var$11] = jl_Character_forDigit($value / var$10 | 0, $radix);
            $value = $value % var$10 | 0;
            var$10 = var$10 / $radix | 0;
            var$11 = var$6;
        }
    }
    return $this;
}
function jl_AbstractStringBuilder_append2($this, $value) {
    return $this.$insert1($this.$length0, $value);
}
function jl_AbstractStringBuilder_insert1($this, $target, $value) {
    var var$3, var$4, var$5, $number, $mantissa, $exp, $negative, $intPart, $sz, $digits, $zeros, var$14, $pos, $i, $intDigit;
    if ($value === 0.0) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
        var$3 = $this.$buffer.data;
        var$4 = $target + 1 | 0;
        var$3[$target] = 48;
        var$3 = $this.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 46;
        $this.$buffer.data[var$5] = 48;
        return $this;
    }
    if ($value === 0.0) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 4 | 0);
        var$3 = $this.$buffer.data;
        var$4 = $target + 1 | 0;
        var$3[$target] = 45;
        var$3 = $this.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 48;
        var$3 = $this.$buffer.data;
        var$4 = var$5 + 1 | 0;
        var$3[var$5] = 46;
        $this.$buffer.data[var$4] = 48;
        return $this;
    }
    if (isNaN($value) ? 1 : 0) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
        var$3 = $this.$buffer.data;
        var$4 = $target + 1 | 0;
        var$3[$target] = 78;
        var$3 = $this.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 97;
        $this.$buffer.data[var$5] = 78;
        return $this;
    }
    if (!isFinite($value) ? 1 : 0) {
        if ($value > 0.0) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 8 | 0);
            var$4 = $target;
        } else {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 9 | 0);
            var$3 = $this.$buffer.data;
            var$4 = $target + 1 | 0;
            var$3[$target] = 45;
        }
        var$3 = $this.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 73;
        var$3 = $this.$buffer.data;
        var$4 = var$5 + 1 | 0;
        var$3[var$5] = 110;
        var$3 = $this.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 102;
        var$3 = $this.$buffer.data;
        var$4 = var$5 + 1 | 0;
        var$3[var$5] = 105;
        var$3 = $this.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 110;
        var$3 = $this.$buffer.data;
        var$4 = var$5 + 1 | 0;
        var$3[var$5] = 105;
        var$3 = $this.$buffer.data;
        var$5 = var$4 + 1 | 0;
        var$3[var$4] = 116;
        $this.$buffer.data[var$5] = 121;
        return $this;
    }
    jl_AbstractStringBuilder$Constants_$callClinit();
    $number = jl_AbstractStringBuilder$Constants_doubleAnalysisResult;
    otcit_DoubleAnalyzer_analyze($value, $number);
    $mantissa = $number.$mantissa;
    $exp = $number.$exponent;
    $negative = $number.$sign;
    $intPart = 1;
    $sz = 1;
    if ($negative)
        $sz = 2;
    $digits = 18;
    $zeros = jl_AbstractStringBuilder_trailingDecimalZeros($mantissa);
    if ($zeros > 0)
        $digits = $digits - $zeros | 0;
    if ($exp < 7 && $exp >= (-3)) {
        if ($exp >= 0) {
            $intPart = $exp + 1 | 0;
            $digits = jl_Math_max($digits, $intPart + 1 | 0);
            $exp = 0;
        } else if ($exp < 0) {
            $mantissa = Long_div($mantissa, jl_AbstractStringBuilder$Constants_longPowersOfTen.data[ -$exp]);
            $digits = $digits - $exp | 0;
            $exp = 0;
        }
    }
    if ($exp) {
        $sz = $sz + 2 | 0;
        if (!($exp > (-10) && $exp < 10))
            $sz = $sz + 1 | 0;
        if (!($exp > (-100) && $exp < 100))
            $sz = $sz + 1 | 0;
        if ($exp < 0)
            $sz = $sz + 1 | 0;
    }
    if ($exp && $digits == $intPart)
        $digits = $digits + 1 | 0;
    var$4 = $sz + $digits | 0;
    jl_AbstractStringBuilder_insertSpace($this, $target, $target + var$4 | 0);
    if (!$negative)
        var$14 = $target;
    else {
        var$3 = $this.$buffer.data;
        var$14 = $target + 1 | 0;
        var$3[$target] = 45;
    }
    $pos = new Long(1569325056, 23283064);
    $i = 0;
    while ($i < $digits) {
        if (Long_le($pos, Long_ZERO))
            $intDigit = 0;
        else {
            $intDigit = Long_div($mantissa, $pos).lo;
            $mantissa = Long_rem($mantissa, $pos);
        }
        var$3 = $this.$buffer.data;
        var$5 = var$14 + 1 | 0;
        var$3[var$14] = (48 + $intDigit | 0) & 65535;
        $intPart = $intPart + (-1) | 0;
        if ($intPart)
            var$14 = var$5;
        else {
            var$3 = $this.$buffer.data;
            var$14 = var$5 + 1 | 0;
            var$3[var$5] = 46;
        }
        $pos = Long_div($pos, Long_fromInt(10));
        $i = $i + 1 | 0;
    }
    if ($exp) {
        var$3 = $this.$buffer.data;
        var$4 = var$14 + 1 | 0;
        var$3[var$14] = 69;
        if ($exp >= 0)
            var$5 = var$4;
        else {
            $exp =  -$exp;
            var$3 = $this.$buffer.data;
            var$5 = var$4 + 1 | 0;
            var$3[var$4] = 45;
        }
        if ($exp >= 100) {
            var$3 = $this.$buffer.data;
            var$4 = var$5 + 1 | 0;
            var$3[var$5] = (48 + ($exp / 100 | 0) | 0) & 65535;
            $exp = $exp % 100 | 0;
            var$3 = $this.$buffer.data;
            var$14 = var$4 + 1 | 0;
            var$3[var$4] = (48 + ($exp / 10 | 0) | 0) & 65535;
        } else if ($exp < 10)
            var$14 = var$5;
        else {
            var$3 = $this.$buffer.data;
            var$14 = var$5 + 1 | 0;
            var$3[var$5] = (48 + ($exp / 10 | 0) | 0) & 65535;
        }
        $this.$buffer.data[var$14] = (48 + ($exp % 10 | 0) | 0) & 65535;
    }
    return $this;
}
function jl_AbstractStringBuilder_trailingDecimalZeros($n) {
    var $zeros, $result, $bit, $i;
    $zeros = Long_fromInt(1);
    $result = 0;
    $bit = 16;
    jl_AbstractStringBuilder$Constants_$callClinit();
    $i = jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data.length - 1 | 0;
    while ($i >= 0) {
        if (Long_eq(Long_rem($n, Long_mul($zeros, jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data[$i])), Long_ZERO)) {
            $result = $result | $bit;
            $zeros = Long_mul($zeros, jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data[$i]);
        }
        $bit = $bit >>> 1;
        $i = $i + (-1) | 0;
    }
    return $result;
}
function jl_AbstractStringBuilder_append3($this, $c) {
    return $this.$insert2($this.$length0, $c);
}
function jl_AbstractStringBuilder_insert2($this, $index, $c) {
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    $this.$buffer.data[$index] = $c;
    return $this;
}
function jl_AbstractStringBuilder_append4($this, $obj) {
    return $this.$insert3($this.$length0, $obj);
}
function jl_AbstractStringBuilder_insert3($this, $index, $obj) {
    return $this.$insert($index, $obj === null ? $rt_s(25) : $obj.$toString());
}
function jl_AbstractStringBuilder_ensureCapacity($this, $capacity) {
    var $newLength, var$3, var$4;
    if ($this.$buffer.data.length >= $capacity)
        return;
    if ($this.$buffer.data.length >= 1073741823)
        $newLength = 2147483647;
    else {
        var$3 = $this.$buffer.data.length * 2 | 0;
        var$4 = 5;
        $newLength = jl_Math_max($capacity, jl_Math_max(var$3, var$4));
    }
    $this.$buffer = ju_Arrays_copyOf($this.$buffer, $newLength);
}
function jl_AbstractStringBuilder_toString($this) {
    return jl_String__init_0($this.$buffer, 0, $this.$length0);
}
function jl_AbstractStringBuilder_length($this) {
    return $this.$length0;
}
function jl_AbstractStringBuilder_getChars($this, $srcBegin, $srcEnd, $dst, $dstBegin) {
    var var$5, var$6, var$7, var$8;
    if ($srcBegin > $srcEnd)
        $rt_throw(jl_IndexOutOfBoundsException__init_1($rt_s(26)));
    while ($srcBegin < $srcEnd) {
        var$5 = $dst.data;
        var$6 = $dstBegin + 1 | 0;
        var$7 = $this.$buffer.data;
        var$8 = $srcBegin + 1 | 0;
        var$5[$dstBegin] = var$7[$srcBegin];
        $dstBegin = var$6;
        $srcBegin = var$8;
    }
}
function jl_AbstractStringBuilder_setLength($this, $newLength) {
    $this.$length0 = $newLength;
}
function jl_AbstractStringBuilder_insertSpace($this, $start, $end) {
    var $sz, $i;
    $sz = $this.$length0 - $start | 0;
    $this.$ensureCapacity(($this.$length0 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        $this.$buffer.data[$end + $i | 0] = $this.$buffer.data[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
}
function jl_Appendable() {
}
function jl_StringBuilder() {
    jl_AbstractStringBuilder.call(this);
}
function jl_StringBuilder__init_() {
    var var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_0(var_0);
    return var_0;
}
function jl_StringBuilder__init_0($this) {
    jl_AbstractStringBuilder__init_1($this);
}
function jl_StringBuilder_append1($this, $string) {
    jl_AbstractStringBuilder_append($this, $string);
    return $this;
}
function jl_StringBuilder_append2($this, $value) {
    jl_AbstractStringBuilder_append0($this, $value);
    return $this;
}
function jl_StringBuilder_append3($this, $value) {
    jl_AbstractStringBuilder_append2($this, $value);
    return $this;
}
function jl_StringBuilder_append($this, $c) {
    jl_AbstractStringBuilder_append3($this, $c);
    return $this;
}
function jl_StringBuilder_append0($this, $obj) {
    jl_AbstractStringBuilder_append4($this, $obj);
    return $this;
}
function jl_StringBuilder_insert($this, $target, $value) {
    jl_AbstractStringBuilder_insert1($this, $target, $value);
    return $this;
}
function jl_StringBuilder_insert0($this, $index, $obj) {
    jl_AbstractStringBuilder_insert3($this, $index, $obj);
    return $this;
}
function jl_StringBuilder_insert1($this, $index, $c) {
    jl_AbstractStringBuilder_insert2($this, $index, $c);
    return $this;
}
function jl_StringBuilder_insert2($this, $index, $string) {
    jl_AbstractStringBuilder_insert($this, $index, $string);
    return $this;
}
function jl_StringBuilder_setLength($this, var$1) {
    jl_AbstractStringBuilder_setLength($this, var$1);
}
function jl_StringBuilder_getChars($this, var$1, var$2, var$3, var$4) {
    jl_AbstractStringBuilder_getChars($this, var$1, var$2, var$3, var$4);
}
function jl_StringBuilder_length($this) {
    return jl_AbstractStringBuilder_length($this);
}
function jl_StringBuilder_toString($this) {
    return jl_AbstractStringBuilder_toString($this);
}
function jl_StringBuilder_ensureCapacity($this, var$1) {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
}
function jl_StringBuilder_insert3($this, var$1, var$2) {
    return $this.$insert4(var$1, var$2);
}
function jl_StringBuilder_insert4($this, var$1, var$2) {
    return $this.$insert5(var$1, var$2);
}
function jl_StringBuilder_insert5($this, var$1, var$2) {
    return $this.$insert6(var$1, var$2);
}
function jl_StringBuilder_insert6($this, var$1, var$2) {
    return $this.$insert7(var$1, var$2);
}
function ju_ConcurrentModificationException() {
    jl_RuntimeException.call(this);
}
function ju_ConcurrentModificationException__init_() {
    var var_0 = new ju_ConcurrentModificationException();
    ju_ConcurrentModificationException__init_0(var_0);
    return var_0;
}
function ju_ConcurrentModificationException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function NonLiving() {
    Entity.call(this);
}
function NonLiving__init_() {
    var var_0 = new NonLiving();
    NonLiving__init_0(var_0);
    return var_0;
}
function NonLiving__init_0($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Entity__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function Building() {
    var a = this; NonLiving.call(a);
    a.$width0 = 0;
    a.$height0 = 0;
    a.$track = null;
    a.$disableImage = 0;
    a.$first = 0;
    a.$bumpList = null;
    a.$ogImage = null;
}
function Building__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new Building();
    Building__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function Building__init_1(var_0, var_1) {
    var var_2 = new Building();
    Building__init_2(var_2, var_0, var_1);
    return var_2;
}
function Building__init_0($this, $width, $height, $disableImage, $first) {
    var var$5, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$5 = $thread.pop();$first = $thread.pop();$disableImage = $thread.pop();$height = $thread.pop();$width = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        NonLiving__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$width0 = jl_Math_max($width, 80);
        $this.$height0 = $height;
        $this.$bumpList = ju_ArrayList__init_();
        $this.$ogImage = $this.$getHighlights();
        $ptr = 2;
    case 2:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$5 = $tmp;
        $this.$setImage(var$5);
        $this.$track = Track__init_();
        $this.$disableImage = $disableImage;
        $this.$first = $first;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $width, $height, $disableImage, $first, var$5, $ptr);
}
function Building__init_2($this, $width, $height) {
    var var$3, var$4, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();$height = $thread.pop();$width = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$3 = 0;
        var$4 = 0;
        $ptr = 1;
    case 1:
        Building__init_0($this, $width, $height, var$3, var$4);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $width, $height, var$3, var$4, $ptr);
}
function Building_addedToWorld($this, $w) {
    var var$2, var$3, var$4, var$5, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$w = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Entity_addedToWorld($this, $w);
        if ($rt_suspending()) {
            break main;
        }
        if ($this.$disableImage) {
            $this.$ogImage = $this.$getHighlights();
            $ptr = 2;
            continue main;
        }
        var$2 = new BuildingImage;
        var$3 = $this.$first;
        $ptr = 3;
        continue main;
    case 2:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $tmp;
        $this.$setImage(var$2);
        return;
    case 3:
        BuildingImage__init_(var$2, $this, var$3);
        if ($rt_suspending()) {
            break main;
        }
        var$4 = 0.0;
        var$5 = 0.0;
        $ptr = 4;
    case 4:
        $w.$addObject1(var$2, var$4, var$5);
        if ($rt_suspending()) {
            break main;
        }
        $this.$ogImage = $this.$getHighlights();
        $ptr = 2;
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $w, var$2, var$3, var$4, var$5, $ptr);
}
function Building_getHighlights($this) {
    var $rect, $paintX, $n, $arr, $i, $j, var$7, $temp, var$9, var$10, $bump, $bumpX;
    $rect = g_GreenfootImage__init_0($this.$width0, $this.$height0);
    if ($this.$getScrollableWorld() !== null && !$this.$getScrollableWorld().$highlightsEnabled())
        return $rect;
    $rect.$setColor(g_Color__init_(247, 101, 174));
    $paintX = 0;
    $n = $this.$bumpList.$size();
    $arr = $rt_createArray(Building, $n);
    $i = 0;
    while ($i < $n) {
        $arr.data[$i] = $this.$bumpList.$get0($i);
        $i = $i + 1 | 0;
    }
    $i = 0;
    while ($i < ($n - 1 | 0)) {
        $j = 0;
        while ($j < (($n - $i | 0) - 1 | 0)) {
            var$7 = $arr.data;
            if (var$7[$j].$getExactX() > var$7[$j + 1 | 0].$getExactX()) {
                $temp = var$7[$j];
                var$7[$j] = var$7[$j + 1 | 0];
                var$7[$j + 1 | 0] = $temp;
            }
            $j = $j + 1 | 0;
        }
        $i = $i + 1 | 0;
    }
    var$7 = $arr.data;
    var$9 = var$7.length;
    var$10 = 0;
    while (var$10 < var$9) {
        $bump = var$7[var$10];
        $bumpX = $bump.$getExactX() - $this.$getExactX() + ($this.$width0 / 2 | 0);
        $rect.$fillRect($paintX, 0, $bumpX - ($bump.$getWidth() / 2 | 0) - $paintX | 0, 5);
        $paintX = $bumpX + ($bump.$getWidth() / 2 | 0) | 0;
        var$10 = var$10 + 1 | 0;
    }
    $rect.$fillRect($paintX, 0, $this.$width0 - $paintX | 0, 5);
    $rect.$setTransparency(128);
    return $rect;
}
function Building_resetImage($this) {
    return $this.$ogImage;
}
function Building_getWidth($this) {
    return $this.$width0;
}
function Building_getHeight($this) {
    return $this.$height0;
}
function Building_createBump($this, $xPos, $bumpWidth, $bumpHeight) {
    var $bump, var$5, var$6, var$7, var$8, var$9, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$9 = $thread.pop();var$8 = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();$bump = $thread.pop();$bumpHeight = $thread.pop();$bumpWidth = $thread.pop();$xPos = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $bump = new Building;
        var$5 = 1;
        var$6 = 0;
        $ptr = 1;
    case 1:
        Building__init_0($bump, $bumpWidth, $bumpHeight, var$5, var$6);
        if ($rt_suspending()) {
            break main;
        }
        var$7 = $this.$getScrollableWorld();
        var$8 = $this.$getExactX() - ($this.$width0 / 2 | 0) + $xPos;
        var$9 = $this.$getExactY() - ($this.$height0 / 2 | 0) - ($bumpHeight / 2 | 0);
        $ptr = 2;
    case 2:
        var$7.$addObject1($bump, var$8, var$9);
        if ($rt_suspending()) {
            break main;
        }
        $this.$bumpList.$add0($bump);
        $this.$ogImage = $this.$getHighlights();
        $ptr = 3;
    case 3:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$7 = $tmp;
        $this.$setImage(var$7);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $xPos, $bumpWidth, $bumpHeight, $bump, var$5, var$6, var$7, var$8, var$9, $ptr);
}
function ju_Hashtable$1() {
    jl_Object.call(this);
}
function ju_Hashtable$1__init_() {
    var var_0 = new ju_Hashtable$1();
    ju_Hashtable$1__init_0(var_0);
    return var_0;
}
function ju_Hashtable$1__init_0($this) {
    jl_Object__init_0($this);
}
function ju_Iterator() {
}
function ju_Hashtable$2() {
    jl_Object.call(this);
}
function ju_Hashtable$2__init_() {
    var var_0 = new ju_Hashtable$2();
    ju_Hashtable$2__init_0(var_0);
    return var_0;
}
function ju_Hashtable$2__init_0($this) {
    jl_Object__init_0($this);
}
function ju_Map$Entry() {
}
function jl_Cloneable() {
}
function ju_MapEntry() {
    var a = this; jl_Object.call(a);
    a.$key = null;
    a.$value0 = null;
}
function ju_MapEntry__init_(var_0, var_1) {
    var var_2 = new ju_MapEntry();
    ju_MapEntry__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_MapEntry__init_0($this, $theKey, $theValue) {
    jl_Object__init_0($this);
    $this.$key = $theKey;
    $this.$value0 = $theValue;
}
function ju_MapEntry_getKey($this) {
    return $this.$key;
}
function ju_MapEntry_getValue($this) {
    return $this.$value0;
}
function ju_Hashtable$Entry() {
    var a = this; ju_MapEntry.call(a);
    a.$next0 = null;
    a.$hashcode = 0;
}
function ju_Hashtable$Entry__init_(var_0, var_1) {
    var var_2 = new ju_Hashtable$Entry();
    ju_Hashtable$Entry__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_Hashtable$Entry__init_0($this, $theKey, $theValue) {
    ju_MapEntry__init_0($this, $theKey, $theValue);
    $this.$hashcode = $theKey.$hashCode();
}
function ju_Hashtable$Entry_getKeyHash($this) {
    return $this.$key.$hashCode();
}
function ju_Hashtable$Entry_equalsKey($this, $aKey, $hash) {
    return $this.$hashcode == $aKey.$hashCode() && $this.$key.$equals($aKey) ? 1 : 0;
}
function g_MouseInfoVisitor() {
    jl_Object.call(this);
}
function g_MouseInfoVisitor__init_() {
    var var_0 = new g_MouseInfoVisitor();
    g_MouseInfoVisitor__init_0(var_0);
    return var_0;
}
function g_MouseInfoVisitor__init_0($this) {
    jl_Object__init_0($this);
}
function g_MouseInfoVisitor_setActor($info, $actor) {
    $info.$setActor($actor);
}
function g_MouseInfoVisitor_setLoc($info, $x, $y) {
    $info.$setLoc($x, $y);
}
function g_MouseInfoVisitor_setButton($info, $button) {
    $info.$setButton($button);
}
function g_MouseInfoVisitor_newMouseInfo() {
    return g_MouseInfo__init_();
}
function g_MouseInfoVisitor_setClickCount($mouseInfo, $clickCount) {
    $mouseInfo.$setClickCount($clickCount);
}
function jl_ReflectiveOperationException() {
    jl_Exception.call(this);
}
function jl_ReflectiveOperationException__init_() {
    var var_0 = new jl_ReflectiveOperationException();
    jl_ReflectiveOperationException__init_0(var_0);
    return var_0;
}
function jl_ReflectiveOperationException__init_0($this) {
    jl_Exception__init_0($this);
}
function gc_CollisionQuery() {
}
function gc_GOCollisionQuery() {
    jl_Object.call(this);
}
function gc_GOCollisionQuery__init_() {
    var var_0 = new gc_GOCollisionQuery();
    gc_GOCollisionQuery__init_0(var_0);
    return var_0;
}
function gc_GOCollisionQuery__init_0($this) {
    jl_Object__init_0($this);
}
function jnc_CoderMalfunctionError() {
    jl_Error.call(this);
}
function jnc_CoderMalfunctionError__init_(var_0) {
    var var_1 = new jnc_CoderMalfunctionError();
    jnc_CoderMalfunctionError__init_0(var_1, var_0);
    return var_1;
}
function jnc_CoderMalfunctionError__init_0($this, $cause) {
    jl_Error__init_4($this, $cause);
}
function gj_Client$_init_$lambda$_1_3() {
    jl_Object.call(this);
    this.$_03 = null;
}
function gj_Client$_init_$lambda$_1_3__init_(var_0) {
    var var_1 = new gj_Client$_init_$lambda$_1_3();
    gj_Client$_init_$lambda$_1_3__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$_init_$lambda$_1_3__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_03 = var$1;
}
function gj_Client$_init_$lambda$_1_3_handleEvent(var$0, var$1) {
    gj_Client$_init_$lambda$_1_3_handleEvent0(var$0, var$1);
}
function gj_Client$_init_$lambda$_1_3_handleEvent0(var$0, var$1) {
    gj_Client_lambda$new$4(var$0.$_03, var$1);
}
function gj_Client$_init_$lambda$_1_3_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function gj_Client$_init_$lambda$_1_2() {
    jl_Object.call(this);
    this.$_04 = null;
}
function gj_Client$_init_$lambda$_1_2__init_(var_0) {
    var var_1 = new gj_Client$_init_$lambda$_1_2();
    gj_Client$_init_$lambda$_1_2__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$_init_$lambda$_1_2__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_04 = var$1;
}
function gj_Client$_init_$lambda$_1_2_handleEvent(var$0, var$1) {
    gj_Client_lambda$new$3(var$0.$_04, var$1);
}
function gj_Client$_init_$lambda$_1_2_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function gj_Client$_init_$lambda$_1_1() {
    jl_Object.call(this);
    this.$_05 = null;
}
function gj_Client$_init_$lambda$_1_1__init_(var_0) {
    var var_1 = new gj_Client$_init_$lambda$_1_1();
    gj_Client$_init_$lambda$_1_1__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$_init_$lambda$_1_1__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_05 = var$1;
}
function gj_Client$_init_$lambda$_1_1_handleEvent(var$0, var$1) {
    gj_Client_lambda$new$2(var$0.$_05, var$1);
}
function gj_Client$_init_$lambda$_1_1_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function Text() {
    UI.call(this);
}
function Text__init_() {
    var var_0 = new Text();
    Text__init_0(var_0);
    return var_0;
}
function Text__init_0($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        UI__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function Stat() {
    var a = this; Text.call(a);
    a.$transparency = 0;
    a.$stat = 0;
    a.$statName = null;
}
var Stat_calibri = null;
var Stat_white = null;
function Stat_$callClinit() {
    Stat_$callClinit = $rt_eraseClinit(Stat);
    Stat__clinit_();
}
function Stat__init_0(var_0) {
    var var_1 = new Stat();
    Stat__init_(var_1, var_0);
    return var_1;
}
function Stat__init_($this, $statName) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$statName = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        Stat_$callClinit();
        $ptr = 1;
    case 1:
        Text__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$transparency = 255;
        $this.$stat = 0;
        $this.$statName = $statName;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $statName, $ptr);
}
function Stat_act($this) {
    $this.$setImage($this.$updateStat());
}
function Stat_updateStat($this) {
    var $image, var$2, var$3, var$4;
    $image = g_GreenfootImage__init_0(200, 256);
    $image.$setColor(Stat_white);
    $image.$setFont(Stat_calibri);
    var$2 = $this.$statName;
    var$3 = $this.$stat;
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append2(jl_StringBuilder_append0(var$4, var$2), var$3);
    $image.$drawString(jl_StringBuilder_toString(var$4), 0, 221);
    $image.$setTransparency($this.$transparency);
    return $image;
}
function Stat_getStat($this) {
    return $this.$stat;
}
function Stat_increaseStat($this, $increase) {
    $this.$stat = $this.$stat + $increase | 0;
}
function Stat_setStat($this, $newScore) {
    $this.$stat = $newScore;
}
function Stat__clinit_() {
    Stat_calibri = g_Font__init_($rt_s(27), 0, 0, 18);
    Stat_white = g_Color__init_(255, 255, 255);
}
function gci_ActorNode() {
    var a = this; jl_Object.call(a);
    a.$actor = null;
    a.$node = null;
    a.$next1 = null;
    a.$prev = null;
    a.$mark = 0;
}
function gci_ActorNode__init_(var_0, var_1) {
    var var_2 = new gci_ActorNode();
    gci_ActorNode__init_0(var_2, var_0, var_1);
    return var_2;
}
function gci_ActorNode__init_0($this, $actor, $node) {
    var $first;
    jl_Object__init_0($this);
    $this.$actor = $actor;
    $this.$node = $node;
    $first = gci_IBSPColChecker_getNodeForActor($actor);
    $this.$next1 = $first;
    gci_IBSPColChecker_setNodeForActor($actor, $this);
    if ($this.$next1 !== null)
        $this.$next1.$prev = $this;
    $this.$mark = 1;
}
function gci_ActorNode_clearMark($this) {
    $this.$mark = 0;
}
function gci_ActorNode_mark($this) {
    $this.$mark = 1;
}
function gci_ActorNode_checkMark($this) {
    var $markVal;
    $markVal = $this.$mark;
    $this.$mark = 0;
    return $markVal;
}
function gci_ActorNode_getBSPNode($this) {
    return $this.$node;
}
function gci_ActorNode_getNext($this) {
    return $this.$next1;
}
function gci_ActorNode_remove($this) {
    gci_ActorNode_removed($this);
    gci_BSPNode_actorRemoved($this.$node, $this.$actor);
}
function gci_ActorNode_removed($this) {
    if ($this.$prev !== null)
        $this.$prev.$next1 = $this.$next1;
    else
        gci_IBSPColChecker_setNodeForActor($this.$actor, $this.$next1);
    if ($this.$next1 !== null)
        $this.$next1.$prev = $this.$prev;
}
function ju_StringTokenizer() {
    var a = this; jl_Object.call(a);
    a.$string = null;
    a.$delimiters = null;
    a.$returnDelimiters = 0;
    a.$position0 = 0;
}
function ju_StringTokenizer__init_(var_0, var_1) {
    var var_2 = new ju_StringTokenizer();
    ju_StringTokenizer__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_StringTokenizer__init_1(var_0, var_1, var_2) {
    var var_3 = new ju_StringTokenizer();
    ju_StringTokenizer__init_2(var_3, var_0, var_1, var_2);
    return var_3;
}
function ju_StringTokenizer__init_0($this, $string, $delimiters) {
    ju_StringTokenizer__init_2($this, $string, $delimiters, 0);
}
function ju_StringTokenizer__init_2($this, $string, $delimiters, $returnDelimiters) {
    jl_Object__init_0($this);
    if ($string === null)
        $rt_throw(jl_NullPointerException__init_());
    $this.$string = $string;
    $this.$delimiters = $delimiters;
    $this.$returnDelimiters = $returnDelimiters;
    $this.$position0 = 0;
}
function ju_StringTokenizer_countTokens($this) {
    var $count, $inToken, $i, $length;
    $count = 0;
    $inToken = 0;
    $i = $this.$position0;
    $length = $this.$string.$length();
    while ($i < $length) {
        if ($this.$delimiters.$indexOf($this.$string.$charAt($i), 0) < 0)
            $inToken = 1;
        else {
            if ($this.$returnDelimiters)
                $count = $count + 1 | 0;
            if ($inToken) {
                $count = $count + 1 | 0;
                $inToken = 0;
            }
        }
        $i = $i + 1 | 0;
    }
    if ($inToken)
        $count = $count + 1 | 0;
    return $count;
}
function ju_StringTokenizer_hasMoreTokens($this) {
    var $length, $i;
    if ($this.$delimiters === null)
        $rt_throw(jl_NullPointerException__init_());
    $length = $this.$string.$length();
    if ($this.$position0 < $length) {
        if ($this.$returnDelimiters)
            return 1;
        $i = $this.$position0;
        while ($i < $length) {
            if ($this.$delimiters.$indexOf($this.$string.$charAt($i), 0) == (-1))
                return 1;
            $i = $i + 1 | 0;
        }
    }
    return 0;
}
function ju_StringTokenizer_nextToken($this) {
    var $i, $length, var$3, var$4, var$5;
    if ($this.$delimiters === null)
        $rt_throw(jl_NullPointerException__init_());
    $i = $this.$position0;
    $length = $this.$string.$length();
    if ($i < $length) {
        if ($this.$returnDelimiters) {
            if ($this.$delimiters.$indexOf($this.$string.$charAt($this.$position0), 0) >= 0) {
                var$3 = $this.$string;
                var$4 = $this.$position0;
                $this.$position0 = var$4 + 1 | 0;
                return jl_String_valueOf(var$3.$charAt(var$4));
            }
            $this.$position0 = $this.$position0 + 1 | 0;
            while ($this.$position0 < $length) {
                if ($this.$delimiters.$indexOf($this.$string.$charAt($this.$position0), 0) >= 0)
                    return $this.$string.$substring($i, $this.$position0);
                $this.$position0 = $this.$position0 + 1 | 0;
            }
            return $this.$string.$substring0($i);
        }
        while (true) {
            var$5 = $rt_compare($i, $length);
            if (var$5 >= 0)
                break;
            if ($this.$delimiters.$indexOf($this.$string.$charAt($i), 0) < 0)
                break;
            $i = $i + 1 | 0;
        }
        $this.$position0 = $i;
        if (var$5 < 0) {
            $this.$position0 = $this.$position0 + 1 | 0;
            while ($this.$position0 < $length) {
                if ($this.$delimiters.$indexOf($this.$string.$charAt($this.$position0), 0) >= 0)
                    return $this.$string.$substring($i, $this.$position0);
                $this.$position0 = $this.$position0 + 1 | 0;
            }
            return $this.$string.$substring0($i);
        }
    }
    $rt_throw(ju_NoSuchElementException__init_());
}
function jn_Buffer() {
    var a = this; jl_Object.call(a);
    a.$capacity = 0;
    a.$position1 = 0;
    a.$limit = 0;
    a.$mark0 = 0;
}
function jn_Buffer__init_(var_0) {
    var var_1 = new jn_Buffer();
    jn_Buffer__init_0(var_1, var_0);
    return var_1;
}
function jn_Buffer__init_0($this, $capacity) {
    jl_Object__init_0($this);
    $this.$mark0 = (-1);
    $this.$capacity = $capacity;
    $this.$limit = $capacity;
}
function jn_Buffer_position($this) {
    return $this.$position1;
}
function jn_Buffer_position0($this, $newPosition) {
    if ($newPosition >= 0 && $newPosition <= $this.$limit) {
        $this.$position1 = $newPosition;
        if ($newPosition < $this.$mark0)
            $this.$mark0 = 0;
        return $this;
    }
    $rt_throw(jl_IllegalArgumentException__init_(jl_StringBuilder__init_().$append($rt_s(28)).$append3($newPosition).$append($rt_s(29)).$append3($this.$limit).$append($rt_s(30)).$toString()));
}
function jn_Buffer_clear($this) {
    $this.$position1 = 0;
    $this.$limit = $this.$capacity;
    $this.$mark0 = (-1);
    return $this;
}
function jn_Buffer_remaining($this) {
    return $this.$limit - $this.$position1 | 0;
}
function jn_Buffer_hasRemaining($this) {
    return $this.$position1 >= $this.$limit ? 0 : 1;
}
function g_Color() {
    var a = this; jl_Object.call(a);
    a.$r = 0;
    a.$g = 0;
    a.$b = 0;
    a.$a = 0;
}
var g_Color_WHITE = null;
var g_Color_LIGHT_GRAY = null;
var g_Color_GRAY = null;
var g_Color_DARK_GRAY = null;
var g_Color_BLACK = null;
var g_Color_RED = null;
var g_Color_PINK = null;
var g_Color_ORANGE = null;
var g_Color_YELLOW = null;
var g_Color_GREEN = null;
var g_Color_MAGENTA = null;
var g_Color_CYAN = null;
var g_Color_BLUE = null;
function g_Color_$callClinit() {
    g_Color_$callClinit = $rt_eraseClinit(g_Color);
    g_Color__clinit_();
}
function g_Color__init_(var_0, var_1, var_2) {
    var var_3 = new g_Color();
    g_Color__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function g_Color__init_0($this, $r, $g, $b) {
    g_Color_$callClinit();
    jl_Object__init_0($this);
    $this.$r = $r;
    $this.$g = $g;
    $this.$b = $b;
    $this.$a = 255;
}
function g_Color_getRed($this) {
    return $this.$r;
}
function g_Color_getGreen($this) {
    return $this.$g;
}
function g_Color_getAlpha($this) {
    return $this.$a;
}
function g_Color_getBlue($this) {
    return $this.$b;
}
function g_Color__clinit_() {
    g_Color_WHITE = g_Color__init_(255, 255, 255);
    g_Color_LIGHT_GRAY = g_Color__init_(192, 192, 192);
    g_Color_GRAY = g_Color__init_(128, 128, 128);
    g_Color_DARK_GRAY = g_Color__init_(64, 64, 64);
    g_Color_BLACK = g_Color__init_(0, 0, 0);
    g_Color_RED = g_Color__init_(255, 0, 0);
    g_Color_PINK = g_Color__init_(255, 175, 175);
    g_Color_ORANGE = g_Color__init_(255, 200, 0);
    g_Color_YELLOW = g_Color__init_(255, 255, 0);
    g_Color_GREEN = g_Color__init_(0, 255, 0);
    g_Color_MAGENTA = g_Color__init_(255, 0, 255);
    g_Color_CYAN = g_Color__init_(0, 255, 255);
    g_Color_BLUE = g_Color__init_(0, 0, 255);
}
function gj_Client$getResourceURL$lambda$_11_0() {
    var a = this; jl_Object.call(a);
    a.$_06 = null;
    a.$_12 = null;
}
function gj_Client$getResourceURL$lambda$_11_0__init_(var_0, var_1) {
    var var_2 = new gj_Client$getResourceURL$lambda$_11_0();
    gj_Client$getResourceURL$lambda$_11_0__init_0(var_2, var_0, var_1);
    return var_2;
}
function gj_Client$getResourceURL$lambda$_11_0__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$_06 = var$1;
    var$0.$_12 = var$2;
}
function gj_Client$getResourceURL$lambda$_11_0_gotContent(var$0, var$1) {
    gj_Client_lambda$getResourceURL$6(var$0.$_06, var$0.$_12, var$1);
}
function gj_Client$getResourceURL$lambda$_11_0_gotContent$exported$0(var$0, var$1) {
    var$0.$gotContent(var$1);
}
function gj_Client$_init_$lambda$_1_0() {
    jl_Object.call(this);
    this.$_07 = null;
}
function gj_Client$_init_$lambda$_1_0__init_(var_0) {
    var var_1 = new gj_Client$_init_$lambda$_1_0();
    gj_Client$_init_$lambda$_1_0__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$_init_$lambda$_1_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_07 = var$1;
}
function gj_Client$_init_$lambda$_1_0_handleEvent(var$0, var$1) {
    gj_Client$_init_$lambda$_1_0_handleEvent0(var$0, var$1);
}
function gj_Client$_init_$lambda$_1_0_handleEvent0(var$0, var$1) {
    gj_Client_lambda$new$1(var$0.$_07, var$1);
}
function gj_Client$_init_$lambda$_1_0_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function gj_Client$getResourceURL$lambda$_11_1() {
    var a = this; jl_Object.call(a);
    a.$_08 = null;
    a.$_13 = null;
}
function gj_Client$getResourceURL$lambda$_11_1__init_(var_0, var_1) {
    var var_2 = new gj_Client$getResourceURL$lambda$_11_1();
    gj_Client$getResourceURL$lambda$_11_1__init_0(var_2, var_0, var_1);
    return var_2;
}
function gj_Client$getResourceURL$lambda$_11_1__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$_08 = var$1;
    var$0.$_13 = var$2;
}
function gj_Client$getResourceURL$lambda$_11_1_gotError(var$0) {
    gj_Client_lambda$getResourceURL$7(var$0.$_08, var$0.$_13);
}
function gj_Client$getResourceURL$lambda$_11_1_gotError$exported$0(var$0) {
    var$0.$gotError();
}
function ProgressBar() {
    var a = this; UI.call(a);
    a.$width1 = 1400;
    a.$height1 = 46;
    a.$backBarColour = null;
    a.$barColour = null;
    a.$barWinColour = null;
    a.$barGameOver = null;
    a.$songDuration = 0.0;
    a.$startTime = Long_ZERO;
    a.$newStartTime = Long_ZERO;
    a.$gameOver = 0;
    a.$p = null;
}
function ProgressBar__init_(var_0, var_1) {
    var var_2 = new ProgressBar();
    ProgressBar__init_0(var_2, var_0, var_1);
    return var_2;
}
function ProgressBar__init_0($this, $songDuration, $p) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$p = $thread.pop();$songDuration = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        UI__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$width1 = 1400;
        $this.$height1 = 46;
        $this.$backBarColour = g_Color__init_(255, 255, 255);
        $this.$barColour = g_Color__init_(255, 21, 193);
        $this.$barWinColour = g_Color__init_(13, 255, 232);
        $this.$barGameOver = g_Color__init_(164, 164, 169);
        $this.$songDuration = ($songDuration * 60 | 0) * $p.$getSpeed();
        $this.$p = $p;
        $this.$setImage($this.$drawBar());
        $this.$startTime = jl_System_nanoTime();
        $this.$newStartTime = $this.$startTime;
        $this.$gameOver = 0;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $songDuration, $p, $ptr);
}
function ProgressBar_act($this) {
    if (!$this.$gameOver && $this.$getTimeElapsed() <= $this.$songDuration + $this.$p.$getSpeed() - 1.0)
        $this.$setImage($this.$drawBar());
}
function ProgressBar_drawBar($this) {
    var $image;
    $image = g_GreenfootImage__init_0(700, 23);
    $image.$setColor($this.$backBarColour);
    $image.$fillRect(0, 0, 700, 23);
    if ($this.$getTimeElapsed() > $this.$songDuration)
        $image.$setColor($this.$barWinColour);
    else
        $image.$setColor($this.$barColour);
    if (1400.0 * $this.$getTimeElapsed() / $this.$songDuration / 2.0 - 10.0 > 0.0)
        $image.$fillRect(5, 4, jl_Math_min0(1400.0 * $this.$getTimeElapsed() / $this.$songDuration / 2.0 - 10.0, 695.0) | 0, 15);
    return $image;
}
function ProgressBar_getTimeElapsed($this) {
    return $this.$p.$getExactX();
}
function ProgressBar_getDistanceTravelled($this) {
    return $this.$p.$getExactX();
}
function ProgressBar_getSongDuration($this) {
    return $this.$songDuration;
}
function ji_Flushable() {
}
function gci_Rect() {
    var a = this; jl_Object.call(a);
    a.$x1 = 0;
    a.$y1 = 0;
    a.$width2 = 0;
    a.$height2 = 0;
}
function gci_Rect__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new gci_Rect();
    gci_Rect__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function gci_Rect__init_0($this, $x, $y, $width, $height) {
    jl_Object__init_0($this);
    $this.$x1 = $x;
    $this.$y1 = $y;
    $this.$width2 = $width;
    $this.$height2 = $height;
}
function gci_Rect_copyFrom($this, $other) {
    $this.$x1 = $other.$x1;
    $this.$y1 = $other.$y1;
    $this.$width2 = $other.$width2;
    $this.$height2 = $other.$height2;
}
function gci_Rect_getX($this) {
    return $this.$x1;
}
function gci_Rect_getMiddleX($this) {
    return $this.$x1 + ($this.$width2 / 2 | 0) | 0;
}
function gci_Rect_getRight($this) {
    return $this.$x1 + $this.$width2 | 0;
}
function gci_Rect_getY($this) {
    return $this.$y1;
}
function gci_Rect_getMiddleY($this) {
    return $this.$y1 + ($this.$height2 / 2 | 0) | 0;
}
function gci_Rect_getTop($this) {
    return $this.$y1 + $this.$height2 | 0;
}
function gci_Rect_getWidth($this) {
    return $this.$width2;
}
function gci_Rect_getHeight($this) {
    return $this.$height2;
}
function gci_Rect_contains($this, $other) {
    return $this.$x1 <= $other.$x1 && $this.$y1 <= $other.$y1 && gci_Rect_getTop($this) >= gci_Rect_getTop($other) && gci_Rect_getRight($this) >= gci_Rect_getRight($other) ? 1 : 0;
}
function gci_Rect_getIntersection($a, $b) {
    var $a_x, $a_r, $a_y, $a_t, $b_x, $b_r, $b_y, $b_t, $i_x, $i_r, $i_y, $i_t;
    $a_x = gci_Rect_getX($a);
    $a_r = gci_Rect_getRight($a);
    $a_y = gci_Rect_getY($a);
    $a_t = gci_Rect_getTop($a);
    $b_x = gci_Rect_getX($b);
    $b_r = gci_Rect_getRight($b);
    $b_y = gci_Rect_getY($b);
    $b_t = gci_Rect_getTop($b);
    $i_x = jl_Math_max($a_x, $b_x);
    $i_r = jl_Math_min($a_r, $b_r);
    $i_y = jl_Math_max($a_y, $b_y);
    $i_t = jl_Math_min($a_t, $b_t);
    if ($i_x < $i_r && $i_y < $i_t)
        return gci_Rect__init_($i_x, $i_y, $i_r - $i_x | 0, $i_t - $i_y | 0);
    return null;
}
function gci_Rect_setX($this, $x) {
    $this.$x1 = $x;
}
function gci_Rect_setY($this, $y) {
    $this.$y1 = $y;
}
function gci_Rect_intersects($this, $otherBounds) {
    if ($otherBounds.$x1 >= gci_Rect_getRight($this))
        return 0;
    if ($this.$x1 >= gci_Rect_getRight($otherBounds))
        return 0;
    if ($otherBounds.$y1 >= gci_Rect_getTop($this))
        return 0;
    if ($this.$y1 < gci_Rect_getTop($otherBounds))
        return 1;
    return 0;
}
function jl_IncompatibleClassChangeError() {
    jl_LinkageError.call(this);
}
function jl_IncompatibleClassChangeError__init_() {
    var var_0 = new jl_IncompatibleClassChangeError();
    jl_IncompatibleClassChangeError__init_0(var_0);
    return var_0;
}
function jl_IncompatibleClassChangeError__init_1(var_0) {
    var var_1 = new jl_IncompatibleClassChangeError();
    jl_IncompatibleClassChangeError__init_2(var_1, var_0);
    return var_1;
}
function jl_IncompatibleClassChangeError__init_0($this) {
    jl_LinkageError__init_0($this);
}
function jl_IncompatibleClassChangeError__init_2($this, $message) {
    jl_LinkageError__init_2($this, $message);
}
function gs_SoundFactory() {
    jl_Object.call(this);
}
var gs_SoundFactory_instance = null;
function gs_SoundFactory_$callClinit() {
    gs_SoundFactory_$callClinit = $rt_eraseClinit(gs_SoundFactory);
    gs_SoundFactory__clinit_();
}
function gs_SoundFactory__init_() {
    var var_0 = new gs_SoundFactory();
    gs_SoundFactory__init_0(var_0);
    return var_0;
}
function gs_SoundFactory_getInstance() {
    gs_SoundFactory_$callClinit();
    return gs_SoundFactory_instance;
}
function gs_SoundFactory__init_0($this) {
    gs_SoundFactory_$callClinit();
    jl_Object__init_0($this);
}
function gs_SoundFactory_createSound($this, $fileName, $quiet) {
    var $doc, var$4, $audio, $url, $isOk, $syncObject, $errListener, $canplayListener, var$11, var$12, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$12 = $thread.pop();var$11 = $thread.pop();$canplayListener = $thread.pop();$errListener = $thread.pop();$syncObject = $thread.pop();$isOk = $thread.pop();$url = $thread.pop();$audio = $thread.pop();var$4 = $thread.pop();$doc = $thread.pop();$quiet = $thread.pop();$fileName = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $doc = otjdh_HTMLDocument_current();
        var$4 = $rt_s(31);
        $audio = $doc.createElement($rt_ustr(var$4));
        var$4 = jl_StringBuilder__init_().$append($rt_s(32)).$append($fileName).$toString();
        $ptr = 1;
    case 1:
        $tmp = gj_Client_getCachedResourceURL(var$4);
        if ($rt_suspending()) {
            break main;
        }
        $url = $tmp;
        if ($url === null) {
            var$4 = $rt_s(33);
            $ptr = 2;
            continue main;
        }
        if ($url !== null)
            $fileName = $url;
        var$4 = $rt_ustr($fileName);
        $audio.src = var$4;
        var$4 = "auto";
        $audio.preload = var$4;
        $isOk = $rt_createBooleanArray(1);
        $syncObject = jl_Object__init_();
        $errListener = gs_SoundFactory$1__init_($this, $syncObject);
        $canplayListener = gs_SoundFactory$2__init_($this, $isOk, $syncObject);
        var$11 = $rt_s(34);
        $audio.addEventListener($rt_ustr(var$11), otji_JS_function($errListener, "handleEvent"));
        var$11 = $rt_s(35);
        $audio.addEventListener($rt_ustr(var$11), otji_JS_function($canplayListener, "handleEvent"));
        $ptr = 3;
        continue main;
    case 2:
        $tmp = gj_Client_getResourceURL($fileName, var$4);
        if ($rt_suspending()) {
            break main;
        }
        $url = $tmp;
        if ($url !== null)
            $fileName = $url;
        var$4 = $rt_ustr($fileName);
        $audio.src = var$4;
        var$4 = "auto";
        $audio.preload = var$4;
        $isOk = $rt_createBooleanArray(1);
        $syncObject = jl_Object__init_();
        $errListener = gs_SoundFactory$1__init_($this, $syncObject);
        $canplayListener = gs_SoundFactory$2__init_($this, $isOk, $syncObject);
        var$11 = $rt_s(34);
        $audio.addEventListener($rt_ustr(var$11), otji_JS_function($errListener, "handleEvent"));
        var$11 = $rt_s(35);
        $audio.addEventListener($rt_ustr(var$11), otji_JS_function($canplayListener, "handleEvent"));
        $ptr = 3;
    case 3:
        jl_Object_monitorEnter($syncObject);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            b: {
                try {
                    try {
                        $ptr = 4;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_InterruptedException) {
                        } else {
                            throw $$e;
                        }
                    }
                    jl_Object_monitorExit($syncObject);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$4 = $$je;
                    break b;

                }
            }
            jl_Object_monitorExit($syncObject);
            $rt_throw(var$4);
        }
        var$12 = $isOk.data;
        var$11 = $rt_s(34);
        $audio.removeEventListener($rt_ustr(var$11), otji_JS_function($errListener, "handleEvent"));
        var$11 = $rt_s(35);
        $audio.removeEventListener($rt_ustr(var$11), otji_JS_function($canplayListener, "handleEvent"));
        if (!var$12[0] && $quiet)
            return null;
        return gs_Sound__init_($audio);
    case 4:
        a: {
            b: {
                c: {
                    try {
                        jl_Object_wait1($syncObject);
                        if ($rt_suspending()) {
                            break main;
                        }
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_InterruptedException) {
                            try {
                                break c;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$4 = $$je;
                                break b;

                            }
                        } else{
                            var$4 = $$je;
                            break b;
                        }
                    }
                }
                try {
                    jl_Object_monitorExit($syncObject);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$4 = $$je;
                    break b;

                }
            }
            jl_Object_monitorExit($syncObject);
            $rt_throw(var$4);
        }
        var$12 = $isOk.data;
        var$11 = $rt_s(34);
        $audio.removeEventListener($rt_ustr(var$11), otji_JS_function($errListener, "handleEvent"));
        var$11 = $rt_s(35);
        $audio.removeEventListener($rt_ustr(var$11), otji_JS_function($canplayListener, "handleEvent"));
        if (!var$12[0] && $quiet)
            return null;
        return gs_Sound__init_($audio);
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $fileName, $quiet, $doc, var$4, $audio, $url, $isOk, $syncObject, $errListener, $canplayListener, var$11, var$12, $ptr);
}
function gs_SoundFactory__clinit_() {
    gs_SoundFactory_instance = gs_SoundFactory__init_();
}
function jl_NoSuchMethodError() {
    jl_IncompatibleClassChangeError.call(this);
}
function jl_NoSuchMethodError__init_() {
    var var_0 = new jl_NoSuchMethodError();
    jl_NoSuchMethodError__init_0(var_0);
    return var_0;
}
function jl_NoSuchMethodError__init_1(var_0) {
    var var_1 = new jl_NoSuchMethodError();
    jl_NoSuchMethodError__init_2(var_1, var_0);
    return var_1;
}
function jl_NoSuchMethodError__init_0($this) {
    jl_IncompatibleClassChangeError__init_0($this);
}
function jl_NoSuchMethodError__init_2($this, $message) {
    jl_IncompatibleClassChangeError__init_2($this, $message);
}
function ji_IOException() {
    jl_Exception.call(this);
}
function ji_IOException__init_0() {
    var var_0 = new ji_IOException();
    ji_IOException__init_1(var_0);
    return var_0;
}
function ji_IOException__init_(var_0) {
    var var_1 = new ji_IOException();
    ji_IOException__init_2(var_1, var_0);
    return var_1;
}
function ji_IOException__init_1($this) {
    jl_Exception__init_0($this);
}
function ji_IOException__init_2($this, $message) {
    jl_Exception__init_2($this, $message);
}
function Calc() {
    jl_Object.call(this);
}
function Calc__init_() {
    var var_0 = new Calc();
    Calc__init_0(var_0);
    return var_0;
}
function Calc__init_0($this) {
    jl_Object__init_0($this);
}
function Calc_randomizeInt($min, $max) {
    return (jl_Math_random() * (($max - $min | 0) + 1 | 0) | 0) + $min | 0;
}
function Calc_randomizeDouble($min, $max) {
    return jl_Math_random() * ($max - $min) + $min;
}
function Calc_getDistance($x1, $y1, $x2, $y2) {
    var var$5, var$6;
    var$5 = $x1 - $x2;
    var$5 = var$5 * var$5;
    var$6 = $y1 - $y2;
    return jl_Math_sqrt(var$5 + var$6 * var$6);
}
function gc_PointCollisionQuery() {
    jl_Object.call(this);
}
function gc_PointCollisionQuery__init_() {
    var var_0 = new gc_PointCollisionQuery();
    gc_PointCollisionQuery__init_0(var_0);
    return var_0;
}
function gc_PointCollisionQuery__init_0($this) {
    jl_Object__init_0($this);
}
function gc_CollisionChecker() {
}
function gci_IBSPColChecker() {
    var a = this; jl_Object.call(a);
    a.$actorQuery = null;
    a.$neighbourQuery = null;
    a.$pointQuery = null;
    a.$inRangeQuery = null;
    a.$cellSize0 = 0;
    a.$bspTree = null;
}
var gci_IBSPColChecker_debugging = 0;
var gci_IBSPColChecker_dbgCounter = 0;
function gci_IBSPColChecker_$callClinit() {
    gci_IBSPColChecker_$callClinit = $rt_eraseClinit(gci_IBSPColChecker);
    gci_IBSPColChecker__clinit_();
}
function gci_IBSPColChecker__init_() {
    var var_0 = new gci_IBSPColChecker();
    gci_IBSPColChecker__init_0(var_0);
    return var_0;
}
function gci_IBSPColChecker__init_0($this) {
    gci_IBSPColChecker_$callClinit();
    jl_Object__init_0($this);
    $this.$actorQuery = gc_GOCollisionQuery__init_();
    $this.$neighbourQuery = gc_NeighbourCollisionQuery__init_();
    $this.$pointQuery = gc_PointCollisionQuery__init_();
    $this.$inRangeQuery = gc_InRangeQuery__init_();
}
function gci_IBSPColChecker_initialize($this, $width, $height, $cellSize, $wrap) {
    $this.$cellSize0 = $cellSize;
}
function gci_IBSPColChecker_addObject($this, $actor) {
    var $bounds, $splitAxis, $splitPos, $treeArea, $newArea, $bx, var$8, $newTop, $newArea_0, var$11, $treeArea_0, $by;
    $bounds = gci_IBSPColChecker_getActorBounds($this, $actor);
    if ($this.$bspTree === null) {
        if (gci_Rect_getWidth($bounds) <= gci_Rect_getHeight($bounds)) {
            $splitAxis = 1;
            $splitPos = gci_Rect_getMiddleY($bounds);
        } else {
            $splitAxis = 0;
            $splitPos = gci_Rect_getMiddleX($bounds);
        }
        $this.$bspTree = gci_BSPNodeCache_getBSPNode();
        gci_Rect_copyFrom(gci_BSPNode_getArea($this.$bspTree), $bounds);
        gci_BSPNode_setSplitAxis($this.$bspTree, $splitAxis);
        gci_BSPNode_setSplitPos($this.$bspTree, $splitPos);
        gci_BSPNode_addActor($this.$bspTree, $actor);
    } else {
        $treeArea = gci_BSPNode_getArea($this.$bspTree);
        while (!gci_Rect_contains($treeArea, $bounds)) {
            if (gci_Rect_getX($bounds) >= gci_Rect_getX($treeArea))
                $newArea = $treeArea;
            else {
                $bx = gci_Rect_getX($treeArea) - gci_Rect_getWidth($treeArea) | 0;
                $newArea = new gci_Rect;
                var$8 = gci_Rect_getY($treeArea);
                gci_Rect__init_0($newArea, $bx, var$8, gci_Rect_getRight($treeArea) - $bx | 0, gci_Rect_getHeight($treeArea));
                $newTop = gci_BSPNodeCache_getBSPNode();
                gci_Rect_copyFrom(gci_BSPNode_getArea($newTop), $newArea);
                gci_BSPNode_setSplitAxis($newTop, 0);
                gci_BSPNode_setSplitPos($newTop, gci_Rect_getX($treeArea));
                gci_BSPNode_setChild($newTop, 1, $this.$bspTree);
                $this.$bspTree = $newTop;
            }
            if (gci_Rect_getRight($bounds) <= gci_Rect_getRight($newArea))
                $newArea_0 = $newArea;
            else {
                $bx = gci_Rect_getRight($newArea) + gci_Rect_getWidth($newArea) | 0;
                $newArea_0 = new gci_Rect;
                var$8 = gci_Rect_getX($newArea);
                var$11 = gci_Rect_getY($newArea);
                gci_Rect__init_0($newArea_0, var$8, var$11, $bx - gci_Rect_getX($newArea) | 0, gci_Rect_getHeight($newArea));
                $newTop = gci_BSPNodeCache_getBSPNode();
                gci_Rect_copyFrom(gci_BSPNode_getArea($newTop), $newArea_0);
                gci_BSPNode_setSplitAxis($newTop, 0);
                gci_BSPNode_setSplitPos($newTop, gci_Rect_getRight($newArea));
                gci_BSPNode_setChild($newTop, 0, $this.$bspTree);
                $this.$bspTree = $newTop;
            }
            if (gci_Rect_getY($bounds) >= gci_Rect_getY($newArea_0))
                $treeArea_0 = $newArea_0;
            else {
                $by = gci_Rect_getY($newArea_0) - gci_Rect_getHeight($newArea_0) | 0;
                $treeArea_0 = new gci_Rect;
                var$8 = gci_Rect_getX($newArea_0);
                gci_Rect__init_0($treeArea_0, var$8, $by, gci_Rect_getWidth($newArea_0), gci_Rect_getTop($newArea_0) - $by | 0);
                $newTop = gci_BSPNodeCache_getBSPNode();
                gci_Rect_copyFrom(gci_BSPNode_getArea($newTop), $treeArea_0);
                gci_BSPNode_setSplitAxis($newTop, 1);
                gci_BSPNode_setSplitPos($newTop, gci_Rect_getY($newArea_0));
                gci_BSPNode_setChild($newTop, 1, $this.$bspTree);
                $this.$bspTree = $newTop;
            }
            if (gci_Rect_getTop($bounds) <= gci_Rect_getTop($treeArea_0)) {
                $treeArea = $treeArea_0;
                continue;
            }
            $by = gci_Rect_getTop($treeArea_0) + gci_Rect_getHeight($treeArea_0) | 0;
            $treeArea = new gci_Rect;
            var$8 = gci_Rect_getX($treeArea_0);
            var$11 = gci_Rect_getY($treeArea_0);
            gci_Rect__init_0($treeArea, var$8, var$11, gci_Rect_getWidth($treeArea_0), $by - gci_Rect_getY($treeArea_0) | 0);
            $newTop = gci_BSPNodeCache_getBSPNode();
            gci_Rect_copyFrom(gci_BSPNode_getArea($newTop), $treeArea);
            gci_BSPNode_setSplitAxis($newTop, 1);
            gci_BSPNode_setSplitPos($newTop, gci_Rect_getTop($treeArea_0));
            gci_BSPNode_setChild($newTop, 0, $this.$bspTree);
            $this.$bspTree = $newTop;
        }
        gci_IBSPColChecker_insertObject($this, $actor, $bounds, $bounds, $treeArea, $this.$bspTree);
    }
}
function gci_IBSPColChecker_insertObject($this, $actor, $actorBounds, $bounds, $area, $node) {
    var $leftArea, $rightArea, $leftIntersects, $rightIntersects, $newLeft, $newRight;
    if (gci_BSPNode_containsActor($node, $actor))
        return;
    a: {
        if (!gci_BSPNode_isEmpty($node)) {
            if (gci_Rect_getWidth($area) > gci_Rect_getWidth($actorBounds))
                break a;
            if (gci_Rect_getHeight($area) > gci_Rect_getHeight($actorBounds))
                break a;
        }
        gci_BSPNode_addActor($node, $actor);
        return;
    }
    $leftArea = gci_BSPNode_getLeftArea($node);
    $rightArea = gci_BSPNode_getRightArea($node);
    $leftIntersects = gci_Rect_getIntersection($leftArea, $bounds);
    $rightIntersects = gci_Rect_getIntersection($rightArea, $bounds);
    if ($leftIntersects !== null) {
        if (gci_BSPNode_getLeft($node) !== null)
            gci_IBSPColChecker_insertObject($this, $actor, $actorBounds, $leftIntersects, $leftArea, gci_BSPNode_getLeft($node));
        else {
            $newLeft = gci_IBSPColChecker_createNewNode($this, $leftArea);
            gci_BSPNode_addActor($newLeft, $actor);
            gci_BSPNode_setChild($node, 0, $newLeft);
        }
    }
    if ($rightIntersects !== null) {
        if (gci_BSPNode_getRight($node) !== null)
            gci_IBSPColChecker_insertObject($this, $actor, $actorBounds, $rightIntersects, $rightArea, gci_BSPNode_getRight($node));
        else {
            $newRight = gci_IBSPColChecker_createNewNode($this, $rightArea);
            gci_BSPNode_addActor($newRight, $actor);
            gci_BSPNode_setChild($node, 1, $newRight);
        }
    }
}
function gci_IBSPColChecker_createNewNode($this, $area) {
    var $splitAxis, $splitPos, $newNode;
    if (gci_Rect_getWidth($area) <= gci_Rect_getHeight($area)) {
        $splitAxis = 1;
        $splitPos = gci_Rect_getMiddleY($area);
    } else {
        $splitAxis = 0;
        $splitPos = gci_Rect_getMiddleX($area);
    }
    $newNode = gci_BSPNodeCache_getBSPNode();
    gci_BSPNode_setArea($newNode, $area);
    gci_BSPNode_setSplitAxis($newNode, $splitAxis);
    gci_BSPNode_setSplitPos($newNode, $splitPos);
    return $newNode;
}
function gci_IBSPColChecker_getActorBounds($this, $actor) {
    var $r;
    $r = g_ActorVisitor_getBoundingRect($actor);
    return $r;
}
function gci_IBSPColChecker_removeObject($this, $object) {
    var $node, $bspNode;
    $node = gci_IBSPColChecker_getNodeForActor($object);
    while ($node !== null) {
        $bspNode = gci_ActorNode_getBSPNode($node);
        gci_ActorNode_remove($node);
        gci_IBSPColChecker_checkRemoveNode($this, $bspNode);
        $node = gci_IBSPColChecker_getNodeForActor($object);
    }
}
function gci_IBSPColChecker_checkRemoveNode($this, $node) {
    var $node_0, $side, $left, $right;
    while ($node !== null && gci_BSPNode_isEmpty($node)) {
        $node_0 = gci_BSPNode_getParent($node);
        $side = $node_0 === null ? 3 : gci_BSPNode_getChildSide($node_0, $node);
        $left = gci_BSPNode_getLeft($node);
        $right = gci_BSPNode_getRight($node);
        if ($left === null) {
            if ($node_0 === null) {
                $this.$bspTree = $right;
                if ($right !== null)
                    gci_BSPNode_setParent($right, null);
            } else {
                if ($right !== null) {
                    gci_Rect_copyFrom(gci_BSPNode_getArea($right), gci_BSPNode_getArea($node));
                    gci_BSPNode_areaChanged($right);
                }
                gci_BSPNode_setChild($node_0, $side, $right);
            }
            gci_BSPNode_setChild($node, 1, null);
            gci_BSPNodeCache_returnNode($node);
        } else {
            if ($right !== null)
                break;
            if ($node_0 === null) {
                $this.$bspTree = $left;
                if ($left !== null)
                    gci_BSPNode_setParent($left, null);
            } else {
                if ($left !== null) {
                    gci_Rect_copyFrom(gci_BSPNode_getArea($left), gci_BSPNode_getArea($node));
                    gci_BSPNode_areaChanged($left);
                }
                gci_BSPNode_setChild($node_0, $side, $left);
            }
            gci_BSPNode_setChild($node, 0, null);
            gci_BSPNodeCache_returnNode($node);
        }
        $node = $node_0;
    }
    return $node;
}
function gci_IBSPColChecker_getNodeForActor($object) {
    gci_IBSPColChecker_$callClinit();
    return g_ActorVisitor_getData($object);
}
function gci_IBSPColChecker_setNodeForActor($object, $node) {
    gci_IBSPColChecker_$callClinit();
    g_ActorVisitor_setData($object, $node);
}
function gci_IBSPColChecker_updateObject($this, $object) {
    var $node, $newBounds, $rNode, var$5, $bspNode, var$7, $bspArea, $iter;
    $node = gci_IBSPColChecker_getNodeForActor($object);
    if ($node === null)
        return;
    $newBounds = gci_IBSPColChecker_getActorBounds($this, $object);
    if (!gci_Rect_contains(gci_BSPNode_getArea($this.$bspTree), $newBounds)) {
        while ($node !== null) {
            $rNode = gci_ActorNode_getBSPNode($node);
            gci_ActorNode_remove($node);
            gci_IBSPColChecker_checkRemoveNode($this, $rNode);
            $node = gci_ActorNode_getNext($node);
        }
        $this.$addObject0($object);
        return;
    }
    while (true) {
        if ($node === null) {
            var$5 = gci_IBSPColChecker_getNodeForActor($object);
            if (var$5 === null)
                $bspNode = $this.$bspTree;
            else {
                $bspNode = gci_ActorNode_getBSPNode(var$5);
                while ($bspNode !== null && !gci_Rect_contains(gci_BSPNode_getArea($bspNode), $newBounds)) {
                    $bspNode = gci_BSPNode_getParent($bspNode);
                }
                if ($bspNode === null) {
                    while (var$5 !== null) {
                        var$7 = gci_ActorNode_getBSPNode(var$5);
                        gci_ActorNode_remove(var$5);
                        gci_IBSPColChecker_checkRemoveNode($this, var$7);
                        var$5 = gci_ActorNode_getNext(var$5);
                    }
                    $this.$addObject0($object);
                    return;
                }
            }
            $bspArea = gci_BSPNode_getArea($bspNode);
            gci_IBSPColChecker_insertObject($this, $object, $newBounds, $newBounds, $bspArea, $bspNode);
            var$5 = gci_IBSPColChecker_getNodeForActor($object);
            while (var$5 !== null) {
                if (!gci_ActorNode_checkMark(var$5)) {
                    var$7 = gci_ActorNode_getBSPNode(var$5);
                    gci_ActorNode_remove(var$5);
                    gci_IBSPColChecker_checkRemoveNode($this, var$7);
                }
                var$5 = gci_ActorNode_getNext(var$5);
            }
            return;
        }
        $bspNode = gci_ActorNode_getBSPNode($node);
        $bspArea = gci_BSPNode_getArea($bspNode);
        if (gci_Rect_contains($bspArea, $newBounds)) {
            $iter = gci_IBSPColChecker_getNodeForActor($object);
            while ($iter !== null) {
                if ($iter !== $node) {
                    $rNode = gci_ActorNode_getBSPNode($iter);
                    gci_ActorNode_remove($iter);
                    gci_IBSPColChecker_checkRemoveNode($this, $rNode);
                }
                $iter = gci_ActorNode_getNext($iter);
            }
            return;
        }
        if (!gci_Rect_intersects($bspArea, $newBounds)) {
            $rNode = gci_ActorNode_getBSPNode($node);
            gci_ActorNode_remove($node);
            gci_IBSPColChecker_checkRemoveNode($this, $rNode);
            if ($this.$bspTree === null)
                break;
        }
        gci_ActorNode_clearMark($node);
        $node = gci_ActorNode_getNext($node);
    }
    $this.$addObject0($object);
}
function gci_IBSPColChecker_updateObjectLocation($this, $object, $oldX, $oldY) {
    gci_IBSPColChecker_updateObject($this, $object);
}
function gci_IBSPColChecker_updateObjectSize($this, $object) {
    gci_IBSPColChecker_updateObject($this, $object);
}
function gci_IBSPColChecker_startSequence($this) {
    return;
}
function gci_IBSPColChecker__clinit_() {
    gci_IBSPColChecker_debugging = 0;
    gci_IBSPColChecker_dbgCounter = 0;
}
function ju_AbstractList$1() {
    var a = this; jl_Object.call(a);
    a.$index = 0;
    a.$modCount = 0;
    a.$size0 = 0;
    a.$removeIndex = 0;
    a.$this$0 = null;
}
function ju_AbstractList$1__init_(var_0) {
    var var_1 = new ju_AbstractList$1();
    ju_AbstractList$1__init_0(var_1, var_0);
    return var_1;
}
function ju_AbstractList$1__init_0($this, $this$0) {
    $this.$this$0 = $this$0;
    jl_Object__init_0($this);
    $this.$modCount = $this.$this$0.$modCount0;
    $this.$size0 = $this.$this$0.$size();
    $this.$removeIndex = (-1);
}
function ju_AbstractList$1_hasNext($this) {
    return $this.$index >= $this.$size0 ? 0 : 1;
}
function ju_AbstractList$1_next($this) {
    var var$1, var$2;
    ju_AbstractList$1_checkConcurrentModification($this);
    $this.$removeIndex = $this.$index;
    var$1 = $this.$this$0;
    var$2 = $this.$index;
    $this.$index = var$2 + 1 | 0;
    return var$1.$get0(var$2);
}
function ju_AbstractList$1_checkConcurrentModification($this) {
    if ($this.$modCount >= $this.$this$0.$modCount0)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
}
function gc_ActInterruptedException() {
    jl_RuntimeException.call(this);
}
function gc_ActInterruptedException__init_() {
    var var_0 = new gc_ActInterruptedException();
    gc_ActInterruptedException__init_0(var_0);
    return var_0;
}
function gc_ActInterruptedException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function gc_ImageCache() {
    jl_Object.call(this);
    this.$imageCache = null;
}
var gc_ImageCache_instance = null;
function gc_ImageCache_$callClinit() {
    gc_ImageCache_$callClinit = $rt_eraseClinit(gc_ImageCache);
    gc_ImageCache__clinit_();
}
function gc_ImageCache__init_() {
    var var_0 = new gc_ImageCache();
    gc_ImageCache__init_0(var_0);
    return var_0;
}
function gc_ImageCache__init_0($this) {
    gc_ImageCache_$callClinit();
    jl_Object__init_0($this);
    $this.$imageCache = ju_HashMap__init_();
}
function gc_ImageCache_getInstance() {
    gc_ImageCache_$callClinit();
    return gc_ImageCache_instance;
}
function gc_ImageCache_addCachedImage($this, $fileName, $image) {
    var var$3, var$4, $cr, $$je;
    var$3 = $this.$imageCache;
    jl_Object_monitorEnterSync(var$3);
    a: {
        b: {
            c: {
                try {
                    if ($image !== null)
                        break c;
                    $this.$imageCache.$put($fileName, null);
                    break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$4 = $$je;
                    break a;

                }
            }
            try {
                $cr = gc_ImageCache$CachedImageRef__init_($this, $fileName, $image);
                $this.$imageCache.$put($fileName, $cr);
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$4 = $$je;
                break a;

            }
        }
        try {
            jl_Object_monitorExitSync(var$3);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;
            break a;

        }
        return 1;
    }
    jl_Object_monitorExitSync(var$3);
    $rt_throw(var$4);
}
function gc_ImageCache_getCachedImage($this, $fileName) {
    var var$2, $sr, var$4, $$je;
    var$2 = $this.$imageCache;
    jl_Object_monitorEnterSync(var$2);
    a: {
        b: {
            try {
                $sr = $this.$imageCache.$get($fileName);
                if ($sr !== null)
                    break b;
                var$4 = null;
                jl_Object_monitorExitSync(var$2);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$4 = $$je;
                break a;

            }
            return var$4;
        }
        try {
            var$4 = $sr.$get1();
            jl_Object_monitorExitSync(var$2);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;
            break a;

        }
        return var$4;
    }
    jl_Object_monitorExitSync(var$2);
    $rt_throw(var$4);
}
function gc_ImageCache__clinit_() {
    gc_ImageCache_instance = gc_ImageCache__init_();
}
function jl_UnsupportedOperationException() {
    jl_RuntimeException.call(this);
}
function jl_UnsupportedOperationException__init_() {
    var var_0 = new jl_UnsupportedOperationException();
    jl_UnsupportedOperationException__init_0(var_0);
    return var_0;
}
function jl_UnsupportedOperationException__init_1(var_0) {
    var var_1 = new jl_UnsupportedOperationException();
    jl_UnsupportedOperationException__init_2(var_1, var_0);
    return var_1;
}
function jl_UnsupportedOperationException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function jl_UnsupportedOperationException__init_2($this, $message) {
    jl_RuntimeException__init_2($this, $message);
}
function jn_ReadOnlyBufferException() {
    jl_UnsupportedOperationException.call(this);
}
function jn_ReadOnlyBufferException__init_() {
    var var_0 = new jn_ReadOnlyBufferException();
    jn_ReadOnlyBufferException__init_0(var_0);
    return var_0;
}
function jn_ReadOnlyBufferException__init_0($this) {
    jl_UnsupportedOperationException__init_0($this);
}
function ge_WorldListener() {
}
function gc_Simulation() {
    var a = this; jl_Thread.call(a);
    a.$worldHandler = null;
    a.$paused = 0;
    a.$enabled = 0;
    a.$runOnce = 0;
    a.$queuedTasks = null;
    a.$listenerList = null;
    a.$startedEvent = null;
    a.$stoppedEvent = null;
    a.$disabledEvent = null;
    a.$speedChangeEvent = null;
    a.$debuggerPausedEvent = null;
    a.$debuggerResumedEvent = null;
    a.$newActRoundEvent = null;
    a.$taskBeginEvent = null;
    a.$taskEndEvent = null;
    a.$speed = 0;
    a.$lastDelayTime = Long_ZERO;
    a.$delay = Long_ZERO;
    a.$repaintLock = null;
    a.$delegate = null;
    a.$interruptLock = null;
    a.$delaying = 0;
    a.$interruptDelay = 0;
    a.$asking = 0;
    a.$isRunning = 0;
    a.$abort = 0;
}
var gc_Simulation_instance = null;
var gc_Simulation_RUN_QUEUED_TASKS = null;
function gc_Simulation_$callClinit() {
    gc_Simulation_$callClinit = $rt_eraseClinit(gc_Simulation);
    gc_Simulation__clinit_();
}
function gc_Simulation__init_(var_0) {
    var var_1 = new gc_Simulation();
    gc_Simulation__init_0(var_1, var_0);
    return var_1;
}
function gc_Simulation__init_0($this, $simulationDelegate) {
    gc_Simulation_$callClinit();
    jl_Thread__init_0($this);
    $this.$queuedTasks = ju_LinkedList__init_();
    $this.$listenerList = ju_ArrayList__init_();
    $this.$repaintLock = jl_Object__init_();
    $this.$interruptLock = jl_Object__init_();
    $this.$isRunning = 0;
    $this.$delegate = $simulationDelegate;
    $this.$startedEvent = ge_SimulationEvent__init_($this, 0);
    $this.$stoppedEvent = ge_SimulationEvent__init_($this, 1);
    $this.$speedChangeEvent = ge_SimulationEvent__init_($this, 2);
    $this.$disabledEvent = ge_SimulationEvent__init_($this, 3);
    $this.$debuggerPausedEvent = ge_SimulationEvent__init_($this, 5);
    $this.$debuggerResumedEvent = ge_SimulationEvent__init_($this, 6);
    $this.$newActRoundEvent = ge_SimulationEvent__init_($this, 7);
    $this.$taskBeginEvent = ge_SimulationEvent__init_($this, 8);
    $this.$taskEndEvent = ge_SimulationEvent__init_($this, 9);
    jl_Thread_setPriority($this, 1);
    $this.$paused = 1;
    $this.$speed = 50;
    $this.$delay = gc_Simulation_calculateDelay($this, $this.$speed);
}
function gc_Simulation_initialize($simulationDelegate) {
    gc_Simulation_$callClinit();
    gc_Simulation_instance = gc_Simulation__init_($simulationDelegate);
}
function gc_Simulation_getInstance() {
    gc_Simulation_$callClinit();
    return gc_Simulation_instance;
}
function gc_Simulation_attachWorldHandler($this, $worldHandler) {
    $this.$worldHandler = $worldHandler;
    $worldHandler.$addWorldListener($this);
    $this.$addSimulationListener($worldHandler);
    $this.$start();
}
function gc_Simulation_run($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        gc_Simulation_runContent($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function gc_Simulation_runContent($this) {
    var $t, $world, var$3, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();$world = $thread.pop();$t = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        a: {
            while (!$this.$abort) {
                b: {
                    c: {
                        try {
                            $ptr = 2;
                            continue main;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof gc_ActInterruptedException) {
                            } else if ($$je instanceof jl_InterruptedException) {
                                break c;
                            } else if ($$je instanceof jl_Throwable) {
                                $t = $$je;
                                break a;
                            } else {
                                throw $$e;
                            }
                        }
                        break b;
                    }
                }
                $this.$worldHandler.$getKeyboardManager().$clearLatches();
            }
            $ptr = 1;
            continue main;
        }
        $ptr = 3;
        continue main;
    case 1:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            d: {
                try {
                    if (!$this.$isRunning)
                        break d;
                    $world = $this.$worldHandler.$getWorld();
                    if ($world !== null)
                        gc_Simulation_worldStopped($world);
                    $this.$isRunning = 0;
                    break d;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$3 = $$je;
                    break a;

                }
            }
            try {
                jl_Object_monitorExit($this);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$3 = $$je;
                break a;

            }
            return;
        }
        jl_Object_monitorExit($this);
        $rt_throw(var$3);
    case 2:
        a: {
            d: {
                e: {
                    try {
                        gc_Simulation_maybePause($this);
                        if ($rt_suspending()) {
                            break main;
                        }
                        if (!$this.$worldHandler.$hasWorld()) {
                            $ptr = 4;
                            continue main;
                        }
                        var$3 = $this.$worldHandler.$getWorld();
                        $ptr = 5;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                            break d;
                        } else if ($$je instanceof jl_InterruptedException) {
                            break e;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break a;
                        } else {
                            throw $$e;
                        }
                    }
                }
            }
            f: while (true) {
                $this.$worldHandler.$getKeyboardManager().$clearLatches();
                if ($this.$abort)
                    break;
                g: {
                    try {
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                        } else if ($$je instanceof jl_InterruptedException) {
                            break g;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break a;
                        } else {
                            throw $$e;
                        }
                    }
                    continue f;
                }
            }
            $ptr = 1;
            continue main;
        }
        $ptr = 3;
    case 3:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            try {
                $this.$paused = 1;
                jl_Object_monitorExit($this);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$3 = $$je;

            }
            jl_Object_monitorExit($this);
            $rt_throw(var$3);
        }
        $t.$printStackTrace0();
        d: {
            e: while (true) {
                $this.$worldHandler.$getKeyboardManager().$clearLatches();
                if ($this.$abort)
                    break;
                c: {
                    try {
                        $ptr = 2;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                        } else if ($$je instanceof jl_InterruptedException) {
                            break c;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break d;
                        } else {
                            throw $$e;
                        }
                    }
                    continue e;
                }
            }
            $ptr = 1;
            continue main;
        }
        continue main;
    case 4:
        a: {
            d: {
                e: {
                    try {
                        gc_Simulation_delay($this);
                        if ($rt_suspending()) {
                            break main;
                        }
                        break d;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                            break d;
                        } else if ($$je instanceof jl_InterruptedException) {
                            break e;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break a;
                        } else {
                            throw $$e;
                        }
                    }
                }
            }
            c: while (true) {
                $this.$worldHandler.$getKeyboardManager().$clearLatches();
                if ($this.$abort)
                    break;
                h: {
                    try {
                        $ptr = 2;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                        } else if ($$je instanceof jl_InterruptedException) {
                            break h;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break a;
                        } else {
                            throw $$e;
                        }
                    }
                    continue c;
                }
            }
            $ptr = 1;
            continue main;
        }
        $ptr = 3;
        continue main;
    case 5:
        a: {
            d: {
                e: {
                    try {
                        gc_Simulation_runOneLoop($this, var$3);
                        if ($rt_suspending()) {
                            break main;
                        }
                        $ptr = 4;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                            break d;
                        } else if ($$je instanceof jl_InterruptedException) {
                            break e;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break a;
                        } else {
                            throw $$e;
                        }
                    }
                }
            }
            c: while (true) {
                $this.$worldHandler.$getKeyboardManager().$clearLatches();
                if ($this.$abort)
                    break;
                h: {
                    try {
                        $ptr = 2;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                        } else if ($$je instanceof jl_InterruptedException) {
                            break h;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break a;
                        } else {
                            throw $$e;
                        }
                    }
                    continue c;
                }
            }
            $ptr = 1;
            continue main;
        }
        $ptr = 3;
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $t, $world, var$3, $ptr);
}
function gc_Simulation_simulationWait($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        jl_Object_wait1($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function gc_Simulation_worldStarted($world) {
    gc_Simulation_$callClinit();
    $world.$started();
}
function gc_Simulation_worldStopped($world) {
    gc_Simulation_$callClinit();
    $world.$stopped();
}
function gc_Simulation_maybePause($this) {
    var var$1, $checkStop, $world, var$4, $doResumeRunning, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$doResumeRunning = $thread.pop();var$4 = $thread.pop();$world = $thread.pop();$checkStop = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($this.$abort) {
            gc_Simulation_runQueuedTasks($this);
            return;
        }
        gc_Simulation_runQueuedTasks($this);
        $ptr = 1;
    case 1:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            b: {
                c: {
                    d: {
                        e: {
                            f: {
                                try {
                                    if ($this.$paused)
                                        break f;
                                    if ($this.$enabled)
                                        break e;
                                    else
                                        break f;
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    var$1 = $$je;
                                    break b;

                                }
                            }
                            try {
                                if (!$this.$isRunning)
                                    break e;
                                else
                                    break d;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$1 = $$je;
                                break b;

                            }
                        }
                        try {
                            $checkStop = 0;
                            break c;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$1 = $$je;
                            break b;

                        }
                    }
                    try {
                        $checkStop = 1;
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$1 = $$je;
                        break b;

                    }
                }
                g: {
                    try {
                        $world = $this.$worldHandler.$getWorld();
                        if (!$checkStop)
                            break g;
                        $this.$isRunning = 0;
                        var$1 = $this.$interruptLock;
                        $ptr = 2;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$1 = $$je;
                        break b;

                    }
                }
                h: {
                    try {
                        if (!$this.$isRunning)
                            break h;
                        jl_Object_monitorExit($this);
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$1 = $$je;
                        break b;

                    }
                    return;
                }
                try {
                    jl_Object_monitorExit($this);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$1 = $$je;
                    break b;

                }
            }
            jl_Object_monitorExit($this);
            $rt_throw(var$1);
        }
        if (!$checkStop) {
            $ptr = 3;
            continue main;
        }
        i: {
            try {
                gc_Simulation_signalStopping($this, $world);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                    break i;
                } else {
                    throw $$e;
                }
            }
            $ptr = 4;
            continue main;
        }
        if ($this.$abort) {
            gc_Simulation_runQueuedTasks($this);
            return;
        }
        gc_Simulation_runQueuedTasks($this);
        continue main;
    case 2:
        a: {
            try {
                jl_Object_monitorEnter(var$1);
                if ($rt_suspending()) {
                    break main;
                }
                c: {
                    try {
                        $this.$interruptDelay = 0;
                        jl_Object_monitorExit(var$1);
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$4 = $$je;

                    }
                    jl_Object_monitorExit(var$1);
                    $rt_throw(var$4);
                }
                jl_Object_monitorExit($this);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$1 = $$je;
                jl_Object_monitorExit($this);
                $rt_throw(var$1);

            }
        }
        if (!$checkStop) {
            $ptr = 3;
            continue main;
        }
        e: {
            try {
                gc_Simulation_signalStopping($this, $world);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                    break e;
                } else {
                    throw $$e;
                }
            }
            $ptr = 4;
            continue main;
        }
        if ($this.$abort) {
            gc_Simulation_runQueuedTasks($this);
            return;
        }
        gc_Simulation_runQueuedTasks($this);
        $ptr = 1;
        continue main;
    case 3:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            b: {
                c: {
                    d: {
                        e: {
                            f: {
                                try {
                                    if ($this.$paused)
                                        break f;
                                    if (!$this.$enabled)
                                        break f;
                                    if ($this.$abort)
                                        break f;
                                    if ($this.$isRunning)
                                        break f;
                                    else
                                        break e;
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    var$1 = $$je;
                                    break c;

                                }
                            }
                            try {
                                $doResumeRunning = 0;
                                break d;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$1 = $$je;
                                break c;

                            }
                        }
                        try {
                            $doResumeRunning = 1;
                            break d;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$1 = $$je;
                            break c;

                        }
                    }
                    g: {
                        h: {
                            try {
                                if ($this.$isRunning)
                                    break h;
                                if ($doResumeRunning)
                                    break h;
                                if ($this.$runOnce)
                                    break h;
                                else
                                    break g;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$1 = $$je;
                                break c;

                            }
                        }
                        try {
                            jl_Object_monitorExit($this);
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$1 = $$je;
                            break c;

                        }
                        if ($doResumeRunning)
                            gc_Simulation_resumeRunning($this);
                        $ptr = 5;
                        continue main;
                    }
                    i: {
                        try {
                            if (!$this.$enabled)
                                break i;
                            gc_Simulation_fireSimulationEvent($this, $this.$stoppedEvent);
                            break i;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$1 = $$je;
                            break c;

                        }
                    }
                    j: {
                        try {
                            if ($this.$worldHandler === null)
                                break j;
                            $this.$worldHandler.$repaint();
                            break j;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$1 = $$je;
                            break c;

                        }
                    }
                    k: {
                        try {
                            if ($this.$queuedTasks.$isEmpty())
                                break k;
                            jl_Object_monitorExit($this);
                            break a;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$1 = $$je;
                            break c;

                        }
                    }
                    try {
                        jl_System_gc();
                        try {
                            $ptr = 6;
                            continue main;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_InterruptedException) {
                            } else {
                                throw $$e;
                            }
                        }
                        jl_Object_monitorExit($this);
                        break b;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$1 = $$je;
                        break c;

                    }
                }
                jl_Object_monitorExit($this);
                $rt_throw(var$1);
            }
        }
        if ($this.$abort) {
            gc_Simulation_runQueuedTasks($this);
            return;
        }
        gc_Simulation_runQueuedTasks($this);
        $ptr = 1;
        continue main;
    case 4:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            b: {
                c: {
                    try {
                        $this.$runOnce = 0;
                        if ($this.$paused)
                            break c;
                        $this.$isRunning = $this.$enabled;
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$1 = $$je;
                        break b;

                    }
                }
                try {
                    jl_Object_monitorExit($this);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$1 = $$je;
                    break b;

                }
            }
            jl_Object_monitorExit($this);
            $rt_throw(var$1);
        }
        $ptr = 3;
        continue main;
    case 5:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            b: {
                c: {
                    d: {
                        try {
                            if ($this.$runOnce)
                                break d;
                            if (!$this.$isRunning)
                                break c;
                            else
                                break d;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$1 = $$je;
                            break b;

                        }
                    }
                    try {
                        $this.$runOnce = 0;
                        jl_Object_monitorExit($this);
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$1 = $$je;
                        break b;

                    }
                    return;
                }
                try {
                    jl_Object_monitorExit($this);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$1 = $$je;
                    break b;

                }
            }
            jl_Object_monitorExit($this);
            $rt_throw(var$1);
        }
        if ($this.$abort) {
            gc_Simulation_runQueuedTasks($this);
            return;
        }
        gc_Simulation_runQueuedTasks($this);
        $ptr = 1;
        continue main;
    case 6:
        a: {
            b: {
                c: {
                    try {
                        gc_Simulation_simulationWait($this);
                        if ($rt_suspending()) {
                            break main;
                        }
                        $this.$lastDelayTime = jl_System_nanoTime();
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_InterruptedException) {
                            try {
                                break c;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$1 = $$je;
                                break b;

                            }
                        } else{
                            var$1 = $$je;
                            break b;
                        }
                    }
                }
                try {
                    jl_Object_monitorExit($this);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$1 = $$je;
                    break b;

                }
            }
            jl_Object_monitorExit($this);
            $rt_throw(var$1);
        }
        if ($this.$abort) {
            gc_Simulation_runQueuedTasks($this);
            return;
        }
        gc_Simulation_runQueuedTasks($this);
        $ptr = 1;
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $checkStop, $world, var$4, $doResumeRunning, $ptr);
}
function gc_Simulation_resumeRunning($this) {
    var $world, var$2, var$3, $t, $$je;
    a: {
        b: {
            c: {
                $this.$isRunning = 1;
                $this.$lastDelayTime = jl_System_nanoTime();
                gc_Simulation_fireSimulationEvent($this, $this.$startedEvent);
                $world = $this.$worldHandler.$getWorld();
                if ($world !== null)
                    try {
                        gc_Simulation_worldStarted($world);
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            try {
                                $this.$isRunning = 0;
                                var$2 = $this.$interruptLock;
                                jl_Object_monitorEnterSync(var$2);
                                d: {
                                    try {
                                        jl_Thread_interrupted();
                                        $this.$interruptDelay = 0;
                                        jl_Object_monitorExitSync(var$2);
                                        break d;
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        var$3 = $$je;

                                    }
                                    jl_Object_monitorExitSync(var$2);
                                    $rt_throw(var$3);
                                }
                                $this.$setPaused(1);
                                $t.$printStackTrace0();
                                break a;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$2 = $$je;
                                break b;

                            }
                        } else{
                            var$2 = $$je;
                            break b;
                        }
                    }
            }
            return;
        }
        $rt_throw(var$2);
    }
}
function gc_Simulation_signalStopping($this, $world) {
    var var$2, $t, $aie, $$je;
    a: {
        if ($world !== null)
            b: {
                c: {
                    d: {
                        try {
                            gc_Simulation_worldStopped($world);
                            break a;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof gc_ActInterruptedException) {
                                $aie = $$je;
                                try {
                                    jl_Object_monitorEnterSync($this);
                                    e: {
                                        try {
                                            $this.$paused = 1;
                                            jl_Object_monitorExitSync($this);
                                            break e;
                                        } catch ($$e) {
                                            $$je = $rt_wrapException($$e);
                                            var$2 = $$je;

                                        }
                                        jl_Object_monitorExitSync($this);
                                        $rt_throw(var$2);
                                    }
                                    $rt_throw($aie);
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    var$2 = $$je;
                                    break c;

                                }
                            } else if ($$je instanceof jl_Throwable) {
                                $t = $$je;
                                break d;
                            } else{
                                var$2 = $$je;
                                break c;
                            }
                        }
                    }
                    try {
                        jl_Object_monitorEnterSync($this);
                        f: {
                            try {
                                $this.$paused = 1;
                                jl_Object_monitorExitSync($this);
                                break f;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$2 = $$je;

                            }
                            jl_Object_monitorExitSync($this);
                            $rt_throw(var$2);
                        }
                        $t.$printStackTrace0();
                        break b;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$2 = $$je;
                        break c;

                    }
                }
                $rt_throw(var$2);
            }
    }
}
function gc_Simulation_runQueuedTasks($this) {
    var $r, var$2, $world, $t, $$je;
    jl_Object_monitorEnterSync($this);
    a: {
        try {
            $r = $this.$queuedTasks.$poll();
            jl_Object_monitorExitSync($this);
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$2 = $$je;

        }
        jl_Object_monitorExitSync($this);
        $rt_throw(var$2);
    }
    while ($r !== null) {
        $world = gc_WorldHandler_getInstance().$getWorld();
        gc_Simulation_fireSimulationEvent($this, $this.$taskBeginEvent);
        b: {
            try {
                $r.$run();
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                    $t = $$je;
                    $t.$printStackTrace0();
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        gc_Simulation_fireSimulationEvent($this, $this.$taskEndEvent);
        jl_Object_monitorEnterSync($this);
        try {
            $r = $this.$queuedTasks.$poll();
            jl_Object_monitorExitSync($this);
            continue;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$2 = $$je;
            jl_Object_monitorExitSync($this);
            $rt_throw(var$2);

        }
    }
}
function gc_Simulation_runOneLoop($this, $world) {
    var $e, var$3, var$4, $actor, $e_0, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$e_0 = $thread.pop();$actor = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();$e = $thread.pop();$world = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gc_Simulation_fireSimulationEvent($this, $this.$newActRoundEvent);
        $e = null;
        a: {
            b: {
                try {
                    gc_Simulation_actWorld($world);
                    if ($world === $this.$worldHandler.$getWorld())
                        break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof gc_ActInterruptedException) {
                        $e = $$je;
                        break a;
                    } else {
                        throw $$e;
                    }
                }
                return;
            }
        }
        var$3 = ju_ArrayList__init_0(g_WorldVisitor_getObjectsListInActOrder($world));
        var$4 = var$3.$iterator();
        while (true) {
            if (!var$4.$hasNext()) {
                if ($e !== null)
                    $rt_throw($e);
                gc_Simulation_repaintIfNeeded($this);
                return;
            }
            $actor = var$4.$next();
            if (!$this.$enabled)
                break;
            if (g_ActorVisitor_getWorld($actor) !== null) {
                try {
                    $ptr = 1;
                    continue main;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof gc_ActInterruptedException) {
                        $e_0 = $$je;
                    } else {
                        throw $$e;
                    }
                }
                if ($e === null)
                    $e = $e_0;
            }
        }
        return;
    case 1:
        a: {
            c: {
                try {
                    try {
                        gc_Simulation_actActor($actor);
                        if ($rt_suspending()) {
                            break main;
                        }
                        var$3 = $this.$worldHandler.$getWorld();
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof gc_ActInterruptedException) {
                            $e_0 = $$je;
                            break c;
                        } else {
                            throw $$e;
                        }
                    }
                    if ($world !== var$3)
                        return;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof gc_ActInterruptedException) {
                        $e_0 = $$je;
                        break c;
                    } else {
                        throw $$e;
                    }
                }
                break a;
            }
            if ($e === null)
                $e = $e_0;
        }
        while (true) {
            if (!var$4.$hasNext()) {
                if ($e !== null)
                    $rt_throw($e);
                gc_Simulation_repaintIfNeeded($this);
                return;
            }
            $actor = var$4.$next();
            if (!$this.$enabled)
                break;
            if (g_ActorVisitor_getWorld($actor) === null)
                continue;
            try {
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof gc_ActInterruptedException) {
                    $e_0 = $$je;
                } else {
                    throw $$e;
                }
            }
            if ($e !== null)
                continue;
            $e = $e_0;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $world, $e, var$3, var$4, $actor, $e_0, $ptr);
}
function gc_Simulation_actActor($actor) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$actor = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gc_Simulation_$callClinit();
        $ptr = 1;
    case 1:
        $actor.$act();
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($actor, $ptr);
}
function gc_Simulation_actWorld($world) {
    gc_Simulation_$callClinit();
    $world.$act();
}
function gc_Simulation_repaintIfNeeded($this) {
    $this.$worldHandler.$repaint();
}
function gc_Simulation_setPaused($this, $b) {
    var var$2, var$3, $$je;
    jl_Object_monitorEnterSync($this);
    try {
        jl_Object_monitorEnterSync($this);
        a: {
            b: {
                try {
                    if ($this.$paused != $b)
                        break b;
                    jl_Object_monitorExitSync($this);
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$2 = $$je;
                    break a;

                }
                return;
            }
            c: {
                try {
                    $this.$paused = $b;
                    if (!$this.$enabled)
                        break c;
                    if (!$this.$paused) {
                        var$2 = $this.$interruptLock;
                        jl_Object_monitorEnterSync(var$2);
                        d: {
                            try {
                                $this.$interruptDelay = 0;
                                jl_Object_monitorExitSync(var$2);
                                break d;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$3 = $$je;

                            }
                            jl_Object_monitorExitSync(var$2);
                            $rt_throw(var$3);
                        }
                    }
                    jl_Object_notifyAll($this);
                    if (!$this.$paused)
                        break c;
                    gc_Simulation_interruptDelay($this);
                    break c;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$2 = $$je;
                    break a;

                }
            }
            try {
                jl_Object_monitorExitSync($this);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$2 = $$je;
                break a;

            }
            return;
        }
        jl_Object_monitorExitSync($this);
        $rt_throw(var$2);
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
function gc_Simulation_interruptDelay($this) {
    var var$1, var$2, $$je;
    var$1 = $this.$interruptLock;
    jl_Object_monitorEnterSync(var$1);
    a: {
        b: {
            c: {
                try {
                    if (!$this.$delaying)
                        break c;
                    $this.$interrupt();
                    break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$2 = $$je;
                    break a;

                }
            }
            try {
                $this.$interruptDelay = 1;
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$2 = $$je;
                break a;

            }
        }
        try {
            jl_Object_monitorExitSync(var$1);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$2 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync(var$1);
    $rt_throw(var$2);
}
function gc_Simulation_setEnabled($this, $b) {
    var var$2, var$3, $$je;
    jl_Object_monitorEnterSync($this);
    try {
        jl_Object_monitorEnterSync($this);
        a: {
            b: {
                try {
                    if ($b != $this.$enabled)
                        break b;
                    jl_Object_monitorExitSync($this);
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$2 = $$je;
                    break a;

                }
                return;
            }
            c: {
                d: {
                    try {
                        $this.$enabled = $b;
                        if (!$b)
                            break d;
                        $this.$worldHandler.$getKeyboardManager().$getKey();
                        $this.$worldHandler.$getKeyboardManager().$clearLatches();
                        jl_Object_notifyAll($this);
                        if (!$this.$paused)
                            break c;
                        gc_Simulation_fireSimulationEvent($this, $this.$stoppedEvent);
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$2 = $$je;
                        break a;

                    }
                }
                e: {
                    f: {
                        try {
                            gc_Simulation_interruptDelay($this);
                            if ($this.$paused)
                                break f;
                            $this.$paused = 1;
                            $this.$isRunning = 0;
                            break e;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$2 = $$je;
                            break a;

                        }
                    }
                    try {
                        var$2 = $this.$interruptLock;
                        jl_Object_monitorEnterSync(var$2);
                        g: {
                            try {
                                $this.$interruptDelay = 0;
                                jl_Object_monitorExitSync(var$2);
                                break g;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$3 = $$je;

                            }
                            jl_Object_monitorExitSync(var$2);
                            $rt_throw(var$3);
                        }
                        break e;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$2 = $$je;
                        break a;

                    }
                }
                try {
                    gc_Simulation_fireSimulationEvent($this, $this.$disabledEvent);
                    break c;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$2 = $$je;
                    break a;

                }
            }
            try {
                jl_Object_monitorExitSync($this);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$2 = $$je;
                break a;

            }
            return;
        }
        jl_Object_monitorExitSync($this);
        $rt_throw(var$2);
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
function gc_Simulation_fireSimulationEvent($this, $event) {
    var var$2, $listeners, var$4, var$5, $i, $$je;
    var$2 = $this.$listenerList;
    jl_Object_monitorEnterSync(var$2);
    a: {
        try {
            $listeners = $this.$listenerList.$toArray($rt_createArray(ge_SimulationListener, $this.$listenerList.$size()));
            jl_Object_monitorExitSync(var$2);
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;

        }
        jl_Object_monitorExitSync(var$2);
        $rt_throw(var$4);
    }
    var$5 = $listeners.data;
    $i = var$5.length - 1 | 0;
    while ($i >= 0) {
        var$5[$i].$simulationChanged($event);
        $i = $i + (-1) | 0;
    }
}
function gc_Simulation_addSimulationListener($this, $l) {
    var var$2, var$3, $$je;
    var$2 = $this.$listenerList;
    jl_Object_monitorEnterSync(var$2);
    a: {
        try {
            $this.$listenerList.$add0($l);
            jl_Object_monitorExitSync(var$2);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$3 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync(var$2);
    $rt_throw(var$3);
}
function gc_Simulation_setSpeed($this, $speed) {
    var $speedChanged, var$3, var$4, $$je;
    if ($speed < 0)
        $speed = 0;
    else if ($speed > 100)
        $speed = 100;
    jl_Object_monitorEnterSync($this);
    a: {
        b: {
            c: {
                d: {
                    try {
                        if ($this.$speed != $speed)
                            break d;
                        $speedChanged = 0;
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$3 = $$je;
                        break b;

                    }
                }
                try {
                    $speedChanged = 1;
                    break c;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$3 = $$je;
                    break b;

                }
            }
            e: {
                try {
                    if (!$speedChanged)
                        break e;
                    $this.$speed = $speed;
                    $this.$delegate.$setSpeed($speed);
                    $this.$delay = gc_Simulation_calculateDelay($this, $speed);
                    if ($this.$paused)
                        break e;
                    var$3 = $this.$interruptLock;
                    jl_Object_monitorEnterSync(var$3);
                    f: {
                        g: {
                            h: {
                                try {
                                    if (!$this.$delaying)
                                        break h;
                                    $this.$interrupt();
                                    break h;
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    var$4 = $$je;
                                    break g;

                                }
                            }
                            try {
                                jl_Object_monitorExitSync(var$3);
                                break f;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$4 = $$je;
                                break g;

                            }
                        }
                        jl_Object_monitorExitSync(var$3);
                        $rt_throw(var$4);
                    }
                    break e;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$3 = $$je;
                    break b;

                }
            }
            try {
                jl_Object_monitorExitSync($this);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$3 = $$je;
                break b;

            }
        }
        jl_Object_monitorExitSync($this);
        $rt_throw(var$3);
    }
    if ($speedChanged)
        gc_Simulation_fireSimulationEvent($this, $this.$speedChangeEvent);
}
function gc_Simulation_calculateDelay($this, $speed) {
    var $rawDelay, var$3, $a, $delay;
    $rawDelay = Long_fromInt(100 - $speed | 0);
    var$3 = 30000.0;
    $a = jl_Math_pow(333333.3333333333, 0.010101010101010102);
    $delay = Long_ZERO;
    if (Long_gt($rawDelay, Long_ZERO))
        $delay = Long_fromNumber(jl_Math_pow($a, Long_toNumber(Long_sub($rawDelay, Long_fromInt(1)))) * var$3);
    return $delay;
}
function gc_Simulation_getSpeed($this) {
    jl_Object_monitorEnterSync($this);
    try {
        return $this.$speed;
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
function gc_Simulation_delay($this) {
    var $currentTime, $timeElapsed, $actualDelay, var$4, var$5, var$6, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();$actualDelay = $thread.pop();$timeElapsed = $thread.pop();$currentTime = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $currentTime = jl_System_nanoTime();
        $timeElapsed = Long_sub($currentTime, $this.$lastDelayTime);
        $actualDelay = jl_Math_max1(Long_sub($this.$delay, $timeElapsed), Long_ZERO);
        $ptr = 1;
    case 1:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        try {
            var$4 = $this.$interruptLock;
            $ptr = 2;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;

        }
        jl_Object_monitorExit($this);
        $rt_throw(var$4);
    case 2:
        a: {
            b: {
                try {
                    jl_Object_monitorEnter(var$4);
                    if ($rt_suspending()) {
                        break main;
                    }
                    c: {
                        d: {
                            e: {
                                try {
                                    if (!$this.$interruptDelay)
                                        break e;
                                    $this.$interruptDelay = 0;
                                    if (!$this.$paused && !$this.$abort)
                                        break e;
                                    $this.$lastDelayTime = $currentTime;
                                    jl_Object_monitorExit(var$4);
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    var$4 = $$je;
                                    break b;

                                }
                                jl_Object_monitorExit($this);
                                return;
                            }
                            try {
                                $this.$delaying = 1;
                                jl_Object_monitorExit(var$4);
                                break c;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$5 = $$je;
                                break d;

                            }
                        }
                        try {
                            jl_Object_monitorExit(var$4);
                            $rt_throw(var$5);
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$4 = $$je;
                            break b;

                        }
                    }
                    jl_Object_monitorExit($this);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$4 = $$je;
                    break b;

                }
            }
            jl_Object_monitorExit($this);
            $rt_throw(var$4);
        }
        if (Long_eq($actualDelay, Long_ZERO))
            try {
                var$6 = Long_ZERO;
                $ptr = 3;
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                } else {
                    throw $$e;
                }
            }
        if (Long_le($actualDelay, Long_ZERO)) {
            $this.$lastDelayTime = $currentTime;
            var$4 = $this.$interruptLock;
            $ptr = 4;
            continue main;
        }
        try {
            var$6 = Long_div($actualDelay, Long_fromInt(1000000));
            $ptr = 5;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_InterruptedException) {
            } else {
                throw $$e;
            }
        }
        $ptr = 6;
        continue main;
    case 3:
        a: {
            try {
                jl_Thread_sleep(var$6);
                if ($rt_suspending()) {
                    break main;
                }
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
        }
        if (Long_le($actualDelay, Long_ZERO)) {
            $this.$lastDelayTime = $currentTime;
            var$4 = $this.$interruptLock;
            $ptr = 4;
            continue main;
        }
        try {
            var$6 = Long_div($actualDelay, Long_fromInt(1000000));
            $ptr = 5;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_InterruptedException) {
            } else {
                throw $$e;
            }
        }
        $ptr = 6;
        continue main;
    case 4:
        jl_Object_monitorEnter(var$4);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            try {
                jl_Thread_interrupted();
                $this.$interruptDelay = 0;
                $this.$delaying = 0;
                jl_Object_monitorExit(var$4);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$5 = $$je;
                break a;

            }
            return;
        }
        jl_Object_monitorExit(var$4);
        $rt_throw(var$5);
    case 5:
        a: {
            try {
                jl_Thread_sleep(var$6);
                if ($rt_suspending()) {
                    break main;
                }
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
            $currentTime = jl_System_nanoTime();
            var$6 = Long_sub($currentTime, $this.$lastDelayTime);
            $actualDelay = Long_sub($this.$delay, var$6);
            if (Long_le($actualDelay, Long_ZERO)) {
                $this.$lastDelayTime = $currentTime;
                var$4 = $this.$interruptLock;
                $ptr = 4;
                continue main;
            }
            try {
                var$6 = Long_div($actualDelay, Long_fromInt(1000000));
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
        }
        $ptr = 6;
    case 6:
        jl_Object_monitorEnter($this);
        if ($rt_suspending()) {
            break main;
        }
        b: {
            c: {
                d: {
                    e: {
                        f: {
                            try {
                                if (!$this.$enabled)
                                    break f;
                                if ($this.$paused)
                                    break f;
                                if (!$this.$abort)
                                    break e;
                                else
                                    break f;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$4 = $$je;
                                break d;

                            }
                        }
                        try {
                            jl_Object_monitorExit($this);
                            break b;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$4 = $$je;
                            break d;

                        }
                    }
                    try {
                        jl_Object_monitorExit($this);
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$4 = $$je;
                        break d;

                    }
                }
                jl_Object_monitorExit($this);
                $rt_throw(var$4);
            }
            $currentTime = jl_System_nanoTime();
            var$6 = Long_sub($currentTime, $this.$lastDelayTime);
            $actualDelay = Long_sub($this.$delay, var$6);
            if (Long_gt($actualDelay, Long_ZERO)) {
                try {
                    var$6 = Long_div($actualDelay, Long_fromInt(1000000));
                    $ptr = 5;
                    continue main;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_InterruptedException) {
                    } else {
                        throw $$e;
                    }
                }
                continue main;
            }
        }
        $this.$lastDelayTime = $currentTime;
        var$4 = $this.$interruptLock;
        $ptr = 4;
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $currentTime, $timeElapsed, $actualDelay, var$4, var$5, var$6, $ptr);
}
function gc_Simulation_worldCreated($this, $e) {
    $this.$setEnabled(1);
}
function gc_Simulation_worldRemoved($this, $e) {
    var var$2, var$3, $$je;
    $this.$setEnabled(0);
    var$2 = $this.$interruptLock;
    jl_Object_monitorEnterSync(var$2);
    a: {
        b: {
            c: {
                try {
                    if ($this.$asking)
                        break c;
                    if (!$this.$delaying)
                        break b;
                    else
                        break c;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$3 = $$je;
                    break a;

                }
            }
            try {
                $this.$interrupt();
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$3 = $$je;
                break a;

            }
        }
        try {
            jl_Object_monitorExitSync(var$2);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$3 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync(var$2);
    $rt_throw(var$3);
}
function gc_Simulation__clinit_() {
    gc_Simulation_RUN_QUEUED_TASKS = $rt_s(36);
}
function g_GreenfootSound() {
    var a = this; jl_Object.call(a);
    a.$sound = null;
    a.$filename = null;
}
function g_GreenfootSound__init_0(var_0) {
    var var_1 = new g_GreenfootSound();
    g_GreenfootSound__init_(var_1, var_0);
    return var_1;
}
function g_GreenfootSound__init_($this, $filename) {
    var var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$filename = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        jl_Object__init_0($this);
        $this.$filename = $filename;
        var$2 = gs_SoundFactory_getInstance();
        var$3 = 0;
        $ptr = 1;
    case 1:
        $tmp = var$2.$createSound($filename, var$3);
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $tmp;
        $this.$sound = var$2;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $filename, var$2, var$3, $ptr);
}
function g_GreenfootSound_play($this) {
    $this.$sound.$play();
}
function g_GreenfootSound_playLoop($this) {
    $this.$sound.$loop();
}
function g_GreenfootSound_stop($this) {
    $this.$sound.$stop();
}
function g_GreenfootSound_setVolume($this, $level) {
    $this.$sound.$setVolume($level);
}
function jlr_Array() {
    jl_Object.call(this);
}
function jlr_Array__init_() {
    var var_0 = new jlr_Array();
    jlr_Array__init_0(var_0);
    return var_0;
}
function jlr_Array__init_0($this) {
    jl_Object__init_0($this);
}
function jlr_Array_getLength(var$1) {
    if (var$1 === null || var$1.constructor.$meta.item === undefined) {
        $rt_throw(jl_IllegalArgumentException__init_0());
    }
    return var$1.data.length;
}
function jlr_Array_newInstance($componentType, $length) {
    if ($componentType === null)
        $rt_throw(jl_NullPointerException__init_());
    if ($componentType === $rt_cls($rt_voidcls()))
        $rt_throw(jl_IllegalArgumentException__init_0());
    if ($length < 0)
        $rt_throw(jl_NegativeArraySizeException__init_());
    return jlr_Array_newInstanceImpl($componentType.$getPlatformClass(), $length);
}
function jlr_Array_newInstanceImpl(var$1, var$2) {
    if (var$1.$meta.primitive) {
        if (var$1 == $rt_bytecls()) {
            return $rt_createByteArray(var$2);
        }
        if (var$1 == $rt_shortcls()) {
            return $rt_createShortArray(var$2);
        }
        if (var$1 == $rt_charcls()) {
            return $rt_createCharArray(var$2);
        }
        if (var$1 == $rt_intcls()) {
            return $rt_createIntArray(var$2);
        }
        if (var$1 == $rt_longcls()) {
            return $rt_createLongArray(var$2);
        }
        if (var$1 == $rt_floatcls()) {
            return $rt_createFloatArray(var$2);
        }
        if (var$1 == $rt_doublecls()) {
            return $rt_createDoubleArray(var$2);
        }
        if (var$1 == $rt_booleancls()) {
            return $rt_createBooleanArray(var$2);
        }
    } else {
        return $rt_createArray(var$1, var$2)
    }
}
function jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0() {
    jl_Object.call(this);
    this.$_09 = null;
}
function jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0__init_(var_0) {
    var var_1 = new jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0();
    jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0__init_0(var_1, var_0);
    return var_1;
}
function jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_09 = var$1;
}
function jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0_run(var$0) {
    jl_Object$NotifyListenerImpl_lambda$interrupted$3(var$0.$_09);
}
function gu_GreenfootUtil() {
    jl_Object.call(this);
}
var gu_GreenfootUtil_delegate = null;
var gu_GreenfootUtil_imageCache = null;
var gu_GreenfootUtil_mp3available = 0;
function gu_GreenfootUtil_$callClinit() {
    gu_GreenfootUtil_$callClinit = $rt_eraseClinit(gu_GreenfootUtil);
    gu_GreenfootUtil__clinit_();
}
function gu_GreenfootUtil__init_() {
    var var_0 = new gu_GreenfootUtil();
    gu_GreenfootUtil__init_0(var_0);
    return var_0;
}
function gu_GreenfootUtil__init_0($this) {
    gu_GreenfootUtil_$callClinit();
    jl_Object__init_0($this);
}
function gu_GreenfootUtil_initialise($newDelegate) {
    gu_GreenfootUtil_$callClinit();
    gu_GreenfootUtil_delegate = $newDelegate;
    gu_GreenfootUtil_imageCache = gc_ImageCache_getInstance();
}
function gu_GreenfootUtil_getGreenfootLogoPath() {
    gu_GreenfootUtil_$callClinit();
    return gu_GreenfootUtil_delegate.$getGreenfootLogoPath();
}
function gu_GreenfootUtil_addCachedImage($name, $image) {
    gu_GreenfootUtil_$callClinit();
    return gu_GreenfootUtil_imageCache.$addCachedImage($name, $image);
}
function gu_GreenfootUtil_getCachedImage($name) {
    gu_GreenfootUtil_$callClinit();
    return gu_GreenfootUtil_imageCache.$getCachedImage($name);
}
function gu_GreenfootUtil_getLines($string) {
    var $lines, $i, $p, var$5;
    gu_GreenfootUtil_$callClinit();
    $lines = ju_ArrayList__init_();
    $i = $string.$indexOf0(10);
    $p = 0;
    while ($i != (-1)) {
        var$5 = $i <= $p ? $i : $string.$charAt($i - 1 | 0) != 13 ? $i : $i + (-1) | 0;
        $lines.$add0($string.$substring($p, var$5));
        $p = $i + 1 | 0;
        $i = $string.$indexOf(10, $p);
    }
    if ($p < $string.$length())
        $lines.$add0($string.$substring0($p));
    return $lines;
}
function gu_GreenfootUtil__clinit_() {
    gu_GreenfootUtil_mp3available = 0;
}
function ju_ListIterator() {
}
function Label() {
    Text.call(this);
    this.$info = null;
}
var Label_calibri = null;
var Label_black = null;
function Label_$callClinit() {
    Label_$callClinit = $rt_eraseClinit(Label);
    Label__clinit_();
}
function Label__init_0(var_0) {
    var var_1 = new Label();
    Label__init_(var_1, var_0);
    return var_1;
}
function Label__init_($this, $info) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$info = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        Label_$callClinit();
        $ptr = 1;
    case 1:
        Text__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$info = $info;
        Label_updateLabel($this);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $info, $ptr);
}
function Label_act($this) {
    $this.$setImage(Label_updateLabel($this));
}
function Label_updateLabel($this) {
    var $image;
    $image = g_GreenfootImage__init_0(100, 110);
    $image.$setColor(Label_black);
    $image.$setFont(Label_calibri);
    $image.$drawString($this.$info, 0, 100);
    return $image;
}
function Label__clinit_() {
    Label_calibri = g_Font__init_($rt_s(27), 0, 1, 45);
    g_Color_$callClinit();
    Label_black = g_Color_BLACK;
}
function otcit_DoubleAnalyzer$Result() {
    var a = this; jl_Object.call(a);
    a.$mantissa = Long_ZERO;
    a.$exponent = 0;
    a.$sign = 0;
}
function otcit_DoubleAnalyzer$Result__init_() {
    var var_0 = new otcit_DoubleAnalyzer$Result();
    otcit_DoubleAnalyzer$Result__init_0(var_0);
    return var_0;
}
function otcit_DoubleAnalyzer$Result__init_0($this) {
    jl_Object__init_0($this);
}
function ju_Random() {
    jl_Object.call(this);
}
function ju_Random__init_() {
    var var_0 = new ju_Random();
    ju_Random__init_0(var_0);
    return var_0;
}
function ju_Random__init_0($this) {
    jl_Object__init_0($this);
}
function ju_Random_nextInt($this, $n) {
    return $this.$nextDouble() * $n | 0;
}
function ju_Random_nextDouble($this) {
    return Math.random();
}
function otpp_ResourceAccessor() {
    jl_Object.call(this);
}
function otpp_ResourceAccessor__init_() {
    var var_0 = new otpp_ResourceAccessor();
    otpp_ResourceAccessor__init_0(var_0);
    return var_0;
}
function otpp_ResourceAccessor__init_0($this) {
    jl_Object__init_0($this);
}
function jl_NoSuchFieldError() {
    jl_IncompatibleClassChangeError.call(this);
}
function jl_NoSuchFieldError__init_() {
    var var_0 = new jl_NoSuchFieldError();
    jl_NoSuchFieldError__init_0(var_0);
    return var_0;
}
function jl_NoSuchFieldError__init_1(var_0) {
    var var_1 = new jl_NoSuchFieldError();
    jl_NoSuchFieldError__init_2(var_1, var_0);
    return var_1;
}
function jl_NoSuchFieldError__init_0($this) {
    jl_IncompatibleClassChangeError__init_0($this);
}
function jl_NoSuchFieldError__init_2($this, $message) {
    jl_IncompatibleClassChangeError__init_2($this, $message);
}
function jl_Iterable() {
}
function ju_Collection() {
}
function ju_AbstractCollection() {
    jl_Object.call(this);
}
function ju_AbstractCollection__init_() {
    var var_0 = new ju_AbstractCollection();
    ju_AbstractCollection__init_0(var_0);
    return var_0;
}
function ju_AbstractCollection__init_0($this) {
    jl_Object__init_0($this);
}
function ju_AbstractCollection_isEmpty($this) {
    return $this.$size() ? 0 : 1;
}
function ju_AbstractCollection_toArray($this) {
    var $arr, $i, $iter, var$4, var$5;
    $arr = $rt_createArray(jl_Object, $this.$size());
    $i = 0;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        var$4 = $arr.data;
        var$5 = $i + 1 | 0;
        var$4[$i] = $iter.$next();
        $i = var$5;
    }
    return $arr;
}
function ju_AbstractCollection_toArray0($this, $a) {
    var var$2, $i, var$4, $iter;
    var$2 = $a.data;
    $i = $this.$size();
    var$4 = var$2.length;
    if (var$4 < $i)
        $a = jlr_Array_newInstance(jl_Object_getClass($a).$getComponentType(), $i);
    else
        while ($i < var$4) {
            var$2[$i] = null;
            $i = $i + 1 | 0;
        }
    $i = 0;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        var$2 = $a.data;
        var$4 = $i + 1 | 0;
        var$2[$i] = $iter.$next();
        $i = var$4;
    }
    return $a;
}
function ju_AbstractCollection_remove($this, $o) {
    var $iter, $e;
    $iter = $this.$iterator();
    a: {
        while ($iter.$hasNext()) {
            b: {
                $e = $iter.$next();
                if ($e !== null) {
                    if (!$e.$equals($o))
                        break b;
                    else
                        break a;
                }
                if ($o === null)
                    break a;
            }
        }
        return 0;
    }
    $iter.$remove0();
    return 1;
}
function ju_AbstractCollection_addAll($this, $c) {
    var $changed, $iter;
    $changed = 0;
    $iter = $c.$iterator();
    while ($iter.$hasNext()) {
        if (!$this.$add0($iter.$next()))
            continue;
        $changed = 1;
    }
    return $changed;
}
function gu_GraphicsUtilities() {
    jl_Object.call(this);
}
function gu_GraphicsUtilities__init_() {
    var var_0 = new gu_GraphicsUtilities();
    gu_GraphicsUtilities__init_0(var_0);
    return var_0;
}
function gu_GraphicsUtilities__init_0($this) {
    jl_Object__init_0($this);
}
function gu_GraphicsUtilities_getFontHeightPx($fontFamily, $size) {
    return gu_GraphicsUtilities_getFontHeightPx0(jl_StringBuilder__init_().$append($size).$append($rt_s(37)).$append($fontFamily).$toString());
}
function gu_GraphicsUtilities_getFontHeightPx0($fontString) {
    var $doc, var$3, $tspan, var$5, $tdiv, var$7, var$8, $textHeight;
    $doc = otjdh_HTMLDocument_current();
    var$3 = $rt_s(38);
    $tspan = $doc.createElement($rt_ustr(var$3));
    var$5 = $tspan.style;
    var$3 = $rt_s(39);
    var$5.setProperty($rt_ustr(var$3), $rt_ustr($fontString));
    var$3 = "MMM";
    $tspan.innerHTML = var$3;
    var$3 = $rt_s(40);
    $tdiv = $doc.createElement($rt_ustr(var$3));
    var$7 = $tdiv.style;
    var$3 = $rt_s(41);
    var$5 = $rt_s(42);
    var$7.setProperty($rt_ustr(var$3), $rt_ustr(var$5));
    var$8 = $tdiv.style;
    var$3 = $rt_s(43);
    var$5 = $rt_s(44);
    var$8.setProperty($rt_ustr(var$3), $rt_ustr(var$5));
    var$7 = $tdiv.style;
    var$3 = $rt_s(45);
    var$5 = $rt_s(46);
    var$7.setProperty($rt_ustr(var$3), $rt_ustr(var$5));
    $tdiv.appendChild($tspan);
    $doc.body.appendChild($tdiv);
    $textHeight = $tspan.scrollHeight;
    if (!$textHeight)
        $textHeight = $tdiv.scrollHeight;
    $doc.body.removeChild($tdiv);
    return $textHeight;
}
function gu_GraphicsUtilities_getFontMetricsPx($fontString) {
    var $doc, var$3, $tdiv, var$5, var$6, $idiv, $tspan, $baselineDiv, var$10, $textHeight, $baseLine, var$13, var$14;
    $doc = otjdh_HTMLDocument_current();
    var$3 = $rt_s(40);
    $tdiv = $doc.createElement($rt_ustr(var$3));
    var$5 = $tdiv.style;
    var$6 = $rt_s(41);
    var$3 = $rt_s(42);
    var$5.setProperty($rt_ustr(var$6), $rt_ustr(var$3));
    var$5 = $tdiv.style;
    var$3 = $rt_s(43);
    var$6 = $rt_s(44);
    var$5.setProperty($rt_ustr(var$3), $rt_ustr(var$6));
    var$5 = $tdiv.style;
    var$3 = $rt_s(45);
    var$6 = $rt_s(46);
    var$5.setProperty($rt_ustr(var$3), $rt_ustr(var$6));
    var$3 = $rt_s(40);
    $idiv = $doc.createElement($rt_ustr(var$3));
    var$5 = $idiv.style;
    var$3 = $rt_s(47);
    var$6 = $rt_s(48);
    var$5.setProperty($rt_ustr(var$3), $rt_ustr(var$6));
    var$3 = $rt_s(38);
    $tspan = $doc.createElement($rt_ustr(var$3));
    var$6 = $tspan.style;
    var$3 = $rt_s(39);
    var$6.setProperty($rt_ustr(var$3), $rt_ustr($fontString));
    var$3 = "MMM";
    $tspan.innerHTML = var$3;
    $tdiv.appendChild($idiv);
    $idiv.appendChild($tspan);
    $doc.body.appendChild($tdiv);
    var$6 = $rt_s(40);
    $baselineDiv = $doc.createElement($rt_ustr(var$6));
    var$3 = $baselineDiv.style;
    var$5 = $rt_s(49);
    var$10 = $rt_s(50);
    var$3.setProperty($rt_ustr(var$5), $rt_ustr(var$10));
    var$3 = $baselineDiv.style;
    var$5 = $rt_s(51);
    var$10 = $rt_s(52);
    var$3.setProperty($rt_ustr(var$5), $rt_ustr(var$10));
    var$3 = $baselineDiv.style;
    var$5 = $rt_s(53);
    var$10 = $rt_s(54);
    var$3.setProperty($rt_ustr(var$5), $rt_ustr(var$10));
    var$3 = $baselineDiv.style;
    var$5 = $rt_s(55);
    var$10 = $rt_s(54);
    var$3.setProperty($rt_ustr(var$5), $rt_ustr(var$10));
    $idiv.appendChild($baselineDiv);
    $textHeight = $tspan.scrollHeight;
    if (!$textHeight)
        $textHeight = $tdiv.scrollHeight;
    $baseLine = ($baselineDiv.offsetTop - $idiv.offsetTop | 0) + 1 | 0;
    $doc.body.removeChild($tdiv);
    var$13 = $rt_createIntArray(2);
    var$14 = var$13.data;
    var$14[0] = $textHeight;
    var$14[1] = $baseLine;
    return var$13;
}
function ji_ByteArrayInputStream() {
    var a = this; ji_InputStream.call(a);
    a.$buf0 = null;
    a.$pos0 = 0;
    a.$mark1 = 0;
    a.$count1 = 0;
}
function ji_ByteArrayInputStream__init_(var_0, var_1, var_2) {
    var var_3 = new ji_ByteArrayInputStream();
    ji_ByteArrayInputStream__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function ji_ByteArrayInputStream__init_1(var_0) {
    var var_1 = new ji_ByteArrayInputStream();
    ji_ByteArrayInputStream__init_2(var_1, var_0);
    return var_1;
}
function ji_ByteArrayInputStream__init_0($this, $buf, $offset, $length) {
    ji_InputStream__init_0($this);
    $this.$buf0 = $buf;
    $this.$pos0 = $offset;
    $this.$mark1 = $offset;
    $this.$count1 = $offset + $length | 0;
}
function ji_ByteArrayInputStream__init_2($this, $buf) {
    var var$2;
    var$2 = $buf.data;
    ji_ByteArrayInputStream__init_0($this, $buf, 0, var$2.length);
}
function ji_ByteArrayInputStream_read($this, $b, $off, $len) {
    var $bytesToRead, $i, var$6, var$7, var$8, var$9;
    $bytesToRead = jl_Math_min($len, $this.$count1 - $this.$pos0 | 0);
    $i = 0;
    while ($i < $bytesToRead) {
        var$6 = $b.data;
        var$7 = $off + 1 | 0;
        var$8 = $this.$buf0.data;
        var$9 = $this.$pos0;
        $this.$pos0 = var$9 + 1 | 0;
        var$6[$off] = var$8[var$9];
        $i = $i + 1 | 0;
        $off = var$7;
    }
    if ($bytesToRead <= 0)
        $bytesToRead = (-1);
    return $bytesToRead;
}
function otci_IntegerUtil() {
    jl_Object.call(this);
}
function otci_IntegerUtil__init_() {
    var var_0 = new otci_IntegerUtil();
    otci_IntegerUtil__init_0(var_0);
    return var_0;
}
function otci_IntegerUtil__init_0($this) {
    jl_Object__init_0($this);
}
function otci_IntegerUtil_toUnsignedLogRadixString($value, $radixLog2) {
    var $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0;
    if (!$value)
        return $rt_s(46);
    $radix = 1 << $radixLog2;
    $mask = $radix - 1 | 0;
    $sz = (((32 - jl_Integer_numberOfLeadingZeros($value) | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
    $chars = $rt_createCharArray($sz);
    $pos = $rt_imul($sz - 1 | 0, $radixLog2);
    $target = 0;
    while ($pos >= 0) {
        var$9 = $chars.data;
        $target_0 = $target + 1 | 0;
        var$9[$target] = jl_Character_forDigit($value >>> $pos & $mask, $radix);
        $pos = $pos - $radixLog2 | 0;
        $target = $target_0;
    }
    return jl_String__init_($chars);
}
function LinkBox() {
    var a = this; Text.call(a);
    a.$text = null;
    a.$frame = 0;
    a.$invalidDisplayTimer = 0;
    a.$keyTimer = 0;
    a.$index0 = 0;
    a.$showCursor = 0;
    a.$displayInvalid = 0;
    a.$selected = 0;
    a.$valid = 0;
    a.$keysLastLoop = null;
    a.$mostRecentChar = null;
    a.$invalidMessage = null;
}
var LinkBox_calibri = null;
var LinkBox_keys = null;
var LinkBox_shiftKeys = null;
var LinkBox_settings = null;
var LinkBox_LIGHT_GRAY = null;
function LinkBox_$callClinit() {
    LinkBox_$callClinit = $rt_eraseClinit(LinkBox);
    LinkBox__clinit_();
}
function LinkBox__init_0() {
    var var_0 = new LinkBox();
    LinkBox__init_(var_0);
    return var_0;
}
function LinkBox__init_($this) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        LinkBox_$callClinit();
        $ptr = 1;
    case 1:
        Text__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$index0 = 0;
        $this.$text = $rt_s(56);
        $this.$frame = 0;
        $this.$showCursor = 0;
        $this.$displayInvalid = 0;
        $this.$selected = 0;
        $this.$invalidDisplayTimer = 0;
        $this.$keysLastLoop = ju_ArrayList__init_();
        $this.$keyTimer = 0;
        $this.$invalidMessage = $rt_s(57);
        $this.$mostRecentChar = $rt_s(56);
        $ptr = 2;
    case 2:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $tmp;
        $this.$setImage(var$1);
        $this.$getText();
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function LinkBox_resetImage($this) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        $tmp = $this.$getTextImage();
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $tmp;
        return var$1;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function LinkBox_act($this) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        $tmp = $this.$getTextImage();
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $tmp;
        $this.$setImage(var$1);
        if (!($this.$frame % 30 | 0))
            $this.$showCursor = $this.$showCursor ? 0 : 1;
        $this.$frame = $this.$frame + 1 | 0;
        if ($this.$selected)
            $this.$checkKeys();
        $this.$checkEnterAndUnselect();
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function LinkBox_checkKeys($this) {
    var $i, $key, $specialKey, $symbol;
    $i = 0;
    while ($i < LinkBox_keys.data.length) {
        $key = LinkBox_keys.data[$i];
        $specialKey = !$key.$equals($rt_s(58)) && !$key.$equals($rt_s(59)) && !$key.$equals($rt_s(60)) ? 0 : 1;
        if (!g_Greenfoot_isKeyDown($key)) {
            if ($this.$keysLastLoop.$indexOf1($key) != (-1))
                $this.$keysLastLoop.$remove1($key);
            if (!$specialKey && $this.$keysLastLoop.$indexOf1(LinkBox_shiftKeys.data[$i]) != (-1))
                $this.$keysLastLoop.$remove1(LinkBox_shiftKeys.data[$i]);
        } else {
            $symbol = $specialKey ? $key : !g_Greenfoot_isKeyDown($rt_s(61)) && !$key.$equals($rt_s(62)) && !$key.$equals($rt_s(63)) ? $key : LinkBox_shiftKeys.data[$i];
            if ($this.$keysLastLoop.$indexOf1($key) == (-1) && !(!$specialKey && $this.$keysLastLoop.$indexOf1(LinkBox_shiftKeys.data[$i]) != (-1))) {
                $this.$keyTimer = 0;
                $this.$keyBehavior($symbol);
            }
        }
        $i = $i + 1 | 0;
    }
    if (!g_Greenfoot_isKeyDown($this.$mostRecentChar))
        $this.$keyTimer = 0;
    else if ($this.$keyTimer == 30)
        $this.$keyBehavior($this.$mostRecentChar);
    else
        $this.$keyTimer = $this.$keyTimer + 1 | 0;
}
function LinkBox_keyBehavior($this, $symbol) {
    var var$2, var$3, var$4;
    $this.$showCursor = 1;
    $this.$mostRecentChar = $symbol;
    if ($this.$keysLastLoop.$indexOf1($symbol) == (-1))
        $this.$keysLastLoop.$add0($symbol);
    if (g_Greenfoot_isKeyDown($rt_s(58))) {
        if ($this.$index0 > 0) {
            var$2 = $this.$text.$substring(0, $this.$index0 - 1 | 0);
            var$3 = $this.$text.$substring0($this.$index0);
            var$4 = jl_StringBuilder__init_();
            jl_StringBuilder_append0(jl_StringBuilder_append0(var$4, var$2), var$3);
            $this.$text = jl_StringBuilder_toString(var$4);
            $this.$index0 = $this.$index0 - 1 | 0;
        }
    } else if (g_Greenfoot_isKeyDown($rt_s(60))) {
        if ($this.$index0 > 0)
            $this.$index0 = $this.$index0 - 1 | 0;
    } else if (!g_Greenfoot_isKeyDown($rt_s(59))) {
        if (g_Greenfoot_isKeyDown($rt_s(64)) && g_Greenfoot_isKeyDown($rt_s(65)))
            $symbol = $this.$getClipboardContents();
        var$2 = $this.$text.$substring(0, $this.$index0);
        var$3 = $this.$text.$substring0($this.$index0);
        var$4 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append0(jl_StringBuilder_append0(var$4, var$2), $symbol), var$3);
        $this.$text = jl_StringBuilder_toString(var$4);
        $this.$index0 = $this.$index0 + $symbol.$length() | 0;
    } else if ($this.$index0 < $this.$text.$length())
        $this.$index0 = $this.$index0 + 1 | 0;
}
function LinkBox_checkEnterAndUnselect($this) {
    if (!g_Greenfoot_isKeyDown($rt_s(66))) {
        if ($this.$keysLastLoop.$indexOf1($rt_s(66)) != (-1))
            $this.$keysLastLoop.$remove1($rt_s(66));
    } else if ($this.$keysLastLoop.$indexOf1($rt_s(66)) == (-1)) {
        $this.$updateValidity();
        $this.$selected = 0;
        $this.$keysLastLoop.$add0($rt_s(66));
    }
    if (g_Greenfoot_mouseClicked($this) && !$this.$selected) {
        SoundManager_playSound($rt_s(17), 100);
        $this.$text = $rt_s(56);
        $this.$index0 = $this.$text.$length();
        $this.$updateValidity();
        $this.$showCursor = 1;
        $this.$selected = 1;
    } else if (g_Greenfoot_mouseClicked(null)) {
        $this.$updateValidity();
        $this.$selected = 0;
    }
}
function LinkBox_getTextImage($this) {
    var $fileName, $image, $cursor, var$4, var$5, var$6, $displayText, $endIndex, $startIndex, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$startIndex = $thread.pop();$endIndex = $thread.pop();$displayText = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();$cursor = $thread.pop();$image = $thread.pop();$fileName = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $fileName = $this.$selected ? $rt_s(67) : !$this.$valid ? $rt_s(68) : $rt_s(69);
        $image = new g_GreenfootImage;
        $ptr = 1;
    case 1:
        g_GreenfootImage__init_($image, $fileName);
        if ($rt_suspending()) {
            break main;
        }
        $image.$setFont(LinkBox_calibri);
        if ($this.$displayInvalid) {
            g_Color_$callClinit();
            $image.$setColor(g_Color_RED);
            $image.$drawString($this.$invalidMessage, 8, 15);
            $this.$invalidDisplayTimer = $this.$invalidDisplayTimer + 1 | 0;
            if ($this.$invalidDisplayTimer == 60) {
                $this.$invalidDisplayTimer = 0;
                $this.$displayInvalid = 0;
            }
        } else {
            g_Color_$callClinit();
            $image.$setColor(g_Color_BLACK);
            $cursor = $rt_s(37);
            if ($this.$showCursor && $this.$selected)
                $cursor = $rt_s(70);
            var$4 = $this.$text.$substring(0, $this.$index0);
            var$5 = $this.$text.$substring0($this.$index0);
            var$6 = jl_StringBuilder__init_();
            jl_StringBuilder_append0(jl_StringBuilder_append0(jl_StringBuilder_append0(var$6, var$4), $cursor), var$5);
            $displayText = jl_StringBuilder_toString(var$6);
            if ($displayText.$length() > 16) {
                $endIndex = jl_Math_max($this.$index0 + 1 | 0, jl_Math_min(16, $displayText.$length()));
                $startIndex = $endIndex - jl_Math_min($displayText.$length(), 16) | 0;
                $displayText = $displayText.$substring($startIndex, $endIndex);
            }
            $image.$drawString($displayText, 8, 15);
        }
        return $image;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $fileName, $image, $cursor, var$4, var$5, var$6, $displayText, $endIndex, $startIndex, $ptr);
}
function LinkBox_getClipboardContents($this) {
    var $string;
    $string = $rt_s(71);
    return $string;
}
function LinkBox_getText($this) {
    return $this.$text;
}
function LinkBox_updateValidity($this) {
    $this.$valid = 1;
}
function LinkBox_isValid($this) {
    return $this.$valid;
}
function LinkBox__clinit_() {
    var var$1, var$2;
    LinkBox_calibri = g_Font__init_($rt_s(27), 0, 1, 10);
    var$1 = $rt_createArray(jl_String, 52);
    var$2 = var$1.data;
    var$2[0] = $rt_s(72);
    var$2[1] = $rt_s(73);
    var$2[2] = $rt_s(74);
    var$2[3] = $rt_s(75);
    var$2[4] = $rt_s(76);
    var$2[5] = $rt_s(77);
    var$2[6] = $rt_s(78);
    var$2[7] = $rt_s(79);
    var$2[8] = $rt_s(80);
    var$2[9] = $rt_s(81);
    var$2[10] = $rt_s(46);
    var$2[11] = $rt_s(82);
    var$2[12] = $rt_s(83);
    var$2[13] = $rt_s(84);
    var$2[14] = $rt_s(85);
    var$2[15] = $rt_s(86);
    var$2[16] = $rt_s(87);
    var$2[17] = $rt_s(88);
    var$2[18] = $rt_s(89);
    var$2[19] = $rt_s(90);
    var$2[20] = $rt_s(91);
    var$2[21] = $rt_s(92);
    var$2[22] = $rt_s(93);
    var$2[23] = $rt_s(94);
    var$2[24] = $rt_s(30);
    var$2[25] = $rt_s(95);
    var$2[26] = $rt_s(96);
    var$2[27] = $rt_s(97);
    var$2[28] = $rt_s(98);
    var$2[29] = $rt_s(99);
    var$2[30] = $rt_s(100);
    var$2[31] = $rt_s(101);
    var$2[32] = $rt_s(102);
    var$2[33] = $rt_s(103);
    var$2[34] = $rt_s(104);
    var$2[35] = $rt_s(105);
    var$2[36] = $rt_s(106);
    var$2[37] = $rt_s(107);
    var$2[38] = $rt_s(108);
    var$2[39] = $rt_s(109);
    var$2[40] = $rt_s(65);
    var$2[41] = $rt_s(110);
    var$2[42] = $rt_s(111);
    var$2[43] = $rt_s(112);
    var$2[44] = $rt_s(113);
    var$2[45] = $rt_s(114);
    var$2[46] = $rt_s(115);
    var$2[47] = $rt_s(62);
    var$2[48] = $rt_s(63);
    var$2[49] = $rt_s(58);
    var$2[50] = $rt_s(60);
    var$2[51] = $rt_s(59);
    LinkBox_keys = var$1;
    var$1 = $rt_createArray(jl_String, 49);
    var$2 = var$1.data;
    var$2[0] = $rt_s(116);
    var$2[1] = $rt_s(117);
    var$2[2] = $rt_s(1);
    var$2[3] = $rt_s(118);
    var$2[4] = $rt_s(119);
    var$2[5] = $rt_s(120);
    var$2[6] = $rt_s(121);
    var$2[7] = $rt_s(122);
    var$2[8] = $rt_s(123);
    var$2[9] = $rt_s(124);
    var$2[10] = $rt_s(125);
    var$2[11] = $rt_s(70);
    var$2[12] = $rt_s(126);
    var$2[13] = $rt_s(127);
    var$2[14] = $rt_s(128);
    var$2[15] = $rt_s(129);
    var$2[16] = $rt_s(130);
    var$2[17] = $rt_s(131);
    var$2[18] = $rt_s(132);
    var$2[19] = $rt_s(133);
    var$2[20] = $rt_s(134);
    var$2[21] = $rt_s(135);
    var$2[22] = $rt_s(136);
    var$2[23] = $rt_s(137);
    var$2[24] = $rt_s(138);
    var$2[25] = $rt_s(139);
    var$2[26] = $rt_s(140);
    var$2[27] = $rt_s(141);
    var$2[28] = $rt_s(142);
    var$2[29] = $rt_s(143);
    var$2[30] = $rt_s(144);
    var$2[31] = $rt_s(145);
    var$2[32] = $rt_s(146);
    var$2[33] = $rt_s(147);
    var$2[34] = $rt_s(148);
    var$2[35] = $rt_s(149);
    var$2[36] = $rt_s(150);
    var$2[37] = $rt_s(151);
    var$2[38] = $rt_s(152);
    var$2[39] = $rt_s(153);
    var$2[40] = $rt_s(154);
    var$2[41] = $rt_s(155);
    var$2[42] = $rt_s(156);
    var$2[43] = $rt_s(157);
    var$2[44] = $rt_s(158);
    var$2[45] = $rt_s(159);
    var$2[46] = $rt_s(160);
    var$2[47] = $rt_s(37);
    var$2[48] = $rt_s(161);
    LinkBox_shiftKeys = var$1;
    var$1 = $rt_createArray(jl_String, 5);
    var$2 = var$1.data;
    var$2[0] = $rt_s(162);
    var$2[1] = $rt_s(163);
    var$2[2] = $rt_s(164);
    var$2[3] = $rt_s(165);
    var$2[4] = $rt_s(166);
    LinkBox_settings = var$1;
    LinkBox_LIGHT_GRAY = g_Color__init_(225, 225, 225);
}
function Living() {
    Entity.call(this);
}
function Living__init_() {
    var var_0 = new Living();
    Living__init_0(var_0);
    return var_0;
}
function Living__init_0($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Entity__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function Enemy() {
    var a = this; Living.call(a);
    a.$ySpeed = 0.0;
    a.$gAcceleration = 0.0;
    a.$prevTime = 0.0;
    a.$time = 0.0;
    a.$color = null;
    a.$slashed = 0;
    a.$firstLoop = 0;
    a.$eI = null;
    a.$player = null;
}
function Enemy__init_(var_0) {
    var var_1 = new Enemy();
    Enemy__init_0(var_1, var_0);
    return var_1;
}
function Enemy__init_0($this, $player) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$player = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Living__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$player = $player;
        $this.$ySpeed = 1.0;
        $this.$gAcceleration = 1.0;
        g_Color_$callClinit();
        $this.$color = g_Color_GREEN;
        $ptr = 2;
    case 2:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $tmp;
        $this.$setImage(var$2);
        var$2 = new EnemyImage;
        $ptr = 3;
    case 3:
        EnemyImage__init_(var$2, $this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$eI = var$2;
        $this.$prevTime = Long_toNumber(jl_System_nanoTime());
        $this.$time = Long_toNumber(jl_System_nanoTime());
        $this.$firstLoop = 1;
        $this.$slashed = 0;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $player, var$2, $ptr);
}
function Enemy_addedToWorld($this, $w) {
    var var$2, var$3, var$4, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$w = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Entity_addedToWorld($this, $w);
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $this.$eI;
        var$3 = 0.0;
        var$4 = 0.0;
        $ptr = 2;
    case 2:
        $w.$addObject1(var$2, var$3, var$4);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $w, var$2, var$3, var$4, $ptr);
}
function Enemy_resetImage($this) {
    var $image;
    $image = g_GreenfootImage__init_0(1, 1);
    $image.$setColor($this.$color);
    $image.$fillRect(0, 0, 10, 10);
    return $image;
}
function Enemy_run($this) {
    var $intersecting;
    $this.$prevTime = $this.$player.$getPrevTime();
    $this.$time = $this.$player.$getTime();
    if ($this.$ySpeed !== 0.0) {
        $this.$setLocation0($this.$getExactX(), $this.$getExactY() + $this.$ySpeed);
        $this.$ySpeed = $this.$ySpeed + $this.$gAcceleration;
        $intersecting = $this.$getIntersectingObjects($rt_cls(Building));
        if ($intersecting.$size() > 0) {
            $this.$setLocation0($this.$getExactX(), $intersecting.$get0(0).$getExactY() - ($intersecting.$get0(0).$getHeight() / 2 | 0) - 40.0);
            $this.$ySpeed = 0.0;
        }
        if ($this.$getExactY() > 500.0)
            $this.$getScrollableWorld().$removeObject0($this);
    }
}
function Enemy_slash($this, $player) {
    var $distance;
    if (!$this.$slashed) {
        $distance = Calc_getDistance($player.$getExactX(), 0.0, $this.$getExactX(), 0.0);
        $this.$eI.$setDistanceFromPlayer($distance | 0);
        $this.$color = g_Color__init_(255.0 - 255.0 * $distance / 80.0 | 0, 255.0 - 255.0 * $distance / 80.0 | 0, 0);
        $this.$setImage($this.$resetImage());
        $this.$slashed = 1;
        $this.$getScrollableWorld().$getWorld().$increaseScore((1.0 - $distance / 80.0) * 10.0 | 0);
        $this.$eI.$resetFrame();
    }
}
function Enemy_getSlashed($this) {
    return $this.$slashed;
}
function Enemy_getPrevTime($this) {
    return $this.$prevTime;
}
function Enemy_getTime($this) {
    return $this.$time;
}
function jl_InstantiationException() {
    jl_ReflectiveOperationException.call(this);
}
function jl_InstantiationException__init_() {
    var var_0 = new jl_InstantiationException();
    jl_InstantiationException__init_0(var_0);
    return var_0;
}
function jl_InstantiationException__init_0($this) {
    jl_ReflectiveOperationException__init_0($this);
}
function jl_Readable() {
}
function g_ImageVisitor() {
    jl_Object.call(this);
}
function g_ImageVisitor__init_() {
    var var_0 = new g_ImageVisitor();
    g_ImageVisitor__init_0(var_0);
    return var_0;
}
function g_ImageVisitor__init_0($this) {
    jl_Object__init_0($this);
}
function g_ImageVisitor_drawImageToCanvas($image, $g2d, $x, $y) {
    $image.$drawToCanvas($g2d, $x, $y);
}
function otji_JS() {
    jl_Object.call(this);
}
function otji_JS__init_() {
    var var_0 = new otji_JS();
    otji_JS__init_0(var_0);
    return var_0;
}
function otji_JS__init_0($this) {
    jl_Object__init_0($this);
}
function otji_JS_function(var$1, var$2) {
    var name = 'jso$functor$' + var$2;
    if (!var$1[name]) {
        var fn = function() {
            return var$1[var$2].apply(var$1, arguments);
        };
        var$1[name] = function() {
            return fn;
        };
    }
    return var$1[name]();
}
function otji_JS_functionAsObject(var$1, var$2) {
    if (typeof var$1 !== "function") return var$1;
    var result = {};
    result[var$2] = var$1;
    return result;
}
function jn_URLStreamHandlerFactory() {
}
function otciu_UnicodeHelper() {
    jl_Object.call(this);
}
function otciu_UnicodeHelper__init_() {
    var var_0 = new otciu_UnicodeHelper();
    otciu_UnicodeHelper__init_0(var_0);
    return var_0;
}
function otciu_UnicodeHelper__init_0($this) {
    jl_Object__init_0($this);
}
function otciu_UnicodeHelper_decodeIntByte($text) {
    var $flow, $sz, $data, $i;
    $flow = otci_CharFlow__init_($text.$toCharArray());
    $sz = otci_Base46_decode($flow);
    $data = $rt_createIntArray($sz);
    $i = 0;
    while ($i < $sz) {
        $data.data[$i] = otci_Base46_decode($flow);
        $i = $i + 1 | 0;
    }
    return $data;
}
function otciu_UnicodeHelper_decodeByte($c) {
    if ($c > 92)
        return (($c - 32 | 0) - 2 | 0) << 24 >> 24;
    if ($c <= 34)
        return ($c - 32 | 0) << 24 >> 24;
    return (($c - 32 | 0) - 1 | 0) << 24 >> 24;
}
function otciu_UnicodeHelper_extractRle($encoded) {
    var $ranges, $buffer, $index, $rangeIndex, $codePoint, $i, $b, $count, $pos, $j, $digit, var$13, var$14, var$15, var$16, var$17;
    $ranges = $rt_createArray(otciu_UnicodeHelper$Range, 16384);
    $buffer = $rt_createByteArray(16384);
    $index = 0;
    $rangeIndex = 0;
    $codePoint = 0;
    $i = 0;
    while ($i < $encoded.$length()) {
        $b = otciu_UnicodeHelper_decodeByte($encoded.$charAt($i));
        if ($b == 64) {
            $i = $i + 1 | 0;
            $b = otciu_UnicodeHelper_decodeByte($encoded.$charAt($i));
            $count = 0;
            $pos = 1;
            $j = 0;
            while ($j < 3) {
                $i = $i + 1 | 0;
                $digit = otciu_UnicodeHelper_decodeByte($encoded.$charAt($i));
                $count = $count | $rt_imul($pos, $digit);
                $pos = $pos * 64 | 0;
                $j = $j + 1 | 0;
            }
        } else if ($b < 32)
            $count = 1;
        else {
            $b = ($b - 32 | 0) << 24 >> 24;
            $i = $i + 1 | 0;
            $count = otciu_UnicodeHelper_decodeByte($encoded.$charAt($i));
        }
        if (!$b && $count >= 128) {
            if ($index > 0) {
                var$13 = $ranges.data;
                var$14 = $rangeIndex + 1 | 0;
                var$13[$rangeIndex] = otciu_UnicodeHelper$Range__init_($codePoint, $codePoint + $index | 0, ju_Arrays_copyOf0($buffer, $index));
                $rangeIndex = var$14;
            }
            $codePoint = $codePoint + ($index + $count | 0) | 0;
            $index = 0;
        } else {
            var$15 = $buffer.data;
            var$14 = $index + $count | 0;
            if (var$14 < var$15.length)
                var$16 = $rangeIndex;
            else {
                var$13 = $ranges.data;
                var$16 = $rangeIndex + 1 | 0;
                var$13[$rangeIndex] = otciu_UnicodeHelper$Range__init_($codePoint, $codePoint + $index | 0, ju_Arrays_copyOf0($buffer, $index));
                $codePoint = $codePoint + var$14 | 0;
                $index = 0;
            }
            while (true) {
                var$14 = $count + (-1) | 0;
                if ($count <= 0)
                    break;
                var$17 = $index + 1 | 0;
                var$15[$index] = $b;
                $index = var$17;
                $count = var$14;
            }
            $rangeIndex = var$16;
        }
        $i = $i + 1 | 0;
    }
    return ju_Arrays_copyOf1($ranges, $rangeIndex);
}
function jl_Object$monitorEnterWait$lambda$_6_0() {
    var a = this; jl_Object.call(a);
    a.$_010 = null;
    a.$_14 = null;
    a.$_20 = 0;
    a.$_3 = null;
}
function jl_Object$monitorEnterWait$lambda$_6_0__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new jl_Object$monitorEnterWait$lambda$_6_0();
    jl_Object$monitorEnterWait$lambda$_6_0__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function jl_Object$monitorEnterWait$lambda$_6_0__init_0(var$0, var$1, var$2, var$3, var$4) {
    jl_Object__init_0(var$0);
    var$0.$_010 = var$1;
    var$0.$_14 = var$2;
    var$0.$_20 = var$3;
    var$0.$_3 = var$4;
}
function jl_Object$monitorEnterWait$lambda$_6_0_run(var$0) {
    jl_Object_lambda$monitorEnterWait$0(var$0.$_010, var$0.$_14, var$0.$_20, var$0.$_3);
}
function ju_Objects() {
    jl_Object.call(this);
}
function ju_Objects__init_() {
    var var_0 = new ju_Objects();
    ju_Objects__init_0(var_0);
    return var_0;
}
function ju_Objects__init_0($this) {
    jl_Object__init_0($this);
}
function ju_Objects_requireNonNull($obj) {
    return ju_Objects_requireNonNull0($obj, $rt_s(56));
}
function ju_Objects_requireNonNull0($obj, $message) {
    if ($obj !== null)
        return $obj;
    $rt_throw(jl_NullPointerException__init_0($message));
}
function g_GreenfootImage$2() {
    var a = this; jl_Object.call(a);
    a.$val$sync = null;
    a.$val$success = null;
    a.$this$00 = null;
}
function g_GreenfootImage$2__init_(var_0, var_1, var_2) {
    var var_3 = new g_GreenfootImage$2();
    g_GreenfootImage$2__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function g_GreenfootImage$2__init_0($this, $this$0, var$2, var$3) {
    $this.$this$00 = $this$0;
    $this.$val$sync = var$2;
    $this.$val$success = var$3;
    jl_Object__init_0($this);
}
function g_GreenfootImage$2_handleEvent($this, $arg0) {
    var var$2;
    var$2 = jl_Thread__init_3(g_GreenfootImage$2$handleEvent$lambda$_1_0__init_($this.$val$sync, $this.$val$success));
    var$2.$start();
}
function g_GreenfootImage$2_lambda$handleEvent$0($sync, $success) {
    var var$3, $$je;
    jl_Object_monitorEnterSync($sync);
    a: {
        try {
            $success.data[0] = 0;
            jl_Object_notify($sync);
            jl_Object_monitorExitSync($sync);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$3 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($sync);
    $rt_throw(var$3);
}
function g_GreenfootImage$2_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function ju_HashMap$HashEntry() {
    var a = this; ju_MapEntry.call(a);
    a.$origKeyHash = 0;
    a.$next2 = null;
}
function ju_HashMap$HashEntry__init_(var_0, var_1) {
    var var_2 = new ju_HashMap$HashEntry();
    ju_HashMap$HashEntry__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_HashMap$HashEntry__init_0($this, $theKey, $hash) {
    ju_MapEntry__init_0($this, $theKey, null);
    $this.$origKeyHash = $hash;
}
function g_GreenfootImage$1() {
    var a = this; jl_Object.call(a);
    a.$val$sync0 = null;
    a.$val$success0 = null;
    a.$this$01 = null;
}
function g_GreenfootImage$1__init_(var_0, var_1, var_2) {
    var var_3 = new g_GreenfootImage$1();
    g_GreenfootImage$1__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function g_GreenfootImage$1__init_0($this, $this$0, var$2, var$3) {
    $this.$this$01 = $this$0;
    $this.$val$sync0 = var$2;
    $this.$val$success0 = var$3;
    jl_Object__init_0($this);
}
function g_GreenfootImage$1_handleEvent($this, $arg0) {
    var var$2;
    var$2 = jl_Thread__init_3(g_GreenfootImage$1$handleEvent$lambda$_1_0__init_($this.$val$sync0, $this.$val$success0));
    var$2.$start();
}
function g_GreenfootImage$1_lambda$handleEvent$0($sync, $success) {
    var var$3, $$je;
    jl_Object_monitorEnterSync($sync);
    a: {
        try {
            $success.data[0] = 1;
            jl_Object_notify($sync);
            jl_Object_monitorExitSync($sync);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$3 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($sync);
    $rt_throw(var$3);
}
function g_GreenfootImage$1_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function jnc_CharsetEncoder() {
    var a = this; jl_Object.call(a);
    a.$charset = null;
    a.$replacement = null;
    a.$averageBytesPerChar = 0.0;
    a.$maxBytesPerChar = 0.0;
    a.$malformedAction = null;
    a.$unmappableAction = null;
    a.$status = 0;
}
function jnc_CharsetEncoder__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new jnc_CharsetEncoder();
    jnc_CharsetEncoder__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function jnc_CharsetEncoder__init_1(var_0, var_1, var_2) {
    var var_3 = new jnc_CharsetEncoder();
    jnc_CharsetEncoder__init_2(var_3, var_0, var_1, var_2);
    return var_3;
}
function jnc_CharsetEncoder__init_0($this, $cs, $averageBytesPerChar, $maxBytesPerChar, $replacement) {
    jl_Object__init_0($this);
    jnc_CodingErrorAction_$callClinit();
    $this.$malformedAction = jnc_CodingErrorAction_REPORT;
    $this.$unmappableAction = jnc_CodingErrorAction_REPORT;
    jnc_CharsetEncoder_checkReplacement($this, $replacement);
    $this.$charset = $cs;
    $this.$replacement = $replacement.$clone();
    $this.$averageBytesPerChar = $averageBytesPerChar;
    $this.$maxBytesPerChar = $maxBytesPerChar;
}
function jnc_CharsetEncoder__init_2($this, $cs, $averageBytesPerChar, $maxBytesPerChar) {
    var var$4;
    var$4 = $rt_createByteArray(1);
    var$4.data[0] = 63;
    jnc_CharsetEncoder__init_0($this, $cs, $averageBytesPerChar, $maxBytesPerChar, var$4);
}
function jnc_CharsetEncoder_checkReplacement($this, $replacement) {
    var var$2;
    if ($replacement !== null) {
        var$2 = $replacement.data.length;
        if (var$2 && var$2 >= $this.$maxBytesPerChar)
            return;
    }
    $rt_throw(jl_IllegalArgumentException__init_($rt_s(167)));
}
function jnc_CharsetEncoder_onMalformedInput($this, $newAction) {
    if ($newAction !== null) {
        $this.$malformedAction = $newAction;
        $this.$implOnMalformedInput($newAction);
        return $this;
    }
    $rt_throw(jl_IllegalArgumentException__init_($rt_s(168)));
}
function jnc_CharsetEncoder_implOnMalformedInput($this, $newAction) {
    return;
}
function jnc_CharsetEncoder_onUnmappableCharacter($this, $newAction) {
    if ($newAction !== null) {
        $this.$unmappableAction = $newAction;
        $this.$implOnUnmappableCharacter($newAction);
        return $this;
    }
    $rt_throw(jl_IllegalArgumentException__init_($rt_s(168)));
}
function jnc_CharsetEncoder_implOnUnmappableCharacter($this, $newAction) {
    return;
}
function jnc_CharsetEncoder_encode($this, $in, $out, $endOfInput) {
    var $result, $e, $remaining, $action, $$je;
    a: {
        if ($this.$status != 3) {
            if ($endOfInput)
                break a;
            if ($this.$status != 2)
                break a;
        }
        $rt_throw(jl_IllegalStateException__init_0());
    }
    $this.$status = !$endOfInput ? 1 : 2;
    while (true) {
        try {
            $result = $this.$encodeLoop($in, $out);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_RuntimeException) {
                $e = $$je;
                $rt_throw(jnc_CoderMalfunctionError__init_($e));
            } else {
                throw $$e;
            }
        }
        if ($result.$isUnderflow()) {
            if (!$endOfInput)
                return $result;
            $remaining = jn_Buffer_remaining($in);
            if ($remaining <= 0)
                return $result;
            $result = jnc_CoderResult_malformedForLength($remaining);
        } else if ($result.$isOverflow())
            break;
        $action = !$result.$isUnmappable() ? $this.$malformedAction : $this.$unmappableAction;
        b: {
            jnc_CodingErrorAction_$callClinit();
            if ($action !== jnc_CodingErrorAction_REPLACE) {
                if ($action === jnc_CodingErrorAction_IGNORE)
                    break b;
                else
                    return $result;
            }
            if (jn_Buffer_remaining($out) < $this.$replacement.data.length)
                return jnc_CoderResult_OVERFLOW;
            jn_ByteBuffer_put($out, $this.$replacement);
        }
        jn_Buffer_position0($in, jn_Buffer_position($in) + $result.$length() | 0);
    }
    return $result;
}
function jnc_CharsetEncoder_flush($this, $out) {
    var $result;
    if ($this.$status != 2 && $this.$status != 4)
        $rt_throw(jl_IllegalStateException__init_0());
    $result = $this.$implFlush($out);
    jnc_CoderResult_$callClinit();
    if ($result === jnc_CoderResult_UNDERFLOW)
        $this.$status = 3;
    return $result;
}
function jnc_CharsetEncoder_implFlush($this, $out) {
    jnc_CoderResult_$callClinit();
    return jnc_CoderResult_UNDERFLOW;
}
function otjb_Performance() {
    jl_Object.call(this);
}
function otjb_Performance__init_() {
    var var_0 = new otjb_Performance();
    otjb_Performance__init_0(var_0);
    return var_0;
}
function otjb_Performance__init_0($this) {
    jl_Object__init_0($this);
}
function gj_Client$lambda$new$1$lambda$_22_0() {
    jl_Object.call(this);
    this.$_011 = null;
}
function gj_Client$lambda$new$1$lambda$_22_0__init_(var_0) {
    var var_1 = new gj_Client$lambda$new$1$lambda$_22_0();
    gj_Client$lambda$new$1$lambda$_22_0__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$lambda$new$1$lambda$_22_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_011 = var$1;
}
function gj_Client$lambda$new$1$lambda$_22_0_run(var$0) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = var$0.$_011;
        $ptr = 1;
    case 1:
        gj_Client_lambda$new$0(var$1);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push(var$0, var$1, $ptr);
}
function ju_Queue() {
}
function jl_ArrayStoreException() {
    jl_RuntimeException.call(this);
}
function jl_ArrayStoreException__init_() {
    var var_0 = new jl_ArrayStoreException();
    jl_ArrayStoreException__init_0(var_0);
    return var_0;
}
function jl_ArrayStoreException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function gs_SoundFactory$2() {
    var a = this; jl_Object.call(a);
    a.$val$isOk = null;
    a.$val$syncObject = null;
    a.$this$02 = null;
}
function gs_SoundFactory$2__init_(var_0, var_1, var_2) {
    var var_3 = new gs_SoundFactory$2();
    gs_SoundFactory$2__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function gs_SoundFactory$2__init_0($this, $this$0, var$2, var$3) {
    $this.$this$02 = $this$0;
    $this.$val$isOk = var$2;
    $this.$val$syncObject = var$3;
    jl_Object__init_0($this);
}
function gs_SoundFactory$2_handleEvent($this, $arg0) {
    var var$2;
    $this.$val$isOk.data[0] = 1;
    var$2 = jl_Thread__init_3(gs_SoundFactory$2$handleEvent$lambda$_1_0__init_($this.$val$syncObject));
    var$2.$start();
}
function gs_SoundFactory$2_lambda$handleEvent$0($syncObject) {
    var var$2, $$je;
    jl_Object_monitorEnterSync($syncObject);
    a: {
        try {
            jl_Object_notify($syncObject);
            jl_Object_monitorExitSync($syncObject);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$2 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($syncObject);
    $rt_throw(var$2);
}
function gs_SoundFactory$2_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function gs_SoundFactory$1() {
    var a = this; jl_Object.call(a);
    a.$val$syncObject0 = null;
    a.$this$03 = null;
}
function gs_SoundFactory$1__init_(var_0, var_1) {
    var var_2 = new gs_SoundFactory$1();
    gs_SoundFactory$1__init_0(var_2, var_0, var_1);
    return var_2;
}
function gs_SoundFactory$1__init_0($this, $this$0, var$2) {
    $this.$this$03 = $this$0;
    $this.$val$syncObject0 = var$2;
    jl_Object__init_0($this);
}
function gs_SoundFactory$1_handleEvent($this, $arg0) {
    var var$2;
    jl_System_out().$println1($rt_s(169));
    var$2 = jl_Thread__init_3(gs_SoundFactory$1$handleEvent$lambda$_1_0__init_($this.$val$syncObject0));
    var$2.$start();
}
function gs_SoundFactory$1_lambda$handleEvent$0($syncObject) {
    var var$2, $$je;
    jl_Object_monitorEnterSync($syncObject);
    a: {
        try {
            jl_Object_notify($syncObject);
            jl_Object_monitorExitSync($syncObject);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$2 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($syncObject);
    $rt_throw(var$2);
}
function gs_SoundFactory$1_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function jn_ByteBuffer() {
    var a = this; jn_Buffer.call(a);
    a.$start0 = 0;
    a.$array = null;
    a.$order = null;
}
function jn_ByteBuffer__init_(var_0, var_1, var_2, var_3, var_4) {
    var var_5 = new jn_ByteBuffer();
    jn_ByteBuffer__init_0(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
}
function jn_ByteBuffer__init_0($this, $start, $capacity, $array, $position, $limit) {
    jn_Buffer__init_0($this, $capacity);
    jn_ByteOrder_$callClinit();
    $this.$order = jn_ByteOrder_BIG_ENDIAN;
    $this.$start0 = $start;
    $this.$array = $array;
    $this.$position1 = $position;
    $this.$limit = $limit;
}
function jn_ByteBuffer_wrap($array, $offset, $length) {
    return jn_ByteBufferImpl__init_(0, $array.data.length, $array, $offset, $offset + $length | 0, 0, 0);
}
function jn_ByteBuffer_wrap0($array) {
    return jn_ByteBuffer_wrap($array, 0, $array.data.length);
}
function jn_ByteBuffer_put0($this, $src, $offset, $length) {
    var var$4, var$5, var$6, $pos, $i, var$9;
    if (!$length)
        return $this;
    if ($this.$isReadOnly())
        $rt_throw(jn_ReadOnlyBufferException__init_());
    if (jn_Buffer_remaining($this) < $length)
        $rt_throw(jn_BufferOverflowException__init_());
    if ($offset >= 0) {
        var$4 = $src.data;
        var$5 = var$4.length;
        if ($offset < var$5) {
            var$6 = $offset + $length | 0;
            if (var$6 > var$5)
                $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_StringBuilder__init_().$append($rt_s(170)).$append3(var$6).$append($rt_s(171)).$append3(var$5).$toString()));
            if ($length < 0)
                $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_StringBuilder__init_().$append($rt_s(172)).$append3($length).$append($rt_s(173)).$toString()));
            $pos = $this.$position1 + $this.$start0 | 0;
            $i = 0;
            while ($i < $length) {
                var$9 = $this.$array.data;
                var$6 = $pos + 1 | 0;
                var$5 = $offset + 1 | 0;
                var$9[$pos] = var$4[$offset];
                $i = $i + 1 | 0;
                $pos = var$6;
                $offset = var$5;
            }
            $this.$position1 = $this.$position1 + $length | 0;
            return $this;
        }
    }
    var$4 = $src.data;
    $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_StringBuilder__init_().$append($rt_s(174)).$append3($offset).$append($rt_s(29)).$append3(var$4.length).$append($rt_s(125)).$toString()));
}
function jn_ByteBuffer_put($this, $src) {
    return $this.$put1($src, 0, $src.data.length);
}
function jn_ByteBufferImpl() {
    var a = this; jn_ByteBuffer.call(a);
    a.$direct = 0;
    a.$readOnly = 0;
}
function jn_ByteBufferImpl__init_(var_0, var_1, var_2, var_3, var_4, var_5, var_6) {
    var var_7 = new jn_ByteBufferImpl();
    jn_ByteBufferImpl__init_0(var_7, var_0, var_1, var_2, var_3, var_4, var_5, var_6);
    return var_7;
}
function jn_ByteBufferImpl__init_0($this, $start, $capacity, $array, $position, $limit, $direct, $readOnly) {
    jn_ByteBuffer__init_0($this, $start, $capacity, $array, $position, $limit);
    $this.$direct = $direct;
    $this.$readOnly = $readOnly;
}
function jn_ByteBufferImpl_isReadOnly($this) {
    return $this.$readOnly;
}
function ju_HashMap$AbstractMapIterator() {
    var a = this; jl_Object.call(a);
    a.$position4 = 0;
    a.$expectedModCount = 0;
    a.$futureEntry = null;
    a.$currentEntry = null;
    a.$prevEntry = null;
    a.$associatedMap = null;
}
function ju_HashMap$AbstractMapIterator__init_(var_0) {
    var var_1 = new ju_HashMap$AbstractMapIterator();
    ju_HashMap$AbstractMapIterator__init_0(var_1, var_0);
    return var_1;
}
function ju_HashMap$AbstractMapIterator__init_0($this, $hm) {
    jl_Object__init_0($this);
    $this.$associatedMap = $hm;
    $this.$expectedModCount = $hm.$modCount1;
    $this.$futureEntry = null;
}
function ju_HashMap$AbstractMapIterator_hasNext($this) {
    if ($this.$futureEntry !== null)
        return 1;
    while ($this.$position4 < $this.$associatedMap.$elementData.data.length) {
        if ($this.$associatedMap.$elementData.data[$this.$position4] !== null)
            return 1;
        $this.$position4 = $this.$position4 + 1 | 0;
    }
    return 0;
}
function ju_HashMap$AbstractMapIterator_checkConcurrentMod($this) {
    if ($this.$expectedModCount == $this.$associatedMap.$modCount1)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
}
function ju_HashMap$AbstractMapIterator_makeNext($this) {
    var var$1, var$2;
    ju_HashMap$AbstractMapIterator_checkConcurrentMod($this);
    if (!$this.$hasNext())
        $rt_throw(ju_NoSuchElementException__init_());
    if ($this.$futureEntry === null) {
        var$1 = $this.$associatedMap.$elementData.data;
        var$2 = $this.$position4;
        $this.$position4 = var$2 + 1 | 0;
        $this.$currentEntry = var$1[var$2];
        $this.$futureEntry = $this.$currentEntry.$next2;
        $this.$prevEntry = null;
    } else {
        if ($this.$currentEntry !== null)
            $this.$prevEntry = $this.$currentEntry;
        $this.$currentEntry = $this.$futureEntry;
        $this.$futureEntry = $this.$futureEntry.$next2;
    }
}
function ju_HashMap$KeyIterator() {
    ju_HashMap$AbstractMapIterator.call(this);
}
function ju_HashMap$KeyIterator__init_(var_0) {
    var var_1 = new ju_HashMap$KeyIterator();
    ju_HashMap$KeyIterator__init_0(var_1, var_0);
    return var_1;
}
function ju_HashMap$KeyIterator__init_0($this, $map) {
    ju_HashMap$AbstractMapIterator__init_0($this, $map);
}
function ju_HashMap$KeyIterator_next($this) {
    ju_HashMap$AbstractMapIterator_makeNext($this);
    return $this.$currentEntry.$key;
}
function jl_Thread$SleepHandler() {
    var a = this; jl_Object.call(a);
    a.$thread = null;
    a.$callback0 = null;
    a.$isInterrupted = 0;
    a.$scheduleId = 0;
}
function jl_Thread$SleepHandler__init_(var_0, var_1) {
    var var_2 = new jl_Thread$SleepHandler();
    jl_Thread$SleepHandler__init_0(var_2, var_0, var_1);
    return var_2;
}
function jl_Thread$SleepHandler__init_0($this, $thread, $callback) {
    jl_Object__init_0($this);
    $this.$thread = $thread;
    $this.$callback0 = $callback;
}
function jl_Thread$SleepHandler_interrupted($this) {
    jl_Thread_access$002($this.$thread, 0);
    $this.$isInterrupted = 1;
    otp_Platform_killSchedule($this.$scheduleId);
    otp_Platform_postpone(jl_Thread$SleepHandler$interrupted$lambda$_1_0__init_($this));
}
function jl_Thread$SleepHandler_run($this) {
    if (!$this.$isInterrupted) {
        $this.$thread.$interruptHandler = null;
        jl_Thread_setCurrentThread($this.$thread);
        $this.$callback0.$complete(null);
    }
}
function jl_Thread$SleepHandler_lambda$interrupted$1($this) {
    $this.$callback0.$error(jl_InterruptedException__init_());
}
function gc_ColManager() {
    var a = this; jl_Object.call(a);
    a.$freeObjects = null;
    a.$collisionClasses = null;
    a.$collisionChecker0 = null;
}
function gc_ColManager__init_() {
    var var_0 = new gc_ColManager();
    gc_ColManager__init_0(var_0);
    return var_0;
}
function gc_ColManager__init_0($this) {
    jl_Object__init_0($this);
    $this.$freeObjects = ju_HashMap__init_();
    $this.$collisionClasses = ju_HashSet__init_();
    $this.$collisionChecker0 = gci_IBSPColChecker__init_();
}
function gc_ColManager_addObject($this, $actor) {
    var $cls, $classSet;
    $cls = jl_Object_getClass($actor);
    if ($this.$collisionClasses.$contains0($cls))
        $this.$collisionChecker0.$addObject0($actor);
    else {
        $classSet = $this.$freeObjects.$get($cls);
        if ($classSet === null) {
            $classSet = ju_LinkedList__init_();
            $this.$freeObjects.$put($cls, $classSet);
        }
        $classSet.$add0($actor);
    }
}
function gc_ColManager_initialize($this, $width, $height, $cellSize, $wrap) {
    $this.$collisionChecker0.$initialize0($width, $height, $cellSize, $wrap);
}
function gc_ColManager_removeObject($this, $object) {
    var $classSet;
    $classSet = $this.$freeObjects.$get(jl_Object_getClass($object));
    if ($classSet !== null)
        $classSet.$remove1($object);
    else
        $this.$collisionChecker0.$removeObject($object);
}
function gc_ColManager_startSequence($this) {
    $this.$collisionChecker0.$startSequence();
}
function gc_ColManager_updateObjectLocation($this, $object, $oldX, $oldY) {
    if (!$this.$freeObjects.$containsKey(jl_Object_getClass($object)))
        $this.$collisionChecker0.$updateObjectLocation($object, $oldX, $oldY);
}
function gc_ColManager_updateObjectSize($this, $object) {
    if (!$this.$freeObjects.$containsKey(jl_Object_getClass($object)))
        $this.$collisionChecker0.$updateObjectSize($object);
}
function TitleButton() {
    Button.call(this);
    this.$city0 = null;
}
function TitleButton__init_0(var_0) {
    var var_1 = new TitleButton();
    TitleButton__init_(var_1, var_0);
    return var_1;
}
function TitleButton__init_($this, $city) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$city = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Button__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$city0 = $city;
        var$2 = $rt_s(175);
        $ptr = 2;
    case 2:
        $this.$setImage1(var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $city, var$2, $ptr);
}
function TitleButton_act($this) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (!g_Greenfoot_mousePressed($this))
            return;
        
        SoundManager_playSound($rt_s(17), 100);
        $this.$getWorld().$removeEndUI();
        var$1 = $this.$city0;
        $ptr = 1;
    case 1:
        var$1.$stopGame();
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function ju_Set() {
}
function ju_AbstractSet() {
    ju_AbstractCollection.call(this);
}
function ju_AbstractSet__init_() {
    var var_0 = new ju_AbstractSet();
    ju_AbstractSet__init_0(var_0);
    return var_0;
}
function ju_AbstractSet__init_0($this) {
    ju_AbstractCollection__init_0($this);
}
function ju_AbstractSet_equals($this, $obj) {
    var $other, $iter;
    if ($this === $obj)
        return 1;
    if (!$rt_isInstance($obj, ju_Set))
        return 0;
    $other = $obj;
    if ($this.$size() != $other.$size())
        return 0;
    $iter = $other.$iterator();
    while ($iter.$hasNext()) {
        if ($this.$contains0($iter.$next()))
            continue;
        else
            return 0;
    }
    return 1;
}
function ju_HashSet() {
    ju_AbstractSet.call(this);
    this.$backingMap = null;
}
function ju_HashSet__init_() {
    var var_0 = new ju_HashSet();
    ju_HashSet__init_0(var_0);
    return var_0;
}
function ju_HashSet__init_1(var_0) {
    var var_1 = new ju_HashSet();
    ju_HashSet__init_2(var_1, var_0);
    return var_1;
}
function ju_HashSet__init_0($this) {
    ju_HashSet__init_2($this, ju_HashMap__init_());
}
function ju_HashSet__init_2($this, $backingMap) {
    ju_AbstractSet__init_0($this);
    $this.$backingMap = $backingMap;
}
function ju_HashSet_add($this, $object) {
    return $this.$backingMap.$put($object, $this) !== null ? 0 : 1;
}
function ju_HashSet_contains($this, $object) {
    return $this.$backingMap.$containsKey($object);
}
function ju_HashSet_iterator($this) {
    return $this.$backingMap.$keySet().$iterator();
}
function g_ActorSet$ActorSetIterator() {
    var a = this; jl_Object.call(a);
    a.$currentNode = null;
    a.$this$04 = null;
}
function g_ActorSet$ActorSetIterator__init_(var_0) {
    var var_1 = new g_ActorSet$ActorSetIterator();
    g_ActorSet$ActorSetIterator__init_0(var_1, var_0);
    return var_1;
}
function g_ActorSet$ActorSetIterator__init_0($this, var$1) {
    $this.$this$04 = var$1;
    jl_Object__init_0($this);
    $this.$currentNode = g_ActorSet_access$000(var$1);
}
function g_ActorSet$ActorSetIterator_hasNext($this) {
    return $this.$currentNode.$next3 === g_ActorSet_access$000($this.$this$04) ? 0 : 1;
}
function g_ActorSet$ActorSetIterator_next($this) {
    $this.$currentNode = $this.$currentNode.$next3;
    return $this.$currentNode.$actor0;
}
function g_ActorSet$ActorSetIterator_remove($this) {
    g_ActorSet_access$100($this.$this$04, $this.$currentNode);
}
function g_ActorSet$ActorSetIterator_next0($this) {
    return $this.$next4();
}
function otp_Platform() {
    jl_Object.call(this);
}
var otp_Platform_newInstancePrepared = 0;
function otp_Platform__init_() {
    var var_0 = new otp_Platform();
    otp_Platform__init_0(var_0);
    return var_0;
}
function otp_Platform__init_0($this) {
    jl_Object__init_0($this);
}
function otp_Platform_clone(var$1) {
    var copy = new var$1.constructor();
    for (var field in var$1) {
        if (!var$1.hasOwnProperty(field)) {
            continue;
        }
        copy[field] = var$1[field];
    }
    return copy;
}
function otp_Platform_isInstance($obj, $cls) {
    return $obj !== null && !(typeof $obj.constructor.$meta === 'undefined' ? 1 : 0) && otp_Platform_isAssignable($obj.constructor, $cls) ? 1 : 0;
}
function otp_Platform_isAssignable($from, $to) {
    var $supertypes, $i;
    if ($from === $to)
        return 1;
    $supertypes = $from.$meta.supertypes;
    $i = 0;
    while ($i < $supertypes.length) {
        if (otp_Platform_isAssignable($supertypes[$i], $to))
            return 1;
        $i = $i + 1 | 0;
    }
    return 0;
}
function otp_Platform_newInstance($cls) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$cls = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (!otp_Platform_newInstancePrepared) {
            otp_Platform_prepareNewInstance();
            otp_Platform_newInstancePrepared = 1;
        }
        $ptr = 1;
    case 1:
        $tmp = otp_Platform_newInstanceImpl($cls);
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $tmp;
        return var$2;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($cls, var$2, $ptr);
}
function otp_Platform_prepareNewInstance() {
    var c = '$$constructor$$';
    jl_String[c] = jl_String__init_1;
    jl_Object[c] = jl_Object__init_0;
    jl_NoClassDefFoundError[c] = jl_NoClassDefFoundError__init_;
    jl_LinkageError[c] = jl_LinkageError__init_0;
    jl_Error[c] = jl_Error__init_0;
    jl_Throwable[c] = jl_Throwable__init_0;
    jl_NoSuchFieldError[c] = jl_NoSuchFieldError__init_0;
    jl_IncompatibleClassChangeError[c] = jl_IncompatibleClassChangeError__init_0;
    jl_NoSuchMethodError[c] = jl_NoSuchMethodError__init_0;
    jl_RuntimeException[c] = jl_RuntimeException__init_1;
    jl_Exception[c] = jl_Exception__init_0;
    jl_StringBuilder[c] = jl_StringBuilder__init_0;
    jl_AbstractStringBuilder[c] = jl_AbstractStringBuilder__init_1;
    gj_Client[c] = gj_Client__init_;
    GameWorld[c] = GameWorld__init_0;
    otji_JS[c] = otji_JS__init_0;
    otp_Platform[c] = otp_Platform__init_0;
    ju_HashMap[c] = ju_HashMap__init_0;
    gj_GreenfootUtilJsDelegate[c] = gj_GreenfootUtilJsDelegate__init_0;
    ju_Properties[c] = ju_Properties__init_;
    ju_Hashtable[c] = ju_Hashtable__init_;
    ji_IOException[c] = ji_IOException__init_1;
    jl_Thread[c] = jl_Thread__init_0;
    jl_String$_clinit_$lambda$_81_0[c] = jl_String$_clinit_$lambda$_81_0__init_;
    otci_IntegerUtil[c] = otci_IntegerUtil__init_0;
    gu_GreenfootUtil[c] = gu_GreenfootUtil__init_0;
    g_ActorVisitor[c] = g_ActorVisitor__init_;
    jl_System[c] = jl_System__init_;
    jl_ConsoleOutputStreamStdout[c] = jl_ConsoleOutputStreamStdout__init_;
    jl_NumberFormatException[c] = jl_NumberFormatException__init_1;
    jl_IllegalArgumentException[c] = jl_IllegalArgumentException__init_1;
    gc_ImageCache[c] = gc_ImageCache__init_0;
    gj_KeyboardManager[c] = gj_KeyboardManager__init_;
    g_GreenfootImage[c] = g_GreenfootImage__init_1;
    jnci_UTF8Charset[c] = jnci_UTF8Charset__init_;
    jl_IllegalStateException[c] = jl_IllegalStateException__init_1;
    jl_IllegalMonitorStateException[c] = jl_IllegalMonitorStateException__init_0;
    jl_InterruptedException[c] = jl_InterruptedException__init_0;
    ju_LinkedList[c] = ju_LinkedList__init_0;
    ju_ArrayList[c] = ju_ArrayList__init_1;
    jl_ClassNotFoundException[c] = jl_ClassNotFoundException__init_;
    jl_ReflectiveOperationException[c] = jl_ReflectiveOperationException__init_0;
    jl_InstantiationException[c] = jl_InstantiationException__init_0;
    ju_Objects[c] = ju_Objects__init_0;
    ggim_MouseEventData[c] = ggim_MouseEventData__init_;
    jl_ConsoleOutputStreamStderr[c] = jl_ConsoleOutputStreamStderr__init_;
    ju_Hashtable$1[c] = ju_Hashtable$1__init_0;
    ju_Hashtable$2[c] = ju_Hashtable$2__init_0;
    jl_Object$Monitor[c] = jl_Object$Monitor__init_0;
    jl_NullPointerException[c] = jl_NullPointerException__init_1;
    jl_Math[c] = jl_Math__init_;
    jl_CloneNotSupportedException[c] = jl_CloneNotSupportedException__init_0;
    otpp_ResourceAccessor[c] = otpp_ResourceAccessor__init_0;
    otciu_UnicodeHelper[c] = otciu_UnicodeHelper__init_0;
    otci_Base46[c] = otci_Base46__init_0;
    jl_StringIndexOutOfBoundsException[c] = jl_StringIndexOutOfBoundsException__init_0;
    jl_IndexOutOfBoundsException[c] = jl_IndexOutOfBoundsException__init_0;
    ju_Arrays[c] = ju_Arrays__init_;
    jl_ArrayStoreException[c] = jl_ArrayStoreException__init_0;
    g_WorldVisitor[c] = g_WorldVisitor__init_;
    jlr_Array[c] = jlr_Array__init_0;
    g_ImageVisitor[c] = g_ImageVisitor__init_0;
    gu_GraphicsUtilities[c] = gu_GraphicsUtilities__init_0;
    jl_NegativeArraySizeException[c] = jl_NegativeArraySizeException__init_0;
    LoadingScreen[c] = LoadingScreen__init_;
    LinkBox[c] = LinkBox__init_;
    TitleDisplay[c] = TitleDisplay__init_;
    gc_ColManager[c] = gc_ColManager__init_0;
    g_TreeActorSet[c] = g_TreeActorSet__init_0;
    Track[c] = Track__init_0;
    g_Greenfoot[c] = g_Greenfoot__init_;
    SoundManager[c] = SoundManager__init_0;
    ju_HashSet[c] = ju_HashSet__init_0;
    gci_IBSPColChecker[c] = gci_IBSPColChecker__init_0;
    g_ActorSet[c] = g_ActorSet__init_;
    Background[c] = Background__init_0;
    ju_Random[c] = ju_Random__init_0;
    gs_SoundFactory[c] = gs_SoundFactory__init_0;
    gc_GOCollisionQuery[c] = gc_GOCollisionQuery__init_0;
    gc_NeighbourCollisionQuery[c] = gc_NeighbourCollisionQuery__init_0;
    gc_PointCollisionQuery[c] = gc_PointCollisionQuery__init_0;
    gc_InRangeQuery[c] = gc_InRangeQuery__init_0;
    Chunk[c] = Chunk__init_;
    otjb_Performance[c] = otjb_Performance__init_0;
    ju_NoSuchElementException[c] = ju_NoSuchElementException__init_0;
    jl_UnsupportedOperationException[c] = jl_UnsupportedOperationException__init_0;
    ju_ConcurrentModificationException[c] = ju_ConcurrentModificationException__init_0;
    gc_ActInterruptedException[c] = gc_ActInterruptedException__init_0;
    gci_BSPNodeCache[c] = gci_BSPNodeCache__init_;
    ju_LinkedList$Entry[c] = ju_LinkedList$Entry__init_;
    ggim_PriorityManager[c] = ggim_PriorityManager__init_;
    g_MouseInfo[c] = g_MouseInfo__init_0;
    g_MouseInfoVisitor[c] = g_MouseInfoVisitor__init_0;
    jn_ReadOnlyBufferException[c] = jn_ReadOnlyBufferException__init_0;
    jn_BufferOverflowException[c] = jn_BufferOverflowException__init_0;
    jn_BufferUnderflowException[c] = jn_BufferUnderflowException__init_;
    jl_AbstractStringBuilder$Constants[c] = jl_AbstractStringBuilder$Constants__init_0;
    otcit_DoubleAnalyzer[c] = otcit_DoubleAnalyzer__init_;
    otcit_DoubleAnalyzer$Result[c] = otcit_DoubleAnalyzer$Result__init_0;
    otcit_FloatAnalyzer$Result[c] = otcit_FloatAnalyzer$Result__init_0;
    Calc[c] = Calc__init_0;
    Sort[c] = Sort__init_;
    ju_Collections[c] = ju_Collections__init_;
    ju_Collections$_clinit_$lambda$_61_0[c] = ju_Collections$_clinit_$lambda$_61_0__init_;
    ju_Collections$_clinit_$lambda$_61_1[c] = ju_Collections$_clinit_$lambda$_61_1__init_;
    ju_Collections$5[c] = ju_Collections$5__init_;
    ju_Collections$6[c] = ju_Collections$6__init_;
    ju_Collections$3[c] = ju_Collections$3__init_;
}
function otp_Platform_newInstanceImpl(var$1) {
    if ($rt_resuming()) {
        var $r = $rt_nativeThread().pop();
        var$1.$$constructor$$($r);
        if ($rt_suspending()) {
            return $rt_nativeThread().push($r);
        }
        return $r;
    }
    if (!var$1.hasOwnProperty('$$constructor$$')) {
        return null;
    }
    var $r = new var$1();
    var$1.$$constructor$$($r);
    if ($rt_suspending()) {
        return $rt_nativeThread().push($r);
    }
    return $r;
}
function otp_Platform_lookupClass(var$1) {
    switch ($rt_ustr(var$1)) {
        case "java.lang.IndexOutOfBoundsException": jl_IndexOutOfBoundsException.$clinit(); return jl_IndexOutOfBoundsException;
        case "Entity": Entity.$clinit(); return Entity;
        case "greenfoot.j2js.GreenfootUtilJsDelegate": gj_GreenfootUtilJsDelegate.$clinit(); return gj_GreenfootUtilJsDelegate;
        case "java.io.BufferedInputStream": ji_BufferedInputStream.$clinit(); return ji_BufferedInputStream;
        case "java.util.Enumeration": ju_Enumeration.$clinit(); return ju_Enumeration;
        case "greenfoot.j2js.MouseManager$handleTouchEvent$lambda$_11_0": gj_MouseManager$handleTouchEvent$lambda$_11_0.$clinit(); return gj_MouseManager$handleTouchEvent$lambda$_11_0;
        case "java.nio.charset.impl.BufferedEncoder$Controller": jnci_BufferedEncoder$Controller.$clinit(); return jnci_BufferedEncoder$Controller;
        case "GameWorld": GameWorld.$clinit(); return GameWorld;
        case "java.lang.Integer": jl_Integer.$clinit(); return jl_Integer;
        case "greenfoot.sound.SoundFactory$2$handleEvent$lambda$_1_0": gs_SoundFactory$2$handleEvent$lambda$_1_0.$clinit(); return gs_SoundFactory$2$handleEvent$lambda$_1_0;
        case "java.lang.CloneNotSupportedException": jl_CloneNotSupportedException.$clinit(); return jl_CloneNotSupportedException;
        case "org.teavm.jso.typedarrays.Uint8Array": otjt_Uint8Array.$clinit(); return otjt_Uint8Array;
        case "SoundManager": SoundManager.$clinit(); return SoundManager;
        case "java.lang.AbstractStringBuilder$Constants": jl_AbstractStringBuilder$Constants.$clinit(); return jl_AbstractStringBuilder$Constants;
        case "java.lang.Object$NotifyListenerImpl": jl_Object$NotifyListenerImpl.$clinit(); return jl_Object$NotifyListenerImpl;
        case "org.teavm.jso.dom.html.HTMLDocument": otjdh_HTMLDocument.$clinit(); return otjdh_HTMLDocument;
        case "Button": Button.$clinit(); return Button;
        case "java.lang.Long": jl_Long.$clinit(); return jl_Long;
        case "java.util.Map": ju_Map.$clinit(); return ju_Map;
        case "java.lang.Thread": jl_Thread.$clinit(); return jl_Thread;
        case "greenfoot.j2js.Client$getResourceBytes$lambda$_12_0": gj_Client$getResourceBytes$lambda$_12_0.$clinit(); return gj_Client$getResourceBytes$lambda$_12_0;
        case "greenfoot.j2js.Client$getResourceBytes$lambda$_12_1": gj_Client$getResourceBytes$lambda$_12_1.$clinit(); return gj_Client$getResourceBytes$lambda$_12_1;
        case "org.teavm.platform.PlatformQueue": otp_PlatformQueue.$clinit(); return otp_PlatformQueue;
        case "java.lang.CharSequence": jl_CharSequence.$clinit(); return jl_CharSequence;
        case "java.lang.LinkageError": jl_LinkageError.$clinit(); return jl_LinkageError;
        case "Background": Background.$clinit(); return Background;
        case "Collider": Collider.$clinit(); return Collider;
        case "org.teavm.jso.dom.events.LoadEventTarget": otjde_LoadEventTarget.$clinit(); return otjde_LoadEventTarget;
        case "java.lang.StringIndexOutOfBoundsException": jl_StringIndexOutOfBoundsException.$clinit(); return jl_StringIndexOutOfBoundsException;
        case "Sound": Sound.$clinit(); return Sound;
        case "greenfoot.j2js.TouchManager": gj_TouchManager.$clinit(); return gj_TouchManager;
        case "java.io.Serializable": ji_Serializable.$clinit(); return ji_Serializable;
        case "java.nio.ByteOrder": jn_ByteOrder.$clinit(); return jn_ByteOrder;
        case "org.teavm.classlib.impl.Base46": otci_Base46.$clinit(); return otci_Base46;
        case "greenfoot.sound.Sound": gs_Sound.$clinit(); return gs_Sound;
        case "org.teavm.jso.browser.TimerHandler": otjb_TimerHandler.$clinit(); return otjb_TimerHandler;
        case "java.lang.StringBuilder": jl_StringBuilder.$clinit(); return jl_StringBuilder;
        case "java.util.ConcurrentModificationException": ju_ConcurrentModificationException.$clinit(); return ju_ConcurrentModificationException;
        case "Building": Building.$clinit(); return Building;
        case "java.util.Hashtable$1": ju_Hashtable$1.$clinit(); return ju_Hashtable$1;
        case "java.util.Hashtable$2": ju_Hashtable$2.$clinit(); return ju_Hashtable$2;
        case "java.util.Hashtable$Entry": ju_Hashtable$Entry.$clinit(); return ju_Hashtable$Entry;
        case "greenfoot.MouseInfoVisitor": g_MouseInfoVisitor.$clinit(); return g_MouseInfoVisitor;
        case "java.lang.ReflectiveOperationException": jl_ReflectiveOperationException.$clinit(); return jl_ReflectiveOperationException;
        case "greenfoot.platforms.GreenfootUtilDelegate": gp_GreenfootUtilDelegate.$clinit(); return gp_GreenfootUtilDelegate;
        case "greenfoot.collision.GOCollisionQuery": gc_GOCollisionQuery.$clinit(); return gc_GOCollisionQuery;
        case "java.nio.charset.CoderMalfunctionError": jnc_CoderMalfunctionError.$clinit(); return jnc_CoderMalfunctionError;
        case "greenfoot.j2js.Client$<init>$lambda$_1_3": gj_Client$_init_$lambda$_1_3.$clinit(); return gj_Client$_init_$lambda$_1_3;
        case "greenfoot.j2js.Client$<init>$lambda$_1_2": gj_Client$_init_$lambda$_1_2.$clinit(); return gj_Client$_init_$lambda$_1_2;
        case "greenfoot.j2js.Client$<init>$lambda$_1_1": gj_Client$_init_$lambda$_1_1.$clinit(); return gj_Client$_init_$lambda$_1_1;
        case "Stat": Stat.$clinit(); return Stat;
        case "greenfoot.collision.ibsp.ActorNode": gci_ActorNode.$clinit(); return gci_ActorNode;
        case "java.util.StringTokenizer": ju_StringTokenizer.$clinit(); return ju_StringTokenizer;
        case "java.nio.Buffer": jn_Buffer.$clinit(); return jn_Buffer;
        case "greenfoot.Color": g_Color.$clinit(); return g_Color;
        case "greenfoot.j2js.Client$getResourceURL$lambda$_11_0": gj_Client$getResourceURL$lambda$_11_0.$clinit(); return gj_Client$getResourceURL$lambda$_11_0;
        case "greenfoot.j2js.Client$<init>$lambda$_1_0": gj_Client$_init_$lambda$_1_0.$clinit(); return gj_Client$_init_$lambda$_1_0;
        case "greenfoot.j2js.Client$getResourceURL$lambda$_11_1": gj_Client$getResourceURL$lambda$_11_1.$clinit(); return gj_Client$getResourceURL$lambda$_11_1;
        case "ProgressBar": ProgressBar.$clinit(); return ProgressBar;
        case "java.io.Flushable": ji_Flushable.$clinit(); return ji_Flushable;
        case "greenfoot.collision.ibsp.Rect": gci_Rect.$clinit(); return gci_Rect;
        case "java.lang.IncompatibleClassChangeError": jl_IncompatibleClassChangeError.$clinit(); return jl_IncompatibleClassChangeError;
        case "greenfoot.sound.SoundFactory": gs_SoundFactory.$clinit(); return gs_SoundFactory;
        case "java.lang.NoSuchMethodError": jl_NoSuchMethodError.$clinit(); return jl_NoSuchMethodError;
        case "java.io.IOException": ji_IOException.$clinit(); return ji_IOException;
        case "Calc": Calc.$clinit(); return Calc;
        case "greenfoot.collision.PointCollisionQuery": gc_PointCollisionQuery.$clinit(); return gc_PointCollisionQuery;
        case "org.teavm.jso.typedarrays.ArrayBufferView": otjt_ArrayBufferView.$clinit(); return otjt_ArrayBufferView;
        case "ScrollableActor": ScrollableActor.$clinit(); return ScrollableActor;
        case "greenfoot.collision.ibsp.IBSPColChecker": gci_IBSPColChecker.$clinit(); return gci_IBSPColChecker;
        case "java.util.AbstractList$1": ju_AbstractList$1.$clinit(); return ju_AbstractList$1;
        case "greenfoot.core.ActInterruptedException": gc_ActInterruptedException.$clinit(); return gc_ActInterruptedException;
        case "greenfoot.core.ImageCache": gc_ImageCache.$clinit(); return gc_ImageCache;
        case "java.nio.ReadOnlyBufferException": jn_ReadOnlyBufferException.$clinit(); return jn_ReadOnlyBufferException;
        case "greenfoot.core.Simulation": gc_Simulation.$clinit(); return gc_Simulation;
        case "greenfoot.GreenfootSound": g_GreenfootSound.$clinit(); return g_GreenfootSound;
        case "java.lang.reflect.Array": jlr_Array.$clinit(); return jlr_Array;
        case "java.lang.Object$NotifyListenerImpl$interrupted$lambda$_4_0": jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0.$clinit(); return jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0;
        case "greenfoot.util.GreenfootUtil": gu_GreenfootUtil.$clinit(); return gu_GreenfootUtil;
        case "java.util.ListIterator": ju_ListIterator.$clinit(); return ju_ListIterator;
        case "Label": Label.$clinit(); return Label;
        case "org.teavm.classlib.impl.text.DoubleAnalyzer$Result": otcit_DoubleAnalyzer$Result.$clinit(); return otcit_DoubleAnalyzer$Result;
        case "java.util.Random": ju_Random.$clinit(); return ju_Random;
        case "java.lang.Runnable": jl_Runnable.$clinit(); return jl_Runnable;
        case "org.teavm.platform.plugin.ResourceAccessor": otpp_ResourceAccessor.$clinit(); return otpp_ResourceAccessor;
        case "java.lang.NoSuchFieldError": jl_NoSuchFieldError.$clinit(); return jl_NoSuchFieldError;
        case "java.util.AbstractCollection": ju_AbstractCollection.$clinit(); return ju_AbstractCollection;
        case "greenfoot.util.GraphicsUtilities": gu_GraphicsUtilities.$clinit(); return gu_GraphicsUtilities;
        case "java.io.ByteArrayInputStream": ji_ByteArrayInputStream.$clinit(); return ji_ByteArrayInputStream;
        case "UI": UI.$clinit(); return UI;
        case "org.teavm.classlib.impl.IntegerUtil": otci_IntegerUtil.$clinit(); return otci_IntegerUtil;
        case "LinkBox": LinkBox.$clinit(); return LinkBox;
        case "Enemy": Enemy.$clinit(); return Enemy;
        case "java.lang.InstantiationException": jl_InstantiationException.$clinit(); return jl_InstantiationException;
        case "java.lang.Readable": jl_Readable.$clinit(); return jl_Readable;
        case "greenfoot.ImageVisitor": g_ImageVisitor.$clinit(); return g_ImageVisitor;
        case "org.teavm.jso.impl.JS": otji_JS.$clinit(); return otji_JS;
        case "greenfoot.Actor": g_Actor.$clinit(); return g_Actor;
        case "java.util.Collection": ju_Collection.$clinit(); return ju_Collection;
        case "org.teavm.platform.PlatformRunnable": otp_PlatformRunnable.$clinit(); return otp_PlatformRunnable;
        case "java.net.URLStreamHandlerFactory": jn_URLStreamHandlerFactory.$clinit(); return jn_URLStreamHandlerFactory;
        case "org.teavm.classlib.impl.unicode.UnicodeHelper": otciu_UnicodeHelper.$clinit(); return otciu_UnicodeHelper;
        case "java.lang.Object$monitorEnterWait$lambda$_6_0": jl_Object$monitorEnterWait$lambda$_6_0.$clinit(); return jl_Object$monitorEnterWait$lambda$_6_0;
        case "java.util.Objects": ju_Objects.$clinit(); return ju_Objects;
        case "greenfoot.GreenfootImage$2": g_GreenfootImage$2.$clinit(); return g_GreenfootImage$2;
        case "java.util.HashMap$HashEntry": ju_HashMap$HashEntry.$clinit(); return ju_HashMap$HashEntry;
        case "greenfoot.GreenfootImage$1": g_GreenfootImage$1.$clinit(); return g_GreenfootImage$1;
        case "java.nio.charset.CharsetEncoder": jnc_CharsetEncoder.$clinit(); return jnc_CharsetEncoder;
        case "org.teavm.jso.browser.Performance": otjb_Performance.$clinit(); return otjb_Performance;
        case "greenfoot.j2js.Client$lambda$new$1$lambda$_22_0": gj_Client$lambda$new$1$lambda$_22_0.$clinit(); return gj_Client$lambda$new$1$lambda$_22_0;
        case "java.util.Queue": ju_Queue.$clinit(); return ju_Queue;
        case "java.util.MapEntry": ju_MapEntry.$clinit(); return ju_MapEntry;
        case "java.lang.ArrayStoreException": jl_ArrayStoreException.$clinit(); return jl_ArrayStoreException;
        case "greenfoot.sound.SoundFactory$2": gs_SoundFactory$2.$clinit(); return gs_SoundFactory$2;
        case "greenfoot.sound.SoundFactory$1": gs_SoundFactory$1.$clinit(); return gs_SoundFactory$1;
        case "java.nio.ByteBufferImpl": jn_ByteBufferImpl.$clinit(); return jn_ByteBufferImpl;
        case "java.util.HashMap$KeyIterator": ju_HashMap$KeyIterator.$clinit(); return ju_HashMap$KeyIterator;
        case "java.lang.Thread$SleepHandler": jl_Thread$SleepHandler.$clinit(); return jl_Thread$SleepHandler;
        case "greenfoot.j2js.ContentReceiver": gj_ContentReceiver.$clinit(); return gj_ContentReceiver;
        case "greenfoot.collision.ColManager": gc_ColManager.$clinit(); return gc_ColManager;
        case "greenfoot.j2js.ErrorCallback": gj_ErrorCallback.$clinit(); return gj_ErrorCallback;
        case "TitleButton": TitleButton.$clinit(); return TitleButton;
        case "java.util.HashSet": ju_HashSet.$clinit(); return ju_HashSet;
        case "java.io.FilterInputStream": ji_FilterInputStream.$clinit(); return ji_FilterInputStream;
        case "greenfoot.ActorSet$ActorSetIterator": g_ActorSet$ActorSetIterator.$clinit(); return g_ActorSet$ActorSetIterator;
        case "org.teavm.platform.Platform": otp_Platform.$clinit(); return otp_Platform;
        case "java.nio.charset.Charset": jnc_Charset.$clinit(); return jnc_Charset;
        case "greenfoot.platforms.ActorDelegate": gp_ActorDelegate.$clinit(); return gp_ActorDelegate;
        case "java.nio.charset.CodingErrorAction": jnc_CodingErrorAction.$clinit(); return jnc_CodingErrorAction;
        case "java.lang.AbstractStringBuilder": jl_AbstractStringBuilder.$clinit(); return jl_AbstractStringBuilder;
        case "java.nio.charset.IllegalCharsetNameException": jnc_IllegalCharsetNameException.$clinit(); return jnc_IllegalCharsetNameException;
        case "java.util.LinkedList": ju_LinkedList.$clinit(); return ju_LinkedList;
        case "java.util.NoSuchElementException": ju_NoSuchElementException.$clinit(); return ju_NoSuchElementException;
        case "greenfoot.sound.SoundFactory$1$handleEvent$lambda$_1_0": gs_SoundFactory$1$handleEvent$lambda$_1_0.$clinit(); return gs_SoundFactory$1$handleEvent$lambda$_1_0;
        case "RestartButton": RestartButton.$clinit(); return RestartButton;
        case "org.teavm.jso.core.JSString": otjc_JSString.$clinit(); return otjc_JSString;
        case "java.io.PrintStream": ji_PrintStream.$clinit(); return ji_PrintStream;
        case "java.lang.Appendable": jl_Appendable.$clinit(); return jl_Appendable;
        case "org.teavm.interop.AsyncCallback": oti_AsyncCallback.$clinit(); return oti_AsyncCallback;
        case "greenfoot.GreenfootImage": g_GreenfootImage.$clinit(); return g_GreenfootImage;
        case "java.util.AbstractMap": ju_AbstractMap.$clinit(); return ju_AbstractMap;
        case "java.lang.Object": jl_Object.$clinit(); return jl_Object;
        case "java.lang.Class": jl_Class.$clinit(); return jl_Class;
        case "java.util.Comparator": ju_Comparator.$clinit(); return ju_Comparator;
        case "greenfoot.core.ImageCache$CachedImageRef": gc_ImageCache$CachedImageRef.$clinit(); return gc_ImageCache$CachedImageRef;
        case "HighlightEnabler": HighlightEnabler.$clinit(); return HighlightEnabler;
        case "org.teavm.jso.dom.xml.Document": otjdx_Document.$clinit(); return otjdx_Document;
        case "java.util.Arrays": ju_Arrays.$clinit(); return ju_Arrays;
        case "greenfoot.collision.ibsp.BSPNodeCache": gci_BSPNodeCache.$clinit(); return gci_BSPNodeCache;
        case "greenfoot.j2js.MouseManager": gj_MouseManager.$clinit(); return gj_MouseManager;
        case "greenfoot.gui.input.mouse.WorldLocator": ggim_WorldLocator.$clinit(); return ggim_WorldLocator;
        case "greenfoot.core.WorldHandler$1": gc_WorldHandler$1.$clinit(); return gc_WorldHandler$1;
        case "java.lang.ConsoleOutputStreamStdout": jl_ConsoleOutputStreamStdout.$clinit(); return jl_ConsoleOutputStreamStdout;
        case "java.lang.System": jl_System.$clinit(); return jl_System;
        case "greenfoot.Greenfoot": g_Greenfoot.$clinit(); return g_Greenfoot;
        case "greenfoot.collision.InRangeQuery": gc_InRangeQuery.$clinit(); return gc_InRangeQuery;
        case "greenfoot.core.WorldHandler$2": gc_WorldHandler$2.$clinit(); return gc_WorldHandler$2;
        case "Image": Image.$clinit(); return Image;
        case "EnemyImage": EnemyImage.$clinit(); return EnemyImage;
        case "java.util.LinkedList$Entry": ju_LinkedList$Entry.$clinit(); return ju_LinkedList$Entry;
        case "java.util.Collections$5": ju_Collections$5.$clinit(); return ju_Collections$5;
        case "java.util.Collections$6": ju_Collections$6.$clinit(); return ju_Collections$6;
        case "java.util.Collections$3": ju_Collections$3.$clinit(); return ju_Collections$3;
        case "java.lang.Character": jl_Character.$clinit(); return jl_Character;
        case "java.lang.Object$monitorExit$lambda$_8_0": jl_Object$monitorExit$lambda$_8_0.$clinit(); return jl_Object$monitorExit$lambda$_8_0;
        case "greenfoot.GreenfootImage$2$handleEvent$lambda$_1_0": g_GreenfootImage$2$handleEvent$lambda$_1_0.$clinit(); return g_GreenfootImage$2$handleEvent$lambda$_1_0;
        case "greenfoot.gui.input.mouse.PriorityManager": ggim_PriorityManager.$clinit(); return ggim_PriorityManager;
        case "java.nio.CharBufferOverArray": jn_CharBufferOverArray.$clinit(); return jn_CharBufferOverArray;
        case "BuildingImage": BuildingImage.$clinit(); return BuildingImage;
        case "java.util.Set": ju_Set.$clinit(); return ju_Set;
        case "java.lang.Thread$SleepHandler$interrupted$lambda$_1_0": jl_Thread$SleepHandler$interrupted$lambda$_1_0.$clinit(); return jl_Thread$SleepHandler$interrupted$lambda$_1_0;
        case "java.io.FilterOutputStream": ji_FilterOutputStream.$clinit(); return ji_FilterOutputStream;
        case "Instructions": Instructions.$clinit(); return Instructions;
        case "java.lang.Exception": jl_Exception.$clinit(); return jl_Exception;
        case "greenfoot.ActorVisitor": g_ActorVisitor.$clinit(); return g_ActorVisitor;
        case "org.teavm.classlib.ResourceSource": otc_ResourceSource.$clinit(); return otc_ResourceSource;
        case "java.lang.Object$NotifyListener": jl_Object$NotifyListener.$clinit(); return jl_Object$NotifyListener;
        case "java.util.Dictionary": ju_Dictionary.$clinit(); return ju_Dictionary;
        case "java.lang.reflect.AnnotatedElement": jlr_AnnotatedElement.$clinit(); return jlr_AnnotatedElement;
        case "java.lang.Throwable": jl_Throwable.$clinit(); return jl_Throwable;
        case "greenfoot.gui.input.mouse.MouseEventData": ggim_MouseEventData.$clinit(); return ggim_MouseEventData;
        case "java.util.HashMap$1": ju_HashMap$1.$clinit(); return ju_HashMap$1;
        case "org.teavm.jso.JSObject": otj_JSObject.$clinit(); return otj_JSObject;
        case "java.lang.Double": jl_Double.$clinit(); return jl_Double;
        case "greenfoot.ActorSet$ListNode": g_ActorSet$ListNode.$clinit(); return g_ActorSet$ListNode;
        case "java.lang.Error": jl_Error.$clinit(); return jl_Error;
        case "org.teavm.jso.browser.WindowEventTarget": otjb_WindowEventTarget.$clinit(); return otjb_WindowEventTarget;
        case "greenfoot.World": g_World.$clinit(); return g_World;
        case "greenfoot.event.SimulationEvent": ge_SimulationEvent.$clinit(); return ge_SimulationEvent;
        case "java.util.ArrayList": ju_ArrayList.$clinit(); return ju_ArrayList;
        case "Slope": Slope.$clinit(); return Slope;
        case "java.util.RandomAccess": ju_RandomAccess.$clinit(); return ju_RandomAccess;
        case "org.teavm.jso.browser.Window": otjb_Window.$clinit(); return otjb_Window;
        case "java.lang.IllegalMonitorStateException": jl_IllegalMonitorStateException.$clinit(); return jl_IllegalMonitorStateException;
        case "ScrollableWorld": ScrollableWorld.$clinit(); return ScrollableWorld;
        case "java.util.LinkedList$SequentialListIterator": ju_LinkedList$SequentialListIterator.$clinit(); return ju_LinkedList$SequentialListIterator;
        case "greenfoot.j2js.KeyboardManager": gj_KeyboardManager.$clinit(); return gj_KeyboardManager;
        case "java.lang.String": jl_String.$clinit(); return jl_String;
        case "java.lang.Number": jl_Number.$clinit(); return jl_Number;
        case "greenfoot.j2js.Client$2": gj_Client$2.$clinit(); return gj_Client$2;
        case "greenfoot.j2js.Client$1": gj_Client$1.$clinit(); return gj_Client$1;
        case "greenfoot.j2js.Client$4": gj_Client$4.$clinit(); return gj_Client$4;
        case "greenfoot.j2js.Client$3": gj_Client$3.$clinit(); return gj_Client$3;
        case "org.teavm.jso.dom.events.FocusEventTarget": otjde_FocusEventTarget.$clinit(); return otjde_FocusEventTarget;
        case "java.lang.NegativeArraySizeException": jl_NegativeArraySizeException.$clinit(); return jl_NegativeArraySizeException;
        case "greenfoot.TreeActorSet$TasIterator": g_TreeActorSet$TasIterator.$clinit(); return g_TreeActorSet$TasIterator;
        case "java.nio.charset.impl.UTF8Encoder": jnci_UTF8Encoder.$clinit(); return jnci_UTF8Encoder;
        case "java.lang.UnsupportedOperationException": jl_UnsupportedOperationException.$clinit(); return jl_UnsupportedOperationException;
        case "org.teavm.jso.dom.events.MouseEventTarget": otjde_MouseEventTarget.$clinit(); return otjde_MouseEventTarget;
        case "java.util.Map$Entry": ju_Map$Entry.$clinit(); return ju_Map$Entry;
        case "java.util.Properties": ju_Properties.$clinit(); return ju_Properties;
        case "Living": Living.$clinit(); return Living;
        case "java.util.Collections$<clinit>$lambda$_61_1": ju_Collections$_clinit_$lambda$_61_1.$clinit(); return ju_Collections$_clinit_$lambda$_61_1;
        case "java.util.Collections$<clinit>$lambda$_61_0": ju_Collections$_clinit_$lambda$_61_0.$clinit(); return ju_Collections$_clinit_$lambda$_61_0;
        case "java.lang.NumberFormatException": jl_NumberFormatException.$clinit(); return jl_NumberFormatException;
        case "Text": Text.$clinit(); return Text;
        case "EndScreen": EndScreen.$clinit(); return EndScreen;
        case "java.lang.RuntimeException": jl_RuntimeException.$clinit(); return jl_RuntimeException;
        case "greenfoot.collision.NeighbourCollisionQuery": gc_NeighbourCollisionQuery.$clinit(); return gc_NeighbourCollisionQuery;
        case "greenfoot.core.WorldHandler": gc_WorldHandler.$clinit(); return gc_WorldHandler;
        case "java.nio.charset.impl.UTF8Charset": jnci_UTF8Charset.$clinit(); return jnci_UTF8Charset;
        case "org.teavm.jso.dom.events.KeyboardEventTarget": otjde_KeyboardEventTarget.$clinit(); return otjde_KeyboardEventTarget;
        case "java.lang.Comparable": jl_Comparable.$clinit(); return jl_Comparable;
        case "java.lang.ClassNotFoundException": jl_ClassNotFoundException.$clinit(); return jl_ClassNotFoundException;
        case "java.nio.CharBufferImpl": jn_CharBufferImpl.$clinit(); return jn_CharBufferImpl;
        case "greenfoot.j2js.MouseManager$1$handleEvent$lambda$_1_0": gj_MouseManager$1$handleEvent$lambda$_1_0.$clinit(); return gj_MouseManager$1$handleEvent$lambda$_1_0;
        case "java.lang.IllegalStateException": jl_IllegalStateException.$clinit(); return jl_IllegalStateException;
        case "greenfoot.event.WorldEvent": ge_WorldEvent.$clinit(); return ge_WorldEvent;
        case "java.net.URL": jn_URL.$clinit(); return jn_URL;
        case "java.util.HashMap$AbstractMapIterator": ju_HashMap$AbstractMapIterator.$clinit(); return ju_HashMap$AbstractMapIterator;
        case "greenfoot.Font": g_Font.$clinit(); return g_Font;
        case "java.util.AbstractList": ju_AbstractList.$clinit(); return ju_AbstractList;
        case "java.lang.AutoCloseable": jl_AutoCloseable.$clinit(); return jl_AutoCloseable;
        case "java.lang.NullPointerException": jl_NullPointerException.$clinit(); return jl_NullPointerException;
        case "java.nio.ByteBuffer": jn_ByteBuffer.$clinit(); return jn_ByteBuffer;
        case "org.teavm.platform.plugin.AsyncCallbackWrapper": otpp_AsyncCallbackWrapper.$clinit(); return otpp_AsyncCallbackWrapper;
        case "org.teavm.runtime.EventQueue$Event": otr_EventQueue$Event.$clinit(); return otr_EventQueue$Event;
        case "java.lang.Object$Monitor": jl_Object$Monitor.$clinit(); return jl_Object$Monitor;
        case "java.lang.ThreadInterruptHandler": jl_ThreadInterruptHandler.$clinit(); return jl_ThreadInterruptHandler;
        case "TitleDisplay": TitleDisplay.$clinit(); return TitleDisplay;
        case "greenfoot.collision.CollisionQuery": gc_CollisionQuery.$clinit(); return gc_CollisionQuery;
        case "java.lang.Math": jl_Math.$clinit(); return jl_Math;
        case "Sort": Sort.$clinit(); return Sort;
        case "java.util.HashMap$HashMapEntrySet": ju_HashMap$HashMapEntrySet.$clinit(); return ju_HashMap$HashMapEntrySet;
        case "PlayButton": PlayButton.$clinit(); return PlayButton;
        case "greenfoot.ActorSet": g_ActorSet.$clinit(); return g_ActorSet;
        case "greenfoot.WorldVisitor": g_WorldVisitor.$clinit(); return g_WorldVisitor;
        case "greenfoot.j2js.MouseManager$1": gj_MouseManager$1.$clinit(); return gj_MouseManager$1;
        case "greenfoot.collision.CollisionChecker": gc_CollisionChecker.$clinit(); return gc_CollisionChecker;
        case "java.lang.Cloneable": jl_Cloneable.$clinit(); return jl_Cloneable;
        case "greenfoot.event.WorldListener": ge_WorldListener.$clinit(); return ge_WorldListener;
        case "Player": Player.$clinit(); return Player;
        case "java.nio.CharBuffer": jn_CharBuffer.$clinit(); return jn_CharBuffer;
        case "LoadingScreen": LoadingScreen.$clinit(); return LoadingScreen;
        case "City": City.$clinit(); return City;
        case "Chunk": Chunk.$clinit(); return Chunk;
        case "java.util.AbstractSequentialList": ju_AbstractSequentialList.$clinit(); return ju_AbstractSequentialList;
        case "NonLiving": NonLiving.$clinit(); return NonLiving;
        case "java.util.List": ju_List.$clinit(); return ju_List;
        case "greenfoot.j2js.JsActorDelegate": gj_JsActorDelegate.$clinit(); return gj_JsActorDelegate;
        case "java.lang.Object$NotifyListenerImpl$onTimer$lambda$_2_0": jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0.$clinit(); return jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0;
        case "greenfoot.TreeActorSet": g_TreeActorSet.$clinit(); return g_TreeActorSet;
        case "greenfoot.core.RepaintHandler": gc_RepaintHandler.$clinit(); return gc_RepaintHandler;
        case "java.lang.String$<clinit>$lambda$_81_0": jl_String$_clinit_$lambda$_81_0.$clinit(); return jl_String$_clinit_$lambda$_81_0;
        case "greenfoot.platforms.SimulationDelegate": gp_SimulationDelegate.$clinit(); return gp_SimulationDelegate;
        case "org.teavm.jso.dom.events.EventTarget": otjde_EventTarget.$clinit(); return otjde_EventTarget;
        case "PlayerImage": PlayerImage.$clinit(); return PlayerImage;
        case "DifficultyButton": DifficultyButton.$clinit(); return DifficultyButton;
        case "org.teavm.jso.dom.events.EventListener": otjde_EventListener.$clinit(); return otjde_EventListener;
        case "Screen": Screen.$clinit(); return Screen;
        case "java.nio.BufferOverflowException": jn_BufferOverflowException.$clinit(); return jn_BufferOverflowException;
        case "java.util.AbstractSet": ju_AbstractSet.$clinit(); return ju_AbstractSet;
        case "java.util.HashMap": ju_HashMap.$clinit(); return ju_HashMap;
        case "greenfoot.GreenfootImage$1$handleEvent$lambda$_1_0": g_GreenfootImage$1$handleEvent$lambda$_1_0.$clinit(); return g_GreenfootImage$1$handleEvent$lambda$_1_0;
        case "java.util.Deque": ju_Deque.$clinit(); return ju_Deque;
        case "java.lang.Thread$start$lambda$_4_0": jl_Thread$start$lambda$_4_0.$clinit(); return jl_Thread$start$lambda$_4_0;
        case "java.lang.Iterable": jl_Iterable.$clinit(); return jl_Iterable;
        case "org.teavm.classlib.impl.unicode.UnicodeHelper$Range": otciu_UnicodeHelper$Range.$clinit(); return otciu_UnicodeHelper$Range;
        case "java.nio.charset.CoderResult": jnc_CoderResult.$clinit(); return jnc_CoderResult;
        case "greenfoot.MouseInfo": g_MouseInfo.$clinit(); return g_MouseInfo;
        case "org.teavm.classlib.impl.text.DoubleAnalyzer": otcit_DoubleAnalyzer.$clinit(); return otcit_DoubleAnalyzer;
        case "java.lang.NoClassDefFoundError": jl_NoClassDefFoundError.$clinit(); return jl_NoClassDefFoundError;
        case "java.util.Hashtable": ju_Hashtable.$clinit(); return ju_Hashtable;
        case "greenfoot.j2js.Client": gj_Client.$clinit(); return gj_Client;
        case "java.io.OutputStream": ji_OutputStream.$clinit(); return ji_OutputStream;
        case "greenfoot.event.SimulationListener": ge_SimulationListener.$clinit(); return ge_SimulationListener;
        case "org.teavm.classlib.impl.CharFlow": otci_CharFlow.$clinit(); return otci_CharFlow;
        case "java.util.Iterator": ju_Iterator.$clinit(); return ju_Iterator;
        case "greenfoot.core.TextLabel": gc_TextLabel.$clinit(); return gc_TextLabel;
        case "greenfoot.j2js.MouseManager$handleEvent$lambda$_10_0": gj_MouseManager$handleEvent$lambda$_10_0.$clinit(); return gj_MouseManager$handleEvent$lambda$_10_0;
        case "java.lang.IllegalArgumentException": jl_IllegalArgumentException.$clinit(); return jl_IllegalArgumentException;
        case "java.nio.BufferUnderflowException": jn_BufferUnderflowException.$clinit(); return jn_BufferUnderflowException;
        case "java.lang.ConsoleOutputStreamStderr": jl_ConsoleOutputStreamStderr.$clinit(); return jl_ConsoleOutputStreamStderr;
        case "java.nio.charset.impl.BufferedEncoder": jnci_BufferedEncoder.$clinit(); return jnci_BufferedEncoder;
        case "org.teavm.jso.dom.xml.Node": otjdx_Node.$clinit(); return otjdx_Node;
        case "org.teavm.classlib.impl.text.FloatAnalyzer$Result": otcit_FloatAnalyzer$Result.$clinit(); return otcit_FloatAnalyzer$Result;
        case "java.lang.InterruptedException": jl_InterruptedException.$clinit(); return jl_InterruptedException;
        case "java.io.Closeable": ji_Closeable.$clinit(); return ji_Closeable;
        case "java.util.HashMap$EntryIterator": ju_HashMap$EntryIterator.$clinit(); return ju_HashMap$EntryIterator;
        case "org.teavm.jso.core.JSArrayReader": otjc_JSArrayReader.$clinit(); return otjc_JSArrayReader;
        case "java.util.Collections": ju_Collections.$clinit(); return ju_Collections;
        case "org.teavm.jso.browser.StorageProvider": otjb_StorageProvider.$clinit(); return otjb_StorageProvider;
        case "Track": Track.$clinit(); return Track;
        case "greenfoot.collision.ibsp.BSPNode": gci_BSPNode.$clinit(); return gci_BSPNode;
        case "java.io.InputStream": ji_InputStream.$clinit(); return ji_InputStream;
        default: return null;
    }
}
function otp_Platform_startThread(var$1) {
    return setTimeout(function() {
        $rt_threadStarter(otp_Platform_launchThread)(var$1);
    }, 0);
}
function otp_Platform_launchThread($runnable) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$runnable = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        $runnable.$run();
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($runnable, $ptr);
}
function otp_Platform_postpone($runnable) {
    otp_Platform_schedule($runnable, 0);
}
function otp_Platform_schedule(var$1, var$2) {
    return setTimeout(function() {
        otp_Platform_launchThread(var$1);
    }, var$2);
}
function otp_Platform_killSchedule($id) {
    clearTimeout($id);
}
function otp_Platform_createQueue() {
    return otp_Platform_createQueueJs$js_body$_30();
}
function otp_Platform_stringFromCharCode($charCode) {
    return otj_JSObject_cast$static(String.fromCharCode($charCode));
}
function otp_Platform_isPrimitive($cls) {
    return $cls.$meta.primitive ? 1 : 0;
}
function otp_Platform_getArrayItem($cls) {
    return $cls.$meta.item;
}
function otp_Platform_getName($cls) {
    return $rt_str($cls.$meta.name);
}
function otp_Platform_createQueueJs$js_body$_30() {
    return [];
}
function jnc_Charset() {
    var a = this; jl_Object.call(a);
    a.$canonicalName = null;
    a.$aliases = null;
}
function jnc_Charset__init_(var_0, var_1) {
    var var_2 = new jnc_Charset();
    jnc_Charset__init_0(var_2, var_0, var_1);
    return var_2;
}
function jnc_Charset__init_0($this, $canonicalName, $aliases) {
    var var$3, var$4, var$5, $alias;
    var$3 = $aliases.data;
    jl_Object__init_0($this);
    jnc_Charset_checkCanonicalName($canonicalName);
    var$4 = var$3.length;
    var$5 = 0;
    while (var$5 < var$4) {
        $alias = var$3[var$5];
        jnc_Charset_checkCanonicalName($alias);
        var$5 = var$5 + 1 | 0;
    }
    $this.$canonicalName = $canonicalName;
    $this.$aliases = $aliases.$clone();
}
function jnc_Charset_checkCanonicalName($name) {
    var $i, $c;
    if ($name.$isEmpty())
        $rt_throw(jnc_IllegalCharsetNameException__init_($name));
    if (!jnc_Charset_isValidCharsetStart($name.$charAt(0)))
        $rt_throw(jnc_IllegalCharsetNameException__init_($name));
    $i = 1;
    while ($i < $name.$length()) {
        a: {
            $c = $name.$charAt($i);
            switch ($c) {
                case 43:
                case 45:
                case 46:
                case 58:
                case 95:
                    break;
                default:
                    if (jnc_Charset_isValidCharsetStart($c))
                        break a;
                    else
                        $rt_throw(jnc_IllegalCharsetNameException__init_($name));
            }
        }
        $i = $i + 1 | 0;
    }
}
function jnc_Charset_isValidCharsetStart($c) {
    return !($c >= 48 && $c <= 57) && !($c >= 97 && $c <= 122) && $c < 65 && $c > 90 ? 0 : 1;
}
function gp_ActorDelegate() {
}
function jnc_CodingErrorAction() {
    jl_Object.call(this);
    this.$name1 = null;
}
var jnc_CodingErrorAction_IGNORE = null;
var jnc_CodingErrorAction_REPLACE = null;
var jnc_CodingErrorAction_REPORT = null;
function jnc_CodingErrorAction_$callClinit() {
    jnc_CodingErrorAction_$callClinit = $rt_eraseClinit(jnc_CodingErrorAction);
    jnc_CodingErrorAction__clinit_();
}
function jnc_CodingErrorAction__init_(var_0) {
    var var_1 = new jnc_CodingErrorAction();
    jnc_CodingErrorAction__init_0(var_1, var_0);
    return var_1;
}
function jnc_CodingErrorAction__init_0($this, $name) {
    jnc_CodingErrorAction_$callClinit();
    jl_Object__init_0($this);
    $this.$name1 = $name;
}
function jnc_CodingErrorAction__clinit_() {
    jnc_CodingErrorAction_IGNORE = jnc_CodingErrorAction__init_($rt_s(176));
    jnc_CodingErrorAction_REPLACE = jnc_CodingErrorAction__init_($rt_s(177));
    jnc_CodingErrorAction_REPORT = jnc_CodingErrorAction__init_($rt_s(178));
}
function jl_IllegalArgumentException() {
    jl_RuntimeException.call(this);
}
function jl_IllegalArgumentException__init_0() {
    var var_0 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_1(var_0);
    return var_0;
}
function jl_IllegalArgumentException__init_(var_0) {
    var var_1 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_2(var_1, var_0);
    return var_1;
}
function jl_IllegalArgumentException__init_1($this) {
    jl_RuntimeException__init_1($this);
}
function jl_IllegalArgumentException__init_2($this, $message) {
    jl_RuntimeException__init_2($this, $message);
}
function jnc_IllegalCharsetNameException() {
    jl_IllegalArgumentException.call(this);
    this.$charsetName = null;
}
function jnc_IllegalCharsetNameException__init_(var_0) {
    var var_1 = new jnc_IllegalCharsetNameException();
    jnc_IllegalCharsetNameException__init_0(var_1, var_0);
    return var_1;
}
function jnc_IllegalCharsetNameException__init_0($this, $charsetName) {
    jl_IllegalArgumentException__init_1($this);
    $this.$charsetName = $charsetName;
}
function ju_List() {
}
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount0 = 0;
}
function ju_AbstractList__init_() {
    var var_0 = new ju_AbstractList();
    ju_AbstractList__init_0(var_0);
    return var_0;
}
function ju_AbstractList__init_0($this) {
    ju_AbstractCollection__init_0($this);
}
function ju_AbstractList_add($this, $e) {
    $this.$add2($this.$size(), $e);
    return 1;
}
function ju_AbstractList_iterator($this) {
    return ju_AbstractList$1__init_($this);
}
function ju_AbstractList_indexOf($this, $o) {
    var $sz, $i, $e;
    $sz = $this.$size();
    $i = 0;
    a: {
        while ($i < $sz) {
            b: {
                $e = $this.$get0($i);
                if ($o !== null) {
                    if (!$o.$equals($e))
                        break b;
                    else
                        break a;
                }
                if ($e === null)
                    break a;
            }
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    return $i;
}
function ju_AbstractSequentialList() {
    ju_AbstractList.call(this);
}
function ju_AbstractSequentialList__init_() {
    var var_0 = new ju_AbstractSequentialList();
    ju_AbstractSequentialList__init_0(var_0);
    return var_0;
}
function ju_AbstractSequentialList__init_0($this) {
    ju_AbstractList__init_0($this);
}
function ju_AbstractSequentialList_get($this, $index) {
    var $iter;
    if ($index < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $iter = $this.$listIterator($index);
    return $iter.$next();
}
function ju_AbstractSequentialList_add($this, $index, $element) {
    var $iter;
    if ($index < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $iter = $this.$listIterator($index);
    $iter.$add3($element);
}
function ju_AbstractSequentialList_iterator($this) {
    return $this.$listIterator0();
}
function ju_Deque() {
}
function ju_LinkedList() {
    var a = this; ju_AbstractSequentialList.call(a);
    a.$firstEntry = null;
    a.$lastEntry = null;
    a.$size1 = 0;
}
function ju_LinkedList__init_() {
    var var_0 = new ju_LinkedList();
    ju_LinkedList__init_0(var_0);
    return var_0;
}
function ju_LinkedList__init_0($this) {
    ju_AbstractSequentialList__init_0($this);
}
function ju_LinkedList_size($this) {
    return $this.$size1;
}
function ju_LinkedList_clear($this) {
    $this.$firstEntry = null;
    $this.$lastEntry = null;
    $this.$size1 = 0;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
}
function ju_LinkedList_listIterator($this) {
    return ju_LinkedList$SequentialListIterator__init_($this, $this.$firstEntry, null, 0);
}
function ju_LinkedList_listIterator0($this, $index) {
    var $next, $i, $prev;
    if ($index < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    if ($index <= ($this.$size1 / 2 | 0)) {
        $next = $this.$firstEntry;
        $i = 0;
        while ($i < $index) {
            $next = $next.$next5;
            $i = $i + 1 | 0;
        }
        return ju_LinkedList$SequentialListIterator__init_($this, $next, $next === null ? null : $next.$previous, $index);
    }
    if ($index > $this.$size1)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $prev = $this.$lastEntry;
    $i = $index;
    while ($i < $this.$size1) {
        $prev = $prev.$previous;
        $i = $i + 1 | 0;
    }
    return ju_LinkedList$SequentialListIterator__init_($this, $prev === null ? null : $prev.$next5, $prev, $index);
}
function ju_LinkedList_remove($this) {
    if (!$this.$isEmpty())
        return $this.$poll();
    $rt_throw(ju_NoSuchElementException__init_());
}
function ju_LinkedList_poll($this) {
    var $entry;
    if ($this.$firstEntry === null)
        return null;
    $entry = $this.$firstEntry;
    $this.$firstEntry = $this.$firstEntry.$next5;
    if ($this.$firstEntry === null)
        $this.$lastEntry = null;
    else
        $this.$firstEntry.$previous = null;
    $this.$size1 = $this.$size1 - 1 | 0;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    return $entry.$item;
}
function ju_LinkedList_peek($this) {
    return $this.$firstEntry === null ? null : $this.$firstEntry.$item;
}
function ju_LinkedList_removeFirst($this) {
    return $this.$remove2();
}
function ju_LinkedList_removeEntry($this, $entry) {
    if ($entry.$previous === null)
        $this.$firstEntry = $entry.$next5;
    else
        $entry.$previous.$next5 = $entry.$next5;
    if ($entry.$next5 === null)
        $this.$lastEntry = $entry.$previous;
    else
        $entry.$next5.$previous = $entry.$previous;
    $this.$size1 = $this.$size1 - 1 | 0;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
}
function ju_LinkedList_access$100($x0, $x1) {
    ju_LinkedList_removeEntry($x0, $x1);
}
function ju_LinkedList_access$202($x0, $x1) {
    $x0.$firstEntry = $x1;
    return $x1;
}
function ju_LinkedList_access$302($x0, $x1) {
    $x0.$lastEntry = $x1;
    return $x1;
}
function ju_LinkedList_access$404($x0) {
    var var$2;
    var$2 = $x0.$size1 + 1 | 0;
    $x0.$size1 = var$2;
    return var$2;
}
function ju_NoSuchElementException() {
    jl_RuntimeException.call(this);
}
function ju_NoSuchElementException__init_() {
    var var_0 = new ju_NoSuchElementException();
    ju_NoSuchElementException__init_0(var_0);
    return var_0;
}
function ju_NoSuchElementException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function gs_SoundFactory$1$handleEvent$lambda$_1_0() {
    jl_Object.call(this);
    this.$_012 = null;
}
function gs_SoundFactory$1$handleEvent$lambda$_1_0__init_(var_0) {
    var var_1 = new gs_SoundFactory$1$handleEvent$lambda$_1_0();
    gs_SoundFactory$1$handleEvent$lambda$_1_0__init_0(var_1, var_0);
    return var_1;
}
function gs_SoundFactory$1$handleEvent$lambda$_1_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_012 = var$1;
}
function gs_SoundFactory$1$handleEvent$lambda$_1_0_run(var$0) {
    gs_SoundFactory$1_lambda$handleEvent$0(var$0.$_012);
}
function RestartButton() {
    Button.call(this);
    this.$city1 = null;
}
function RestartButton__init_0(var_0) {
    var var_1 = new RestartButton();
    RestartButton__init_(var_1, var_0);
    return var_1;
}
function RestartButton__init_($this, $city) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$city = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Button__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$city1 = $city;
        var$2 = $rt_s(179);
        $ptr = 2;
    case 2:
        $this.$setImage1(var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $city, var$2, $ptr);
}
function RestartButton_act($this) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (!g_Greenfoot_mousePressed($this))
            return;
        document.getElementById('scenarioCanvas').focus();
        SoundManager_playSound($rt_s(17), 100);
        $this.$getWorld().$removeEndUI();
        var$1 = $this.$city1;
        $ptr = 1;
    case 1:
        var$1.$restart();
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function otjc_JSString() {
    jl_Object.call(this);
}
function ji_OutputStream() {
    jl_Object.call(this);
}
function ji_OutputStream__init_() {
    var var_0 = new ji_OutputStream();
    ji_OutputStream__init_0(var_0);
    return var_0;
}
function ji_OutputStream__init_0($this) {
    jl_Object__init_0($this);
}
function ji_OutputStream_write($this, $b, $off, $len) {
    var $i, var$5, var$6;
    $i = 0;
    while ($i < $len) {
        var$5 = $b.data;
        var$6 = $off + 1 | 0;
        $this.$write(var$5[$off]);
        $i = $i + 1 | 0;
        $off = var$6;
    }
}
function ji_FilterOutputStream() {
    ji_OutputStream.call(this);
    this.$out1 = null;
}
function ji_FilterOutputStream__init_(var_0) {
    var var_1 = new ji_FilterOutputStream();
    ji_FilterOutputStream__init_0(var_1, var_0);
    return var_1;
}
function ji_FilterOutputStream__init_0($this, $out) {
    ji_OutputStream__init_0($this);
    $this.$out1 = $out;
}
function ji_PrintStream() {
    var a = this; ji_FilterOutputStream.call(a);
    a.$autoFlush = 0;
    a.$errorState = 0;
    a.$sb = null;
    a.$buffer0 = null;
    a.$charset0 = null;
}
function ji_PrintStream__init_(var_0, var_1) {
    var var_2 = new ji_PrintStream();
    ji_PrintStream__init_0(var_2, var_0, var_1);
    return var_2;
}
function ji_PrintStream__init_0($this, $out, $autoFlush) {
    ji_FilterOutputStream__init_0($this, $out);
    $this.$sb = jl_StringBuilder__init_();
    $this.$buffer0 = $rt_createCharArray(32);
    $this.$autoFlush = $autoFlush;
    $this.$charset0 = jnci_UTF8Charset__init_0();
}
function ji_PrintStream_write($this, $b, $off, $len) {
    var $$je;
    if (!ji_PrintStream_check($this))
        return;
    a: {
        try {
            $this.$out1.$write0($b, $off, $len);
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
                $this.$errorState = 1;
                break a;
            } else {
                throw $$e;
            }
        }
    }
}
function ji_PrintStream_check($this) {
    if ($this.$out1 === null)
        $this.$errorState = 1;
    return $this.$errorState ? 0 : 1;
}
function ji_PrintStream_print($this, $s, $begin, $end) {
    var var$4, $src, $destBytes, $dest, var$8, var$9, $encoder, $overflow;
    var$4 = $s.data;
    $src = jn_CharBuffer_wrap($s, $begin, $end - $begin | 0);
    $destBytes = $rt_createByteArray(jl_Math_max(16, jl_Math_min(var$4.length, 1024)));
    $dest = jn_ByteBuffer_wrap0($destBytes);
    var$8 = $this.$charset0.$newEncoder();
    jnc_CodingErrorAction_$callClinit();
    var$9 = jnc_CodingErrorAction_REPLACE;
    var$8 = jnc_CharsetEncoder_onMalformedInput(var$8, var$9);
    var$9 = jnc_CodingErrorAction_REPLACE;
    $encoder = jnc_CharsetEncoder_onUnmappableCharacter(var$8, var$9);
    while (true) {
        $overflow = jnc_CharsetEncoder_encode($encoder, $src, $dest, 1).$isOverflow();
        $this.$write0($destBytes, 0, jn_Buffer_position($dest));
        jn_Buffer_clear($dest);
        if (!$overflow)
            break;
    }
    while (true) {
        $overflow = jnc_CharsetEncoder_flush($encoder, $dest).$isOverflow();
        $this.$write0($destBytes, 0, jn_Buffer_position($dest));
        jn_Buffer_clear($dest);
        if (!$overflow)
            break;
    }
}
function ji_PrintStream_print0($this, $c) {
    $this.$buffer0.data[0] = $c;
    ji_PrintStream_print($this, $this.$buffer0, 0, 1);
}
function ji_PrintStream_print1($this, $s) {
    $this.$sb.$append($s);
    ji_PrintStream_printSB($this);
}
function ji_PrintStream_println($this, $s) {
    $this.$sb.$append($s).$append0(10);
    ji_PrintStream_printSB($this);
}
function ji_PrintStream_println0($this, $s) {
    $this.$sb.$append1($s).$append0(10);
    ji_PrintStream_printSB($this);
}
function ji_PrintStream_println1($this) {
    $this.$print1(10);
}
function ji_PrintStream_printSB($this) {
    var $buffer;
    $buffer = $this.$sb.$length() <= $this.$buffer0.data.length ? $this.$buffer0 : $rt_createCharArray($this.$sb.$length());
    $this.$sb.$getChars(0, $this.$sb.$length(), $buffer, 0);
    ji_PrintStream_print($this, $buffer, 0, $this.$sb.$length());
    $this.$sb.$setLength(0);
}
function oti_AsyncCallback() {
}
function g_GreenfootImage() {
    var a = this; jl_Object.call(a);
    a.$imageFileName = null;
    a.$image0 = null;
    a.$g2d = null;
    a.$currentColor = null;
    a.$currentFont = null;
    a.$copyOnWrite = 0;
    a.$transparency0 = 0;
}
var g_GreenfootImage_DEFAULT_FOREGROUND = null;
function g_GreenfootImage_$callClinit() {
    g_GreenfootImage_$callClinit = $rt_eraseClinit(g_GreenfootImage);
    g_GreenfootImage__clinit_();
}
function g_GreenfootImage__init_2(var_0) {
    var var_1 = new g_GreenfootImage();
    g_GreenfootImage__init_(var_1, var_0);
    return var_1;
}
function g_GreenfootImage__init_0(var_0, var_1) {
    var var_2 = new g_GreenfootImage();
    g_GreenfootImage__init_3(var_2, var_0, var_1);
    return var_2;
}
function g_GreenfootImage__init_4(var_0) {
    var var_1 = new g_GreenfootImage();
    g_GreenfootImage__init_5(var_1, var_0);
    return var_1;
}
function g_GreenfootImage__init_6() {
    var var_0 = new g_GreenfootImage();
    g_GreenfootImage__init_1(var_0);
    return var_0;
}
function g_GreenfootImage__init_($this, $filename) {
    var $gImage, $ile, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$ile = $thread.pop();$gImage = $thread.pop();$filename = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        g_GreenfootImage_$callClinit();
        jl_Object__init_0($this);
        $this.$currentColor = g_GreenfootImage_DEFAULT_FOREGROUND;
        $this.$copyOnWrite = 0;
        $this.$transparency0 = 255;
        $gImage = gu_GreenfootUtil_getCachedImage($filename);
        if ($gImage !== null) {
            $this.$createClone($gImage);
            if (gu_GreenfootUtil_addCachedImage($filename, g_GreenfootImage__init_4($this)))
                $this.$copyOnWrite = 1;
            return;
        }
        try {
            $ptr = 1;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_IllegalArgumentException) {
                $ile = $$je;
            } else {
                throw $$e;
            }
        }
        gu_GreenfootUtil_addCachedImage($filename, null);
        $rt_throw($ile);
    case 1:
        a: {
            try {
                g_GreenfootImage_loadFile($this, $filename);
                if ($rt_suspending()) {
                    break main;
                }
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_IllegalArgumentException) {
                    $ile = $$je;
                    gu_GreenfootUtil_addCachedImage($filename, null);
                    $rt_throw($ile);
                } else {
                    throw $$e;
                }
            }
        }
        if (gu_GreenfootUtil_addCachedImage($filename, g_GreenfootImage__init_4($this)))
            $this.$copyOnWrite = 1;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $filename, $gImage, $ile, $ptr);
}
function g_GreenfootImage__init_3($this, $width, $height) {
    var var$3, var$4, var$5;
    g_GreenfootImage_$callClinit();
    jl_Object__init_0($this);
    $this.$currentColor = g_GreenfootImage_DEFAULT_FOREGROUND;
    $this.$copyOnWrite = 0;
    $this.$transparency0 = 255;
    var$3 = otjdh_HTMLDocument_current();
    var$4 = $rt_s(180);
    $this.$image0 = var$3.createElement($rt_ustr(var$4));
    var$3 = $this.$image0;
    var$4 = $width;
    var$3.width = var$4;
    var$4 = $this.$image0;
    var$5 = $height;
    var$4.height = var$5;
    g_GreenfootImage_setupRenderContext($this);
}
function g_GreenfootImage__init_5($this, $image) {
    var var$2, var$3, $newImage, var$5, var$6;
    g_GreenfootImage_$callClinit();
    jl_Object__init_0($this);
    $this.$currentColor = g_GreenfootImage_DEFAULT_FOREGROUND;
    $this.$copyOnWrite = 0;
    $this.$transparency0 = 255;
    if ($image.$copyOnWrite) {
        $this.$image0 = $image.$image0;
        $this.$copyOnWrite = 1;
    } else {
        var$2 = otjdh_HTMLDocument_current();
        var$3 = $rt_s(180);
        $newImage = var$2.createElement($rt_ustr(var$3));
        var$2 = $image.$getWidth();
        $newImage.width = var$2;
        var$2 = $image.$getHeight();
        $newImage.height = var$2;
        $this.$image0 = $newImage;
        var$2 = $rt_s(181);
        $this.$g2d = $newImage.getContext($rt_ustr(var$2));
        if ($newImage.width > 0 && $newImage.height > 0) {
            var$2 = $this.$g2d;
            var$3 = $image.$image0;
            var$5 = 0.0;
            var$6 = 0.0;
            var$2.drawImage(var$3, var$5, var$6);
        }
        var$2 = $this.$g2d;
        var$5 = 0.5;
        var$6 = 0.5;
        var$2.translate(var$5, var$6);
    }
    g_GreenfootImage_copyStates($image, $this);
}
function g_GreenfootImage_setupRenderContext($this) {
    var var$1, var$2, var$3, var$4;
    var$1 = $this.$image0;
    var$2 = $rt_s(181);
    $this.$g2d = var$1.getContext($rt_ustr(var$2));
    var$2 = $this.$g2d;
    var$3 = 0.5;
    var$4 = 0.5;
    var$2.translate(var$3, var$4);
}
function g_GreenfootImage_getRenderContext($this, $image) {
    var var$2, $g, var$4, var$5;
    var$2 = $rt_s(181);
    $g = $image.getContext($rt_ustr(var$2));
    var$4 = 0.5;
    var$5 = 0.5;
    $g.translate(var$4, var$5);
    return $g;
}
function g_GreenfootImage_toJsColor($this, $c) {
    return jl_StringBuilder__init_().$append($rt_s(182)).$append3($c.$getRed()).$append($rt_s(113)).$append3($c.$getGreen()).$append($rt_s(113)).$append3($c.$getBlue()).$append($rt_s(113)).$append9($c.$getAlpha() / 255.0).$append($rt_s(125)).$toString();
}
function g_GreenfootImage__init_1($this) {
    g_GreenfootImage_$callClinit();
    jl_Object__init_0($this);
    $this.$currentColor = g_GreenfootImage_DEFAULT_FOREGROUND;
    $this.$copyOnWrite = 0;
    $this.$transparency0 = 255;
}
function g_GreenfootImage_getCopyOnWriteClone($this) {
    var $clone;
    $clone = g_GreenfootImage__init_6();
    $clone.$copyOnWrite = 1;
    $clone.$image0 = $this.$image0;
    $clone.$g2d = $this.$g2d;
    g_GreenfootImage_copyStates($this, $clone);
    return $clone;
}
function g_GreenfootImage_createClone($this, $cachedImage) {
    $this.$copyOnWrite = 1;
    $this.$image0 = $cachedImage.$image0;
    $this.$g2d = $cachedImage.$g2d;
    g_GreenfootImage_copyStates($cachedImage, $this);
}
function g_GreenfootImage_copyStates($src, $dst) {
    g_GreenfootImage_$callClinit();
    $dst.$imageFileName = $src.$imageFileName;
    $dst.$currentColor = $src.$currentColor;
    $dst.$currentFont = $src.$currentFont;
    $dst.$transparency0 = $src.$transparency0;
}
function g_GreenfootImage_loadFile($this, $filename) {
    var $document, var$3, $imgElement, $hie, $sync, $success, var$8, $canvas, var$10, var$11, var$12, $url, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$url = $thread.pop();var$12 = $thread.pop();var$11 = $thread.pop();var$10 = $thread.pop();$canvas = $thread.pop();var$8 = $thread.pop();$success = $thread.pop();$sync = $thread.pop();$hie = $thread.pop();$imgElement = $thread.pop();var$3 = $thread.pop();$document = $thread.pop();$filename = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($filename === null)
            $rt_throw(jl_NullPointerException__init_0($rt_s(183)));
        $this.$imageFileName = $filename;
        $document = otjdh_HTMLDocument_current();
        var$3 = $rt_s(184);
        $imgElement = $document.createElement($rt_ustr(var$3));
        if (!$filename.$startsWith($rt_s(185)) && !$filename.$startsWith($rt_s(186))) {
            var$3 = jl_StringBuilder__init_().$append($rt_s(187)).$append($filename).$toString();
            $ptr = 2;
            continue main;
        }
        var$3 = $rt_s(188);
        $imgElement.setAttribute($rt_ustr(var$3), $rt_ustr($filename));
        $hie = $imgElement;
        $sync = jl_Object__init_();
        $success = $rt_createBooleanArray(1);
        otjde_LoadEventTarget_listenLoad$static($hie, g_GreenfootImage$1__init_($this, $sync, $success));
        var$3 = $rt_s(34);
        var$8 = g_GreenfootImage$2__init_($this, $sync, $success);
        $hie.addEventListener($rt_ustr(var$3), otji_JS_function(var$8, "handleEvent"));
        $ptr = 1;
    case 1:
        jl_Object_monitorEnter($sync);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            b: {
                try {
                    try {
                        $ptr = 3;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_InterruptedException) {
                        } else {
                            throw $$e;
                        }
                    }
                    jl_Object_monitorExit($sync);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$3 = $$je;
                    break b;

                }
            }
            jl_Object_monitorExit($sync);
            $rt_throw(var$3);
        }
        if (!$success.data[0])
            $rt_throw(jl_IllegalArgumentException__init_0());
        var$8 = $rt_s(180);
        $canvas = $document.createElement($rt_ustr(var$8));
        var$3 = $hie.width;
        $canvas.width = var$3;
        var$3 = $hie.height;
        $canvas.height = var$3;
        $this.$image0 = $canvas;
        g_GreenfootImage_setupRenderContext($this);
        if ($hie.width > 0 && $hie.height > 0) {
            var$10 = $this.$g2d;
            var$11 = (-0.5);
            var$12 = (-0.5);
            var$10.drawImage($hie, var$11, var$12);
        }
        return;
    case 2:
        $tmp = gj_Client_getCachedResourceURL(var$3);
        if ($rt_suspending()) {
            break main;
        }
        $url = $tmp;
        if ($url === null) {
            $ptr = 4;
            continue main;
        }
        if ($url !== null)
            $filename = $url;
        var$3 = $rt_s(188);
        $imgElement.setAttribute($rt_ustr(var$3), $rt_ustr($filename));
        $hie = $imgElement;
        $sync = jl_Object__init_();
        $success = $rt_createBooleanArray(1);
        otjde_LoadEventTarget_listenLoad$static($hie, g_GreenfootImage$1__init_($this, $sync, $success));
        var$3 = $rt_s(34);
        var$8 = g_GreenfootImage$2__init_($this, $sync, $success);
        $hie.addEventListener($rt_ustr(var$3), otji_JS_function(var$8, "handleEvent"));
        $ptr = 1;
        continue main;
    case 3:
        a: {
            b: {
                c: {
                    try {
                        jl_Object_wait1($sync);
                        if ($rt_suspending()) {
                            break main;
                        }
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_InterruptedException) {
                            try {
                                break c;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$3 = $$je;
                                break b;

                            }
                        } else{
                            var$3 = $$je;
                            break b;
                        }
                    }
                }
                try {
                    jl_Object_monitorExit($sync);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$3 = $$je;
                    break b;

                }
            }
            jl_Object_monitorExit($sync);
            $rt_throw(var$3);
        }
        if (!$success.data[0])
            $rt_throw(jl_IllegalArgumentException__init_0());
        var$8 = $rt_s(180);
        $canvas = $document.createElement($rt_ustr(var$8));
        var$3 = $hie.width;
        $canvas.width = var$3;
        var$3 = $hie.height;
        $canvas.height = var$3;
        $this.$image0 = $canvas;
        g_GreenfootImage_setupRenderContext($this);
        if ($hie.width > 0 && $hie.height > 0) {
            var$10 = $this.$g2d;
            var$11 = (-0.5);
            var$12 = (-0.5);
            var$10.drawImage($hie, var$11, var$12);
        }
        return;
    case 4:
        $tmp = gj_Client_getCachedResourceURL($filename);
        if ($rt_suspending()) {
            break main;
        }
        $url = $tmp;
        if ($url !== null)
            $filename = $url;
        var$3 = $rt_s(188);
        $imgElement.setAttribute($rt_ustr(var$3), $rt_ustr($filename));
        $hie = $imgElement;
        $sync = jl_Object__init_();
        $success = $rt_createBooleanArray(1);
        otjde_LoadEventTarget_listenLoad$static($hie, g_GreenfootImage$1__init_($this, $sync, $success));
        var$3 = $rt_s(34);
        var$8 = g_GreenfootImage$2__init_($this, $sync, $success);
        $hie.addEventListener($rt_ustr(var$3), otji_JS_function(var$8, "handleEvent"));
        $ptr = 1;
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $filename, $document, var$3, $imgElement, $hie, $sync, $success, var$8, $canvas, var$10, var$11, var$12, $url, $ptr);
}
function g_GreenfootImage_drawToCanvas($this, $g2d, $x, $y) {
    var var$4;
    if ($this.$image0.width && $this.$image0.height) {
        var$4 = $this.$image0;
        $g2d.drawImage(var$4, $x, $y);
    }
}
function g_GreenfootImage_getWidth($this) {
    return $this.$image0.width;
}
function g_GreenfootImage_getHeight($this) {
    return $this.$image0.height;
}
function g_GreenfootImage_scale($this, $width, $height) {
    var $doc, var$4, $scaled, var$6, $g, var$8, var$9, var$10, var$11;
    if ($width == $this.$image0.width && $height == $this.$image0.height)
        return;
    $doc = otjdh_HTMLDocument_current();
    var$4 = $rt_s(180);
    $scaled = $doc.createElement($rt_ustr(var$4));
    var$4 = $width;
    $scaled.width = var$4;
    var$4 = $height;
    $scaled.height = var$4;
    var$6 = $rt_s(181);
    $g = $scaled.getContext($rt_ustr(var$6));
    var$4 = $this.$image0;
    var$8 = 0.0;
    var$9 = 0.0;
    var$10 = $width;
    var$11 = $height;
    $g.drawImage(var$4, var$8, var$9, var$10, var$11);
    var$9 = 0.5;
    var$8 = 0.5;
    $g.translate(var$9, var$8);
    $this.$image0 = $scaled;
    $this.$g2d = $g;
    $this.$copyOnWrite = 0;
}
function g_GreenfootImage_fill($this) {
    $this.$fillRect(0, 0, $this.$image0.width + 1 | 0, $this.$image0.height + 1 | 0);
}
function g_GreenfootImage_drawImage($this, $image, $x, $y) {
    if ($image.$getHeight() && $image.$getWidth()) {
        g_GreenfootImage_ensureWritableImage($this);
        $image.$drawToCanvas($this.$g2d, $x - 0.5, $y - 0.5);
    }
}
function g_GreenfootImage_setFont($this, $f) {
    $this.$currentFont = $f;
}
function g_GreenfootImage_getFont($this) {
    if ($this.$currentFont === null)
        $this.$currentFont = g_Font__init_0($rt_s(189), 12);
    return $this.$currentFont;
}
function g_GreenfootImage_setColor($this, $color) {
    $this.$currentColor = $color;
}
function g_GreenfootImage_setTransparency($this, $t) {
    if ($t >= 0 && $t <= 255) {
        $this.$transparency0 = $t;
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_(jl_StringBuilder__init_().$append($rt_s(190)).$append3($t).$toString()));
}
function g_GreenfootImage_getTransparency($this) {
    return $this.$transparency0;
}
function g_GreenfootImage_fillRect($this, $x, $y, $width, $height) {
    var var$5, var$6, var$7, var$8, var$9, var$10;
    g_GreenfootImage_ensureWritableImage($this);
    var$5 = $this.$g2d;
    var$6 = $rt_ustr(g_GreenfootImage_toJsColor($this, $this.$currentColor));
    var$5.fillStyle = var$6;
    var$6 = $this.$g2d;
    var$7 = $x - 0.5;
    var$8 = $y - 0.5;
    var$9 = $width;
    var$10 = $height;
    var$6.fillRect(var$7, var$8, var$9, var$10);
}
function g_GreenfootImage_drawString($this, $string, $x, $y) {
    var $currentF, var$5, var$6, $lines, $numLines, var$9, var$10, $fontHeight, $i, var$13, var$14;
    g_GreenfootImage_ensureWritableImage($this);
    $currentF = $this.$getFont();
    var$5 = $this.$g2d;
    var$6 = $rt_ustr(jl_StringBuilder__init_().$append3($currentF.$getSize()).$append($rt_s(191)).$append($currentF.$getName()).$toString());
    var$5.font = var$6;
    var$5 = $this.$g2d;
    var$6 = $rt_ustr(g_GreenfootImage_toJsColor($this, $this.$currentColor));
    var$5.fillStyle = var$6;
    var$5 = $this.$g2d;
    var$6 = "alphabetic";
    var$5.textBaseline = var$6;
    var$5 = $this.$g2d;
    var$6 = "left";
    var$5.textAlign = var$6;
    $lines = gu_GreenfootUtil_getLines($string);
    $numLines = $lines.$size();
    if ($numLines == 1) {
        var$6 = $this.$g2d;
        var$9 = $x;
        var$10 = $y;
        var$6.fillText($rt_ustr($string), var$9, var$10);
    } else if ($numLines > 1) {
        $fontHeight = gu_GraphicsUtilities_getFontHeightPx($currentF.$getName(), jl_StringBuilder__init_().$append3($currentF.$getSize()).$append($rt_s(192)).$toString());
        $i = 0;
        while ($i < $numLines) {
            var$13 = $this.$g2d;
            var$14 = $lines.$get0($i);
            var$10 = $x;
            var$9 = $y + $rt_imul($fontHeight, $i) | 0;
            var$13.fillText($rt_ustr(var$14), var$10, var$9);
            $i = $i + 1 | 0;
        }
    }
}
function g_GreenfootImage_ensureWritableImage($this) {
    var var$1, var$2, $newImage, $g, var$5, var$6, var$7;
    if ($this.$copyOnWrite) {
        var$1 = otjdh_HTMLDocument_current();
        var$2 = $rt_s(180);
        $newImage = var$1.createElement($rt_ustr(var$2));
        var$2 = $this.$image0.width;
        $newImage.width = var$2;
        var$1 = $this.$image0.height;
        $newImage.height = var$1;
        $g = g_GreenfootImage_getRenderContext($this, $newImage);
        var$5 = $this.$image0;
        var$6 = 0.0;
        var$7 = 0.0;
        $g.drawImage(var$5, var$6, var$7);
        $this.$image0 = $newImage;
        $this.$g2d = $g;
        $this.$copyOnWrite = 0;
    }
}
function g_GreenfootImage__clinit_() {
    g_Color_$callClinit();
    g_GreenfootImage_DEFAULT_FOREGROUND = g_Color_BLACK;
}
function ju_AbstractMap() {
    jl_Object.call(this);
    this.$cachedKeySet = null;
}
function ju_AbstractMap__init_() {
    var var_0 = new ju_AbstractMap();
    ju_AbstractMap__init_0(var_0);
    return var_0;
}
function ju_AbstractMap__init_0($this) {
    jl_Object__init_0($this);
}
function jlr_AnnotatedElement() {
}
function jl_Class() {
    var a = this; jl_Object.call(a);
    a.$name2 = null;
    a.$platformClass = null;
}
function jl_Class__init_(var_0) {
    var var_1 = new jl_Class();
    jl_Class__init_0(var_1, var_0);
    return var_1;
}
function jl_Class__init_0($this, $platformClass) {
    var var$2;
    jl_Object__init_0($this);
    $this.$platformClass = $platformClass;
    var$2 = $this;
    $platformClass.classObject = var$2;
}
function jl_Class_getClass($cls) {
    var $result;
    if ($cls === null)
        return null;
    $result = $cls.classObject;
    if ($result === null)
        $result = jl_Class__init_($cls);
    return $result;
}
function jl_Class_getPlatformClass($this) {
    return $this.$platformClass;
}
function jl_Class_isInstance($this, $obj) {
    return otp_Platform_isInstance($obj, $this.$platformClass);
}
function jl_Class_getName($this) {
    if ($this.$name2 === null)
        $this.$name2 = otp_Platform_getName($this.$platformClass);
    return $this.$name2;
}
function jl_Class_isPrimitive($this) {
    return otp_Platform_isPrimitive($this.$platformClass);
}
function jl_Class_getComponentType($this) {
    return jl_Class_getClass(otp_Platform_getArrayItem($this.$platformClass));
}
function jl_Class_getSuperclass($this) {
    return jl_Class_getClass($this.$platformClass.$meta.superclass);
}
function jl_Class_forName($name) {
    var $cls, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$cls = $thread.pop();$name = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $cls = otp_Platform_lookupClass($name.$toString());
        if ($cls !== null)
            return jl_Class_getClass($cls);
        $rt_throw(jl_ClassNotFoundException__init_0());
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($name, $cls, $ptr);
}
function jl_Class_newInstance($this) {
    var var$1, $instance, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$instance = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = $this.$platformClass;
        $ptr = 1;
    case 1:
        $tmp = otp_Platform_newInstance(var$1);
        if ($rt_suspending()) {
            break main;
        }
        $instance = $tmp;
        if ($instance !== null)
            return $instance;
        $rt_throw(jl_InstantiationException__init_());
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $instance, $ptr);
}
function ju_Comparator() {
}
function gc_ImageCache$CachedImageRef() {
    var a = this; jl_Object.call(a);
    a.$imgName = null;
    a.$image1 = null;
    a.$this$05 = null;
}
function gc_ImageCache$CachedImageRef__init_(var_0, var_1, var_2) {
    var var_3 = new gc_ImageCache$CachedImageRef();
    gc_ImageCache$CachedImageRef__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function gc_ImageCache$CachedImageRef__init_0($this, var$1, $imgName, $image) {
    $this.$this$05 = var$1;
    jl_Object__init_0($this);
    $this.$imgName = $imgName;
    $this.$image1 = $image;
}
function gc_ImageCache$CachedImageRef_get($this) {
    return $this.$image1;
}
function HighlightEnabler() {
    var a = this; Button.call(a);
    a.$city2 = null;
    a.$imageOn = null;
    a.$imageOff = null;
}
function HighlightEnabler__init_0(var_0) {
    var var_1 = new HighlightEnabler();
    HighlightEnabler__init_(var_1, var_0);
    return var_1;
}
function HighlightEnabler__init_($this, $city) {
    var var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$city = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Button__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$city2 = $city;
        var$2 = new g_GreenfootImage;
        var$3 = $rt_s(193);
        $ptr = 2;
    case 2:
        g_GreenfootImage__init_(var$2, var$3);
        if ($rt_suspending()) {
            break main;
        }
        $this.$imageOn = var$2;
        var$3 = new g_GreenfootImage;
        var$2 = $rt_s(194);
        $ptr = 3;
    case 3:
        g_GreenfootImage__init_(var$3, var$2);
        if ($rt_suspending()) {
            break main;
        }
        $this.$imageOff = var$3;
        $this.$setImage($this.$imageOn);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $city, var$2, var$3, $ptr);
}
function HighlightEnabler_act($this) {
    if (g_Greenfoot_mousePressed($this)) {
        SoundManager_playSound($rt_s(17), 100);
        $this.$city2.$toggleHighlights();
        if ($this.$city2.$highlightsEnabled())
            $this.$setImage($this.$imageOn);
        else
            $this.$setImage($this.$imageOff);
    }
}
function ju_Arrays() {
    jl_Object.call(this);
}
function ju_Arrays__init_0() {
    var var_0 = new ju_Arrays();
    ju_Arrays__init_(var_0);
    return var_0;
}
function ju_Arrays__init_($this) {
    jl_Object__init_0($this);
}
function ju_Arrays_copyOf($array, $length) {
    var var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createCharArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
}
function ju_Arrays_copyOf0($array, $length) {
    var var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createByteArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
}
function ju_Arrays_copyOf1($original, $newLength) {
    var var$3, $result, $sz, $i;
    var$3 = $original.data;
    $result = jlr_Array_newInstance(jl_Object_getClass($original).$getComponentType(), $newLength);
    $sz = jl_Math_min($newLength, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
}
function ju_Arrays_fill($a, $fromIndex, $toIndex, $val) {
    var var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_0());
    while ($fromIndex < $toIndex) {
        var$5 = $a.data;
        var$6 = $fromIndex + 1 | 0;
        var$5[$fromIndex] = $val;
        $fromIndex = var$6;
    }
}
function ju_Arrays_fill0($a, $val) {
    var var$3;
    var$3 = $a.data;
    ju_Arrays_fill($a, 0, var$3.length, $val);
}
function ju_Arrays_binarySearch($a, $key) {
    return ju_Arrays_binarySearch0($a, 0, $a.data.length, $key);
}
function ju_Arrays_binarySearch0($a, $fromIndex, $toIndex, $key) {
    var $u, var$6, $i, $e;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_0());
    $u = $toIndex - 1 | 0;
    while (true) {
        var$6 = $a.data;
        $i = ($fromIndex + $u | 0) / 2 | 0;
        $e = var$6[$i];
        if ($e == $key)
            break;
        if ($key >= $e) {
            $fromIndex = $i + 1 | 0;
            if ($fromIndex > $u)
                return  -$i - 2 | 0;
        } else {
            $u = $i - 1 | 0;
            if ($u < $fromIndex)
                return  -$i - 1 | 0;
        }
    }
    return $i;
}
function gci_BSPNodeCache() {
    jl_Object.call(this);
}
var gci_BSPNodeCache_cache = null;
var gci_BSPNodeCache_tail = 0;
var gci_BSPNodeCache_size = 0;
function gci_BSPNodeCache_$callClinit() {
    gci_BSPNodeCache_$callClinit = $rt_eraseClinit(gci_BSPNodeCache);
    gci_BSPNodeCache__clinit_();
}
function gci_BSPNodeCache__init_0() {
    var var_0 = new gci_BSPNodeCache();
    gci_BSPNodeCache__init_(var_0);
    return var_0;
}
function gci_BSPNodeCache__init_($this) {
    gci_BSPNodeCache_$callClinit();
    jl_Object__init_0($this);
}
function gci_BSPNodeCache_getBSPNode() {
    var $ppos, $node;
    gci_BSPNodeCache_$callClinit();
    if (!gci_BSPNodeCache_size)
        return gci_BSPNode__init_(gci_Rect__init_(0, 0, 0, 0), 0, 0);
    $ppos = gci_BSPNodeCache_tail - gci_BSPNodeCache_size | 0;
    if ($ppos < 0)
        $ppos = $ppos + 1000 | 0;
    $node = gci_BSPNodeCache_cache.data[$ppos];
    gci_BSPNode_setParent($node, null);
    gci_BSPNodeCache_size = gci_BSPNodeCache_size - 1 | 0;
    return $node;
}
function gci_BSPNodeCache_returnNode($node) {
    var var$2, var$3;
    gci_BSPNodeCache_$callClinit();
    gci_BSPNode_blankNode($node);
    var$2 = gci_BSPNodeCache_cache.data;
    var$3 = gci_BSPNodeCache_tail;
    gci_BSPNodeCache_tail = var$3 + 1 | 0;
    var$2[var$3] = $node;
    if (gci_BSPNodeCache_tail == 1000)
        gci_BSPNodeCache_tail = 0;
    gci_BSPNodeCache_size = jl_Math_min(gci_BSPNodeCache_size + 1 | 0, 1000);
    if (gci_BSPNode_getLeft($node) === null && gci_BSPNode_getRight($node) === null)
        return;
    $rt_throw(jl_RuntimeException__init_($rt_s(195)));
}
function gci_BSPNodeCache__clinit_() {
    gci_BSPNodeCache_cache = $rt_createArray(gci_BSPNode, 1000);
    gci_BSPNodeCache_tail = 0;
    gci_BSPNodeCache_size = 0;
}
function gj_MouseManager() {
    var a = this; jl_Object.call(a);
    a.$currentData = null;
    a.$futureData = null;
    a.$potentialNewDragData = null;
    a.$locator = null;
    a.$dragStartData = null;
    a.$isDragging = 0;
    a.$gotNewEvent = 0;
    a.$button1state = 0;
    a.$documentListener = null;
    a.$touchId = 0;
    a.$trackingTouch = 0;
}
function gj_MouseManager__init_(var_0) {
    var var_1 = new gj_MouseManager();
    gj_MouseManager__init_0(var_1, var_0);
    return var_1;
}
function gj_MouseManager__init_0($this, $locator) {
    jl_Object__init_0($this);
    $this.$currentData = ggim_MouseEventData__init_0();
    $this.$futureData = ggim_MouseEventData__init_0();
    $this.$potentialNewDragData = ggim_MouseEventData__init_0();
    $this.$dragStartData = ggim_MouseEventData__init_0();
    $this.$button1state = 0;
    $this.$documentListener = gj_MouseManager$1__init_($this);
    $this.$trackingTouch = 0;
    $this.$locator = $locator;
}
function gj_MouseManager_newActStarted($this) {
    var $newData;
    jl_Object_monitorEnterSync($this);
    try {
        if (!$this.$gotNewEvent)
            $this.$currentData.$init();
        else {
            $newData = ggim_MouseEventData__init_0();
            $this.$currentData = $this.$futureData;
            $this.$futureData = $newData;
            $this.$potentialNewDragData = ggim_MouseEventData__init_0();
            $this.$gotNewEvent = 0;
        }
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
function gj_MouseManager_registerEventRecieved($this) {
    $this.$gotNewEvent = 1;
}
function gj_MouseManager_isMousePressed($this, $obj) {
    return $this.$currentData.$isMousePressed($obj);
}
function gj_MouseManager_isMouseClicked($this, $obj) {
    return $this.$currentData.$isMouseClicked($obj);
}
function gj_MouseManager_isMouseDragged($this, $obj) {
    return $this.$currentData.$isMouseDragged($obj);
}
function gj_MouseManager_getMouseInfo($this) {
    return $this.$currentData.$getMouseInfo();
}
function gj_MouseManager_handleEvent($this, $e) {
    var $etype, var$3;
    $etype = $rt_str($e.type);
    $e.stopPropagation();
    $e.preventDefault();
    var$3 = jl_Thread__init_3(gj_MouseManager$handleEvent$lambda$_10_0__init_($this, $etype, $e));
    var$3.$start();
}
function gj_MouseManager_handleTouchEvent($this, $e) {
    var $etype, var$3;
    $etype = $rt_str($e.type);
    $e.stopPropagation();
    $e.preventDefault();
    var$3 = jl_Thread__init_3(gj_MouseManager$handleTouchEvent$lambda$_11_0__init_($this, $etype, $e));
    var$3.$start();
}
function gj_MouseManager_findTouch($this, $list, $touchId) {
    var $i, $touch;
    $i = 0;
    while (true) {
        $touch = $list.item($i);
        if ($touch === null)
            return null;
        if ($touch.identifier == $touchId)
            break;
        $i = $i + 1 | 0;
    }
    return $touch;
}
function gj_MouseManager_mouseClicked($this, $x, $y, $button, $clickCount) {
    var $actor, $mouseData, var$7, var$8, var$9, $$je;
    $actor = $this.$locator.$getTopMostActorAt($x, $y);
    jl_Object_monitorEnterSync($this);
    a: {
        b: {
            c: {
                try {
                    $mouseData = $this.$futureData;
                    if ($this.$futureData.$isMouseDragEnded(null))
                        break c;
                    break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$7 = $$je;
                    break a;

                }
            }
            try {
                $mouseData = $this.$potentialNewDragData;
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$7 = $$je;
                break a;

            }
        }
        d: {
            try {
                if (ggim_PriorityManager_isHigherPriority($rt_s(196), $mouseData))
                    break d;
                jl_Object_monitorExitSync($this);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$7 = $$je;
                break a;

            }
            return;
        }
        try {
            gj_MouseManager_registerEventRecieved($this);
            var$8 = $this.$locator.$getTranslatedX($x);
            var$9 = $this.$locator.$getTranslatedY($y);
            $mouseData.$mouseClicked0(var$8, var$9, $button, $clickCount, $actor);
            $this.$isDragging = 0;
            jl_Object_monitorExitSync($this);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$7 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($this);
    $rt_throw(var$7);
}
function gj_MouseManager_mouseExited($this) {
    var var$1, $$je;
    jl_Object_monitorEnterSync($this);
    a: {
        try {
            $this.$futureData.$mouseExited();
            jl_Object_monitorExitSync($this);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$1 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($this);
    $rt_throw(var$1);
}
function gj_MouseManager_mousePressed($this, $px, $py, $button) {
    var $actor, $mouseData, var$6, $x, $y, $$je;
    $actor = $this.$locator.$getTopMostActorAt($px, $py);
    jl_Object_monitorEnterSync($this);
    a: {
        b: {
            c: {
                try {
                    $mouseData = $this.$futureData;
                    if ($this.$futureData.$isMouseDragEnded(null))
                        break c;
                    break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$6 = $$je;
                    break a;

                }
            }
            try {
                $mouseData = $this.$potentialNewDragData;
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$6 = $$je;
                break a;

            }
        }
        d: {
            try {
                $this.$dragStartData = ggim_MouseEventData__init_0();
                $x = $this.$locator.$getTranslatedX($px);
                $y = $this.$locator.$getTranslatedY($py);
                $this.$dragStartData.$mousePressed0($x, $y, $button, $actor);
                if (ggim_PriorityManager_isHigherPriority($rt_s(197), $mouseData))
                    break d;
                jl_Object_monitorExitSync($this);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$6 = $$je;
                break a;

            }
            return;
        }
        try {
            gj_MouseManager_registerEventRecieved($this);
            $mouseData.$mousePressed0($x, $y, $button, $actor);
            $this.$isDragging = 0;
            jl_Object_monitorExitSync($this);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$6 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($this);
    $rt_throw(var$6);
}
function gj_MouseManager_mouseReleased($this, $px, $py, $button) {
    var $clickActor, var$5, $x, $y, $actor, $$je;
    $clickActor = $this.$locator.$getTopMostActorAt($px, $py);
    jl_Object_monitorEnterSync($this);
    a: {
        b: {
            try {
                if (!$this.$isDragging)
                    break b;
                if ($this.$futureData.$isMouseDragEnded(null))
                    $this.$futureData = $this.$potentialNewDragData;
                c: {
                    try {
                        if (ggim_PriorityManager_isHigherPriority($rt_s(198), $this.$futureData))
                            break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$5 = $$je;
                        break a;

                    }
                    jl_Object_monitorExitSync($this);
                    return;
                }
                gj_MouseManager_registerEventRecieved($this);
                $x = $this.$locator.$getTranslatedX($px);
                $y = $this.$locator.$getTranslatedY($py);
                $this.$futureData.$mouseClicked0($x, $y, $button, 1, $clickActor);
                $actor = $this.$dragStartData.$getActor();
                $this.$futureData.$mouseDragEnded($x, $y, $button, $actor);
                $this.$isDragging = 0;
                $this.$potentialNewDragData = ggim_MouseEventData__init_0();
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$5 = $$je;
                break a;

            }
        }
        try {
            jl_Object_monitorExitSync($this);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$5 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($this);
    $rt_throw(var$5);
}
function gj_MouseManager_mouseDragged($this, $px, $py, $buttons) {
    var var$4, $x, $y, $$je;
    jl_Object_monitorEnterSync($this);
    a: {
        b: {
            try {
                $this.$isDragging = 1;
                if (ggim_PriorityManager_isHigherPriority($rt_s(199), $this.$futureData))
                    break b;
                jl_Object_monitorExitSync($this);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$4 = $$je;
                break a;

            }
            return;
        }
        try {
            gj_MouseManager_registerEventRecieved($this);
            $x = $this.$locator.$getTranslatedX($px);
            $y = $this.$locator.$getTranslatedY($py);
            $this.$futureData.$mouseDragged($x, $y, $this.$dragStartData.$getButton(), $this.$dragStartData.$getActor());
            jl_Object_monitorExitSync($this);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($this);
    $rt_throw(var$4);
}
function gj_MouseManager_mouseMoved($this, $px, $py) {
    var $actor, var$4, $x, $y, $$je;
    $actor = $this.$locator.$getTopMostActorAt($px, $py);
    jl_Object_monitorEnterSync($this);
    a: {
        b: {
            try {
                if (ggim_PriorityManager_isHigherPriority($rt_s(200), $this.$futureData))
                    break b;
                jl_Object_monitorExitSync($this);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$4 = $$je;
                break a;

            }
            return;
        }
        try {
            gj_MouseManager_registerEventRecieved($this);
            $x = $this.$locator.$getTranslatedX($px);
            $y = $this.$locator.$getTranslatedY($py);
            $this.$futureData.$mouseMoved($x, $y, 0, $actor);
            $this.$isDragging = 0;
            jl_Object_monitorExitSync($this);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($this);
    $rt_throw(var$4);
}
function gj_MouseManager_handleEvent0($this, var$1) {
    $this.$handleEvent1(var$1);
}
function gj_MouseManager_lambda$handleTouchEvent$1($this, $etype, $e) {
    var var$3, $touch, var$5;
    a: {
        var$3 = (-1);
        switch ($etype.$hashCode()) {
            case -1578593149:
                if (!$etype.$equals($rt_s(201)))
                    break a;
                var$3 = 0;
                break a;
            case -819532484:
                if (!$etype.$equals($rt_s(202)))
                    break a;
                var$3 = 1;
                break a;
            case 364536720:
                if (!$etype.$equals($rt_s(203)))
                    break a;
                var$3 = 3;
                break a;
            case 2127979129:
                if (!$etype.$equals($rt_s(204)))
                    break a;
                var$3 = 2;
                break a;
            default:
        }
    }
    b: {
        c: {
            d: {
                switch (var$3) {
                    case 0:
                        break d;
                    case 1:
                    case 2:
                        break c;
                    case 3:
                        break;
                    default:
                        break b;
                }
                if (!$this.$trackingTouch)
                    break b;
                $touch = gj_MouseManager_findTouch($this, $e.changedTouches, $this.$touchId);
                if ($touch !== null)
                    gj_MouseManager_mouseDragged($this, $touch.clientX, $touch.clientY, 1);
                break b;
            }
            if ($this.$trackingTouch)
                break b;
            var$5 = $e.changedTouches;
            var$3 = 0;
            $touch = var$5.item(var$3);
            $this.$touchId = $touch.identifier;
            gj_MouseManager_mousePressed($this, $touch.clientX, $touch.clientY, 1);
            $this.$button1state = 1;
            $this.$trackingTouch = 1;
            break b;
        }
        if ($this.$trackingTouch) {
            $touch = gj_MouseManager_findTouch($this, $e.changedTouches, $this.$touchId);
            if ($touch !== null) {
                gj_MouseManager_mouseReleased($this, $touch.clientX, $touch.clientY, 1);
                $this.$button1state = 0;
                if ($etype.$equals($rt_s(202)))
                    gj_MouseManager_mouseClicked($this, $touch.clientX, $touch.clientY, 1, 1);
                $this.$trackingTouch = 0;
            }
        }
    }
}
function gj_MouseManager_lambda$handleEvent$0($this, $etype, $e) {
    var var$3, var$4, var$5, var$6;
    a: {
        var$3 = (-1);
        switch ($etype.$hashCode()) {
            case -1844879718:
                if (!$etype.$equals($rt_s(205)))
                    break a;
                var$3 = 5;
                break a;
            case 94750088:
                if (!$etype.$equals($rt_s(196)))
                    break a;
                var$3 = 4;
                break a;
            case 586843847:
                if (!$etype.$equals($rt_s(197)))
                    break a;
                var$3 = 3;
                break a;
            case 587111926:
                if (!$etype.$equals($rt_s(200)))
                    break a;
                var$3 = 6;
                break a;
            case 1013180755:
                if (!$etype.$equals($rt_s(206)))
                    break a;
                var$3 = 0;
                break a;
            case 1019359538:
                if (!$etype.$equals($rt_s(207)))
                    break a;
                var$3 = 1;
                break a;
            case 1243067904:
                if (!$etype.$equals($rt_s(198)))
                    break a;
                var$3 = 2;
                break a;
            default:
        }
    }
    b: {
        c: {
            d: {
                switch (var$3) {
                    case 0:
                        break;
                    case 1:
                        gj_MouseManager_mouseExited($this);
                        break b;
                    case 2:
                        break c;
                    case 3:
                        break d;
                    case 4:
                        if ($e.button == 2)
                            break b;
                        gj_MouseManager_mouseClicked($this, $e.clientX, $e.clientY, ($e.button + 1 | 0) << 16 >> 16, 1);
                        break b;
                    case 5:
                        gj_MouseManager_mouseClicked($this, $e.clientX, $e.clientY, ($e.button + 1 | 0) << 16 >> 16, 2);
                        break b;
                    case 6:
                        if (!$this.$button1state) {
                            gj_MouseManager_mouseMoved($this, $e.clientX, $e.clientY);
                            break b;
                        }
                        gj_MouseManager_mouseDragged($this, $e.clientX, $e.clientY, 1);
                        break b;
                    default:
                        break b;
                }
                break b;
            }
            gj_MouseManager_mousePressed($this, $e.clientX, $e.clientY, ($e.button + 1 | 0) << 16 >> 16);
            if ($e.button)
                break b;
            var$4 = otjdh_HTMLDocument_current();
            var$5 = $rt_s(200);
            var$6 = $this.$documentListener;
            var$4.addEventListener($rt_ustr(var$5), otji_JS_function(var$6, "handleEvent"));
            var$4 = otjdh_HTMLDocument_current();
            var$5 = $rt_s(198);
            var$6 = $this.$documentListener;
            var$4.addEventListener($rt_ustr(var$5), otji_JS_function(var$6, "handleEvent"));
            $this.$button1state = 1;
            break b;
        }
        gj_MouseManager_mouseReleased($this, $e.clientX, $e.clientY, ($e.button + 1 | 0) << 16 >> 16);
        if (!$e.button) {
            var$4 = otjdh_HTMLDocument_current();
            var$5 = $rt_s(200);
            var$6 = $this.$documentListener;
            var$4.removeEventListener($rt_ustr(var$5), otji_JS_function(var$6, "handleEvent"));
            var$4 = otjdh_HTMLDocument_current();
            var$5 = $rt_s(198);
            var$6 = $this.$documentListener;
            var$4.removeEventListener($rt_ustr(var$5), otji_JS_function(var$6, "handleEvent"));
            $this.$button1state = 0;
        } else if ($e.button == 2)
            gj_MouseManager_mouseClicked($this, $e.clientX, $e.clientY, 3, 1);
    }
}
function gj_MouseManager_access$000($x0, $x1, $x2, $x3) {
    gj_MouseManager_mouseDragged($x0, $x1, $x2, $x3);
}
function gj_MouseManager_access$102($x0, $x1) {
    $x0.$button1state = $x1;
    return $x1;
}
function gj_MouseManager_access$200($x0, $x1, $x2, $x3) {
    gj_MouseManager_mouseReleased($x0, $x1, $x2, $x3);
}
function gj_MouseManager_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function ggim_WorldLocator() {
}
function gc_WorldHandler$1() {
    jl_Object.call(this);
    this.$this$06 = null;
}
function gc_WorldHandler$1__init_(var_0) {
    var var_1 = new gc_WorldHandler$1();
    gc_WorldHandler$1__init_0(var_1, var_0);
    return var_1;
}
function gc_WorldHandler$1__init_0($this, $this$0) {
    $this.$this$06 = $this$0;
    jl_Object__init_0($this);
}
function gc_WorldHandler$1_handleEvent($this, $ev) {
    $ev.preventDefault();
}
function gc_WorldHandler$1_handleEvent0($this, var$1) {
    $this.$handleEvent1(var$1);
}
function gc_WorldHandler$1_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function jl_ConsoleOutputStreamStdout() {
    ji_OutputStream.call(this);
}
function jl_ConsoleOutputStreamStdout__init_0() {
    var var_0 = new jl_ConsoleOutputStreamStdout();
    jl_ConsoleOutputStreamStdout__init_(var_0);
    return var_0;
}
function jl_ConsoleOutputStreamStdout__init_($this) {
    ji_OutputStream__init_0($this);
}
function jl_ConsoleOutputStreamStdout_write($this, $b) {
    $rt_putStdout($b);
}
function jl_System() {
    jl_Object.call(this);
}
var jl_System_outCache = null;
var jl_System_errCache = null;
function jl_System__init_0() {
    var var_0 = new jl_System();
    jl_System__init_(var_0);
    return var_0;
}
function jl_System__init_($this) {
    jl_Object__init_0($this);
}
function jl_System_out() {
    if (jl_System_outCache === null)
        jl_System_outCache = ji_PrintStream__init_(jl_ConsoleOutputStreamStdout__init_0(), 0);
    return jl_System_outCache;
}
function jl_System_err() {
    if (jl_System_errCache === null)
        jl_System_errCache = ji_PrintStream__init_(jl_ConsoleOutputStreamStderr__init_0(), 0);
    return jl_System_errCache;
}
function jl_System_arraycopy($src, $srcPos, $dest, $destPos, $length) {
    var var$6, $srcType, $targetType, $srcArray, $i, var$11, var$12, $elem;
    if ($src !== null && $dest !== null) {
        if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src)) {
            var$6 = $destPos + $length | 0;
            if (var$6 <= jlr_Array_getLength($dest)) {
                a: {
                    b: {
                        if ($src !== $dest) {
                            $srcType = jl_Object_getClass($src).$getComponentType();
                            $targetType = jl_Object_getClass($dest).$getComponentType();
                            if ($srcType !== null && $targetType !== null) {
                                if ($srcType === $targetType)
                                    break b;
                                if (!$srcType.$isPrimitive0() && !$targetType.$isPrimitive0()) {
                                    $srcArray = $src;
                                    $i = 0;
                                    var$6 = $srcPos;
                                    while ($i < $length) {
                                        var$11 = $srcArray.data;
                                        var$12 = var$6 + 1 | 0;
                                        $elem = var$11[var$6];
                                        if (!$targetType.$isInstance($elem)) {
                                            jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $i);
                                            $rt_throw(jl_ArrayStoreException__init_());
                                        }
                                        $i = $i + 1 | 0;
                                        var$6 = var$12;
                                    }
                                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                                    return;
                                }
                                if (!$srcType.$isPrimitive0())
                                    break a;
                                if ($targetType.$isPrimitive0())
                                    break b;
                                else
                                    break a;
                            }
                            $rt_throw(jl_ArrayStoreException__init_());
                        }
                    }
                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                    return;
                }
                $rt_throw(jl_ArrayStoreException__init_());
            }
        }
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    }
    $rt_throw(jl_NullPointerException__init_0($rt_s(208)));
}
function jl_System_doArrayCopy(var$1, var$2, var$3, var$4, var$5) {
    if (var$1 !== var$3 || var$4 < var$2) {
        for (var i = 0; i < var$5; i = (i + 1) | 0) {
            var$3.data[var$4++] = var$1.data[var$2++];
        }
    } else {
        var$2 = (var$2 + var$5) | 0;
        var$4 = (var$4 + var$5) | 0;
        for (var i = 0; i < var$5; i = (i + 1) | 0) {
            var$3.data[--var$4] = var$1.data[--var$2];
        }
    }
}
function jl_System_currentTimeMillis() {
    return Long_fromNumber(new Date().getTime());
}
function jl_System_gc() {
    return;
}
function jl_System_nanoTime() {
    return Long_fromNumber(performance.now() * 1000000.0);
}
function g_Greenfoot() {
    jl_Object.call(this);
}
var g_Greenfoot_randomGenerator = null;
function g_Greenfoot_$callClinit() {
    g_Greenfoot_$callClinit = $rt_eraseClinit(g_Greenfoot);
    g_Greenfoot__clinit_();
}
function g_Greenfoot__init_0() {
    var var_0 = new g_Greenfoot();
    g_Greenfoot__init_(var_0);
    return var_0;
}
function g_Greenfoot__init_($this) {
    g_Greenfoot_$callClinit();
    jl_Object__init_0($this);
}
function g_Greenfoot_isKeyDown($keyName) {
    g_Greenfoot_$callClinit();
    return gc_WorldHandler_getInstance().$getKeyboardManager().$isKeyDown($keyName);
}
function g_Greenfoot_setSpeed($speed) {
    g_Greenfoot_$callClinit();
    gc_Simulation_getInstance().$setSpeed($speed);
}
function g_Greenfoot_getRandomNumber($limit) {
    g_Greenfoot_$callClinit();
    return g_Greenfoot_randomGenerator.$nextInt($limit);
}
function g_Greenfoot_mousePressed($obj) {
    g_Greenfoot_$callClinit();
    return gc_WorldHandler_getInstance().$getMouseManager().$isMousePressed($obj);
}
function g_Greenfoot_mouseClicked($obj) {
    g_Greenfoot_$callClinit();
    return gc_WorldHandler_getInstance().$getMouseManager().$isMouseClicked($obj);
}
function g_Greenfoot_mouseDragged($obj) {
    g_Greenfoot_$callClinit();
    return gc_WorldHandler_getInstance().$getMouseManager().$isMouseDragged($obj);
}
function g_Greenfoot_getMouseInfo() {
    g_Greenfoot_$callClinit();
    return gc_WorldHandler_getInstance().$getMouseManager().$getMouseInfo();
}
function g_Greenfoot__clinit_() {
    g_Greenfoot_randomGenerator = ju_Random__init_();
}
function gc_InRangeQuery() {
    jl_Object.call(this);
}
function gc_InRangeQuery__init_() {
    var var_0 = new gc_InRangeQuery();
    gc_InRangeQuery__init_0(var_0);
    return var_0;
}
function gc_InRangeQuery__init_0($this) {
    jl_Object__init_0($this);
}
function gc_RepaintHandler() {
}
function gc_WorldHandler$2() {
    jl_Object.call(this);
    this.$this$07 = null;
}
function gc_WorldHandler$2__init_(var_0) {
    var var_1 = new gc_WorldHandler$2();
    gc_WorldHandler$2__init_0(var_1, var_0);
    return var_1;
}
function gc_WorldHandler$2__init_0($this, $this$0) {
    $this.$this$07 = $this$0;
    jl_Object__init_0($this);
}
function gc_WorldHandler$2_doRepaint($this) {
    gc_WorldHandler_access$000($this.$this$07);
    gc_WorldHandler_access$102($this.$this$07, 0);
}
function gc_WorldHandler$2_doRepaint$exported$0(var$0) {
    var$0.$doRepaint();
}
function Image() {
    Entity.call(this);
    this.$attachedTo = null;
}
function Image__init_(var_0) {
    var var_1 = new Image();
    Image__init_0(var_1, var_0);
    return var_1;
}
function Image__init_0($this, $attachedTo) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$attachedTo = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Entity__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$attachedTo = $attachedTo;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $attachedTo, $ptr);
}
function EnemyImage() {
    var a = this; Image.call(a);
    a.$frame0 = 0;
    a.$timeSinceChange = 0.0;
    a.$distanceFromPlayer = 0.0;
    a.$enemy = null;
}
function EnemyImage__init_0(var_0) {
    var var_1 = new EnemyImage();
    EnemyImage__init_(var_1, var_0);
    return var_1;
}
function EnemyImage__init_($this, $enemy) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$enemy = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Image__init_0($this, $enemy);
        if ($rt_suspending()) {
            break main;
        }
        $this.$enemy = $enemy;
        $this.$frame0 = 1;
        $this.$timeSinceChange = 0.0;
        $ptr = 2;
    case 2:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $tmp;
        $this.$setImage(var$2);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $enemy, var$2, $ptr);
}
function EnemyImage_run($this) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $tmp;
        $this.$setImage(var$1);
        if ($this.$enemy.$getScrollableWorld() === null)
            $this.$getScrollableWorld().$removeObject0($this);
        else
            $this.$setLocation0($this.$enemy.$getExactX(), $this.$enemy.$getExactY());
        $this.$timeSinceChange = $this.$timeSinceChange + $this.$enemy.$getTime() - $this.$enemy.$getPrevTime();
        if ($this.$timeSinceChange / 1.0E9 > 0.2) {
            if ($this.$frame0 == 1)
                $this.$frame0 = 2;
            else if ($this.$frame0 == 2)
                $this.$frame0 = 3;
            else if ($this.$frame0 == 3)
                $this.$frame0 = 4;
            else if (!$this.$enemy.$getSlashed())
                $this.$frame0 = 1;
            else
                $this.$enemy.$getScrollableWorld().$removeObject0($this);
            $this.$timeSinceChange = 0.0;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function EnemyImage_resetFrame($this) {
    $this.$frame0 = 1;
}
function EnemyImage_resetImage($this) {
    var var$1, var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (!$this.$enemy.$getSlashed()) {
            var$1 = new g_GreenfootImage;
            var$2 = $this.$frame0;
            var$3 = jl_StringBuilder__init_();
            jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append0(var$3, $rt_s(209)), var$2), $rt_s(210));
            var$3 = jl_StringBuilder_toString(var$3);
            $ptr = 1;
            continue main;
        }
        if ($this.$frame0 != 1) {
            var$1 = new g_GreenfootImage;
            var$2 = $this.$frame0;
            var$3 = jl_StringBuilder__init_();
            jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append0(var$3, $rt_s(211)), var$2), $rt_s(210));
            var$3 = jl_StringBuilder_toString(var$3);
            $ptr = 2;
            continue main;
        }
        if ($this.$distanceFromPlayer <= 80.0 && $this.$distanceFromPlayer > 55.0) {
            var$1 = new g_GreenfootImage;
            var$3 = $rt_s(212);
            $ptr = 4;
            continue main;
        }
        if ($this.$distanceFromPlayer <= 55.0 && $this.$distanceFromPlayer > 20.0) {
            var$1 = new g_GreenfootImage;
            var$3 = $rt_s(213);
            $ptr = 5;
            continue main;
        }
        var$1 = new g_GreenfootImage;
        var$3 = $rt_s(214);
        $ptr = 3;
        continue main;
    case 1:
        g_GreenfootImage__init_(var$1, var$3);
        if ($rt_suspending()) {
            break main;
        }
        return var$1;
    case 2:
        g_GreenfootImage__init_(var$1, var$3);
        if ($rt_suspending()) {
            break main;
        }
        return var$1;
    case 3:
        g_GreenfootImage__init_(var$1, var$3);
        if ($rt_suspending()) {
            break main;
        }
        return var$1;
    case 4:
        g_GreenfootImage__init_(var$1, var$3);
        if ($rt_suspending()) {
            break main;
        }
        return var$1;
    case 5:
        g_GreenfootImage__init_(var$1, var$3);
        if ($rt_suspending()) {
            break main;
        }
        return var$1;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, var$3, $ptr);
}
function EnemyImage_setDistanceFromPlayer($this, $distance) {
    $this.$distanceFromPlayer = $distance;
}
function ju_LinkedList$Entry() {
    var a = this; jl_Object.call(a);
    a.$item = null;
    a.$next5 = null;
    a.$previous = null;
}
function ju_LinkedList$Entry__init_0() {
    var var_0 = new ju_LinkedList$Entry();
    ju_LinkedList$Entry__init_(var_0);
    return var_0;
}
function ju_LinkedList$Entry__init_($this) {
    jl_Object__init_0($this);
}
function ju_Collections$5() {
    ju_AbstractSet.call(this);
}
function ju_Collections$5__init_0() {
    var var_0 = new ju_Collections$5();
    ju_Collections$5__init_(var_0);
    return var_0;
}
function ju_Collections$5__init_($this) {
    ju_AbstractSet__init_0($this);
}
function ju_Collections$6() {
    ju_AbstractMap.call(this);
}
function ju_Collections$6__init_0() {
    var var_0 = new ju_Collections$6();
    ju_Collections$6__init_(var_0);
    return var_0;
}
function ju_Collections$6__init_($this) {
    ju_AbstractMap__init_0($this);
}
function ju_Collections$3() {
    ju_AbstractList.call(this);
}
function ju_Collections$3__init_0() {
    var var_0 = new ju_Collections$3();
    ju_Collections$3__init_(var_0);
    return var_0;
}
function ju_Collections$3__init_($this) {
    ju_AbstractList__init_0($this);
}
function jl_Character() {
    jl_Object.call(this);
}
var jl_Character_TYPE = null;
var jl_Character_digitMapping = null;
var jl_Character_classMapping = null;
var jl_Character_characterCache = null;
var jl_Character_$$metadata$$0 = null;
var jl_Character_$$metadata$$1 = null;
function jl_Character_$callClinit() {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
}
function jl_Character_isBmpCodePoint($codePoint) {
    jl_Character_$callClinit();
    return $codePoint > 0 && $codePoint <= 65535 ? 1 : 0;
}
function jl_Character_isHighSurrogate($ch) {
    jl_Character_$callClinit();
    return ($ch & 64512) != 55296 ? 0 : 1;
}
function jl_Character_isLowSurrogate($ch) {
    jl_Character_$callClinit();
    return ($ch & 64512) != 56320 ? 0 : 1;
}
function jl_Character_isSurrogate($ch) {
    jl_Character_$callClinit();
    return !jl_Character_isHighSurrogate($ch) && !jl_Character_isLowSurrogate($ch) ? 0 : 1;
}
function jl_Character_toCodePoint($high, $low) {
    jl_Character_$callClinit();
    return (($high & 1023) << 10 | $low & 1023) + 65536 | 0;
}
function jl_Character_highSurrogate($codePoint) {
    var var$2;
    jl_Character_$callClinit();
    var$2 = $codePoint - 65536 | 0;
    return (55296 | var$2 >> 10 & 1023) & 65535;
}
function jl_Character_lowSurrogate($codePoint) {
    jl_Character_$callClinit();
    return (56320 | $codePoint & 1023) & 65535;
}
function jl_Character_toLowerCase($ch) {
    jl_Character_$callClinit();
    return jl_Character_toLowerCase0($ch) & 65535;
}
function jl_Character_toLowerCase0($ch) {
    var var$2, var$3;
    jl_Character_$callClinit();
    var$2 = otp_Platform_stringFromCharCode($ch).toLowerCase();
    var$3 = 0;
    return var$2.charCodeAt(var$3);
}
function jl_Character_digit($ch, $radix) {
    jl_Character_$callClinit();
    return jl_Character_digit0($ch, $radix);
}
function jl_Character_digit0($codePoint, $radix) {
    var $d;
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36) {
        $d = jl_Character_getNumericValue0($codePoint);
        if ($d >= $radix)
            $d = (-1);
        return $d;
    }
    return (-1);
}
function jl_Character_getNumericValue($ch) {
    jl_Character_$callClinit();
    return jl_Character_getNumericValue0($ch);
}
function jl_Character_getNumericValue0($codePoint) {
    var $digitMapping, var$3, $l, $u, $idx, $val, var$8;
    jl_Character_$callClinit();
    $digitMapping = jl_Character_getDigitMapping();
    var$3 = $digitMapping.data;
    $l = 0;
    $u = (var$3.length / 2 | 0) - 1 | 0;
    while ($u >= $l) {
        $idx = ($l + $u | 0) / 2 | 0;
        $val = var$3[$idx * 2 | 0];
        var$8 = $rt_compare($codePoint, $val);
        if (var$8 > 0)
            $l = $idx + 1 | 0;
        else {
            if (var$8 >= 0)
                return var$3[($idx * 2 | 0) + 1 | 0];
            $u = $idx - 1 | 0;
        }
    }
    return (-1);
}
function jl_Character_forDigit($digit, $radix) {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
}
function jl_Character_getDigitMapping() {
    jl_Character_$callClinit();
    if (jl_Character_digitMapping === null)
        jl_Character_digitMapping = otciu_UnicodeHelper_decodeIntByte((jl_Character_obtainDigitMapping().value !== null ? $rt_str(jl_Character_obtainDigitMapping().value) : null));
    return jl_Character_digitMapping;
}
function jl_Character_obtainDigitMapping() {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$0 === null)
        jl_Character_$$metadata$$0 = jl_Character_obtainDigitMapping$$create();
    return jl_Character_$$metadata$$0;
}
function jl_Character_getClasses() {
    jl_Character_$callClinit();
    if (jl_Character_classMapping === null)
        jl_Character_classMapping = otciu_UnicodeHelper_extractRle((jl_Character_obtainClasses().value !== null ? $rt_str(jl_Character_obtainClasses().value) : null));
    return jl_Character_classMapping;
}
function jl_Character_obtainClasses() {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$1 === null)
        jl_Character_$$metadata$$1 = jl_Character_obtainClasses$$create();
    return jl_Character_$$metadata$$1;
}
function jl_Character_getType($codePoint) {
    var $classes, var$3, $l, $u, $i, $range;
    jl_Character_$callClinit();
    if (jl_Character_isBmpCodePoint($codePoint) && jl_Character_isSurrogate($codePoint & 65535))
        return 19;
    $classes = jl_Character_getClasses();
    var$3 = $classes.data;
    $l = 0;
    $u = var$3.length - 1 | 0;
    while ($l <= $u) {
        $i = ($l + $u | 0) / 2 | 0;
        $range = var$3[$i];
        if ($codePoint >= $range.$end)
            $l = $i + 1 | 0;
        else {
            if ($codePoint >= $range.$start1)
                return $range.$data0.data[$codePoint - $range.$start1 | 0];
            $u = $i - 1 | 0;
        }
    }
    return 0;
}
function jl_Character_isSpaceChar($codePoint) {
    jl_Character_$callClinit();
    switch (jl_Character_getType($codePoint)) {
        case 12:
        case 13:
        case 14:
            break;
        default:
            return 0;
    }
    return 1;
}
function jl_Character_isWhitespace($ch) {
    jl_Character_$callClinit();
    return jl_Character_isWhitespace0($ch);
}
function jl_Character_isWhitespace0($codePoint) {
    jl_Character_$callClinit();
    switch ($codePoint) {
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 28:
        case 29:
        case 30:
        case 31:
            break;
        case 160:
        case 8199:
        case 8239:
            return 0;
        default:
            return jl_Character_isSpaceChar($codePoint);
    }
    return 1;
}
function jl_Character__clinit_() {
    jl_Character_TYPE = $rt_cls($rt_charcls());
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
}
function jl_Character_obtainDigitMapping$$create() {
    return {"value" : "B>#*% .%%2%)6%-:%1>%5B%9F%=J%AN%Eo%Is%Mw%Q{%U!\'Y&\'^*\'b.\'f2\'j6\'n:\'r>\'vB\'zF\'!#J\'&#N\'*#R\'.#V\'2#Z\'6#_\':#c\'>#g\'B#k\'F#o\'J#s\'N#w\'R#6)I:)M>)QB)UF)YJ)^N)bR)fV)jZ)n_)rc)vg)zk)!#o)&#s)*#w).#{)2#!+6#&+:#*+>#.+B#2+F#6+J#:+N#>+R#{R# !T#%&T#)*T#-.T#12T#56T#9:T#=>T#ABT#E6a# :a#%>a#)Ba#-Fa#1Ja#5Na#9Ra#=Va#AZa#E:s# >s#%Bs#)Fs#-Js#1Ns#5Rs#9Vs#=Zs#A_s#EZ:% _:%%c:%)g:%-k:%1o:%5s:%9w:%={:%A!<%E2F% 6F%%:F%)>F%-BF%1FF%5JF%9NF%=RF%AVF%EgP% kP%%oP%)sP%-wP%1{P%5!R%9&R%=*R%A.R%E>]% B]%%F]%)J]%-N]%1R]%5V]%9Z]%=_]%Ac]%Esg% wg%%{g%)!i%-&"
    + "i%1*i%5.i%92i%=6i%A:i%EJs% Ns%%Rs%)Vs%-Zs%1_s%5cs%9gs%=ks%Aos%E!!\' &!\'%*!\').!\'-2!\'16!\'5:!\'9>!\'=B!\'AF!\'EV,\' Z,\'%_,\')c,\'-g,\'1k,\'5o,\'9s,\'=w,\'A{,\'E.8\' 28\'%68\'):8\'->8\'1B8\'5F8\'9J8\'=N8\'AR8\'EcB\' gB\'%kB\')oB\'-sB\'1wB\'5{B\'9!D\'=&D\'A*D\'E>L\' BL\'%FL\')JL\'-NL\'1RL\'5VL\'9ZL\'=_L\'AcL\'EsV\' wV\'%{V\')!X\'-&X\'1*X\'5.X\'92X\'=6X\'A:X\'EB_\' F_\'%J_\')N_\'-R_\'1V_\'5Z_\'9__\'=c_\'Ag_\'Esw\' ww\'%{w\')!y\'-&y\'1*y\'5.y\'92y\'=6y\'A:y\'EB!) F!)%J!))N!)-R!)1V!)5Z!)9_!)=c!)Ag!)Egi+ ki+%oi+)si+-wi+1{i+5!k+9&k+=*k+A.k+Eom+ sm+%wm+){m+-!o+1&o+5*o+9.o+=2o+A6o+E>,- B,-%F"
    + ",-)J,--N,-1R,-5V,-9Z,-=_,-Ac,-E>8- B8-%F8-)J8--N8-1R8-5V8-9Z8-=_8-Ac8-E{F- !H-%&H-)*H--.H-12H-56H-9:H-=>H-ABH-E_H- cH-%gH-)kH--oH-1sH-5wH-9{H-=!J-A&J-E!Z- &Z-%*Z-).Z--2Z-16Z-5:Z-9>Z-=BZ-AFZ-E2c- 6c-%:c-)>c--Bc-1Fc-5Jc-9Nc-=Rc-AVc-EJo- No-%Ro-)Vo--Zo-1_o-5co-9go-=ko-Aoo-E.q- 2q-%6q-):q-->q-1Bq-5Fq-9Jq-=Nq-ARq-E&4r *4r%.4r)24r-64r1:4r5>4r9B4r=F4rAJ4rE{or !qr%&qr)*qr-.qr12qr56qr9:qr=>qrABqrE&ur *ur%.ur)2ur-6ur1:ur5>ur9Bur=FurAJurE**t .*t%2*t)6*t-:*t1>*t5B*t9F*t=J*tAN*tEN,t R,t%V,t)Z,t-_,t1c,t5g,t9k,t=o,tAs,tE_"
    + "4t c4t%g4t)k4t-o4t1s4t5w4t9{4t=!6tA&6tEgXt kXt%oXt)sXt-wXt1{Xt5!Zt9&Zt=*ZtA.ZtE{c@# !e@#%&e@#)*e@#-.e@#12e@#56e@#9:e@#=>e@#ABe@#Ece@#Ige@#Mke@#Qoe@#Use@#Ywe@#^{e@#b!g@#f&g@#j*g@#n.g@#r2g@#v6g@#z:g@#!#>g@#&#Bg@#*#Fg@#.#Jg@#2#Ng@#6#Rg@#:#Vg@#>#Zg@#B#_g@#F#cg@#J#gg@#N#kg@#R#*i@#I.i@#M2i@#Q6i@#U:i@#Y>i@#^Bi@#bFi@#fJi@#jNi@#nRi@#rVi@#vZi@#z_i@#!#ci@#&#gi@#*#ki@#.#oi@#2#si@#6#wi@#:#{i@#>#!k@#B#&k@#F#*k@#J#.k@#N#2k@#R#s&D# w&D#%{&D#)!(D#-&(D#1*(D#5.(D#92(D#=6(D#A:(D#EwuH# {uH#%!wH#)&wH#-*wH#1.wH#52wH#96wH#=:wH#A>w"
    + "H#Ew$J# {$J#%!&J#)&&J#-*&J#1.&J#52&J#96&J#=:&J#A>&J#E{*J# !,J#%&,J#)*,J#-.,J#12,J#56,J#9:,J#=>,J#AB,J#E_8J# c8J#%g8J#)k8J#-o8J#1s8J#5w8J#9{8J#=!:J#A&:J#E2RJ# 6RJ#%:RJ#)>RJ#-BRJ#1FRJ#5JRJ#9NRJ#=RRJ#AVRJ#ENqJ# RqJ#%VqJ#)ZqJ#-_qJ#1cqJ#5gqJ#9kqJ#=oqJ#AsqJ#E&}J# *}J#%.}J#)2}J#-6}J#1:}J#5>}J#9B}J#=F}J#AJ}J#Eg@L# k@L#%o@L#)s@L#-w@L#1{@L#5!BL#9&BL#=*BL#A.BL#EZJL# _JL#%cJL#)gJL#-kJL#1oJL#5sJL#9wJL#={JL#A!LL#ENTL# RTL#%VTL#)ZTL#-_TL#1cTL#5gTL#9kTL#=oTL#AsTL#E:{L# >{L#%B{L#)F{L#-J{L#1N{L#5R{L#9V{L#=Z{L#A_{L#ERkN# VkN#"
    + "%ZkN#)_kN#-ckN#1gkN#5kkN#9okN#=skN#AwkN#E_$P# c$P#%g$P#)k$P#-o$P#1s$P#5w$P#9{$P#=!&P#A&&P#EFau# Jau#%Nau#)Rau#-Vau#1Zau#5_au#9cau#=gau#Akau#Eouu# suu#%wuu#){uu#-!wu#1&wu#5*wu#9.wu#=2wu#A6wu#EF0N% J0N%%N0N%)R0N%-V0N%1Z0N%5_0N%9c0N%=g0N%Ak0N%Eo0N% s0N%%w0N%){0N%-!2N%1&2N%5*2N%9.2N%=22N%A62N%E:2N% >2N%%B2N%)F2N%-J2N%1N2N%5R2N%9V2N%=Z2N%A_2N%Ec2N% g2N%%k2N%)o2N%-s2N%1w2N%5{2N%9!4N%=&4N%A*4N%E.4N% 24N%%64N%):4N%->4N%1B4N%5F4N%9J4N%=N4N%AR4N%E:FV% >FV%%BFV%)FFV%-JFV%1NFV%5RFV%9VFV%=ZFV%A_FV%E"};
}
function jl_Character_obtainClasses$$create() {
    return {"value" : "PA-Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:PB-9[%=9<=&>:1=<=:L#<#Y#<,&?L$9B8:B(C9:C)!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!C$B##!#B##B$C#B%#B##B$C$B##B##!#!#B##!C#!#B##B$#!#B#C#&!C$F%!$#!$#!$#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!C#!$#!#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C(B##B#C#!#B%#!#!#!#!Cg&C<E3]%E-]/E&](%<%]2b\'Q! !#!#%<!#A#%C$9!A%]#!9B$ ! B##B2 B*CD!C#B$C$!#!#!#!#!#!#!#!#!#!#!#!C&!#:!#B#C#BTCQ!#!#!#!#"
    + "!#!#!#!#!#!#!#!#!#!#!#!#!#=G&H#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!# BGA#%Y\' CH 95A#^#; GN5\'9G#9G#9\'A)F<A&F$Y#A,Q\'Z$Y#;Y#^#G,91 Y#FA%F+G6J+Y%F#\'b&D! 9&G(1=G\'E#G#=G%F#J+F$^#&Y/ 1&\'F?G<A#b&:! G,&A/J+FBG*E#=Y$%A&F7G%%G*%G$%G&A#Y0 F:G$A#9 F,AVF6 F)A7G/1GA)FW\')\'&I$G)I%\'I#&G(F+G#Y#J+9%F0\'I# F)A#F#A#F7 F( &A$F%A#\'&I$G%A#I#A#I#\'&A))A%F# F$G#A#J+F#[#L\'=;&9A$G#) F\'A%F#A#F7 F( F# F# F#A#\' I$"
    + "G#A%G#A#G$A$\'A(F% &A(J+G#F$\'A,G#) F* F$ F7 F( F# F&A#\'&I$G& G#) I#\'A#&A0F#G#A#J+9;A(&G\' \'I# F)A#F#A#F7 F( F# F&A#\'&)\')G%A#I#A#I#\'A)\')A%F# F$G#A#J+=&L\'A+\'& F\'A$F$ F%A$F# & F#A$F#A$F$A$F-A%I#\'I#A$I$ I$\'A#&A\')A/J+L$^\';=A&\'I$ F) F$ F8 F1A$&G$I% G$ G%A(G# F$A&F#G#A#J+A)L(=&\'I# F) F$ F8 F+ F&A#\'&)\'I& \'I# I#G#A(I#A(& F#G#A#J+ F#A.G#I# F) F$ FJG#&I$G% I$ I$\'&=A%F$)L(F$G#A#J+L*=F\'A#I# F3A$F9 F* &A#F(A$\'A%I$G$ \' I)A\'J+A#I#9A-FQ\'F#G(A%;F\'%G)9J+Y#AFF# &A#F# &A#&A\'F% F( F$ & &A#F# F%\'F#G\' G#&A#F& % G\'A#J+A#F%AA&^$Y0=9^$"
    + "G#^\'J+L+=\'=\'=\'6767I#F) FEA%G/)G&9G#F&G, GE ^)\'^\' ^#Y&^%Y#AFFLI#G%)G\')G#I#G#&J+Y\'F\'I#G#F%G$&I$F#I(F$G%F.\'I#G#I\'\'&)J+I$\'^#BG !A&!A#FL9%b&-&  F%A#F( & F%A#FJ F%A#FB F%A#F( & F%A#F0 FZ F%A#FeA#G$Y*L5A$F1^+A\'b!7! A#C\'A#5b&M* Y#F2-F;67A$FmY$K$F)A(F. F%G$A,F3G$Y#A*F3G#A-F. F$ G#A-FUG#)G(I)\'I#G,Y$%Y$;&\'A#J+A\'L+A\'Y\'5Y%G$1 J+A\'FD%FUA)F&G#FC\'&A&FhA+F@ G$I%G#I$A%I#\'I\'G$A%=A$Y#J+F?A#F&A,FMA%F;A\'J+,A$^CF8G#I#\'A#Y#FV)\')G( \')\'I#G)I\'G+A#\'J+A\'J+A\'Y(%Y\'A#G/(AcG%)FP\')G&)\'I&\'I#F(A%J+Y(^+G*^*A$G#)F?)G%I#G#)G$F#J+FM\')G#I$\')G$I#A)"
    + "Y%FEI)G)I#G#A$Y&J+A$F$J+F?E\'Y#C*AXY)A)G$9G.)G(F%\'F%I#\'F#)G#A\'CMEaC.%CCEFG[ G&!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*B)C\'A#B\'A#C)B)C)B)C\'A#B\'A#C) ! ! ! !C)B)C/A#C)D)C)D)C)D)C& C#B%$<#]$C$ C#B%$]$C%A#C#B% ]$C)B&]$A#C$ C#B%$]# M,Q&U\'Y#>?6_#?6>Y)./Q&-Y*>?Y%X#Y$:67Y,:98Y+-Q& Q+,%A#L\'Z$67%L+Z$67 E.A$[AA1G."
    + "H%\'H$G-A0^#!^%!^##B$C#B$#=!^#:B&^\'!=!=!=B%=#B%#F%#^#C#B#Z&!C%=:^##=L1KD!#K%,^#A%Z&^&Z#^%:^#:^#:^(:^@Z#^#:=:^@b:-% ^)6767^5Z#^(67b=2! :^?Z:^IZ\'^gA:^,A6L^^pL7b=X# :^*:^WZ)b=P! :b=Y$ 67676767676767L?^MZ&67Z@6767676767Z1b= % b:$# 6767676767676767676767Za6767ZA67b:#% ^QZ6^#Z\'^HA#^AA#^CA$^- ^*A:^%A1BP CP !#B$C#!#!#!#B%#!C#!C\'E#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#^\'!#!#G$!#A&Y%,Y#CG #A&#A#FYA(%9A/\'F8A*F( F( F( F( F( F( F( F( GAY#>?>?Y$>?9>?Y*5Y#59>?"
    + "Y#>?67676767Y&%Y+U#Y%596Y(AW^; b=:! A-b=7$ A;^-A%-Y$=%&+6767676767^#6767676756W#=K*G%I#5E&^#K$%&9^# b&7! A#G#]#E#&5b&;! 9E$&A&FKA#b&?!  ^#L%^+F<A&^EA-F1^@ L+^?L)=L0^AL+^HL0^a b= % &b UG!&A+^b&b   %b J(!&A6F6%b&X2 A$^XA*FIE\'Y#b&-% %Y$F1J+F#A5!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#&\'H$9G+9%!#!#!#!#!#!#!#!#!#!#!#!#!#!#E#G#FhK+G#Y\'A)]8E*]#!#!#!#!#!#!#!C$!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#%C)!#!#B##!#!#!#!#%]#!#!#&!#!C$!#!#!#!#!#!#!#!#!#!#B& B&#!#Aa&E##F(\'F$\'F%\'F8I#G#)^%A%L\'^#;="
    + "A\'FUY%A)I#FSI1G#A)Y#J+A\'G3F\'Y$&9&A#J+F=G)Y#F8G,I#A,9F>A$G$)FP\'I#G%I#\'I%Y. %J+A%Y#F&\'%F*J+F& FJG\'I#G#I#G#A*F$\'F)\')A#J+A#Y%F1%F\'^$&)\')FS\'&G$F#G#F&G#&\'&A9F#%Y#F,)G#I#Y#&E#)\'A+F\'A#F\'A#F\'A*F( F( CL<E%C\'A+b#1! FDI#\'I#\'I#9)\'A#J+A\'&b CO#&A-F8A%FRA%4b `. T#b `! T#b `0 43b `D!3b&O& A#b&K! AGC(A-C&A&&\'F+:F. F& & F# F# b&M! ]1A2b&L& 76A1FbA#FWAIF-;=A#G1Y(679A\'G19U#X#6767676767676767Y#67Y%X$Y$ Y%5676767Y$:5Z$ 9;Y#A%F& b&(# A#1 Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:67967Y#F+%FNE#F@A$F\'A#F\'A#F\'A#F$A$[#:<=[# =Z%^#A+Q$^#A#F- F"
    + "; F4 F# F0A#F/ACb&]! A&Y$A%LNA$^*KVL%^2L#^$ ^-A%=AP^N\'b ## F>A$FRA0\'L<A%FAL%A*F5+F)+A&FGG&A&F? 9FEA%F)9K&AKBICIFpA#J+A\'BEA%CEA%FIA)FUA,9b 1# b&X% A*F7A+F)b 9# F\'A#& FM F#A$&A#F8 9L)F8^#L(F@A)L*AQF4 F#A&L&F7L\'A$9F;A&9AbFYA%L#F#L1A#LO&G$ G#A&G%F% F$ F<A%G$A%\'L)A)Y*A(F>L#9F>L$AAF)=F=G#A%L&Y(A*FWA$Y(F7A#L)F4A&L)F3A(Y%A-L(b 1! FkAXBTA.CTA(L\'b A& L@b !\' )\')FVG0Y(A%L5J+A0G$)FNI$G%I#G#Y#1Y%A/F:A(J+A\'G$FEG&)G) J+Y%A-FD\'Y#&A*G#)FQI$G*I#F%Y&G$9A#J+&9&Y$ L5A,F3 F:I$G$I#\')G#Y\'\'AcF( & F% F0 F+9A\'FP\'I$G)A&J+A\'G#I# F)A#F#A"
    + "#F7 F( F# F&A#\'&I#\'I%A#I#A#I$A#&A\')A&F&I#A#G(A$G&b ,# FVI$G)I#G$)\'F%Y&J+ 9 9ACFQI$G\')\'I%G#)G#F#9&A)J+b G# FPI$G%A#I%G#)G#Y8F%G#ACFQI$G)I#\')G#Y$&A,J+A\'Y.A4FL\')\'I#G\')\'A)J+AWF;A$G$I#G%)G&A%J+L#Y$=b A& BACAJ+L*A-&b  % &G\'I#G#FIG\')&G%Y)\'A)&G\'I#G$FIA#F%G.)G#Y$ Y&A>FZb (% F* FF)G( G\')\'&Y&A+J+L4A$Y#F?A#G7 )G()G#)G#AkF( F# FGG\'A$\' G# G(&\'A)J+b G+ b&;/ b G! b+P!  Y&A,b&%$ b ^K b&P1 b 2a b&(* b Z\'#b&Z) A(F@ J+A%Y#b A! F?A#G&9A+FQG(Y&^%E%9=A+J+ L( F6A&F4b Q. FgA,&IOA1G%E.AbE#A?&b L@!&A4b&T, b .5#b&@% b 2! b&-\' b %E b&L"
    + "! A&F.A$F*A(F+A#=G#9Q%b =.!b=W$ A+^HA#^^I#G$^$I\'Q)G)^#G(^?G%^]A8^dG$=b [# b=8! A*L3b /# B;C;B;C( C3B;C;! B#A#!A#B#A#B% B)C% # C( C,B;C;B# B%A#B) B( C;B# B% B& !A$B( C;B;C;B;C;B;C;B;C;B;C;B;C=A#B::C::C\'B::C::C\'B::C::C\'B::C::C\'B::C::C\'!#A#JSb= ) GX^%GS^)\'^/\'^#Y&A0G& G0b 16 G( G2A#G( G# G&b 6@ b&&$ A#L*G(AJBCCCG(A&J+A%Y#b A3 F% F< F# &A#& F+ F% & &A\'&A%& & & F$ F# &A#& & & & & F# &A#F% F( F% F% & F+ F2A&F$ F& F2AUZ#b /% ^MA%b=E! A-^0A#^0 ^0 ^FA+L.A$^@ ^^A%^_AZ^>A.^MA%^*A(^#A/^\'b ;# b=]$ ]&b=6, A,^.A$^*A(b=U! A"
    + "-b=6! AL^-A%^YA)^+A\'^IA)^?b 3! ^-A%^P ^.A$^=A5^9AI=A0^8b :9 &b   %b   %b 6<#&AJ&b T !&A,&b =$ &A#&b  ;!&A/&b PU!&b @Q b&?) b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b D8 1A?b1A! b  # b\'Q$ b   %b   %b   %b 1Y$3b   %b   %b   %b ^a$3A#3b   %b   %b   %b ^a$3"};
}
function jl_Object$monitorExit$lambda$_8_0() {
    jl_Object.call(this);
    this.$_013 = null;
}
function jl_Object$monitorExit$lambda$_8_0__init_(var_0) {
    var var_1 = new jl_Object$monitorExit$lambda$_8_0();
    jl_Object$monitorExit$lambda$_8_0__init_0(var_1, var_0);
    return var_1;
}
function jl_Object$monitorExit$lambda$_8_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_013 = var$1;
}
function jl_Object$monitorExit$lambda$_8_0_run(var$0) {
    jl_Object_lambda$monitorExit$2(var$0.$_013);
}
function g_GreenfootImage$2$handleEvent$lambda$_1_0() {
    var a = this; jl_Object.call(a);
    a.$_014 = null;
    a.$_15 = null;
}
function g_GreenfootImage$2$handleEvent$lambda$_1_0__init_(var_0, var_1) {
    var var_2 = new g_GreenfootImage$2$handleEvent$lambda$_1_0();
    g_GreenfootImage$2$handleEvent$lambda$_1_0__init_0(var_2, var_0, var_1);
    return var_2;
}
function g_GreenfootImage$2$handleEvent$lambda$_1_0__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$_014 = var$1;
    var$0.$_15 = var$2;
}
function g_GreenfootImage$2$handleEvent$lambda$_1_0_run(var$0) {
    g_GreenfootImage$2_lambda$handleEvent$0(var$0.$_014, var$0.$_15);
}
function ggim_PriorityManager() {
    jl_Object.call(this);
}
function ggim_PriorityManager__init_0() {
    var var_0 = new ggim_PriorityManager();
    ggim_PriorityManager__init_(var_0);
    return var_0;
}
function ggim_PriorityManager__init_($this) {
    jl_Object__init_0($this);
}
function ggim_PriorityManager_isHigherPriority($newEvent, $currentData) {
    var $currentPriority, $newPriority;
    $currentPriority = ggim_PriorityManager_getPriority($currentData);
    $newPriority = ggim_PriorityManager_getPriority0($newEvent);
    return $newPriority > $currentPriority ? 0 : 1;
}
function ggim_PriorityManager_getPriority0($event) {
    var var$2;
    a: {
        var$2 = (-1);
        switch ($event.$hashCode()) {
            case -1844879718:
                if (!$event.$equals($rt_s(205)))
                    break a;
                var$2 = 2;
                break a;
            case 94750088:
                if (!$event.$equals($rt_s(196)))
                    break a;
                var$2 = 1;
                break a;
            case 586843847:
                if (!$event.$equals($rt_s(197)))
                    break a;
                var$2 = 3;
                break a;
            case 586846041:
                if (!$event.$equals($rt_s(199)))
                    break a;
                var$2 = 4;
                break a;
            case 587111926:
                if (!$event.$equals($rt_s(200)))
                    break a;
                var$2 = 5;
                break a;
            case 1243067904:
                if (!$event.$equals($rt_s(198)))
                    break a;
                var$2 = 0;
                break a;
            default:
        }
    }
    switch (var$2) {
        case 0:
            break;
        case 1:
        case 2:
            return 1;
        case 3:
            return 2;
        case 4:
            return 3;
        case 5:
            return 4;
        default:
            return 2147483647;
    }
    return 0;
}
function ggim_PriorityManager_getPriority($data) {
    if ($data.$isMouseDragEnded(null))
        return 0;
    if ($data.$isMouseClicked(null))
        return 1;
    if ($data.$isMousePressed(null))
        return 2;
    if ($data.$isMouseDragged(null))
        return 3;
    if (!$data.$isMouseMoved(null))
        return 2147483647;
    return 4;
}
function jn_CharBuffer() {
    jn_Buffer.call(this);
}
function jn_CharBuffer__init_(var_0, var_1, var_2) {
    var var_3 = new jn_CharBuffer();
    jn_CharBuffer__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jn_CharBuffer__init_0($this, $capacity, $position, $limit) {
    jn_Buffer__init_0($this, $capacity);
    $this.$position1 = $position;
    $this.$limit = $limit;
}
function jn_CharBuffer_wrap($array, $offset, $length) {
    return jn_CharBufferOverArray__init_(0, $array.data.length, $array, $offset, $offset + $length | 0, 0);
}
function jn_CharBuffer_get($this, $dst, $offset, $length) {
    var var$4, var$5, var$6, $pos, $i;
    if ($offset >= 0) {
        var$4 = $dst.data;
        var$5 = var$4.length;
        if ($offset < var$5) {
            var$6 = $offset + $length | 0;
            if (var$6 > var$5)
                $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_StringBuilder__init_().$append($rt_s(215)).$append3(var$6).$append($rt_s(171)).$append3(var$5).$toString()));
            if (jn_Buffer_remaining($this) < $length)
                $rt_throw(jn_BufferUnderflowException__init_0());
            if ($length < 0)
                $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_StringBuilder__init_().$append($rt_s(172)).$append3($length).$append($rt_s(173)).$toString()));
            $pos = $this.$position1;
            $i = 0;
            while ($i < $length) {
                var$6 = $offset + 1 | 0;
                var$5 = $pos + 1 | 0;
                var$4[$offset] = $this.$getChar($pos);
                $i = $i + 1 | 0;
                $offset = var$6;
                $pos = var$5;
            }
            $this.$position1 = $this.$position1 + $length | 0;
            return $this;
        }
    }
    var$4 = $dst.data;
    $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_StringBuilder__init_().$append($rt_s(174)).$append3($offset).$append($rt_s(29)).$append3(var$4.length).$append($rt_s(125)).$toString()));
}
function jn_CharBufferImpl() {
    jn_CharBuffer.call(this);
}
function jn_CharBufferImpl__init_(var_0, var_1, var_2) {
    var var_3 = new jn_CharBufferImpl();
    jn_CharBufferImpl__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jn_CharBufferImpl__init_0($this, $capacity, $position, $limit) {
    jn_CharBuffer__init_0($this, $capacity, $position, $limit);
}
function jn_CharBufferOverArray() {
    var a = this; jn_CharBufferImpl.call(a);
    a.$readOnly0 = 0;
    a.$start2 = 0;
    a.$array0 = null;
}
function jn_CharBufferOverArray__init_(var_0, var_1, var_2, var_3, var_4, var_5) {
    var var_6 = new jn_CharBufferOverArray();
    jn_CharBufferOverArray__init_0(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
}
function jn_CharBufferOverArray__init_0($this, $start, $capacity, $array, $position, $limit, $readOnly) {
    jn_CharBufferImpl__init_0($this, $capacity, $position, $limit);
    $this.$start2 = $start;
    $this.$readOnly0 = $readOnly;
    $this.$array0 = $array;
}
function jn_CharBufferOverArray_getChar($this, $index) {
    return $this.$array0.data[$index + $this.$start2 | 0];
}
function BuildingImage() {
    var a = this; Image.call(a);
    a.$building = null;
    a.$height3 = 0;
    a.$displacement = 0;
    a.$shift = 0;
    a.$special = 0;
    a.$first0 = 0;
    a.$ogImage0 = null;
}
var BuildingImage_BASE_IMAGE_HEIGHT = 0;
function BuildingImage_$callClinit() {
    BuildingImage_$callClinit = $rt_eraseClinit(BuildingImage);
    BuildingImage__clinit_();
}
function BuildingImage__init_0(var_0, var_1) {
    var var_2 = new BuildingImage();
    BuildingImage__init_(var_2, var_0, var_1);
    return var_2;
}
function BuildingImage__init_($this, $building, $first) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$first = $thread.pop();$building = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        BuildingImage_$callClinit();
        $ptr = 1;
    case 1:
        Image__init_0($this, $building);
        if ($rt_suspending()) {
            break main;
        }
        $this.$building = $building;
        $this.$height3 = 1;
        $this.$displacement = 0;
        $this.$shift = 0;
        $this.$special = 0;
        $this.$first0 = $first;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $building, $first, $ptr);
}
function BuildingImage_addedToWorld($this, $s) {
    var var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$s = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$2 = $this.$building.$getWidth();
        $ptr = 1;
    case 1:
        $tmp = $this.$getBuildingImage(var$2);
        if ($rt_suspending()) {
            break main;
        }
        var$3 = $tmp;
        $this.$ogImage0 = var$3;
        $ptr = 2;
    case 2:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$3 = $tmp;
        $this.$setImage(var$3);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $s, var$2, var$3, $ptr);
}
function BuildingImage_run($this) {
    if ($this.$building.$getScrollableWorld() === null)
        $this.$getScrollableWorld().$removeObject0($this);
    $this.$setLocation0($this.$building.$getExactX() + $this.$shift, $this.$building.$getExactY() - 25.0 + ($this.$height3 / 2 | 0) + $this.$displacement);
}
function BuildingImage_resetImage($this) {
    return $this.$ogImage0;
}
function BuildingImage_getBuildingImage($this, $buildingLength) {
    var $imageNums, $imageWidth, $tempDisplacement, var$5, $marginWidth, $image, var$8, $paintX, var$10, $scalingFactor, $imageNum, $individualImage, var$14, var$15, $numBuildings, var$17, var$18, var$19, $i, $bumpX, $tempWidth, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$tempWidth = $thread.pop();$bumpX = $thread.pop();$i = $thread.pop();var$19 = $thread.pop();var$18 = $thread.pop();var$17 = $thread.pop();$numBuildings = $thread.pop();var$15 = $thread.pop();var$14 = $thread.pop();$individualImage = $thread.pop();$imageNum = $thread.pop();$scalingFactor = $thread.pop();var$10 = $thread.pop();$paintX = $thread.pop();var$8 = $thread.pop();$image = $thread.pop();$marginWidth = $thread.pop();var$5 = $thread.pop();$tempDisplacement = $thread.pop();$imageWidth
        = $thread.pop();$imageNums = $thread.pop();$buildingLength = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($buildingLength > ($this.$getImageWidth(6) - (2 * $this.$getMarginWidth(6) | 0) | 0) && !g_Greenfoot_getRandomNumber(2) && !$this.$first0) {
            $this.$special = 1;
            $imageNums = ju_ArrayList__init_();
            $imageWidth = 0;
            $tempDisplacement = 0;
            while (true) {
                var$5 = $buildingLength - $imageWidth | 0;
                if (var$5 <= ($this.$getImageWidth(1) + $this.$getImageWidth(4) | 0)) {
                    ju_Collections_shuffle($imageNums);
                    $marginWidth = $this.$getMarginWidth($imageNums.$get0(0).$intValue()) + $this.$getMarginWidth($imageNums.$get0($imageNums.$size() - 1 | 0).$intValue()) | 0;
                    $image = new g_GreenfootImage;
                    var$8 = $imageWidth + $marginWidth | 0;
                    g_GreenfootImage__init_3($image, var$8, BuildingImage_BASE_IMAGE_HEIGHT + $tempDisplacement | 0);
                    $paintX = var$8 - $this.$getMarginWidth($imageNums.$get0(0).$intValue()) | 0;
                    var$10 = $imageNums.$iterator();
                    if (!var$10.$hasNext()) {
                        $scalingFactor = $buildingLength / $imageWidth;
                        $this.$height3 = $scalingFactor * (BuildingImage_BASE_IMAGE_HEIGHT + $tempDisplacement | 0) | 0;
                        $this.$displacement = $scalingFactor * ((-5) - $tempDisplacement | 0) | 0;
                        $buildingLength = $buildingLength + ($marginWidth * $scalingFactor | 0) | 0;
                        $this.$shift = ($this.$getMarginWidth($imageNums.$get0(0).$intValue()) - $this.$getMarginWidth($imageNums.$get0($imageNums.$size() - 1 | 0).$intValue()) | 0) * $scalingFactor / 2.0 | 0;
                        $image.$scale($buildingLength, $this.$height3);
                        return $image;
                    }
                    $imageNum = var$10.$next().$intValue();
                    if (!$this.$getImageWidth($imageNum)) {
                        $ptr = 5;
                        continue main;
                    }
                    $individualImage = new g_GreenfootImage;
                    var$14 = jl_StringBuilder__init_();
                    jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append0(var$14, $rt_s(216)), $imageNum), $rt_s(217));
                    var$14 = jl_StringBuilder_toString(var$14);
                    $ptr = 6;
                    continue main;
                }
                $imageNum = Calc_randomizeInt(6, 8);
                if ($this.$getScrollableWorld().$getDifficulty() < 2.0)
                    $imageNum = Calc_randomizeInt(6, 7);
                if (var$5 <= ($this.$getImageWidth(6) - (2 * $this.$getMarginWidth(6) | 0) | 0))
                    break;
                $imageWidth = $imageWidth + ($this.$getImageWidth($imageNum) - (2 * $this.$getMarginWidth($imageNum) | 0) | 0) | 0;
                $imageNums.$add0(jl_Integer_valueOf($imageNum));
                if ($this.$getImageOffset($imageNum) > $tempDisplacement)
                    $tempDisplacement = $this.$getImageOffset($imageNum);
            }
            var$15 = Calc_randomizeDouble(($this.$getImageWidth(1) + $this.$getImageWidth(4) | 0) + 1 | 0, $this.$getImageWidth(6) - (2 * $this.$getMarginWidth(6) | 0) | 0) | 0;
            $ptr = 7;
            continue main;
        }
        if ($buildingLength <= ($this.$getImageWidth(1) + $this.$getImageWidth(4) | 0)) {
            $image = new g_GreenfootImage;
            var$10 = $rt_s(218);
            $ptr = 1;
            continue main;
        }
        $numBuildings = (($buildingLength - $this.$getImageWidth(1) | 0) - $this.$getImageWidth(4) | 0) / $this.$getImageWidth(3) | 0;
        $imageWidth = ($this.$getImageWidth(1) + $this.$getImageWidth(4) | 0) + $rt_imul($numBuildings, $this.$getImageWidth(3)) | 0;
        $image = g_GreenfootImage__init_0($imageWidth, BuildingImage_BASE_IMAGE_HEIGHT);
        var$10 = new g_GreenfootImage;
        var$15 = Calc_randomizeInt(4, 5);
        var$14 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append0(var$14, $rt_s(216)), var$15), $rt_s(217));
        var$14 = jl_StringBuilder_toString(var$14);
        $ptr = 2;
        continue main;
    case 1:
        g_GreenfootImage__init_($image, var$10);
        if ($rt_suspending()) {
            break main;
        }
        $imageWidth = $this.$getImageWidth(9) - (2 * $this.$getMarginWidth(9) | 0) | 0;
        var$17 =  -$this.$getImageOffset(9);
        var$18 = $buildingLength;
        var$17 = var$17 * var$18;
        var$19 = $imageWidth;
        $this.$displacement = var$17 / var$19 | 0;
        var$17 = var$18 / var$19;
        $this.$height3 = var$17 * $image.$getHeight() | 0;
        $buildingLength = var$18 + var$17 * 2.0 * $this.$getMarginWidth(9) | 0;
        $image.$scale($buildingLength, $this.$height3);
        return $image;
    case 2:
        g_GreenfootImage__init_(var$10, var$14);
        if ($rt_suspending()) {
            break main;
        }
        $image.$drawImage(var$10, $imageWidth - $this.$getImageWidth(4) | 0, 0);
        $i = 1;
        if ($i < ($numBuildings + 1 | 0)) {
            var$10 = new g_GreenfootImage;
            var$14 = $rt_s(219);
            $ptr = 4;
            continue main;
        }
        var$10 = new g_GreenfootImage;
        var$15 = Calc_randomizeInt(1, 2);
        var$14 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append0(var$14, $rt_s(216)), var$15), $rt_s(217));
        var$14 = jl_StringBuilder_toString(var$14);
        $ptr = 3;
    case 3:
        g_GreenfootImage__init_(var$10, var$14);
        if ($rt_suspending()) {
            break main;
        }
        $image.$drawImage(var$10, 0, 0);
        var$17 = $buildingLength / $imageWidth;
        $this.$displacement = var$17 * (-5.0) | 0;
        $this.$height3 = var$17 * BuildingImage_BASE_IMAGE_HEIGHT | 0;
        $image.$scale($buildingLength, $this.$height3);
        return $image;
    case 4:
        g_GreenfootImage__init_(var$10, var$14);
        if ($rt_suspending()) {
            break main;
        }
        $image.$drawImage(var$10, ($imageWidth - $this.$getImageWidth(4) | 0) - $rt_imul($i, $this.$getImageWidth(3)) | 0, 0);
        $i = $i + 1 | 0;
        if ($i < ($numBuildings + 1 | 0)) {
            var$10 = new g_GreenfootImage;
            var$14 = $rt_s(219);
            continue main;
        }
        var$10 = new g_GreenfootImage;
        var$15 = Calc_randomizeInt(1, 2);
        var$14 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append0(var$14, $rt_s(216)), var$15), $rt_s(217));
        var$14 = jl_StringBuilder_toString(var$14);
        $ptr = 3;
        continue main;
    case 5:
        $tmp = $this.$getBuildingImage($imageNum);
        if ($rt_suspending()) {
            break main;
        }
        $individualImage = $tmp;
        $paintX = $paintX - $individualImage.$getWidth() | 0;
        $image.$drawImage($individualImage, $paintX - $this.$getMarginWidth($imageNum) | 0, $tempDisplacement - $this.$getImageOffset($imageNum) | 0);
        if ($imageNum == 8) {
            $scalingFactor = $buildingLength / $imageWidth;
            $bumpX = ($paintX - $this.$getMarginWidth($imageNums.$get0($imageNums.$size() - 1 | 0).$intValue()) | 0) - $this.$getMarginWidth(8) | 0;
            var$14 = $this.$building;
            var$17 = ($bumpX + 130 | 0) * $scalingFactor;
            var$15 = 155.0 * $scalingFactor | 0;
            var$8 = 50.0 * $scalingFactor | 0;
            $ptr = 8;
            continue main;
        }
        if (!var$10.$hasNext()) {
            $scalingFactor = $buildingLength / $imageWidth;
            $this.$height3 = $scalingFactor * (BuildingImage_BASE_IMAGE_HEIGHT + $tempDisplacement | 0) | 0;
            $this.$displacement = $scalingFactor * ((-5) - $tempDisplacement | 0) | 0;
            $buildingLength = $buildingLength + ($marginWidth * $scalingFactor | 0) | 0;
            $this.$shift = ($this.$getMarginWidth($imageNums.$get0(0).$intValue()) - $this.$getMarginWidth($imageNums.$get0($imageNums.$size() - 1 | 0).$intValue()) | 0) * $scalingFactor / 2.0 | 0;
            $image.$scale($buildingLength, $this.$height3);
            return $image;
        }
        $imageNum = var$10.$next().$intValue();
        if (!$this.$getImageWidth($imageNum)) {
            continue main;
        }
        $individualImage = new g_GreenfootImage;
        var$14 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append0(var$14, $rt_s(216)), $imageNum), $rt_s(217));
        var$14 = jl_StringBuilder_toString(var$14);
        $ptr = 6;
    case 6:
        g_GreenfootImage__init_($individualImage, var$14);
        if ($rt_suspending()) {
            break main;
        }
        $paintX = $paintX - ($this.$getImageWidth($imageNum) - (2 * $this.$getMarginWidth($imageNum) | 0) | 0) | 0;
        $image.$drawImage($individualImage, $paintX - $this.$getMarginWidth($imageNum) | 0, $tempDisplacement - $this.$getImageOffset($imageNum) | 0);
        if ($imageNum == 8) {
            $scalingFactor = $buildingLength / $imageWidth;
            $bumpX = ($paintX - $this.$getMarginWidth($imageNums.$get0($imageNums.$size() - 1 | 0).$intValue()) | 0) - $this.$getMarginWidth(8) | 0;
            var$14 = $this.$building;
            var$17 = ($bumpX + 130 | 0) * $scalingFactor;
            var$15 = 155.0 * $scalingFactor | 0;
            var$8 = 50.0 * $scalingFactor | 0;
            $ptr = 8;
            continue main;
        }
        if (!var$10.$hasNext()) {
            $scalingFactor = $buildingLength / $imageWidth;
            $this.$height3 = $scalingFactor * (BuildingImage_BASE_IMAGE_HEIGHT + $tempDisplacement | 0) | 0;
            $this.$displacement = $scalingFactor * ((-5) - $tempDisplacement | 0) | 0;
            $buildingLength = $buildingLength + ($marginWidth * $scalingFactor | 0) | 0;
            $this.$shift = ($this.$getMarginWidth($imageNums.$get0(0).$intValue()) - $this.$getMarginWidth($imageNums.$get0($imageNums.$size() - 1 | 0).$intValue()) | 0) * $scalingFactor / 2.0 | 0;
            $image.$scale($buildingLength, $this.$height3);
            return $image;
        }
        $imageNum = var$10.$next().$intValue();
        if (!$this.$getImageWidth($imageNum)) {
            $ptr = 5;
            continue main;
        }
        $individualImage = new g_GreenfootImage;
        var$14 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append0(var$14, $rt_s(216)), $imageNum), $rt_s(217));
        var$14 = jl_StringBuilder_toString(var$14);
        continue main;
    case 7:
        $tmp = $this.$getBuildingImage(var$15);
        if ($rt_suspending()) {
            break main;
        }
        var$10 = $tmp;
        $tempWidth = var$10.$getWidth();
        $imageWidth = $imageWidth + $tempWidth | 0;
        $imageNums.$add0(jl_Integer_valueOf($tempWidth));
        while (true) {
            var$5 = $buildingLength - $imageWidth | 0;
            if (var$5 <= ($this.$getImageWidth(1) + $this.$getImageWidth(4) | 0)) {
                ju_Collections_shuffle($imageNums);
                $marginWidth = $this.$getMarginWidth($imageNums.$get0(0).$intValue()) + $this.$getMarginWidth($imageNums.$get0($imageNums.$size() - 1 | 0).$intValue()) | 0;
                $image = new g_GreenfootImage;
                var$8 = $imageWidth + $marginWidth | 0;
                g_GreenfootImage__init_3($image, var$8, BuildingImage_BASE_IMAGE_HEIGHT + $tempDisplacement | 0);
                $paintX = var$8 - $this.$getMarginWidth($imageNums.$get0(0).$intValue()) | 0;
                var$10 = $imageNums.$iterator();
                if (!var$10.$hasNext()) {
                    $scalingFactor = $buildingLength / $imageWidth;
                    $this.$height3 = $scalingFactor * (BuildingImage_BASE_IMAGE_HEIGHT + $tempDisplacement | 0) | 0;
                    $this.$displacement = $scalingFactor * ((-5) - $tempDisplacement | 0) | 0;
                    $buildingLength = $buildingLength + ($marginWidth * $scalingFactor | 0) | 0;
                    $this.$shift = ($this.$getMarginWidth($imageNums.$get0(0).$intValue()) - $this.$getMarginWidth($imageNums.$get0($imageNums.$size() - 1 | 0).$intValue()) | 0) * $scalingFactor / 2.0 | 0;
                    $image.$scale($buildingLength, $this.$height3);
                    return $image;
                }
                $imageNum = var$10.$next().$intValue();
                if (!$this.$getImageWidth($imageNum)) {
                    $ptr = 5;
                    continue main;
                }
                $individualImage = new g_GreenfootImage;
                var$14 = jl_StringBuilder__init_();
                jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append0(var$14, $rt_s(216)), $imageNum), $rt_s(217));
                var$14 = jl_StringBuilder_toString(var$14);
                $ptr = 6;
                continue main;
            }
            $imageNum = Calc_randomizeInt(6, 8);
            if ($this.$getScrollableWorld().$getDifficulty() < 2.0)
                $imageNum = Calc_randomizeInt(6, 7);
            if (var$5 <= ($this.$getImageWidth(6) - (2 * $this.$getMarginWidth(6) | 0) | 0))
                break;
            $imageWidth = $imageWidth + ($this.$getImageWidth($imageNum) - (2 * $this.$getMarginWidth($imageNum) | 0) | 0) | 0;
            $imageNums.$add0(jl_Integer_valueOf($imageNum));
            if ($this.$getImageOffset($imageNum) <= $tempDisplacement)
                continue;
            $tempDisplacement = $this.$getImageOffset($imageNum);
        }
        var$15 = Calc_randomizeDouble(($this.$getImageWidth(1) + $this.$getImageWidth(4) | 0) + 1 | 0, $this.$getImageWidth(6) - (2 * $this.$getMarginWidth(6) | 0) | 0) | 0;
        continue main;
    case 8:
        var$14.$createBump(var$17, var$15, var$8);
        if ($rt_suspending()) {
            break main;
        }
        var$14 = $this.$building;
        var$17 = ($bumpX + 360 | 0) * $scalingFactor;
        var$15 = 300.0 * $scalingFactor | 0;
        var$8 = 130.0 * $scalingFactor | 0;
        $ptr = 9;
    case 9:
        var$14.$createBump(var$17, var$15, var$8);
        if ($rt_suspending()) {
            break main;
        }
        if (!var$10.$hasNext()) {
            $scalingFactor = $buildingLength / $imageWidth;
            $this.$height3 = $scalingFactor * (BuildingImage_BASE_IMAGE_HEIGHT + $tempDisplacement | 0) | 0;
            $this.$displacement = $scalingFactor * ((-5) - $tempDisplacement | 0) | 0;
            $buildingLength = $buildingLength + ($marginWidth * $scalingFactor | 0) | 0;
            $this.$shift = ($this.$getMarginWidth($imageNums.$get0(0).$intValue()) - $this.$getMarginWidth($imageNums.$get0($imageNums.$size() - 1 | 0).$intValue()) | 0) * $scalingFactor / 2.0 | 0;
            $image.$scale($buildingLength, $this.$height3);
            return $image;
        }
        $imageNum = var$10.$next().$intValue();
        if (!$this.$getImageWidth($imageNum)) {
            $ptr = 5;
            continue main;
        }
        $individualImage = new g_GreenfootImage;
        var$14 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append0(var$14, $rt_s(216)), $imageNum), $rt_s(217));
        var$14 = jl_StringBuilder_toString(var$14);
        $ptr = 6;
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $buildingLength, $imageNums, $imageWidth, $tempDisplacement, var$5, $marginWidth, $image, var$8, $paintX, var$10, $scalingFactor, $imageNum, $individualImage, var$14, var$15, $numBuildings, var$17, var$18, var$19, $i, $bumpX, $tempWidth, $ptr);
}
function BuildingImage_getMarginWidth($this, $buildingNum) {
    if ($buildingNum == 6)
        return 120;
    if ($buildingNum == 7)
        return 145;
    if ($buildingNum == 8)
        return 85;
    if ($buildingNum != 9)
        return 0;
    return 486;
}
function BuildingImage_getImageOffset($this, $buildingNum) {
    if ($buildingNum == 6)
        return 10;
    if ($buildingNum == 7)
        return 192;
    if ($buildingNum == 8)
        return 151;
    if ($buildingNum != 9)
        return 0;
    return 800;
}
function BuildingImage_getImageWidth($this, $buildingNum) {
    if ($buildingNum != 1 && $buildingNum != 2) {
        if ($buildingNum != 4 && $buildingNum != 5) {
            if ($buildingNum == 3)
                return 79;
            if ($buildingNum == 6)
                return 630;
            if ($buildingNum == 7)
                return 759;
            if ($buildingNum == 8)
                return 679;
            if ($buildingNum != 9)
                return 0;
            return 1200;
        }
        return 85;
    }
    return 83;
}
function BuildingImage__clinit_() {
    BuildingImage_BASE_IMAGE_HEIGHT = 360;
}
function jl_Thread$SleepHandler$interrupted$lambda$_1_0() {
    jl_Object.call(this);
    this.$_015 = null;
}
function jl_Thread$SleepHandler$interrupted$lambda$_1_0__init_(var_0) {
    var var_1 = new jl_Thread$SleepHandler$interrupted$lambda$_1_0();
    jl_Thread$SleepHandler$interrupted$lambda$_1_0__init_0(var_1, var_0);
    return var_1;
}
function jl_Thread$SleepHandler$interrupted$lambda$_1_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_015 = var$1;
}
function jl_Thread$SleepHandler$interrupted$lambda$_1_0_run(var$0) {
    jl_Thread$SleepHandler_lambda$interrupted$1(var$0.$_015);
}
function Instructions() {
    var a = this; Button.call(a);
    a.$city3 = null;
    a.$playButton0 = null;
    a.$isOpen = 0;
}
function Instructions__init_0(var_0, var_1) {
    var var_2 = new Instructions();
    Instructions__init_(var_2, var_0, var_1);
    return var_2;
}
function Instructions__init_($this, $city, $playButton) {
    var var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();$playButton = $thread.pop();$city = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Button__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$isOpen = 0;
        $this.$city3 = $city;
        $this.$playButton0 = $playButton;
        var$3 = $rt_s(220);
        $ptr = 2;
    case 2:
        $this.$setImage1(var$3);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $city, $playButton, var$3, $ptr);
}
function Instructions_act($this) {
    var var$1, var$2, var$3, var$4, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (!g_Greenfoot_mousePressed($this))
            return;
        SoundManager_playSound($rt_s(17), 100);
        if (!$this.$isOpen) {
            $this.$setLocation(480, 300);
            var$1 = $rt_s(221);
            $ptr = 1;
            continue main;
        }
        $this.$setLocation(910, 190);
        var$1 = $rt_s(220);
        $ptr = 2;
        continue main;
    case 1:
        $this.$setImage1(var$1);
        if ($rt_suspending()) {
            break main;
        }
        $this.$getWorld().$removeObject($this.$playButton0);
        $this.$isOpen = $this.$isOpen ? 0 : 1;
        return;
    case 2:
        $this.$setImage1(var$1);
        if ($rt_suspending()) {
            break main;
        }
        $this.$playButton0.$setCooldown(10);
        var$1 = $this.$getWorld();
        var$2 = $this.$playButton0;
        var$3 = 480;
        var$4 = 300;
        $ptr = 3;
    case 3:
        var$1.$addObject(var$2, var$3, var$4);
        if ($rt_suspending()) {
            break main;
        }
        $this.$isOpen = $this.$isOpen ? 0 : 1;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, var$3, var$4, $ptr);
}
function g_ActorVisitor() {
    jl_Object.call(this);
}
function g_ActorVisitor__init_0() {
    var var_0 = new g_ActorVisitor();
    g_ActorVisitor__init_(var_0);
    return var_0;
}
function g_ActorVisitor__init_($this) {
    jl_Object__init_0($this);
}
function g_ActorVisitor_initialise() {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        g_Actor_initialise();
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($ptr);
}
function g_ActorVisitor_getX($actor) {
    return $actor.$x;
}
function g_ActorVisitor_getY($actor) {
    return $actor.$y;
}
function g_ActorVisitor_getRotation($actor) {
    return $actor.$rotation;
}
function g_ActorVisitor_getWorld($actor) {
    return $actor.$world;
}
function g_ActorVisitor_getBoundingRect($actor) {
    return $actor.$getBoundingRect();
}
function g_ActorVisitor_setData($actor, $n) {
    $actor.$setData0($n);
}
function g_ActorVisitor_getData($actor) {
    return $actor.$getData0();
}
function g_ActorVisitor_getDisplayImage($actor) {
    return $actor.$getImage1();
}
function g_ActorVisitor_setDelegate($instance) {
    g_Actor_setDelegate($instance);
}
function g_ActorVisitor_getSequenceNumber($actor) {
    return g_Actor_getSequenceNumber($actor);
}
function g_ActorVisitor_getLastPaintSeqNum($actor) {
    return g_Actor_getLastPaintSeqNum($actor);
}
function g_ActorVisitor_setLastPaintSeqNum($actor, $num) {
    g_Actor_setLastPaintSeqNum($actor, $num);
}
function otc_ResourceSource() {
    jl_Object.call(this);
}
var otc_ResourceSource_resourceSource = null;
function otc_ResourceSource__init_() {
    var var_0 = new otc_ResourceSource();
    otc_ResourceSource__init_0(var_0);
    return var_0;
}
function otc_ResourceSource__init_0($this) {
    jl_Object__init_0($this);
}
function otc_ResourceSource_setSource($source) {
    otc_ResourceSource_resourceSource = $source;
}
function ju_Dictionary() {
    jl_Object.call(this);
}
function ju_Dictionary__init_() {
    var var_0 = new ju_Dictionary();
    ju_Dictionary__init_0(var_0);
    return var_0;
}
function ju_Dictionary__init_0($this) {
    jl_Object__init_0($this);
}
function ggim_MouseEventData() {
    var a = this; jl_Object.call(a);
    a.$mouseInfo = null;
    a.$mouseDragEndedInfo = null;
    a.$mouseClickedInfo = null;
    a.$mousePressedInfo = null;
    a.$mouseDraggedInfo = null;
    a.$mouseMovedInfo = null;
}
function ggim_MouseEventData__init_0() {
    var var_0 = new ggim_MouseEventData();
    ggim_MouseEventData__init_(var_0);
    return var_0;
}
function ggim_MouseEventData__init_($this) {
    jl_Object__init_0($this);
}
function ggim_MouseEventData_init($this) {
    var $blankedMouseInfo;
    $this.$mousePressedInfo = null;
    $this.$mouseClickedInfo = null;
    $this.$mouseDraggedInfo = null;
    $this.$mouseDragEndedInfo = null;
    $this.$mouseMovedInfo = null;
    if ($this.$mouseInfo !== null) {
        $blankedMouseInfo = g_MouseInfoVisitor_newMouseInfo();
        g_MouseInfoVisitor_setLoc($blankedMouseInfo, $this.$mouseInfo.$getX(), $this.$mouseInfo.$getY());
        $this.$mouseInfo = $blankedMouseInfo;
    }
}
function ggim_MouseEventData_getMouseInfo($this) {
    return $this.$mouseInfo;
}
function ggim_MouseEventData_isMousePressed($this, $obj) {
    return ggim_MouseEventData_checkObject($this, $obj, $this.$mousePressedInfo);
}
function ggim_MouseEventData_mousePressed($this, $x, $y, $button, $actor) {
    $this.$init();
    $this.$mousePressedInfo = g_MouseInfoVisitor_newMouseInfo();
    $this.$mouseInfo = $this.$mousePressedInfo;
    g_MouseInfoVisitor_setButton($this.$mouseInfo, $button);
    g_MouseInfoVisitor_setLoc($this.$mouseInfo, $x, $y);
    g_MouseInfoVisitor_setActor($this.$mouseInfo, $actor);
}
function ggim_MouseEventData_isMouseClicked($this, $obj) {
    if ($obj !== null && $this.$isMousePressed(null) && !$this.$isMousePressed($obj))
        return 0;
    return ggim_MouseEventData_checkObject($this, $obj, $this.$mouseClickedInfo);
}
function ggim_MouseEventData_mouseClicked($this, $x, $y, $button, $clickCount, $actor) {
    var $tempPressedInfo;
    $tempPressedInfo = $this.$mousePressedInfo;
    $this.$init();
    $this.$mousePressedInfo = $tempPressedInfo;
    $this.$mouseClickedInfo = g_MouseInfoVisitor_newMouseInfo();
    $this.$mouseInfo = $this.$mouseClickedInfo;
    g_MouseInfoVisitor_setButton($this.$mouseInfo, $button);
    g_MouseInfoVisitor_setLoc($this.$mouseInfo, $x, $y);
    g_MouseInfoVisitor_setActor($this.$mouseInfo, $actor);
    g_MouseInfoVisitor_setClickCount($this.$mouseInfo, $clickCount);
}
function ggim_MouseEventData_isMouseDragged($this, $obj) {
    return ggim_MouseEventData_checkObject($this, $obj, $this.$mouseDraggedInfo);
}
function ggim_MouseEventData_mouseDragged($this, $x, $y, $button, $actor) {
    $this.$init();
    $this.$mouseDraggedInfo = g_MouseInfoVisitor_newMouseInfo();
    $this.$mouseInfo = $this.$mouseDraggedInfo;
    g_MouseInfoVisitor_setButton($this.$mouseInfo, $button);
    g_MouseInfoVisitor_setLoc($this.$mouseInfo, $x, $y);
    g_MouseInfoVisitor_setActor($this.$mouseInfo, $actor);
}
function ggim_MouseEventData_isMouseDragEnded($this, $obj) {
    return ggim_MouseEventData_checkObject($this, $obj, $this.$mouseDragEndedInfo);
}
function ggim_MouseEventData_mouseDragEnded($this, $x, $y, $button, $actor) {
    var $tempPressedInfo, $tempClickedInfo;
    $tempPressedInfo = $this.$mousePressedInfo;
    $tempClickedInfo = $this.$mouseClickedInfo;
    $this.$init();
    $this.$mousePressedInfo = $tempPressedInfo;
    $this.$mouseClickedInfo = $tempClickedInfo;
    $this.$mouseDragEndedInfo = g_MouseInfoVisitor_newMouseInfo();
    $this.$mouseInfo = $this.$mouseDragEndedInfo;
    g_MouseInfoVisitor_setButton($this.$mouseInfo, $button);
    g_MouseInfoVisitor_setLoc($this.$mouseInfo, $x, $y);
    g_MouseInfoVisitor_setActor($this.$mouseInfo, $actor);
}
function ggim_MouseEventData_mouseExited($this) {
    $this.$mouseInfo = $this.$mouseDraggedInfo;
    $this.$mouseMovedInfo = null;
}
function ggim_MouseEventData_isMouseMoved($this, $obj) {
    return ggim_MouseEventData_checkObject($this, $obj, $this.$mouseMovedInfo);
}
function ggim_MouseEventData_mouseMoved($this, $x, $y, $button, $actor) {
    $this.$init();
    $this.$mouseMovedInfo = g_MouseInfoVisitor_newMouseInfo();
    $this.$mouseInfo = $this.$mouseMovedInfo;
    g_MouseInfoVisitor_setButton($this.$mouseInfo, $button);
    g_MouseInfoVisitor_setLoc($this.$mouseInfo, $x, $y);
    g_MouseInfoVisitor_setActor($this.$mouseInfo, $actor);
}
function ggim_MouseEventData_getActor($this) {
    if ($this.$mouseInfo === null)
        return null;
    return $this.$mouseInfo.$getActor();
}
function ggim_MouseEventData_getButton($this) {
    if ($this.$mouseInfo === null)
        return 0;
    return $this.$mouseInfo.$getButton();
}
function ggim_MouseEventData_checkObject($this, $obj, $info) {
    var $actor;
    if ($info === null)
        return 0;
    $actor = $info.$getActor();
    return $obj !== null && !($obj instanceof g_World && $actor === null) && $actor !== $obj ? 0 : 1;
}
function ju_HashMap$1() {
    ju_AbstractSet.call(this);
    this.$this$08 = null;
}
function ju_HashMap$1__init_(var_0) {
    var var_1 = new ju_HashMap$1();
    ju_HashMap$1__init_0(var_1, var_0);
    return var_1;
}
function ju_HashMap$1__init_0($this, $this$0) {
    $this.$this$08 = $this$0;
    ju_AbstractSet__init_0($this);
}
function ju_HashMap$1_iterator($this) {
    return ju_HashMap$KeyIterator__init_($this.$this$08);
}
function jl_Double() {
    jl_Number.call(this);
}
var jl_Double_NaN = 0.0;
var jl_Double_TYPE = null;
function jl_Double_$callClinit() {
    jl_Double_$callClinit = $rt_eraseClinit(jl_Double);
    jl_Double__clinit_();
}
function jl_Double_parseDouble($string) {
    var var$2, $negative, $index, $c, $mantissa, $exp, $hasOneDigit, var$9, var$10, $negativeExp, $numExp, var$13;
    jl_Double_$callClinit();
    var$2 = $string.$trim();
    $negative = 0;
    $index = 0;
    if (var$2.$charAt($index) == 45) {
        $index = 1;
        $negative = 1;
    } else if (var$2.$charAt($index) == 43)
        $index = 1;
    a: {
        $c = var$2.$charAt($index);
        $mantissa = Long_ZERO;
        $exp = 0;
        $hasOneDigit = 0;
        if ($c != 46) {
            $hasOneDigit = 1;
            if ($c >= 48 && $c <= 57) {
                while (true) {
                    if (var$2.$charAt($index) != 48) {
                        while ($index < var$2.$length()) {
                            var$9 = var$2.$charAt($index);
                            if (var$9 < 48)
                                break a;
                            if (var$9 > 57)
                                break a;
                            if (Long_toNumber($mantissa) >= 1.0E17)
                                $exp = $exp + 1 | 0;
                            else
                                $mantissa = Long_add(Long_mul($mantissa, Long_fromInt(10)), Long_fromInt(var$9 - 48 | 0));
                            $index = $index + 1 | 0;
                        }
                        break a;
                    }
                    $index = $index + 1 | 0;
                    if ($index == var$2.$length())
                        break;
                }
                return 0.0;
            }
            $rt_throw(jl_NumberFormatException__init_());
        }
    }
    if ($index < var$2.$length() && var$2.$charAt($index) == 46) {
        $index = $index + 1 | 0;
        b: {
            while (true) {
                if ($index >= var$2.$length())
                    break b;
                var$10 = var$2.$charAt($index);
                if (var$10 < 48)
                    break b;
                if (var$10 > 57)
                    break;
                if (Long_toNumber($mantissa) < 1.0E17) {
                    $mantissa = Long_add(Long_mul($mantissa, Long_fromInt(10)), Long_fromInt(var$10 - 48 | 0));
                    $exp = $exp + (-1) | 0;
                }
                $index = $index + 1 | 0;
                $hasOneDigit = 1;
            }
        }
        if (!$hasOneDigit)
            $rt_throw(jl_NumberFormatException__init_());
    }
    if ($index < var$2.$length()) {
        var$9 = var$2.$charAt($index);
        if (var$9 != 101 && var$9 != 69)
            $rt_throw(jl_NumberFormatException__init_());
        var$9 = $index + 1 | 0;
        $negativeExp = 0;
        if (var$2.$charAt(var$9) == 45) {
            var$9 = var$9 + 1 | 0;
            $negativeExp = 1;
        } else if (var$2.$charAt(var$9) == 43)
            var$9 = var$9 + 1 | 0;
        $numExp = 0;
        var$10 = 0;
        c: {
            while (true) {
                if (var$9 >= var$2.$length())
                    break c;
                var$13 = var$2.$charAt(var$9);
                if (var$13 < 48)
                    break c;
                if (var$13 > 57)
                    break;
                $numExp = (10 * $numExp | 0) + (var$13 - 48 | 0) | 0;
                var$10 = 1;
                var$9 = var$9 + 1 | 0;
            }
        }
        if (!var$10)
            $rt_throw(jl_NumberFormatException__init_());
        if ($negativeExp)
            $numExp =  -$numExp;
        $exp = $exp + $numExp | 0;
    }
    d: {
        if ($exp <= 308) {
            if ($exp != 308)
                break d;
            if (Long_le($mantissa, new Long(2133831477, 4185580)))
                break d;
        }
        return $negative ? (-Infinity) : Infinity;
    }
    if ($negative)
        $mantissa = Long_neg($mantissa);
    return Long_toNumber($mantissa) * jl_Double_decimalExponent($exp);
}
function jl_Double_decimalExponent($n) {
    var $d, $result;
    jl_Double_$callClinit();
    if ($n >= 0)
        $d = 10.0;
    else {
        $d = 0.1;
        $n =  -$n;
    }
    $result = 1.0;
    while ($n) {
        if ($n % 2 | 0)
            $result = $result * $d;
        $d = $d * $d;
        $n = $n / 2 | 0;
    }
    return $result;
}
function jl_Double__clinit_() {
    jl_Double_NaN = NaN;
    jl_Double_TYPE = $rt_cls($rt_doublecls());
}
function g_ActorSet$ListNode() {
    var a = this; jl_Object.call(a);
    a.$actor0 = null;
    a.$next3 = null;
    a.$prev0 = null;
    a.$nextHash = null;
    a.$prevHash = null;
    a.$this$09 = null;
}
function g_ActorSet$ListNode__init_(var_0) {
    var var_1 = new g_ActorSet$ListNode();
    g_ActorSet$ListNode__init_0(var_1, var_0);
    return var_1;
}
function g_ActorSet$ListNode__init_1(var_0, var_1, var_2) {
    var var_3 = new g_ActorSet$ListNode();
    g_ActorSet$ListNode__init_2(var_3, var_0, var_1, var_2);
    return var_3;
}
function g_ActorSet$ListNode__init_0($this, var$1) {
    $this.$this$09 = var$1;
    jl_Object__init_0($this);
    $this.$next3 = $this;
    $this.$prev0 = $this;
}
function g_ActorSet$ListNode__init_2($this, var$1, $actor, $listTail) {
    $this.$this$09 = var$1;
    jl_Object__init_0($this);
    $this.$actor0 = $actor;
    $this.$next3 = $listTail.$next3;
    $this.$prev0 = $listTail;
    $listTail.$next3 = $this;
    $this.$next3.$prev0 = $this;
}
function g_ActorSet$ListNode_setHashListHead($this, $oldHead) {
    if ($oldHead === null) {
        $this.$nextHash = $this;
        $this.$prevHash = $this;
    } else {
        $this.$nextHash = $oldHead;
        $this.$prevHash = $oldHead.$prevHash;
        $oldHead.$prevHash = $this;
        $this.$prevHash.$nextHash = $this;
    }
}
function g_ActorSet$ListNode_remove($this) {
    $this.$next3.$prev0 = $this.$prev0;
    $this.$prev0.$next3 = $this.$next3;
    $this.$nextHash.$prevHash = $this.$prevHash;
    $this.$prevHash.$nextHash = $this.$nextHash;
}
function otjde_FocusEventTarget() {
}
function otjde_MouseEventTarget() {
}
function otjde_MouseEventTarget_listenClick$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(196);
    $this.addEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_neglectClick$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(196);
    $this.removeEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_listenDoubleClick$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(205);
    $this.addEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_neglectDoubleClick$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(205);
    $this.removeEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_listenMouseDown$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(197);
    $this.addEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_neglectMouseDown$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(197);
    $this.removeEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_listenMouseUp$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(198);
    $this.addEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_neglectMouseUp$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(198);
    $this.removeEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_listenMouseEnter$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(206);
    $this.addEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_neglectMouseEnter$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(206);
    $this.removeEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_listenMouseLeaeve$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(207);
    $this.addEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjde_MouseEventTarget_neglectMouseLeave$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(207);
    $this.removeEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjde_KeyboardEventTarget() {
}
function otjde_KeyboardEventTarget_listenKeyDown$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(222);
    $this.addEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjde_KeyboardEventTarget_listenKeyUp$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(223);
    $this.addEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjde_KeyboardEventTarget_listenKeyPress$static($this, $listener) {
    var var$3;
    var$3 = $rt_s(224);
    $this.addEventListener($rt_ustr(var$3), otji_JS_function($listener, "handleEvent"));
}
function otjb_WindowEventTarget() {
}
function ge_SimulationEvent() {
    jl_Object.call(this);
    this.$type = 0;
}
function ge_SimulationEvent__init_(var_0, var_1) {
    var var_2 = new ge_SimulationEvent();
    ge_SimulationEvent__init_0(var_2, var_0, var_1);
    return var_2;
}
function ge_SimulationEvent__init_0($this, $source, $type) {
    jl_Object__init_0($this);
    $this.$type = $type;
}
function ge_SimulationEvent_getType($this) {
    return $this.$type;
}
function ju_RandomAccess() {
}
function ju_ArrayList() {
    var a = this; ju_AbstractList.call(a);
    a.$array1 = null;
    a.$size2 = 0;
}
function ju_ArrayList__init_() {
    var var_0 = new ju_ArrayList();
    ju_ArrayList__init_1(var_0);
    return var_0;
}
function ju_ArrayList__init_2(var_0) {
    var var_1 = new ju_ArrayList();
    ju_ArrayList__init_3(var_1, var_0);
    return var_1;
}
function ju_ArrayList__init_0(var_0) {
    var var_1 = new ju_ArrayList();
    ju_ArrayList__init_4(var_1, var_0);
    return var_1;
}
function ju_ArrayList__init_1($this) {
    ju_ArrayList__init_3($this, 10);
}
function ju_ArrayList__init_3($this, $initialCapacity) {
    ju_AbstractList__init_0($this);
    $this.$array1 = $rt_createArray(jl_Object, $initialCapacity);
}
function ju_ArrayList__init_4($this, $c) {
    var $iter, $i;
    ju_ArrayList__init_3($this, $c.$size());
    $iter = $c.$iterator();
    $i = 0;
    while ($i < $this.$array1.data.length) {
        $this.$array1.data[$i] = $iter.$next();
        $i = $i + 1 | 0;
    }
    $this.$size2 = $this.$array1.data.length;
}
function ju_ArrayList_ensureCapacity($this, $minCapacity) {
    var $newLength, var$3, var$4;
    if ($this.$array1.data.length < $minCapacity) {
        if ($this.$array1.data.length >= 1073741823)
            $newLength = 2147483647;
        else {
            var$3 = $this.$array1.data.length * 2 | 0;
            var$4 = 5;
            $newLength = jl_Math_max($minCapacity, jl_Math_max(var$3, var$4));
        }
        $this.$array1 = ju_Arrays_copyOf1($this.$array1, $newLength);
    }
}
function ju_ArrayList_get($this, $index) {
    ju_ArrayList_checkIndex($this, $index);
    return $this.$array1.data[$index];
}
function ju_ArrayList_size($this) {
    return $this.$size2;
}
function ju_ArrayList_clone($this) {
    return ju_ArrayList__init_0($this);
}
function ju_ArrayList_set($this, $index, $element) {
    var $old;
    ju_ArrayList_checkIndex($this, $index);
    $old = $this.$array1.data[$index];
    $this.$array1.data[$index] = $element;
    return $old;
}
function ju_ArrayList_add($this, $element) {
    var var$2, var$3;
    $this.$ensureCapacity($this.$size2 + 1 | 0);
    var$2 = $this.$array1.data;
    var$3 = $this.$size2;
    $this.$size2 = var$3 + 1 | 0;
    var$2[var$3] = $element;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    return 1;
}
function ju_ArrayList_remove($this, $i) {
    var $old;
    ju_ArrayList_checkIndex($this, $i);
    $old = $this.$array1.data[$i];
    $this.$size2 = $this.$size2 - 1 | 0;
    while ($i < $this.$size2) {
        $this.$array1.data[$i] = $this.$array1.data[$i + 1 | 0];
        $i = $i + 1 | 0;
    }
    $this.$array1.data[$this.$size2] = null;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    return $old;
}
function ju_ArrayList_remove0($this, $o) {
    var $index;
    $index = $this.$indexOf1($o);
    if ($index < 0)
        return 0;
    $this.$remove3($index);
    return 1;
}
function ju_ArrayList_clear($this) {
    ju_Arrays_fill($this.$array1, 0, $this.$size2, null);
    $this.$size2 = 0;
}
function ju_ArrayList_checkIndex($this, $index) {
    if ($index >= 0 && $index < $this.$size2)
        return;
    $rt_throw(jl_IndexOutOfBoundsException__init_());
}
function Slope() {
    var a = this; NonLiving.call(a);
    a.$width3 = 0;
    a.$height4 = 0;
    a.$imageNum = 0;
    a.$a0 = 0.0;
    a.$k = 0.0;
    a.$c = 0.0;
    a.$d = 0.0;
    a.$scaleFactor0 = 0.0;
}
function Slope__init_(var_0) {
    var var_1 = new Slope();
    Slope__init_0(var_1, var_0);
    return var_1;
}
function Slope__init_0($this, $width) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$width = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        NonLiving__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$width3 = $width;
        $this.$imageNum = Calc_randomizeInt(1, 3);
        if ($this.$imageNum == 1) {
            $this.$a0 = (-1.0);
            $this.$k = 0.038;
            $this.$c = 21.0;
            $this.$d = 135.0;
        } else if ($this.$imageNum != 2) {
            $this.$a0 = (-1.0);
            $this.$k = 0.035;
            $this.$c = 80.0;
            $this.$d = 260.0;
        } else {
            $this.$a0 = (-1.0);
            $this.$k = 0.027;
            $this.$c = 22.0;
            $this.$d = 144.0;
        }
        $ptr = 2;
    case 2:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $tmp;
        $this.$setImage(var$2);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $width, var$2, $ptr);
}
function Slope_resetImage($this) {
    var $image, var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$image = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $image = new g_GreenfootImage;
        var$2 = $this.$imageNum;
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append0(var$3, $rt_s(225)), var$2), $rt_s(217));
        var$3 = jl_StringBuilder_toString(var$3);
        $ptr = 1;
    case 1:
        g_GreenfootImage__init_($image, var$3);
        if ($rt_suspending()) {
            break main;
        }
        $this.$scaleFactor0 = $this.$width3 / $image.$getWidth();
        $this.$height4 = $this.$scaleFactor0 * $image.$getHeight() | 0;
        $image.$scale($this.$width3, $this.$height4);
        return $image;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $image, var$2, var$3, $ptr);
}
function Slope_distanceBelow($this, $x, $y) {
    var var$3, var$4, $calculatedY;
    var$3 = $x - ($this.$getExactX() - ($this.$width3 / 2 | 0));
    var$4 = $y - ($this.$getExactY() - ($this.$height4 / 2 | 0));
    var$3 = var$3 * 1.0 / $this.$scaleFactor0;
    var$4 = var$4 * 1.0 / $this.$scaleFactor0;
    $calculatedY = $this.$a0 * jl_Math_pow($this.$k * (var$3 - $this.$d), 2.0) + $this.$c;
    return var$4 - $calculatedY;
}
function Slope_getWidth($this) {
    return $this.$width3;
}
function otjb_StorageProvider() {
}
function otjc_JSArrayReader() {
}
function otjb_Window() {
    jl_Object.call(this);
}
function otjb_Window_addEventListener$exported$0(var$0, var$1, var$2) {
    var$0.$addEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function otjb_Window_removeEventListener$exported$1(var$0, var$1, var$2) {
    var$0.$removeEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function otjb_Window_get$exported$2(var$0, var$1) {
    return var$0.$get2(var$1);
}
function otjb_Window_removeEventListener$exported$3(var$0, var$1, var$2, var$3) {
    var$0.$removeEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
function otjb_Window_dispatchEvent$exported$4(var$0, var$1) {
    return !!var$0.$dispatchEvent(var$1);
}
function otjb_Window_getLength$exported$5(var$0) {
    return var$0.$getLength0();
}
function otjb_Window_addEventListener$exported$6(var$0, var$1, var$2, var$3) {
    var$0.$addEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
function jl_IllegalMonitorStateException() {
    jl_RuntimeException.call(this);
}
function jl_IllegalMonitorStateException__init_() {
    var var_0 = new jl_IllegalMonitorStateException();
    jl_IllegalMonitorStateException__init_0(var_0);
    return var_0;
}
function jl_IllegalMonitorStateException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function ScrollableWorld() {
    var a = this; g_Actor.call(a);
    a.$actorMap = null;
    a.$cameraTarget = null;
    a.$offsetX = 0.0;
    a.$offsetY = 0.0;
    a.$width4 = 0;
    a.$height5 = 0;
    a.$x2 = 0.0;
    a.$y2 = 0.0;
    a.$zoom = 0.0;
    a.$idealZoom = 0.0;
    a.$zoomChange = 0.0;
    a.$zoomChangeDivisor = 0.0;
    a.$distanceChangeDivisor = 0.0;
    a.$startX = 0.0;
    a.$startY = 0.0;
    a.$minZoom = 0.0;
    a.$scrollableActorList = null;
    a.$addQueue = null;
    a.$removeQueue = null;
    a.$chunkUpdateQueue = null;
    a.$chunks = null;
    a.$smoothZoom = 0;
    a.$upPressed = 0;
    a.$downPressed = 0;
    a.$mouseDown = 0;
    a.$disableControls = 0;
    a.$useChunks = 0;
    a.$mouseInfo0 = null;
}
function ScrollableWorld__init_(var_0, var_1, var_2, var_3, var_4, var_5, var_6) {
    var var_7 = new ScrollableWorld();
    ScrollableWorld__init_0(var_7, var_0, var_1, var_2, var_3, var_4, var_5, var_6);
    return var_7;
}
function ScrollableWorld__init_1(var_0, var_1, var_2) {
    var var_3 = new ScrollableWorld();
    ScrollableWorld__init_2(var_3, var_0, var_1, var_2);
    return var_3;
}
function ScrollableWorld__init_0($this, $width, $height, $zoomChange, $smoothZoom, $zoomChangeDivisor, $distanceChangeDivisor, $minZoom) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$minZoom = $thread.pop();$distanceChangeDivisor = $thread.pop();$zoomChangeDivisor = $thread.pop();$smoothZoom = $thread.pop();$zoomChange = $thread.pop();$height = $thread.pop();$width = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        g_Actor__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$zoom = 1.0;
        $this.$idealZoom = $this.$zoom;
        $this.$zoomChange = $zoomChange;
        $this.$zoomChangeDivisor = $zoomChangeDivisor;
        $this.$distanceChangeDivisor = $distanceChangeDivisor;
        $this.$smoothZoom = $smoothZoom;
        $this.$minZoom = $minZoom;
        $this.$upPressed = 0;
        $this.$downPressed = 0;
        $this.$offsetX = 0.0;
        $this.$offsetY = 0.0;
        $this.$x2 = $width / 2 | 0;
        $this.$y2 = $height / 2 | 0;
        $this.$width4 = $width;
        $this.$height5 = $height;
        $this.$scrollableActorList = ju_ArrayList__init_();
        $this.$addQueue = ju_ArrayList__init_();
        $this.$chunkUpdateQueue = ju_ArrayList__init_();
        $this.$removeQueue = ju_ArrayList__init_();
        $this.$actorMap = ju_HashMap__init_();
        $this.$mouseDown = 0;
        $this.$setImage(g_GreenfootImage__init_0(1, 1));
        $this.$useChunks = 0;
        if ($this.$useChunks)
            $this.$chunks = $rt_createMultiArray($rt_arraycls($rt_arraycls(Chunk)), [10, 500]);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $width, $height, $zoomChange, $smoothZoom, $zoomChangeDivisor, $distanceChangeDivisor, $minZoom, $ptr);
}
function ScrollableWorld__init_2($this, $width, $height, $minZoom) {
    var var$4, var$5, var$6, var$7, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();$minZoom = $thread.pop();$height = $thread.pop();$width = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$4 = 0.0;
        var$5 = 1;
        var$6 = 5.0;
        var$7 = 1.0;
        $ptr = 1;
    case 1:
        ScrollableWorld__init_0($this, $width, $height, var$4, var$5, var$6, var$7, $minZoom);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $width, $height, $minZoom, var$4, var$5, var$6, var$7, $ptr);
}
function ScrollableWorld_act($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $this.$demonstrate();
        $ptr = 1;
    case 1:
        $this.$runActors();
        if ($rt_suspending()) {
            break main;
        }
        $this.$handleZoom();
        $this.$handleMovement();
        $ptr = 2;
    case 2:
        $this.$run();
        if ($rt_suspending()) {
            break main;
        }
        $this.$updateQueue();
        $ptr = 3;
    case 3:
        $this.$renderActors();
        if ($rt_suspending()) {
            break main;
        }
        $ptr = 4;
    case 4:
        $this.$reorderObjects();
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function ScrollableWorld_runActors($this) {
    var var$1, $s, $i, $j, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$j = $thread.pop();$i = $thread.pop();$s = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        a: {
            if (!$this.$useChunks) {
                var$1 = $this.$scrollableActorList.$iterator();
                if (!var$1.$hasNext())
                    break a;
                $s = var$1.$next();
                $ptr = 1;
                continue main;
            }
            $i = ($this.$x2 / $this.$width4 | 0) - 3 | 0;
            while ($i <= (($this.$x2 / $this.$width4 | 0) + 3 | 0)) {
                $j = ($this.$y2 / $this.$width4 | 0) - 3 | 0;
                while ($j <= (($this.$y2 / $this.$width4 | 0) + 3 | 0)) {
                    if ($i > (-1) && $j > (-1) && $this.$chunks.data[$i].data[$j] !== null) {
                        var$1 = $this.$chunks.data[$i].data[$j].$getScrollableActors().$iterator();
                        if (var$1.$hasNext()) {
                            $s = var$1.$next();
                            $ptr = 2;
                            continue main;
                        }
                    }
                    $j = $j + 1 | 0;
                }
                $i = $i + 1 | 0;
            }
        }
        return;
    case 1:
        $s.$run();
        if ($rt_suspending()) {
            break main;
        }
        if (!var$1.$hasNext())
            return;
        $s = var$1.$next();
        continue main;
    case 2:
        $s.$run();
        if ($rt_suspending()) {
            break main;
        }
        a: while (true) {
            if (var$1.$hasNext()) {
                $s = var$1.$next();
                continue main;
            }
            while (true) {
                $j = $j + 1 | 0;
                while ($j > (($this.$y2 / $this.$width4 | 0) + 3 | 0)) {
                    $i = $i + 1 | 0;
                    if ($i > (($this.$x2 / $this.$width4 | 0) + 3 | 0))
                        break a;
                    $j = ($this.$y2 / $this.$width4 | 0) - 3 | 0;
                }
                if ($i <= (-1))
                    continue;
                if ($j <= (-1))
                    continue;
                if ($this.$chunks.data[$i].data[$j] === null)
                    continue;
                else
                    break;
            }
            var$1 = $this.$chunks.data[$i].data[$j].$getScrollableActors().$iterator();
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $s, $i, $j, $ptr);
}
function ScrollableWorld_updateChunk($this, $s) {
    if ($this.$useChunks)
        $this.$chunkUpdateQueue.$add0($s);
}
function ScrollableWorld_renderActors($this) {
    var var$1, $s, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$s = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = $this.$scrollableActorList.$iterator();
        if (!var$1.$hasNext())
            return;
        $s = var$1.$next();
        $ptr = 1;
    case 1:
        $s.$render();
        if ($rt_suspending()) {
            break main;
        }
        if (!var$1.$hasNext())
            return;
        $s = var$1.$next();
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $s, $ptr);
}
function ScrollableWorld_handleMovement($this) {
    var $xChange, $yChange;
    $this.$mouseInfo0 = g_Greenfoot_getMouseInfo();
    if (g_Greenfoot_mousePressed(null) && !$this.$disableControls) {
        $this.$startX = $this.$mouseInfo0.$getX();
        $this.$startY = $this.$mouseInfo0.$getY();
        $this.$mouseDown = 1;
    }
    if (g_Greenfoot_mouseDragged(null) && !$this.$disableControls) {
        $xChange = ($this.$startX - $this.$mouseInfo0.$getX()) / $this.$zoom;
        $yChange = ($this.$startY - $this.$mouseInfo0.$getY()) / $this.$zoom;
        $this.$x2 = $this.$x2 + $xChange;
        $this.$y2 = $this.$y2 + $yChange;
        $this.$startX = $this.$mouseInfo0.$getX();
        $this.$startY = $this.$mouseInfo0.$getY();
    }
    if (g_Greenfoot_mouseClicked(null))
        $this.$mouseDown = 0;
    if (!$this.$mouseDown && $this.$cameraTarget !== null) {
        if (Calc_getDistance($this.$x2, $this.$y2, $this.$cameraTarget.$getExactX() + $this.$offsetX, $this.$cameraTarget.$getExactY() + $this.$offsetY) <= 1.0) {
            $this.$x2 = $this.$cameraTarget.$getExactX() + $this.$offsetX;
            $this.$y2 = $this.$cameraTarget.$getExactY() + $this.$offsetY;
        } else {
            $this.$x2 = $this.$x2 + ($this.$cameraTarget.$getExactX() + $this.$offsetX - $this.$x2) / $this.$distanceChangeDivisor;
            $this.$y2 = $this.$y2 + ($this.$cameraTarget.$getExactY() + $this.$offsetY - $this.$y2) / $this.$distanceChangeDivisor;
        }
    }
}
function ScrollableWorld_handleZoom($this) {
    if (!g_Greenfoot_isKeyDown($rt_s(226)))
        $this.$upPressed = 0;
    else {
        if (!$this.$upPressed && $this.$idealZoom + 0.0 <= 1.0 && !$this.$disableControls)
            $this.$idealZoom = $this.$idealZoom + 0.0;
        $this.$upPressed = 1;
    }
    if (!g_Greenfoot_isKeyDown($rt_s(227)))
        $this.$downPressed = 0;
    else {
        if (!$this.$downPressed && $this.$idealZoom - 0.0 >= $this.$minZoom && !$this.$disableControls)
            $this.$idealZoom = $this.$idealZoom - 0.0;
        $this.$downPressed = 1;
    }
    if ($this.$smoothZoom && jl_Math_abs($this.$idealZoom - $this.$zoom) > 0.001)
        $this.$zoom = $this.$zoom + ($this.$idealZoom - $this.$zoom) / $this.$zoomChangeDivisor;
    else
        $this.$zoom = $this.$idealZoom;
}
function ScrollableWorld_reorderObjects($this) {
    var $sortedObjects, var$2, var$3, var$4, $s, var$6, $tempX, $tempY, var$9, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$9 = $thread.pop();$tempY = $thread.pop();$tempX = $thread.pop();var$6 = $thread.pop();$s = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$sortedObjects = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $sortedObjects = $this.$getWorld().$getObjects($rt_cls(ScrollableActor)).$toArray0();
        var$2 = $sortedObjects.data;
        var$3 = 0;
        var$4 = var$2.length;
        Sort_quickSortScrollables($sortedObjects, var$3, var$4 - 1 | 0);
        var$3 = 0;
        if (var$3 >= var$4)
            return;
        $s = var$2[var$3];
        var$6 = $s;
        $tempX = var$6.$getX();
        $tempY = var$6.$getY();
        $this.$getWorld().$removeObject(var$6);
        var$9 = $this.$getWorld();
        $ptr = 1;
    case 1:
        var$9.$addObject(var$6, $tempX, $tempY);
        if ($rt_suspending()) {
            break main;
        }
        var$3 = var$3 + 1 | 0;
        if (var$3 >= var$4)
            return;
        $s = var$2[var$3];
        var$6 = $s;
        $tempX = var$6.$getX();
        $tempY = var$6.$getY();
        $this.$getWorld().$removeObject(var$6);
        var$9 = $this.$getWorld();
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $sortedObjects, var$2, var$3, var$4, $s, var$6, $tempX, $tempY, var$9, $ptr);
}
function ScrollableWorld_getCameraX($this) {
    return $this.$x2;
}
function ScrollableWorld_getCameraY($this) {
    return $this.$y2;
}
function ScrollableWorld_getZoom($this) {
    return $this.$zoom;
}
function ScrollableWorld_setZoom($this, $zoom) {
    $this.$zoom = $zoom;
    $this.$idealZoom = $zoom;
}
function ScrollableWorld_getWidth($this) {
    return $this.$width4;
}
function ScrollableWorld_getHeight($this) {
    return $this.$height5;
}
function ScrollableWorld_addObject($this, $s, $x, $y) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$y = $thread.pop();$x = $thread.pop();$s = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($s === null)
            return;
        $this.$addQueue.$add0($s);
        $s.$setScrollableWorld($this);
        $s.$setLocation0($x, $y);
        $ptr = 1;
    case 1:
        $s.$addedToWorld($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$addToMap($s);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $s, $x, $y, $ptr);
}
function ScrollableWorld_removeObject($this, $s) {
    $this.$removeQueue.$add0($s);
}
function ScrollableWorld_updateQueue($this) {
    var $i, $s, var$3, var$4;
    $i = 0;
    while ($i < $this.$addQueue.$size()) {
        $s = $this.$addQueue.$get0($i);
        $this.$scrollableActorList.$add0($s);
        $this.$addQueue.$remove3($i);
        if ($this.$useChunks) {
            if ($this.$chunks.data[$s.$getExactX() / $this.$width4 | 0].data[$s.$getExactY() / $this.$height5 | 0] === null)
                $this.$chunks.data[$s.$getExactX() / $this.$width4 | 0].data[$s.$getExactY() / $this.$height5 | 0] = Chunk__init_0();
            $s.$setChunk($this.$chunks.data[$s.$getExactX() / $this.$width4 | 0].data[$s.$getExactY() / $this.$height5 | 0]);
        }
        var$3 = $i + (-1) | 0;
        $i = var$3 + 1 | 0;
    }
    if ($this.$useChunks) {
        var$4 = $this.$chunkUpdateQueue.$iterator();
        while (var$4.$hasNext()) {
            $s = var$4.$next();
            if ($this.$chunks.data[$s.$getExactX() / $this.$width4 | 0].data[$s.$getExactY() / $this.$height5 | 0] !== $s.$getChunk()) {
                if ($this.$chunks.data[$s.$getExactX() / $this.$width4 | 0].data[$s.$getExactY() / $this.$height5 | 0] === null)
                    $this.$chunks.data[$s.$getExactX() / $this.$width4 | 0].data[$s.$getExactY() / $this.$height5 | 0] = Chunk__init_0();
                if ($s.$getChunk() !== null)
                    $s.$getChunk().$remove4($s);
                $s.$setChunk($this.$chunks.data[$s.$getExactX() / $this.$width4 | 0].data[$s.$getExactY() / $this.$height5 | 0]);
            }
        }
    }
    $i = 0;
    while ($i < $this.$removeQueue.$size()) {
        $s = $this.$removeQueue.$get0($i);
        if ($s !== null) {
            $s.$removeCollider($this.$getWorld());
            $this.$scrollableActorList.$remove1($s);
            $this.$removeFromMap($s);
            $s.$setScrollableWorld(null);
            if ($this.$useChunks)
                $s.$getChunk().$remove4($s);
            if ($s.$getWorld() !== null)
                $s.$getWorld().$removeObject($s);
        }
        $this.$removeQueue.$remove3($i);
        var$3 = $i + (-1) | 0;
        $i = var$3 + 1 | 0;
    }
}
function ScrollableWorld_addToMap($this, $s) {
    var $cls, $arrayList;
    $cls = jl_Object_getClass($s);
    while ($cls !== $rt_cls(g_Actor)) {
        if ($this.$actorMap.$containsKey($cls))
            $this.$actorMap.$get($cls).$add0($s);
        else {
            $arrayList = ju_ArrayList__init_();
            $this.$actorMap.$put($cls, $arrayList);
            $arrayList.$add0($s);
        }
        $cls = $cls.$getSuperclass();
    }
}
function ScrollableWorld_removeFromMap($this, $s) {
    var $cls;
    $cls = jl_Object_getClass($s);
    while ($cls !== $rt_cls(g_Actor)) {
        if ($this.$actorMap.$containsKey($cls))
            $this.$actorMap.$get($cls).$remove1($s);
        $cls = $cls.$getSuperclass();
    }
}
function ScrollableWorld_getObjectsOfType($this, $cls) {
    var $actorsOfType;
    $actorsOfType = $this.$actorMap.$get($cls);
    if ($actorsOfType !== null)
        return $actorsOfType.$clone();
    return ju_ArrayList__init_();
}
function ScrollableWorld_setCameraTarget($this, $cameraTarget) {
    $this.$cameraTarget = $cameraTarget;
}
function ScrollableWorld_setCameraTarget0($this, $cameraTarget, $offsetX, $offsetY) {
    $this.$cameraTarget = $cameraTarget;
    $this.$offsetX = $offsetX;
    $this.$offsetY = $offsetY;
}
function ScrollableWorld_disableCamera($this, $disableControls) {
    $this.$disableControls = $disableControls;
}
function ScrollableWorld_demonstrate($this) {
    $this.$useChunks = 0;
}
function ju_LinkedList$SequentialListIterator() {
    var a = this; jl_Object.call(a);
    a.$nextEntry = null;
    a.$prevEntry0 = null;
    a.$currentEntry0 = null;
    a.$index1 = 0;
    a.$version = 0;
    a.$this$010 = null;
}
function ju_LinkedList$SequentialListIterator__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new ju_LinkedList$SequentialListIterator();
    ju_LinkedList$SequentialListIterator__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function ju_LinkedList$SequentialListIterator__init_0($this, var$1, $nextEntry, $prevEntry, $index) {
    $this.$this$010 = var$1;
    jl_Object__init_0($this);
    $this.$version = $this.$this$010.$modCount0;
    $this.$nextEntry = $nextEntry;
    $this.$prevEntry0 = $prevEntry;
    $this.$index1 = $index;
}
function ju_LinkedList$SequentialListIterator_hasNext($this) {
    return $this.$nextEntry === null ? 0 : 1;
}
function ju_LinkedList$SequentialListIterator_next($this) {
    var $result;
    ju_LinkedList$SequentialListIterator_checkConcurrentModification($this);
    if ($this.$nextEntry === null)
        $rt_throw(ju_NoSuchElementException__init_());
    $result = $this.$nextEntry.$item;
    $this.$currentEntry0 = $this.$nextEntry;
    $this.$prevEntry0 = $this.$nextEntry;
    $this.$nextEntry = $this.$nextEntry.$next5;
    $this.$index1 = $this.$index1 + 1 | 0;
    return $result;
}
function ju_LinkedList$SequentialListIterator_remove($this) {
    if ($this.$currentEntry0 === null)
        $rt_throw(jl_IllegalStateException__init_0());
    ju_LinkedList_access$100($this.$this$010, $this.$currentEntry0);
    if ($this.$currentEntry0 === $this.$prevEntry0) {
        $this.$prevEntry0 = !$this.$hasNext() ? null : $this.$nextEntry.$previous;
        $this.$index1 = $this.$index1 - 1 | 0;
    } else if ($this.$currentEntry0 === $this.$nextEntry)
        $this.$nextEntry = !$this.$hasPrevious() ? null : $this.$prevEntry0.$next5;
    $this.$version = $this.$this$010.$modCount0;
    $this.$currentEntry0 = null;
}
function ju_LinkedList$SequentialListIterator_hasPrevious($this) {
    return $this.$prevEntry0 === null ? 0 : 1;
}
function ju_LinkedList$SequentialListIterator_add($this, $e) {
    var $newEntry, var$3;
    ju_LinkedList$SequentialListIterator_checkConcurrentModification($this);
    $newEntry = ju_LinkedList$Entry__init_0();
    $newEntry.$item = $e;
    $newEntry.$previous = $this.$prevEntry0;
    $newEntry.$next5 = $this.$nextEntry;
    if ($this.$prevEntry0 === null)
        ju_LinkedList_access$202($this.$this$010, $newEntry);
    else
        $this.$prevEntry0.$next5 = $newEntry;
    if ($this.$nextEntry === null)
        ju_LinkedList_access$302($this.$this$010, $newEntry);
    else
        $this.$nextEntry.$previous = $newEntry;
    $this.$prevEntry0 = $newEntry;
    ju_LinkedList_access$404($this.$this$010);
    var$3 = $this.$this$010;
    var$3.$modCount0 = var$3.$modCount0 + 1 | 0;
    $this.$version = $this.$this$010.$modCount0;
    $this.$currentEntry0 = null;
}
function ju_LinkedList$SequentialListIterator_checkConcurrentModification($this) {
    if ($this.$version >= $this.$this$010.$modCount0)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
}
function gj_KeyboardManager() {
    var a = this; jl_Object.call(a);
    a.$lastKeyTyped = null;
    a.$numKeys = 0;
    a.$keyLatched = null;
    a.$keyDown = null;
    a.$preventDefault = null;
    a.$maxNamedKey = 0;
    a.$keyNames = null;
    a.$jsKeyMap = null;
    a.$keyCodeMap = null;
    a.$gfKeyMap = null;
}
function gj_KeyboardManager__init_0() {
    var var_0 = new gj_KeyboardManager();
    gj_KeyboardManager__init_(var_0);
    return var_0;
}
function gj_KeyboardManager__init_($this) {
    jl_Object__init_0($this);
    $this.$numKeys = 100;
    $this.$keyLatched = $rt_createBooleanArray($this.$numKeys);
    $this.$keyDown = $rt_createBooleanArray($this.$numKeys);
    $this.$preventDefault = $rt_createBooleanArray($this.$numKeys);
    $this.$maxNamedKey = 0;
    $this.$jsKeyMap = ju_HashMap__init_();
    $this.$keyCodeMap = ju_HashMap__init_();
    $this.$gfKeyMap = ju_HashMap__init_();
    gj_KeyboardManager_addAllKeys($this);
    gj_KeyboardManager_buildKeyNameArray($this);
}
function gj_KeyboardManager_addAllKeys($this) {
    gj_KeyboardManager_addKey($this, $rt_s(228), 37, $rt_s(60), 1);
    gj_KeyboardManager_addKey($this, $rt_s(229), 38, $rt_s(226), 1);
    gj_KeyboardManager_addKey($this, $rt_s(230), 39, $rt_s(59), 1);
    gj_KeyboardManager_addKey($this, $rt_s(231), 40, $rt_s(227), 1);
    gj_KeyboardManager_addKey($this, $rt_s(37), 32, $rt_s(62), 1);
    gj_KeyboardManager_addKey($this, $rt_s(232), 13, $rt_s(66), 1);
    gj_KeyboardManager_addKey($this, $rt_s(233), 27, $rt_s(234), 1);
    gj_KeyboardManager_addKey($this, $rt_s(235), 112, $rt_s(236), 0);
    gj_KeyboardManager_addKey($this, $rt_s(237), 113, $rt_s(238), 0);
    gj_KeyboardManager_addKey($this, $rt_s(239), 114, $rt_s(240), 0);
    gj_KeyboardManager_addKey($this, $rt_s(241), 115, $rt_s(242), 0);
    gj_KeyboardManager_addKey($this, $rt_s(243), 116, $rt_s(244), 0);
    gj_KeyboardManager_addKey($this, $rt_s(245), 117, $rt_s(246), 0);
    gj_KeyboardManager_addKey($this, $rt_s(247), 118, $rt_s(248), 0);
    gj_KeyboardManager_addKey($this, $rt_s(249), 119, $rt_s(250), 0);
    gj_KeyboardManager_addKey($this, $rt_s(251), 120, $rt_s(252), 0);
    gj_KeyboardManager_addKey($this, $rt_s(253), 121, $rt_s(254), 0);
    gj_KeyboardManager_addKey($this, $rt_s(255), 122, $rt_s(256), 0);
    gj_KeyboardManager_addKey($this, $rt_s(257), 123, $rt_s(258), 0);
    gj_KeyboardManager_addKey($this, $rt_s(259), 8, $rt_s(58), 0);
    gj_KeyboardManager_addKey($this, $rt_s(260), 16, $rt_s(61), 0);
    gj_KeyboardManager_addKey($this, $rt_s(261), 17, $rt_s(64), 0);
    gj_KeyboardManager_addKey($this, $rt_s(106), 222, $rt_s(106), 0);
    $this.$jsKeyMap.$put($rt_s(262), $this.$gfKeyMap.$get($rt_s(60)));
    $this.$jsKeyMap.$put($rt_s(263), $this.$gfKeyMap.$get($rt_s(226)));
    $this.$jsKeyMap.$put($rt_s(264), $this.$gfKeyMap.$get($rt_s(59)));
    $this.$jsKeyMap.$put($rt_s(265), $this.$gfKeyMap.$get($rt_s(227)));
    $this.$jsKeyMap.$put($rt_s(266), $this.$gfKeyMap.$get($rt_s(62)));
}
function gj_KeyboardManager_addKey($this, $jsName, $keyCode, $gfName, $inhibitDefault) {
    if ($jsName !== null)
        $this.$jsKeyMap.$put($jsName, jl_Integer_valueOf($this.$maxNamedKey));
    if ($keyCode)
        $this.$keyCodeMap.$put(jl_Integer_valueOf($keyCode), jl_Integer_valueOf($this.$maxNamedKey));
    $this.$gfKeyMap.$put($gfName, jl_Integer_valueOf($this.$maxNamedKey));
    $this.$preventDefault.data[$this.$maxNamedKey] = $inhibitDefault;
    $this.$maxNamedKey = $this.$maxNamedKey + 1 | 0;
}
function gj_KeyboardManager_buildKeyNameArray($this) {
    var var$1, $gfKey, $latchIdx;
    $this.$keyNames = $rt_createArray(jl_String, $this.$maxNamedKey);
    var$1 = $this.$gfKeyMap.$keySet().$iterator();
    while (var$1.$hasNext()) {
        $gfKey = var$1.$next();
        $latchIdx = $this.$gfKeyMap.$get($gfKey).$intValue();
        $this.$keyNames.data[$latchIdx] = $gfKey;
    }
}
function gj_KeyboardManager_handleEvent($this, $event) {
    var $key, $type, $keydown, $keyup, $keyname, $keyCode, $i, $keyLower, $idx;
    $key = $rt_str($event.key);
    $type = $rt_str($event.type);
    $keydown = $type.$equals($rt_s(222));
    $keyup = $type.$equals($rt_s(223));
    $keyname = null;
    if (!(!$keydown && !$keyup)) {
        if ($key === null) {
            $keyCode = $event.keyCode;
            $i = $this.$keyCodeMap.$get(jl_Integer_valueOf($keyCode));
            if ($i !== null)
                $key = $keyname;
            else if ($keyCode >= 48 && $keyCode <= 57) {
                $i = jl_Integer_valueOf($this.$maxNamedKey);
                $key = jl_StringBuilder__init_().$append($rt_s(56)).$append0($keyCode & 65535).$toString();
                gj_KeyboardManager_addKey($this, null, $keyCode, $key, 0);
            } else if ($keyCode < 65)
                $key = $keyname;
            else if ($keyCode > 90)
                $key = $keyname;
            else {
                $i = jl_Integer_valueOf($this.$maxNamedKey);
                $key = jl_StringBuilder__init_().$append($rt_s(56)).$append3(($keyCode & 65535) + 32 | 0).$toString();
                gj_KeyboardManager_addKey($this, null, $keyCode, $key, 0);
            }
        } else {
            $keyLower = $key.$toLowerCase0();
            $i = $this.$jsKeyMap.$get($key);
            if ($i === null) {
                $i = $this.$jsKeyMap.$get($keyLower);
                if ($i !== null)
                    $this.$jsKeyMap.$put($key, $i);
            }
            if ($key.$length() > 2)
                $key = $keyname;
            else if ($i === null && $key.$length() <= 2) {
                $i = jl_Integer_valueOf($this.$maxNamedKey);
                gj_KeyboardManager_addKey($this, $keyLower, 0, $keyLower, 0);
            }
        }
        if ($i !== null) {
            $idx = $i.$intValue();
            if ($idx < $this.$preventDefault.data.length && $this.$preventDefault.data[$idx])
                $event.preventDefault();
            gj_KeyboardManager_checkKeyArrays($this, $i.$intValue());
            $this.$keyDown.data[$idx] = $keydown;
            if ($keydown) {
                $this.$keyLatched.data[$idx] = 1;
                $this.$lastKeyTyped = $idx >= $this.$keyNames.data.length ? null : $this.$keyNames.data[$idx];
                if ($this.$lastKeyTyped === null)
                    $this.$lastKeyTyped = $key;
            }
        }
    }
}
function gj_KeyboardManager_checkKeyArrays($this, $keycode) {
    var $nsize, $newKeyLatched, $newKeyDown, $i, var$6;
    $nsize = $keycode + 1 | 0;
    if ($nsize > $this.$numKeys) {
        $newKeyLatched = $rt_createBooleanArray($nsize);
        $newKeyDown = $rt_createBooleanArray($nsize);
        $i = 0;
        while ($i < $this.$numKeys) {
            var$6 = $newKeyDown.data;
            $newKeyLatched.data[$i] = $this.$keyLatched.data[$i];
            var$6[$i] = $this.$keyDown.data[$i];
            $i = $i + 1 | 0;
        }
        $this.$keyLatched = $newKeyLatched;
        $this.$keyDown = $newKeyDown;
        $this.$numKeys = $nsize;
    }
}
function gj_KeyboardManager_isKeyDown($this, $keyName) {
    var $i;
    $i = $this.$gfKeyMap.$get($keyName.$toLowerCase0());
    if ($i !== null && $i.$intValue() < $this.$numKeys)
        return gj_KeyboardManager_isKeyDown0($this, $i.$intValue());
    return 0;
}
function gj_KeyboardManager_isKeyDown0($this, $latchIdx) {
    var $pressed;
    $pressed = !$this.$keyDown.data[$latchIdx] && !$this.$keyLatched.data[$latchIdx] ? 0 : 1;
    $this.$keyLatched.data[$latchIdx] = 0;
    return $pressed;
}
function gj_KeyboardManager_getKey($this) {
    var $r;
    $r = $this.$lastKeyTyped;
    $this.$lastKeyTyped = null;
    return $r;
}
function gj_KeyboardManager_clearLatches($this) {
    var $i;
    $i = 0;
    while ($i < $this.$keyLatched.data.length) {
        $this.$keyLatched.data[$i] = 0;
        $i = $i + 1 | 0;
    }
}
function gj_KeyboardManager_handleEvent0($this, var$1) {
    $this.$handleEvent2(var$1);
}
function gj_KeyboardManager_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function jl_String() {
    var a = this; jl_Object.call(a);
    a.$characters = null;
    a.$hashCode0 = 0;
}
var jl_String_CASE_INSENSITIVE_ORDER = null;
function jl_String_$callClinit() {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
}
function jl_String__init_2() {
    var var_0 = new jl_String();
    jl_String__init_1(var_0);
    return var_0;
}
function jl_String__init_(var_0) {
    var var_1 = new jl_String();
    jl_String__init_3(var_1, var_0);
    return var_1;
}
function jl_String__init_0(var_0, var_1, var_2) {
    var var_3 = new jl_String();
    jl_String__init_4(var_3, var_0, var_1, var_2);
    return var_3;
}
function jl_String__init_5(var_0, var_1, var_2) {
    var var_3 = new jl_String();
    jl_String__init_6(var_3, var_0, var_1, var_2);
    return var_3;
}
function jl_String__init_1($this) {
    jl_String_$callClinit();
    jl_Object__init_0($this);
    $this.$characters = $rt_createCharArray(0);
}
function jl_String__init_3($this, $characters) {
    var var$2, var$3, $i;
    jl_String_$callClinit();
    var$2 = $characters.data;
    jl_Object__init_0($this);
    var$3 = var$2.length;
    $this.$characters = $rt_createCharArray(var$3);
    $i = 0;
    while ($i < var$3) {
        $this.$characters.data[$i] = var$2[$i];
        $i = $i + 1 | 0;
    }
}
function jl_String__init_4($this, $value, $offset, $count) {
    var $i, var$5;
    jl_String_$callClinit();
    jl_Object__init_0($this);
    $this.$characters = $rt_createCharArray($count);
    $i = 0;
    while ($i < $count) {
        var$5 = $value.data;
        $this.$characters.data[$i] = var$5[$i + $offset | 0];
        $i = $i + 1 | 0;
    }
}
function jl_String__init_6($this, $codePoints, $offset, $count) {
    var $charCount, $i, var$6, var$7, $codePoint, var$9, var$10;
    jl_String_$callClinit();
    jl_Object__init_0($this);
    $this.$characters = $rt_createCharArray($count * 2 | 0);
    $charCount = 0;
    $i = 0;
    while ($i < $count) {
        var$6 = $codePoints.data;
        var$7 = $offset + 1 | 0;
        $codePoint = var$6[$offset];
        if ($codePoint < 65536) {
            var$6 = $this.$characters.data;
            var$9 = $charCount + 1 | 0;
            var$6[$charCount] = $codePoint & 65535;
        } else {
            var$6 = $this.$characters.data;
            var$10 = $charCount + 1 | 0;
            var$6[$charCount] = jl_Character_highSurrogate($codePoint);
            var$6 = $this.$characters.data;
            var$9 = var$10 + 1 | 0;
            var$6[var$10] = jl_Character_lowSurrogate($codePoint);
        }
        $i = $i + 1 | 0;
        $offset = var$7;
        $charCount = var$9;
    }
    if ($charCount < $this.$characters.data.length)
        $this.$characters = ju_Arrays_copyOf($this.$characters, $charCount);
}
function jl_String_charAt($this, $index) {
    if ($index >= 0 && $index < $this.$characters.data.length)
        return $this.$characters.data[$index];
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_String_length($this) {
    return $this.$characters.data.length;
}
function jl_String_isEmpty($this) {
    return $this.$characters.data.length ? 0 : 1;
}
function jl_String_startsWith($this, $prefix, $toffset) {
    var $i, var$4, var$5;
    if (($toffset + $prefix.$length() | 0) > $this.$length())
        return 0;
    $i = 0;
    while ($i < $prefix.$length()) {
        var$4 = $prefix.$charAt($i);
        var$5 = $toffset + 1 | 0;
        if (var$4 != $this.$charAt($toffset))
            return 0;
        $i = $i + 1 | 0;
        $toffset = var$5;
    }
    return 1;
}
function jl_String_startsWith0($this, $prefix) {
    if ($this === $prefix)
        return 1;
    return $this.$startsWith0($prefix, 0);
}
function jl_String_endsWith($this, $suffix) {
    var $j, $i, var$4, var$5;
    if ($this === $suffix)
        return 1;
    if ($suffix.$length() > $this.$length())
        return 0;
    $j = 0;
    $i = $this.$length() - $suffix.$length() | 0;
    while ($i < $this.$length()) {
        var$4 = $this.$charAt($i);
        var$5 = $j + 1 | 0;
        if (var$4 != $suffix.$charAt($j))
            return 0;
        $i = $i + 1 | 0;
        $j = var$5;
    }
    return 1;
}
function jl_String_indexOf($this, $ch, $fromIndex) {
    var $i, $bmpChar, $hi, $lo;
    $i = jl_Math_max(0, $fromIndex);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i >= $this.$characters.data.length)
                return (-1);
            if ($this.$characters.data[$i] == $bmpChar)
                break;
            $i = $i + 1 | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i >= ($this.$characters.data.length - 1 | 0))
            return (-1);
        if ($this.$characters.data[$i] == $hi && $this.$characters.data[$i + 1 | 0] == $lo)
            break;
        $i = $i + 1 | 0;
    }
    return $i;
}
function jl_String_indexOf0($this, $ch) {
    return $this.$indexOf($ch, 0);
}
function jl_String_indexOf1($this, $str, $fromIndex) {
    var $i, $toIndex, $j;
    $i = jl_Math_max(0, $fromIndex);
    $toIndex = $this.$length() - $str.$length() | 0;
    a: while (true) {
        if ($i > $toIndex)
            return (-1);
        $j = 0;
        while (true) {
            if ($j >= $str.$length())
                break a;
            if ($this.$charAt($i + $j | 0) != $str.$charAt($j))
                break;
            $j = $j + 1 | 0;
        }
        $i = $i + 1 | 0;
    }
    return $i;
}
function jl_String_indexOf2($this, $str) {
    return $this.$indexOf2($str, 0);
}
function jl_String_substring($this, $beginIndex, $endIndex) {
    if ($beginIndex > $endIndex)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    return jl_String__init_0($this.$characters, $beginIndex, $endIndex - $beginIndex | 0);
}
function jl_String_substring0($this, $beginIndex) {
    return $this.$substring($beginIndex, $this.$length());
}
function jl_String_trim($this) {
    var $lower, $upper;
    $lower = 0;
    $upper = $this.$length() - 1 | 0;
    a: {
        while ($lower <= $upper) {
            if ($this.$charAt($lower) > 32)
                break a;
            $lower = $lower + 1 | 0;
        }
    }
    while ($lower <= $upper && $this.$charAt($upper) <= 32) {
        $upper = $upper + (-1) | 0;
    }
    return $this.$substring($lower, $upper + 1 | 0);
}
function jl_String_toString($this) {
    return $this;
}
function jl_String_toCharArray($this) {
    var $array, $i, var$3;
    $array = $rt_createCharArray($this.$characters.data.length);
    $i = 0;
    while (true) {
        var$3 = $array.data;
        if ($i >= var$3.length)
            break;
        var$3[$i] = $this.$characters.data[$i];
        $i = $i + 1 | 0;
    }
    return $array;
}
function jl_String_valueOf($c) {
    var var$2, var$3;
    jl_String_$callClinit();
    var$2 = new jl_String;
    var$3 = $rt_createCharArray(1);
    var$3.data[0] = $c;
    jl_String__init_3(var$2, var$3);
    return var$2;
}
function jl_String_equals($this, $other) {
    var $str, $i;
    if ($this === $other)
        return 1;
    if (!($other instanceof jl_String))
        return 0;
    $str = $other;
    if ($str.$length() != $this.$length())
        return 0;
    $i = 0;
    while ($i < $str.$length()) {
        if ($this.$charAt($i) != $str.$charAt($i))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
}
function jl_String_hashCode($this) {
    var var$1, var$2, var$3, $c;
    if (!$this.$hashCode0) {
        var$1 = $this.$characters.data;
        var$2 = var$1.length;
        var$3 = 0;
        while (var$3 < var$2) {
            $c = var$1[var$3];
            $this.$hashCode0 = (31 * $this.$hashCode0 | 0) + $c | 0;
            var$3 = var$3 + 1 | 0;
        }
    }
    return $this.$hashCode0;
}
function jl_String_toLowerCase($this) {
    var $codePoints, $codePointCount, $i, var$4, var$5, var$6;
    if ($this.$isEmpty())
        return $this;
    $codePoints = $rt_createIntArray($this.$characters.data.length);
    $codePointCount = 0;
    $i = 0;
    while ($i < $this.$characters.data.length) {
        a: {
            if ($i != ($this.$characters.data.length - 1 | 0) && jl_Character_isHighSurrogate($this.$characters.data[$i])) {
                var$4 = $this.$characters.data[$i + 1 | 0];
                if (jl_Character_isLowSurrogate(var$4)) {
                    var$5 = $codePoints.data;
                    var$6 = $codePointCount + 1 | 0;
                    var$5[$codePointCount] = jl_Character_toLowerCase0(jl_Character_toCodePoint($this.$characters.data[$i], $this.$characters.data[$i + 1 | 0]));
                    $i = $i + 1 | 0;
                    break a;
                }
            }
            var$5 = $codePoints.data;
            var$6 = $codePointCount + 1 | 0;
            var$5[$codePointCount] = jl_Character_toLowerCase($this.$characters.data[$i]);
        }
        $i = $i + 1 | 0;
        $codePointCount = var$6;
    }
    return jl_String__init_5($codePoints, 0, $codePointCount);
}
function jl_String__clinit_() {
    jl_String_CASE_INSENSITIVE_ORDER = jl_String$_clinit_$lambda$_81_0__init_0();
}
function gp_SimulationDelegate() {
}
function gj_Client$2() {
    jl_Object.call(this);
    this.$this$011 = null;
}
function gj_Client$2__init_(var_0) {
    var var_1 = new gj_Client$2();
    gj_Client$2__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$2__init_0($this, $this$0) {
    $this.$this$011 = $this$0;
    jl_Object__init_0($this);
}
function gj_Client$2_setSpeed($this, $speed) {
    return;
}
function gj_Client$1() {
    otc_ResourceSource.call(this);
    this.$this$012 = null;
}
function gj_Client$1__init_(var_0) {
    var var_1 = new gj_Client$1();
    gj_Client$1__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$1__init_0($this, $this$0) {
    $this.$this$012 = $this$0;
    otc_ResourceSource__init_0($this);
}
function gj_Client$4() {
    jl_Object.call(this);
    this.$this$013 = null;
}
function gj_Client$4__init_(var_0) {
    var var_1 = new gj_Client$4();
    gj_Client$4__init_0(var_1, var_0);
    return var_1;
}
function gj_Client$4__init_0($this, $this$0) {
    $this.$this$013 = $this$0;
    jl_Object__init_0($this);
}
function ge_SimulationListener() {
}
function gj_Client$3() {
    var a = this; jl_Object.call(a);
    a.$val$speedSlider = null;
    a.$val$simulation = null;
    a.$val$resetButton = null;
    a.$val$playButton = null;
    a.$this$014 = null;
}
function gj_Client$3__init_(var_0, var_1, var_2, var_3, var_4) {
    var var_5 = new gj_Client$3();
    gj_Client$3__init_0(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
}
function gj_Client$3__init_0($this, $this$0, var$2, var$3, var$4, var$5) {
    $this.$this$014 = $this$0;
    $this.$val$speedSlider = var$2;
    $this.$val$simulation = var$3;
    $this.$val$resetButton = var$4;
    $this.$val$playButton = var$5;
    jl_Object__init_0($this);
}
function gj_Client$3_simulationChanged($this, $e) {
    var var$2, var$3;
    if ($e.$getType0() == 2) {
        var$2 = $this.$val$speedSlider;
        var$3 = $rt_ustr(jl_StringBuilder__init_().$append($rt_s(56)).$append3($this.$val$simulation.$getSpeed0()).$toString());
        var$2.value = var$3;
    } else if (!$e.$getType0()) {
        var$2 = $this.$val$speedSlider;
        var$3 = !!0;
        var$2.disabled = var$3;
        var$2 = $this.$val$resetButton;
        var$3 = !!0;
        var$2.disabled = var$3;
        var$2 = $this.$val$playButton;
        var$3 = !!0;
        var$2.disabled = var$3;
        var$2 = $this.$val$playButton;
        var$3 = "Pause";
        var$2.innerHTML = var$3;
        gj_Client_access$000($this.$this$014).focus();
        gj_Client_access$102($this.$this$014, 0);
    } else if ($e.$getType0() == 1) {
        var$2 = $this.$val$speedSlider;
        var$3 = !!0;
        var$2.disabled = var$3;
        var$2 = $this.$val$resetButton;
        var$3 = !!0;
        var$2.disabled = var$3;
        var$2 = $this.$val$playButton;
        var$3 = !!0;
        var$2.disabled = var$3;
        var$2 = $this.$val$playButton;
        var$3 = "Run";
        var$2.innerHTML = var$3;
        gj_Client_access$102($this.$this$014, 1);
    } else if ($e.$getType0() == 3) {
        var$2 = $this.$val$speedSlider;
        var$3 = !!1;
        var$2.disabled = var$3;
        var$2 = $this.$val$resetButton;
        var$3 = !!0;
        var$2.disabled = var$3;
        var$2 = $this.$val$playButton;
        var$3 = !!1;
        var$2.disabled = var$3;
    }
}
function jl_NegativeArraySizeException() {
    jl_RuntimeException.call(this);
}
function jl_NegativeArraySizeException__init_() {
    var var_0 = new jl_NegativeArraySizeException();
    jl_NegativeArraySizeException__init_0(var_0);
    return var_0;
}
function jl_NegativeArraySizeException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function g_TreeActorSet$TasIterator() {
    var a = this; jl_Object.call(a);
    a.$setIterator = null;
    a.$currentSet = null;
    a.$actorIterator = null;
    a.$this$015 = null;
}
function g_TreeActorSet$TasIterator__init_(var_0) {
    var var_1 = new g_TreeActorSet$TasIterator();
    g_TreeActorSet$TasIterator__init_0(var_1, var_0);
    return var_1;
}
function g_TreeActorSet$TasIterator__init_0($this, $this$0) {
    $this.$this$015 = $this$0;
    jl_Object__init_0($this);
    $this.$setIterator = g_TreeActorSet_access$000($this$0).$iterator();
    $this.$currentSet = $this.$setIterator.$next();
    while ($this.$currentSet.$isEmpty() && $this.$setIterator.$hasNext()) {
        $this.$currentSet = $this.$setIterator.$next();
    }
    $this.$actorIterator = $this.$currentSet.$iterator();
}
function g_TreeActorSet$TasIterator_next($this) {
    $this.$hasNext();
    return $this.$actorIterator.$next();
}
function g_TreeActorSet$TasIterator_hasNext($this) {
    if ($this.$actorIterator.$hasNext())
        return 1;
    if (!$this.$setIterator.$hasNext())
        return 0;
    a: {
        while (true) {
            if (!$this.$setIterator.$hasNext())
                break a;
            $this.$currentSet = $this.$setIterator.$next();
            if ($this.$currentSet.$isEmpty())
                continue;
            else
                break;
        }
    }
    $this.$actorIterator = $this.$currentSet.$iterator();
    return $this.$actorIterator.$hasNext();
}
function g_TreeActorSet$TasIterator_next0($this) {
    return $this.$next4();
}
function jnci_BufferedEncoder() {
    jnc_CharsetEncoder.call(this);
}
function jnci_BufferedEncoder__init_(var_0, var_1, var_2) {
    var var_3 = new jnci_BufferedEncoder();
    jnci_BufferedEncoder__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function jnci_BufferedEncoder__init_0($this, $cs, $averageBytesPerChar, $maxBytesPerChar) {
    jnc_CharsetEncoder__init_2($this, $cs, $averageBytesPerChar, $maxBytesPerChar);
}
function jnci_BufferedEncoder_encodeLoop($this, $in, $out) {
    var $inArray, $inPos, $inSize, $outArray, $i, var$8, var$9, var$10, $outSize, $controller;
    $inArray = $rt_createCharArray(jl_Math_min(jn_Buffer_remaining($in), 512));
    $inPos = 0;
    $inSize = 0;
    $outArray = $rt_createByteArray(jl_Math_min(jn_Buffer_remaining($out), 512));
    a: {
        while (true) {
            if (($inPos + 32 | 0) > $inSize && jn_Buffer_hasRemaining($in)) {
                $i = $inPos;
                while ($i < $inSize) {
                    var$8 = $inArray.data;
                    var$8[$i - $inPos | 0] = var$8[$i];
                    $i = $i + 1 | 0;
                }
                var$8 = $inArray.data;
                var$9 = $inSize - $inPos | 0;
                $inSize = jl_Math_min(jn_Buffer_remaining($in) + var$9 | 0, var$8.length);
                $in.$get3($inArray, var$9, $inSize - var$9 | 0);
                $inPos = 0;
            }
            if (!jn_Buffer_hasRemaining($out)) {
                if (!jn_Buffer_hasRemaining($in) && $inPos >= $inSize) {
                    jnc_CoderResult_$callClinit();
                    var$10 = jnc_CoderResult_UNDERFLOW;
                } else {
                    jnc_CoderResult_$callClinit();
                    var$10 = jnc_CoderResult_OVERFLOW;
                }
                break a;
            }
            var$8 = $outArray.data;
            var$9 = 0;
            $outSize = jl_Math_min(jn_Buffer_remaining($out), var$8.length);
            $controller = jnci_BufferedEncoder$Controller__init_($in, $out);
            var$10 = $this.$arrayEncode($inArray, $inPos, $inSize, $outArray, var$9, $outSize, $controller);
            $inPos = $controller.$inPosition;
            if (var$10 === null && var$9 == $controller.$outPosition) {
                jnc_CoderResult_$callClinit();
                var$10 = jnc_CoderResult_UNDERFLOW;
            }
            var$9 = $controller.$outPosition;
            $out.$put1($outArray, 0, var$9);
            if (var$10 !== null)
                break;
        }
    }
    jn_Buffer_position0($in, jn_Buffer_position($in) - ($inSize - $inPos | 0) | 0);
    return var$10;
}
function jnci_UTF8Encoder() {
    jnci_BufferedEncoder.call(this);
}
function jnci_UTF8Encoder__init_(var_0) {
    var var_1 = new jnci_UTF8Encoder();
    jnci_UTF8Encoder__init_0(var_1, var_0);
    return var_1;
}
function jnci_UTF8Encoder__init_0($this, $cs) {
    jnci_BufferedEncoder__init_0($this, $cs, 2.0, 4.0);
}
function jnci_UTF8Encoder_arrayEncode($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) {
    var $result, var$9, var$10, $ch, var$12, var$13, var$14, $low, $codePoint;
    $result = null;
    a: {
        while ($inPos < $inSize) {
            if ($outPos >= $outSize) {
                var$9 = $inPos;
                break a;
            }
            var$10 = $inArray.data;
            var$9 = $inPos + 1 | 0;
            $ch = var$10[$inPos];
            if ($ch < 128) {
                var$10 = $outArray.data;
                var$12 = $outPos + 1 | 0;
                var$10[$outPos] = $ch << 24 >> 24;
            } else if ($ch < 2048) {
                if (($outPos + 2 | 0) > $outSize) {
                    var$9 = var$9 + (-1) | 0;
                    if ($controller.$hasMoreOutput(2))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$10 = $outArray.data;
                var$13 = $outPos + 1 | 0;
                var$10[$outPos] = (192 | $ch >> 6) << 24 >> 24;
                var$12 = var$13 + 1 | 0;
                var$10[var$13] = (128 | $ch & 63) << 24 >> 24;
            } else if (!jl_Character_isSurrogate($ch)) {
                if (($outPos + 3 | 0) > $outSize) {
                    var$9 = var$9 + (-1) | 0;
                    if ($controller.$hasMoreOutput(3))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$10 = $outArray.data;
                var$14 = $outPos + 1 | 0;
                var$10[$outPos] = (224 | $ch >> 12) << 24 >> 24;
                var$13 = var$14 + 1 | 0;
                var$10[var$14] = (128 | $ch >> 6 & 63) << 24 >> 24;
                var$12 = var$13 + 1 | 0;
                var$10[var$13] = (128 | $ch & 63) << 24 >> 24;
            } else {
                if (!jl_Character_isHighSurrogate($ch)) {
                    $result = jnc_CoderResult_malformedForLength(1);
                    break a;
                }
                if (var$9 >= $inSize) {
                    if ($controller.$hasMoreInput())
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_UNDERFLOW;
                    break a;
                }
                var$13 = var$9 + 1 | 0;
                $low = var$10[var$9];
                if (!jl_Character_isLowSurrogate($low)) {
                    var$9 = var$13 + (-2) | 0;
                    $result = jnc_CoderResult_malformedForLength(1);
                    break a;
                }
                if (($outPos + 4 | 0) > $outSize) {
                    var$9 = var$13 + (-2) | 0;
                    if ($controller.$hasMoreOutput(4))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$10 = $outArray.data;
                $codePoint = jl_Character_toCodePoint($ch, $low);
                var$9 = $outPos + 1 | 0;
                var$10[$outPos] = (240 | $codePoint >> 18) << 24 >> 24;
                var$14 = var$9 + 1 | 0;
                var$10[var$9] = (128 | $codePoint >> 12 & 63) << 24 >> 24;
                var$9 = var$14 + 1 | 0;
                var$10[var$14] = (128 | $codePoint >> 6 & 63) << 24 >> 24;
                var$12 = var$9 + 1 | 0;
                var$10[var$9] = (128 | $codePoint & 63) << 24 >> 24;
                var$9 = var$13;
            }
            $inPos = var$9;
            $outPos = var$12;
        }
        var$9 = $inPos;
    }
    $controller.$setInPosition(var$9);
    $controller.$setOutPosition($outPos);
    return $result;
}
function ju_Hashtable() {
    var a = this; ju_Dictionary.call(a);
    a.$elementCount = 0;
    a.$elementData0 = null;
    a.$loadFactor = 0.0;
    a.$threshold = 0;
    a.$firstSlot = 0;
    a.$lastSlot = 0;
    a.$modCount2 = 0;
}
var ju_Hashtable_EMPTY_ENUMERATION = null;
var ju_Hashtable_EMPTY_ITERATOR = null;
function ju_Hashtable_$callClinit() {
    ju_Hashtable_$callClinit = $rt_eraseClinit(ju_Hashtable);
    ju_Hashtable__clinit_();
}
function ju_Hashtable__init_0() {
    var var_0 = new ju_Hashtable();
    ju_Hashtable__init_(var_0);
    return var_0;
}
function ju_Hashtable__init_1(var_0) {
    var var_1 = new ju_Hashtable();
    ju_Hashtable__init_2(var_1, var_0);
    return var_1;
}
function ju_Hashtable_newEntry($key, $value, $hash) {
    ju_Hashtable_$callClinit();
    return ju_Hashtable$Entry__init_($key, $value);
}
function ju_Hashtable__init_($this) {
    ju_Hashtable_$callClinit();
    ju_Hashtable__init_2($this, 11);
}
function ju_Hashtable__init_2($this, $capacity) {
    ju_Hashtable_$callClinit();
    ju_Dictionary__init_0($this);
    $this.$lastSlot = (-1);
    if ($capacity < 0)
        $rt_throw(jl_IllegalArgumentException__init_0());
    $this.$elementCount = 0;
    if (!$capacity)
        $capacity = 1;
    $this.$elementData0 = ju_Hashtable_newElementArray($this, $capacity);
    $this.$firstSlot = $this.$elementData0.data.length;
    $this.$loadFactor = 0.75;
    ju_Hashtable_computeMaxSize($this);
}
function ju_Hashtable_newElementArray($this, $size) {
    return $rt_createArray(ju_Hashtable$Entry, $size);
}
function ju_Hashtable_computeMaxSize($this) {
    $this.$threshold = $this.$elementData0.data.length * $this.$loadFactor | 0;
}
function ju_Hashtable_get($this, $key) {
    var $hash, $index, $entry;
    jl_Object_monitorEnterSync($this);
    try {
        $hash = $key.$hashCode();
        $index = ($hash & 2147483647) % $this.$elementData0.data.length | 0;
        $entry = $this.$elementData0.data[$index];
        while ($entry !== null) {
            if ($entry.$equalsKey($key, $hash))
                return $entry.$value0;
            $entry = $entry.$next0;
        }
        return null;
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
function ju_Hashtable_put($this, $key, $value) {
    var $hash, $index, $entry, $result, var$7, var$8;
    jl_Object_monitorEnterSync($this);
    try {
        if ($key !== null && $value !== null) {
            $hash = $key.$hashCode();
            $index = ($hash & 2147483647) % $this.$elementData0.data.length | 0;
            $entry = $this.$elementData0.data[$index];
            while ($entry !== null && !$entry.$equalsKey($key, $hash)) {
                $entry = $entry.$next0;
            }
            if ($entry !== null) {
                $result = $entry.$value0;
                $entry.$value0 = $value;
                return $result;
            }
            $this.$modCount2 = $this.$modCount2 + 1 | 0;
            var$7 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$7;
            if (var$7 > $this.$threshold) {
                $this.$rehash();
                $index = ($hash & 2147483647) % $this.$elementData0.data.length | 0;
            }
            if ($index < $this.$firstSlot)
                $this.$firstSlot = $index;
            if ($index > $this.$lastSlot)
                $this.$lastSlot = $index;
            var$8 = ju_Hashtable_newEntry($key, $value, $hash);
            var$8.$next0 = $this.$elementData0.data[$index];
            $this.$elementData0.data[$index] = var$8;
            return null;
        }
        $rt_throw(jl_NullPointerException__init_());
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
function ju_Hashtable_rehash($this) {
    var $length, $newLast, $newData, $i, var$5, $entry, $index, var$8, $entry_0;
    $length = ($this.$elementData0.data.length << 1) + 1 | 0;
    if (!$length)
        $length = 1;
    $newLast = (-1);
    $newData = ju_Hashtable_newElementArray($this, $length);
    $i = $this.$lastSlot + 1 | 0;
    var$5 = $length;
    while (true) {
        $i = $i + (-1) | 0;
        if ($i < $this.$firstSlot)
            break;
        $entry = $this.$elementData0.data[$i];
        while ($entry !== null) {
            $index = ($entry.$getKeyHash() & 2147483647) % $length | 0;
            if ($index < var$5)
                var$5 = $index;
            if ($index > $newLast)
                $newLast = $index;
            var$8 = $newData.data;
            $entry_0 = $entry.$next0;
            $entry.$next0 = var$8[$index];
            var$8[$index] = $entry;
            $entry = $entry_0;
        }
    }
    $this.$firstSlot = var$5;
    $this.$lastSlot = $newLast;
    $this.$elementData0 = $newData;
    ju_Hashtable_computeMaxSize($this);
}
function ju_Hashtable__clinit_() {
    ju_Hashtable_EMPTY_ENUMERATION = ju_Hashtable$1__init_();
    ju_Hashtable_EMPTY_ITERATOR = ju_Hashtable$2__init_();
}
function ju_Properties() {
    ju_Hashtable.call(this);
    this.$defaults = null;
}
function ju_Properties__init_0() {
    var var_0 = new ju_Properties();
    ju_Properties__init_(var_0);
    return var_0;
}
function ju_Properties__init_($this) {
    ju_Hashtable__init_($this);
}
function ju_Properties_getProperty($this, $name) {
    var $result, $property;
    $result = ju_Hashtable_get($this, $name);
    $property = !($result instanceof jl_String) ? null : $result;
    if ($property === null && $this.$defaults !== null)
        $property = $this.$defaults.$getProperty($name);
    return $property;
}
function ju_Properties_load($this, $in) {
    var $mode, $unicode, $count, $buf, $offset, $keyLength, $firstChar, $bis, $intVal, var$11, var$12, $temp, $nextChar, $newBuf, $digit, var$17, var$18;
    jl_Object_monitorEnterSync($this);
    try {
        if ($in === null)
            $rt_throw(jl_NullPointerException__init_());
        $mode = 0;
        $unicode = 0;
        $count = 0;
        $buf = $rt_createCharArray(40);
        $offset = 0;
        $keyLength = (-1);
        $firstChar = 1;
        $bis = ji_BufferedInputStream__init_($in);
        a: while (true) {
            $intVal = $bis.$read1();
            if ($intVal == (-1)) {
                if ($mode == 2 && $count < 4)
                    $rt_throw(jl_IllegalArgumentException__init_($rt_s(267)));
                if ($mode != 1)
                    var$11 = $offset;
                else {
                    var$12 = $buf.data;
                    var$11 = $offset + 1 | 0;
                    var$12[$offset] = 0;
                }
                if ($keyLength == (-1) && var$11 > 0)
                    $keyLength = var$11;
                if ($keyLength >= 0) {
                    $temp = jl_String__init_0($buf, 0, var$11);
                    $this.$put($temp.$substring(0, $keyLength), $temp.$substring0($keyLength));
                }
                return;
            }
            var$12 = $buf.data;
            $nextChar = $intVal & 255 & 65535;
            var$11 = var$12.length;
            if ($offset != var$11)
                $newBuf = $buf;
            else {
                $newBuf = $rt_createCharArray(var$11 * 2 | 0);
                jl_System_arraycopy($buf, 0, $newBuf, 0, $offset);
            }
            if ($mode == 2) {
                $digit = jl_Character_digit($nextChar, 16);
                if ($digit >= 0) {
                    $unicode = ($unicode << 4) + $digit | 0;
                    $count = $count + 1 | 0;
                    if ($count < 4) {
                        $buf = $newBuf;
                        continue;
                    }
                } else if ($count <= 4)
                    break;
                var$12 = $newBuf.data;
                $mode = 0;
                var$11 = $offset + 1 | 0;
                var$12[$offset] = $unicode & 65535;
                if ($nextChar != 10) {
                    $buf = $newBuf;
                    $offset = var$11;
                    continue;
                }
                $offset = var$11;
            }
            if ($mode == 1)
                b: {
                    $mode = 0;
                    switch ($nextChar) {
                        case 10:
                            break;
                        case 13:
                            $mode = 3;
                            $buf = $newBuf;
                            continue a;
                        case 98:
                            $nextChar = 8;
                            break b;
                        case 102:
                            $nextChar = 12;
                            break b;
                        case 110:
                            $nextChar = 10;
                            break b;
                        case 114:
                            $nextChar = 13;
                            break b;
                        case 116:
                            $nextChar = 9;
                            break b;
                        case 117:
                            $mode = 2;
                            $unicode = 0;
                            $count = 0;
                            $buf = $newBuf;
                            continue a;
                        default:
                            break b;
                    }
                    $mode = 5;
                    $buf = $newBuf;
                    continue a;
                }
            else {
                c: {
                    d: {
                        e: {
                            switch ($nextChar) {
                                case 10:
                                    if ($mode != 3)
                                        break e;
                                    $mode = 5;
                                    $buf = $newBuf;
                                    continue a;
                                case 13:
                                    break e;
                                case 33:
                                case 35:
                                    break d;
                                case 58:
                                case 61:
                                    if ($keyLength != (-1))
                                        break c;
                                    $mode = 0;
                                    var$11 = $offset;
                                    $keyLength = $offset;
                                    $buf = $newBuf;
                                    $offset = var$11;
                                    continue a;
                                case 92:
                                    break;
                                default:
                                    break c;
                            }
                            if ($mode == 4)
                                $keyLength = $offset;
                            $mode = 1;
                            $buf = $newBuf;
                            continue a;
                        }
                        f: {
                            $mode = 0;
                            $firstChar = 1;
                            if ($offset <= 0) {
                                if ($offset)
                                    break f;
                                if ($keyLength)
                                    break f;
                            }
                            if ($keyLength == (-1))
                                $keyLength = $offset;
                            $temp = jl_String__init_0($newBuf, 0, $offset);
                            var$17 = $temp.$substring(0, $keyLength);
                            var$18 = $temp.$substring0($keyLength);
                            $this.$put(var$17, var$18);
                        }
                        $keyLength = (-1);
                        $offset = 0;
                        $buf = $newBuf;
                        continue a;
                    }
                    if ($firstChar) {
                        while (true) {
                            var$11 = $bis.$read1();
                            if (var$11 == (-1))
                                break;
                            var$11 = var$11 & 65535;
                            if (var$11 == 13) {
                                $buf = $newBuf;
                                continue a;
                            }
                            if (var$11 != 10)
                                continue;
                            else {
                                $buf = $newBuf;
                                continue a;
                            }
                        }
                        $buf = $newBuf;
                        continue a;
                    }
                }
                if ($nextChar < 256 && jl_Character_isWhitespace($nextChar)) {
                    if ($mode == 3)
                        $mode = 5;
                    if (!$offset) {
                        $buf = $newBuf;
                        continue;
                    }
                    if ($offset == $keyLength) {
                        $buf = $newBuf;
                        continue;
                    }
                    if ($mode == 5) {
                        $buf = $newBuf;
                        continue;
                    }
                    if ($keyLength == (-1)) {
                        $mode = 4;
                        $buf = $newBuf;
                        continue;
                    }
                }
                if (!($mode != 5 && $mode != 3))
                    $mode = 0;
            }
            $firstChar = 0;
            if ($mode == 4) {
                $mode = 0;
                $keyLength = $offset;
            }
            var$12 = $newBuf.data;
            var$11 = $offset + 1 | 0;
            var$12[$offset] = $nextChar;
            $buf = $newBuf;
            $offset = var$11;
        }
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(268)));
    } finally {
        jl_Object_monitorExitSync($this);
    }
}
function ju_Collections$_clinit_$lambda$_61_1() {
    jl_Object.call(this);
}
function ju_Collections$_clinit_$lambda$_61_1__init_0() {
    var var_0 = new ju_Collections$_clinit_$lambda$_61_1();
    ju_Collections$_clinit_$lambda$_61_1__init_(var_0);
    return var_0;
}
function ju_Collections$_clinit_$lambda$_61_1__init_(var$0) {
    jl_Object__init_0(var$0);
}
function ju_Collections$_clinit_$lambda$_61_0() {
    jl_Object.call(this);
}
function ju_Collections$_clinit_$lambda$_61_0__init_0() {
    var var_0 = new ju_Collections$_clinit_$lambda$_61_0();
    ju_Collections$_clinit_$lambda$_61_0__init_(var_0);
    return var_0;
}
function ju_Collections$_clinit_$lambda$_61_0__init_(var$0) {
    jl_Object__init_0(var$0);
}
function jl_NumberFormatException() {
    jl_IllegalArgumentException.call(this);
}
function jl_NumberFormatException__init_() {
    var var_0 = new jl_NumberFormatException();
    jl_NumberFormatException__init_1(var_0);
    return var_0;
}
function jl_NumberFormatException__init_0(var_0) {
    var var_1 = new jl_NumberFormatException();
    jl_NumberFormatException__init_2(var_1, var_0);
    return var_1;
}
function jl_NumberFormatException__init_1($this) {
    jl_IllegalArgumentException__init_1($this);
}
function jl_NumberFormatException__init_2($this, $message) {
    jl_IllegalArgumentException__init_2($this, $message);
}
function Screen() {
    UI.call(this);
}
function Screen__init_() {
    var var_0 = new Screen();
    Screen__init_0(var_0);
    return var_0;
}
function Screen__init_0($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        UI__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function EndScreen() {
    Screen.call(this);
    this.$win = 0;
}
function EndScreen__init_0(var_0) {
    var var_1 = new EndScreen();
    EndScreen__init_(var_1, var_0);
    return var_1;
}
function EndScreen__init_($this, $win) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$win = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Screen__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$win = $win;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $win, $ptr);
}
function EndScreen_addedToWorld($this, $w) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$w = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (!$this.$win) {
            var$2 = $rt_s(269);
            $ptr = 1;
            continue main;
        }
        var$2 = $rt_s(270);
        $ptr = 2;
        continue main;
    case 1:
        $this.$setImage1(var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    case 2:
        $this.$setImage1(var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $w, var$2, $ptr);
}
function gc_NeighbourCollisionQuery() {
    jl_Object.call(this);
}
function gc_NeighbourCollisionQuery__init_() {
    var var_0 = new gc_NeighbourCollisionQuery();
    gc_NeighbourCollisionQuery__init_0(var_0);
    return var_0;
}
function gc_NeighbourCollisionQuery__init_0($this) {
    jl_Object__init_0($this);
}
function gc_WorldHandler() {
    var a = this; jl_Object.call(a);
    a.$canvas = null;
    a.$theWorld = null;
    a.$simulation = null;
    a.$keyboardManager = null;
    a.$mouseManager0 = null;
    a.$touchManager = null;
    a.$onMenuHandler = null;
    a.$fontMetrics = null;
    a.$fontSize = 0;
    a.$repaintScheduled = 0;
}
var gc_WorldHandler_instance = null;
function gc_WorldHandler__init_(var_0) {
    var var_1 = new gc_WorldHandler();
    gc_WorldHandler__init_0(var_1, var_0);
    return var_1;
}
function gc_WorldHandler__init_0($this, $canvas) {
    var var$2, var$3;
    jl_Object__init_0($this);
    $this.$repaintScheduled = 0;
    $this.$canvas = $canvas;
    $this.$keyboardManager = gj_KeyboardManager__init_0();
    otjde_KeyboardEventTarget_listenKeyDown$static($canvas, $this.$keyboardManager);
    otjde_KeyboardEventTarget_listenKeyUp$static($canvas, $this.$keyboardManager);
    otjde_KeyboardEventTarget_listenKeyPress$static($canvas, $this.$keyboardManager);
    $this.$mouseManager0 = gj_MouseManager__init_($this);
    $this.$touchManager = gj_TouchManager__init_($this.$mouseManager0);
    $this.$onMenuHandler = gc_WorldHandler$1__init_($this);
    var$2 = $rt_s(271);
    var$3 = $this.$onMenuHandler;
    $canvas.addEventListener($rt_ustr(var$2), otji_JS_function(var$3, "handleEvent"));
    var$2 = 0;
    $canvas.tabIndex = var$2;
    $canvas.focus();
}
function gc_WorldHandler_initialise($canvas) {
    gc_WorldHandler_instance = gc_WorldHandler__init_($canvas);
}
function gc_WorldHandler_enableMouseListening($this) {
    var var$1, var$2, var$3;
    otjde_MouseEventTarget_listenClick$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_listenDoubleClick$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_listenMouseDown$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_listenMouseUp$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_listenMouseEnter$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_listenMouseLeaeve$static($this.$canvas, $this.$mouseManager0);
    var$1 = $this.$canvas;
    var$2 = $rt_s(200);
    var$3 = $this.$mouseManager0;
    var$1.addEventListener($rt_ustr(var$2), otji_JS_function(var$3, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $rt_s(201);
    var$3 = $this.$touchManager;
    var$1.addEventListener($rt_ustr(var$2), otji_JS_function(var$3, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $rt_s(202);
    var$3 = $this.$touchManager;
    var$1.addEventListener($rt_ustr(var$2), otji_JS_function(var$3, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $rt_s(204);
    var$3 = $this.$touchManager;
    var$1.addEventListener($rt_ustr(var$2), otji_JS_function(var$3, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $rt_s(203);
    var$3 = $this.$touchManager;
    var$1.addEventListener($rt_ustr(var$2), otji_JS_function(var$3, "handleEvent"));
}
function gc_WorldHandler_disableMouseListening($this) {
    var var$1, var$2, var$3;
    otjde_MouseEventTarget_neglectClick$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_neglectDoubleClick$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_neglectMouseDown$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_neglectMouseUp$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_neglectMouseEnter$static($this.$canvas, $this.$mouseManager0);
    otjde_MouseEventTarget_neglectMouseLeave$static($this.$canvas, $this.$mouseManager0);
    var$1 = $this.$canvas;
    var$2 = $rt_s(200);
    var$3 = $this.$mouseManager0;
    var$1.removeEventListener($rt_ustr(var$2), otji_JS_function(var$3, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $rt_s(201);
    var$3 = $this.$touchManager;
    var$1.removeEventListener($rt_ustr(var$2), otji_JS_function(var$3, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $rt_s(202);
    var$3 = $this.$touchManager;
    var$1.removeEventListener($rt_ustr(var$2), otji_JS_function(var$3, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $rt_s(204);
    var$3 = $this.$touchManager;
    var$1.removeEventListener($rt_ustr(var$2), otji_JS_function(var$3, "handleEvent"));
    var$1 = $this.$canvas;
    var$2 = $rt_s(203);
    var$3 = $this.$touchManager;
    var$1.removeEventListener($rt_ustr(var$2), otji_JS_function(var$3, "handleEvent"));
}
function gc_WorldHandler_getInstance() {
    return gc_WorldHandler_instance;
}
function gc_WorldHandler_getKeyboardManager($this) {
    return $this.$keyboardManager;
}
function gc_WorldHandler_getMouseManager($this) {
    return $this.$mouseManager0;
}
function gc_WorldHandler_setInitialisingWorld($this, $world) {
    return;
}
function gc_WorldHandler_objectAddedToWorld($this, $object) {
    return;
}
function gc_WorldHandler_doRepaint($this) {
    var var$1, var$2, $g2d, $curWorld, $bgImage;
    var$1 = $this.$canvas;
    var$2 = $rt_s(181);
    $g2d = var$1.getContext($rt_ustr(var$2));
    $curWorld = $this.$theWorld;
    if ($curWorld !== null) {
        $bgImage = $curWorld.$getBackground();
        if ($bgImage !== null)
            g_ImageVisitor_drawImageToCanvas($bgImage, $g2d, 0.0, 0.0);
        gc_WorldHandler_paintObjects($this, $g2d);
        gc_WorldHandler_paintWorldText($this, $curWorld, $g2d);
    }
}
function gc_WorldHandler_getWorld($this) {
    return $this.$theWorld;
}
function gc_WorldHandler_setWorld($this, $world) {
    var var$2, var$3, var$4;
    $this.$theWorld = $world;
    var$2 = $this.$canvas;
    var$3 = g_WorldVisitor_getWidthInPixels($world);
    var$2.width = var$3;
    var$2 = $this.$canvas;
    var$4 = g_WorldVisitor_getHeightInPixels($world);
    var$2.height = var$4;
    gc_WorldHandler_doRepaint($this);
    $this.$simulation.$worldCreated(ge_WorldEvent__init_($world));
    $this.$enableMouseListening();
}
function gc_WorldHandler_repaint($this) {
    if (!$this.$repaintScheduled) {
        $this.$repaintScheduled = 1;
        requestAnimationFrame(otji_JS_function(gc_WorldHandler$2__init_($this), "doRepaint"));
    }
}
function gc_WorldHandler_paintObjects($this, $g) {
    var $world, $objects, $paintSeq, $iter, $thing, $cellSize, $image, var$9, $halfWidth, $halfHeight, $ax, $ay, var$14, var$15, $xCenter, $paintX, $yCenter, $paintY, $rotation, var$21, var$22, var$23, $$je;
    $world = $this.$theWorld;
    $objects = g_WorldVisitor_getObjectsListInPaintOrder($world);
    $paintSeq = 0;
    $iter = $objects.$iterator();
    while ($iter.$hasNext()) {
        $thing = $iter.$next();
        $cellSize = g_WorldVisitor_getCellSize($world);
        $image = g_ActorVisitor_getDisplayImage($thing);
        if ($image !== null) {
            var$9 = $paintSeq + 1 | 0;
            g_ActorVisitor_setLastPaintSeqNum($thing, $paintSeq);
            $halfWidth = $image.$getWidth() / 2.0;
            $halfHeight = $image.$getHeight() / 2.0;
            a: {
                b: {
                    c: {
                        d: {
                            try {
                                $ax = g_ActorVisitor_getX($thing);
                                $ay = g_ActorVisitor_getY($thing);
                                var$14 = $rt_imul($ax, $cellSize);
                                var$15 = $cellSize;
                                $xCenter = var$14 + var$15 / 2.0;
                                $paintX = jl_Math_floor($xCenter - $halfWidth) | 0;
                                $yCenter = $rt_imul($ay, $cellSize) + var$15 / 2.0;
                                $paintY = jl_Math_floor($yCenter - $halfHeight) | 0;
                                $rotation = g_ActorVisitor_getRotation($thing);
                                if ($rotation)
                                    break d;
                                var$21 = $image.$getTransparency() / 255.0;
                                $g.globalAlpha = var$21;
                                g_ImageVisitor_drawImageToCanvas($image, $g, $paintX, $paintY);
                                break c;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                if ($$je instanceof jl_IllegalStateException) {
                                    break b;
                                } else {
                                    throw $$e;
                                }
                            }
                        }
                        try {
                            $g.save();
                            $g.translate($xCenter, $yCenter);
                            var$22 = jl_Math_toRadians($rotation);
                            $g.rotate(var$22);
                            var$22 =  -$xCenter;
                            var$14 =  -$yCenter;
                            $g.translate(var$22, var$14);
                            var$23 = $image.$getTransparency() / 255.0;
                            $g.globalAlpha = var$23;
                            g_ImageVisitor_drawImageToCanvas($image, $g, $paintX, $paintY);
                            $g.restore();
                            break c;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_IllegalStateException) {
                                break b;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                    break a;
                }
            }
            var$23 = 1.0;
            $g.globalAlpha = var$23;
            $paintSeq = var$9;
        }
    }
}
function gc_WorldHandler_paintWorldText($this, $world, $g) {
    var $labels, $textHeight, $scaleFactor, var$6, $cellsize, $label;
    $labels = g_WorldVisitor_getTextLabels($world);
    if ($labels.$isEmpty())
        return;
    if ($this.$fontMetrics === null) {
        $textHeight = gu_GraphicsUtilities_getFontHeightPx0($rt_s(272));
        $scaleFactor = 25.0 / $textHeight;
        $this.$fontSize = 25.0 * $scaleFactor | 0;
        $this.$fontMetrics = gu_GraphicsUtilities_getFontMetricsPx(jl_StringBuilder__init_().$append($rt_s(273)).$append3($this.$fontSize).$append($rt_s(274)).$toString());
    }
    var$6 = $rt_ustr(jl_StringBuilder__init_().$append($rt_s(273)).$append3($this.$fontSize).$append($rt_s(274)).$toString());
    $g.font = var$6;
    var$6 = "#FFFFFF";
    $g.fillStyle = var$6;
    var$6 = "#000000";
    $g.strokeStyle = var$6;
    $cellsize = g_WorldVisitor_getCellSize($world);
    var$6 = $labels.$iterator();
    while (var$6.$hasNext()) {
        $label = var$6.$next();
        $label.$draw($g, $this.$fontMetrics, $cellsize);
    }
}
function gc_WorldHandler_getObject($world, $x, $y) {
    var $objectsThere, $iter, $topmostActor, $seq, $actor, $actorSeq;
    if ($world === null)
        return null;
    $objectsThere = g_WorldVisitor_getObjectsAtPixel($world, $x, $y);
    if ($objectsThere.$isEmpty())
        return null;
    $iter = $objectsThere.$iterator();
    $topmostActor = $iter.$next();
    $seq = g_ActorVisitor_getLastPaintSeqNum($topmostActor);
    while ($iter.$hasNext()) {
        $actor = $iter.$next();
        $actorSeq = g_ActorVisitor_getLastPaintSeqNum($actor);
        if ($actorSeq > $seq) {
            $topmostActor = $actor;
            $seq = $actorSeq;
        }
    }
    return $topmostActor;
}
function gc_WorldHandler_addWorldListener($this, $simulation) {
    $this.$simulation = $simulation;
}
function gc_WorldHandler_simulationChanged($this, $e) {
    var $world;
    if ($e.$getType0() == 7) {
        $world = $this.$theWorld;
        if ($world !== null) {
            g_WorldVisitor_startSequence($world);
            $this.$mouseManager0.$newActStarted();
        }
    }
}
function gc_WorldHandler_hasWorld($this) {
    return $this.$theWorld === null ? 0 : 1;
}
function gc_WorldHandler_discardWorld($this) {
    $this.$simulation.$worldRemoved(ge_WorldEvent__init_(null));
    $this.$disableMouseListening();
}
function gc_WorldHandler_getTopMostActorAt($this, $x, $y) {
    var $tr;
    $tr = $this.$canvas.getBoundingClientRect();
    return gc_WorldHandler_getObject($this.$theWorld, $x - $tr.left | 0, $y - $tr.top | 0);
}
function gc_WorldHandler_getTranslatedX($this, $x) {
    var $tr;
    $tr = $this.$canvas.getBoundingClientRect();
    return g_WorldVisitor_toCellFloor($this.$theWorld, $x - $tr.left | 0);
}
function gc_WorldHandler_getTranslatedY($this, $y) {
    var $tr;
    $tr = $this.$canvas.getBoundingClientRect();
    return g_WorldVisitor_toCellFloor($this.$theWorld, $y - $tr.top | 0);
}
function gc_WorldHandler_access$000($x0) {
    gc_WorldHandler_doRepaint($x0);
}
function gc_WorldHandler_access$102($x0, $x1) {
    $x0.$repaintScheduled = $x1;
    return $x1;
}
function jnci_UTF8Charset() {
    jnc_Charset.call(this);
}
function jnci_UTF8Charset__init_0() {
    var var_0 = new jnci_UTF8Charset();
    jnci_UTF8Charset__init_(var_0);
    return var_0;
}
function jnci_UTF8Charset__init_($this) {
    jnc_Charset__init_0($this, $rt_s(275), $rt_createArray(jl_String, 0));
}
function jnci_UTF8Charset_newEncoder($this) {
    return jnci_UTF8Encoder__init_($this);
}
function jl_ClassNotFoundException() {
    jl_ReflectiveOperationException.call(this);
}
function jl_ClassNotFoundException__init_0() {
    var var_0 = new jl_ClassNotFoundException();
    jl_ClassNotFoundException__init_(var_0);
    return var_0;
}
function jl_ClassNotFoundException__init_($this) {
    jl_ReflectiveOperationException__init_0($this);
}
function gj_MouseManager$1$handleEvent$lambda$_1_0() {
    var a = this; jl_Object.call(a);
    a.$_016 = null;
    a.$_16 = null;
    a.$_21 = null;
}
function gj_MouseManager$1$handleEvent$lambda$_1_0__init_(var_0, var_1, var_2) {
    var var_3 = new gj_MouseManager$1$handleEvent$lambda$_1_0();
    gj_MouseManager$1$handleEvent$lambda$_1_0__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function gj_MouseManager$1$handleEvent$lambda$_1_0__init_0(var$0, var$1, var$2, var$3) {
    jl_Object__init_0(var$0);
    var$0.$_016 = var$1;
    var$0.$_16 = var$2;
    var$0.$_21 = var$3;
}
function gj_MouseManager$1$handleEvent$lambda$_1_0_run(var$0) {
    gj_MouseManager$1_lambda$handleEvent$0(var$0.$_016, var$0.$_16, var$0.$_21);
}
function jl_IllegalStateException() {
    jl_Exception.call(this);
}
function jl_IllegalStateException__init_0() {
    var var_0 = new jl_IllegalStateException();
    jl_IllegalStateException__init_1(var_0);
    return var_0;
}
function jl_IllegalStateException__init_(var_0) {
    var var_1 = new jl_IllegalStateException();
    jl_IllegalStateException__init_2(var_1, var_0);
    return var_1;
}
function jl_IllegalStateException__init_1($this) {
    jl_Exception__init_0($this);
}
function jl_IllegalStateException__init_2($this, $message) {
    jl_Exception__init_2($this, $message);
}
function ge_WorldEvent() {
    jl_Object.call(this);
    this.$world0 = null;
}
function ge_WorldEvent__init_(var_0) {
    var var_1 = new ge_WorldEvent();
    ge_WorldEvent__init_0(var_1, var_0);
    return var_1;
}
function ge_WorldEvent__init_0($this, $world) {
    jl_Object__init_0($this);
    $this.$world0 = $world;
}
function jn_URL() {
    jl_Object.call(this);
}
var jn_URL_streamHandlers = null;
var jn_URL_streamHandlerFactory = null;
function jn_URL_$callClinit() {
    jn_URL_$callClinit = $rt_eraseClinit(jn_URL);
    jn_URL__clinit_();
}
function jn_URL_setURLStreamHandlerFactory($streamFactory) {
    jn_URL_$callClinit();
    ju_Objects_requireNonNull($streamFactory);
    jn_URL_streamHandlers.$clear0();
    jn_URL_streamHandlerFactory = $streamFactory;
}
function jn_URL__clinit_() {
    jn_URL_streamHandlers = ju_HashMap__init_();
}
function g_Font() {
    var a = this; jl_Object.call(a);
    a.$name3 = null;
    a.$size3 = 0;
    a.$bold = 0;
    a.$italic = 0;
}
function g_Font__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new g_Font();
    g_Font__init_1(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function g_Font__init_0(var_0, var_1) {
    var var_2 = new g_Font();
    g_Font__init_2(var_2, var_0, var_1);
    return var_2;
}
function g_Font__init_1($this, $name, $bold, $italic, $size) {
    jl_Object__init_0($this);
    $this.$name3 = $name;
    $this.$bold = $bold;
    $this.$italic = $italic;
    $this.$size3 = $size;
}
function g_Font__init_2($this, $name, $size) {
    g_Font__init_1($this, $name, 0, 0, $size);
}
function g_Font_getName($this) {
    return $this.$name3;
}
function g_Font_getSize($this) {
    return $this.$size3;
}
function jl_NullPointerException() {
    jl_RuntimeException.call(this);
}
function jl_NullPointerException__init_0(var_0) {
    var var_1 = new jl_NullPointerException();
    jl_NullPointerException__init_2(var_1, var_0);
    return var_1;
}
function jl_NullPointerException__init_() {
    var var_0 = new jl_NullPointerException();
    jl_NullPointerException__init_1(var_0);
    return var_0;
}
function jl_NullPointerException__init_2($this, $message) {
    jl_RuntimeException__init_2($this, $message);
}
function jl_NullPointerException__init_1($this) {
    jl_RuntimeException__init_1($this);
}
function otpp_AsyncCallbackWrapper() {
    jl_Object.call(this);
    this.$realAsyncCallback = null;
}
function otpp_AsyncCallbackWrapper__init_(var_0) {
    var var_1 = new otpp_AsyncCallbackWrapper();
    otpp_AsyncCallbackWrapper__init_0(var_1, var_0);
    return var_1;
}
function otpp_AsyncCallbackWrapper__init_0($this, $realAsyncCallback) {
    jl_Object__init_0($this);
    $this.$realAsyncCallback = $realAsyncCallback;
}
function otpp_AsyncCallbackWrapper_create($realAsyncCallback) {
    return otpp_AsyncCallbackWrapper__init_($realAsyncCallback);
}
function otpp_AsyncCallbackWrapper_complete($this, $result) {
    $this.$realAsyncCallback.$complete($result);
}
function otpp_AsyncCallbackWrapper_error($this, $e) {
    $this.$realAsyncCallback.$error($e);
}
function jl_Object$Monitor() {
    var a = this; jl_Object.call(a);
    a.$enteringThreads = null;
    a.$notifyListeners = null;
    a.$owner = null;
    a.$count = 0;
}
function jl_Object$Monitor__init_() {
    var var_0 = new jl_Object$Monitor();
    jl_Object$Monitor__init_0(var_0);
    return var_0;
}
function jl_Object$Monitor__init_0($this) {
    jl_Object__init_0($this);
    $this.$owner = jl_Thread_currentThread();
}
function TitleDisplay() {
    var a = this; Text.call(a);
    a.$frame1 = 0;
    a.$prevTime0 = 0.0;
    a.$time0 = 0.0;
    a.$timeSinceChange0 = 0.0;
}
function TitleDisplay__init_0() {
    var var_0 = new TitleDisplay();
    TitleDisplay__init_(var_0);
    return var_0;
}
function TitleDisplay__init_($this) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Text__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$frame1 = 1;
        $this.$time0 = Long_toNumber(jl_System_nanoTime());
        $this.$prevTime0 = Long_toNumber(jl_System_nanoTime());
        $this.$timeSinceChange0 = 0.0;
        var$1 = $rt_s(276);
        $ptr = 2;
    case 2:
        $this.$setImage1(var$1);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function TitleDisplay_act($this) {
    var var$1, var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $this.$prevTime0 = $this.$time0;
        $this.$time0 = Long_toNumber(jl_System_nanoTime());
        $this.$timeSinceChange0 = $this.$timeSinceChange0 + $this.$time0 - $this.$prevTime0;
        if ($this.$timeSinceChange0 / 1.0E9 <= 0.3)
            return;
        $this.$timeSinceChange0 = 0.0;
        if ($this.$frame1 >= 3)
            $this.$frame1 = 1;
        else
            $this.$frame1 = $this.$frame1 + 1 | 0;
        var$1 = $this.$frame1;
        var$2 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append0(var$2, $rt_s(277)), var$1), $rt_s(217));
        var$2 = jl_StringBuilder_toString(var$2);
        $ptr = 1;
    case 1:
        $this.$setImage1(var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, $ptr);
}
function jl_Math() {
    jl_Object.call(this);
}
function jl_Math__init_0() {
    var var_0 = new jl_Math();
    jl_Math__init_(var_0);
    return var_0;
}
function jl_Math__init_($this) {
    jl_Object__init_0($this);
}
function jl_Math_sin(var$1) {
    return Math.sin(var$1);
}
function jl_Math_cos(var$1) {
    return Math.cos(var$1);
}
function jl_Math_toRadians($angdeg) {
    return $angdeg * 3.141592653589793 / 180.0;
}
function jl_Math_sqrt(var$1) {
    return Math.sqrt(var$1);
}
function jl_Math_floor(var$1) {
    return Math.floor(var$1);
}
function jl_Math_pow(var$1, var$2) {
    return Math.pow(var$1, var$2);
}
function jl_Math_random() {
    return Math.random();
}
function jl_Math_min($a, $b) {
    if ($a < $b)
        $b = $a;
    return $b;
}
function jl_Math_max($a, $b) {
    if ($a > $b)
        $b = $a;
    return $b;
}
function jl_Math_max1($a, $b) {
    if (Long_gt($a, $b))
        $b = $a;
    return $b;
}
function jl_Math_min0($a, $b) {
    if ($a < $b)
        $b = $a;
    return $b;
}
function jl_Math_max0($a, $b) {
    if ($a > $b)
        $b = $a;
    return $b;
}
function jl_Math_abs($n) {
    if ($n <= 0.0)
        $n =  -$n;
    return $n;
}
function jl_Math_signum($d) {
    if ($d > 0.0)
        $d = 1.0;
    else if ($d < 0.0)
        $d = (-1.0);
    return $d;
}
function Sort() {
    jl_Object.call(this);
}
function Sort__init_0() {
    var var_0 = new Sort();
    Sort__init_(var_0);
    return var_0;
}
function Sort__init_($this) {
    jl_Object__init_0($this);
}
function Sort_swap($arr, $i, $j) {
    var var$4, $temp;
    var$4 = $arr.data;
    $temp = var$4[$i];
    var$4[$i] = var$4[$j];
    var$4[$j] = $temp;
}
function Sort_partition($arr, $j, $high) {
    var var$4, $pivot, $i;
    var$4 = $arr.data;
    $pivot = var$4[$high];
    $i = $j - 1 | 0;
    while ($j <= ($high - 1 | 0)) {
        if (var$4[$j].$getZ() < $pivot.$getZ()) {
            $i = $i + 1 | 0;
            Sort_swap($arr, $i, $j);
        }
        $j = $j + 1 | 0;
    }
    Sort_swap($arr, $i + 1 | 0, $high);
    return $i + 1 | 0;
}
function Sort_quickSortScrollables($arr, $low, $high) {
    var $pi;
    if ($low < $high) {
        $pi = Sort_partition($arr, $low, $high);
        Sort_quickSortScrollables($arr, $low, $pi - 1 | 0);
        Sort_quickSortScrollables($arr, $pi + 1 | 0, $high);
    }
}
function ju_HashMap$HashMapEntrySet() {
    ju_AbstractSet.call(this);
    this.$associatedMap0 = null;
}
function ju_HashMap$HashMapEntrySet__init_(var_0) {
    var var_1 = new ju_HashMap$HashMapEntrySet();
    ju_HashMap$HashMapEntrySet__init_0(var_1, var_0);
    return var_1;
}
function ju_HashMap$HashMapEntrySet__init_0($this, $hm) {
    ju_AbstractSet__init_0($this);
    $this.$associatedMap0 = $hm;
}
function ju_HashMap$HashMapEntrySet_iterator($this) {
    return ju_HashMap$EntryIterator__init_($this.$associatedMap0);
}
function PlayButton() {
    var a = this; Button.call(a);
    a.$city4 = null;
    a.$linkBox0 = null;
    a.$ready = 0;
    a.$pressed = 0;
    a.$started0 = 0;
    a.$running = 0;
    a.$loadingDisplayed = 0;
    a.$duration = 0;
    a.$cooldown = 0;
    a.$loadingScreen = null;
}
function PlayButton__init_0(var_0, var_1) {
    var var_2 = new PlayButton();
    PlayButton__init_(var_2, var_0, var_1);
    return var_2;
}
function PlayButton__init_($this, $city, $linkBox) {
    var var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();$linkBox = $thread.pop();$city = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Button__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$city4 = $city;
        var$3 = $rt_s(278);
        $ptr = 2;
    case 2:
        $this.$setImage1(var$3);
        if ($rt_suspending()) {
            break main;
        }
        $this.$ready = 0;
        $this.$pressed = 0;
        $this.$linkBox0 = $linkBox;
        $this.$disconnect();
        $ptr = 3;
    case 3:
        $this.$readyButton();
        if ($rt_suspending()) {
            break main;
        }
        $this.$started0 = 0;
        $this.$running = 0;
        $this.$duration = 0;
        $this.$cooldown = 0;
        $this.$loadingDisplayed = 0;
        var$3 = new LoadingScreen;
        $ptr = 4;
    case 4:
        LoadingScreen__init_(var$3);
        if ($rt_suspending()) {
            break main;
        }
        $this.$loadingScreen = var$3;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $city, $linkBox, var$3, $ptr);
}
function PlayButton_setCooldown($this, $cooldown) {
    $this.$cooldown = $cooldown;
}
function PlayButton_addedToWorld($this, $w) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$w = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$2 = $rt_s(279);
        $ptr = 1;
    case 1:
        $this.$setImage1(var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $w, var$2, $ptr);
}
function PlayButton_disconnect($this) {
    $this.$ready = 0;
    $this.$pressed = 0;
}
function PlayButton_readyButton($this) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = $rt_s(279);
        $ptr = 1;
    case 1:
        $this.$setImage1(var$1);
        if ($rt_suspending()) {
            break main;
        }
        $this.$ready = 1;
        $this.$pressed = 0;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function PlayButton_act($this) {
    var var$1, $barTokenizer, $beatTokenizer, $bar, $startTime, $length, $confidence, $beat, var$9, var$10, var$11, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$11 = $thread.pop();var$10 = $thread.pop();var$9 = $thread.pop();$beat = $thread.pop();$confidence = $thread.pop();$length = $thread.pop();$startTime = $thread.pop();$bar = $thread.pop();$beatTokenizer = $thread.pop();$barTokenizer = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (g_Greenfoot_mousePressed($this) && $this.$ready) {
            $this.$pressed = 1;
            SoundManager_playSound($rt_s(18), 100);
            var$1 = $rt_s(280);
            $ptr = 1;
            continue main;
        }
        if (g_Greenfoot_mouseClicked($this) && $this.$ready && !$this.$cooldown) {
            $this.$loadingDisplayed = 1;
            document.getElementById('scenarioCanvas').focus();
            fetch("/spotify-audio-analysis").then(
                response => {
                    response.json().then(
                        data=>{
                            
                            $this.$city4.$getTrack().$initialize(data.sections.length, data.bars.length, data.beats.length);
                            
                            function logBars(value, index, array) {
                                if(index == array.length - 1){
                                    $this.$city4.$getTrack().$addBar(value.start, data.track.duration - value.start + 10, value.confidence)
                                }else{
                                    $this.$city4.$getTrack().$addBar(value.start, value.duration, value.confidence)
                                }
                            }
                            data.bars.forEach(logBars);
                            
                            var average_confidence = 0;
                            var total_confidence = 0;
                            function logNotes(value, index, array) {
                                total_confidence += value.confidence;
                                
                                $this.$city4.$getTrack().$addNote(value.start, value.duration, value.confidence, value.loudness_max_time * value.loudness_max)
                            }
                            
                            data.beats.forEach(logNotes);
                            average_confidence = total_confidence/data.beats.length;
                            
                            
                            $this.$started0 = 1;
                            $this.$duration = data.track.duration;
        
                            spotify_player.setVolume(0).then(()=>{
                                fetch(`/start-webplayer?device_id=${spotify_device_id}`, {method : "PUT"}).then(
                                    response=>{
                                        setTimeout(function(){
                                            spotify_player.pause().then(()=>{
                                                spotify_player.setVolume(0.5).then(()=>{
                                                    $this.$running = 1;
                                                });
                                            });
                                        }, 2000)
                                    }
                                );
                            });
                        }
                    );
                }
            );
        } else if (g_Greenfoot_mouseClicked(null)) {
            var$1 = $rt_s(279);
            $ptr = 2;
            continue main;
        }
        if ($this.$loadingDisplayed) {
            $this.$disconnect();
            var$1 = $this.$getWorld();
            var$9 = $this.$loadingScreen;
            var$10 = 480;
            var$11 = 300;
            $ptr = 3;
            continue main;
        }
        if ($this.$started0 && !$this.$loadingDisplayed) {
            var$1 = $this.$city4;
            $ptr = 4;
            continue main;
        }
        if ($this.$running && !$this.$loadingDisplayed) {
            $ptr = 5;
            continue main;
        }
        if ($this.$cooldown)
            $this.$cooldown = $this.$cooldown - 1 | 0;
        $this.$loadingDisplayed = 0;
        return;
    case 1:
        $this.$setImage1(var$1);
        if ($rt_suspending()) {
            break main;
        }
        if (g_Greenfoot_mouseClicked($this) && $this.$ready && !$this.$cooldown) {
            $barTokenizer = ju_StringTokenizer__init_($rt_s(281), $rt_s(138));
            $beatTokenizer = ju_StringTokenizer__init_($rt_s(282), $rt_s(138));
            $this.$city4.$getTrack().$initialize(1, $barTokenizer.$countTokens(), $beatTokenizer.$countTokens());
            c: {
                while (true) {
                    if (!$barTokenizer.$hasMoreTokens())
                        break c;
                    $bar = $barTokenizer.$nextToken();
                    if ($bar.$indexOf3($rt_s(283)) == (-1))
                        break;
                    $startTime = jl_Double_parseDouble($bar.$substring($bar.$indexOf3($rt_s(284)) + 6 | 0, $bar.$indexOf3($rt_s(285))));
                    $length = jl_Double_parseDouble($bar.$substring($bar.$indexOf3($rt_s(283)) + 9 | 0, $bar.$indexOf3($rt_s(286))));
                    $confidence = jl_Double_parseDouble($bar.$substring0($bar.$indexOf3($rt_s(287)) + 11 | 0));
                    $this.$city4.$getTrack().$addBar($startTime, $length, $confidence);
                }
            }
            d: {
                while (true) {
                    if (!$beatTokenizer.$hasMoreTokens())
                        break d;
                    $beat = $beatTokenizer.$nextToken();
                    if ($beat.$indexOf3($rt_s(283)) == (-1))
                        break;
                    $startTime = jl_Double_parseDouble($beat.$substring($beat.$indexOf3($rt_s(284)) + 6 | 0, $beat.$indexOf3($rt_s(285))));
                    $length = jl_Double_parseDouble($beat.$substring($beat.$indexOf3($rt_s(283)) + 9 | 0, $beat.$indexOf3($rt_s(286))));
                    $confidence = jl_Double_parseDouble($beat.$substring0($beat.$indexOf3($rt_s(287)) + 11 | 0));
                    $this.$city4.$getTrack().$addNote($startTime, $length, $confidence, 0.0);
                }
            }
            $this.$duration = 260;
            $this.$linkBox0.$isValid();
            $this.$loadingDisplayed = 1;
            $this.$started0 = 1;
            $this.$running = 1;
        } else if (g_Greenfoot_mouseClicked(null)) {
            var$1 = $rt_s(279);
            $ptr = 2;
            continue main;
        }
        if ($this.$loadingDisplayed) {
            $this.$disconnect();
            var$1 = $this.$getWorld();
            var$9 = $this.$loadingScreen;
            var$10 = 480;
            var$11 = 300;
            $ptr = 3;
            continue main;
        }
        if ($this.$started0 && !$this.$loadingDisplayed) {
            var$1 = $this.$city4;
            $ptr = 4;
            continue main;
        }
        if ($this.$running && !$this.$loadingDisplayed) {
            $ptr = 5;
            continue main;
        }
        if ($this.$cooldown)
            $this.$cooldown = $this.$cooldown - 1 | 0;
        $this.$loadingDisplayed = 0;
        return;
    case 2:
        $this.$setImage1(var$1);
        if ($rt_suspending()) {
            break main;
        }
        if ($this.$loadingDisplayed) {
            $this.$disconnect();
            var$1 = $this.$getWorld();
            var$9 = $this.$loadingScreen;
            var$10 = 480;
            var$11 = 300;
            $ptr = 3;
            continue main;
        }
        if ($this.$started0 && !$this.$loadingDisplayed) {
            var$1 = $this.$city4;
            $ptr = 4;
            continue main;
        }
        if ($this.$running && !$this.$loadingDisplayed) {
            $ptr = 5;
            continue main;
        }
        if ($this.$cooldown)
            $this.$cooldown = $this.$cooldown - 1 | 0;
        $this.$loadingDisplayed = 0;
        return;
    case 3:
        var$1.$addObject(var$9, var$10, var$11);
        if ($rt_suspending()) {
            break main;
        }
        if ($this.$started0 && !$this.$loadingDisplayed) {
            var$1 = $this.$city4;
            $ptr = 4;
            continue main;
        }
        if ($this.$running && !$this.$loadingDisplayed) {
            $ptr = 5;
            continue main;
        }
        if ($this.$cooldown)
            $this.$cooldown = $this.$cooldown - 1 | 0;
        $this.$loadingDisplayed = 0;
        return;
    case 4:
        var$1.$startGame();
        if ($rt_suspending()) {
            break main;
        }
        $this.$started0 = 0;
        if ($this.$running && !$this.$loadingDisplayed) {
            $ptr = 5;
            continue main;
        }
        if ($this.$cooldown)
            $this.$cooldown = $this.$cooldown - 1 | 0;
        $this.$loadingDisplayed = 0;
        return;
    case 5:
        $this.$readyButton();
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $this.$city4;
        var$10 = $this.$duration;
        $ptr = 6;
    case 6:
        var$1.$startRunning(var$10);
        if ($rt_suspending()) {
            break main;
        }
        $this.$getWorld().$removeObject($this.$loadingScreen);
        var$1 = $this.$getWorld();
        $ptr = 7;
    case 7:
        var$1.$removeUI();
        if ($rt_suspending()) {
            break main;
        }
        $this.$running = 0;
        if ($this.$cooldown)
            $this.$cooldown = $this.$cooldown - 1 | 0;
        $this.$loadingDisplayed = 0;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $barTokenizer, $beatTokenizer, $bar, $startTime, $length, $confidence, $beat, var$9, var$10, var$11, $ptr);
}
function g_ActorSet() {
    var a = this; ju_AbstractSet.call(a);
    a.$listHeadTail = null;
    a.$hashMap = null;
    a.$numActors = 0;
    a.$myHashCode = 0;
}
function g_ActorSet__init_0() {
    var var_0 = new g_ActorSet();
    g_ActorSet__init_(var_0);
    return var_0;
}
function g_ActorSet__init_($this) {
    ju_AbstractSet__init_0($this);
    $this.$listHeadTail = g_ActorSet$ListNode__init_($this);
    $this.$hashMap = $rt_createArray(g_ActorSet$ListNode, 0);
    $this.$numActors = 0;
    $this.$myHashCode = 0;
}
function g_ActorSet_add($this, $actor) {
    var $newNode, $seq, $hash, $hashHead;
    if ($this.$contains1($actor))
        return 0;
    $this.$numActors = $this.$numActors + 1 | 0;
    $newNode = g_ActorSet$ListNode__init_1($this, $actor, $this.$listHeadTail.$prev0);
    $seq = g_ActorVisitor_getSequenceNumber($actor);
    if ($this.$numActors >= (2 * $this.$hashMap.data.length | 0))
        g_ActorSet_resizeHashmap($this);
    else {
        $hash = $seq % $this.$hashMap.data.length | 0;
        $hashHead = $this.$hashMap.data[$hash];
        $this.$hashMap.data[$hash] = $newNode;
        $newNode.$setHashListHead($hashHead);
    }
    $this.$myHashCode = $this.$myHashCode + $seq | 0;
    return 1;
}
function g_ActorSet_resizeHashmap($this) {
    var $currentActor, $seq, $hash, $hashHead;
    $this.$hashMap = $rt_createArray(g_ActorSet$ListNode, $this.$numActors);
    $currentActor = $this.$listHeadTail.$next3;
    while ($currentActor !== $this.$listHeadTail) {
        $seq = g_ActorVisitor_getSequenceNumber($currentActor.$actor0);
        $hash = $seq % $this.$numActors | 0;
        $hashHead = $this.$hashMap.data[$hash];
        $this.$hashMap.data[$hash] = $currentActor;
        $currentActor.$setHashListHead($hashHead);
        $currentActor = $currentActor.$next3;
    }
}
function g_ActorSet_contains($this, $actor) {
    return g_ActorSet_getActorNode($this, $actor) === null ? 0 : 1;
}
function g_ActorSet_contains0($this, $o) {
    var $a;
    if (!($o instanceof g_Actor))
        return 0;
    $a = $o;
    return $this.$contains1($a);
}
function g_ActorSet_getActorNode($this, $actor) {
    var $seq, $hash, $hashHead, $curNode;
    if (!$this.$hashMap.data.length)
        return null;
    $seq = g_ActorVisitor_getSequenceNumber($actor);
    $hash = $seq % $this.$hashMap.data.length | 0;
    $hashHead = $this.$hashMap.data[$hash];
    if ($hashHead === null)
        return null;
    if ($hashHead.$actor0 === $actor)
        return $hashHead;
    $curNode = $hashHead.$nextHash;
    while (true) {
        if ($curNode === $hashHead)
            return null;
        if ($curNode.$actor0 === $actor)
            break;
        $curNode = $curNode.$nextHash;
    }
    return $curNode;
}
function g_ActorSet_remove($this, $actor) {
    var $actorNode;
    $actorNode = g_ActorSet_getActorNode($this, $actor);
    if ($actorNode === null)
        return 0;
    g_ActorSet_remove0($this, $actorNode);
    $this.$myHashCode = $this.$myHashCode - g_ActorVisitor_getSequenceNumber($actor) | 0;
    return 1;
}
function g_ActorSet_remove0($this, $actorNode) {
    var $seq, $hash;
    $seq = g_ActorVisitor_getSequenceNumber($actorNode.$actor0);
    $hash = $seq % $this.$hashMap.data.length | 0;
    if ($this.$hashMap.data[$hash] === $actorNode) {
        $this.$hashMap.data[$hash] = $actorNode.$nextHash;
        if ($this.$hashMap.data[$hash] === $actorNode)
            $this.$hashMap.data[$hash] = null;
    }
    $actorNode.$remove0();
    $this.$numActors = $this.$numActors - 1 | 0;
    if ($this.$numActors <= ($this.$hashMap.data.length / 2 | 0))
        g_ActorSet_resizeHashmap($this);
}
function g_ActorSet_size($this) {
    return $this.$numActors;
}
function g_ActorSet_iterator($this) {
    return g_ActorSet$ActorSetIterator__init_($this);
}
function g_ActorSet_add0($this, var$1) {
    return $this.$add1(var$1);
}
function g_ActorSet_access$000($x0) {
    return $x0.$listHeadTail;
}
function g_ActorSet_access$100($x0, $x1) {
    g_ActorSet_remove0($x0, $x1);
}
function g_WorldVisitor() {
    jl_Object.call(this);
}
function g_WorldVisitor__init_0() {
    var var_0 = new g_WorldVisitor();
    g_WorldVisitor__init_(var_0);
    return var_0;
}
function g_WorldVisitor__init_($this) {
    jl_Object__init_0($this);
}
function g_WorldVisitor_getWidthInPixels($w) {
    return $w.$getWidthInPixels();
}
function g_WorldVisitor_getHeightInPixels($w) {
    return $w.$getHeightInPixels();
}
function g_WorldVisitor_getCellSize($w) {
    return $w.$cellSize;
}
function g_WorldVisitor_getObjectsAtPixel($w, $x, $y) {
    return $w.$getObjectsAtPixel0($x, $y);
}
function g_WorldVisitor_startSequence($w) {
    $w.$startSequence();
}
function g_WorldVisitor_toCellFloor($world, $x) {
    return $world.$toCellFloor0($x);
}
function g_WorldVisitor_getObjectsListInPaintOrder($world) {
    return $world.$getObjectsListInPaintOrder();
}
function g_WorldVisitor_getObjectsListInActOrder($world) {
    return $world.$getObjectsListInActOrder0();
}
function g_WorldVisitor_getTextLabels($world) {
    return $world.$textLabels;
}
function gj_MouseManager$1() {
    jl_Object.call(this);
    this.$this$016 = null;
}
function gj_MouseManager$1__init_(var_0) {
    var var_1 = new gj_MouseManager$1();
    gj_MouseManager$1__init_0(var_1, var_0);
    return var_1;
}
function gj_MouseManager$1__init_0($this, $this$0) {
    $this.$this$016 = $this$0;
    jl_Object__init_0($this);
}
function gj_MouseManager$1_handleEvent($this, $e) {
    var $etype, var$3;
    $etype = $rt_str($e.type);
    $e.stopPropagation();
    $e.preventDefault();
    var$3 = jl_Thread__init_3(gj_MouseManager$1$handleEvent$lambda$_1_0__init_($this, $etype, $e));
    var$3.$start();
}
function gj_MouseManager$1_handleEvent0($this, var$1) {
    $this.$handleEvent1(var$1);
}
function gj_MouseManager$1_lambda$handleEvent$0($this, $etype, $e) {
    var var$3, var$4, var$5;
    a: {
        var$3 = (-1);
        switch ($etype.$hashCode()) {
            case 587111926:
                if (!$etype.$equals($rt_s(200)))
                    break a;
                var$3 = 0;
                break a;
            case 1243067904:
                if (!$etype.$equals($rt_s(198)))
                    break a;
                var$3 = 1;
                break a;
            default:
        }
    }
    b: {
        switch (var$3) {
            case 0:
                break;
            case 1:
                if ($e.button)
                    break b;
                gj_MouseManager_access$102($this.$this$016, 0);
                gj_MouseManager_access$200($this.$this$016, $e.clientX, $e.clientY, ($e.button + 1 | 0) << 16 >> 16);
                var$4 = otjdh_HTMLDocument_current();
                var$5 = $rt_s(200);
                var$4.removeEventListener($rt_ustr(var$5), otji_JS_function($this, "handleEvent"));
                var$4 = otjdh_HTMLDocument_current();
                var$5 = $rt_s(198);
                var$4.removeEventListener($rt_ustr(var$5), otji_JS_function($this, "handleEvent"));
                break b;
            default:
                break b;
        }
        gj_MouseManager_access$000($this.$this$016, $e.clientX, $e.clientY, 1);
    }
}
function gj_MouseManager$1_handleEvent$exported$0(var$0, var$1) {
    var$0.$handleEvent0(var$1);
}
function Player() {
    var a = this; Living.call(a);
    a.$xSpeed = 0.0;
    a.$ySpeed0 = 0.0;
    a.$gAcceleration0 = 0.0;
    a.$jumpSpeed = 0.0;
    a.$prevTime1 = 0.0;
    a.$time1 = 0.0;
    a.$totalDistance = 0.0;
    a.$backgroundOne = null;
    a.$backgroundTwo = null;
    a.$firstLoop0 = 0;
    a.$shiftPressed = 0;
    a.$grounded = 0;
    a.$startedRunning = 0;
    a.$spacePressed = 0;
    a.$buildingQueue = null;
    a.$playerImage = null;
    a.$linkBox1 = null;
}
function Player__init_(var_0) {
    var var_1 = new Player();
    Player__init_0(var_1, var_0);
    return var_1;
}
function Player__init_0($this, $linkBox) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$linkBox = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Living__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$linkBox1 = $linkBox;
        $this.$xSpeed = 0.0;
        $this.$ySpeed0 = 0.0;
        $this.$gAcceleration0 = 1.0;
        $this.$jumpSpeed = (-15.0);
        $this.$prevTime1 = Long_toNumber(jl_System_nanoTime());
        $this.$time1 = Long_toNumber(jl_System_nanoTime());
        var$2 = new Background;
        $ptr = 2;
    case 2:
        Background__init_0(var$2);
        if ($rt_suspending()) {
            break main;
        }
        $this.$backgroundOne = var$2;
        var$2 = new Background;
        $ptr = 3;
    case 3:
        Background__init_0(var$2);
        if ($rt_suspending()) {
            break main;
        }
        $this.$backgroundTwo = var$2;
        $this.$firstLoop0 = 1;
        $this.$buildingQueue = ju_LinkedList__init_();
        var$2 = new PlayerImage;
        $ptr = 4;
    case 4:
        PlayerImage__init_(var$2, $this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$playerImage = var$2;
        $this.$startedRunning = 0;
        $this.$grounded = 0;
        $this.$spacePressed = 0;
        $this.$totalDistance = 0.0;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $linkBox, var$2, $ptr);
}
function Player_addBuildings($this, $buildings) {
    var var$2, $b;
    $this.$buildingQueue = ju_LinkedList__init_();
    var$2 = $buildings.$iterator();
    while (var$2.$hasNext()) {
        $b = var$2.$next();
        $this.$buildingQueue.$add0($b);
    }
}
function Player_addedToWorld($this, $w) {
    var var$2, var$3, var$4, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$w = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($this.$backgroundOne.$getWorld() !== null)
            return;
        var$2 = $this.$backgroundOne;
        var$3 = 480;
        var$4 = 300;
        $ptr = 1;
    case 1:
        $w.$addObject(var$2, var$3, var$4);
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $this.$backgroundTwo;
        var$3 = 1440;
        var$4 = 300;
        $ptr = 2;
    case 2:
        $w.$addObject(var$2, var$3, var$4);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $w, var$2, var$3, var$4, $ptr);
}
function Player_removeBackgrounds($this) {
    if ($this.$backgroundOne.$getWorld() !== null) {
        $this.$backgroundOne.$getWorld().$removeObject($this.$backgroundOne);
        $this.$backgroundTwo.$getWorld().$removeObject($this.$backgroundTwo);
    }
}
function Player_addedToWorld0($this, $w) {
    var var$2, var$3, var$4, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$w = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Entity_addedToWorld($this, $w);
        if ($rt_suspending()) {
            break main;
        }
        var$2 = $this.$playerImage;
        var$3 = 0.0;
        var$4 = 0.0;
        $ptr = 2;
    case 2:
        $w.$addObject1(var$2, var$3, var$4);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $w, var$2, var$3, var$4, $ptr);
}
function Player_resetImage($this) {
    var $rect;
    $rect = g_GreenfootImage__init_0(10, 50);
    return $rect;
}
function Player_run($this) {
    var $xChange, $yChange, $enemies, var$4, $e, $s, $distanceBelow, var$8;
    $this.$prevTime1 = $this.$time1;
    $this.$time1 = Long_toNumber(jl_System_nanoTime());
    if ($this.$firstLoop0) {
        $this.$prevTime1 = Long_toNumber(jl_System_nanoTime());
        $this.$firstLoop0 = 0;
    }
    $xChange = $this.$timeMove($this.$xSpeed);
    $this.$setLocation0($this.$getExactX() + $xChange, $this.$getExactY());
    if ($this.$getIntersectingObjects($rt_cls(Building)).$size() > 0) {
        while ($this.$getIntersectingObjects($rt_cls(Building)).$size() > 0) {
            $this.$setLocation0($this.$getExactX() - jl_Math_signum($this.$xSpeed), $this.$getExactY());
        }
        $this.$xSpeed = 0.0;
    }
    if (!$this.$startedRunning)
        $this.$ySpeed0 = $this.$ySpeed0 + $this.$gAcceleration0;
    else
        $this.$ySpeed0 = $this.$ySpeed0 + $this.$timeMove($this.$gAcceleration0);
    if (!g_Greenfoot_isKeyDown($rt_s(62)))
        $this.$spacePressed = 0;
    else {
        $this.$linkBox1.$isValid();
        if (!$this.$startedRunning) {
            spotify_player.seek(0).then(() => {
                spotify_player.resume().then(() => {
                    $this.$xSpeed = 8.0;
                    $this.$startedRunning = 1;
                });
            });
            $this.$spacePressed = 1;
        } else if ($this.$xSpeed > 0.0 && !$this.$spacePressed) {
            $this.$setLocation0($this.$getExactX(), $this.$getExactY() + 10.0);
            if ($this.$getIntersectingObjects($rt_cls(Building)).$size() > 0) {
                $this.$ySpeed0 = $this.$jumpSpeed;
                $this.$grounded = 0;
            } else {
                $this.$setLocation0($this.$getExactX() - 60.0, $this.$getExactY());
                if ($this.$getIntersectingObjects($rt_cls(Building)).$size() > 0) {
                    $this.$ySpeed0 = $this.$jumpSpeed;
                    $this.$grounded = 0;
                }
                $this.$setLocation0($this.$getExactX() + 60.0, $this.$getExactY());
            }
            $this.$setLocation0($this.$getExactX(), $this.$getExactY() - 10.0);
        }
    }
    $yChange = $this.$timeMove($this.$ySpeed0);
    if (!$this.$startedRunning)
        $yChange = $this.$ySpeed0;
    $this.$setLocation0($this.$getExactX(), $this.$getExactY() + $yChange);
    if ($this.$getIntersectingObjects($rt_cls(Building)).$size() > 0) {
        while ($this.$getIntersectingObjects($rt_cls(Building)).$size() > 0) {
            $this.$setLocation0($this.$getExactX(), $this.$getExactY() - jl_Math_signum($this.$ySpeed0));
        }
        $this.$ySpeed0 = 0.0;
        $this.$grounded = 1;
    }
    if (!g_Greenfoot_isKeyDown($rt_s(61)))
        $this.$shiftPressed = 0;
    else if (!$this.$shiftPressed) {
        $enemies = $this.$getObjectsInRange(80, $rt_cls(Enemy));
        var$4 = $enemies.$iterator();
        while (var$4.$hasNext()) {
            $e = var$4.$next();
            $e.$slash($this);
            $this.$playerImage.$slash0();
        }
        //if ($enemies.$size() > 0)
            //SoundManager_playSound($rt_s(16), 40);
        $this.$shiftPressed = 1;
    }
    if ($this.$buildingQueue.$peek() !== null && $this.$getExactX() + ($this.$getImage1().$getWidth() / 2 | 0) > $this.$buildingQueue.$peek().$getExactX() + ($this.$buildingQueue.$peek().$getImage1().$getWidth() / 2 | 0))
        $this.$buildingQueue.$remove2();
    var$4 = $this.$getIntersectingObjects($rt_cls(Slope)).$iterator();
    while (var$4.$hasNext()) {
        $s = var$4.$next();
        $distanceBelow = $s.$distanceBelow($this.$getExactX(), $this.$getExactY() + ($this.$getImage1().$getHeight() / 2 | 0));
        if ($distanceBelow > 0.0)
            $this.$ySpeed0 = (-20.0);
    }
    if (!$this.$isDead()) {
        var$4 = $this.$backgroundOne;
        var$8 =  -$xChange;
        var$4.$moveRelative(var$8, $this.$getExactY());
        $this.$backgroundTwo.$moveRelative(var$8, $this.$getExactY());
    }
    if ($this.$getExactY() > 1000.0)
        $this.$xSpeed = 0.0;
    if ($this.$getExactX() > $this.$totalDistance)
        $this.$xSpeed = 0.0;
}
function Player_isDead($this) {
    var var$1, $s;
    if (!$this.$startedRunning)
        return 0;
    if ($this.$xSpeed === 0.0)
        return 1;
    var$1 = $this.$getScrollableWorld().$getObjectsOfType($rt_cls(Slope)).$iterator();
    while (true) {
        if (!var$1.$hasNext()) {
            if ($this.$buildingQueue.$peek() === null)
                return 0;
            return $this.$ySpeed0 > 10.0 && $this.$getExactY() + ($this.$getImage1().$getHeight() / 2 | 0) > $this.$buildingQueue.$peek().$getExactY() + $this.$buildingQueue.$peek().$getImage1().$getHeight() ? 1 : 0;
        }
        $s = var$1.$next();
        if ($this.$getExactX() > $s.$getExactX() - ($s.$getWidth() / 2 | 0) && $this.$getExactX() < $s.$getExactX() + ($s.$getWidth() / 2 | 0))
            break;
    }
    return 0;
}
function Player_timeMove($this, $speed) {
    return ($this.$time1 - $this.$prevTime1) / 1.6666666666666666E7 * $speed;
}
function Player_reset($this) {
    $this.$xSpeed = 0.0;
    $this.$ySpeed0 = 0.0;
    $this.$gAcceleration0 = 1.0;
    $this.$jumpSpeed = (-15.0);
    $this.$prevTime1 = Long_toNumber(jl_System_nanoTime());
    $this.$time1 = Long_toNumber(jl_System_nanoTime());
    $this.$firstLoop0 = 1;
    $this.$buildingQueue = ju_LinkedList__init_();
    $this.$startedRunning = 0;
}
function Player_setTotalDistance($this, $totalDistance) {
    $this.$totalDistance = $totalDistance;
}
function Player_getSpeed($this) {
    return 8.0;
}
function Player_getCurrentSpeed($this) {
    return $this.$xSpeed;
}
function Player_getGravity($this) {
    return $this.$gAcceleration0;
}
function Player_getJumpSpeed($this) {
    return $this.$jumpSpeed;
}
function Player_getPrevTime($this) {
    return $this.$prevTime1;
}
function Player_getTime($this) {
    return $this.$time1;
}
function Player_isGrounded($this) {
    var var$1;
    $this.$setLocation0($this.$getExactX(), $this.$getExactY() + 5.0);
    var$1 = $this.$getIntersectingObjects($rt_cls(Building)).$size() <= 0 ? 0 : 1;
    $this.$setLocation0($this.$getExactX(), $this.$getExactY() - 5.0);
    return var$1;
}
function LoadingScreen() {
    Screen.call(this);
}
function LoadingScreen__init_0() {
    var var_0 = new LoadingScreen();
    LoadingScreen__init_(var_0);
    return var_0;
}
function LoadingScreen__init_($this) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Screen__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $rt_s(288);
        $ptr = 2;
    case 2:
        $this.$setImage1(var$1);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function City() {
    var a = this; ScrollableWorld.call(a);
    a.$player0 = null;
    a.$linkBox2 = null;
    a.$track0 = null;
    a.$musicStopped = 0;
    a.$runStarted = 0;
    a.$gameOver0 = 0;
    a.$progressBar = null;
    a.$difficulty = 0.0;
    a.$timer = 0.0;
    a.$highlightsOn = 0;
    a.$runTime = 0;
}
function City__init_0(var_0) {
    var var_1 = new City();
    City__init_(var_1, var_0);
    return var_1;
}
function City__init_($this, $linkBox) {
    var var$2, var$3, var$4, var$5, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$linkBox = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$2 = 960;
        var$3 = 600;
        var$4 = 0.0;
        $ptr = 1;
    case 1:
        ScrollableWorld__init_2($this, var$2, var$3, var$4);
        if ($rt_suspending()) {
            break main;
        }
        $this.$linkBox2 = $linkBox;
        var$5 = new Player;
        $ptr = 2;
    case 2:
        Player__init_0(var$5, $linkBox);
        if ($rt_suspending()) {
            break main;
        }
        $this.$player0 = var$5;
        $this.$disableCamera(1);
        $this.$setZoom(1.0);
        $this.$track0 = Track__init_();
        $this.$track0.$initialize(0, 0, 0);
        $this.$runStarted = 0;
        $this.$difficulty = 0.5;
        $this.$highlightsOn = 1;
        $this.$timer = 0.0;
        $this.$gameOver0 = 0;
        $this.$runTime = 0;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $linkBox, var$2, var$3, var$4, var$5, $ptr);
}
function City_toggleHighlights($this) {
    $this.$highlightsOn = $this.$highlightsOn ? 0 : 1;
}
function City_highlightsEnabled($this) {
    return $this.$highlightsOn;
}
function City_getDifficulty($this) {
    return $this.$difficulty;
}
function City_setDifficulty($this, $difficulty) {
    $this.$difficulty = $difficulty;
}
function City_getTrack($this) {
    return $this.$track0;
}
function City_run($this) {
    var var$1, var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($this.$runStarted && !(!$this.$player0.$isDead() && !$this.$musicStopped)) {
            $this.$setCameraTarget(null);
            $this.$timer = $this.$timer + $this.$player0.$getTime() - $this.$player0.$getPrevTime();
        }
        if ($this.$timer / 1.0E9 > 1.0 && !$this.$gameOver0) {
            $this.$linkBox2.$isValid();
            if ($this.$progressBar.$getDistanceTravelled() < $this.$progressBar.$getSongDuration()) {
                var$1 = $this.$getWorld();
                var$2 = 0;
                $ptr = 1;
                continue main;
            }
            var$1 = $this.$getWorld();
            var$2 = 1;
            $ptr = 2;
            continue main;
        }
        return;
    case 1:
        var$1.$addEndUI(var$2);
        if ($rt_suspending()) {
            break main;
        }
        spotify_player.pause();
        $this.$getWorld().$removeObject($this.$progressBar);
        $this.$gameOver0 = 1;
        $this.$timer = 0.0;
        return;
    case 2:
        var$1.$addEndUI(var$2);
        if ($rt_suspending()) {
            break main;
        }
        spotify_player.pause(0);
        $this.$getWorld().$removeObject($this.$progressBar);
        $this.$gameOver0 = 1;
        $this.$timer = 0.0;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, $ptr);
}
function City_startGame($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $this.$musicStopped = 0;
        $this.$player0.$reset0();
        $ptr = 1;
    case 1:
        $this.$generateBuildings();
        if ($rt_suspending()) {
            break main;
        }
        $ptr = 2;
    case 2:
        $this.$generateEnemies();
        if ($rt_suspending()) {
            break main;
        }
        $this.$gameOver0 = 0;
        $this.$timer = 0.0;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function City_startRunning($this, $runTime) {
    var var$2, var$3, var$4, var$5, var$6, var$7, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$runTime = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $this.$runTime = $runTime;
        var$2 = $this.$player0;
        var$3 = 0.0;
        var$4 = 0.0;
        $ptr = 1;
    case 1:
        $this.$addObject1(var$2, var$3, var$4);
        if ($rt_suspending()) {
            break main;
        }
        $this.$player0.$addBuildings($this.$getObjectsOfType($rt_cls(Building)));
        SoundManager_playMusic();
        SoundManager_stopMusic();
        var$2 = new ProgressBar;
        var$5 = $this.$player0;
        $ptr = 2;
    case 2:
        ProgressBar__init_0(var$2, $runTime, var$5);
        if ($rt_suspending()) {
            break main;
        }
        $this.$progressBar = var$2;
        $this.$player0.$setTotalDistance(($runTime * 60 | 0) * $this.$player0.$getSpeed());
        var$2 = $this.$getWorld();
        var$5 = $this.$progressBar;
        var$6 = 480;
        var$7 = 43;
        $ptr = 3;
    case 3:
        var$2.$addObject(var$5, var$6, var$7);
        if ($rt_suspending()) {
            break main;
        }
        $this.$setCameraTarget0($this.$player0, 250.0, (-75.0));
        $this.$runStarted = 1;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $runTime, var$2, var$3, var$4, var$5, var$6, var$7, $ptr);
}
function City_restart($this) {
    var var$1, $e, var$3, var$4, var$5, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();$e = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = $this.$getObjectsOfType($rt_cls(Enemy)).$iterator();
        while (var$1.$hasNext()) {
            $e = var$1.$next();
            $this.$removeObject0($e);
        }
        var$1 = $this.$getWorld();
        $ptr = 1;
    case 1:
        var$1.$addUI();
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $this.$getWorld();
        $ptr = 2;
    case 2:
        var$1.$removeUI();
        if ($rt_suspending()) {
            break main;
        }
        $ptr = 3;
    case 3:
        $this.$generateEnemies();
        if ($rt_suspending()) {
            break main;
        }
        $this.$gameOver0 = 0;
        $this.$timer = 0.0;
        $this.$musicStopped = 0;
        $this.$player0.$reset0();
        $this.$player0.$setLocation0(0.0, 0.0);
        $this.$player0.$addBuildings($this.$getObjectsOfType($rt_cls(Building)));
        SoundManager_stopMusic();
        var$1 = new ProgressBar;
        var$3 = $this.$runTime;
        var$4 = $this.$player0;
        $ptr = 4;
    case 4:
        ProgressBar__init_0(var$1, var$3, var$4);
        if ($rt_suspending()) {
            break main;
        }
        $this.$progressBar = var$1;
        var$1 = $this.$getWorld();
        var$4 = $this.$progressBar;
        var$3 = 480;
        var$5 = 43;
        $ptr = 5;
    case 5:
        var$1.$addObject(var$4, var$3, var$5);
        if ($rt_suspending()) {
            break main;
        }
        $this.$setCameraTarget0($this.$player0, 250.0, (-75.0));
        $this.$runStarted = 1;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $e, var$3, var$4, var$5, $ptr);
}
function City_generateBuildings($this) {
    var $yLevel, $totalLength, $buffer, $prevBuilding, var$5, var$6, var$7, var$8, $beat, $yChange, var$11, var$12, $jumpTime, $buildingLength, $b, var$16, var$17, var$18, var$19, var$20, var$21, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$21 = $thread.pop();var$20 = $thread.pop();var$19 = $thread.pop();var$18 = $thread.pop();var$17 = $thread.pop();var$16 = $thread.pop();$b = $thread.pop();$buildingLength = $thread.pop();$jumpTime = $thread.pop();var$12 = $thread.pop();var$11 = $thread.pop();$yChange = $thread.pop();$beat = $thread.pop();var$8 = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();$prevBuilding = $thread.pop();$buffer = $thread.pop();$totalLength = $thread.pop();$yLevel
        = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $yLevel = 200;
        $totalLength = 0;
        $buffer = 200;
        $prevBuilding = null;
        var$5 = $this.$track0.$getBars().data;
        var$6 = var$5.length;
        var$7 = 0;
        var$8 = $yLevel;
        if (var$7 >= var$6)
            return;
        $beat = var$5[var$7];
        $yChange = Calc_randomizeInt((-45), 10);
        if ((var$8 + $yChange | 0) < (-450))
            $yChange = 0;
        var$11 = $beat.data;
        var$12 = var$8 + $yChange | 0;
        $jumpTime = $this.$getKinematicTime($this.$player0.$getGravity(), $this.$player0.$getJumpSpeed(), $yChange) / 60.0;
        $buildingLength = $this.$getBuildingLength(var$11[1] - $jumpTime) + 50 | 0;
        $b = new Building;
        var$16 = $buildingLength + $buffer | 0;
        var$8 = 50;
        $ptr = 1;
    case 1:
        Building__init_2($b, var$16, var$8);
        if ($rt_suspending()) {
            break main;
        }
        if ($buffer) {
            $b = new Building;
            var$8 = 50;
            var$17 = 0;
            var$18 = 1;
            $ptr = 2;
            continue main;
        }
        var$19 = (($totalLength + ($buildingLength / 2 | 0) | 0) + ($this.$getBuildingLength($jumpTime) / 2 | 0) | 0) - ($buffer / 2 | 0) | 0;
        var$20 = var$12;
        $ptr = 3;
        continue main;
    case 2:
        Building__init_0($b, var$16, var$8, var$17, var$18);
        if ($rt_suspending()) {
            break main;
        }
        var$19 = (($totalLength + ($buildingLength / 2 | 0) | 0) + ($this.$getBuildingLength($jumpTime) / 2 | 0) | 0) - ($buffer / 2 | 0) | 0;
        var$20 = var$12;
        $ptr = 3;
    case 3:
        $this.$addObject1($b, var$19, var$20);
        if ($rt_suspending()) {
            break main;
        }
        if (!g_Greenfoot_getRandomNumber(7) && !$buffer && $buildingLength > 168 && $prevBuilding.$getWidth() > 168) {
            var$21 = new Slope;
            var$8 = $this.$getBuildingLength($jumpTime);
            $ptr = 4;
            continue main;
        }
        $totalLength = $totalLength + $this.$getBuildingLength(var$11[1]) | 0;
        $buffer = 0;
        var$7 = var$7 + 1 | 0;
        var$8 = var$12;
        $prevBuilding = $b;
        $yLevel = var$12;
        if (var$7 >= var$6)
            return;
        $beat = var$5[var$7];
        $yChange = Calc_randomizeInt((-45), 10);
        if ((var$8 + $yChange | 0) < (-450))
            $yChange = 0;
        var$11 = $beat.data;
        var$12 = var$8 + $yChange | 0;
        $jumpTime = $this.$getKinematicTime($this.$player0.$getGravity(), $this.$player0.$getJumpSpeed(), $yChange) / 60.0;
        $buildingLength = $this.$getBuildingLength(var$11[1] - $jumpTime) + 50 | 0;
        $b = new Building;
        var$16 = $buildingLength + $buffer | 0;
        var$8 = 50;
        $ptr = 1;
        continue main;
    case 4:
        Slope__init_0(var$21, var$8);
        if ($rt_suspending()) {
            break main;
        }
        var$20 = $totalLength;
        var$19 = jl_Math_max(var$12, $yLevel) + 40 | 0;
        $ptr = 5;
    case 5:
        $this.$addObject1(var$21, var$20, var$19);
        if ($rt_suspending()) {
            break main;
        }
        $totalLength = $totalLength + $this.$getBuildingLength(var$11[1]) | 0;
        $buffer = 0;
        var$7 = var$7 + 1 | 0;
        var$8 = var$12;
        $prevBuilding = $b;
        $yLevel = var$12;
        if (var$7 >= var$6)
            return;
        $beat = var$5[var$7];
        $yChange = Calc_randomizeInt((-45), 10);
        if ((var$8 + $yChange | 0) < (-450))
            $yChange = 0;
        var$11 = $beat.data;
        var$12 = var$8 + $yChange | 0;
        $jumpTime = $this.$getKinematicTime($this.$player0.$getGravity(), $this.$player0.$getJumpSpeed(), $yChange) / 60.0;
        $buildingLength = $this.$getBuildingLength(var$11[1] - $jumpTime) + 50 | 0;
        $b = new Building;
        var$16 = $buildingLength + $buffer | 0;
        var$8 = 50;
        $ptr = 1;
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $yLevel, $totalLength, $buffer, $prevBuilding, var$5, var$6, var$7, var$8, $beat, $yChange, var$11, var$12, $jumpTime, $buildingLength, $b, var$16, var$17, var$18, var$19, var$20, var$21, $ptr);
}
function City_generateEnemies($this) {
    var var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$8 = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = $this.$track0.$getNotes().data;
        var$2 = var$1.length;
        var$3 = 0;
        while (var$3 < var$2) {
            var$4 = var$1[var$3].data;
            if (var$4[2] > $this.$track0.$getAverageNoteConfidence() * 1.0 / $this.$difficulty) {
                var$5 = new Enemy;
                var$6 = $this.$player0;
                $ptr = 1;
                continue main;
            }
            var$3 = var$3 + 1 | 0;
        }
        return;
    case 1:
        Enemy__init_0(var$5, var$6);
        if ($rt_suspending()) {
            break main;
        }
        var$7 = $this.$getBuildingLength(var$4[0]);
        var$8 = (-500.0);
        $ptr = 2;
    case 2:
        $this.$addObject1(var$5, var$7, var$8);
        if ($rt_suspending()) {
            break main;
        }
        while (true) {
            var$3 = var$3 + 1 | 0;
            if (var$3 >= var$2)
                break;
            var$4 = var$1[var$3].data;
            if (var$4[2] <= $this.$track0.$getAverageNoteConfidence() * 1.0 / $this.$difficulty)
                continue;
            else {
                var$5 = new Enemy;
                var$6 = $this.$player0;
                $ptr = 1;
                continue main;
            }
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, $ptr);
}
function City_getBuildingLength($this, $time) {
    return $time * 60.0 * $this.$player0.$getSpeed() | 0;
}
function City_getKinematicTime($this, $a, $vI, $d) {
    var $insideRoot, $squareRoot, var$6, $firstQuad, $secondQuad;
    $insideRoot = $vI * $vI - 4.0 * 0.5 * $a *  -$d;
    $squareRoot = jl_Math_sqrt($insideRoot);
    var$6 =  -$vI;
    $firstQuad = (var$6 + $squareRoot) / (2.0 * 0.5 * $a);
    $secondQuad = (var$6 - $squareRoot) / (2.0 * 0.5 * $a);
    if ($firstQuad >= 0.0)
        return $firstQuad;
    return $secondQuad;
}
function City_stopGame($this) {
    var var$1, $b, $s, $e, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$e = $thread.pop();$s = $thread.pop();$b = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = $this.$getObjectsOfType($rt_cls(Building)).$iterator();
        while (var$1.$hasNext()) {
            $b = var$1.$next();
            $this.$removeObject0($b);
        }
        var$1 = $this.$getObjectsOfType($rt_cls(Slope)).$iterator();
        while (var$1.$hasNext()) {
            $s = var$1.$next();
            $this.$removeObject0($s);
        }
        var$1 = $this.$getObjectsOfType($rt_cls(Enemy)).$iterator();
        while (var$1.$hasNext()) {
            $e = var$1.$next();
            $this.$removeObject0($e);
        }
        $this.$removeObject0($this.$player0);
        $this.$player0.$removeBackgrounds();
        var$1 = $this.$getWorld();
        $ptr = 1;
    case 1:
        var$1.$addUI();
        if ($rt_suspending()) {
            break main;
        }
        $this.$musicStopped = 1;
        $this.$runStarted = 0;
        SoundManager_stopMusic();
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $b, $s, $e, $ptr);
}
function City_getPercentageFinished($this) {
    return jl_Math_min0($this.$progressBar.$getDistanceTravelled() / $this.$progressBar.$getSongDuration() * 100.0, 100.0) | 0;
}
function Chunk() {
    jl_Object.call(this);
    this.$scrollableActors = null;
}
function Chunk__init_0() {
    var var_0 = new Chunk();
    Chunk__init_(var_0);
    return var_0;
}
function Chunk__init_($this) {
    jl_Object__init_0($this);
    $this.$scrollableActors = ju_ArrayList__init_();
}
function Chunk_add($this, $s) {
    $this.$scrollableActors.$add0($s);
}
function Chunk_remove($this, $s) {
    $this.$scrollableActors.$remove1($s);
}
function Chunk_getScrollableActors($this) {
    return $this.$scrollableActors;
}
function gj_JsActorDelegate() {
    var a = this; jl_Object.call(a);
    a.$props = null;
    a.$imageCache0 = null;
}
function gj_JsActorDelegate__init_(var_0) {
    var var_1 = new gj_JsActorDelegate();
    gj_JsActorDelegate__init_0(var_1, var_0);
    return var_1;
}
function gj_JsActorDelegate__init_0($this, $props) {
    jl_Object__init_0($this);
    $this.$imageCache0 = ju_HashMap__init_();
    $this.$props = $props;
}
function gj_JsActorDelegate_getImage($this, $name) {
    var $propName, $imgName, $r, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$r = $thread.pop();$imgName = $thread.pop();$propName = $thread.pop();$name = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $propName = jl_StringBuilder__init_().$append($rt_s(289)).$append($name).$append($rt_s(290)).$toString();
        $imgName = $this.$props.$getProperty($propName);
        if ($imgName === null)
            return g_GreenfootImage__init_0(10, 10);
        $r = $this.$imageCache0.$get($imgName);
        if ($r !== null)
            return $r;
        $r = new g_GreenfootImage;
        $ptr = 1;
    case 1:
        g_GreenfootImage__init_($r, $imgName);
        if ($rt_suspending()) {
            break main;
        }
        $this.$imageCache0.$put($imgName, $r);
        return $r;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $name, $propName, $imgName, $r, $ptr);
}
function jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0() {
    jl_Object.call(this);
    this.$_017 = null;
}
function jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0__init_(var_0) {
    var var_1 = new jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0();
    jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0__init_0(var_1, var_0);
    return var_1;
}
function jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_017 = var$1;
}
function jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0_run(var$0) {
    jl_Object$NotifyListenerImpl_lambda$onTimer$1(var$0.$_017);
}
function g_TreeActorSet() {
    var a = this; ju_AbstractSet.call(a);
    a.$subSets = null;
    a.$generalSet = null;
    a.$classSets = null;
}
function g_TreeActorSet__init_() {
    var var_0 = new g_TreeActorSet();
    g_TreeActorSet__init_0(var_0);
    return var_0;
}
function g_TreeActorSet__init_0($this) {
    ju_AbstractSet__init_0($this);
    $this.$subSets = ju_LinkedList__init_();
    $this.$generalSet = g_ActorSet__init_0();
    $this.$subSets.$add0($this.$generalSet);
    $this.$classSets = ju_HashMap__init_();
}
function g_TreeActorSet_setClassOrder($this, $reverse, $classes) {
    var $oldClassSets, $sweepClasses, $i, var$6, $i_0, $oldSet, $sweptClasses, $sweepClass, $sweepSet, $i_1, $actor, $set, $ei, $entry, $destinationSet, var$18, var$19;
    $oldClassSets = $this.$classSets;
    $this.$classSets = ju_HashMap__init_();
    $sweepClasses = ju_LinkedList__init_();
    $i = 0;
    while (true) {
        var$6 = $classes.data;
        $i_0 = var$6.length;
        if ($i >= $i_0)
            break;
        $oldSet = $oldClassSets.$remove6(var$6[$i]);
        if ($oldSet === null) {
            $sweepClasses.$add0(var$6[$i]);
            $oldSet = g_ActorSet__init_0();
        }
        $this.$classSets.$put(var$6[$i], $oldSet);
        $i = $i + 1 | 0;
    }
    $sweptClasses = ju_HashSet__init_();
    while (!$sweepClasses.$isEmpty()) {
        $sweepClass = $sweepClasses.$removeFirst().$getSuperclass();
        $sweepSet = $this.$classSets.$get($sweepClass);
        while ($sweepSet === null) {
            $sweepClass = $sweepClass.$getSuperclass();
            if ($sweepClass === null) {
                $sweepSet = $this.$generalSet;
                continue;
            }
            $sweepSet = $this.$classSets.$get($sweepClass);
        }
        if (!$sweptClasses.$contains0($sweepClass)) {
            $sweptClasses.$add0($sweepClass);
            $i_1 = $sweepSet.$iterator();
            while ($i_1.$hasNext()) {
                $actor = $i_1.$next();
                $set = g_TreeActorSet_setForActor($this, $actor);
                if ($set !== $sweepSet) {
                    $set.$add1($actor);
                    $i_1.$remove0();
                }
            }
        }
    }
    $ei = $oldClassSets.$entrySet().$iterator();
    while ($ei.$hasNext()) {
        $entry = $ei.$next();
        $destinationSet = g_TreeActorSet_setForClass($this, $entry.$getKey0());
        $destinationSet.$addAll($entry.$getValue());
    }
    $this.$subSets.$clear0();
    if ($reverse) {
        $this.$subSets.$add0($this.$generalSet);
        while ($i_0 > 0) {
            var$18 = $this.$subSets;
            var$19 = $this.$classSets;
            $i_0 = $i_0 + (-1) | 0;
            var$18.$add0(var$19.$get(var$6[$i_0]));
        }
    } else {
        $i = 0;
        while ($i < $i_0) {
            $this.$subSets.$add0($this.$classSets.$get(var$6[$i]));
            $i = $i + 1 | 0;
        }
        $this.$subSets.$add0($this.$generalSet);
    }
}
function g_TreeActorSet_iterator($this) {
    return g_TreeActorSet$TasIterator__init_($this);
}
function g_TreeActorSet_size($this) {
    var $size, $i;
    $size = 0;
    $i = $this.$subSets.$iterator();
    while ($i.$hasNext()) {
        $size = $size + $i.$next().$size() | 0;
    }
    return $size;
}
function g_TreeActorSet_add($this, $o) {
    if ($o !== null)
        return g_TreeActorSet_setForActor($this, $o).$add1($o);
    $rt_throw(jl_UnsupportedOperationException__init_1($rt_s(291)));
}
function g_TreeActorSet_remove($this, $o) {
    return g_TreeActorSet_setForActor($this, $o).$remove($o);
}
function g_TreeActorSet_setForActor($this, $o) {
    var $oClass;
    $oClass = jl_Object_getClass($o);
    return g_TreeActorSet_setForClass($this, $oClass);
}
function g_TreeActorSet_setForClass($this, $oClass) {
    var $set;
    $set = $this.$classSets.$get($oClass);
    while ($set === null && $oClass !== $rt_cls(jl_Object)) {
        $oClass = $oClass.$getSuperclass();
        $set = $this.$classSets.$get($oClass);
    }
    if ($set === null)
        $set = $this.$generalSet;
    return $set;
}
function g_TreeActorSet_add0($this, var$1) {
    return $this.$add1(var$1);
}
function g_TreeActorSet_access$000($x0) {
    return $x0.$subSets;
}
function jl_String$_clinit_$lambda$_81_0() {
    jl_Object.call(this);
}
function jl_String$_clinit_$lambda$_81_0__init_0() {
    var var_0 = new jl_String$_clinit_$lambda$_81_0();
    jl_String$_clinit_$lambda$_81_0__init_(var_0);
    return var_0;
}
function jl_String$_clinit_$lambda$_81_0__init_(var$0) {
    jl_Object__init_0(var$0);
}
function PlayerImage() {
    var a = this; Image.call(a);
    a.$frame2 = 0;
    a.$timeSinceChange1 = 0.0;
    a.$slashCooldown = 0.0;
    a.$player1 = null;
}
function PlayerImage__init_0(var_0) {
    var var_1 = new PlayerImage();
    PlayerImage__init_(var_1, var_0);
    return var_1;
}
function PlayerImage__init_($this, $player) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$player = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Image__init_0($this, $player);
        if ($rt_suspending()) {
            break main;
        }
        $this.$player1 = $player;
        $this.$frame2 = 1;
        $this.$timeSinceChange1 = 0.0;
        $this.$setImage(g_GreenfootImage__init_0(1, 1));
        $this.$slashCooldown = 0.0;
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $player, $ptr);
}
function PlayerImage_run($this) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($this.$player1.$getScrollableWorld() === null)
            $this.$getScrollableWorld().$removeObject0($this);
        else {
            $this.$setLocation0($this.$player1.$getExactX(), $this.$player1.$getExactY());
            $this.$timeSinceChange1 = $this.$timeSinceChange1 + $this.$player1.$getTime() - $this.$player1.$getPrevTime();
            if ($this.$timeSinceChange1 / 1.0E9 > 0.3) {
                if ($this.$frame2 != 1 && $this.$frame2 != 4)
                    $this.$frame2 = 1;
                else
                    $this.$frame2 = 2;
                $this.$timeSinceChange1 = 0.0;
                $ptr = 4;
                continue main;
            }
            if ($this.$player1.$getScrollableWorld() !== null && !$this.$player1.$isGrounded()) {
                $this.$frame2 = 2;
                $ptr = 3;
                continue main;
            }
        }
        if ($this.$slashCooldown > 0.0) {
            $this.$frame2 = 4;
            $ptr = 1;
            continue main;
        }
        if ($this.$player1.$getCurrentSpeed() !== 0.0)
            return;
        $this.$frame2 = 3;
        $ptr = 2;
        continue main;
    case 1:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $tmp;
        $this.$setImage(var$1);
        $this.$slashCooldown = $this.$slashCooldown - ($this.$player1.$getTime() - $this.$player1.$getPrevTime()) / 1.0E9;
        if ($this.$player1.$getCurrentSpeed() !== 0.0)
            return;
        $this.$frame2 = 3;
        $ptr = 2;
    case 2:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $tmp;
        $this.$setImage(var$1);
        return;
    case 3:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $tmp;
        $this.$setImage(var$1);
        $this.$timeSinceChange1 = 3.00000001E8;
        if ($this.$slashCooldown > 0.0) {
            $this.$frame2 = 4;
            $ptr = 1;
            continue main;
        }
        if ($this.$player1.$getCurrentSpeed() !== 0.0)
            return;
        $this.$frame2 = 3;
        $ptr = 2;
        continue main;
    case 4:
        $tmp = $this.$resetImage();
        if ($rt_suspending()) {
            break main;
        }
        var$1 = $tmp;
        $this.$setImage(var$1);
        if ($this.$player1.$getScrollableWorld() !== null && !$this.$player1.$isGrounded()) {
            $this.$frame2 = 2;
            $ptr = 3;
            continue main;
        }
        if ($this.$slashCooldown > 0.0) {
            $this.$frame2 = 4;
            $ptr = 1;
            continue main;
        }
        if ($this.$player1.$getCurrentSpeed() !== 0.0)
            return;
        $this.$frame2 = 3;
        $ptr = 2;
        continue main;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $ptr);
}
function PlayerImage_resetImage($this) {
    var var$1, var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = new g_GreenfootImage;
        var$2 = $this.$frame2;
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append0(var$3, $rt_s(292)), var$2), $rt_s(217));
        var$3 = jl_StringBuilder_toString(var$3);
        $ptr = 1;
    case 1:
        g_GreenfootImage__init_(var$1, var$3);
        if ($rt_suspending()) {
            break main;
        }
        return var$1;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, var$3, $ptr);
}
function PlayerImage_slash($this) {
    $this.$slashCooldown = 0.1;
}
function DifficultyButton() {
    var a = this; Button.call(a);
    a.$city5 = null;
    a.$pressed0 = 0;
    a.$buttonNum = 0;
}
function DifficultyButton__init_0(var_0) {
    var var_1 = new DifficultyButton();
    DifficultyButton__init_(var_1, var_0);
    return var_1;
}
function DifficultyButton__init_($this, $city) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$city = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        Button__init_0($this);
        if ($rt_suspending()) {
            break main;
        }
        $this.$pressed0 = 0;
        $this.$buttonNum = 1;
        $this.$city5 = $city;
        var$2 = $rt_s(293);
        $ptr = 2;
    case 2:
        $this.$setImage1(var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $city, var$2, $ptr);
}
function DifficultyButton_act($this) {
    var var$1, var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if (!g_Greenfoot_mousePressed($this)) {
            if ($this.$buttonNum == 1)
                $this.$city5.$setDifficulty(0.5);
            else if ($this.$buttonNum == 2)
                $this.$city5.$setDifficulty(2.0);
            else if ($this.$buttonNum == 3)
                $this.$city5.$setDifficulty(3.0);
            return;
        }
        if ($this.$buttonNum >= 3)
            $this.$buttonNum = 1;
        else
            $this.$buttonNum = $this.$buttonNum + 1 | 0;
        var$1 = $this.$buttonNum;
        var$2 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append0(var$2, $rt_s(294)), var$1), $rt_s(217));
        var$2 = jl_StringBuilder_toString(var$2);
        $ptr = 1;
    case 1:
        $this.$setImage1(var$2);
        if ($rt_suspending()) {
            break main;
        }
        SoundManager_playSound($rt_s(17), 100);
        if ($this.$buttonNum == 1)
            $this.$city5.$setDifficulty(0.5);
        else if ($this.$buttonNum == 2)
            $this.$city5.$setDifficulty(2.0);
        else if ($this.$buttonNum == 3)
            $this.$city5.$setDifficulty(3.0);
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, var$2, $ptr);
}
function jn_BufferOverflowException() {
    jl_RuntimeException.call(this);
}
function jn_BufferOverflowException__init_() {
    var var_0 = new jn_BufferOverflowException();
    jn_BufferOverflowException__init_0(var_0);
    return var_0;
}
function jn_BufferOverflowException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function ju_HashMap() {
    var a = this; ju_AbstractMap.call(a);
    a.$elementCount0 = 0;
    a.$elementData = null;
    a.$modCount1 = 0;
    a.$loadFactor0 = 0.0;
    a.$threshold0 = 0;
}
function ju_HashMap__init_() {
    var var_0 = new ju_HashMap();
    ju_HashMap__init_0(var_0);
    return var_0;
}
function ju_HashMap__init_1(var_0) {
    var var_1 = new ju_HashMap();
    ju_HashMap__init_2(var_1, var_0);
    return var_1;
}
function ju_HashMap__init_3(var_0, var_1) {
    var var_2 = new ju_HashMap();
    ju_HashMap__init_4(var_2, var_0, var_1);
    return var_2;
}
function ju_HashMap_newElementArray($this, $s) {
    return $rt_createArray(ju_HashMap$HashEntry, $s);
}
function ju_HashMap__init_0($this) {
    ju_HashMap__init_2($this, 16);
}
function ju_HashMap__init_2($this, $capacity) {
    ju_HashMap__init_4($this, $capacity, 0.75);
}
function ju_HashMap_calculateCapacity($x) {
    var var$2, var$3;
    if ($x >= 1073741824)
        return 1073741824;
    if (!$x)
        return 16;
    var$2 = $x - 1 | 0;
    var$3 = var$2 | var$2 >> 1;
    var$3 = var$3 | var$3 >> 2;
    var$3 = var$3 | var$3 >> 4;
    var$3 = var$3 | var$3 >> 8;
    var$3 = var$3 | var$3 >> 16;
    return var$3 + 1 | 0;
}
function ju_HashMap__init_4($this, $capacity, $loadFactor) {
    var var$3;
    ju_AbstractMap__init_0($this);
    if ($capacity >= 0 && $loadFactor > 0.0) {
        var$3 = ju_HashMap_calculateCapacity($capacity);
        $this.$elementCount0 = 0;
        $this.$elementData = $this.$newElementArray0(var$3);
        $this.$loadFactor0 = $loadFactor;
        ju_HashMap_computeThreshold($this);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_0());
}
function ju_HashMap_clear($this) {
    if ($this.$elementCount0 > 0) {
        $this.$elementCount0 = 0;
        ju_Arrays_fill0($this.$elementData, null);
        $this.$modCount1 = $this.$modCount1 + 1 | 0;
    }
}
function ju_HashMap_computeThreshold($this) {
    $this.$threshold0 = $this.$elementData.data.length * $this.$loadFactor0 | 0;
}
function ju_HashMap_containsKey($this, $key) {
    var $m;
    $m = ju_HashMap_getEntry($this, $key);
    return $m === null ? 0 : 1;
}
function ju_HashMap_entrySet($this) {
    return ju_HashMap$HashMapEntrySet__init_($this);
}
function ju_HashMap_get($this, $key) {
    var $m;
    $m = ju_HashMap_getEntry($this, $key);
    if ($m === null)
        return null;
    return $m.$value0;
}
function ju_HashMap_getEntry($this, $key) {
    var $m, $hash, $index;
    if ($key === null)
        $m = ju_HashMap_findNullKeyEntry($this);
    else {
        $hash = ju_HashMap_computeHashCode($key);
        $index = $hash & ($this.$elementData.data.length - 1 | 0);
        $m = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
    }
    return $m;
}
function ju_HashMap_findNonNullKeyEntry($this, $key, $index, $keyHash) {
    var $m, var$5;
    $m = $this.$elementData.data[$index];
    while ($m !== null) {
        if ($m.$origKeyHash == $keyHash) {
            var$5 = $m.$key;
            if (ju_HashMap_areEqualKeys($key, var$5))
                break;
        }
        $m = $m.$next2;
    }
    return $m;
}
function ju_HashMap_findNullKeyEntry($this) {
    var $m;
    $m = $this.$elementData.data[0];
    while ($m !== null && $m.$key !== null) {
        $m = $m.$next2;
    }
    return $m;
}
function ju_HashMap_isEmpty($this) {
    return $this.$elementCount0 ? 0 : 1;
}
function ju_HashMap_keySet($this) {
    if ($this.$cachedKeySet === null)
        $this.$cachedKeySet = ju_HashMap$1__init_($this);
    return $this.$cachedKeySet;
}
function ju_HashMap_put($this, $key, $value) {
    return $this.$putImpl($key, $value);
}
function ju_HashMap_putImpl($this, $key, $value) {
    var $entry, var$4, $hash, $index, $result;
    if ($key === null) {
        $entry = ju_HashMap_findNullKeyEntry($this);
        if ($entry === null) {
            $this.$modCount1 = $this.$modCount1 + 1 | 0;
            $entry = $this.$createHashedEntry(null, 0, 0);
            var$4 = $this.$elementCount0 + 1 | 0;
            $this.$elementCount0 = var$4;
            if (var$4 > $this.$threshold0)
                $this.$rehash();
        }
    } else {
        $hash = ju_HashMap_computeHashCode($key);
        $index = $hash & ($this.$elementData.data.length - 1 | 0);
        $entry = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
        if ($entry === null) {
            $this.$modCount1 = $this.$modCount1 + 1 | 0;
            $entry = $this.$createHashedEntry($key, $index, $hash);
            var$4 = $this.$elementCount0 + 1 | 0;
            $this.$elementCount0 = var$4;
            if (var$4 > $this.$threshold0)
                $this.$rehash();
        }
    }
    $result = $entry.$value0;
    $entry.$value0 = $value;
    return $result;
}
function ju_HashMap_createHashedEntry($this, $key, $index, $hash) {
    var $entry;
    $entry = ju_HashMap$HashEntry__init_($key, $hash);
    $entry.$next2 = $this.$elementData.data[$index];
    $this.$elementData.data[$index] = $entry;
    return $entry;
}
function ju_HashMap_rehash($this, $capacity) {
    var $length, $newData, $i, $entry, var$6, $index, $next;
    $length = ju_HashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
    $newData = $this.$newElementArray0($length);
    $i = 0;
    while ($i < $this.$elementData.data.length) {
        $entry = $this.$elementData.data[$i];
        $this.$elementData.data[$i] = null;
        while ($entry !== null) {
            var$6 = $newData.data;
            $index = $entry.$origKeyHash & ($length - 1 | 0);
            $next = $entry.$next2;
            $entry.$next2 = var$6[$index];
            var$6[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    $this.$elementData = $newData;
    ju_HashMap_computeThreshold($this);
}
function ju_HashMap_rehash0($this) {
    $this.$rehash0($this.$elementData.data.length);
}
function ju_HashMap_remove($this, $key) {
    var $entry;
    $entry = ju_HashMap_removeEntry($this, $key);
    if ($entry === null)
        return null;
    return $entry.$value0;
}
function ju_HashMap_removeEntry($this, $key) {
    var $index, $last, $entry, $entry_0, $hash;
    a: {
        $index = 0;
        $last = null;
        if ($key === null) {
            $entry = $this.$elementData.data[0];
            while ($entry !== null) {
                if ($entry.$key === null)
                    break a;
                $entry_0 = $entry.$next2;
                $last = $entry;
                $entry = $entry_0;
            }
        } else {
            $hash = ju_HashMap_computeHashCode($key);
            $index = $hash & ($this.$elementData.data.length - 1 | 0);
            $entry = $this.$elementData.data[$index];
            while ($entry !== null && !($entry.$origKeyHash == $hash && ju_HashMap_areEqualKeys($key, $entry.$key))) {
                $entry_0 = $entry.$next2;
                $last = $entry;
                $entry = $entry_0;
            }
        }
    }
    if ($entry === null)
        return null;
    if ($last !== null)
        $last.$next2 = $entry.$next2;
    else
        $this.$elementData.data[$index] = $entry.$next2;
    $this.$modCount1 = $this.$modCount1 + 1 | 0;
    $this.$elementCount0 = $this.$elementCount0 - 1 | 0;
    return $entry;
}
function ju_HashMap_computeHashCode($key) {
    return $key.$hashCode();
}
function ju_HashMap_areEqualKeys($key1, $key2) {
    return $key1 !== $key2 && !$key1.$equals($key2) ? 0 : 1;
}
function g_GreenfootImage$1$handleEvent$lambda$_1_0() {
    var a = this; jl_Object.call(a);
    a.$_018 = null;
    a.$_17 = null;
}
function g_GreenfootImage$1$handleEvent$lambda$_1_0__init_(var_0, var_1) {
    var var_2 = new g_GreenfootImage$1$handleEvent$lambda$_1_0();
    g_GreenfootImage$1$handleEvent$lambda$_1_0__init_0(var_2, var_0, var_1);
    return var_2;
}
function g_GreenfootImage$1$handleEvent$lambda$_1_0__init_0(var$0, var$1, var$2) {
    jl_Object__init_0(var$0);
    var$0.$_018 = var$1;
    var$0.$_17 = var$2;
}
function g_GreenfootImage$1$handleEvent$lambda$_1_0_run(var$0) {
    g_GreenfootImage$1_lambda$handleEvent$0(var$0.$_018, var$0.$_17);
}
function jl_Thread$start$lambda$_4_0() {
    jl_Object.call(this);
    this.$_019 = null;
}
function jl_Thread$start$lambda$_4_0__init_(var_0) {
    var var_1 = new jl_Thread$start$lambda$_4_0();
    jl_Thread$start$lambda$_4_0__init_0(var_1, var_0);
    return var_1;
}
function jl_Thread$start$lambda$_4_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_019 = var$1;
}
function jl_Thread$start$lambda$_4_0_run(var$0) {
    var var$1, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$1 = var$0.$_019;
        $ptr = 1;
    case 1:
        jl_Thread_runThread(var$1);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push(var$0, var$1, $ptr);
}
function otciu_UnicodeHelper$Range() {
    var a = this; jl_Object.call(a);
    a.$start1 = 0;
    a.$end = 0;
    a.$data0 = null;
}
function otciu_UnicodeHelper$Range__init_(var_0, var_1, var_2) {
    var var_3 = new otciu_UnicodeHelper$Range();
    otciu_UnicodeHelper$Range__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function otciu_UnicodeHelper$Range__init_0($this, $start, $end, $data) {
    jl_Object__init_0($this);
    $this.$start1 = $start;
    $this.$end = $end;
    $this.$data0 = $data;
}
function jnc_CoderResult() {
    var a = this; jl_Object.call(a);
    a.$kind = 0;
    a.$length1 = 0;
}
var jnc_CoderResult_UNDERFLOW = null;
var jnc_CoderResult_OVERFLOW = null;
function jnc_CoderResult_$callClinit() {
    jnc_CoderResult_$callClinit = $rt_eraseClinit(jnc_CoderResult);
    jnc_CoderResult__clinit_();
}
function jnc_CoderResult__init_(var_0, var_1) {
    var var_2 = new jnc_CoderResult();
    jnc_CoderResult__init_0(var_2, var_0, var_1);
    return var_2;
}
function jnc_CoderResult__init_0($this, $kind, $length) {
    jnc_CoderResult_$callClinit();
    jl_Object__init_0($this);
    $this.$kind = $kind;
    $this.$length1 = $length;
}
function jnc_CoderResult_isUnderflow($this) {
    return $this.$kind ? 0 : 1;
}
function jnc_CoderResult_isOverflow($this) {
    return $this.$kind != 1 ? 0 : 1;
}
function jnc_CoderResult_isError($this) {
    return !$this.$isMalformed() && !$this.$isUnmappable() ? 0 : 1;
}
function jnc_CoderResult_isMalformed($this) {
    return $this.$kind != 2 ? 0 : 1;
}
function jnc_CoderResult_isUnmappable($this) {
    return $this.$kind != 3 ? 0 : 1;
}
function jnc_CoderResult_length($this) {
    if ($this.$isError())
        return $this.$length1;
    $rt_throw(jl_UnsupportedOperationException__init_());
}
function jnc_CoderResult_malformedForLength($length) {
    jnc_CoderResult_$callClinit();
    return jnc_CoderResult__init_(2, $length);
}
function jnc_CoderResult__clinit_() {
    jnc_CoderResult_UNDERFLOW = jnc_CoderResult__init_(0, 0);
    jnc_CoderResult_OVERFLOW = jnc_CoderResult__init_(1, 0);
}
function g_MouseInfo() {
    var a = this; jl_Object.call(a);
    a.$actor1 = null;
    a.$button = 0;
    a.$x3 = 0;
    a.$y3 = 0;
    a.$clickCount = 0;
}
function g_MouseInfo__init_() {
    var var_0 = new g_MouseInfo();
    g_MouseInfo__init_0(var_0);
    return var_0;
}
function g_MouseInfo__init_0($this) {
    jl_Object__init_0($this);
}
function g_MouseInfo_getX($this) {
    return $this.$x3;
}
function g_MouseInfo_getY($this) {
    return $this.$y3;
}
function g_MouseInfo_getActor($this) {
    return $this.$actor1;
}
function g_MouseInfo_getButton($this) {
    return $this.$button;
}
function g_MouseInfo_setButton($this, $button) {
    $this.$button = $button;
}
function g_MouseInfo_setLoc($this, $x, $y) {
    $this.$x3 = $x;
    $this.$y3 = $y;
}
function g_MouseInfo_setActor($this, $actor) {
    $this.$actor1 = $actor;
}
function g_MouseInfo_setClickCount($this, $clickCount) {
    $this.$clickCount = $clickCount;
}
function otcit_DoubleAnalyzer() {
    jl_Object.call(this);
}
var otcit_DoubleAnalyzer_mantissa10Table = null;
var otcit_DoubleAnalyzer_exp10Table = null;
function otcit_DoubleAnalyzer_$callClinit() {
    otcit_DoubleAnalyzer_$callClinit = $rt_eraseClinit(otcit_DoubleAnalyzer);
    otcit_DoubleAnalyzer__clinit_();
}
function otcit_DoubleAnalyzer__init_0() {
    var var_0 = new otcit_DoubleAnalyzer();
    otcit_DoubleAnalyzer__init_(var_0);
    return var_0;
}
function otcit_DoubleAnalyzer__init_($this) {
    otcit_DoubleAnalyzer_$callClinit();
    jl_Object__init_0($this);
}
function otcit_DoubleAnalyzer_analyze($d, $result) {
    var $bits, $mantissa, $exponent, $errorShift, var$7, $decExponent, $binExponentCorrection, $mantissaShift, $decMantissa, var$12, $error, $upError, $downError, $lowerPos, $upperPos;
    otcit_DoubleAnalyzer_$callClinit();
    $bits = $rt_doubleToLongBits($d);
    $result.$sign = Long_eq(Long_and($bits, new Long(0, 2147483648)), Long_ZERO) ? 0 : 1;
    $mantissa = Long_and($bits, new Long(4294967295, 1048575));
    $exponent = Long_shr($bits, 52).lo & 2047;
    if (Long_eq($mantissa, Long_ZERO) && !$exponent) {
        $result.$mantissa = Long_ZERO;
        $result.$exponent = 0;
        return;
    }
    $errorShift = 0;
    if ($exponent)
        var$7 = Long_or($mantissa, new Long(0, 1048576));
    else {
        var$7 = Long_shl($mantissa, 1);
        while (Long_eq(Long_and(var$7, new Long(0, 1048576)), Long_ZERO)) {
            var$7 = Long_shl(var$7, 1);
            $exponent = $exponent + (-1) | 0;
            $errorShift = $errorShift + 1 | 0;
        }
    }
    $decExponent = ju_Arrays_binarySearch(otcit_DoubleAnalyzer_exp10Table, $exponent);
    if ($decExponent < 0)
        $decExponent =  -$decExponent - 2 | 0;
    $binExponentCorrection = $exponent - otcit_DoubleAnalyzer_exp10Table.data[$decExponent] | 0;
    $mantissaShift = 12 + $binExponentCorrection | 0;
    $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight(var$7, otcit_DoubleAnalyzer_mantissa10Table.data[$decExponent], $mantissaShift);
    if (Long_ge($decMantissa, new Long(2808348672, 232830643))) {
        $decExponent = $decExponent + 1 | 0;
        var$12 = $exponent - otcit_DoubleAnalyzer_exp10Table.data[$decExponent] | 0;
        $mantissaShift = 12 + var$12 | 0;
        $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight(var$7, otcit_DoubleAnalyzer_mantissa10Table.data[$decExponent], $mantissaShift);
    }
    $error = Long_shru(otcit_DoubleAnalyzer_mantissa10Table.data[$decExponent], (63 - $mantissaShift | 0) - $errorShift | 0);
    $upError = Long_shr(Long_add($error, Long_fromInt(1)), 1);
    $downError = Long_shr($error, 1);
    if (Long_eq(var$7, new Long(0, 1048576)))
        $downError = Long_shr($downError, 2);
    $lowerPos = otcit_DoubleAnalyzer_findLowerDistanceToZero($decMantissa, $downError);
    $upperPos = otcit_DoubleAnalyzer_findUpperDistanceToZero($decMantissa, $upError);
    var$12 = Long_compare($lowerPos, $upperPos);
    var$7 = var$12 > 0 ? Long_mul(Long_div($decMantissa, $lowerPos), $lowerPos) : var$12 < 0 ? Long_add(Long_mul(Long_div($decMantissa, $upperPos), $upperPos), $upperPos) : Long_mul(Long_div(Long_add($decMantissa, Long_div($upperPos, Long_fromInt(2))), $upperPos), $upperPos);
    if (Long_ge(var$7, new Long(2808348672, 232830643))) {
        $decExponent = $decExponent + 1 | 0;
        var$7 = Long_div(var$7, Long_fromInt(10));
    } else if (Long_lt(var$7, new Long(1569325056, 23283064))) {
        $decExponent = $decExponent + (-1) | 0;
        var$7 = Long_mul(var$7, Long_fromInt(10));
    }
    $result.$mantissa = var$7;
    $result.$exponent = $decExponent - 330 | 0;
}
function otcit_DoubleAnalyzer_findLowerDistanceToZero($mantissa, $error) {
    var $pos, $mantissaRight;
    otcit_DoubleAnalyzer_$callClinit();
    $pos = Long_fromInt(10);
    while (Long_le($pos, $error)) {
        $pos = Long_mul($pos, Long_fromInt(10));
    }
    $mantissaRight = Long_rem($mantissa, $pos);
    if (Long_ge($mantissaRight, Long_div($error, Long_fromInt(2))))
        $pos = Long_div($pos, Long_fromInt(10));
    return $pos;
}
function otcit_DoubleAnalyzer_findUpperDistanceToZero($mantissa, $error) {
    var $pos, $mantissaRight;
    otcit_DoubleAnalyzer_$callClinit();
    $pos = Long_fromInt(1);
    while (Long_le($pos, $error)) {
        $pos = Long_mul($pos, Long_fromInt(10));
    }
    $mantissaRight = Long_rem($mantissa, $pos);
    if (Long_gt(Long_sub($pos, $mantissaRight), Long_div($error, Long_fromInt(2))))
        $pos = Long_div($pos, Long_fromInt(10));
    return $pos;
}
function otcit_DoubleAnalyzer_mulAndShiftRight($a, $b, $shift) {
    var $a1, $a2, $a3, $a4, $b1, $b2, $b3, $b4, $cm, $c0, $c1, $c2, $c3, $c, var$18;
    otcit_DoubleAnalyzer_$callClinit();
    $a1 = Long_and($a, Long_fromInt(65535));
    $a2 = Long_and(Long_shru($a, 16), Long_fromInt(65535));
    $a3 = Long_and(Long_shru($a, 32), Long_fromInt(65535));
    $a4 = Long_and(Long_shru($a, 48), Long_fromInt(65535));
    $b1 = Long_and($b, Long_fromInt(65535));
    $b2 = Long_and(Long_shru($b, 16), Long_fromInt(65535));
    $b3 = Long_and(Long_shru($b, 32), Long_fromInt(65535));
    $b4 = Long_and(Long_shru($b, 48), Long_fromInt(65535));
    $cm = Long_add(Long_add(Long_mul($b3, $a1), Long_mul($b2, $a2)), Long_mul($b1, $a3));
    $c0 = Long_add(Long_add(Long_add(Long_mul($b4, $a1), Long_mul($b3, $a2)), Long_mul($b2, $a3)), Long_mul($b1, $a4));
    $c1 = Long_add(Long_add(Long_mul($b4, $a2), Long_mul($b3, $a3)), Long_mul($b2, $a4));
    $c2 = Long_add(Long_mul($b4, $a3), Long_mul($b3, $a4));
    $c3 = Long_mul($b4, $a4);
    $c = Long_add(Long_add(Long_shl($c3, 32 + $shift | 0), Long_shl($c2, 16 + $shift | 0)), Long_shl($c1, $shift));
    var$18 = $shift > 16 ? Long_add($c, Long_shl($c0, $shift - 16 | 0)) : Long_add($c, Long_shru($c0, 16 - $shift | 0));
    var$18 = Long_add(var$18, Long_shru($cm, 32 - $shift | 0));
    return var$18;
}
function otcit_DoubleAnalyzer__clinit_() {
    var $decimalMantissaOne, $exponent, $i, var$4, var$5, $maxMantissa, var$7, $shift, $shiftedOffPart;
    otcit_DoubleAnalyzer_mantissa10Table = $rt_createLongArray(660);
    otcit_DoubleAnalyzer_exp10Table = $rt_createIntArray(660);
    $decimalMantissaOne = new Long(991952896, 1862645149);
    $exponent = 1023;
    $i = 0;
    var$4 = $decimalMantissaOne;
    while ($i < 330) {
        otcit_DoubleAnalyzer_mantissa10Table.data[$i + 330 | 0] = jl_Long_divideUnsigned(var$4, Long_fromInt(80));
        otcit_DoubleAnalyzer_exp10Table.data[$i + 330 | 0] = $exponent;
        var$4 = jl_Long_divideUnsigned(var$4, Long_fromInt(10));
        var$5 = jl_Long_remainderUnsigned(var$4, Long_fromInt(10));
        while (Long_le(var$4, $decimalMantissaOne) && Long_eq(Long_and(var$4, new Long(0, 2147483648)), Long_ZERO)) {
            var$4 = Long_shl(var$4, 1);
            $exponent = $exponent + 1 | 0;
            var$5 = Long_shl(var$5, 1);
        }
        var$4 = Long_add(var$4, Long_div(var$5, Long_fromInt(10)));
        $i = $i + 1 | 0;
    }
    $maxMantissa = new Long(3435973836, 214748364);
    var$7 = 1023;
    $i = 0;
    while ($i < 330) {
        $shift = 0;
        var$4 = $decimalMantissaOne;
        while (Long_gt(var$4, $maxMantissa)) {
            var$4 = Long_shr(var$4, 1);
            $shift = $shift + 1 | 0;
            var$7 = var$7 + (-1) | 0;
        }
        var$5 = Long_mul(var$4, Long_fromInt(10));
        if ($shift <= 0)
            $decimalMantissaOne = var$5;
        else {
            $shiftedOffPart = Long_and($decimalMantissaOne, Long_fromInt((1 << $shift) - 1 | 0));
            $decimalMantissaOne = Long_add(var$5, Long_shr(Long_mul($shiftedOffPart, Long_fromInt(10)), $shift));
        }
        otcit_DoubleAnalyzer_mantissa10Table.data[(330 - $i | 0) - 1 | 0] = jl_Long_divideUnsigned($decimalMantissaOne, Long_fromInt(80));
        otcit_DoubleAnalyzer_exp10Table.data[(330 - $i | 0) - 1 | 0] = var$7;
        $i = $i + 1 | 0;
    }
}
function jl_NoClassDefFoundError() {
    jl_LinkageError.call(this);
}
function jl_NoClassDefFoundError__init_0() {
    var var_0 = new jl_NoClassDefFoundError();
    jl_NoClassDefFoundError__init_(var_0);
    return var_0;
}
function jl_NoClassDefFoundError__init_($this) {
    jl_LinkageError__init_0($this);
}
function gj_Client() {
    var a = this; jl_Object.call(a);
    a.$mainClassName = null;
    a.$isPaused = 0;
    a.$scenarioCanvas = null;
}
var gj_Client_blobCache = null;
function gj_Client_$callClinit() {
    gj_Client_$callClinit = $rt_eraseClinit(gj_Client);
    gj_Client__clinit_();
}
function gj_Client__init_0() {
    var var_0 = new gj_Client();
    gj_Client__init_(var_0);
    return var_0;
}
function gj_Client_main($args) {
    var var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$args = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gj_Client_$callClinit();
        var$2 = new gj_Client;
        $ptr = 1;
    case 1:
        gj_Client__init_(var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($args, var$2, $ptr);
}
function gj_Client__init_($this) {
    var $document, var$2, $resetButton, $playButton, var$5, $speedSlider, var$7, $standalonePropBytes, $standaloneProps, $doLockStr, var$11, $projectPropBytes, $projectProps, $simulation, $simSpeedStr, $simSpeed, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$simSpeed = $thread.pop();$simSpeedStr = $thread.pop();$simulation = $thread.pop();$projectProps = $thread.pop();$projectPropBytes = $thread.pop();var$11 = $thread.pop();$doLockStr = $thread.pop();$standaloneProps = $thread.pop();$standalonePropBytes = $thread.pop();var$7 = $thread.pop();$speedSlider = $thread.pop();var$5 = $thread.pop();$playButton = $thread.pop();$resetButton = $thread.pop();var$2 = $thread.pop();$document = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gj_Client_$callClinit();
        jl_Object__init_0($this);
        $this.$isPaused = 1;
        gj_Client_setupURLFactory($this);
        $document = otjdh_HTMLDocument_current();
        gu_GreenfootUtil_initialise(gj_GreenfootUtilJsDelegate__init_());
        var$2 = $rt_s(295);
        $this.$scenarioCanvas = $document.getElementById($rt_ustr(var$2));
        gc_WorldHandler_initialise($this.$scenarioCanvas);
        $ptr = 1;
    case 1:
        g_ActorVisitor_initialise();
        if ($rt_suspending()) {
            break main;
        }
        gj_Client_canvasMessage($rt_s(296));
        var$2 = $rt_s(297);
        $resetButton = $document.getElementById($rt_ustr(var$2));
        var$2 = $rt_s(298);
        $playButton = $document.getElementById($rt_ustr(var$2));
        var$5 = $rt_s(299);
        $speedSlider = $document.getElementById($rt_ustr(var$5));
        otjde_MouseEventTarget_listenClick$static($resetButton, gj_Client$_init_$lambda$_1_0__init_($this));
        var$5 = $rt_s(300);
        var$7 = gj_Client$_init_$lambda$_1_1__init_($speedSlider);
        $speedSlider.addEventListener($rt_ustr(var$5), otji_JS_function(var$7, "handleEvent"));
        var$5 = $rt_s(301);
        var$7 = gj_Client$_init_$lambda$_1_2__init_($speedSlider);
        $speedSlider.addEventListener($rt_ustr(var$5), otji_JS_function(var$7, "handleEvent"));
        otjde_MouseEventTarget_listenClick$static($playButton, gj_Client$_init_$lambda$_1_3__init_($this));
        otc_ResourceSource_setSource(gj_Client$1__init_($this));
        try {
            var$2 = $rt_s(302);
            $ptr = 2;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
            } else {
                throw $$e;
            }
        }
        gj_Client_canvasMessage($rt_s(303));
        return;
    case 2:
        try {
            $tmp = gj_Client_getResourceBytes(var$2);
            if ($rt_suspending()) {
                break main;
            }
            $standalonePropBytes = $tmp;
            if ($standalonePropBytes === null)
                $rt_throw(ji_IOException__init_($rt_s(304)));
            $standaloneProps = ju_Properties__init_0();
            $standaloneProps.$load0(ji_ByteArrayInputStream__init_1($standalonePropBytes));
            $this.$mainClassName = $standaloneProps.$getProperty($rt_s(305));
            jl_System_out().$println1(jl_StringBuilder__init_().$append($rt_s(306)).$append($this.$mainClassName).$toString());
            $doLockStr = $standaloneProps.$getProperty($rt_s(307));
            if ($rt_s(308).$equals($doLockStr)) {
                var$11 = $speedSlider.style;
                var$2 = $rt_s(49);
                var$5 = $rt_s(309);
                var$11.setProperty($rt_ustr(var$2), $rt_ustr(var$5));
            }
            var$2 = $rt_s(310);
            $ptr = 3;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
                gj_Client_canvasMessage($rt_s(303));
                return;
            } else {
                throw $$e;
            }
        }
    case 3:
        try {
            $tmp = gj_Client_getResourceBytes(var$2);
            if ($rt_suspending()) {
                break main;
            }
            $projectPropBytes = $tmp;
            if ($projectPropBytes === null)
                $rt_throw(ji_IOException__init_($rt_s(311)));
            a: {
                $projectProps = ju_Properties__init_0();
                $projectProps.$load0(ji_ByteArrayInputStream__init_1($projectPropBytes));
                g_ActorVisitor_setDelegate(gj_JsActorDelegate__init_($projectProps));
                gc_Simulation_initialize(gj_Client$2__init_($this));
                $simulation = gc_Simulation_getInstance();
                $simulation.$attachWorldHandler(gc_WorldHandler_getInstance());
                $simulation.$addSimulationListener(gj_Client$3__init_($this, $speedSlider, $simulation, $resetButton, $playButton));
                $simSpeedStr = $projectProps.$getProperty($rt_s(312));
                if ($simSpeedStr !== null)
                    try {
                        $simSpeed = jl_Integer_parseInt0($simSpeedStr);
                        $simulation.$setSpeed($simSpeed);
                        break a;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_NumberFormatException) {
                            break a;
                        } else {
                            throw $$e;
                        }
                    }
            }
            $ptr = 4;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
                gj_Client_canvasMessage($rt_s(303));
                return;
            } else {
                throw $$e;
            }
        }
    case 4:
        b: {
            try {
                gj_Client_doReset($this);
                if ($rt_suspending()) {
                    break main;
                }
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof ji_IOException) {
                    gj_Client_canvasMessage($rt_s(303));
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $document, var$2, $resetButton, $playButton, var$5, $speedSlider, var$7, $standalonePropBytes, $standaloneProps, $doLockStr, var$11, $projectPropBytes, $projectProps, $simulation, $simSpeedStr, $simSpeed, $ptr);
}
function gj_Client_doReset($this) {
    var var$1, $t, $wc, $w, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$w = $thread.pop();$wc = $thread.pop();$t = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        a: {
            b: {
                c: {
                    try {
                        gc_WorldHandler_getInstance().$discardWorld();
                        var$1 = $this.$mainClassName;
                        $ptr = 1;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_ClassNotFoundException) {
                            gj_Client_canvasMessage(jl_StringBuilder__init_().$append($rt_s(313)).$append($this.$mainClassName).$append($rt_s(114)).$toString());
                            break a;
                        } else if ($$je instanceof jl_InstantiationException) {
                            break c;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break b;
                        } else {
                            throw $$e;
                        }
                    }
                }
                gj_Client_canvasMessage($rt_s(314));
                break a;
            }
            var$1 = jl_StringBuilder__init_().$append($rt_s(315)).$append(jl_Object_getClass($t).$getName()).$append($rt_s(316));
            var$1 = var$1.$append($t.$getMessage()).$toString();
            gj_Client_canvasMessage(var$1);
        }
        return;
    case 1:
        a: {
            b: {
                c: {
                    try {
                        $tmp = jl_Class_forName(var$1);
                        if ($rt_suspending()) {
                            break main;
                        }
                        $wc = $tmp;
                        $ptr = 2;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_ClassNotFoundException) {
                            gj_Client_canvasMessage(jl_StringBuilder__init_().$append($rt_s(313)).$append($this.$mainClassName).$append($rt_s(114)).$toString());
                            break a;
                        } else if ($$je instanceof jl_InstantiationException) {
                            break c;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break b;
                        } else {
                            throw $$e;
                        }
                    }
                }
                gj_Client_canvasMessage($rt_s(314));
                break a;
            }
            var$1 = jl_StringBuilder__init_().$append($rt_s(315)).$append(jl_Object_getClass($t).$getName()).$append($rt_s(316));
            var$1 = var$1.$append($t.$getMessage()).$toString();
            gj_Client_canvasMessage(var$1);
        }
        return;
    case 2:
        a: {
            b: {
                c: {
                    try {
                        $tmp = $wc.$newInstance1();
                        if ($rt_suspending()) {
                            break main;
                        }
                        var$1 = $tmp;
                        $w = var$1;
                        gc_WorldHandler_getInstance().$setWorld($w);
                        break a;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_ClassNotFoundException) {
                            gj_Client_canvasMessage(jl_StringBuilder__init_().$append($rt_s(313)).$append($this.$mainClassName).$append($rt_s(114)).$toString());
                            break a;
                        } else if ($$je instanceof jl_InstantiationException) {
                            break c;
                        } else if ($$je instanceof jl_Throwable) {
                            $t = $$je;
                            break b;
                        } else {
                            throw $$e;
                        }
                    }
                }
                gj_Client_canvasMessage($rt_s(314));
                break a;
            }
            var$1 = jl_StringBuilder__init_().$append($rt_s(315)).$append(jl_Object_getClass($t).$getName()).$append($rt_s(316));
            var$1 = var$1.$append($t.$getMessage()).$toString();
            gj_Client_canvasMessage(var$1);
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, var$1, $t, $wc, $w, $ptr);
}
function gj_Client_canvasMessage($s) {
    var $document, var$3, $canvas, $r2d, var$6, var$7, var$8, var$9;
    gj_Client_$callClinit();
    $document = otjdh_HTMLDocument_current();
    var$3 = $rt_s(295);
    $canvas = $document.getElementById($rt_ustr(var$3));
    var$3 = $rt_s(181);
    $r2d = $canvas.getContext($rt_ustr(var$3));
    var$3 = "#000000";
    $r2d.fillStyle = var$3;
    var$6 = 0.0;
    var$7 = 0.0;
    var$8 = $canvas.width;
    var$9 = $canvas.height;
    $r2d.fillRect(var$6, var$7, var$8, var$9);
    var$3 = "2em Sans";
    $r2d.font = var$3;
    var$3 = "center";
    $r2d.textAlign = var$3;
    var$3 = "#D0D0D0";
    $r2d.fillStyle = var$3;
    var$7 = $canvas.width / 2 | 0;
    var$6 = $canvas.height / 2 | 0;
    $r2d.fillText($rt_ustr($s), var$7, var$6);
}
function gj_Client_getCachedResourceURL($resource) {
    var $url, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();$url = $thread.pop();$resource = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gj_Client_$callClinit();
        $url = gj_Client_blobCache.$get($resource);
        if ($url !== null)
            return $url;
        var$3 = gj_Client_guessMimeType($resource);
        $ptr = 1;
    case 1:
        $tmp = gj_Client_getResourceURL($resource, var$3);
        if ($rt_suspending()) {
            break main;
        }
        var$3 = $tmp;
        if (var$3 !== null)
            gj_Client_blobCache.$put($resource, var$3);
        return var$3;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($resource, $url, var$3, $ptr);
}
function gj_Client_guessMimeType($resource) {
    var var$2;
    gj_Client_$callClinit();
    var$2 = $resource.$toLowerCase0();
    if (var$2.$endsWith($rt_s(317)))
        return $rt_s(33);
    if (!var$2.$endsWith($rt_s(318)))
        return null;
    return $rt_s(319);
}
function gj_Client_getResourceURL($resource, $mediaType) {
    var $zfile, $content, $syncObject, var$6, var$7, var$8, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$8 = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();$syncObject = $thread.pop();$content = $thread.pop();$zfile = $thread.pop();$mediaType = $thread.pop();$resource = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gj_Client_$callClinit();
        $zfile = zip.file($rt_ustr($resource));
        if ($zfile === null)
            return null;
        $content = $rt_createArray(otjt_Uint8Array, 1);
        $syncObject = jl_Object__init_();
        var$6 = gj_Client$getResourceURL$lambda$_11_0__init_($content, $syncObject);
        var$7 = gj_Client$getResourceURL$lambda$_11_1__init_($resource, $syncObject);
        ($zfile.async('uint8array')).then(otji_JS_function(var$6, "gotContent"), otji_JS_function(var$7, "gotError"));
        $ptr = 1;
    case 1:
        jl_Object_monitorEnter($syncObject);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            b: {
                try {
                    try {
                        $ptr = 2;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_InterruptedException) {
                        } else {
                            throw $$e;
                        }
                    }
                    jl_Object_monitorExit($syncObject);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$6 = $$je;
                    break b;

                }
            }
            jl_Object_monitorExit($syncObject);
            $rt_throw(var$6);
        }
        var$8 = $content.data;
        if (var$8[0] === null)
            return null;
        if ($mediaType === null)
            return $rt_str(gj_Client_toBlobUrl$js_body$_8(var$8[0]));
        return $rt_str(gj_Client_toBlobUrl$js_body$_7(var$8[0], $rt_ustr($mediaType)));
    case 2:
        a: {
            b: {
                c: {
                    try {
                        jl_Object_wait1($syncObject);
                        if ($rt_suspending()) {
                            break main;
                        }
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_InterruptedException) {
                            try {
                                break c;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$6 = $$je;
                                break b;

                            }
                        } else{
                            var$6 = $$je;
                            break b;
                        }
                    }
                }
                try {
                    jl_Object_monitorExit($syncObject);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$6 = $$je;
                    break b;

                }
            }
            jl_Object_monitorExit($syncObject);
            $rt_throw(var$6);
        }
        var$8 = $content.data;
        if (var$8[0] === null)
            return null;
        if ($mediaType === null)
            return $rt_str(gj_Client_toBlobUrl$js_body$_8(var$8[0]));
        return $rt_str(gj_Client_toBlobUrl$js_body$_7(var$8[0], $rt_ustr($mediaType)));
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($resource, $mediaType, $zfile, $content, $syncObject, var$6, var$7, var$8, $ptr);
}
function gj_Client_getResourceBytes($resource) {
    var $zfile, $content, $syncObject, var$5, var$6, var$7, $len, $r, $i, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$i = $thread.pop();$r = $thread.pop();$len = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();$syncObject = $thread.pop();$content = $thread.pop();$zfile = $thread.pop();$resource = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        gj_Client_$callClinit();
        $zfile = zip.file($rt_ustr($resource));
        if ($zfile === null)
            return null;
        $content = $rt_createArray(otjt_Uint8Array, 1);
        $syncObject = jl_Object__init_();
        var$5 = gj_Client$getResourceBytes$lambda$_12_0__init_($content, $syncObject);
        var$6 = gj_Client$getResourceBytes$lambda$_12_1__init_($resource, $syncObject);
        ($zfile.async('uint8array')).then(otji_JS_function(var$5, "gotContent"), otji_JS_function(var$6, "gotError"));
        $ptr = 1;
    case 1:
        jl_Object_monitorEnter($syncObject);
        if ($rt_suspending()) {
            break main;
        }
        a: {
            b: {
                try {
                    try {
                        $ptr = 2;
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_InterruptedException) {
                        } else {
                            throw $$e;
                        }
                    }
                    jl_Object_monitorExit($syncObject);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$5 = $$je;
                    break b;

                }
            }
            jl_Object_monitorExit($syncObject);
            $rt_throw(var$5);
        }
        var$7 = $content.data;
        if (var$7[0] === null)
            return null;
        $len = var$7[0].length;
        $r = $rt_createByteArray($len);
        $i = 0;
        while ($i < $len) {
            $r.data[$i] = var$7[0][$i] << 24 >> 24;
            $i = $i + 1 | 0;
        }
        return $r;
    case 2:
        a: {
            b: {
                c: {
                    try {
                        jl_Object_wait1($syncObject);
                        if ($rt_suspending()) {
                            break main;
                        }
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_InterruptedException) {
                            try {
                                break c;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                var$5 = $$je;
                                break b;

                            }
                        } else{
                            var$5 = $$je;
                            break b;
                        }
                    }
                }
                try {
                    jl_Object_monitorExit($syncObject);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$5 = $$je;
                    break b;

                }
            }
            jl_Object_monitorExit($syncObject);
            $rt_throw(var$5);
        }
        var$7 = $content.data;
        if (var$7[0] === null)
            return null;
        $len = var$7[0].length;
        $r = $rt_createByteArray($len);
        $i = 0;
        while ($i < $len) {
            $r.data[$i] = var$7[0][$i] << 24 >> 24;
            $i = $i + 1 | 0;
        }
        return $r;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($resource, $zfile, $content, $syncObject, var$5, var$6, var$7, $len, $r, $i, $ptr);
}
function gj_Client_setupURLFactory($this) {
    jn_URL_setURLStreamHandlerFactory(gj_Client$4__init_($this));
}
function gj_Client_lambda$getResourceBytes$9($resource, $syncObject) {
    var var$3, $$je;
    gj_Client_$callClinit();
    jl_System_out().$println1(jl_StringBuilder__init_().$append($rt_s(320)).$append($resource).$toString());
    jl_Object_monitorEnterSync($syncObject);
    a: {
        try {
            jl_Object_notify($syncObject);
            jl_Object_monitorExitSync($syncObject);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$3 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($syncObject);
    $rt_throw(var$3);
}
function gj_Client_lambda$getResourceBytes$8($content, $syncObject, $c) {
    var var$4, $$je;
    gj_Client_$callClinit();
    $content.data[0] = $c;
    jl_Object_monitorEnterSync($syncObject);
    a: {
        try {
            jl_Object_notify($syncObject);
            jl_Object_monitorExitSync($syncObject);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($syncObject);
    $rt_throw(var$4);
}
function gj_Client_lambda$getResourceURL$7($resource, $syncObject) {
    var var$3, $$je;
    gj_Client_$callClinit();
    jl_System_out().$println1(jl_StringBuilder__init_().$append($rt_s(320)).$append($resource).$toString());
    jl_Object_monitorEnterSync($syncObject);
    a: {
        try {
            jl_Object_notify($syncObject);
            jl_Object_monitorExitSync($syncObject);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$3 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($syncObject);
    $rt_throw(var$3);
}
function gj_Client_lambda$getResourceURL$6($content, $syncObject, $c) {
    var var$4, $$je;
    gj_Client_$callClinit();
    $content.data[0] = $c;
    jl_Object_monitorEnterSync($syncObject);
    a: {
        try {
            jl_Object_notify($syncObject);
            jl_Object_monitorExitSync($syncObject);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$4 = $$je;
            break a;

        }
        return;
    }
    jl_Object_monitorExitSync($syncObject);
    $rt_throw(var$4);
}
function gj_Client_lambda$new$4($this, $e) {
    gc_Simulation_getInstance().$setPaused($this.$isPaused ? 0 : 1);
}
function gj_Client_lambda$new$3($speedSlider, $e) {
    gj_Client_$callClinit();
    gc_Simulation_getInstance().$setSpeed(jl_Integer_parseInt0($rt_str($speedSlider.value)));
}
function gj_Client_lambda$new$2($speedSlider, $e) {
    gj_Client_$callClinit();
    gc_Simulation_getInstance().$setSpeed(jl_Integer_parseInt0($rt_str($speedSlider.value)));
}
function gj_Client_lambda$new$1($this, $e) {
    jl_Thread__init_3(gj_Client$lambda$new$1$lambda$_22_0__init_($this)).$start();
}
function gj_Client_lambda$new$0($this) {
    var $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        var $thread = $rt_nativeThread();
        $ptr = $thread.pop();$this = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        gj_Client_doReset($this);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($this, $ptr);
}
function gj_Client_access$000($x0) {
    gj_Client_$callClinit();
    return $x0.$scenarioCanvas;
}
function gj_Client_access$102($x0, $x1) {
    gj_Client_$callClinit();
    $x0.$isPaused = $x1;
    return $x1;
}
function gj_Client__clinit_() {
    gj_Client_blobCache = ju_HashMap__init_();
}
function gj_Client_toBlobUrl$js_body$_7(var$1, var$2) {
    var blob = new Blob([var$1], { type : var$2 });
    return URL.createObjectURL(blob);
}
function gj_Client_toBlobUrl$js_body$_8(var$1) {
    var blob = new Blob([var$1]);
    return URL.createObjectURL(blob);
}
function otci_CharFlow() {
    var a = this; jl_Object.call(a);
    a.$characters0 = null;
    a.$pointer = 0;
}
function otci_CharFlow__init_(var_0) {
    var var_1 = new otci_CharFlow();
    otci_CharFlow__init_0(var_1, var_0);
    return var_1;
}
function otci_CharFlow__init_0($this, $characters) {
    jl_Object__init_0($this);
    $this.$characters0 = $characters;
}
function gc_TextLabel() {
    jl_Object.call(this);
}
function gj_MouseManager$handleEvent$lambda$_10_0() {
    var a = this; jl_Object.call(a);
    a.$_020 = null;
    a.$_18 = null;
    a.$_22 = null;
}
function gj_MouseManager$handleEvent$lambda$_10_0__init_(var_0, var_1, var_2) {
    var var_3 = new gj_MouseManager$handleEvent$lambda$_10_0();
    gj_MouseManager$handleEvent$lambda$_10_0__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function gj_MouseManager$handleEvent$lambda$_10_0__init_0(var$0, var$1, var$2, var$3) {
    jl_Object__init_0(var$0);
    var$0.$_020 = var$1;
    var$0.$_18 = var$2;
    var$0.$_22 = var$3;
}
function gj_MouseManager$handleEvent$lambda$_10_0_run(var$0) {
    gj_MouseManager_lambda$handleEvent$0(var$0.$_020, var$0.$_18, var$0.$_22);
}
function jn_BufferUnderflowException() {
    jl_RuntimeException.call(this);
}
function jn_BufferUnderflowException__init_0() {
    var var_0 = new jn_BufferUnderflowException();
    jn_BufferUnderflowException__init_(var_0);
    return var_0;
}
function jn_BufferUnderflowException__init_($this) {
    jl_RuntimeException__init_1($this);
}
function jl_ConsoleOutputStreamStderr() {
    ji_OutputStream.call(this);
}
function jl_ConsoleOutputStreamStderr__init_0() {
    var var_0 = new jl_ConsoleOutputStreamStderr();
    jl_ConsoleOutputStreamStderr__init_(var_0);
    return var_0;
}
function jl_ConsoleOutputStreamStderr__init_($this) {
    ji_OutputStream__init_0($this);
}
function jl_ConsoleOutputStreamStderr_write($this, $b) {
    $rt_putStderr($b);
}
function otcit_FloatAnalyzer$Result() {
    jl_Object.call(this);
}
function otcit_FloatAnalyzer$Result__init_() {
    var var_0 = new otcit_FloatAnalyzer$Result();
    otcit_FloatAnalyzer$Result__init_0(var_0);
    return var_0;
}
function otcit_FloatAnalyzer$Result__init_0($this) {
    jl_Object__init_0($this);
}
function jl_InterruptedException() {
    jl_Exception.call(this);
}
function jl_InterruptedException__init_() {
    var var_0 = new jl_InterruptedException();
    jl_InterruptedException__init_0(var_0);
    return var_0;
}
function jl_InterruptedException__init_0($this) {
    jl_Exception__init_0($this);
}
function ju_HashMap$EntryIterator() {
    ju_HashMap$AbstractMapIterator.call(this);
}
function ju_HashMap$EntryIterator__init_(var_0) {
    var var_1 = new ju_HashMap$EntryIterator();
    ju_HashMap$EntryIterator__init_0(var_1, var_0);
    return var_1;
}
function ju_HashMap$EntryIterator__init_0($this, $map) {
    ju_HashMap$AbstractMapIterator__init_0($this, $map);
}
function ju_HashMap$EntryIterator_next($this) {
    ju_HashMap$AbstractMapIterator_makeNext($this);
    return $this.$currentEntry;
}
function ju_HashMap$EntryIterator_next0($this) {
    return $this.$next6();
}
function ju_Collections() {
    jl_Object.call(this);
}
var ju_Collections_EMPTY_SET = null;
var ju_Collections_EMPTY_MAP = null;
var ju_Collections_EMPTY_LIST = null;
var ju_Collections_naturalOrder = null;
var ju_Collections_reverseOrder = null;
function ju_Collections_$callClinit() {
    ju_Collections_$callClinit = $rt_eraseClinit(ju_Collections);
    ju_Collections__clinit_();
}
function ju_Collections__init_0() {
    var var_0 = new ju_Collections();
    ju_Collections__init_(var_0);
    return var_0;
}
function ju_Collections__init_($this) {
    ju_Collections_$callClinit();
    jl_Object__init_0($this);
}
function ju_Collections_emptyList() {
    ju_Collections_$callClinit();
    return ju_Collections$3__init_0();
}
function ju_Collections_emptySet() {
    ju_Collections_$callClinit();
    return ju_Collections$5__init_0();
}
function ju_Collections_emptyMap() {
    ju_Collections_$callClinit();
    return ju_Collections$6__init_0();
}
function ju_Collections_swap($list, $i, $j) {
    var $tmp;
    ju_Collections_$callClinit();
    $tmp = $list.$get0($i);
    $list.$set($i, $list.$get0($j));
    $list.$set($j, $tmp);
}
function ju_Collections_shuffle($list) {
    ju_Collections_$callClinit();
    ju_Collections_shuffle0($list, ju_Random__init_());
}
function ju_Collections_shuffle0($list, $rnd) {
    var $randomAccess;
    ju_Collections_$callClinit();
    if ($rt_isInstance($list, ju_RandomAccess))
        ju_Collections_shuffleRandomAccess($list, $rnd);
    else {
        $randomAccess = ju_ArrayList__init_0($list);
        ju_Collections_shuffleRandomAccess($randomAccess, $rnd);
        $list.$clear0();
        $list.$addAll($randomAccess);
    }
}
function ju_Collections_shuffleRandomAccess($list, $rnd) {
    var $i, $j;
    ju_Collections_$callClinit();
    $i = $list.$size() - 1 | 0;
    while ($i > 0) {
        $j = $rnd.$nextInt($i + 1 | 0);
        ju_Collections_swap($list, $i, $j);
        $i = $i + (-1) | 0;
    }
}
function ju_Collections__clinit_() {
    ju_Collections_EMPTY_SET = ju_Collections_emptySet();
    ju_Collections_EMPTY_MAP = ju_Collections_emptyMap();
    ju_Collections_EMPTY_LIST = ju_Collections_emptyList();
    ju_Collections_naturalOrder = ju_Collections$_clinit_$lambda$_61_0__init_0();
    ju_Collections_reverseOrder = ju_Collections$_clinit_$lambda$_61_1__init_0();
}
function Track() {
    var a = this; jl_Object.call(a);
    a.$sections = null;
    a.$bars = null;
    a.$notes = null;
    a.$sectionsIndex = 0;
    a.$barsIndex = 0;
    a.$notesIndex = 0;
}
function Track__init_() {
    var var_0 = new Track();
    Track__init_0(var_0);
    return var_0;
}
function Track__init_0($this) {
    jl_Object__init_0($this);
    $this.$sectionsIndex = 0;
    $this.$barsIndex = 0;
    $this.$notesIndex = 0;
}
function Track_initialize($this, $numSections, $numBars, $numNotes) {
    $this.$sections = $rt_createDoubleMultiArray([5, $numSections]);
    $this.$bars = $rt_createDoubleMultiArray([3, $numBars]);
    $this.$notes = $rt_createDoubleMultiArray([4, $numNotes]);
    $this.$sectionsIndex = 0;
    $this.$barsIndex = 0;
    $this.$notesIndex = 0;
}
function Track_addBar($this, $startTime, $length, $confidence) {
    $this.$bars.data[$this.$barsIndex].data[0] = $startTime;
    $this.$bars.data[$this.$barsIndex].data[1] = $length;
    $this.$bars.data[$this.$barsIndex].data[2] = $confidence;
    $this.$barsIndex = $this.$barsIndex + 1 | 0;
}
function Track_addNote($this, $startTime, $length, $confidence, $loudness) {
    $this.$notes.data[$this.$notesIndex].data[0] = $startTime;
    $this.$notes.data[$this.$notesIndex].data[1] = $length;
    $this.$notes.data[$this.$notesIndex].data[2] = $confidence;
    $this.$notes.data[$this.$notesIndex].data[3] = $loudness;
    $this.$notesIndex = $this.$notesIndex + 1 | 0;
}
function Track_getBars($this) {
    return $this.$bars;
}
function Track_getNotes($this) {
    return $this.$notes;
}
function Track_getAverageNoteConfidence($this) {
    var $totalConfidence, var$2, var$3, var$4, $note, var$6;
    $totalConfidence = 0.0;
    var$2 = $this.$notes.data;
    var$3 = var$2.length;
    var$4 = 0;
    while (var$4 < var$3) {
        $note = var$2[var$4];
        var$6 = $note.data;
        $totalConfidence = $totalConfidence + var$6[2];
        var$4 = var$4 + 1 | 0;
    }
    return $totalConfidence / $this.$notes.data.length;
}
function gci_BSPNode() {
    var a = this; jl_Object.call(a);
    a.$actors = null;
    a.$parent = null;
    a.$area = null;
    a.$splitAxis = 0;
    a.$splitPos = 0;
    a.$left = null;
    a.$right = null;
    a.$areaRipple = 0;
}
function gci_BSPNode__init_(var_0, var_1, var_2) {
    var var_3 = new gci_BSPNode();
    gci_BSPNode__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function gci_BSPNode__init_0($this, $area, $splitAxis, $splitPos) {
    jl_Object__init_0($this);
    $this.$area = $area;
    $this.$splitAxis = $splitAxis;
    $this.$splitPos = $splitPos;
    $this.$actors = ju_HashMap__init_();
}
function gci_BSPNode_setChild($this, $side, $child) {
    if ($side) {
        $this.$right = $child;
        if ($child !== null)
            $child.$parent = $this;
    } else {
        $this.$left = $child;
        if ($child !== null)
            $child.$parent = $this;
    }
}
function gci_BSPNode_setArea($this, $area) {
    $this.$area = $area;
    $this.$areaRipple = 1;
}
function gci_BSPNode_setSplitAxis($this, $axis) {
    if ($axis != $this.$splitAxis) {
        $this.$splitAxis = $axis;
        $this.$areaRipple = 1;
    }
}
function gci_BSPNode_setSplitPos($this, $pos) {
    if ($pos != $this.$splitPos) {
        $this.$splitPos = $pos;
        $this.$areaRipple = 1;
    }
}
function gci_BSPNode_getLeftArea($this) {
    if ($this.$splitAxis)
        return gci_Rect__init_(gci_Rect_getX($this.$area), gci_Rect_getY($this.$area), gci_Rect_getWidth($this.$area), $this.$splitPos - gci_Rect_getY($this.$area) | 0);
    return gci_Rect__init_(gci_Rect_getX($this.$area), gci_Rect_getY($this.$area), $this.$splitPos - gci_Rect_getX($this.$area) | 0, gci_Rect_getHeight($this.$area));
}
function gci_BSPNode_getRightArea($this) {
    if ($this.$splitAxis)
        return gci_Rect__init_(gci_Rect_getX($this.$area), $this.$splitPos, gci_Rect_getWidth($this.$area), gci_Rect_getTop($this.$area) - $this.$splitPos | 0);
    return gci_Rect__init_($this.$splitPos, gci_Rect_getY($this.$area), gci_Rect_getRight($this.$area) - $this.$splitPos | 0, gci_Rect_getHeight($this.$area));
}
function gci_BSPNode_getArea($this) {
    return $this.$area;
}
function gci_BSPNode_resizeChildren($this) {
    if ($this.$left !== null)
        gci_BSPNode_setArea($this.$left, gci_BSPNode_getLeftArea($this));
    if ($this.$right !== null)
        gci_BSPNode_setArea($this.$right, gci_BSPNode_getRightArea($this));
}
function gci_BSPNode_getLeft($this) {
    if ($this.$areaRipple) {
        gci_BSPNode_resizeChildren($this);
        $this.$areaRipple = 0;
    }
    return $this.$left;
}
function gci_BSPNode_getRight($this) {
    if ($this.$areaRipple) {
        gci_BSPNode_resizeChildren($this);
        $this.$areaRipple = 0;
    }
    return $this.$right;
}
function gci_BSPNode_getParent($this) {
    return $this.$parent;
}
function gci_BSPNode_setParent($this, $parent) {
    $this.$parent = $parent;
}
function gci_BSPNode_getChildSide($this, $child) {
    if ($this.$left !== $child)
        return 1;
    return 0;
}
function gci_BSPNode_addActor($this, $actor) {
    $this.$actors.$put($actor, gci_ActorNode__init_($actor, $this));
}
function gci_BSPNode_containsActor($this, $actor) {
    var $anode;
    $anode = $this.$actors.$get($actor);
    if ($anode === null)
        return 0;
    gci_ActorNode_mark($anode);
    return 1;
}
function gci_BSPNode_actorRemoved($this, $actor) {
    $this.$actors.$remove6($actor);
}
function gci_BSPNode_isEmpty($this) {
    return $this.$actors.$isEmpty();
}
function gci_BSPNode_blankNode($this) {
    $this.$actors.$clear0();
}
function gci_BSPNode_areaChanged($this) {
    $this.$areaRipple = 1;
}
$rt_packages([-1, "java", 0, "util", 0, "nio", 2, "charset", 0, "io", 0, "lang", -1, "greenfoot"
]);
$rt_metadata([jl_Object, "Object", 5, 0, [], 0, 3, 0, ["$isEmptyMonitor", function() { return jl_Object_isEmptyMonitor(this); }, "$deleteMonitor", function() { jl_Object_deleteMonitor(this); }, "$getClass0", function() { return jl_Object_getClass(this); }, "$hashCode", function() { return jl_Object_hashCode(this); }, "$equals", function(var_1) { return jl_Object_equals(this, var_1); }, "$toString", function() { return jl_Object_toString(this); }, "$identity", function() { return jl_Object_identity(this); },
"$clone", function() { return jl_Object_clone(this); }, "$notify", function() { jl_Object_notify(this); }, "$notifyAll", function() { jl_Object_notifyAll(this); }, "$wait0", function(var_1) { jl_Object_wait(this, var_1); }, "$wait", function(var_1, var_2) { jl_Object_wait0(this, var_1, var_2); }, "$waitImpl", function(var_1, var_2) { jl_Object_waitImpl(this, var_1, var_2); }, "$waitImpl0", function(var_1, var_2, var_3) { jl_Object_waitImpl0(this, var_1, var_2, var_3); }, "$wait1", function() { jl_Object_wait1(this);
}],
jl_Throwable, 0, jl_Object, [], 0, 3, 0, ["$fillInStackTrace", function() { return jl_Throwable_fillInStackTrace(this); }, "$getMessage", function() { return jl_Throwable_getMessage(this); }, "$getLocalizedMessage", function() { return jl_Throwable_getLocalizedMessage(this); }, "$printStackTrace0", function() { jl_Throwable_printStackTrace(this); }, "$printStackTrace", function(var_1) { jl_Throwable_printStackTrace0(this, var_1); }],
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0,
jl_RuntimeException, "RuntimeException", 5, jl_Exception, [], 0, 3, 0, 0,
jl_IndexOutOfBoundsException, "IndexOutOfBoundsException", 5, jl_RuntimeException, [], 0, 3, 0, 0,
g_Actor, "Actor", 6, jl_Object, [], 1, 3, g_Actor_$callClinit, ["$act", function() { g_Actor_act(this); }, "$getX", function() { return g_Actor_getX(this); }, "$getY", function() { return g_Actor_getY(this); }, "$getRotation", function() { return g_Actor_getRotation(this); }, "$setRotation", function(var_1) { g_Actor_setRotation(this, var_1); }, "$setLocation", function(var_1, var_2) { g_Actor_setLocation(this, var_1, var_2); }, "$setLocationDrag", function(var_1, var_2) { g_Actor_setLocationDrag(this, var_1,
var_2); }, "$limitValue", function(var_1, var_2) { return g_Actor_limitValue(this, var_1, var_2); }, "$getWorld", function() { return g_Actor_getWorld(this); }, "$addedToWorld0", function(var_1) { g_Actor_addedToWorld(this, var_1); }, "$getImage1", function() { return g_Actor_getImage(this); }, "$setImage1", function(var_1) { g_Actor_setImage(this, var_1); }, "$setImage", function(var_1) { g_Actor_setImage0(this, var_1); }, "$setWorld", function(var_1) { g_Actor_setWorld(this, var_1); }, "$addToWorld", function(var_1,
var_2, var_3) { g_Actor_addToWorld(this, var_1, var_2, var_3); }, "$getBoundingRect", function() { return g_Actor_getBoundingRect(this); }, "$calcBounds", function() { g_Actor_calcBounds(this); }, "$setData0", function(var_1) { g_Actor_setData(this, var_1); }, "$getData0", function() { return g_Actor_getData(this); }, "$getClassImage", function() { return g_Actor_getClassImage(this); }, "$sizeChanged", function() { g_Actor_sizeChanged(this); }, "$locationChanged", function(var_1, var_2) { g_Actor_locationChanged(this,
var_1, var_2); }, "$failIfNotInWorld", function() { g_Actor_failIfNotInWorld(this); }, "$getRotatedCorners", function(var_1, var_2, var_3) { g_Actor_getRotatedCorners(this, var_1, var_2, var_3); }, "$intersects0", function(var_1) { return g_Actor_intersects(this, var_1); }, "$containsPoint", function(var_1, var_2) { return g_Actor_containsPoint(this, var_1, var_2); }, "$getSequenceNumber", function() { return g_Actor_getSequenceNumber(this); }, "$getLastPaintSeqNum", function() { return g_Actor_getLastPaintSeqNum(this);
}, "$setLastPaintSeqNum", function(var_1) { g_Actor_setLastPaintSeqNum(this, var_1); }, "$getImage", function(var_1) { return g_Actor_getImage0(this, var_1); }, "$getActiveWorld", function() { return g_Actor_getActiveWorld(this); }],
ScrollableActor, "ScrollableActor", -1, g_Actor, [], 1, 3, 0, ["$getChunk", function() { return ScrollableActor_getChunk(this); }, "$setChunk", function(var_1) { ScrollableActor_setChunk(this, var_1); }, "$addedToWorld", function(var_1) { ScrollableActor_addedToWorld(this, var_1); }, "$run", function() { ScrollableActor_run(this); }, "$render", function() { ScrollableActor_render(this); }, "$updateScreenPos", function() { ScrollableActor_updateScreenPos(this); }, "$position", function() { ScrollableActor_position(this);
}, "$resize", function() { ScrollableActor_resize(this); }, "$load", function() { return ScrollableActor_load(this); }, "$unload", function() { return ScrollableActor_unload(this); }, "$getExactX", function() { return ScrollableActor_getExactX(this); }, "$getExactY", function() { return ScrollableActor_getExactY(this); }, "$getZ", function() { return ScrollableActor_getZ(this); }, "$setLocation0", function(var_1, var_2) { ScrollableActor_setLocation(this, var_1, var_2); }, "$getScrollableWorld", function() {
return ScrollableActor_getScrollableWorld(this); }, "$setScrollableWorld", function(var_1) { ScrollableActor_setScrollableWorld(this, var_1); }, "$getObjectsInRange", function(var_1, var_2) { return ScrollableActor_getObjectsInRange(this, var_1, var_2); }, "$getIntersectingObjects", function(var_1) { return ScrollableActor_getIntersectingObjects(this, var_1); }, "$getCollider", function() { return ScrollableActor_getCollider(this); }, "$getScreenXNoOffset", function() { return ScrollableActor_getScreenXNoOffset(this);
}, "$getScreenYNoOffset", function() { return ScrollableActor_getScreenYNoOffset(this); }, "$setXOffset", function(var_1) { ScrollableActor_setXOffset(this, var_1); }, "$setYOffset", function(var_1) { ScrollableActor_setYOffset(this, var_1); }, "$setImage", function(var_1) { ScrollableActor_setImage(this, var_1); }, "$setImage0", function(var_1, var_2) { ScrollableActor_setImage0(this, var_1, var_2); }, "$getImage1", function() { return ScrollableActor_getImage(this); }],
Entity, "Entity", -1, ScrollableActor, [], 1, 3, 0, ["$addedToWorld", function(var_1) { Entity_addedToWorld(this, var_1); }, "$removeCollider", function(var_1) { Entity_removeCollider(this, var_1); }],
gp_GreenfootUtilDelegate, 0, jl_Object, [], 3, 3, 0, 0,
gj_GreenfootUtilJsDelegate, 0, jl_Object, [gp_GreenfootUtilDelegate], 0, 3, 0, ["$getGreenfootLogoPath", function() { return gj_GreenfootUtilJsDelegate_getGreenfootLogoPath(this); }],
jl_AutoCloseable, 0, jl_Object, [], 3, 3, 0, 0,
ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0,
ji_InputStream, 0, jl_Object, [ji_Closeable], 1, 3, 0, ["$read0", function(var_1) { return ji_InputStream_read(this, var_1); }],
ji_FilterInputStream, 0, ji_InputStream, [], 0, 3, 0, 0,
ji_BufferedInputStream, 0, ji_FilterInputStream, [], 0, 3, 0, ["$fillbuf", function(var_1, var_2) { return ji_BufferedInputStream_fillbuf(this, var_1, var_2); }, "$read1", function() { return ji_BufferedInputStream_read(this); }],
ju_Enumeration, 0, jl_Object, [], 3, 3, 0, 0,
jl_Runnable, 0, jl_Object, [], 3, 3, 0, 0,
gj_MouseManager$handleTouchEvent$lambda$_11_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, ["$run", function() { gj_MouseManager$handleTouchEvent$lambda$_11_0_run(this); }],
jnci_BufferedEncoder$Controller, 0, jl_Object, [], 0, 3, 0, ["$hasMoreInput", function() { return jnci_BufferedEncoder$Controller_hasMoreInput(this); }, "$hasMoreOutput", function(var_1) { return jnci_BufferedEncoder$Controller_hasMoreOutput(this, var_1); }, "$setInPosition", function(var_1) { jnci_BufferedEncoder$Controller_setInPosition(this, var_1); }, "$setOutPosition", function(var_1) { jnci_BufferedEncoder$Controller_setOutPosition(this, var_1); }],
g_World, "World", 6, jl_Object, [], 1, 3, g_World_$callClinit, ["$setBackground", function(var_1) { g_World_setBackground(this, var_1); }, "$setBackground0", function(var_1) { g_World_setBackground0(this, var_1); }, "$getBackground", function() { return g_World_getBackground(this); }, "$getWidth", function() { return g_World_getWidth(this); }, "$getHeight", function() { return g_World_getHeight(this); }, "$getCellSize", function() { return g_World_getCellSize(this); }, "$setPaintOrder", function(var_1) { g_World_setPaintOrder(this,
var_1); }, "$addObject", function(var_1, var_2, var_3) { g_World_addObject(this, var_1, var_2, var_3); }, "$removeObject", function(var_1) { g_World_removeObject(this, var_1); }, "$getObjects", function(var_1) { return g_World_getObjects(this, var_1); }, "$act", function() { g_World_act(this); }, "$started", function() { g_World_started(this); }, "$isBounded", function() { return g_World_isBounded(this); }, "$getHeightInPixels", function() { return g_World_getHeightInPixels(this); }, "$getWidthInPixels", function()
{ return g_World_getWidthInPixels(this); }, "$toCellFloor0", function(var_1) { return g_World_toCellFloor(this, var_1); }, "$getObjectsAtPixel0", function(var_1, var_2) { return g_World_getObjectsAtPixel(this, var_1, var_2); }, "$updateObjectLocation", function(var_1, var_2, var_3) { g_World_updateObjectLocation(this, var_1, var_2, var_3); }, "$updateObjectSize", function(var_1) { g_World_updateObjectSize(this, var_1); }, "$startSequence", function() { g_World_startSequence(this); }, "$getObjectsListInPaintOrder",
function() { return g_World_getObjectsListInPaintOrder(this); }, "$getObjectsListInActOrder0", function() { return g_World_getObjectsListInActOrder(this); }, "$initialize", function(var_1, var_2, var_3) { g_World_initialize(this, var_1, var_2, var_3); }, "$getClassImage", function() { return g_World_getClassImage(this); }, "$addInActOrder", function(var_1) { g_World_addInActOrder(this, var_1); }, "$addInPaintOrder", function(var_1) { g_World_addInPaintOrder(this, var_1); }],
GameWorld, "GameWorld", -1, g_World, [], 0, 3, 0, ["$addUI", function() { GameWorld_addUI(this); }, "$removeUI", function() { GameWorld_removeUI(this); }, "$addEndUI", function(var_1) { GameWorld_addEndUI(this, var_1); }, "$removeEndUI", function() { GameWorld_removeEndUI(this); }, "$increaseScore", function(var_1) { GameWorld_increaseScore(this, var_1); }, "$stopped", function() { GameWorld_stopped(this); }],
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0,
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, jl_Integer_$callClinit, ["$intValue", function() { return jl_Integer_intValue(this); }, "$hashCode", function() { return jl_Integer_hashCode(this); }, "$equals", function(var_1) { return jl_Integer_equals(this, var_1); }],
gs_SoundFactory$2$handleEvent$lambda$_1_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, ["$run", function() { gs_SoundFactory$2$handleEvent$lambda$_1_0_run(this); }],
jl_CloneNotSupportedException, "CloneNotSupportedException", 5, jl_Exception, [], 0, 3, 0, 0,
otj_JSObject, 0, jl_Object, [], 3, 3, 0, 0,
otjt_ArrayBufferView, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0,
otjt_Uint8Array, 0, otjt_ArrayBufferView, [], 1, 3, 0, 0,
UI, "UI", -1, g_Actor, [], 1, 3, 0, 0,
SoundManager, "SoundManager", -1, UI, [], 0, 3, SoundManager_$callClinit, 0,
jl_AbstractStringBuilder$Constants, 0, jl_Object, [], 0, 0, jl_AbstractStringBuilder$Constants_$callClinit, 0,
otp_PlatformRunnable, 0, jl_Object, [], 3, 3, 0, 0,
otr_EventQueue$Event, 0, jl_Object, [], 3, 3, 0, 0,
jl_Object$NotifyListener, 0, jl_Object, [otp_PlatformRunnable, otr_EventQueue$Event], 3, 0, 0, 0,
otjb_TimerHandler, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
jl_ThreadInterruptHandler, 0, jl_Object, [], 3, 3, 0, 0,
jl_Object$NotifyListenerImpl, 0, jl_Object, [jl_Object$NotifyListener, otjb_TimerHandler, otp_PlatformRunnable, jl_ThreadInterruptHandler], 0, 0, 0, ["$expired", function() { return jl_Object$NotifyListenerImpl_expired(this); }, "$onTimer", function() { jl_Object$NotifyListenerImpl_onTimer(this); }, "$run", function() { jl_Object$NotifyListenerImpl_run(this); }, "$interrupted", function() { jl_Object$NotifyListenerImpl_interrupted(this); }, "$lambda$interrupted$3", function() { jl_Object$NotifyListenerImpl_lambda$interrupted$3(this);
}, "$lambda$onTimer$1", function() { jl_Object$NotifyListenerImpl_lambda$onTimer$1(this); }, "$onTimer$exported$0", function() { return jl_Object$NotifyListenerImpl_onTimer$exported$0(this); }],
otjdx_Node, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
otjdx_Document, 0, jl_Object, [otjdx_Node], 3, 3, 0, 0,
otjde_EventTarget, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
otjdh_HTMLDocument, 0, jl_Object, [otjdx_Document, otjde_EventTarget], 3, 3, 0, 0,
Button, "Button", -1, UI, [], 1, 3, 0, 0,
jl_Long, 0, jl_Number, [jl_Comparable], 0, 3, jl_Long_$callClinit, 0,
ju_Map, 0, jl_Object, [], 3, 3, 0, 0,
jl_Thread, 0, jl_Object, [jl_Runnable], 0, 3, jl_Thread_$callClinit, ["$start", function() { jl_Thread_start(this); }, "$runThread", function() { jl_Thread_runThread(this); }, "$run", function() { jl_Thread_run(this); }, "$interrupt", function() { jl_Thread_interrupt(this); }, "$setPriority", function(var_1) { jl_Thread_setPriority(this, var_1); }],
gj_ContentReceiver, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
gj_Client$getResourceBytes$lambda$_12_0, 0, jl_Object, [gj_ContentReceiver], 0, 3, 0, ["$gotContent", function(var_1) { gj_Client$getResourceBytes$lambda$_12_0_gotContent(this, var_1); }, "$gotContent$exported$0", function(var_1) { return gj_Client$getResourceBytes$lambda$_12_0_gotContent$exported$0(this, var_1); }],
gj_ErrorCallback, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0]);
$rt_metadata([gj_Client$getResourceBytes$lambda$_12_1, 0, jl_Object, [gj_ErrorCallback], 0, 3, 0, ["$gotError", function() { gj_Client$getResourceBytes$lambda$_12_1_gotError(this); }, "$gotError$exported$0", function() { return gj_Client$getResourceBytes$lambda$_12_1_gotError$exported$0(this); }],
otp_PlatformQueue, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0,
jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0,
jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0,
Background, "Background", -1, g_Actor, [], 0, 3, 0, ["$addedToWorld0", function(var_1) { Background_addedToWorld(this, var_1); }, "$act", function() { Background_act(this); }, "$moveRelative", function(var_1, var_2) { Background_moveRelative(this, var_1, var_2); }],
Collider, "Collider", -1, g_Actor, [], 0, 3, 0, ["$intersects0", function(var_1) { return Collider_intersects(this, var_1); }, "$addedToWorld0", function(var_1) { Collider_addedToWorld(this, var_1); }, "$update0", function(var_1, var_2, var_3) { Collider_update(this, var_1, var_2, var_3); }, "$update", function() { Collider_update0(this); }, "$setLocation", function(var_1, var_2) { Collider_setLocation(this, var_1, var_2); }],
otjde_LoadEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
jl_StringIndexOutOfBoundsException, "StringIndexOutOfBoundsException", 5, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0,
Sound, 0, jl_Object, [], 0, 3, 0, ["$playSound", function(var_1) { Sound_playSound(this, var_1); }],
otjde_EventListener, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
gj_TouchManager, 0, jl_Object, [otjde_EventListener], 0, 3, 0, ["$handleEvent", function(var_1) { gj_TouchManager_handleEvent(this, var_1); }, "$handleEvent0", function(var_1) { gj_TouchManager_handleEvent0(this, var_1); }, "$handleEvent$exported$0", function(var_1) { return gj_TouchManager_handleEvent$exported$0(this, var_1); }],
jn_ByteOrder, 0, jl_Object, [], 4, 3, jn_ByteOrder_$callClinit, 0,
otci_Base46, 0, jl_Object, [], 4, 3, 0, 0,
gs_Sound, 0, jl_Object, [], 0, 3, 0, ["$play", function() { gs_Sound_play(this); }, "$loop", function() { gs_Sound_loop(this); }, "$stop", function() { gs_Sound_stop(this); }, "$setVolume", function(var_1) { gs_Sound_setVolume(this, var_1); }],
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, ["$append4", function(var_1) { return jl_AbstractStringBuilder_append(this, var_1); }, "$insert", function(var_1, var_2) { return jl_AbstractStringBuilder_insert(this, var_1, var_2); }, "$append5", function(var_1) { return jl_AbstractStringBuilder_append0(this, var_1); }, "$append2", function(var_1, var_2) { return jl_AbstractStringBuilder_append1(this, var_1, var_2); }, "$insert0", function(var_1, var_2, var_3) { return jl_AbstractStringBuilder_insert0(this,
var_1, var_2, var_3); }, "$append6", function(var_1) { return jl_AbstractStringBuilder_append2(this, var_1); }, "$insert1", function(var_1, var_2) { return jl_AbstractStringBuilder_insert1(this, var_1, var_2); }, "$append7", function(var_1) { return jl_AbstractStringBuilder_append3(this, var_1); }, "$insert2", function(var_1, var_2) { return jl_AbstractStringBuilder_insert2(this, var_1, var_2); }, "$append8", function(var_1) { return jl_AbstractStringBuilder_append4(this, var_1); }, "$insert3", function(var_1,
var_2) { return jl_AbstractStringBuilder_insert3(this, var_1, var_2); }, "$ensureCapacity", function(var_1) { jl_AbstractStringBuilder_ensureCapacity(this, var_1); }, "$toString", function() { return jl_AbstractStringBuilder_toString(this); }, "$length", function() { return jl_AbstractStringBuilder_length(this); }, "$getChars", function(var_1, var_2, var_3, var_4) { jl_AbstractStringBuilder_getChars(this, var_1, var_2, var_3, var_4); }, "$setLength", function(var_1) { jl_AbstractStringBuilder_setLength(this,
var_1); }, "$insertSpace", function(var_1, var_2) { jl_AbstractStringBuilder_insertSpace(this, var_1, var_2); }],
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, ["$append", function(var_1) { return jl_StringBuilder_append1(this, var_1); }, "$append3", function(var_1) { return jl_StringBuilder_append2(this, var_1); }, "$append9", function(var_1) { return jl_StringBuilder_append3(this, var_1); }, "$append0", function(var_1) { return jl_StringBuilder_append(this, var_1); }, "$append1", function(var_1) { return jl_StringBuilder_append0(this, var_1); }, "$insert6", function(var_1, var_2) { return jl_StringBuilder_insert(this,
var_1, var_2); }, "$insert4", function(var_1, var_2) { return jl_StringBuilder_insert0(this, var_1, var_2); }, "$insert5", function(var_1, var_2) { return jl_StringBuilder_insert1(this, var_1, var_2); }, "$insert7", function(var_1, var_2) { return jl_StringBuilder_insert2(this, var_1, var_2); }, "$setLength", function(var_1) { jl_StringBuilder_setLength(this, var_1); }, "$getChars", function(var_1, var_2, var_3, var_4) { jl_StringBuilder_getChars(this, var_1, var_2, var_3, var_4); }, "$length", function() {
return jl_StringBuilder_length(this); }, "$toString", function() { return jl_StringBuilder_toString(this); }, "$ensureCapacity", function(var_1) { jl_StringBuilder_ensureCapacity(this, var_1); }, "$insert3", function(var_1, var_2) { return jl_StringBuilder_insert3(this, var_1, var_2); }, "$insert2", function(var_1, var_2) { return jl_StringBuilder_insert4(this, var_1, var_2); }, "$insert1", function(var_1, var_2) { return jl_StringBuilder_insert5(this, var_1, var_2); }, "$insert", function(var_1, var_2) { return jl_StringBuilder_insert6(this,
var_1, var_2); }],
ju_ConcurrentModificationException, "ConcurrentModificationException", 1, jl_RuntimeException, [], 0, 3, 0, 0,
NonLiving, "NonLiving", -1, Entity, [], 1, 3, 0, 0,
Building, "Building", -1, NonLiving, [], 0, 3, 0, ["$addedToWorld", function(var_1) { Building_addedToWorld(this, var_1); }, "$getHighlights", function() { return Building_getHighlights(this); }, "$resetImage", function() { return Building_resetImage(this); }, "$getWidth", function() { return Building_getWidth(this); }, "$getHeight", function() { return Building_getHeight(this); }, "$createBump", function(var_1, var_2, var_3) { Building_createBump(this, var_1, var_2, var_3); }],
ju_Hashtable$1, 0, jl_Object, [ju_Enumeration], 4, 0, 0, 0,
ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0,
ju_Hashtable$2, 0, jl_Object, [ju_Iterator], 4, 0, 0, 0,
ju_Map$Entry, 0, jl_Object, [], 3, 3, 0, 0,
jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0,
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, ["$getKey0", function() { return ju_MapEntry_getKey(this); }, "$getValue", function() { return ju_MapEntry_getValue(this); }],
ju_Hashtable$Entry, 0, ju_MapEntry, [], 0, 0, 0, ["$getKeyHash", function() { return ju_Hashtable$Entry_getKeyHash(this); }, "$equalsKey", function(var_1, var_2) { return ju_Hashtable$Entry_equalsKey(this, var_1, var_2); }],
g_MouseInfoVisitor, 0, jl_Object, [], 0, 3, 0, 0,
jl_ReflectiveOperationException, 0, jl_Exception, [], 0, 3, 0, 0,
gc_CollisionQuery, 0, jl_Object, [], 3, 3, 0, 0,
gc_GOCollisionQuery, 0, jl_Object, [gc_CollisionQuery], 0, 3, 0, 0,
jnc_CoderMalfunctionError, "CoderMalfunctionError", 3, jl_Error, [], 0, 3, 0, 0,
gj_Client$_init_$lambda$_1_3, 0, jl_Object, [otjde_EventListener], 0, 3, 0, ["$handleEvent0", function(var_1) { gj_Client$_init_$lambda$_1_3_handleEvent(this, var_1); }, "$handleEvent1", function(var_1) { gj_Client$_init_$lambda$_1_3_handleEvent0(this, var_1); }, "$handleEvent$exported$0", function(var_1) { return gj_Client$_init_$lambda$_1_3_handleEvent$exported$0(this, var_1); }],
gj_Client$_init_$lambda$_1_2, 0, jl_Object, [otjde_EventListener], 0, 3, 0, ["$handleEvent0", function(var_1) { gj_Client$_init_$lambda$_1_2_handleEvent(this, var_1); }, "$handleEvent$exported$0", function(var_1) { return gj_Client$_init_$lambda$_1_2_handleEvent$exported$0(this, var_1); }],
gj_Client$_init_$lambda$_1_1, 0, jl_Object, [otjde_EventListener], 0, 3, 0, ["$handleEvent0", function(var_1) { gj_Client$_init_$lambda$_1_1_handleEvent(this, var_1); }, "$handleEvent$exported$0", function(var_1) { return gj_Client$_init_$lambda$_1_1_handleEvent$exported$0(this, var_1); }],
Text, "Text", -1, UI, [], 1, 3, 0, 0,
Stat, "Stat", -1, Text, [], 0, 3, Stat_$callClinit, ["$act", function() { Stat_act(this); }, "$updateStat", function() { return Stat_updateStat(this); }, "$getStat", function() { return Stat_getStat(this); }, "$increaseStat", function(var_1) { Stat_increaseStat(this, var_1); }, "$setStat", function(var_1) { Stat_setStat(this, var_1); }],
gci_ActorNode, 0, jl_Object, [], 4, 3, 0, ["$clearMark", function() { gci_ActorNode_clearMark(this); }, "$mark2", function() { gci_ActorNode_mark(this); }, "$checkMark", function() { return gci_ActorNode_checkMark(this); }, "$getBSPNode", function() { return gci_ActorNode_getBSPNode(this); }, "$getNext", function() { return gci_ActorNode_getNext(this); }, "$remove0", function() { gci_ActorNode_remove(this); }, "$removed", function() { gci_ActorNode_removed(this); }],
ju_StringTokenizer, 0, jl_Object, [ju_Enumeration], 0, 3, 0, ["$countTokens", function() { return ju_StringTokenizer_countTokens(this); }, "$hasMoreTokens", function() { return ju_StringTokenizer_hasMoreTokens(this); }, "$nextToken", function() { return ju_StringTokenizer_nextToken(this); }],
jn_Buffer, 0, jl_Object, [], 1, 3, 0, ["$position3", function() { return jn_Buffer_position(this); }, "$position2", function(var_1) { return jn_Buffer_position0(this, var_1); }, "$clear", function() { return jn_Buffer_clear(this); }, "$remaining", function() { return jn_Buffer_remaining(this); }, "$hasRemaining", function() { return jn_Buffer_hasRemaining(this); }],
g_Color, 0, jl_Object, [], 0, 3, g_Color_$callClinit, ["$getRed", function() { return g_Color_getRed(this); }, "$getGreen", function() { return g_Color_getGreen(this); }, "$getAlpha", function() { return g_Color_getAlpha(this); }, "$getBlue", function() { return g_Color_getBlue(this); }],
gj_Client$getResourceURL$lambda$_11_0, 0, jl_Object, [gj_ContentReceiver], 0, 3, 0, ["$gotContent", function(var_1) { gj_Client$getResourceURL$lambda$_11_0_gotContent(this, var_1); }, "$gotContent$exported$0", function(var_1) { return gj_Client$getResourceURL$lambda$_11_0_gotContent$exported$0(this, var_1); }],
gj_Client$_init_$lambda$_1_0, 0, jl_Object, [otjde_EventListener], 0, 3, 0, ["$handleEvent0", function(var_1) { gj_Client$_init_$lambda$_1_0_handleEvent(this, var_1); }, "$handleEvent1", function(var_1) { gj_Client$_init_$lambda$_1_0_handleEvent0(this, var_1); }, "$handleEvent$exported$0", function(var_1) { return gj_Client$_init_$lambda$_1_0_handleEvent$exported$0(this, var_1); }],
gj_Client$getResourceURL$lambda$_11_1, 0, jl_Object, [gj_ErrorCallback], 0, 3, 0, ["$gotError", function() { gj_Client$getResourceURL$lambda$_11_1_gotError(this); }, "$gotError$exported$0", function() { return gj_Client$getResourceURL$lambda$_11_1_gotError$exported$0(this); }],
ProgressBar, "ProgressBar", -1, UI, [], 0, 3, 0, ["$act", function() { ProgressBar_act(this); }, "$drawBar", function() { return ProgressBar_drawBar(this); }, "$getTimeElapsed", function() { return ProgressBar_getTimeElapsed(this); }, "$getDistanceTravelled", function() { return ProgressBar_getDistanceTravelled(this); }, "$getSongDuration", function() { return ProgressBar_getSongDuration(this); }],
ji_Flushable, 0, jl_Object, [], 3, 3, 0, 0,
gci_Rect, 0, jl_Object, [], 4, 3, 0, ["$copyFrom", function(var_1) { gci_Rect_copyFrom(this, var_1); }, "$getX", function() { return gci_Rect_getX(this); }, "$getMiddleX", function() { return gci_Rect_getMiddleX(this); }, "$getRight", function() { return gci_Rect_getRight(this); }, "$getY", function() { return gci_Rect_getY(this); }, "$getMiddleY", function() { return gci_Rect_getMiddleY(this); }, "$getTop", function() { return gci_Rect_getTop(this); }, "$getWidth", function() { return gci_Rect_getWidth(this);
}, "$getHeight", function() { return gci_Rect_getHeight(this); }, "$contains", function(var_1) { return gci_Rect_contains(this, var_1); }, "$setX", function(var_1) { gci_Rect_setX(this, var_1); }, "$setY", function(var_1) { gci_Rect_setY(this, var_1); }, "$intersects", function(var_1) { return gci_Rect_intersects(this, var_1); }],
jl_IncompatibleClassChangeError, 0, jl_LinkageError, [], 0, 3, 0, 0,
gs_SoundFactory, 0, jl_Object, [], 0, 3, gs_SoundFactory_$callClinit, ["$createSound", function(var_1, var_2) { return gs_SoundFactory_createSound(this, var_1, var_2); }]]);
$rt_metadata([jl_NoSuchMethodError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0,
ji_IOException, "IOException", 4, jl_Exception, [], 0, 3, 0, 0,
Calc, 0, jl_Object, [], 0, 3, 0, 0,
gc_PointCollisionQuery, 0, jl_Object, [gc_CollisionQuery], 0, 3, 0, 0,
gc_CollisionChecker, 0, jl_Object, [], 3, 3, 0, 0,
gci_IBSPColChecker, 0, jl_Object, [gc_CollisionChecker], 0, 3, gci_IBSPColChecker_$callClinit, ["$initialize0", function(var_1, var_2, var_3, var_4) { gci_IBSPColChecker_initialize(this, var_1, var_2, var_3, var_4); }, "$addObject0", function(var_1) { gci_IBSPColChecker_addObject(this, var_1); }, "$insertObject", function(var_1, var_2, var_3, var_4, var_5) { gci_IBSPColChecker_insertObject(this, var_1, var_2, var_3, var_4, var_5); }, "$createNewNode", function(var_1) { return gci_IBSPColChecker_createNewNode(this,
var_1); }, "$getActorBounds", function(var_1) { return gci_IBSPColChecker_getActorBounds(this, var_1); }, "$removeObject", function(var_1) { gci_IBSPColChecker_removeObject(this, var_1); }, "$checkRemoveNode", function(var_1) { return gci_IBSPColChecker_checkRemoveNode(this, var_1); }, "$updateObject", function(var_1) { gci_IBSPColChecker_updateObject(this, var_1); }, "$updateObjectLocation", function(var_1, var_2, var_3) { gci_IBSPColChecker_updateObjectLocation(this, var_1, var_2, var_3); }, "$updateObjectSize",
function(var_1) { gci_IBSPColChecker_updateObjectSize(this, var_1); }, "$startSequence", function() { gci_IBSPColChecker_startSequence(this); }],
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$hasNext", function() { return ju_AbstractList$1_hasNext(this); }, "$next", function() { return ju_AbstractList$1_next(this); }, "$checkConcurrentModification", function() { ju_AbstractList$1_checkConcurrentModification(this); }],
gc_ActInterruptedException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
gc_ImageCache, 0, jl_Object, [], 0, 3, gc_ImageCache_$callClinit, ["$addCachedImage", function(var_1, var_2) { return gc_ImageCache_addCachedImage(this, var_1, var_2); }, "$getCachedImage", function(var_1) { return gc_ImageCache_getCachedImage(this, var_1); }],
jl_UnsupportedOperationException, "UnsupportedOperationException", 5, jl_RuntimeException, [], 0, 3, 0, 0,
jn_ReadOnlyBufferException, "ReadOnlyBufferException", 2, jl_UnsupportedOperationException, [], 0, 3, 0, 0,
ge_WorldListener, 0, jl_Object, [], 3, 3, 0, 0,
gc_Simulation, 0, jl_Thread, [ge_WorldListener], 0, 3, gc_Simulation_$callClinit, ["$attachWorldHandler", function(var_1) { gc_Simulation_attachWorldHandler(this, var_1); }, "$run", function() { gc_Simulation_run(this); }, "$runContent", function() { gc_Simulation_runContent(this); }, "$simulationWait", function() { gc_Simulation_simulationWait(this); }, "$maybePause", function() { gc_Simulation_maybePause(this); }, "$resumeRunning", function() { gc_Simulation_resumeRunning(this); }, "$signalStopping", function(var_1)
{ gc_Simulation_signalStopping(this, var_1); }, "$runQueuedTasks", function() { gc_Simulation_runQueuedTasks(this); }, "$runOneLoop", function(var_1) { gc_Simulation_runOneLoop(this, var_1); }, "$repaintIfNeeded", function() { gc_Simulation_repaintIfNeeded(this); }, "$setPaused", function(var_1) { gc_Simulation_setPaused(this, var_1); }, "$interruptDelay0", function() { gc_Simulation_interruptDelay(this); }, "$setEnabled", function(var_1) { gc_Simulation_setEnabled(this, var_1); }, "$fireSimulationEvent", function(var_1)
{ gc_Simulation_fireSimulationEvent(this, var_1); }, "$addSimulationListener", function(var_1) { gc_Simulation_addSimulationListener(this, var_1); }, "$setSpeed", function(var_1) { gc_Simulation_setSpeed(this, var_1); }, "$calculateDelay", function(var_1) { return gc_Simulation_calculateDelay(this, var_1); }, "$getSpeed0", function() { return gc_Simulation_getSpeed(this); }, "$delay0", function() { gc_Simulation_delay(this); }, "$worldCreated", function(var_1) { gc_Simulation_worldCreated(this, var_1); }, "$worldRemoved",
function(var_1) { gc_Simulation_worldRemoved(this, var_1); }],
g_GreenfootSound, 0, jl_Object, [], 0, 3, 0, ["$play", function() { g_GreenfootSound_play(this); }, "$playLoop", function() { g_GreenfootSound_playLoop(this); }, "$stop", function() { g_GreenfootSound_stop(this); }, "$setVolume", function(var_1) { g_GreenfootSound_setVolume(this, var_1); }],
jlr_Array, 0, jl_Object, [], 4, 3, 0, 0,
jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, ["$run", function() { jl_Object$NotifyListenerImpl$interrupted$lambda$_4_0_run(this); }],
gu_GreenfootUtil, 0, jl_Object, [], 0, 3, gu_GreenfootUtil_$callClinit, 0,
ju_ListIterator, 0, jl_Object, [ju_Iterator], 3, 3, 0, 0,
Label, "Label", -1, Text, [], 0, 3, Label_$callClinit, ["$act", function() { Label_act(this); }, "$updateLabel", function() { return Label_updateLabel(this); }],
otcit_DoubleAnalyzer$Result, 0, jl_Object, [], 0, 3, 0, 0,
ju_Random, 0, jl_Object, [ji_Serializable], 0, 3, 0, ["$nextInt", function(var_1) { return ju_Random_nextInt(this, var_1); }, "$nextDouble", function() { return ju_Random_nextDouble(this); }],
otpp_ResourceAccessor, 0, jl_Object, [], 4, 0, 0, 0,
jl_NoSuchFieldError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0,
jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, ["$isEmpty", function() { return ju_AbstractCollection_isEmpty(this); }, "$toArray0", function() { return ju_AbstractCollection_toArray(this); }, "$toArray", function(var_1) { return ju_AbstractCollection_toArray0(this, var_1); }, "$remove1", function(var_1) { return ju_AbstractCollection_remove(this, var_1); }, "$addAll", function(var_1) { return ju_AbstractCollection_addAll(this, var_1); }],
gu_GraphicsUtilities, 0, jl_Object, [], 0, 3, 0, 0,
ji_ByteArrayInputStream, 0, ji_InputStream, [], 0, 3, 0, ["$read", function(var_1, var_2, var_3) { return ji_ByteArrayInputStream_read(this, var_1, var_2, var_3); }],
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0,
LinkBox, "LinkBox", -1, Text, [], 0, 3, LinkBox_$callClinit, ["$resetImage", function() { return LinkBox_resetImage(this); }, "$act", function() { LinkBox_act(this); }, "$checkKeys", function() { LinkBox_checkKeys(this); }, "$keyBehavior", function(var_1) { LinkBox_keyBehavior(this, var_1); }, "$checkEnterAndUnselect", function() { LinkBox_checkEnterAndUnselect(this); }, "$getTextImage", function() { return LinkBox_getTextImage(this); }, "$getClipboardContents", function() { return LinkBox_getClipboardContents(this);
}, "$getText", function() { return LinkBox_getText(this); }, "$updateValidity", function() { LinkBox_updateValidity(this); }, "$isValid", function() { return LinkBox_isValid(this); }],
Living, "Living", -1, Entity, [], 1, 3, 0, 0,
Enemy, "Enemy", -1, Living, [], 0, 3, 0, ["$addedToWorld", function(var_1) { Enemy_addedToWorld(this, var_1); }, "$resetImage", function() { return Enemy_resetImage(this); }, "$run", function() { Enemy_run(this); }, "$slash", function(var_1) { Enemy_slash(this, var_1); }, "$getSlashed", function() { return Enemy_getSlashed(this); }, "$getPrevTime", function() { return Enemy_getPrevTime(this); }, "$getTime", function() { return Enemy_getTime(this); }],
jl_InstantiationException, "InstantiationException", 5, jl_ReflectiveOperationException, [], 0, 3, 0, 0,
jl_Readable, 0, jl_Object, [], 3, 3, 0, 0,
g_ImageVisitor, 0, jl_Object, [], 0, 3, 0, 0,
otji_JS, 0, jl_Object, [], 4, 0, 0, 0,
jn_URLStreamHandlerFactory, 0, jl_Object, [], 3, 3, 0, 0,
otciu_UnicodeHelper, 0, jl_Object, [], 4, 3, 0, 0,
jl_Object$monitorEnterWait$lambda$_6_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, ["$run", function() { jl_Object$monitorEnterWait$lambda$_6_0_run(this); }],
ju_Objects, 0, jl_Object, [], 4, 3, 0, 0,
g_GreenfootImage$2, 0, jl_Object, [otjde_EventListener], 0, 0, 0, ["$handleEvent0", function(var_1) { g_GreenfootImage$2_handleEvent(this, var_1); }, "$handleEvent$exported$0", function(var_1) { return g_GreenfootImage$2_handleEvent$exported$0(this, var_1); }],
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0,
g_GreenfootImage$1, 0, jl_Object, [otjde_EventListener], 0, 0, 0, ["$handleEvent0", function(var_1) { g_GreenfootImage$1_handleEvent(this, var_1); }, "$handleEvent$exported$0", function(var_1) { return g_GreenfootImage$1_handleEvent$exported$0(this, var_1); }],
jnc_CharsetEncoder, 0, jl_Object, [], 1, 3, 0, ["$checkReplacement", function(var_1) { jnc_CharsetEncoder_checkReplacement(this, var_1); }, "$onMalformedInput", function(var_1) { return jnc_CharsetEncoder_onMalformedInput(this, var_1); }, "$implOnMalformedInput", function(var_1) { jnc_CharsetEncoder_implOnMalformedInput(this, var_1); }, "$onUnmappableCharacter", function(var_1) { return jnc_CharsetEncoder_onUnmappableCharacter(this, var_1); }, "$implOnUnmappableCharacter", function(var_1) { jnc_CharsetEncoder_implOnUnmappableCharacter(this,
var_1); }, "$encode", function(var_1, var_2, var_3) { return jnc_CharsetEncoder_encode(this, var_1, var_2, var_3); }, "$flush", function(var_1) { return jnc_CharsetEncoder_flush(this, var_1); }, "$implFlush", function(var_1) { return jnc_CharsetEncoder_implFlush(this, var_1); }],
otjb_Performance, 0, jl_Object, [otj_JSObject], 4, 3, 0, 0,
gj_Client$lambda$new$1$lambda$_22_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, ["$run", function() { gj_Client$lambda$new$1$lambda$_22_0_run(this); }],
ju_Queue, 0, jl_Object, [ju_Collection], 3, 3, 0, 0,
jl_ArrayStoreException, "ArrayStoreException", 5, jl_RuntimeException, [], 0, 3, 0, 0,
gs_SoundFactory$2, 0, jl_Object, [otjde_EventListener], 0, 0, 0, ["$handleEvent0", function(var_1) { gs_SoundFactory$2_handleEvent(this, var_1); }, "$handleEvent$exported$0", function(var_1) { return gs_SoundFactory$2_handleEvent$exported$0(this, var_1); }],
gs_SoundFactory$1, 0, jl_Object, [otjde_EventListener], 0, 0, 0, ["$handleEvent0", function(var_1) { gs_SoundFactory$1_handleEvent(this, var_1); }, "$handleEvent$exported$0", function(var_1) { return gs_SoundFactory$1_handleEvent$exported$0(this, var_1); }]]);
$rt_metadata([jn_ByteBuffer, 0, jn_Buffer, [jl_Comparable], 1, 3, 0, ["$put1", function(var_1, var_2, var_3) { return jn_ByteBuffer_put0(this, var_1, var_2, var_3); }, "$put0", function(var_1) { return jn_ByteBuffer_put(this, var_1); }],
jn_ByteBufferImpl, 0, jn_ByteBuffer, [], 0, 0, 0, ["$isReadOnly", function() { return jn_ByteBufferImpl_isReadOnly(this); }],
ju_HashMap$AbstractMapIterator, 0, jl_Object, [], 0, 0, 0, ["$hasNext", function() { return ju_HashMap$AbstractMapIterator_hasNext(this); }, "$checkConcurrentMod", function() { ju_HashMap$AbstractMapIterator_checkConcurrentMod(this); }, "$makeNext", function() { ju_HashMap$AbstractMapIterator_makeNext(this); }],
ju_HashMap$KeyIterator, 0, ju_HashMap$AbstractMapIterator, [ju_Iterator], 0, 0, 0, ["$next", function() { return ju_HashMap$KeyIterator_next(this); }],
jl_Thread$SleepHandler, 0, jl_Object, [otp_PlatformRunnable, otr_EventQueue$Event, jl_ThreadInterruptHandler], 0, 0, 0, ["$interrupted", function() { jl_Thread$SleepHandler_interrupted(this); }, "$run", function() { jl_Thread$SleepHandler_run(this); }, "$lambda$interrupted$1", function() { jl_Thread$SleepHandler_lambda$interrupted$1(this); }],
gc_ColManager, 0, jl_Object, [gc_CollisionChecker], 0, 3, 0, ["$addObject0", function(var_1) { gc_ColManager_addObject(this, var_1); }, "$initialize0", function(var_1, var_2, var_3, var_4) { gc_ColManager_initialize(this, var_1, var_2, var_3, var_4); }, "$removeObject", function(var_1) { gc_ColManager_removeObject(this, var_1); }, "$startSequence", function() { gc_ColManager_startSequence(this); }, "$updateObjectLocation", function(var_1, var_2, var_3) { gc_ColManager_updateObjectLocation(this, var_1, var_2,
var_3); }, "$updateObjectSize", function(var_1) { gc_ColManager_updateObjectSize(this, var_1); }],
TitleButton, "TitleButton", -1, Button, [], 0, 3, 0, ["$act", function() { TitleButton_act(this); }],
ju_Set, 0, jl_Object, [ju_Collection], 3, 3, 0, 0,
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1, 3, 0, ["$equals", function(var_1) { return ju_AbstractSet_equals(this, var_1); }],
ju_HashSet, 0, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 0, 3, 0, ["$add0", function(var_1) { return ju_HashSet_add(this, var_1); }, "$contains0", function(var_1) { return ju_HashSet_contains(this, var_1); }, "$iterator", function() { return ju_HashSet_iterator(this); }],
g_ActorSet$ActorSetIterator, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$hasNext", function() { return g_ActorSet$ActorSetIterator_hasNext(this); }, "$next4", function() { return g_ActorSet$ActorSetIterator_next(this); }, "$remove0", function() { g_ActorSet$ActorSetIterator_remove(this); }, "$next", function() { return g_ActorSet$ActorSetIterator_next0(this); }],
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0,
jnc_Charset, 0, jl_Object, [jl_Comparable], 1, 3, 0, 0,
gp_ActorDelegate, 0, jl_Object, [], 3, 3, 0, 0,
jnc_CodingErrorAction, 0, jl_Object, [], 0, 3, jnc_CodingErrorAction_$callClinit, 0,
jl_IllegalArgumentException, "IllegalArgumentException", 5, jl_RuntimeException, [], 0, 3, 0, 0,
jnc_IllegalCharsetNameException, "IllegalCharsetNameException", 3, jl_IllegalArgumentException, [], 0, 3, 0, 0,
ju_List, 0, jl_Object, [ju_Collection], 3, 3, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, ["$add0", function(var_1) { return ju_AbstractList_add(this, var_1); }, "$iterator", function() { return ju_AbstractList_iterator(this); }, "$indexOf1", function(var_1) { return ju_AbstractList_indexOf(this, var_1); }],
ju_AbstractSequentialList, 0, ju_AbstractList, [], 1, 3, 0, ["$get0", function(var_1) { return ju_AbstractSequentialList_get(this, var_1); }, "$add2", function(var_1, var_2) { ju_AbstractSequentialList_add(this, var_1, var_2); }, "$iterator", function() { return ju_AbstractSequentialList_iterator(this); }],
ju_Deque, 0, jl_Object, [ju_Queue], 3, 3, 0, 0,
ju_LinkedList, 0, ju_AbstractSequentialList, [ju_Deque], 0, 3, 0, ["$size", function() { return ju_LinkedList_size(this); }, "$clear0", function() { ju_LinkedList_clear(this); }, "$listIterator0", function() { return ju_LinkedList_listIterator(this); }, "$listIterator", function(var_1) { return ju_LinkedList_listIterator0(this, var_1); }, "$remove2", function() { return ju_LinkedList_remove(this); }, "$poll", function() { return ju_LinkedList_poll(this); }, "$peek", function() { return ju_LinkedList_peek(this);
}, "$removeFirst", function() { return ju_LinkedList_removeFirst(this); }, "$removeEntry", function(var_1) { ju_LinkedList_removeEntry(this, var_1); }],
ju_NoSuchElementException, "NoSuchElementException", 1, jl_RuntimeException, [], 0, 3, 0, 0,
gs_SoundFactory$1$handleEvent$lambda$_1_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, ["$run", function() { gs_SoundFactory$1$handleEvent$lambda$_1_0_run(this); }],
RestartButton, "RestartButton", -1, Button, [], 0, 3, 0, ["$act", function() { RestartButton_act(this); }],
otjc_JSString, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0,
ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1, 3, 0, ["$write0", function(var_1, var_2, var_3) { ji_OutputStream_write(this, var_1, var_2, var_3); }],
ji_FilterOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0,
ji_PrintStream, 0, ji_FilterOutputStream, [], 0, 3, 0, ["$write0", function(var_1, var_2, var_3) { ji_PrintStream_write(this, var_1, var_2, var_3); }, "$check", function() { return ji_PrintStream_check(this); }, "$print0", function(var_1, var_2, var_3) { ji_PrintStream_print(this, var_1, var_2, var_3); }, "$print1", function(var_1) { ji_PrintStream_print0(this, var_1); }, "$print", function(var_1) { ji_PrintStream_print1(this, var_1); }, "$println1", function(var_1) { ji_PrintStream_println(this, var_1); },
"$println0", function(var_1) { ji_PrintStream_println0(this, var_1); }, "$println", function() { ji_PrintStream_println1(this); }, "$printSB", function() { ji_PrintStream_printSB(this); }],
oti_AsyncCallback, 0, jl_Object, [], 3, 3, 0, 0,
g_GreenfootImage, 0, jl_Object, [], 0, 3, g_GreenfootImage_$callClinit, ["$setupRenderContext", function() { g_GreenfootImage_setupRenderContext(this); }, "$getRenderContext", function(var_1) { return g_GreenfootImage_getRenderContext(this, var_1); }, "$toJsColor", function(var_1) { return g_GreenfootImage_toJsColor(this, var_1); }, "$getCopyOnWriteClone", function() { return g_GreenfootImage_getCopyOnWriteClone(this); }, "$createClone", function(var_1) { g_GreenfootImage_createClone(this, var_1); }, "$loadFile",
function(var_1) { g_GreenfootImage_loadFile(this, var_1); }, "$drawToCanvas", function(var_1, var_2, var_3) { g_GreenfootImage_drawToCanvas(this, var_1, var_2, var_3); }, "$getWidth", function() { return g_GreenfootImage_getWidth(this); }, "$getHeight", function() { return g_GreenfootImage_getHeight(this); }, "$scale", function(var_1, var_2) { g_GreenfootImage_scale(this, var_1, var_2); }, "$fill", function() { g_GreenfootImage_fill(this); }, "$drawImage", function(var_1, var_2, var_3) { g_GreenfootImage_drawImage(this,
var_1, var_2, var_3); }, "$setFont", function(var_1) { g_GreenfootImage_setFont(this, var_1); }, "$getFont", function() { return g_GreenfootImage_getFont(this); }, "$setColor", function(var_1) { g_GreenfootImage_setColor(this, var_1); }, "$setTransparency", function(var_1) { g_GreenfootImage_setTransparency(this, var_1); }, "$getTransparency", function() { return g_GreenfootImage_getTransparency(this); }, "$fillRect", function(var_1, var_2, var_3, var_4) { g_GreenfootImage_fillRect(this, var_1, var_2, var_3,
var_4); }, "$drawString", function(var_1, var_2, var_3) { g_GreenfootImage_drawString(this, var_1, var_2, var_3); }, "$ensureWritableImage", function() { g_GreenfootImage_ensureWritableImage(this); }],
ju_AbstractMap, 0, jl_Object, [ju_Map], 1, 3, 0, 0,
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0,
jl_Class, 0, jl_Object, [jlr_AnnotatedElement], 0, 3, 0, ["$getPlatformClass", function() { return jl_Class_getPlatformClass(this); }, "$isInstance", function(var_1) { return jl_Class_isInstance(this, var_1); }, "$getName", function() { return jl_Class_getName(this); }, "$isPrimitive0", function() { return jl_Class_isPrimitive(this); }, "$getComponentType", function() { return jl_Class_getComponentType(this); }, "$getSuperclass", function() { return jl_Class_getSuperclass(this); }, "$newInstance1", function()
{ return jl_Class_newInstance(this); }],
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0,
gc_ImageCache$CachedImageRef, 0, jl_Object, [], 0, 0, 0, ["$get1", function() { return gc_ImageCache$CachedImageRef_get(this); }],
HighlightEnabler, "HighlightEnabler", -1, Button, [], 0, 3, 0, ["$act", function() { HighlightEnabler_act(this); }],
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0,
gci_BSPNodeCache, 0, jl_Object, [], 0, 3, gci_BSPNodeCache_$callClinit, 0,
gj_MouseManager, 0, jl_Object, [otjde_EventListener], 0, 3, 0, ["$newActStarted", function() { gj_MouseManager_newActStarted(this); }, "$registerEventRecieved", function() { gj_MouseManager_registerEventRecieved(this); }, "$isMousePressed", function(var_1) { return gj_MouseManager_isMousePressed(this, var_1); }, "$isMouseClicked", function(var_1) { return gj_MouseManager_isMouseClicked(this, var_1); }, "$isMouseDragged", function(var_1) { return gj_MouseManager_isMouseDragged(this, var_1); }, "$getMouseInfo",
function() { return gj_MouseManager_getMouseInfo(this); }, "$handleEvent1", function(var_1) { gj_MouseManager_handleEvent(this, var_1); }, "$handleTouchEvent", function(var_1) { gj_MouseManager_handleTouchEvent(this, var_1); }, "$findTouch", function(var_1, var_2) { return gj_MouseManager_findTouch(this, var_1, var_2); }, "$mouseClicked1", function(var_1, var_2, var_3, var_4) { gj_MouseManager_mouseClicked(this, var_1, var_2, var_3, var_4); }, "$mouseExited", function() { gj_MouseManager_mouseExited(this); },
"$mousePressed1", function(var_1, var_2, var_3) { gj_MouseManager_mousePressed(this, var_1, var_2, var_3); }, "$mouseReleased", function(var_1, var_2, var_3) { gj_MouseManager_mouseReleased(this, var_1, var_2, var_3); }, "$mouseDragged0", function(var_1, var_2, var_3) { gj_MouseManager_mouseDragged(this, var_1, var_2, var_3); }, "$mouseMoved0", function(var_1, var_2) { gj_MouseManager_mouseMoved(this, var_1, var_2); }, "$handleEvent0", function(var_1) { gj_MouseManager_handleEvent0(this, var_1); }, "$lambda$handleTouchEvent$1",
function(var_1, var_2) { gj_MouseManager_lambda$handleTouchEvent$1(this, var_1, var_2); }, "$lambda$handleEvent$01", function(var_1, var_2) { gj_MouseManager_lambda$handleEvent$0(this, var_1, var_2); }, "$handleEvent$exported$0", function(var_1) { return gj_MouseManager_handleEvent$exported$0(this, var_1); }],
ggim_WorldLocator, 0, jl_Object, [], 3, 3, 0, 0,
gc_WorldHandler$1, 0, jl_Object, [otjde_EventListener], 0, 0, 0, ["$handleEvent1", function(var_1) { gc_WorldHandler$1_handleEvent(this, var_1); }, "$handleEvent0", function(var_1) { gc_WorldHandler$1_handleEvent0(this, var_1); }, "$handleEvent$exported$0", function(var_1) { return gc_WorldHandler$1_handleEvent$exported$0(this, var_1); }],
jl_ConsoleOutputStreamStdout, 0, ji_OutputStream, [], 0, 0, 0, ["$write", function(var_1) { jl_ConsoleOutputStreamStdout_write(this, var_1); }],
jl_System, 0, jl_Object, [], 4, 3, 0, 0,
g_Greenfoot, 0, jl_Object, [], 0, 3, g_Greenfoot_$callClinit, 0,
gc_InRangeQuery, 0, jl_Object, [gc_CollisionQuery], 0, 3, 0, 0,
gc_RepaintHandler, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
gc_WorldHandler$2, 0, jl_Object, [gc_RepaintHandler], 0, 0, 0, ["$doRepaint", function() { gc_WorldHandler$2_doRepaint(this); }, "$doRepaint$exported$0", function() { return gc_WorldHandler$2_doRepaint$exported$0(this); }],
Image, "Image", -1, Entity, [], 1, 3, 0, 0,
EnemyImage, "EnemyImage", -1, Image, [], 0, 3, 0, ["$run", function() { EnemyImage_run(this); }, "$resetFrame", function() { EnemyImage_resetFrame(this); }, "$resetImage", function() { return EnemyImage_resetImage(this); }, "$setDistanceFromPlayer", function(var_1) { EnemyImage_setDistanceFromPlayer(this, var_1); }]]);
$rt_metadata([ju_LinkedList$Entry, 0, jl_Object, [], 0, 0, 0, 0,
ju_Collections$5, 0, ju_AbstractSet, [], 4, 0, 0, 0,
ju_Collections$6, 0, ju_AbstractMap, [], 4, 0, 0, 0,
ju_Collections$3, 0, ju_AbstractList, [], 4, 0, 0, 0,
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, jl_Character_$callClinit, 0,
jl_Object$monitorExit$lambda$_8_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, ["$run", function() { jl_Object$monitorExit$lambda$_8_0_run(this); }],
g_GreenfootImage$2$handleEvent$lambda$_1_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, ["$run", function() { g_GreenfootImage$2$handleEvent$lambda$_1_0_run(this); }],
ggim_PriorityManager, 0, jl_Object, [], 0, 3, 0, 0,
jn_CharBuffer, 0, jn_Buffer, [jl_Comparable, jl_Appendable, jl_CharSequence, jl_Readable], 1, 3, 0, ["$get3", function(var_1, var_2, var_3) { return jn_CharBuffer_get(this, var_1, var_2, var_3); }],
jn_CharBufferImpl, 0, jn_CharBuffer, [], 1, 0, 0, 0,
jn_CharBufferOverArray, 0, jn_CharBufferImpl, [], 0, 0, 0, ["$getChar", function(var_1) { return jn_CharBufferOverArray_getChar(this, var_1); }],
BuildingImage, "BuildingImage", -1, Image, [], 0, 3, BuildingImage_$callClinit, ["$addedToWorld", function(var_1) { BuildingImage_addedToWorld(this, var_1); }, "$run", function() { BuildingImage_run(this); }, "$resetImage", function() { return BuildingImage_resetImage(this); }, "$getBuildingImage", function(var_1) { return BuildingImage_getBuildingImage(this, var_1); }, "$getMarginWidth", function(var_1) { return BuildingImage_getMarginWidth(this, var_1); }, "$getImageOffset", function(var_1) { return BuildingImage_getImageOffset(this,
var_1); }, "$getImageWidth", function(var_1) { return BuildingImage_getImageWidth(this, var_1); }],
jl_Thread$SleepHandler$interrupted$lambda$_1_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, ["$run", function() { jl_Thread$SleepHandler$interrupted$lambda$_1_0_run(this); }],
Instructions, "Instructions", -1, Button, [], 0, 3, 0, ["$act", function() { Instructions_act(this); }],
g_ActorVisitor, 0, jl_Object, [], 0, 3, 0, 0,
otc_ResourceSource, 0, jl_Object, [], 1, 3, 0, 0,
ju_Dictionary, 0, jl_Object, [], 1, 3, 0, 0,
ggim_MouseEventData, 0, jl_Object, [], 0, 3, 0, ["$init", function() { ggim_MouseEventData_init(this); }, "$getMouseInfo", function() { return ggim_MouseEventData_getMouseInfo(this); }, "$isMousePressed", function(var_1) { return ggim_MouseEventData_isMousePressed(this, var_1); }, "$mousePressed0", function(var_1, var_2, var_3, var_4) { ggim_MouseEventData_mousePressed(this, var_1, var_2, var_3, var_4); }, "$isMouseClicked", function(var_1) { return ggim_MouseEventData_isMouseClicked(this, var_1); }, "$mouseClicked0",
function(var_1, var_2, var_3, var_4, var_5) { ggim_MouseEventData_mouseClicked(this, var_1, var_2, var_3, var_4, var_5); }, "$isMouseDragged", function(var_1) { return ggim_MouseEventData_isMouseDragged(this, var_1); }, "$mouseDragged", function(var_1, var_2, var_3, var_4) { ggim_MouseEventData_mouseDragged(this, var_1, var_2, var_3, var_4); }, "$isMouseDragEnded", function(var_1) { return ggim_MouseEventData_isMouseDragEnded(this, var_1); }, "$mouseDragEnded", function(var_1, var_2, var_3, var_4) { ggim_MouseEventData_mouseDragEnded(this,
var_1, var_2, var_3, var_4); }, "$mouseExited", function() { ggim_MouseEventData_mouseExited(this); }, "$isMouseMoved", function(var_1) { return ggim_MouseEventData_isMouseMoved(this, var_1); }, "$mouseMoved", function(var_1, var_2, var_3, var_4) { ggim_MouseEventData_mouseMoved(this, var_1, var_2, var_3, var_4); }, "$getActor", function() { return ggim_MouseEventData_getActor(this); }, "$getButton", function() { return ggim_MouseEventData_getButton(this); }, "$checkObject", function(var_1, var_2) { return ggim_MouseEventData_checkObject(this,
var_1, var_2); }],
ju_HashMap$1, 0, ju_AbstractSet, [], 0, 0, 0, ["$iterator", function() { return ju_HashMap$1_iterator(this); }],
jl_Double, 0, jl_Number, [jl_Comparable], 0, 3, jl_Double_$callClinit, 0,
g_ActorSet$ListNode, 0, jl_Object, [], 0, 0, 0, ["$setHashListHead", function(var_1) { g_ActorSet$ListNode_setHashListHead(this, var_1); }, "$remove0", function() { g_ActorSet$ListNode_remove(this); }],
otjde_FocusEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjde_MouseEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjde_KeyboardEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjb_WindowEventTarget, 0, jl_Object, [otjde_EventTarget, otjde_FocusEventTarget, otjde_MouseEventTarget, otjde_KeyboardEventTarget, otjde_LoadEventTarget], 3, 3, 0, 0,
ge_SimulationEvent, 0, jl_Object, [], 0, 3, 0, ["$getType0", function() { return ge_SimulationEvent_getType(this); }],
ju_RandomAccess, 0, jl_Object, [], 3, 3, 0, 0,
ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 0, 3, 0, ["$ensureCapacity", function(var_1) { ju_ArrayList_ensureCapacity(this, var_1); }, "$get0", function(var_1) { return ju_ArrayList_get(this, var_1); }, "$size", function() { return ju_ArrayList_size(this); }, "$clone", function() { return ju_ArrayList_clone(this); }, "$set", function(var_1, var_2) { return ju_ArrayList_set(this, var_1, var_2); }, "$add0", function(var_1) { return ju_ArrayList_add(this, var_1); }, "$remove3",
function(var_1) { return ju_ArrayList_remove(this, var_1); }, "$remove1", function(var_1) { return ju_ArrayList_remove0(this, var_1); }, "$clear0", function() { ju_ArrayList_clear(this); }, "$checkIndex", function(var_1) { ju_ArrayList_checkIndex(this, var_1); }],
Slope, "Slope", -1, NonLiving, [], 0, 3, 0, ["$resetImage", function() { return Slope_resetImage(this); }, "$distanceBelow", function(var_1, var_2) { return Slope_distanceBelow(this, var_1, var_2); }, "$getWidth", function() { return Slope_getWidth(this); }],
otjb_StorageProvider, 0, jl_Object, [], 3, 3, 0, 0,
otjc_JSArrayReader, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
otjb_Window, 0, jl_Object, [otj_JSObject, otjb_WindowEventTarget, otjb_StorageProvider, otjc_JSArrayReader], 1, 3, 0, ["$addEventListener$exported$0", function(var_1, var_2) { return otjb_Window_addEventListener$exported$0(this, var_1, var_2); }, "$removeEventListener$exported$1", function(var_1, var_2) { return otjb_Window_removeEventListener$exported$1(this, var_1, var_2); }, "$get$exported$2", function(var_1) { return otjb_Window_get$exported$2(this, var_1); }, "$removeEventListener$exported$3", function(var_1,
var_2, var_3) { return otjb_Window_removeEventListener$exported$3(this, var_1, var_2, var_3); }, "$dispatchEvent$exported$4", function(var_1) { return otjb_Window_dispatchEvent$exported$4(this, var_1); }, "$getLength$exported$5", function() { return otjb_Window_getLength$exported$5(this); }, "$addEventListener$exported$6", function(var_1, var_2, var_3) { return otjb_Window_addEventListener$exported$6(this, var_1, var_2, var_3); }],
jl_IllegalMonitorStateException, "IllegalMonitorStateException", 5, jl_RuntimeException, [], 0, 3, 0, 0,
ScrollableWorld, "ScrollableWorld", -1, g_Actor, [], 0, 3, 0, ["$act", function() { ScrollableWorld_act(this); }, "$runActors", function() { ScrollableWorld_runActors(this); }, "$updateChunk", function(var_1) { ScrollableWorld_updateChunk(this, var_1); }, "$renderActors", function() { ScrollableWorld_renderActors(this); }, "$handleMovement", function() { ScrollableWorld_handleMovement(this); }, "$handleZoom", function() { ScrollableWorld_handleZoom(this); }, "$reorderObjects", function() { ScrollableWorld_reorderObjects(this);
}, "$getCameraX", function() { return ScrollableWorld_getCameraX(this); }, "$getCameraY", function() { return ScrollableWorld_getCameraY(this); }, "$getZoom", function() { return ScrollableWorld_getZoom(this); }, "$setZoom", function(var_1) { ScrollableWorld_setZoom(this, var_1); }, "$getWidth", function() { return ScrollableWorld_getWidth(this); }, "$getHeight", function() { return ScrollableWorld_getHeight(this); }, "$addObject1", function(var_1, var_2, var_3) { ScrollableWorld_addObject(this, var_1, var_2,
var_3); }, "$removeObject0", function(var_1) { ScrollableWorld_removeObject(this, var_1); }, "$updateQueue", function() { ScrollableWorld_updateQueue(this); }, "$addToMap", function(var_1) { ScrollableWorld_addToMap(this, var_1); }, "$removeFromMap", function(var_1) { ScrollableWorld_removeFromMap(this, var_1); }, "$getObjectsOfType", function(var_1) { return ScrollableWorld_getObjectsOfType(this, var_1); }, "$setCameraTarget", function(var_1) { ScrollableWorld_setCameraTarget(this, var_1); }, "$setCameraTarget0",
function(var_1, var_2, var_3) { ScrollableWorld_setCameraTarget0(this, var_1, var_2, var_3); }, "$disableCamera", function(var_1) { ScrollableWorld_disableCamera(this, var_1); }, "$demonstrate", function() { ScrollableWorld_demonstrate(this); }],
ju_LinkedList$SequentialListIterator, 0, jl_Object, [ju_ListIterator], 0, 0, 0, ["$hasNext", function() { return ju_LinkedList$SequentialListIterator_hasNext(this); }, "$next", function() { return ju_LinkedList$SequentialListIterator_next(this); }, "$remove0", function() { ju_LinkedList$SequentialListIterator_remove(this); }, "$hasPrevious", function() { return ju_LinkedList$SequentialListIterator_hasPrevious(this); }, "$add3", function(var_1) { ju_LinkedList$SequentialListIterator_add(this, var_1); }, "$checkConcurrentModification",
function() { ju_LinkedList$SequentialListIterator_checkConcurrentModification(this); }],
gj_KeyboardManager, 0, jl_Object, [otjde_EventListener], 0, 3, 0, ["$addAllKeys", function() { gj_KeyboardManager_addAllKeys(this); }, "$addKey", function(var_1, var_2, var_3, var_4) { gj_KeyboardManager_addKey(this, var_1, var_2, var_3, var_4); }, "$buildKeyNameArray", function() { gj_KeyboardManager_buildKeyNameArray(this); }, "$handleEvent2", function(var_1) { gj_KeyboardManager_handleEvent(this, var_1); }, "$checkKeyArrays", function(var_1) { gj_KeyboardManager_checkKeyArrays(this, var_1); }, "$isKeyDown",
function(var_1) { return gj_KeyboardManager_isKeyDown(this, var_1); }, "$isKeyDown0", function(var_1) { return gj_KeyboardManager_isKeyDown0(this, var_1); }, "$getKey", function() { return gj_KeyboardManager_getKey(this); }, "$clearLatches", function() { gj_KeyboardManager_clearLatches(this); }, "$handleEvent0", function(var_1) { gj_KeyboardManager_handleEvent0(this, var_1); }, "$handleEvent$exported$0", function(var_1) { return gj_KeyboardManager_handleEvent$exported$0(this, var_1); }],
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, jl_String_$callClinit, ["$charAt", function(var_1) { return jl_String_charAt(this, var_1); }, "$length", function() { return jl_String_length(this); }, "$isEmpty", function() { return jl_String_isEmpty(this); }, "$startsWith0", function(var_1, var_2) { return jl_String_startsWith(this, var_1, var_2); }, "$startsWith", function(var_1) { return jl_String_startsWith0(this, var_1); }, "$endsWith", function(var_1) { return jl_String_endsWith(this,
var_1); }, "$indexOf", function(var_1, var_2) { return jl_String_indexOf(this, var_1, var_2); }, "$indexOf0", function(var_1) { return jl_String_indexOf0(this, var_1); }, "$indexOf2", function(var_1, var_2) { return jl_String_indexOf1(this, var_1, var_2); }, "$indexOf3", function(var_1) { return jl_String_indexOf2(this, var_1); }, "$substring", function(var_1, var_2) { return jl_String_substring(this, var_1, var_2); }, "$substring0", function(var_1) { return jl_String_substring0(this, var_1); }, "$trim", function()
{ return jl_String_trim(this); }, "$toString", function() { return jl_String_toString(this); }, "$toCharArray", function() { return jl_String_toCharArray(this); }, "$equals", function(var_1) { return jl_String_equals(this, var_1); }, "$hashCode", function() { return jl_String_hashCode(this); }, "$toLowerCase0", function() { return jl_String_toLowerCase(this); }],
gp_SimulationDelegate, 0, jl_Object, [], 3, 3, 0, 0,
gj_Client$2, 0, jl_Object, [gp_SimulationDelegate], 0, 0, 0, ["$setSpeed", function(var_1) { gj_Client$2_setSpeed(this, var_1); }],
gj_Client$1, 0, otc_ResourceSource, [], 0, 0, 0, 0,
gj_Client$4, 0, jl_Object, [jn_URLStreamHandlerFactory], 0, 0, 0, 0,
ge_SimulationListener, 0, jl_Object, [], 3, 3, 0, 0,
gj_Client$3, 0, jl_Object, [ge_SimulationListener], 0, 0, 0, ["$simulationChanged", function(var_1) { gj_Client$3_simulationChanged(this, var_1); }],
jl_NegativeArraySizeException, "NegativeArraySizeException", 5, jl_RuntimeException, [], 0, 3, 0, 0,
g_TreeActorSet$TasIterator, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$next4", function() { return g_TreeActorSet$TasIterator_next(this); }, "$hasNext", function() { return g_TreeActorSet$TasIterator_hasNext(this); }, "$next", function() { return g_TreeActorSet$TasIterator_next0(this); }],
jnci_BufferedEncoder, 0, jnc_CharsetEncoder, [], 1, 3, 0, ["$encodeLoop", function(var_1, var_2) { return jnci_BufferedEncoder_encodeLoop(this, var_1, var_2); }],
jnci_UTF8Encoder, 0, jnci_BufferedEncoder, [], 0, 3, 0, ["$arrayEncode", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { return jnci_UTF8Encoder_arrayEncode(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }],
ju_Hashtable, 0, ju_Dictionary, [ju_Map, jl_Cloneable, ji_Serializable], 0, 3, ju_Hashtable_$callClinit, ["$newElementArray", function(var_1) { return ju_Hashtable_newElementArray(this, var_1); }, "$computeMaxSize", function() { ju_Hashtable_computeMaxSize(this); }, "$get", function(var_1) { return ju_Hashtable_get(this, var_1); }, "$put", function(var_1, var_2) { return ju_Hashtable_put(this, var_1, var_2); }, "$rehash", function() { ju_Hashtable_rehash(this); }],
ju_Properties, 0, ju_Hashtable, [], 0, 3, 0, ["$getProperty", function(var_1) { return ju_Properties_getProperty(this, var_1); }, "$load0", function(var_1) { ju_Properties_load(this, var_1); }],
ju_Collections$_clinit_$lambda$_61_1, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0]);
$rt_metadata([ju_Collections$_clinit_$lambda$_61_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0,
jl_NumberFormatException, "NumberFormatException", 5, jl_IllegalArgumentException, [], 0, 3, 0, 0,
Screen, "Screen", -1, UI, [], 1, 3, 0, 0,
EndScreen, "EndScreen", -1, Screen, [], 0, 3, 0, ["$addedToWorld0", function(var_1) { EndScreen_addedToWorld(this, var_1); }],
gc_NeighbourCollisionQuery, 0, jl_Object, [gc_CollisionQuery], 0, 3, 0, 0,
gc_WorldHandler, 0, jl_Object, [ge_SimulationListener, ggim_WorldLocator], 0, 3, 0, ["$enableMouseListening", function() { gc_WorldHandler_enableMouseListening(this); }, "$disableMouseListening", function() { gc_WorldHandler_disableMouseListening(this); }, "$getKeyboardManager", function() { return gc_WorldHandler_getKeyboardManager(this); }, "$getMouseManager", function() { return gc_WorldHandler_getMouseManager(this); }, "$setInitialisingWorld", function(var_1) { gc_WorldHandler_setInitialisingWorld(this,
var_1); }, "$objectAddedToWorld", function(var_1) { gc_WorldHandler_objectAddedToWorld(this, var_1); }, "$doRepaint", function() { gc_WorldHandler_doRepaint(this); }, "$getWorld", function() { return gc_WorldHandler_getWorld(this); }, "$setWorld", function(var_1) { gc_WorldHandler_setWorld(this, var_1); }, "$repaint", function() { gc_WorldHandler_repaint(this); }, "$paintObjects", function(var_1) { gc_WorldHandler_paintObjects(this, var_1); }, "$paintWorldText", function(var_1, var_2) { gc_WorldHandler_paintWorldText(this,
var_1, var_2); }, "$addWorldListener", function(var_1) { gc_WorldHandler_addWorldListener(this, var_1); }, "$simulationChanged", function(var_1) { gc_WorldHandler_simulationChanged(this, var_1); }, "$hasWorld", function() { return gc_WorldHandler_hasWorld(this); }, "$discardWorld", function() { gc_WorldHandler_discardWorld(this); }, "$getTopMostActorAt", function(var_1, var_2) { return gc_WorldHandler_getTopMostActorAt(this, var_1, var_2); }, "$getTranslatedX", function(var_1) { return gc_WorldHandler_getTranslatedX(this,
var_1); }, "$getTranslatedY", function(var_1) { return gc_WorldHandler_getTranslatedY(this, var_1); }],
jnci_UTF8Charset, 0, jnc_Charset, [], 0, 3, 0, ["$newEncoder", function() { return jnci_UTF8Charset_newEncoder(this); }],
jl_ClassNotFoundException, "ClassNotFoundException", 5, jl_ReflectiveOperationException, [], 0, 3, 0, 0,
gj_MouseManager$1$handleEvent$lambda$_1_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, ["$run", function() { gj_MouseManager$1$handleEvent$lambda$_1_0_run(this); }],
jl_IllegalStateException, "IllegalStateException", 5, jl_Exception, [], 0, 3, 0, 0,
ge_WorldEvent, 0, jl_Object, [], 0, 3, 0, 0,
jn_URL, 0, jl_Object, [ji_Serializable], 4, 3, jn_URL_$callClinit, 0,
g_Font, 0, jl_Object, [], 0, 3, 0, ["$getName", function() { return g_Font_getName(this); }, "$getSize", function() { return g_Font_getSize(this); }],
jl_NullPointerException, "NullPointerException", 5, jl_RuntimeException, [], 0, 3, 0, 0,
otpp_AsyncCallbackWrapper, 0, jl_Object, [oti_AsyncCallback], 0, 0, 0, ["$complete", function(var_1) { otpp_AsyncCallbackWrapper_complete(this, var_1); }, "$error", function(var_1) { otpp_AsyncCallbackWrapper_error(this, var_1); }],
jl_Object$Monitor, 0, jl_Object, [], 0, 0, 0, 0,
TitleDisplay, "TitleDisplay", -1, Text, [], 0, 3, 0, ["$act", function() { TitleDisplay_act(this); }],
jl_Math, 0, jl_Object, [], 4, 3, 0, 0,
Sort, 0, jl_Object, [], 0, 3, 0, 0,
ju_HashMap$HashMapEntrySet, 0, ju_AbstractSet, [], 0, 0, 0, ["$iterator", function() { return ju_HashMap$HashMapEntrySet_iterator(this); }],
PlayButton, "PlayButton", -1, Button, [], 0, 3, 0, ["$setCooldown", function(var_1) { PlayButton_setCooldown(this, var_1); }, "$addedToWorld0", function(var_1) { PlayButton_addedToWorld(this, var_1); }, "$disconnect", function() { PlayButton_disconnect(this); }, "$readyButton", function() { PlayButton_readyButton(this); }, "$act", function() { PlayButton_act(this); }],
g_ActorSet, 0, ju_AbstractSet, [], 0, 3, 0, ["$add1", function(var_1) { return g_ActorSet_add(this, var_1); }, "$resizeHashmap", function() { g_ActorSet_resizeHashmap(this); }, "$contains1", function(var_1) { return g_ActorSet_contains(this, var_1); }, "$contains0", function(var_1) { return g_ActorSet_contains0(this, var_1); }, "$getActorNode", function(var_1) { return g_ActorSet_getActorNode(this, var_1); }, "$remove", function(var_1) { return g_ActorSet_remove(this, var_1); }, "$remove5", function(var_1) {
g_ActorSet_remove0(this, var_1); }, "$size", function() { return g_ActorSet_size(this); }, "$iterator", function() { return g_ActorSet_iterator(this); }, "$add0", function(var_1) { return g_ActorSet_add0(this, var_1); }],
g_WorldVisitor, 0, jl_Object, [], 0, 3, 0, 0,
gj_MouseManager$1, 0, jl_Object, [otjde_EventListener], 0, 0, 0, ["$handleEvent1", function(var_1) { gj_MouseManager$1_handleEvent(this, var_1); }, "$handleEvent0", function(var_1) { gj_MouseManager$1_handleEvent0(this, var_1); }, "$lambda$handleEvent$01", function(var_1, var_2) { gj_MouseManager$1_lambda$handleEvent$0(this, var_1, var_2); }, "$handleEvent$exported$0", function(var_1) { return gj_MouseManager$1_handleEvent$exported$0(this, var_1); }],
Player, "Player", -1, Living, [], 0, 3, 0, ["$addBuildings", function(var_1) { Player_addBuildings(this, var_1); }, "$addedToWorld0", function(var_1) { Player_addedToWorld(this, var_1); }, "$removeBackgrounds", function() { Player_removeBackgrounds(this); }, "$addedToWorld", function(var_1) { Player_addedToWorld0(this, var_1); }, "$resetImage", function() { return Player_resetImage(this); }, "$run", function() { Player_run(this); }, "$isDead", function() { return Player_isDead(this); }, "$timeMove", function(var_1)
{ return Player_timeMove(this, var_1); }, "$reset0", function() { Player_reset(this); }, "$setTotalDistance", function(var_1) { Player_setTotalDistance(this, var_1); }, "$getSpeed", function() { return Player_getSpeed(this); }, "$getCurrentSpeed", function() { return Player_getCurrentSpeed(this); }, "$getGravity", function() { return Player_getGravity(this); }, "$getJumpSpeed", function() { return Player_getJumpSpeed(this); }, "$getPrevTime", function() { return Player_getPrevTime(this); }, "$getTime", function()
{ return Player_getTime(this); }, "$isGrounded", function() { return Player_isGrounded(this); }],
LoadingScreen, "LoadingScreen", -1, Screen, [], 0, 3, 0, 0,
City, "City", -1, ScrollableWorld, [], 0, 3, 0, ["$toggleHighlights", function() { City_toggleHighlights(this); }, "$highlightsEnabled", function() { return City_highlightsEnabled(this); }, "$getDifficulty", function() { return City_getDifficulty(this); }, "$setDifficulty", function(var_1) { City_setDifficulty(this, var_1); }, "$getTrack", function() { return City_getTrack(this); }, "$run", function() { City_run(this); }, "$startGame", function() { City_startGame(this); }, "$startRunning", function(var_1) {
City_startRunning(this, var_1); }, "$restart", function() { City_restart(this); }, "$generateBuildings", function() { City_generateBuildings(this); }, "$generateEnemies", function() { City_generateEnemies(this); }, "$getBuildingLength", function(var_1) { return City_getBuildingLength(this, var_1); }, "$getKinematicTime", function(var_1, var_2, var_3) { return City_getKinematicTime(this, var_1, var_2, var_3); }, "$stopGame", function() { City_stopGame(this); }, "$getPercentageFinished", function() { return City_getPercentageFinished(this);
}],
Chunk, 0, jl_Object, [], 0, 3, 0, ["$add", function(var_1) { Chunk_add(this, var_1); }, "$remove4", function(var_1) { Chunk_remove(this, var_1); }, "$getScrollableActors", function() { return Chunk_getScrollableActors(this); }],
gj_JsActorDelegate, 0, jl_Object, [gp_ActorDelegate], 0, 3, 0, ["$getImage0", function(var_1) { return gj_JsActorDelegate_getImage(this, var_1); }],
jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, ["$run", function() { jl_Object$NotifyListenerImpl$onTimer$lambda$_2_0_run(this); }],
g_TreeActorSet, 0, ju_AbstractSet, [], 0, 3, 0, ["$setClassOrder", function(var_1, var_2) { g_TreeActorSet_setClassOrder(this, var_1, var_2); }, "$iterator", function() { return g_TreeActorSet_iterator(this); }, "$size", function() { return g_TreeActorSet_size(this); }, "$add1", function(var_1) { return g_TreeActorSet_add(this, var_1); }, "$remove", function(var_1) { return g_TreeActorSet_remove(this, var_1); }, "$setForActor", function(var_1) { return g_TreeActorSet_setForActor(this, var_1); }, "$setForClass",
function(var_1) { return g_TreeActorSet_setForClass(this, var_1); }, "$add0", function(var_1) { return g_TreeActorSet_add0(this, var_1); }],
jl_String$_clinit_$lambda$_81_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0,
PlayerImage, "PlayerImage", -1, Image, [], 0, 3, 0, ["$run", function() { PlayerImage_run(this); }, "$resetImage", function() { return PlayerImage_resetImage(this); }, "$slash0", function() { PlayerImage_slash(this); }],
DifficultyButton, "DifficultyButton", -1, Button, [], 0, 3, 0, ["$act", function() { DifficultyButton_act(this); }],
jn_BufferOverflowException, "BufferOverflowException", 2, jl_RuntimeException, [], 0, 3, 0, 0,
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 0, 3, 0, ["$newElementArray0", function(var_1) { return ju_HashMap_newElementArray(this, var_1); }, "$clear0", function() { ju_HashMap_clear(this); }, "$computeThreshold", function() { ju_HashMap_computeThreshold(this); }, "$containsKey", function(var_1) { return ju_HashMap_containsKey(this, var_1); }, "$entrySet", function() { return ju_HashMap_entrySet(this); }, "$get", function(var_1) { return ju_HashMap_get(this, var_1); }, "$getEntry", function(var_1)
{ return ju_HashMap_getEntry(this, var_1); }, "$findNonNullKeyEntry", function(var_1, var_2, var_3) { return ju_HashMap_findNonNullKeyEntry(this, var_1, var_2, var_3); }, "$findNullKeyEntry", function() { return ju_HashMap_findNullKeyEntry(this); }, "$isEmpty", function() { return ju_HashMap_isEmpty(this); }, "$keySet", function() { return ju_HashMap_keySet(this); }, "$put", function(var_1, var_2) { return ju_HashMap_put(this, var_1, var_2); }, "$putImpl", function(var_1, var_2) { return ju_HashMap_putImpl(this,
var_1, var_2); }, "$createHashedEntry", function(var_1, var_2, var_3) { return ju_HashMap_createHashedEntry(this, var_1, var_2, var_3); }, "$rehash0", function(var_1) { ju_HashMap_rehash(this, var_1); }, "$rehash", function() { ju_HashMap_rehash0(this); }, "$remove6", function(var_1) { return ju_HashMap_remove(this, var_1); }, "$removeEntry0", function(var_1) { return ju_HashMap_removeEntry(this, var_1); }],
g_GreenfootImage$1$handleEvent$lambda$_1_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, ["$run", function() { g_GreenfootImage$1$handleEvent$lambda$_1_0_run(this); }],
jl_Thread$start$lambda$_4_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, ["$run", function() { jl_Thread$start$lambda$_4_0_run(this); }],
otciu_UnicodeHelper$Range, 0, jl_Object, [], 0, 3, 0, 0,
jnc_CoderResult, 0, jl_Object, [], 0, 3, jnc_CoderResult_$callClinit, ["$isUnderflow", function() { return jnc_CoderResult_isUnderflow(this); }, "$isOverflow", function() { return jnc_CoderResult_isOverflow(this); }, "$isError", function() { return jnc_CoderResult_isError(this); }, "$isMalformed", function() { return jnc_CoderResult_isMalformed(this); }, "$isUnmappable", function() { return jnc_CoderResult_isUnmappable(this); }, "$length", function() { return jnc_CoderResult_length(this); }],
g_MouseInfo, 0, jl_Object, [], 0, 3, 0, ["$getX", function() { return g_MouseInfo_getX(this); }, "$getY", function() { return g_MouseInfo_getY(this); }, "$getActor", function() { return g_MouseInfo_getActor(this); }, "$getButton", function() { return g_MouseInfo_getButton(this); }, "$setButton", function(var_1) { g_MouseInfo_setButton(this, var_1); }, "$setLoc", function(var_1, var_2) { g_MouseInfo_setLoc(this, var_1, var_2); }, "$setActor", function(var_1) { g_MouseInfo_setActor(this, var_1); }, "$setClickCount",
function(var_1) { g_MouseInfo_setClickCount(this, var_1); }],
otcit_DoubleAnalyzer, 0, jl_Object, [], 4, 3, otcit_DoubleAnalyzer_$callClinit, 0,
jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0,
gj_Client, 0, jl_Object, [], 0, 3, gj_Client_$callClinit, ["$doReset", function() { gj_Client_doReset(this); }, "$setupURLFactory", function() { gj_Client_setupURLFactory(this); }, "$lambda$new$4", function(var_1) { gj_Client_lambda$new$4(this, var_1); }, "$lambda$new$1", function(var_1) { gj_Client_lambda$new$1(this, var_1); }, "$lambda$new$0", function() { gj_Client_lambda$new$0(this); }],
otci_CharFlow, 0, jl_Object, [], 0, 3, 0, 0,
gc_TextLabel, 0, jl_Object, [], 0, 3, 0, 0,
gj_MouseManager$handleEvent$lambda$_10_0, 0, jl_Object, [jl_Runnable], 0, 3, 0, ["$run", function() { gj_MouseManager$handleEvent$lambda$_10_0_run(this); }],
jn_BufferUnderflowException, "BufferUnderflowException", 2, jl_RuntimeException, [], 0, 3, 0, 0,
jl_ConsoleOutputStreamStderr, 0, ji_OutputStream, [], 0, 0, 0, ["$write", function(var_1) { jl_ConsoleOutputStreamStderr_write(this, var_1); }],
otcit_FloatAnalyzer$Result, 0, jl_Object, [], 0, 3, 0, 0]);
$rt_metadata([jl_InterruptedException, "InterruptedException", 5, jl_Exception, [], 0, 3, 0, 0,
ju_HashMap$EntryIterator, 0, ju_HashMap$AbstractMapIterator, [ju_Iterator], 0, 0, 0, ["$next6", function() { return ju_HashMap$EntryIterator_next(this); }, "$next", function() { return ju_HashMap$EntryIterator_next0(this); }],
ju_Collections, 0, jl_Object, [], 0, 3, ju_Collections_$callClinit, 0,
Track, 0, jl_Object, [], 0, 3, 0, ["$initialize", function(var_1, var_2, var_3) { Track_initialize(this, var_1, var_2, var_3); }, "$addBar", function(var_1, var_2, var_3) { Track_addBar(this, var_1, var_2, var_3); }, "$addNote", function(var_1, var_2, var_3, var_4) { Track_addNote(this, var_1, var_2, var_3, var_4); }, "$getBars", function() { return Track_getBars(this); }, "$getNotes", function() { return Track_getNotes(this); }, "$getAverageNoteConfidence", function() { return Track_getAverageNoteConfidence(this);
}],
gci_BSPNode, 0, jl_Object, [], 4, 3, 0, ["$setChild", function(var_1, var_2) { gci_BSPNode_setChild(this, var_1, var_2); }, "$setArea", function(var_1) { gci_BSPNode_setArea(this, var_1); }, "$setSplitAxis", function(var_1) { gci_BSPNode_setSplitAxis(this, var_1); }, "$setSplitPos", function(var_1) { gci_BSPNode_setSplitPos(this, var_1); }, "$getLeftArea", function() { return gci_BSPNode_getLeftArea(this); }, "$getRightArea", function() { return gci_BSPNode_getRightArea(this); }, "$getArea", function() { return gci_BSPNode_getArea(this);
}, "$resizeChildren", function() { gci_BSPNode_resizeChildren(this); }, "$getLeft", function() { return gci_BSPNode_getLeft(this); }, "$getRight0", function() { return gci_BSPNode_getRight(this); }, "$getParent", function() { return gci_BSPNode_getParent(this); }, "$setParent", function(var_1) { gci_BSPNode_setParent(this, var_1); }, "$getChildSide", function(var_1) { return gci_BSPNode_getChildSide(this, var_1); }, "$addActor", function(var_1) { gci_BSPNode_addActor(this, var_1); }, "$containsActor", function(var_1)
{ return gci_BSPNode_containsActor(this, var_1); }, "$actorRemoved", function(var_1) { gci_BSPNode_actorRemoved(this, var_1); }, "$isEmpty", function() { return gci_BSPNode_isEmpty(this); }, "$blankNode", function() { gci_BSPNode_blankNode(this); }, "$areaChanged", function() { gci_BSPNode_areaChanged(this); }]]);
function $rt_array(cls, data) {
    this.$monitor = null;
    this.$id$ = 0;
    this.type = cls;
    this.data = data;
    this.constructor = $rt_arraycls(cls);
}
$rt_array.prototype = Object.create(($rt_objcls()).prototype);
$rt_array.prototype.toString = function() {
    var str = "[";
    for (var i = 0;i < this.data.length;++i) {
        if (i > 0) {
            str += ", ";
        }
        str += this.data[i].toString();
    }
    str += "]";
    return str;
};
$rt_setCloneMethod($rt_array.prototype, function() {
    var dataCopy;
    if ('slice' in this.data) {
        dataCopy = this.data.slice();
    } else {
        dataCopy = new this.data.constructor(this.data.length);
        for (var i = 0;i < dataCopy.length;++i) {
            dataCopy[i] = this.data[i];
        }
    }
    return new $rt_array(this.type, dataCopy);
});
$rt_stringPool(["Can\'t enter monitor from another thread synchronously", "@", ": ", "    at ", "Caused by: ", "Greenfoot installation is broken - reinstalling Greenfoot might help.", "Actor not in world. An attempt was made to use the actor\'s location while it is not in the world. Either it has not yet been inserted, or it has been removed.", "http://www.greenfoot.org/images/greenfoot-logo.png", "Stream is closed", "title2.PNG", "Score: ", "String contains invalid digits: ", "String contains digits out of radix ",
"The value is too big for int type: ", "String is null or empty", "Illegal radix: ", "Slash.wav", "Button.wav", "LargeButton.wav", "default.mp3", "main", "background.PNG", "load", "BIG_ENDIAN", "LITTLE_ENDIAN", "null", "Index out of bounds", "Calibri", "New position ", " is outside of range [0;", "]", "audio", "sounds/", "audio/x-wav", "error", "canplay", "runQueuedTasks", " ", "span", "font", "div", "position", "absolute", "overflow", "hidden", "max-width", "0", "min-width", "10em", "display", "inline-block",
"vertical-align", "baseline", "width", "1px", "height", "", "INVALID INPUT", "backspace", "right", "left", "shift", "space", "tab", "control", "v", "enter", "textBox.png", "textBoxInvalid.png", "textBoxValid.png", "_", "clipboard contents here", "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "=", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "\\", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'", "z", "x", "c", "b", "n", "m", ",", ".", "/", "~", "!", "#", "$", "%", "^", "&", "*", "(",
")", "+", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "    ", "Starting adults", "Starting children", "Number of plants", "Number of trees", "Monsters per night", "Replacement preconditions do not hold", "Action must be non-null", "Sound: error trying to load/play", "The last byte in src ", " is outside of array of size ", "Length ", " must be non-negative", "Offset ", "stopButton.png",
"IGNORE", "REPLACE", "REPORT", "replayButton.png", "canvas", "2d", "rgba(", "Filename must not be null.", "img", "http://", "https://", "images/", "src", "Sans", "The transparency value has to be in the range 0 to 255. It was: ", "px ", "px", "highlightEnabler2.PNG", "highlightEnabler1.PNG", "HHHHH!", "click", "mousedown", "mouseup", "mousedrag", "mousemove", "touchstart", "touchend", "touchmove", "touchcancel", "dblclick", "mouseenter", "mouseleave", "Either src or dest is null", "idle", ".png", "death", "death1a.png",
"death1b.png", "death1c.png", "The last char in dst ", "buildingPart", ".PNG", "buildingPart9.PNG", "buildingPart3.PNG", "instruction2.PNG", "instruction1.PNG", "keydown", "keyup", "keypress", "slope", "up", "down", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "Enter", "Escape", "escape", "F1", "f1", "F2", "f2", "F3", "f3", "F4", "f4", "F5", "f5", "F6", "f6", "F7", "f7", "F8", "f8", "F9", "f9", "F10", "f10", "F11", "f11", "F12", "f12", "Backspace", "Shift", "Control", "Left", "Up", "Right", "Down", "Spacebar",
"Invalid Unicode sequence: expected format \\uxxxx", "Invalid Unicode sequence: illegal character", "deathScreen.png", "winScreen.png", "contextmenu", "bold 25px sans-serif", "bold ", "px sans-serif", "UTF-8", "displayTitle1.PNG", "displayTitle", "playButtonNotReady.png", "playButtonReady.png", "playButtonReadyPressed.png", "bars: [ { start: 0.48074, duration: 1.79469, confidence: 0.423 }, { start: 2.27544, duration: 1.79459, confidence: 0.386 }, { start: 4.07002, duration: 1.80019, confidence: 0.861 }, { start: 5.87021, duration: 1.7974, confidence: 0.352 }, { start: 7.66762, duration: 1.7777, confidence: 0.524 }, { start: 9.44531, duration: 1.78826, confidence: 0.171 }, { start: 11.23357, duration: 1.79368, confidence: 0.78 }, { start: 13.02725, duration: 1.78782, confidence: 0.452 }, { start: 14.81507, duration: 1.79273, con"
+ "fidence: 0.777 }, { start: 16.60781, duration: 1.79412, confidence: 0.335 }, { start: 18.40193, duration: 1.78241, confidence: 0.639 }, { start: 20.18435, duration: 1.79451, confidence: 0.189 }, { start: 21.97886, duration: 1.79435, confidence: 0.49 }, { start: 23.7732, duration: 1.78756, confidence: 0.33 }, { start: 25.56076, duration: 1.79778, confidence: 0.885 }, { start: 27.35855, duration: 1.85428, confidence: 0.186 }, { start: 29.21283, duration: 1.82817, confidence: 0.018 }, { start: 31.041, duration"
+ ": 1.73179, confidence: 0.212 }, { start: 32.77279, duration: 1.74278, confidence: 0.79 }, { start: 34.51557, duration: 1.79273, confidence: 0.354 }, { start: 36.3083, duration: 1.80256, confidence: 0.443 }, { start: 38.11086, duration: 1.84587, confidence: 0.075 }, { start: 39.95673, duration: 1.77829, confidence: 0.239 }, { start: 41.73502, duration: 1.70395, confidence: 0.477 }, { start: 43.43897, duration: 1.67456, confidence: 0.656 }, { start: 45.11352, duration: 1.73343, confidence: 0.236 }, { start: 4"
+ "6.84695, duration: 1.78251, confidence: 0.132 }, { start: 48.62946, duration: 1.75993, confidence: 0.403 }, { start: 50.38939, duration: 1.80081, confidence: 0.364 }, { start: 52.1902, duration: 1.808, confidence: 0.463 }, { start: 53.9982, duration: 1.80494, confidence: 0.792 }, { start: 55.80314, duration: 1.79397, confidence: 0.311 }, { start: 57.5971, duration: 1.79108, confidence: 0.481 }, { start: 59.38818, duration: 1.79616, confidence: 0.616 }, { start: 61.18434, duration: 1.79218, confidence: 0.606"
+ " }, { start: 62.97652, duration: 1.79762, confidence: 0.702 }, { start: 64.77415, duration: 1.7718, confidence: 0.656 }, { start: 66.54595, duration: 1.78073, confidence: 0.649 }, { start: 68.32668, duration: 1.80391, confidence: 0.526 }, { start: 70.13059, duration: 1.82369, confidence: 0.57 }, { start: 71.95428, duration: 1.79339, confidence: 0.434 }, { start: 73.74767, duration: 1.78605, confidence: 0.366 }, { start: 75.53372, duration: 1.85048, confidence: 0.711 }, { start: 77.3842, duration: 1.83274, c"
+ "onfidence: 0.098 }, { start: 79.21694, duration: 1.80575, confidence: 0.383 }, { start: 81.02268, duration: 1.80301, confidence: 0.523 }, { start: 82.82569, duration: 1.81098, confidence: 0.674 }, { start: 84.63667, duration: 1.84302, confidence: 0.624 }, { start: 86.47969, duration: 1.80373, confidence: 0.31 }, { start: 88.28342, duration: 1.78219, confidence: 0.283 }, { start: 90.06561, duration: 1.78173, confidence: 0.483 }, { start: 91.84734, duration: 1.80251, confidence: 0.37 }, { start: 93.64986, dur"
+ "ation: 1.79088, confidence: 0.564 }, { start: 95.44074, duration: 1.82041, confidence: 0.173 }, { start: 97.26115, duration: 1.77287, confidence: 0.703 }, { start: 99.03401, duration: 1.77305, confidence: 0.593 }, { start: 100.80706, duration: 1.79429, confidence: 0.42 }, { start: 102.60135, duration: 1.7993, confidence: 0.392 }, { start: 104.40065, duration: 1.78983, confidence: 0.524 }, { start: 106.19048, duration: 1.79527, confidence: 0.297 }, { start: 107.98575, duration: 1.77958, confidence: 0.883 }, "
+ "{ start: 109.76533, duration: 1.79463, confidence: 0.483 }, { start: 111.55996, duration: 1.33754, confidence: 0.377 }, { start: 112.8975, duration: 1.78577, confidence: 0.927 }, { start: 114.68326, duration: 1.8039, confidence: 0.315 }, { start: 116.48717, duration: 1.79207, confidence: 0.421 }, { start: 118.27924, duration: 1.80444, confidence: 0.684 }, { start: 120.08368, duration: 1.76627, confidence: 0.219 }, { start: 121.84995, duration: 1.78389, confidence: 0.713 }, { start: 123.63385, duration: 1.87"
+ "168, confidence: 0.538 }, { start: 125.50553, duration: 1.91302, confidence: 0.749 }, { start: 127.41855, duration: 1.85361, confidence: 0.366 }, { start: 129.27216, duration: 1.78013, confidence: 0.164 }, { start: 131.05228, duration: 1.78956, confidence: 0.314 }, { start: 132.84184, duration: 1.82281, confidence: 0.279 }, { start: 134.66466, duration: 1.76833, confidence: 0.438 }, { start: 136.43298, duration: 1.76528, confidence: 0.459 }, { start: 138.19826, duration: 1.83905, confidence: 0.575 }, { star"
+ "t: 140.03731, duration: 1.8328, confidence: 0.324 }, { start: 141.87012, duration: 1.86727, confidence: 0.563 }, { start: 143.73738, duration: 1.83662, confidence: 0.571 }, { start: 145.574, duration: 1.78786, confidence: 0.623 }, { start: 147.36188, duration: 1.76717, confidence: 0.576 }, { start: 149.12904, duration: 1.75721, confidence: 0.128 }, { start: 150.88625, duration: 1.83298, confidence: 0.142 }, { start: 152.71922, duration: 1.78587, confidence: 0.287 }, { start: 154.5051, duration: 1.79767, con"
+ "fidence: 0.447 }, { start: 156.30276, duration: 1.81799, confidence: 0.565 }, { start: 158.12076, duration: 1.79624, confidence: 0.454 }, { start: 159.917, duration: 1.78885, confidence: 0.317 }, { start: 161.70586, duration: 1.78311, confidence: 0.825 }, { start: 163.48895, duration: 1.80275, confidence: 0.233 }, { start: 165.29172, duration: 1.78306, confidence: 0.517 }, { start: 167.07477, duration: 1.78046, confidence: 0.154 }, { start: 168.85522, duration: 1.78614, confidence: 0.676 }, { start: 170.641"
+ "37, duration: 1.79566, confidence: 0.645 }, { start: 172.43703, duration: 1.79792, confidence: 0.313 }, { start: 174.23495, duration: 1.79356, confidence: 0.7 }, { start: 176.0285, duration: 1.79093, confidence: 0.54 }, { start: 177.81943, duration: 1.78478, confidence: 0.325 }, { start: 179.60422, duration: 1.77588, confidence: 0.907 }, { start: 181.3801, duration: 1.34171, confidence: 0.558 }, { start: 182.7218, duration: 1.81159, confidence: 0.701 }, { start: 184.5334, duration: 1.84954, confidence: 0.88"
+ "5 }, { start: 186.38293, duration: 1.81295, confidence: 0.371 }, { start: 188.19589, duration: 1.80628, confidence: 0.429 }, { start: 190.00217, duration: 1.83391, confidence: 0.608 }, { start: 191.83607, duration: 1.83676, confidence: 0.614 }, { start: 193.67284, duration: 1.84379, confidence: 0.468 }, { start: 195.51663, duration: 1.80377, confidence: 0.489 }, { start: 197.3204, duration: 1.76449, confidence: 0.171 }, { start: 199.08488, duration: 1.74502, confidence: 0.531 }, { start: 200.82993, duration"
+ ": 1.71615, confidence: 0.331 }, { start: 202.54607, duration: 1.70428, confidence: 0.397 }, { start: 204.25034, duration: 1.79297, confidence: 0.852 }, { start: 206.04332, duration: 1.77799, confidence: 0.491 }, { start: 207.8213, duration: 1.79569, confidence: 0.098 }, { start: 209.617, duration: 1.87643, confidence: 0.484 }, { start: 211.49342, duration: 1.8411, confidence: 0.716 }, { start: 213.33453, duration: 1.80742, confidence: 0.114 }, { start: 215.14195, duration: 1.79388, confidence: 0.491 }, { st"
+ "art: 216.93584, duration: 1.76899, confidence: 0.438 }, { start: 218.70483, duration: 1.79075, confidence: 0.519 }, { start: 220.49557, duration: 1.79521, confidence: 0.461 }, { start: 222.29079, duration: 1.79383, confidence: 0.781 }, { start: 224.08461, duration: 1.79485, confidence: 0.327 }, { start: 225.87946, duration: 1.78304, confidence: 0.675 }, { start: 227.6625, duration: 1.79572, confidence: 0.609 }, { start: 229.45822, duration: 1.79395, confidence: 0.359 }, { start: 231.25217, duration: 1.79467"
+ ", confidence: 0.234 }, { start: 233.04684, duration: 1.79589, confidence: 0.492 }, { start: 234.84274, duration: 1.82795, confidence: 0.311 }, { start: 236.67068, duration: 1.85141, confidence: 0.287 }, { start: 238.5221, duration: 1.83755, confidence: 0.412 }, { start: 240.35965, duration: 1.88332, confidence: 0.509 }, { start: 242.24297, duration: 1.85706, confidence: 0.567 }, { start: 244.10004, duration: 1.88915, confidence: 0.191 }, { start: 245.98918, duration: 1.8756, confidence: 0.21 }, { start: 247"
+ ".86479, duration: 1.82078, confidence: 0.677 }, { start: 249.68558, duration: 1.82355, confidence: 0.293 }, { start: 251.50912, duration: 1.82097, confidence: 0.489 }, { start: 253.3301, duration: 1.83388, confidence: 0.361 }, { start: 255.16399, duration: 10, confidence: 0 } ],", "beats: [ { start: 0.48074, duration: 0.45336, confidence: 0.875 }, { start: 0.9341, duration: 0.44399, confidence: 0.752 }, { start: 1.37809, duration: 0.44925, confidence: 0.418 }, { start: 1.82735, duration: 0.44809, confidence: 0.284 }, { start: 2.27544, duration: 0.44843, confidence: 0.232 }, { start: 2.72387, duration: 0.44757, confidence: 0.601 }, { start: 3.17143, duration: 0.4491, confidence: 0.529 }, { start: 3.62053, duration: 0.44949, confidence: 0.547 }, { start: 4.07002, duration: 0.44869, conf"
+ "idence: 0.489 }, { start: 4.51871, duration: 0.44827, confidence: 0.801 }, { start: 4.96698, duration: 0.44984, confidence: 0.745 }, { start: 5.41682, duration: 0.45339, confidence: 0.746 }, { start: 5.87021, duration: 0.45376, confidence: 0.592 }, { start: 6.32398, duration: 0.44777, confidence: 0.587 }, { start: 6.77175, duration: 0.44894, confidence: 0.41 }, { start: 7.22069, duration: 0.44692, confidence: 0.252 }, { start: 7.66762, duration: 0.44771, confidence: 0.337 }, { start: 8.11533, duration: 0.44"
+ "571, confidence: 0.732 }, { start: 8.56104, duration: 0.44253, confidence: 0.768 }, { start: 9.00357, duration: 0.44174, confidence: 0.715 }, { start: 9.44531, duration: 0.44494, confidence: 0.637 }, { start: 9.89026, duration: 0.44734, confidence: 0.788 }, { start: 10.3376, duration: 0.44936, confidence: 0.805 }, { start: 10.78696, duration: 0.44661, confidence: 0.676 }, { start: 11.23357, duration: 0.44905, confidence: 0.549 }, { start: 11.68262, duration: 0.4471, confidence: 0.617 }, { start: 12.12972, d"
+ "uration: 0.44754, confidence: 0.448 }, { start: 12.57726, duration: 0.44999, confidence: 0.44 }, { start: 13.02725, duration: 0.44806, confidence: 0.425 }, { start: 13.47531, duration: 0.44533, confidence: 0.638 }, { start: 13.92064, duration: 0.44818, confidence: 0.561 }, { start: 14.36882, duration: 0.44625, confidence: 0.496 }, { start: 14.81507, duration: 0.4483, confidence: 0.348 }, { start: 15.26337, duration: 0.44837, confidence: 0.639 }, { start: 15.71174, duration: 0.44881, confidence: 0.545 }, { s"
+ "tart: 16.16055, duration: 0.44726, confidence: 0.484 }, { start: 16.60781, duration: 0.44929, confidence: 0.381 }, { start: 17.05709, duration: 0.44852, confidence: 0.611 }, { start: 17.50562, duration: 0.44894, confidence: 0.551 }, { start: 17.95456, duration: 0.44737, confidence: 0.498 }, { start: 18.40193, duration: 0.44499, confidence: 0.466 }, { start: 18.84692, duration: 0.4462, confidence: 0.785 }, { start: 19.29312, duration: 0.44701, confidence: 0.745 }, { start: 19.74012, duration: 0.44422, confid"
+ "ence: 0.689 }, { start: 20.18435, duration: 0.44941, confidence: 0.507 }, { start: 20.63376, duration: 0.44782, confidence: 0.508 }, { start: 21.08158, duration: 0.44863, confidence: 0.316 }, { start: 21.53021, duration: 0.44864, confidence: 0.198 }, { start: 21.97886, duration: 0.44866, confidence: 0.317 }, { start: 22.42751, duration: 0.44868, confidence: 0.728 }, { start: 22.87619, duration: 0.45188, confidence: 0.76 }, { start: 23.32807, duration: 0.44513, confidence: 0.739 }, { start: 23.7732, duration"
+ ": 0.44675, confidence: 0.65 }, { start: 24.21995, duration: 0.44678, confidence: 0.8 }, { start: 24.66673, duration: 0.4492, confidence: 0.728 }, { start: 25.11593, duration: 0.44484, confidence: 0.588 }, { start: 25.56076, duration: 0.44807, confidence: 0.433 }, { start: 26.00883, duration: 0.44612, confidence: 0.544 }, { start: 26.45495, duration: 0.44937, confidence: 0.382 }, { start: 26.90432, duration: 0.45422, confidence: 0.385 }, { start: 27.35855, duration: 0.45948, confidence: 0.359 }, { start: 27."
+ "81802, duration: 0.46034, confidence: 0.617 }, { start: 28.27836, duration: 0.4692, confidence: 0.536 }, { start: 28.74756, duration: 0.46527, confidence: 0.187 }, { start: 29.21283, duration: 0.46495, confidence: 0.446 }, { start: 29.67778, duration: 0.46061, confidence: 0.32 }, { start: 30.13839, duration: 0.45508, confidence: 0.358 }, { start: 30.59346, duration: 0.44754, confidence: 0.498 }, { start: 31.041, duration: 0.44119, confidence: 0.469 }, { start: 31.48219, duration: 0.42844, confidence: 0.57 }"
+ ", { start: 31.91064, duration: 0.43047, confidence: 0.467 }, { start: 32.34111, duration: 0.43168, confidence: 0.611 }, { start: 32.77279, duration: 0.43049, confidence: 0.42 }, { start: 33.20328, duration: 0.4341, confidence: 0.728 }, { start: 33.63738, duration: 0.4381, confidence: 0.607 }, { start: 34.07547, duration: 0.4401, confidence: 0.484 }, { start: 34.51557, duration: 0.44649, confidence: 0.347 }, { start: 34.96206, duration: 0.44689, confidence: 0.342 }, { start: 35.40894, duration: 0.44768, conf"
+ "idence: 0.269 }, { start: 35.85663, duration: 0.45167, confidence: 0.262 }, { start: 36.3083, duration: 0.45006, confidence: 0.174 }, { start: 36.75836, duration: 0.44566, confidence: 0.416 }, { start: 37.20402, duration: 0.45043, confidence: 0.557 }, { start: 37.65445, duration: 0.45641, confidence: 0.684 }, { start: 38.11086, duration: 0.46118, confidence: 0.72 }, { start: 38.57204, duration: 0.46317, confidence: 0.839 }, { start: 39.03521, duration: 0.46475, confidence: 0.836 }, { start: 39.49996, durati"
+ "on: 0.45676, confidence: 0.527 }, { start: 39.95673, duration: 0.45436, confidence: 0.3 }, { start: 40.41109, duration: 0.44557, confidence: 0.365 }, { start: 40.85666, duration: 0.44238, confidence: 0.321 }, { start: 41.29904, duration: 0.43598, confidence: 0.274 }, { start: 41.73502, duration: 0.43199, confidence: 0.227 }, { start: 42.16701, duration: 0.4244, confidence: 0.589 }, { start: 42.5914, duration: 0.42439, confidence: 0.712 }, { start: 43.01579, duration: 0.42318, confidence: 0.662 }, { start: 4"
+ "3.43897, duration: 0.42476, confidence: 0.517 }, { start: 43.86372, duration: 0.42074, confidence: 0.325 }, { start: 44.28447, duration: 0.41633, confidence: 0.298 }, { start: 44.7008, duration: 0.41272, confidence: 0.365 }, { start: 45.11352, duration: 0.41989, confidence: 0.423 }, { start: 45.53342, duration: 0.43266, confidence: 0.311 }, { start: 45.96608, duration: 0.43665, confidence: 0.467 }, { start: 46.40273, duration: 0.44423, confidence: 0.471 }, { start: 46.84695, duration: 0.44023, confidence: 0"
+ ".387 }, { start: 47.28718, duration: 0.44303, confidence: 0.682 }, { start: 47.73021, duration: 0.44982, confidence: 0.656 }, { start: 48.18003, duration: 0.44943, confidence: 0.6 }, { start: 48.62946, duration: 0.43667, confidence: 0.538 }, { start: 49.06613, duration: 0.43867, confidence: 0.352 }, { start: 49.5048, duration: 0.43949, confidence: 0.339 }, { start: 49.94429, duration: 0.4451, confidence: 0.277 }, { start: 50.38939, duration: 0.4499, confidence: 0.44 }, { start: 50.83929, duration: 0.44951, "
+ "confidence: 0.445 }, { start: 51.2888, duration: 0.44751, confidence: 0.421 }, { start: 51.73631, duration: 0.45389, confidence: 0.303 }, { start: 52.1902, duration: 0.4531, confidence: 0.459 }, { start: 52.6433, duration: 0.45509, confidence: 0.465 }, { start: 53.09839, duration: 0.4515, confidence: 0.724 }, { start: 53.54989, duration: 0.44831, confidence: 0.592 }, { start: 53.9982, duration: 0.45031, confidence: 0.437 }, { start: 54.44851, duration: 0.45472, confidence: 0.352 }, { start: 54.90324, durati"
+ "on: 0.44995, confidence: 0.336 }, { start: 55.35318, duration: 0.44996, confidence: 0.276 }, { start: 55.80314, duration: 0.44717, confidence: 0.179 }, { start: 56.25031, duration: 0.45158, confidence: 0.48 }, { start: 56.70189, duration: 0.45119, confidence: 0.602 }, { start: 57.15309, duration: 0.44402, confidence: 0.626 }, { start: 57.5971, duration: 0.44324, confidence: 0.689 }, { start: 58.04034, duration: 0.45044, confidence: 0.746 }, { start: 58.49078, duration: 0.44848, confidence: 0.661 }, { start:"
+ " 58.93926, duration: 0.44892, confidence: 0.473 }, { start: 59.38818, duration: 0.44817, confidence: 0.509 }, { start: 59.83635, duration: 0.44981, confidence: 0.391 }, { start: 60.28616, duration: 0.45067, confidence: 0.296 }, { start: 60.73683, duration: 0.44751, confidence: 0.517 }, { start: 61.18434, duration: 0.44438, confidence: 0.508 }, { start: 61.62872, duration: 0.44882, confidence: 0.714 }, { start: 62.07754, duration: 0.44647, confidence: 0.719 }, { start: 62.52401, duration: 0.45251, confidence"
+ ": 0.559 }, { start: 62.97652, duration: 0.45215, confidence: 0.638 }, { start: 63.42867, duration: 0.45099, confidence: 0.581 }, { start: 63.87966, duration: 0.44742, confidence: 0.452 }, { start: 64.32709, duration: 0.44706, confidence: 0.45 }, { start: 64.77415, duration: 0.4503, confidence: 0.475 }, { start: 65.22444, duration: 0.44314, confidence: 0.48 }, { start: 65.66758, duration: 0.43757, confidence: 0.426 }, { start: 66.10515, duration: 0.4408, confidence: 0.365 }, { start: 66.54595, duration: 0.44"
+ "524, confidence: 0.428 }, { start: 66.99118, duration: 0.44687, confidence: 0.451 }, { start: 67.43806, duration: 0.4473, confidence: 0.443 }, { start: 67.88536, duration: 0.44133, confidence: 0.511 }, { start: 68.32668, duration: 0.45175, confidence: 0.548 }, { start: 68.77843, duration: 0.45297, confidence: 0.557 }, { start: 69.2314, duration: 0.44859, confidence: 0.647 }, { start: 69.67999, duration: 0.4506, confidence: 0.49 }, { start: 70.13059, duration: 0.45228, confidence: 0.716 }, { start: 70.58287,"
+ " duration: 0.45756, confidence: 0.645 }, { start: 71.04043, duration: 0.45924, confidence: 0.469 }, { start: 71.49967, duration: 0.45461, confidence: 0.555 }, { start: 71.95428, duration: 0.45158, confidence: 0.669 }, { start: 72.40586, duration: 0.4486, confidence: 0.657 }, { start: 72.85445, duration: 0.44603, confidence: 0.503 }, { start: 73.30049, duration: 0.44718, confidence: 0.521 }, { start: 73.74767, duration: 0.4415, confidence: 0.388 }, { start: 74.18917, duration: 0.44531, confidence: 0.467 }, {"
+ " start: 74.63447, duration: 0.44778, confidence: 0.242 }, { start: 75.08225, duration: 0.45147, confidence: 0.608 }, { start: 75.53372, duration: 0.46195, confidence: 0.489 }, { start: 75.99567, duration: 0.45589, confidence: 0.568 }, { start: 76.45155, duration: 0.46217, confidence: 0.492 }, { start: 76.91373, duration: 0.47047, confidence: 0.352 }, { start: 77.3842, duration: 0.46244, confidence: 0.476 }, { start: 77.84663, duration: 0.45925, confidence: 0.528 }, { start: 78.30588, duration: 0.45879, conf"
+ "idence: 0.235 }, { start: 78.76467, duration: 0.45226, confidence: 0.353 }, { start: 79.21694, duration: 0.45212, confidence: 0.466 }, { start: 79.66906, duration: 0.44757, confidence: 0.498 }, { start: 80.11663, duration: 0.44772, confidence: 0.625 }, { start: 80.56435, duration: 0.45834, confidence: 0.357 }, { start: 81.02268, duration: 0.4547, confidence: 0.338 }, { start: 81.47739, duration: 0.44739, confidence: 0.517 }, { start: 81.92478, duration: 0.44743, confidence: 0.413 }, { start: 82.37221, durat"
+ "ion: 0.45348, confidence: 0.556 }, { start: 82.82569, duration: 0.45387, confidence: 0.191 }, { start: 83.27956, duration: 0.4548, confidence: 0.325 }, { start: 83.73436, duration: 0.44835, confidence: 0.152 }, { start: 84.18271, duration: 0.45397, confidence: 0.142 }, { start: 84.63667, duration: 0.46218, confidence: 0.153 }, { start: 85.09886, duration: 0.46008, confidence: 0.488 }, { start: 85.55894, duration: 0.46137, confidence: 0.277 }, { start: 86.0203, duration: 0.45939, confidence: 0.514 }, { start"
+ ": 86.47969, duration: 0.45384, confidence: 0.626 }, { start: 86.93353, duration: 0.44996, confidence: 0.591 }, { start: 87.38349, duration: 0.4516, confidence: 0.562 }, { start: 87.83509, duration: 0.44833, confidence: 0.611 }, { start: 88.28342, duration: 0.44995, confidence: 0.619 }, { start: 88.73338, duration: 0.44504, confidence: 0.454 }, { start: 89.17841, duration: 0.44464, confidence: 0.359 }, { start: 89.62305, duration: 0.44256, confidence: 0.565 }, { start: 90.06561, duration: 0.44702, confidence"
+ ": 0.559 }, { start: 90.51264, duration: 0.44397, confidence: 0.63 }, { start: 90.9566, duration: 0.44377, confidence: 0.473 }, { start: 91.40038, duration: 0.44697, confidence: 0.331 }, { start: 91.84734, duration: 0.4522, confidence: 0.445 }, { start: 92.29955, duration: 0.45414, confidence: 0.552 }, { start: 92.75369, duration: 0.45159, confidence: 0.464 }, { start: 93.20528, duration: 0.44457, confidence: 0.575 }, { start: 93.64986, duration: 0.44542, confidence: 0.593 }, { start: 94.09528, duration: 0.4"
+ "4709, confidence: 0.408 }, { start: 94.54237, duration: 0.44794, confidence: 0.218 }, { start: 94.99031, duration: 0.45042, confidence: 0.112 }, { start: 95.44074, duration: 0.45214, confidence: 0.194 }, { start: 95.89288, duration: 0.45549, confidence: 0.395 }, { start: 96.34837, duration: 0.45881, confidence: 0.345 }, { start: 96.80719, duration: 0.45396, confidence: 0.351 }, { start: 97.26115, duration: 0.44836, confidence: 0.201 }, { start: 97.70951, duration: 0.44359, confidence: 0.258 }, { start: 98.1"
+ "531, duration: 0.44138, confidence: 0.129 }, { start: 98.59448, duration: 0.43953, confidence: 0.079 }, { start: 99.03401, duration: 0.44136, confidence: 0.234 }, { start: 99.47537, duration: 0.43838, confidence: 0.307 }, { start: 99.91376, duration: 0.44484, confidence: 0.321 }, { start: 100.35859, duration: 0.44847, confidence: 0.594 }, { start: 100.80706, duration: 0.4513, confidence: 0.607 }, { start: 101.25837, duration: 0.44715, confidence: 0.528 }, { start: 101.70551, duration: 0.45, confidence: 0.44"
+ "4 }, { start: 102.15551, duration: 0.44584, confidence: 0.399 }, { start: 102.60135, duration: 0.45266, confidence: 0.547 }, { start: 103.05401, duration: 0.44877, confidence: 0.526 }, { start: 103.50278, duration: 0.45053, confidence: 0.527 }, { start: 103.95331, duration: 0.44734, confidence: 0.563 }, { start: 104.40065, duration: 0.45188, confidence: 0.589 }, { start: 104.85253, duration: 0.44569, confidence: 0.485 }, { start: 105.29823, duration: 0.44598, confidence: 0.497 }, { start: 105.74421, duratio"
+ "n: 0.44627, confidence: 0.469 }, { start: 106.19048, duration: 0.45152, confidence: 0.503 }, { start: 106.642, duration: 0.45142, confidence: 0.399 }, { start: 107.09342, duration: 0.44765, confidence: 0.255 }, { start: 107.54108, duration: 0.44467, confidence: 0.384 }, { start: 107.98575, duration: 0.44459, confidence: 0.485 }, { start: 108.43034, duration: 0.44543, confidence: 0.222 }, { start: 108.87577, duration: 0.44745, confidence: 0.103 }, { start: 109.32321, duration: 0.44212, confidence: 0.234 }, {"
+ " start: 109.76533, duration: 0.44854, confidence: 0.279 }, { start: 110.21387, duration: 0.44818, confidence: 0.463 }, { start: 110.66206, duration: 0.44815, confidence: 0.302 }, { start: 111.11021, duration: 0.44975, confidence: 0.357 }, { start: 111.55996, duration: 0.44828, confidence: 0.237 }, { start: 112.00824, duration: 0.44354, confidence: 0.083 }, { start: 112.45178, duration: 0.44571, confidence: 0.14 }, { start: 112.8975, duration: 0.43975, confidence: 0.295 }, { start: 113.33725, duration: 0.446"
+ "71, confidence: 0.353 }, { start: 113.78396, duration: 0.44761, confidence: 0.169 }, { start: 114.23157, duration: 0.4517, confidence: 0.311 }, { start: 114.68326, duration: 0.45085, confidence: 0.402 }, { start: 115.13411, duration: 0.4512, confidence: 0.421 }, { start: 115.58531, duration: 0.45034, confidence: 0.545 }, { start: 116.03565, duration: 0.45151, confidence: 0.553 }, { start: 116.48717, duration: 0.4463, confidence: 0.607 }, { start: 116.93347, duration: 0.44591, confidence: 0.636 }, { start: 1"
+ "17.37938, duration: 0.44553, confidence: 0.736 }, { start: 117.82491, duration: 0.45433, confidence: 0.667 }, { start: 118.27924, duration: 0.45595, confidence: 0.323 }, { start: 118.73519, duration: 0.45279, confidence: 0.473 }, { start: 119.18798, duration: 0.44524, confidence: 0.607 }, { start: 119.63321, duration: 0.45047, confidence: 0.759 }, { start: 120.08368, duration: 0.44891, confidence: 0.45 }, { start: 120.53259, duration: 0.44335, confidence: 0.37 }, { start: 120.97594, duration: 0.43699, confi"
+ "dence: 0.456 }, { start: 121.41293, duration: 0.43702, confidence: 0.473 }, { start: 121.84995, duration: 0.44064, confidence: 0.36 }, { start: 122.2906, duration: 0.44666, confidence: 0.472 }, { start: 122.73726, duration: 0.44509, confidence: 0.525 }, { start: 123.18235, duration: 0.4515, confidence: 0.507 }, { start: 123.63385, duration: 0.46031, confidence: 0.667 }, { start: 124.09416, duration: 0.46432, confidence: 0.708 }, { start: 124.55847, duration: 0.46993, confidence: 0.69 }, { start: 125.0284, d"
+ "uration: 0.47713, confidence: 0.516 }, { start: 125.50553, duration: 0.48074, confidence: 0.372 }, { start: 125.98627, duration: 0.47875, confidence: 0.247 }, { start: 126.46502, duration: 0.47876, confidence: 0.14 }, { start: 126.94377, duration: 0.47477, confidence: 0.365 }, { start: 127.41855, duration: 0.47239, confidence: 0.461 }, { start: 127.89093, duration: 0.47199, confidence: 0.524 }, { start: 128.36292, duration: 0.45961, confidence: 0.27 }, { start: 128.82253, duration: 0.44962, confidence: 0.29"
+ "3 }, { start: 129.27216, duration: 0.45522, confidence: 0.376 }, { start: 129.72737, duration: 0.44443, confidence: 0.262 }, { start: 130.1718, duration: 0.44204, confidence: 0.281 }, { start: 130.61385, duration: 0.43845, confidence: 0.442 }, { start: 131.05228, duration: 0.43886, confidence: 0.424 }, { start: 131.49113, duration: 0.44788, confidence: 0.313 }, { start: 131.93903, duration: 0.45169, confidence: 0.499 }, { start: 132.39072, duration: 0.45113, confidence: 0.409 }, { start: 132.84184, duration"
+ ": 0.45395, confidence: 0.471 }, { start: 133.29579, duration: 0.45601, confidence: 0.623 }, { start: 133.7518, duration: 0.45868, confidence: 0.289 }, { start: 134.21048, duration: 0.45417, confidence: 0.472 }, { start: 134.66466, duration: 0.44598, confidence: 0.513 }, { start: 135.11063, duration: 0.44259, confidence: 0.599 }, { start: 135.55322, duration: 0.43764, confidence: 0.37 }, { start: 135.99086, duration: 0.44213, confidence: 0.385 }, { start: 136.43298, duration: 0.43652, confidence: 0.099 }, { "
+ "start: 136.8695, duration: 0.4382, confidence: 0.311 }, { start: 137.3077, duration: 0.44111, confidence: 0.251 }, { start: 137.74881, duration: 0.44945, confidence: 0.364 }, { start: 138.19826, duration: 0.45697, confidence: 0.454 }, { start: 138.65523, duration: 0.46249, confidence: 0.632 }, { start: 139.11772, duration: 0.45744, confidence: 0.591 }, { start: 139.57516, duration: 0.46214, confidence: 0.565 }, { start: 140.03731, duration: 0.46175, confidence: 0.479 }, { start: 140.49905, duration: 0.45769"
+ ", confidence: 0.543 }, { start: 140.95676, duration: 0.45607, confidence: 0.469 }, { start: 141.41283, duration: 0.45729, confidence: 0.601 }, { start: 141.87012, duration: 0.46172, confidence: 0.543 }, { start: 142.33183, duration: 0.469, confidence: 0.167 }, { start: 142.80084, duration: 0.46933, confidence: 0.204 }, { start: 143.27017, duration: 0.46722, confidence: 0.28 }, { start: 143.73738, duration: 0.46465, confidence: 0.501 }, { start: 144.20203, duration: 0.46086, confidence: 0.495 }, { start: 144"
+ ".66289, duration: 0.45948, confidence: 0.284 }, { start: 145.12238, duration: 0.45163, confidence: 0.421 }, { start: 145.574, duration: 0.44866, confidence: 0.427 }, { start: 146.02267, duration: 0.44574, confidence: 0.513 }, { start: 146.4684, duration: 0.44611, confidence: 0.633 }, { start: 146.9145, duration: 0.44735, confidence: 0.57 }, { start: 147.36188, duration: 0.45103, confidence: 0.563 }, { start: 147.8129, duration: 0.44373, confidence: 0.629 }, { start: 148.25664, duration: 0.43886, confidence:"
+ " 0.478 }, { start: 148.69548, duration: 0.43356, confidence: 0.634 }, { start: 149.12904, duration: 0.43434, confidence: 0.398 }, { start: 149.56339, duration: 0.43543, confidence: 0.271 }, { start: 149.99881, duration: 0.44299, confidence: 0.459 }, { start: 150.4418, duration: 0.44444, confidence: 0.397 }, { start: 150.88625, duration: 0.4496, confidence: 0.569 }, { start: 151.33585, duration: 0.45881, confidence: 0.479 }, { start: 151.79466, duration: 0.46356, confidence: 0.435 }, { start: 152.25822, dura"
+ "tion: 0.46101, confidence: 0.293 }, { start: 152.71922, duration: 0.45487, confidence: 0.47 }, { start: 153.1741, duration: 0.44347, confidence: 0.274 }, { start: 153.61757, duration: 0.44137, confidence: 0.398 }, { start: 154.05894, duration: 0.44616, confidence: 0.364 }, { start: 154.5051, duration: 0.44606, confidence: 0.133 }, { start: 154.95116, duration: 0.44722, confidence: 0.183 }, { start: 155.39838, duration: 0.44999, confidence: 0.205 }, { start: 155.84837, duration: 0.4544, confidence: 0.224 }, "
+ "{ start: 156.30276, duration: 0.45921, confidence: 0.296 }, { start: 156.76198, duration: 0.45681, confidence: 0.479 }, { start: 157.2188, duration: 0.4536, confidence: 0.426 }, { start: 157.67238, duration: 0.44837, confidence: 0.604 }, { start: 158.12076, duration: 0.44962, confidence: 0.583 }, { start: 158.57037, duration: 0.44731, confidence: 0.632 }, { start: 159.01768, duration: 0.45065, confidence: 0.593 }, { start: 159.46832, duration: 0.44866, confidence: 0.292 }, { start: 159.917, duration: 0.4480"
+ "8, confidence: 0.292 }, { start: 160.36508, duration: 0.4475, confidence: 0.292 }, { start: 160.81258, duration: 0.44692, confidence: 0.292 }, { start: 161.2595, duration: 0.44634, confidence: 0.292 }, { start: 161.70586, duration: 0.44775, confidence: 0.292 }, { start: 162.1536, duration: 0.44461, confidence: 0.555 }, { start: 162.5982, duration: 0.44512, confidence: 0.386 }, { start: 163.04333, duration: 0.44563, confidence: 0.237 }, { start: 163.48895, duration: 0.45014, confidence: 0.398 }, { start: 163"
+ ".9391, duration: 0.45182, confidence: 0.49 }, { start: 164.39091, duration: 0.45182, confidence: 0.404 }, { start: 164.84274, duration: 0.44897, confidence: 0.429 }, { start: 165.29172, duration: 0.44695, confidence: 0.516 }, { start: 165.73866, duration: 0.44735, confidence: 0.366 }, { start: 166.186, duration: 0.44524, confidence: 0.247 }, { start: 166.63124, duration: 0.44353, confidence: 0.161 }, { start: 167.07477, duration: 0.44332, confidence: 0.245 }, { start: 167.5181, duration: 0.44352, confidence"
+ ": 0.402 }, { start: 167.96161, duration: 0.44453, confidence: 0.355 }, { start: 168.40614, duration: 0.44909, confidence: 0.275 }, { start: 168.85522, duration: 0.44718, confidence: 0.169 }, { start: 169.30241, duration: 0.44578, confidence: 0.153 }, { start: 169.74818, duration: 0.44466, confidence: 0.07 }, { start: 170.19286, duration: 0.44851, confidence: 0.073 }, { start: 170.64137, duration: 0.45145, confidence: 0.469 }, { start: 171.09282, duration: 0.44794, confidence: 0.458 }, { start: 171.54076, du"
+ "ration: 0.44766, confidence: 0.498 }, { start: 171.98843, duration: 0.4486, confidence: 0.561 }, { start: 172.43703, duration: 0.4511, confidence: 0.477 }, { start: 172.88812, duration: 0.45048, confidence: 0.49 }, { start: 173.33861, duration: 0.44944, confidence: 0.348 }, { start: 173.78806, duration: 0.4469, confidence: 0.399 }, { start: 174.23495, duration: 0.44958, confidence: 0.537 }, { start: 174.68452, duration: 0.4459, confidence: 0.486 }, { start: 175.13043, duration: 0.44986, confidence: 0.478 },"
+ " { start: 175.58029, duration: 0.44821, confidence: 0.528 }, { start: 176.0285, duration: 0.45058, confidence: 0.477 }, { start: 176.4791, duration: 0.44291, confidence: 0.486 }, { start: 176.922, duration: 0.44812, confidence: 0.385 }, { start: 177.37012, duration: 0.44931, confidence: 0.299 }, { start: 177.81943, duration: 0.45212, confidence: 0.396 }, { start: 178.27155, duration: 0.44408, confidence: 0.391 }, { start: 178.71564, duration: 0.44368, confidence: 0.274 }, { start: 179.15932, duration: 0.444"
+ "9, confidence: 0.345 }, { start: 179.60422, duration: 0.44891, confidence: 0.246 }, { start: 180.05312, duration: 0.44327, confidence: 0.273 }, { start: 180.4964, duration: 0.44005, confidence: 0.346 }, { start: 180.93645, duration: 0.44365, confidence: 0.457 }, { start: 181.3801, duration: 0.44806, confidence: 0.488 }, { start: 181.82816, duration: 0.44884, confidence: 0.442 }, { start: 182.277, duration: 0.44481, confidence: 0.317 }, { start: 182.7218, duration: 0.4468, confidence: 0.434 }, { start: 183.1"
+ "6861, duration: 0.45161, confidence: 0.361 }, { start: 183.62022, duration: 0.45761, confidence: 0.242 }, { start: 184.07784, duration: 0.45557, confidence: 0.264 }, { start: 184.5334, duration: 0.46074, confidence: 0.312 }, { start: 184.99414, duration: 0.4623, confidence: 0.387 }, { start: 185.45644, duration: 0.46628, confidence: 0.181 }, { start: 185.92271, duration: 0.46022, confidence: 0.125 }, { start: 186.38293, duration: 0.46219, confidence: 0.206 }, { start: 186.84512, duration: 0.45254, confidenc"
+ "e: 0.208 }, { start: 187.29767, duration: 0.45213, confidence: 0.191 }, { start: 187.7498, duration: 0.44609, confidence: 0.215 }, { start: 188.19589, duration: 0.45209, confidence: 0.218 }, { start: 188.64798, duration: 0.44967, confidence: 0.337 }, { start: 189.09766, duration: 0.45126, confidence: 0.388 }, { start: 189.5489, duration: 0.45326, confidence: 0.254 }, { start: 190.00217, duration: 0.46529, confidence: 0.192 }, { start: 190.46745, duration: 0.46127, confidence: 0.219 }, { start: 190.92873, du"
+ "ration: 0.45728, confidence: 0.294 }, { start: 191.38602, duration: 0.45007, confidence: 0.309 }, { start: 191.83607, duration: 0.45733, confidence: 0.351 }, { start: 192.29341, duration: 0.46579, confidence: 0.276 }, { start: 192.7592, duration: 0.46021, confidence: 0.243 }, { start: 193.2194, duration: 0.45343, confidence: 0.312 }, { start: 193.67284, duration: 0.45508, confidence: 0.12 }, { start: 194.12791, duration: 0.46676, confidence: 0.352 }, { start: 194.59468, duration: 0.46519, confidence: 0.223 "
+ "}, { start: 195.05986, duration: 0.45677, confidence: 0.319 }, { start: 195.51663, duration: 0.45518, confidence: 0.303 }, { start: 195.97182, duration: 0.45036, confidence: 0.345 }, { start: 196.42216, duration: 0.44953, confidence: 0.34 }, { start: 196.87169, duration: 0.44871, confidence: 0.357 }, { start: 197.3204, duration: 0.44186, confidence: 0.115 }, { start: 197.76225, duration: 0.44144, confidence: 0.087 }, { start: 198.20369, duration: 0.44222, confidence: 0.214 }, { start: 198.6459, duration: 0."
+ "43898, confidence: 0.336 }, { start: 199.08488, duration: 0.43656, confidence: 0.455 }, { start: 199.52145, duration: 0.43375, confidence: 0.326 }, { start: 199.9552, duration: 0.43455, confidence: 0.177 }, { start: 200.38974, duration: 0.44017, confidence: 0.242 }, { start: 200.82993, duration: 0.43656, confidence: 0.141 }, { start: 201.26648, duration: 0.43135, confidence: 0.206 }, { start: 201.69783, duration: 0.42412, confidence: 0.294 }, { start: 202.12195, duration: 0.42412, confidence: 0.255 }, { sta"
+ "rt: 202.54607, duration: 0.4253, confidence: 0.143 }, { start: 202.97137, duration: 0.42528, confidence: 0.183 }, { start: 203.39665, duration: 0.42245, confidence: 0.301 }, { start: 203.81909, duration: 0.43125, confidence: 0.277 }, { start: 204.25034, duration: 0.44286, confidence: 0.183 }, { start: 204.6932, duration: 0.44845, confidence: 0.189 }, { start: 205.14166, duration: 0.45203, confidence: 0.284 }, { start: 205.59369, duration: 0.44962, confidence: 0.277 }, { start: 206.04332, duration: 0.44842, "
+ "confidence: 0.201 }, { start: 206.49173, duration: 0.4444, confidence: 0.264 }, { start: 206.93613, duration: 0.4456, confidence: 0.227 }, { start: 207.38173, duration: 0.43958, confidence: 0.203 }, { start: 207.8213, duration: 0.43758, confidence: 0.299 }, { start: 208.2589, duration: 0.4412, confidence: 0.263 }, { start: 208.70009, duration: 0.45364, confidence: 0.14 }, { start: 209.15373, duration: 0.46328, confidence: 0.199 }, { start: 209.617, duration: 0.47051, confidence: 0.262 }, { start: 210.08752,"
+ " duration: 0.46409, confidence: 0.301 }, { start: 210.5516, duration: 0.47011, confidence: 0.163 }, { start: 211.02171, duration: 0.47172, confidence: 0.353 }, { start: 211.49342, duration: 0.47091, confidence: 0.324 }, { start: 211.96436, duration: 0.45968, confidence: 0.183 }, { start: 212.42403, duration: 0.45807, confidence: 0.132 }, { start: 212.8821, duration: 0.45244, confidence: 0.108 }, { start: 213.33453, duration: 0.45444, confidence: 0.175 }, { start: 213.78899, duration: 0.44683, confidence: 0."
+ "123 }, { start: 214.23581, duration: 0.45006, confidence: 0.222 }, { start: 214.68587, duration: 0.45608, confidence: 0.355 }, { start: 215.14195, duration: 0.45488, confidence: 0.316 }, { start: 215.59685, duration: 0.44405, confidence: 0.309 }, { start: 216.0409, duration: 0.44607, confidence: 0.209 }, { start: 216.48695, duration: 0.44888, confidence: 0.209 }, { start: 216.93584, duration: 0.44807, confidence: 0.236 }, { start: 217.38391, duration: 0.44365, confidence: 0.215 }, { start: 217.82756, durati"
+ "on: 0.43603, confidence: 0.182 }, { start: 218.26358, duration: 0.44125, confidence: 0.25 }, { start: 218.70483, duration: 0.44968, confidence: 0.152 }, { start: 219.15451, duration: 0.44527, confidence: 0.155 }, { start: 219.5998, duration: 0.44568, confidence: 0.207 }, { start: 220.04547, duration: 0.45011, confidence: 0.337 }, { start: 220.49557, duration: 0.45171, confidence: 0.395 }, { start: 220.9473, duration: 0.4469, confidence: 0.333 }, { start: 221.3942, duration: 0.45011, confidence: 0.222 }, { s"
+ "tart: 221.84428, duration: 0.44649, confidence: 0.286 }, { start: 222.29079, duration: 0.44929, confidence: 0.208 }, { start: 222.74007, duration: 0.44406, confidence: 0.135 }, { start: 223.18413, duration: 0.44925, confidence: 0.129 }, { start: 223.63338, duration: 0.45123, confidence: 0.262 }, { start: 224.08461, duration: 0.45121, confidence: 0.327 }, { start: 224.53581, duration: 0.44433, confidence: 0.291 }, { start: 224.98015, duration: 0.4507, confidence: 0.065 }, { start: 225.43085, duration: 0.4486"
+ "2, confidence: 0.115 }, { start: 225.87946, duration: 0.44896, confidence: 0.066 }, { start: 226.32841, duration: 0.44127, confidence: 0.106 }, { start: 226.76968, duration: 0.44322, confidence: 0.108 }, { start: 227.2129, duration: 0.4496, confidence: 0.182 }, { start: 227.6625, duration: 0.45036, confidence: 0.282 }, { start: 228.11287, duration: 0.44511, confidence: 0.263 }, { start: 228.55798, duration: 0.44992, confidence: 0.218 }, { start: 229.0079, duration: 0.45032, confidence: 0.241 }, { start: 229"
+ ".45822, duration: 0.44991, confidence: 0.268 }, { start: 229.90813, duration: 0.44548, confidence: 0.313 }, { start: 230.3536, duration: 0.44667, confidence: 0.241 }, { start: 230.8003, duration: 0.45189, confidence: 0.254 }, { start: 231.25217, duration: 0.44748, confidence: 0.278 }, { start: 231.69965, duration: 0.44345, confidence: 0.275 }, { start: 232.1431, duration: 0.45186, confidence: 0.206 }, { start: 232.59496, duration: 0.45189, confidence: 0.228 }, { start: 233.04684, duration: 0.45111, confiden"
+ "ce: 0.128 }, { start: 233.49796, duration: 0.44513, confidence: 0.134 }, { start: 233.94308, duration: 0.44438, confidence: 0.174 }, { start: 234.38747, duration: 0.45527, confidence: 0.243 }, { start: 234.84274, duration: 0.45494, confidence: 0.346 }, { start: 235.29768, duration: 0.45501, confidence: 0.288 }, { start: 235.75269, duration: 0.45593, confidence: 0.082 }, { start: 236.20862, duration: 0.46206, confidence: 0.23 }, { start: 236.67068, duration: 0.46668, confidence: 0.323 }, { start: 237.13736, "
+ "duration: 0.46447, confidence: 0.122 }, { start: 237.60184, duration: 0.45877, confidence: 0.126 }, { start: 238.06061, duration: 0.46149, confidence: 0.267 }, { start: 238.5221, duration: 0.45431, confidence: 0.162 }, { start: 238.97641, duration: 0.45672, confidence: 0.149 }, { start: 239.43314, duration: 0.45978, confidence: 0.284 }, { start: 239.8929, duration: 0.46674, confidence: 0.121 }, { start: 240.35965, duration: 0.47224, confidence: 0.209 }, { start: 240.8319, duration: 0.47235, confidence: 0.33"
+ "6 }, { start: 241.30424, duration: 0.46973, confidence: 0.119 }, { start: 241.77397, duration: 0.469, confidence: 0.19 }, { start: 242.24297, duration: 0.46991, confidence: 0.115 }, { start: 242.71288, duration: 0.47023, confidence: 0.061 }, { start: 243.1831, duration: 0.45792, confidence: 0.037 }, { start: 243.64104, duration: 0.459, confidence: 0.091 }, { start: 244.10004, duration: 0.46578, confidence: 0.164 }, { start: 244.56581, duration: 0.47168, confidence: 0.134 }, { start: 245.03748, duration: 0.4"
+ "7636, confidence: 0.079 }, { start: 245.51384, duration: 0.47534, confidence: 0.01 }, { start: 245.98918, duration: 0.46984, confidence: 0.063 }, { start: 246.45903, duration: 0.47579, confidence: 0.122 }, { start: 246.93481, duration: 0.46899, confidence: 0.139 }, { start: 247.40381, duration: 0.46098, confidence: 0.195 }, { start: 247.86479, duration: 0.45411, confidence: 0.203 }, { start: 248.3189, duration: 0.45382, confidence: 0.167 }, { start: 248.77272, duration: 0.45719, confidence: 0.113 }, { start"
+ ": 249.2299, duration: 0.45566, confidence: 0.198 }, { start: 249.68558, duration: 0.45085, confidence: 0.305 }, { start: 250.13641, duration: 0.45872, confidence: 0.241 }, { start: 250.59514, duration: 0.4547, confidence: 0.092 }, { start: 251.04984, duration: 0.45928, confidence: 0.163 }, { start: 251.50912, duration: 0.45526, confidence: 0.183 }, { start: 251.96439, duration: 0.45124, confidence: 0.179 }, { start: 252.41562, duration: 0.45743, confidence: 0.267 }, { start: 252.87306, duration: 0.45703, co"
+ "nfidence: 0.25 }, { start: 253.3301, duration: 0.45869, confidence: 0.147 }, { start: 253.78877, duration: 0.4632, confidence: 0.095 }, { start: 254.25198, duration: 0.45663, confidence: 0.12 }, { start: 254.7086, duration: 0.45537, confidence: 0.101 }, { start: 255.16399, duration: 0.45533, confidence: 0.149 }, { start: 255.6193, duration: 0.45551, confidence: 0.05 }, { start: 256.0748, duration: 0.4341, confidence: 0.086 }, { start: 256.5089, duration: 0.45087, confidence: 0.072 }, { start: 256.95978, dur"
+ "ation: 0.45087, confidence: 0.036 } ],", "duration:", "start:", ", duration:", ", confidence:", "confidence:", "loading.PNG", "class.", ".image", "Cannot add null actor.", "cat", "button1.PNG", "button", "scenarioCanvas", "Initialising...", "resetButton", "playButton", "speedSlider", "input", "change", "standalone.properties", "IOException during initialisation.", "Couldn\'t load standalone.properties", "main.class", "Main class is: ", "scenario.lock", "true", "none", "project.greenfoot", "Couldn\'t load project.greenfoot",
"simulation.speed", "ClassNotFound loading world class: ", "InstantiationException instantiating world class.", "Exception instantiating world class: ", " - ", ".wav", ".mp3", "audio/mpeg", "Error getting content for zipfile file: "]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
function Long_eq(a, b) {
    return a.hi === b.hi && a.lo === b.lo;
}
function Long_ne(a, b) {
    return a.hi !== b.hi || a.lo !== b.lo;
}
function Long_gt(a, b) {
    if (a.hi < b.hi) {
        return false;
    }
    if (a.hi > b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x > y;
    }
    return (a.lo & 1) > (b.lo & 1);
}
function Long_ge(a, b) {
    if (a.hi < b.hi) {
        return false;
    }
    if (a.hi > b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x >= y;
    }
    return (a.lo & 1) >= (b.lo & 1);
}
function Long_lt(a, b) {
    if (a.hi > b.hi) {
        return false;
    }
    if (a.hi < b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x < y;
    }
    return (a.lo & 1) < (b.lo & 1);
}
function Long_le(a, b) {
    if (a.hi > b.hi) {
        return false;
    }
    if (a.hi < b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x <= y;
    }
    return (a.lo & 1) <= (b.lo & 1);
}
function Long_add(a, b) {
    if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
        return Long_fromNumber(a.lo + b.lo);
    } else if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) + Long_toNumber(b));
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = a_lolo + b_lolo | 0;
    var lohi = a_lohi + b_lohi + (lolo >> 16) | 0;
    var hilo = a_hilo + b_hilo + (lohi >> 16) | 0;
    var hihi = a_hihi + b_hihi + (hilo >> 16) | 0;
    return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
}
function Long_inc(a) {
    var lo = a.lo + 1 | 0;
    var hi = a.hi;
    if (lo === 0) {
        hi = hi + 1 | 0;
    }
    return new Long(lo, hi);
}
function Long_dec(a) {
    var lo = a.lo - 1 | 0;
    var hi = a.hi;
    if (lo ===  -1) {
        hi = hi - 1 | 0;
    }
    return new Long(lo, hi);
}
function Long_neg(a) {
    return Long_inc(new Long(a.lo ^ 0xFFFFFFFF, a.hi ^ 0xFFFFFFFF));
}
function Long_sub(a, b) {
    if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
        return Long_fromNumber(a.lo - b.lo);
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = a_lolo - b_lolo | 0;
    var lohi = a_lohi - b_lohi + (lolo >> 16) | 0;
    var hilo = a_hilo - b_hilo + (lohi >> 16) | 0;
    var hihi = a_hihi - b_hihi + (hilo >> 16) | 0;
    return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
}
function Long_compare(a, b) {
    var r = a.hi - b.hi;
    if (r !== 0) {
        return r;
    }
    r = (a.lo >>> 1) - (b.lo >>> 1);
    if (r !== 0) {
        return r;
    }
    return (a.lo & 1) - (b.lo & 1);
}
function Long_isPositive(a) {
    return (a.hi & 0x80000000) === 0;
}
function Long_isNegative(a) {
    return (a.hi & 0x80000000) !== 0;
}
function Long_mul(a, b) {
    var positive = Long_isNegative(a) === Long_isNegative(b);
    if (Long_isNegative(a)) {
        a = Long_neg(a);
    }
    if (Long_isNegative(b)) {
        b = Long_neg(b);
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = 0;
    var lohi = 0;
    var hilo = 0;
    var hihi = 0;
    lolo = a_lolo * b_lolo | 0;
    lohi = lolo >>> 16;
    lohi = (lohi & 0xFFFF) + a_lohi * b_lolo | 0;
    hilo = hilo + (lohi >>> 16) | 0;
    lohi = (lohi & 0xFFFF) + a_lolo * b_lohi | 0;
    hilo = hilo + (lohi >>> 16) | 0;
    hihi = hilo >>> 16;
    hilo = (hilo & 0xFFFF) + a_hilo * b_lolo | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hilo = (hilo & 0xFFFF) + a_lohi * b_lohi | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hilo = (hilo & 0xFFFF) + a_lolo * b_hilo | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hihi = hihi + a_hihi * b_lolo + a_hilo * b_lohi + a_lohi * b_hilo + a_lolo * b_hihi | 0;
    var result = new Long(lolo & 0xFFFF | lohi << 16, hilo & 0xFFFF | hihi << 16);
    return positive ? result : Long_neg(result);
}
function Long_div(a, b) {
    if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_divRem(a, b))[0];
}
function Long_udiv(a, b) {
    if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_udivRem(a, b))[0];
}
function Long_rem(a, b) {
    if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) % Long_toNumber(b));
    }
    return (Long_divRem(a, b))[1];
}
function Long_urem(a, b) {
    if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_udivRem(a, b))[1];
}
function Long_divRem(a, b) {
    if (b.lo === 0 && b.hi === 0) {
        throw new Error("Division by zero");
    }
    var positive = Long_isNegative(a) === Long_isNegative(b);
    if (Long_isNegative(a)) {
        a = Long_neg(a);
    }
    if (Long_isNegative(b)) {
        b = Long_neg(b);
    }
    a = new LongInt(a.lo, a.hi, 0);
    b = new LongInt(b.lo, b.hi, 0);
    var q = LongInt_div(a, b);
    a = new Long(a.lo, a.hi);
    q = new Long(q.lo, q.hi);
    return positive ? [q, a] : [Long_neg(q), Long_neg(a)];
}
function Long_udivRem(a, b) {
    if (b.lo === 0 && b.hi === 0) {
        throw new Error("Division by zero");
    }
    a = new LongInt(a.lo, a.hi, 0);
    b = new LongInt(b.lo, b.hi, 0);
    var q = LongInt_div(a, b);
    a = new Long(a.lo, a.hi);
    q = new Long(q.lo, q.hi);
    return [q, a];
}
function Long_shiftLeft16(a) {
    return new Long(a.lo << 16, a.lo >>> 16 | a.hi << 16);
}
function Long_shiftRight16(a) {
    return new Long(a.lo >>> 16 | a.hi << 16, a.hi >>> 16);
}
function Long_and(a, b) {
    return new Long(a.lo & b.lo, a.hi & b.hi);
}
function Long_or(a, b) {
    return new Long(a.lo | b.lo, a.hi | b.hi);
}
function Long_xor(a, b) {
    return new Long(a.lo ^ b.lo, a.hi ^ b.hi);
}
function Long_shl(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo << b, a.lo >>> 32 - b | a.hi << b);
    } else if (b === 32) {
        return new Long(0, a.lo);
    } else {
        return new Long(0, a.lo << b - 32);
    }
}
function Long_shr(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >> b);
    } else if (b === 32) {
        return new Long(a.hi, a.hi >> 31);
    } else {
        return new Long(a.hi >> b - 32, a.hi >> 31);
    }
}
function Long_shru(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >>> b);
    } else if (b === 32) {
        return new Long(a.hi, 0);
    } else {
        return new Long(a.hi >>> b - 32, 0);
    }
}
function LongInt(lo, hi, sup) {
    this.lo = lo;
    this.hi = hi;
    this.sup = sup;
}
function LongInt_mul(a, b) {
    var a_lolo = (a.lo & 0xFFFF) * b | 0;
    var a_lohi = (a.lo >>> 16) * b | 0;
    var a_hilo = (a.hi & 0xFFFF) * b | 0;
    var a_hihi = (a.hi >>> 16) * b | 0;
    var sup = a.sup * b | 0;
    a_lohi = a_lohi + (a_lolo >>> 16) | 0;
    a_hilo = a_hilo + (a_lohi >>> 16) | 0;
    a_hihi = a_hihi + (a_hilo >>> 16) | 0;
    sup = sup + (a_hihi >>> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup & 0xFFFF;
}
function LongInt_sub(a, b) {
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    a_lolo = a_lolo - b_lolo | 0;
    a_lohi = a_lohi - b_lohi + (a_lolo >> 16) | 0;
    a_hilo = a_hilo - b_hilo + (a_lohi >> 16) | 0;
    a_hihi = a_hihi - b_hihi + (a_hilo >> 16) | 0;
    var sup = a.sup - b.sup + (a_hihi >> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup;
}
function LongInt_add(a, b) {
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    a_lolo = a_lolo + b_lolo | 0;
    a_lohi = a_lohi + b_lohi + (a_lolo >> 16) | 0;
    a_hilo = a_hilo + b_hilo + (a_lohi >> 16) | 0;
    a_hihi = a_hihi + b_hihi + (a_hilo >> 16) | 0;
    var sup = a.sup + b.sup + (a_hihi >> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup;
}
function LongInt_inc(a) {
    a.lo = a.lo + 1 | 0;
    if (a.lo === 0) {
        a.hi = a.hi + 1 | 0;
        if (a.hi === 0) {
            a.sup = a.sup + 1 & 0xFFFF;
        }
    }
}
function LongInt_dec(a) {
    a.lo = a.lo - 1 | 0;
    if (a.lo ===  -1) {
        a.hi = a.hi - 1 | 0;
        if (a.hi ===  -1) {
            a.sup = a.sup - 1 & 0xFFFF;
        }
    }
}
function LongInt_ucompare(a, b) {
    var r = a.sup - b.sup;
    if (r !== 0) {
        return r;
    }
    r = (a.hi >>> 1) - (b.hi >>> 1);
    if (r !== 0) {
        return r;
    }
    r = (a.hi & 1) - (b.hi & 1);
    if (r !== 0) {
        return r;
    }
    r = (a.lo >>> 1) - (b.lo >>> 1);
    if (r !== 0) {
        return r;
    }
    return (a.lo & 1) - (b.lo & 1);
}
function LongInt_numOfLeadingZeroBits(a) {
    var n = 0;
    var d = 16;
    while (d > 0) {
        if (a >>> d !== 0) {
            a >>>= d;
            n = n + d | 0;
        }
        d = d / 2 | 0;
    }
    return 31 - n;
}
function LongInt_shl(a, b) {
    if (b === 0) {
        return;
    }
    if (b < 32) {
        a.sup = (a.hi >>> 32 - b | a.sup << b) & 0xFFFF;
        a.hi = a.lo >>> 32 - b | a.hi << b;
        a.lo <<= b;
    } else if (b === 32) {
        a.sup = a.hi & 0xFFFF;
        a.hi = a.lo;
        a.lo = 0;
    } else if (b < 64) {
        a.sup = (a.lo >>> 64 - b | a.hi << b - 32) & 0xFFFF;
        a.hi = a.lo << b;
        a.lo = 0;
    } else if (b === 64) {
        a.sup = a.lo & 0xFFFF;
        a.hi = 0;
        a.lo = 0;
    } else {
        a.sup = a.lo << b - 64 & 0xFFFF;
        a.hi = 0;
        a.lo = 0;
    }
}
function LongInt_shr(a, b) {
    if (b === 0) {
        return;
    }
    if (b === 32) {
        a.lo = a.hi;
        a.hi = a.sup;
        a.sup = 0;
    } else if (b < 32) {
        a.lo = a.lo >>> b | a.hi << 32 - b;
        a.hi = a.hi >>> b | a.sup << 32 - b;
        a.sup >>>= b;
    } else if (b === 64) {
        a.lo = a.sup;
        a.hi = 0;
        a.sup = 0;
    } else if (b < 64) {
        a.lo = a.hi >>> b - 32 | a.sup << 64 - b;
        a.hi = a.sup >>> b - 32;
        a.sup = 0;
    } else {
        a.lo = a.sup >>> b - 64;
        a.hi = 0;
        a.sup = 0;
    }
}
function LongInt_copy(a) {
    return new LongInt(a.lo, a.hi, a.sup);
}
function LongInt_div(a, b) {
    var bits = b.hi !== 0 ? LongInt_numOfLeadingZeroBits(b.hi) : LongInt_numOfLeadingZeroBits(b.lo) + 32;
    var sz = 1 + (bits / 16 | 0);
    var dividentBits = bits % 16;
    LongInt_shl(b, bits);
    LongInt_shl(a, dividentBits);
    var q = new LongInt(0, 0, 0);
    while (sz-- > 0) {
        LongInt_shl(q, 16);
        var digitA = (a.hi >>> 16) + 0x10000 * a.sup;
        var digitB = b.hi >>> 16;
        var digit = digitA / digitB | 0;
        var t = LongInt_copy(b);
        LongInt_mul(t, digit);
        if (LongInt_ucompare(t, a) >= 0) {
            while (LongInt_ucompare(t, a) > 0) {
                LongInt_sub(t, b);
                 --digit;
            }
        } else {
            while (true) {
                var nextT = LongInt_copy(t);
                LongInt_add(nextT, b);
                if (LongInt_ucompare(nextT, a) > 0) {
                    break;
                }
                t = nextT;
                ++digit;
            }
        }
        LongInt_sub(a, t);
        q.lo |= digit;
        LongInt_shl(a, 16);
    }
    LongInt_shr(a, bits + 16);
    return q;
}
function TeaVMThread(runner) {
    this.status = 3;
    this.stack = [];
    this.suspendCallback = null;
    this.runner = runner;
    this.attribute = null;
    this.completeCallback = null;
}
TeaVMThread.prototype.push = function() {
    for (var i = 0;i < arguments.length;++i) {
        this.stack.push(arguments[i]);
    }
    return this;
};
TeaVMThread.prototype.s = TeaVMThread.prototype.push;
TeaVMThread.prototype.pop = function() {
    return this.stack.pop();
};
TeaVMThread.prototype.l = TeaVMThread.prototype.pop;
TeaVMThread.prototype.isResuming = function() {
    return this.status === 2;
};
TeaVMThread.prototype.isSuspending = function() {
    return this.status === 1;
};
TeaVMThread.prototype.suspend = function(callback) {
    this.suspendCallback = callback;
    this.status = 1;
};
TeaVMThread.prototype.start = function(callback) {
    if (this.status !== 3) {
        throw new Error("Thread already started");
    }
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 0;
    this.completeCallback = callback ? callback : function(result) {
        if (result instanceof Error) {
            throw result;
        }
    };
    this.run();
};
TeaVMThread.prototype.resume = function() {
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 2;
    this.run();
};
TeaVMThread.prototype.run = function() {
    $rt_currentNativeThread = this;
    var result;
    try {
        result = this.runner();
    } catch (e){
        result = e;
    } finally {
        $rt_currentNativeThread = null;
    }
    if (this.suspendCallback !== null) {
        var self = this;
        var callback = this.suspendCallback;
        this.suspendCallback = null;
        callback(function() {
            self.resume();
        });
    } else if (this.status === 0) {
        this.completeCallback(result);
    }
};
function $rt_suspending() {
    var thread = $rt_nativeThread();
    return thread != null && thread.isSuspending();
}
function $rt_resuming() {
    var thread = $rt_nativeThread();
    return thread != null && thread.isResuming();
}
function $rt_suspend(callback) {
    return ($rt_nativeThread()).suspend(callback);
}
function $rt_startThread(runner, callback) {
    (new TeaVMThread(runner)).start(callback);
}
var $rt_currentNativeThread = null;
function $rt_nativeThread() {
    return $rt_currentNativeThread;
}
function $rt_invalidPointer() {
    throw new Error("Invalid recorded state");
}
main = $rt_mainStarter(gj_Client_main);
(function() {
    var c;
    c = jl_Object$NotifyListenerImpl.prototype;
    c.onTimer = c.$onTimer$exported$0;
    c = gj_Client$getResourceBytes$lambda$_12_0.prototype;
    c.gotContent = c.$gotContent$exported$0;
    c = gj_Client$getResourceBytes$lambda$_12_1.prototype;
    c.gotError = c.$gotError$exported$0;
    c = gj_TouchManager.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gj_Client$_init_$lambda$_1_3.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gj_Client$_init_$lambda$_1_2.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gj_Client$_init_$lambda$_1_1.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gj_Client$getResourceURL$lambda$_11_0.prototype;
    c.gotContent = c.$gotContent$exported$0;
    c = gj_Client$_init_$lambda$_1_0.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gj_Client$getResourceURL$lambda$_11_1.prototype;
    c.gotError = c.$gotError$exported$0;
    c = g_GreenfootImage$2.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = g_GreenfootImage$1.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gs_SoundFactory$2.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gs_SoundFactory$1.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gj_MouseManager.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gc_WorldHandler$1.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gc_WorldHandler$2.prototype;
    c.doRepaint = c.$doRepaint$exported$0;
    c = otjb_Window.prototype;
    c.dispatchEvent = c.$dispatchEvent$exported$4;
    c.addEventListener = c.$addEventListener$exported$0;
    c.removeEventListener = c.$removeEventListener$exported$1;
    c.getLength = c.$getLength$exported$5;
    c.get = c.$get$exported$2;
    c.addEventListener = c.$addEventListener$exported$6;
    c.removeEventListener = c.$removeEventListener$exported$3;
    c = gj_KeyboardManager.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = gj_MouseManager$1.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
})();
})();
