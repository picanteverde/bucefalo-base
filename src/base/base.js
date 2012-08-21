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
		return object;
	};
	bucefalo = bucefalo || {};
	bucefalo.global = (function(){ return this;}());
	/**
	config: {
		name: Class NameSpace,
		instance: Instance Members,
		class: Class Members,
		constructor: Class Constructor,
		inherits: Classes or Object to inherit
	}
	*/
	bucefalo.class = function (config){

	};
}());