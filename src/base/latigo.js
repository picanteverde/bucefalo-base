(function(b){
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
		lati.prototype.typeName = name;
		lati.prototype.typeDef = lati;
		lati.prototype.typeCons = cons;
		return lati;
	};
}(bucefalo));