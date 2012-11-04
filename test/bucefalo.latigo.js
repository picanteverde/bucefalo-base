var expect = require("chai").expect,
	b = require("../dist/bucefalo-base.js");

describe("Bucefalo.latigo", function(){
	var ctx;

	beforeEach(function(){
		ctx = {};
	});

	it("should define a type",function(){
		var o, cls;
		cls = b.latigo("cls", 
			null,
			{
				foo: function(){}
			});
		o = cls();

		expect(o.prototype.typeName).to.equal("cls");
	});

	it("should define a type with instance members",function(){
		var cls, o, o1;
		cls = b.latigo("cls",
			null,
			{
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
		});

		o = cls();
		o.add("Value");
		o1 = cls();
		o1.add("Value1");

		expect(o.sayHello()).to.equal("Hello");
		expect(o.get(0)).to.equal("Value");
		expect(o1.get(0)).to.equal("Value1");
	});


	it("should define a type with constructor",function(){
		var cls, o;

		cls = b.latigo("cls",
			null,
			{
			sayName: function(){
				return "My Name is " + this.name;
			}
		},
		function(name){
			this.name = name;
		});

		o = cls("Alejandro");
		expect(o.sayName()).to.equal("My Name is Alejandro");
		expect(o.prototype.typeName).to.equal("cls");
	});

	it("should define a type with class members", function(){
		var cls, o1, o2;
		cls = b.latigo("cls",
				null,
				{
					sayName: function(){
						return "My Name is" + this.name;
					}
				},function(name){
					this.name = name;
					this.prototype.typeDef.names.push(name);
				},
				{
					names:[],
					sayNames: function(){
						return this.names.join(",");
					}
				}
			);
		o1 = cls("Alejandro");
		o2 = cls("Raul");
		expect(cls.sayNames()).to.equal("Alejandro,Raul");
	});

	it("should define a type with inheritance",function(){
		var o, 
		parent = bucefalo.latigo(
			"parent",
			null,
			{
				sayHello: function(){
					return "Hello";
				}
			}
		),
		inherits = bucefalo.latigo(
			"simpleclass",
			parent,
			{
				sayGoodBye: function(){
					return "Good Bye";
				}
			}
		);
	});

	it("should define a type with inheritance overwritting a method",function(){
		var o, 
		parent = bucefalo.latigo(
			"parent",
			null,
			{
				sayHello: function(){
					return "Hello";
				},
				sayGoodBye: function(){
					return "Good Bye";
				}
			}
		),
		inherits = bucefalo.latigo(
			"simpleclass",
			parent,
			{
				sayGoodBye: function(){
					return "Good Bye!!!!";
				}
			}
		);

		o = inherits();
		expect(o.sayHello()).to.equal("Hello");
		expect(o.sayGoodBye()).to.equal("Good Bye!!!!");
	});
	
});