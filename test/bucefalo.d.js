describe("Bucefalo.d", function(){
	it("should define a class",function(){
		var o;

		bucefalo.d({
			name:"bObject",
		});

		o = bObject();
		expect(o.cls.name).to.equal("bObject");
	});

	it("should define a class with instance methods",function(){
		var o;

		bucefalo.d({
			name:"bObject",
			instance: {
				sayHello: function(){
					return "Hello";
				}
			}
		});

		o = bObject();
		expect(o.sayHello()).to.equal("Hello");
	});

	it("should define a class with constructor",function(){
		var o;

		bucefalo.d({
			name:"bObject",
			constructor: function(name){
				this.name = name;
			},
			instance: {
				sayName: function(){
					return "My Name is" + this.name;
				}
			}
		});

		o = bObject("Alejandro");
		expect(o.sayName()).to.equal("My Name is Alejandro");
		expect(o.cls.name).to.equal("bObject");
	});

	it("should define a class with class methods", function(){
		var o1, o2;
		bucefalo.d({
			name: "bObject",
			constructor: function(name){
				this.name = name;
				this.cls.names.push(name);
			},
			instance: {
				sayName: function(){
					return "My Name is" + this.name;
				}
			},
			cls:{
				names:[],
				sayNames: function(){
					return this.names.join(",");
				}
			}
		});
		o1 = bObject("Alejandro");
		o2 = bObject("Raul");
		expect(bObject.sayNames()).to.equal("Alejandro,Raul");

	});
});