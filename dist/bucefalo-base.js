/*! Bucefalo Base - v0.1.0 - 2012-08-28
* https://github.com/picanteverde/bucefalo-base
*/

var bucefalo = {};
(function(){
	var nameSpace = function(context, namespace, object){
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
		},
		isFunction = function (f) {
			try {  
				return (/^\s*\bfunction\b/).test(f) ;
			} catch (x) {   
				return false ;
			}
		},
		type = function(obj){
			if(Array.isArray(obj)){
				return "array";
			}
			if(isFunction(obj)){
				return "function";
			}
			return typeof obj;
		},
		clone = function(target, source){
			var key, obj;
			for (key in source){
				if(source.hasOwnProperty(key)){
					obj = source[key];
					switch(type(obj)){
						case "object":
							target[key] = clone({}, obj);
							break;
						case "array":
							target[key] = clone([], obj);
							break;
						default:
							target[key] = obj;
					}
				}
			}
			return target;
		},
		extend = function(target, source){
			var key;
			for(key in source){
				if(source.hasOwnProperty(key)){
					target[key] = source[key];
				}
			}
			return target;
		},
		privAccess = function(priv, method){
			return function(){
				var res;
				this.priv = priv;
				res = method.apply(this, arguments);
				this.priv = null;
				return res;
			};
		};

	bucefalo.global = (function(){ return this;}());
	/**
	config: {
		name: Class NameSpace,
		instance: Instance Members,
		priv: Private Members,
		cls: Class Members,
		constructor: Class Constructor,
		destructor: Class destructor,
		inherits: Classes or Object to inherit
	}
	*/
	bucefalo.d = function (config){
		var cls = config.cls || {},
			powerConstructor = function(){
				var obj = {}, privAccessMethods, privMembers, privKey;
				if(config.instance){
					if(!config.priv){
						clone(obj, config.instance);
					}else{
						privMembers = clone({}, config.priv);
						privAccessMethods = extend({}, config.instance);
						for(privKey in privAccessMethods){
							if(privAccessMethods.hasOwnProperty(privKey)){
								if(type(privAccessMethods[privKey]) === "function"){
									privAccessMethods[privKey] = privAccess(privMembers, privAccessMethods[privKey]);
								}
							}
						}
						clone(obj, privAccessMethods);
					}
				}
				if(config.inherits){
					clone(obj, config.inherits.instance);
				}
				obj.cls = cls;
				if(config.constructor){
					config.constructor.apply(obj,arguments);
				}
				obj.destructor = config.destructor;

				return obj;
			};
		cls.name = config.name;
		cls.constructor = config.constructor;
		cls.destructor = config.destructor;
		cls.inherits = config.inherits;
		cls.priv = config.priv;
		cls.instance = config.instance;

		extend(powerConstructor,cls);
		powerConstructor.className = cls.name;
		cls.powerConstructor = powerConstructor;
		nameSpace(bucefalo.global, config.name, powerConstructor);
		return powerConstructor;
	};
}());