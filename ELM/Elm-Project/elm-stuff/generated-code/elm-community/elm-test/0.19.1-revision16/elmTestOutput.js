// Apply Node polyfills as necessary.
var window = {
  Date: Date,
  addEventListener: function () {},
  removeEventListener: function () {},
};

var location = {
  href: '',
  host: '',
  hostname: '',
  protocol: '',
  origin: '',
  port: '',
  pathname: '',
  search: '',
  hash: '',
  username: '',
  password: '',
};
var document = { body: {}, createTextNode: function () {}, location: location };

if (typeof FileList === 'undefined') {
  FileList = function () {};
}

if (typeof File === 'undefined') {
  File = function () {};
}

if (typeof XMLHttpRequest === 'undefined') {
  XMLHttpRequest = function () {
    return {
      addEventListener: function () {},
      open: function () {},
      send: function () {},
    };
  };

  var oldConsoleWarn = console.warn;
  console.warn = function () {
    if (
      arguments.length === 1 &&
      arguments[0].indexOf('Compiled in DEV mode') === 0
    )
      return;
    return oldConsoleWarn.apply(console, arguments);
  };
}

if (typeof FormData === 'undefined') {
  FormData = function () {
    this._data = [];
  };
  FormData.prototype.append = function () {
    this._data.push(Array.prototype.slice.call(arguments));
  };
}

var Elm = (function(module) {
var __elmTestSymbol = Symbol("elmTestSymbol");
(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'outerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (
		(typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		||
		(Array.isArray(_Json_unwrap(value)) && _VirtualDom_RE_js_html.test(String(_Json_unwrap(value))))
	)
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Test_runThunk(thunk)
{
  try {
    // Attempt to run the thunk as normal.
    return $elm$core$Result$Ok(thunk(_Utils_Tuple0));
  } catch (err) {
    // If it throws, return an error instead of crashing.
    return $elm$core$Result$Err(err.toString());
  }
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



// NOTE: this is duplicating constants also defined in Test.Internal.KernelConstants
//       so if you make any changes here, be sure to synchronize them there!
var virtualDomKernelConstants =
  {
    nodeTypeTagger: 4,
    nodeTypeThunk: 5,
    kids: "e",
    refs: "l",
    thunk: "m",
    node: "k",
    value: "a"
  }

function forceThunks(vNode) {
  if (typeof vNode !== "undefined" && vNode.$ === "#2") {
    // This is a tuple (the kids : List (String, Html) field of a Keyed node); recurse into the right side of the tuple
    vNode.b = forceThunks(vNode.b);
  }
  if (typeof vNode !== 'undefined' && vNode.$ === virtualDomKernelConstants.nodeTypeThunk && !vNode[virtualDomKernelConstants.node]) {
    // This is a lazy node; evaluate it
    var args = vNode[virtualDomKernelConstants.thunk];
    vNode[virtualDomKernelConstants.node] = vNode[virtualDomKernelConstants.thunk].apply(args);
    // And then recurse into the evaluated node
    vNode[virtualDomKernelConstants.node] = forceThunks(vNode[virtualDomKernelConstants.node]);
  }
  if (typeof vNode !== 'undefined' && vNode.$ === virtualDomKernelConstants.nodeTypeTagger) {
    // This is an Html.map; recurse into the node it is wrapping
    vNode[virtualDomKernelConstants.node] = forceThunks(vNode[virtualDomKernelConstants.node]);
  }
  if (typeof vNode !== 'undefined' && typeof vNode[virtualDomKernelConstants.kids] !== 'undefined') {
    // This is something with children (either a node with kids : List Html, or keyed with kids : List (String, Html));
    // recurse into the children
    vNode[virtualDomKernelConstants.kids] = vNode[virtualDomKernelConstants.kids].map(forceThunks);
  }
  return vNode;
}

function _HtmlAsJson_toJson(html)
{
  return _Json_wrap(forceThunks(html));
}

function _HtmlAsJson_eventHandler(event)
{
  return event[virtualDomKernelConstants.value];
}

function _HtmlAsJson_taggerFunction(tagger)
{
  return tagger.a;
}

function _HtmlAsJson_attributeToJson(attribute)
{
  return _Json_wrap(attribute);
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $author$project$Test$Reporter$Reporter$JsonReport = {$: 'JsonReport'};
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$core$Basics$mul = _Basics_mul;
var $author$project$TestData$allPosts = _List_fromArray(
	[
		{
		by: 'rahimnathwani',
		id: 42039296,
		score: 78,
		time: $elm$time$Time$millisToPosix(1730704767 * 1000),
		title: 'Shaderblocks: Block-based image editing',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://thejenkinscomic.net/shaderblocks/')
	},
		{
		by: 'Terretta',
		id: 42098236,
		score: 102,
		time: $elm$time$Time$millisToPosix(1731205592 * 1000),
		title: 'Physical Intelligence\'s first generalist policy AI can finally do your laundry',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.physicalintelligence.company/blog/pi0')
	},
		{
		by: 'kaathewise',
		id: 42095292,
		score: 445,
		time: $elm$time$Time$millisToPosix(1731170179 * 1000),
		title: 'IronCalc – Open-Source Spreadsheet Engine',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.ironcalc.com/')
	},
		{
		by: 'pil0u',
		id: 42095580,
		score: 453,
		time: $elm$time$Time$millisToPosix(1731173250 * 1000),
		title: 'OpenCoder: Open Cookbook for Top-Tier Code Large Language Models',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://opencoder-llm.github.io/')
	},
		{
		by: 'kengoa',
		id: 42096837,
		score: 134,
		time: $elm$time$Time$millisToPosix(1731185651 * 1000),
		title: 'Show HN: Visprex – Open-source, in-browser data visualisation tool for CSV files',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://docs.visprex.com/')
	},
		{
		by: 'thunderbong',
		id: 42098491,
		score: 39,
		time: $elm$time$Time$millisToPosix(1731211057 * 1000),
		title: 'Audio Decomposition – open-source seperation of music to constituent instruments',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://matthew-bird.com/blogs/Audio-Decomposition.html')
	},
		{
		by: 'drogus',
		id: 42095879,
		score: 207,
		time: $elm$time$Time$millisToPosix(1731176070 * 1000),
		title: 'Show HN: Jaws – a JavaScript to WASM ahead-of-time compiler',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://github.com/drogus/jaws')
	},
		{
		by: 'gregsadetsky',
		id: 42096717,
		score: 201,
		time: $elm$time$Time$millisToPosix(1731184504 * 1000),
		title: 'NYC Subway Station Layouts',
		type_: 'story',
		url: $elm$core$Maybe$Just('http://www.projectsubwaynyc.com/gallery')
	},
		{
		by: 'todsacerdoti',
		id: 42050954,
		score: 188,
		time: $elm$time$Time$millisToPosix(1730809388 * 1000),
		title: 'Zig\'s (.{}){} Syntax',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.openmymind.net/Zigs-weird-syntax/')
	},
		{
		by: 'sshroot',
		id: 42094546,
		score: 117,
		time: $elm$time$Time$millisToPosix(1731161904 * 1000),
		title: 'FrontierMath: A benchmark for evaluating advanced mathematical reasoning in AI',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://epochai.org/frontiermath/the-benchmark')
	},
		{
		by: 'mhb',
		id: 42097856,
		score: 65,
		time: $elm$time$Time$millisToPosix(1731199914 * 1000),
		title: 'A skeleton made from the bones of at least eight people thousands of years apart',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.smithsonianmag.com/smart-news/archaeologists-are-bewildered-by-a-skeleton-made-from-the-bones-of-at-least-eight-people-who-died-thousands-of-years-apart-180985419/')
	},
		{
		by: 'p4bl0',
		id: 42093756,
		score: 361,
		time: $elm$time$Time$millisToPosix(1731150370 * 1000),
		title: 'Mergiraf: a syntax-aware merge driver for Git',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://mergiraf.org/')
	},
		{
		by: 'ossusermivami',
		id: 42044426,
		score: 17,
		time: $elm$time$Time$millisToPosix(1730744179 * 1000),
		title: 'Measuring keyboard-to-photon latency with a light sensor (2023)',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://thume.ca/2020/05/20/making-a-latency-tester/')
	},
		{
		by: 'tndata',
		id: 42057964,
		score: 13,
		time: $elm$time$Time$millisToPosix(1730879941 * 1000),
		title: 'Pushed Authorization Requests (Par) in Asp.net Core 9',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://nestenius.se/net/pushed-authorization-requests-par-in-asp-net-core-9/')
	},
		{
		by: 'rramadass',
		id: 42060750,
		score: 10,
		time: $elm$time$Time$millisToPosix(1730894379 * 1000),
		title: 'Mind-Bending Soviet Era Oil Rig City on the Caspian Sea',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.cnn.com/2024/11/06/climate/oil-rocks-neft-daslari-caspian-sea-city/index.html')
	},
		{
		by: 'todsacerdoti',
		id: 42098466,
		score: 18,
		time: $elm$time$Time$millisToPosix(1731210352 * 1000),
		title: 'GenMC: Model checking for concurrent C programs',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://plv.mpi-sws.org/genmc/')
	},
		{
		by: 'JohannesKauf',
		id: 42093511,
		score: 294,
		time: $elm$time$Time$millisToPosix(1731145688 * 1000),
		title: 'Show HN: HTML-to-Markdown – convert entire websites to Markdown with Golang/CLI',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://github.com/JohannesKaufmann/html-to-markdown')
	},
		{
		by: 'cybersoyuz',
		id: 42097261,
		score: 221,
		time: $elm$time$Time$millisToPosix(1731190643 * 1000),
		title: 'Grim Fandango',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.filfre.net/2024/11/grim-fandango/')
	},
		{
		by: 'wsintra2022',
		id: 42095752,
		score: 103,
		time: $elm$time$Time$millisToPosix(1731174929 * 1000),
		title: 'Early Cascade Injection: From Windows process creation to stealthy injection',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.outflank.nl/blog/2024/10/15/introducing-early-cascade-injection-from-windows-process-creation-to-stealthy-injection/')
	},
		{
		by: 'jackcook',
		id: 42095302,
		score: 147,
		time: $elm$time$Time$millisToPosix(1731170288 * 1000),
		title: 'When machine learning tells the wrong story',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://jackcook.com/2024/11/09/bigger-fish.html')
	},
		{
		by: 'Hooke',
		id: 42070630,
		score: 20,
		time: $elm$time$Time$millisToPosix(1730932654 * 1000),
		title: 'Hard Cases for a Handle Theory',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.cabinetmagazine.org/issues/68/dolven.php')
	},
		{
		by: 'PaulHoule',
		id: 42093037,
		score: 192,
		time: $elm$time$Time$millisToPosix(1731137276 * 1000),
		title: 'Texture-Less Text Rendering',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://poniesandlight.co.uk/reflect/debug_print_text/')
	},
		{
		by: 'azhenley',
		id: 42096915,
		score: 143,
		time: $elm$time$Time$millisToPosix(1731186641 * 1000),
		title: 'You too can write a book',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://parentheticallyspeaking.org/articles/write-a-book/')
	},
		{
		by: 'janandonly',
		id: 42026251,
		score: 197,
		time: $elm$time$Time$millisToPosix(1730553845 * 1000),
		title: 'Obtainium: Get Android App Updates Directly from the Source',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://obtainium.imranr.dev/')
	},
		{
		by: 'walterbell',
		id: 42078469,
		score: 173,
		time: $elm$time$Time$millisToPosix(1730998838 * 1000),
		title: 'Since the \'60s, Ford has stored cars underground in a Kansas City cave',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.hagerty.com/media/automotive-history/since-the-60s-ford-has-stored-cars-underground-in-a-kansas-city-cave/')
	},
		{
		by: 'mindracer',
		id: 42093851,
		score: 129,
		time: $elm$time$Time$millisToPosix(1731152008 * 1000),
		title: 'Somebody moved the UK\'s oldest satellite in the mid 1970s, but no one knows who',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.bbc.co.uk/news/articles/cpwrr58801yo')
	},
		{
		by: 'dataminer',
		id: 42094573,
		score: 520,
		time: $elm$time$Time$millisToPosix(1731162210 * 1000),
		title: 'Scientist treated her own cancer with viruses she grew in the lab',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.nature.com/articles/d41586-024-03647-0')
	},
		{
		by: 'k4k4',
		id: 42097735,
		score: 13,
		time: $elm$time$Time$millisToPosix(1731197711 * 1000),
		title: 'Show HN: Dracan – Open-source, 1:1 proxy with simple filtering/validation config',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://github.com/Veinar/dracan')
	},
		{
		by: 'impish9208',
		id: 42090704,
		score: 140,
		time: $elm$time$Time$millisToPosix(1731102260 * 1000),
		title: 'Notes on Guyana',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://mattlakeman.org/2024/11/08/notes-on-guyana/')
	},
		{
		by: 'robinhouston',
		id: 42031642,
		score: 299,
		time: $elm$time$Time$millisToPosix(1730618880 * 1000),
		title: 'Can humans say the largest prime number before we find the next one?',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://saytheprime.com/')
	},
		{
		by: 'whereistimbo',
		id: 42097160,
		score: 16,
		time: $elm$time$Time$millisToPosix(1731189514 * 1000),
		title: 'UnifiedPush: A decentralized, open-source push notification protocol',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://f-droid.org/2022/12/18/unifiedpush.html')
	},
		{
		by: 'lmxyy',
		id: 42093112,
		score: 164,
		time: $elm$time$Time$millisToPosix(1731138382 * 1000),
		title: 'SVDQuant: 4-Bit Quantization Powers 12B Flux on a 16GB 4090 GPU with 3x Speedup',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://hanlab.mit.edu/blog/svdquant')
	},
		{
		by: 'nateb2022',
		id: 42091365,
		score: 586,
		time: $elm$time$Time$millisToPosix(1731109606 * 1000),
		title: 'Delta: A syntax-highlighting pager for Git, diff, grep, and blame output',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://github.com/dandavison/delta')
	},
		{
		by: 'zdw',
		id: 42035990,
		score: 80,
		time: $elm$time$Time$millisToPosix(1730666876 * 1000),
		title: 'A Brief History of Cyrix',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.abortretry.fail/p/a-brief-history-of-cyrix')
	},
		{
		by: 'NaOH',
		id: 42045830,
		score: 44,
		time: $elm$time$Time$millisToPosix(1730753259 * 1000),
		title: 'The Saturn V FUELDRAULIC Gimbal System (1963)',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.powermotiontech.com/hydraulics/hydraulic-fluids/article/21887406/the-saturn-v-fueldraulic-gimbal-system')
	},
		{
		by: 'amrrs',
		id: 42043967,
		score: 121,
		time: $elm$time$Time$millisToPosix(1730741777 * 1000),
		title: 'A CC-By Open-Source TTS Model with Voice Cloning',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://huggingface.co/OuteAI/OuteTTS-0.1-350M')
	},
		{
		by: 'Liriel',
		id: 42098982,
		score: 7,
		time: $elm$time$Time$millisToPosix(1731224791 * 1000),
		title: 'Judge tosses publishers\' copyright suit against OpenAI',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.theregister.com/2024/11/08/openai_copyright_suit_dismissed/')
	},
		{
		by: 'surprisetalk',
		id: 42087560,
		score: 173,
		time: $elm$time$Time$millisToPosix(1731079767 * 1000),
		title: 'Making Electronic Calipers',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://kevinlynagh.com/calipertron/')
	},
		{
		by: 'benchmarkist',
		id: 42098880,
		score: 12,
		time: $elm$time$Time$millisToPosix(1731222155 * 1000),
		title: 'Earth Could Be Alien to Humans by 2500 (2021)',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.scientificamerican.com/article/earth-could-be-alien-to-humans-by-2500/')
	},
		{
		by: 'che_shr_cat',
		id: 42097418,
		score: 6,
		time: $elm$time$Time$millisToPosix(1731192687 * 1000),
		title: 'Diffusion Models Are Evolutionary Algorithms',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://gonzoml.substack.com/p/diffusion-models-are-evolutionary')
	},
		{
		by: 'ZeroGravitas',
		id: 42045373,
		score: 362,
		time: $elm$time$Time$millisToPosix(1730749756 * 1000),
		title: 'HPV vaccination: How the world can eliminate cervical cancer',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://ourworldindata.org/hpv-vaccination-world-can-eliminate-cervical-cancer')
	},
		{
		by: 'Bostonian',
		id: 42089740,
		score: 71,
		time: $elm$time$Time$millisToPosix(1731094103 * 1000),
		title: 'Algol-68 seemed like a good idea',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://craftofcoding.wordpress.com/2024/10/21/algol-68-seemed-like-a-good-idea-until-it-wasnt/')
	},
		{
		by: 'hn_acker',
		id: 42047027,
		score: 278,
		time: $elm$time$Time$millisToPosix(1730761948 * 1000),
		title: 'Ticketmaster’s attempt to game arbitration services fails',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://blog.ericgoldman.org/archives/2024/10/ticketmasters-gaming-of-arbitration-services-fails-heckman-v-live-nation.htm')
	},
		{
		by: 'vivekd',
		id: 42094427,
		score: 222,
		time: $elm$time$Time$millisToPosix(1731160413 * 1000),
		title: 'Memories are not only in the brain, human cell study finds',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://medicalxpress.com/news/2024-11-memories-brain-human-cell.html')
	},
		{
		by: 'Qision',
		id: 42075467,
		score: 55,
		time: $elm$time$Time$millisToPosix(1730975945 * 1000),
		title: 'Lynis – Security auditing and hardening tool, for Unix-based systems',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://github.com/CISOfy/lynis')
	},
		{
		by: 'transpute',
		id: 42084588,
		score: 560,
		time: $elm$time$Time$millisToPosix(1731046214 * 1000),
		title: 'Multiple new macOS sandbox escape vulnerabilities',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://jhftss.github.io/A-New-Era-of-macOS-Sandbox-Escapes/')
	},
		{
		by: 'breezykermo',
		id: 42056654,
		score: 110,
		time: $elm$time$Time$millisToPosix(1730856574 * 1000),
		title: 'Using Two ReMarkables',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.ohrg.org/using-two-remarkables')
	},
		{
		by: 'djoldman',
		id: 42094240,
		score: 37,
		time: $elm$time$Time$millisToPosix(1731158106 * 1000),
		title: 'The Arsse – The clean and modern RSS server that doesn\'t give you any crap',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://thearsse.com/')
	},
		{
		by: 'biorach',
		id: 42068510,
		score: 99,
		time: $elm$time$Time$millisToPosix(1730923589 * 1000),
		title: 'Funding restored for man-page maintenance',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://lwn.net/Articles/997193/')
	},
		{
		by: 'alexzeitler',
		id: 42090430,
		score: 351,
		time: $elm$time$Time$millisToPosix(1731099587 * 1000),
		title: 'I quit Google to work for myself (2018)',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://mtlynch.io/why-i-quit-google/')
	},
		{
		by: 'xiande04',
		id: 42034305,
		score: 171,
		time: $elm$time$Time$millisToPosix(1730653782 * 1000),
		title: 'Claude Shannon: Mathematician, engineer, genius and juggler (2017)',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.juggle.org/claude-shannon-mathematician-engineer-genius-juggler/')
	},
		{
		by: 'tosh',
		id: 42081874,
		score: 208,
		time: $elm$time$Time$millisToPosix(1731018873 * 1000),
		title: 'Cops suspect iOS 18 iPhones are communicating to force reboots',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.macrumors.com/2024/11/07/ios-18-forcing-reboots-law-enforcement/')
	},
		{
		by: 'thunderbong',
		id: 42039184,
		score: 452,
		time: $elm$time$Time$millisToPosix(1730703383 * 1000),
		title: 'In Memory of Stiver',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://blog.jetbrains.com/idea/2024/11/in-memory-of-stiver/')
	},
		{
		by: 'CharlesW',
		id: 42084080,
		score: 506,
		time: $elm$time$Time$millisToPosix(1731039359 * 1000),
		title: 'Stabilizing the Obra Dinn 1-bit dithering process (2017)',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://forums.tigsource.com/index.php?topic=40832.msg1363742#msg1363742')
	},
		{
		by: 'XzetaU8',
		id: 42087517,
		score: 38,
		time: $elm$time$Time$millisToPosix(1731079336 * 1000),
		title: 'Gravity\'s Eastern Voyage',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://royalsociety.org/blog/2024/09/gravitys-eastern-voyage/')
	},
		{
		by: 'lapnect',
		id: 42058888,
		score: 23,
		time: $elm$time$Time$millisToPosix(1730886723 * 1000),
		title: 'Iterative α-(de)blending and Stochastic Interpolants',
		type_: 'story',
		url: $elm$core$Maybe$Just('http://nicktasios.nl/posts/iterative-alpha-deblending/')
	},
		{
		by: 'mlajtos',
		id: 42090633,
		score: 160,
		time: $elm$time$Time$millisToPosix(1731101503 * 1000),
		title: 'My Notes on Apple Math Notes',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://mlajtos.mu/posts/new-kind-of-paper-5')
	},
		{
		by: 'dcas',
		id: 42097132,
		score: 10,
		time: $elm$time$Time$millisToPosix(1731189168 * 1000),
		title: 'How Shopify built the BFCM 2023 globe',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://shopify.engineering/how-we-built-shopifys-bfcm-2023-globe')
	},
		{
		by: 'mediisoccuspupa',
		id: 42041355,
		score: 89,
		time: $elm$time$Time$millisToPosix(1730727057 * 1000),
		title: 'Python Logic Simulation Library',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://github.com/cjdrake/seqlogic')
	},
		{
		by: 'amalinovic',
		id: 42059650,
		score: 82,
		time: $elm$time$Time$millisToPosix(1730889639 * 1000),
		title: 'Optimize Database Performance in Ruby on Rails and ActiveRecord',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://blog.appsignal.com/2024/10/30/optimize-database-performance-in-ruby-on-rails-and-activerecord.html')
	},
		{
		by: 'benbreen',
		id: 42092700,
		score: 34,
		time: $elm$time$Time$millisToPosix(1731130096 * 1000),
		title: 'Reconstruction of Lomonosov\'s Discovery of Venus\'s Atmosphere (2012) [pdf]',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://lss.fnal.gov/archive/2012/pub/fermilab-pub-12-937-apc.pdf')
	},
		{
		by: '_Microft',
		id: 42097815,
		score: 24,
		time: $elm$time$Time$millisToPosix(1731199170 * 1000),
		title: 'Egypt is certified malaria-free by WHO',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.who.int/news/item/20-10-2024-egypt-is-certified-malaria-free-by-who')
	},
		{
		by: 'surprisetalk',
		id: 42089196,
		score: 91,
		time: $elm$time$Time$millisToPosix(1731090180 * 1000),
		title: 'Why 4D geometry makes me sad [video]',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.youtube.com/watch?v=piJkuavhV50')
	},
		{
		by: 'networked',
		id: 42093541,
		score: 19,
		time: $elm$time$Time$millisToPosix(1731146369 * 1000),
		title: 'Cache Directory Tagging Specification (2004)',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://bford.info/cachedir/')
	},
		{
		by: 'surprisetalk',
		id: 42041129,
		score: 23,
		time: $elm$time$Time$millisToPosix(1730725247 * 1000),
		title: 'Automat: A tangible interface for virtual things',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://automat.org')
	},
		{
		by: 'okl',
		id: 42091724,
		score: 56,
		time: $elm$time$Time$millisToPosix(1731113851 * 1000),
		title: 'A Random Walk Through Ada (2014)',
		type_: 'story',
		url: $elm$core$Maybe$Just('http://cowlark.com/2014-04-27-ada/index.html')
	},
		{
		by: 'szkosma',
		id: 42028697,
		score: 59,
		time: $elm$time$Time$millisToPosix(1730576356 * 1000),
		title: 'Nikolai Fyodorov wanted to resurrect the dead to live among the stars',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://lz.kubicki.org/a-letter-about-nikolai-fyodorov/')
	},
		{
		by: 'wglb',
		id: 42055238,
		score: 8,
		time: $elm$time$Time$millisToPosix(1730841346 * 1000),
		title: 'ML analysis tracks the evolution of 16th-century European astronomical thought',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://phys.org/news/2024-10-machine-analysis-tracks-evolution-16th.html')
	},
		{
		by: 'impish9208',
		id: 42082998,
		score: 286,
		time: $elm$time$Time$millisToPosix(1731027409 * 1000),
		title: 'FDA proposes ending use of oral phenylephrine as OTC nasal decongestant',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.fda.gov/news-events/press-announcements/fda-proposes-ending-use-oral-phenylephrine-otc-monograph-nasal-decongestant-active-ingredient-after')
	},
		{
		by: 'fanf2',
		id: 42050573,
		score: 16,
		time: $elm$time$Time$millisToPosix(1730805295 * 1000),
		title: 'HashML-DSA Considered Harmful',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://keymaterial.net/2024/11/05/hashml-dsa-considered-harmful/')
	},
		{
		by: 'icy',
		id: 42086596,
		score: 133,
		time: $elm$time$Time$millisToPosix(1731071615 * 1000),
		title: 'How to self-host all of Bluesky except the AppView (for now)',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://alice.bsky.sh/post/3laega7icmi2q')
	},
		{
		by: 'asiffer',
		id: 42094893,
		score: 6,
		time: $elm$time$Time$millisToPosix(1731165846 * 1000),
		title: 'Show HN: Svgg – Turn raw SVG into image link',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://svgg.link')
	},
		{
		by: 'mitchbob',
		id: 42081309,
		score: 43,
		time: $elm$time$Time$millisToPosix(1731015222 * 1000),
		title: 'The Charms of Catastrophe (1978)',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.nybooks.com/articles/1978/06/15/the-charms-of-catastrophe/')
	},
		{
		by: 'mailyk',
		id: 42088758,
		score: 611,
		time: $elm$time$Time$millisToPosix(1731087583 * 1000),
		title: 'Mitochondria Are Alive',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.asimov.press/p/mitochondria')
	},
		{
		by: 'dargscisyhp',
		id: 42098921,
		score: 14,
		time: $elm$time$Time$millisToPosix(1731223327 * 1000),
		title: 'Brewington Hardaway Becomes First U.S. Born Black Grandmaster',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.chess.com/news/view/brewington-hardaway-earns-gm-title')
	},
		{
		by: 'JNRowe',
		id: 42076200,
		score: 201,
		time: $elm$time$Time$millisToPosix(1730983829 * 1000),
		title: 'Excerpts from a conversation about personal information management',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://sachachua.com/blog/2024/11/excerpts-from-a-conversation-with-john-wiegley-johnw-and-adam-porter-alphapapa-about-personal-information-management/')
	},
		{
		by: 'threeme3',
		id: 42085273,
		score: 236,
		time: $elm$time$Time$millisToPosix(1731054654 * 1000),
		title: 'Λ-2D: An Exploration of Drawing as Programming Language',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.media.mit.edu/projects/2d-an-exploration-of-drawing-as-programming-language-featuring-ideas-from-lambda-calculus/overview/')
	},
		{
		by: 'lapnect',
		id: 42084779,
		score: 73,
		time: $elm$time$Time$millisToPosix(1731048862 * 1000),
		title: 'The \'Invisibility Cloak\' – Slash-Proc Magic',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://dfir.ch/posts/slash-proc/')
	},
		{
		by: 'abe94',
		id: 42088250,
		score: 85,
		time: $elm$time$Time$millisToPosix(1731084339 * 1000),
		title: 'Colors of the Court – NBA Uniforms',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://pudding.cool/2024/10/nba-uniforms/')
	},
		{
		by: 'chr15m',
		id: 42085036,
		score: 319,
		time: $elm$time$Time$millisToPosix(1731051782 * 1000),
		title: 'Show HN: Asterogue, my sci-fi roguelike, is now playable on the web',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://asterogue.com')
	},
		{
		by: 'skandium',
		id: 42084977,
		score: 219,
		time: $elm$time$Time$millisToPosix(1731051031 * 1000),
		title: 'Perceptually lossless (talking head) video compression at 22kbit/s',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://mlumiste.com/technical/liveportrait-compression/')
	},
		{
		by: 'galapago',
		id: 42095005,
		score: 9,
		time: $elm$time$Time$millisToPosix(1731167200 * 1000),
		title: 'ScummVM adds support for Castle Master (1990)',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.scummvm.org/news/20241109/')
	},
		{
		by: 'pwim',
		id: 42072647,
		score: 195,
		time: $elm$time$Time$millisToPosix(1730946278 * 1000),
		title: 'The English Paradox: Four decades of life and language in Japan',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.tokyodev.com/articles/the-english-paradox-four-decades-of-life-and-language-in-japan')
	},
		{
		by: 'mentalgear',
		id: 42074348,
		score: 125,
		time: $elm$time$Time$millisToPosix(1730964032 * 1000),
		title: 'URAvatar: Universal Relightable Gaussian Codec Avatars',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://junxuan-li.github.io/urgca-website/')
	},
		{
		by: 'yoshuaw',
		id: 42078476,
		score: 165,
		time: $elm$time$Time$millisToPosix(1730998891 * 1000),
		title: 'Hyperlight: Virtual machine-based security for functions at scale',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://opensource.microsoft.com/blog/2024/11/07/introducing-hyperlight-virtual-machine-based-security-for-functions-at-scale/')
	},
		{
		by: 'tessierashpool9',
		id: 42086987,
		score: 43,
		time: $elm$time$Time$millisToPosix(1731075197 * 1000),
		title: 'Toy Models of Superposition (2022)',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://transformer-circuits.pub/2022/toy_model/index.html#motivation')
	},
		{
		by: 'timbilt',
		id: 42085665,
		score: 227,
		time: $elm$time$Time$millisToPosix(1731059904 * 1000),
		title: 'LoRA vs. Full Fine-Tuning: An Illusion of Equivalence',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://arxiv.org/abs/2410.21228')
	},
		{
		by: 'lightlyused',
		id: 42097961,
		score: 51,
		time: $elm$time$Time$millisToPosix(1731201517 * 1000),
		title: 'Stargate built 15 years ago in Ohio 50k pounds concrete family time',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.usatoday.com/story/news/nation/2024/11/08/stargate-built-by-family-in-ohio/76133926007/')
	},
		{
		by: 'todsacerdoti',
		id: 42094562,
		score: 7,
		time: $elm$time$Time$millisToPosix(1731162103 * 1000),
		title: 'Mergiraf: A syntax-aware merge driver for Git',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://antonin.delpeuch.eu/posts/mergiraf-a-syntax-aware-merge-driver-for-git/')
	},
		{
		by: 'lawls',
		id: 42091043,
		score: 230,
		time: $elm$time$Time$millisToPosix(1731105740 * 1000),
		title: 'Claude AI to process secret government data through new Palantir deal',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://arstechnica.com/ai/2024/11/safe-ai-champ-anthropic-teams-up-with-defense-giant-palantir-in-new-deal/')
	},
		{
		by: 'bbayles',
		id: 42076884,
		score: 448,
		time: $elm$time$Time$millisToPosix(1730989530 * 1000),
		title: 'Using Ghidra and Python to reverse engineer Ecco the Dolphin',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://32bits.substack.com/p/under-the-microscope-ecco-the-dolphin')
	},
		{
		by: 'CarefreeCrayon',
		id: 42090771,
		score: 143,
		time: $elm$time$Time$millisToPosix(1731102940 * 1000),
		title: 'What Is a Staff Engineer?',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://nishtahir.com/what-is-a-staff-engineer/')
	},
		{
		by: 'MrBuddyCasino',
		id: 42084344,
		score: 79,
		time: $elm$time$Time$millisToPosix(1731042565 * 1000),
		title: 'Intentrace: Strace for Everyone',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://github.com/sectordistrict/intentrace')
	},
		{
		by: 'benbreen',
		id: 42074124,
		score: 74,
		time: $elm$time$Time$millisToPosix(1730961997 * 1000),
		title: 'The Brothers Grimm: A Biography',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://theamericanscholar.org/masters-of-horror-and-magic/')
	},
		{
		by: 'tysone',
		id: 42087087,
		score: 163,
		time: $elm$time$Time$millisToPosix(1731076149 * 1000),
		title: 'Elwood Edwards, voice of AOL\'s \'you\'ve got mail\' alert, has died',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.nytimes.com/2024/11/07/technology/elwood-edwards-aol-dead.html')
	},
		{
		by: 'kristianp',
		id: 42082841,
		score: 13,
		time: $elm$time$Time$millisToPosix(1731026310 * 1000),
		title: 'Converting ASCII strings to lower case at crazy speeds with AVX-512',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://lemire.me/blog/2024/08/03/converting-ascii-strings-to-lower-case-at-crazy-speeds-with-avx-512/')
	},
		{
		by: 'gaws',
		id: 42078581,
		score: 333,
		time: $elm$time$Time$millisToPosix(1730999559 * 1000),
		title: 'Mushroom Color Atlas',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.mushroomcoloratlas.com/')
	},
		{
		by: 'Soumame',
		id: 42072709,
		score: 125,
		time: $elm$time$Time$millisToPosix(1730946764 * 1000),
		title: 'Show HN: TutoriaLLM – AI Integrated programming tutorials',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://github.com/TutoriaLLM/TutoriaLLM')
	},
		{
		by: 'sschueller',
		id: 42075365,
		score: 49,
		time: $elm$time$Time$millisToPosix(1730974812 * 1000),
		title: 'A mod that turns TI-84 calculators into GPT-based cheating device',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://github.com/chromalock/TI-32')
	},
		{
		by: 'bookofjoe',
		id: 42078826,
		score: 58,
		time: $elm$time$Time$millisToPosix(1731000685 * 1000),
		title: 'Imaging shapes of atomic nuclei in high-energy nuclear collisions',
		type_: 'story',
		url: $elm$core$Maybe$Just('https://www.nature.com/articles/s41586-024-08097-2')
	}
	]);
var $elm$core$Debug$todo = _Debug_todo;
var $author$project$Test$Runner$Node$checkHelperReplaceMe___ = function (_v0) {
	return _Debug_todo(
		'Test.Runner.Node',
		{
			start: {line: 362, column: 5},
			end: {line: 362, column: 15}
		})('The regex for replacing this Debug.todo with some real code must have failed since you see this message!\n\nPlease report this bug: https://github.com/rtfeldman/node-test-runner/issues/new\n');
};
var $author$project$Test$Runner$Node$check = value => value && value.__elmTestSymbol === __elmTestSymbol ? $elm$core$Maybe$Just(value) : $elm$core$Maybe$Nothing;
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$PostTests$requiredFields = _List_fromArray(
	[
		_Utils_Tuple2(
		'by',
		$elm$json$Json$Encode$string('Tepix')),
		_Utils_Tuple2(
		'id',
		$elm$json$Json$Encode$int(38141366)),
		_Utils_Tuple2(
		'score',
		$elm$json$Json$Encode$int(557)),
		_Utils_Tuple2(
		'time',
		$elm$json$Json$Encode$int(1699108556)),
		_Utils_Tuple2(
		'title',
		$elm$json$Json$Encode$string('Othello Is Solved?')),
		_Utils_Tuple2(
		'type',
		$elm$json$Json$Encode$string('story'))
	]);
var $author$project$PostTests$fields = A2(
	$elm$core$List$cons,
	_Utils_Tuple2(
		'url',
		$elm$json$Json$Encode$string('https://arxiv.org/abs/2310.19387')),
	$author$project$PostTests$requiredFields);
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$PostTests$completePost = $elm$json$Json$Encode$object($author$project$PostTests$fields);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$TestData$posts = A2($elm$core$List$take, 20, $author$project$TestData$allPosts);
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$PostsViewTests$currentTime = $elm$time$Time$millisToPosix(
	A2(
		$elm$core$Maybe$withDefault,
		0,
		A2(
			$elm$core$Maybe$map,
			function (t) {
				return t + ((((7 * 24) * 60) * 60) * 1000);
			},
			$elm$core$List$maximum(
				A2(
					$elm$core$List$map,
					function (post) {
						return $elm$time$Time$posixToMillis(post.time);
					},
					$author$project$TestData$posts)))));
var $author$project$PostTests$fieldNames = A2($elm$core$List$map, $elm$core$Tuple$first, $author$project$PostTests$requiredFields);
var $author$project$Model$Dev = {$: 'Dev'};
var $author$project$Main$devFlags = {apiUrl: 'http://localhost:3000', mode: $author$project$Model$Dev};
var $author$project$TestData$encodePost = function (post) {
	var fields = _Utils_ap(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'by',
				$elm$json$Json$Encode$string(post.by)),
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$int(post.id)),
				_Utils_Tuple2(
				'score',
				$elm$json$Json$Encode$int(post.score)),
				_Utils_Tuple2(
				'time',
				$elm$json$Json$Encode$int(
					($elm$time$Time$posixToMillis(post.time) / 1000) | 0)),
				_Utils_Tuple2(
				'title',
				$elm$json$Json$Encode$string(post.title)),
				_Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string(post.type_))
			]),
		A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				function (url) {
					return _List_fromArray(
						[
							_Utils_Tuple2(
							'url',
							$elm$json$Json$Encode$string(url))
						]);
				},
				post.url)));
	return A2(
		$elm$json$Json$Encode$encode,
		2,
		$elm$json$Json$Encode$object(fields));
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $avh4$elm_program_test$ProgramTest$Created = function (a) {
	return {$: 'Created', a: a};
};
var $avh4$elm_program_test$ProgramTest$FailedToCreate = function (a) {
	return {$: 'FailedToCreate', a: a};
};
var $avh4$elm_program_test$TestResult$fail = F2(
	function (failure, state) {
		return $elm$core$Result$Err(
			{reason: failure});
	});
var $avh4$elm_program_test$TestResult$andThen = F2(
	function (f, testResult) {
		if (testResult.$ === 'Ok') {
			var state = testResult.a;
			var _v1 = f(state);
			if (_v1.$ === 'Err') {
				var failure = _v1.a;
				return A2($avh4$elm_program_test$TestResult$fail, failure, state);
			} else {
				var newState = _v1.a;
				return $elm$core$Result$Ok(newState);
			}
		} else {
			return testResult;
		}
	});
var $avh4$elm_program_test$ProgramTest$andThen = F2(
	function (f, programTest) {
		if (programTest.$ === 'Created') {
			var created = programTest.a;
			return $avh4$elm_program_test$ProgramTest$Created(
				_Utils_update(
					created,
					{
						state: A2(
							$avh4$elm_program_test$TestResult$andThen,
							f(created.program),
							created.state)
					}));
		} else {
			var failure = programTest.a;
			return $avh4$elm_program_test$ProgramTest$FailedToCreate(failure);
		}
	});
var $avh4$elm_program_test$ProgramTest$Failure$ExpectFailed = F3(
	function (a, b, c) {
		return {$: 'ExpectFailed', a: a, b: b, c: c};
	});
var $avh4$elm_program_test$ProgramTest$Failure$MultipleMatchingHttpRequest = F5(
	function (a, b, c, d, e) {
		return {$: 'MultipleMatchingHttpRequest', a: a, b: b, c: c, d: d, e: e};
	});
var $avh4$elm_program_test$ProgramTest$Failure$NoMatchingHttpRequest = F5(
	function (a, b, c, d, e) {
		return {$: 'NoMatchingHttpRequest', a: a, b: b, c: c, d: d, e: e};
	});
var $elm_explorations$test$Test$Runner$getFailureReason = function (expectation) {
	if (expectation.$ === 'Pass') {
		return $elm$core$Maybe$Nothing;
	} else {
		var record = expectation.a;
		return $elm$core$Maybe$Just(
			{description: record.description, given: record.given, reason: record.reason});
	}
};
var $avh4$elm_program_test$ProgramTest$checkSingleHttpRequest = F2(
	function (checkRequest, requests) {
		if (!requests.b) {
			return $elm$core$Result$Err(
				A2($avh4$elm_program_test$ProgramTest$Failure$NoMatchingHttpRequest, 1, 0));
		} else {
			if (!requests.b.b) {
				var request = requests.a;
				var _v1 = $elm_explorations$test$Test$Runner$getFailureReason(
					checkRequest(request));
				if (_v1.$ === 'Nothing') {
					return $elm$core$Result$Ok(_Utils_Tuple0);
				} else {
					var reason = _v1.a;
					return $elm$core$Result$Err(
						F3(
							function (functionName, _v2, _v3) {
								return A3($avh4$elm_program_test$ProgramTest$Failure$ExpectFailed, functionName, reason.description, reason.reason);
							}));
				}
			} else {
				var many = requests;
				var _v4 = many.b;
				return $elm$core$Result$Err(
					A2(
						$avh4$elm_program_test$ProgramTest$Failure$MultipleMatchingHttpRequest,
						1,
						$elm$core$List$length(many)));
			}
		}
	});
var $avh4$elm_program_test$ProgramTest$Failure$EffectSimulationNotConfigured = function (a) {
	return {$: 'EffectSimulationNotConfigured', a: a};
};
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $mgold$elm_nonempty_list$List$Nonempty$toList = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return A2($elm$core$List$cons, x, xs);
};
var $avh4$elm_program_test$MultiDict$get = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				$mgold$elm_nonempty_list$List$Nonempty$toList,
				A2($elm$core$Dict$get, key, dict)));
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $mgold$elm_nonempty_list$List$Nonempty$length = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return $elm$core$List$length(xs) + 1;
};
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $avh4$elm_program_test$MultiDict$keys = function (_v0) {
	var dict = _v0.a;
	return A2(
		$elm$core$List$concatMap,
		function (_v1) {
			var k = _v1.a;
			var vs = _v1.b;
			return A2(
				$elm$core$List$repeat,
				$mgold$elm_nonempty_list$List$Nonempty$length(vs),
				k);
		},
		$elm$core$Dict$toList(dict));
};
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $avh4$elm_program_test$ProgramTest$expectHttpRequestHelper = F5(
	function (functionName, method, url, checkRequests, state) {
		var _v0 = state.effectSimulation;
		if (_v0.$ === 'Nothing') {
			return $elm$core$Result$Err(
				$avh4$elm_program_test$ProgramTest$Failure$EffectSimulationNotConfigured(functionName));
		} else {
			var simulation = _v0.a;
			return A2(
				$elm$core$Result$mapError,
				function (f) {
					return A3(
						f,
						functionName,
						{method: method, url: url},
						$avh4$elm_program_test$MultiDict$keys(simulation.state.http));
				},
				A2(
					$elm$core$Result$map,
					function (_v1) {
						return state;
					},
					checkRequests(
						A2(
							$avh4$elm_program_test$MultiDict$get,
							_Utils_Tuple2(method, url),
							simulation.state.http))));
		}
	});
var $avh4$elm_program_test$ProgramTest$ensureHttpRequest = F3(
	function (method, url, checkRequest) {
		return $avh4$elm_program_test$ProgramTest$andThen(
			function (_v0) {
				return A4(
					$avh4$elm_program_test$ProgramTest$expectHttpRequestHelper,
					'ensureHttpRequest',
					method,
					url,
					$avh4$elm_program_test$ProgramTest$checkSingleHttpRequest(checkRequest));
			});
	});
var $elm_explorations$test$Test$Runner$Failure$Equality = F2(
	function (a, b) {
		return {$: 'Equality', a: a, b: b};
	});
var $elm$core$String$contains = _String_contains;
var $elm_explorations$test$Test$Runner$Failure$Custom = {$: 'Custom'};
var $elm_explorations$test$Test$Expectation$Fail = function (a) {
	return {$: 'Fail', a: a};
};
var $elm_explorations$test$Test$Distribution$NoDistribution = {$: 'NoDistribution'};
var $elm_explorations$test$Test$Expectation$fail = function (_v0) {
	var description = _v0.description;
	var reason = _v0.reason;
	return $elm_explorations$test$Test$Expectation$Fail(
		{description: description, distributionReport: $elm_explorations$test$Test$Distribution$NoDistribution, given: $elm$core$Maybe$Nothing, reason: reason});
};
var $elm_explorations$test$Expect$fail = function (str) {
	return $elm_explorations$test$Test$Expectation$fail(
		{description: str, reason: $elm_explorations$test$Test$Runner$Failure$Custom});
};
var $elm$core$Basics$not = _Basics_not;
var $elm_explorations$test$Test$Expectation$Pass = function (a) {
	return {$: 'Pass', a: a};
};
var $elm_explorations$test$Expect$pass = $elm_explorations$test$Test$Expectation$Pass(
	{distributionReport: $elm_explorations$test$Test$Distribution$NoDistribution});
var $elm_explorations$test$Test$Internal$toString = _Debug_toString;
var $elm_explorations$test$Expect$testWith = F5(
	function (makeReason, label, runTest, expected, actual) {
		return A2(runTest, actual, expected) ? $elm_explorations$test$Expect$pass : $elm_explorations$test$Test$Expectation$fail(
			{
				description: label,
				reason: A2(
					makeReason,
					$elm_explorations$test$Test$Internal$toString(expected),
					$elm_explorations$test$Test$Internal$toString(actual))
			});
	});
var $elm$core$String$toFloat = _String_toFloat;
var $elm$core$String$toInt = _String_toInt;
var $elm_explorations$test$Expect$equateWith = F4(
	function (reason, comparison, b, a) {
		var isJust = function (x) {
			if (x.$ === 'Just') {
				return true;
			} else {
				return false;
			}
		};
		var isFloat = function (x) {
			return isJust(
				$elm$core$String$toFloat(x)) && (!isJust(
				$elm$core$String$toInt(x)));
		};
		var usesFloats = isFloat(
			$elm_explorations$test$Test$Internal$toString(a)) || isFloat(
			$elm_explorations$test$Test$Internal$toString(b));
		var floatError = A2($elm$core$String$contains, reason, 'not') ? 'Do not use Expect.notEqual with floats. Use Expect.notWithin instead.' : 'Do not use Expect.equal with floats. Use Expect.within instead.';
		return usesFloats ? $elm_explorations$test$Expect$fail(floatError) : A5($elm_explorations$test$Expect$testWith, $elm_explorations$test$Test$Runner$Failure$Equality, reason, comparison, b, a);
	});
var $elm_explorations$test$Expect$equal = A2($elm_explorations$test$Expect$equateWith, 'Expect.equal', $elm$core$Basics$eq);
var $author$project$TestUtils$ensureHttpGetRequest = function (url) {
	return A3(
		$avh4$elm_program_test$ProgramTest$ensureHttpRequest,
		'GET',
		url,
		function (request) {
			return A2($elm_explorations$test$Expect$equal, '', request.body);
		});
};
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Basics$ge = _Utils_ge;
var $avh4$elm_program_test$Test$Http$httpResponse = function (response) {
	var variant = ((response.statusCode >= 200) && (response.statusCode < 300)) ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_;
	return A2(
		variant,
		{
			headers: $elm$core$Dict$fromList(response.headers),
			statusCode: response.statusCode,
			statusText: 'TODO: if you need this, please report to https://github.com/avh4/elm-program-test/issues',
			url: ''
		},
		response.body);
};
var $avh4$elm_program_test$ProgramTest$Failure$ChangedPage = F2(
	function (a, b) {
		return {$: 'ChangedPage', a: a, b: b};
	});
var $avh4$elm_program_test$ProgramTest$Failure$ProgramDoesNotSupportNavigation = function (a) {
	return {$: 'ProgramDoesNotSupportNavigation', a: a};
};
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $avh4$elm_program_test$PairingHeap$Empty = {$: 'Empty'};
var $avh4$elm_program_test$PairingHeap$Heap = F3(
	function (a, b, c) {
		return {$: 'Heap', a: a, b: b, c: c};
	});
var $avh4$elm_program_test$PairingHeap$merge = F2(
	function (heap1, heap2) {
		var _v0 = _Utils_Tuple2(heap1, heap2);
		if (_v0.a.$ === 'Empty') {
			var _v1 = _v0.a;
			return heap2;
		} else {
			if (_v0.b.$ === 'Empty') {
				var _v2 = _v0.b;
				return heap1;
			} else {
				var _v3 = _v0.a;
				var k1 = _v3.a;
				var v1 = _v3.b;
				var hs1 = _v3.c;
				var _v4 = _v0.b;
				var k2 = _v4.a;
				var v2 = _v4.b;
				var hs2 = _v4.c;
				return (_Utils_cmp(k1, k2) < 0) ? A3(
					$avh4$elm_program_test$PairingHeap$Heap,
					k1,
					v1,
					A2($elm$core$List$cons, heap2, hs1)) : A3(
					$avh4$elm_program_test$PairingHeap$Heap,
					k2,
					v2,
					A2($elm$core$List$cons, heap1, hs2));
			}
		}
	});
var $avh4$elm_program_test$PairingHeap$mergePairs = function (heaps) {
	if (!heaps.b) {
		return $avh4$elm_program_test$PairingHeap$Empty;
	} else {
		if (!heaps.b.b) {
			var x = heaps.a;
			return x;
		} else {
			var x = heaps.a;
			var _v1 = heaps.b;
			var y = _v1.a;
			var xs = _v1.b;
			return A2(
				$avh4$elm_program_test$PairingHeap$merge,
				A2($avh4$elm_program_test$PairingHeap$merge, x, y),
				$avh4$elm_program_test$PairingHeap$mergePairs(xs));
		}
	}
};
var $avh4$elm_program_test$PairingHeap$deleteMin = function (heap) {
	if (heap.$ === 'Empty') {
		return $avh4$elm_program_test$PairingHeap$Empty;
	} else {
		var k = heap.a;
		var v = heap.b;
		var heaps = heap.c;
		return $avh4$elm_program_test$PairingHeap$mergePairs(heaps);
	}
};
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $avh4$elm_program_test$String$Extra$escape = function (s) {
	return '\"' + (s + '\"');
};
var $avh4$elm_program_test$PairingHeap$findMin = function (x) {
	if (x.$ === 'Empty') {
		return $elm$core$Maybe$Nothing;
	} else {
		var k = x.a;
		var v = x.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(k, v));
	}
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $avh4$elm_fifo$Fifo$Fifo = F2(
	function (a, b) {
		return {$: 'Fifo', a: a, b: b};
	});
var $avh4$elm_fifo$Fifo$insert = F2(
	function (a, _v0) {
		var front = _v0.a;
		var back = _v0.b;
		return A2(
			$avh4$elm_fifo$Fifo$Fifo,
			front,
			A2($elm$core$List$cons, a, back));
	});
var $avh4$elm_program_test$ProgramTest$EffectSimulation$queueTask = F2(
	function (task, simulation) {
		return _Utils_update(
			simulation,
			{
				workQueue: A2($avh4$elm_fifo$Fifo$insert, task, simulation.workQueue)
			});
	});
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $avh4$elm_program_test$Url$Extra$parseDoubleDots = F2(
	function (url, pathSegments) {
		parseDoubleDots:
		while (true) {
			if (A2($elm$core$String$startsWith, '../', url)) {
				var $temp$url = A2($elm$core$String$dropLeft, 3, url),
					$temp$pathSegments = A2($elm$core$List$drop, 1, pathSegments);
				url = $temp$url;
				pathSegments = $temp$pathSegments;
				continue parseDoubleDots;
			} else {
				if (A2($elm$core$String$startsWith, '..', url)) {
					var $temp$url = A2($elm$core$String$dropLeft, 2, url),
						$temp$pathSegments = A2($elm$core$List$drop, 1, pathSegments);
					url = $temp$url;
					pathSegments = $temp$pathSegments;
					continue parseDoubleDots;
				} else {
					return A2(
						$elm$core$String$join,
						'/',
						$elm$core$List$reverse(pathSegments)) + ('/' + url);
				}
			}
		}
	});
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.protocol;
		if (_v0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var $avh4$elm_program_test$Url$Extra$resolve = F2(
	function (base, url) {
		var _v0 = $elm$url$Url$fromString(url);
		if (_v0.$ === 'Just') {
			var newUrl = _v0.a;
			return newUrl;
		} else {
			return function (u) {
				return A2(
					$elm$core$Maybe$withDefault,
					u,
					$elm$url$Url$fromString(
						$elm$url$Url$toString(u)));
			}(
				$elm$core$String$isEmpty(url) ? base : (A2($elm$core$String$startsWith, '#', url) ? _Utils_update(
					base,
					{
						fragment: $elm$core$Maybe$Just(
							A2($elm$core$String$dropLeft, 1, url))
					}) : (A2($elm$core$String$startsWith, '?', url) ? _Utils_update(
					base,
					{
						fragment: $elm$core$Maybe$Nothing,
						query: $elm$core$Maybe$Just(
							A2($elm$core$String$dropLeft, 1, url))
					}) : (A2($elm$core$String$startsWith, '//', url) ? _Utils_update(
					base,
					{
						fragment: $elm$core$Maybe$Nothing,
						host: A2($elm$core$String$dropLeft, 2, url),
						path: '',
						query: $elm$core$Maybe$Nothing
					}) : _Utils_update(
					base,
					{
						fragment: $elm$core$Maybe$Nothing,
						path: A2($elm$core$String$startsWith, '/', url) ? url : (((url === '..') || A2($elm$core$String$startsWith, '../', url)) ? A2(
							$avh4$elm_program_test$Url$Extra$parseDoubleDots,
							url,
							A2(
								$elm$core$List$drop,
								1,
								$elm$core$List$reverse(
									A2($elm$core$String$split, '/', base.path)))) : A2(
							$elm$core$String$join,
							'/',
							function (l) {
								return _Utils_ap(
									l,
									A2(
										$elm$core$String$split,
										'/',
										A2($elm$core$String$startsWith, './', url) ? A2($elm$core$String$dropLeft, 2, url) : (A2($elm$core$String$startsWith, '.', url) ? A2($elm$core$String$dropLeft, 1, url) : url)));
							}(
								$elm$core$List$reverse(
									A2(
										$elm$core$List$drop,
										1,
										$elm$core$List$reverse(
											A2($elm$core$String$split, '/', base.path))))))),
						query: $elm$core$Maybe$Nothing
					})))));
		}
	});
var $avh4$elm_program_test$ProgramTest$Failure$NoBaseUrl = F2(
	function (a, b) {
		return {$: 'NoBaseUrl', a: a, b: b};
	});
var $avh4$elm_program_test$TestState$simulateLoadUrlHelper = F3(
	function (functionDescription, href, state) {
		var _v0 = A2(
			$elm$core$Maybe$map,
			function ($) {
				return $.currentLocation;
			},
			state.navigation);
		if (_v0.$ === 'Just') {
			var location = _v0.a;
			return A2(
				$avh4$elm_program_test$ProgramTest$Failure$ChangedPage,
				functionDescription,
				A2($avh4$elm_program_test$Url$Extra$resolve, location, href));
		} else {
			var _v1 = $elm$url$Url$fromString(href);
			if (_v1.$ === 'Nothing') {
				return A2($avh4$elm_program_test$ProgramTest$Failure$NoBaseUrl, functionDescription, href);
			} else {
				var location = _v1.a;
				return A2($avh4$elm_program_test$ProgramTest$Failure$ChangedPage, functionDescription, location);
			}
		}
	});
var $avh4$elm_fifo$Fifo$empty = A2($avh4$elm_fifo$Fifo$Fifo, _List_Nil, _List_Nil);
var $avh4$elm_fifo$Fifo$remove = function (fifo) {
	if (!fifo.a.b) {
		if (!fifo.b.b) {
			return _Utils_Tuple2($elm$core$Maybe$Nothing, $avh4$elm_fifo$Fifo$empty);
		} else {
			var back = fifo.b;
			return $avh4$elm_fifo$Fifo$remove(
				A2(
					$avh4$elm_fifo$Fifo$Fifo,
					$elm$core$List$reverse(back),
					_List_Nil));
		}
	} else {
		var _v1 = fifo.a;
		var next = _v1.a;
		var rest = _v1.b;
		var back = fifo.b;
		return _Utils_Tuple2(
			$elm$core$Maybe$Just(next),
			A2($avh4$elm_fifo$Fifo$Fifo, rest, back));
	}
};
var $avh4$elm_program_test$MultiDict$MultiDict = function (a) {
	return {$: 'MultiDict', a: a};
};
var $mgold$elm_nonempty_list$List$Nonempty$Nonempty = F2(
	function (a, b) {
		return {$: 'Nonempty', a: a, b: b};
	});
var $mgold$elm_nonempty_list$List$Nonempty$cons = F2(
	function (y, _v0) {
		var x = _v0.a;
		var xs = _v0.b;
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			y,
			A2($elm$core$List$cons, x, xs));
	});
var $mgold$elm_nonempty_list$List$Nonempty$singleton = function (x) {
	return A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, x, _List_Nil);
};
var $mgold$elm_nonempty_list$List$Nonempty$fromElement = $mgold$elm_nonempty_list$List$Nonempty$singleton;
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $avh4$elm_program_test$MultiDict$insert = F3(
	function (key, value, _v0) {
		var dict = _v0.a;
		return $avh4$elm_program_test$MultiDict$MultiDict(
			A3(
				$elm$core$Dict$update,
				key,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Maybe$map(
						$mgold$elm_nonempty_list$List$Nonempty$cons(value)),
					A2(
						$elm$core$Basics$composeR,
						$elm$core$Maybe$withDefault(
							$mgold$elm_nonempty_list$List$Nonempty$fromElement(value)),
						$elm$core$Maybe$Just)),
				dict));
	});
var $avh4$elm_program_test$PairingHeap$insert = F3(
	function (k, v, heap) {
		return A2(
			$avh4$elm_program_test$PairingHeap$merge,
			A3($avh4$elm_program_test$PairingHeap$Heap, k, v, _List_Nil),
			heap);
	});
var $elm$core$Basics$round = _Basics_round;
var $avh4$elm_program_test$ProgramTest$EffectSimulation$simulateTask = F2(
	function (task, simulationState) {
		simulateTask:
		while (true) {
			switch (task.$) {
				case 'Succeed':
					var msg = task.a;
					return _Utils_Tuple2(
						simulationState,
						$elm$core$Maybe$Just(msg));
				case 'Fail':
					var msg = task.a;
					return _Utils_Tuple2(
						simulationState,
						$elm$core$Maybe$Just(msg));
				case 'HttpTask':
					var request = task.a;
					return _Utils_Tuple2(
						_Utils_update(
							simulationState,
							{
								http: A3(
									$avh4$elm_program_test$MultiDict$insert,
									_Utils_Tuple2(request.method, request.url),
									request,
									simulationState.http)
							}),
						$elm$core$Maybe$Nothing);
				case 'SleepTask':
					var delay = task.a;
					var onResult = task.b;
					return _Utils_Tuple2(
						_Utils_update(
							simulationState,
							{
								futureTasks: A3(
									$avh4$elm_program_test$PairingHeap$insert,
									simulationState.nowMs + $elm$core$Basics$round(delay),
									onResult,
									simulationState.futureTasks)
							}),
						$elm$core$Maybe$Nothing);
				default:
					var onResult = task.a;
					var $temp$task = onResult(
						$elm$time$Time$millisToPosix(simulationState.nowMs)),
						$temp$simulationState = simulationState;
					task = $temp$task;
					simulationState = $temp$simulationState;
					continue simulateTask;
			}
		}
	});
var $avh4$elm_program_test$ProgramTest$EffectSimulation$stepWorkQueue = function (simulation) {
	var _v0 = $avh4$elm_fifo$Fifo$remove(simulation.workQueue);
	if (_v0.a.$ === 'Nothing') {
		var _v1 = _v0.a;
		return $elm$core$Maybe$Nothing;
	} else {
		var task = _v0.a.a;
		var rest = _v0.b;
		var _v2 = A2($avh4$elm_program_test$ProgramTest$EffectSimulation$simulateTask, task, simulation.state);
		var newState = _v2.a;
		var msg = _v2.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(
				_Utils_update(
					simulation,
					{state: newState, workQueue: rest}),
				msg));
	}
};
var $avh4$elm_program_test$TestState$withSimulation = F2(
	function (f, state) {
		return _Utils_update(
			state,
			{
				effectSimulation: A2($elm$core$Maybe$map, f, state.effectSimulation)
			});
	});
var $avh4$elm_program_test$TestState$advanceTime = F4(
	function (functionName, delta, program, state) {
		var _v17 = state.effectSimulation;
		if (_v17.$ === 'Nothing') {
			return $elm$core$Result$Err(
				$avh4$elm_program_test$ProgramTest$Failure$EffectSimulationNotConfigured(functionName));
		} else {
			var simulation = _v17.a;
			return A4($avh4$elm_program_test$TestState$advanceTo, program, functionName, simulation.state.nowMs + delta, state);
		}
	});
var $avh4$elm_program_test$TestState$advanceTo = F4(
	function (program, functionName, end, state) {
		var _v14 = state.effectSimulation;
		if (_v14.$ === 'Nothing') {
			return $elm$core$Result$Err(
				$avh4$elm_program_test$ProgramTest$Failure$EffectSimulationNotConfigured(functionName));
		} else {
			var simulation = _v14.a;
			var ss = simulation.state;
			var _v15 = $avh4$elm_program_test$PairingHeap$findMin(simulation.state.futureTasks);
			if (_v15.$ === 'Nothing') {
				return $elm$core$Result$Ok(
					_Utils_update(
						state,
						{
							effectSimulation: $elm$core$Maybe$Just(
								_Utils_update(
									simulation,
									{
										state: _Utils_update(
											ss,
											{nowMs: end})
									}))
						}));
			} else {
				var _v16 = _v15.a;
				var t = _v16.a;
				var task = _v16.b;
				return (_Utils_cmp(t, end) < 1) ? A2(
					$elm$core$Result$andThen,
					A3($avh4$elm_program_test$TestState$advanceTo, program, functionName, end),
					A2(
						$elm$core$Result$andThen,
						$avh4$elm_program_test$TestState$drain(program),
						A2(
							$elm$core$Result$map,
							$avh4$elm_program_test$TestState$withSimulation(
								$avh4$elm_program_test$ProgramTest$EffectSimulation$queueTask(
									task(_Utils_Tuple0))),
							$elm$core$Result$Ok(
								_Utils_update(
									state,
									{
										effectSimulation: $elm$core$Maybe$Just(
											_Utils_update(
												simulation,
												{
													state: _Utils_update(
														ss,
														{
															futureTasks: $avh4$elm_program_test$PairingHeap$deleteMin(simulation.state.futureTasks),
															nowMs: t
														})
												}))
									}))))) : $elm$core$Result$Ok(
					_Utils_update(
						state,
						{
							effectSimulation: $elm$core$Maybe$Just(
								_Utils_update(
									simulation,
									{
										state: _Utils_update(
											ss,
											{nowMs: end})
									}))
						}));
			}
		}
	});
var $avh4$elm_program_test$TestState$drain = function (program) {
	var advanceTimeIfSimulating = F2(
		function (t, state) {
			var _v13 = state.effectSimulation;
			if (_v13.$ === 'Nothing') {
				return $elm$core$Result$Ok(state);
			} else {
				return A4($avh4$elm_program_test$TestState$advanceTime, '<UNKNOWN LOCATION: if you see this, please report it at https://github.com/avh4/elm-program-test/issues/>', t, program, state);
			}
		});
	return A2(
		$elm$core$Basics$composeR,
		advanceTimeIfSimulating(0),
		$elm$core$Result$andThen(
			$avh4$elm_program_test$TestState$drainWorkQueue(program)));
};
var $avh4$elm_program_test$TestState$drainWorkQueue = F2(
	function (program, state) {
		var _v9 = state.effectSimulation;
		if (_v9.$ === 'Nothing') {
			return $elm$core$Result$Ok(state);
		} else {
			var simulation = _v9.a;
			var _v10 = $avh4$elm_program_test$ProgramTest$EffectSimulation$stepWorkQueue(simulation);
			if (_v10.$ === 'Nothing') {
				return $elm$core$Result$Ok(state);
			} else {
				var _v11 = _v10.a;
				var newSimulation = _v11.a;
				var msg = _v11.b;
				var updateMaybe = function (tc) {
					if (msg.$ === 'Nothing') {
						return $elm$core$Result$Ok(tc);
					} else {
						var m = msg.a;
						return A3($avh4$elm_program_test$TestState$update, m, program, tc);
					}
				};
				return A2(
					$elm$core$Result$andThen,
					$avh4$elm_program_test$TestState$drain(program),
					updateMaybe(
						_Utils_update(
							state,
							{
								effectSimulation: $elm$core$Maybe$Just(newSimulation)
							})));
			}
		}
	});
var $avh4$elm_program_test$TestState$queueEffect = F3(
	function (program, effect, state) {
		var _v8 = state.effectSimulation;
		if (_v8.$ === 'Nothing') {
			return $elm$core$Result$Ok(state);
		} else {
			var simulation = _v8.a;
			return A3(
				$avh4$elm_program_test$TestState$queueSimulatedEffect,
				program,
				simulation.deconstructEffect(effect),
				state);
		}
	});
var $avh4$elm_program_test$TestState$queueSimulatedEffect = F3(
	function (program, effect, state) {
		var _v3 = state.effectSimulation;
		if (_v3.$ === 'Nothing') {
			return $elm$core$Result$Ok(state);
		} else {
			var simulation = _v3.a;
			switch (effect.$) {
				case 'None':
					return $elm$core$Result$Ok(state);
				case 'Batch':
					var effects = effect.a;
					return A3(
						$elm$core$List$foldl,
						function (ef) {
							return $elm$core$Result$andThen(
								A2($avh4$elm_program_test$TestState$queueSimulatedEffect, program, ef));
						},
						$elm$core$Result$Ok(state),
						effects);
				case 'Task':
					var t = effect.a;
					return $elm$core$Result$Ok(
						_Utils_update(
							state,
							{
								effectSimulation: $elm$core$Maybe$Just(
									A2($avh4$elm_program_test$ProgramTest$EffectSimulation$queueTask, t, simulation))
							}));
				case 'PortEffect':
					var portName = effect.a;
					var value = effect.b;
					return $elm$core$Result$Ok(
						_Utils_update(
							state,
							{
								effectSimulation: $elm$core$Maybe$Just(
									_Utils_update(
										simulation,
										{
											outgoingPortValues: A3(
												$elm$core$Dict$update,
												portName,
												A2(
													$elm$core$Basics$composeR,
													$elm$core$Maybe$withDefault(_List_Nil),
													A2(
														$elm$core$Basics$composeR,
														$elm$core$List$cons(value),
														$elm$core$Maybe$Just)),
												simulation.outgoingPortValues)
										}))
							}));
				case 'PushUrl':
					var url = effect.a;
					return A5(
						$avh4$elm_program_test$TestState$urlChangeHelper,
						'simulating effect: SimulatedEffect.Navigation.pushUrl ' + $avh4$elm_program_test$String$Extra$escape(url),
						0,
						url,
						program,
						state);
				case 'ReplaceUrl':
					var url = effect.a;
					return A5(
						$avh4$elm_program_test$TestState$urlChangeHelper,
						'simulating effect: SimulatedEffect.Navigation.replaceUrl ' + $avh4$elm_program_test$String$Extra$escape(url),
						1,
						url,
						program,
						state);
				case 'Back':
					var n = effect.a;
					var _v5 = state.navigation;
					if (_v5.$ === 'Nothing') {
						return $elm$core$Result$Ok(state);
					} else {
						var currentLocation = _v5.a.currentLocation;
						var browserHistory = _v5.a.browserHistory;
						if (n <= 0) {
							return $elm$core$Result$Ok(state);
						} else {
							var _v6 = $elm$core$List$head(
								A2($elm$core$List$drop, n - 1, browserHistory));
							if (_v6.$ === 'Nothing') {
								return $elm$core$Result$Ok(state);
							} else {
								var first = _v6.a;
								return A5(
									$avh4$elm_program_test$TestState$urlChangeHelper,
									'simulating effect: SimulatedEffect.Navigation.Back ' + $elm$core$String$fromInt(n),
									2,
									$elm$url$Url$toString(first),
									program,
									state);
							}
						}
					}
				case 'Load':
					var url = effect.a;
					return $elm$core$Result$Err(
						A3($avh4$elm_program_test$TestState$simulateLoadUrlHelper, 'simulating effect: SimulatedEffect.Navigation.load ' + url, url, state));
				default:
					var skipCache = effect.a;
					var functionName = skipCache ? 'reloadAndSkipCache' : 'reload';
					var _v7 = state.navigation;
					if (_v7.$ === 'Nothing') {
						return $elm$core$Result$Err(
							$avh4$elm_program_test$ProgramTest$Failure$ProgramDoesNotSupportNavigation(functionName));
					} else {
						var currentLocation = _v7.a.currentLocation;
						return $elm$core$Result$Err(
							A2($avh4$elm_program_test$ProgramTest$Failure$ChangedPage, 'simulating effect: SimulatedEffect.Navigation.' + functionName, currentLocation));
					}
			}
		}
	});
var $avh4$elm_program_test$TestState$update = F3(
	function (msg, program, state) {
		var _v2 = A2(program.update, msg, state.currentModel);
		var newModel = _v2.a;
		var newEffect = _v2.b;
		return A2(
			$elm$core$Result$andThen,
			$avh4$elm_program_test$TestState$drain(program),
			A3(
				$avh4$elm_program_test$TestState$queueEffect,
				program,
				newEffect,
				_Utils_update(
					state,
					{currentModel: newModel, lastEffect: newEffect})));
	});
var $avh4$elm_program_test$TestState$urlChangeHelper = F5(
	function (functionName, removeFromBackStack, url, program, state) {
		var _v0 = state.navigation;
		if (_v0.$ === 'Nothing') {
			return $elm$core$Result$Err(
				$avh4$elm_program_test$ProgramTest$Failure$ProgramDoesNotSupportNavigation(functionName));
		} else {
			var currentLocation = _v0.a.currentLocation;
			var browserHistory = _v0.a.browserHistory;
			var newLocation = A2($avh4$elm_program_test$Url$Extra$resolve, currentLocation, url);
			var processRouteChange = function () {
				var _v1 = program.onUrlChange;
				if (_v1.$ === 'Nothing') {
					return $elm$core$Result$Ok;
				} else {
					var onUrlChange = _v1.a;
					return A2(
						$avh4$elm_program_test$TestState$update,
						onUrlChange(newLocation),
						program);
				}
			}();
			return processRouteChange(
				_Utils_update(
					state,
					{
						navigation: $elm$core$Maybe$Just(
							{
								browserHistory: A2(
									$elm$core$List$drop,
									removeFromBackStack,
									A2($elm$core$List$cons, currentLocation, browserHistory)),
								currentLocation: newLocation
							})
					}));
		}
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $mgold$elm_nonempty_list$List$Nonempty$fromList = function (ys) {
	if (ys.b) {
		var x = ys.a;
		var xs = ys.b;
		return $elm$core$Maybe$Just(
			A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $avh4$elm_program_test$MultiDict$set = F3(
	function (key, values, _v0) {
		var dict = _v0.a;
		return $avh4$elm_program_test$MultiDict$MultiDict(
			A3(
				$elm$core$Dict$update,
				key,
				function (_v1) {
					return $mgold$elm_nonempty_list$List$Nonempty$fromList(values);
				},
				dict));
	});
var $elm_community$list_extra$List$Extra$splitAt = F2(
	function (n, xs) {
		return _Utils_Tuple2(
			A2($elm$core$List$take, n, xs),
			A2($elm$core$List$drop, n, xs));
	});
var $avh4$elm_program_test$ProgramTest$simulateHttpResponseHelper = F6(
	function (functionName, method, url, pendingRequestIndex, failIfMorePendingRequests, response) {
		return $avh4$elm_program_test$ProgramTest$andThen(
			F2(
				function (program, state) {
					var _v0 = state.effectSimulation;
					if (_v0.$ === 'Nothing') {
						return $elm$core$Result$Err(
							$avh4$elm_program_test$ProgramTest$Failure$EffectSimulationNotConfigured(functionName));
					} else {
						var simulation = _v0.a;
						var _v1 = A2(
							$elm_community$list_extra$List$Extra$splitAt,
							pendingRequestIndex - 1,
							A2(
								$avh4$elm_program_test$MultiDict$get,
								_Utils_Tuple2(method, url),
								simulation.state.http));
						if (!_v1.b.b) {
							var prev = _v1.a;
							return $elm$core$Result$Err(
								A5(
									$avh4$elm_program_test$ProgramTest$Failure$NoMatchingHttpRequest,
									pendingRequestIndex,
									$elm$core$List$length(prev),
									functionName,
									{method: method, url: url},
									$avh4$elm_program_test$MultiDict$keys(simulation.state.http)));
						} else {
							var prev = _v1.a;
							var _v2 = _v1.b;
							var actualRequest = _v2.a;
							var rest = _v2.b;
							if (failIfMorePendingRequests && (!_Utils_eq(rest, _List_Nil))) {
								return $elm$core$Result$Err(
									A5(
										$avh4$elm_program_test$ProgramTest$Failure$MultipleMatchingHttpRequest,
										pendingRequestIndex,
										($elm$core$List$length(prev) + 1) + $elm$core$List$length(rest),
										functionName,
										{method: method, url: url},
										$avh4$elm_program_test$MultiDict$keys(simulation.state.http)));
							} else {
								var resolveHttpRequest = function (sim) {
									var st = sim.state;
									return _Utils_update(
										sim,
										{
											state: _Utils_update(
												st,
												{
													http: A3(
														$avh4$elm_program_test$MultiDict$set,
														_Utils_Tuple2(method, url),
														_Utils_ap(prev, rest),
														st.http)
												})
										});
								};
								return A2(
									$avh4$elm_program_test$TestState$drain,
									program,
									A2(
										$avh4$elm_program_test$TestState$withSimulation,
										A2(
											$elm$core$Basics$composeR,
											resolveHttpRequest,
											$avh4$elm_program_test$ProgramTest$EffectSimulation$queueTask(
												actualRequest.onRequestComplete(response))),
										state));
							}
						}
					}
				}));
	});
var $avh4$elm_program_test$ProgramTest$simulateHttpOk = F3(
	function (method, url, responseBody) {
		return A6(
			$avh4$elm_program_test$ProgramTest$simulateHttpResponseHelper,
			'simulateHttpOk',
			method,
			url,
			1,
			true,
			$avh4$elm_program_test$Test$Http$httpResponse(
				{body: responseBody, headers: _List_Nil, statusCode: 200}));
	});
var $author$project$TestUtils$ensureHttpGetRequestWithResponse = F2(
	function (url, response) {
		return A2(
			$elm$core$Basics$composeR,
			$author$project$TestUtils$ensureHttpGetRequest(url),
			A3($avh4$elm_program_test$ProgramTest$simulateHttpOk, 'GET', url, response));
	});
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $author$project$TestUtils$toJsonList = F2(
	function (enc, l) {
		return A2(
			$elm$json$Json$Encode$encode,
			2,
			A2($elm$json$Json$Encode$list, enc, l));
	});
var $author$project$TestUtils$intListToJsonList = function (l) {
	return A2($author$project$TestUtils$toJsonList, $elm$json$Json$Encode$int, l);
};
var $avh4$elm_program_test$ProgramTest$ProgramDefinition = F2(
	function (a, b) {
		return {$: 'ProgramDefinition', a: a, b: b};
	});
var $avh4$elm_program_test$MultiDict$empty = $avh4$elm_program_test$MultiDict$MultiDict($elm$core$Dict$empty);
var $avh4$elm_program_test$PairingHeap$empty = $avh4$elm_program_test$PairingHeap$Empty;
var $avh4$elm_program_test$ProgramTest$EffectSimulation$emptySimulationState = {futureTasks: $avh4$elm_program_test$PairingHeap$empty, http: $avh4$elm_program_test$MultiDict$empty, nowMs: 0};
var $avh4$elm_program_test$ProgramTest$EffectSimulation$init = function (f) {
	return {deconstructEffect: f, outgoingPortValues: $elm$core$Dict$empty, state: $avh4$elm_program_test$ProgramTest$EffectSimulation$emptySimulationState, workQueue: $avh4$elm_fifo$Fifo$empty};
};
var $avh4$elm_program_test$ProgramTest$createHelper = F2(
	function (program, options) {
		var program_ = {onUrlChange: program.onUrlChange, onUrlRequest: program.onUrlRequest, subscriptions: options.subscriptions, update: program.update, view: program.view, withinFocus: $elm$core$Basics$identity};
		var _v0 = program.init;
		var newModel = _v0.a;
		var newEffect = _v0.b;
		return A2(
			$avh4$elm_program_test$ProgramTest$andThen,
			function (_v2) {
				return A2(
					$elm$core$Basics$composeR,
					A2($avh4$elm_program_test$TestState$queueEffect, program_, newEffect),
					$elm$core$Result$andThen(
						$avh4$elm_program_test$TestState$drain(program_)));
			},
			$avh4$elm_program_test$ProgramTest$Created(
				{
					program: program_,
					state: $elm$core$Result$Ok(
						{
							currentModel: newModel,
							effectSimulation: A2($elm$core$Maybe$map, $avh4$elm_program_test$ProgramTest$EffectSimulation$init, options.deconstructEffect),
							lastEffect: newEffect,
							navigation: function () {
								var _v1 = options.baseUrl;
								if (_v1.$ === 'Nothing') {
									return $elm$core$Maybe$Nothing;
								} else {
									var baseUrl = _v1.a;
									return $elm$core$Maybe$Just(
										{browserHistory: _List_Nil, currentLocation: baseUrl});
								}
							}()
						})
				}));
	});
var $avh4$elm_program_test$ProgramTest$emptyOptions = {baseUrl: $elm$core$Maybe$Nothing, deconstructEffect: $elm$core$Maybe$Nothing, subscriptions: $elm$core$Maybe$Nothing};
var $avh4$elm_program_test$ProgramTest$createElement = function (program) {
	return A2(
		$avh4$elm_program_test$ProgramTest$ProgramDefinition,
		$avh4$elm_program_test$ProgramTest$emptyOptions,
		F2(
			function (_v0, flags) {
				return $avh4$elm_program_test$ProgramTest$createHelper(
					{
						init: program.init(flags),
						onUrlChange: $elm$core$Maybe$Nothing,
						onUrlRequest: $elm$core$Maybe$Nothing,
						update: program.update,
						view: program.view
					});
			}));
};
var $author$project$Effect$GetTime = {$: 'GetTime'};
var $author$project$Model$Empty = function (a) {
	return {$: 'Empty', a: a};
};
var $author$project$Model$PostsConfig$None = {$: 'None'};
var $author$project$Model$PostsConfig$PostsConfig = F5(
	function (postsToFetch, postsToShow, sortBy, showJobs, showTextOnly) {
		return {postsToFetch: postsToFetch, postsToShow: postsToShow, showJobs: showJobs, showTextOnly: showTextOnly, sortBy: sortBy};
	});
var $author$project$Model$PostsConfig$defaultConfig = A5($author$project$Model$PostsConfig$PostsConfig, 50, 10, $author$project$Model$PostsConfig$None, false, true);
var $author$project$Model$initModel = function (config) {
	return {
		config: config,
		state: $author$project$Model$Empty(
			{config: $author$project$Model$PostsConfig$defaultConfig})
	};
};
var $author$project$Main$init = F2(
	function (flags, _v0) {
		return _Utils_Tuple2(
			$author$project$Model$initModel(flags),
			$author$project$Effect$GetTime);
	});
var $author$project$Model$GotTime = function (a) {
	return {$: 'GotTime', a: a};
};
var $elm$url$Url$Builder$toQueryPair = function (_v0) {
	var key = _v0.a;
	var value = _v0.b;
	return key + ('=' + value);
};
var $elm$url$Url$Builder$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + A2(
			$elm$core$String$join,
			'&',
			A2($elm$core$List$map, $elm$url$Url$Builder$toQueryPair, parameters));
	}
};
var $elm$url$Url$Builder$crossOrigin = F3(
	function (prePath, pathSegments, parameters) {
		return prePath + ('/' + (A2($elm$core$String$join, '/', pathSegments) + $elm$url$Url$Builder$toQuery(parameters)));
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $avh4$elm_program_test$SimulatedEffect$Http$Expect = function (a) {
	return {$: 'Expect', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $avh4$elm_program_test$SimulatedEffect$Http$expectJson = F2(
	function (onResult, decoder) {
		return $avh4$elm_program_test$SimulatedEffect$Http$Expect(
			function (response) {
				switch (response.$) {
					case 'BadUrl_':
						var s = response.a;
						return onResult(
							$elm$core$Result$Err(
								$elm$http$Http$BadUrl(s)));
					case 'Timeout_':
						return onResult(
							$elm$core$Result$Err($elm$http$Http$Timeout));
					case 'NetworkError_':
						return onResult(
							$elm$core$Result$Err($elm$http$Http$NetworkError));
					case 'BadStatus_':
						var metadata = response.a;
						return onResult(
							$elm$core$Result$Err(
								$elm$http$Http$BadStatus(metadata.statusCode)));
					default:
						var body = response.b;
						var _v1 = A2($elm$json$Json$Decode$decodeString, decoder, body);
						if (_v1.$ === 'Err') {
							var jsonError = _v1.a;
							return onResult(
								$elm$core$Result$Err(
									$elm$http$Http$BadBody(
										$elm$json$Json$Decode$errorToString(jsonError))));
						} else {
							var value = _v1.a;
							return onResult(
								$elm$core$Result$Ok(value));
						}
				}
			});
	});
var $avh4$elm_program_test$SimulatedEffect$Http$EmptyBody = {$: 'EmptyBody'};
var $avh4$elm_program_test$SimulatedEffect$Http$emptyBody = $avh4$elm_program_test$SimulatedEffect$Http$EmptyBody;
var $avh4$elm_program_test$SimulatedEffect$HttpTask = function (a) {
	return {$: 'HttpTask', a: a};
};
var $avh4$elm_program_test$SimulatedEffect$Succeed = function (a) {
	return {$: 'Succeed', a: a};
};
var $avh4$elm_program_test$SimulatedEffect$Task = function (a) {
	return {$: 'Task', a: a};
};
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $avh4$elm_program_test$SimulatedEffect$Http$header = $elm$core$Tuple$pair;
var $avh4$elm_program_test$SimulatedEffect$Http$request = function (r) {
	var _v0 = r.expect;
	var onResult = _v0.a;
	return $avh4$elm_program_test$SimulatedEffect$Task(
		$avh4$elm_program_test$SimulatedEffect$HttpTask(
			{
				body: function () {
					var _v1 = r.body;
					if (_v1.$ === 'EmptyBody') {
						return '';
					} else {
						var body = _v1.a;
						return body.content;
					}
				}(),
				headers: function () {
					var _v2 = r.body;
					if (_v2.$ === 'EmptyBody') {
						return r.headers;
					} else {
						var body = _v2.a;
						return A2(
							$elm$core$List$cons,
							A2($avh4$elm_program_test$SimulatedEffect$Http$header, 'Content-Type', body.contentType),
							r.headers);
					}
				}(),
				method: r.method,
				onRequestComplete: A2($elm$core$Basics$composeR, onResult, $avh4$elm_program_test$SimulatedEffect$Succeed),
				url: r.url
			}));
};
var $avh4$elm_program_test$SimulatedEffect$Http$get = function (r) {
	return $avh4$elm_program_test$SimulatedEffect$Http$request(
		{body: $avh4$elm_program_test$SimulatedEffect$Http$emptyBody, expect: r.expect, headers: _List_Nil, method: 'GET', timeout: $elm$core$Maybe$Nothing, tracker: $elm$core$Maybe$Nothing, url: r.url});
};
var $author$project$Model$PostIds$itemName = function (item) {
	switch (item.$) {
		case 'Top':
			return 'top';
		case 'New':
			return 'new';
		case 'Show':
			return 'show';
		case 'Ask':
			return 'ask';
		default:
			return 'job';
	}
};
var $avh4$elm_program_test$SimulatedEffect$None = {$: 'None'};
var $avh4$elm_program_test$SimulatedEffect$Cmd$none = $avh4$elm_program_test$SimulatedEffect$None;
var $avh4$elm_program_test$SimulatedEffect$NowTask = function (a) {
	return {$: 'NowTask', a: a};
};
var $avh4$elm_program_test$SimulatedEffect$Time$now = $avh4$elm_program_test$SimulatedEffect$NowTask($avh4$elm_program_test$SimulatedEffect$Succeed);
var $avh4$elm_program_test$SimulatedEffect$Fail = function (a) {
	return {$: 'Fail', a: a};
};
var $avh4$elm_program_test$SimulatedEffect$SleepTask = F2(
	function (a, b) {
		return {$: 'SleepTask', a: a, b: b};
	});
var $avh4$elm_program_test$SimulatedEffect$Task$andThen = F2(
	function (f, task) {
		switch (task.$) {
			case 'Succeed':
				var a = task.a;
				return f(a);
			case 'Fail':
				var x = task.a;
				return $avh4$elm_program_test$SimulatedEffect$Fail(x);
			case 'HttpTask':
				var request = task.a;
				return $avh4$elm_program_test$SimulatedEffect$HttpTask(
					{
						body: request.body,
						headers: request.headers,
						method: request.method,
						onRequestComplete: A2(
							$elm$core$Basics$composeR,
							request.onRequestComplete,
							$avh4$elm_program_test$SimulatedEffect$Task$andThen(f)),
						url: request.url
					});
			case 'SleepTask':
				var delay = task.a;
				var onResult = task.b;
				return A2(
					$avh4$elm_program_test$SimulatedEffect$SleepTask,
					delay,
					A2(
						$elm$core$Basics$composeR,
						onResult,
						$avh4$elm_program_test$SimulatedEffect$Task$andThen(f)));
			default:
				var onResult = task.a;
				return $avh4$elm_program_test$SimulatedEffect$NowTask(
					A2(
						$elm$core$Basics$composeR,
						onResult,
						$avh4$elm_program_test$SimulatedEffect$Task$andThen(f)));
		}
	});
var $avh4$elm_program_test$SimulatedEffect$Task$map = function (f) {
	return $avh4$elm_program_test$SimulatedEffect$Task$andThen(
		A2($elm$core$Basics$composeR, f, $avh4$elm_program_test$SimulatedEffect$Succeed));
};
var $avh4$elm_program_test$SimulatedEffect$Task$mapError = F2(
	function (f, task) {
		switch (task.$) {
			case 'Succeed':
				var a = task.a;
				return $avh4$elm_program_test$SimulatedEffect$Succeed(a);
			case 'Fail':
				var x = task.a;
				return $avh4$elm_program_test$SimulatedEffect$Fail(
					f(x));
			case 'HttpTask':
				var request = task.a;
				return $avh4$elm_program_test$SimulatedEffect$HttpTask(
					{
						body: request.body,
						headers: request.headers,
						method: request.method,
						onRequestComplete: A2(
							$elm$core$Basics$composeR,
							request.onRequestComplete,
							$avh4$elm_program_test$SimulatedEffect$Task$mapError(f)),
						url: request.url
					});
			case 'SleepTask':
				var delay = task.a;
				var onResult = task.b;
				return A2(
					$avh4$elm_program_test$SimulatedEffect$SleepTask,
					delay,
					A2(
						$elm$core$Basics$composeR,
						onResult,
						$avh4$elm_program_test$SimulatedEffect$Task$mapError(f)));
			default:
				var onResult = task.a;
				return $avh4$elm_program_test$SimulatedEffect$NowTask(
					A2(
						$elm$core$Basics$composeR,
						onResult,
						$avh4$elm_program_test$SimulatedEffect$Task$mapError(f)));
		}
	});
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $avh4$elm_program_test$SimulatedEffect$Task$perform = F2(
	function (f, task) {
		return $avh4$elm_program_test$SimulatedEffect$Task(
			A2(
				$avh4$elm_program_test$SimulatedEffect$Task$mapError,
				$elm$core$Basics$never,
				A2($avh4$elm_program_test$SimulatedEffect$Task$map, f, task)));
	});
var $author$project$SimulatedEffect$simulateEffect = function (effect) {
	switch (effect.$) {
		case 'NoEffect':
			return $avh4$elm_program_test$SimulatedEffect$Cmd$none;
		case 'GetTime':
			return A2($avh4$elm_program_test$SimulatedEffect$Task$perform, $author$project$Model$GotTime, $avh4$elm_program_test$SimulatedEffect$Time$now);
		case 'GetItems':
			var apiUrl = effect.a.apiUrl;
			var item = effect.a.item;
			var onResult = effect.a.onResult;
			var decoder = effect.a.decoder;
			return $avh4$elm_program_test$SimulatedEffect$Http$get(
				{
					expect: A2($avh4$elm_program_test$SimulatedEffect$Http$expectJson, onResult, decoder),
					url: A3(
						$elm$url$Url$Builder$crossOrigin,
						apiUrl,
						_List_fromArray(
							[
								'v0',
								$author$project$Model$PostIds$itemName(item) + 'stories.json'
							]),
						_List_Nil)
				});
		default:
			var apiUrl = effect.a.apiUrl;
			var postId = effect.a.postId;
			var onResult = effect.a.onResult;
			var decoder = effect.a.decoder;
			var id = $elm$core$String$fromInt(postId) + '.json';
			return $avh4$elm_program_test$SimulatedEffect$Http$get(
				{
					expect: A2($avh4$elm_program_test$SimulatedEffect$Http$expectJson, onResult, decoder),
					url: A3(
						$elm$url$Url$Builder$crossOrigin,
						apiUrl,
						_List_fromArray(
							['v0', 'item', id]),
						_List_Nil)
				});
	}
};
var $avh4$elm_program_test$ProgramTest$start = F2(
	function (flags, _v0) {
		var options = _v0.a;
		var program = _v0.b;
		return A3(program, options.baseUrl, flags, options);
	});
var $author$project$Model$FailedToLoad = function (a) {
	return {$: 'FailedToLoad', a: a};
};
var $author$project$Model$LoadedPosts = function (a) {
	return {$: 'LoadedPosts', a: a};
};
var $author$project$Model$Loading = function (a) {
	return {$: 'Loading', a: a};
};
var $author$project$Model$LoadingPosts = function (a) {
	return {$: 'LoadingPosts', a: a};
};
var $author$project$Effect$NoEffect = {$: 'NoEffect'};
var $author$project$Model$PostIds$PostIds = function (a) {
	return {$: 'PostIds', a: a};
};
var $author$project$Cursor$current = function (_v0) {
	var a = _v0.b;
	return a;
};
var $author$project$Cursor$Cursor = F3(
	function (a, b, c) {
		return {$: 'Cursor', a: a, b: b, c: c};
	});
var $author$project$Cursor$withSelectedElement = F3(
	function (left, mid, right) {
		return A3(
			$author$project$Cursor$Cursor,
			$elm$core$List$reverse(left),
			mid,
			right);
	});
var $author$project$Cursor$forward = function (l) {
	var _v0 = l;
	var l1 = _v0.a;
	var mij = _v0.b;
	var l2 = _v0.c;
	if (!l2.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		var x = l2.a;
		var xs = l2.b;
		return $elm$core$Maybe$Just(
			A3(
				$author$project$Cursor$withSelectedElement,
				_Utils_ap(
					l1,
					_List_fromArray(
						[mij])),
				x,
				xs));
	}
};
var $author$project$Model$PostIds$advance = function (_v0) {
	var post = _v0.a;
	var _v1 = $author$project$Cursor$forward(post);
	if (_v1.$ === 'Just') {
		var val = _v1.a;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(
				$author$project$Cursor$current(val),
				$author$project$Model$PostIds$PostIds(val)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Model$PostsConfig$applyChanges = F2(
	function (change, conf) {
		switch (change.$) {
			case 'ChangePostsToShow':
				var n = change.a;
				return _Utils_update(
					conf,
					{postsToShow: n});
			case 'ChangeSortBy':
				var sortBy = change.a;
				return _Utils_update(
					conf,
					{sortBy: sortBy});
			case 'ChangeShowJobs':
				var show = change.a;
				return _Utils_update(
					conf,
					{showJobs: show});
			default:
				var show = change.a;
				return _Utils_update(
					conf,
					{showTextOnly: show});
		}
	});
var $author$project$Model$PostIds$first = function (_v0) {
	var ids = _v0.a;
	return $author$project$Cursor$current(ids);
};
var $author$project$Effect$GetPost = function (a) {
	return {$: 'GetPost', a: a};
};
var $author$project$Model$GotPost = function (a) {
	return {$: 'GotPost', a: a};
};
var $author$project$Model$Post$Post = F7(
	function (by, id, score, title, url, time, type_) {
		return {by: by, id: id, score: score, time: time, title: title, type_: type_, url: url};
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map7 = _Json_map7;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Model$Post$decode = A8(
	$elm$json$Json$Decode$map7,
	$author$project$Model$Post$Post,
	A2($elm$json$Json$Decode$field, 'by', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'score', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'title', $elm$json$Json$Decode$string),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string)),
	A2(
		$elm$json$Json$Decode$field,
		'time',
		A2(
			$elm$json$Json$Decode$map,
			function (sec) {
				return $elm$time$Time$millisToPosix(sec * 1000);
			},
			$elm$json$Json$Decode$int)),
	A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string));
var $author$project$Main$getPost = F2(
	function (apiUrl, postId) {
		return $author$project$Effect$GetPost(
			{apiUrl: apiUrl, decoder: $author$project$Model$Post$decode, onResult: $author$project$Model$GotPost, postId: postId});
	});
var $author$project$Model$PostIds$Top = {$: 'Top'};
var $author$project$Effect$GetItems = function (a) {
	return {$: 'GetItems', a: a};
};
var $author$project$Model$GotPostIds = function (a) {
	return {$: 'GotPostIds', a: a};
};
var $author$project$Cursor$fromList = function (l) {
	if (!l.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		var x = l.a;
		var xs = l.b;
		return $elm$core$Maybe$Just(
			A3($author$project$Cursor$withSelectedElement, _List_Nil, x, xs));
	}
};
var $author$project$Model$PostIds$fromList = function (ids) {
	return A2(
		$elm$core$Maybe$map,
		$author$project$Model$PostIds$PostIds,
		$author$project$Cursor$fromList(ids));
};
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Model$PostIds$decode = A2(
	$elm$json$Json$Decode$map,
	function (rez) {
		if (!rez.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			return $author$project$Model$PostIds$fromList(rez);
		}
	},
	$elm$json$Json$Decode$list($elm$json$Json$Decode$int));
var $author$project$Main$getItems = F2(
	function (apiUrl, item) {
		return $author$project$Effect$GetItems(
			{apiUrl: apiUrl, decoder: $author$project$Model$PostIds$decode, item: item, onResult: $author$project$Model$GotPostIds});
	});
var $author$project$Main$getTopPostIds = function (apiUrl) {
	return A2($author$project$Main$getItems, apiUrl, $author$project$Model$PostIds$Top);
};
var $author$project$Main$update = F2(
	function (msg, model) {
		var _v0 = function () {
			var _v1 = _Utils_Tuple2(model.state, msg);
			_v1$4:
			while (true) {
				switch (_v1.b.$) {
					case 'GotTime':
						if (_v1.a.$ === 'Empty') {
							var config = _v1.a.a.config;
							var time = _v1.b.a;
							return _Utils_Tuple2(
								$author$project$Model$Loading(
									{config: config, time: time}),
								$author$project$Main$getTopPostIds(model.config.apiUrl));
						} else {
							break _v1$4;
						}
					case 'GotPostIds':
						if (_v1.a.$ === 'Loading') {
							var config = _v1.a.a.config;
							var time = _v1.a.a.time;
							var result = _v1.b.a;
							if (result.$ === 'Ok') {
								if (result.a.$ === 'Just') {
									var ids = result.a.a;
									return _Utils_Tuple2(
										$author$project$Model$LoadingPosts(
											{
												config: config,
												currentId: $author$project$Model$PostIds$first(ids),
												postIds: ids,
												posts: _List_Nil,
												time: time
											}),
										A2(
											$author$project$Main$getPost,
											model.config.apiUrl,
											$author$project$Model$PostIds$first(ids)));
								} else {
									var _v3 = result.a;
									return _Utils_Tuple2(
										$author$project$Model$Empty(
											{config: config}),
										$author$project$Effect$NoEffect);
								}
							} else {
								var err = result.a;
								return _Utils_Tuple2(
									$author$project$Model$FailedToLoad(err),
									$author$project$Effect$NoEffect);
							}
						} else {
							break _v1$4;
						}
					case 'GotPost':
						if (_v1.a.$ === 'LoadingPosts') {
							var loading = _v1.a.a;
							var result = _v1.b.a;
							if (result.$ === 'Ok') {
								var post = result.a;
								var _v5 = $author$project$Model$PostIds$advance(loading.postIds);
								if (_v5.$ === 'Just') {
									var _v6 = _v5.a;
									var nextId = _v6.a;
									var nextPostIds = _v6.b;
									var posts = A2($elm$core$List$cons, post, loading.posts);
									return (_Utils_cmp(
										$elm$core$List$length(posts),
										loading.config.postsToFetch) < 0) ? _Utils_Tuple2(
										$author$project$Model$LoadingPosts(
											_Utils_update(
												loading,
												{currentId: nextId, postIds: nextPostIds, posts: posts})),
										A2($author$project$Main$getPost, model.config.apiUrl, nextId)) : _Utils_Tuple2(
										$author$project$Model$LoadedPosts(
											{
												config: loading.config,
												posts: $elm$core$List$reverse(
													A2($elm$core$List$cons, post, loading.posts)),
												time: loading.time
											}),
										$author$project$Effect$NoEffect);
								} else {
									return _Utils_Tuple2(
										$author$project$Model$LoadedPosts(
											{
												config: loading.config,
												posts: $elm$core$List$reverse(
													A2($elm$core$List$cons, post, loading.posts)),
												time: loading.time
											}),
										$author$project$Effect$NoEffect);
								}
							} else {
								var err = result.a;
								return _Utils_Tuple2(
									$author$project$Model$FailedToLoad(err),
									$author$project$Effect$NoEffect);
							}
						} else {
							break _v1$4;
						}
					default:
						if (_v1.a.$ === 'LoadedPosts') {
							var state = _v1.a.a;
							var change = _v1.b.a;
							var newConfig = A2($author$project$Model$PostsConfig$applyChanges, change, state.config);
							return _Utils_Tuple2(
								$author$project$Model$LoadedPosts(
									_Utils_update(
										state,
										{config: newConfig})),
								$author$project$Effect$NoEffect);
						} else {
							break _v1$4;
						}
				}
			}
			var state = _v1.a;
			return _Utils_Tuple2(state, $author$project$Effect$NoEffect);
		}();
		var newState = _v0.a;
		var cmd = _v0.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{state: newState}),
			cmd);
	});
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$String$toLower = _String_toLower;
var $author$project$Model$PostsConfig$sortToCompareFn = function (sort) {
	switch (sort.$) {
		case 'Score':
			return F2(
				function (postA, postB) {
					var cmp = A2($elm$core$Basics$compare, postB.score, postA.score);
					return _Utils_eq(cmp, $elm$core$Basics$EQ) ? A2(
						$elm$core$Basics$compare,
						$elm$core$String$toLower(postA.title),
						$elm$core$String$toLower(postB.title)) : cmp;
				});
		case 'Title':
			return F2(
				function (postA, postB) {
					return A2(
						$elm$core$Basics$compare,
						$elm$core$String$toLower(postA.title),
						$elm$core$String$toLower(postB.title));
				});
		case 'Posted':
			return F2(
				function (postA, postB) {
					return A2(
						$elm$core$Basics$compare,
						$elm$time$Time$posixToMillis(postB.time),
						$elm$time$Time$posixToMillis(postA.time));
				});
		default:
			return F2(
				function (_v1, _v2) {
					return $elm$core$Basics$EQ;
				});
	}
};
var $elm$core$List$sortWith = _List_sortWith;
var $author$project$Model$PostsConfig$filterPosts = F2(
	function (conf, posts) {
		return A2(
			$elm$core$List$take,
			conf.postsToShow,
			A2(
				$elm$core$List$sortWith,
				$author$project$Model$PostsConfig$sortToCompareFn(conf.sortBy),
				A2(
					$elm$core$List$filter,
					function (post) {
						return (conf.showJobs || (post.type_ !== 'job')) && ((!conf.showTextOnly) || (!_Utils_eq(post.url, $elm$core$Maybe$Nothing)));
					},
					posts)));
	});
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $author$project$Util$Time$durationBetween = F2(
	function (time1, time2) {
		var milis2 = $elm$time$Time$posixToMillis(time2);
		var milis1 = $elm$time$Time$posixToMillis(time1);
		if (_Utils_cmp(milis1, milis2) > -1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var days = ((milis2 - milis1) / ((1000 * 3600) * 24)) | 0;
			var hours = (((milis2 - milis1) / (1000 * 3600)) | 0) - (days * 24);
			var minutes = (((milis2 - milis1) / (1000 * 60)) | 0) - (((days * 24) * 60) + (hours * 60));
			var seconds = (((milis2 - milis1) / 1000) | 0) - ((((days * 24) * 3600) + (hours * 3600)) + (minutes * 60));
			return $elm$core$Maybe$Just(
				{days: days, hours: hours, minutes: minutes, seconds: seconds});
		}
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $author$project$Util$Time$formatDuration = function (dur) {
	var val = A2(
		$elm$core$List$filterMap,
		$elm$core$Basics$identity,
		_List_fromArray(
			[
				(dur.days > 0) ? $elm$core$Maybe$Just(
				$elm$core$String$fromInt(dur.days) + (' day' + ((dur.days > 1) ? 's' : ''))) : $elm$core$Maybe$Nothing,
				(dur.hours > 0) ? $elm$core$Maybe$Just(
				$elm$core$String$fromInt(dur.hours) + (' hour' + ((dur.hours > 1) ? 's' : ''))) : $elm$core$Maybe$Nothing,
				(dur.minutes > 0) ? $elm$core$Maybe$Just(
				$elm$core$String$fromInt(dur.minutes) + (' minute' + ((dur.minutes > 1) ? 's' : ''))) : $elm$core$Maybe$Nothing,
				(dur.seconds > 0) ? $elm$core$Maybe$Just(
				$elm$core$String$fromInt(dur.seconds) + (' second' + ((dur.seconds > 1) ? 's' : ''))) : $elm$core$Maybe$Nothing
			]));
	if (!val.b) {
		return 'just now';
	} else {
		return A2($elm$core$String$join, ' ', val) + ' ago';
	}
};
var $author$project$Util$Time$monthToString = function (month) {
	switch (month.$) {
		case 'Jan':
			return 'Jan';
		case 'Feb':
			return 'Feb';
		case 'Mar':
			return 'Mar';
		case 'Apr':
			return 'Apr';
		case 'May':
			return 'May';
		case 'Jun':
			return 'Jun';
		case 'Jul':
			return 'Jul';
		case 'Aug':
			return 'Aug';
		case 'Sep':
			return 'Sep';
		case 'Oct':
			return 'Oct';
		case 'Nov':
			return 'Nov';
		default:
			return 'Dec';
	}
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $author$project$Util$Time$formatDate = function (_v0) {
	var date = _v0.a;
	var year = $elm$core$String$fromInt(date.year);
	var month = $author$project$Util$Time$monthToString(date.month);
	var day = A3(
		$elm$core$String$padLeft,
		2,
		_Utils_chr('0'),
		$elm$core$String$fromInt(date.day));
	return year + (' ' + (month + (' ' + day)));
};
var $author$project$Util$Time$Date = function (a) {
	return {$: 'Date', a: a};
};
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		day: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		month: month,
		year: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toDay = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).day;
	});
var $elm$time$Time$Apr = {$: 'Apr'};
var $elm$time$Time$Aug = {$: 'Aug'};
var $elm$time$Time$Dec = {$: 'Dec'};
var $elm$time$Time$Feb = {$: 'Feb'};
var $elm$time$Time$Jan = {$: 'Jan'};
var $elm$time$Time$Jul = {$: 'Jul'};
var $elm$time$Time$Jun = {$: 'Jun'};
var $elm$time$Time$Mar = {$: 'Mar'};
var $elm$time$Time$May = {$: 'May'};
var $elm$time$Time$Nov = {$: 'Nov'};
var $elm$time$Time$Oct = {$: 'Oct'};
var $elm$time$Time$Sep = {$: 'Sep'};
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).month;
		switch (_v0) {
			case 1:
				return $elm$time$Time$Jan;
			case 2:
				return $elm$time$Time$Feb;
			case 3:
				return $elm$time$Time$Mar;
			case 4:
				return $elm$time$Time$Apr;
			case 5:
				return $elm$time$Time$May;
			case 6:
				return $elm$time$Time$Jun;
			case 7:
				return $elm$time$Time$Jul;
			case 8:
				return $elm$time$Time$Aug;
			case 9:
				return $elm$time$Time$Sep;
			case 10:
				return $elm$time$Time$Oct;
			case 11:
				return $elm$time$Time$Nov;
			default:
				return $elm$time$Time$Dec;
		}
	});
var $elm$time$Time$toYear = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).year;
	});
var $author$project$Util$Time$posixToDate = F2(
	function (tz, time) {
		var year = A2($elm$time$Time$toYear, tz, time);
		var month = A2($elm$time$Time$toMonth, tz, time);
		var day = A2($elm$time$Time$toDay, tz, time);
		return $author$project$Util$Time$Date(
			{day: day, month: month, year: year});
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $author$project$Util$Time$formatTime = F2(
	function (tz, time) {
		var minute = A3(
			$elm$core$String$padLeft,
			2,
			_Utils_chr('0'),
			$elm$core$String$fromInt(
				A2($elm$time$Time$toMinute, tz, time)));
		var hour = A3(
			$elm$core$String$padLeft,
			2,
			_Utils_chr('0'),
			$elm$core$String$fromInt(
				A2($elm$time$Time$toHour, tz, time)));
		var date = A2($author$project$Util$Time$posixToDate, tz, time);
		return $author$project$Util$Time$formatDate(date) + (' ' + (hour + (':' + minute)));
	});
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $author$project$View$Posts$postareLinii = F2(
	function (time, post) {
		return A2(
			$elm$html$Html$tr,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'border-collapse', 'collapse'),
					A2($elm$html$Html$Attributes$style, 'width', '100%')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$td,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('post-score'),
							A2($elm$html$Html$Attributes$style, 'padding', '8px'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'left')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromInt(post.score))
						])),
					A2(
					$elm$html$Html$td,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('post-title'),
							A2($elm$html$Html$Attributes$style, 'padding', '8px'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'left')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(post.title)
						])),
					A2(
					$elm$html$Html$td,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('post-type'),
							A2($elm$html$Html$Attributes$style, 'padding', '8px'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'left')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(post.type_)
						])),
					A2(
					$elm$html$Html$td,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('post-time'),
							A2($elm$html$Html$Attributes$style, 'padding', '8px'),
							A2($elm$html$Html$Attributes$style, 'text-align', 'left'),
							$elm$html$Html$Attributes$title(
							A2($author$project$Util$Time$formatTime, $elm$time$Time$utc, post.time))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							function () {
								var relStr = function () {
									var _v0 = A2($author$project$Util$Time$durationBetween, post.time, time);
									if (_v0.$ === 'Just') {
										var dur = _v0.a;
										return ' (' + ($author$project$Util$Time$formatDuration(dur) + ')');
									} else {
										return '';
									}
								}();
								var dateStr = A2($author$project$Util$Time$formatTime, $elm$time$Time$utc, post.time);
								return _Utils_ap(dateStr, relStr);
							}())
						])),
					A2(
					$elm$html$Html$td,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('post-url')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href(
									A2($elm$core$Maybe$withDefault, '', post.url))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Open')
								]))
						]))
				]));
	});
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$th = _VirtualDom_node('th');
var $author$project$View$Posts$postTable = F3(
	function (postConf, time, listPost) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin-top', '20px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$table,
					_List_Nil,
					A2(
						$elm$core$List$cons,
						A2(
							$elm$html$Html$tr,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$th,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('Score')
										])),
									A2(
									$elm$html$Html$th,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('Title')
										])),
									A2(
									$elm$html$Html$th,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('Type')
										])),
									A2(
									$elm$html$Html$th,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('Posted date')
										])),
									A2(
									$elm$html$Html$th,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('Link')
										]))
								])),
						A2(
							$elm$core$List$map,
							$author$project$View$Posts$postareLinii(time),
							A2($author$project$Model$PostsConfig$filterPosts, postConf, listPost))))
				]));
	});
var $author$project$Model$PostsConfig$ChangePostsToShow = function (a) {
	return {$: 'ChangePostsToShow', a: a};
};
var $author$project$Model$PostsConfig$ChangeShowJobs = function (a) {
	return {$: 'ChangeShowJobs', a: a};
};
var $author$project$Model$PostsConfig$ChangeShowTextOnly = function (a) {
	return {$: 'ChangeShowTextOnly', a: a};
};
var $author$project$Model$PostsConfig$ChangeSortBy = function (a) {
	return {$: 'ChangeSortBy', a: a};
};
var $author$project$Model$ConfigChanged = function (a) {
	return {$: 'ConfigChanged', a: a};
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$checked = $elm$html$Html$Attributes$boolProperty('checked');
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$html$Html$Events$targetChecked = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'checked']),
	$elm$json$Json$Decode$bool);
var $elm$html$Html$Events$onCheck = function (tagger) {
	return A2(
		$elm$html$Html$Events$on,
		'change',
		A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetChecked));
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $author$project$Model$PostsConfig$Posted = {$: 'Posted'};
var $author$project$Model$PostsConfig$Score = {$: 'Score'};
var $author$project$Model$PostsConfig$Title = {$: 'Title'};
var $author$project$Model$PostsConfig$sortFromString = function (str) {
	switch (str) {
		case 'Score':
			return $elm$core$Maybe$Just($author$project$Model$PostsConfig$Score);
		case 'Title':
			return $elm$core$Maybe$Just($author$project$Model$PostsConfig$Title);
		case 'Posted':
			return $elm$core$Maybe$Just($author$project$Model$PostsConfig$Posted);
		case 'None':
			return $elm$core$Maybe$Just($author$project$Model$PostsConfig$None);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Model$PostsConfig$sortOptions = _List_fromArray(
	[$author$project$Model$PostsConfig$Score, $author$project$Model$PostsConfig$Title, $author$project$Model$PostsConfig$Posted, $author$project$Model$PostsConfig$None]);
var $author$project$Model$PostsConfig$sortToString = function (sort) {
	switch (sort.$) {
		case 'Score':
			return 'Score';
		case 'Title':
			return 'Title';
		case 'Posted':
			return 'Posted';
		default:
			return 'None';
	}
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$View$Posts$postsConfigView = function (conf) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'border', '1px solid #ddd'),
				A2($elm$html$Html$Attributes$style, 'padding', '15px'),
				A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
				A2($elm$html$Html$Attributes$style, 'background-color', '#f9f9f9')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$select,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('select-posts-per-page'),
						A2($elm$html$Html$Attributes$style, 'margin-bottom', '15px'),
						$elm$html$Html$Events$onInput(
						function (val) {
							return $author$project$Model$ConfigChanged(
								$author$project$Model$PostsConfig$ChangePostsToShow(
									A2(
										$elm$core$Maybe$withDefault,
										conf.postsToShow,
										$elm$core$String$toInt(val))));
						})
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$option,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$value('10'),
								$elm$html$Html$Attributes$selected(conf.postsToShow === 10)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('10')
							])),
						A2(
						$elm$html$Html$option,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$value('25'),
								$elm$html$Html$Attributes$selected(conf.postsToShow === 25)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('25')
							])),
						A2(
						$elm$html$Html$option,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$value('50'),
								$elm$html$Html$Attributes$selected(conf.postsToShow === 50)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('50')
							]))
					])),
				A2(
				$elm$html$Html$select,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('select-sort-by'),
						$elm$html$Html$Events$onInput(
						function (val) {
							var _v0 = $author$project$Model$PostsConfig$sortFromString(val);
							if (_v0.$ === 'Just') {
								var s = _v0.a;
								return $author$project$Model$ConfigChanged(
									$author$project$Model$PostsConfig$ChangeSortBy(s));
							} else {
								return $author$project$Model$ConfigChanged(
									$author$project$Model$PostsConfig$ChangeSortBy(conf.sortBy));
							}
						})
					]),
				A2(
					$elm$core$List$map,
					function (sortare) {
						return A2(
							$elm$html$Html$option,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$value(
									$author$project$Model$PostsConfig$sortToString(sortare)),
									$elm$html$Html$Attributes$selected(
									_Utils_eq(sortare, conf.sortBy))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$author$project$Model$PostsConfig$sortToString(sortare))
								]));
					},
					$author$project$Model$PostsConfig$sortOptions)),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'padding-top', '10px'),
						A2($elm$html$Html$Attributes$style, 'border-top', '1px solid #eee')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$label,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$for('checkbox-show-job-posts')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Show job posts')
							])),
						A2(
						$elm$html$Html$label,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$id('checkbox-show-job-posts'),
										$elm$html$Html$Attributes$type_('checkbox'),
										$elm$html$Html$Attributes$checked(conf.showJobs),
										$elm$html$Html$Events$onCheck(
										function (che) {
											return $author$project$Model$ConfigChanged(
												$author$project$Model$PostsConfig$ChangeShowJobs(che));
										})
									]),
								_List_Nil)
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'padding-top', '10px'),
						A2($elm$html$Html$Attributes$style, 'border-top', '1px solid #eee')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$label,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$for('checkbox-show-text-only-posts')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Show text only posts')
							])),
						A2(
						$elm$html$Html$label,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$id('checkbox-show-text-only-posts'),
										$elm$html$Html$Attributes$type_('checkbox'),
										$elm$html$Html$Attributes$checked(conf.showTextOnly),
										$elm$html$Html$Events$onCheck(
										function (che) {
											return $author$project$Model$ConfigChanged(
												$author$project$Model$PostsConfig$ChangeShowTextOnly(che));
										})
									]),
								_List_Nil)
							]))
					]))
			]));
};
var $author$project$Main$view = function (model) {
	var title = _Utils_eq(model.config.mode, $author$project$Model$Dev) ? 'HackerNews (DEV)' : 'HackerNews';
	var body = function () {
		var _v0 = model.state;
		switch (_v0.$) {
			case 'Empty':
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Loading')
						]));
			case 'FailedToLoad':
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Failed to load')
						]));
			case 'LoadedPosts':
				var config = _v0.a.config;
				var time = _v0.a.time;
				var posts = _v0.a.posts;
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$author$project$View$Posts$postsConfigView(config),
							A3($author$project$View$Posts$postTable, config, time, posts)
						]));
			case 'Loading':
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Loading stories')
						]));
			case 'LoadingPosts':
				var currentId = _v0.a.currentId;
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(
							'Loading post ' + $elm$core$String$fromInt(currentId))
						]));
			default:
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Other')
						]));
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(title)
					])),
				body
			]));
};
var $avh4$elm_program_test$ProgramTest$withSimulatedEffects = F2(
	function (fn, _v0) {
		var options = _v0.a;
		var program = _v0.b;
		return A2(
			$avh4$elm_program_test$ProgramTest$ProgramDefinition,
			_Utils_update(
				options,
				{
					deconstructEffect: $elm$core$Maybe$Just(fn)
				}),
			program);
	});
var $author$project$SimulatedEffect$start = A2(
	$avh4$elm_program_test$ProgramTest$start,
	_Utils_Tuple0,
	A2(
		$avh4$elm_program_test$ProgramTest$withSimulatedEffects,
		$author$project$SimulatedEffect$simulateEffect,
		$avh4$elm_program_test$ProgramTest$createElement(
			{
				init: $author$project$Main$init($author$project$Main$devFlags),
				update: $author$project$Main$update,
				view: $author$project$Main$view
			})));
var $author$project$SimulatedEffect$fromLoadedState = function () {
	var posts = A2($elm$core$List$take, 10, $author$project$TestData$posts);
	var postIds = $author$project$TestUtils$intListToJsonList(
		A2(
			$elm$core$List$map,
			function ($) {
				return $.id;
			},
			posts));
	var afterFirstRequest = A3($author$project$TestUtils$ensureHttpGetRequestWithResponse, $author$project$Main$devFlags.apiUrl + '/v0/topstories.json', postIds, $author$project$SimulatedEffect$start);
	return A3(
		$elm$core$List$foldl,
		F2(
			function (post, state) {
				return A3(
					$author$project$TestUtils$ensureHttpGetRequestWithResponse,
					$author$project$Main$devFlags.apiUrl + ('/v0/item/' + ($elm$core$String$fromInt(post.id) + '.json')),
					$author$project$TestData$encodePost(post),
					state);
			}),
		afterFirstRequest,
		posts);
}();
var $author$project$TestData$jobPosts = _List_fromArray(
	[
		{
		by: 'macklinkachorn',
		id: 42095453,
		score: 1,
		time: $elm$time$Time$millisToPosix(1731171672 * 1000),
		title: 'Trellis (YC W24) is hiring eng to turn documents into database',
		type_: 'job',
		url: $elm$core$Maybe$Just('https://www.ycombinator.com/companies/trellis/jobs/1ypWafM-founding-engineer-full-time-backend-ml-infra')
	}
	]);
var $author$project$Test$Runner$Node$Receive = function (a) {
	return {$: 'Receive', a: a};
};
var $elm_explorations$test$Test$Runner$Failure$DuplicatedName = {$: 'DuplicatedName'};
var $elm_explorations$test$Test$Internal$ElmTestVariant__Batch = function (a) {
	return {__elmTestSymbol: __elmTestSymbol, $: 'ElmTestVariant__Batch', a: a};
};
var $elm_explorations$test$Test$Runner$Failure$EmptyList = {$: 'EmptyList'};
var $elm_explorations$test$Test$Runner$Failure$Invalid = function (a) {
	return {$: 'Invalid', a: a};
};
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Set$isEmpty = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$isEmpty(dict);
};
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm_explorations$test$Test$Internal$duplicatedName = function (tests) {
	var names = function (test) {
		names:
		while (true) {
			switch (test.$) {
				case 'ElmTestVariant__Labeled':
					var str = test.a;
					return _List_fromArray(
						[str]);
				case 'ElmTestVariant__Batch':
					var subtests = test.a;
					return A2($elm$core$List$concatMap, names, subtests);
				case 'ElmTestVariant__UnitTest':
					return _List_Nil;
				case 'ElmTestVariant__FuzzTest':
					return _List_Nil;
				case 'ElmTestVariant__Skipped':
					var subTest = test.a;
					var $temp$test = subTest;
					test = $temp$test;
					continue names;
				default:
					var subTest = test.a;
					var $temp$test = subTest;
					test = $temp$test;
					continue names;
			}
		}
	};
	var accumDuplicates = F2(
		function (newName, _v2) {
			var dups = _v2.a;
			var uniques = _v2.b;
			return A2($elm$core$Set$member, newName, uniques) ? _Utils_Tuple2(
				A2($elm$core$Set$insert, newName, dups),
				uniques) : _Utils_Tuple2(
				dups,
				A2($elm$core$Set$insert, newName, uniques));
		});
	var _v1 = A3(
		$elm$core$List$foldl,
		accumDuplicates,
		_Utils_Tuple2($elm$core$Set$empty, $elm$core$Set$empty),
		A2($elm$core$List$concatMap, names, tests));
	var dupsAccum = _v1.a;
	var uniquesAccum = _v1.b;
	return $elm$core$Set$isEmpty(dupsAccum) ? $elm$core$Result$Ok(uniquesAccum) : $elm$core$Result$Err(dupsAccum);
};
var $elm_explorations$test$Test$Internal$ElmTestVariant__UnitTest = function (a) {
	return {__elmTestSymbol: __elmTestSymbol, $: 'ElmTestVariant__UnitTest', a: a};
};
var $elm_explorations$test$Test$Internal$failNow = function (record) {
	return $elm_explorations$test$Test$Internal$ElmTestVariant__UnitTest(
		function (_v0) {
			return _List_fromArray(
				[
					$elm_explorations$test$Test$Expectation$fail(record)
				]);
		});
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm_explorations$test$Test$concat = function (tests) {
	if ($elm$core$List$isEmpty(tests)) {
		return $elm_explorations$test$Test$Internal$failNow(
			{
				description: 'This `concat` has no tests in it. Let\'s give it some!',
				reason: $elm_explorations$test$Test$Runner$Failure$Invalid($elm_explorations$test$Test$Runner$Failure$EmptyList)
			});
	} else {
		var _v0 = $elm_explorations$test$Test$Internal$duplicatedName(tests);
		if (_v0.$ === 'Err') {
			var dups = _v0.a;
			var dupDescription = function (duped) {
				return 'A test group contains multiple tests named \'' + (duped + '\'. Do some renaming so that tests have unique names.');
			};
			return $elm_explorations$test$Test$Internal$failNow(
				{
					description: A2(
						$elm$core$String$join,
						'\n',
						A2(
							$elm$core$List$map,
							dupDescription,
							$elm$core$Set$toList(dups))),
					reason: $elm_explorations$test$Test$Runner$Failure$Invalid($elm_explorations$test$Test$Runner$Failure$DuplicatedName)
				});
		} else {
			return $elm_explorations$test$Test$Internal$ElmTestVariant__Batch(tests);
		}
	}
};
var $elm_explorations$test$Test$Runner$Failure$BadDescription = {$: 'BadDescription'};
var $elm_explorations$test$Test$Internal$ElmTestVariant__Labeled = F2(
	function (a, b) {
		return {__elmTestSymbol: __elmTestSymbol, $: 'ElmTestVariant__Labeled', a: a, b: b};
	});
var $elm$core$String$trim = _String_trim;
var $elm_explorations$test$Test$describe = F2(
	function (untrimmedDesc, tests) {
		var desc = $elm$core$String$trim(untrimmedDesc);
		if ($elm$core$String$isEmpty(desc)) {
			return $elm_explorations$test$Test$Internal$failNow(
				{
					description: 'This `describe` has a blank description. Let\'s give it a useful one!',
					reason: $elm_explorations$test$Test$Runner$Failure$Invalid($elm_explorations$test$Test$Runner$Failure$BadDescription)
				});
		} else {
			if ($elm$core$List$isEmpty(tests)) {
				return $elm_explorations$test$Test$Internal$failNow(
					{
						description: 'This `describe ' + (desc + '` has no tests in it. Let\'s give it some!'),
						reason: $elm_explorations$test$Test$Runner$Failure$Invalid($elm_explorations$test$Test$Runner$Failure$EmptyList)
					});
			} else {
				var _v0 = $elm_explorations$test$Test$Internal$duplicatedName(tests);
				if (_v0.$ === 'Err') {
					var dups = _v0.a;
					var dupDescription = function (duped) {
						return 'Contains multiple tests named \'' + (duped + '\'. Let\'s rename them so we know which is which.');
					};
					return A2(
						$elm_explorations$test$Test$Internal$ElmTestVariant__Labeled,
						desc,
						$elm_explorations$test$Test$Internal$failNow(
							{
								description: A2(
									$elm$core$String$join,
									'\n',
									A2(
										$elm$core$List$map,
										dupDescription,
										$elm$core$Set$toList(dups))),
								reason: $elm_explorations$test$Test$Runner$Failure$Invalid($elm_explorations$test$Test$Runner$Failure$DuplicatedName)
							}));
				} else {
					var childrenNames = _v0.a;
					return A2($elm$core$Set$member, desc, childrenNames) ? A2(
						$elm_explorations$test$Test$Internal$ElmTestVariant__Labeled,
						desc,
						$elm_explorations$test$Test$Internal$failNow(
							{
								description: 'The test \'' + (desc + '\' contains a child test of the same name. Let\'s rename them so we know which is which.'),
								reason: $elm_explorations$test$Test$Runner$Failure$Invalid($elm_explorations$test$Test$Runner$Failure$DuplicatedName)
							})) : A2(
						$elm_explorations$test$Test$Internal$ElmTestVariant__Labeled,
						desc,
						$elm_explorations$test$Test$Internal$ElmTestVariant__Batch(tests));
				}
			}
		}
	});
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Test$Runner$Node$elmTestPort__receive = _Platform_incomingPort('elmTestPort__receive', $elm$json$Json$Decode$value);
var $author$project$Test$Reporter$Reporter$TestReporter = F4(
	function (format, reportBegin, reportComplete, reportSummary) {
		return {format: format, reportBegin: reportBegin, reportComplete: reportComplete, reportSummary: reportSummary};
	});
var $author$project$Console$Text$Default = {$: 'Default'};
var $author$project$Console$Text$Normal = {$: 'Normal'};
var $author$project$Console$Text$Text = F2(
	function (a, b) {
		return {$: 'Text', a: a, b: b};
	});
var $author$project$Console$Text$plain = $author$project$Console$Text$Text(
	{background: $author$project$Console$Text$Default, foreground: $author$project$Console$Text$Default, modifiers: _List_Nil, style: $author$project$Console$Text$Normal});
var $author$project$Test$Reporter$Console$pluralize = F3(
	function (singular, plural, count) {
		var suffix = (count === 1) ? singular : plural;
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					$elm$core$String$fromInt(count),
					suffix
				]));
	});
var $author$project$Test$Runner$Node$Vendor$Console$colorsInverted = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[7m', str, '\u001B[27m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$dark = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[2m', str, '\u001B[22m']));
};
var $author$project$Console$Text$applyModifiersHelp = F2(
	function (modifier, str) {
		if (modifier.$ === 'Inverted') {
			return $author$project$Test$Runner$Node$Vendor$Console$colorsInverted(str);
		} else {
			return $author$project$Test$Runner$Node$Vendor$Console$dark(str);
		}
	});
var $author$project$Console$Text$applyModifiers = F2(
	function (modifiers, str) {
		return A3($elm$core$List$foldl, $author$project$Console$Text$applyModifiersHelp, str, modifiers);
	});
var $author$project$Test$Runner$Node$Vendor$Console$bold = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[1m', str, '\u001B[22m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$underline = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[4m', str, '\u001B[24m']));
};
var $author$project$Console$Text$applyStyle = F2(
	function (style, str) {
		switch (style.$) {
			case 'Normal':
				return str;
			case 'Bold':
				return $author$project$Test$Runner$Node$Vendor$Console$bold(str);
			default:
				return $author$project$Test$Runner$Node$Vendor$Console$underline(str);
		}
	});
var $author$project$Test$Runner$Node$Vendor$Console$bgBlack = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[40m', str, '\u001B[49m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$bgBlue = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[44m', str, '\u001B[49m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$bgCyan = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[46m', str, '\u001B[49m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$bgGreen = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[42m', str, '\u001B[49m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$bgMagenta = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[45m', str, '\u001B[49m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$bgRed = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[41m', str, '\u001B[49m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$bgWhite = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[47m', str, '\u001B[49m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$bgYellow = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[43m', str, '\u001B[49m']));
};
var $author$project$Console$Text$colorizeBackground = F2(
	function (color, str) {
		switch (color.$) {
			case 'Default':
				return str;
			case 'Red':
				return $author$project$Test$Runner$Node$Vendor$Console$bgRed(str);
			case 'Green':
				return $author$project$Test$Runner$Node$Vendor$Console$bgGreen(str);
			case 'Yellow':
				return $author$project$Test$Runner$Node$Vendor$Console$bgYellow(str);
			case 'Black':
				return $author$project$Test$Runner$Node$Vendor$Console$bgBlack(str);
			case 'Blue':
				return $author$project$Test$Runner$Node$Vendor$Console$bgBlue(str);
			case 'Magenta':
				return $author$project$Test$Runner$Node$Vendor$Console$bgMagenta(str);
			case 'Cyan':
				return $author$project$Test$Runner$Node$Vendor$Console$bgCyan(str);
			default:
				return $author$project$Test$Runner$Node$Vendor$Console$bgWhite(str);
		}
	});
var $author$project$Test$Runner$Node$Vendor$Console$black = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[30m', str, '\u001B[39m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$blue = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[34m', str, '\u001B[39m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$cyan = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[36m', str, '\u001B[39m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$green = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[32m', str, '\u001B[39m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$magenta = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[35m', str, '\u001B[39m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$red = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[31m', str, '\u001B[39m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$white = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[37m', str, '\u001B[39m']));
};
var $author$project$Test$Runner$Node$Vendor$Console$yellow = function (str) {
	return A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			['\u001B[33m', str, '\u001B[39m']));
};
var $author$project$Console$Text$colorizeForeground = F2(
	function (color, str) {
		switch (color.$) {
			case 'Default':
				return str;
			case 'Red':
				return $author$project$Test$Runner$Node$Vendor$Console$red(str);
			case 'Green':
				return $author$project$Test$Runner$Node$Vendor$Console$green(str);
			case 'Yellow':
				return $author$project$Test$Runner$Node$Vendor$Console$yellow(str);
			case 'Black':
				return $author$project$Test$Runner$Node$Vendor$Console$black(str);
			case 'Blue':
				return $author$project$Test$Runner$Node$Vendor$Console$blue(str);
			case 'Magenta':
				return $author$project$Test$Runner$Node$Vendor$Console$magenta(str);
			case 'Cyan':
				return $author$project$Test$Runner$Node$Vendor$Console$cyan(str);
			default:
				return $author$project$Test$Runner$Node$Vendor$Console$white(str);
		}
	});
var $author$project$Console$Text$render = F2(
	function (useColor, txt) {
		if (txt.$ === 'Text') {
			var attrs = txt.a;
			var str = txt.b;
			if (useColor.$ === 'UseColor') {
				return A2(
					$author$project$Console$Text$applyStyle,
					attrs.style,
					A2(
						$author$project$Console$Text$applyModifiers,
						attrs.modifiers,
						A2(
							$author$project$Console$Text$colorizeForeground,
							attrs.foreground,
							A2($author$project$Console$Text$colorizeBackground, attrs.background, str))));
			} else {
				return str;
			}
		} else {
			var texts = txt.a;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					$author$project$Console$Text$render(useColor),
					texts));
		}
	});
var $author$project$Test$Reporter$Console$textToValue = F2(
	function (useColor, txt) {
		return $elm$json$Json$Encode$string(
			A2($author$project$Console$Text$render, useColor, txt));
	});
var $author$project$Test$Reporter$Console$reportBegin = F2(
	function (useColor, _v0) {
		var globs = _v0.globs;
		var fuzzRuns = _v0.fuzzRuns;
		var testCount = _v0.testCount;
		var initialSeed = _v0.initialSeed;
		var prefix = 'Running ' + (A3($author$project$Test$Reporter$Console$pluralize, 'test', 'tests', testCount) + ('. To reproduce these results, run: elm-test --fuzz ' + ($elm$core$String$fromInt(fuzzRuns) + (' --seed ' + $elm$core$String$fromInt(initialSeed)))));
		return $elm$core$Maybe$Just(
			$elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('begin')),
						_Utils_Tuple2(
						'output',
						A2(
							$author$project$Test$Reporter$Console$textToValue,
							useColor,
							$author$project$Console$Text$plain(
								A2(
									$elm$core$String$join,
									' ',
									A2($elm$core$List$cons, prefix, globs)) + '\n')))
					])));
	});
var $author$project$Test$Reporter$JUnit$reportBegin = function (_v0) {
	return $elm$core$Maybe$Nothing;
};
var $author$project$Test$Reporter$Json$reportBegin = function (_v0) {
	var globs = _v0.globs;
	var paths = _v0.paths;
	var fuzzRuns = _v0.fuzzRuns;
	var testCount = _v0.testCount;
	var initialSeed = _v0.initialSeed;
	return $elm$core$Maybe$Just(
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'event',
					$elm$json$Json$Encode$string('runStart')),
					_Utils_Tuple2(
					'testCount',
					$elm$json$Json$Encode$string(
						$elm$core$String$fromInt(testCount))),
					_Utils_Tuple2(
					'fuzzRuns',
					$elm$json$Json$Encode$string(
						$elm$core$String$fromInt(fuzzRuns))),
					_Utils_Tuple2(
					'globs',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, globs)),
					_Utils_Tuple2(
					'paths',
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, paths)),
					_Utils_Tuple2(
					'initialSeed',
					$elm$json$Json$Encode$string(
						$elm$core$String$fromInt(initialSeed)))
				])));
};
var $elm_explorations$test$AsciiTable$AlignLeft = {$: 'AlignLeft'};
var $elm_explorations$test$AsciiTable$AlignRight = {$: 'AlignRight'};
var $elm_explorations$test$Test$Runner$Distribution$bars = 30;
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $elm_explorations$test$Test$Runner$Distribution$barView = function (_v0) {
	var count = _v0.count;
	var runsElapsed = _v0.runsElapsed;
	var percentage = count / runsElapsed;
	var barsForPercentage = percentage * $elm_explorations$test$Test$Runner$Distribution$bars;
	var fullBars = $elm$core$Basics$round(barsForPercentage);
	return A3(
		$elm$core$String$padRight,
		$elm_explorations$test$Test$Runner$Distribution$bars,
		_Utils_chr('░'),
		A2($elm$core$String$repeat, fullBars, '█'));
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$core$List$map3 = _List_map3;
var $elm_explorations$test$MicroListExtra$rowsLength = function (listOfLists) {
	if (!listOfLists.b) {
		return 0;
	} else {
		var x = listOfLists.a;
		return $elm$core$List$length(x);
	}
};
var $elm_explorations$test$MicroListExtra$transpose = function (listOfLists) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$List$map2($elm$core$List$cons),
		A2(
			$elm$core$List$repeat,
			$elm_explorations$test$MicroListExtra$rowsLength(listOfLists),
			_List_Nil),
		listOfLists);
};
var $elm_explorations$test$AsciiTable$view = F2(
	function (columns, items) {
		var padFn = F3(
			function (length, align, string) {
				if (align.$ === 'AlignLeft') {
					return A3(
						$elm$core$String$padRight,
						length,
						_Utils_chr(' '),
						string);
				} else {
					return A3(
						$elm$core$String$padLeft,
						length,
						_Utils_chr(' '),
						string);
				}
			});
		var columnData = A2(
			$elm$core$List$map,
			function (col) {
				return A2($elm$core$List$map, col.toString, items);
			},
			columns);
		var columnLengths = A2(
			$elm$core$List$map,
			function (colRows) {
				return A2(
					$elm$core$Maybe$withDefault,
					0,
					$elm$core$List$maximum(
						A2($elm$core$List$map, $elm$core$String$length, colRows)));
			},
			columnData);
		var paddedColumnData = A4(
			$elm$core$List$map3,
			F3(
				function (col, colLength, colStrings) {
					return A2(
						$elm$core$List$map,
						A2(padFn, colLength, col.align),
						colStrings);
				}),
			columns,
			columnLengths,
			columnData);
		return A3(
			$elm$core$List$map2,
			F2(
				function (item, rowCells) {
					return {
						item: item,
						renderedRow: A2($elm$core$String$join, '  ', rowCells)
					};
				}),
			items,
			$elm_explorations$test$MicroListExtra$transpose(paddedColumnData));
	});
var $elm_explorations$test$Test$Runner$Distribution$viewLabels = function (labels) {
	return $elm$core$List$isEmpty(labels) ? '<uncategorized>' : A2($elm$core$String$join, ', ', labels);
};
var $elm_explorations$test$Test$Runner$Distribution$formatAsciiTable = F2(
	function (runsElapsed, items) {
		return A2(
			$elm_explorations$test$AsciiTable$view,
			_List_fromArray(
				[
					{
					align: $elm_explorations$test$AsciiTable$AlignLeft,
					toString: function (_v0) {
						var labels = _v0.a;
						return '  ' + ($elm_explorations$test$Test$Runner$Distribution$viewLabels(labels) + ':');
					}
				},
					{
					align: $elm_explorations$test$AsciiTable$AlignRight,
					toString: function (_v1) {
						var percentage = _v1.c;
						return $elm$core$String$fromFloat(percentage) + '%';
					}
				},
					{
					align: $elm_explorations$test$AsciiTable$AlignRight,
					toString: function (_v2) {
						var count = _v2.b;
						return '(' + ($elm$core$String$fromInt(count) + 'x)');
					}
				},
					{
					align: $elm_explorations$test$AsciiTable$AlignLeft,
					toString: function (_v3) {
						var count = _v3.b;
						return $elm_explorations$test$Test$Runner$Distribution$barView(
							{count: count, runsElapsed: runsElapsed});
					}
				}
				]),
			items);
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2($elm$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});
var $elm$core$Set$diff = F2(
	function (_v0, _v1) {
		var dict1 = _v0.a;
		var dict2 = _v1.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$diff, dict1, dict2));
	});
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $elm_explorations$test$Test$Runner$Distribution$isStrictSubset = F2(
	function (all, combination) {
		var combinationSet = $elm$core$Set$fromList(combination);
		var containsCombinationFully = function (set) {
			return (!$elm$core$Set$isEmpty(
				A2($elm$core$Set$diff, set, combinationSet))) && $elm$core$Set$isEmpty(
				A2($elm$core$Set$diff, combinationSet, set));
		};
		var allSets = A2(
			$elm$core$List$map,
			A2($elm$core$Basics$composeR, $elm$core$Tuple$first, $elm$core$Set$fromList),
			all);
		return A2($elm$core$List$any, containsCombinationFully, allSets);
	});
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $elm$core$List$sortBy = _List_sortBy;
var $elm_explorations$test$MicroListExtra$findIndexHelp = F3(
	function (index, predicate, list) {
		findIndexHelp:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					return $elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$predicate = predicate,
						$temp$list = xs;
					index = $temp$index;
					predicate = $temp$predicate;
					list = $temp$list;
					continue findIndexHelp;
				}
			}
		}
	});
var $elm_explorations$test$MicroListExtra$findIndex = $elm_explorations$test$MicroListExtra$findIndexHelp(0);
var $elm_explorations$test$MicroListExtra$splitAt = F2(
	function (n, xs) {
		return _Utils_Tuple2(
			A2($elm$core$List$take, n, xs),
			A2($elm$core$List$drop, n, xs));
	});
var $elm_explorations$test$MicroListExtra$splitWhen = F2(
	function (predicate, list) {
		return A2(
			$elm$core$Maybe$map,
			function (i) {
				return A2($elm_explorations$test$MicroListExtra$splitAt, i, list);
			},
			A2($elm_explorations$test$MicroListExtra$findIndex, predicate, list));
	});
var $elm_explorations$test$Test$Runner$Distribution$formatTable = function (_v0) {
	var runsElapsed = _v0.runsElapsed;
	var distributionCount = _v0.distributionCount;
	var runsElapsed_ = runsElapsed;
	var distributionList = $elm$core$Dict$toList(distributionCount);
	var distribution = A2(
		$elm$core$List$map,
		function (_v8) {
			var labels = _v8.a;
			var count = _v8.b;
			var percentage = $elm$core$Basics$round((count / runsElapsed_) * 1000) / 10;
			return _Utils_Tuple3(labels, count, percentage);
		},
		A2(
			$elm$core$List$filter,
			function (_v7) {
				var labels = _v7.a;
				var count = _v7.b;
				return !(($elm$core$List$length(labels) === 1) && ((!count) && A2($elm_explorations$test$Test$Runner$Distribution$isStrictSubset, distributionList, labels)));
			},
			distributionList));
	var _v1 = A2(
		$elm$core$List$partition,
		function (_v3) {
			var labels = _v3.a;
			return $elm$core$List$length(labels) <= 1;
		},
		A2(
			$elm$core$List$sortBy,
			function (_v2) {
				var count = _v2.b;
				return -count;
			},
			distribution));
	var baseRows = _v1.a;
	var combinationsRows = _v1.b;
	var reorderedTable = _Utils_ap(baseRows, combinationsRows);
	var rawTable = A2($elm_explorations$test$Test$Runner$Distribution$formatAsciiTable, runsElapsed_, reorderedTable);
	var _v4 = A2(
		$elm$core$Maybe$withDefault,
		_Utils_Tuple2(rawTable, _List_Nil),
		A2(
			$elm_explorations$test$MicroListExtra$splitWhen,
			function (_v5) {
				var item = _v5.item;
				var _v6 = item;
				var labels = _v6.a;
				return $elm$core$List$length(labels) > 1;
			},
			rawTable));
	var base = _v4.a;
	var combinations = _v4.b;
	var baseString = A2(
		$elm$core$String$join,
		'\n',
		A2(
			$elm$core$List$map,
			function ($) {
				return $.renderedRow;
			},
			base));
	var combinationsString_ = $elm$core$List$isEmpty(combinations) ? '' : A3(
		$elm$core$String$replace,
		'{COMBINATIONS}',
		A2(
			$elm$core$String$join,
			'\n',
			A2(
				$elm$core$List$map,
				function ($) {
					return $.renderedRow;
				},
				combinations)),
		'\n\nCombinations (included in the above base counts):\n{COMBINATIONS}');
	var table = _Utils_ap(baseString, combinationsString_);
	return A3($elm$core$String$replace, '{CATEGORIES}', table, 'Distribution report:\n====================\n{CATEGORIES}');
};
var $elm_explorations$test$Test$Distribution$distributionReportTable = function (r) {
	return $elm_explorations$test$Test$Runner$Distribution$formatTable(r);
};
var $author$project$Test$Reporter$Console$distributionReportToString = function (distributionReport) {
	switch (distributionReport.$) {
		case 'NoDistribution':
			return $elm$core$Maybe$Nothing;
		case 'DistributionToReport':
			var r = distributionReport.a;
			return $elm$core$Maybe$Just(
				$elm_explorations$test$Test$Distribution$distributionReportTable(r));
		case 'DistributionCheckSucceeded':
			return $elm$core$Maybe$Nothing;
		default:
			var r = distributionReport.a;
			return $elm$core$Maybe$Just(
				$elm_explorations$test$Test$Distribution$distributionReportTable(r));
	}
};
var $author$project$Console$Text$Texts = function (a) {
	return {$: 'Texts', a: a};
};
var $author$project$Console$Text$concat = $author$project$Console$Text$Texts;
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $author$project$Console$Text$Dark = {$: 'Dark'};
var $author$project$Console$Text$dark = function (txt) {
	if (txt.$ === 'Text') {
		var styles = txt.a;
		var str = txt.b;
		return A2(
			$author$project$Console$Text$Text,
			_Utils_update(
				styles,
				{
					modifiers: A2($elm$core$List$cons, $author$project$Console$Text$Dark, styles.modifiers)
				}),
			str);
	} else {
		var texts = txt.a;
		return $author$project$Console$Text$Texts(
			A2($elm$core$List$map, $author$project$Console$Text$dark, texts));
	}
};
var $elm_explorations$test$Test$Runner$formatLabels = F3(
	function (formatDescription, formatTest, labels) {
		var _v0 = A2(
			$elm$core$List$filter,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
			labels);
		if (!_v0.b) {
			return _List_Nil;
		} else {
			var test = _v0.a;
			var descriptions = _v0.b;
			return $elm$core$List$reverse(
				A2(
					$elm$core$List$cons,
					formatTest(test),
					A2($elm$core$List$map, formatDescription, descriptions)));
		}
	});
var $author$project$Console$Text$Red = {$: 'Red'};
var $author$project$Console$Text$red = $author$project$Console$Text$Text(
	{background: $author$project$Console$Text$Default, foreground: $author$project$Console$Text$Red, modifiers: _List_Nil, style: $author$project$Console$Text$Normal});
var $author$project$Test$Reporter$Console$withChar = F2(
	function (icon, str) {
		return $elm$core$String$fromChar(icon) + (' ' + (str + '\n'));
	});
var $author$project$Test$Reporter$Console$failureLabelsToText = A2(
	$elm$core$Basics$composeR,
	A2(
		$elm_explorations$test$Test$Runner$formatLabels,
		A2(
			$elm$core$Basics$composeL,
			A2($elm$core$Basics$composeL, $author$project$Console$Text$dark, $author$project$Console$Text$plain),
			$author$project$Test$Reporter$Console$withChar(
				_Utils_chr('↓'))),
		A2(
			$elm$core$Basics$composeL,
			$author$project$Console$Text$red,
			$author$project$Test$Reporter$Console$withChar(
				_Utils_chr('✗')))),
	$author$project$Console$Text$concat);
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $author$project$Test$Runner$Node$Vendor$Diff$Added = function (a) {
	return {$: 'Added', a: a};
};
var $author$project$Test$Runner$Node$Vendor$Diff$CannotGetA = function (a) {
	return {$: 'CannotGetA', a: a};
};
var $author$project$Test$Runner$Node$Vendor$Diff$CannotGetB = function (a) {
	return {$: 'CannotGetB', a: a};
};
var $author$project$Test$Runner$Node$Vendor$Diff$NoChange = function (a) {
	return {$: 'NoChange', a: a};
};
var $author$project$Test$Runner$Node$Vendor$Diff$Removed = function (a) {
	return {$: 'Removed', a: a};
};
var $author$project$Test$Runner$Node$Vendor$Diff$UnexpectedPath = F2(
	function (a, b) {
		return {$: 'UnexpectedPath', a: a, b: b};
	});
var $author$project$Test$Runner$Node$Vendor$Diff$makeChangesHelp = F5(
	function (changes, getA, getB, _v0, path) {
		makeChangesHelp:
		while (true) {
			var x = _v0.a;
			var y = _v0.b;
			if (!path.b) {
				return $elm$core$Result$Ok(changes);
			} else {
				var _v2 = path.a;
				var prevX = _v2.a;
				var prevY = _v2.b;
				var tail = path.b;
				var change = function () {
					if (_Utils_eq(x - 1, prevX) && _Utils_eq(y - 1, prevY)) {
						var _v4 = getA(x);
						if (_v4.$ === 'Just') {
							var a = _v4.a;
							return $elm$core$Result$Ok(
								$author$project$Test$Runner$Node$Vendor$Diff$NoChange(a));
						} else {
							return $elm$core$Result$Err(
								$author$project$Test$Runner$Node$Vendor$Diff$CannotGetA(x));
						}
					} else {
						if (_Utils_eq(x, prevX)) {
							var _v5 = getB(y);
							if (_v5.$ === 'Just') {
								var b = _v5.a;
								return $elm$core$Result$Ok(
									$author$project$Test$Runner$Node$Vendor$Diff$Added(b));
							} else {
								return $elm$core$Result$Err(
									$author$project$Test$Runner$Node$Vendor$Diff$CannotGetB(y));
							}
						} else {
							if (_Utils_eq(y, prevY)) {
								var _v6 = getA(x);
								if (_v6.$ === 'Just') {
									var a = _v6.a;
									return $elm$core$Result$Ok(
										$author$project$Test$Runner$Node$Vendor$Diff$Removed(a));
								} else {
									return $elm$core$Result$Err(
										$author$project$Test$Runner$Node$Vendor$Diff$CannotGetA(x));
								}
							} else {
								return $elm$core$Result$Err(
									A2(
										$author$project$Test$Runner$Node$Vendor$Diff$UnexpectedPath,
										_Utils_Tuple2(x, y),
										path));
							}
						}
					}
				}();
				if (change.$ === 'Err') {
					var err = change.a;
					return $elm$core$Result$Err(err);
				} else {
					var c = change.a;
					var $temp$changes = A2($elm$core$List$cons, c, changes),
						$temp$getA = getA,
						$temp$getB = getB,
						$temp$_v0 = _Utils_Tuple2(prevX, prevY),
						$temp$path = tail;
					changes = $temp$changes;
					getA = $temp$getA;
					getB = $temp$getB;
					_v0 = $temp$_v0;
					path = $temp$path;
					continue makeChangesHelp;
				}
			}
		}
	});
var $author$project$Test$Runner$Node$Vendor$Diff$makeChanges = F3(
	function (getA, getB, path) {
		if (!path.b) {
			return $elm$core$Result$Ok(_List_Nil);
		} else {
			var latest = path.a;
			var tail = path.b;
			return A5($author$project$Test$Runner$Node$Vendor$Diff$makeChangesHelp, _List_Nil, getA, getB, latest, tail);
		}
	});
var $author$project$Test$Runner$Node$Vendor$Diff$Continue = function (a) {
	return {$: 'Continue', a: a};
};
var $author$project$Test$Runner$Node$Vendor$Diff$Found = function (a) {
	return {$: 'Found', a: a};
};
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (_v0.$ === 'SubTree') {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $author$project$Test$Runner$Node$Vendor$Diff$step = F4(
	function (snake_, offset, k, v) {
		var fromTop = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2($elm$core$Array$get, (k + 1) + offset, v));
		var fromLeft = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2($elm$core$Array$get, (k - 1) + offset, v));
		var _v0 = function () {
			var _v2 = _Utils_Tuple2(fromLeft, fromTop);
			if (!_v2.a.b) {
				if (!_v2.b.b) {
					return _Utils_Tuple2(
						_List_Nil,
						_Utils_Tuple2(0, 0));
				} else {
					var _v3 = _v2.b;
					var _v4 = _v3.a;
					var topX = _v4.a;
					var topY = _v4.b;
					return _Utils_Tuple2(
						fromTop,
						_Utils_Tuple2(topX + 1, topY));
				}
			} else {
				if (!_v2.b.b) {
					var _v5 = _v2.a;
					var _v6 = _v5.a;
					var leftX = _v6.a;
					var leftY = _v6.b;
					return _Utils_Tuple2(
						fromLeft,
						_Utils_Tuple2(leftX, leftY + 1));
				} else {
					var _v7 = _v2.a;
					var _v8 = _v7.a;
					var leftX = _v8.a;
					var leftY = _v8.b;
					var _v9 = _v2.b;
					var _v10 = _v9.a;
					var topX = _v10.a;
					var topY = _v10.b;
					return (_Utils_cmp(leftY + 1, topY) > -1) ? _Utils_Tuple2(
						fromLeft,
						_Utils_Tuple2(leftX, leftY + 1)) : _Utils_Tuple2(
						fromTop,
						_Utils_Tuple2(topX + 1, topY));
				}
			}
		}();
		var path = _v0.a;
		var _v1 = _v0.b;
		var x = _v1.a;
		var y = _v1.b;
		var _v11 = A3(
			snake_,
			x + 1,
			y + 1,
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(x, y),
				path));
		var newPath = _v11.a;
		var goal = _v11.b;
		return goal ? $author$project$Test$Runner$Node$Vendor$Diff$Found(newPath) : $author$project$Test$Runner$Node$Vendor$Diff$Continue(
			A3($elm$core$Array$set, k + offset, newPath, v));
	});
var $author$project$Test$Runner$Node$Vendor$Diff$onpLoopK = F4(
	function (snake_, offset, ks, v) {
		onpLoopK:
		while (true) {
			if (!ks.b) {
				return $author$project$Test$Runner$Node$Vendor$Diff$Continue(v);
			} else {
				var k = ks.a;
				var ks_ = ks.b;
				var _v1 = A4($author$project$Test$Runner$Node$Vendor$Diff$step, snake_, offset, k, v);
				if (_v1.$ === 'Found') {
					var path = _v1.a;
					return $author$project$Test$Runner$Node$Vendor$Diff$Found(path);
				} else {
					var v_ = _v1.a;
					var $temp$snake_ = snake_,
						$temp$offset = offset,
						$temp$ks = ks_,
						$temp$v = v_;
					snake_ = $temp$snake_;
					offset = $temp$offset;
					ks = $temp$ks;
					v = $temp$v;
					continue onpLoopK;
				}
			}
		}
	});
var $author$project$Test$Runner$Node$Vendor$Diff$onpLoopP = F5(
	function (snake_, delta, offset, p, v) {
		onpLoopP:
		while (true) {
			var ks = (delta > 0) ? _Utils_ap(
				$elm$core$List$reverse(
					A2($elm$core$List$range, delta + 1, delta + p)),
				A2($elm$core$List$range, -p, delta)) : _Utils_ap(
				$elm$core$List$reverse(
					A2($elm$core$List$range, delta + 1, p)),
				A2($elm$core$List$range, (-p) + delta, delta));
			var _v0 = A4($author$project$Test$Runner$Node$Vendor$Diff$onpLoopK, snake_, offset, ks, v);
			if (_v0.$ === 'Found') {
				var path = _v0.a;
				return path;
			} else {
				var v_ = _v0.a;
				var $temp$snake_ = snake_,
					$temp$delta = delta,
					$temp$offset = offset,
					$temp$p = p + 1,
					$temp$v = v_;
				snake_ = $temp$snake_;
				delta = $temp$delta;
				offset = $temp$offset;
				p = $temp$p;
				v = $temp$v;
				continue onpLoopP;
			}
		}
	});
var $author$project$Test$Runner$Node$Vendor$Diff$snake = F5(
	function (getA, getB, nextX, nextY, path) {
		snake:
		while (true) {
			var _v0 = _Utils_Tuple2(
				getA(nextX),
				getB(nextY));
			_v0$2:
			while (true) {
				if (_v0.a.$ === 'Just') {
					if (_v0.b.$ === 'Just') {
						var a = _v0.a.a;
						var b = _v0.b.a;
						if (_Utils_eq(a, b)) {
							var $temp$getA = getA,
								$temp$getB = getB,
								$temp$nextX = nextX + 1,
								$temp$nextY = nextY + 1,
								$temp$path = A2(
								$elm$core$List$cons,
								_Utils_Tuple2(nextX, nextY),
								path);
							getA = $temp$getA;
							getB = $temp$getB;
							nextX = $temp$nextX;
							nextY = $temp$nextY;
							path = $temp$path;
							continue snake;
						} else {
							return _Utils_Tuple2(path, false);
						}
					} else {
						break _v0$2;
					}
				} else {
					if (_v0.b.$ === 'Nothing') {
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						return _Utils_Tuple2(path, true);
					} else {
						break _v0$2;
					}
				}
			}
			return _Utils_Tuple2(path, false);
		}
	});
var $author$project$Test$Runner$Node$Vendor$Diff$onp = F4(
	function (getA, getB, m, n) {
		var v = A2(
			$elm$core$Array$initialize,
			(m + n) + 1,
			$elm$core$Basics$always(_List_Nil));
		var delta = n - m;
		return A5(
			$author$project$Test$Runner$Node$Vendor$Diff$onpLoopP,
			A2($author$project$Test$Runner$Node$Vendor$Diff$snake, getA, getB),
			delta,
			m,
			0,
			v);
	});
var $author$project$Test$Runner$Node$Vendor$Diff$testDiff = F2(
	function (a, b) {
		var arrB = $elm$core$Array$fromList(b);
		var getB = function (y) {
			return A2($elm$core$Array$get, y - 1, arrB);
		};
		var n = $elm$core$Array$length(arrB);
		var arrA = $elm$core$Array$fromList(a);
		var getA = function (x) {
			return A2($elm$core$Array$get, x - 1, arrA);
		};
		var m = $elm$core$Array$length(arrA);
		var path = A4($author$project$Test$Runner$Node$Vendor$Diff$onp, getA, getB, m, n);
		return A3($author$project$Test$Runner$Node$Vendor$Diff$makeChanges, getA, getB, path);
	});
var $author$project$Test$Runner$Node$Vendor$Diff$diff = F2(
	function (a, b) {
		var _v0 = A2($author$project$Test$Runner$Node$Vendor$Diff$testDiff, a, b);
		if (_v0.$ === 'Ok') {
			var changes = _v0.a;
			return changes;
		} else {
			return _List_Nil;
		}
	});
var $author$project$Test$Reporter$Highlightable$Highlighted = function (a) {
	return {$: 'Highlighted', a: a};
};
var $author$project$Test$Reporter$Highlightable$Plain = function (a) {
	return {$: 'Plain', a: a};
};
var $author$project$Test$Reporter$Highlightable$fromDiff = function (diff) {
	switch (diff.$) {
		case 'Added':
			return _List_Nil;
		case 'Removed':
			var _char = diff.a;
			return _List_fromArray(
				[
					$author$project$Test$Reporter$Highlightable$Highlighted(_char)
				]);
		default:
			var _char = diff.a;
			return _List_fromArray(
				[
					$author$project$Test$Reporter$Highlightable$Plain(_char)
				]);
	}
};
var $author$project$Test$Reporter$Highlightable$diffLists = F2(
	function (expected, actual) {
		return A2(
			$elm$core$List$concatMap,
			$author$project$Test$Reporter$Highlightable$fromDiff,
			A2($author$project$Test$Runner$Node$Vendor$Diff$diff, expected, actual));
	});
var $author$project$Test$Reporter$Console$Format$isFloat = function (str) {
	var _v0 = $elm$core$String$toFloat(str);
	if (_v0.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $author$project$Test$Reporter$Highlightable$map = F2(
	function (transform, highlightable) {
		if (highlightable.$ === 'Highlighted') {
			var val = highlightable.a;
			return $author$project$Test$Reporter$Highlightable$Highlighted(
				transform(val));
		} else {
			var val = highlightable.a;
			return $author$project$Test$Reporter$Highlightable$Plain(
				transform(val));
		}
	});
var $author$project$Test$Reporter$Highlightable$resolve = F2(
	function (_v0, highlightable) {
		var fromHighlighted = _v0.fromHighlighted;
		var fromPlain = _v0.fromPlain;
		if (highlightable.$ === 'Highlighted') {
			var val = highlightable.a;
			return fromHighlighted(val);
		} else {
			var val = highlightable.a;
			return fromPlain(val);
		}
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $author$project$Test$Reporter$Console$Format$highlightEqual = F2(
	function (expected, actual) {
		if ((expected === '\"\"') || (actual === '\"\"')) {
			return $elm$core$Maybe$Nothing;
		} else {
			if ($author$project$Test$Reporter$Console$Format$isFloat(expected) && $author$project$Test$Reporter$Console$Format$isFloat(actual)) {
				return $elm$core$Maybe$Nothing;
			} else {
				var isHighlighted = $author$project$Test$Reporter$Highlightable$resolve(
					{
						fromHighlighted: $elm$core$Basics$always(true),
						fromPlain: $elm$core$Basics$always(false)
					});
				var expectedChars = $elm$core$String$toList(expected);
				var edgeCount = function (highlightedString) {
					var highlights = A2($elm$core$List$map, isHighlighted, highlightedString);
					return $elm$core$List$length(
						A2(
							$elm$core$List$filter,
							function (_v0) {
								var lhs = _v0.a;
								var rhs = _v0.b;
								return !_Utils_eq(lhs, rhs);
							},
							A3(
								$elm$core$List$map2,
								$elm$core$Tuple$pair,
								A2($elm$core$List$drop, 1, highlights),
								highlights)));
				};
				var actualChars = $elm$core$String$toList(actual);
				var highlightedActual = A2(
					$elm$core$List$map,
					$author$project$Test$Reporter$Highlightable$map($elm$core$String$fromChar),
					A2($author$project$Test$Reporter$Highlightable$diffLists, actualChars, expectedChars));
				var highlightedExpected = A2(
					$elm$core$List$map,
					$author$project$Test$Reporter$Highlightable$map($elm$core$String$fromChar),
					A2($author$project$Test$Reporter$Highlightable$diffLists, expectedChars, actualChars));
				var plainCharCount = $elm$core$List$length(
					A2(
						$elm$core$List$filter,
						A2($elm$core$Basics$composeL, $elm$core$Basics$not, isHighlighted),
						highlightedExpected));
				return ((_Utils_cmp(
					edgeCount(highlightedActual),
					plainCharCount) > 0) || (_Utils_cmp(
					edgeCount(highlightedExpected),
					plainCharCount) > 0)) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
					_Utils_Tuple2(highlightedExpected, highlightedActual));
			}
		}
	});
var $author$project$Test$Reporter$Console$Format$verticalBar = F3(
	function (comparison, expected, actual) {
		return A2(
			$elm$core$String$join,
			'\n',
			_List_fromArray(
				[actual, '╷', '│ ' + comparison, '╵', expected]));
	});
var $author$project$Test$Reporter$Console$Format$listDiffToString = F4(
	function (index, description, _v0, originals) {
		listDiffToString:
		while (true) {
			var expected = _v0.expected;
			var actual = _v0.actual;
			var _v1 = _Utils_Tuple2(expected, actual);
			if (!_v1.a.b) {
				if (!_v1.b.b) {
					return A2(
						$elm$core$String$join,
						'',
						_List_fromArray(
							[
								'Two lists were unequal previously, yet ended up equal later.',
								'This should never happen!',
								'Please report this bug to https://github.com/elm-community/elm-test/issues - and include these lists: ',
								'\n',
								A2($elm$core$String$join, ', ', originals.originalExpected),
								'\n',
								A2($elm$core$String$join, ', ', originals.originalActual)
							]));
				} else {
					var _v3 = _v1.b;
					return A3(
						$author$project$Test$Reporter$Console$Format$verticalBar,
						description + ' was longer than',
						A2($elm$core$String$join, ', ', originals.originalExpected),
						A2($elm$core$String$join, ', ', originals.originalActual));
				}
			} else {
				if (!_v1.b.b) {
					var _v2 = _v1.a;
					return A3(
						$author$project$Test$Reporter$Console$Format$verticalBar,
						description + ' was shorter than',
						A2($elm$core$String$join, ', ', originals.originalExpected),
						A2($elm$core$String$join, ', ', originals.originalActual));
				} else {
					var _v4 = _v1.a;
					var firstExpected = _v4.a;
					var restExpected = _v4.b;
					var _v5 = _v1.b;
					var firstActual = _v5.a;
					var restActual = _v5.b;
					if (_Utils_eq(firstExpected, firstActual)) {
						var $temp$index = index + 1,
							$temp$description = description,
							$temp$_v0 = {actual: restActual, expected: restExpected},
							$temp$originals = originals;
						index = $temp$index;
						description = $temp$description;
						_v0 = $temp$_v0;
						originals = $temp$originals;
						continue listDiffToString;
					} else {
						return A2(
							$elm$core$String$join,
							'',
							_List_fromArray(
								[
									A3(
									$author$project$Test$Reporter$Console$Format$verticalBar,
									description,
									A2($elm$core$String$join, ', ', originals.originalExpected),
									A2($elm$core$String$join, ', ', originals.originalActual)),
									'\n\nThe first diff is at index ',
									$elm$core$String$fromInt(index),
									': it was `',
									firstActual,
									'`, but `',
									firstExpected,
									'` was expected.'
								]));
					}
				}
			}
		}
	});
var $author$project$Test$Reporter$Console$Format$format = F3(
	function (formatEquality, description, reason) {
		switch (reason.$) {
			case 'Custom':
				return description;
			case 'Equality':
				var expected = reason.a;
				var actual = reason.b;
				var _v1 = A2($author$project$Test$Reporter$Console$Format$highlightEqual, expected, actual);
				if (_v1.$ === 'Nothing') {
					return A3($author$project$Test$Reporter$Console$Format$verticalBar, description, expected, actual);
				} else {
					var _v2 = _v1.a;
					var highlightedExpected = _v2.a;
					var highlightedActual = _v2.b;
					var _v3 = A2(formatEquality, highlightedExpected, highlightedActual);
					var formattedExpected = _v3.a;
					var formattedActual = _v3.b;
					return A3($author$project$Test$Reporter$Console$Format$verticalBar, description, formattedExpected, formattedActual);
				}
			case 'Comparison':
				var first = reason.a;
				var second = reason.b;
				return A3($author$project$Test$Reporter$Console$Format$verticalBar, description, first, second);
			case 'TODO':
				return description;
			case 'Invalid':
				if (reason.a.$ === 'BadDescription') {
					var _v4 = reason.a;
					return (description === '') ? 'The empty string is not a valid test description.' : ('This is an invalid test description: ' + description);
				} else {
					return description;
				}
			case 'ListDiff':
				var expected = reason.a;
				var actual = reason.b;
				return A4(
					$author$project$Test$Reporter$Console$Format$listDiffToString,
					0,
					description,
					{actual: actual, expected: expected},
					{originalActual: actual, originalExpected: expected});
			default:
				var expected = reason.a.expected;
				var actual = reason.a.actual;
				var extra = reason.a.extra;
				var missing = reason.a.missing;
				var missingStr = $elm$core$List$isEmpty(missing) ? '' : ('\nThese keys are missing: ' + function (d) {
					return '[ ' + (d + ' ]');
				}(
					A2($elm$core$String$join, ', ', missing)));
				var extraStr = $elm$core$List$isEmpty(extra) ? '' : ('\nThese keys are extra: ' + function (d) {
					return '[ ' + (d + ' ]');
				}(
					A2($elm$core$String$join, ', ', extra)));
				return A2(
					$elm$core$String$join,
					'',
					_List_fromArray(
						[
							A3($author$project$Test$Reporter$Console$Format$verticalBar, description, expected, actual),
							'\n',
							extraStr,
							missingStr
						]));
		}
	});
var $author$project$Test$Reporter$Console$Format$Color$fromHighlightable = $author$project$Test$Reporter$Highlightable$resolve(
	{fromHighlighted: $author$project$Test$Runner$Node$Vendor$Console$colorsInverted, fromPlain: $elm$core$Basics$identity});
var $author$project$Test$Reporter$Console$Format$Color$formatEquality = F2(
	function (highlightedExpected, highlightedActual) {
		var formattedExpected = A2(
			$elm$core$String$join,
			'',
			A2($elm$core$List$map, $author$project$Test$Reporter$Console$Format$Color$fromHighlightable, highlightedExpected));
		var formattedActual = A2(
			$elm$core$String$join,
			'',
			A2($elm$core$List$map, $author$project$Test$Reporter$Console$Format$Color$fromHighlightable, highlightedActual));
		return _Utils_Tuple2(formattedExpected, formattedActual);
	});
var $author$project$Test$Reporter$Console$Format$Monochrome$fromHighlightable = function (indicator) {
	return $author$project$Test$Reporter$Highlightable$resolve(
		{
			fromHighlighted: function (_char) {
				return _Utils_Tuple2(_char, indicator);
			},
			fromPlain: function (_char) {
				return _Utils_Tuple2(_char, ' ');
			}
		});
};
var $elm$core$List$unzip = function (pairs) {
	var step = F2(
		function (_v0, _v1) {
			var x = _v0.a;
			var y = _v0.b;
			var xs = _v1.a;
			var ys = _v1.b;
			return _Utils_Tuple2(
				A2($elm$core$List$cons, x, xs),
				A2($elm$core$List$cons, y, ys));
		});
	return A3(
		$elm$core$List$foldr,
		step,
		_Utils_Tuple2(_List_Nil, _List_Nil),
		pairs);
};
var $author$project$Test$Reporter$Console$Format$Monochrome$formatEquality = F2(
	function (highlightedExpected, highlightedActual) {
		var _v0 = $elm$core$List$unzip(
			A2(
				$elm$core$List$map,
				$author$project$Test$Reporter$Console$Format$Monochrome$fromHighlightable('▲'),
				highlightedExpected));
		var formattedExpected = _v0.a;
		var expectedIndicators = _v0.b;
		var combinedExpected = A2(
			$elm$core$String$join,
			'\n',
			_List_fromArray(
				[
					A2($elm$core$String$join, '', formattedExpected),
					A2($elm$core$String$join, '', expectedIndicators)
				]));
		var _v1 = $elm$core$List$unzip(
			A2(
				$elm$core$List$map,
				$author$project$Test$Reporter$Console$Format$Monochrome$fromHighlightable('▼'),
				highlightedActual));
		var formattedActual = _v1.a;
		var actualIndicators = _v1.b;
		var combinedActual = A2(
			$elm$core$String$join,
			'\n',
			_List_fromArray(
				[
					A2($elm$core$String$join, '', actualIndicators),
					A2($elm$core$String$join, '', formattedActual)
				]));
		return _Utils_Tuple2(combinedExpected, combinedActual);
	});
var $author$project$Test$Reporter$Console$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n',
		A2(
			$elm$core$List$map,
			$elm$core$Basics$append('    '),
			A2($elm$core$String$split, '\n', str)));
};
var $author$project$Test$Reporter$Console$failureToText = F2(
	function (useColor, _v0) {
		var given = _v0.a.given;
		var description = _v0.a.description;
		var reason = _v0.a.reason;
		var distributionReport = _v0.b;
		var givenText = A2(
			$elm$core$Maybe$map,
			function (str) {
				return $author$project$Console$Text$dark(
					$author$project$Console$Text$plain('\nGiven ' + (str + '\n')));
			},
			given);
		var formatEquality = function () {
			if (useColor.$ === 'Monochrome') {
				return $author$project$Test$Reporter$Console$Format$Monochrome$formatEquality;
			} else {
				return $author$project$Test$Reporter$Console$Format$Color$formatEquality;
			}
		}();
		var messageText = $author$project$Console$Text$plain(
			'\n' + ($author$project$Test$Reporter$Console$indent(
				A3($author$project$Test$Reporter$Console$Format$format, formatEquality, description, reason)) + '\n\n'));
		var distributionText = A2(
			$elm$core$Maybe$map,
			function (str) {
				return $author$project$Console$Text$dark(
					$author$project$Console$Text$plain(
						'\n' + ($author$project$Test$Reporter$Console$indent(str) + '\n')));
			},
			$author$project$Test$Reporter$Console$distributionReportToString(distributionReport));
		return $author$project$Console$Text$concat(
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						distributionText,
						givenText,
						$elm$core$Maybe$Just(messageText)
					])));
	});
var $author$project$Test$Reporter$Console$failuresToText = F3(
	function (useColor, labels, failures) {
		return $author$project$Console$Text$concat(
			A2(
				$elm$core$List$cons,
				$author$project$Test$Reporter$Console$failureLabelsToText(labels),
				A2(
					$elm$core$List$map,
					$author$project$Test$Reporter$Console$failureToText(useColor),
					failures)));
	});
var $author$project$Test$Reporter$Console$getStatus = function (outcome) {
	switch (outcome.$) {
		case 'Failed':
			return 'fail';
		case 'Todo':
			return 'todo';
		default:
			return 'pass';
	}
};
var $author$project$Console$Text$Green = {$: 'Green'};
var $author$project$Console$Text$green = $author$project$Console$Text$Text(
	{background: $author$project$Console$Text$Default, foreground: $author$project$Console$Text$Green, modifiers: _List_Nil, style: $author$project$Console$Text$Normal});
var $author$project$Test$Reporter$Console$passedLabelsToText = A2(
	$elm$core$Basics$composeR,
	A2(
		$elm_explorations$test$Test$Runner$formatLabels,
		A2(
			$elm$core$Basics$composeL,
			A2($elm$core$Basics$composeL, $author$project$Console$Text$dark, $author$project$Console$Text$plain),
			$author$project$Test$Reporter$Console$withChar(
				_Utils_chr('↓'))),
		A2(
			$elm$core$Basics$composeL,
			$author$project$Console$Text$green,
			$author$project$Test$Reporter$Console$withChar(
				_Utils_chr('✓')))),
	$author$project$Console$Text$concat);
var $author$project$Test$Reporter$Console$passedToText = F2(
	function (labels, distributionReport) {
		return $author$project$Console$Text$concat(
			_List_fromArray(
				[
					$author$project$Test$Reporter$Console$passedLabelsToText(labels),
					$author$project$Console$Text$dark(
					$author$project$Console$Text$plain(
						'\n' + ($author$project$Test$Reporter$Console$indent(distributionReport) + '\n\n')))
				]));
	});
var $author$project$Test$Reporter$Console$reportComplete = F2(
	function (useColor, _v0) {
		var labels = _v0.labels;
		var outcome = _v0.outcome;
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('complete')),
				A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						'status',
						$elm$json$Json$Encode$string(
							$author$project$Test$Reporter$Console$getStatus(outcome))),
					function () {
						switch (outcome.$) {
							case 'Passed':
								var distributionReport = outcome.a;
								var _v2 = $author$project$Test$Reporter$Console$distributionReportToString(distributionReport);
								if (_v2.$ === 'Nothing') {
									return _List_Nil;
								} else {
									var report = _v2.a;
									return _List_fromArray(
										[
											_Utils_Tuple2(
											'distributionReport',
											A2(
												$author$project$Test$Reporter$Console$textToValue,
												useColor,
												A2($author$project$Test$Reporter$Console$passedToText, labels, report)))
										]);
								}
							case 'Failed':
								var failures = outcome.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'failure',
										A2(
											$author$project$Test$Reporter$Console$textToValue,
											useColor,
											A3($author$project$Test$Reporter$Console$failuresToText, useColor, labels, failures)))
									]);
							default:
								var str = outcome.a;
								return _List_fromArray(
									[
										_Utils_Tuple2(
										'todo',
										$elm$json$Json$Encode$string(str)),
										_Utils_Tuple2(
										'labels',
										A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, labels))
									]);
						}
					}())));
	});
var $author$project$Test$Reporter$JUnit$encodeDuration = function (time) {
	return $elm$json$Json$Encode$string(
		$elm$core$String$fromFloat(time / 1000));
};
var $author$project$Test$Reporter$JUnit$distributionReportToString = function (distributionReport) {
	switch (distributionReport.$) {
		case 'NoDistribution':
			return $elm$core$Maybe$Nothing;
		case 'DistributionToReport':
			var r = distributionReport.a;
			return $elm$core$Maybe$Just(
				$elm_explorations$test$Test$Distribution$distributionReportTable(r));
		case 'DistributionCheckSucceeded':
			return $elm$core$Maybe$Nothing;
		default:
			var r = distributionReport.a;
			return $elm$core$Maybe$Just(
				$elm_explorations$test$Test$Distribution$distributionReportTable(r));
	}
};
var $author$project$Test$Reporter$JUnit$encodeDistributionReport = function (reportText) {
	return _Utils_Tuple2(
		'system-out',
		$elm$json$Json$Encode$string(reportText));
};
var $author$project$Test$Reporter$JUnit$encodeFailureTuple = function (message) {
	return _Utils_Tuple2(
		'failure',
		$elm$json$Json$Encode$string(message));
};
var $author$project$Test$Reporter$JUnit$reasonToString = F2(
	function (description, reason) {
		switch (reason.$) {
			case 'Custom':
				return description;
			case 'Equality':
				var expected = reason.a;
				var actual = reason.b;
				return expected + ('\n\nwas not equal to\n\n' + actual);
			case 'Comparison':
				var first = reason.a;
				var second = reason.b;
				return first + ('\n\nfailed when compared with ' + (description + (' on\n\n' + second)));
			case 'TODO':
				return 'TODO: ' + description;
			case 'Invalid':
				if (reason.a.$ === 'BadDescription') {
					var _v1 = reason.a;
					var explanation = (description === '') ? 'The empty string is not a valid test description.' : ('This is an invalid test description: ' + description);
					return 'Invalid test: ' + explanation;
				} else {
					return 'Invalid test: ' + description;
				}
			case 'ListDiff':
				var expected = reason.a;
				var actual = reason.b;
				return A2($elm$core$String$join, ', ', expected) + ('\n\nhad different elements than\n\n' + A2($elm$core$String$join, ', ', actual));
			default:
				var expected = reason.a.expected;
				var actual = reason.a.actual;
				var extra = reason.a.extra;
				var missing = reason.a.missing;
				return expected + ('\n\nhad different contents than\n\n' + (actual + ('\n\nthese were extra:\n\n' + (A2($elm$core$String$join, '\n', extra) + ('\n\nthese were missing:\n\n' + A2($elm$core$String$join, '\n', missing))))));
		}
	});
var $author$project$Test$Reporter$JUnit$formatFailure = function (_v0) {
	var given = _v0.given;
	var description = _v0.description;
	var reason = _v0.reason;
	var message = A2($author$project$Test$Reporter$JUnit$reasonToString, description, reason);
	if (given.$ === 'Just') {
		var str = given.a;
		return 'Given ' + (str + ('\n\n' + message));
	} else {
		return message;
	}
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $author$project$Test$Reporter$JUnit$encodeOutcome = function (outcome) {
	switch (outcome.$) {
		case 'Passed':
			var distributionReport = outcome.a;
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				A2(
					$elm$core$Maybe$map,
					A2($elm$core$Basics$composeR, $author$project$Test$Reporter$JUnit$encodeDistributionReport, $elm$core$List$singleton),
					$author$project$Test$Reporter$JUnit$distributionReportToString(distributionReport)));
		case 'Failed':
			var failures = outcome.a;
			var message = A2(
				$elm$core$String$join,
				'\n\n\n',
				A2(
					$elm$core$List$map,
					A2($elm$core$Basics$composeR, $elm$core$Tuple$first, $author$project$Test$Reporter$JUnit$formatFailure),
					failures));
			var distributionReports = A2(
				$elm$core$String$join,
				'\n\n\n',
				A2(
					$elm$core$List$filterMap,
					A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $author$project$Test$Reporter$JUnit$distributionReportToString),
					failures));
			var nonemptyDistributionReports = $elm$core$String$isEmpty(distributionReports) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(distributionReports);
			return A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						$elm$core$Maybe$Just(
						$author$project$Test$Reporter$JUnit$encodeFailureTuple(message)),
						A2($elm$core$Maybe$map, $author$project$Test$Reporter$JUnit$encodeDistributionReport, nonemptyDistributionReports)
					]));
		default:
			var message = outcome.a;
			return _List_fromArray(
				[
					$author$project$Test$Reporter$JUnit$encodeFailureTuple('TODO: ' + message)
				]);
	}
};
var $author$project$Test$Reporter$JUnit$formatClassAndName = function (labels) {
	if (labels.b) {
		var head = labels.a;
		var rest = labels.b;
		return _Utils_Tuple2(
			A2(
				$elm$core$String$join,
				' ',
				$elm$core$List$reverse(rest)),
			head);
	} else {
		return _Utils_Tuple2('', '');
	}
};
var $author$project$Test$Reporter$JUnit$reportComplete = function (_v0) {
	var labels = _v0.labels;
	var duration = _v0.duration;
	var outcome = _v0.outcome;
	var _v1 = $author$project$Test$Reporter$JUnit$formatClassAndName(labels);
	var classname = _v1.a;
	var name = _v1.b;
	return $elm$json$Json$Encode$object(
		_Utils_ap(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'@classname',
					$elm$json$Json$Encode$string(classname)),
					_Utils_Tuple2(
					'@name',
					$elm$json$Json$Encode$string(name)),
					_Utils_Tuple2(
					'@time',
					$author$project$Test$Reporter$JUnit$encodeDuration(duration))
				]),
			$author$project$Test$Reporter$JUnit$encodeOutcome(outcome)));
};
var $author$project$Test$Reporter$Json$encodeDistributionCount = function (dict) {
	return A2(
		$elm$json$Json$Encode$list,
		function (_v0) {
			var labels = _v0.a;
			var count = _v0.b;
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'labels',
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, labels)),
						_Utils_Tuple2(
						'count',
						$elm$json$Json$Encode$int(count))
					]));
		},
		$elm$core$Dict$toList(dict));
};
var $author$project$Test$Reporter$Json$encodeSumType = F2(
	function (sumType, data) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string(sumType)),
					_Utils_Tuple2('data', data)
				]));
	});
var $elm$json$Json$Encode$float = _Json_wrap;
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Test$Reporter$Json$encodeDistributionReport = function (distributionReport) {
	switch (distributionReport.$) {
		case 'NoDistribution':
			return A2($author$project$Test$Reporter$Json$encodeSumType, 'NoDistribution', $elm$json$Json$Encode$null);
		case 'DistributionToReport':
			var r = distributionReport.a;
			return A2(
				$author$project$Test$Reporter$Json$encodeSumType,
				'DistributionToReport',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'distributionCount',
							$author$project$Test$Reporter$Json$encodeDistributionCount(r.distributionCount)),
							_Utils_Tuple2(
							'runsElapsed',
							$elm$json$Json$Encode$int(r.runsElapsed))
						])));
		case 'DistributionCheckSucceeded':
			var r = distributionReport.a;
			return A2(
				$author$project$Test$Reporter$Json$encodeSumType,
				'DistributionCheckSucceeded',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'distributionCount',
							$author$project$Test$Reporter$Json$encodeDistributionCount(r.distributionCount)),
							_Utils_Tuple2(
							'runsElapsed',
							$elm$json$Json$Encode$int(r.runsElapsed))
						])));
		default:
			var r = distributionReport.a;
			return A2(
				$author$project$Test$Reporter$Json$encodeSumType,
				'DistributionCheckFailed',
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'distributionCount',
							$author$project$Test$Reporter$Json$encodeDistributionCount(r.distributionCount)),
							_Utils_Tuple2(
							'runsElapsed',
							$elm$json$Json$Encode$int(r.runsElapsed)),
							_Utils_Tuple2(
							'badLabel',
							$elm$json$Json$Encode$string(r.badLabel)),
							_Utils_Tuple2(
							'badLabelPercentage',
							$elm$json$Json$Encode$float(r.badLabelPercentage)),
							_Utils_Tuple2(
							'expectedDistribution',
							$elm$json$Json$Encode$string(r.expectedDistribution))
						])));
	}
};
var $author$project$Test$Reporter$Json$encodeDistributionReports = function (outcome) {
	switch (outcome.$) {
		case 'Failed':
			var failures = outcome.a;
			return A2(
				$elm$core$List$map,
				A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $author$project$Test$Reporter$Json$encodeDistributionReport),
				failures);
		case 'Todo':
			return _List_Nil;
		default:
			var distributionReport = outcome.a;
			return _List_fromArray(
				[
					$author$project$Test$Reporter$Json$encodeDistributionReport(distributionReport)
				]);
	}
};
var $author$project$Test$Reporter$Json$encodeReason = F2(
	function (description, reason) {
		switch (reason.$) {
			case 'Custom':
				return A2(
					$author$project$Test$Reporter$Json$encodeSumType,
					'Custom',
					$elm$json$Json$Encode$string(description));
			case 'Equality':
				var expected = reason.a;
				var actual = reason.b;
				return A2(
					$author$project$Test$Reporter$Json$encodeSumType,
					'Equality',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expected',
								$elm$json$Json$Encode$string(expected)),
								_Utils_Tuple2(
								'actual',
								$elm$json$Json$Encode$string(actual)),
								_Utils_Tuple2(
								'comparison',
								$elm$json$Json$Encode$string(description))
							])));
			case 'Comparison':
				var first = reason.a;
				var second = reason.b;
				return A2(
					$author$project$Test$Reporter$Json$encodeSumType,
					'Comparison',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'first',
								$elm$json$Json$Encode$string(first)),
								_Utils_Tuple2(
								'second',
								$elm$json$Json$Encode$string(second)),
								_Utils_Tuple2(
								'comparison',
								$elm$json$Json$Encode$string(description))
							])));
			case 'TODO':
				return A2(
					$author$project$Test$Reporter$Json$encodeSumType,
					'TODO',
					$elm$json$Json$Encode$string(description));
			case 'Invalid':
				if (reason.a.$ === 'BadDescription') {
					var _v1 = reason.a;
					var explanation = (description === '') ? 'The empty string is not a valid test description.' : ('This is an invalid test description: ' + description);
					return A2(
						$author$project$Test$Reporter$Json$encodeSumType,
						'Invalid',
						$elm$json$Json$Encode$string(explanation));
				} else {
					return A2(
						$author$project$Test$Reporter$Json$encodeSumType,
						'Invalid',
						$elm$json$Json$Encode$string(description));
				}
			case 'ListDiff':
				var expected = reason.a;
				var actual = reason.b;
				return A2(
					$author$project$Test$Reporter$Json$encodeSumType,
					'ListDiff',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expected',
								A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, expected)),
								_Utils_Tuple2(
								'actual',
								A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, actual))
							])));
			default:
				var expected = reason.a.expected;
				var actual = reason.a.actual;
				var extra = reason.a.extra;
				var missing = reason.a.missing;
				return A2(
					$author$project$Test$Reporter$Json$encodeSumType,
					'CollectionDiff',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'expected',
								$elm$json$Json$Encode$string(expected)),
								_Utils_Tuple2(
								'actual',
								$elm$json$Json$Encode$string(actual)),
								_Utils_Tuple2(
								'extra',
								A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, extra)),
								_Utils_Tuple2(
								'missing',
								A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, missing))
							])));
		}
	});
var $author$project$Test$Reporter$Json$encodeFailure = function (_v0) {
	var given = _v0.given;
	var description = _v0.description;
	var reason = _v0.reason;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'given',
				A2(
					$elm$core$Maybe$withDefault,
					$elm$json$Json$Encode$null,
					A2($elm$core$Maybe$map, $elm$json$Json$Encode$string, given))),
				_Utils_Tuple2(
				'message',
				$elm$json$Json$Encode$string(description)),
				_Utils_Tuple2(
				'reason',
				A2($author$project$Test$Reporter$Json$encodeReason, description, reason))
			]));
};
var $author$project$Test$Reporter$Json$encodeFailures = function (outcome) {
	switch (outcome.$) {
		case 'Failed':
			var failures = outcome.a;
			return A2(
				$elm$core$List$map,
				A2($elm$core$Basics$composeR, $elm$core$Tuple$first, $author$project$Test$Reporter$Json$encodeFailure),
				failures);
		case 'Todo':
			var str = outcome.a;
			return _List_fromArray(
				[
					$elm$json$Json$Encode$string(str)
				]);
		default:
			return _List_Nil;
	}
};
var $author$project$Test$Reporter$Json$encodeLabels = function (labels) {
	return A2(
		$elm$json$Json$Encode$list,
		$elm$json$Json$Encode$string,
		$elm$core$List$reverse(labels));
};
var $author$project$Test$Reporter$Json$getStatus = function (outcome) {
	switch (outcome.$) {
		case 'Failed':
			return 'fail';
		case 'Todo':
			return 'todo';
		default:
			return 'pass';
	}
};
var $author$project$Test$Reporter$Json$reportComplete = function (_v0) {
	var duration = _v0.duration;
	var labels = _v0.labels;
	var outcome = _v0.outcome;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'event',
				$elm$json$Json$Encode$string('testCompleted')),
				_Utils_Tuple2(
				'status',
				$elm$json$Json$Encode$string(
					$author$project$Test$Reporter$Json$getStatus(outcome))),
				_Utils_Tuple2(
				'labels',
				$author$project$Test$Reporter$Json$encodeLabels(labels)),
				_Utils_Tuple2(
				'failures',
				A2(
					$elm$json$Json$Encode$list,
					$elm$core$Basics$identity,
					$author$project$Test$Reporter$Json$encodeFailures(outcome))),
				_Utils_Tuple2(
				'distributionReports',
				A2(
					$elm$json$Json$Encode$list,
					$elm$core$Basics$identity,
					$author$project$Test$Reporter$Json$encodeDistributionReports(outcome))),
				_Utils_Tuple2(
				'duration',
				$elm$json$Json$Encode$string(
					$elm$core$String$fromInt(duration)))
			]));
};
var $author$project$Test$Reporter$Console$formatDuration = function (time) {
	return $elm$core$String$fromFloat(time) + ' ms';
};
var $author$project$Test$Reporter$Console$stat = F2(
	function (label, value) {
		return $author$project$Console$Text$concat(
			_List_fromArray(
				[
					$author$project$Console$Text$dark(
					$author$project$Console$Text$plain(label)),
					$author$project$Console$Text$plain(value + '\n')
				]));
	});
var $author$project$Test$Reporter$Console$todoLabelsToText = A2(
	$elm$core$Basics$composeR,
	A2(
		$elm_explorations$test$Test$Runner$formatLabels,
		A2(
			$elm$core$Basics$composeL,
			A2($elm$core$Basics$composeL, $author$project$Console$Text$dark, $author$project$Console$Text$plain),
			$author$project$Test$Reporter$Console$withChar(
				_Utils_chr('↓'))),
		A2(
			$elm$core$Basics$composeL,
			A2($elm$core$Basics$composeL, $author$project$Console$Text$dark, $author$project$Console$Text$plain),
			$author$project$Test$Reporter$Console$withChar(
				_Utils_chr('↓')))),
	$author$project$Console$Text$concat);
var $author$project$Test$Reporter$Console$todoToChalk = function (message) {
	return $author$project$Console$Text$plain('◦ TODO: ' + (message + '\n\n'));
};
var $author$project$Test$Reporter$Console$todosToText = function (_v0) {
	var labels = _v0.a;
	var failure = _v0.b;
	return $author$project$Console$Text$concat(
		_List_fromArray(
			[
				$author$project$Test$Reporter$Console$todoLabelsToText(labels),
				$author$project$Test$Reporter$Console$todoToChalk(failure)
			]));
};
var $author$project$Test$Reporter$Console$summarizeTodos = A2(
	$elm$core$Basics$composeR,
	$elm$core$List$map($author$project$Test$Reporter$Console$todosToText),
	$author$project$Console$Text$concat);
var $author$project$Console$Text$Underline = {$: 'Underline'};
var $author$project$Console$Text$underline = function (txt) {
	if (txt.$ === 'Text') {
		var styles = txt.a;
		var str = txt.b;
		return A2(
			$author$project$Console$Text$Text,
			_Utils_update(
				styles,
				{style: $author$project$Console$Text$Underline}),
			str);
	} else {
		var texts = txt.a;
		return $author$project$Console$Text$Texts(
			A2($elm$core$List$map, $author$project$Console$Text$dark, texts));
	}
};
var $author$project$Console$Text$Yellow = {$: 'Yellow'};
var $author$project$Console$Text$yellow = $author$project$Console$Text$Text(
	{background: $author$project$Console$Text$Default, foreground: $author$project$Console$Text$Yellow, modifiers: _List_Nil, style: $author$project$Console$Text$Normal});
var $author$project$Test$Reporter$Console$reportSummary = F3(
	function (useColor, _v0, autoFail) {
		var todos = _v0.todos;
		var passed = _v0.passed;
		var failed = _v0.failed;
		var duration = _v0.duration;
		var todoStats = function () {
			var _v7 = $elm$core$List$length(todos);
			if (!_v7) {
				return $author$project$Console$Text$plain('');
			} else {
				var numTodos = _v7;
				return A2(
					$author$project$Test$Reporter$Console$stat,
					'Todo:     ',
					$elm$core$String$fromInt(numTodos));
			}
		}();
		var individualTodos = (failed > 0) ? $author$project$Console$Text$plain('') : $author$project$Test$Reporter$Console$summarizeTodos(
			$elm$core$List$reverse(todos));
		var headlineResult = function () {
			var _v3 = _Utils_Tuple3(
				autoFail,
				failed,
				$elm$core$List$length(todos));
			_v3$4:
			while (true) {
				if (_v3.a.$ === 'Nothing') {
					if (!_v3.b) {
						switch (_v3.c) {
							case 0:
								var _v4 = _v3.a;
								return $elm$core$Result$Ok('TEST RUN PASSED');
							case 1:
								var _v5 = _v3.a;
								return $elm$core$Result$Err(
									_Utils_Tuple3($author$project$Console$Text$yellow, 'TEST RUN INCOMPLETE', ' because there is 1 TODO remaining'));
							default:
								var _v6 = _v3.a;
								var numTodos = _v3.c;
								return $elm$core$Result$Err(
									_Utils_Tuple3(
										$author$project$Console$Text$yellow,
										'TEST RUN INCOMPLETE',
										' because there are ' + ($elm$core$String$fromInt(numTodos) + ' TODOs remaining')));
						}
					} else {
						break _v3$4;
					}
				} else {
					if (!_v3.b) {
						var failure = _v3.a.a;
						return $elm$core$Result$Err(
							_Utils_Tuple3($author$project$Console$Text$yellow, 'TEST RUN INCOMPLETE', ' because ' + failure));
					} else {
						break _v3$4;
					}
				}
			}
			return $elm$core$Result$Err(
				_Utils_Tuple3($author$project$Console$Text$red, 'TEST RUN FAILED', ''));
		}();
		var headline = function () {
			if (headlineResult.$ === 'Ok') {
				var str = headlineResult.a;
				return $author$project$Console$Text$underline(
					$author$project$Console$Text$green('\n' + (str + '\n\n')));
			} else {
				var _v2 = headlineResult.a;
				var colorize = _v2.a;
				var str = _v2.b;
				var suffix = _v2.c;
				return $author$project$Console$Text$concat(
					_List_fromArray(
						[
							$author$project$Console$Text$underline(
							colorize('\n' + str)),
							colorize(suffix + '\n\n')
						]));
			}
		}();
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('summary')),
					_Utils_Tuple2(
					'summary',
					$elm$json$Json$Encode$string(
						A2(
							$author$project$Console$Text$render,
							useColor,
							$author$project$Console$Text$concat(
								_List_fromArray(
									[
										headline,
										A2(
										$author$project$Test$Reporter$Console$stat,
										'Duration: ',
										$author$project$Test$Reporter$Console$formatDuration(duration)),
										A2(
										$author$project$Test$Reporter$Console$stat,
										'Passed:   ',
										$elm$core$String$fromInt(passed)),
										A2(
										$author$project$Test$Reporter$Console$stat,
										'Failed:   ',
										$elm$core$String$fromInt(failed)),
										todoStats,
										individualTodos
									])))))
				]));
	});
var $author$project$Test$Reporter$TestResults$Failed = function (a) {
	return {$: 'Failed', a: a};
};
var $author$project$Test$Reporter$JUnit$encodeExtraFailure = function (_v0) {
	return $author$project$Test$Reporter$JUnit$reportComplete(
		{
			duration: 0,
			labels: _List_Nil,
			outcome: $author$project$Test$Reporter$TestResults$Failed(_List_Nil)
		});
};
var $author$project$Test$Reporter$JUnit$reportSummary = F2(
	function (_v0, autoFail) {
		var testCount = _v0.testCount;
		var duration = _v0.duration;
		var failed = _v0.failed;
		var extraFailures = function () {
			var _v1 = _Utils_Tuple2(failed, autoFail);
			if ((!_v1.a) && (_v1.b.$ === 'Just')) {
				var failure = _v1.b.a;
				return _List_fromArray(
					[
						$author$project$Test$Reporter$JUnit$encodeExtraFailure(failure)
					]);
			} else {
				return _List_Nil;
			}
		}();
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'testsuite',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'@name',
								$elm$json$Json$Encode$string('elm-test')),
								_Utils_Tuple2(
								'@package',
								$elm$json$Json$Encode$string('elm-test')),
								_Utils_Tuple2(
								'@tests',
								$elm$json$Json$Encode$int(testCount)),
								_Utils_Tuple2(
								'@failures',
								$elm$json$Json$Encode$int(failed)),
								_Utils_Tuple2(
								'@errors',
								$elm$json$Json$Encode$int(0)),
								_Utils_Tuple2(
								'@time',
								$elm$json$Json$Encode$float(duration)),
								_Utils_Tuple2(
								'testcase',
								A2($elm$json$Json$Encode$list, $elm$core$Basics$identity, extraFailures))
							])))
				]));
	});
var $author$project$Test$Reporter$Json$reportSummary = F2(
	function (_v0, autoFail) {
		var duration = _v0.duration;
		var passed = _v0.passed;
		var failed = _v0.failed;
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'event',
					$elm$json$Json$Encode$string('runComplete')),
					_Utils_Tuple2(
					'passed',
					$elm$json$Json$Encode$string(
						$elm$core$String$fromInt(passed))),
					_Utils_Tuple2(
					'failed',
					$elm$json$Json$Encode$string(
						$elm$core$String$fromInt(failed))),
					_Utils_Tuple2(
					'duration',
					$elm$json$Json$Encode$string(
						$elm$core$String$fromFloat(duration))),
					_Utils_Tuple2(
					'autoFail',
					A2(
						$elm$core$Maybe$withDefault,
						$elm$json$Json$Encode$null,
						A2($elm$core$Maybe$map, $elm$json$Json$Encode$string, autoFail)))
				]));
	});
var $author$project$Test$Reporter$Reporter$createReporter = function (report) {
	switch (report.$) {
		case 'JsonReport':
			return A4($author$project$Test$Reporter$Reporter$TestReporter, 'JSON', $author$project$Test$Reporter$Json$reportBegin, $author$project$Test$Reporter$Json$reportComplete, $author$project$Test$Reporter$Json$reportSummary);
		case 'ConsoleReport':
			var useColor = report.a;
			return A4(
				$author$project$Test$Reporter$Reporter$TestReporter,
				'CHALK',
				$author$project$Test$Reporter$Console$reportBegin(useColor),
				$author$project$Test$Reporter$Console$reportComplete(useColor),
				$author$project$Test$Reporter$Console$reportSummary(useColor));
		default:
			return A4($author$project$Test$Reporter$Reporter$TestReporter, 'JUNIT', $author$project$Test$Reporter$JUnit$reportBegin, $author$project$Test$Reporter$JUnit$reportComplete, $author$project$Test$Reporter$JUnit$reportSummary);
	}
};
var $author$project$Test$Runner$Node$elmTestPort__send = _Platform_outgoingPort('elmTestPort__send', $elm$json$Json$Encode$string);
var $author$project$Test$Runner$Node$failInit = F3(
	function (message, report, _v0) {
		var model = {
			autoFail: $elm$core$Maybe$Nothing,
			available: $elm$core$Dict$empty,
			nextTestToRun: 0,
			processes: 0,
			results: _List_Nil,
			runInfo: {fuzzRuns: 0, globs: _List_Nil, initialSeed: 0, paths: _List_Nil, testCount: 0},
			testReporter: $author$project$Test$Reporter$Reporter$createReporter(report)
		};
		var cmd = $author$project$Test$Runner$Node$elmTestPort__send(
			A2(
				$elm$json$Json$Encode$encode,
				0,
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							$elm$json$Json$Encode$string('SUMMARY')),
							_Utils_Tuple2(
							'exitCode',
							$elm$json$Json$Encode$int(1)),
							_Utils_Tuple2(
							'message',
							$elm$json$Json$Encode$string(message))
						]))));
		return _Utils_Tuple2(model, cmd);
	});
var $elm_explorations$test$Test$Runner$Invalid = function (a) {
	return {$: 'Invalid', a: a};
};
var $elm_explorations$test$Test$Runner$Only = function (a) {
	return {$: 'Only', a: a};
};
var $elm_explorations$test$Test$Runner$Plain = function (a) {
	return {$: 'Plain', a: a};
};
var $elm_explorations$test$Test$Runner$Skipping = function (a) {
	return {$: 'Skipping', a: a};
};
var $elm_explorations$test$Test$Runner$countRunnables = function (runnable) {
	countRunnables:
	while (true) {
		if (runnable.$ === 'Runnable') {
			return 1;
		} else {
			var runner = runnable.b;
			var $temp$runnable = runner;
			runnable = $temp$runnable;
			continue countRunnables;
		}
	}
};
var $elm_explorations$test$Test$Runner$countAllRunnables = A2(
	$elm$core$List$foldl,
	A2($elm$core$Basics$composeR, $elm_explorations$test$Test$Runner$countRunnables, $elm$core$Basics$add),
	0);
var $elm_explorations$test$Test$Runner$Labeled = F2(
	function (a, b) {
		return {$: 'Labeled', a: a, b: b};
	});
var $elm_explorations$test$Test$Runner$Runnable = function (a) {
	return {$: 'Runnable', a: a};
};
var $elm_explorations$test$Test$Runner$Thunk = function (a) {
	return {$: 'Thunk', a: a};
};
var $elm_explorations$test$Test$Runner$emptyDistribution = function (seed) {
	return {all: _List_Nil, only: _List_Nil, seed: seed, skipped: _List_Nil};
};
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm_explorations$test$Test$Runner$fnvHash = F2(
	function (a, b) {
		return ((a ^ b) * 16777619) >>> 0;
	});
var $elm_explorations$test$Test$Runner$fnvHashString = F2(
	function (hash, str) {
		return A3(
			$elm$core$List$foldl,
			$elm_explorations$test$Test$Runner$fnvHash,
			hash,
			A2(
				$elm$core$List$map,
				$elm$core$Char$toCode,
				$elm$core$String$toList(str)));
	});
var $elm_explorations$test$Test$Runner$fnvInit = 2166136261;
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $elm$random$Random$map3 = F4(
	function (func, _v0, _v1, _v2) {
		var genA = _v0.a;
		var genB = _v1.a;
		var genC = _v2.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v3 = genA(seed0);
				var a = _v3.a;
				var seed1 = _v3.b;
				var _v4 = genB(seed1);
				var b = _v4.a;
				var seed2 = _v4.b;
				var _v5 = genC(seed2);
				var c = _v5.a;
				var seed3 = _v5.b;
				return _Utils_Tuple2(
					A3(func, a, b, c),
					seed3);
			});
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $elm$random$Random$independentSeed = $elm$random$Random$Generator(
	function (seed0) {
		var makeIndependentSeed = F3(
			function (state, b, c) {
				return $elm$random$Random$next(
					A2($elm$random$Random$Seed, state, (1 | (b ^ c)) >>> 0));
			});
		var gen = A2($elm$random$Random$int, 0, 4294967295);
		return A2(
			$elm$random$Random$step,
			A4($elm$random$Random$map3, makeIndependentSeed, gen, gen, gen),
			seed0);
	});
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$random$Random$maxInt = 2147483647;
var $elm_explorations$test$Test$Runner$batchDistribute = F4(
	function (hashed, runs, test, prev) {
		var next = A4($elm_explorations$test$Test$Runner$distributeSeedsHelp, hashed, runs, prev.seed, test);
		return {
			all: _Utils_ap(prev.all, next.all),
			only: _Utils_ap(prev.only, next.only),
			seed: next.seed,
			skipped: _Utils_ap(prev.skipped, next.skipped)
		};
	});
var $elm_explorations$test$Test$Runner$distributeSeedsHelp = F4(
	function (hashed, runs, seed, test) {
		switch (test.$) {
			case 'ElmTestVariant__UnitTest':
				var aRun = test.a;
				return {
					all: _List_fromArray(
						[
							$elm_explorations$test$Test$Runner$Runnable(
							$elm_explorations$test$Test$Runner$Thunk(
								function (_v1) {
									return aRun(_Utils_Tuple0);
								}))
						]),
					only: _List_Nil,
					seed: seed,
					skipped: _List_Nil
				};
			case 'ElmTestVariant__FuzzTest':
				var aRun = test.a;
				var _v2 = A2($elm$random$Random$step, $elm$random$Random$independentSeed, seed);
				var firstSeed = _v2.a;
				var nextSeed = _v2.b;
				return {
					all: _List_fromArray(
						[
							$elm_explorations$test$Test$Runner$Runnable(
							$elm_explorations$test$Test$Runner$Thunk(
								function (_v3) {
									return A2(aRun, firstSeed, runs);
								}))
						]),
					only: _List_Nil,
					seed: nextSeed,
					skipped: _List_Nil
				};
			case 'ElmTestVariant__Labeled':
				var description = test.a;
				var subTest = test.b;
				if (hashed) {
					var next = A4($elm_explorations$test$Test$Runner$distributeSeedsHelp, true, runs, seed, subTest);
					return {
						all: A2(
							$elm$core$List$map,
							$elm_explorations$test$Test$Runner$Labeled(description),
							next.all),
						only: A2(
							$elm$core$List$map,
							$elm_explorations$test$Test$Runner$Labeled(description),
							next.only),
						seed: next.seed,
						skipped: A2(
							$elm$core$List$map,
							$elm_explorations$test$Test$Runner$Labeled(description),
							next.skipped)
					};
				} else {
					var intFromSeed = A2(
						$elm$random$Random$step,
						A2($elm$random$Random$int, 0, $elm$random$Random$maxInt),
						seed).a;
					var hashedSeed = $elm$random$Random$initialSeed(
						A2(
							$elm_explorations$test$Test$Runner$fnvHash,
							intFromSeed,
							A2($elm_explorations$test$Test$Runner$fnvHashString, $elm_explorations$test$Test$Runner$fnvInit, description)));
					var next = A4($elm_explorations$test$Test$Runner$distributeSeedsHelp, true, runs, hashedSeed, subTest);
					return {
						all: A2(
							$elm$core$List$map,
							$elm_explorations$test$Test$Runner$Labeled(description),
							next.all),
						only: A2(
							$elm$core$List$map,
							$elm_explorations$test$Test$Runner$Labeled(description),
							next.only),
						seed: seed,
						skipped: A2(
							$elm$core$List$map,
							$elm_explorations$test$Test$Runner$Labeled(description),
							next.skipped)
					};
				}
			case 'ElmTestVariant__Skipped':
				var subTest = test.a;
				var next = A4($elm_explorations$test$Test$Runner$distributeSeedsHelp, hashed, runs, seed, subTest);
				return {all: _List_Nil, only: _List_Nil, seed: next.seed, skipped: next.all};
			case 'ElmTestVariant__Only':
				var subTest = test.a;
				var next = A4($elm_explorations$test$Test$Runner$distributeSeedsHelp, hashed, runs, seed, subTest);
				return _Utils_update(
					next,
					{only: next.all});
			default:
				var tests = test.a;
				return A3(
					$elm$core$List$foldl,
					A2($elm_explorations$test$Test$Runner$batchDistribute, hashed, runs),
					$elm_explorations$test$Test$Runner$emptyDistribution(seed),
					tests);
		}
	});
var $elm_explorations$test$Test$Runner$distributeSeeds = $elm_explorations$test$Test$Runner$distributeSeedsHelp(false);
var $elm_explorations$test$Test$Runner$runThunk = _Test_runThunk;
var $elm_explorations$test$Test$Runner$run = function (_v0) {
	var fn = _v0.a;
	var _v1 = $elm_explorations$test$Test$Runner$runThunk(fn);
	if (_v1.$ === 'Ok') {
		var test = _v1.a;
		return test;
	} else {
		var message = _v1.a;
		return _List_fromArray(
			[
				$elm_explorations$test$Expect$fail('This test failed because it threw an exception: \"' + (message + '\"'))
			]);
	}
};
var $elm_explorations$test$Test$Runner$fromRunnableTreeHelp = F2(
	function (labels, runner) {
		fromRunnableTreeHelp:
		while (true) {
			if (runner.$ === 'Runnable') {
				var runnable = runner.a;
				return _List_fromArray(
					[
						{
						labels: labels,
						run: function (_v1) {
							return $elm_explorations$test$Test$Runner$run(runnable);
						}
					}
					]);
			} else {
				var label = runner.a;
				var subRunner = runner.b;
				var $temp$labels = A2($elm$core$List$cons, label, labels),
					$temp$runner = subRunner;
				labels = $temp$labels;
				runner = $temp$runner;
				continue fromRunnableTreeHelp;
			}
		}
	});
var $elm_explorations$test$Test$Runner$fromRunnableTree = $elm_explorations$test$Test$Runner$fromRunnableTreeHelp(_List_Nil);
var $elm_explorations$test$Test$Runner$fromTest = F3(
	function (runs, seed, test) {
		if (runs < 1) {
			return $elm_explorations$test$Test$Runner$Invalid(
				'Test runner run count must be at least 1, not ' + $elm$core$String$fromInt(runs));
		} else {
			var distribution = A3($elm_explorations$test$Test$Runner$distributeSeeds, runs, seed, test);
			return $elm$core$List$isEmpty(distribution.only) ? ((!$elm_explorations$test$Test$Runner$countAllRunnables(distribution.skipped)) ? $elm_explorations$test$Test$Runner$Plain(
				A2($elm$core$List$concatMap, $elm_explorations$test$Test$Runner$fromRunnableTree, distribution.all)) : $elm_explorations$test$Test$Runner$Skipping(
				A2($elm$core$List$concatMap, $elm_explorations$test$Test$Runner$fromRunnableTree, distribution.all))) : $elm_explorations$test$Test$Runner$Only(
				A2($elm$core$List$concatMap, $elm_explorations$test$Test$Runner$fromRunnableTree, distribution.only));
		}
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Test$Runner$Node$init = F2(
	function (_v0, _v1) {
		var processes = _v0.processes;
		var globs = _v0.globs;
		var paths = _v0.paths;
		var fuzzRuns = _v0.fuzzRuns;
		var initialSeed = _v0.initialSeed;
		var report = _v0.report;
		var runners = _v0.runners;
		var testReporter = $author$project$Test$Reporter$Reporter$createReporter(report);
		var _v2 = function () {
			switch (runners.$) {
				case 'Plain':
					var runnerList = runners.a;
					return {
						autoFail: $elm$core$Maybe$Nothing,
						indexedRunners: A2(
							$elm$core$List$indexedMap,
							F2(
								function (a, b) {
									return _Utils_Tuple2(a, b);
								}),
							runnerList)
					};
				case 'Only':
					var runnerList = runners.a;
					return {
						autoFail: $elm$core$Maybe$Just('Test.only was used'),
						indexedRunners: A2(
							$elm$core$List$indexedMap,
							F2(
								function (a, b) {
									return _Utils_Tuple2(a, b);
								}),
							runnerList)
					};
				case 'Skipping':
					var runnerList = runners.a;
					return {
						autoFail: $elm$core$Maybe$Just('Test.skip was used'),
						indexedRunners: A2(
							$elm$core$List$indexedMap,
							F2(
								function (a, b) {
									return _Utils_Tuple2(a, b);
								}),
							runnerList)
					};
				default:
					var str = runners.a;
					return {
						autoFail: $elm$core$Maybe$Just(str),
						indexedRunners: _List_Nil
					};
			}
		}();
		var indexedRunners = _v2.indexedRunners;
		var autoFail = _v2.autoFail;
		var testCount = $elm$core$List$length(indexedRunners);
		var model = {
			autoFail: autoFail,
			available: $elm$core$Dict$fromList(indexedRunners),
			nextTestToRun: 0,
			processes: processes,
			results: _List_Nil,
			runInfo: {fuzzRuns: fuzzRuns, globs: globs, initialSeed: initialSeed, paths: paths, testCount: testCount},
			testReporter: testReporter
		};
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Test$Runner$Node$noTestsFoundError = function (globs) {
	return $elm$core$List$isEmpty(globs) ? $elm$core$String$trim('\nNo exposed values of type Test found in the tests/ directory.\n\nAre there tests in any .elm file in the tests/ directory?\nIf not – add some!\nIf there are – are they exposed?\n        ') : A3(
		$elm$core$String$replace,
		'%globs',
		A2($elm$core$String$join, '\n', globs),
		$elm$core$String$trim('\nNo exposed values of type Test found in files matching:\n\n%globs\n\nAre the above patterns correct? Maybe try running elm-test with no arguments?\n\nAre there tests in any of the matched files?\nIf not – add some!\nIf there are – are they exposed?\n        '));
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Test$Runner$Node$Dispatch = function (a) {
	return {$: 'Dispatch', a: a};
};
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $author$project$Test$Runner$JsMessage$Summary = F3(
	function (a, b, c) {
		return {$: 'Summary', a: a, b: b, c: c};
	});
var $author$project$Test$Runner$JsMessage$Test = function (a) {
	return {$: 'Test', a: a};
};
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Decode$map3 = _Json_map3;
var $author$project$Test$Runner$JsMessage$todoDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2(
		$elm$json$Json$Decode$field,
		'labels',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	A2($elm$json$Json$Decode$field, 'todo', $elm$json$Json$Decode$string));
var $author$project$Test$Runner$JsMessage$decodeMessageFromType = function (messageType) {
	switch (messageType) {
		case 'TEST':
			return A2(
				$elm$json$Json$Decode$map,
				$author$project$Test$Runner$JsMessage$Test,
				A2($elm$json$Json$Decode$field, 'index', $elm$json$Json$Decode$int));
		case 'SUMMARY':
			return A4(
				$elm$json$Json$Decode$map3,
				$author$project$Test$Runner$JsMessage$Summary,
				A2($elm$json$Json$Decode$field, 'duration', $elm$json$Json$Decode$float),
				A2($elm$json$Json$Decode$field, 'failures', $elm$json$Json$Decode$int),
				A2(
					$elm$json$Json$Decode$field,
					'todos',
					$elm$json$Json$Decode$list($author$project$Test$Runner$JsMessage$todoDecoder)));
		default:
			return $elm$json$Json$Decode$fail('Unrecognized message type: ' + messageType);
	}
};
var $author$project$Test$Runner$JsMessage$decoder = A2(
	$elm$json$Json$Decode$andThen,
	$author$project$Test$Runner$JsMessage$decodeMessageFromType,
	A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string));
var $author$project$Test$Runner$Node$Complete = F4(
	function (a, b, c, d) {
		return {$: 'Complete', a: a, b: b, c: c, d: d};
	});
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $author$project$Test$Reporter$TestResults$Passed = function (a) {
	return {$: 'Passed', a: a};
};
var $author$project$Test$Reporter$TestResults$Todo = function (a) {
	return {$: 'Todo', a: a};
};
var $elm_explorations$test$Test$Runner$getDistributionReport = function (expectation) {
	if (expectation.$ === 'Pass') {
		var distributionReport = expectation.a.distributionReport;
		return distributionReport;
	} else {
		var distributionReport = expectation.a.distributionReport;
		return distributionReport;
	}
};
var $elm_explorations$test$Test$Runner$Failure$TODO = {$: 'TODO'};
var $elm_explorations$test$Test$Runner$isTodo = function (expectation) {
	if (expectation.$ === 'Pass') {
		return false;
	} else {
		var reason = expectation.a.reason;
		return _Utils_eq(reason, $elm_explorations$test$Test$Runner$Failure$TODO);
	}
};
var $author$project$Test$Reporter$TestResults$outcomesFromExpectationsHelp = F2(
	function (expectation, builder) {
		var _v0 = $elm_explorations$test$Test$Runner$getFailureReason(expectation);
		if (_v0.$ === 'Just') {
			var failure = _v0.a;
			return $elm_explorations$test$Test$Runner$isTodo(expectation) ? _Utils_update(
				builder,
				{
					todos: A2($elm$core$List$cons, failure.description, builder.todos)
				}) : _Utils_update(
				builder,
				{
					failures: A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							failure,
							$elm_explorations$test$Test$Runner$getDistributionReport(expectation)),
						builder.failures)
				});
		} else {
			return _Utils_update(
				builder,
				{
					passes: A2(
						$elm$core$List$cons,
						$elm_explorations$test$Test$Runner$getDistributionReport(expectation),
						builder.passes)
				});
		}
	});
var $author$project$Test$Reporter$TestResults$outcomesFromExpectations = function (expectations) {
	if (expectations.b) {
		if (!expectations.b.b) {
			var expectation = expectations.a;
			var _v1 = $elm_explorations$test$Test$Runner$getFailureReason(expectation);
			if (_v1.$ === 'Nothing') {
				return _List_fromArray(
					[
						$author$project$Test$Reporter$TestResults$Passed(
						$elm_explorations$test$Test$Runner$getDistributionReport(expectation))
					]);
			} else {
				var failure = _v1.a;
				return $elm_explorations$test$Test$Runner$isTodo(expectation) ? _List_fromArray(
					[
						$author$project$Test$Reporter$TestResults$Todo(failure.description)
					]) : _List_fromArray(
					[
						$author$project$Test$Reporter$TestResults$Failed(
						_List_fromArray(
							[
								_Utils_Tuple2(
								failure,
								$elm_explorations$test$Test$Runner$getDistributionReport(expectation))
							]))
					]);
			}
		} else {
			var builder = A3(
				$elm$core$List$foldl,
				$author$project$Test$Reporter$TestResults$outcomesFromExpectationsHelp,
				{failures: _List_Nil, passes: _List_Nil, todos: _List_Nil},
				expectations);
			var failuresList = function () {
				var _v2 = builder.failures;
				if (!_v2.b) {
					return _List_Nil;
				} else {
					var failures = _v2;
					return _List_fromArray(
						[
							$author$project$Test$Reporter$TestResults$Failed(failures)
						]);
				}
			}();
			return $elm$core$List$concat(
				_List_fromArray(
					[
						A2($elm$core$List$map, $author$project$Test$Reporter$TestResults$Passed, builder.passes),
						A2($elm$core$List$map, $author$project$Test$Reporter$TestResults$Todo, builder.todos),
						failuresList
					]));
		}
	} else {
		return _List_Nil;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $author$project$Test$Runner$Node$sendResults = F3(
	function (isFinished, testReporter, results) {
		var typeStr = isFinished ? 'FINISHED' : 'RESULTS';
		var addToKeyValues = F2(
			function (_v0, list) {
				var testId = _v0.a;
				var result = _v0.b;
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						$elm$core$String$fromInt(testId),
						testReporter.reportComplete(result)),
					list);
			});
		return $author$project$Test$Runner$Node$elmTestPort__send(
			A2(
				$elm$json$Json$Encode$encode,
				0,
				$elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							$elm$json$Json$Encode$string(typeStr)),
							_Utils_Tuple2(
							'results',
							$elm$json$Json$Encode$object(
								A3($elm$core$List$foldl, addToKeyValues, _List_Nil, results)))
						]))));
	});
var $author$project$Test$Runner$Node$dispatch = F2(
	function (model, startTime) {
		var _v0 = A2($elm$core$Dict$get, model.nextTestToRun, model.available);
		if (_v0.$ === 'Nothing') {
			return A3($author$project$Test$Runner$Node$sendResults, true, model.testReporter, model.results);
		} else {
			var config = _v0.a;
			var outcomes = $author$project$Test$Reporter$TestResults$outcomesFromExpectations(
				config.run(_Utils_Tuple0));
			return A2(
				$elm$core$Task$perform,
				A3($author$project$Test$Runner$Node$Complete, config.labels, outcomes, startTime),
				$elm$time$Time$now);
		}
	});
var $author$project$Test$Reporter$TestResults$isFailure = function (outcome) {
	if (outcome.$ === 'Failed') {
		return true;
	} else {
		return false;
	}
};
var $author$project$Test$Runner$Node$sendBegin = function (model) {
	var extraFields = function () {
		var _v0 = model.testReporter.reportBegin(model.runInfo);
		if (_v0.$ === 'Just') {
			var report = _v0.a;
			return _List_fromArray(
				[
					_Utils_Tuple2('message', report)
				]);
		} else {
			return _List_Nil;
		}
	}();
	var baseFields = _List_fromArray(
		[
			_Utils_Tuple2(
			'type',
			$elm$json$Json$Encode$string('BEGIN')),
			_Utils_Tuple2(
			'testCount',
			$elm$json$Json$Encode$int(model.runInfo.testCount))
		]);
	return $author$project$Test$Runner$Node$elmTestPort__send(
		A2(
			$elm$json$Json$Encode$encode,
			0,
			$elm$json$Json$Encode$object(
				_Utils_ap(baseFields, extraFields))));
};
var $author$project$Test$Runner$Node$update = F2(
	function (msg, model) {
		var testReporter = model.testReporter;
		switch (msg.$) {
			case 'Receive':
				var val = msg.a;
				var _v1 = A2($elm$json$Json$Decode$decodeValue, $author$project$Test$Runner$JsMessage$decoder, val);
				if (_v1.$ === 'Ok') {
					if (_v1.a.$ === 'Summary') {
						var _v2 = _v1.a;
						var duration = _v2.a;
						var failed = _v2.b;
						var todos = _v2.c;
						var testCount = model.runInfo.testCount;
						var summaryInfo = {
							duration: duration,
							failed: failed,
							passed: (testCount - failed) - $elm$core$List$length(todos),
							testCount: testCount,
							todos: todos
						};
						var summary = A2(testReporter.reportSummary, summaryInfo, model.autoFail);
						var exitCode = (failed > 0) ? 2 : ((_Utils_eq(model.autoFail, $elm$core$Maybe$Nothing) && $elm$core$List$isEmpty(todos)) ? 0 : 3);
						var cmd = $author$project$Test$Runner$Node$elmTestPort__send(
							A2(
								$elm$json$Json$Encode$encode,
								0,
								$elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'type',
											$elm$json$Json$Encode$string('SUMMARY')),
											_Utils_Tuple2(
											'exitCode',
											$elm$json$Json$Encode$int(exitCode)),
											_Utils_Tuple2('message', summary)
										]))));
						return _Utils_Tuple2(model, cmd);
					} else {
						var index = _v1.a.a;
						var cmd = A2($elm$core$Task$perform, $author$project$Test$Runner$Node$Dispatch, $elm$time$Time$now);
						return _Utils_eq(index, -1) ? _Utils_Tuple2(
							_Utils_update(
								model,
								{nextTestToRun: index + model.processes}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										cmd,
										$author$project$Test$Runner$Node$sendBegin(model)
									]))) : _Utils_Tuple2(
							_Utils_update(
								model,
								{nextTestToRun: index}),
							cmd);
					}
				} else {
					var err = _v1.a;
					var cmd = $author$project$Test$Runner$Node$elmTestPort__send(
						A2(
							$elm$json$Json$Encode$encode,
							0,
							$elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'type',
										$elm$json$Json$Encode$string('ERROR')),
										_Utils_Tuple2(
										'message',
										$elm$json$Json$Encode$string(
											$elm$json$Json$Decode$errorToString(err)))
									]))));
					return _Utils_Tuple2(model, cmd);
				}
			case 'Dispatch':
				var startTime = msg.a;
				return _Utils_Tuple2(
					model,
					A2($author$project$Test$Runner$Node$dispatch, model, startTime));
			default:
				var labels = msg.a;
				var outcomes = msg.b;
				var startTime = msg.c;
				var endTime = msg.d;
				var nextTestToRun = model.nextTestToRun + model.processes;
				var isFinished = _Utils_cmp(nextTestToRun, model.runInfo.testCount) > -1;
				var duration = $elm$time$Time$posixToMillis(endTime) - $elm$time$Time$posixToMillis(startTime);
				var prependOutcome = F2(
					function (outcome, rest) {
						return A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								model.nextTestToRun,
								{duration: duration, labels: labels, outcome: outcome}),
							rest);
					});
				var results = A3($elm$core$List$foldl, prependOutcome, model.results, outcomes);
				if (isFinished || A2($elm$core$List$any, $author$project$Test$Reporter$TestResults$isFailure, outcomes)) {
					var cmd = A3($author$project$Test$Runner$Node$sendResults, isFinished, testReporter, results);
					return isFinished ? _Utils_Tuple2(model, cmd) : _Utils_Tuple2(
						_Utils_update(
							model,
							{nextTestToRun: nextTestToRun, results: _List_Nil}),
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									cmd,
									A2($elm$core$Task$perform, $author$project$Test$Runner$Node$Dispatch, $elm$time$Time$now)
								])));
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{nextTestToRun: nextTestToRun, results: results}),
						A2($elm$core$Task$perform, $author$project$Test$Runner$Node$Dispatch, $elm$time$Time$now));
				}
		}
	});
var $elm$core$Platform$worker = _Platform_worker;
var $author$project$Test$Runner$Node$run = F2(
	function (_v0, possiblyTests) {
		var runs = _v0.runs;
		var seed = _v0.seed;
		var report = _v0.report;
		var globs = _v0.globs;
		var paths = _v0.paths;
		var processes = _v0.processes;
		var tests = A2(
			$elm$core$List$filterMap,
			function (_v4) {
				var moduleName = _v4.a;
				var maybeModuleTests = _v4.b;
				var moduleTests = A2($elm$core$List$filterMap, $elm$core$Basics$identity, maybeModuleTests);
				return $elm$core$List$isEmpty(moduleTests) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
					A2($elm_explorations$test$Test$describe, moduleName, moduleTests));
			},
			possiblyTests);
		if ($elm$core$List$isEmpty(tests)) {
			return $elm$core$Platform$worker(
				{
					init: A2(
						$author$project$Test$Runner$Node$failInit,
						$author$project$Test$Runner$Node$noTestsFoundError(globs),
						report),
					subscriptions: function (_v1) {
						return $elm$core$Platform$Sub$none;
					},
					update: F2(
						function (_v2, model) {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						})
				});
		} else {
			var runners = A3(
				$elm_explorations$test$Test$Runner$fromTest,
				runs,
				$elm$random$Random$initialSeed(seed),
				$elm_explorations$test$Test$concat(tests));
			var wrappedInit = $author$project$Test$Runner$Node$init(
				{fuzzRuns: runs, globs: globs, initialSeed: seed, paths: paths, processes: processes, report: report, runners: runners});
			return $elm$core$Platform$worker(
				{
					init: wrappedInit,
					subscriptions: function (_v3) {
						return $author$project$Test$Runner$Node$elmTestPort__receive($author$project$Test$Runner$Node$Receive);
					},
					update: $author$project$Test$Runner$Node$update
				});
		}
	});
var $elm_explorations$test$Test$Html$Selector$Internal$Containing = function (a) {
	return {$: 'Containing', a: a};
};
var $elm_explorations$test$Test$Html$Selector$containing = $elm_explorations$test$Test$Html$Selector$Internal$Containing;
var $elm_explorations$test$Test$Html$Selector$Internal$All = function (a) {
	return {$: 'All', a: a};
};
var $elm_explorations$test$Test$Html$Selector$all = $elm_explorations$test$Test$Html$Selector$Internal$All;
var $elm_explorations$test$Test$Html$Selector$Internal$Classes = function (a) {
	return {$: 'Classes', a: a};
};
var $elm_explorations$test$Test$Html$Selector$Internal$Invalid = {$: 'Invalid'};
var $elm_explorations$test$Test$Html$Selector$Internal$Style = function (a) {
	return {$: 'Style', a: a};
};
var $elm_explorations$test$Test$Html$Selector$Internal$Attribute = function (a) {
	return {$: 'Attribute', a: a};
};
var $elm_explorations$test$Test$Html$Selector$Internal$namedAttr = F2(
	function (name, value) {
		return $elm_explorations$test$Test$Html$Selector$Internal$Attribute(
			{name: name, value: value});
	});
var $elm_explorations$test$Test$Html$Selector$Internal$BoolAttribute = function (a) {
	return {$: 'BoolAttribute', a: a};
};
var $elm_explorations$test$Test$Html$Selector$Internal$namedBoolAttr = F2(
	function (name, value) {
		return $elm_explorations$test$Test$Html$Selector$Internal$BoolAttribute(
			{name: name, value: value});
	});
var $elm_explorations$test$Test$Html$Selector$orElseLazy = F2(
	function (fma, mb) {
		if (mb.$ === 'Err') {
			return fma(_Utils_Tuple0);
		} else {
			return mb;
		}
	});
var $elm_explorations$test$Test$Html$Internal$Inert$attributeToJson = function (attribute) {
	return _HtmlAsJson_attributeToJson(attribute);
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Attribute = function (a) {
	return {$: 'Attribute', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$AttributeRecord = F2(
	function (key, value) {
		return {key: key, value: value};
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NamespacedAttribute = function (a) {
	return {$: 'NamespacedAttribute', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NamespacedAttributeRecord = F3(
	function (key, value, namespace) {
		return {key: key, namespace: namespace, value: value};
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Property = function (a) {
	return {$: 'Property', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$PropertyRecord = F2(
	function (key, value) {
		return {key: key, value: value};
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Style = function (a) {
	return {$: 'Style', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeKey = 'a3';
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeNamespaceKey = 'a4';
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$propKey = 'a2';
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$styleKey = 'a1';
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeAttribute = A2(
	$elm$json$Json$Decode$andThen,
	function (tag) {
		return _Utils_eq(tag, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeKey) ? A3(
			$elm$json$Json$Decode$map2,
			F2(
				function (key, val) {
					return $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Attribute(
						A2($elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$AttributeRecord, key, val));
				}),
			A2($elm$json$Json$Decode$field, 'n', $elm$json$Json$Decode$string),
			A2($elm$json$Json$Decode$field, 'o', $elm$json$Json$Decode$string)) : (_Utils_eq(tag, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeNamespaceKey) ? A2(
			$elm$json$Json$Decode$map,
			$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NamespacedAttribute,
			A4(
				$elm$json$Json$Decode$map3,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NamespacedAttributeRecord,
				A2($elm$json$Json$Decode$field, 'n', $elm$json$Json$Decode$string),
				A2(
					$elm$json$Json$Decode$at,
					_List_fromArray(
						['o', 'o']),
					$elm$json$Json$Decode$string),
				A2(
					$elm$json$Json$Decode$at,
					_List_fromArray(
						['o', 'f']),
					$elm$json$Json$Decode$string))) : (_Utils_eq(tag, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$styleKey) ? A3(
			$elm$json$Json$Decode$map2,
			F2(
				function (key, val) {
					return $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Style(
						{key: key, value: val});
				}),
			A2($elm$json$Json$Decode$field, 'n', $elm$json$Json$Decode$string),
			A2($elm$json$Json$Decode$field, 'o', $elm$json$Json$Decode$string)) : (_Utils_eq(tag, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$propKey) ? A3(
			$elm$json$Json$Decode$map2,
			F2(
				function (key, val) {
					return $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Property(
						A2($elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$PropertyRecord, key, val));
				}),
			A2($elm$json$Json$Decode$field, 'n', $elm$json$Json$Decode$string),
			A2(
				$elm$json$Json$Decode$at,
				_List_fromArray(
					['o', 'a']),
				$elm$json$Json$Decode$value)) : $elm$json$Json$Decode$fail('Unexpected Html.Attribute tag: ' + tag))));
	},
	A2($elm$json$Json$Decode$field, '$', $elm$json$Json$Decode$string));
var $elm_explorations$test$Test$Html$Internal$Inert$parseAttribute = function (attr) {
	var _v0 = A2(
		$elm$json$Json$Decode$decodeValue,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeAttribute,
		$elm_explorations$test$Test$Html$Internal$Inert$attributeToJson(attr));
	if (_v0.$ === 'Ok') {
		var parsedAttribute = _v0.a;
		return $elm$core$Result$Ok(parsedAttribute);
	} else {
		var jsonError = _v0.a;
		return $elm$core$Result$Err(
			'Error internally processing Attribute for testing - please report this error message as a bug: ' + $elm$json$Json$Decode$errorToString(jsonError));
	}
};
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $elm_explorations$test$Test$Html$Selector$attribute = function (attr) {
	var _v0 = $elm_explorations$test$Test$Html$Internal$Inert$parseAttribute(attr);
	_v0$3:
	while (true) {
		if (_v0.$ === 'Ok') {
			switch (_v0.a.$) {
				case 'Attribute':
					var key = _v0.a.a.key;
					var value = _v0.a.a.value;
					return ($elm$core$String$toLower(key) === 'class') ? $elm_explorations$test$Test$Html$Selector$Internal$Classes(
						A2($elm$core$String$split, ' ', value)) : A2($elm_explorations$test$Test$Html$Selector$Internal$namedAttr, key, value);
				case 'Property':
					var key = _v0.a.a.key;
					var value = _v0.a.a.value;
					return (key === 'className') ? $elm_explorations$test$Test$Html$Selector$Internal$Classes(
						A2(
							$elm$core$Result$withDefault,
							_List_Nil,
							A2(
								$elm$core$Result$map,
								$elm$core$String$split(' '),
								A2($elm$json$Json$Decode$decodeValue, $elm$json$Json$Decode$string, value)))) : A2(
						$elm$core$Result$withDefault,
						$elm_explorations$test$Test$Html$Selector$Internal$Invalid,
						A2(
							$elm_explorations$test$Test$Html$Selector$orElseLazy,
							function (_v1) {
								return A2(
									$elm$core$Result$map,
									$elm_explorations$test$Test$Html$Selector$Internal$namedBoolAttr(key),
									A2($elm$json$Json$Decode$decodeValue, $elm$json$Json$Decode$bool, value));
							},
							A2(
								$elm$core$Result$map,
								$elm_explorations$test$Test$Html$Selector$Internal$namedAttr(key),
								A2($elm$json$Json$Decode$decodeValue, $elm$json$Json$Decode$string, value))));
				case 'Style':
					var key = _v0.a.a.key;
					var value = _v0.a.a.value;
					return $elm_explorations$test$Test$Html$Selector$Internal$Style(
						{key: key, value: value});
				default:
					break _v0$3;
			}
		} else {
			break _v0$3;
		}
	}
	return $elm_explorations$test$Test$Html$Selector$Internal$Invalid;
};
var $elm_explorations$test$Test$Html$Selector$id = $elm_explorations$test$Test$Html$Selector$Internal$namedAttr('id');
var $elm_explorations$test$Test$Html$Selector$Internal$Tag = function (a) {
	return {$: 'Tag', a: a};
};
var $elm_explorations$test$Test$Html$Selector$tag = function (name) {
	return $elm_explorations$test$Test$Html$Selector$Internal$Tag(name);
};
var $author$project$PostsViewTests$selectShowJobPostsCheckbox = $elm_explorations$test$Test$Html$Selector$all(
	_List_fromArray(
		[
			$elm_explorations$test$Test$Html$Selector$tag('input'),
			$elm_explorations$test$Test$Html$Selector$attribute(
			$elm$html$Html$Attributes$type_('checkbox')),
			$elm_explorations$test$Test$Html$Selector$id('checkbox-show-job-posts')
		]));
var $elm_explorations$test$Test$Html$Selector$Internal$Text = function (a) {
	return {$: 'Text', a: a};
};
var $elm_explorations$test$Test$Html$Selector$text = $elm_explorations$test$Test$Html$Selector$Internal$Text;
var $author$project$PostsViewTests$selectElementContainingShowJobPostsCheckbox = _List_fromArray(
	[
		$elm_explorations$test$Test$Html$Selector$containing(
		_List_fromArray(
			[$author$project$PostsViewTests$selectShowJobPostsCheckbox])),
		$elm_explorations$test$Test$Html$Selector$containing(
		_List_fromArray(
			[
				$elm_explorations$test$Test$Html$Selector$text('Show'),
				$elm_explorations$test$Test$Html$Selector$text('job')
			]))
	]);
var $author$project$PostsViewTests$selectShowTextPostsCheckbox = $elm_explorations$test$Test$Html$Selector$all(
	_List_fromArray(
		[
			$elm_explorations$test$Test$Html$Selector$tag('input'),
			$elm_explorations$test$Test$Html$Selector$attribute(
			$elm$html$Html$Attributes$type_('checkbox')),
			$elm_explorations$test$Test$Html$Selector$id('checkbox-show-text-only-posts')
		]));
var $author$project$PostsViewTests$selectElementContainingShowTextPostsCheckbox = _List_fromArray(
	[
		$elm_explorations$test$Test$Html$Selector$containing(
		_List_fromArray(
			[$author$project$PostsViewTests$selectShowTextPostsCheckbox])),
		$elm_explorations$test$Test$Html$Selector$containing(
		_List_fromArray(
			[
				$elm_explorations$test$Test$Html$Selector$text('Show'),
				$elm_explorations$test$Test$Html$Selector$text('text')
			]))
	]);
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Cursor$back = function (l) {
	var _v0 = l;
	var l1 = _v0.a;
	var mij = _v0.b;
	var l2 = _v0.c;
	if (!l1.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		var x = l1.a;
		var xs = l1.b;
		return $elm$core$Maybe$Just(
			A3(
				$author$project$Cursor$withSelectedElement,
				$elm$core$List$reverse(xs),
				x,
				_Utils_ap(
					_List_fromArray(
						[mij]),
					l2)));
	}
};
var $author$project$Cursor$lengthHelpCalc = F2(
	function (nrElem, l) {
		lengthHelpCalc:
		while (true) {
			if (!l.b) {
				return nrElem;
			} else {
				var x = l.a;
				var xs = l.b;
				var $temp$nrElem = nrElem + 1,
					$temp$l = xs;
				nrElem = $temp$nrElem;
				l = $temp$l;
				continue lengthHelpCalc;
			}
		}
	});
var $author$project$Cursor$length = function (l) {
	var _v0 = l;
	var l1 = _v0.a;
	var x = _v0.b;
	var l2 = _v0.c;
	var lungime = (A2($author$project$Cursor$lengthHelpCalc, 0, l1) + 1) + A2($author$project$Cursor$lengthHelpCalc, 0, l2);
	return lungime;
};
var $author$project$Cursor$nonEmpty = F2(
	function (x, xs) {
		return A3($author$project$Cursor$Cursor, _List_Nil, x, xs);
	});
var $elm_explorations$test$Test$Internal$blankDescriptionFailure = $elm_explorations$test$Test$Internal$failNow(
	{
		description: 'This test has a blank description. Let\'s give it a useful one!',
		reason: $elm_explorations$test$Test$Runner$Failure$Invalid($elm_explorations$test$Test$Runner$Failure$BadDescription)
	});
var $elm_explorations$test$Test$test = F2(
	function (untrimmedDesc, thunk) {
		var desc = $elm$core$String$trim(untrimmedDesc);
		return $elm$core$String$isEmpty(desc) ? $elm_explorations$test$Test$Internal$blankDescriptionFailure : A2(
			$elm_explorations$test$Test$Internal$ElmTestVariant__Labeled,
			desc,
			$elm_explorations$test$Test$Internal$ElmTestVariant__UnitTest(
				function (_v0) {
					return _List_fromArray(
						[
							thunk(_Utils_Tuple0)
						]);
				}));
	});
var $author$project$Cursor$toList = function (l) {
	var _v0 = l;
	var l1 = _v0.a;
	var x = _v0.b;
	var l2 = _v0.c;
	return _Utils_ap(
		l1,
		A2($elm$core$List$cons, x, l2));
};
var $author$project$ExampleTests$CursorTests$suite = A2(
	$elm_explorations$test$Test$describe,
	'module Cursor',
	_List_fromArray(
		[
			A2(
			$elm_explorations$test$Test$describe,
			'back',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'#back: \n\n    nonEmpty 1 [ 2, 3 ] |> forward |> Maybe.andThen back\n    --> Just (withSelectedElement [] 1 [2, 3])',
					function (_v0) {
						return A2(
							$elm_explorations$test$Expect$equal,
							A2(
								$elm$core$Maybe$andThen,
								$author$project$Cursor$back,
								$author$project$Cursor$forward(
									A2(
										$author$project$Cursor$nonEmpty,
										1,
										_List_fromArray(
											[2, 3])))),
							$elm$core$Maybe$Just(
								A3(
									$author$project$Cursor$withSelectedElement,
									_List_Nil,
									1,
									_List_fromArray(
										[2, 3]))));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#back: \n\n    back (nonEmpty 1 [])\n    --> Nothing',
					function (_v1) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Cursor$back(
								A2($author$project$Cursor$nonEmpty, 1, _List_Nil)),
							$elm$core$Maybe$Nothing);
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#back: \n\n    back (nonEmpty 1 [ 2, 3 ])\n    --> Nothing',
					function (_v2) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Cursor$back(
								A2(
									$author$project$Cursor$nonEmpty,
									1,
									_List_fromArray(
										[2, 3]))),
							$elm$core$Maybe$Nothing);
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'forward',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'#forward: \n\n    nonEmpty 1 [ 2, 3 ] |> forward |> Maybe.andThen forward\n    --> Just (withSelectedElement [1, 2] 3 [])',
					function (_v3) {
						return A2(
							$elm_explorations$test$Expect$equal,
							A2(
								$elm$core$Maybe$andThen,
								$author$project$Cursor$forward,
								$author$project$Cursor$forward(
									A2(
										$author$project$Cursor$nonEmpty,
										1,
										_List_fromArray(
											[2, 3])))),
							$elm$core$Maybe$Just(
								A3(
									$author$project$Cursor$withSelectedElement,
									_List_fromArray(
										[1, 2]),
									3,
									_List_Nil)));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#forward: \n\n    forward (nonEmpty 1 [])\n    --> Nothing',
					function (_v4) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Cursor$forward(
								A2($author$project$Cursor$nonEmpty, 1, _List_Nil)),
							$elm$core$Maybe$Nothing);
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#forward: \n\n    forward (nonEmpty 1 [ 2, 3 ])\n    --> Just (withSelectedElement [1] 2 [3])',
					function (_v5) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Cursor$forward(
								A2(
									$author$project$Cursor$nonEmpty,
									1,
									_List_fromArray(
										[2, 3]))),
							$elm$core$Maybe$Just(
								A3(
									$author$project$Cursor$withSelectedElement,
									_List_fromArray(
										[1]),
									2,
									_List_fromArray(
										[3]))));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'fromList',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'#fromList: \n\n    fromList []\n    --> Nothing',
					function (_v6) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Cursor$fromList(_List_Nil),
							$elm$core$Maybe$Nothing);
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#fromList: \n\n    fromList [ 1, 2, 3 ]\n    --> Just (withSelectedElement [] 1 [2, 3])',
					function (_v7) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Cursor$fromList(
								_List_fromArray(
									[1, 2, 3])),
							$elm$core$Maybe$Just(
								A3(
									$author$project$Cursor$withSelectedElement,
									_List_Nil,
									1,
									_List_fromArray(
										[2, 3]))));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'length',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'#length: \n\n    length (nonEmpty 1 [ 2, 3 ])\n    --> 3',
					function (_v8) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Cursor$length(
								A2(
									$author$project$Cursor$nonEmpty,
									1,
									_List_fromArray(
										[2, 3]))),
							3);
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#length: \n\n    length (nonEmpty 1 [])\n    --> 1',
					function (_v9) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Cursor$length(
								A2($author$project$Cursor$nonEmpty, 1, _List_Nil)),
							1);
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'toList',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'#toList: \n\n    toList (nonEmpty 1 [ 2, 3 ])\n    --> [1, 2, 3]',
					function (_v10) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Cursor$toList(
								A2(
									$author$project$Cursor$nonEmpty,
									1,
									_List_fromArray(
										[2, 3]))),
							_List_fromArray(
								[1, 2, 3]));
					})
				]))
		]));
var $author$project$ExampleTests$ModelPostIdsTests$suite = A2(
	$elm_explorations$test$Test$describe,
	'module Model.PostIds',
	_List_fromArray(
		[
			A2(
			$elm_explorations$test$Test$describe,
			'advance',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'#advance: \n\n    advance (PostIds (Cursor.withSelectedElement [ 1, 2 ] 3 []))\n    --> Nothing',
					function (_v0) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Model$PostIds$advance(
								$author$project$Model$PostIds$PostIds(
									A3(
										$author$project$Cursor$withSelectedElement,
										_List_fromArray(
											[1, 2]),
										3,
										_List_Nil))),
							$elm$core$Maybe$Nothing);
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#advance: \n\n    advance (PostIds (Cursor.nonEmpty 1 [ 2, 3 ]))\n    --> Just ( 2, PostIds (Cursor.withSelectedElement [1] 2 [3]))',
					function (_v1) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Model$PostIds$advance(
								$author$project$Model$PostIds$PostIds(
									A2(
										$author$project$Cursor$nonEmpty,
										1,
										_List_fromArray(
											[2, 3])))),
							$elm$core$Maybe$Just(
								_Utils_Tuple2(
									2,
									$author$project$Model$PostIds$PostIds(
										A3(
											$author$project$Cursor$withSelectedElement,
											_List_fromArray(
												[1]),
											2,
											_List_fromArray(
												[3]))))));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'decode',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'#decode: \n\n    De.decodeString decode \"[]\"\n    --> Ok (Nothing)',
					function (_v2) {
						return A2(
							$elm_explorations$test$Expect$equal,
							A2($elm$json$Json$Decode$decodeString, $author$project$Model$PostIds$decode, '[]'),
							$elm$core$Result$Ok($elm$core$Maybe$Nothing));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#decode: \n\n    De.decodeString decode \"[1]\"\n    --> Ok (Just (PostIds (Cursor.nonEmpty 1 [])))',
					function (_v3) {
						return A2(
							$elm_explorations$test$Expect$equal,
							A2($elm$json$Json$Decode$decodeString, $author$project$Model$PostIds$decode, '[1]'),
							$elm$core$Result$Ok(
								$elm$core$Maybe$Just(
									$author$project$Model$PostIds$PostIds(
										A2($author$project$Cursor$nonEmpty, 1, _List_Nil)))));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#decode: \n\n    De.decodeString decode \"[1, 2, 3]\"\n    --> Ok (Just (PostIds (Cursor.nonEmpty 1 [2, 3])))',
					function (_v4) {
						return A2(
							$elm_explorations$test$Expect$equal,
							A2($elm$json$Json$Decode$decodeString, $author$project$Model$PostIds$decode, '[1, 2, 3]'),
							$elm$core$Result$Ok(
								$elm$core$Maybe$Just(
									$author$project$Model$PostIds$PostIds(
										A2(
											$author$project$Cursor$nonEmpty,
											1,
											_List_fromArray(
												[2, 3]))))));
					})
				]))
		]));
var $author$project$ExampleTests$ModelPostsConfigTests$suite = A2(
	$elm_explorations$test$Test$describe,
	'module Model.PostsConfig',
	_List_fromArray(
		[
			A2(
			$elm_explorations$test$Test$describe,
			'sortFromString',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'#sortFromString: \n\n    sortFromString \"Title\"\n    --> Just Title',
					function (_v0) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Model$PostsConfig$sortFromString('Title'),
							$elm$core$Maybe$Just($author$project$Model$PostsConfig$Title));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#sortFromString: \n\n    sortFromString \"Invalid\"\n    --> Nothing',
					function (_v1) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Model$PostsConfig$sortFromString('Invalid'),
							$elm$core$Maybe$Nothing);
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#sortFromString: \n\n    sortFromString \"Score\"\n    --> Just Score',
					function (_v2) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Model$PostsConfig$sortFromString('Score'),
							$elm$core$Maybe$Just($author$project$Model$PostsConfig$Score));
					})
				]))
		]));
var $author$project$Util$Time$Duration = F4(
	function (seconds, minutes, hours, days) {
		return {days: days, hours: hours, minutes: minutes, seconds: seconds};
	});
var $author$project$ExampleTests$UtilTimeTests$suite = A2(
	$elm_explorations$test$Test$describe,
	'module Util.Time',
	_List_fromArray(
		[
			A2(
			$elm_explorations$test$Test$describe,
			'durationBetween',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'#durationBetween: \n\n    durationBetween (Time.millisToPosix 1000) (Time.millisToPosix 1000)\n    --> Nothing',
					function (_v0) {
						return A2(
							$elm_explorations$test$Expect$equal,
							A2(
								$author$project$Util$Time$durationBetween,
								$elm$time$Time$millisToPosix(1000),
								$elm$time$Time$millisToPosix(1000)),
							$elm$core$Maybe$Nothing);
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#durationBetween: \n\n    durationBetween (Time.millisToPosix 1000) (Time.millisToPosix 0)\n    --> Nothing',
					function (_v1) {
						return A2(
							$elm_explorations$test$Expect$equal,
							A2(
								$author$project$Util$Time$durationBetween,
								$elm$time$Time$millisToPosix(1000),
								$elm$time$Time$millisToPosix(0)),
							$elm$core$Maybe$Nothing);
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#durationBetween: \n\n    durationBetween (Time.millisToPosix 0) (Time.millisToPosix (4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 2 * 60 * 1000 + 1000))\n    --> Just (Duration 1 2 3 4)',
					function (_v2) {
						return A2(
							$elm_explorations$test$Expect$equal,
							A2(
								$author$project$Util$Time$durationBetween,
								$elm$time$Time$millisToPosix(0),
								$elm$time$Time$millisToPosix(((((((4 * 24) * 60) * 60) * 1000) + (((3 * 60) * 60) * 1000)) + ((2 * 60) * 1000)) + 1000)),
							$elm$core$Maybe$Just(
								A4($author$project$Util$Time$Duration, 1, 2, 3, 4)));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#durationBetween: \n\n    durationBetween (Time.millisToPosix 0) (Time.millisToPosix (24 * 60 * 60 * 1000 + 1000))\n    --> Just (Duration 1 0 0 1)',
					function (_v3) {
						return A2(
							$elm_explorations$test$Expect$equal,
							A2(
								$author$project$Util$Time$durationBetween,
								$elm$time$Time$millisToPosix(0),
								$elm$time$Time$millisToPosix((((24 * 60) * 60) * 1000) + 1000)),
							$elm$core$Maybe$Just(
								A4($author$project$Util$Time$Duration, 1, 0, 0, 1)));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#durationBetween: \n\n    durationBetween (Time.millisToPosix 0) (Time.millisToPosix (24 * 60 * 60 * 1000))\n    --> Just (Duration 0 0 0 1)',
					function (_v4) {
						return A2(
							$elm_explorations$test$Expect$equal,
							A2(
								$author$project$Util$Time$durationBetween,
								$elm$time$Time$millisToPosix(0),
								$elm$time$Time$millisToPosix(((24 * 60) * 60) * 1000)),
							$elm$core$Maybe$Just(
								A4($author$project$Util$Time$Duration, 0, 0, 0, 1)));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#durationBetween: \n\n    durationBetween (Time.millisToPosix 0) (Time.millisToPosix (60 * 60 * 1000))\n    --> Just (Duration 0 0 1 0)',
					function (_v5) {
						return A2(
							$elm_explorations$test$Expect$equal,
							A2(
								$author$project$Util$Time$durationBetween,
								$elm$time$Time$millisToPosix(0),
								$elm$time$Time$millisToPosix((60 * 60) * 1000)),
							$elm$core$Maybe$Just(
								A4($author$project$Util$Time$Duration, 0, 0, 1, 0)));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#durationBetween: \n\n    durationBetween (Time.millisToPosix 0) (Time.millisToPosix (60 * 1000))\n    --> Just (Duration 0 1 0 0)',
					function (_v6) {
						return A2(
							$elm_explorations$test$Expect$equal,
							A2(
								$author$project$Util$Time$durationBetween,
								$elm$time$Time$millisToPosix(0),
								$elm$time$Time$millisToPosix(60 * 1000)),
							$elm$core$Maybe$Just(
								A4($author$project$Util$Time$Duration, 0, 1, 0, 0)));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#durationBetween: \n\n    durationBetween (Time.millisToPosix 0) (Time.millisToPosix (1000))\n    --> Just (Duration 1 0 0 0)',
					function (_v7) {
						return A2(
							$elm_explorations$test$Expect$equal,
							A2(
								$author$project$Util$Time$durationBetween,
								$elm$time$Time$millisToPosix(0),
								$elm$time$Time$millisToPosix(1000)),
							$elm$core$Maybe$Just(
								A4($author$project$Util$Time$Duration, 1, 0, 0, 0)));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'formatDuration',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'#formatDuration: \n\n    formatDuration (Duration 0 30 0 1)\n    --> \"1 day 30 minutes ago\"',
					function (_v8) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Util$Time$formatDuration(
								A4($author$project$Util$Time$Duration, 0, 30, 0, 1)),
							'1 day 30 minutes ago');
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#formatDuration: \n\n    formatDuration (Duration 0 47 6 2)\n    --> \"2 days 6 hours 47 minutes ago\"',
					function (_v9) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Util$Time$formatDuration(
								A4($author$project$Util$Time$Duration, 0, 47, 6, 2)),
							'2 days 6 hours 47 minutes ago');
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#formatDuration: \n\n    formatDuration (Duration 0 1 1 1)\n    --> \"1 day 1 hour 1 minute ago\"',
					function (_v10) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Util$Time$formatDuration(
								A4($author$project$Util$Time$Duration, 0, 1, 1, 1)),
							'1 day 1 hour 1 minute ago');
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#formatDuration: \n\n    formatDuration (Duration 0 0 0 3)\n    --> \"3 days ago\"',
					function (_v11) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Util$Time$formatDuration(
								A4($author$project$Util$Time$Duration, 0, 0, 0, 3)),
							'3 days ago');
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#formatDuration: \n\n    formatDuration (Duration 0 0 2 0)\n    --> \"2 hours ago\"',
					function (_v12) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Util$Time$formatDuration(
								A4($author$project$Util$Time$Duration, 0, 0, 2, 0)),
							'2 hours ago');
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#formatDuration: \n\n    formatDuration (Duration 0 1 0 0)\n    --> \"1 minute ago\"',
					function (_v13) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Util$Time$formatDuration(
								A4($author$project$Util$Time$Duration, 0, 1, 0, 0)),
							'1 minute ago');
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#formatDuration: \n\n    formatDuration (Duration 2 0 0 0)\n    --> \"2 seconds ago\"',
					function (_v14) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Util$Time$formatDuration(
								A4($author$project$Util$Time$Duration, 2, 0, 0, 0)),
							'2 seconds ago');
					}),
					A2(
					$elm_explorations$test$Test$test,
					'#formatDuration: \n\n    formatDuration (Duration 1 0 0 0)\n    --> \"1 second ago\"',
					function (_v15) {
						return A2(
							$elm_explorations$test$Expect$equal,
							$author$project$Util$Time$formatDuration(
								A4($author$project$Util$Time$Duration, 1, 0, 0, 0)),
							'1 second ago');
					})
				]))
		]));
var $elm_explorations$test$Expect$allHelp = F2(
	function (list, query) {
		allHelp:
		while (true) {
			if (!list.b) {
				return $elm_explorations$test$Expect$pass;
			} else {
				var check = list.a;
				var rest = list.b;
				var _v1 = check(query);
				if (_v1.$ === 'Pass') {
					var $temp$list = rest,
						$temp$query = query;
					list = $temp$list;
					query = $temp$query;
					continue allHelp;
				} else {
					var outcome = _v1;
					return outcome;
				}
			}
		}
	});
var $elm_explorations$test$Expect$all = F2(
	function (list, query) {
		return $elm$core$List$isEmpty(list) ? $elm_explorations$test$Test$Expectation$fail(
			{
				description: 'Expect.all was given an empty list. You must make at least one expectation to have a valid test!',
				reason: $elm_explorations$test$Test$Runner$Failure$Invalid($elm_explorations$test$Test$Runner$Failure$EmptyList)
			}) : A2($elm_explorations$test$Expect$allHelp, list, query);
	});
var $elm_explorations$test$Test$Html$Event$check = function (checked) {
	return _Utils_Tuple2(
		'change',
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'target',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'checked',
								$elm$json$Json$Encode$bool(checked))
							])))
				])));
};
var $elm_explorations$test$Test$Html$Query$Internal$InternalError = function (a) {
	return {$: 'InternalError', a: a};
};
var $elm_explorations$test$Test$Html$Query$Internal$Query = F2(
	function (a, b) {
		return {$: 'Query', a: a, b: b};
	});
var $elm_explorations$test$Test$Html$Query$Internal$Single = F2(
	function (a, b) {
		return {$: 'Single', a: a, b: b};
	});
var $elm_explorations$test$Test$Html$Internal$Inert$Node = function (a) {
	return {$: 'Node', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$HtmlContext = F2(
	function (a, b) {
		return {$: 'HtmlContext', a: a, b: b};
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeEntry = function (a) {
	return {$: 'NodeEntry', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeRecord = F4(
	function (tag, children, facts, descendantsCount) {
		return {children: children, descendantsCount: descendantsCount, facts: facts, tag: tag};
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$TextTag = function (a) {
	return {$: 'TextTag', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$CustomNode = function (a) {
	return {$: 'CustomNode', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$MarkdownNode = function (a) {
	return {$: 'MarkdownNode', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$CustomNodeRecord = F2(
	function (facts, model) {
		return {facts: facts, model: model};
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Facts = F5(
	function (styles, events, attributeNamespace, stringAttributes, boolAttributes) {
		return {attributeNamespace: attributeNamespace, boolAttributes: boolAttributes, events: events, stringAttributes: stringAttributes, styles: styles};
	});
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$eventKey = 'a0';
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeEvents = function (taggedEventDecoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$field,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$eventKey,
				$elm$json$Json$Decode$dict(
					A2($elm$json$Json$Decode$map, taggedEventDecoder, $elm$json$Json$Decode$value))),
				$elm$json$Json$Decode$succeed($elm$core$Dict$empty)
			]));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeDictFilterMap = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Dict$toList,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$List$filterMap(
					function (_v0) {
						var key = _v0.a;
						var value = _v0.b;
						var _v1 = A2($elm$json$Json$Decode$decodeValue, decoder, value);
						if (_v1.$ === 'Err') {
							return $elm$core$Maybe$Nothing;
						} else {
							var v = _v1.a;
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(key, v));
						}
					}),
				$elm$core$Dict$fromList)),
		$elm$json$Json$Decode$dict($elm$json$Json$Decode$value));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeAttributes = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$field,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeKey,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeDictFilterMap(decoder)),
				$elm$json$Json$Decode$succeed($elm$core$Dict$empty)
			]));
};
var $elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3($elm$core$Dict$insert, k, v, d) : d;
				}),
			$elm$core$Dict$empty,
			dict);
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$knownKeys = _List_fromArray(
	[$elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$styleKey, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$eventKey, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeKey, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeNamespaceKey]);
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Helpers$filterKnownKeys = $elm$core$Dict$filter(
	F2(
		function (key, _v0) {
			return !A2($elm$core$List$member, key, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$knownKeys);
		}));
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeOthers = function (otherDecoder) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (attributes) {
			return A2(
				$elm$json$Json$Decode$map,
				A2(
					$elm$core$Basics$composeR,
					$elm_explorations$test$Test$Html$Internal$ElmHtml$Helpers$filterKnownKeys,
					$elm$core$Dict$union(attributes)),
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeDictFilterMap(otherDecoder));
		},
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeAttributes(otherDecoder));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeStyles = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$field,
			$elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$styleKey,
			$elm$json$Json$Decode$dict($elm$json$Json$Decode$string)),
			$elm$json$Json$Decode$succeed($elm$core$Dict$empty)
		]));
var $elm$json$Json$Decode$map5 = _Json_map5;
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeFacts = function (_v0) {
	var taggers = _v0.a;
	var eventDecoder = _v0.b;
	return A6(
		$elm$json$Json$Decode$map5,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$Facts,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeStyles,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeEvents(
			eventDecoder(taggers)),
		$elm$json$Json$Decode$maybe(
			A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Html$Internal$ElmHtml$Constants$attributeNamespaceKey, $elm$json$Json$Decode$value)),
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeOthers($elm$json$Json$Decode$string),
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeOthers($elm$json$Json$Decode$bool));
};
var $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants = {
	markdown: {markdown: 'b', options: 'a'},
	virtualDom: {descendantsCount: 'b', facts: 'd', kids: 'e', model: 'g', node: 'k', nodeType: '$', nodeTypeCustom: 3, nodeTypeKeyedNode: 2, nodeTypeNode: 1, nodeTypeTagger: 4, nodeTypeText: 0, nodeTypeThunk: 5, refs: 'l', tag: 'c', tagger: 'j', text: 'a'}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeCustomNodeRecord = function (context) {
	return A3(
		$elm$json$Json$Decode$map2,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$CustomNodeRecord,
		A2(
			$elm$json$Json$Decode$field,
			$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.facts,
			$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeFacts(context)),
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.model, $elm$json$Json$Decode$value));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$MarkdownNodeRecord = F2(
	function (facts, model) {
		return {facts: facts, model: model};
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Markdown$MarkdownModel = F2(
	function (options, markdown) {
		return {markdown: markdown, options: options};
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Markdown$baseMarkdownModel = {
	markdown: '',
	options: {
		defaultHighlighting: $elm$core$Maybe$Nothing,
		githubFlavored: $elm$core$Maybe$Just(
			{breaks: false, tables: false}),
		sanitize: false,
		smartypants: false
	}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Markdown$decodeMarkdownModel = A2(
	$elm$json$Json$Decode$map,
	$elm_explorations$test$Test$Html$Internal$ElmHtml$Markdown$MarkdownModel($elm_explorations$test$Test$Html$Internal$ElmHtml$Markdown$baseMarkdownModel.options),
	A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.markdown.markdown, $elm$json$Json$Decode$string));
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeMarkdownNodeRecord = function (context) {
	return A3(
		$elm$json$Json$Decode$map2,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$MarkdownNodeRecord,
		A2(
			$elm$json$Json$Decode$field,
			$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.facts,
			$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeFacts(context)),
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.model, $elm_explorations$test$Test$Html$Internal$ElmHtml$Markdown$decodeMarkdownModel));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeCustomNode = function (context) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$map,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$MarkdownNode,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeMarkdownNodeRecord(context)),
				A2(
				$elm$json$Json$Decode$map,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$CustomNode,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeCustomNodeRecord(context))
			]));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeTextTag = A2(
	$elm$json$Json$Decode$field,
	$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.text,
	A2(
		$elm$json$Json$Decode$andThen,
		function (text) {
			return $elm$json$Json$Decode$succeed(
				{text: text});
		},
		$elm$json$Json$Decode$string));
var $elm$json$Json$Decode$map4 = _Json_map4;
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$contextDecodeElmHtml = function (context) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (nodeType) {
			return _Utils_eq(nodeType, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.nodeTypeText) ? A2($elm$json$Json$Decode$map, $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$TextTag, $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeTextTag) : (_Utils_eq(nodeType, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.nodeTypeKeyedNode) ? A2(
				$elm$json$Json$Decode$map,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeEntry,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeKeyedNode(context)) : (_Utils_eq(nodeType, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.nodeTypeNode) ? A2(
				$elm$json$Json$Decode$map,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeEntry,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeNode(context)) : (_Utils_eq(nodeType, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.nodeTypeCustom) ? $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeCustomNode(context) : (_Utils_eq(nodeType, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.nodeTypeTagger) ? $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeTagger(context) : (_Utils_eq(nodeType, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.nodeTypeThunk) ? A2(
				$elm$json$Json$Decode$field,
				$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.node,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$contextDecodeElmHtml(context)) : $elm$json$Json$Decode$fail(
				'No such type as ' + $elm$core$String$fromInt(nodeType)))))));
		},
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.nodeType, $elm$json$Json$Decode$int));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeKeyedNode = function (context) {
	var decodeSecondNode = A2(
		$elm$json$Json$Decode$field,
		'b',
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$contextDecodeElmHtml(context));
	return A5(
		$elm$json$Json$Decode$map4,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeRecord,
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.tag, $elm$json$Json$Decode$string),
		A2(
			$elm$json$Json$Decode$field,
			$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.kids,
			$elm$json$Json$Decode$list(decodeSecondNode)),
		A2(
			$elm$json$Json$Decode$field,
			$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.facts,
			$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeFacts(context)),
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.descendantsCount, $elm$json$Json$Decode$int));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeNode = function (context) {
	return A5(
		$elm$json$Json$Decode$map4,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeRecord,
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.tag, $elm$json$Json$Decode$string),
		A2(
			$elm$json$Json$Decode$field,
			$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.kids,
			$elm$json$Json$Decode$list(
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$contextDecodeElmHtml(context))),
		A2(
			$elm$json$Json$Decode$field,
			$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.facts,
			$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeFacts(context)),
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.descendantsCount, $elm$json$Json$Decode$int));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeTagger = function (_v0) {
	var taggers = _v0.a;
	var eventDecoder = _v0.b;
	return A2(
		$elm$json$Json$Decode$andThen,
		function (tagger) {
			var nodeDecoder = $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$contextDecodeElmHtml(
				A2(
					$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$HtmlContext,
					_Utils_ap(
						taggers,
						_List_fromArray(
							[tagger])),
					eventDecoder));
			return A2(
				$elm$json$Json$Decode$at,
				_List_fromArray(
					[$elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.node]),
				nodeDecoder);
		},
		A2($elm$json$Json$Decode$field, $elm_explorations$test$Test$Internal$KernelConstants$kernelConstants.virtualDom.tagger, $elm$json$Json$Decode$value));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeElmHtml = function (eventDecoder) {
	return $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$contextDecodeElmHtml(
		A2($elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$HtmlContext, _List_Nil, eventDecoder));
};
var $elm_explorations$test$Test$Html$Internal$Inert$eventDecoder = function (eventHandler) {
	return _HtmlAsJson_eventHandler(eventHandler);
};
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $elm_explorations$test$Test$Html$Internal$Inert$mapHandler = F2(
	function (f, handler) {
		switch (handler.$) {
			case 'Normal':
				var decoder = handler.a;
				return $elm$virtual_dom$VirtualDom$Normal(
					A2($elm$json$Json$Decode$map, f, decoder));
			case 'MayStopPropagation':
				var decoder = handler.a;
				return $elm$virtual_dom$VirtualDom$MayStopPropagation(
					A2(
						$elm$json$Json$Decode$map,
						$elm$core$Tuple$mapFirst(f),
						decoder));
			case 'MayPreventDefault':
				var decoder = handler.a;
				return $elm$virtual_dom$VirtualDom$MayPreventDefault(
					A2(
						$elm$json$Json$Decode$map,
						$elm$core$Tuple$mapFirst(f),
						decoder));
			default:
				var decoder = handler.a;
				return $elm$virtual_dom$VirtualDom$Custom(
					A2(
						$elm$json$Json$Decode$map,
						function (value) {
							return {
								message: f(value.message),
								preventDefault: value.preventDefault,
								stopPropagation: value.stopPropagation
							};
						},
						decoder));
		}
	});
var $elm_explorations$test$Test$Html$Internal$Inert$taggerFunction = function (tagger) {
	return _HtmlAsJson_taggerFunction(tagger);
};
var $elm_explorations$test$Test$Html$Internal$Inert$taggedEventDecoder = F2(
	function (taggers, eventHandler) {
		if (!taggers.b) {
			return $elm_explorations$test$Test$Html$Internal$Inert$eventDecoder(eventHandler);
		} else {
			if (!taggers.b.b) {
				var tagger = taggers.a;
				return A2(
					$elm_explorations$test$Test$Html$Internal$Inert$mapHandler,
					$elm_explorations$test$Test$Html$Internal$Inert$taggerFunction(tagger),
					$elm_explorations$test$Test$Html$Internal$Inert$eventDecoder(eventHandler));
			} else {
				var tagger = taggers.a;
				var rest = taggers.b;
				return A2(
					$elm_explorations$test$Test$Html$Internal$Inert$mapHandler,
					$elm_explorations$test$Test$Html$Internal$Inert$taggerFunction(tagger),
					A2($elm_explorations$test$Test$Html$Internal$Inert$taggedEventDecoder, rest, eventHandler));
			}
		}
	});
var $elm_explorations$test$Test$Html$Internal$Inert$toJson = function (node) {
	return _HtmlAsJson_toJson(node);
};
var $elm_explorations$test$Test$Html$Internal$Inert$fromHtml = function (html) {
	var _v0 = A2(
		$elm$json$Json$Decode$decodeValue,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$decodeElmHtml($elm_explorations$test$Test$Html$Internal$Inert$taggedEventDecoder),
		$elm_explorations$test$Test$Html$Internal$Inert$toJson(html));
	if (_v0.$ === 'Ok') {
		var elmHtml = _v0.a;
		return $elm$core$Result$Ok(
			$elm_explorations$test$Test$Html$Internal$Inert$Node(elmHtml));
	} else {
		var jsonError = _v0.a;
		return $elm$core$Result$Err(
			$elm$json$Json$Decode$errorToString(jsonError));
	}
};
var $elm_explorations$test$Test$Html$Query$fromHtml = function (html) {
	return A2(
		$elm_explorations$test$Test$Html$Query$Internal$Single,
		true,
		function () {
			var _v0 = $elm_explorations$test$Test$Html$Internal$Inert$fromHtml(html);
			if (_v0.$ === 'Ok') {
				var node = _v0.a;
				return A2($elm_explorations$test$Test$Html$Query$Internal$Query, node, _List_Nil);
			} else {
				var message = _v0.a;
				return $elm_explorations$test$Test$Html$Query$Internal$InternalError(message);
			}
		}());
};
var $avh4$elm_program_test$ProgramTest$Program$renderView = F2(
	function (program, model) {
		return program.withinFocus(
			$elm_explorations$test$Test$Html$Query$fromHtml(
				program.view(model)));
	});
var $avh4$elm_program_test$ProgramTest$expectViewHelper = F4(
	function (functionName, assertion, program, state) {
		var _v0 = $elm_explorations$test$Test$Runner$getFailureReason(
			assertion(
				A2($avh4$elm_program_test$ProgramTest$Program$renderView, program, state.currentModel)));
		if (_v0.$ === 'Nothing') {
			return $elm$core$Result$Ok(state);
		} else {
			var reason = _v0.a;
			return $elm$core$Result$Err(
				A3($avh4$elm_program_test$ProgramTest$Failure$ExpectFailed, functionName, reason.description, reason.reason));
		}
	});
var $avh4$elm_program_test$ProgramTest$ensureView = function (assertion) {
	return $avh4$elm_program_test$ProgramTest$andThen(
		A2($avh4$elm_program_test$ProgramTest$expectViewHelper, 'ensureView', assertion));
};
var $avh4$elm_program_test$ProgramTest$toFailure = function (programTest) {
	if (programTest.$ === 'Created') {
		var created = programTest.a;
		var _v1 = created.state;
		if (_v1.$ === 'Err') {
			var f = _v1.a;
			return $elm$core$Maybe$Just(f.reason);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	} else {
		var f = programTest.a;
		return $elm$core$Maybe$Just(f);
	}
};
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $avh4$elm_program_test$Vendored$Diff$Added = function (a) {
	return {$: 'Added', a: a};
};
var $avh4$elm_program_test$Vendored$Diff$CannotGetA = function (a) {
	return {$: 'CannotGetA', a: a};
};
var $avh4$elm_program_test$Vendored$Diff$CannotGetB = function (a) {
	return {$: 'CannotGetB', a: a};
};
var $avh4$elm_program_test$Vendored$Diff$NoChange = function (a) {
	return {$: 'NoChange', a: a};
};
var $avh4$elm_program_test$Vendored$Diff$Removed = function (a) {
	return {$: 'Removed', a: a};
};
var $avh4$elm_program_test$Vendored$Diff$UnexpectedPath = F2(
	function (a, b) {
		return {$: 'UnexpectedPath', a: a, b: b};
	});
var $avh4$elm_program_test$Vendored$Diff$makeChangesHelp = F5(
	function (changes, getA, getB, _v0, path) {
		makeChangesHelp:
		while (true) {
			var x = _v0.a;
			var y = _v0.b;
			if (!path.b) {
				return $elm$core$Result$Ok(changes);
			} else {
				var _v2 = path.a;
				var prevX = _v2.a;
				var prevY = _v2.b;
				var tail = path.b;
				var change = function () {
					if (_Utils_eq(x - 1, prevX) && _Utils_eq(y - 1, prevY)) {
						var _v4 = getA(x);
						if (_v4.$ === 'Just') {
							var a = _v4.a;
							return $elm$core$Result$Ok(
								$avh4$elm_program_test$Vendored$Diff$NoChange(a));
						} else {
							return $elm$core$Result$Err(
								$avh4$elm_program_test$Vendored$Diff$CannotGetA(x));
						}
					} else {
						if (_Utils_eq(x, prevX)) {
							var _v5 = getB(y);
							if (_v5.$ === 'Just') {
								var b = _v5.a;
								return $elm$core$Result$Ok(
									$avh4$elm_program_test$Vendored$Diff$Added(b));
							} else {
								return $elm$core$Result$Err(
									$avh4$elm_program_test$Vendored$Diff$CannotGetB(y));
							}
						} else {
							if (_Utils_eq(y, prevY)) {
								var _v6 = getA(x);
								if (_v6.$ === 'Just') {
									var a = _v6.a;
									return $elm$core$Result$Ok(
										$avh4$elm_program_test$Vendored$Diff$Removed(a));
								} else {
									return $elm$core$Result$Err(
										$avh4$elm_program_test$Vendored$Diff$CannotGetA(x));
								}
							} else {
								return $elm$core$Result$Err(
									A2(
										$avh4$elm_program_test$Vendored$Diff$UnexpectedPath,
										_Utils_Tuple2(x, y),
										path));
							}
						}
					}
				}();
				if (change.$ === 'Err') {
					var err = change.a;
					return $elm$core$Result$Err(err);
				} else {
					var c = change.a;
					var $temp$changes = A2($elm$core$List$cons, c, changes),
						$temp$getA = getA,
						$temp$getB = getB,
						$temp$_v0 = _Utils_Tuple2(prevX, prevY),
						$temp$path = tail;
					changes = $temp$changes;
					getA = $temp$getA;
					getB = $temp$getB;
					_v0 = $temp$_v0;
					path = $temp$path;
					continue makeChangesHelp;
				}
			}
		}
	});
var $avh4$elm_program_test$Vendored$Diff$makeChanges = F3(
	function (getA, getB, path) {
		if (!path.b) {
			return $elm$core$Result$Ok(_List_Nil);
		} else {
			var latest = path.a;
			var tail = path.b;
			return A5($avh4$elm_program_test$Vendored$Diff$makeChangesHelp, _List_Nil, getA, getB, latest, tail);
		}
	});
var $avh4$elm_program_test$Vendored$Diff$Continue = function (a) {
	return {$: 'Continue', a: a};
};
var $avh4$elm_program_test$Vendored$Diff$Found = function (a) {
	return {$: 'Found', a: a};
};
var $avh4$elm_program_test$Vendored$Diff$step = F4(
	function (snake_, offset, k, v) {
		var fromTop = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2($elm$core$Array$get, (k + 1) + offset, v));
		var fromLeft = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2($elm$core$Array$get, (k - 1) + offset, v));
		var _v0 = function () {
			var _v2 = _Utils_Tuple2(fromLeft, fromTop);
			if (!_v2.a.b) {
				if (!_v2.b.b) {
					return _Utils_Tuple2(
						_List_Nil,
						_Utils_Tuple2(0, 0));
				} else {
					var _v3 = _v2.b;
					var _v4 = _v3.a;
					var topX = _v4.a;
					var topY = _v4.b;
					return _Utils_Tuple2(
						fromTop,
						_Utils_Tuple2(topX + 1, topY));
				}
			} else {
				if (!_v2.b.b) {
					var _v5 = _v2.a;
					var _v6 = _v5.a;
					var leftX = _v6.a;
					var leftY = _v6.b;
					return _Utils_Tuple2(
						fromLeft,
						_Utils_Tuple2(leftX, leftY + 1));
				} else {
					var _v7 = _v2.a;
					var _v8 = _v7.a;
					var leftX = _v8.a;
					var leftY = _v8.b;
					var _v9 = _v2.b;
					var _v10 = _v9.a;
					var topX = _v10.a;
					var topY = _v10.b;
					return (_Utils_cmp(leftY + 1, topY) > -1) ? _Utils_Tuple2(
						fromLeft,
						_Utils_Tuple2(leftX, leftY + 1)) : _Utils_Tuple2(
						fromTop,
						_Utils_Tuple2(topX + 1, topY));
				}
			}
		}();
		var path = _v0.a;
		var _v1 = _v0.b;
		var x = _v1.a;
		var y = _v1.b;
		var _v11 = A3(
			snake_,
			x + 1,
			y + 1,
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(x, y),
				path));
		var newPath = _v11.a;
		var goal = _v11.b;
		return goal ? $avh4$elm_program_test$Vendored$Diff$Found(newPath) : $avh4$elm_program_test$Vendored$Diff$Continue(
			A3($elm$core$Array$set, k + offset, newPath, v));
	});
var $avh4$elm_program_test$Vendored$Diff$onpLoopK = F4(
	function (snake_, offset, ks, v) {
		onpLoopK:
		while (true) {
			if (!ks.b) {
				return $avh4$elm_program_test$Vendored$Diff$Continue(v);
			} else {
				var k = ks.a;
				var ks_ = ks.b;
				var _v1 = A4($avh4$elm_program_test$Vendored$Diff$step, snake_, offset, k, v);
				if (_v1.$ === 'Found') {
					var path = _v1.a;
					return $avh4$elm_program_test$Vendored$Diff$Found(path);
				} else {
					var v_ = _v1.a;
					var $temp$snake_ = snake_,
						$temp$offset = offset,
						$temp$ks = ks_,
						$temp$v = v_;
					snake_ = $temp$snake_;
					offset = $temp$offset;
					ks = $temp$ks;
					v = $temp$v;
					continue onpLoopK;
				}
			}
		}
	});
var $avh4$elm_program_test$Vendored$Diff$onpLoopP = F5(
	function (snake_, delta, offset, p, v) {
		onpLoopP:
		while (true) {
			var ks = (delta > 0) ? _Utils_ap(
				$elm$core$List$reverse(
					A2($elm$core$List$range, delta + 1, delta + p)),
				A2($elm$core$List$range, -p, delta)) : _Utils_ap(
				$elm$core$List$reverse(
					A2($elm$core$List$range, delta + 1, p)),
				A2($elm$core$List$range, (-p) + delta, delta));
			var _v0 = A4($avh4$elm_program_test$Vendored$Diff$onpLoopK, snake_, offset, ks, v);
			if (_v0.$ === 'Found') {
				var path = _v0.a;
				return path;
			} else {
				var v_ = _v0.a;
				var $temp$snake_ = snake_,
					$temp$delta = delta,
					$temp$offset = offset,
					$temp$p = p + 1,
					$temp$v = v_;
				snake_ = $temp$snake_;
				delta = $temp$delta;
				offset = $temp$offset;
				p = $temp$p;
				v = $temp$v;
				continue onpLoopP;
			}
		}
	});
var $avh4$elm_program_test$Vendored$Diff$snake = F5(
	function (getA, getB, nextX, nextY, path) {
		snake:
		while (true) {
			var _v0 = _Utils_Tuple2(
				getA(nextX),
				getB(nextY));
			_v0$2:
			while (true) {
				if (_v0.a.$ === 'Just') {
					if (_v0.b.$ === 'Just') {
						var a = _v0.a.a;
						var b = _v0.b.a;
						if (_Utils_eq(a, b)) {
							var $temp$getA = getA,
								$temp$getB = getB,
								$temp$nextX = nextX + 1,
								$temp$nextY = nextY + 1,
								$temp$path = A2(
								$elm$core$List$cons,
								_Utils_Tuple2(nextX, nextY),
								path);
							getA = $temp$getA;
							getB = $temp$getB;
							nextX = $temp$nextX;
							nextY = $temp$nextY;
							path = $temp$path;
							continue snake;
						} else {
							return _Utils_Tuple2(path, false);
						}
					} else {
						break _v0$2;
					}
				} else {
					if (_v0.b.$ === 'Nothing') {
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						return _Utils_Tuple2(path, true);
					} else {
						break _v0$2;
					}
				}
			}
			return _Utils_Tuple2(path, false);
		}
	});
var $avh4$elm_program_test$Vendored$Diff$onp = F4(
	function (getA, getB, m, n) {
		var v = A2(
			$elm$core$Array$initialize,
			(m + n) + 1,
			$elm$core$Basics$always(_List_Nil));
		var delta = n - m;
		return A5(
			$avh4$elm_program_test$Vendored$Diff$onpLoopP,
			A2($avh4$elm_program_test$Vendored$Diff$snake, getA, getB),
			delta,
			m,
			0,
			v);
	});
var $avh4$elm_program_test$Vendored$Diff$testDiff = F2(
	function (a, b) {
		var arrB = $elm$core$Array$fromList(b);
		var getB = function (y) {
			return A2($elm$core$Array$get, y - 1, arrB);
		};
		var n = $elm$core$Array$length(arrB);
		var arrA = $elm$core$Array$fromList(a);
		var getA = function (x) {
			return A2($elm$core$Array$get, x - 1, arrA);
		};
		var m = $elm$core$Array$length(arrA);
		var path = A4($avh4$elm_program_test$Vendored$Diff$onp, getA, getB, m, n);
		return A3($avh4$elm_program_test$Vendored$Diff$makeChanges, getA, getB, path);
	});
var $avh4$elm_program_test$Vendored$Diff$diff = F2(
	function (a, b) {
		var _v0 = A2($avh4$elm_program_test$Vendored$Diff$testDiff, a, b);
		if (_v0.$ === 'Ok') {
			var changes = _v0.a;
			return changes;
		} else {
			return _List_Nil;
		}
	});
var $avh4$elm_program_test$Vendored$Highlightable$Highlighted = function (a) {
	return {$: 'Highlighted', a: a};
};
var $avh4$elm_program_test$Vendored$Highlightable$Plain = function (a) {
	return {$: 'Plain', a: a};
};
var $avh4$elm_program_test$Vendored$Highlightable$fromDiff = function (diff) {
	switch (diff.$) {
		case 'Added':
			return _List_Nil;
		case 'Removed':
			var _char = diff.a;
			return _List_fromArray(
				[
					$avh4$elm_program_test$Vendored$Highlightable$Highlighted(_char)
				]);
		default:
			var _char = diff.a;
			return _List_fromArray(
				[
					$avh4$elm_program_test$Vendored$Highlightable$Plain(_char)
				]);
	}
};
var $avh4$elm_program_test$Vendored$Highlightable$diffLists = F2(
	function (expected, actual) {
		return A2(
			$elm$core$List$concatMap,
			$avh4$elm_program_test$Vendored$Highlightable$fromDiff,
			A2($avh4$elm_program_test$Vendored$Diff$diff, expected, actual));
	});
var $avh4$elm_program_test$Vendored$Failure$isFloat = function (str) {
	var _v0 = $elm$core$String$toFloat(str);
	if (_v0.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $avh4$elm_program_test$Vendored$Highlightable$map = F2(
	function (transform, highlightable) {
		if (highlightable.$ === 'Highlighted') {
			var val = highlightable.a;
			return $avh4$elm_program_test$Vendored$Highlightable$Highlighted(
				transform(val));
		} else {
			var val = highlightable.a;
			return $avh4$elm_program_test$Vendored$Highlightable$Plain(
				transform(val));
		}
	});
var $avh4$elm_program_test$Vendored$Highlightable$resolve = F2(
	function (_v0, highlightable) {
		var fromHighlighted = _v0.fromHighlighted;
		var fromPlain = _v0.fromPlain;
		if (highlightable.$ === 'Highlighted') {
			var val = highlightable.a;
			return fromHighlighted(val);
		} else {
			var val = highlightable.a;
			return fromPlain(val);
		}
	});
var $avh4$elm_program_test$Vendored$Failure$highlightEqual = F2(
	function (expected, actual) {
		if ((expected === '\"\"') || (actual === '\"\"')) {
			return $elm$core$Maybe$Nothing;
		} else {
			if ($avh4$elm_program_test$Vendored$Failure$isFloat(expected) && $avh4$elm_program_test$Vendored$Failure$isFloat(actual)) {
				return $elm$core$Maybe$Nothing;
			} else {
				var isHighlighted = $avh4$elm_program_test$Vendored$Highlightable$resolve(
					{
						fromHighlighted: $elm$core$Basics$always(true),
						fromPlain: $elm$core$Basics$always(false)
					});
				var expectedChars = $elm$core$String$toList(expected);
				var edgeCount = function (highlightedString) {
					var highlights = A2($elm$core$List$map, isHighlighted, highlightedString);
					return $elm$core$List$length(
						A2(
							$elm$core$List$filter,
							function (_v0) {
								var lhs = _v0.a;
								var rhs = _v0.b;
								return !_Utils_eq(lhs, rhs);
							},
							A3(
								$elm$core$List$map2,
								$elm$core$Tuple$pair,
								A2($elm$core$List$drop, 1, highlights),
								highlights)));
				};
				var actualChars = $elm$core$String$toList(actual);
				var highlightedActual = A2(
					$elm$core$List$map,
					$avh4$elm_program_test$Vendored$Highlightable$map($elm$core$String$fromChar),
					A2($avh4$elm_program_test$Vendored$Highlightable$diffLists, actualChars, expectedChars));
				var highlightedExpected = A2(
					$elm$core$List$map,
					$avh4$elm_program_test$Vendored$Highlightable$map($elm$core$String$fromChar),
					A2($avh4$elm_program_test$Vendored$Highlightable$diffLists, expectedChars, actualChars));
				var plainCharCount = $elm$core$List$length(
					A2(
						$elm$core$List$filter,
						A2($elm$core$Basics$composeL, $elm$core$Basics$not, isHighlighted),
						highlightedExpected));
				return ((_Utils_cmp(
					edgeCount(highlightedActual),
					plainCharCount) > 0) || (_Utils_cmp(
					edgeCount(highlightedExpected),
					plainCharCount) > 0)) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
					_Utils_Tuple2(highlightedExpected, highlightedActual));
			}
		}
	});
var $avh4$elm_program_test$Vendored$Failure$verticalBar = F3(
	function (comparison, expected, actual) {
		return A2(
			$elm$core$String$join,
			'\n',
			_List_fromArray(
				[actual, '╷', '│ ' + comparison, '╵', expected]));
	});
var $avh4$elm_program_test$Vendored$Failure$listDiffToString = F4(
	function (index, description, _v0, originals) {
		listDiffToString:
		while (true) {
			var expected = _v0.expected;
			var actual = _v0.actual;
			var _v1 = _Utils_Tuple2(expected, actual);
			if (!_v1.a.b) {
				if (!_v1.b.b) {
					return A2(
						$elm$core$String$join,
						'',
						_List_fromArray(
							[
								'Two lists were unequal previously, yet ended up equal later.',
								'This should never happen!',
								'Please report this bug to https://github.com/elm-community/elm-test/issues - and include these lists: ',
								'\n',
								A2($elm$core$String$join, ', ', originals.originalExpected),
								'\n',
								A2($elm$core$String$join, ', ', originals.originalActual)
							]));
				} else {
					var _v3 = _v1.b;
					return A3(
						$avh4$elm_program_test$Vendored$Failure$verticalBar,
						description + ' was longer than',
						A2($elm$core$String$join, ', ', originals.originalExpected),
						A2($elm$core$String$join, ', ', originals.originalActual));
				}
			} else {
				if (!_v1.b.b) {
					var _v2 = _v1.a;
					return A3(
						$avh4$elm_program_test$Vendored$Failure$verticalBar,
						description + ' was shorter than',
						A2($elm$core$String$join, ', ', originals.originalExpected),
						A2($elm$core$String$join, ', ', originals.originalActual));
				} else {
					var _v4 = _v1.a;
					var firstExpected = _v4.a;
					var restExpected = _v4.b;
					var _v5 = _v1.b;
					var firstActual = _v5.a;
					var restActual = _v5.b;
					if (_Utils_eq(firstExpected, firstActual)) {
						var $temp$index = index + 1,
							$temp$description = description,
							$temp$_v0 = {actual: restActual, expected: restExpected},
							$temp$originals = originals;
						index = $temp$index;
						description = $temp$description;
						_v0 = $temp$_v0;
						originals = $temp$originals;
						continue listDiffToString;
					} else {
						return A2(
							$elm$core$String$join,
							'',
							_List_fromArray(
								[
									A3(
									$avh4$elm_program_test$Vendored$Failure$verticalBar,
									description,
									A2($elm$core$String$join, ', ', originals.originalExpected),
									A2($elm$core$String$join, ', ', originals.originalActual)),
									'\n\nThe first diff is at index ',
									$elm$core$String$fromInt(index),
									': it was `',
									firstActual,
									'`, but `',
									firstExpected,
									'` was expected.'
								]));
					}
				}
			}
		}
	});
var $avh4$elm_program_test$Vendored$Failure$format = F3(
	function (formatEquality, description, reason) {
		switch (reason.$) {
			case 'Custom':
				return description;
			case 'Equality':
				var expected = reason.a;
				var actual = reason.b;
				var _v1 = A2($avh4$elm_program_test$Vendored$Failure$highlightEqual, expected, actual);
				if (_v1.$ === 'Nothing') {
					return A3($avh4$elm_program_test$Vendored$Failure$verticalBar, description, expected, actual);
				} else {
					var _v2 = _v1.a;
					var highlightedExpected = _v2.a;
					var highlightedActual = _v2.b;
					var _v3 = A2(formatEquality, highlightedExpected, highlightedActual);
					var formattedExpected = _v3.a;
					var formattedActual = _v3.b;
					return A3($avh4$elm_program_test$Vendored$Failure$verticalBar, description, formattedExpected, formattedActual);
				}
			case 'Comparison':
				var first = reason.a;
				var second = reason.b;
				return A3($avh4$elm_program_test$Vendored$Failure$verticalBar, description, first, second);
			case 'TODO':
				return description;
			case 'Invalid':
				if (reason.a.$ === 'BadDescription') {
					var _v4 = reason.a;
					return (description === '') ? 'The empty string is not a valid test description.' : ('This is an invalid test description: ' + description);
				} else {
					return description;
				}
			case 'ListDiff':
				var expected = reason.a;
				var actual = reason.b;
				return A4(
					$avh4$elm_program_test$Vendored$Failure$listDiffToString,
					0,
					description,
					{actual: actual, expected: expected},
					{originalActual: actual, originalExpected: expected});
			default:
				var expected = reason.a.expected;
				var actual = reason.a.actual;
				var extra = reason.a.extra;
				var missing = reason.a.missing;
				var missingStr = $elm$core$List$isEmpty(missing) ? '' : ('\nThese keys are missing: ' + function (d) {
					return '[ ' + (d + ' ]');
				}(
					A2($elm$core$String$join, ', ', missing)));
				var extraStr = $elm$core$List$isEmpty(extra) ? '' : ('\nThese keys are extra: ' + function (d) {
					return '[ ' + (d + ' ]');
				}(
					A2($elm$core$String$join, ', ', extra)));
				return A2(
					$elm$core$String$join,
					'',
					_List_fromArray(
						[
							A3($avh4$elm_program_test$Vendored$Failure$verticalBar, description, expected, actual),
							'\n',
							extraStr,
							missingStr
						]));
		}
	});
var $avh4$elm_program_test$Vendored$FormatMonochrome$fromHighlightable = function (indicator) {
	return $avh4$elm_program_test$Vendored$Highlightable$resolve(
		{
			fromHighlighted: function (_char) {
				return _Utils_Tuple2(_char, indicator);
			},
			fromPlain: function (_char) {
				return _Utils_Tuple2(_char, ' ');
			}
		});
};
var $avh4$elm_program_test$Vendored$FormatMonochrome$formatEquality = F2(
	function (highlightedExpected, highlightedActual) {
		var _v0 = $elm$core$List$unzip(
			A2(
				$elm$core$List$map,
				$avh4$elm_program_test$Vendored$FormatMonochrome$fromHighlightable('▲'),
				highlightedExpected));
		var formattedExpected = _v0.a;
		var expectedIndicators = _v0.b;
		var combinedExpected = A2(
			$elm$core$String$join,
			'\n',
			_List_fromArray(
				[
					A2($elm$core$String$join, '', formattedExpected),
					A2($elm$core$String$join, '', expectedIndicators)
				]));
		var _v1 = $elm$core$List$unzip(
			A2(
				$elm$core$List$map,
				$avh4$elm_program_test$Vendored$FormatMonochrome$fromHighlightable('▼'),
				highlightedActual));
		var formattedActual = _v1.a;
		var actualIndicators = _v1.b;
		var combinedActual = A2(
			$elm$core$String$join,
			'\n',
			_List_fromArray(
				[
					A2($elm$core$String$join, '', actualIndicators),
					A2($elm$core$String$join, '', formattedActual)
				]));
		return _Utils_Tuple2(combinedExpected, combinedActual);
	});
var $elm_explorations$test$Test$Html$Query$Internal$baseIndentation = '    ';
var $elm_explorations$test$Test$Html$Query$Internal$prefixOutputLine = $elm$core$Basics$append('▼ ');
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$EscapableRawTextElements = {$: 'EscapableRawTextElements'};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NormalElements = {$: 'NormalElements'};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$RawTextElements = {$: 'RawTextElements'};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$VoidElements = {$: 'VoidElements'};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$escapableRawTextElements = _List_fromArray(
	['textarea', 'title']);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$rawTextElements = _List_fromArray(
	['script', 'style']);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$voidElements = _List_fromArray(
	['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$toElementKind = function (element) {
	return A2($elm$core$List$member, element, $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$voidElements) ? $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$VoidElements : (A2($elm$core$List$member, element, $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$rawTextElements) ? $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$RawTextElements : (A2($elm$core$List$member, element, $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$escapableRawTextElements) ? $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$EscapableRawTextElements : $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NormalElements));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeRecordToString = F2(
	function (options, _v1) {
		var tag = _v1.tag;
		var children = _v1.children;
		var facts = _v1.facts;
		var styles = function () {
			var _v7 = $elm$core$Dict$toList(facts.styles);
			if (!_v7.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var styleValues = _v7;
				return $elm$core$Maybe$Just(
					function (styleString) {
						return 'style=\"' + (styleString + '\"');
					}(
						A2(
							$elm$core$String$join,
							'',
							A2(
								$elm$core$List$map,
								function (_v8) {
									var key = _v8.a;
									var value = _v8.b;
									return key + (':' + (value + ';'));
								},
								styleValues))));
			}
		}();
		var stringAttributes = $elm$core$Maybe$Just(
			A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					function (_v6) {
						var k = _v6.a;
						var v = _v6.b;
						return k + ('=\"' + (v + '\"'));
					},
					$elm$core$Dict$toList(
						A2(
							$elm$core$Dict$filter,
							F2(
								function (k, _v5) {
									return k !== 'className';
								}),
							facts.stringAttributes)))));
		var openTag = function (extras) {
			var trimmedExtras = A2(
				$elm$core$List$filter,
				$elm$core$Basics$neq(''),
				A2(
					$elm$core$List$map,
					$elm$core$String$trim,
					A2(
						$elm$core$List$filterMap,
						function (x) {
							return x;
						},
						extras)));
			var filling = function () {
				if (!trimmedExtras.b) {
					return '';
				} else {
					var more = trimmedExtras;
					return ' ' + A2($elm$core$String$join, ' ', more);
				}
			}();
			return '<' + (tag + (filling + '>'));
		};
		var closeTag = '</' + (tag + '>');
		var classes = A2(
			$elm$core$Maybe$map,
			function (name) {
				return 'class=\"' + (name + '\"');
			},
			A2($elm$core$Dict$get, 'className', facts.stringAttributes));
		var childrenStrings = A2(
			$elm$core$List$map,
			$elm$core$Basics$append(
				A2($elm$core$String$repeat, options.indent, ' ')),
			$elm$core$List$concat(
				A2(
					$elm$core$List$map,
					$elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeToLines(options),
					children)));
		var boolAttributes = $elm$core$Maybe$Just(
			A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$filterMap,
					function (_v3) {
						var k = _v3.a;
						var v = _v3.b;
						return v ? $elm$core$Maybe$Just(k) : $elm$core$Maybe$Nothing;
					},
					$elm$core$Dict$toList(facts.boolAttributes))));
		var _v2 = $elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$toElementKind(tag);
		if (_v2.$ === 'VoidElements') {
			return _List_fromArray(
				[
					openTag(
					_List_fromArray(
						[classes, styles, stringAttributes, boolAttributes]))
				]);
		} else {
			return _Utils_ap(
				_List_fromArray(
					[
						openTag(
						_List_fromArray(
							[classes, styles, stringAttributes, boolAttributes]))
					]),
				_Utils_ap(
					childrenStrings,
					_List_fromArray(
						[closeTag])));
		}
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeToLines = F2(
	function (options, nodeType) {
		switch (nodeType.$) {
			case 'TextTag':
				var text = nodeType.a.text;
				return _List_fromArray(
					[text]);
			case 'NodeEntry':
				var record = nodeType.a;
				return A2($elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeRecordToString, options, record);
			case 'CustomNode':
				return _List_Nil;
			default:
				var record = nodeType.a;
				return _List_fromArray(
					[record.model.markdown]);
		}
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeToStringWithOptions = function (options) {
	return A2(
		$elm$core$Basics$composeR,
		$elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeToLines(options),
		$elm$core$String$join(
			options.newLines ? '\n' : ''));
};
var $elm_explorations$test$Test$Html$Query$Internal$prettyPrint = $elm_explorations$test$Test$Html$Internal$ElmHtml$ToString$nodeToStringWithOptions(
	{indent: 4, newLines: true});
var $elm_explorations$test$Test$Html$Internal$Inert$toElmHtml = function (_v0) {
	var elmHtml = _v0.a;
	return elmHtml;
};
var $elm_explorations$test$Test$Html$Query$Internal$toOutputLine = function (query) {
	if (query.$ === 'Query') {
		var node = query.a;
		return $elm_explorations$test$Test$Html$Query$Internal$prettyPrint(
			$elm_explorations$test$Test$Html$Internal$Inert$toElmHtml(node));
	} else {
		var message = query.a;
		return 'Internal Error: failed to decode the virtual dom.  Please report this at <https://github.com/elm-explorations/test/issues>.  ' + message;
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$addQueryFromHtmlLine = function (query) {
	return A2(
		$elm$core$String$join,
		'\n\n',
		_List_fromArray(
			[
				$elm_explorations$test$Test$Html$Query$Internal$prefixOutputLine('Query.fromHtml'),
				A2(
				$elm$core$String$join,
				'\n',
				A2(
					$elm$core$List$map,
					$elm$core$Basics$append($elm_explorations$test$Test$Html$Query$Internal$baseIndentation),
					A2(
						$elm$core$String$split,
						'\n',
						$elm_explorations$test$Test$Html$Query$Internal$toOutputLine(query))))
			]));
};
var $elm_explorations$test$Test$Html$Query$Internal$getChildren = function (elmHtml) {
	if (elmHtml.$ === 'NodeEntry') {
		var children = elmHtml.a.children;
		return children;
	} else {
		return _List_Nil;
	}
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm_explorations$test$Test$Html$Query$Internal$getElementAtHelp = F2(
	function (index, list) {
		getElementAtHelp:
		while (true) {
			if (!list.b) {
				return _List_Nil;
			} else {
				var first = list.a;
				var rest = list.b;
				if (!index) {
					return _List_fromArray(
						[first]);
				} else {
					var $temp$index = index - 1,
						$temp$list = rest;
					index = $temp$index;
					list = $temp$list;
					continue getElementAtHelp;
				}
			}
		}
	});
var $elm_explorations$test$Test$Html$Query$Internal$getElementAt = F2(
	function (index, list) {
		var length = $elm$core$List$length(list);
		return ((!length) || ((_Utils_cmp(index, length) > -1) || ((index < 0) && (_Utils_cmp(
			$elm$core$Basics$abs(index),
			length) > 0)))) ? _List_Nil : A2(
			$elm_explorations$test$Test$Html$Query$Internal$getElementAtHelp,
			A2($elm$core$Basics$modBy, length, index),
			list);
	});
var $elm$core$String$append = _String_append;
var $elm_explorations$test$Test$Html$Query$Internal$printIndented = F3(
	function (maxDigits, index, elmHtml) {
		var caption = A2(
			$elm$core$String$append,
			$elm_explorations$test$Test$Html$Query$Internal$baseIndentation,
			A3(
				$elm$core$String$padRight,
				maxDigits + 3,
				_Utils_chr(' '),
				$elm$core$String$fromInt(index + 1) + ')'));
		var indentation = A2(
			$elm$core$String$repeat,
			$elm$core$String$length(caption),
			' ');
		var _v0 = A2(
			$elm$core$String$split,
			'\n',
			$elm_explorations$test$Test$Html$Query$Internal$prettyPrint(elmHtml));
		if (!_v0.b) {
			return '';
		} else {
			var first = _v0.a;
			var rest = _v0.b;
			return A2(
				$elm$core$String$join,
				'\n',
				A2(
					$elm$core$List$cons,
					_Utils_ap(caption, first),
					A2(
						$elm$core$List$map,
						$elm$core$String$append(indentation),
						rest)));
		}
	});
var $elm_explorations$test$Test$Html$Query$Internal$getHtmlContext = function (elmHtmlList) {
	if ($elm$core$List$isEmpty(elmHtmlList)) {
		return '0 matches found for this query.';
	} else {
		var maxDigits = $elm$core$String$length(
			$elm$core$String$fromInt(
				$elm$core$List$length(elmHtmlList)));
		return A2(
			$elm$core$String$join,
			'\n\n',
			A2(
				$elm$core$List$indexedMap,
				$elm_explorations$test$Test$Html$Query$Internal$printIndented(maxDigits),
				elmHtmlList));
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$joinAsList = F2(
	function (toStr, list) {
		return $elm$core$List$isEmpty(list) ? '[]' : ('[ ' + (A2(
			$elm$core$String$join,
			', ',
			A2($elm$core$List$map, toStr, list)) + ' ]'));
	});
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAttribute = F3(
	function (attribute, queryString, facts) {
		var _v0 = A2($elm$core$Dict$get, attribute, facts.stringAttributes);
		if (_v0.$ === 'Just') {
			var id = _v0.a;
			return _Utils_eq(id, queryString);
		} else {
			return false;
		}
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasBoolAttribute = F3(
	function (attribute, value, facts) {
		var _v0 = A2($elm$core$Dict$get, attribute, facts.boolAttributes);
		if (_v0.$ === 'Just') {
			var id = _v0.a;
			return _Utils_eq(id, value);
		} else {
			return false;
		}
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$classnames = function (facts) {
	return A2(
		$elm$core$String$split,
		' ',
		A2(
			$elm$core$Maybe$withDefault,
			'',
			A2($elm$core$Dict$get, 'className', facts.stringAttributes)));
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClass = F2(
	function (queryString, facts) {
		return A2(
			$elm$core$List$member,
			queryString,
			$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$classnames(facts));
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$containsAll = F2(
	function (a, b) {
		return $elm$core$List$isEmpty(
			A3(
				$elm$core$List$foldl,
				F2(
					function (i, acc) {
						return A2(
							$elm$core$List$filter,
							$elm$core$Basics$neq(i),
							acc);
					}),
				a,
				b));
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClasses = F2(
	function (classList, facts) {
		return A2(
			$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$containsAll,
			classList,
			$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$classnames(facts));
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasStyle = F2(
	function (style, facts) {
		return _Utils_eq(
			A2($elm$core$Dict$get, style.key, facts.styles),
			$elm$core$Maybe$Just(style.value));
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAllSelectors = F2(
	function (selectors, record) {
		return A2(
			$elm$core$List$all,
			$elm$core$Basics$identity,
			A2(
				$elm$core$List$map,
				function (selector) {
					return selector(record);
				},
				A2($elm$core$List$map, $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$predicateFromSelector, selectors)));
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$markdownPredicate = function (selector) {
	switch (selector.$) {
		case 'Id':
			var id = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAttribute, 'id', id));
		case 'ClassName':
			var classname = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClass(classname));
		case 'ClassList':
			var classList = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClasses(classList));
		case 'Tag':
			return $elm$core$Basics$always(false);
		case 'Attribute':
			var key = selector.a;
			var value = selector.b;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAttribute, key, value));
		case 'BoolAttribute':
			var key = selector.a;
			var value = selector.b;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasBoolAttribute, key, value));
		case 'Style':
			var style = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasStyle(style));
		case 'ContainsText':
			var text = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.model;
				},
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.markdown;
					},
					$elm$core$String$contains(text)));
		case 'ContainsExactText':
			var text = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.model;
				},
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.markdown;
					},
					$elm$core$Basics$eq(text)));
		default:
			var selectors = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$MarkdownNode,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAllSelectors(selectors));
	}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$nodeRecordPredicate = function (selector) {
	switch (selector.$) {
		case 'Id':
			var id = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAttribute, 'id', id));
		case 'ClassName':
			var classname = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClass(classname));
		case 'ClassList':
			var classList = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasClasses(classList));
		case 'Tag':
			var tag = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.tag;
				},
				$elm$core$Basics$eq(tag));
		case 'Attribute':
			var key = selector.a;
			var value = selector.b;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAttribute, key, value));
		case 'BoolAttribute':
			var key = selector.a;
			var value = selector.b;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasBoolAttribute, key, value));
		case 'Style':
			var style = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.facts;
				},
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasStyle(style));
		case 'ContainsText':
			return $elm$core$Basics$always(false);
		case 'ContainsExactText':
			return $elm$core$Basics$always(false);
		default:
			var selectors = selector.a;
			return A2(
				$elm$core$Basics$composeR,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$InternalTypes$NodeEntry,
				$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$hasAllSelectors(selectors));
	}
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$predicateFromSelector = F2(
	function (selector, html) {
		switch (html.$) {
			case 'NodeEntry':
				var record = html.a;
				return A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$nodeRecordPredicate, selector, record);
			case 'MarkdownNode':
				var markdownModel = html.a;
				return A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$markdownPredicate, selector, markdownModel);
			default:
				return false;
		}
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$descendInQuery = F3(
	function (maxDescendantDepth, selector, children) {
		if (maxDescendantDepth.$ === 'Nothing') {
			return A2(
				$elm$core$List$concatMap,
				A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNodeHelp, $elm$core$Maybe$Nothing, selector),
				children);
		} else {
			var depth = maxDescendantDepth.a;
			return (depth > 0) ? A2(
				$elm$core$List$concatMap,
				A2(
					$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNodeHelp,
					$elm$core$Maybe$Just(depth - 1),
					selector),
				children) : _List_Nil;
		}
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNodeHelp = F3(
	function (maxDescendantDepth, selector, node) {
		switch (node.$) {
			case 'NodeEntry':
				var record = node.a;
				var childEntries = A3($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$descendInQuery, maxDescendantDepth, selector, record.children);
				return A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$predicateFromSelector, selector, node) ? A2($elm$core$List$cons, node, childEntries) : childEntries;
			case 'TextTag':
				var text = node.a.text;
				switch (selector.$) {
					case 'ContainsText':
						var innerText = selector.a;
						return A2($elm$core$String$contains, innerText, text) ? _List_fromArray(
							[node]) : _List_Nil;
					case 'ContainsExactText':
						var innerText = selector.a;
						return _Utils_eq(innerText, text) ? _List_fromArray(
							[node]) : _List_Nil;
					default:
						return _List_Nil;
				}
			case 'MarkdownNode':
				return A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$predicateFromSelector, selector, node) ? _List_fromArray(
					[node]) : _List_Nil;
			default:
				return _List_Nil;
		}
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNode = $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNodeHelp($elm$core$Maybe$Nothing);
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$query = function (selector) {
	return $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNode(selector);
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$Attribute = F2(
	function (a, b) {
		return {$: 'Attribute', a: a, b: b};
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$BoolAttribute = F2(
	function (a, b) {
		return {$: 'BoolAttribute', a: a, b: b};
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$ClassList = function (a) {
	return {$: 'ClassList', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$ContainsExactText = function (a) {
	return {$: 'ContainsExactText', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$ContainsText = function (a) {
	return {$: 'ContainsText', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$Style = function (a) {
	return {$: 'Style', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$Tag = function (a) {
	return {$: 'Tag', a: a};
};
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$getChildren = function (elmHtml) {
	if (elmHtml.$ === 'NodeEntry') {
		var children = elmHtml.a.children;
		return children;
	} else {
		return _List_Nil;
	}
};
var $elm_explorations$test$Test$Html$Selector$Internal$query = F4(
	function (fn, fnAll, selector, list) {
		if (!list.b) {
			return list;
		} else {
			var elems = list;
			switch (selector.$) {
				case 'All':
					var selectors = selector.a;
					return A2(fnAll, selectors, elems);
				case 'Classes':
					var classes = selector.a;
					return A2(
						$elm$core$List$concatMap,
						fn(
							$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$ClassList(classes)),
						elems);
				case 'Class':
					var _class = selector.a;
					return A2(
						$elm$core$List$concatMap,
						fn(
							$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$ClassList(
								_List_fromArray(
									[_class]))),
						elems);
				case 'Attribute':
					var name = selector.a.name;
					var value = selector.a.value;
					return A2(
						$elm$core$List$concatMap,
						fn(
							A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$Attribute, name, value)),
						elems);
				case 'BoolAttribute':
					var name = selector.a.name;
					var value = selector.a.value;
					return A2(
						$elm$core$List$concatMap,
						fn(
							A2($elm_explorations$test$Test$Html$Internal$ElmHtml$Query$BoolAttribute, name, value)),
						elems);
				case 'Style':
					var style = selector.a;
					return A2(
						$elm$core$List$concatMap,
						fn(
							$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$Style(style)),
						elems);
				case 'Tag':
					var name = selector.a;
					return A2(
						$elm$core$List$concatMap,
						fn(
							$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$Tag(name)),
						elems);
				case 'Text':
					var text = selector.a;
					return A2(
						$elm$core$List$concatMap,
						fn(
							$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$ContainsText(text)),
						elems);
				case 'ExactText':
					var text = selector.a;
					return A2(
						$elm$core$List$concatMap,
						fn(
							$elm_explorations$test$Test$Html$Internal$ElmHtml$Query$ContainsExactText(text)),
						elems);
				case 'Containing':
					var selectors = selector.a;
					var anyDescendantsMatch = function (elem) {
						var _v2 = $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$getChildren(elem);
						if (!_v2.b) {
							return false;
						} else {
							var children = _v2;
							var _v3 = A4(
								$elm_explorations$test$Test$Html$Selector$Internal$query,
								fn,
								fnAll,
								$elm_explorations$test$Test$Html$Selector$Internal$All(selectors),
								children);
							if (!_v3.b) {
								return A2($elm$core$List$any, anyDescendantsMatch, children);
							} else {
								return true;
							}
						}
					};
					return A2($elm$core$List$filter, anyDescendantsMatch, elems);
				default:
					return _List_Nil;
			}
		}
	});
var $elm_explorations$test$Test$Html$Selector$Internal$queryAll = F2(
	function (selectors, list) {
		if (!selectors.b) {
			return list;
		} else {
			var selector = selectors.a;
			var rest = selectors.b;
			return A2(
				$elm_explorations$test$Test$Html$Selector$Internal$queryAll,
				rest,
				A4($elm_explorations$test$Test$Html$Selector$Internal$query, $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$query, $elm_explorations$test$Test$Html$Selector$Internal$queryAll, selector, list));
		}
	});
var $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryChildren = $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryInNodeHelp(
	$elm$core$Maybe$Just(1));
var $elm_explorations$test$Test$Html$Selector$Internal$queryAllChildren = F2(
	function (selectors, list) {
		if (!selectors.b) {
			return list;
		} else {
			var selector = selectors.a;
			var rest = selectors.b;
			return A2(
				$elm_explorations$test$Test$Html$Selector$Internal$queryAllChildren,
				rest,
				A4($elm_explorations$test$Test$Html$Selector$Internal$query, $elm_explorations$test$Test$Html$Internal$ElmHtml$Query$queryChildren, $elm_explorations$test$Test$Html$Selector$Internal$queryAllChildren, selector, list));
		}
	});
var $elm_explorations$test$Test$Html$Selector$Internal$styleToString = function (_v0) {
	var key = _v0.key;
	var value = _v0.value;
	return key + (':' + value);
};
var $elm_explorations$test$Test$Html$Selector$Internal$selectorToString = function (criteria) {
	var quoteString = function (s) {
		return '\"' + (s + '\"');
	};
	var boolToString = function (b) {
		if (b) {
			return 'True';
		} else {
			return 'False';
		}
	};
	switch (criteria.$) {
		case 'All':
			var list = criteria.a;
			return A2(
				$elm$core$String$join,
				' ',
				A2($elm$core$List$map, $elm_explorations$test$Test$Html$Selector$Internal$selectorToString, list));
		case 'Classes':
			var list = criteria.a;
			return 'classes ' + quoteString(
				A2($elm$core$String$join, ' ', list));
		case 'Class':
			var _class = criteria.a;
			return 'class ' + quoteString(_class);
		case 'Attribute':
			var name = criteria.a.name;
			var value = criteria.a.value;
			return 'attribute ' + (quoteString(name) + (' ' + quoteString(value)));
		case 'BoolAttribute':
			var name = criteria.a.name;
			var value = criteria.a.value;
			return 'attribute ' + (quoteString(name) + (' ' + boolToString(value)));
		case 'Style':
			var style = criteria.a;
			return 'styles ' + $elm_explorations$test$Test$Html$Selector$Internal$styleToString(style);
		case 'Tag':
			var name = criteria.a;
			return 'tag ' + quoteString(name);
		case 'Text':
			var text = criteria.a;
			return 'text ' + quoteString(text);
		case 'ExactText':
			var text = criteria.a;
			return 'exact text ' + quoteString(text);
		case 'Containing':
			var list = criteria.a;
			var selectors = A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $elm_explorations$test$Test$Html$Selector$Internal$selectorToString, list));
			return 'containing [ ' + (selectors + ' ] ');
		default:
			return 'invalid';
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$withHtmlContext = F2(
	function (htmlStr, str) {
		return A2(
			$elm$core$String$join,
			'\n\n',
			_List_fromArray(
				[str, htmlStr]));
	});
var $elm_explorations$test$Test$Html$Query$Internal$toLinesHelp = F5(
	function (expectationFailure, elmHtmlList, selectorQueries, queryName, results) {
		var recurse = F3(
			function (newElmHtmlList, rest, result) {
				return A5(
					$elm_explorations$test$Test$Html$Query$Internal$toLinesHelp,
					expectationFailure,
					newElmHtmlList,
					rest,
					queryName,
					A2($elm$core$List$cons, result, results));
			});
		var bailOut = function (result) {
			return A2(
				$elm$core$List$cons,
				A2(
					$elm$core$String$join,
					'\n\n\n✗ ',
					_List_fromArray(
						[result, expectationFailure])),
				results);
		};
		if (!selectorQueries.b) {
			return A2(
				$elm$core$List$cons,
				A2(
					$elm$core$String$join,
					'\n\n',
					_List_fromArray(
						[queryName, expectationFailure])),
				results);
		} else {
			var selectorQuery = selectorQueries.a;
			var rest = selectorQueries.b;
			switch (selectorQuery.$) {
				case 'FindAll':
					var selectors = selectorQuery.a;
					var elements = A2(
						$elm_explorations$test$Test$Html$Selector$Internal$queryAll,
						selectors,
						A2($elm$core$List$concatMap, $elm_explorations$test$Test$Html$Query$Internal$getChildren, elmHtmlList));
					return A3(
						recurse,
						elements,
						rest,
						A2(
							$elm_explorations$test$Test$Html$Query$Internal$withHtmlContext,
							$elm_explorations$test$Test$Html$Query$Internal$getHtmlContext(elements),
							'Query.findAll ' + A2($elm_explorations$test$Test$Html$Query$Internal$joinAsList, $elm_explorations$test$Test$Html$Selector$Internal$selectorToString, selectors)));
				case 'Find':
					var selectors = selectorQuery.a;
					var elements = A2(
						$elm_explorations$test$Test$Html$Selector$Internal$queryAll,
						selectors,
						A2($elm$core$List$concatMap, $elm_explorations$test$Test$Html$Query$Internal$getChildren, elmHtmlList));
					var result = A2(
						$elm_explorations$test$Test$Html$Query$Internal$withHtmlContext,
						$elm_explorations$test$Test$Html$Query$Internal$getHtmlContext(elements),
						'Query.find ' + A2($elm_explorations$test$Test$Html$Query$Internal$joinAsList, $elm_explorations$test$Test$Html$Selector$Internal$selectorToString, selectors));
					return ($elm$core$List$length(elements) === 1) ? A3(recurse, elements, rest, result) : bailOut(result);
				case 'Children':
					var selectors = selectorQuery.a;
					var elements = A2(
						$elm_explorations$test$Test$Html$Selector$Internal$queryAllChildren,
						selectors,
						A2($elm$core$List$concatMap, $elm_explorations$test$Test$Html$Query$Internal$getChildren, elmHtmlList));
					return A3(
						recurse,
						elements,
						rest,
						A2(
							$elm_explorations$test$Test$Html$Query$Internal$withHtmlContext,
							$elm_explorations$test$Test$Html$Query$Internal$getHtmlContext(elements),
							'Query.children ' + A2($elm_explorations$test$Test$Html$Query$Internal$joinAsList, $elm_explorations$test$Test$Html$Selector$Internal$selectorToString, selectors)));
				case 'First':
					var elements = A2(
						$elm$core$Maybe$withDefault,
						_List_Nil,
						A2(
							$elm$core$Maybe$map,
							function (elem) {
								return _List_fromArray(
									[elem]);
							},
							$elm$core$List$head(elmHtmlList)));
					var result = A2(
						$elm_explorations$test$Test$Html$Query$Internal$withHtmlContext,
						$elm_explorations$test$Test$Html$Query$Internal$getHtmlContext(elements),
						'Query.first');
					return ($elm$core$List$length(elements) === 1) ? A3(recurse, elements, rest, result) : bailOut(result);
				default:
					var index = selectorQuery.a;
					var elements = A2($elm_explorations$test$Test$Html$Query$Internal$getElementAt, index, elmHtmlList);
					var result = A2(
						$elm_explorations$test$Test$Html$Query$Internal$withHtmlContext,
						$elm_explorations$test$Test$Html$Query$Internal$getHtmlContext(elements),
						'Query.index ' + $elm$core$String$fromInt(index));
					return ($elm$core$List$length(elements) === 1) ? A3(recurse, elements, rest, result) : bailOut(result);
			}
		}
	});
var $elm_explorations$test$Test$Html$Query$Internal$toLines = F3(
	function (expectationFailure, query, queryName) {
		if (query.$ === 'Query') {
			var node = query.a;
			var selectors = query.b;
			return $elm$core$List$reverse(
				A5(
					$elm_explorations$test$Test$Html$Query$Internal$toLinesHelp,
					expectationFailure,
					_List_fromArray(
						[
							$elm_explorations$test$Test$Html$Internal$Inert$toElmHtml(node)
						]),
					$elm$core$List$reverse(selectors),
					queryName,
					_List_Nil));
		} else {
			var message = query.a;
			return _List_fromArray(
				['Internal Error: failed to decode the virtual dom.  Please report this at <https://github.com/elm-explorations/test/issues>', message]);
		}
	});
var $elm_explorations$test$Test$Html$Query$Internal$failWithQuery = F4(
	function (showTrace, queryName, query, expectation) {
		var _v0 = $elm_explorations$test$Test$Runner$getFailureReason(expectation);
		if (_v0.$ === 'Just') {
			var description = _v0.a.description;
			var lines = A2(
				$elm$core$List$map,
				$elm_explorations$test$Test$Html$Query$Internal$prefixOutputLine,
				A3($elm_explorations$test$Test$Html$Query$Internal$toLines, description, query, queryName));
			var tracedLines = showTrace ? A2(
				$elm$core$List$cons,
				$elm_explorations$test$Test$Html$Query$Internal$addQueryFromHtmlLine(query),
				lines) : lines;
			return $elm_explorations$test$Expect$fail(
				A2($elm$core$String$join, '\n\n\n', tracedLines));
		} else {
			return expectation;
		}
	});
var $elm_explorations$test$Test$Html$Selector$Internal$hasAll = F2(
	function (selectors, elems) {
		hasAll:
		while (true) {
			if (!selectors.b) {
				return true;
			} else {
				var selector = selectors.a;
				var rest = selectors.b;
				if ($elm$core$List$isEmpty(
					A2(
						$elm_explorations$test$Test$Html$Selector$Internal$queryAll,
						_List_fromArray(
							[selector]),
						elems))) {
					return false;
				} else {
					var $temp$selectors = rest,
						$temp$elems = elems;
					selectors = $temp$selectors;
					elems = $temp$elems;
					continue hasAll;
				}
			}
		}
	});
var $elm_explorations$test$Test$Html$Query$Internal$queryErrorToString = function (error) {
	switch (error.$) {
		case 'NoResultsForSingle':
			var queryName = error.a;
			return queryName + ' always expects to find 1 element, but it found 0 instead.';
		case 'MultipleResultsForSingle':
			var queryName = error.a;
			var resultCount = error.b;
			return queryName + (' always expects to find 1 element, but it found ' + ($elm$core$String$fromInt(resultCount) + (' instead.\n\n\nHINT: If you actually expected ' + ($elm$core$String$fromInt(resultCount) + ' elements, use Query.findAll instead of Query.find.'))));
		default:
			var message = error.a;
			return 'Internal Error: failed to decode the virtual dom.  Please report this at <https://github.com/elm-explorations/test/issues>.  ' + message;
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$showSelectorOutcome = F2(
	function (elmHtmlList, selector) {
		var outcome = function () {
			var _v0 = A2(
				$elm_explorations$test$Test$Html$Selector$Internal$queryAll,
				_List_fromArray(
					[selector]),
				elmHtmlList);
			if (!_v0.b) {
				return '✗';
			} else {
				return '✓';
			}
		}();
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					outcome,
					'has',
					$elm_explorations$test$Test$Html$Selector$Internal$selectorToString(selector)
				]));
	});
var $elm_explorations$test$Test$Html$Query$Internal$OtherInternalError = function (a) {
	return {$: 'OtherInternalError', a: a};
};
var $elm_explorations$test$Test$Html$Query$Internal$NoResultsForSingle = function (a) {
	return {$: 'NoResultsForSingle', a: a};
};
var $elm_explorations$test$Test$Html$Query$Internal$MultipleResultsForSingle = F2(
	function (a, b) {
		return {$: 'MultipleResultsForSingle', a: a, b: b};
	});
var $elm_explorations$test$Test$Html$Query$Internal$verifySingle = F2(
	function (queryName, list) {
		if (!list.b) {
			return $elm$core$Result$Err(
				$elm_explorations$test$Test$Html$Query$Internal$NoResultsForSingle(queryName));
		} else {
			if (!list.b.b) {
				var singleton = list.a;
				return $elm$core$Result$Ok(singleton);
			} else {
				var multiples = list;
				return $elm$core$Result$Err(
					A2(
						$elm_explorations$test$Test$Html$Query$Internal$MultipleResultsForSingle,
						queryName,
						$elm$core$List$length(multiples)));
			}
		}
	});
var $elm_explorations$test$Test$Html$Query$Internal$traverseSelector = F2(
	function (selectorQuery, elmHtmlList) {
		switch (selectorQuery.$) {
			case 'Find':
				var selectors = selectorQuery.a;
				return A2(
					$elm$core$Result$map,
					function (elem) {
						return _List_fromArray(
							[elem]);
					},
					A2(
						$elm_explorations$test$Test$Html$Query$Internal$verifySingle,
						'Query.find',
						A2(
							$elm_explorations$test$Test$Html$Selector$Internal$queryAll,
							selectors,
							A2($elm$core$List$concatMap, $elm_explorations$test$Test$Html$Query$Internal$getChildren, elmHtmlList))));
			case 'FindAll':
				var selectors = selectorQuery.a;
				return $elm$core$Result$Ok(
					A2(
						$elm_explorations$test$Test$Html$Selector$Internal$queryAll,
						selectors,
						A2($elm$core$List$concatMap, $elm_explorations$test$Test$Html$Query$Internal$getChildren, elmHtmlList)));
			case 'Children':
				var selectors = selectorQuery.a;
				return $elm$core$Result$Ok(
					A2(
						$elm_explorations$test$Test$Html$Selector$Internal$queryAllChildren,
						selectors,
						A2($elm$core$List$concatMap, $elm_explorations$test$Test$Html$Query$Internal$getChildren, elmHtmlList)));
			case 'First':
				return A2(
					$elm$core$Maybe$withDefault,
					$elm$core$Result$Err(
						$elm_explorations$test$Test$Html$Query$Internal$NoResultsForSingle('Query.first')),
					A2(
						$elm$core$Maybe$map,
						function (elem) {
							return $elm$core$Result$Ok(
								_List_fromArray(
									[elem]));
						},
						$elm$core$List$head(elmHtmlList)));
			default:
				var index = selectorQuery.a;
				var elements = A2($elm_explorations$test$Test$Html$Query$Internal$getElementAt, index, elmHtmlList);
				return ($elm$core$List$length(elements) === 1) ? $elm$core$Result$Ok(elements) : $elm$core$Result$Err(
					$elm_explorations$test$Test$Html$Query$Internal$NoResultsForSingle(
						'Query.index ' + $elm$core$String$fromInt(index)));
		}
	});
var $elm_explorations$test$Test$Html$Query$Internal$traverseSelectors = F2(
	function (selectorQueries, elmHtmlList) {
		return A3(
			$elm$core$List$foldr,
			A2($elm$core$Basics$composeR, $elm_explorations$test$Test$Html$Query$Internal$traverseSelector, $elm$core$Result$andThen),
			$elm$core$Result$Ok(elmHtmlList),
			selectorQueries);
	});
var $elm_explorations$test$Test$Html$Query$Internal$traverse = function (query) {
	if (query.$ === 'Query') {
		var node = query.a;
		var selectorQueries = query.b;
		return A2(
			$elm_explorations$test$Test$Html$Query$Internal$traverseSelectors,
			selectorQueries,
			_List_fromArray(
				[
					$elm_explorations$test$Test$Html$Internal$Inert$toElmHtml(node)
				]));
	} else {
		var message = query.a;
		return $elm$core$Result$Err(
			$elm_explorations$test$Test$Html$Query$Internal$OtherInternalError(message));
	}
};
var $elm_explorations$test$Test$Html$Query$Internal$has = F2(
	function (selectors, query) {
		var _v0 = $elm_explorations$test$Test$Html$Query$Internal$traverse(query);
		if (_v0.$ === 'Ok') {
			var elmHtmlList = _v0.a;
			return A2($elm_explorations$test$Test$Html$Selector$Internal$hasAll, selectors, elmHtmlList) ? $elm_explorations$test$Expect$pass : $elm_explorations$test$Expect$fail(
				A2(
					$elm$core$String$join,
					'\n',
					A2(
						$elm$core$List$map,
						$elm_explorations$test$Test$Html$Query$Internal$showSelectorOutcome(elmHtmlList),
						selectors)));
		} else {
			var error = _v0.a;
			return $elm_explorations$test$Expect$fail(
				$elm_explorations$test$Test$Html$Query$Internal$queryErrorToString(error));
		}
	});
var $elm_explorations$test$Test$Html$Query$has = F2(
	function (selectors, _v0) {
		var showTrace = _v0.a;
		var query = _v0.b;
		return A4(
			$elm_explorations$test$Test$Html$Query$Internal$failWithQuery,
			showTrace,
			'Query.has ' + A2($elm_explorations$test$Test$Html$Query$Internal$joinAsList, $elm_explorations$test$Test$Html$Selector$Internal$selectorToString, selectors),
			query,
			A2($elm_explorations$test$Test$Html$Query$Internal$has, selectors, query));
	});
var $avh4$elm_program_test$ProgramTest$TestHtmlHacks$forceFailureReport_ = F4(
	function (parseFailure, selectors, unique, single) {
		forceFailureReport_:
		while (true) {
			var _v0 = $elm_explorations$test$Test$Runner$getFailureReason(
				A2(
					$elm_explorations$test$Test$Html$Query$has,
					_Utils_ap(
						selectors,
						_List_fromArray(
							[
								$elm_explorations$test$Test$Html$Selector$text(unique)
							])),
					single));
			if (_v0.$ === 'Nothing') {
				var $temp$parseFailure = parseFailure,
					$temp$selectors = selectors,
					$temp$unique = unique + '_',
					$temp$single = single;
				parseFailure = $temp$parseFailure;
				selectors = $temp$selectors;
				unique = $temp$unique;
				single = $temp$single;
				continue forceFailureReport_;
			} else {
				var reason = _v0.a;
				return parseFailure(reason.description);
			}
		}
	});
var $avh4$elm_program_test$Parser$Extra$deadEndToRowColString = function (deadEnd) {
	return 'row ' + ($elm$core$String$fromInt(deadEnd.row) + (', ' + ('col ' + $elm$core$String$fromInt(deadEnd.col))));
};
var $avh4$elm_program_test$Parser$Extra$problemToString = function (prob) {
	switch (prob.$) {
		case 'Expecting':
			var s = prob.a;
			return 'Expecting ' + s;
		case 'ExpectingInt':
			return 'Expecting Int';
		case 'ExpectingHex':
			return 'Expecting Hex';
		case 'ExpectingOctal':
			return 'Expecting Octal';
		case 'ExpectingBinary':
			return 'Expecting Binary';
		case 'ExpectingFloat':
			return 'Expecting Float';
		case 'ExpectingNumber':
			return 'Expecting Number';
		case 'ExpectingVariable':
			return 'Expecting Variable';
		case 'ExpectingSymbol':
			var s = prob.a;
			return 'Expecting Symbol ' + s;
		case 'ExpectingKeyword':
			var s = prob.a;
			return 'Expecting Keyword ' + s;
		case 'ExpectingEnd':
			return 'Expecting End';
		case 'UnexpectedChar':
			return 'Unexpected Char';
		case 'Problem':
			var s = prob.a;
			return 'Problem: ' + s;
		default:
			return 'Bad Repeat';
	}
};
var $avh4$elm_program_test$Parser$Extra$deadEndToString = function (deadEnd) {
	return $avh4$elm_program_test$Parser$Extra$problemToString(deadEnd.problem) + (' at ' + $avh4$elm_program_test$Parser$Extra$deadEndToRowColString(deadEnd));
};
var $avh4$elm_program_test$Parser$Extra$deadEndsToString = function (deadEnds) {
	return A2(
		$elm$core$String$join,
		'\n',
		A2($elm$core$List$map, $avh4$elm_program_test$Parser$Extra$deadEndToString, deadEnds));
};
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$EventFailure = F2(
	function (a, b) {
		return {$: 'EventFailure', a: a, b: b};
	});
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$QueryFailure = F3(
	function (a, b, c) {
		return {$: 'QueryFailure', a: a, b: b, c: c};
	});
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$Has = F2(
	function (a, b) {
		return {$: 'Has', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 'ExpectingKeyword', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$keyword = function (_v0) {
	var kwd = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(kwd);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, kwd, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return (_Utils_eq(newOffset, -1) || (0 <= A3(
				$elm$parser$Parser$Advanced$isSubChar,
				function (c) {
					return $elm$core$Char$isAlphaNum(c) || _Utils_eq(
						c,
						_Utils_chr('_'));
				},
				newOffset,
				s.src))) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$keyword = function (kwd) {
	return $elm$parser$Parser$Advanced$keyword(
		A2(
			$elm$parser$Parser$Advanced$Token,
			kwd,
			$elm$parser$Parser$ExpectingKeyword(kwd)));
};
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0.a;
			var _v1 = parse(s0);
			if (_v1.$ === 'Good') {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $elm$parser$Parser$Advanced$chompUntilEndOr = function (str) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v0 = A5(_Parser_findSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v0.a;
			var newRow = _v0.b;
			var newCol = _v0.c;
			var adjustedOffset = (newOffset < 0) ? $elm$core$String$length(s.src) : newOffset;
			return A3(
				$elm$parser$Parser$Advanced$Good,
				_Utils_cmp(s.offset, adjustedOffset) < 0,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: adjustedOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$chompUntilEndOr = $elm$parser$Parser$Advanced$chompUntilEndOr;
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$parser$Parser$Advanced$commit = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, true, a, s);
		});
};
var $elm$parser$Parser$commit = $elm$parser$Parser$Advanced$commit;
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$selectorResultParser = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A2($elm$core$Basics$composeL, $elm$core$Result$Ok, $elm$core$String$trim)),
					$elm$parser$Parser$symbol('✓ ')),
				$elm$parser$Parser$commit(_Utils_Tuple0)),
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$getChompedString(
					$elm$parser$Parser$chompUntilEndOr('\n')),
				$elm$parser$Parser$chompWhile(
					$elm$core$Basics$eq(
						_Utils_chr('\n'))))),
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A2($elm$core$Basics$composeL, $elm$core$Result$Err, $elm$core$String$trim)),
					$elm$parser$Parser$symbol('✗ ')),
				$elm$parser$Parser$commit(_Utils_Tuple0)),
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$getChompedString(
					$elm$parser$Parser$chompUntilEndOr('\n')),
				$elm$parser$Parser$chompWhile(
					$elm$core$Basics$eq(
						_Utils_chr('\n')))))
		]));
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$selectorResultsParser = function () {
	var help = function (acc) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed(
						function (stmt) {
							return $elm$parser$Parser$Loop(
								A2($elm$core$List$cons, stmt, acc));
						}),
					$avh4$elm_program_test$ProgramTest$TestHtmlParser$selectorResultParser),
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						return $elm$parser$Parser$Done(
							$elm$core$List$reverse(acc));
					},
					$elm$parser$Parser$succeed(_Utils_Tuple0))
				]));
	};
	return A2($elm$parser$Parser$loop, _List_Nil, help);
}();
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$All = function (a) {
	return {$: 'All', a: a};
};
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$Attribute = F2(
	function (a, b) {
		return {$: 'Attribute', a: a, b: b};
	});
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$Containing = function (a) {
	return {$: 'Containing', a: a};
};
var $elm$parser$Parser$Forbidden = {$: 'Forbidden'};
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$Tag = function (a) {
	return {$: 'Tag', a: a};
};
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$Text = function (a) {
	return {$: 'Text', a: a};
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$Advanced$backtrackable = function (_v0) {
	var parse = _v0.a;
	return $elm$parser$Parser$Advanced$Parser(
		function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 'Bad') {
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, false, x);
			} else {
				var a = _v1.b;
				var s1 = _v1.c;
				return A3($elm$parser$Parser$Advanced$Good, false, a, s1);
			}
		});
};
var $elm$parser$Parser$backtrackable = $elm$parser$Parser$Advanced$backtrackable;
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v0 = thunk(_Utils_Tuple0);
			var parse = _v0.a;
			return parse(s);
		});
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $elm$parser$Parser$Advanced$revAlways = F2(
	function (_v0, b) {
		return b;
	});
var $elm$parser$Parser$Advanced$skip = F2(
	function (iParser, kParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$parser$Parser$Advanced$revAlways, iParser, kParser);
	});
var $elm$parser$Parser$Advanced$sequenceEndForbidden = F5(
	function (ender, ws, parseItem, sep, revItems) {
		var chompRest = function (item) {
			return A5(
				$elm$parser$Parser$Advanced$sequenceEndForbidden,
				ender,
				ws,
				parseItem,
				sep,
				A2($elm$core$List$cons, item, revItems));
		};
		return A2(
			$elm$parser$Parser$Advanced$skip,
			ws,
			$elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$Advanced$skip,
						sep,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							A2(
								$elm$parser$Parser$Advanced$map,
								function (item) {
									return $elm$parser$Parser$Advanced$Loop(
										A2($elm$core$List$cons, item, revItems));
								},
								parseItem))),
						A2(
						$elm$parser$Parser$Advanced$map,
						function (_v0) {
							return $elm$parser$Parser$Advanced$Done(
								$elm$core$List$reverse(revItems));
						},
						ender)
					])));
	});
var $elm$parser$Parser$Advanced$sequenceEndMandatory = F4(
	function (ws, parseItem, sep, revItems) {
		return $elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$Advanced$map,
					function (item) {
						return $elm$parser$Parser$Advanced$Loop(
							A2($elm$core$List$cons, item, revItems));
					},
					A2(
						$elm$parser$Parser$Advanced$ignorer,
						parseItem,
						A2(
							$elm$parser$Parser$Advanced$ignorer,
							ws,
							A2($elm$parser$Parser$Advanced$ignorer, sep, ws)))),
					A2(
					$elm$parser$Parser$Advanced$map,
					function (_v0) {
						return $elm$parser$Parser$Advanced$Done(
							$elm$core$List$reverse(revItems));
					},
					$elm$parser$Parser$Advanced$succeed(_Utils_Tuple0))
				]));
	});
var $elm$parser$Parser$Advanced$sequenceEndOptional = F5(
	function (ender, ws, parseItem, sep, revItems) {
		var parseEnd = A2(
			$elm$parser$Parser$Advanced$map,
			function (_v0) {
				return $elm$parser$Parser$Advanced$Done(
					$elm$core$List$reverse(revItems));
			},
			ender);
		return A2(
			$elm$parser$Parser$Advanced$skip,
			ws,
			$elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$Advanced$skip,
						sep,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							$elm$parser$Parser$Advanced$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$Advanced$map,
										function (item) {
											return $elm$parser$Parser$Advanced$Loop(
												A2($elm$core$List$cons, item, revItems));
										},
										parseItem),
										parseEnd
									])))),
						parseEnd
					])));
	});
var $elm$parser$Parser$Advanced$sequenceEnd = F5(
	function (ender, ws, parseItem, sep, trailing) {
		var chompRest = function (item) {
			switch (trailing.$) {
				case 'Forbidden':
					return A2(
						$elm$parser$Parser$Advanced$loop,
						_List_fromArray(
							[item]),
						A4($elm$parser$Parser$Advanced$sequenceEndForbidden, ender, ws, parseItem, sep));
				case 'Optional':
					return A2(
						$elm$parser$Parser$Advanced$loop,
						_List_fromArray(
							[item]),
						A4($elm$parser$Parser$Advanced$sequenceEndOptional, ender, ws, parseItem, sep));
				default:
					return A2(
						$elm$parser$Parser$Advanced$ignorer,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							A2(
								$elm$parser$Parser$Advanced$skip,
								sep,
								A2(
									$elm$parser$Parser$Advanced$skip,
									ws,
									A2(
										$elm$parser$Parser$Advanced$loop,
										_List_fromArray(
											[item]),
										A3($elm$parser$Parser$Advanced$sequenceEndMandatory, ws, parseItem, sep))))),
						ender);
			}
		};
		return $elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2($elm$parser$Parser$Advanced$andThen, chompRest, parseItem),
					A2(
					$elm$parser$Parser$Advanced$map,
					function (_v0) {
						return _List_Nil;
					},
					ender)
				]));
	});
var $elm$parser$Parser$Advanced$sequence = function (i) {
	return A2(
		$elm$parser$Parser$Advanced$skip,
		$elm$parser$Parser$Advanced$token(i.start),
		A2(
			$elm$parser$Parser$Advanced$skip,
			i.spaces,
			A5(
				$elm$parser$Parser$Advanced$sequenceEnd,
				$elm$parser$Parser$Advanced$token(i.end),
				i.spaces,
				i.item,
				$elm$parser$Parser$Advanced$token(i.separator),
				i.trailing)));
};
var $elm$parser$Parser$Advanced$Forbidden = {$: 'Forbidden'};
var $elm$parser$Parser$Advanced$Mandatory = {$: 'Mandatory'};
var $elm$parser$Parser$Advanced$Optional = {$: 'Optional'};
var $elm$parser$Parser$toAdvancedTrailing = function (trailing) {
	switch (trailing.$) {
		case 'Forbidden':
			return $elm$parser$Parser$Advanced$Forbidden;
		case 'Optional':
			return $elm$parser$Parser$Advanced$Optional;
		default:
			return $elm$parser$Parser$Advanced$Mandatory;
	}
};
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 'Expecting', a: a};
};
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$sequence = function (i) {
	return $elm$parser$Parser$Advanced$sequence(
		{
			end: $elm$parser$Parser$toToken(i.end),
			item: i.item,
			separator: $elm$parser$Parser$toToken(i.separator),
			spaces: i.spaces,
			start: $elm$parser$Parser$toToken(i.start),
			trailing: $elm$parser$Parser$toAdvancedTrailing(i.trailing)
		});
};
var $avh4$elm_program_test$Parser$Extra$String$isUninteresting = function (_char) {
	return (!_Utils_eq(
		_char,
		_Utils_chr('\\'))) && (!_Utils_eq(
		_char,
		_Utils_chr('\"')));
};
var $elm$parser$Parser$token = function (str) {
	return $elm$parser$Parser$Advanced$token(
		$elm$parser$Parser$toToken(str));
};
var $avh4$elm_program_test$Parser$Extra$String$stringHelp = function (revChunks) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						function (chunk) {
							return $elm$parser$Parser$Loop(
								A2($elm$core$List$cons, chunk, revChunks));
						}),
					$elm$parser$Parser$token('\\')),
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							A2(
							$elm$parser$Parser$map,
							function (_v0) {
								return '\n';
							},
							$elm$parser$Parser$token('n')),
							A2(
							$elm$parser$Parser$map,
							function (_v1) {
								return '\t';
							},
							$elm$parser$Parser$token('t')),
							A2(
							$elm$parser$Parser$map,
							function (_v2) {
								return '\u000D';
							},
							$elm$parser$Parser$token('r'))
						]))),
				A2(
				$elm$parser$Parser$map,
				function (_v3) {
					return $elm$parser$Parser$Done(
						A2(
							$elm$core$String$join,
							'',
							$elm$core$List$reverse(revChunks)));
				},
				$elm$parser$Parser$token('\"')),
				A2(
				$elm$parser$Parser$map,
				function (chunk) {
					return $elm$parser$Parser$Loop(
						A2($elm$core$List$cons, chunk, revChunks));
				},
				$elm$parser$Parser$getChompedString(
					$elm$parser$Parser$chompWhile($avh4$elm_program_test$Parser$Extra$String$isUninteresting)))
			]));
};
var $avh4$elm_program_test$Parser$Extra$String$string = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		$elm$parser$Parser$token('\"')),
	A2($elm$parser$Parser$loop, _List_Nil, $avh4$elm_program_test$Parser$Extra$String$stringHelp));
function $avh4$elm_program_test$ProgramTest$TestHtmlParser$cyclic$selectorsParser() {
	return $elm$parser$Parser$sequence(
		{
			end: ' ]',
			item: $avh4$elm_program_test$ProgramTest$TestHtmlParser$cyclic$selectorParser(),
			separator: ', ',
			spaces: $elm$parser$Parser$succeed(_Utils_Tuple0),
			start: '[ ',
			trailing: $elm$parser$Parser$Forbidden
		});
}
function $avh4$elm_program_test$ProgramTest$TestHtmlParser$cyclic$selectorParser() {
	var done = function (acc) {
		if (acc.b && (!acc.b.b)) {
			var single = acc.a;
			return single;
		} else {
			var more = acc;
			return $avh4$elm_program_test$ProgramTest$TestHtmlParser$All(
				$elm$core$List$reverse(more));
		}
	};
	return A2(
		$elm$parser$Parser$andThen,
		function (first) {
			return A2(
				$elm$parser$Parser$loop,
				_List_fromArray(
					[first]),
				function (acc) {
					return $elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$ignorer,
									$elm$parser$Parser$succeed(
										function (stmt) {
											return $elm$parser$Parser$Loop(
												A2($elm$core$List$cons, stmt, acc));
										}),
									$elm$parser$Parser$backtrackable(
										$elm$parser$Parser$symbol(' '))),
								$avh4$elm_program_test$ProgramTest$TestHtmlParser$cyclic$singleSelectorParser()),
								A2(
								$elm$parser$Parser$map,
								function (_v1) {
									return $elm$parser$Parser$Done(
										done(acc));
								},
								$elm$parser$Parser$succeed(_Utils_Tuple0))
							]));
				});
		},
		$avh4$elm_program_test$ProgramTest$TestHtmlParser$cyclic$singleSelectorParser());
}
function $avh4$elm_program_test$ProgramTest$TestHtmlParser$cyclic$singleSelectorParser() {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($avh4$elm_program_test$ProgramTest$TestHtmlParser$Tag),
					$elm$parser$Parser$keyword('tag ')),
				$avh4$elm_program_test$Parser$Extra$String$string),
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($avh4$elm_program_test$ProgramTest$TestHtmlParser$Text),
					$elm$parser$Parser$keyword('text ')),
				$avh4$elm_program_test$Parser$Extra$String$string),
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($avh4$elm_program_test$ProgramTest$TestHtmlParser$Attribute),
						$elm$parser$Parser$keyword('attribute ')),
					A2(
						$elm$parser$Parser$ignorer,
						$avh4$elm_program_test$Parser$Extra$String$string,
						$elm$parser$Parser$symbol(' '))),
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							$avh4$elm_program_test$Parser$Extra$String$string,
							A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed('true'),
							$elm$parser$Parser$keyword('True')),
							A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed('false'),
							$elm$parser$Parser$keyword('False'))
						]))),
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($avh4$elm_program_test$ProgramTest$TestHtmlParser$Containing),
					$elm$parser$Parser$keyword('containing ')),
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$lazy(
						function (_v0) {
							return $avh4$elm_program_test$ProgramTest$TestHtmlParser$cyclic$selectorsParser();
						}),
					$elm$parser$Parser$symbol(' ')))
			]));
}
try {
	var $avh4$elm_program_test$ProgramTest$TestHtmlParser$selectorsParser = $avh4$elm_program_test$ProgramTest$TestHtmlParser$cyclic$selectorsParser();
	$avh4$elm_program_test$ProgramTest$TestHtmlParser$cyclic$selectorsParser = function () {
		return $avh4$elm_program_test$ProgramTest$TestHtmlParser$selectorsParser;
	};
	var $avh4$elm_program_test$ProgramTest$TestHtmlParser$selectorParser = $avh4$elm_program_test$ProgramTest$TestHtmlParser$cyclic$selectorParser();
	$avh4$elm_program_test$ProgramTest$TestHtmlParser$cyclic$selectorParser = function () {
		return $avh4$elm_program_test$ProgramTest$TestHtmlParser$selectorParser;
	};
	var $avh4$elm_program_test$ProgramTest$TestHtmlParser$singleSelectorParser = $avh4$elm_program_test$ProgramTest$TestHtmlParser$cyclic$singleSelectorParser();
	$avh4$elm_program_test$ProgramTest$TestHtmlParser$cyclic$singleSelectorParser = function () {
		return $avh4$elm_program_test$ProgramTest$TestHtmlParser$singleSelectorParser;
	};
} catch ($) {
	throw 'Some top-level definitions from `ProgramTest.TestHtmlParser` are causing infinite recursion:\n\n  ┌─────┐\n  │    selectorsParser\n  │     ↓\n  │    selectorParser\n  │     ↓\n  │    singleSelectorParser\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$assertionParser = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($avh4$elm_program_test$ProgramTest$TestHtmlParser$Has),
					$elm$parser$Parser$keyword('▼ Query.has ')),
				A2(
					$elm$parser$Parser$ignorer,
					$avh4$elm_program_test$ProgramTest$TestHtmlParser$selectorsParser,
					$elm$parser$Parser$symbol('\n\n'))),
			$avh4$elm_program_test$ProgramTest$TestHtmlParser$selectorResultsParser)
		]));
var $elm$parser$Parser$Advanced$findSubString = _Parser_findSubString;
var $elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var $elm$parser$Parser$Advanced$chompUntil = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$findSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A4($elm$parser$Parser$Advanced$fromInfo, newRow, newCol, expecting, s.context)) : A3(
				$elm$parser$Parser$Advanced$Good,
				_Utils_cmp(s.offset, newOffset) < 0,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$chompUntil = function (str) {
	return $elm$parser$Parser$Advanced$chompUntil(
		$elm$parser$Parser$toToken(str));
};
var $elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var $elm$parser$Parser$Advanced$end = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				$elm$core$String$length(s.src),
				s.offset) ? A3($elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$FindStep = F2(
	function (a, b) {
		return {$: 'FindStep', a: a, b: b};
	});
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$stepParser = function (parseHtml) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($avh4$elm_program_test$ProgramTest$TestHtmlParser$FindStep),
						$elm$parser$Parser$keyword('▼ Query.find ')),
					A2(
						$elm$parser$Parser$ignorer,
						$avh4$elm_program_test$ProgramTest$TestHtmlParser$selectorsParser,
						$elm$parser$Parser$symbol('\n\n    1)  '))),
				parseHtml)
			]));
};
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$stepsParser = function (parseHtml) {
	return A2(
		$elm$parser$Parser$loop,
		_List_Nil,
		function (acc) {
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$keeper,
						$elm$parser$Parser$succeed(
							function (stmt) {
								return $elm$parser$Parser$Loop(
									A2($elm$core$List$cons, stmt, acc));
							}),
						$avh4$elm_program_test$ProgramTest$TestHtmlParser$stepParser(parseHtml)),
						A2(
						$elm$parser$Parser$map,
						function (_v0) {
							return $elm$parser$Parser$Done(
								$elm$core$List$reverse(acc));
						},
						$elm$parser$Parser$succeed(_Utils_Tuple0))
					]));
		});
};
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$parser_ = function (parseHtml) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$ignorer,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($avh4$elm_program_test$ProgramTest$TestHtmlParser$QueryFailure),
								$elm$parser$Parser$keyword('▼ Query.fromHtml')),
							$elm$parser$Parser$symbol('\n\n    ')),
						parseHtml),
					$avh4$elm_program_test$ProgramTest$TestHtmlParser$stepsParser(parseHtml)),
				A2($elm$parser$Parser$ignorer, $avh4$elm_program_test$ProgramTest$TestHtmlParser$assertionParser, $elm$parser$Parser$end)),
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$ignorer,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed($avh4$elm_program_test$ProgramTest$TestHtmlParser$EventFailure),
							$elm$parser$Parser$keyword('Event.expectEvent:')),
						$elm$parser$Parser$symbol(' I found a node, but it does not listen for \"')),
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$getChompedString(
							$elm$parser$Parser$chompUntil('\"')),
						$elm$parser$Parser$symbol('\" events like I expected it would.\n\n'))),
				A2($elm$parser$Parser$ignorer, parseHtml, $elm$parser$Parser$end))
			]));
};
var $hecrj$html_parser$Html$Parser$Element = F3(
	function (a, b, c) {
		return {$: 'Element', a: a, b: b, c: c};
	});
var $elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $hecrj$html_parser$Html$Parser$chompOneOrMore = function (fn) {
	return A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$chompIf(fn),
		$elm$parser$Parser$chompWhile(fn));
};
var $hecrj$html_parser$Html$Parser$isSpaceCharacter = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr(' ')) || (_Utils_eq(
		c,
		_Utils_chr('\t')) || (_Utils_eq(
		c,
		_Utils_chr('\n')) || (_Utils_eq(
		c,
		_Utils_chr('\u000D')) || (_Utils_eq(
		c,
		_Utils_chr('\u000C')) || _Utils_eq(
		c,
		_Utils_chr('\u00A0'))))));
};
var $elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $hecrj$html_parser$Html$Parser$closingTag = function (name) {
	var chompName = A2(
		$elm$parser$Parser$andThen,
		function (closingName) {
			return _Utils_eq(
				$elm$core$String$toLower(closingName),
				name) ? $elm$parser$Parser$succeed(_Utils_Tuple0) : $elm$parser$Parser$problem('closing tag does not match opening tag: ' + name);
		},
		$elm$parser$Parser$getChompedString(
			$hecrj$html_parser$Html$Parser$chompOneOrMore(
				function (c) {
					return (!$hecrj$html_parser$Html$Parser$isSpaceCharacter(c)) && (!_Utils_eq(
						c,
						_Utils_chr('>')));
				})));
	return A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$chompIf(
						$elm$core$Basics$eq(
							_Utils_chr('<'))),
					$elm$parser$Parser$chompIf(
						$elm$core$Basics$eq(
							_Utils_chr('/')))),
				chompName),
			$elm$parser$Parser$chompWhile($hecrj$html_parser$Html$Parser$isSpaceCharacter)),
		$elm$parser$Parser$chompIf(
			$elm$core$Basics$eq(
				_Utils_chr('>'))));
};
var $hecrj$html_parser$Html$Parser$Comment = function (a) {
	return {$: 'Comment', a: a};
};
var $hecrj$html_parser$Html$Parser$commentString = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$elm$parser$Parser$token('<!')),
		$elm$parser$Parser$token('--')),
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$getChompedString(
			$elm$parser$Parser$chompUntil('-->')),
		$elm$parser$Parser$token('-->')));
var $hecrj$html_parser$Html$Parser$comment = A2($elm$parser$Parser$map, $hecrj$html_parser$Html$Parser$Comment, $hecrj$html_parser$Html$Parser$commentString);
var $hecrj$html_parser$Html$Parser$voidElements = _List_fromArray(
	['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
var $hecrj$html_parser$Html$Parser$isVoidElement = function (name) {
	return A2($elm$core$List$member, name, $hecrj$html_parser$Html$Parser$voidElements);
};
var $hecrj$html_parser$Html$Parser$many = function (parser_) {
	return A2(
		$elm$parser$Parser$loop,
		_List_Nil,
		function (list) {
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$map,
						function (_new) {
							return $elm$parser$Parser$Loop(
								A2($elm$core$List$cons, _new, list));
						},
						parser_),
						$elm$parser$Parser$succeed(
						$elm$parser$Parser$Done(
							$elm$core$List$reverse(list)))
					]));
		});
};
var $hecrj$html_parser$Html$Parser$isTagAttributeCharacter = function (c) {
	return (!$hecrj$html_parser$Html$Parser$isSpaceCharacter(c)) && ((!_Utils_eq(
		c,
		_Utils_chr('\"'))) && ((!_Utils_eq(
		c,
		_Utils_chr('\''))) && ((!_Utils_eq(
		c,
		_Utils_chr('>'))) && ((!_Utils_eq(
		c,
		_Utils_chr('/'))) && (!_Utils_eq(
		c,
		_Utils_chr('=')))))));
};
var $hecrj$html_parser$Html$Parser$tagAttributeName = A2(
	$elm$parser$Parser$map,
	$elm$core$String$toLower,
	$elm$parser$Parser$getChompedString(
		$hecrj$html_parser$Html$Parser$chompOneOrMore($hecrj$html_parser$Html$Parser$isTagAttributeCharacter)));
var $hecrj$html_parser$Html$Parser$chompSemicolon = $elm$parser$Parser$chompIf(
	$elm$core$Basics$eq(
		_Utils_chr(';')));
var $hecrj$html_parser$Html$Parser$NamedCharacterReferences$dict = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('Aacute', 'Á'),
			_Utils_Tuple2('aacute', 'á'),
			_Utils_Tuple2('Abreve', 'Ă'),
			_Utils_Tuple2('abreve', 'ă'),
			_Utils_Tuple2('ac', '∾'),
			_Utils_Tuple2('acd', '∿'),
			_Utils_Tuple2('acE', '∾̳'),
			_Utils_Tuple2('Acirc', 'Â'),
			_Utils_Tuple2('acirc', 'â'),
			_Utils_Tuple2('acute', '´'),
			_Utils_Tuple2('Acy', 'А'),
			_Utils_Tuple2('acy', 'а'),
			_Utils_Tuple2('AElig', 'Æ'),
			_Utils_Tuple2('aelig', 'æ'),
			_Utils_Tuple2('af', '\u2061'),
			_Utils_Tuple2('Afr', '\uD835\uDD04'),
			_Utils_Tuple2('afr', '\uD835\uDD1E'),
			_Utils_Tuple2('Agrave', 'À'),
			_Utils_Tuple2('agrave', 'à'),
			_Utils_Tuple2('alefsym', 'ℵ'),
			_Utils_Tuple2('aleph', 'ℵ'),
			_Utils_Tuple2('Alpha', 'Α'),
			_Utils_Tuple2('alpha', 'α'),
			_Utils_Tuple2('Amacr', 'Ā'),
			_Utils_Tuple2('amacr', 'ā'),
			_Utils_Tuple2('amalg', '⨿'),
			_Utils_Tuple2('amp', '&'),
			_Utils_Tuple2('AMP', '&'),
			_Utils_Tuple2('andand', '⩕'),
			_Utils_Tuple2('And', '⩓'),
			_Utils_Tuple2('and', '∧'),
			_Utils_Tuple2('andd', '⩜'),
			_Utils_Tuple2('andslope', '⩘'),
			_Utils_Tuple2('andv', '⩚'),
			_Utils_Tuple2('ang', '∠'),
			_Utils_Tuple2('ange', '⦤'),
			_Utils_Tuple2('angle', '∠'),
			_Utils_Tuple2('angmsdaa', '⦨'),
			_Utils_Tuple2('angmsdab', '⦩'),
			_Utils_Tuple2('angmsdac', '⦪'),
			_Utils_Tuple2('angmsdad', '⦫'),
			_Utils_Tuple2('angmsdae', '⦬'),
			_Utils_Tuple2('angmsdaf', '⦭'),
			_Utils_Tuple2('angmsdag', '⦮'),
			_Utils_Tuple2('angmsdah', '⦯'),
			_Utils_Tuple2('angmsd', '∡'),
			_Utils_Tuple2('angrt', '∟'),
			_Utils_Tuple2('angrtvb', '⊾'),
			_Utils_Tuple2('angrtvbd', '⦝'),
			_Utils_Tuple2('angsph', '∢'),
			_Utils_Tuple2('angst', 'Å'),
			_Utils_Tuple2('angzarr', '⍼'),
			_Utils_Tuple2('Aogon', 'Ą'),
			_Utils_Tuple2('aogon', 'ą'),
			_Utils_Tuple2('Aopf', '\uD835\uDD38'),
			_Utils_Tuple2('aopf', '\uD835\uDD52'),
			_Utils_Tuple2('apacir', '⩯'),
			_Utils_Tuple2('ap', '≈'),
			_Utils_Tuple2('apE', '⩰'),
			_Utils_Tuple2('ape', '≊'),
			_Utils_Tuple2('apid', '≋'),
			_Utils_Tuple2('apos', '\''),
			_Utils_Tuple2('ApplyFunction', '\u2061'),
			_Utils_Tuple2('approx', '≈'),
			_Utils_Tuple2('approxeq', '≊'),
			_Utils_Tuple2('Aring', 'Å'),
			_Utils_Tuple2('aring', 'å'),
			_Utils_Tuple2('Ascr', '\uD835\uDC9C'),
			_Utils_Tuple2('ascr', '\uD835\uDCB6'),
			_Utils_Tuple2('Assign', '≔'),
			_Utils_Tuple2('ast', '*'),
			_Utils_Tuple2('asymp', '≈'),
			_Utils_Tuple2('asympeq', '≍'),
			_Utils_Tuple2('Atilde', 'Ã'),
			_Utils_Tuple2('atilde', 'ã'),
			_Utils_Tuple2('Auml', 'Ä'),
			_Utils_Tuple2('auml', 'ä'),
			_Utils_Tuple2('awconint', '∳'),
			_Utils_Tuple2('awint', '⨑'),
			_Utils_Tuple2('backcong', '≌'),
			_Utils_Tuple2('backepsilon', '϶'),
			_Utils_Tuple2('backprime', '‵'),
			_Utils_Tuple2('backsim', '∽'),
			_Utils_Tuple2('backsimeq', '⋍'),
			_Utils_Tuple2('Backslash', '∖'),
			_Utils_Tuple2('Barv', '⫧'),
			_Utils_Tuple2('barvee', '⊽'),
			_Utils_Tuple2('barwed', '⌅'),
			_Utils_Tuple2('Barwed', '⌆'),
			_Utils_Tuple2('barwedge', '⌅'),
			_Utils_Tuple2('bbrk', '⎵'),
			_Utils_Tuple2('bbrktbrk', '⎶'),
			_Utils_Tuple2('bcong', '≌'),
			_Utils_Tuple2('Bcy', 'Б'),
			_Utils_Tuple2('bcy', 'б'),
			_Utils_Tuple2('bdquo', '„'),
			_Utils_Tuple2('becaus', '∵'),
			_Utils_Tuple2('because', '∵'),
			_Utils_Tuple2('Because', '∵'),
			_Utils_Tuple2('bemptyv', '⦰'),
			_Utils_Tuple2('bepsi', '϶'),
			_Utils_Tuple2('bernou', 'ℬ'),
			_Utils_Tuple2('Bernoullis', 'ℬ'),
			_Utils_Tuple2('Beta', 'Β'),
			_Utils_Tuple2('beta', 'β'),
			_Utils_Tuple2('beth', 'ℶ'),
			_Utils_Tuple2('between', '≬'),
			_Utils_Tuple2('Bfr', '\uD835\uDD05'),
			_Utils_Tuple2('bfr', '\uD835\uDD1F'),
			_Utils_Tuple2('bigcap', '⋂'),
			_Utils_Tuple2('bigcirc', '◯'),
			_Utils_Tuple2('bigcup', '⋃'),
			_Utils_Tuple2('bigodot', '⨀'),
			_Utils_Tuple2('bigoplus', '⨁'),
			_Utils_Tuple2('bigotimes', '⨂'),
			_Utils_Tuple2('bigsqcup', '⨆'),
			_Utils_Tuple2('bigstar', '★'),
			_Utils_Tuple2('bigtriangledown', '▽'),
			_Utils_Tuple2('bigtriangleup', '△'),
			_Utils_Tuple2('biguplus', '⨄'),
			_Utils_Tuple2('bigvee', '⋁'),
			_Utils_Tuple2('bigwedge', '⋀'),
			_Utils_Tuple2('bkarow', '⤍'),
			_Utils_Tuple2('blacklozenge', '⧫'),
			_Utils_Tuple2('blacksquare', '▪'),
			_Utils_Tuple2('blacktriangle', '▴'),
			_Utils_Tuple2('blacktriangledown', '▾'),
			_Utils_Tuple2('blacktriangleleft', '◂'),
			_Utils_Tuple2('blacktriangleright', '▸'),
			_Utils_Tuple2('blank', '␣'),
			_Utils_Tuple2('blk12', '▒'),
			_Utils_Tuple2('blk14', '░'),
			_Utils_Tuple2('blk34', '▓'),
			_Utils_Tuple2('block', '█'),
			_Utils_Tuple2('bne', '=⃥'),
			_Utils_Tuple2('bnequiv', '≡⃥'),
			_Utils_Tuple2('bNot', '⫭'),
			_Utils_Tuple2('bnot', '⌐'),
			_Utils_Tuple2('Bopf', '\uD835\uDD39'),
			_Utils_Tuple2('bopf', '\uD835\uDD53'),
			_Utils_Tuple2('bot', '⊥'),
			_Utils_Tuple2('bottom', '⊥'),
			_Utils_Tuple2('bowtie', '⋈'),
			_Utils_Tuple2('boxbox', '⧉'),
			_Utils_Tuple2('boxdl', '┐'),
			_Utils_Tuple2('boxdL', '╕'),
			_Utils_Tuple2('boxDl', '╖'),
			_Utils_Tuple2('boxDL', '╗'),
			_Utils_Tuple2('boxdr', '┌'),
			_Utils_Tuple2('boxdR', '╒'),
			_Utils_Tuple2('boxDr', '╓'),
			_Utils_Tuple2('boxDR', '╔'),
			_Utils_Tuple2('boxh', '─'),
			_Utils_Tuple2('boxH', '═'),
			_Utils_Tuple2('boxhd', '┬'),
			_Utils_Tuple2('boxHd', '╤'),
			_Utils_Tuple2('boxhD', '╥'),
			_Utils_Tuple2('boxHD', '╦'),
			_Utils_Tuple2('boxhu', '┴'),
			_Utils_Tuple2('boxHu', '╧'),
			_Utils_Tuple2('boxhU', '╨'),
			_Utils_Tuple2('boxHU', '╩'),
			_Utils_Tuple2('boxminus', '⊟'),
			_Utils_Tuple2('boxplus', '⊞'),
			_Utils_Tuple2('boxtimes', '⊠'),
			_Utils_Tuple2('boxul', '┘'),
			_Utils_Tuple2('boxuL', '╛'),
			_Utils_Tuple2('boxUl', '╜'),
			_Utils_Tuple2('boxUL', '╝'),
			_Utils_Tuple2('boxur', '└'),
			_Utils_Tuple2('boxuR', '╘'),
			_Utils_Tuple2('boxUr', '╙'),
			_Utils_Tuple2('boxUR', '╚'),
			_Utils_Tuple2('boxv', '│'),
			_Utils_Tuple2('boxV', '║'),
			_Utils_Tuple2('boxvh', '┼'),
			_Utils_Tuple2('boxvH', '╪'),
			_Utils_Tuple2('boxVh', '╫'),
			_Utils_Tuple2('boxVH', '╬'),
			_Utils_Tuple2('boxvl', '┤'),
			_Utils_Tuple2('boxvL', '╡'),
			_Utils_Tuple2('boxVl', '╢'),
			_Utils_Tuple2('boxVL', '╣'),
			_Utils_Tuple2('boxvr', '├'),
			_Utils_Tuple2('boxvR', '╞'),
			_Utils_Tuple2('boxVr', '╟'),
			_Utils_Tuple2('boxVR', '╠'),
			_Utils_Tuple2('bprime', '‵'),
			_Utils_Tuple2('breve', '˘'),
			_Utils_Tuple2('Breve', '˘'),
			_Utils_Tuple2('brvbar', '¦'),
			_Utils_Tuple2('bscr', '\uD835\uDCB7'),
			_Utils_Tuple2('Bscr', 'ℬ'),
			_Utils_Tuple2('bsemi', '⁏'),
			_Utils_Tuple2('bsim', '∽'),
			_Utils_Tuple2('bsime', '⋍'),
			_Utils_Tuple2('bsolb', '⧅'),
			_Utils_Tuple2('bsol', '\\'),
			_Utils_Tuple2('bsolhsub', '⟈'),
			_Utils_Tuple2('bull', '•'),
			_Utils_Tuple2('bullet', '•'),
			_Utils_Tuple2('bump', '≎'),
			_Utils_Tuple2('bumpE', '⪮'),
			_Utils_Tuple2('bumpe', '≏'),
			_Utils_Tuple2('Bumpeq', '≎'),
			_Utils_Tuple2('bumpeq', '≏'),
			_Utils_Tuple2('Cacute', 'Ć'),
			_Utils_Tuple2('cacute', 'ć'),
			_Utils_Tuple2('capand', '⩄'),
			_Utils_Tuple2('capbrcup', '⩉'),
			_Utils_Tuple2('capcap', '⩋'),
			_Utils_Tuple2('cap', '∩'),
			_Utils_Tuple2('Cap', '⋒'),
			_Utils_Tuple2('capcup', '⩇'),
			_Utils_Tuple2('capdot', '⩀'),
			_Utils_Tuple2('CapitalDifferentialD', 'ⅅ'),
			_Utils_Tuple2('caps', '∩︀'),
			_Utils_Tuple2('caret', '⁁'),
			_Utils_Tuple2('caron', 'ˇ'),
			_Utils_Tuple2('Cayleys', 'ℭ'),
			_Utils_Tuple2('ccaps', '⩍'),
			_Utils_Tuple2('Ccaron', 'Č'),
			_Utils_Tuple2('ccaron', 'č'),
			_Utils_Tuple2('Ccedil', 'Ç'),
			_Utils_Tuple2('ccedil', 'ç'),
			_Utils_Tuple2('Ccirc', 'Ĉ'),
			_Utils_Tuple2('ccirc', 'ĉ'),
			_Utils_Tuple2('Cconint', '∰'),
			_Utils_Tuple2('ccups', '⩌'),
			_Utils_Tuple2('ccupssm', '⩐'),
			_Utils_Tuple2('Cdot', 'Ċ'),
			_Utils_Tuple2('cdot', 'ċ'),
			_Utils_Tuple2('cedil', '¸'),
			_Utils_Tuple2('Cedilla', '¸'),
			_Utils_Tuple2('cemptyv', '⦲'),
			_Utils_Tuple2('cent', '¢'),
			_Utils_Tuple2('centerdot', '·'),
			_Utils_Tuple2('CenterDot', '·'),
			_Utils_Tuple2('cfr', '\uD835\uDD20'),
			_Utils_Tuple2('Cfr', 'ℭ'),
			_Utils_Tuple2('CHcy', 'Ч'),
			_Utils_Tuple2('chcy', 'ч'),
			_Utils_Tuple2('check', '✓'),
			_Utils_Tuple2('checkmark', '✓'),
			_Utils_Tuple2('Chi', 'Χ'),
			_Utils_Tuple2('chi', 'χ'),
			_Utils_Tuple2('circ', 'ˆ'),
			_Utils_Tuple2('circeq', '≗'),
			_Utils_Tuple2('circlearrowleft', '↺'),
			_Utils_Tuple2('circlearrowright', '↻'),
			_Utils_Tuple2('circledast', '⊛'),
			_Utils_Tuple2('circledcirc', '⊚'),
			_Utils_Tuple2('circleddash', '⊝'),
			_Utils_Tuple2('CircleDot', '⊙'),
			_Utils_Tuple2('circledR', '®'),
			_Utils_Tuple2('circledS', 'Ⓢ'),
			_Utils_Tuple2('CircleMinus', '⊖'),
			_Utils_Tuple2('CirclePlus', '⊕'),
			_Utils_Tuple2('CircleTimes', '⊗'),
			_Utils_Tuple2('cir', '○'),
			_Utils_Tuple2('cirE', '⧃'),
			_Utils_Tuple2('cire', '≗'),
			_Utils_Tuple2('cirfnint', '⨐'),
			_Utils_Tuple2('cirmid', '⫯'),
			_Utils_Tuple2('cirscir', '⧂'),
			_Utils_Tuple2('ClockwiseContourIntegral', '∲'),
			_Utils_Tuple2('CloseCurlyDoubleQuote', '”'),
			_Utils_Tuple2('CloseCurlyQuote', '’'),
			_Utils_Tuple2('clubs', '♣'),
			_Utils_Tuple2('clubsuit', '♣'),
			_Utils_Tuple2('colon', ':'),
			_Utils_Tuple2('Colon', '∷'),
			_Utils_Tuple2('Colone', '⩴'),
			_Utils_Tuple2('colone', '≔'),
			_Utils_Tuple2('coloneq', '≔'),
			_Utils_Tuple2('comma', ','),
			_Utils_Tuple2('commat', '@'),
			_Utils_Tuple2('comp', '∁'),
			_Utils_Tuple2('compfn', '∘'),
			_Utils_Tuple2('complement', '∁'),
			_Utils_Tuple2('complexes', 'ℂ'),
			_Utils_Tuple2('cong', '≅'),
			_Utils_Tuple2('congdot', '⩭'),
			_Utils_Tuple2('Congruent', '≡'),
			_Utils_Tuple2('conint', '∮'),
			_Utils_Tuple2('Conint', '∯'),
			_Utils_Tuple2('ContourIntegral', '∮'),
			_Utils_Tuple2('copf', '\uD835\uDD54'),
			_Utils_Tuple2('Copf', 'ℂ'),
			_Utils_Tuple2('coprod', '∐'),
			_Utils_Tuple2('Coproduct', '∐'),
			_Utils_Tuple2('copy', '©'),
			_Utils_Tuple2('COPY', '©'),
			_Utils_Tuple2('copysr', '℗'),
			_Utils_Tuple2('CounterClockwiseContourIntegral', '∳'),
			_Utils_Tuple2('crarr', '↵'),
			_Utils_Tuple2('cross', '✗'),
			_Utils_Tuple2('Cross', '⨯'),
			_Utils_Tuple2('Cscr', '\uD835\uDC9E'),
			_Utils_Tuple2('cscr', '\uD835\uDCB8'),
			_Utils_Tuple2('csub', '⫏'),
			_Utils_Tuple2('csube', '⫑'),
			_Utils_Tuple2('csup', '⫐'),
			_Utils_Tuple2('csupe', '⫒'),
			_Utils_Tuple2('ctdot', '⋯'),
			_Utils_Tuple2('cudarrl', '⤸'),
			_Utils_Tuple2('cudarrr', '⤵'),
			_Utils_Tuple2('cuepr', '⋞'),
			_Utils_Tuple2('cuesc', '⋟'),
			_Utils_Tuple2('cularr', '↶'),
			_Utils_Tuple2('cularrp', '⤽'),
			_Utils_Tuple2('cupbrcap', '⩈'),
			_Utils_Tuple2('cupcap', '⩆'),
			_Utils_Tuple2('CupCap', '≍'),
			_Utils_Tuple2('cup', '∪'),
			_Utils_Tuple2('Cup', '⋓'),
			_Utils_Tuple2('cupcup', '⩊'),
			_Utils_Tuple2('cupdot', '⊍'),
			_Utils_Tuple2('cupor', '⩅'),
			_Utils_Tuple2('cups', '∪︀'),
			_Utils_Tuple2('curarr', '↷'),
			_Utils_Tuple2('curarrm', '⤼'),
			_Utils_Tuple2('curlyeqprec', '⋞'),
			_Utils_Tuple2('curlyeqsucc', '⋟'),
			_Utils_Tuple2('curlyvee', '⋎'),
			_Utils_Tuple2('curlywedge', '⋏'),
			_Utils_Tuple2('curren', '¤'),
			_Utils_Tuple2('curvearrowleft', '↶'),
			_Utils_Tuple2('curvearrowright', '↷'),
			_Utils_Tuple2('cuvee', '⋎'),
			_Utils_Tuple2('cuwed', '⋏'),
			_Utils_Tuple2('cwconint', '∲'),
			_Utils_Tuple2('cwint', '∱'),
			_Utils_Tuple2('cylcty', '⌭'),
			_Utils_Tuple2('dagger', '†'),
			_Utils_Tuple2('Dagger', '‡'),
			_Utils_Tuple2('daleth', 'ℸ'),
			_Utils_Tuple2('darr', '↓'),
			_Utils_Tuple2('Darr', '↡'),
			_Utils_Tuple2('dArr', '⇓'),
			_Utils_Tuple2('dash', '‐'),
			_Utils_Tuple2('Dashv', '⫤'),
			_Utils_Tuple2('dashv', '⊣'),
			_Utils_Tuple2('dbkarow', '⤏'),
			_Utils_Tuple2('dblac', '˝'),
			_Utils_Tuple2('Dcaron', 'Ď'),
			_Utils_Tuple2('dcaron', 'ď'),
			_Utils_Tuple2('Dcy', 'Д'),
			_Utils_Tuple2('dcy', 'д'),
			_Utils_Tuple2('ddagger', '‡'),
			_Utils_Tuple2('ddarr', '⇊'),
			_Utils_Tuple2('DD', 'ⅅ'),
			_Utils_Tuple2('dd', 'ⅆ'),
			_Utils_Tuple2('DDotrahd', '⤑'),
			_Utils_Tuple2('ddotseq', '⩷'),
			_Utils_Tuple2('deg', '°'),
			_Utils_Tuple2('Del', '∇'),
			_Utils_Tuple2('Delta', 'Δ'),
			_Utils_Tuple2('delta', 'δ'),
			_Utils_Tuple2('demptyv', '⦱'),
			_Utils_Tuple2('dfisht', '⥿'),
			_Utils_Tuple2('Dfr', '\uD835\uDD07'),
			_Utils_Tuple2('dfr', '\uD835\uDD21'),
			_Utils_Tuple2('dHar', '⥥'),
			_Utils_Tuple2('dharl', '⇃'),
			_Utils_Tuple2('dharr', '⇂'),
			_Utils_Tuple2('DiacriticalAcute', '´'),
			_Utils_Tuple2('DiacriticalDot', '˙'),
			_Utils_Tuple2('DiacriticalDoubleAcute', '˝'),
			_Utils_Tuple2('DiacriticalGrave', '`'),
			_Utils_Tuple2('DiacriticalTilde', '˜'),
			_Utils_Tuple2('diam', '⋄'),
			_Utils_Tuple2('diamond', '⋄'),
			_Utils_Tuple2('Diamond', '⋄'),
			_Utils_Tuple2('diamondsuit', '♦'),
			_Utils_Tuple2('diams', '♦'),
			_Utils_Tuple2('die', '¨'),
			_Utils_Tuple2('DifferentialD', 'ⅆ'),
			_Utils_Tuple2('digamma', 'ϝ'),
			_Utils_Tuple2('disin', '⋲'),
			_Utils_Tuple2('div', '÷'),
			_Utils_Tuple2('divide', '÷'),
			_Utils_Tuple2('divideontimes', '⋇'),
			_Utils_Tuple2('divonx', '⋇'),
			_Utils_Tuple2('DJcy', 'Ђ'),
			_Utils_Tuple2('djcy', 'ђ'),
			_Utils_Tuple2('dlcorn', '⌞'),
			_Utils_Tuple2('dlcrop', '⌍'),
			_Utils_Tuple2('dollar', '$'),
			_Utils_Tuple2('Dopf', '\uD835\uDD3B'),
			_Utils_Tuple2('dopf', '\uD835\uDD55'),
			_Utils_Tuple2('Dot', '¨'),
			_Utils_Tuple2('dot', '˙'),
			_Utils_Tuple2('DotDot', '⃜'),
			_Utils_Tuple2('doteq', '≐'),
			_Utils_Tuple2('doteqdot', '≑'),
			_Utils_Tuple2('DotEqual', '≐'),
			_Utils_Tuple2('dotminus', '∸'),
			_Utils_Tuple2('dotplus', '∔'),
			_Utils_Tuple2('dotsquare', '⊡'),
			_Utils_Tuple2('doublebarwedge', '⌆'),
			_Utils_Tuple2('DoubleContourIntegral', '∯'),
			_Utils_Tuple2('DoubleDot', '¨'),
			_Utils_Tuple2('DoubleDownArrow', '⇓'),
			_Utils_Tuple2('DoubleLeftArrow', '⇐'),
			_Utils_Tuple2('DoubleLeftRightArrow', '⇔'),
			_Utils_Tuple2('DoubleLeftTee', '⫤'),
			_Utils_Tuple2('DoubleLongLeftArrow', '⟸'),
			_Utils_Tuple2('DoubleLongLeftRightArrow', '⟺'),
			_Utils_Tuple2('DoubleLongRightArrow', '⟹'),
			_Utils_Tuple2('DoubleRightArrow', '⇒'),
			_Utils_Tuple2('DoubleRightTee', '⊨'),
			_Utils_Tuple2('DoubleUpArrow', '⇑'),
			_Utils_Tuple2('DoubleUpDownArrow', '⇕'),
			_Utils_Tuple2('DoubleVerticalBar', '∥'),
			_Utils_Tuple2('DownArrowBar', '⤓'),
			_Utils_Tuple2('downarrow', '↓'),
			_Utils_Tuple2('DownArrow', '↓'),
			_Utils_Tuple2('Downarrow', '⇓'),
			_Utils_Tuple2('DownArrowUpArrow', '⇵'),
			_Utils_Tuple2('DownBreve', '̑'),
			_Utils_Tuple2('downdownarrows', '⇊'),
			_Utils_Tuple2('downharpoonleft', '⇃'),
			_Utils_Tuple2('downharpoonright', '⇂'),
			_Utils_Tuple2('DownLeftRightVector', '⥐'),
			_Utils_Tuple2('DownLeftTeeVector', '⥞'),
			_Utils_Tuple2('DownLeftVectorBar', '⥖'),
			_Utils_Tuple2('DownLeftVector', '↽'),
			_Utils_Tuple2('DownRightTeeVector', '⥟'),
			_Utils_Tuple2('DownRightVectorBar', '⥗'),
			_Utils_Tuple2('DownRightVector', '⇁'),
			_Utils_Tuple2('DownTeeArrow', '↧'),
			_Utils_Tuple2('DownTee', '⊤'),
			_Utils_Tuple2('drbkarow', '⤐'),
			_Utils_Tuple2('drcorn', '⌟'),
			_Utils_Tuple2('drcrop', '⌌'),
			_Utils_Tuple2('Dscr', '\uD835\uDC9F'),
			_Utils_Tuple2('dscr', '\uD835\uDCB9'),
			_Utils_Tuple2('DScy', 'Ѕ'),
			_Utils_Tuple2('dscy', 'ѕ'),
			_Utils_Tuple2('dsol', '⧶'),
			_Utils_Tuple2('Dstrok', 'Đ'),
			_Utils_Tuple2('dstrok', 'đ'),
			_Utils_Tuple2('dtdot', '⋱'),
			_Utils_Tuple2('dtri', '▿'),
			_Utils_Tuple2('dtrif', '▾'),
			_Utils_Tuple2('duarr', '⇵'),
			_Utils_Tuple2('duhar', '⥯'),
			_Utils_Tuple2('dwangle', '⦦'),
			_Utils_Tuple2('DZcy', 'Џ'),
			_Utils_Tuple2('dzcy', 'џ'),
			_Utils_Tuple2('dzigrarr', '⟿'),
			_Utils_Tuple2('Eacute', 'É'),
			_Utils_Tuple2('eacute', 'é'),
			_Utils_Tuple2('easter', '⩮'),
			_Utils_Tuple2('Ecaron', 'Ě'),
			_Utils_Tuple2('ecaron', 'ě'),
			_Utils_Tuple2('Ecirc', 'Ê'),
			_Utils_Tuple2('ecirc', 'ê'),
			_Utils_Tuple2('ecir', '≖'),
			_Utils_Tuple2('ecolon', '≕'),
			_Utils_Tuple2('Ecy', 'Э'),
			_Utils_Tuple2('ecy', 'э'),
			_Utils_Tuple2('eDDot', '⩷'),
			_Utils_Tuple2('Edot', 'Ė'),
			_Utils_Tuple2('edot', 'ė'),
			_Utils_Tuple2('eDot', '≑'),
			_Utils_Tuple2('ee', 'ⅇ'),
			_Utils_Tuple2('efDot', '≒'),
			_Utils_Tuple2('Efr', '\uD835\uDD08'),
			_Utils_Tuple2('efr', '\uD835\uDD22'),
			_Utils_Tuple2('eg', '⪚'),
			_Utils_Tuple2('Egrave', 'È'),
			_Utils_Tuple2('egrave', 'è'),
			_Utils_Tuple2('egs', '⪖'),
			_Utils_Tuple2('egsdot', '⪘'),
			_Utils_Tuple2('el', '⪙'),
			_Utils_Tuple2('Element', '∈'),
			_Utils_Tuple2('elinters', '⏧'),
			_Utils_Tuple2('ell', 'ℓ'),
			_Utils_Tuple2('els', '⪕'),
			_Utils_Tuple2('elsdot', '⪗'),
			_Utils_Tuple2('Emacr', 'Ē'),
			_Utils_Tuple2('emacr', 'ē'),
			_Utils_Tuple2('empty', '∅'),
			_Utils_Tuple2('emptyset', '∅'),
			_Utils_Tuple2('EmptySmallSquare', '◻'),
			_Utils_Tuple2('emptyv', '∅'),
			_Utils_Tuple2('EmptyVerySmallSquare', '▫'),
			_Utils_Tuple2('emsp13', '\u2004'),
			_Utils_Tuple2('emsp14', '\u2005'),
			_Utils_Tuple2('emsp', '\u2003'),
			_Utils_Tuple2('ENG', 'Ŋ'),
			_Utils_Tuple2('eng', 'ŋ'),
			_Utils_Tuple2('ensp', '\u2002'),
			_Utils_Tuple2('Eogon', 'Ę'),
			_Utils_Tuple2('eogon', 'ę'),
			_Utils_Tuple2('Eopf', '\uD835\uDD3C'),
			_Utils_Tuple2('eopf', '\uD835\uDD56'),
			_Utils_Tuple2('epar', '⋕'),
			_Utils_Tuple2('eparsl', '⧣'),
			_Utils_Tuple2('eplus', '⩱'),
			_Utils_Tuple2('epsi', 'ε'),
			_Utils_Tuple2('Epsilon', 'Ε'),
			_Utils_Tuple2('epsilon', 'ε'),
			_Utils_Tuple2('epsiv', 'ϵ'),
			_Utils_Tuple2('eqcirc', '≖'),
			_Utils_Tuple2('eqcolon', '≕'),
			_Utils_Tuple2('eqsim', '≂'),
			_Utils_Tuple2('eqslantgtr', '⪖'),
			_Utils_Tuple2('eqslantless', '⪕'),
			_Utils_Tuple2('Equal', '⩵'),
			_Utils_Tuple2('equals', '='),
			_Utils_Tuple2('EqualTilde', '≂'),
			_Utils_Tuple2('equest', '≟'),
			_Utils_Tuple2('Equilibrium', '⇌'),
			_Utils_Tuple2('equiv', '≡'),
			_Utils_Tuple2('equivDD', '⩸'),
			_Utils_Tuple2('eqvparsl', '⧥'),
			_Utils_Tuple2('erarr', '⥱'),
			_Utils_Tuple2('erDot', '≓'),
			_Utils_Tuple2('escr', 'ℯ'),
			_Utils_Tuple2('Escr', 'ℰ'),
			_Utils_Tuple2('esdot', '≐'),
			_Utils_Tuple2('Esim', '⩳'),
			_Utils_Tuple2('esim', '≂'),
			_Utils_Tuple2('Eta', 'Η'),
			_Utils_Tuple2('eta', 'η'),
			_Utils_Tuple2('ETH', 'Ð'),
			_Utils_Tuple2('eth', 'ð'),
			_Utils_Tuple2('Euml', 'Ë'),
			_Utils_Tuple2('euml', 'ë'),
			_Utils_Tuple2('euro', '€'),
			_Utils_Tuple2('excl', '!'),
			_Utils_Tuple2('exist', '∃'),
			_Utils_Tuple2('Exists', '∃'),
			_Utils_Tuple2('expectation', 'ℰ'),
			_Utils_Tuple2('exponentiale', 'ⅇ'),
			_Utils_Tuple2('ExponentialE', 'ⅇ'),
			_Utils_Tuple2('fallingdotseq', '≒'),
			_Utils_Tuple2('Fcy', 'Ф'),
			_Utils_Tuple2('fcy', 'ф'),
			_Utils_Tuple2('female', '♀'),
			_Utils_Tuple2('ffilig', 'ﬃ'),
			_Utils_Tuple2('fflig', 'ﬀ'),
			_Utils_Tuple2('ffllig', 'ﬄ'),
			_Utils_Tuple2('Ffr', '\uD835\uDD09'),
			_Utils_Tuple2('ffr', '\uD835\uDD23'),
			_Utils_Tuple2('filig', 'ﬁ'),
			_Utils_Tuple2('FilledSmallSquare', '◼'),
			_Utils_Tuple2('FilledVerySmallSquare', '▪'),
			_Utils_Tuple2('fjlig', 'fj'),
			_Utils_Tuple2('flat', '♭'),
			_Utils_Tuple2('fllig', 'ﬂ'),
			_Utils_Tuple2('fltns', '▱'),
			_Utils_Tuple2('fnof', 'ƒ'),
			_Utils_Tuple2('Fopf', '\uD835\uDD3D'),
			_Utils_Tuple2('fopf', '\uD835\uDD57'),
			_Utils_Tuple2('forall', '∀'),
			_Utils_Tuple2('ForAll', '∀'),
			_Utils_Tuple2('fork', '⋔'),
			_Utils_Tuple2('forkv', '⫙'),
			_Utils_Tuple2('Fouriertrf', 'ℱ'),
			_Utils_Tuple2('fpartint', '⨍'),
			_Utils_Tuple2('frac12', '½'),
			_Utils_Tuple2('frac13', '⅓'),
			_Utils_Tuple2('frac14', '¼'),
			_Utils_Tuple2('frac15', '⅕'),
			_Utils_Tuple2('frac16', '⅙'),
			_Utils_Tuple2('frac18', '⅛'),
			_Utils_Tuple2('frac23', '⅔'),
			_Utils_Tuple2('frac25', '⅖'),
			_Utils_Tuple2('frac34', '¾'),
			_Utils_Tuple2('frac35', '⅗'),
			_Utils_Tuple2('frac38', '⅜'),
			_Utils_Tuple2('frac45', '⅘'),
			_Utils_Tuple2('frac56', '⅚'),
			_Utils_Tuple2('frac58', '⅝'),
			_Utils_Tuple2('frac78', '⅞'),
			_Utils_Tuple2('frasl', '⁄'),
			_Utils_Tuple2('frown', '⌢'),
			_Utils_Tuple2('fscr', '\uD835\uDCBB'),
			_Utils_Tuple2('Fscr', 'ℱ'),
			_Utils_Tuple2('gacute', 'ǵ'),
			_Utils_Tuple2('Gamma', 'Γ'),
			_Utils_Tuple2('gamma', 'γ'),
			_Utils_Tuple2('Gammad', 'Ϝ'),
			_Utils_Tuple2('gammad', 'ϝ'),
			_Utils_Tuple2('gap', '⪆'),
			_Utils_Tuple2('Gbreve', 'Ğ'),
			_Utils_Tuple2('gbreve', 'ğ'),
			_Utils_Tuple2('Gcedil', 'Ģ'),
			_Utils_Tuple2('Gcirc', 'Ĝ'),
			_Utils_Tuple2('gcirc', 'ĝ'),
			_Utils_Tuple2('Gcy', 'Г'),
			_Utils_Tuple2('gcy', 'г'),
			_Utils_Tuple2('Gdot', 'Ġ'),
			_Utils_Tuple2('gdot', 'ġ'),
			_Utils_Tuple2('ge', '≥'),
			_Utils_Tuple2('gE', '≧'),
			_Utils_Tuple2('gEl', '⪌'),
			_Utils_Tuple2('gel', '⋛'),
			_Utils_Tuple2('geq', '≥'),
			_Utils_Tuple2('geqq', '≧'),
			_Utils_Tuple2('geqslant', '⩾'),
			_Utils_Tuple2('gescc', '⪩'),
			_Utils_Tuple2('ges', '⩾'),
			_Utils_Tuple2('gesdot', '⪀'),
			_Utils_Tuple2('gesdoto', '⪂'),
			_Utils_Tuple2('gesdotol', '⪄'),
			_Utils_Tuple2('gesl', '⋛︀'),
			_Utils_Tuple2('gesles', '⪔'),
			_Utils_Tuple2('Gfr', '\uD835\uDD0A'),
			_Utils_Tuple2('gfr', '\uD835\uDD24'),
			_Utils_Tuple2('gg', '≫'),
			_Utils_Tuple2('Gg', '⋙'),
			_Utils_Tuple2('ggg', '⋙'),
			_Utils_Tuple2('gimel', 'ℷ'),
			_Utils_Tuple2('GJcy', 'Ѓ'),
			_Utils_Tuple2('gjcy', 'ѓ'),
			_Utils_Tuple2('gla', '⪥'),
			_Utils_Tuple2('gl', '≷'),
			_Utils_Tuple2('glE', '⪒'),
			_Utils_Tuple2('glj', '⪤'),
			_Utils_Tuple2('gnap', '⪊'),
			_Utils_Tuple2('gnapprox', '⪊'),
			_Utils_Tuple2('gne', '⪈'),
			_Utils_Tuple2('gnE', '≩'),
			_Utils_Tuple2('gneq', '⪈'),
			_Utils_Tuple2('gneqq', '≩'),
			_Utils_Tuple2('gnsim', '⋧'),
			_Utils_Tuple2('Gopf', '\uD835\uDD3E'),
			_Utils_Tuple2('gopf', '\uD835\uDD58'),
			_Utils_Tuple2('grave', '`'),
			_Utils_Tuple2('GreaterEqual', '≥'),
			_Utils_Tuple2('GreaterEqualLess', '⋛'),
			_Utils_Tuple2('GreaterFullEqual', '≧'),
			_Utils_Tuple2('GreaterGreater', '⪢'),
			_Utils_Tuple2('GreaterLess', '≷'),
			_Utils_Tuple2('GreaterSlantEqual', '⩾'),
			_Utils_Tuple2('GreaterTilde', '≳'),
			_Utils_Tuple2('Gscr', '\uD835\uDCA2'),
			_Utils_Tuple2('gscr', 'ℊ'),
			_Utils_Tuple2('gsim', '≳'),
			_Utils_Tuple2('gsime', '⪎'),
			_Utils_Tuple2('gsiml', '⪐'),
			_Utils_Tuple2('gtcc', '⪧'),
			_Utils_Tuple2('gtcir', '⩺'),
			_Utils_Tuple2('gt', '>'),
			_Utils_Tuple2('GT', '>'),
			_Utils_Tuple2('Gt', '≫'),
			_Utils_Tuple2('gtdot', '⋗'),
			_Utils_Tuple2('gtlPar', '⦕'),
			_Utils_Tuple2('gtquest', '⩼'),
			_Utils_Tuple2('gtrapprox', '⪆'),
			_Utils_Tuple2('gtrarr', '⥸'),
			_Utils_Tuple2('gtrdot', '⋗'),
			_Utils_Tuple2('gtreqless', '⋛'),
			_Utils_Tuple2('gtreqqless', '⪌'),
			_Utils_Tuple2('gtrless', '≷'),
			_Utils_Tuple2('gtrsim', '≳'),
			_Utils_Tuple2('gvertneqq', '≩︀'),
			_Utils_Tuple2('gvnE', '≩︀'),
			_Utils_Tuple2('Hacek', 'ˇ'),
			_Utils_Tuple2('hairsp', '\u200A'),
			_Utils_Tuple2('half', '½'),
			_Utils_Tuple2('hamilt', 'ℋ'),
			_Utils_Tuple2('HARDcy', 'Ъ'),
			_Utils_Tuple2('hardcy', 'ъ'),
			_Utils_Tuple2('harrcir', '⥈'),
			_Utils_Tuple2('harr', '↔'),
			_Utils_Tuple2('hArr', '⇔'),
			_Utils_Tuple2('harrw', '↭'),
			_Utils_Tuple2('Hat', '^'),
			_Utils_Tuple2('hbar', 'ℏ'),
			_Utils_Tuple2('Hcirc', 'Ĥ'),
			_Utils_Tuple2('hcirc', 'ĥ'),
			_Utils_Tuple2('hearts', '♥'),
			_Utils_Tuple2('heartsuit', '♥'),
			_Utils_Tuple2('hellip', '…'),
			_Utils_Tuple2('hercon', '⊹'),
			_Utils_Tuple2('hfr', '\uD835\uDD25'),
			_Utils_Tuple2('Hfr', 'ℌ'),
			_Utils_Tuple2('HilbertSpace', 'ℋ'),
			_Utils_Tuple2('hksearow', '⤥'),
			_Utils_Tuple2('hkswarow', '⤦'),
			_Utils_Tuple2('hoarr', '⇿'),
			_Utils_Tuple2('homtht', '∻'),
			_Utils_Tuple2('hookleftarrow', '↩'),
			_Utils_Tuple2('hookrightarrow', '↪'),
			_Utils_Tuple2('hopf', '\uD835\uDD59'),
			_Utils_Tuple2('Hopf', 'ℍ'),
			_Utils_Tuple2('horbar', '―'),
			_Utils_Tuple2('HorizontalLine', '─'),
			_Utils_Tuple2('hscr', '\uD835\uDCBD'),
			_Utils_Tuple2('Hscr', 'ℋ'),
			_Utils_Tuple2('hslash', 'ℏ'),
			_Utils_Tuple2('Hstrok', 'Ħ'),
			_Utils_Tuple2('hstrok', 'ħ'),
			_Utils_Tuple2('HumpDownHump', '≎'),
			_Utils_Tuple2('HumpEqual', '≏'),
			_Utils_Tuple2('hybull', '⁃'),
			_Utils_Tuple2('hyphen', '‐'),
			_Utils_Tuple2('Iacute', 'Í'),
			_Utils_Tuple2('iacute', 'í'),
			_Utils_Tuple2('ic', '\u2063'),
			_Utils_Tuple2('Icirc', 'Î'),
			_Utils_Tuple2('icirc', 'î'),
			_Utils_Tuple2('Icy', 'И'),
			_Utils_Tuple2('icy', 'и'),
			_Utils_Tuple2('Idot', 'İ'),
			_Utils_Tuple2('IEcy', 'Е'),
			_Utils_Tuple2('iecy', 'е'),
			_Utils_Tuple2('iexcl', '¡'),
			_Utils_Tuple2('iff', '⇔'),
			_Utils_Tuple2('ifr', '\uD835\uDD26'),
			_Utils_Tuple2('Ifr', 'ℑ'),
			_Utils_Tuple2('Igrave', 'Ì'),
			_Utils_Tuple2('igrave', 'ì'),
			_Utils_Tuple2('ii', 'ⅈ'),
			_Utils_Tuple2('iiiint', '⨌'),
			_Utils_Tuple2('iiint', '∭'),
			_Utils_Tuple2('iinfin', '⧜'),
			_Utils_Tuple2('iiota', '℩'),
			_Utils_Tuple2('IJlig', 'Ĳ'),
			_Utils_Tuple2('ijlig', 'ĳ'),
			_Utils_Tuple2('Imacr', 'Ī'),
			_Utils_Tuple2('imacr', 'ī'),
			_Utils_Tuple2('image', 'ℑ'),
			_Utils_Tuple2('ImaginaryI', 'ⅈ'),
			_Utils_Tuple2('imagline', 'ℐ'),
			_Utils_Tuple2('imagpart', 'ℑ'),
			_Utils_Tuple2('imath', 'ı'),
			_Utils_Tuple2('Im', 'ℑ'),
			_Utils_Tuple2('imof', '⊷'),
			_Utils_Tuple2('imped', 'Ƶ'),
			_Utils_Tuple2('Implies', '⇒'),
			_Utils_Tuple2('incare', '℅'),
			_Utils_Tuple2('in', '∈'),
			_Utils_Tuple2('infin', '∞'),
			_Utils_Tuple2('infintie', '⧝'),
			_Utils_Tuple2('inodot', 'ı'),
			_Utils_Tuple2('intcal', '⊺'),
			_Utils_Tuple2('int', '∫'),
			_Utils_Tuple2('Int', '∬'),
			_Utils_Tuple2('integers', 'ℤ'),
			_Utils_Tuple2('Integral', '∫'),
			_Utils_Tuple2('intercal', '⊺'),
			_Utils_Tuple2('Intersection', '⋂'),
			_Utils_Tuple2('intlarhk', '⨗'),
			_Utils_Tuple2('intprod', '⨼'),
			_Utils_Tuple2('InvisibleComma', '\u2063'),
			_Utils_Tuple2('InvisibleTimes', '\u2062'),
			_Utils_Tuple2('IOcy', 'Ё'),
			_Utils_Tuple2('iocy', 'ё'),
			_Utils_Tuple2('Iogon', 'Į'),
			_Utils_Tuple2('iogon', 'į'),
			_Utils_Tuple2('Iopf', '\uD835\uDD40'),
			_Utils_Tuple2('iopf', '\uD835\uDD5A'),
			_Utils_Tuple2('Iota', 'Ι'),
			_Utils_Tuple2('iota', 'ι'),
			_Utils_Tuple2('iprod', '⨼'),
			_Utils_Tuple2('iquest', '¿'),
			_Utils_Tuple2('iscr', '\uD835\uDCBE'),
			_Utils_Tuple2('Iscr', 'ℐ'),
			_Utils_Tuple2('isin', '∈'),
			_Utils_Tuple2('isindot', '⋵'),
			_Utils_Tuple2('isinE', '⋹'),
			_Utils_Tuple2('isins', '⋴'),
			_Utils_Tuple2('isinsv', '⋳'),
			_Utils_Tuple2('isinv', '∈'),
			_Utils_Tuple2('it', '\u2062'),
			_Utils_Tuple2('Itilde', 'Ĩ'),
			_Utils_Tuple2('itilde', 'ĩ'),
			_Utils_Tuple2('Iukcy', 'І'),
			_Utils_Tuple2('iukcy', 'і'),
			_Utils_Tuple2('Iuml', 'Ï'),
			_Utils_Tuple2('iuml', 'ï'),
			_Utils_Tuple2('Jcirc', 'Ĵ'),
			_Utils_Tuple2('jcirc', 'ĵ'),
			_Utils_Tuple2('Jcy', 'Й'),
			_Utils_Tuple2('jcy', 'й'),
			_Utils_Tuple2('Jfr', '\uD835\uDD0D'),
			_Utils_Tuple2('jfr', '\uD835\uDD27'),
			_Utils_Tuple2('jmath', 'ȷ'),
			_Utils_Tuple2('Jopf', '\uD835\uDD41'),
			_Utils_Tuple2('jopf', '\uD835\uDD5B'),
			_Utils_Tuple2('Jscr', '\uD835\uDCA5'),
			_Utils_Tuple2('jscr', '\uD835\uDCBF'),
			_Utils_Tuple2('Jsercy', 'Ј'),
			_Utils_Tuple2('jsercy', 'ј'),
			_Utils_Tuple2('Jukcy', 'Є'),
			_Utils_Tuple2('jukcy', 'є'),
			_Utils_Tuple2('Kappa', 'Κ'),
			_Utils_Tuple2('kappa', 'κ'),
			_Utils_Tuple2('kappav', 'ϰ'),
			_Utils_Tuple2('Kcedil', 'Ķ'),
			_Utils_Tuple2('kcedil', 'ķ'),
			_Utils_Tuple2('Kcy', 'К'),
			_Utils_Tuple2('kcy', 'к'),
			_Utils_Tuple2('Kfr', '\uD835\uDD0E'),
			_Utils_Tuple2('kfr', '\uD835\uDD28'),
			_Utils_Tuple2('kgreen', 'ĸ'),
			_Utils_Tuple2('KHcy', 'Х'),
			_Utils_Tuple2('khcy', 'х'),
			_Utils_Tuple2('KJcy', 'Ќ'),
			_Utils_Tuple2('kjcy', 'ќ'),
			_Utils_Tuple2('Kopf', '\uD835\uDD42'),
			_Utils_Tuple2('kopf', '\uD835\uDD5C'),
			_Utils_Tuple2('Kscr', '\uD835\uDCA6'),
			_Utils_Tuple2('kscr', '\uD835\uDCC0'),
			_Utils_Tuple2('lAarr', '⇚'),
			_Utils_Tuple2('Lacute', 'Ĺ'),
			_Utils_Tuple2('lacute', 'ĺ'),
			_Utils_Tuple2('laemptyv', '⦴'),
			_Utils_Tuple2('lagran', 'ℒ'),
			_Utils_Tuple2('Lambda', 'Λ'),
			_Utils_Tuple2('lambda', 'λ'),
			_Utils_Tuple2('lang', '⟨'),
			_Utils_Tuple2('Lang', '⟪'),
			_Utils_Tuple2('langd', '⦑'),
			_Utils_Tuple2('langle', '⟨'),
			_Utils_Tuple2('lap', '⪅'),
			_Utils_Tuple2('Laplacetrf', 'ℒ'),
			_Utils_Tuple2('laquo', '«'),
			_Utils_Tuple2('larrb', '⇤'),
			_Utils_Tuple2('larrbfs', '⤟'),
			_Utils_Tuple2('larr', '←'),
			_Utils_Tuple2('Larr', '↞'),
			_Utils_Tuple2('lArr', '⇐'),
			_Utils_Tuple2('larrfs', '⤝'),
			_Utils_Tuple2('larrhk', '↩'),
			_Utils_Tuple2('larrlp', '↫'),
			_Utils_Tuple2('larrpl', '⤹'),
			_Utils_Tuple2('larrsim', '⥳'),
			_Utils_Tuple2('larrtl', '↢'),
			_Utils_Tuple2('latail', '⤙'),
			_Utils_Tuple2('lAtail', '⤛'),
			_Utils_Tuple2('lat', '⪫'),
			_Utils_Tuple2('late', '⪭'),
			_Utils_Tuple2('lates', '⪭︀'),
			_Utils_Tuple2('lbarr', '⤌'),
			_Utils_Tuple2('lBarr', '⤎'),
			_Utils_Tuple2('lbbrk', '❲'),
			_Utils_Tuple2('lbrace', '{'),
			_Utils_Tuple2('lbrack', '['),
			_Utils_Tuple2('lbrke', '⦋'),
			_Utils_Tuple2('lbrksld', '⦏'),
			_Utils_Tuple2('lbrkslu', '⦍'),
			_Utils_Tuple2('Lcaron', 'Ľ'),
			_Utils_Tuple2('lcaron', 'ľ'),
			_Utils_Tuple2('Lcedil', 'Ļ'),
			_Utils_Tuple2('lcedil', 'ļ'),
			_Utils_Tuple2('lceil', '⌈'),
			_Utils_Tuple2('lcub', '{'),
			_Utils_Tuple2('Lcy', 'Л'),
			_Utils_Tuple2('lcy', 'л'),
			_Utils_Tuple2('ldca', '⤶'),
			_Utils_Tuple2('ldquo', '“'),
			_Utils_Tuple2('ldquor', '„'),
			_Utils_Tuple2('ldrdhar', '⥧'),
			_Utils_Tuple2('ldrushar', '⥋'),
			_Utils_Tuple2('ldsh', '↲'),
			_Utils_Tuple2('le', '≤'),
			_Utils_Tuple2('lE', '≦'),
			_Utils_Tuple2('LeftAngleBracket', '⟨'),
			_Utils_Tuple2('LeftArrowBar', '⇤'),
			_Utils_Tuple2('leftarrow', '←'),
			_Utils_Tuple2('LeftArrow', '←'),
			_Utils_Tuple2('Leftarrow', '⇐'),
			_Utils_Tuple2('LeftArrowRightArrow', '⇆'),
			_Utils_Tuple2('leftarrowtail', '↢'),
			_Utils_Tuple2('LeftCeiling', '⌈'),
			_Utils_Tuple2('LeftDoubleBracket', '⟦'),
			_Utils_Tuple2('LeftDownTeeVector', '⥡'),
			_Utils_Tuple2('LeftDownVectorBar', '⥙'),
			_Utils_Tuple2('LeftDownVector', '⇃'),
			_Utils_Tuple2('LeftFloor', '⌊'),
			_Utils_Tuple2('leftharpoondown', '↽'),
			_Utils_Tuple2('leftharpoonup', '↼'),
			_Utils_Tuple2('leftleftarrows', '⇇'),
			_Utils_Tuple2('leftrightarrow', '↔'),
			_Utils_Tuple2('LeftRightArrow', '↔'),
			_Utils_Tuple2('Leftrightarrow', '⇔'),
			_Utils_Tuple2('leftrightarrows', '⇆'),
			_Utils_Tuple2('leftrightharpoons', '⇋'),
			_Utils_Tuple2('leftrightsquigarrow', '↭'),
			_Utils_Tuple2('LeftRightVector', '⥎'),
			_Utils_Tuple2('LeftTeeArrow', '↤'),
			_Utils_Tuple2('LeftTee', '⊣'),
			_Utils_Tuple2('LeftTeeVector', '⥚'),
			_Utils_Tuple2('leftthreetimes', '⋋'),
			_Utils_Tuple2('LeftTriangleBar', '⧏'),
			_Utils_Tuple2('LeftTriangle', '⊲'),
			_Utils_Tuple2('LeftTriangleEqual', '⊴'),
			_Utils_Tuple2('LeftUpDownVector', '⥑'),
			_Utils_Tuple2('LeftUpTeeVector', '⥠'),
			_Utils_Tuple2('LeftUpVectorBar', '⥘'),
			_Utils_Tuple2('LeftUpVector', '↿'),
			_Utils_Tuple2('LeftVectorBar', '⥒'),
			_Utils_Tuple2('LeftVector', '↼'),
			_Utils_Tuple2('lEg', '⪋'),
			_Utils_Tuple2('leg', '⋚'),
			_Utils_Tuple2('leq', '≤'),
			_Utils_Tuple2('leqq', '≦'),
			_Utils_Tuple2('leqslant', '⩽'),
			_Utils_Tuple2('lescc', '⪨'),
			_Utils_Tuple2('les', '⩽'),
			_Utils_Tuple2('lesdot', '⩿'),
			_Utils_Tuple2('lesdoto', '⪁'),
			_Utils_Tuple2('lesdotor', '⪃'),
			_Utils_Tuple2('lesg', '⋚︀'),
			_Utils_Tuple2('lesges', '⪓'),
			_Utils_Tuple2('lessapprox', '⪅'),
			_Utils_Tuple2('lessdot', '⋖'),
			_Utils_Tuple2('lesseqgtr', '⋚'),
			_Utils_Tuple2('lesseqqgtr', '⪋'),
			_Utils_Tuple2('LessEqualGreater', '⋚'),
			_Utils_Tuple2('LessFullEqual', '≦'),
			_Utils_Tuple2('LessGreater', '≶'),
			_Utils_Tuple2('lessgtr', '≶'),
			_Utils_Tuple2('LessLess', '⪡'),
			_Utils_Tuple2('lesssim', '≲'),
			_Utils_Tuple2('LessSlantEqual', '⩽'),
			_Utils_Tuple2('LessTilde', '≲'),
			_Utils_Tuple2('lfisht', '⥼'),
			_Utils_Tuple2('lfloor', '⌊'),
			_Utils_Tuple2('Lfr', '\uD835\uDD0F'),
			_Utils_Tuple2('lfr', '\uD835\uDD29'),
			_Utils_Tuple2('lg', '≶'),
			_Utils_Tuple2('lgE', '⪑'),
			_Utils_Tuple2('lHar', '⥢'),
			_Utils_Tuple2('lhard', '↽'),
			_Utils_Tuple2('lharu', '↼'),
			_Utils_Tuple2('lharul', '⥪'),
			_Utils_Tuple2('lhblk', '▄'),
			_Utils_Tuple2('LJcy', 'Љ'),
			_Utils_Tuple2('ljcy', 'љ'),
			_Utils_Tuple2('llarr', '⇇'),
			_Utils_Tuple2('ll', '≪'),
			_Utils_Tuple2('Ll', '⋘'),
			_Utils_Tuple2('llcorner', '⌞'),
			_Utils_Tuple2('Lleftarrow', '⇚'),
			_Utils_Tuple2('llhard', '⥫'),
			_Utils_Tuple2('lltri', '◺'),
			_Utils_Tuple2('Lmidot', 'Ŀ'),
			_Utils_Tuple2('lmidot', 'ŀ'),
			_Utils_Tuple2('lmoustache', '⎰'),
			_Utils_Tuple2('lmoust', '⎰'),
			_Utils_Tuple2('lnap', '⪉'),
			_Utils_Tuple2('lnapprox', '⪉'),
			_Utils_Tuple2('lne', '⪇'),
			_Utils_Tuple2('lnE', '≨'),
			_Utils_Tuple2('lneq', '⪇'),
			_Utils_Tuple2('lneqq', '≨'),
			_Utils_Tuple2('lnsim', '⋦'),
			_Utils_Tuple2('loang', '⟬'),
			_Utils_Tuple2('loarr', '⇽'),
			_Utils_Tuple2('lobrk', '⟦'),
			_Utils_Tuple2('longleftarrow', '⟵'),
			_Utils_Tuple2('LongLeftArrow', '⟵'),
			_Utils_Tuple2('Longleftarrow', '⟸'),
			_Utils_Tuple2('longleftrightarrow', '⟷'),
			_Utils_Tuple2('LongLeftRightArrow', '⟷'),
			_Utils_Tuple2('Longleftrightarrow', '⟺'),
			_Utils_Tuple2('longmapsto', '⟼'),
			_Utils_Tuple2('longrightarrow', '⟶'),
			_Utils_Tuple2('LongRightArrow', '⟶'),
			_Utils_Tuple2('Longrightarrow', '⟹'),
			_Utils_Tuple2('looparrowleft', '↫'),
			_Utils_Tuple2('looparrowright', '↬'),
			_Utils_Tuple2('lopar', '⦅'),
			_Utils_Tuple2('Lopf', '\uD835\uDD43'),
			_Utils_Tuple2('lopf', '\uD835\uDD5D'),
			_Utils_Tuple2('loplus', '⨭'),
			_Utils_Tuple2('lotimes', '⨴'),
			_Utils_Tuple2('lowast', '∗'),
			_Utils_Tuple2('lowbar', '_'),
			_Utils_Tuple2('LowerLeftArrow', '↙'),
			_Utils_Tuple2('LowerRightArrow', '↘'),
			_Utils_Tuple2('loz', '◊'),
			_Utils_Tuple2('lozenge', '◊'),
			_Utils_Tuple2('lozf', '⧫'),
			_Utils_Tuple2('lpar', '('),
			_Utils_Tuple2('lparlt', '⦓'),
			_Utils_Tuple2('lrarr', '⇆'),
			_Utils_Tuple2('lrcorner', '⌟'),
			_Utils_Tuple2('lrhar', '⇋'),
			_Utils_Tuple2('lrhard', '⥭'),
			_Utils_Tuple2('lrm', '\u200E'),
			_Utils_Tuple2('lrtri', '⊿'),
			_Utils_Tuple2('lsaquo', '‹'),
			_Utils_Tuple2('lscr', '\uD835\uDCC1'),
			_Utils_Tuple2('Lscr', 'ℒ'),
			_Utils_Tuple2('lsh', '↰'),
			_Utils_Tuple2('Lsh', '↰'),
			_Utils_Tuple2('lsim', '≲'),
			_Utils_Tuple2('lsime', '⪍'),
			_Utils_Tuple2('lsimg', '⪏'),
			_Utils_Tuple2('lsqb', '['),
			_Utils_Tuple2('lsquo', '‘'),
			_Utils_Tuple2('lsquor', '‚'),
			_Utils_Tuple2('Lstrok', 'Ł'),
			_Utils_Tuple2('lstrok', 'ł'),
			_Utils_Tuple2('ltcc', '⪦'),
			_Utils_Tuple2('ltcir', '⩹'),
			_Utils_Tuple2('lt', '<'),
			_Utils_Tuple2('LT', '<'),
			_Utils_Tuple2('Lt', '≪'),
			_Utils_Tuple2('ltdot', '⋖'),
			_Utils_Tuple2('lthree', '⋋'),
			_Utils_Tuple2('ltimes', '⋉'),
			_Utils_Tuple2('ltlarr', '⥶'),
			_Utils_Tuple2('ltquest', '⩻'),
			_Utils_Tuple2('ltri', '◃'),
			_Utils_Tuple2('ltrie', '⊴'),
			_Utils_Tuple2('ltrif', '◂'),
			_Utils_Tuple2('ltrPar', '⦖'),
			_Utils_Tuple2('lurdshar', '⥊'),
			_Utils_Tuple2('luruhar', '⥦'),
			_Utils_Tuple2('lvertneqq', '≨︀'),
			_Utils_Tuple2('lvnE', '≨︀'),
			_Utils_Tuple2('macr', '¯'),
			_Utils_Tuple2('male', '♂'),
			_Utils_Tuple2('malt', '✠'),
			_Utils_Tuple2('maltese', '✠'),
			_Utils_Tuple2('Map', '⤅'),
			_Utils_Tuple2('map', '↦'),
			_Utils_Tuple2('mapsto', '↦'),
			_Utils_Tuple2('mapstodown', '↧'),
			_Utils_Tuple2('mapstoleft', '↤'),
			_Utils_Tuple2('mapstoup', '↥'),
			_Utils_Tuple2('marker', '▮'),
			_Utils_Tuple2('mcomma', '⨩'),
			_Utils_Tuple2('Mcy', 'М'),
			_Utils_Tuple2('mcy', 'м'),
			_Utils_Tuple2('mdash', '—'),
			_Utils_Tuple2('mDDot', '∺'),
			_Utils_Tuple2('measuredangle', '∡'),
			_Utils_Tuple2('MediumSpace', '\u205F'),
			_Utils_Tuple2('Mellintrf', 'ℳ'),
			_Utils_Tuple2('Mfr', '\uD835\uDD10'),
			_Utils_Tuple2('mfr', '\uD835\uDD2A'),
			_Utils_Tuple2('mho', '℧'),
			_Utils_Tuple2('micro', 'µ'),
			_Utils_Tuple2('midast', '*'),
			_Utils_Tuple2('midcir', '⫰'),
			_Utils_Tuple2('mid', '∣'),
			_Utils_Tuple2('middot', '·'),
			_Utils_Tuple2('minusb', '⊟'),
			_Utils_Tuple2('minus', '−'),
			_Utils_Tuple2('minusd', '∸'),
			_Utils_Tuple2('minusdu', '⨪'),
			_Utils_Tuple2('MinusPlus', '∓'),
			_Utils_Tuple2('mlcp', '⫛'),
			_Utils_Tuple2('mldr', '…'),
			_Utils_Tuple2('mnplus', '∓'),
			_Utils_Tuple2('models', '⊧'),
			_Utils_Tuple2('Mopf', '\uD835\uDD44'),
			_Utils_Tuple2('mopf', '\uD835\uDD5E'),
			_Utils_Tuple2('mp', '∓'),
			_Utils_Tuple2('mscr', '\uD835\uDCC2'),
			_Utils_Tuple2('Mscr', 'ℳ'),
			_Utils_Tuple2('mstpos', '∾'),
			_Utils_Tuple2('Mu', 'Μ'),
			_Utils_Tuple2('mu', 'μ'),
			_Utils_Tuple2('multimap', '⊸'),
			_Utils_Tuple2('mumap', '⊸'),
			_Utils_Tuple2('nabla', '∇'),
			_Utils_Tuple2('Nacute', 'Ń'),
			_Utils_Tuple2('nacute', 'ń'),
			_Utils_Tuple2('nang', '∠⃒'),
			_Utils_Tuple2('nap', '≉'),
			_Utils_Tuple2('napE', '⩰̸'),
			_Utils_Tuple2('napid', '≋̸'),
			_Utils_Tuple2('napos', 'ŉ'),
			_Utils_Tuple2('napprox', '≉'),
			_Utils_Tuple2('natural', '♮'),
			_Utils_Tuple2('naturals', 'ℕ'),
			_Utils_Tuple2('natur', '♮'),
			_Utils_Tuple2('nbsp', '\u00A0'),
			_Utils_Tuple2('nbump', '≎̸'),
			_Utils_Tuple2('nbumpe', '≏̸'),
			_Utils_Tuple2('ncap', '⩃'),
			_Utils_Tuple2('Ncaron', 'Ň'),
			_Utils_Tuple2('ncaron', 'ň'),
			_Utils_Tuple2('Ncedil', 'Ņ'),
			_Utils_Tuple2('ncedil', 'ņ'),
			_Utils_Tuple2('ncong', '≇'),
			_Utils_Tuple2('ncongdot', '⩭̸'),
			_Utils_Tuple2('ncup', '⩂'),
			_Utils_Tuple2('Ncy', 'Н'),
			_Utils_Tuple2('ncy', 'н'),
			_Utils_Tuple2('ndash', '–'),
			_Utils_Tuple2('nearhk', '⤤'),
			_Utils_Tuple2('nearr', '↗'),
			_Utils_Tuple2('neArr', '⇗'),
			_Utils_Tuple2('nearrow', '↗'),
			_Utils_Tuple2('ne', '≠'),
			_Utils_Tuple2('nedot', '≐̸'),
			_Utils_Tuple2('NegativeMediumSpace', '\u200B'),
			_Utils_Tuple2('NegativeThickSpace', '\u200B'),
			_Utils_Tuple2('NegativeThinSpace', '\u200B'),
			_Utils_Tuple2('NegativeVeryThinSpace', '\u200B'),
			_Utils_Tuple2('nequiv', '≢'),
			_Utils_Tuple2('nesear', '⤨'),
			_Utils_Tuple2('nesim', '≂̸'),
			_Utils_Tuple2('NestedGreaterGreater', '≫'),
			_Utils_Tuple2('NestedLessLess', '≪'),
			_Utils_Tuple2('NewLine', '\n'),
			_Utils_Tuple2('nexist', '∄'),
			_Utils_Tuple2('nexists', '∄'),
			_Utils_Tuple2('Nfr', '\uD835\uDD11'),
			_Utils_Tuple2('nfr', '\uD835\uDD2B'),
			_Utils_Tuple2('ngE', '≧̸'),
			_Utils_Tuple2('nge', '≱'),
			_Utils_Tuple2('ngeq', '≱'),
			_Utils_Tuple2('ngeqq', '≧̸'),
			_Utils_Tuple2('ngeqslant', '⩾̸'),
			_Utils_Tuple2('nges', '⩾̸'),
			_Utils_Tuple2('nGg', '⋙̸'),
			_Utils_Tuple2('ngsim', '≵'),
			_Utils_Tuple2('nGt', '≫⃒'),
			_Utils_Tuple2('ngt', '≯'),
			_Utils_Tuple2('ngtr', '≯'),
			_Utils_Tuple2('nGtv', '≫̸'),
			_Utils_Tuple2('nharr', '↮'),
			_Utils_Tuple2('nhArr', '⇎'),
			_Utils_Tuple2('nhpar', '⫲'),
			_Utils_Tuple2('ni', '∋'),
			_Utils_Tuple2('nis', '⋼'),
			_Utils_Tuple2('nisd', '⋺'),
			_Utils_Tuple2('niv', '∋'),
			_Utils_Tuple2('NJcy', 'Њ'),
			_Utils_Tuple2('njcy', 'њ'),
			_Utils_Tuple2('nlarr', '↚'),
			_Utils_Tuple2('nlArr', '⇍'),
			_Utils_Tuple2('nldr', '‥'),
			_Utils_Tuple2('nlE', '≦̸'),
			_Utils_Tuple2('nle', '≰'),
			_Utils_Tuple2('nleftarrow', '↚'),
			_Utils_Tuple2('nLeftarrow', '⇍'),
			_Utils_Tuple2('nleftrightarrow', '↮'),
			_Utils_Tuple2('nLeftrightarrow', '⇎'),
			_Utils_Tuple2('nleq', '≰'),
			_Utils_Tuple2('nleqq', '≦̸'),
			_Utils_Tuple2('nleqslant', '⩽̸'),
			_Utils_Tuple2('nles', '⩽̸'),
			_Utils_Tuple2('nless', '≮'),
			_Utils_Tuple2('nLl', '⋘̸'),
			_Utils_Tuple2('nlsim', '≴'),
			_Utils_Tuple2('nLt', '≪⃒'),
			_Utils_Tuple2('nlt', '≮'),
			_Utils_Tuple2('nltri', '⋪'),
			_Utils_Tuple2('nltrie', '⋬'),
			_Utils_Tuple2('nLtv', '≪̸'),
			_Utils_Tuple2('nmid', '∤'),
			_Utils_Tuple2('NoBreak', '\u2060'),
			_Utils_Tuple2('NonBreakingSpace', '\u00A0'),
			_Utils_Tuple2('nopf', '\uD835\uDD5F'),
			_Utils_Tuple2('Nopf', 'ℕ'),
			_Utils_Tuple2('Not', '⫬'),
			_Utils_Tuple2('not', '¬'),
			_Utils_Tuple2('NotCongruent', '≢'),
			_Utils_Tuple2('NotCupCap', '≭'),
			_Utils_Tuple2('NotDoubleVerticalBar', '∦'),
			_Utils_Tuple2('NotElement', '∉'),
			_Utils_Tuple2('NotEqual', '≠'),
			_Utils_Tuple2('NotEqualTilde', '≂̸'),
			_Utils_Tuple2('NotExists', '∄'),
			_Utils_Tuple2('NotGreater', '≯'),
			_Utils_Tuple2('NotGreaterEqual', '≱'),
			_Utils_Tuple2('NotGreaterFullEqual', '≧̸'),
			_Utils_Tuple2('NotGreaterGreater', '≫̸'),
			_Utils_Tuple2('NotGreaterLess', '≹'),
			_Utils_Tuple2('NotGreaterSlantEqual', '⩾̸'),
			_Utils_Tuple2('NotGreaterTilde', '≵'),
			_Utils_Tuple2('NotHumpDownHump', '≎̸'),
			_Utils_Tuple2('NotHumpEqual', '≏̸'),
			_Utils_Tuple2('notin', '∉'),
			_Utils_Tuple2('notindot', '⋵̸'),
			_Utils_Tuple2('notinE', '⋹̸'),
			_Utils_Tuple2('notinva', '∉'),
			_Utils_Tuple2('notinvb', '⋷'),
			_Utils_Tuple2('notinvc', '⋶'),
			_Utils_Tuple2('NotLeftTriangleBar', '⧏̸'),
			_Utils_Tuple2('NotLeftTriangle', '⋪'),
			_Utils_Tuple2('NotLeftTriangleEqual', '⋬'),
			_Utils_Tuple2('NotLess', '≮'),
			_Utils_Tuple2('NotLessEqual', '≰'),
			_Utils_Tuple2('NotLessGreater', '≸'),
			_Utils_Tuple2('NotLessLess', '≪̸'),
			_Utils_Tuple2('NotLessSlantEqual', '⩽̸'),
			_Utils_Tuple2('NotLessTilde', '≴'),
			_Utils_Tuple2('NotNestedGreaterGreater', '⪢̸'),
			_Utils_Tuple2('NotNestedLessLess', '⪡̸'),
			_Utils_Tuple2('notni', '∌'),
			_Utils_Tuple2('notniva', '∌'),
			_Utils_Tuple2('notnivb', '⋾'),
			_Utils_Tuple2('notnivc', '⋽'),
			_Utils_Tuple2('NotPrecedes', '⊀'),
			_Utils_Tuple2('NotPrecedesEqual', '⪯̸'),
			_Utils_Tuple2('NotPrecedesSlantEqual', '⋠'),
			_Utils_Tuple2('NotReverseElement', '∌'),
			_Utils_Tuple2('NotRightTriangleBar', '⧐̸'),
			_Utils_Tuple2('NotRightTriangle', '⋫'),
			_Utils_Tuple2('NotRightTriangleEqual', '⋭'),
			_Utils_Tuple2('NotSquareSubset', '⊏̸'),
			_Utils_Tuple2('NotSquareSubsetEqual', '⋢'),
			_Utils_Tuple2('NotSquareSuperset', '⊐̸'),
			_Utils_Tuple2('NotSquareSupersetEqual', '⋣'),
			_Utils_Tuple2('NotSubset', '⊂⃒'),
			_Utils_Tuple2('NotSubsetEqual', '⊈'),
			_Utils_Tuple2('NotSucceeds', '⊁'),
			_Utils_Tuple2('NotSucceedsEqual', '⪰̸'),
			_Utils_Tuple2('NotSucceedsSlantEqual', '⋡'),
			_Utils_Tuple2('NotSucceedsTilde', '≿̸'),
			_Utils_Tuple2('NotSuperset', '⊃⃒'),
			_Utils_Tuple2('NotSupersetEqual', '⊉'),
			_Utils_Tuple2('NotTilde', '≁'),
			_Utils_Tuple2('NotTildeEqual', '≄'),
			_Utils_Tuple2('NotTildeFullEqual', '≇'),
			_Utils_Tuple2('NotTildeTilde', '≉'),
			_Utils_Tuple2('NotVerticalBar', '∤'),
			_Utils_Tuple2('nparallel', '∦'),
			_Utils_Tuple2('npar', '∦'),
			_Utils_Tuple2('nparsl', '⫽⃥'),
			_Utils_Tuple2('npart', '∂̸'),
			_Utils_Tuple2('npolint', '⨔'),
			_Utils_Tuple2('npr', '⊀'),
			_Utils_Tuple2('nprcue', '⋠'),
			_Utils_Tuple2('nprec', '⊀'),
			_Utils_Tuple2('npreceq', '⪯̸'),
			_Utils_Tuple2('npre', '⪯̸'),
			_Utils_Tuple2('nrarrc', '⤳̸'),
			_Utils_Tuple2('nrarr', '↛'),
			_Utils_Tuple2('nrArr', '⇏'),
			_Utils_Tuple2('nrarrw', '↝̸'),
			_Utils_Tuple2('nrightarrow', '↛'),
			_Utils_Tuple2('nRightarrow', '⇏'),
			_Utils_Tuple2('nrtri', '⋫'),
			_Utils_Tuple2('nrtrie', '⋭'),
			_Utils_Tuple2('nsc', '⊁'),
			_Utils_Tuple2('nsccue', '⋡'),
			_Utils_Tuple2('nsce', '⪰̸'),
			_Utils_Tuple2('Nscr', '\uD835\uDCA9'),
			_Utils_Tuple2('nscr', '\uD835\uDCC3'),
			_Utils_Tuple2('nshortmid', '∤'),
			_Utils_Tuple2('nshortparallel', '∦'),
			_Utils_Tuple2('nsim', '≁'),
			_Utils_Tuple2('nsime', '≄'),
			_Utils_Tuple2('nsimeq', '≄'),
			_Utils_Tuple2('nsmid', '∤'),
			_Utils_Tuple2('nspar', '∦'),
			_Utils_Tuple2('nsqsube', '⋢'),
			_Utils_Tuple2('nsqsupe', '⋣'),
			_Utils_Tuple2('nsub', '⊄'),
			_Utils_Tuple2('nsubE', '⫅̸'),
			_Utils_Tuple2('nsube', '⊈'),
			_Utils_Tuple2('nsubset', '⊂⃒'),
			_Utils_Tuple2('nsubseteq', '⊈'),
			_Utils_Tuple2('nsubseteqq', '⫅̸'),
			_Utils_Tuple2('nsucc', '⊁'),
			_Utils_Tuple2('nsucceq', '⪰̸'),
			_Utils_Tuple2('nsup', '⊅'),
			_Utils_Tuple2('nsupE', '⫆̸'),
			_Utils_Tuple2('nsupe', '⊉'),
			_Utils_Tuple2('nsupset', '⊃⃒'),
			_Utils_Tuple2('nsupseteq', '⊉'),
			_Utils_Tuple2('nsupseteqq', '⫆̸'),
			_Utils_Tuple2('ntgl', '≹'),
			_Utils_Tuple2('Ntilde', 'Ñ'),
			_Utils_Tuple2('ntilde', 'ñ'),
			_Utils_Tuple2('ntlg', '≸'),
			_Utils_Tuple2('ntriangleleft', '⋪'),
			_Utils_Tuple2('ntrianglelefteq', '⋬'),
			_Utils_Tuple2('ntriangleright', '⋫'),
			_Utils_Tuple2('ntrianglerighteq', '⋭'),
			_Utils_Tuple2('Nu', 'Ν'),
			_Utils_Tuple2('nu', 'ν'),
			_Utils_Tuple2('num', '#'),
			_Utils_Tuple2('numero', '№'),
			_Utils_Tuple2('numsp', '\u2007'),
			_Utils_Tuple2('nvap', '≍⃒'),
			_Utils_Tuple2('nvdash', '⊬'),
			_Utils_Tuple2('nvDash', '⊭'),
			_Utils_Tuple2('nVdash', '⊮'),
			_Utils_Tuple2('nVDash', '⊯'),
			_Utils_Tuple2('nvge', '≥⃒'),
			_Utils_Tuple2('nvgt', '>⃒'),
			_Utils_Tuple2('nvHarr', '⤄'),
			_Utils_Tuple2('nvinfin', '⧞'),
			_Utils_Tuple2('nvlArr', '⤂'),
			_Utils_Tuple2('nvle', '≤⃒'),
			_Utils_Tuple2('nvlt', '<⃒'),
			_Utils_Tuple2('nvltrie', '⊴⃒'),
			_Utils_Tuple2('nvrArr', '⤃'),
			_Utils_Tuple2('nvrtrie', '⊵⃒'),
			_Utils_Tuple2('nvsim', '∼⃒'),
			_Utils_Tuple2('nwarhk', '⤣'),
			_Utils_Tuple2('nwarr', '↖'),
			_Utils_Tuple2('nwArr', '⇖'),
			_Utils_Tuple2('nwarrow', '↖'),
			_Utils_Tuple2('nwnear', '⤧'),
			_Utils_Tuple2('Oacute', 'Ó'),
			_Utils_Tuple2('oacute', 'ó'),
			_Utils_Tuple2('oast', '⊛'),
			_Utils_Tuple2('Ocirc', 'Ô'),
			_Utils_Tuple2('ocirc', 'ô'),
			_Utils_Tuple2('ocir', '⊚'),
			_Utils_Tuple2('Ocy', 'О'),
			_Utils_Tuple2('ocy', 'о'),
			_Utils_Tuple2('odash', '⊝'),
			_Utils_Tuple2('Odblac', 'Ő'),
			_Utils_Tuple2('odblac', 'ő'),
			_Utils_Tuple2('odiv', '⨸'),
			_Utils_Tuple2('odot', '⊙'),
			_Utils_Tuple2('odsold', '⦼'),
			_Utils_Tuple2('OElig', 'Œ'),
			_Utils_Tuple2('oelig', 'œ'),
			_Utils_Tuple2('ofcir', '⦿'),
			_Utils_Tuple2('Ofr', '\uD835\uDD12'),
			_Utils_Tuple2('ofr', '\uD835\uDD2C'),
			_Utils_Tuple2('ogon', '˛'),
			_Utils_Tuple2('Ograve', 'Ò'),
			_Utils_Tuple2('ograve', 'ò'),
			_Utils_Tuple2('ogt', '⧁'),
			_Utils_Tuple2('ohbar', '⦵'),
			_Utils_Tuple2('ohm', 'Ω'),
			_Utils_Tuple2('oint', '∮'),
			_Utils_Tuple2('olarr', '↺'),
			_Utils_Tuple2('olcir', '⦾'),
			_Utils_Tuple2('olcross', '⦻'),
			_Utils_Tuple2('oline', '‾'),
			_Utils_Tuple2('olt', '⧀'),
			_Utils_Tuple2('Omacr', 'Ō'),
			_Utils_Tuple2('omacr', 'ō'),
			_Utils_Tuple2('Omega', 'Ω'),
			_Utils_Tuple2('omega', 'ω'),
			_Utils_Tuple2('Omicron', 'Ο'),
			_Utils_Tuple2('omicron', 'ο'),
			_Utils_Tuple2('omid', '⦶'),
			_Utils_Tuple2('ominus', '⊖'),
			_Utils_Tuple2('Oopf', '\uD835\uDD46'),
			_Utils_Tuple2('oopf', '\uD835\uDD60'),
			_Utils_Tuple2('opar', '⦷'),
			_Utils_Tuple2('OpenCurlyDoubleQuote', '“'),
			_Utils_Tuple2('OpenCurlyQuote', '‘'),
			_Utils_Tuple2('operp', '⦹'),
			_Utils_Tuple2('oplus', '⊕'),
			_Utils_Tuple2('orarr', '↻'),
			_Utils_Tuple2('Or', '⩔'),
			_Utils_Tuple2('or', '∨'),
			_Utils_Tuple2('ord', '⩝'),
			_Utils_Tuple2('order', 'ℴ'),
			_Utils_Tuple2('orderof', 'ℴ'),
			_Utils_Tuple2('ordf', 'ª'),
			_Utils_Tuple2('ordm', 'º'),
			_Utils_Tuple2('origof', '⊶'),
			_Utils_Tuple2('oror', '⩖'),
			_Utils_Tuple2('orslope', '⩗'),
			_Utils_Tuple2('orv', '⩛'),
			_Utils_Tuple2('oS', 'Ⓢ'),
			_Utils_Tuple2('Oscr', '\uD835\uDCAA'),
			_Utils_Tuple2('oscr', 'ℴ'),
			_Utils_Tuple2('Oslash', 'Ø'),
			_Utils_Tuple2('oslash', 'ø'),
			_Utils_Tuple2('osol', '⊘'),
			_Utils_Tuple2('Otilde', 'Õ'),
			_Utils_Tuple2('otilde', 'õ'),
			_Utils_Tuple2('otimesas', '⨶'),
			_Utils_Tuple2('Otimes', '⨷'),
			_Utils_Tuple2('otimes', '⊗'),
			_Utils_Tuple2('Ouml', 'Ö'),
			_Utils_Tuple2('ouml', 'ö'),
			_Utils_Tuple2('ovbar', '⌽'),
			_Utils_Tuple2('OverBar', '‾'),
			_Utils_Tuple2('OverBrace', '⏞'),
			_Utils_Tuple2('OverBracket', '⎴'),
			_Utils_Tuple2('OverParenthesis', '⏜'),
			_Utils_Tuple2('para', '¶'),
			_Utils_Tuple2('parallel', '∥'),
			_Utils_Tuple2('par', '∥'),
			_Utils_Tuple2('parsim', '⫳'),
			_Utils_Tuple2('parsl', '⫽'),
			_Utils_Tuple2('part', '∂'),
			_Utils_Tuple2('PartialD', '∂'),
			_Utils_Tuple2('Pcy', 'П'),
			_Utils_Tuple2('pcy', 'п'),
			_Utils_Tuple2('percnt', '%'),
			_Utils_Tuple2('period', '.'),
			_Utils_Tuple2('permil', '‰'),
			_Utils_Tuple2('perp', '⊥'),
			_Utils_Tuple2('pertenk', '‱'),
			_Utils_Tuple2('Pfr', '\uD835\uDD13'),
			_Utils_Tuple2('pfr', '\uD835\uDD2D'),
			_Utils_Tuple2('Phi', 'Φ'),
			_Utils_Tuple2('phi', 'φ'),
			_Utils_Tuple2('phiv', 'ϕ'),
			_Utils_Tuple2('phmmat', 'ℳ'),
			_Utils_Tuple2('phone', '☎'),
			_Utils_Tuple2('Pi', 'Π'),
			_Utils_Tuple2('pi', 'π'),
			_Utils_Tuple2('pitchfork', '⋔'),
			_Utils_Tuple2('piv', 'ϖ'),
			_Utils_Tuple2('planck', 'ℏ'),
			_Utils_Tuple2('planckh', 'ℎ'),
			_Utils_Tuple2('plankv', 'ℏ'),
			_Utils_Tuple2('plusacir', '⨣'),
			_Utils_Tuple2('plusb', '⊞'),
			_Utils_Tuple2('pluscir', '⨢'),
			_Utils_Tuple2('plus', '+'),
			_Utils_Tuple2('plusdo', '∔'),
			_Utils_Tuple2('plusdu', '⨥'),
			_Utils_Tuple2('pluse', '⩲'),
			_Utils_Tuple2('PlusMinus', '±'),
			_Utils_Tuple2('plusmn', '±'),
			_Utils_Tuple2('plussim', '⨦'),
			_Utils_Tuple2('plustwo', '⨧'),
			_Utils_Tuple2('pm', '±'),
			_Utils_Tuple2('Poincareplane', 'ℌ'),
			_Utils_Tuple2('pointint', '⨕'),
			_Utils_Tuple2('popf', '\uD835\uDD61'),
			_Utils_Tuple2('Popf', 'ℙ'),
			_Utils_Tuple2('pound', '£'),
			_Utils_Tuple2('prap', '⪷'),
			_Utils_Tuple2('Pr', '⪻'),
			_Utils_Tuple2('pr', '≺'),
			_Utils_Tuple2('prcue', '≼'),
			_Utils_Tuple2('precapprox', '⪷'),
			_Utils_Tuple2('prec', '≺'),
			_Utils_Tuple2('preccurlyeq', '≼'),
			_Utils_Tuple2('Precedes', '≺'),
			_Utils_Tuple2('PrecedesEqual', '⪯'),
			_Utils_Tuple2('PrecedesSlantEqual', '≼'),
			_Utils_Tuple2('PrecedesTilde', '≾'),
			_Utils_Tuple2('preceq', '⪯'),
			_Utils_Tuple2('precnapprox', '⪹'),
			_Utils_Tuple2('precneqq', '⪵'),
			_Utils_Tuple2('precnsim', '⋨'),
			_Utils_Tuple2('pre', '⪯'),
			_Utils_Tuple2('prE', '⪳'),
			_Utils_Tuple2('precsim', '≾'),
			_Utils_Tuple2('prime', '′'),
			_Utils_Tuple2('Prime', '″'),
			_Utils_Tuple2('primes', 'ℙ'),
			_Utils_Tuple2('prnap', '⪹'),
			_Utils_Tuple2('prnE', '⪵'),
			_Utils_Tuple2('prnsim', '⋨'),
			_Utils_Tuple2('prod', '∏'),
			_Utils_Tuple2('Product', '∏'),
			_Utils_Tuple2('profalar', '⌮'),
			_Utils_Tuple2('profline', '⌒'),
			_Utils_Tuple2('profsurf', '⌓'),
			_Utils_Tuple2('prop', '∝'),
			_Utils_Tuple2('Proportional', '∝'),
			_Utils_Tuple2('Proportion', '∷'),
			_Utils_Tuple2('propto', '∝'),
			_Utils_Tuple2('prsim', '≾'),
			_Utils_Tuple2('prurel', '⊰'),
			_Utils_Tuple2('Pscr', '\uD835\uDCAB'),
			_Utils_Tuple2('pscr', '\uD835\uDCC5'),
			_Utils_Tuple2('Psi', 'Ψ'),
			_Utils_Tuple2('psi', 'ψ'),
			_Utils_Tuple2('puncsp', '\u2008'),
			_Utils_Tuple2('Qfr', '\uD835\uDD14'),
			_Utils_Tuple2('qfr', '\uD835\uDD2E'),
			_Utils_Tuple2('qint', '⨌'),
			_Utils_Tuple2('qopf', '\uD835\uDD62'),
			_Utils_Tuple2('Qopf', 'ℚ'),
			_Utils_Tuple2('qprime', '⁗'),
			_Utils_Tuple2('Qscr', '\uD835\uDCAC'),
			_Utils_Tuple2('qscr', '\uD835\uDCC6'),
			_Utils_Tuple2('quaternions', 'ℍ'),
			_Utils_Tuple2('quatint', '⨖'),
			_Utils_Tuple2('quest', '?'),
			_Utils_Tuple2('questeq', '≟'),
			_Utils_Tuple2('quot', '\"'),
			_Utils_Tuple2('QUOT', '\"'),
			_Utils_Tuple2('rAarr', '⇛'),
			_Utils_Tuple2('race', '∽̱'),
			_Utils_Tuple2('Racute', 'Ŕ'),
			_Utils_Tuple2('racute', 'ŕ'),
			_Utils_Tuple2('radic', '√'),
			_Utils_Tuple2('raemptyv', '⦳'),
			_Utils_Tuple2('rang', '⟩'),
			_Utils_Tuple2('Rang', '⟫'),
			_Utils_Tuple2('rangd', '⦒'),
			_Utils_Tuple2('range', '⦥'),
			_Utils_Tuple2('rangle', '⟩'),
			_Utils_Tuple2('raquo', '»'),
			_Utils_Tuple2('rarrap', '⥵'),
			_Utils_Tuple2('rarrb', '⇥'),
			_Utils_Tuple2('rarrbfs', '⤠'),
			_Utils_Tuple2('rarrc', '⤳'),
			_Utils_Tuple2('rarr', '→'),
			_Utils_Tuple2('Rarr', '↠'),
			_Utils_Tuple2('rArr', '⇒'),
			_Utils_Tuple2('rarrfs', '⤞'),
			_Utils_Tuple2('rarrhk', '↪'),
			_Utils_Tuple2('rarrlp', '↬'),
			_Utils_Tuple2('rarrpl', '⥅'),
			_Utils_Tuple2('rarrsim', '⥴'),
			_Utils_Tuple2('Rarrtl', '⤖'),
			_Utils_Tuple2('rarrtl', '↣'),
			_Utils_Tuple2('rarrw', '↝'),
			_Utils_Tuple2('ratail', '⤚'),
			_Utils_Tuple2('rAtail', '⤜'),
			_Utils_Tuple2('ratio', '∶'),
			_Utils_Tuple2('rationals', 'ℚ'),
			_Utils_Tuple2('rbarr', '⤍'),
			_Utils_Tuple2('rBarr', '⤏'),
			_Utils_Tuple2('RBarr', '⤐'),
			_Utils_Tuple2('rbbrk', '❳'),
			_Utils_Tuple2('rbrace', '}'),
			_Utils_Tuple2('rbrack', ']'),
			_Utils_Tuple2('rbrke', '⦌'),
			_Utils_Tuple2('rbrksld', '⦎'),
			_Utils_Tuple2('rbrkslu', '⦐'),
			_Utils_Tuple2('Rcaron', 'Ř'),
			_Utils_Tuple2('rcaron', 'ř'),
			_Utils_Tuple2('Rcedil', 'Ŗ'),
			_Utils_Tuple2('rcedil', 'ŗ'),
			_Utils_Tuple2('rceil', '⌉'),
			_Utils_Tuple2('rcub', '}'),
			_Utils_Tuple2('Rcy', 'Р'),
			_Utils_Tuple2('rcy', 'р'),
			_Utils_Tuple2('rdca', '⤷'),
			_Utils_Tuple2('rdldhar', '⥩'),
			_Utils_Tuple2('rdquo', '”'),
			_Utils_Tuple2('rdquor', '”'),
			_Utils_Tuple2('rdsh', '↳'),
			_Utils_Tuple2('real', 'ℜ'),
			_Utils_Tuple2('realine', 'ℛ'),
			_Utils_Tuple2('realpart', 'ℜ'),
			_Utils_Tuple2('reals', 'ℝ'),
			_Utils_Tuple2('Re', 'ℜ'),
			_Utils_Tuple2('rect', '▭'),
			_Utils_Tuple2('reg', '®'),
			_Utils_Tuple2('REG', '®'),
			_Utils_Tuple2('ReverseElement', '∋'),
			_Utils_Tuple2('ReverseEquilibrium', '⇋'),
			_Utils_Tuple2('ReverseUpEquilibrium', '⥯'),
			_Utils_Tuple2('rfisht', '⥽'),
			_Utils_Tuple2('rfloor', '⌋'),
			_Utils_Tuple2('rfr', '\uD835\uDD2F'),
			_Utils_Tuple2('Rfr', 'ℜ'),
			_Utils_Tuple2('rHar', '⥤'),
			_Utils_Tuple2('rhard', '⇁'),
			_Utils_Tuple2('rharu', '⇀'),
			_Utils_Tuple2('rharul', '⥬'),
			_Utils_Tuple2('Rho', 'Ρ'),
			_Utils_Tuple2('rho', 'ρ'),
			_Utils_Tuple2('rhov', 'ϱ'),
			_Utils_Tuple2('RightAngleBracket', '⟩'),
			_Utils_Tuple2('RightArrowBar', '⇥'),
			_Utils_Tuple2('rightarrow', '→'),
			_Utils_Tuple2('RightArrow', '→'),
			_Utils_Tuple2('Rightarrow', '⇒'),
			_Utils_Tuple2('RightArrowLeftArrow', '⇄'),
			_Utils_Tuple2('rightarrowtail', '↣'),
			_Utils_Tuple2('RightCeiling', '⌉'),
			_Utils_Tuple2('RightDoubleBracket', '⟧'),
			_Utils_Tuple2('RightDownTeeVector', '⥝'),
			_Utils_Tuple2('RightDownVectorBar', '⥕'),
			_Utils_Tuple2('RightDownVector', '⇂'),
			_Utils_Tuple2('RightFloor', '⌋'),
			_Utils_Tuple2('rightharpoondown', '⇁'),
			_Utils_Tuple2('rightharpoonup', '⇀'),
			_Utils_Tuple2('rightleftarrows', '⇄'),
			_Utils_Tuple2('rightleftharpoons', '⇌'),
			_Utils_Tuple2('rightrightarrows', '⇉'),
			_Utils_Tuple2('rightsquigarrow', '↝'),
			_Utils_Tuple2('RightTeeArrow', '↦'),
			_Utils_Tuple2('RightTee', '⊢'),
			_Utils_Tuple2('RightTeeVector', '⥛'),
			_Utils_Tuple2('rightthreetimes', '⋌'),
			_Utils_Tuple2('RightTriangleBar', '⧐'),
			_Utils_Tuple2('RightTriangle', '⊳'),
			_Utils_Tuple2('RightTriangleEqual', '⊵'),
			_Utils_Tuple2('RightUpDownVector', '⥏'),
			_Utils_Tuple2('RightUpTeeVector', '⥜'),
			_Utils_Tuple2('RightUpVectorBar', '⥔'),
			_Utils_Tuple2('RightUpVector', '↾'),
			_Utils_Tuple2('RightVectorBar', '⥓'),
			_Utils_Tuple2('RightVector', '⇀'),
			_Utils_Tuple2('ring', '˚'),
			_Utils_Tuple2('risingdotseq', '≓'),
			_Utils_Tuple2('rlarr', '⇄'),
			_Utils_Tuple2('rlhar', '⇌'),
			_Utils_Tuple2('rlm', '\u200F'),
			_Utils_Tuple2('rmoustache', '⎱'),
			_Utils_Tuple2('rmoust', '⎱'),
			_Utils_Tuple2('rnmid', '⫮'),
			_Utils_Tuple2('roang', '⟭'),
			_Utils_Tuple2('roarr', '⇾'),
			_Utils_Tuple2('robrk', '⟧'),
			_Utils_Tuple2('ropar', '⦆'),
			_Utils_Tuple2('ropf', '\uD835\uDD63'),
			_Utils_Tuple2('Ropf', 'ℝ'),
			_Utils_Tuple2('roplus', '⨮'),
			_Utils_Tuple2('rotimes', '⨵'),
			_Utils_Tuple2('RoundImplies', '⥰'),
			_Utils_Tuple2('rpar', ')'),
			_Utils_Tuple2('rpargt', '⦔'),
			_Utils_Tuple2('rppolint', '⨒'),
			_Utils_Tuple2('rrarr', '⇉'),
			_Utils_Tuple2('Rrightarrow', '⇛'),
			_Utils_Tuple2('rsaquo', '›'),
			_Utils_Tuple2('rscr', '\uD835\uDCC7'),
			_Utils_Tuple2('Rscr', 'ℛ'),
			_Utils_Tuple2('rsh', '↱'),
			_Utils_Tuple2('Rsh', '↱'),
			_Utils_Tuple2('rsqb', ']'),
			_Utils_Tuple2('rsquo', '’'),
			_Utils_Tuple2('rsquor', '’'),
			_Utils_Tuple2('rthree', '⋌'),
			_Utils_Tuple2('rtimes', '⋊'),
			_Utils_Tuple2('rtri', '▹'),
			_Utils_Tuple2('rtrie', '⊵'),
			_Utils_Tuple2('rtrif', '▸'),
			_Utils_Tuple2('rtriltri', '⧎'),
			_Utils_Tuple2('RuleDelayed', '⧴'),
			_Utils_Tuple2('ruluhar', '⥨'),
			_Utils_Tuple2('rx', '℞'),
			_Utils_Tuple2('Sacute', 'Ś'),
			_Utils_Tuple2('sacute', 'ś'),
			_Utils_Tuple2('sbquo', '‚'),
			_Utils_Tuple2('scap', '⪸'),
			_Utils_Tuple2('Scaron', 'Š'),
			_Utils_Tuple2('scaron', 'š'),
			_Utils_Tuple2('Sc', '⪼'),
			_Utils_Tuple2('sc', '≻'),
			_Utils_Tuple2('sccue', '≽'),
			_Utils_Tuple2('sce', '⪰'),
			_Utils_Tuple2('scE', '⪴'),
			_Utils_Tuple2('Scedil', 'Ş'),
			_Utils_Tuple2('scedil', 'ş'),
			_Utils_Tuple2('Scirc', 'Ŝ'),
			_Utils_Tuple2('scirc', 'ŝ'),
			_Utils_Tuple2('scnap', '⪺'),
			_Utils_Tuple2('scnE', '⪶'),
			_Utils_Tuple2('scnsim', '⋩'),
			_Utils_Tuple2('scpolint', '⨓'),
			_Utils_Tuple2('scsim', '≿'),
			_Utils_Tuple2('Scy', 'С'),
			_Utils_Tuple2('scy', 'с'),
			_Utils_Tuple2('sdotb', '⊡'),
			_Utils_Tuple2('sdot', '⋅'),
			_Utils_Tuple2('sdote', '⩦'),
			_Utils_Tuple2('searhk', '⤥'),
			_Utils_Tuple2('searr', '↘'),
			_Utils_Tuple2('seArr', '⇘'),
			_Utils_Tuple2('searrow', '↘'),
			_Utils_Tuple2('sect', '§'),
			_Utils_Tuple2('semi', ';'),
			_Utils_Tuple2('seswar', '⤩'),
			_Utils_Tuple2('setminus', '∖'),
			_Utils_Tuple2('setmn', '∖'),
			_Utils_Tuple2('sext', '✶'),
			_Utils_Tuple2('Sfr', '\uD835\uDD16'),
			_Utils_Tuple2('sfr', '\uD835\uDD30'),
			_Utils_Tuple2('sfrown', '⌢'),
			_Utils_Tuple2('sharp', '♯'),
			_Utils_Tuple2('SHCHcy', 'Щ'),
			_Utils_Tuple2('shchcy', 'щ'),
			_Utils_Tuple2('SHcy', 'Ш'),
			_Utils_Tuple2('shcy', 'ш'),
			_Utils_Tuple2('ShortDownArrow', '↓'),
			_Utils_Tuple2('ShortLeftArrow', '←'),
			_Utils_Tuple2('shortmid', '∣'),
			_Utils_Tuple2('shortparallel', '∥'),
			_Utils_Tuple2('ShortRightArrow', '→'),
			_Utils_Tuple2('ShortUpArrow', '↑'),
			_Utils_Tuple2('shy', '\u00AD'),
			_Utils_Tuple2('Sigma', 'Σ'),
			_Utils_Tuple2('sigma', 'σ'),
			_Utils_Tuple2('sigmaf', 'ς'),
			_Utils_Tuple2('sigmav', 'ς'),
			_Utils_Tuple2('sim', '∼'),
			_Utils_Tuple2('simdot', '⩪'),
			_Utils_Tuple2('sime', '≃'),
			_Utils_Tuple2('simeq', '≃'),
			_Utils_Tuple2('simg', '⪞'),
			_Utils_Tuple2('simgE', '⪠'),
			_Utils_Tuple2('siml', '⪝'),
			_Utils_Tuple2('simlE', '⪟'),
			_Utils_Tuple2('simne', '≆'),
			_Utils_Tuple2('simplus', '⨤'),
			_Utils_Tuple2('simrarr', '⥲'),
			_Utils_Tuple2('slarr', '←'),
			_Utils_Tuple2('SmallCircle', '∘'),
			_Utils_Tuple2('smallsetminus', '∖'),
			_Utils_Tuple2('smashp', '⨳'),
			_Utils_Tuple2('smeparsl', '⧤'),
			_Utils_Tuple2('smid', '∣'),
			_Utils_Tuple2('smile', '⌣'),
			_Utils_Tuple2('smt', '⪪'),
			_Utils_Tuple2('smte', '⪬'),
			_Utils_Tuple2('smtes', '⪬︀'),
			_Utils_Tuple2('SOFTcy', 'Ь'),
			_Utils_Tuple2('softcy', 'ь'),
			_Utils_Tuple2('solbar', '⌿'),
			_Utils_Tuple2('solb', '⧄'),
			_Utils_Tuple2('sol', '/'),
			_Utils_Tuple2('Sopf', '\uD835\uDD4A'),
			_Utils_Tuple2('sopf', '\uD835\uDD64'),
			_Utils_Tuple2('spades', '♠'),
			_Utils_Tuple2('spadesuit', '♠'),
			_Utils_Tuple2('spar', '∥'),
			_Utils_Tuple2('sqcap', '⊓'),
			_Utils_Tuple2('sqcaps', '⊓︀'),
			_Utils_Tuple2('sqcup', '⊔'),
			_Utils_Tuple2('sqcups', '⊔︀'),
			_Utils_Tuple2('Sqrt', '√'),
			_Utils_Tuple2('sqsub', '⊏'),
			_Utils_Tuple2('sqsube', '⊑'),
			_Utils_Tuple2('sqsubset', '⊏'),
			_Utils_Tuple2('sqsubseteq', '⊑'),
			_Utils_Tuple2('sqsup', '⊐'),
			_Utils_Tuple2('sqsupe', '⊒'),
			_Utils_Tuple2('sqsupset', '⊐'),
			_Utils_Tuple2('sqsupseteq', '⊒'),
			_Utils_Tuple2('square', '□'),
			_Utils_Tuple2('Square', '□'),
			_Utils_Tuple2('SquareIntersection', '⊓'),
			_Utils_Tuple2('SquareSubset', '⊏'),
			_Utils_Tuple2('SquareSubsetEqual', '⊑'),
			_Utils_Tuple2('SquareSuperset', '⊐'),
			_Utils_Tuple2('SquareSupersetEqual', '⊒'),
			_Utils_Tuple2('SquareUnion', '⊔'),
			_Utils_Tuple2('squarf', '▪'),
			_Utils_Tuple2('squ', '□'),
			_Utils_Tuple2('squf', '▪'),
			_Utils_Tuple2('srarr', '→'),
			_Utils_Tuple2('Sscr', '\uD835\uDCAE'),
			_Utils_Tuple2('sscr', '\uD835\uDCC8'),
			_Utils_Tuple2('ssetmn', '∖'),
			_Utils_Tuple2('ssmile', '⌣'),
			_Utils_Tuple2('sstarf', '⋆'),
			_Utils_Tuple2('Star', '⋆'),
			_Utils_Tuple2('star', '☆'),
			_Utils_Tuple2('starf', '★'),
			_Utils_Tuple2('straightepsilon', 'ϵ'),
			_Utils_Tuple2('straightphi', 'ϕ'),
			_Utils_Tuple2('strns', '¯'),
			_Utils_Tuple2('sub', '⊂'),
			_Utils_Tuple2('Sub', '⋐'),
			_Utils_Tuple2('subdot', '⪽'),
			_Utils_Tuple2('subE', '⫅'),
			_Utils_Tuple2('sube', '⊆'),
			_Utils_Tuple2('subedot', '⫃'),
			_Utils_Tuple2('submult', '⫁'),
			_Utils_Tuple2('subnE', '⫋'),
			_Utils_Tuple2('subne', '⊊'),
			_Utils_Tuple2('subplus', '⪿'),
			_Utils_Tuple2('subrarr', '⥹'),
			_Utils_Tuple2('subset', '⊂'),
			_Utils_Tuple2('Subset', '⋐'),
			_Utils_Tuple2('subseteq', '⊆'),
			_Utils_Tuple2('subseteqq', '⫅'),
			_Utils_Tuple2('SubsetEqual', '⊆'),
			_Utils_Tuple2('subsetneq', '⊊'),
			_Utils_Tuple2('subsetneqq', '⫋'),
			_Utils_Tuple2('subsim', '⫇'),
			_Utils_Tuple2('subsub', '⫕'),
			_Utils_Tuple2('subsup', '⫓'),
			_Utils_Tuple2('succapprox', '⪸'),
			_Utils_Tuple2('succ', '≻'),
			_Utils_Tuple2('succcurlyeq', '≽'),
			_Utils_Tuple2('Succeeds', '≻'),
			_Utils_Tuple2('SucceedsEqual', '⪰'),
			_Utils_Tuple2('SucceedsSlantEqual', '≽'),
			_Utils_Tuple2('SucceedsTilde', '≿'),
			_Utils_Tuple2('succeq', '⪰'),
			_Utils_Tuple2('succnapprox', '⪺'),
			_Utils_Tuple2('succneqq', '⪶'),
			_Utils_Tuple2('succnsim', '⋩'),
			_Utils_Tuple2('succsim', '≿'),
			_Utils_Tuple2('SuchThat', '∋'),
			_Utils_Tuple2('sum', '∑'),
			_Utils_Tuple2('Sum', '∑'),
			_Utils_Tuple2('sung', '♪'),
			_Utils_Tuple2('sup1', '¹'),
			_Utils_Tuple2('sup2', '²'),
			_Utils_Tuple2('sup3', '³'),
			_Utils_Tuple2('sup', '⊃'),
			_Utils_Tuple2('Sup', '⋑'),
			_Utils_Tuple2('supdot', '⪾'),
			_Utils_Tuple2('supdsub', '⫘'),
			_Utils_Tuple2('supE', '⫆'),
			_Utils_Tuple2('supe', '⊇'),
			_Utils_Tuple2('supedot', '⫄'),
			_Utils_Tuple2('Superset', '⊃'),
			_Utils_Tuple2('SupersetEqual', '⊇'),
			_Utils_Tuple2('suphsol', '⟉'),
			_Utils_Tuple2('suphsub', '⫗'),
			_Utils_Tuple2('suplarr', '⥻'),
			_Utils_Tuple2('supmult', '⫂'),
			_Utils_Tuple2('supnE', '⫌'),
			_Utils_Tuple2('supne', '⊋'),
			_Utils_Tuple2('supplus', '⫀'),
			_Utils_Tuple2('supset', '⊃'),
			_Utils_Tuple2('Supset', '⋑'),
			_Utils_Tuple2('supseteq', '⊇'),
			_Utils_Tuple2('supseteqq', '⫆'),
			_Utils_Tuple2('supsetneq', '⊋'),
			_Utils_Tuple2('supsetneqq', '⫌'),
			_Utils_Tuple2('supsim', '⫈'),
			_Utils_Tuple2('supsub', '⫔'),
			_Utils_Tuple2('supsup', '⫖'),
			_Utils_Tuple2('swarhk', '⤦'),
			_Utils_Tuple2('swarr', '↙'),
			_Utils_Tuple2('swArr', '⇙'),
			_Utils_Tuple2('swarrow', '↙'),
			_Utils_Tuple2('swnwar', '⤪'),
			_Utils_Tuple2('szlig', 'ß'),
			_Utils_Tuple2('Tab', '\t'),
			_Utils_Tuple2('target', '⌖'),
			_Utils_Tuple2('Tau', 'Τ'),
			_Utils_Tuple2('tau', 'τ'),
			_Utils_Tuple2('tbrk', '⎴'),
			_Utils_Tuple2('Tcaron', 'Ť'),
			_Utils_Tuple2('tcaron', 'ť'),
			_Utils_Tuple2('Tcedil', 'Ţ'),
			_Utils_Tuple2('tcedil', 'ţ'),
			_Utils_Tuple2('Tcy', 'Т'),
			_Utils_Tuple2('tcy', 'т'),
			_Utils_Tuple2('tdot', '⃛'),
			_Utils_Tuple2('telrec', '⌕'),
			_Utils_Tuple2('Tfr', '\uD835\uDD17'),
			_Utils_Tuple2('tfr', '\uD835\uDD31'),
			_Utils_Tuple2('there4', '∴'),
			_Utils_Tuple2('therefore', '∴'),
			_Utils_Tuple2('Therefore', '∴'),
			_Utils_Tuple2('Theta', 'Θ'),
			_Utils_Tuple2('theta', 'θ'),
			_Utils_Tuple2('thetasym', 'ϑ'),
			_Utils_Tuple2('thetav', 'ϑ'),
			_Utils_Tuple2('thickapprox', '≈'),
			_Utils_Tuple2('thicksim', '∼'),
			_Utils_Tuple2('ThickSpace', '\u205F\u200A'),
			_Utils_Tuple2('ThinSpace', '\u2009'),
			_Utils_Tuple2('thinsp', '\u2009'),
			_Utils_Tuple2('thkap', '≈'),
			_Utils_Tuple2('thksim', '∼'),
			_Utils_Tuple2('THORN', 'Þ'),
			_Utils_Tuple2('thorn', 'þ'),
			_Utils_Tuple2('tilde', '˜'),
			_Utils_Tuple2('Tilde', '∼'),
			_Utils_Tuple2('TildeEqual', '≃'),
			_Utils_Tuple2('TildeFullEqual', '≅'),
			_Utils_Tuple2('TildeTilde', '≈'),
			_Utils_Tuple2('timesbar', '⨱'),
			_Utils_Tuple2('timesb', '⊠'),
			_Utils_Tuple2('times', '×'),
			_Utils_Tuple2('timesd', '⨰'),
			_Utils_Tuple2('tint', '∭'),
			_Utils_Tuple2('toea', '⤨'),
			_Utils_Tuple2('topbot', '⌶'),
			_Utils_Tuple2('topcir', '⫱'),
			_Utils_Tuple2('top', '⊤'),
			_Utils_Tuple2('Topf', '\uD835\uDD4B'),
			_Utils_Tuple2('topf', '\uD835\uDD65'),
			_Utils_Tuple2('topfork', '⫚'),
			_Utils_Tuple2('tosa', '⤩'),
			_Utils_Tuple2('tprime', '‴'),
			_Utils_Tuple2('trade', '™'),
			_Utils_Tuple2('TRADE', '™'),
			_Utils_Tuple2('triangle', '▵'),
			_Utils_Tuple2('triangledown', '▿'),
			_Utils_Tuple2('triangleleft', '◃'),
			_Utils_Tuple2('trianglelefteq', '⊴'),
			_Utils_Tuple2('triangleq', '≜'),
			_Utils_Tuple2('triangleright', '▹'),
			_Utils_Tuple2('trianglerighteq', '⊵'),
			_Utils_Tuple2('tridot', '◬'),
			_Utils_Tuple2('trie', '≜'),
			_Utils_Tuple2('triminus', '⨺'),
			_Utils_Tuple2('TripleDot', '⃛'),
			_Utils_Tuple2('triplus', '⨹'),
			_Utils_Tuple2('trisb', '⧍'),
			_Utils_Tuple2('tritime', '⨻'),
			_Utils_Tuple2('trpezium', '⏢'),
			_Utils_Tuple2('Tscr', '\uD835\uDCAF'),
			_Utils_Tuple2('tscr', '\uD835\uDCC9'),
			_Utils_Tuple2('TScy', 'Ц'),
			_Utils_Tuple2('tscy', 'ц'),
			_Utils_Tuple2('TSHcy', 'Ћ'),
			_Utils_Tuple2('tshcy', 'ћ'),
			_Utils_Tuple2('Tstrok', 'Ŧ'),
			_Utils_Tuple2('tstrok', 'ŧ'),
			_Utils_Tuple2('twixt', '≬'),
			_Utils_Tuple2('twoheadleftarrow', '↞'),
			_Utils_Tuple2('twoheadrightarrow', '↠'),
			_Utils_Tuple2('Uacute', 'Ú'),
			_Utils_Tuple2('uacute', 'ú'),
			_Utils_Tuple2('uarr', '↑'),
			_Utils_Tuple2('Uarr', '↟'),
			_Utils_Tuple2('uArr', '⇑'),
			_Utils_Tuple2('Uarrocir', '⥉'),
			_Utils_Tuple2('Ubrcy', 'Ў'),
			_Utils_Tuple2('ubrcy', 'ў'),
			_Utils_Tuple2('Ubreve', 'Ŭ'),
			_Utils_Tuple2('ubreve', 'ŭ'),
			_Utils_Tuple2('Ucirc', 'Û'),
			_Utils_Tuple2('ucirc', 'û'),
			_Utils_Tuple2('Ucy', 'У'),
			_Utils_Tuple2('ucy', 'у'),
			_Utils_Tuple2('udarr', '⇅'),
			_Utils_Tuple2('Udblac', 'Ű'),
			_Utils_Tuple2('udblac', 'ű'),
			_Utils_Tuple2('udhar', '⥮'),
			_Utils_Tuple2('ufisht', '⥾'),
			_Utils_Tuple2('Ufr', '\uD835\uDD18'),
			_Utils_Tuple2('ufr', '\uD835\uDD32'),
			_Utils_Tuple2('Ugrave', 'Ù'),
			_Utils_Tuple2('ugrave', 'ù'),
			_Utils_Tuple2('uHar', '⥣'),
			_Utils_Tuple2('uharl', '↿'),
			_Utils_Tuple2('uharr', '↾'),
			_Utils_Tuple2('uhblk', '▀'),
			_Utils_Tuple2('ulcorn', '⌜'),
			_Utils_Tuple2('ulcorner', '⌜'),
			_Utils_Tuple2('ulcrop', '⌏'),
			_Utils_Tuple2('ultri', '◸'),
			_Utils_Tuple2('Umacr', 'Ū'),
			_Utils_Tuple2('umacr', 'ū'),
			_Utils_Tuple2('uml', '¨'),
			_Utils_Tuple2('UnderBar', '_'),
			_Utils_Tuple2('UnderBrace', '⏟'),
			_Utils_Tuple2('UnderBracket', '⎵'),
			_Utils_Tuple2('UnderParenthesis', '⏝'),
			_Utils_Tuple2('Union', '⋃'),
			_Utils_Tuple2('UnionPlus', '⊎'),
			_Utils_Tuple2('Uogon', 'Ų'),
			_Utils_Tuple2('uogon', 'ų'),
			_Utils_Tuple2('Uopf', '\uD835\uDD4C'),
			_Utils_Tuple2('uopf', '\uD835\uDD66'),
			_Utils_Tuple2('UpArrowBar', '⤒'),
			_Utils_Tuple2('uparrow', '↑'),
			_Utils_Tuple2('UpArrow', '↑'),
			_Utils_Tuple2('Uparrow', '⇑'),
			_Utils_Tuple2('UpArrowDownArrow', '⇅'),
			_Utils_Tuple2('updownarrow', '↕'),
			_Utils_Tuple2('UpDownArrow', '↕'),
			_Utils_Tuple2('Updownarrow', '⇕'),
			_Utils_Tuple2('UpEquilibrium', '⥮'),
			_Utils_Tuple2('upharpoonleft', '↿'),
			_Utils_Tuple2('upharpoonright', '↾'),
			_Utils_Tuple2('uplus', '⊎'),
			_Utils_Tuple2('UpperLeftArrow', '↖'),
			_Utils_Tuple2('UpperRightArrow', '↗'),
			_Utils_Tuple2('upsi', 'υ'),
			_Utils_Tuple2('Upsi', 'ϒ'),
			_Utils_Tuple2('upsih', 'ϒ'),
			_Utils_Tuple2('Upsilon', 'Υ'),
			_Utils_Tuple2('upsilon', 'υ'),
			_Utils_Tuple2('UpTeeArrow', '↥'),
			_Utils_Tuple2('UpTee', '⊥'),
			_Utils_Tuple2('upuparrows', '⇈'),
			_Utils_Tuple2('urcorn', '⌝'),
			_Utils_Tuple2('urcorner', '⌝'),
			_Utils_Tuple2('urcrop', '⌎'),
			_Utils_Tuple2('Uring', 'Ů'),
			_Utils_Tuple2('uring', 'ů'),
			_Utils_Tuple2('urtri', '◹'),
			_Utils_Tuple2('Uscr', '\uD835\uDCB0'),
			_Utils_Tuple2('uscr', '\uD835\uDCCA'),
			_Utils_Tuple2('utdot', '⋰'),
			_Utils_Tuple2('Utilde', 'Ũ'),
			_Utils_Tuple2('utilde', 'ũ'),
			_Utils_Tuple2('utri', '▵'),
			_Utils_Tuple2('utrif', '▴'),
			_Utils_Tuple2('uuarr', '⇈'),
			_Utils_Tuple2('Uuml', 'Ü'),
			_Utils_Tuple2('uuml', 'ü'),
			_Utils_Tuple2('uwangle', '⦧'),
			_Utils_Tuple2('vangrt', '⦜'),
			_Utils_Tuple2('varepsilon', 'ϵ'),
			_Utils_Tuple2('varkappa', 'ϰ'),
			_Utils_Tuple2('varnothing', '∅'),
			_Utils_Tuple2('varphi', 'ϕ'),
			_Utils_Tuple2('varpi', 'ϖ'),
			_Utils_Tuple2('varpropto', '∝'),
			_Utils_Tuple2('varr', '↕'),
			_Utils_Tuple2('vArr', '⇕'),
			_Utils_Tuple2('varrho', 'ϱ'),
			_Utils_Tuple2('varsigma', 'ς'),
			_Utils_Tuple2('varsubsetneq', '⊊︀'),
			_Utils_Tuple2('varsubsetneqq', '⫋︀'),
			_Utils_Tuple2('varsupsetneq', '⊋︀'),
			_Utils_Tuple2('varsupsetneqq', '⫌︀'),
			_Utils_Tuple2('vartheta', 'ϑ'),
			_Utils_Tuple2('vartriangleleft', '⊲'),
			_Utils_Tuple2('vartriangleright', '⊳'),
			_Utils_Tuple2('vBar', '⫨'),
			_Utils_Tuple2('Vbar', '⫫'),
			_Utils_Tuple2('vBarv', '⫩'),
			_Utils_Tuple2('Vcy', 'В'),
			_Utils_Tuple2('vcy', 'в'),
			_Utils_Tuple2('vdash', '⊢'),
			_Utils_Tuple2('vDash', '⊨'),
			_Utils_Tuple2('Vdash', '⊩'),
			_Utils_Tuple2('VDash', '⊫'),
			_Utils_Tuple2('Vdashl', '⫦'),
			_Utils_Tuple2('veebar', '⊻'),
			_Utils_Tuple2('vee', '∨'),
			_Utils_Tuple2('Vee', '⋁'),
			_Utils_Tuple2('veeeq', '≚'),
			_Utils_Tuple2('vellip', '⋮'),
			_Utils_Tuple2('verbar', '|'),
			_Utils_Tuple2('Verbar', '‖'),
			_Utils_Tuple2('vert', '|'),
			_Utils_Tuple2('Vert', '‖'),
			_Utils_Tuple2('VerticalBar', '∣'),
			_Utils_Tuple2('VerticalLine', '|'),
			_Utils_Tuple2('VerticalSeparator', '❘'),
			_Utils_Tuple2('VerticalTilde', '≀'),
			_Utils_Tuple2('VeryThinSpace', '\u200A'),
			_Utils_Tuple2('Vfr', '\uD835\uDD19'),
			_Utils_Tuple2('vfr', '\uD835\uDD33'),
			_Utils_Tuple2('vltri', '⊲'),
			_Utils_Tuple2('vnsub', '⊂⃒'),
			_Utils_Tuple2('vnsup', '⊃⃒'),
			_Utils_Tuple2('Vopf', '\uD835\uDD4D'),
			_Utils_Tuple2('vopf', '\uD835\uDD67'),
			_Utils_Tuple2('vprop', '∝'),
			_Utils_Tuple2('vrtri', '⊳'),
			_Utils_Tuple2('Vscr', '\uD835\uDCB1'),
			_Utils_Tuple2('vscr', '\uD835\uDCCB'),
			_Utils_Tuple2('vsubnE', '⫋︀'),
			_Utils_Tuple2('vsubne', '⊊︀'),
			_Utils_Tuple2('vsupnE', '⫌︀'),
			_Utils_Tuple2('vsupne', '⊋︀'),
			_Utils_Tuple2('Vvdash', '⊪'),
			_Utils_Tuple2('vzigzag', '⦚'),
			_Utils_Tuple2('Wcirc', 'Ŵ'),
			_Utils_Tuple2('wcirc', 'ŵ'),
			_Utils_Tuple2('wedbar', '⩟'),
			_Utils_Tuple2('wedge', '∧'),
			_Utils_Tuple2('Wedge', '⋀'),
			_Utils_Tuple2('wedgeq', '≙'),
			_Utils_Tuple2('weierp', '℘'),
			_Utils_Tuple2('Wfr', '\uD835\uDD1A'),
			_Utils_Tuple2('wfr', '\uD835\uDD34'),
			_Utils_Tuple2('Wopf', '\uD835\uDD4E'),
			_Utils_Tuple2('wopf', '\uD835\uDD68'),
			_Utils_Tuple2('wp', '℘'),
			_Utils_Tuple2('wr', '≀'),
			_Utils_Tuple2('wreath', '≀'),
			_Utils_Tuple2('Wscr', '\uD835\uDCB2'),
			_Utils_Tuple2('wscr', '\uD835\uDCCC'),
			_Utils_Tuple2('xcap', '⋂'),
			_Utils_Tuple2('xcirc', '◯'),
			_Utils_Tuple2('xcup', '⋃'),
			_Utils_Tuple2('xdtri', '▽'),
			_Utils_Tuple2('Xfr', '\uD835\uDD1B'),
			_Utils_Tuple2('xfr', '\uD835\uDD35'),
			_Utils_Tuple2('xharr', '⟷'),
			_Utils_Tuple2('xhArr', '⟺'),
			_Utils_Tuple2('Xi', 'Ξ'),
			_Utils_Tuple2('xi', 'ξ'),
			_Utils_Tuple2('xlarr', '⟵'),
			_Utils_Tuple2('xlArr', '⟸'),
			_Utils_Tuple2('xmap', '⟼'),
			_Utils_Tuple2('xnis', '⋻'),
			_Utils_Tuple2('xodot', '⨀'),
			_Utils_Tuple2('Xopf', '\uD835\uDD4F'),
			_Utils_Tuple2('xopf', '\uD835\uDD69'),
			_Utils_Tuple2('xoplus', '⨁'),
			_Utils_Tuple2('xotime', '⨂'),
			_Utils_Tuple2('xrarr', '⟶'),
			_Utils_Tuple2('xrArr', '⟹'),
			_Utils_Tuple2('Xscr', '\uD835\uDCB3'),
			_Utils_Tuple2('xscr', '\uD835\uDCCD'),
			_Utils_Tuple2('xsqcup', '⨆'),
			_Utils_Tuple2('xuplus', '⨄'),
			_Utils_Tuple2('xutri', '△'),
			_Utils_Tuple2('xvee', '⋁'),
			_Utils_Tuple2('xwedge', '⋀'),
			_Utils_Tuple2('Yacute', 'Ý'),
			_Utils_Tuple2('yacute', 'ý'),
			_Utils_Tuple2('YAcy', 'Я'),
			_Utils_Tuple2('yacy', 'я'),
			_Utils_Tuple2('Ycirc', 'Ŷ'),
			_Utils_Tuple2('ycirc', 'ŷ'),
			_Utils_Tuple2('Ycy', 'Ы'),
			_Utils_Tuple2('ycy', 'ы'),
			_Utils_Tuple2('yen', '¥'),
			_Utils_Tuple2('Yfr', '\uD835\uDD1C'),
			_Utils_Tuple2('yfr', '\uD835\uDD36'),
			_Utils_Tuple2('YIcy', 'Ї'),
			_Utils_Tuple2('yicy', 'ї'),
			_Utils_Tuple2('Yopf', '\uD835\uDD50'),
			_Utils_Tuple2('yopf', '\uD835\uDD6A'),
			_Utils_Tuple2('Yscr', '\uD835\uDCB4'),
			_Utils_Tuple2('yscr', '\uD835\uDCCE'),
			_Utils_Tuple2('YUcy', 'Ю'),
			_Utils_Tuple2('yucy', 'ю'),
			_Utils_Tuple2('yuml', 'ÿ'),
			_Utils_Tuple2('Yuml', 'Ÿ'),
			_Utils_Tuple2('Zacute', 'Ź'),
			_Utils_Tuple2('zacute', 'ź'),
			_Utils_Tuple2('Zcaron', 'Ž'),
			_Utils_Tuple2('zcaron', 'ž'),
			_Utils_Tuple2('Zcy', 'З'),
			_Utils_Tuple2('zcy', 'з'),
			_Utils_Tuple2('Zdot', 'Ż'),
			_Utils_Tuple2('zdot', 'ż'),
			_Utils_Tuple2('zeetrf', 'ℨ'),
			_Utils_Tuple2('ZeroWidthSpace', '\u200B'),
			_Utils_Tuple2('Zeta', 'Ζ'),
			_Utils_Tuple2('zeta', 'ζ'),
			_Utils_Tuple2('zfr', '\uD835\uDD37'),
			_Utils_Tuple2('Zfr', 'ℨ'),
			_Utils_Tuple2('ZHcy', 'Ж'),
			_Utils_Tuple2('zhcy', 'ж'),
			_Utils_Tuple2('zigrarr', '⇝'),
			_Utils_Tuple2('zopf', '\uD835\uDD6B'),
			_Utils_Tuple2('Zopf', 'ℤ'),
			_Utils_Tuple2('Zscr', '\uD835\uDCB5'),
			_Utils_Tuple2('zscr', '\uD835\uDCCF'),
			_Utils_Tuple2('zwj', '\u200D'),
			_Utils_Tuple2('zwnj', '\u200C')
		]));
var $hecrj$html_parser$Html$Parser$namedCharacterReference = A2(
	$elm$parser$Parser$map,
	function (reference) {
		return A2(
			$elm$core$Maybe$withDefault,
			'&' + (reference + ';'),
			A2($elm$core$Dict$get, reference, $hecrj$html_parser$Html$Parser$NamedCharacterReferences$dict));
	},
	$elm$parser$Parser$getChompedString(
		$hecrj$html_parser$Html$Parser$chompOneOrMore($elm$core$Char$isAlpha)));
var $elm$core$Char$fromCode = _Char_fromCode;
var $elm$core$Basics$pow = _Basics_pow;
var $rtfeldman$elm_hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return $elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char.valueOf()) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2($elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return $elm$core$Result$Err(
							$elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $rtfeldman$elm_hex$Hex$fromString = function (str) {
	if ($elm$core$String$isEmpty(str)) {
		return $elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2($elm$core$String$startsWith, '-', str)) {
				var list = A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					$elm$core$List$tail(
						$elm$core$String$toList(str)));
				return A2(
					$elm$core$Result$map,
					$elm$core$Basics$negate,
					A3(
						$rtfeldman$elm_hex$Hex$fromStringHelp,
						$elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					$rtfeldman$elm_hex$Hex$fromStringHelp,
					$elm$core$String$length(str) - 1,
					$elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2($elm$core$Result$mapError, formatError, result);
	}
};
var $elm$core$Char$isHexDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return ((48 <= code) && (code <= 57)) || (((65 <= code) && (code <= 70)) || ((97 <= code) && (code <= 102)));
};
var $hecrj$html_parser$Html$Parser$hexadecimal = A2(
	$elm$parser$Parser$andThen,
	function (hex) {
		var _v0 = $rtfeldman$elm_hex$Hex$fromString(
			$elm$core$String$toLower(hex));
		if (_v0.$ === 'Ok') {
			var value = _v0.a;
			return $elm$parser$Parser$succeed(value);
		} else {
			var error = _v0.a;
			return $elm$parser$Parser$problem(error);
		}
	},
	$elm$parser$Parser$getChompedString(
		$hecrj$html_parser$Html$Parser$chompOneOrMore($elm$core$Char$isHexDigit)));
var $elm$parser$Parser$ExpectingInt = {$: 'ExpectingInt'};
var $elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var $elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var $elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {col: s.col + (newOffset - s.offset), context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src};
	});
var $elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
var $elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
var $elm$parser$Parser$Advanced$consumeExp = F2(
	function (offset, src) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 101, offset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 69, offset, src)) {
			var eOffset = offset + 1;
			var expOffset = (A3($elm$parser$Parser$Advanced$isAsciiCode, 43, eOffset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 45, eOffset, src)) ? (eOffset + 1) : eOffset;
			var newOffset = A2($elm$parser$Parser$Advanced$chompBase10, expOffset, src);
			return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
		} else {
			return offset;
		}
	});
var $elm$parser$Parser$Advanced$consumeDotAndExp = F2(
	function (offset, src) {
		return A3($elm$parser$Parser$Advanced$isAsciiCode, 46, offset, src) ? A2(
			$elm$parser$Parser$Advanced$consumeExp,
			A2($elm$parser$Parser$Advanced$chompBase10, offset + 1, src),
			src) : A2($elm$parser$Parser$Advanced$consumeExp, offset, src);
	});
var $elm$parser$Parser$Advanced$finalizeInt = F5(
	function (invalid, handler, startOffset, _v0, s) {
		var endOffset = _v0.a;
		var n = _v0.b;
		if (handler.$ === 'Err') {
			var x = handler.a;
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.offset, startOffset) < 0,
				A2($elm$parser$Parser$Advanced$fromState, s, invalid)) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				toValue(n),
				A2($elm$parser$Parser$Advanced$bumpOffset, endOffset, s));
		}
	});
var $elm$parser$Parser$Advanced$finalizeFloat = F6(
	function (invalid, expecting, intSettings, floatSettings, intPair, s) {
		var intOffset = intPair.a;
		var floatOffset = A2($elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.src);
		if (floatOffset < 0) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A4($elm$parser$Parser$Advanced$fromInfo, s.row, s.col - (floatOffset + s.offset), invalid, s.context));
		} else {
			if (_Utils_eq(s.offset, floatOffset)) {
				return A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5($elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.offset, intPair, s);
				} else {
					if (floatSettings.$ === 'Err') {
						var x = floatSettings.a;
						return A2(
							$elm$parser$Parser$Advanced$Bad,
							true,
							A2($elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _v1 = $elm$core$String$toFloat(
							A3($elm$core$String$slice, s.offset, floatOffset, s.src));
						if (_v1.$ === 'Nothing') {
							return A2(
								$elm$parser$Parser$Advanced$Bad,
								true,
								A2($elm$parser$Parser$Advanced$fromState, s, invalid));
						} else {
							var n = _v1.a;
							return A3(
								$elm$parser$Parser$Advanced$Good,
								true,
								toValue(n),
								A2($elm$parser$Parser$Advanced$bumpOffset, floatOffset, s));
						}
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$number = function (c) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			if (A3($elm$parser$Parser$Advanced$isAsciiCode, 48, s.offset, s.src)) {
				var zeroOffset = s.offset + 1;
				var baseOffset = zeroOffset + 1;
				return A3($elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.src) ? A5(
					$elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.hex,
					baseOffset,
					A2($elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.src),
					s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.src) ? A5(
					$elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.octal,
					baseOffset,
					A3($elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.src),
					s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.src) ? A5(
					$elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.binary,
					baseOffset,
					A3($elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.src),
					s) : A6(
					$elm$parser$Parser$Advanced$finalizeFloat,
					c.invalid,
					c.expecting,
					c._int,
					c._float,
					_Utils_Tuple2(zeroOffset, 0),
					s)));
			} else {
				return A6(
					$elm$parser$Parser$Advanced$finalizeFloat,
					c.invalid,
					c.expecting,
					c._int,
					c._float,
					A3($elm$parser$Parser$Advanced$consumeBase, 10, s.offset, s.src),
					s);
			}
		});
};
var $elm$parser$Parser$Advanced$int = F2(
	function (expecting, invalid) {
		return $elm$parser$Parser$Advanced$number(
			{
				binary: $elm$core$Result$Err(invalid),
				expecting: expecting,
				_float: $elm$core$Result$Err(invalid),
				hex: $elm$core$Result$Err(invalid),
				_int: $elm$core$Result$Ok($elm$core$Basics$identity),
				invalid: invalid,
				octal: $elm$core$Result$Err(invalid)
			});
	});
var $elm$parser$Parser$int = A2($elm$parser$Parser$Advanced$int, $elm$parser$Parser$ExpectingInt, $elm$parser$Parser$ExpectingInt);
var $hecrj$html_parser$Html$Parser$numericCharacterReference = function () {
	var codepoint = $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$elm$parser$Parser$chompIf(
						function (c) {
							return _Utils_eq(
								c,
								_Utils_chr('x')) || _Utils_eq(
								c,
								_Utils_chr('X'));
						})),
				$hecrj$html_parser$Html$Parser$hexadecimal),
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$elm$parser$Parser$chompWhile(
						$elm$core$Basics$eq(
							_Utils_chr('0')))),
				$elm$parser$Parser$int)
			]));
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$elm$parser$Parser$chompIf(
				$elm$core$Basics$eq(
					_Utils_chr('#')))),
		A2(
			$elm$parser$Parser$map,
			A2($elm$core$Basics$composeR, $elm$core$Char$fromCode, $elm$core$String$fromChar),
			codepoint));
}();
var $hecrj$html_parser$Html$Parser$characterReference = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		$elm$parser$Parser$chompIf(
			$elm$core$Basics$eq(
				_Utils_chr('&')))),
	$elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$backtrackable($hecrj$html_parser$Html$Parser$namedCharacterReference),
				$hecrj$html_parser$Html$Parser$chompSemicolon),
				A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$backtrackable($hecrj$html_parser$Html$Parser$numericCharacterReference),
				$hecrj$html_parser$Html$Parser$chompSemicolon),
				$elm$parser$Parser$succeed('&')
			])));
var $hecrj$html_parser$Html$Parser$tagAttributeQuotedValue = function (quote) {
	var isQuotedValueChar = function (c) {
		return (!_Utils_eq(c, quote)) && (!_Utils_eq(
			c,
			_Utils_chr('&')));
	};
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$elm$parser$Parser$chompIf(
				$elm$core$Basics$eq(quote))),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$map,
				$elm$core$String$join(''),
				$hecrj$html_parser$Html$Parser$many(
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								$elm$parser$Parser$getChompedString(
								$hecrj$html_parser$Html$Parser$chompOneOrMore(isQuotedValueChar)),
								$hecrj$html_parser$Html$Parser$characterReference
							])))),
			$elm$parser$Parser$chompIf(
				$elm$core$Basics$eq(quote))));
};
var $hecrj$html_parser$Html$Parser$oneOrMore = F2(
	function (type_, parser_) {
		return A2(
			$elm$parser$Parser$loop,
			_List_Nil,
			function (list) {
				return $elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							A2(
							$elm$parser$Parser$map,
							function (_new) {
								return $elm$parser$Parser$Loop(
									A2($elm$core$List$cons, _new, list));
							},
							parser_),
							$elm$core$List$isEmpty(list) ? $elm$parser$Parser$problem('expecting at least one ' + type_) : $elm$parser$Parser$succeed(
							$elm$parser$Parser$Done(
								$elm$core$List$reverse(list)))
						]));
			});
	});
var $hecrj$html_parser$Html$Parser$tagAttributeUnquotedValue = function () {
	var isUnquotedValueChar = function (c) {
		return (!$hecrj$html_parser$Html$Parser$isSpaceCharacter(c)) && ((!_Utils_eq(
			c,
			_Utils_chr('\"'))) && ((!_Utils_eq(
			c,
			_Utils_chr('\''))) && ((!_Utils_eq(
			c,
			_Utils_chr('='))) && ((!_Utils_eq(
			c,
			_Utils_chr('<'))) && ((!_Utils_eq(
			c,
			_Utils_chr('>'))) && ((!_Utils_eq(
			c,
			_Utils_chr('`'))) && (!_Utils_eq(
			c,
			_Utils_chr('&')))))))));
	};
	return A2(
		$elm$parser$Parser$map,
		$elm$core$String$join(''),
		A2(
			$hecrj$html_parser$Html$Parser$oneOrMore,
			'attribute value',
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						$elm$parser$Parser$getChompedString(
						$hecrj$html_parser$Html$Parser$chompOneOrMore(isUnquotedValueChar)),
						$hecrj$html_parser$Html$Parser$characterReference
					]))));
}();
var $hecrj$html_parser$Html$Parser$tagAttributeValue = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$elm$parser$Parser$chompIf(
						$elm$core$Basics$eq(
							_Utils_chr('=')))),
				$elm$parser$Parser$chompWhile($hecrj$html_parser$Html$Parser$isSpaceCharacter)),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						$hecrj$html_parser$Html$Parser$tagAttributeUnquotedValue,
						$hecrj$html_parser$Html$Parser$tagAttributeQuotedValue(
						_Utils_chr('\"')),
						$hecrj$html_parser$Html$Parser$tagAttributeQuotedValue(
						_Utils_chr('\''))
					]))),
			$elm$parser$Parser$succeed('')
		]));
var $hecrj$html_parser$Html$Parser$tagAttribute = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($elm$core$Tuple$pair),
		A2(
			$elm$parser$Parser$ignorer,
			$hecrj$html_parser$Html$Parser$tagAttributeName,
			$elm$parser$Parser$chompWhile($hecrj$html_parser$Html$Parser$isSpaceCharacter))),
	A2(
		$elm$parser$Parser$ignorer,
		$hecrj$html_parser$Html$Parser$tagAttributeValue,
		$elm$parser$Parser$chompWhile($hecrj$html_parser$Html$Parser$isSpaceCharacter)));
var $hecrj$html_parser$Html$Parser$tagAttributes = $hecrj$html_parser$Html$Parser$many($hecrj$html_parser$Html$Parser$tagAttribute);
var $hecrj$html_parser$Html$Parser$tagName = A2(
	$elm$parser$Parser$map,
	$elm$core$String$toLower,
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$chompIf($elm$core$Char$isAlphaNum),
			$elm$parser$Parser$chompWhile(
				function (c) {
					return $elm$core$Char$isAlphaNum(c) || _Utils_eq(
						c,
						_Utils_chr('-'));
				}))));
var $hecrj$html_parser$Html$Parser$Text = function (a) {
	return {$: 'Text', a: a};
};
var $hecrj$html_parser$Html$Parser$text = A2(
	$elm$parser$Parser$map,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$String$join(''),
		$hecrj$html_parser$Html$Parser$Text),
	A2(
		$hecrj$html_parser$Html$Parser$oneOrMore,
		'text element',
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					$elm$parser$Parser$getChompedString(
					$hecrj$html_parser$Html$Parser$chompOneOrMore(
						function (c) {
							return (!_Utils_eq(
								c,
								_Utils_chr('<'))) && (!_Utils_eq(
								c,
								_Utils_chr('&')));
						})),
					$hecrj$html_parser$Html$Parser$characterReference
				]))));
function $hecrj$html_parser$Html$Parser$cyclic$node() {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$hecrj$html_parser$Html$Parser$text,
				$hecrj$html_parser$Html$Parser$comment,
				$hecrj$html_parser$Html$Parser$cyclic$element()
			]));
}
function $hecrj$html_parser$Html$Parser$cyclic$element() {
	return A2(
		$elm$parser$Parser$andThen,
		function (_v0) {
			var name = _v0.a;
			var attributes = _v0.b;
			return $hecrj$html_parser$Html$Parser$isVoidElement(name) ? A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A3($hecrj$html_parser$Html$Parser$Element, name, attributes, _List_Nil)),
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								$elm$parser$Parser$chompIf(
								$elm$core$Basics$eq(
									_Utils_chr('/'))),
								$elm$parser$Parser$succeed(_Utils_Tuple0)
							]))),
				$elm$parser$Parser$chompIf(
					$elm$core$Basics$eq(
						_Utils_chr('>')))) : A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A2($hecrj$html_parser$Html$Parser$Element, name, attributes)),
					$elm$parser$Parser$chompIf(
						$elm$core$Basics$eq(
							_Utils_chr('>')))),
				A2(
					$elm$parser$Parser$ignorer,
					$hecrj$html_parser$Html$Parser$many(
						$elm$parser$Parser$backtrackable(
							$hecrj$html_parser$Html$Parser$cyclic$node())),
					$hecrj$html_parser$Html$Parser$closingTag(name)));
		},
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Tuple$pair),
					$elm$parser$Parser$chompIf(
						$elm$core$Basics$eq(
							_Utils_chr('<')))),
				A2(
					$elm$parser$Parser$ignorer,
					$hecrj$html_parser$Html$Parser$tagName,
					$elm$parser$Parser$chompWhile($hecrj$html_parser$Html$Parser$isSpaceCharacter))),
			$hecrj$html_parser$Html$Parser$tagAttributes));
}
try {
	var $hecrj$html_parser$Html$Parser$node = $hecrj$html_parser$Html$Parser$cyclic$node();
	$hecrj$html_parser$Html$Parser$cyclic$node = function () {
		return $hecrj$html_parser$Html$Parser$node;
	};
	var $hecrj$html_parser$Html$Parser$element = $hecrj$html_parser$Html$Parser$cyclic$element();
	$hecrj$html_parser$Html$Parser$cyclic$element = function () {
		return $hecrj$html_parser$Html$Parser$element;
	};
} catch ($) {
	throw 'Some top-level definitions from `Html.Parser` are causing infinite recursion:\n\n  ┌─────┐\n  │    node\n  │     ↓\n  │    element\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $avh4$elm_program_test$ProgramTest$HtmlParserHacks$trimText = function (node) {
	switch (node.$) {
		case 'Text':
			var string = node.a;
			return $hecrj$html_parser$Html$Parser$Text(
				$elm$core$String$trim(string));
		case 'Element':
			var string = node.a;
			var list = node.b;
			var nodes = node.c;
			return A3(
				$hecrj$html_parser$Html$Parser$Element,
				string,
				list,
				A2(
					$elm$core$List$filter,
					$elm$core$Basics$neq(
						$hecrj$html_parser$Html$Parser$Text('')),
					A2($elm$core$List$map, $avh4$elm_program_test$ProgramTest$HtmlParserHacks$trimText, nodes)));
		default:
			var string = node.a;
			return $hecrj$html_parser$Html$Parser$Comment(string);
	}
};
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$trimmedHtml = A2(
	$elm$parser$Parser$ignorer,
	A2($elm$parser$Parser$map, $avh4$elm_program_test$ProgramTest$HtmlParserHacks$trimText, $hecrj$html_parser$Html$Parser$node),
	$elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$elm$parser$Parser$symbol('\n\n\n'),
				$elm$parser$Parser$end
			])));
var $avh4$elm_program_test$ProgramTest$TestHtmlParser$parser = $avh4$elm_program_test$ProgramTest$TestHtmlParser$parser_($avh4$elm_program_test$ProgramTest$TestHtmlParser$trimmedHtml);
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $avh4$elm_program_test$ProgramTest$TestHtmlHacks$parseFailureReport = function (string) {
	return A2(
		$elm$core$Result$mapError,
		$avh4$elm_program_test$Parser$Extra$deadEndsToString,
		A2($elm$parser$Parser$run, $avh4$elm_program_test$ProgramTest$TestHtmlParser$parser, string));
};
var $avh4$elm_program_test$ProgramTest$TestHtmlHacks$forceFailureReport = function (selectors) {
	return A3($avh4$elm_program_test$ProgramTest$TestHtmlHacks$forceFailureReport_, $avh4$elm_program_test$ProgramTest$TestHtmlHacks$parseFailureReport, selectors, 'ProgramTest.TestHtmlHacks is trying to force a failure to collect the error message %%');
};
var $avh4$elm_program_test$ProgramTest$HtmlHighlighter$Comment = function (a) {
	return {$: 'Comment', a: a};
};
var $avh4$elm_program_test$ProgramTest$HtmlHighlighter$Element = F3(
	function (a, b, c) {
		return {$: 'Element', a: a, b: b, c: c};
	});
var $avh4$elm_program_test$ProgramTest$HtmlHighlighter$Hidden = function (a) {
	return {$: 'Hidden', a: a};
};
var $avh4$elm_program_test$ProgramTest$HtmlHighlighter$Text = function (a) {
	return {$: 'Text', a: a};
};
var $avh4$elm_program_test$ProgramTest$HtmlHighlighter$CommentF = function (a) {
	return {$: 'CommentF', a: a};
};
var $avh4$elm_program_test$ProgramTest$HtmlHighlighter$ElementF = F3(
	function (a, b, c) {
		return {$: 'ElementF', a: a, b: b, c: c};
	});
var $avh4$elm_program_test$ProgramTest$HtmlHighlighter$TextF = function (a) {
	return {$: 'TextF', a: a};
};
var $avh4$elm_program_test$ProgramTest$HtmlHighlighter$foldWithOriginal = F2(
	function (f, node) {
		switch (node.$) {
			case 'Text':
				var text = node.a;
				return f(
					$avh4$elm_program_test$ProgramTest$HtmlHighlighter$TextF(text));
			case 'Element':
				var tag = node.a;
				var attrs = node.b;
				var children = node.c;
				return f(
					A3(
						$avh4$elm_program_test$ProgramTest$HtmlHighlighter$ElementF,
						tag,
						attrs,
						A2(
							$elm$core$List$map,
							function (child) {
								return _Utils_Tuple2(
									child,
									A2($avh4$elm_program_test$ProgramTest$HtmlHighlighter$foldWithOriginal, f, child));
							},
							children)));
			default:
				var string = node.a;
				return f(
					$avh4$elm_program_test$ProgramTest$HtmlHighlighter$CommentF(string));
		}
	});
var $avh4$elm_program_test$ProgramTest$HtmlHighlighter$isNonHiddenElement = function (node) {
	switch (node.$) {
		case 'Text':
			return false;
		case 'Element':
			return true;
		case 'Comment':
			return false;
		default:
			return false;
	}
};
var $avh4$elm_program_test$ProgramTest$HtmlHighlighter$truncate = F2(
	function (max, input) {
		return (_Utils_cmp(
			$elm$core$String$length(input),
			max - 3) < 0) ? input : (A2($elm$core$String$left, max - 3, input) + '...');
	});
var $avh4$elm_program_test$ProgramTest$HtmlHighlighter$highlight = function (predicate) {
	return $avh4$elm_program_test$ProgramTest$HtmlHighlighter$foldWithOriginal(
		function (node) {
			switch (node.$) {
				case 'TextF':
					var text = node.a;
					return $avh4$elm_program_test$ProgramTest$HtmlHighlighter$Text(text);
				case 'ElementF':
					var tag = node.a;
					var attrs = node.b;
					var children = node.c;
					var foldedChildren = A2($elm$core$List$map, $elm$core$Tuple$second, children);
					if (A3(
						predicate,
						tag,
						attrs,
						A2($elm$core$List$map, $elm$core$Tuple$first, children)) || A2($elm$core$List$any, $avh4$elm_program_test$ProgramTest$HtmlHighlighter$isNonHiddenElement, foldedChildren)) {
						return A3($avh4$elm_program_test$ProgramTest$HtmlHighlighter$Element, tag, attrs, foldedChildren);
					} else {
						var bestId = A2(
							$elm$core$Maybe$withDefault,
							'',
							A2(
								$elm$core$Maybe$map,
								function (_v2) {
									var name = _v2.a;
									var value = _v2.b;
									return ' ' + (name + ('=\"' + (value + '\"')));
								},
								$elm$core$List$head(
									A2(
										$elm$core$List$concatMap,
										$elm$core$Basics$identity,
										_List_fromArray(
											[
												A2(
												$elm$core$List$filter,
												A2(
													$elm$core$Basics$composeR,
													$elm$core$Tuple$first,
													$elm$core$Basics$eq('id')),
												attrs),
												A2(
												$elm$core$List$filter,
												A2(
													$elm$core$Basics$composeR,
													$elm$core$Tuple$first,
													$elm$core$Basics$eq('name')),
												attrs),
												A2(
												$elm$core$List$filter,
												A2(
													$elm$core$Basics$composeR,
													$elm$core$Tuple$first,
													$elm$core$Basics$eq('class')),
												attrs)
											])))));
						var bestContent = function () {
							if (!foldedChildren.b) {
								return '';
							} else {
								if ((foldedChildren.a.$ === 'Text') && (!foldedChildren.b.b)) {
									var single = foldedChildren.a.a;
									return A2(
										$avh4$elm_program_test$ProgramTest$HtmlHighlighter$truncate,
										15,
										$elm$core$String$trim(single));
								} else {
									return '...';
								}
							}
						}();
						return $avh4$elm_program_test$ProgramTest$HtmlHighlighter$Hidden('<' + (tag + (bestId + ('>' + (bestContent + ('</' + (tag + '>')))))));
					}
				default:
					var string = node.a;
					return $avh4$elm_program_test$ProgramTest$HtmlHighlighter$Comment(string);
			}
		});
};
var $avh4$elm_program_test$ProgramTest$TestHtmlHacks$pleaseReport = function (description) {
	return 'PLEASE REPORT THIS AT <https://github.com/avh4/elm-program-test/issues>: ' + description;
};
var $avh4$elm_program_test$ProgramTest$HtmlRenderer$renderAttr = function (_v0) {
	var name = _v0.a;
	var value = _v0.b;
	var _v1 = _Utils_Tuple2(name, value);
	_v1$0:
	while (true) {
		switch (_v1.b) {
			case 'true':
				if (_v1.a === 'htmlfor') {
					break _v1$0;
				} else {
					return name + '=true';
				}
			case 'false':
				if (_v1.a === 'htmlfor') {
					break _v1$0;
				} else {
					return name + '=false';
				}
			default:
				if (_v1.a === 'htmlfor') {
					break _v1$0;
				} else {
					return name + ('=\"' + (value + '\"'));
				}
		}
	}
	return 'for=\"' + (value + '\"');
};
var $avh4$elm_program_test$ProgramTest$HtmlRenderer$renderAttrs = function (attrs) {
	if (!attrs.b) {
		return '';
	} else {
		var some = attrs;
		return ' ' + A2(
			$elm$core$String$join,
			' ',
			A2($elm$core$List$map, $avh4$elm_program_test$ProgramTest$HtmlRenderer$renderAttr, some));
	}
};
var $avh4$elm_program_test$ProgramTest$HtmlRenderer$render = F3(
	function (colorHidden, indent, nodes) {
		render:
		while (true) {
			if (!nodes.b) {
				return '';
			} else {
				switch (nodes.a.$) {
					case 'Text':
						var text = nodes.a.a;
						var rest = nodes.b;
						var _v1 = $elm$core$String$trim(
							A3($elm$core$String$replace, '\n', ' ', text));
						if (_v1 === '') {
							var $temp$colorHidden = colorHidden,
								$temp$indent = indent,
								$temp$nodes = rest;
							colorHidden = $temp$colorHidden;
							indent = $temp$indent;
							nodes = $temp$nodes;
							continue render;
						} else {
							var trimmed = _v1;
							return A2($elm$core$String$repeat, indent, ' ') + (trimmed + ('\n' + A3($avh4$elm_program_test$ProgramTest$HtmlRenderer$render, colorHidden, indent, rest)));
						}
					case 'Comment':
						var text = nodes.a.a;
						var rest = nodes.b;
						return A2($elm$core$String$repeat, indent, ' ') + ('<!--' + (text + ('-->\n' + A3($avh4$elm_program_test$ProgramTest$HtmlRenderer$render, colorHidden, indent, rest))));
					case 'Element':
						if (!nodes.a.c.b) {
							var _v2 = nodes.a;
							var tag = _v2.a;
							var attrs = _v2.b;
							var rest = nodes.b;
							return A2($elm$core$String$repeat, indent, ' ') + ('<' + (tag + ($avh4$elm_program_test$ProgramTest$HtmlRenderer$renderAttrs(attrs) + ('></' + (tag + ('>\n' + A3($avh4$elm_program_test$ProgramTest$HtmlRenderer$render, colorHidden, indent, rest)))))));
						} else {
							var _v3 = nodes.a;
							var tag = _v3.a;
							var attrs = _v3.b;
							var children = _v3.c;
							var rest = nodes.b;
							return A2($elm$core$String$repeat, indent, ' ') + ('<' + (tag + ($avh4$elm_program_test$ProgramTest$HtmlRenderer$renderAttrs(attrs) + ('>\n' + (A3($avh4$elm_program_test$ProgramTest$HtmlRenderer$render, colorHidden, indent + 4, children) + (A2($elm$core$String$repeat, indent, ' ') + ('</' + (tag + ('>\n' + A3($avh4$elm_program_test$ProgramTest$HtmlRenderer$render, colorHidden, indent, rest))))))))));
						}
					default:
						var _short = nodes.a.a;
						var rest = nodes.b;
						return A2($elm$core$String$repeat, indent, ' ') + (colorHidden(_short) + ('\n' + A3($avh4$elm_program_test$ProgramTest$HtmlRenderer$render, colorHidden, indent, rest)));
				}
			}
		}
	});
var $avh4$elm_program_test$ProgramTest$TestHtmlHacks$renderHtml = F3(
	function (colorHidden, highlightPredicate, single) {
		var _v0 = A2($avh4$elm_program_test$ProgramTest$TestHtmlHacks$forceFailureReport, _List_Nil, single);
		if (_v0.$ === 'Ok') {
			if (_v0.a.$ === 'QueryFailure') {
				var _v1 = _v0.a;
				var node = _v1.a;
				var tryHighlight = A2($avh4$elm_program_test$ProgramTest$HtmlHighlighter$highlight, highlightPredicate, node);
				var finalHighlighted = $avh4$elm_program_test$ProgramTest$HtmlHighlighter$isNonHiddenElement(tryHighlight) ? tryHighlight : A2(
					$avh4$elm_program_test$ProgramTest$HtmlHighlighter$highlight,
					F3(
						function (_v2, _v3, _v4) {
							return true;
						}),
					node);
				return '▼ Query.fromHtml\n\n' + A3(
					$avh4$elm_program_test$ProgramTest$HtmlRenderer$render,
					colorHidden,
					4,
					_List_fromArray(
						[finalHighlighted]));
			} else {
				var _v5 = _v0.a;
				var name = _v5.a;
				return $avh4$elm_program_test$ProgramTest$TestHtmlHacks$pleaseReport('renderHtml: unexpected EventFailure: \"' + (name + '\"'));
			}
		} else {
			var err = _v0.a;
			return $avh4$elm_program_test$ProgramTest$TestHtmlHacks$pleaseReport('renderHtml: couldn\'t parse failure report: ' + err);
		}
	});
var $avh4$elm_program_test$ProgramTest$Failure$noColors = {bold: $elm$core$Basics$identity, dim: $elm$core$Basics$identity, green: $elm$core$Basics$identity, red: $elm$core$Basics$identity};
var $avh4$elm_program_test$ProgramTest$Failure$showColors = {
	bold: function (s) {
		return $elm$core$String$concat(
			_List_fromArray(
				['\u001B[1m', s, '\u001B[0m']));
	},
	dim: function (s) {
		return $elm$core$String$concat(
			_List_fromArray(
				['\u001B[2m', s, '\u001B[0m']));
	},
	green: function (s) {
		return $elm$core$String$concat(
			_List_fromArray(
				['\u001B[32m', s, '\u001B[0m']));
	},
	red: function (s) {
		return $elm$core$String$concat(
			_List_fromArray(
				['\u001B[31m', s, '\u001B[0m']));
	}
};
var $avh4$elm_program_test$ProgramTest$Failure$colorsFor = function (show) {
	return show ? $avh4$elm_program_test$ProgramTest$Failure$showColors : $avh4$elm_program_test$ProgramTest$Failure$noColors;
};
var $avh4$elm_program_test$ProgramTest$Failure$renderDescriptionResult = F2(
	function (colors, result) {
		if (result.$ === 'Ok') {
			var selector = result.a;
			return $elm$core$String$concat(
				_List_fromArray(
					[
						colors.green('✓'),
						' ',
						selector
					]));
		} else {
			var selector = result.a;
			return $elm$core$String$concat(
				_List_fromArray(
					[
						colors.red('✗'),
						' ',
						selector
					]));
		}
	});
var $avh4$elm_program_test$ProgramTest$Failure$renderSelectorResult = F2(
	function (colors, result) {
		if (result.$ === 'Ok') {
			var selector = result.a;
			return $elm$core$String$concat(
				_List_fromArray(
					[
						colors.green('✓'),
						' ',
						colors.bold(selector)
					]));
		} else {
			var selector = result.a;
			return colors.red(
				$elm$core$String$concat(
					_List_fromArray(
						['✗', ' ', selector])));
		}
	});
var $avh4$elm_program_test$ProgramTest$Failure$upToFirstErr = function (results) {
	var step = F2(
		function (acc, results_) {
			step:
			while (true) {
				if (!results_.b) {
					return acc;
				} else {
					if (results_.a.$ === 'Err') {
						var x = results_.a.a;
						return A2(
							$elm$core$List$cons,
							$elm$core$Result$Err(x),
							acc);
					} else {
						var a = results_.a.a;
						var rest = results_.b;
						var $temp$acc = A2(
							$elm$core$List$cons,
							$elm$core$Result$Ok(a),
							acc),
							$temp$results_ = rest;
						acc = $temp$acc;
						results_ = $temp$results_;
						continue step;
					}
				}
			}
		});
	return $elm$core$List$reverse(
		A2(step, _List_Nil, results));
};
var $avh4$elm_program_test$ProgramTest$Failure$renderSelectorResults = F3(
	function (indent, colors, results) {
		var indentS = A2($elm$core$String$repeat, indent, ' ');
		return A2(
			$elm$core$String$join,
			'\n',
			A2(
				$elm$core$List$map,
				A2(
					$elm$core$Basics$composeL,
					$elm$core$Basics$append(indentS),
					$avh4$elm_program_test$ProgramTest$Failure$renderSelectorResult(colors)),
				$avh4$elm_program_test$ProgramTest$Failure$upToFirstErr(results)));
	});
var $avh4$elm_program_test$ProgramTest$Failure$renderQueryFailureWithContext = F4(
	function (renderInner, indent, color, failure) {
		var indentS = A2($elm$core$String$repeat, indent, ' ');
		if (!failure.a.b) {
			var inner = failure.b;
			return A3(renderInner, indent, color, inner);
		} else {
			switch (failure.a.a.$) {
				case 'Description':
					var _v1 = failure.a;
					var description = _v1.a.a;
					var baseFailure = _v1.b;
					var inner = failure.b;
					return A2(
						$elm$core$String$join,
						'\n',
						A2(
							$elm$core$List$filter,
							$elm$core$Basics$neq(''),
							_List_fromArray(
								[
									indentS + (A2(
									$avh4$elm_program_test$ProgramTest$Failure$renderDescriptionResult,
									$avh4$elm_program_test$ProgramTest$Failure$colorsFor(color),
									description) + ':'),
									A4(
									$avh4$elm_program_test$ProgramTest$Failure$renderQueryFailureWithContext,
									renderInner,
									indent + 2,
									color,
									_Utils_Tuple2(baseFailure, inner))
								])));
				case 'CheckSucceeded':
					var _v2 = failure.a;
					var _v3 = _v2.a;
					var description = _v3.a;
					var checkContext = _v3.b;
					var baseFailure = _v2.b;
					var inner = failure.b;
					return A2(
						$elm$core$String$join,
						'\n',
						A2(
							$elm$core$List$filter,
							$elm$core$Basics$neq(''),
							_List_fromArray(
								[
									indentS + (A2(
									$avh4$elm_program_test$ProgramTest$Failure$renderDescriptionResult,
									$avh4$elm_program_test$ProgramTest$Failure$colorsFor(color),
									$elm$core$Result$Ok(description)) + ':'),
									A4(
									$avh4$elm_program_test$ProgramTest$Failure$cyclic$renderQueryFailureWithContext_(),
									F3(
										function (_v4, _v5, _v6) {
											return '';
										}),
									indent + 2,
									color,
									_Utils_Tuple2(checkContext, _Utils_Tuple0)),
									A4(
									$avh4$elm_program_test$ProgramTest$Failure$renderQueryFailureWithContext,
									renderInner,
									indent,
									color,
									_Utils_Tuple2(baseFailure, inner))
								])));
				default:
					if (failure.a.a.a.$ === 'Just') {
						var _v7 = failure.a;
						var _v8 = _v7.a;
						var description = _v8.a.a;
						var successfulChecks = _v8.b;
						var baseFailure = _v7.b;
						var inner = failure.b;
						return A2(
							$elm$core$String$join,
							'\n',
							A2(
								$elm$core$List$filter,
								$elm$core$Basics$neq(''),
								_List_fromArray(
									[
										indentS + (A2(
										$avh4$elm_program_test$ProgramTest$Failure$renderDescriptionResult,
										$avh4$elm_program_test$ProgramTest$Failure$colorsFor(color),
										$elm$core$Result$Ok(description)) + ':'),
										A3(
										$avh4$elm_program_test$ProgramTest$Failure$renderSelectorResults,
										indent + 2,
										$avh4$elm_program_test$ProgramTest$Failure$colorsFor(color),
										A2(
											$elm$core$List$map,
											$elm$core$Result$Ok,
											successfulChecks(_Utils_Tuple0))),
										A4(
										$avh4$elm_program_test$ProgramTest$Failure$renderQueryFailureWithContext,
										renderInner,
										indent,
										color,
										_Utils_Tuple2(baseFailure, inner))
									])));
					} else {
						var _v9 = failure.a;
						var _v10 = _v9.a;
						var _v11 = _v10.a;
						var successfulChecks = _v10.b;
						var baseFailure = _v9.b;
						var inner = failure.b;
						return A2(
							$elm$core$String$join,
							'\n',
							A2(
								$elm$core$List$filter,
								$elm$core$Basics$neq(''),
								_List_fromArray(
									[
										A3(
										$avh4$elm_program_test$ProgramTest$Failure$renderSelectorResults,
										indent,
										$avh4$elm_program_test$ProgramTest$Failure$colorsFor(color),
										A2(
											$elm$core$List$map,
											$elm$core$Result$Ok,
											successfulChecks(_Utils_Tuple0))),
										A4(
										$avh4$elm_program_test$ProgramTest$Failure$renderQueryFailureWithContext,
										renderInner,
										indent,
										color,
										_Utils_Tuple2(baseFailure, inner))
									])));
					}
			}
		}
	});
function $avh4$elm_program_test$ProgramTest$Failure$cyclic$renderQueryFailureWithContext_() {
	return $avh4$elm_program_test$ProgramTest$Failure$renderQueryFailureWithContext;
}
try {
	var $avh4$elm_program_test$ProgramTest$Failure$renderQueryFailureWithContext_ = $avh4$elm_program_test$ProgramTest$Failure$cyclic$renderQueryFailureWithContext_();
	$avh4$elm_program_test$ProgramTest$Failure$cyclic$renderQueryFailureWithContext_ = function () {
		return $avh4$elm_program_test$ProgramTest$Failure$renderQueryFailureWithContext_;
	};
} catch ($) {
	throw 'Some top-level definitions from `ProgramTest.Failure` are causing infinite recursion:\n\n  ┌─────┐\n  │    renderQueryFailureWithContext_\n  │     ↓\n  │    renderQueryFailureWithContext\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $avh4$elm_program_test$ProgramTest$Failure$renderQueryFailure = F3(
	function (indent, color, failure) {
		var indentS = A2($elm$core$String$repeat, indent, ' ');
		switch (failure.$) {
			case 'QueryFailed':
				var failureReason = failure.a;
				return A3(
					$avh4$elm_program_test$ProgramTest$Failure$renderSelectorResults,
					indent,
					$avh4$elm_program_test$ProgramTest$Failure$colorsFor(color),
					failureReason);
			case 'SimulateFailed':
				var string = failure.a;
				var colors = $avh4$elm_program_test$ProgramTest$Failure$colorsFor(color);
				return _Utils_ap(
					indentS,
					A2(
						$avh4$elm_program_test$ProgramTest$Failure$renderSelectorResult,
						colors,
						$elm$core$Result$Err(string)));
			case 'NoMatches':
				var description = failure.a;
				var options = failure.b;
				var sortedByPriority = A2(
					$elm$core$List$sortBy,
					function (_v4) {
						var prio = _v4.b;
						return -prio;
					},
					options);
				var maxPriority = A2(
					$elm$core$Maybe$withDefault,
					0,
					A2(
						$elm$core$Maybe$map,
						function (_v3) {
							var prio = _v3.b;
							return prio;
						},
						$elm$core$List$head(sortedByPriority)));
				return A2(
					$elm$core$String$join,
					'\n',
					$elm$core$List$concat(
						_List_fromArray(
							[
								_List_fromArray(
								[indentS + (description + ':')]),
								A2(
								$elm$core$List$map,
								function (_v2) {
									var desc = _v2.a;
									var prio = _v2.b;
									var reason = _v2.c;
									return indentS + ('- ' + (desc + ('\n' + A4(
										$avh4$elm_program_test$ProgramTest$Failure$renderQueryFailureWithContext,
										$avh4$elm_program_test$ProgramTest$Failure$renderQueryFailure,
										indent + 4,
										color && (_Utils_cmp(prio, maxPriority - 1) > -1),
										reason))));
								},
								A2(
									$elm$core$List$filter,
									function (_v1) {
										var prio = _v1.b;
										return _Utils_cmp(prio, maxPriority - 2) > 0;
									},
									sortedByPriority))
							])));
			default:
				var description = failure.a;
				var matches = failure.b;
				return A2(
					$elm$core$String$join,
					'\n',
					$elm$core$List$concat(
						_List_fromArray(
							[
								_List_fromArray(
								[indentS + (description + ', but there were multiple successful matches:')]),
								A2(
								$elm$core$List$map,
								function (_v6) {
									var desc = _v6.a;
									var todo = _v6.c;
									return indentS + ('- ' + desc);
								},
								A2(
									$elm$core$List$sortBy,
									function (_v5) {
										var prio = _v5.b;
										return -prio;
									},
									matches)),
								_List_fromArray(
								['', 'If that\'s what you intended, use `ProgramTest.within` to focus in on a portion of', 'the view that contains only one of the matches.'])
							])));
		}
	});
var $avh4$elm_program_test$ProgramTest$Failure$toString = function (failure) {
	switch (failure.$) {
		case 'ChangedPage':
			var cause = failure.a;
			var finalLocation = failure.b;
			return cause + (' caused the program to end by navigating to ' + ($avh4$elm_program_test$String$Extra$escape(
				$elm$url$Url$toString(finalLocation)) + '.  NOTE: If this is what you intended, use ProgramTest.expectPageChange to end your test.'));
		case 'ExpectFailed':
			var expectationName = failure.a;
			var description = failure.b;
			var reason = failure.c;
			return expectationName + (':\n' + A3($avh4$elm_program_test$Vendored$Failure$format, $avh4$elm_program_test$Vendored$FormatMonochrome$formatEquality, description, reason));
		case 'SimulateFailed':
			var functionName = failure.a;
			var message = failure.b;
			return functionName + (':\n' + message);
		case 'SimulateFailedToFindTarget':
			var functionName = failure.a;
			var message = failure.b;
			return functionName + (':\n' + message);
		case 'SimulateLastEffectFailed':
			var message = failure.a;
			return 'simulateLastEffect failed: ' + message;
		case 'InvalidLocationUrl':
			var functionName = failure.a;
			var invalidUrl = failure.b;
			return functionName + (': ' + ('Not a valid absolute URL:\n' + $avh4$elm_program_test$String$Extra$escape(invalidUrl)));
		case 'InvalidFlags':
			var functionName = failure.a;
			var message = failure.b;
			return functionName + (':\n' + message);
		case 'ProgramDoesNotSupportNavigation':
			var functionName = failure.a;
			return functionName + ': Program does not support navigation.  Use ProgramTest.createApplication to create a ProgramTest that supports navigation.';
		case 'NoBaseUrl':
			var functionName = failure.a;
			var relativeUrl = failure.b;
			return functionName + (': The ProgramTest does not have a base URL and cannot resolve the relative URL ' + ($avh4$elm_program_test$String$Extra$escape(relativeUrl) + '.  Use ProgramTest.withBaseUrl before calling ProgramTest.start to create a ProgramTest that can resolve relative URLs.'));
		case 'NoMatchingHttpRequest':
			var expected = failure.a;
			var actual = failure.b;
			var functionName = failure.c;
			var request = failure.d;
			var pendingRequests = failure.e;
			return $elm$core$String$concat(
				_List_fromArray(
					[
						functionName,
						': ',
						'Expected ',
						function () {
						if (expected === 1) {
							return 'HTTP request';
						} else {
							return 'at least ' + ($elm$core$String$fromInt(expected) + ' HTTP requests');
						}
					}(),
						' (',
						request.method,
						' ',
						request.url,
						') to have been made and still be pending, ',
						function () {
						if (!actual) {
							return 'but no such requests were made.';
						} else {
							return 'but only ' + ($elm$core$String$fromInt(actual) + ' such requests were made.');
						}
					}(),
						'\n',
						function () {
						if (!pendingRequests.b) {
							return '    No requests were made.';
						} else {
							return $elm$core$String$concat(
								_List_fromArray(
									[
										'    The following requests were made:\n',
										A2(
										$elm$core$String$join,
										'\n',
										A2(
											$elm$core$List$map,
											function (_v4) {
												var method = _v4.a;
												var url = _v4.b;
												return '      - ' + (method + (' ' + url));
											},
											pendingRequests))
									]));
						}
					}()
					]));
		case 'MultipleMatchingHttpRequest':
			var expected = failure.a;
			var actual = failure.b;
			var functionName = failure.c;
			var request = failure.d;
			var pendingRequests = failure.e;
			return $elm$core$String$concat(
				_List_fromArray(
					[
						functionName,
						': ',
						'Expected ',
						function () {
						if (expected === 1) {
							return 'a single HTTP request';
						} else {
							return $elm$core$String$fromInt(expected) + ' HTTP requests';
						}
					}(),
						' (',
						request.method,
						' ',
						request.url,
						') to have been made, but ',
						$elm$core$String$fromInt(actual),
						' such requests were made.\n',
						function () {
						if (!pendingRequests.b) {
							return '    No requests were made.';
						} else {
							return $elm$core$String$concat(
								_List_fromArray(
									[
										'    The following requests were made:\n',
										A2(
										$elm$core$String$join,
										'\n',
										A2(
											$elm$core$List$map,
											function (_v7) {
												var method = _v7.a;
												var url = _v7.b;
												return '      - ' + (method + (' ' + url));
											},
											pendingRequests))
									]));
						}
					}(),
						function () {
						if ((expected === 1) && (actual > 1)) {
							var useInstead = A2($elm$core$String$startsWith, 'simulate', functionName) ? 'simulateHttpResponseAdvanced' : (A2($elm$core$String$startsWith, 'expect', functionName) ? 'expectHttpRequests' : 'ensureHttpRequests');
							return '\n\nNOTE: If you want to allow multiple requests to the same endpoint, use ProgramTest.' + (useInstead + '.');
						} else {
							return '';
						}
					}()
					]));
		case 'EffectSimulationNotConfigured':
			var functionName = failure.a;
			return 'TEST SETUP ERROR: In order to use ' + (functionName + ', you MUST use ProgramTest.withSimulatedEffects before calling ProgramTest.start');
		case 'ViewAssertionFailed':
			var functionName = failure.a;
			var html = failure.b;
			var highlight = failure.c;
			var reason = failure.d;
			var highlighter = $elm$core$Set$isEmpty(highlight) ? F3(
				function (_v8, _v9, _v10) {
					return true;
				}) : F3(
				function (tag, attrs, children) {
					return A2($elm$core$Set$member, tag, highlight);
				});
			return A2(
				$elm$core$String$join,
				'\n',
				_List_fromArray(
					[
						A3(
						$avh4$elm_program_test$ProgramTest$TestHtmlHacks$renderHtml,
						$avh4$elm_program_test$ProgramTest$Failure$showColors.dim,
						highlighter,
						$elm_explorations$test$Test$Html$Query$fromHtml(html)),
						'',
						'▼ ' + functionName,
						'',
						A4($avh4$elm_program_test$ProgramTest$Failure$renderQueryFailureWithContext, $avh4$elm_program_test$ProgramTest$Failure$renderQueryFailure, 0, true, reason)
					]));
		default:
			var assertionName = failure.a;
			var message = failure.b;
			return assertionName + (': ' + message);
	}
};
var $avh4$elm_program_test$ProgramTest$done = function (programTest) {
	var _v0 = $avh4$elm_program_test$ProgramTest$toFailure(programTest);
	if (_v0.$ === 'Nothing') {
		return $elm_explorations$test$Expect$pass;
	} else {
		var failure = _v0.a;
		return $elm_explorations$test$Expect$fail(
			$avh4$elm_program_test$ProgramTest$Failure$toString(failure));
	}
};
var $avh4$elm_program_test$ProgramTest$expectView = function (assertion) {
	return A2(
		$elm$core$Basics$composeR,
		$avh4$elm_program_test$ProgramTest$andThen(
			A2($avh4$elm_program_test$ProgramTest$expectViewHelper, 'expectView', assertion)),
		$avh4$elm_program_test$ProgramTest$done);
};
var $elm_explorations$test$Test$Html$Query$Internal$Find = function (a) {
	return {$: 'Find', a: a};
};
var $elm_explorations$test$Test$Html$Query$Internal$prependSelector = F2(
	function (query, selector) {
		if (query.$ === 'Query') {
			var node = query.a;
			var selectors = query.b;
			return A2(
				$elm_explorations$test$Test$Html$Query$Internal$Query,
				node,
				A2($elm$core$List$cons, selector, selectors));
		} else {
			var message = query.a;
			return $elm_explorations$test$Test$Html$Query$Internal$InternalError(message);
		}
	});
var $elm_explorations$test$Test$Html$Query$find = F2(
	function (selectors, _v0) {
		var showTrace = _v0.a;
		var query = _v0.b;
		return A2(
			$elm_explorations$test$Test$Html$Query$Internal$Single,
			showTrace,
			A2(
				$elm_explorations$test$Test$Html$Query$Internal$prependSelector,
				query,
				$elm_explorations$test$Test$Html$Query$Internal$Find(selectors)));
	});
var $avh4$elm_program_test$ProgramTest$Failure$SimulateFailed = F2(
	function (a, b) {
		return {$: 'SimulateFailed', a: a, b: b};
	});
var $avh4$elm_program_test$ProgramTest$Failure$SimulateFailedToFindTarget = F2(
	function (a, b) {
		return {$: 'SimulateFailedToFindTarget', a: a, b: b};
	});
var $elm_explorations$test$Test$Html$Event$Event = F2(
	function (a, b) {
		return {$: 'Event', a: a, b: b};
	});
var $elm_explorations$test$Test$Html$Event$simulate = $elm_explorations$test$Test$Html$Event$Event;
var $elm_explorations$test$Test$Html$Event$eventPayload = function (_v0) {
	var _v1 = _v0.a;
	var payload = _v1.b;
	return payload;
};
var $elm_explorations$test$Test$Html$Event$Handling = F3(
	function (message, stopPropagation, preventDefault) {
		return {message: message, preventDefault: preventDefault, stopPropagation: stopPropagation};
	});
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (maybe.$ === 'Just') {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $elm_explorations$test$Test$Html$Event$findEvent = F2(
	function (eventName, element) {
		var handlerToDecoder = function (handler) {
			switch (handler.$) {
				case 'Normal':
					var decoder = handler.a;
					return A2(
						$elm$json$Json$Decode$map,
						function (msg) {
							return A3($elm_explorations$test$Test$Html$Event$Handling, msg, false, false);
						},
						decoder);
				case 'MayStopPropagation':
					var decoder = handler.a;
					return A2(
						$elm$json$Json$Decode$map,
						function (_v2) {
							var msg = _v2.a;
							var sp = _v2.b;
							return A3($elm_explorations$test$Test$Html$Event$Handling, msg, sp, false);
						},
						decoder);
				case 'MayPreventDefault':
					var decoder = handler.a;
					return A2(
						$elm$json$Json$Decode$map,
						function (_v3) {
							var msg = _v3.a;
							var pd = _v3.b;
							return A3($elm_explorations$test$Test$Html$Event$Handling, msg, false, pd);
						},
						decoder);
				default:
					var decoder = handler.a;
					return decoder;
			}
		};
		var elementOutput = $elm_explorations$test$Test$Html$Query$Internal$prettyPrint(element);
		var eventDecoder = function (node) {
			return A2(
				$elm$core$Result$fromMaybe,
				'Event.expectEvent: I found a node, but it does not listen for \"' + (eventName + ('\" events like I expected it would.\n\n' + elementOutput)),
				A2(
					$elm$core$Maybe$map,
					handlerToDecoder,
					A2($elm$core$Dict$get, eventName, node.facts.events)));
		};
		switch (element.$) {
			case 'TextTag':
				return $elm$core$Result$Err('I found a text node instead of an element. Text nodes do not receive events, so it would be impossible to simulate \"' + (eventName + ('\" events on it. The text in the node was: \"' + (elementOutput + '\"'))));
			case 'NodeEntry':
				var node = element.a;
				return eventDecoder(node);
			case 'CustomNode':
				var node = element.a;
				return eventDecoder(node);
			default:
				var node = element.a;
				return eventDecoder(node);
		}
	});
var $elm_explorations$test$Test$Html$Event$findHandler = function (_v0) {
	var _v1 = _v0.a;
	var eventName = _v1.a;
	var _v2 = _v0.b;
	var query = _v2.b;
	return A2(
		$elm$core$Result$andThen,
		$elm_explorations$test$Test$Html$Event$findEvent(eventName),
		A2(
			$elm$core$Result$mapError,
			$elm_explorations$test$Test$Html$Query$Internal$queryErrorToString,
			A2(
				$elm$core$Result$andThen,
				$elm_explorations$test$Test$Html$Query$Internal$verifySingle(eventName),
				$elm_explorations$test$Test$Html$Query$Internal$traverse(query))));
};
var $elm_explorations$test$Test$Html$Event$toResult = function (event) {
	return A2(
		$elm$core$Result$andThen,
		function (handler) {
			return A2(
				$elm$core$Result$mapError,
				$elm$json$Json$Decode$errorToString,
				A2(
					$elm$json$Json$Decode$decodeValue,
					handler,
					$elm_explorations$test$Test$Html$Event$eventPayload(event)));
		},
		A2(
			$elm$core$Result$map,
			$elm$json$Json$Decode$map(
				function ($) {
					return $.message;
				}),
			$elm_explorations$test$Test$Html$Event$findHandler(event)));
};
var $avh4$elm_program_test$ProgramTest$simulateHelper = F5(
	function (functionDescription, findTarget, event, program, state) {
		var targetQuery = findTarget(
			A2($avh4$elm_program_test$ProgramTest$Program$renderView, program, state.currentModel));
		var _v0 = $elm_explorations$test$Test$Runner$getFailureReason(
			A2($elm_explorations$test$Test$Html$Query$has, _List_Nil, targetQuery));
		if (_v0.$ === 'Just') {
			var reason = _v0.a;
			return $elm$core$Result$Err(
				A2($avh4$elm_program_test$ProgramTest$Failure$SimulateFailedToFindTarget, functionDescription, reason.description));
		} else {
			var _v1 = $elm_explorations$test$Test$Html$Event$toResult(
				A2($elm_explorations$test$Test$Html$Event$simulate, event, targetQuery));
			if (_v1.$ === 'Err') {
				var message = _v1.a;
				return $elm$core$Result$Err(
					A2($avh4$elm_program_test$ProgramTest$Failure$SimulateFailed, functionDescription, message));
			} else {
				var msg = _v1.a;
				return A3($avh4$elm_program_test$TestState$update, msg, program, state);
			}
		}
	});
var $avh4$elm_program_test$ProgramTest$simulateDomEvent = F2(
	function (findTarget, _v0) {
		var eventName = _v0.a;
		var eventValue = _v0.b;
		return $avh4$elm_program_test$ProgramTest$andThen(
			A3(
				$avh4$elm_program_test$ProgramTest$simulateHelper,
				'simulateDomEvent ' + $avh4$elm_program_test$String$Extra$escape(eventName),
				findTarget,
				_Utils_Tuple2(eventName, eventValue)));
	});
var $author$project$MainTests$checkConfigChangeEffect = F4(
	function (selector, event, preCond, postCond) {
		return A2(
			$avh4$elm_program_test$ProgramTest$expectView,
			A2(
				$elm$core$Basics$composeR,
				$elm_explorations$test$Test$Html$Query$find(selector),
				postCond),
			A3(
				$avh4$elm_program_test$ProgramTest$simulateDomEvent,
				$elm_explorations$test$Test$Html$Query$find(selector),
				event,
				A2(
					$avh4$elm_program_test$ProgramTest$ensureView,
					A2(
						$elm$core$Basics$composeR,
						$elm_explorations$test$Test$Html$Query$find(selector),
						preCond),
					$author$project$SimulatedEffect$fromLoadedState)));
	});
var $elm_explorations$test$Test$Html$Selector$checked = $elm_explorations$test$Test$Html$Selector$Internal$namedBoolAttr('checked');
var $elm_explorations$test$Test$Html$Query$Internal$Children = function (a) {
	return {$: 'Children', a: a};
};
var $elm_explorations$test$Test$Html$Query$Internal$Multiple = F2(
	function (a, b) {
		return {$: 'Multiple', a: a, b: b};
	});
var $elm_explorations$test$Test$Html$Query$children = F2(
	function (selectors, _v0) {
		var showTrace = _v0.a;
		var query = _v0.b;
		return A2(
			$elm_explorations$test$Test$Html$Query$Internal$Multiple,
			showTrace,
			A2(
				$elm_explorations$test$Test$Html$Query$Internal$prependSelector,
				query,
				$elm_explorations$test$Test$Html$Query$Internal$Children(selectors)));
	});
var $elm_explorations$test$Test$Html$Query$Internal$multipleToExpectation = F2(
	function (_v0, check) {
		var query = _v0.b;
		var _v1 = $elm_explorations$test$Test$Html$Query$Internal$traverse(query);
		if (_v1.$ === 'Ok') {
			var list = _v1.a;
			return check(list);
		} else {
			var error = _v1.a;
			return $elm_explorations$test$Expect$fail(
				$elm_explorations$test$Test$Html$Query$Internal$queryErrorToString(error));
		}
	});
var $elm_explorations$test$Test$Html$Query$count = F2(
	function (expect, multiple) {
		var showTrace = multiple.a;
		var query = multiple.b;
		return A2(
			$elm_explorations$test$Test$Html$Query$Internal$multipleToExpectation,
			multiple,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$List$length,
				A2(
					$elm$core$Basics$composeR,
					expect,
					A3($elm_explorations$test$Test$Html$Query$Internal$failWithQuery, showTrace, 'Query.count', query))));
	});
var $elm_explorations$test$Test$Html$Event$input = function (value) {
	return _Utils_Tuple2(
		'input',
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'target',
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'value',
								$elm$json$Json$Encode$string(value))
							])))
				])));
};
var $elm_explorations$test$Test$Html$Selector$selected = $elm_explorations$test$Test$Html$Selector$Internal$namedBoolAttr('selected');
var $author$project$MainTests$suite = A2(
	$elm_explorations$test$Test$describe,
	'module Main',
	_List_fromArray(
		[
			A2(
			$elm_explorations$test$Test$describe,
			'Main.update handles config update message',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'The ConfigChange message is sent when the \"Show job posts\" checkbox is clicked',
					function (_v0) {
						return A4(
							$author$project$MainTests$checkConfigChangeEffect,
							_List_fromArray(
								[
									$elm_explorations$test$Test$Html$Selector$tag('input'),
									$elm_explorations$test$Test$Html$Selector$attribute(
									$elm$html$Html$Attributes$type_('checkbox')),
									$elm_explorations$test$Test$Html$Selector$id('checkbox-show-job-posts')
								]),
							$elm_explorations$test$Test$Html$Event$check(true),
							$elm_explorations$test$Test$Html$Query$has(
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Selector$checked(false)
									])),
							$elm_explorations$test$Test$Html$Query$has(
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Selector$checked(true)
									])));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'The ConfigChange message is sent when the \"Show text only posts\" checkbox is clicked',
					function (_v1) {
						return A4(
							$author$project$MainTests$checkConfigChangeEffect,
							_List_fromArray(
								[
									$elm_explorations$test$Test$Html$Selector$tag('input'),
									$elm_explorations$test$Test$Html$Selector$attribute(
									$elm$html$Html$Attributes$type_('checkbox')),
									$elm_explorations$test$Test$Html$Selector$id('checkbox-show-text-only-posts')
								]),
							$elm_explorations$test$Test$Html$Event$check(false),
							$elm_explorations$test$Test$Html$Query$has(
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Selector$checked(true)
									])),
							$elm_explorations$test$Test$Html$Query$has(
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Selector$checked(false)
									])));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'The ConfigChange message is sent when the \"Posts to show\" select is changed',
					function (_v2) {
						return A4(
							$author$project$MainTests$checkConfigChangeEffect,
							_List_fromArray(
								[
									$elm_explorations$test$Test$Html$Selector$tag('select'),
									$elm_explorations$test$Test$Html$Selector$id('select-posts-per-page')
								]),
							$elm_explorations$test$Test$Html$Event$input('50'),
							$elm_explorations$test$Expect$all(
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Query$has(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$tag('option'),
												$elm_explorations$test$Test$Html$Selector$attribute(
												$elm$html$Html$Attributes$value('10')),
												$elm_explorations$test$Test$Html$Selector$selected(true)
											])),
										$elm_explorations$test$Test$Html$Query$has(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$tag('option'),
												$elm_explorations$test$Test$Html$Selector$attribute(
												$elm$html$Html$Attributes$value('50')),
												$elm_explorations$test$Test$Html$Selector$selected(false)
											]))
									])),
							$elm_explorations$test$Expect$all(
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Query$has(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$tag('option'),
												$elm_explorations$test$Test$Html$Selector$attribute(
												$elm$html$Html$Attributes$value('50')),
												$elm_explorations$test$Test$Html$Selector$selected(true)
											])),
										$elm_explorations$test$Test$Html$Query$has(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$tag('option'),
												$elm_explorations$test$Test$Html$Selector$attribute(
												$elm$html$Html$Attributes$value('10')),
												$elm_explorations$test$Test$Html$Selector$selected(false)
											]))
									])));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'The ConfigChange message is sent when the \"Sort by\" select is changed',
					function (_v3) {
						return A4(
							$author$project$MainTests$checkConfigChangeEffect,
							_List_fromArray(
								[
									$elm_explorations$test$Test$Html$Selector$tag('select'),
									$elm_explorations$test$Test$Html$Selector$id('select-sort-by')
								]),
							$elm_explorations$test$Test$Html$Event$input('Title'),
							$elm_explorations$test$Expect$all(
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Query$has(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$tag('option'),
												$elm_explorations$test$Test$Html$Selector$attribute(
												$elm$html$Html$Attributes$value('None')),
												$elm_explorations$test$Test$Html$Selector$selected(true)
											])),
										A2(
										$elm$core$Basics$composeR,
										$elm_explorations$test$Test$Html$Query$children(
											_List_fromArray(
												[
													$elm_explorations$test$Test$Html$Selector$tag('option'),
													$elm_explorations$test$Test$Html$Selector$selected(true)
												])),
										$elm_explorations$test$Test$Html$Query$count(
											$elm_explorations$test$Expect$equal(1)))
									])),
							$elm_explorations$test$Expect$all(
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Query$has(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$tag('option'),
												$elm_explorations$test$Test$Html$Selector$attribute(
												$elm$html$Html$Attributes$value('Title')),
												$elm_explorations$test$Test$Html$Selector$selected(true)
											])),
										A2(
										$elm$core$Basics$composeR,
										$elm_explorations$test$Test$Html$Query$children(
											_List_fromArray(
												[
													$elm_explorations$test$Test$Html$Selector$tag('option'),
													$elm_explorations$test$Test$Html$Selector$selected(true)
												])),
										$elm_explorations$test$Test$Html$Query$count(
											$elm_explorations$test$Expect$equal(1)))
									])));
					})
				]))
		]));
var $elm_explorations$test$Test$Runner$Failure$Comparison = F2(
	function (a, b) {
		return {$: 'Comparison', a: a, b: b};
	});
var $elm_explorations$test$Expect$err = function (result) {
	if (result.$ === 'Ok') {
		return $elm_explorations$test$Test$Expectation$fail(
			{
				description: 'Expect.err',
				reason: A2(
					$elm_explorations$test$Test$Runner$Failure$Comparison,
					'Err _',
					$elm_explorations$test$Test$Internal$toString(result))
			});
	} else {
		return $elm_explorations$test$Expect$pass;
	}
};
var $elm_explorations$test$Test$Distribution$Internal$NoDistributionNeeded = {$: 'NoDistributionNeeded'};
var $elm_explorations$test$Test$Internal$ElmTestVariant__FuzzTest = function (a) {
	return {__elmTestSymbol: __elmTestSymbol, $: 'ElmTestVariant__FuzzTest', a: a};
};
var $elm_explorations$test$Test$Expectation$withGiven = F2(
	function (newGiven, expectation) {
		if (expectation.$ === 'Fail') {
			var failure = expectation.a;
			return $elm_explorations$test$Test$Expectation$Fail(
				_Utils_update(
					failure,
					{
						given: $elm$core$Maybe$Just(newGiven)
					}));
		} else {
			return expectation;
		}
	});
var $elm_explorations$test$Test$Fuzz$formatExpectation = function (_v0) {
	var given = _v0.given;
	var expectation = _v0.expectation;
	if (given.$ === 'Nothing') {
		return expectation;
	} else {
		var given_ = given.a;
		return A2($elm_explorations$test$Test$Expectation$withGiven, given_, expectation);
	}
};
var $elm_explorations$test$Test$Distribution$DistributionCheckSucceeded = function (a) {
	return {$: 'DistributionCheckSucceeded', a: a};
};
var $elm_explorations$test$Test$Distribution$DistributionToReport = function (a) {
	return {$: 'DistributionToReport', a: a};
};
var $elm_explorations$test$Test$Distribution$Internal$getExpectedDistributions = function (distribution) {
	switch (distribution.$) {
		case 'NoDistributionNeeded':
			return $elm$core$Maybe$Nothing;
		case 'ReportDistribution':
			return $elm$core$Maybe$Nothing;
		default:
			var list = distribution.a;
			return $elm$core$Maybe$Just(
				A2(
					$elm$core$List$map,
					function (_v1) {
						var e = _v1.a;
						var l = _v1.b;
						return _Utils_Tuple2(l, e);
					},
					list));
	}
};
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $elm_explorations$test$Test$Distribution$Internal$certainty = A2($elm$core$Basics$pow, 10, 9);
var $elm_explorations$test$Test$Distribution$Internal$falsePositiveProb = 1 / $elm_explorations$test$Test$Distribution$Internal$certainty;
var $elm_explorations$test$Test$Distribution$Internal$tolerance = 0.9;
var $elm_explorations$test$Test$Distribution$Internal$a1 = -3.969683028665376e1;
var $elm_explorations$test$Test$Distribution$Internal$a2 = 2.209460984245205e2;
var $elm_explorations$test$Test$Distribution$Internal$a3 = -2.759285104469687e2;
var $elm_explorations$test$Test$Distribution$Internal$a4 = 1.38357751867269e2;
var $elm_explorations$test$Test$Distribution$Internal$a5 = -3.066479806614716e1;
var $elm_explorations$test$Test$Distribution$Internal$a6 = 2.506628277459239e0;
var $elm_explorations$test$Test$Distribution$Internal$b1 = -5.447609879822406e1;
var $elm_explorations$test$Test$Distribution$Internal$b2 = 1.615858368580409e2;
var $elm_explorations$test$Test$Distribution$Internal$b3 = -1.556989798598866e2;
var $elm_explorations$test$Test$Distribution$Internal$b4 = 6.680131188771972e1;
var $elm_explorations$test$Test$Distribution$Internal$b5 = -1.328068155288572e1;
var $elm_explorations$test$Test$Distribution$Internal$c1 = -7.784894002430293e-3;
var $elm_explorations$test$Test$Distribution$Internal$c2 = -3.223964580411365e-1;
var $elm_explorations$test$Test$Distribution$Internal$c3 = -2.400758277161838e0;
var $elm_explorations$test$Test$Distribution$Internal$c4 = -2.549732539343734e0;
var $elm_explorations$test$Test$Distribution$Internal$c5 = 4.374664141464968e0;
var $elm_explorations$test$Test$Distribution$Internal$c6 = 2.938163982698783e0;
var $elm_explorations$test$Test$Distribution$Internal$d1 = 7.784695709041462e-3;
var $elm_explorations$test$Test$Distribution$Internal$d2 = 3.224671290700398e-1;
var $elm_explorations$test$Test$Distribution$Internal$d3 = 2.445134137142996e0;
var $elm_explorations$test$Test$Distribution$Internal$d4 = 3.754408661907416e0;
var $elm$core$Basics$e = _Basics_e;
var $elm_explorations$test$Test$Distribution$Internal$pLow = 0.02425;
var $elm_explorations$test$Test$Distribution$Internal$pHigh = 1 - $elm_explorations$test$Test$Distribution$Internal$pLow;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $elm_explorations$test$Test$Distribution$Internal$invnormcdf = function (p) {
	if (p < 0) {
		return 0 / 0;
	} else {
		if (p > 1) {
			return 0 / 0;
		} else {
			if (!p) {
				return (-1) / 0;
			} else {
				if (p === 1) {
					return 1 / 0;
				} else {
					if (_Utils_cmp(p, $elm_explorations$test$Test$Distribution$Internal$pLow) < 0) {
						var q = $elm$core$Basics$sqrt(
							(-2) * A2($elm$core$Basics$logBase, $elm$core$Basics$e, p));
						return (((((((((($elm_explorations$test$Test$Distribution$Internal$c1 * q) + $elm_explorations$test$Test$Distribution$Internal$c2) * q) + $elm_explorations$test$Test$Distribution$Internal$c3) * q) + $elm_explorations$test$Test$Distribution$Internal$c4) * q) + $elm_explorations$test$Test$Distribution$Internal$c5) * q) + $elm_explorations$test$Test$Distribution$Internal$c6) / (((((((($elm_explorations$test$Test$Distribution$Internal$d1 * q) + $elm_explorations$test$Test$Distribution$Internal$d2) * q) + $elm_explorations$test$Test$Distribution$Internal$d3) * q) + $elm_explorations$test$Test$Distribution$Internal$d4) * q) + 1);
					} else {
						if (_Utils_cmp(p, $elm_explorations$test$Test$Distribution$Internal$pHigh) < 1) {
							var q = p - 0.5;
							var r = q * q;
							return ((((((((((($elm_explorations$test$Test$Distribution$Internal$a1 * r) + $elm_explorations$test$Test$Distribution$Internal$a2) * r) + $elm_explorations$test$Test$Distribution$Internal$a3) * r) + $elm_explorations$test$Test$Distribution$Internal$a4) * r) + $elm_explorations$test$Test$Distribution$Internal$a5) * r) + $elm_explorations$test$Test$Distribution$Internal$a6) * q) / (((((((((($elm_explorations$test$Test$Distribution$Internal$b1 * r) + $elm_explorations$test$Test$Distribution$Internal$b2) * r) + $elm_explorations$test$Test$Distribution$Internal$b3) * r) + $elm_explorations$test$Test$Distribution$Internal$b4) * r) + $elm_explorations$test$Test$Distribution$Internal$b5) * r) + 1);
						} else {
							var q = $elm$core$Basics$sqrt(
								(-2) * A2($elm$core$Basics$logBase, $elm$core$Basics$e, 1 - p));
							return (-(((((((((($elm_explorations$test$Test$Distribution$Internal$c1 * q) + $elm_explorations$test$Test$Distribution$Internal$c2) * q) + $elm_explorations$test$Test$Distribution$Internal$c3) * q) + $elm_explorations$test$Test$Distribution$Internal$c4) * q) + $elm_explorations$test$Test$Distribution$Internal$c5) * q) + $elm_explorations$test$Test$Distribution$Internal$c6)) / (((((((($elm_explorations$test$Test$Distribution$Internal$d1 * q) + $elm_explorations$test$Test$Distribution$Internal$d2) * q) + $elm_explorations$test$Test$Distribution$Internal$d3) * q) + $elm_explorations$test$Test$Distribution$Internal$d4) * q) + 1);
						}
					}
				}
			}
		}
	}
};
var $elm_explorations$test$Test$Distribution$Internal$wilson = F3(
	function (k, n, z) {
		var zz = z * z;
		var p = k / n;
		return ((p + (zz / (2 * n))) + (z * $elm$core$Basics$sqrt(((p * (1 - p)) / n) + (zz / ((4 * n) * n))))) / (1 + (zz / n));
	});
var $elm_explorations$test$Test$Distribution$Internal$wilsonLow = F3(
	function (seen, total, prob) {
		return A3(
			$elm_explorations$test$Test$Distribution$Internal$wilson,
			seen,
			total,
			$elm_explorations$test$Test$Distribution$Internal$invnormcdf(prob / 2));
	});
var $elm_explorations$test$Test$Distribution$Internal$sufficientlyCovered = F3(
	function (total, seen, percentage) {
		return _Utils_cmp(
			A3($elm_explorations$test$Test$Distribution$Internal$wilsonLow, seen, total, $elm_explorations$test$Test$Distribution$Internal$falsePositiveProb),
			$elm_explorations$test$Test$Distribution$Internal$tolerance * percentage) > -1;
	});
var $elm_explorations$test$MicroMaybeExtra$traverseHelp = F3(
	function (f, list, acc) {
		traverseHelp:
		while (true) {
			if (list.b) {
				var head = list.a;
				var tail = list.b;
				var _v1 = f(head);
				if (_v1.$ === 'Just') {
					var a = _v1.a;
					var $temp$f = f,
						$temp$list = tail,
						$temp$acc = A2($elm$core$List$cons, a, acc);
					f = $temp$f;
					list = $temp$list;
					acc = $temp$acc;
					continue traverseHelp;
				} else {
					return $elm$core$Maybe$Nothing;
				}
			} else {
				return $elm$core$Maybe$Just(
					$elm$core$List$reverse(acc));
			}
		}
	});
var $elm_explorations$test$MicroMaybeExtra$traverse = F2(
	function (f, list) {
		return A3($elm_explorations$test$MicroMaybeExtra$traverseHelp, f, list, _List_Nil);
	});
var $elm_explorations$test$Test$Fuzz$allSufficientlyCovered = F3(
	function (c, state, normalizedDistributionCount) {
		return A2(
			$elm$core$Maybe$withDefault,
			false,
			A2(
				$elm$core$Maybe$andThen,
				function (_v0) {
					var distributionCount = _v0.a;
					var expectedDistributions = _v0.b;
					var expectedDistributions_ = $elm$core$Dict$fromList(expectedDistributions);
					return A2(
						$elm$core$Maybe$map,
						$elm$core$List$all(
							function (_v4) {
								var count = _v4.b;
								var expectedDistribution = _v4.c;
								switch (expectedDistribution.$) {
									case 'Zero':
										return true;
									case 'MoreThanZero':
										return true;
									default:
										var n = expectedDistribution.a;
										return A3($elm_explorations$test$Test$Distribution$Internal$sufficientlyCovered, state.runsElapsed, count, n / 100);
								}
							}),
						A2(
							$elm_explorations$test$MicroMaybeExtra$traverse,
							function (_v3) {
								var labels = _v3.a;
								var count = _v3.b;
								return A2(
									$elm$core$Maybe$map,
									function (expectedDistribution) {
										return _Utils_Tuple3(labels, count, expectedDistribution);
									},
									A2($elm$core$Dict$get, labels, expectedDistributions_));
							},
							A2(
								$elm$core$List$filterMap,
								function (_v1) {
									var labels = _v1.a;
									var count = _v1.b;
									if (labels.b && (!labels.b.b)) {
										var onlyLabel = labels.a;
										return $elm$core$Maybe$Just(
											_Utils_Tuple2(onlyLabel, count));
									} else {
										return $elm$core$Maybe$Nothing;
									}
								},
								$elm$core$Dict$toList(distributionCount))));
				},
				A3(
					$elm$core$Maybe$map2,
					$elm$core$Tuple$pair,
					normalizedDistributionCount,
					$elm_explorations$test$Test$Distribution$Internal$getExpectedDistributions(c.distribution))));
	});
var $elm_explorations$test$Test$Runner$Failure$DistributionBug = {$: 'DistributionBug'};
var $elm_explorations$test$Test$Fuzz$distributionBugRunResult = {
	distributionReport: $elm_explorations$test$Test$Distribution$NoDistribution,
	failure: $elm$core$Maybe$Just(
		{
			expectation: $elm_explorations$test$Test$Expectation$fail(
				{
					description: 'elm-test distribution collection bug',
					reason: $elm_explorations$test$Test$Runner$Failure$Invalid($elm_explorations$test$Test$Runner$Failure$DistributionBug)
				}),
			given: $elm$core$Maybe$Nothing
		})
};
var $elm_explorations$test$Test$Distribution$DistributionCheckFailed = function (a) {
	return {$: 'DistributionCheckFailed', a: a};
};
var $elm_explorations$test$Test$Runner$Failure$DistributionInsufficient = {$: 'DistributionInsufficient'};
var $elm_explorations$test$Test$Distribution$Internal$formatPct = function (n) {
	var intPart = $elm$core$Basics$floor(n);
	var thousandths = $elm$core$Basics$round((n * 1000) - (intPart * 1000));
	return $elm$core$String$fromInt(intPart) + ('.' + (A3(
		$elm$core$String$padLeft,
		3,
		_Utils_chr('0'),
		$elm$core$String$fromInt(thousandths)) + '%'));
};
var $elm_explorations$test$Test$Fuzz$formatExpectedDistribution = function (expected) {
	switch (expected.$) {
		case 'Zero':
			return 'exactly 0%';
		case 'MoreThanZero':
			return 'more than 0%';
		default:
			var n = expected.a;
			return $elm_explorations$test$Test$Distribution$Internal$formatPct(n);
	}
};
var $elm_explorations$test$Test$Fuzz$distributionInsufficientFailure = function (failure) {
	return {
		expectation: $elm_explorations$test$Test$Expectation$fail(
			{
				description: A3(
					$elm$core$String$replace,
					'{RUNS}',
					$elm$core$String$fromInt(failure.runsElapsed),
					A3(
						$elm$core$String$replace,
						'{ACTUAL_PERCENTAGE}',
						$elm_explorations$test$Test$Distribution$Internal$formatPct(failure.actualPercentage),
						A3(
							$elm$core$String$replace,
							'{EXPECTED_PERCENTAGE}',
							$elm_explorations$test$Test$Fuzz$formatExpectedDistribution(failure.expectedDistribution),
							A3($elm$core$String$replace, '{LABEL}', failure.label, 'Distribution of label "{LABEL}" was insufficient:\n  expected:  {EXPECTED_PERCENTAGE}\n  got:       {ACTUAL_PERCENTAGE}.\n\n(Generated {RUNS} values.)')))),
				reason: $elm_explorations$test$Test$Runner$Failure$Invalid($elm_explorations$test$Test$Runner$Failure$DistributionInsufficient)
			}),
		given: $elm$core$Maybe$Nothing
	};
};
var $elm_explorations$test$Test$Distribution$Internal$expectedDistributionToString = function (expectedDistribution) {
	switch (expectedDistribution.$) {
		case 'Zero':
			return '0%';
		case 'MoreThanZero':
			return '> 0%';
		default:
			var pct = expectedDistribution.a;
			return '>= ' + $elm_explorations$test$Test$Distribution$Internal$formatPct(pct);
	}
};
var $elm_explorations$test$Test$Fuzz$distributionFailRunResult = F2(
	function (normalizedDistributionCount, failedLabel) {
		if (normalizedDistributionCount.$ === 'Nothing') {
			return $elm_explorations$test$Test$Fuzz$distributionBugRunResult;
		} else {
			var distributionCount = normalizedDistributionCount.a;
			return {
				distributionReport: $elm_explorations$test$Test$Distribution$DistributionCheckFailed(
					{
						badLabel: failedLabel.label,
						badLabelPercentage: failedLabel.actualPercentage,
						distributionCount: distributionCount,
						expectedDistribution: $elm_explorations$test$Test$Distribution$Internal$expectedDistributionToString(failedLabel.expectedDistribution),
						runsElapsed: failedLabel.runsElapsed
					}),
				failure: $elm$core$Maybe$Just(
					$elm_explorations$test$Test$Fuzz$distributionInsufficientFailure(failedLabel))
			};
		}
	});
var $elm_explorations$test$MicroListExtra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return $elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var $elm_explorations$test$Test$Fuzz$findBadZeroRelatedCase = F3(
	function (c, state, normalizedDistributionCount) {
		return A2(
			$elm$core$Maybe$andThen,
			function (_v0) {
				var distributionCount = _v0.a;
				var expectedDistributions = _v0.b;
				return A2(
					$elm$core$Maybe$andThen,
					function (_v3) {
						var label = _v3.a;
						var expectedDistribution = _v3.b;
						return A2(
							$elm$core$Maybe$map,
							function (count) {
								return {actualPercentage: (count * 100) / state.runsElapsed, distributionCount: distributionCount, expectedDistribution: expectedDistribution, label: label, runsElapsed: state.runsElapsed};
							},
							A2(
								$elm$core$Dict$get,
								_List_fromArray(
									[label]),
								distributionCount));
					},
					A2(
						$elm_explorations$test$MicroListExtra$find,
						function (_v1) {
							var label = _v1.a;
							var expectedDistribution = _v1.b;
							switch (expectedDistribution.$) {
								case 'Zero':
									return !(!A2(
										$elm$core$Maybe$withDefault,
										1,
										A2(
											$elm$core$Dict$get,
											_List_fromArray(
												[label]),
											distributionCount)));
								case 'MoreThanZero':
									return !A2(
										$elm$core$Maybe$withDefault,
										0,
										A2(
											$elm$core$Dict$get,
											_List_fromArray(
												[label]),
											distributionCount));
								default:
									return false;
							}
						},
						expectedDistributions));
			},
			A3(
				$elm$core$Maybe$map2,
				$elm$core$Tuple$pair,
				normalizedDistributionCount,
				$elm_explorations$test$Test$Distribution$Internal$getExpectedDistributions(c.distribution)));
	});
var $elm_explorations$test$Test$Distribution$Internal$wilsonHigh = F3(
	function (seen, total, prob) {
		return A3(
			$elm_explorations$test$Test$Distribution$Internal$wilson,
			seen,
			total,
			$elm_explorations$test$Test$Distribution$Internal$invnormcdf(1 - (prob / 2)));
	});
var $elm_explorations$test$Test$Distribution$Internal$insufficientlyCovered = F3(
	function (total, seen, percentage) {
		return _Utils_cmp(
			A3($elm_explorations$test$Test$Distribution$Internal$wilsonHigh, seen, total, $elm_explorations$test$Test$Distribution$Internal$falsePositiveProb),
			percentage) < 0;
	});
var $elm_explorations$test$Test$Fuzz$findInsufficientlyCoveredLabel = F3(
	function (c, state, normalizedDistributionCount) {
		return A2(
			$elm$core$Maybe$andThen,
			function (_v0) {
				var distributionCount = _v0.a;
				var expectedDistributions = _v0.b;
				var expectedDistributions_ = $elm$core$Dict$fromList(expectedDistributions);
				return A2(
					$elm$core$Maybe$map,
					function (_v5) {
						var label = _v5.a;
						var count = _v5.b;
						var expectedDistribution = _v5.c;
						return {actualPercentage: (count * 100) / state.runsElapsed, distributionCount: distributionCount, expectedDistribution: expectedDistribution, label: label, runsElapsed: state.runsElapsed};
					},
					A2(
						$elm_explorations$test$MicroListExtra$find,
						function (_v3) {
							var count = _v3.b;
							var expectedDistribution = _v3.c;
							switch (expectedDistribution.$) {
								case 'Zero':
									return false;
								case 'MoreThanZero':
									return false;
								default:
									var n = expectedDistribution.a;
									return A3($elm_explorations$test$Test$Distribution$Internal$insufficientlyCovered, state.runsElapsed, count, n / 100);
							}
						},
						A2(
							$elm$core$List$filterMap,
							function (_v1) {
								var labels = _v1.a;
								var count = _v1.b;
								if (labels.b && (!labels.b.b)) {
									var onlyLabel = labels.a;
									return A2(
										$elm$core$Maybe$map,
										function (expectedDistribution) {
											return _Utils_Tuple3(onlyLabel, count, expectedDistribution);
										},
										A2($elm$core$Dict$get, onlyLabel, expectedDistributions_));
								} else {
									return $elm$core$Maybe$Nothing;
								}
							},
							$elm$core$Dict$toList(distributionCount))));
			},
			A3(
				$elm$core$Maybe$map2,
				$elm$core$Tuple$pair,
				normalizedDistributionCount,
				$elm_explorations$test$Test$Distribution$Internal$getExpectedDistributions(c.distribution)));
	});
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $elm_explorations$test$Test$Fuzz$includeCombinationsInBaseCounts = function (distribution) {
	return A2(
		$elm$core$Dict$map,
		F2(
			function (labels, count) {
				if (labels.b && (!labels.b.b)) {
					var single = labels.a;
					var combinations = $elm$core$Dict$values(
						A2(
							$elm$core$Dict$filter,
							F2(
								function (k, _v1) {
									return ($elm$core$List$length(k) > 1) && A2($elm$core$List$member, single, k);
								}),
							distribution));
					return count + $elm$core$List$sum(combinations);
				} else {
					return count;
				}
			}),
		distribution);
};
var $elm_explorations$test$Test$Runner$Failure$InvalidFuzzer = {$: 'InvalidFuzzer'};
var $elm_explorations$test$Fuzz$Internal$generate = F2(
	function (prng, _v0) {
		var fuzzer = _v0.a;
		return fuzzer(prng);
	});
var $elm_explorations$test$Test$Distribution$Internal$getDistributionLabels = function (distribution) {
	switch (distribution.$) {
		case 'NoDistributionNeeded':
			return $elm$core$Maybe$Nothing;
		case 'ReportDistribution':
			var list = distribution.a;
			return $elm$core$Maybe$Just(list);
		default:
			var list = distribution.a;
			return $elm$core$Maybe$Just(
				A2(
					$elm$core$List$map,
					function (_v1) {
						var l = _v1.b;
						var p = _v1.c;
						return _Utils_Tuple2(l, p);
					},
					list));
	}
};
var $elm_explorations$test$GenResult$getPrng = function (genResult) {
	if (genResult.$ === 'Generated') {
		var prng = genResult.a.prng;
		return prng;
	} else {
		var prng = genResult.a.prng;
		return prng;
	}
};
var $elm_explorations$test$PRNG$getRun = function (prng) {
	if (prng.$ === 'Random') {
		var run = prng.a.run;
		return run;
	} else {
		var wholeRun = prng.a.wholeRun;
		return wholeRun;
	}
};
var $elm_explorations$test$PRNG$getSeed = function (prng) {
	if (prng.$ === 'Random') {
		var seed = prng.a.seed;
		return $elm$core$Maybe$Just(seed);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm_explorations$test$MicroDictExtra$increment = F2(
	function (key, dict) {
		return A3(
			$elm$core$Dict$update,
			key,
			function (maybeValue) {
				if (maybeValue.$ === 'Nothing') {
					return $elm$core$Maybe$Just(1);
				} else {
					var value = maybeValue.a;
					return $elm$core$Maybe$Just(value + 1);
				}
			},
			dict);
	});
var $elm_explorations$test$PRNG$Random = function (a) {
	return {$: 'Random', a: a};
};
var $elm_explorations$test$Queue$Queue = F2(
	function (a, b) {
		return {$: 'Queue', a: a, b: b};
	});
var $elm_explorations$test$Queue$empty = A2($elm_explorations$test$Queue$Queue, _List_Nil, _List_Nil);
var $elm_explorations$test$RandomRun$empty = {data: $elm_explorations$test$Queue$empty, length: 0};
var $elm_explorations$test$PRNG$random = function (seed) {
	return $elm_explorations$test$PRNG$Random(
		{run: $elm_explorations$test$RandomRun$empty, seed: seed});
};
var $elm_explorations$test$Test$Fuzz$stepSeed = function (seed) {
	return A2(
		$elm$random$Random$step,
		A2($elm$random$Random$int, 0, 0),
		seed).b;
};
var $elm_explorations$test$RandomRun$isEmpty = function (run) {
	return !run.length;
};
var $elm_explorations$test$Queue$toList = function (_v0) {
	var fl = _v0.a;
	var rl = _v0.b;
	return _Utils_ap(
		fl,
		$elm$core$List$reverse(rl));
};
var $elm_explorations$test$RandomRun$toList = function (run) {
	return $elm_explorations$test$Queue$toList(run.data);
};
var $elm_explorations$test$RandomRun$equal = F2(
	function (run1, run2) {
		return _Utils_eq(
			$elm_explorations$test$RandomRun$toList(run1),
			$elm_explorations$test$RandomRun$toList(run2));
	});
var $elm_explorations$test$Simplify$Cmd$DecrementTogether = function (a) {
	return {$: 'DecrementTogether', a: a};
};
var $elm_explorations$test$MicroListExtra$fastConcatMap = function (f) {
	return A2(
		$elm$core$List$foldr,
		A2($elm$core$Basics$composeR, f, $elm$core$Basics$append),
		_List_Nil);
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm_explorations$test$Simplify$Cmd$decrementTogetherCmds = function (length) {
	var maxOffsetLimit = (length < 512) ? 4 : 2;
	return A2(
		$elm_explorations$test$MicroListExtra$fastConcatMap,
		function (index) {
			var maxOffset = A2($elm$core$Basics$min, maxOffsetLimit, (length - index) - 1);
			return A2(
				$elm_explorations$test$MicroListExtra$fastConcatMap,
				function (offset) {
					return A2(
						$elm$core$List$map,
						function (by) {
							var rightIndex = index + offset;
							return {
								minLength: rightIndex + 1,
								type_: $elm_explorations$test$Simplify$Cmd$DecrementTogether(
									{by: by, leftIndex: index, rightIndex: rightIndex})
							};
						},
						_List_fromArray(
							[4, 2, 1]));
				},
				A2($elm$core$List$range, 1, maxOffset));
		},
		A2($elm$core$List$range, 0, length - 2));
};
var $elm_explorations$test$Simplify$Cmd$DeleteChunkAndMaybeDecrementPrevious = function (a) {
	return {$: 'DeleteChunkAndMaybeDecrementPrevious', a: a};
};
var $elm_explorations$test$Simplify$Cmd$chunkCmds = F2(
	function (toType, _v0) {
		var length = _v0.length;
		var allowChunksOfSize1 = _v0.allowChunksOfSize1;
		var initChunkSize = allowChunksOfSize1 ? 1 : 2;
		var go = F3(
			function (chunkSize, startIndex, acc) {
				go:
				while (true) {
					if (_Utils_cmp(startIndex, length - chunkSize) > 0) {
						if (chunkSize === 8) {
							return acc;
						} else {
							if ((chunkSize === 2) || (chunkSize === 3)) {
								var $temp$chunkSize = chunkSize + 1,
									$temp$startIndex = 0,
									$temp$acc = acc;
								chunkSize = $temp$chunkSize;
								startIndex = $temp$startIndex;
								acc = $temp$acc;
								continue go;
							} else {
								var $temp$chunkSize = chunkSize * 2,
									$temp$startIndex = 0,
									$temp$acc = acc;
								chunkSize = $temp$chunkSize;
								startIndex = $temp$startIndex;
								acc = $temp$acc;
								continue go;
							}
						}
					} else {
						var newCmd = {
							minLength: startIndex + chunkSize,
							type_: toType(
								{size: chunkSize, startIndex: startIndex})
						};
						var $temp$chunkSize = chunkSize,
							$temp$startIndex = startIndex + 1,
							$temp$acc = A2($elm$core$List$cons, newCmd, acc);
						chunkSize = $temp$chunkSize;
						startIndex = $temp$startIndex;
						acc = $temp$acc;
						continue go;
					}
				}
			});
		return A3(go, initChunkSize, 0, _List_Nil);
	});
var $elm_explorations$test$Simplify$Cmd$deletionCmds = function (length) {
	return A2(
		$elm_explorations$test$Simplify$Cmd$chunkCmds,
		$elm_explorations$test$Simplify$Cmd$DeleteChunkAndMaybeDecrementPrevious,
		{allowChunksOfSize1: true, length: length});
};
var $elm_explorations$test$MicroListExtra$fastConcat = A2($elm$core$List$foldr, $elm$core$Basics$append, _List_Nil);
var $elm_explorations$test$RandomRun$length = function (run) {
	return run.length;
};
var $elm_explorations$test$Simplify$Cmd$MinimizeChoice = function (a) {
	return {$: 'MinimizeChoice', a: a};
};
var $elm_explorations$test$Simplify$Cmd$minimizeChoiceCmds = F2(
	function (run, length) {
		return A2(
			$elm$core$List$filterMap,
			function (_v0) {
				var index = _v0.a;
				var value = _v0.b;
				return (value > 0) ? $elm$core$Maybe$Just(
					{
						minLength: index + 1,
						type_: $elm_explorations$test$Simplify$Cmd$MinimizeChoice(
							{index: index})
					}) : $elm$core$Maybe$Nothing;
			},
			A2(
				$elm$core$List$indexedMap,
				$elm$core$Tuple$pair,
				$elm_explorations$test$RandomRun$toList(run)));
	});
var $elm_explorations$test$Simplify$Cmd$MinimizeFloat = function (a) {
	return {$: 'MinimizeFloat', a: a};
};
var $elm_explorations$test$Simplify$Cmd$minimizeFloatCmds = F2(
	function (run, length) {
		var possibleBoolIndexes = $elm$core$Set$fromList(
			A2(
				$elm$core$List$filterMap,
				function (_v0) {
					var index = _v0.a;
					var value = _v0.b;
					return (value > 1) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(index);
				},
				A2(
					$elm$core$List$indexedMap,
					$elm$core$Tuple$pair,
					$elm_explorations$test$RandomRun$toList(run))));
		return A2(
			$elm$core$List$filterMap,
			function (index) {
				return A2($elm$core$Set$member, index + 2, possibleBoolIndexes) ? $elm$core$Maybe$Just(
					{
						minLength: index + 3,
						type_: $elm_explorations$test$Simplify$Cmd$MinimizeFloat(
							{leftIndex: index})
					}) : $elm$core$Maybe$Nothing;
			},
			A2($elm$core$List$range, 0, length - 3));
	});
var $elm_explorations$test$Simplify$Cmd$RedistributeChoicesAndMaybeIncrement = function (a) {
	return {$: 'RedistributeChoicesAndMaybeIncrement', a: a};
};
var $elm_explorations$test$Simplify$Cmd$redistributeCmds = function (length) {
	var forOffset = function (offset) {
		return (_Utils_cmp(offset, length) > -1) ? _List_Nil : A2(
			$elm$core$List$map,
			function (leftIndex) {
				return {
					minLength: (leftIndex + offset) + 1,
					type_: $elm_explorations$test$Simplify$Cmd$RedistributeChoicesAndMaybeIncrement(
						{leftIndex: leftIndex, rightIndex: leftIndex + offset})
				};
			},
			$elm$core$List$reverse(
				A2($elm$core$List$range, 0, (length - 1) - offset)));
	};
	return _Utils_ap(
		forOffset(3),
		_Utils_ap(
			forOffset(2),
			forOffset(1)));
};
var $elm_explorations$test$Simplify$Cmd$SortChunk = function (a) {
	return {$: 'SortChunk', a: a};
};
var $elm_explorations$test$Simplify$Cmd$sortCmds = function (length) {
	return A2(
		$elm_explorations$test$Simplify$Cmd$chunkCmds,
		$elm_explorations$test$Simplify$Cmd$SortChunk,
		{allowChunksOfSize1: false, length: length});
};
var $elm_explorations$test$Simplify$Cmd$SwapChunkWithNeighbour = function (a) {
	return {$: 'SwapChunkWithNeighbour', a: a};
};
var $elm_explorations$test$Simplify$Cmd$swapCmds = function (length) {
	return A2(
		$elm$core$List$map,
		function (cmd) {
			var _v0 = cmd.type_;
			if (_v0.$ === 'SwapChunkWithNeighbour') {
				var chunk = _v0.a;
				return _Utils_update(
					cmd,
					{minLength: cmd.minLength + chunk.size});
			} else {
				return cmd;
			}
		},
		A2(
			$elm_explorations$test$Simplify$Cmd$chunkCmds,
			$elm_explorations$test$Simplify$Cmd$SwapChunkWithNeighbour,
			{allowChunksOfSize1: false, length: length}));
};
var $elm_explorations$test$Simplify$Cmd$ReplaceChunkWithZero = function (a) {
	return {$: 'ReplaceChunkWithZero', a: a};
};
var $elm_explorations$test$Simplify$Cmd$zeroCmds = function (length) {
	return A2(
		$elm_explorations$test$Simplify$Cmd$chunkCmds,
		$elm_explorations$test$Simplify$Cmd$ReplaceChunkWithZero,
		{allowChunksOfSize1: false, length: length});
};
var $elm_explorations$test$Simplify$Cmd$cmdsForRun = function (run) {
	var length = $elm_explorations$test$RandomRun$length(run);
	return $elm_explorations$test$MicroListExtra$fastConcat(
		_List_fromArray(
			[
				$elm_explorations$test$Simplify$Cmd$deletionCmds(length),
				$elm_explorations$test$Simplify$Cmd$zeroCmds(length),
				A2($elm_explorations$test$Simplify$Cmd$minimizeChoiceCmds, run, length),
				A2($elm_explorations$test$Simplify$Cmd$minimizeFloatCmds, run, length),
				$elm_explorations$test$Simplify$Cmd$sortCmds(length),
				$elm_explorations$test$Simplify$Cmd$redistributeCmds(length),
				$elm_explorations$test$Simplify$Cmd$decrementTogetherCmds(length),
				$elm_explorations$test$Simplify$Cmd$swapCmds(length)
			]));
};
var $elm_explorations$test$RandomRun$sortKey = function (run) {
	return _Utils_Tuple2(
		run.length,
		$elm_explorations$test$RandomRun$toList(run));
};
var $elm_explorations$test$RandomRun$compare = F2(
	function (a, b) {
		return A2(
			$elm$core$Basics$compare,
			$elm_explorations$test$RandomRun$sortKey(a),
			$elm_explorations$test$RandomRun$sortKey(b));
	});
var $elm_explorations$test$PRNG$Hardcoded = function (a) {
	return {$: 'Hardcoded', a: a};
};
var $elm_explorations$test$PRNG$hardcoded = function (run) {
	return $elm_explorations$test$PRNG$Hardcoded(
		{unusedPart: run, wholeRun: run});
};
var $elm_explorations$test$Simplify$noImprovement = function (state) {
	return {newState: state, wasImprovement: false};
};
var $elm_explorations$test$Simplify$keepIfBetter = F2(
	function (newRandomRun, state) {
		if (A2($elm_explorations$test$RandomRun$equal, state.randomRun, newRandomRun)) {
			return $elm_explorations$test$Simplify$noImprovement(state);
		} else {
			var _v0 = A2(
				$elm_explorations$test$Fuzz$Internal$generate,
				$elm_explorations$test$PRNG$hardcoded(newRandomRun),
				state.fuzzer);
			if (_v0.$ === 'Generated') {
				var value = _v0.a.value;
				var _v1 = state.getExpectation(value);
				if (_v1.$ === 'Pass') {
					return $elm_explorations$test$Simplify$noImprovement(state);
				} else {
					var fail = _v1.a;
					return _Utils_eq(
						A2($elm_explorations$test$RandomRun$compare, state.randomRun, newRandomRun),
						$elm$core$Basics$GT) ? {
						newState: _Utils_update(
							state,
							{
								expectation: $elm_explorations$test$Test$Expectation$Fail(fail),
								randomRun: newRandomRun,
								value: value
							}),
						wasImprovement: true
					} : $elm_explorations$test$Simplify$noImprovement(state);
				}
			} else {
				return $elm_explorations$test$Simplify$noImprovement(state);
			}
		}
	});
var $elm_explorations$test$MicroListExtra$getAt = F2(
	function (index, list) {
		return (index < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, index, list));
	});
var $elm_explorations$test$RandomRun$get = F2(
	function (index, run) {
		return A2(
			$elm_explorations$test$MicroListExtra$getAt,
			index,
			$elm_explorations$test$Queue$toList(run.data));
	});
var $elm_explorations$test$Queue$fromList = function (list) {
	return A2($elm_explorations$test$Queue$Queue, list, _List_Nil);
};
var $elm_explorations$test$MicroListExtra$setAt = F4(
	function (index, value, length, list) {
		return ((_Utils_cmp(length, index) < 1) || (index < 0)) ? list : _Utils_ap(
			A2($elm$core$List$take, index, list),
			A2(
				$elm$core$List$cons,
				value,
				A2($elm$core$List$drop, index + 1, list)));
	});
var $elm_explorations$test$RandomRun$replaceInList = F3(
	function (values, len, list) {
		return {
			data: $elm_explorations$test$Queue$fromList(
				A3(
					$elm$core$List$foldl,
					F2(
						function (_v0, accList) {
							var index = _v0.a;
							var newValue = _v0.b;
							return (newValue < 0) ? accList : A4($elm_explorations$test$MicroListExtra$setAt, index, newValue, len, accList);
						}),
					list,
					values)),
			length: len
		};
	});
var $elm_explorations$test$RandomRun$replace = F2(
	function (values, run) {
		return A3(
			$elm_explorations$test$RandomRun$replaceInList,
			values,
			run.length,
			$elm_explorations$test$Queue$toList(run.data));
	});
var $elm_explorations$test$RandomRun$update = F3(
	function (index, fn, run) {
		var _v0 = A2($elm_explorations$test$RandomRun$get, index, run);
		if (_v0.$ === 'Nothing') {
			return run;
		} else {
			var value = _v0.a;
			return A2(
				$elm_explorations$test$RandomRun$replace,
				_List_fromArray(
					[
						_Utils_Tuple2(
						index,
						fn(value))
					]),
				run);
		}
	});
var $elm_explorations$test$Simplify$decrementTogether = F2(
	function (_v0, state) {
		var leftIndex = _v0.leftIndex;
		var rightIndex = _v0.rightIndex;
		var by = _v0.by;
		var simplifiedRun = A3(
			$elm_explorations$test$RandomRun$update,
			rightIndex,
			function (n) {
				return n - by;
			},
			A3(
				$elm_explorations$test$RandomRun$update,
				leftIndex,
				function (n) {
					return n - by;
				},
				state.randomRun));
		return A2($elm_explorations$test$Simplify$keepIfBetter, simplifiedRun, state);
	});
var $elm_explorations$test$RandomRun$isInBounds = F2(
	function (_v0, run) {
		var startIndex = _v0.startIndex;
		var size = _v0.size;
		return _Utils_cmp(startIndex + size, run.length) < 1;
	});
var $elm_explorations$test$RandomRun$deleteChunk = F2(
	function (chunk, run) {
		if (A2($elm_explorations$test$RandomRun$isInBounds, chunk, run)) {
			var list = $elm_explorations$test$Queue$toList(run.data);
			var result = _Utils_update(
				run,
				{
					data: $elm_explorations$test$Queue$fromList(
						_Utils_ap(
							A2($elm$core$List$take, chunk.startIndex, list),
							A2($elm$core$List$drop, chunk.startIndex + chunk.size, list))),
					length: run.length - chunk.size
				});
			return result;
		} else {
			return run;
		}
	});
var $elm_explorations$test$Simplify$deleteChunkAndMaybeDecrementPrevious = F2(
	function (chunk, state) {
		var runWithDelete = A2($elm_explorations$test$RandomRun$deleteChunk, chunk, state.randomRun);
		var runWithDeleteAndDecrement = A3(
			$elm_explorations$test$RandomRun$update,
			chunk.startIndex - 1,
			function (x) {
				return x - 1;
			},
			runWithDelete);
		var afterDeleteAndDecrement = A2($elm_explorations$test$Simplify$keepIfBetter, runWithDeleteAndDecrement, state);
		return afterDeleteAndDecrement.wasImprovement ? afterDeleteAndDecrement : A2($elm_explorations$test$Simplify$keepIfBetter, runWithDelete, state);
	});
var $elm_explorations$test$Simplify$binarySearchLoop = F2(
	function (old, options) {
		binarySearchLoop:
		while (true) {
			var low = options.low;
			var high = options.high;
			var state = options.state;
			var updateRun = options.updateRun;
			if (_Utils_cmp(low + 1, high) < 0) {
				var mid = low + $elm$core$Basics$round((high - low) / 2);
				var newRun = A2(updateRun, mid, options.state.randomRun);
				var afterMid = A2($elm_explorations$test$Simplify$keepIfBetter, newRun, state);
				var optionsWithNewRange = afterMid.wasImprovement ? _Utils_update(
					options,
					{high: mid}) : _Utils_update(
					options,
					{low: mid});
				var newOptions = _Utils_update(
					optionsWithNewRange,
					{state: afterMid.newState});
				var $temp$old = {wasImprovement: afterMid.wasImprovement},
					$temp$options = newOptions;
				old = $temp$old;
				options = $temp$options;
				continue binarySearchLoop;
			} else {
				return {newState: options.state, wasImprovement: old.wasImprovement};
			}
		}
	});
var $elm_explorations$test$Simplify$binarySearchShrink = function (options) {
	var updateRun = options.updateRun;
	var low = options.low;
	var state = options.state;
	var runWithLow = A2(updateRun, low, options.state.randomRun);
	var afterLow = A2($elm_explorations$test$Simplify$keepIfBetter, runWithLow, state);
	return afterLow.wasImprovement ? afterLow : A2(
		$elm_explorations$test$Simplify$binarySearchLoop,
		{wasImprovement: false},
		options);
};
var $elm_explorations$test$RandomRun$set = F3(
	function (index, value, run) {
		return (_Utils_cmp(run.length, index) < 1) ? run : _Utils_update(
			run,
			{
				data: $elm_explorations$test$Queue$fromList(
					A4(
						$elm_explorations$test$MicroListExtra$setAt,
						index,
						value,
						run.length,
						$elm_explorations$test$Queue$toList(run.data)))
			});
	});
var $elm_explorations$test$Simplify$minimizeChoice = F2(
	function (_v0, state) {
		var index = _v0.index;
		var _v1 = A2($elm_explorations$test$RandomRun$get, index, state.randomRun);
		if (_v1.$ === 'Nothing') {
			return $elm_explorations$test$Simplify$noImprovement(state);
		} else {
			var value = _v1.a;
			return (!value) ? $elm_explorations$test$Simplify$noImprovement(state) : $elm_explorations$test$Simplify$binarySearchShrink(
				{
					high: value,
					low: 0,
					state: state,
					updateRun: F2(
						function (value_, accRun) {
							return A3($elm_explorations$test$RandomRun$set, index, value_, accRun);
						})
				});
		}
	});
var $elm_explorations$test$Simplify$andThen = F2(
	function (fn, _v0) {
		var newState = _v0.newState;
		return fn(newState);
	});
var $elm_explorations$test$MicroBitwiseExtra$ones = function (count) {
	return (count === 32) ? 4294967295 : ((1 << count) - 1);
};
var $elm_explorations$test$MicroBitwiseExtra$keepBits = F2(
	function (count, num) {
		return $elm_explorations$test$MicroBitwiseExtra$ones(count) & num;
	});
var $elm_explorations$test$Fuzz$Float$getExponent = function (_v0) {
	var hi = _v0.a;
	return A2($elm_explorations$test$MicroBitwiseExtra$keepBits, 11, hi >>> 20);
};
var $elm_explorations$test$Fuzz$Float$getMantissaTuple = function (_v0) {
	var hi = _v0.a;
	var lo = _v0.b;
	return _Utils_Tuple2(
		A2($elm_explorations$test$MicroBitwiseExtra$keepBits, 20, hi),
		A2($elm_explorations$test$MicroBitwiseExtra$keepBits, 32, lo));
};
var $elm_explorations$test$MicroBitwiseExtra$signedToUnsigned = $elm$core$Bitwise$shiftRightZfBy(0);
var $elm_explorations$test$MicroBitwiseExtra$int52FromTuple = function (_v0) {
	var highBits = _v0.a;
	var lowBits = _v0.b;
	return (4294967296 * $elm_explorations$test$MicroBitwiseExtra$signedToUnsigned(
		A2($elm_explorations$test$MicroBitwiseExtra$keepBits, 20, highBits))) + A2(
		$elm_explorations$test$MicroBitwiseExtra$keepBits,
		32,
		$elm_explorations$test$MicroBitwiseExtra$signedToUnsigned(lowBits));
};
var $elm_explorations$test$Fuzz$Float$getMantissa = function (_v0) {
	var hi = _v0.a;
	var lo = _v0.b;
	return $elm_explorations$test$MicroBitwiseExtra$int52FromTuple(
		$elm_explorations$test$Fuzz$Float$getMantissaTuple(
			_Utils_Tuple2(hi, lo)));
};
var $elm_explorations$test$MicroBitwiseExtra$isBitSet = F2(
	function (index, num) {
		isBitSet:
		while (true) {
			if (index >= 32) {
				var $temp$index = index - 32,
					$temp$num = (num / 4294967295) | 0;
				index = $temp$index;
				num = $temp$num;
				continue isBitSet;
			} else {
				return (1 & (num >>> index)) === 1;
			}
		}
	});
var $elm_explorations$test$Fuzz$Float$isFractional = function (hi) {
	return A2($elm_explorations$test$MicroBitwiseExtra$isBitSet, 31, hi);
};
var $elm_explorations$test$Fuzz$Float$setExponent = F2(
	function (exponent, _v0) {
		var hi = _v0.a;
		var lo = _v0.b;
		return _Utils_Tuple2(
			$elm_explorations$test$MicroBitwiseExtra$signedToUnsigned(
				(A2($elm_explorations$test$MicroBitwiseExtra$keepBits, 11, exponent) << 20) | (2148532223 & hi)),
			lo);
	});
var $elm_explorations$test$MicroBitwiseExtra$int52ToTuple = function (n) {
	return _Utils_Tuple2(
		$elm_explorations$test$MicroBitwiseExtra$signedToUnsigned(
			A2($elm_explorations$test$MicroBitwiseExtra$keepBits, 20, (n / 4294967296) | 0)),
		$elm_explorations$test$MicroBitwiseExtra$signedToUnsigned(
			A2($elm_explorations$test$MicroBitwiseExtra$keepBits, 32, n)));
};
var $elm_explorations$test$Fuzz$Float$setMantissa = F2(
	function (mantissa, _v0) {
		var hi = _v0.a;
		var _v1 = $elm_explorations$test$MicroBitwiseExtra$int52ToTuple(mantissa);
		var mantissaHi = _v1.a;
		var mantissaLo = _v1.b;
		return _Utils_Tuple2(
			$elm_explorations$test$MicroBitwiseExtra$signedToUnsigned(
				A2($elm_explorations$test$MicroBitwiseExtra$keepBits, 20, mantissaHi) | (4293918720 & hi)),
			$elm_explorations$test$MicroBitwiseExtra$signedToUnsigned(mantissaLo));
	});
var $elm_explorations$test$Simplify$minimizeFloat = F2(
	function (_v0, state) {
		var leftIndex = _v0.leftIndex;
		var _v1 = A2($elm_explorations$test$RandomRun$get, leftIndex, state.randomRun);
		if (_v1.$ === 'Nothing') {
			return $elm_explorations$test$Simplify$noImprovement(state);
		} else {
			var hi_ = _v1.a;
			if ($elm_explorations$test$Fuzz$Float$isFractional(hi_)) {
				var minimizeMantissaPart = function (state_) {
					var _v5 = A3(
						$elm$core$Maybe$map2,
						$elm$core$Tuple$pair,
						A2($elm_explorations$test$RandomRun$get, leftIndex, state_.randomRun),
						A2($elm_explorations$test$RandomRun$get, leftIndex + 1, state_.randomRun));
					if (_v5.$ === 'Nothing') {
						return $elm_explorations$test$Simplify$noImprovement(state_);
					} else {
						var _v6 = _v5.a;
						var hi = _v6.a;
						var lo = _v6.b;
						var mantissa = $elm_explorations$test$Fuzz$Float$getMantissa(
							_Utils_Tuple2(hi, lo));
						return $elm_explorations$test$Simplify$binarySearchShrink(
							{
								high: mantissa,
								low: 0,
								state: state_,
								updateRun: F2(
									function (newMantissa, accRun) {
										var _v7 = A2(
											$elm_explorations$test$Fuzz$Float$setMantissa,
											newMantissa,
											_Utils_Tuple2(hi, lo));
										var newHi = _v7.a;
										var newLo = _v7.b;
										return A3(
											$elm_explorations$test$RandomRun$set,
											leftIndex + 1,
											newLo,
											A3($elm_explorations$test$RandomRun$set, leftIndex, newHi, accRun));
									})
							});
					}
				};
				var minimizeExponentPart = function (state_) {
					var _v2 = A3(
						$elm$core$Maybe$map2,
						$elm$core$Tuple$pair,
						A2($elm_explorations$test$RandomRun$get, leftIndex, state_.randomRun),
						A2($elm_explorations$test$RandomRun$get, leftIndex + 1, state_.randomRun));
					if (_v2.$ === 'Nothing') {
						return $elm_explorations$test$Simplify$noImprovement(state_);
					} else {
						var _v3 = _v2.a;
						var hi = _v3.a;
						var lo = _v3.b;
						var exponent = $elm_explorations$test$Fuzz$Float$getExponent(
							_Utils_Tuple2(hi, lo));
						return $elm_explorations$test$Simplify$binarySearchShrink(
							{
								high: exponent,
								low: 0,
								state: state_,
								updateRun: F2(
									function (newExponent, accRun) {
										var _v4 = A2(
											$elm_explorations$test$Fuzz$Float$setExponent,
											newExponent,
											_Utils_Tuple2(hi, lo));
										var newHi = _v4.a;
										var newLo = _v4.b;
										return A3(
											$elm_explorations$test$RandomRun$set,
											leftIndex + 1,
											newLo,
											A3($elm_explorations$test$RandomRun$set, leftIndex, newHi, accRun));
									})
							});
					}
				};
				return A2(
					$elm_explorations$test$Simplify$andThen,
					minimizeMantissaPart,
					minimizeExponentPart(state));
			} else {
				return $elm_explorations$test$Simplify$noImprovement(state);
			}
		}
	});
var $elm_explorations$test$RandomRun$swapIfOutOfOrder = F2(
	function (_v0, run) {
		var leftIndex = _v0.leftIndex;
		var rightIndex = _v0.rightIndex;
		var list = $elm_explorations$test$Queue$toList(run.data);
		return A3(
			$elm$core$Maybe$map2,
			F2(
				function (left, right) {
					return (_Utils_cmp(left, right) > 0) ? {
						newLeftValue: right,
						newRightValue: left,
						newRun: A3(
							$elm_explorations$test$RandomRun$replaceInList,
							_List_fromArray(
								[
									_Utils_Tuple2(leftIndex, right),
									_Utils_Tuple2(rightIndex, left)
								]),
							run.length,
							list)
					} : {newLeftValue: left, newRightValue: right, newRun: run};
				}),
			A2($elm_explorations$test$MicroListExtra$getAt, leftIndex, list),
			A2($elm_explorations$test$MicroListExtra$getAt, rightIndex, list));
	});
var $elm_explorations$test$Simplify$redistributeChoicesAndMaybeIncrement = F2(
	function (options, state) {
		var _v0 = A2($elm_explorations$test$RandomRun$swapIfOutOfOrder, options, state.randomRun);
		if (_v0.$ === 'Nothing') {
			return $elm_explorations$test$Simplify$noImprovement(state);
		} else {
			var newRun = _v0.a.newRun;
			var newLeftValue = _v0.a.newLeftValue;
			var newRightValue = _v0.a.newRightValue;
			var afterSwap = A2($elm_explorations$test$Simplify$keepIfBetter, newRun, state);
			var newState = afterSwap.newState;
			var go = function (initialRun) {
				return $elm_explorations$test$Simplify$binarySearchShrink(
					{
						high: newLeftValue,
						low: 0,
						state: _Utils_update(
							newState,
							{randomRun: initialRun}),
						updateRun: F2(
							function (value, accRun) {
								return A2(
									$elm_explorations$test$RandomRun$replace,
									_List_fromArray(
										[
											_Utils_Tuple2(options.leftIndex, value),
											_Utils_Tuple2(options.rightIndex, (newRightValue + newLeftValue) - value)
										]),
									accRun);
							})
					});
			};
			var afterShrinkAlone = A2(
				$elm_explorations$test$Simplify$keepIfBetter,
				go(newState.randomRun).newState.randomRun,
				newState);
			if (afterShrinkAlone.wasImprovement) {
				return afterShrinkAlone;
			} else {
				var runWithIncrementedRightBucket = A3(
					$elm_explorations$test$RandomRun$update,
					options.rightIndex - 1,
					function (x) {
						return x + 1;
					},
					newState.randomRun);
				var afterIncrementAndShrink = A2(
					$elm_explorations$test$Simplify$keepIfBetter,
					go(runWithIncrementedRightBucket).newState.randomRun,
					newState);
				return afterIncrementAndShrink.wasImprovement ? afterIncrementAndShrink : afterSwap;
			}
		}
	});
var $elm_explorations$test$RandomRun$replaceChunkWithZero = F2(
	function (chunk, run) {
		if (A2($elm_explorations$test$RandomRun$isInBounds, chunk, run)) {
			var list = $elm_explorations$test$Queue$toList(run.data);
			return _Utils_update(
				run,
				{
					data: $elm_explorations$test$Queue$fromList(
						$elm_explorations$test$MicroListExtra$fastConcat(
							_List_fromArray(
								[
									A2($elm$core$List$take, chunk.startIndex, list),
									A2($elm$core$List$repeat, chunk.size, 0),
									A2($elm$core$List$drop, chunk.startIndex + chunk.size, list)
								])))
				});
		} else {
			return run;
		}
	});
var $elm_explorations$test$Simplify$replaceChunkWithZero = F2(
	function (chunk, state) {
		var simplifiedRun = A2($elm_explorations$test$RandomRun$replaceChunkWithZero, chunk, state.randomRun);
		return A2($elm_explorations$test$Simplify$keepIfBetter, simplifiedRun, state);
	});
var $elm_explorations$test$RandomRun$getChunk = F2(
	function (chunk, run) {
		return A2($elm_explorations$test$RandomRun$isInBounds, chunk, run) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$List$take,
				chunk.size,
				A2(
					$elm$core$List$drop,
					chunk.startIndex,
					$elm_explorations$test$Queue$toList(run.data)))) : $elm$core$Maybe$Nothing;
	});
var $elm$core$List$sort = function (xs) {
	return A2($elm$core$List$sortBy, $elm$core$Basics$identity, xs);
};
var $elm_explorations$test$RandomRun$sortChunk = F2(
	function (chunk, run) {
		var _v0 = A2($elm_explorations$test$RandomRun$getChunk, chunk, run);
		if (_v0.$ === 'Nothing') {
			return run;
		} else {
			var chunkData = _v0.a;
			var sortedIndexed = A2(
				$elm$core$List$indexedMap,
				F2(
					function (i, value) {
						return _Utils_Tuple2(chunk.startIndex + i, value);
					}),
				$elm$core$List$sort(chunkData));
			return A2($elm_explorations$test$RandomRun$replace, sortedIndexed, run);
		}
	});
var $elm_explorations$test$Simplify$sortChunk = F2(
	function (chunk, state) {
		var simplifiedRun = A2($elm_explorations$test$RandomRun$sortChunk, chunk, state.randomRun);
		return A2($elm_explorations$test$Simplify$keepIfBetter, simplifiedRun, state);
	});
var $elm_explorations$test$RandomRun$swapChunks = F2(
	function (_v0, run) {
		var leftChunk = _v0.leftChunk;
		var rightChunk = _v0.rightChunk;
		var list = $elm_explorations$test$Queue$toList(run.data);
		return A3(
			$elm$core$Maybe$map2,
			F2(
				function (lefts, rights) {
					return A3(
						$elm_explorations$test$RandomRun$replaceInList,
						$elm$core$List$concat(
							_List_fromArray(
								[
									A2(
									$elm$core$List$indexedMap,
									F2(
										function (i, n) {
											return _Utils_Tuple2(rightChunk.startIndex + i, n);
										}),
									lefts),
									A2(
									$elm$core$List$indexedMap,
									F2(
										function (i, n) {
											return _Utils_Tuple2(leftChunk.startIndex + i, n);
										}),
									rights)
								])),
						run.length,
						list);
				}),
			A2($elm_explorations$test$RandomRun$getChunk, leftChunk, run),
			A2($elm_explorations$test$RandomRun$getChunk, rightChunk, run));
	});
var $elm_explorations$test$Simplify$swapChunkWithNeighbour = F2(
	function (chunk, state) {
		var otherChunk = {size: chunk.size, startIndex: chunk.startIndex + chunk.size};
		return A2(
			$elm$core$Maybe$withDefault,
			$elm_explorations$test$Simplify$noImprovement(state),
			A2(
				$elm$core$Maybe$map,
				function (simplifiedRun) {
					return A2($elm_explorations$test$Simplify$keepIfBetter, simplifiedRun, state);
				},
				A2(
					$elm_explorations$test$RandomRun$swapChunks,
					{leftChunk: chunk, rightChunk: otherChunk},
					state.randomRun)));
	});
var $elm_explorations$test$Simplify$runCmd = F2(
	function (cmd, state) {
		var result = function () {
			var _v0 = cmd.type_;
			switch (_v0.$) {
				case 'DeleteChunkAndMaybeDecrementPrevious':
					var chunk = _v0.a;
					return A2($elm_explorations$test$Simplify$deleteChunkAndMaybeDecrementPrevious, chunk, state);
				case 'ReplaceChunkWithZero':
					var chunk = _v0.a;
					return A2($elm_explorations$test$Simplify$replaceChunkWithZero, chunk, state);
				case 'SortChunk':
					var chunk = _v0.a;
					return A2($elm_explorations$test$Simplify$sortChunk, chunk, state);
				case 'MinimizeFloat':
					var options = _v0.a;
					return A2($elm_explorations$test$Simplify$minimizeFloat, options, state);
				case 'MinimizeChoice':
					var options = _v0.a;
					return A2($elm_explorations$test$Simplify$minimizeChoice, options, state);
				case 'RedistributeChoicesAndMaybeIncrement':
					var options = _v0.a;
					return A2($elm_explorations$test$Simplify$redistributeChoicesAndMaybeIncrement, options, state);
				case 'DecrementTogether':
					var options = _v0.a;
					return A2($elm_explorations$test$Simplify$decrementTogether, options, state);
				default:
					var chunk = _v0.a;
					return A2($elm_explorations$test$Simplify$swapChunkWithNeighbour, chunk, state);
			}
		}();
		return result;
	});
var $elm_explorations$test$Simplify$runCmds = F2(
	function (cmds, state) {
		runCmds:
		while (true) {
			if (!cmds.b) {
				return state;
			} else {
				var cmd = cmds.a;
				var rest = cmds.b;
				var _v1 = A2($elm_explorations$test$Simplify$runCmd, cmd, state);
				var wasImprovement = _v1.wasImprovement;
				var newState = _v1.newState;
				var newLength = $elm_explorations$test$RandomRun$length(newState.randomRun);
				var newRest = (wasImprovement && (_Utils_cmp(
					newLength,
					$elm_explorations$test$RandomRun$length(state.randomRun)) < 0)) ? A2(
					$elm$core$List$filter,
					function (_v2) {
						var minLength = _v2.minLength;
						return _Utils_cmp(newLength, minLength) > -1;
					},
					rest) : rest;
				var $temp$cmds = newRest,
					$temp$state = newState;
				cmds = $temp$cmds;
				state = $temp$state;
				continue runCmds;
			}
		}
	});
var $elm_explorations$test$Simplify$simplifyOnce = function (state) {
	return A2(
		$elm_explorations$test$Simplify$runCmds,
		$elm_explorations$test$Simplify$Cmd$cmdsForRun(state.randomRun),
		state);
};
var $elm_explorations$test$Simplify$simplifyWhileProgress = function (state) {
	simplifyWhileProgress:
	while (true) {
		var nextState = $elm_explorations$test$Simplify$simplifyOnce(state);
		if (A2($elm_explorations$test$RandomRun$equal, nextState.randomRun, state.randomRun)) {
			return _Utils_Tuple3(nextState.value, nextState.randomRun, nextState.expectation);
		} else {
			var $temp$state = nextState;
			state = $temp$state;
			continue simplifyWhileProgress;
		}
	}
};
var $elm_explorations$test$Simplify$simplify = function (state) {
	return $elm_explorations$test$RandomRun$isEmpty(state.randomRun) ? _Utils_Tuple3(state.value, state.randomRun, state.expectation) : $elm_explorations$test$Simplify$simplifyWhileProgress(state);
};
var $elm_explorations$test$Test$Fuzz$findSimplestFailure = function (state) {
	var _v0 = $elm_explorations$test$Simplify$simplify(state);
	var simplestValue = _v0.a;
	var expectation = _v0.c;
	return {
		expectation: expectation,
		given: $elm$core$Maybe$Just(
			$elm_explorations$test$Test$Internal$toString(simplestValue))
	};
};
var $elm_explorations$test$Test$Fuzz$testGeneratedValue = function (state) {
	var _v0 = state.expectation;
	if (_v0.$ === 'Pass') {
		return $elm$core$Maybe$Nothing;
	} else {
		return $elm$core$Maybe$Just(
			$elm_explorations$test$Test$Fuzz$findSimplestFailure(state));
	}
};
var $elm_explorations$test$Test$Fuzz$runOnce = F2(
	function (c, state) {
		var genResult = A2(
			$elm_explorations$test$Fuzz$Internal$generate,
			$elm_explorations$test$PRNG$random(state.currentSeed),
			c.fuzzer);
		var maybeNextSeed = $elm_explorations$test$PRNG$getSeed(
			$elm_explorations$test$GenResult$getPrng(genResult));
		var nextSeed = function () {
			if (maybeNextSeed.$ === 'Just') {
				var seed = maybeNextSeed.a;
				return seed;
			} else {
				return $elm_explorations$test$Test$Fuzz$stepSeed(state.currentSeed);
			}
		}();
		var _v0 = function () {
			if (genResult.$ === 'Rejected') {
				var reason = genResult.a.reason;
				return _Utils_Tuple2(
					$elm$core$Maybe$Just(
						{
							expectation: $elm_explorations$test$Test$Expectation$fail(
								{
									description: reason,
									reason: $elm_explorations$test$Test$Runner$Failure$Invalid($elm_explorations$test$Test$Runner$Failure$InvalidFuzzer)
								}),
							given: $elm$core$Maybe$Nothing
						}),
					state.distributionCount);
			} else {
				var prng = genResult.a.prng;
				var value = genResult.a.value;
				var failure = $elm_explorations$test$Test$Fuzz$testGeneratedValue(
					{
						expectation: c.testFn(value),
						fuzzer: c.fuzzer,
						getExpectation: c.testFn,
						randomRun: $elm_explorations$test$PRNG$getRun(prng),
						value: value
					});
				var distributionCounter = A3(
					$elm$core$Maybe$map2,
					F2(
						function (labels, old) {
							var foundLabels = A2(
								$elm$core$List$filterMap,
								function (_v2) {
									var label = _v2.a;
									var predicate = _v2.b;
									return predicate(value) ? $elm$core$Maybe$Just(label) : $elm$core$Maybe$Nothing;
								},
								labels);
							return A2($elm_explorations$test$MicroDictExtra$increment, foundLabels, old);
						}),
					$elm_explorations$test$Test$Distribution$Internal$getDistributionLabels(c.distribution),
					state.distributionCount);
				return _Utils_Tuple2(failure, distributionCounter);
			}
		}();
		var maybeFailure = _v0.a;
		var newDistributionCounter = _v0.b;
		return _Utils_update(
			state,
			{currentSeed: nextSeed, distributionCount: newDistributionCounter, failure: maybeFailure, runsElapsed: state.runsElapsed + 1});
	});
var $elm_explorations$test$Test$Fuzz$runNTimes = F3(
	function (times, c, state) {
		runNTimes:
		while (true) {
			if ((times <= 0) || (!_Utils_eq(state.failure, $elm$core$Maybe$Nothing))) {
				return state;
			} else {
				var $temp$times = times - 1,
					$temp$c = c,
					$temp$state = A2($elm_explorations$test$Test$Fuzz$runOnce, c, state);
				times = $temp$times;
				c = $temp$c;
				state = $temp$state;
				continue runNTimes;
			}
		}
	});
var $elm_explorations$test$Test$Fuzz$fuzzLoop = F2(
	function (c, state) {
		fuzzLoop:
		while (true) {
			var _v0 = state.failure;
			if (_v0.$ === 'Just') {
				var failure = _v0.a;
				return {
					distributionReport: function () {
						var _v1 = state.distributionCount;
						if (_v1.$ === 'Nothing') {
							return $elm_explorations$test$Test$Distribution$NoDistribution;
						} else {
							var distributionCount = _v1.a;
							return $elm_explorations$test$Test$Distribution$DistributionToReport(
								{
									distributionCount: $elm_explorations$test$Test$Fuzz$includeCombinationsInBaseCounts(distributionCount),
									runsElapsed: state.runsElapsed
								});
						}
					}(),
					failure: $elm$core$Maybe$Just(failure)
				};
			} else {
				if (_Utils_cmp(state.runsElapsed, c.runsNeeded) < 0) {
					var newState = A3($elm_explorations$test$Test$Fuzz$runNTimes, c.runsNeeded - state.runsElapsed, c, state);
					var $temp$c = c,
						$temp$state = newState;
					c = $temp$c;
					state = $temp$state;
					continue fuzzLoop;
				} else {
					var _v2 = c.distribution;
					switch (_v2.$) {
						case 'NoDistributionNeeded':
							return {distributionReport: $elm_explorations$test$Test$Distribution$NoDistribution, failure: $elm$core$Maybe$Nothing};
						case 'ReportDistribution':
							var _v3 = state.distributionCount;
							if (_v3.$ === 'Nothing') {
								return $elm_explorations$test$Test$Fuzz$distributionBugRunResult;
							} else {
								var distributionCount = _v3.a;
								return {
									distributionReport: $elm_explorations$test$Test$Distribution$DistributionToReport(
										{
											distributionCount: $elm_explorations$test$Test$Fuzz$includeCombinationsInBaseCounts(distributionCount),
											runsElapsed: state.runsElapsed
										}),
									failure: $elm$core$Maybe$Nothing
								};
							}
						default:
							var normalizedDistributionCount = A2($elm$core$Maybe$map, $elm_explorations$test$Test$Fuzz$includeCombinationsInBaseCounts, state.distributionCount);
							if (A3($elm_explorations$test$Test$Fuzz$allSufficientlyCovered, c, state, normalizedDistributionCount)) {
								var _v4 = A3($elm_explorations$test$Test$Fuzz$findBadZeroRelatedCase, c, state, normalizedDistributionCount);
								if (_v4.$ === 'Nothing') {
									if (normalizedDistributionCount.$ === 'Nothing') {
										return $elm_explorations$test$Test$Fuzz$distributionBugRunResult;
									} else {
										var distributionCount = normalizedDistributionCount.a;
										return {
											distributionReport: $elm_explorations$test$Test$Distribution$DistributionCheckSucceeded(
												{distributionCount: distributionCount, runsElapsed: state.runsElapsed}),
											failure: $elm$core$Maybe$Nothing
										};
									}
								} else {
									var failedLabel = _v4.a;
									return A2($elm_explorations$test$Test$Fuzz$distributionFailRunResult, normalizedDistributionCount, failedLabel);
								}
							} else {
								var _v6 = A3($elm_explorations$test$Test$Fuzz$findInsufficientlyCoveredLabel, c, state, normalizedDistributionCount);
								if (_v6.$ === 'Nothing') {
									var newState = A3(
										$elm_explorations$test$Test$Fuzz$runNTimes,
										A2($elm$core$Basics$pow, 2, state.nextPowerOfTwo),
										c,
										state);
									var $temp$c = c,
										$temp$state = _Utils_update(
										newState,
										{nextPowerOfTwo: newState.nextPowerOfTwo + 1});
									c = $temp$c;
									state = $temp$state;
									continue fuzzLoop;
								} else {
									var failedLabel = _v6.a;
									return A2($elm_explorations$test$Test$Fuzz$distributionFailRunResult, normalizedDistributionCount, failedLabel);
								}
							}
					}
				}
			}
		}
	});
var $elm_explorations$test$Test$Fuzz$initLoopState = F2(
	function (initialSeed, distribution) {
		var initialDistributionCount = A2(
			$elm$core$Maybe$map,
			function (labels) {
				return $elm$core$Dict$fromList(
					A2(
						$elm$core$List$map,
						function (_v0) {
							var label = _v0.a;
							return _Utils_Tuple2(
								_List_fromArray(
									[label]),
								0);
						},
						labels));
			},
			$elm_explorations$test$Test$Distribution$Internal$getDistributionLabels(distribution));
		return {currentSeed: initialSeed, distributionCount: initialDistributionCount, failure: $elm$core$Maybe$Nothing, nextPowerOfTwo: 1, runsElapsed: 0};
	});
var $elm_explorations$test$Test$Expectation$withDistributionReport = F2(
	function (newDistributionReport, expectation) {
		if (expectation.$ === 'Fail') {
			var failure = expectation.a;
			return $elm_explorations$test$Test$Expectation$Fail(
				_Utils_update(
					failure,
					{distributionReport: newDistributionReport}));
		} else {
			var pass = expectation.a;
			return $elm_explorations$test$Test$Expectation$Pass(
				_Utils_update(
					pass,
					{distributionReport: newDistributionReport}));
		}
	});
var $elm_explorations$test$Test$Fuzz$validatedFuzzTest = F3(
	function (fuzzer, getExpectation, distribution) {
		return $elm_explorations$test$Test$Internal$ElmTestVariant__FuzzTest(
			F2(
				function (seed, runs) {
					var runResult = A2(
						$elm_explorations$test$Test$Fuzz$fuzzLoop,
						{distribution: distribution, fuzzer: fuzzer, initialSeed: seed, runsNeeded: runs, testFn: getExpectation},
						A2($elm_explorations$test$Test$Fuzz$initLoopState, seed, distribution));
					var _v0 = runResult.failure;
					if (_v0.$ === 'Nothing') {
						return _List_fromArray(
							[
								$elm_explorations$test$Test$Expectation$Pass(
								{distributionReport: runResult.distributionReport})
							]);
					} else {
						var failure = _v0.a;
						return _List_fromArray(
							[
								$elm_explorations$test$Test$Fuzz$formatExpectation(
								_Utils_update(
									failure,
									{
										expectation: A2($elm_explorations$test$Test$Expectation$withDistributionReport, runResult.distributionReport, failure.expectation)
									}))
							]);
					}
				}));
	});
var $elm_explorations$test$Test$Fuzz$fuzzTest = F4(
	function (distribution, fuzzer, untrimmedDesc, getExpectation) {
		var desc = $elm$core$String$trim(untrimmedDesc);
		return $elm$core$String$isEmpty(desc) ? $elm_explorations$test$Test$Internal$blankDescriptionFailure : A2(
			$elm_explorations$test$Test$Internal$ElmTestVariant__Labeled,
			desc,
			A3($elm_explorations$test$Test$Fuzz$validatedFuzzTest, fuzzer, getExpectation, distribution));
	});
var $elm_explorations$test$Test$fuzz = $elm_explorations$test$Test$Fuzz$fuzzTest($elm_explorations$test$Test$Distribution$Internal$NoDistributionNeeded);
var $elm_explorations$test$Expect$ok = function (result) {
	if (result.$ === 'Ok') {
		return $elm_explorations$test$Expect$pass;
	} else {
		return $elm_explorations$test$Test$Expectation$fail(
			{
				description: 'Expect.ok',
				reason: A2(
					$elm_explorations$test$Test$Runner$Failure$Comparison,
					'Ok _',
					$elm_explorations$test$Test$Internal$toString(result))
			});
	}
};
var $elm_explorations$test$Fuzz$Internal$Fuzzer = function (a) {
	return {$: 'Fuzzer', a: a};
};
var $elm_explorations$test$GenResult$Generated = function (a) {
	return {$: 'Generated', a: a};
};
var $elm_explorations$test$Fuzz$constant = function (x) {
	return $elm_explorations$test$Fuzz$Internal$Fuzzer(
		function (prng) {
			return $elm_explorations$test$GenResult$Generated(
				{prng: prng, value: x});
		});
};
var $elm_explorations$test$GenResult$Rejected = function (a) {
	return {$: 'Rejected', a: a};
};
var $elm_explorations$test$Fuzz$andThen = F2(
	function (fn, _v0) {
		var fuzzer = _v0.a;
		return $elm_explorations$test$Fuzz$Internal$Fuzzer(
			function (prng) {
				var _v1 = fuzzer(prng);
				if (_v1.$ === 'Generated') {
					var g = _v1.a;
					var _v2 = fn(g.value);
					var newFuzzer = _v2.a;
					return newFuzzer(g.prng);
				} else {
					var r = _v1.a;
					return $elm_explorations$test$GenResult$Rejected(r);
				}
			});
	});
var $elm_explorations$test$Fuzz$invalid = function (reason) {
	return $elm_explorations$test$Fuzz$Internal$Fuzzer(
		function (prng) {
			return $elm_explorations$test$GenResult$Rejected(
				{prng: prng, reason: reason});
		});
};
var $elm_explorations$test$Queue$queue = F2(
	function (fl, rl) {
		if (!fl.b) {
			return A2(
				$elm_explorations$test$Queue$Queue,
				$elm$core$List$reverse(rl),
				_List_Nil);
		} else {
			return A2($elm_explorations$test$Queue$Queue, fl, rl);
		}
	});
var $elm_explorations$test$Queue$enqueue = F2(
	function (a, _v0) {
		var fl = _v0.a;
		var rl = _v0.b;
		return A2(
			$elm_explorations$test$Queue$queue,
			fl,
			A2($elm$core$List$cons, a, rl));
	});
var $elm_explorations$test$RandomRun$append = F2(
	function (n, run) {
		return _Utils_update(
			run,
			{
				data: A2($elm_explorations$test$Queue$enqueue, n, run.data),
				length: run.length + 1
			});
	});
var $elm_explorations$test$Queue$dequeue = function (_v0) {
	var fl = _v0.a;
	var rl = _v0.b;
	if (!fl.b) {
		return _Utils_Tuple2(
			$elm$core$Maybe$Nothing,
			A2($elm_explorations$test$Queue$Queue, _List_Nil, _List_Nil));
	} else {
		var head = fl.a;
		var tail = fl.b;
		return _Utils_Tuple2(
			$elm$core$Maybe$Just(head),
			A2($elm_explorations$test$Queue$queue, tail, rl));
	}
};
var $elm_explorations$test$RandomRun$nextChoice = function (run) {
	var _v0 = $elm_explorations$test$Queue$dequeue(run.data);
	if (_v0.a.$ === 'Nothing') {
		var _v1 = _v0.a;
		return $elm$core$Maybe$Nothing;
	} else {
		var first = _v0.a.a;
		var rest = _v0.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(
				first,
				_Utils_update(
					run,
					{data: rest, length: run.length - 1})));
	}
};
var $elm_explorations$test$Fuzz$rollDice = F2(
	function (maxValue, diceGenerator) {
		return $elm_explorations$test$Fuzz$Internal$Fuzzer(
			function (prng) {
				if (prng.$ === 'Random') {
					var r = prng.a;
					var _v1 = A2($elm$random$Random$step, diceGenerator, r.seed);
					var diceRoll = _v1.a;
					var newSeed = _v1.b;
					return (diceRoll < 0) ? $elm_explorations$test$GenResult$Rejected(
						{prng: prng, reason: 'elm-test bug: generated a choice < 0'}) : ((_Utils_cmp(diceRoll, maxValue) > 0) ? $elm_explorations$test$GenResult$Rejected(
						{prng: prng, reason: 'elm-test bug: generated a choice > maxChoice'}) : $elm_explorations$test$GenResult$Generated(
						{
							prng: $elm_explorations$test$PRNG$Random(
								{
									run: A2($elm_explorations$test$RandomRun$append, diceRoll, r.run),
									seed: newSeed
								}),
							value: diceRoll
						}));
				} else {
					var h = prng.a;
					var _v2 = $elm_explorations$test$RandomRun$nextChoice(h.unusedPart);
					if (_v2.$ === 'Nothing') {
						return $elm_explorations$test$GenResult$Rejected(
							{prng: prng, reason: 'elm-test internals: hardcoded PRNG run out of numbers'});
					} else {
						var _v3 = _v2.a;
						var hardcodedChoice = _v3.a;
						var restOfChoices = _v3.b;
						return (hardcodedChoice < 0) ? $elm_explorations$test$GenResult$Rejected(
							{prng: prng, reason: 'elm-test internals: generated a choice < 0'}) : ((_Utils_cmp(hardcodedChoice, maxValue) > 0) ? $elm_explorations$test$GenResult$Rejected(
							{prng: prng, reason: 'elm-test internals: generated a choice > maxChoice'}) : $elm_explorations$test$GenResult$Generated(
							{
								prng: $elm_explorations$test$PRNG$Hardcoded(
									_Utils_update(
										h,
										{unusedPart: restOfChoices})),
								value: hardcodedChoice
							}));
					}
				}
			});
	});
var $elm_explorations$test$Fuzz$uniformInt = function (n) {
	return A2(
		$elm_explorations$test$Fuzz$rollDice,
		n,
		A2($elm$random$Random$int, 0, n));
};
var $elm_explorations$test$Fuzz$oneOfHelp = F3(
	function (functionName, itemName, fuzzers) {
		var _v0 = $elm$core$List$length(fuzzers);
		if (!_v0) {
			return $elm_explorations$test$Fuzz$invalid(functionName + ': You must provide at least one item.');
		} else {
			var length = _v0;
			return A2(
				$elm_explorations$test$Fuzz$andThen,
				function (i) {
					var _v1 = A2($elm_explorations$test$MicroListExtra$getAt, i, fuzzers);
					if (_v1.$ === 'Nothing') {
						return $elm_explorations$test$Fuzz$invalid(
							'elm-test bug: ' + (functionName + (' didn\'t find a ' + (itemName + (' at position ' + ($elm$core$String$fromInt(i) + (' in the list of length ' + ($elm$core$String$fromInt(length) + '.'))))))));
					} else {
						var fuzzer = _v1.a;
						return fuzzer;
					}
				},
				$elm_explorations$test$Fuzz$uniformInt(length - 1));
		}
	});
var $elm_explorations$test$Fuzz$oneOfValues = function (values) {
	return A3(
		$elm_explorations$test$Fuzz$oneOfHelp,
		'Fuzz.oneOfValues',
		'value',
		A2($elm$core$List$map, $elm_explorations$test$Fuzz$constant, values));
};
var $author$project$PostTests$postWithMissingField = function (fieldToDrop) {
	return $elm$json$Json$Encode$object(
		A2(
			$elm$core$List$filter,
			function (_v0) {
				var fieldName = _v0.a;
				return !_Utils_eq(fieldToDrop, fieldName);
			},
			$author$project$PostTests$fields));
};
var $author$project$PostTests$suite = A2(
	$elm_explorations$test$Test$describe,
	'module Post',
	_List_fromArray(
		[
			A2(
			$elm_explorations$test$Test$describe,
			'Post.decode',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'decode parses post correctly',
					function (_v0) {
						return $elm_explorations$test$Expect$ok(
							A2(
								$elm$json$Json$Decode$decodeString,
								$author$project$Model$Post$decode,
								A2($elm$json$Json$Encode$encode, 0, $author$project$PostTests$completePost)));
					}),
					A3(
					$elm_explorations$test$Test$fuzz,
					$elm_explorations$test$Fuzz$oneOfValues($author$project$PostTests$fieldNames),
					'decode fails if a field is missing',
					function (fieldToDrop) {
						return $elm_explorations$test$Expect$err(
							A2(
								$elm$json$Json$Decode$decodeString,
								$author$project$Model$Post$decode,
								A2(
									$elm$json$Json$Encode$encode,
									0,
									$author$project$PostTests$postWithMissingField(fieldToDrop))));
					})
				]))
		]));
var $author$project$PostsViewTests$PostsToShowSelect = function (a) {
	return {$: 'PostsToShowSelect', a: a};
};
var $author$project$PostsViewTests$ShowJobPostsCheckbox = function (a) {
	return {$: 'ShowJobPostsCheckbox', a: a};
};
var $author$project$PostsViewTests$ShowTextOnlyPostsCheckbox = function (a) {
	return {$: 'ShowTextOnlyPostsCheckbox', a: a};
};
var $author$project$PostsViewTests$SortBySelect = function (a) {
	return {$: 'SortBySelect', a: a};
};
var $elm_explorations$test$Test$Runner$Failure$ListDiff = F2(
	function (a, b) {
		return {$: 'ListDiff', a: a, b: b};
	});
var $elm_explorations$test$Expect$equalLists = F2(
	function (expected, actual) {
		return _Utils_eq(expected, actual) ? $elm_explorations$test$Expect$pass : $elm_explorations$test$Test$Expectation$fail(
			{
				description: 'Expect.equalLists',
				reason: A2(
					$elm_explorations$test$Test$Runner$Failure$ListDiff,
					A2($elm$core$List$map, $elm_explorations$test$Test$Internal$toString, expected),
					A2($elm$core$List$map, $elm_explorations$test$Test$Internal$toString, actual))
			});
	});
var $author$project$TestUtils$expectEach = F2(
	function (expectation, l) {
		return A2(
			$elm_explorations$test$Expect$all,
			A2(
				$elm$core$List$map,
				F2(
					function (i, list) {
						return A2(
							$elm$core$Maybe$withDefault,
							$elm_explorations$test$Expect$fail('should not happen'),
							A2(
								$elm$core$Maybe$map,
								function (e) {
									return expectation(e);
								},
								$elm$core$List$head(
									A2($elm$core$List$drop, i, list))));
					}),
				A2(
					$elm$core$List$range,
					0,
					$elm$core$List$length(l) - 1)),
			l);
	});
var $elm_explorations$test$Expect$onFail = F2(
	function (str, expectation) {
		if (expectation.$ === 'Pass') {
			return expectation;
		} else {
			var failure = expectation.a;
			return $elm_explorations$test$Test$Expectation$Fail(
				_Utils_update(
					failure,
					{description: str, reason: $elm_explorations$test$Test$Runner$Failure$Custom}));
		}
	});
var $elm$core$Debug$toString = _Debug_toString;
var $author$project$PostsViewTests$triggerConfigChangedEvent = function (ty) {
	var _v0 = function () {
		switch (ty.$) {
			case 'ShowJobPostsCheckbox':
				var value = ty.a;
				return _Utils_Tuple2(
					_List_fromArray(
						[
							$elm_explorations$test$Test$Html$Selector$tag('input'),
							$elm_explorations$test$Test$Html$Selector$attribute(
							$elm$html$Html$Attributes$type_('checkbox')),
							$elm_explorations$test$Test$Html$Selector$id('checkbox-show-job-posts')
						]),
					$elm_explorations$test$Test$Html$Event$check(value));
			case 'ShowTextOnlyPostsCheckbox':
				var value = ty.a;
				return _Utils_Tuple2(
					_List_fromArray(
						[
							$elm_explorations$test$Test$Html$Selector$tag('input'),
							$elm_explorations$test$Test$Html$Selector$attribute(
							$elm$html$Html$Attributes$type_('checkbox')),
							$elm_explorations$test$Test$Html$Selector$id('checkbox-show-text-only-posts')
						]),
					$elm_explorations$test$Test$Html$Event$check(value));
			case 'PostsToShowSelect':
				var value = ty.a;
				return _Utils_Tuple2(
					_List_fromArray(
						[
							$elm_explorations$test$Test$Html$Selector$tag('select'),
							$elm_explorations$test$Test$Html$Selector$id('select-posts-per-page')
						]),
					$elm_explorations$test$Test$Html$Event$input(
						$elm$core$String$fromInt(value)));
			default:
				var value = ty.a;
				return _Utils_Tuple2(
					_List_fromArray(
						[
							$elm_explorations$test$Test$Html$Selector$tag('select'),
							$elm_explorations$test$Test$Html$Selector$id('select-sort-by')
						]),
					$elm_explorations$test$Test$Html$Event$input(
						$author$project$Model$PostsConfig$sortToString(value)));
		}
	}();
	var selector = _v0.a;
	var event = _v0.b;
	return A2(
		$elm$core$Result$andThen,
		function (evt) {
			if (evt.$ === 'ConfigChanged') {
				var change = evt.a;
				return $elm$core$Result$Ok(change);
			} else {
				return $elm$core$Result$Err('Other message');
			}
		},
		$elm_explorations$test$Test$Html$Event$toResult(
			A2(
				$elm_explorations$test$Test$Html$Event$simulate,
				event,
				A2(
					$elm_explorations$test$Test$Html$Query$find,
					selector,
					$elm_explorations$test$Test$Html$Query$fromHtml(
						$author$project$View$Posts$postsConfigView($author$project$Model$PostsConfig$defaultConfig))))));
};
var $author$project$PostsConfigTests$suite = A2(
	$elm_explorations$test$Test$describe,
	'module Model.PostsConfig',
	_List_fromArray(
		[
			A2(
			$elm_explorations$test$Test$describe,
			'showTextOnly',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'text posts are removed when showTextOnly is False',
					function (_v0) {
						return A2(
							$author$project$TestUtils$expectEach,
							function (e) {
								return A2(
									$elm_explorations$test$Expect$onFail,
									'Found post where the url field is Nothing: ' + $elm$core$Debug$toString(e),
									A2(
										$elm_explorations$test$Expect$equal,
										true,
										!_Utils_eq(e.url, $elm$core$Maybe$Nothing)));
							},
							A2(
								$author$project$Model$PostsConfig$filterPosts,
								A5($author$project$Model$PostsConfig$PostsConfig, 50, 50, $author$project$Model$PostsConfig$None, true, false),
								$author$project$TestData$posts));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'showJobs',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'job posts are removed when showJobs is False',
					function (_v1) {
						return A2(
							$author$project$TestUtils$expectEach,
							function (e) {
								return A2(
									$elm_explorations$test$Expect$onFail,
									'Found post where the type_ field is \"job\": ' + $elm$core$Debug$toString(e),
									A2($elm_explorations$test$Expect$equal, true, e.type_ !== 'job'));
							},
							A2(
								$author$project$Model$PostsConfig$filterPosts,
								A5($author$project$Model$PostsConfig$PostsConfig, 50, 50, $author$project$Model$PostsConfig$None, false, true),
								$author$project$TestData$posts));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'postsToShow',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'the number of posts returned is at most postsToShow',
					function (_v2) {
						return A2(
							$elm_explorations$test$Expect$equalLists,
							A2($elm$core$List$take, 10, $author$project$TestData$posts),
							A2(
								$author$project$Model$PostsConfig$filterPosts,
								A5($author$project$Model$PostsConfig$PostsConfig, 50, 10, $author$project$Model$PostsConfig$None, true, true),
								$author$project$TestData$posts));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'sortBy',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'The final list is not sorted when sortBy is None',
					function (_v3) {
						return A2(
							$elm_explorations$test$Expect$equalLists,
							A2($elm$core$List$take, 10, $author$project$TestData$posts),
							A2(
								$author$project$Model$PostsConfig$filterPosts,
								A5($author$project$Model$PostsConfig$PostsConfig, 50, 10, $author$project$Model$PostsConfig$None, true, true),
								$author$project$TestData$posts));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'The final list is sorted by title when sortBy is Title',
					function (_v4) {
						return A2(
							$elm_explorations$test$Expect$equalLists,
							A2(
								$elm$core$List$sortBy,
								function ($) {
									return $.title;
								},
								A2($elm$core$List$take, 10, $author$project$TestData$posts)),
							A2(
								$author$project$Model$PostsConfig$filterPosts,
								A5($author$project$Model$PostsConfig$PostsConfig, 50, 10, $author$project$Model$PostsConfig$Title, true, true),
								$author$project$TestData$posts));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'The final list is sorted descending by score when sortBy is Score',
					function (_v5) {
						return A2(
							$elm_explorations$test$Expect$equalLists,
							$elm$core$List$reverse(
								A2(
									$elm$core$List$sortBy,
									function ($) {
										return $.score;
									},
									A2($elm$core$List$take, 10, $author$project$TestData$posts))),
							A2(
								$author$project$Model$PostsConfig$filterPosts,
								A5($author$project$Model$PostsConfig$PostsConfig, 50, 10, $author$project$Model$PostsConfig$Score, true, true),
								$author$project$TestData$posts));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'applyChanges',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'The ConfigChange message is sent when the \"Show job posts\" checkbox is clicked',
					function (_v6) {
						return A2(
							$elm$core$Result$withDefault,
							$elm_explorations$test$Expect$fail('Invalid message'),
							A2(
								$elm$core$Result$map,
								$elm_explorations$test$Expect$equal(
									_Utils_update(
										$author$project$Model$PostsConfig$defaultConfig,
										{showJobs: true})),
								A2(
									$elm$core$Result$map,
									function (change) {
										return A2($author$project$Model$PostsConfig$applyChanges, change, $author$project$Model$PostsConfig$defaultConfig);
									},
									$author$project$PostsViewTests$triggerConfigChangedEvent(
										$author$project$PostsViewTests$ShowJobPostsCheckbox(true)))));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'The ConfigChange message is sent when the \"Show text only posts\" checkbox is clicked',
					function (_v7) {
						return A2(
							$elm$core$Result$withDefault,
							$elm_explorations$test$Expect$fail('Invalid message'),
							A2(
								$elm$core$Result$map,
								$elm_explorations$test$Expect$equal(
									_Utils_update(
										$author$project$Model$PostsConfig$defaultConfig,
										{showTextOnly: false})),
								A2(
									$elm$core$Result$map,
									function (change) {
										return A2($author$project$Model$PostsConfig$applyChanges, change, $author$project$Model$PostsConfig$defaultConfig);
									},
									$author$project$PostsViewTests$triggerConfigChangedEvent(
										$author$project$PostsViewTests$ShowTextOnlyPostsCheckbox(false)))));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'The ConfigChange message is sent when the \"Posts to show\" select is changed',
					function (_v8) {
						return A2(
							$elm$core$Result$withDefault,
							$elm_explorations$test$Expect$fail('Invalid message'),
							A2(
								$elm$core$Result$map,
								$elm_explorations$test$Expect$equal(
									_Utils_update(
										$author$project$Model$PostsConfig$defaultConfig,
										{postsToShow: 50})),
								A2(
									$elm$core$Result$map,
									function (change) {
										return A2($author$project$Model$PostsConfig$applyChanges, change, $author$project$Model$PostsConfig$defaultConfig);
									},
									$author$project$PostsViewTests$triggerConfigChangedEvent(
										$author$project$PostsViewTests$PostsToShowSelect(50)))));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'The ConfigChange message is sent when the \"Sort by\" select is changed',
					function (_v9) {
						return A2(
							$elm$core$Result$withDefault,
							$elm_explorations$test$Expect$fail('Invalid message'),
							A2(
								$elm$core$Result$map,
								$elm_explorations$test$Expect$equal(
									_Utils_update(
										$author$project$Model$PostsConfig$defaultConfig,
										{sortBy: $author$project$Model$PostsConfig$Title})),
								A2(
									$elm$core$Result$map,
									function (change) {
										return A2($author$project$Model$PostsConfig$applyChanges, change, $author$project$Model$PostsConfig$defaultConfig);
									},
									$author$project$PostsViewTests$triggerConfigChangedEvent(
										$author$project$PostsViewTests$SortBySelect($author$project$Model$PostsConfig$Title)))));
					})
				]))
		]));
var $elm_explorations$test$Expect$compareWith = $elm_explorations$test$Expect$testWith($elm_explorations$test$Test$Runner$Failure$Comparison);
var $elm_explorations$test$Expect$atLeast = A2($elm_explorations$test$Expect$compareWith, 'Expect.atLeast', $elm$core$Basics$ge);
var $elm_explorations$test$Test$Html$Selector$Internal$Class = function (a) {
	return {$: 'Class', a: a};
};
var $elm_explorations$test$Test$Html$Selector$class = $elm_explorations$test$Test$Html$Selector$Internal$Class;
var $elm_explorations$test$Test$Html$Internal$Inert$fromElmHtml = $elm_explorations$test$Test$Html$Internal$Inert$Node;
var $elm_explorations$test$Test$Html$Query$Internal$expectAllHelp = F3(
	function (successes, check, list) {
		expectAllHelp:
		while (true) {
			if (!list.b) {
				return $elm_explorations$test$Expect$pass;
			} else {
				var elmHtml = list.a;
				var rest = list.b;
				var expectation = check(
					A2(
						$elm_explorations$test$Test$Html$Query$Internal$Single,
						false,
						A2(
							$elm_explorations$test$Test$Html$Query$Internal$Query,
							$elm_explorations$test$Test$Html$Internal$Inert$fromElmHtml(elmHtml),
							_List_Nil)));
				var _v1 = $elm_explorations$test$Test$Runner$getFailureReason(expectation);
				if (_v1.$ === 'Just') {
					var description = _v1.a.description;
					var prefix = (successes > 0) ? ('Element #' + ($elm$core$String$fromInt(successes + 1) + ' failed this test:')) : 'The first element failed this test:';
					return $elm_explorations$test$Expect$fail(
						A2(
							$elm$core$String$join,
							'\n\n',
							_List_fromArray(
								[prefix, description])));
				} else {
					var $temp$successes = successes + 1,
						$temp$check = check,
						$temp$list = rest;
					successes = $temp$successes;
					check = $temp$check;
					list = $temp$list;
					continue expectAllHelp;
				}
			}
		}
	});
var $elm_explorations$test$Test$Html$Query$Internal$expectAll = F2(
	function (check, query) {
		var _v0 = $elm_explorations$test$Test$Html$Query$Internal$traverse(query);
		if (_v0.$ === 'Ok') {
			var list = _v0.a;
			return A3($elm_explorations$test$Test$Html$Query$Internal$expectAllHelp, 0, check, list);
		} else {
			var error = _v0.a;
			return $elm_explorations$test$Expect$fail(
				$elm_explorations$test$Test$Html$Query$Internal$queryErrorToString(error));
		}
	});
var $elm_explorations$test$Test$Html$Query$each = F2(
	function (check, _v0) {
		var showTrace = _v0.a;
		var query = _v0.b;
		return A4(
			$elm_explorations$test$Test$Html$Query$Internal$failWithQuery,
			showTrace,
			'Query.each',
			query,
			A2($elm_explorations$test$Test$Html$Query$Internal$expectAll, check, query));
	});
var $elm_explorations$test$Test$Html$Query$Internal$FindAll = function (a) {
	return {$: 'FindAll', a: a};
};
var $elm_explorations$test$Test$Html$Query$findAll = F2(
	function (selectors, _v0) {
		var showTrace = _v0.a;
		var query = _v0.b;
		return A2(
			$elm_explorations$test$Test$Html$Query$Internal$Multiple,
			showTrace,
			A2(
				$elm_explorations$test$Test$Html$Query$Internal$prependSelector,
				query,
				$elm_explorations$test$Test$Html$Query$Internal$FindAll(selectors)));
	});
var $elm_explorations$test$Test$Html$Query$Internal$First = {$: 'First'};
var $elm_explorations$test$Test$Html$Query$first = function (_v0) {
	var showTrace = _v0.a;
	var query = _v0.b;
	return A2(
		$elm_explorations$test$Test$Html$Query$Internal$Single,
		showTrace,
		A2($elm_explorations$test$Test$Html$Query$Internal$prependSelector, query, $elm_explorations$test$Test$Html$Query$Internal$First));
};
var $elm_explorations$test$Test$Html$Query$Internal$Index = function (a) {
	return {$: 'Index', a: a};
};
var $elm_explorations$test$Test$Html$Query$index = F2(
	function (position, _v0) {
		var showTrace = _v0.a;
		var query = _v0.b;
		return A2(
			$elm_explorations$test$Test$Html$Query$Internal$Single,
			showTrace,
			A2(
				$elm_explorations$test$Test$Html$Query$Internal$prependSelector,
				query,
				$elm_explorations$test$Test$Html$Query$Internal$Index(position)));
	});
var $author$project$PostsViewTests$suite = A2(
	$elm_explorations$test$Test$describe,
	'module View.Posts',
	_List_fromArray(
		[
			A2(
			$elm_explorations$test$Test$describe,
			'\"Show job posts\" checkbox',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'postsConfigView has a checkbox for \"Show job posts\"',
					function (_v0) {
						return A2(
							$elm_explorations$test$Test$Html$Query$count,
							$elm_explorations$test$Expect$equal(1),
							A2(
								$elm_explorations$test$Test$Html$Query$findAll,
								$author$project$PostsViewTests$selectElementContainingShowJobPostsCheckbox,
								$elm_explorations$test$Test$Html$Query$fromHtml(
									$author$project$View$Posts$postsConfigView($author$project$Model$PostsConfig$defaultConfig))));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'\"Show text only posts\" checkbox',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'postsConfigView has a checkbox for \"Show text only posts\"',
					function (_v1) {
						return A2(
							$elm_explorations$test$Test$Html$Query$count,
							$elm_explorations$test$Expect$equal(1),
							A2(
								$elm_explorations$test$Test$Html$Query$findAll,
								$author$project$PostsViewTests$selectElementContainingShowTextPostsCheckbox,
								$elm_explorations$test$Test$Html$Query$fromHtml(
									$author$project$View$Posts$postsConfigView($author$project$Model$PostsConfig$defaultConfig))));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'\"posts per page\" select',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'postsConfigView has a \"posts per page\" select input wiht 3 options',
					function (_v2) {
						return A2(
							$elm_explorations$test$Test$Html$Query$count,
							$elm_explorations$test$Expect$equal(3),
							A2(
								$elm_explorations$test$Test$Html$Query$children,
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Selector$tag('option')
									]),
								A2(
									$elm_explorations$test$Test$Html$Query$find,
									_List_fromArray(
										[
											$elm_explorations$test$Test$Html$Selector$tag('select'),
											$elm_explorations$test$Test$Html$Selector$id('select-posts-per-page')
										]),
									$elm_explorations$test$Test$Html$Query$fromHtml(
										$author$project$View$Posts$postsConfigView($author$project$Model$PostsConfig$defaultConfig)))));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'The options for \"posts per page\" select input are 10, 25, 50',
					function (_v3) {
						return A2(
							$elm_explorations$test$Expect$all,
							_List_fromArray(
								[
									A2(
									$elm$core$Basics$composeR,
									$elm_explorations$test$Test$Html$Query$index(0),
									$elm_explorations$test$Test$Html$Query$has(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$text('10')
											]))),
									A2(
									$elm$core$Basics$composeR,
									$elm_explorations$test$Test$Html$Query$index(1),
									$elm_explorations$test$Test$Html$Query$has(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$text('25')
											]))),
									A2(
									$elm$core$Basics$composeR,
									$elm_explorations$test$Test$Html$Query$index(2),
									$elm_explorations$test$Test$Html$Query$has(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$text('50')
											])))
								]),
							A2(
								$elm_explorations$test$Test$Html$Query$children,
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Selector$tag('option')
									]),
								A2(
									$elm_explorations$test$Test$Html$Query$find,
									_List_fromArray(
										[
											$elm_explorations$test$Test$Html$Selector$tag('select'),
											$elm_explorations$test$Test$Html$Selector$id('select-posts-per-page')
										]),
									$elm_explorations$test$Test$Html$Query$fromHtml(
										$author$project$View$Posts$postsConfigView($author$project$Model$PostsConfig$defaultConfig)))));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'\"sort by\" select',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'postsConfigView has a \"sort by\" select input with 4 options',
					function (_v4) {
						return A2(
							$elm_explorations$test$Test$Html$Query$count,
							$elm_explorations$test$Expect$equal(4),
							A2(
								$elm_explorations$test$Test$Html$Query$children,
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Selector$tag('option')
									]),
								A2(
									$elm_explorations$test$Test$Html$Query$find,
									_List_fromArray(
										[
											$elm_explorations$test$Test$Html$Selector$tag('select'),
											$elm_explorations$test$Test$Html$Selector$id('select-sort-by')
										]),
									$elm_explorations$test$Test$Html$Query$fromHtml(
										$author$project$View$Posts$postsConfigView($author$project$Model$PostsConfig$defaultConfig)))));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'The options for \"sort by\" select input are Score, Title, Posted, None',
					function (_v5) {
						return A2(
							$elm_explorations$test$Expect$all,
							A2(
								$elm$core$List$map,
								function (opt) {
									return $elm_explorations$test$Test$Html$Query$has(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$containing(
												_List_fromArray(
													[
														$elm_explorations$test$Test$Html$Selector$text(opt)
													]))
											]));
								},
								A2($elm$core$List$map, $author$project$Model$PostsConfig$sortToString, $author$project$Model$PostsConfig$sortOptions)),
							A2(
								$elm_explorations$test$Test$Html$Query$find,
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Selector$tag('select'),
										$elm_explorations$test$Test$Html$Selector$id('select-sort-by')
									]),
								$elm_explorations$test$Test$Html$Query$fromHtml(
									$author$project$View$Posts$postsConfigView($author$project$Model$PostsConfig$defaultConfig))));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'postsConfigView update',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'The ConfigChange message is sent when the \"Show job posts\" checkbox is clicked',
					function (_v6) {
						return $elm_explorations$test$Expect$ok(
							$author$project$PostsViewTests$triggerConfigChangedEvent(
								$author$project$PostsViewTests$ShowJobPostsCheckbox(true)));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'The ConfigChange message is sent when the \"Show text only posts\" checkbox is clicked',
					function (_v7) {
						return $elm_explorations$test$Expect$ok(
							$author$project$PostsViewTests$triggerConfigChangedEvent(
								$author$project$PostsViewTests$ShowTextOnlyPostsCheckbox(true)));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'The ConfigChange message is sent when the \"Posts to show\" select is changed',
					function (_v8) {
						return $elm_explorations$test$Expect$ok(
							$author$project$PostsViewTests$triggerConfigChangedEvent(
								$author$project$PostsViewTests$PostsToShowSelect(50)));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'The ConfigChange message is sent when the \"Sort by\" select is changed',
					function (_v9) {
						return $elm_explorations$test$Expect$ok(
							$author$project$PostsViewTests$triggerConfigChangedEvent(
								$author$project$PostsViewTests$SortBySelect($author$project$Model$PostsConfig$Title)));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'postTable',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'View contains a table element',
					function (_v10) {
						return A2(
							$elm_explorations$test$Test$Html$Query$has,
							_List_fromArray(
								[
									$elm_explorations$test$Test$Html$Selector$tag('table')
								]),
							$elm_explorations$test$Test$Html$Query$fromHtml(
								A3($author$project$View$Posts$postTable, $author$project$Model$PostsConfig$defaultConfig, $author$project$PostsViewTests$currentTime, $author$project$TestData$posts)));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'The table has 5 columns',
					function (_v11) {
						return A2(
							$elm_explorations$test$Test$Html$Query$count,
							$elm_explorations$test$Expect$equal(5),
							A2(
								$elm_explorations$test$Test$Html$Query$children,
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Selector$tag('th')
									]),
								$elm_explorations$test$Test$Html$Query$first(
									A2(
										$elm_explorations$test$Test$Html$Query$findAll,
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$tag('tr')
											]),
										$elm_explorations$test$Test$Html$Query$fromHtml(
											A3($author$project$View$Posts$postTable, $author$project$Model$PostsConfig$defaultConfig, $author$project$PostsViewTests$currentTime, $author$project$TestData$posts))))));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'first row',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'The first row of the table contains the field names',
					function (_v12) {
						return A2(
							$elm_explorations$test$Test$Html$Query$has,
							A2(
								$elm$core$List$map,
								function (name) {
									return $elm_explorations$test$Test$Html$Selector$containing(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$tag('th'),
												$elm_explorations$test$Test$Html$Selector$text(name)
											]));
								},
								_List_fromArray(
									['Score', 'Title', 'Type', 'Posted', 'Link'])),
							$elm_explorations$test$Test$Html$Query$first(
								A2(
									$elm_explorations$test$Test$Html$Query$findAll,
									_List_fromArray(
										[
											$elm_explorations$test$Test$Html$Selector$tag('tr')
										]),
									$elm_explorations$test$Test$Html$Query$fromHtml(
										A3($author$project$View$Posts$postTable, $author$project$Model$PostsConfig$defaultConfig, $author$project$PostsViewTests$currentTime, $author$project$TestData$posts)))));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'field tags',
			A2(
				$elm$core$List$map,
				function (field) {
					return A2(
						$elm_explorations$test$Test$test,
						'Each body row contains a cell with class ' + field,
						function (_v13) {
							return A2(
								$elm_explorations$test$Expect$all,
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Query$each(
										$elm_explorations$test$Test$Html$Query$has(
											_List_fromArray(
												[
													$elm_explorations$test$Test$Html$Selector$tag('td'),
													$elm_explorations$test$Test$Html$Selector$class(field)
												]))),
										$elm_explorations$test$Test$Html$Query$count(
										$elm_explorations$test$Expect$atLeast(1))
									]),
								A2(
									$elm_explorations$test$Test$Html$Query$findAll,
									_List_fromArray(
										[
											$elm_explorations$test$Test$Html$Selector$tag('tr'),
											$elm_explorations$test$Test$Html$Selector$containing(
											_List_fromArray(
												[
													$elm_explorations$test$Test$Html$Selector$tag('td')
												]))
										]),
									$elm_explorations$test$Test$Html$Query$fromHtml(
										A3($author$project$View$Posts$postTable, $author$project$Model$PostsConfig$defaultConfig, $author$project$PostsViewTests$currentTime, $author$project$TestData$posts))));
						});
				},
				A2(
					$elm$core$List$map,
					$elm$core$Basics$append('post-'),
					_List_fromArray(
						['score', 'title', 'type', 'time', 'url'])))),
			A2(
			$elm_explorations$test$Test$describe,
			'field values',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'the number of rows is equal to the number of elements in the list',
					function (_v14) {
						return A2(
							$elm_explorations$test$Test$Html$Query$count,
							$elm_explorations$test$Expect$equal(
								$elm$core$List$length(
									A2($author$project$Model$PostsConfig$filterPosts, $author$project$Model$PostsConfig$defaultConfig, $author$project$TestData$posts))),
							A2(
								$elm_explorations$test$Test$Html$Query$findAll,
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Selector$tag('tr'),
										$elm_explorations$test$Test$Html$Selector$containing(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$tag('td')
											]))
									]),
								$elm_explorations$test$Test$Html$Query$fromHtml(
									A3($author$project$View$Posts$postTable, $author$project$Model$PostsConfig$defaultConfig, $author$project$PostsViewTests$currentTime, $author$project$TestData$posts))));
					}),
					A2(
					$elm_explorations$test$Test$test,
					'each row contains all fields',
					function (_v15) {
						var rowContainsFields = F2(
							function (post, row) {
								return A2(
									$elm_explorations$test$Expect$all,
									_List_fromArray(
										[
											$elm_explorations$test$Test$Html$Query$has(
											_List_fromArray(
												[
													$elm_explorations$test$Test$Html$Selector$text(post.title)
												])),
											$elm_explorations$test$Test$Html$Query$has(
											_List_fromArray(
												[
													$elm_explorations$test$Test$Html$Selector$text(
													$elm$core$String$fromInt(post.score))
												])),
											$elm_explorations$test$Test$Html$Query$has(
											_List_fromArray(
												[
													$elm_explorations$test$Test$Html$Selector$text(post.type_)
												])),
											$elm_explorations$test$Test$Html$Query$has(
											_List_fromArray(
												[
													$elm_explorations$test$Test$Html$Selector$text(
													A2($author$project$Util$Time$formatTime, $elm$time$Time$utc, post.time))
												]))
										]),
									row);
							});
						var filteredPosts = A2($author$project$Model$PostsConfig$filterPosts, $author$project$Model$PostsConfig$defaultConfig, $author$project$TestData$posts);
						return A2(
							$elm_explorations$test$Expect$all,
							A2(
								$elm$core$List$indexedMap,
								F3(
									function (i, post, rows) {
										return A2(
											rowContainsFields,
											post,
											A2($elm_explorations$test$Test$Html$Query$index, i, rows));
									}),
								filteredPosts),
							A2(
								$elm_explorations$test$Test$Html$Query$findAll,
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Selector$tag('tr'),
										$elm_explorations$test$Test$Html$Selector$containing(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$tag('td')
											]))
									]),
								$elm_explorations$test$Test$Html$Query$fromHtml(
									A3($author$project$View$Posts$postTable, $author$project$Model$PostsConfig$defaultConfig, $author$project$PostsViewTests$currentTime, $author$project$TestData$posts))));
					})
				])),
			A2(
			$elm_explorations$test$Test$describe,
			'uses relative time',
			_List_fromArray(
				[
					A2(
					$elm_explorations$test$Test$test,
					'the relative time is shown using a title attribute',
					function (_v16) {
						var rowContainsFields = F2(
							function (post, row) {
								return A2(
									$elm_explorations$test$Expect$all,
									_List_fromArray(
										[
											$elm_explorations$test$Test$Html$Query$has(
											_List_fromArray(
												[
													$elm_explorations$test$Test$Html$Selector$text('days'),
													$elm_explorations$test$Test$Html$Selector$text('ago')
												]))
										]),
									row);
							});
						var filteredPosts = A2($author$project$Model$PostsConfig$filterPosts, $author$project$Model$PostsConfig$defaultConfig, $author$project$TestData$posts);
						return A2(
							$elm_explorations$test$Expect$all,
							A2(
								$elm$core$List$indexedMap,
								F3(
									function (i, post, rows) {
										return A2(
											rowContainsFields,
											post,
											A2($elm_explorations$test$Test$Html$Query$index, i, rows));
									}),
								filteredPosts),
							A2(
								$elm_explorations$test$Test$Html$Query$findAll,
								_List_fromArray(
									[
										$elm_explorations$test$Test$Html$Selector$tag('tr'),
										$elm_explorations$test$Test$Html$Selector$containing(
										_List_fromArray(
											[
												$elm_explorations$test$Test$Html$Selector$tag('td')
											]))
									]),
								$elm_explorations$test$Test$Html$Query$fromHtml(
									A3($author$project$View$Posts$postTable, $author$project$Model$PostsConfig$defaultConfig, $author$project$PostsViewTests$currentTime, $author$project$TestData$posts))));
					})
				]))
		]));
var $author$project$TestData$textPosts = _List_fromArray(
	[
		{
		by: 'mtgr18977',
		id: 42097996,
		score: 25,
		time: $elm$time$Time$millisToPosix(1731202239 * 1000),
		title: 'Verbalize – text editor with writing assistance for Brazilian Portuguese',
		type_: 'story',
		url: $elm$core$Maybe$Nothing
	},
		{
		by: 'jahooma',
		id: 42078536,
		score: 278,
		time: $elm$time$Time$millisToPosix(1730999188 * 1000),
		title: 'Launch HN: Codebuff (YC F24) – CLI tool that writes code for you',
		type_: 'story',
		url: $elm$core$Maybe$Nothing
	},
		{
		by: 'maxmaio',
		id: 42066500,
		score: 116,
		time: $elm$time$Time$millisToPosix(1730916355 * 1000),
		title: 'Launch HN: Midship (YC S24) – Turn PDFs, docs, and images into usable data',
		type_: 'story',
		url: $elm$core$Maybe$Nothing
	},
		{
		by: 'giantg2',
		id: 42091555,
		score: 50,
		time: $elm$time$Time$millisToPosix(1731111805 * 1000),
		title: 'Ask HN: Best Cyber Warfare Books?',
		type_: 'story',
		url: $elm$core$Maybe$Nothing
	},
		{
		by: 'rupi',
		id: 42093803,
		score: 61,
		time: $elm$time$Time$millisToPosix(1731151417 * 1000),
		title: 'Ask HN: What hacks/tips do you use to make AI work better for you?',
		type_: 'story',
		url: $elm$core$Maybe$Nothing
	},
		{
		by: 'kouru225',
		id: 42093130,
		score: 6,
		time: $elm$time$Time$millisToPosix(1731138777 * 1000),
		title: 'Ask HN: Websites that actually test and review products for listicles',
		type_: 'story',
		url: $elm$core$Maybe$Nothing
	},
		{
		by: 'superconduct123',
		id: 42079086,
		score: 77,
		time: $elm$time$Time$millisToPosix(1731002289 * 1000),
		title: 'Ask HN: Why did consumer 3D printing take so long to be invented?',
		type_: 'story',
		url: $elm$core$Maybe$Nothing
	},
		{
		by: 'gooob',
		id: 42030832,
		score: 251,
		time: $elm$time$Time$millisToPosix(1730601591 * 1000),
		title: 'Ask HN: What would you preserve if the internet were to go down tomorrow?',
		type_: 'story',
		url: $elm$core$Maybe$Nothing
	},
		{
		by: 'systemkwiat',
		id: 42079768,
		score: 265,
		time: $elm$time$Time$millisToPosix(1731006374 * 1000),
		title: 'Ask HN: Life-changing purchases since 2020? (Under $100 and under $1000)',
		type_: 'story',
		url: $elm$core$Maybe$Nothing
	},
		{
		by: 'thunderstruck',
		id: 42076003,
		score: 54,
		time: $elm$time$Time$millisToPosix(1730982107 * 1000),
		title: 'Ask HN: How would you launch a privacy-first, Instagram-like social network?',
		type_: 'story',
		url: $elm$core$Maybe$Nothing
	},
		{
		by: 'dannyphantom',
		id: 42079896,
		score: 14,
		time: $elm$time$Time$millisToPosix(1731007150 * 1000),
		title: 'Ask HN: What bookmarklets do you use?',
		type_: 'story',
		url: $elm$core$Maybe$Nothing
	},
		{
		by: 'DogRunner',
		id: 42080637,
		score: 10,
		time: $elm$time$Time$millisToPosix(1731011610 * 1000),
		title: 'Corporate IT: What do you use to manage Linux laptops for your employees?',
		type_: 'story',
		url: $elm$core$Maybe$Nothing
	},
		{
		by: 'laksmanv',
		id: 42095073,
		score: 14,
		time: $elm$time$Time$millisToPosix(1731167837 * 1000),
		title: 'Ask HN: What is your one-person-SaaS project?',
		type_: 'story',
		url: $elm$core$Maybe$Nothing
	},
		{
		by: 'mustime',
		id: 42084907,
		score: 5,
		time: $elm$time$Time$millisToPosix(1731050247 * 1000),
		title: 'Transform Your Productivity with Deep Work Zone',
		type_: 'story',
		url: $elm$core$Maybe$Nothing
	}
	]);
var $author$project$Test$Generated$Main$main = A2(
	$author$project$Test$Runner$Node$run,
	{
		globs: _List_Nil,
		paths: _List_fromArray(
			['C:\\Users\\Marius\\Desktop\\UTCN\\AN 3\\Semestru 1\\PF\\Proiect\\P\\Elm-Project\\tests\\ExampleTests\\CursorTests.elm', 'C:\\Users\\Marius\\Desktop\\UTCN\\AN 3\\Semestru 1\\PF\\Proiect\\P\\Elm-Project\\tests\\ExampleTests\\ModelPostIdsTests.elm', 'C:\\Users\\Marius\\Desktop\\UTCN\\AN 3\\Semestru 1\\PF\\Proiect\\P\\Elm-Project\\tests\\ExampleTests\\ModelPostsConfigTests.elm', 'C:\\Users\\Marius\\Desktop\\UTCN\\AN 3\\Semestru 1\\PF\\Proiect\\P\\Elm-Project\\tests\\ExampleTests\\UtilTimeTests.elm', 'C:\\Users\\Marius\\Desktop\\UTCN\\AN 3\\Semestru 1\\PF\\Proiect\\P\\Elm-Project\\tests\\MainTests.elm', 'C:\\Users\\Marius\\Desktop\\UTCN\\AN 3\\Semestru 1\\PF\\Proiect\\P\\Elm-Project\\tests\\PostsConfigTests.elm', 'C:\\Users\\Marius\\Desktop\\UTCN\\AN 3\\Semestru 1\\PF\\Proiect\\P\\Elm-Project\\tests\\PostsViewTests.elm', 'C:\\Users\\Marius\\Desktop\\UTCN\\AN 3\\Semestru 1\\PF\\Proiect\\P\\Elm-Project\\tests\\PostTests.elm', 'C:\\Users\\Marius\\Desktop\\UTCN\\AN 3\\Semestru 1\\PF\\Proiect\\P\\Elm-Project\\tests\\SimulatedEffect.elm', 'C:\\Users\\Marius\\Desktop\\UTCN\\AN 3\\Semestru 1\\PF\\Proiect\\P\\Elm-Project\\tests\\TestData.elm', 'C:\\Users\\Marius\\Desktop\\UTCN\\AN 3\\Semestru 1\\PF\\Proiect\\P\\Elm-Project\\tests\\TestUtils.elm']),
		processes: 8,
		report: $author$project$Test$Reporter$Reporter$JsonReport,
		runs: 100,
		seed: 376158560164992
	},
	_List_fromArray(
		[
			_Utils_Tuple2(
			'ExampleTests.CursorTests',
			_List_fromArray(
				[
					$author$project$Test$Runner$Node$check($author$project$ExampleTests$CursorTests$suite)
				])),
			_Utils_Tuple2(
			'ExampleTests.ModelPostIdsTests',
			_List_fromArray(
				[
					$author$project$Test$Runner$Node$check($author$project$ExampleTests$ModelPostIdsTests$suite)
				])),
			_Utils_Tuple2(
			'ExampleTests.ModelPostsConfigTests',
			_List_fromArray(
				[
					$author$project$Test$Runner$Node$check($author$project$ExampleTests$ModelPostsConfigTests$suite)
				])),
			_Utils_Tuple2(
			'ExampleTests.UtilTimeTests',
			_List_fromArray(
				[
					$author$project$Test$Runner$Node$check($author$project$ExampleTests$UtilTimeTests$suite)
				])),
			_Utils_Tuple2(
			'MainTests',
			_List_fromArray(
				[
					$author$project$Test$Runner$Node$check($author$project$MainTests$suite)
				])),
			_Utils_Tuple2(
			'PostsConfigTests',
			_List_fromArray(
				[
					$author$project$Test$Runner$Node$check($author$project$PostsConfigTests$suite)
				])),
			_Utils_Tuple2(
			'PostsViewTests',
			_List_fromArray(
				[
					$author$project$Test$Runner$Node$check($author$project$PostsViewTests$currentTime),
					$author$project$Test$Runner$Node$check($author$project$PostsViewTests$selectShowJobPostsCheckbox),
					$author$project$Test$Runner$Node$check($author$project$PostsViewTests$selectElementContainingShowJobPostsCheckbox),
					$author$project$Test$Runner$Node$check($author$project$PostsViewTests$selectShowTextPostsCheckbox),
					$author$project$Test$Runner$Node$check($author$project$PostsViewTests$selectElementContainingShowTextPostsCheckbox),
					$author$project$Test$Runner$Node$check($author$project$PostsViewTests$suite)
				])),
			_Utils_Tuple2(
			'PostTests',
			_List_fromArray(
				[
					$author$project$Test$Runner$Node$check($author$project$PostTests$requiredFields),
					$author$project$Test$Runner$Node$check($author$project$PostTests$fields),
					$author$project$Test$Runner$Node$check($author$project$PostTests$fieldNames),
					$author$project$Test$Runner$Node$check($author$project$PostTests$completePost),
					$author$project$Test$Runner$Node$check($author$project$PostTests$suite)
				])),
			_Utils_Tuple2(
			'SimulatedEffect',
			_List_fromArray(
				[
					$author$project$Test$Runner$Node$check($author$project$SimulatedEffect$start),
					$author$project$Test$Runner$Node$check($author$project$SimulatedEffect$fromLoadedState)
				])),
			_Utils_Tuple2(
			'TestData',
			_List_fromArray(
				[
					$author$project$Test$Runner$Node$check($author$project$TestData$posts),
					$author$project$Test$Runner$Node$check($author$project$TestData$allPosts),
					$author$project$Test$Runner$Node$check($author$project$TestData$textPosts),
					$author$project$Test$Runner$Node$check($author$project$TestData$jobPosts)
				])),
			_Utils_Tuple2('TestUtils', _List_Nil)
		]));
_Platform_export({'Test':{'Generated':{'Main':{'init':$author$project$Test$Generated$Main$main($elm$json$Json$Decode$int)(0)}}}});}(this));
return this.Elm;
})({});
var pipeFilename = "\\\\.\\pipe\\elm_test-13100-1";
var net = require('net'),
  client = net.createConnection(pipeFilename);

client.on('error', function (error) {
  console.error(error);
  client.end();
  process.exit(1);
});

client.setEncoding('utf8');
client.setNoDelay(true);

// Run the Elm app.
var app = Elm.Test.Generated.Main.init({ flags: Date.now() });

client.on('data', function (msg) {
  app.ports.elmTestPort__receive.send(JSON.parse(msg));
});

// Use ports for inter-process communication.
app.ports.elmTestPort__send.subscribe(function (msg) {
  // We split incoming messages on the socket on newlines. The gist is that node
  // is rather unpredictable in whether or not a single `write` will result in a
  // single `on('data')` callback. Sometimes it does, sometimes multiple writes
  // result in a single callback and - worst of all - sometimes a single read
  // results in multiple callbacks, each receiving a piece of the data. The
  // horror.
  client.write(msg + '\n');
});