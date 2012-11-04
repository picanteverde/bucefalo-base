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