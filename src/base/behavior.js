(function(b){
	b.behavior = function(name, instanceMembers){
		instanceMembers.behaviorName = name;
		return instanceMembers;
	};
	b.behavior.augment = function (obj, behavior){
		var old_name = obj.behaviorName;
		if(!obj.behaviors){
			obj.behaviors = {};
		}
		obj.behaviors[behavior.behaviorName] = behavior;
		b.clone(obj, behavior);
		obj.behaviorName = old_name;
		return obj;
	};
}(bucefalo));