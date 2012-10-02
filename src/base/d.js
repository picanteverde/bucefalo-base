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