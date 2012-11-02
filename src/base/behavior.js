(function(b){
	b.behavior = function(name, instanceMembers){
		instanceMembers.behaviorName = name;
		return behavior;
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