(function(){
	var global = this,
	old = global.bucefalo,
	b = {},
	bucefalo = b;
	
	global.bucefalo = bucefalo;
	bucefalo.global = global;

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = bucefalo;
	}

	b.noConflict = function() {
		global.bucefalo = old;
		return this;
	};

	b.nameSpace = function(context, namespace, object){
		var o = context,
			ar,
			len,
			i;
		if (object === undefined) {
			object = {};
		}
		ar = namespace.split(".");
		len = ar.length;
		for (i = 0; i < len - 1; i += 1){
			if (!o.hasOwnProperty(ar[i])){
				o[ar[i]] = {};	
			}
			o = o[ar[i]];

		}
		o[ar[i]] = object;
		return object;
	};
	b.isFunction = function (f) {
		try {  
			return (/^\s*\bfunction\b/).test(f) ;
		} catch (x) {   
			return false ;
		}
	};
	b.type = function(obj){
		if(Array.isArray(obj)){
			return "array";
		}
		if(b.isFunction(obj)){
			return "function";
		}
		return typeof obj;
	};
	b.clone = function(target, source){
		var key, obj;
		for (key in source){
			if(source.hasOwnProperty(key)){
				obj = source[key];
				switch(b.type(obj)){
					case "object":
						target[key] = b.clone({}, obj);
						break;
					case "array":
						target[key] = b.clone([], obj);
						break;
					default:
						target[key] = obj;
				}
			}
		}
		return target;
	};
	b.extend = function(target, source){
		var key;
		for(key in source){
			if(source.hasOwnProperty(key)){
				target[key] = source[key];
			}
		}
		return target;
	};
}());