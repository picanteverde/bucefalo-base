var expect = require("chai").expect,
	bucefalo = require("../dist/bucefalo-base.module.js");

describe("Bucefalo.d", function(){
	it("should define a class",function(){
		var o;

		bucefalo.d({
			name:"bObject",
		});

		o = bObject();
		expect(o.cls.name).to.equal("bObject");
	});

	it("should define a class with instance members",function(){
		var o, o1;

		bucefalo.d({
			name:"bObject",
			instance: {
				arr:[],
				add: function(value){
					this.arr.push(value);
				},
				get: function(i){
					return this.arr[i];
				},
				sayHello: function(){
					return "Hello";
				}
			}
		});

		o = bObject();
		o.add("Value");
		o1 = bObject();
		o1.add("Value1");

		expect(o.sayHello()).to.equal("Hello");
		expect(o.get(0)).to.equal("Value");
		expect(o1.get(0)).to.equal("Value1");
	});

	it("should define a class with private members",function(){
		var o, o1;

		bucefalo.d({
			name:"bObject",
			priv:{
				arr:[]
			},
			instance: {
				add: function(value){
					this.priv.arr.push(value);
				},
				get: function(i){
					return this.priv.arr[i];
				},
				sayHello: function(){
					return "Hello";
				}
			}
		});

		o = bObject();
		o.add("Value");
		o1 = bObject();
		o1.add("Value1");

		expect(o.sayHello()).to.equal("Hello");
		expect(o.get(0)).to.equal("Value");
		expect(o1.get(0)).to.equal("Value1");
		expect(o.priv).not.to.be.ok;
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
					return "My Name is " + this.name;
				}
			}
		});

		o = bObject("Alejandro");
		expect(o.sayName()).to.equal("My Name is Alejandro");
		expect(o.cls.name).to.equal("bObject");
	});

	it("should define a class with destructor",function(){
		var o;

		bucefalo.d({
			name:"bObject",
			constructor: function(name){
				this.name = name;
			},
			destructor: function(){
				return "destructor";
			},
			instance: {
				sayName: function(){
					return "My Name is " + this.name;
				}
			}
		});

		o = bObject("Alejandro");
		expect(o.sayName()).to.equal("My Name is Alejandro");
		expect(o.cls.name).to.equal("bObject");
		expect(o.destructor()).to.equal("destructor");
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

	it("should define a class with inheritance",function(){
		var o;

		bucefalo.d({
			name: "bObject",
			instance: {
				sayHello: function(){
					return "Hello";
				}
			}
		});

		bucefalo.d({
			name: "bSubObject",
			instance:{
				sayGoodBye: function(){
					return "Good Bye";
				}
			},
			inherits: bObject
		});

		o = bSubObject();
		expect(o.sayHello()).to.equal("Hello");
		expect(o.sayGoodBye()).to.equal("Good Bye");
	});
});