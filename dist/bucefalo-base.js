/*! Bucefalo Base - v0.1.0 - 2012-11-04
* https://github.com/picanteverde/bucefalo-base
*/

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
(function(b){
	var foo = function(){};
	b.latigo = function(name, inherits, instanceMembers, cons, classMembers){
		var lati = function(){
			var o = {};
			b.clone(o, instanceMembers);
			o.prototype = lati.prototype;
			cons.apply(o,arguments);
			return o;
		};

		if (inherits){
			var inheritsO={};
			b.extend(inheritsO, inherits.prototype);
			b.extend(inheritsO, instanceMembers);
			instanceMembers = inheritsO;

			b.extend(inherits, classMembers);
			classMembers = inherits;
			if (!b.isFunction(cons)){
				cons = inherits.prototype.typeCons;
			}
		}
		if (!b.isFunction(cons)){
			cons = foo;
		}
		b.extend(lati, classMembers);
		lati.prototype = instanceMembers;
		lati.prototype.typeName = name;
		lati.prototype.typeDef = lati;
		lati.prototype.typeCons = cons;
		lati.prototype.typeInherits = inherits;
		return lati;
	};
}(bucefalo));
(function(){
	var b = bucefalo;
	var privAccess = function(priv, method){
		return function(){
			var res;
			this.priv = priv;
			res = method.apply(this, arguments);
			this.priv = null;
			return res;
		};
	};

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
	b.d = function (config){
		var cls = config.cls || {},
			powerConstructor = function(){
				var obj = {}, privAccessMethods, privMembers, privKey;
				if(config.instance){
					if(!config.priv){
						b.clone(obj, config.instance);
					}else{
						privMembers = b.clone({}, config.priv);
						privAccessMethods = b.extend({}, config.instance);
						for(privKey in privAccessMethods){
							if(privAccessMethods.hasOwnProperty(privKey)){
								if(b.type(privAccessMethods[privKey]) === "function"){
									privAccessMethods[privKey] = privAccess(privMembers, privAccessMethods[privKey]);
								}
							}
						}
						b.clone(obj, privAccessMethods);
					}
				}
				if(config.inherits){
					b.clone(obj, config.inherits.instance);
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

		b.extend(powerConstructor,cls);
		powerConstructor.className = cls.name;
		cls.powerConstructor = powerConstructor;
		b.nameSpace(config.context || b.global, config.name, powerConstructor);
		return powerConstructor;
	};
}());
(function(b){
	b.behavior = function(name, instanceMembers){
		instanceMembers.behaviorName = name;
		return instanceMembers;
	};
	b.behavior.augment = function (obj, behavior){
		if(!obj.behaviors){
			obj.behaviors = {};
		}
		obj.behaviors[behavior.behaviorName] = behavior;
		b.clone(obj, behavior);
		return obj;
	};
}(bucefalo));