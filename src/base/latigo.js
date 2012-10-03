(function(){
	var b = bucefalo;
	b.latigo = function(name, instanceMembers, cons, classMembers, context){
		var lati = function(){
			var o = {};
			b.clone(o, instanceMembers);
			o.prototype = lati.prototype;
			cons.apply(o,arguments);
			return o;
		};

		if (!b.isFunction(cons)){
			cons = function(){};
		}
		b.extend(lati, classMembers);
		lati.prototype = instanceMembers;
		lati.prototype.className = name;
		lati.prototype.cls = lati;
		return lati;
	};
}());