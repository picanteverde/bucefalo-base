var expect = require("chai").expect,
	b = require("../dist/bucefalo-base.js");

describe("Bucefalo.behavior", function(){

	it("should define a behavior",function(){
		var behave = b.behavior("test",{ foo: 1 });

		expect(behave.behaviorName).to.equal("test");
	});

	it("should add a behavior to an object",function(){
		var talk = b.behavior("talk",{
			talk: function(){
				return "hello!";
			}
		}),
		o = {};

		b.behavior.augment(o,talk);
		expect(o.behaviors).to.be.ok;
		expect(o.behaviors["talk"]).to.be.ok;
		expect(o.talk()).to.equal("hello!");
	});

	it("should add a behavior to an object",function(){
		var duck = b.behavior("duck",{
			cuak: function(){
				return "cuak!";
			}
		}),
		dog = b.behavior("dog",{
			barf: function(){
				return "barf!";
			}
		}),
		o = {};

		b.behavior.augment(o,duck);
		b.behavior.augment(o,dog);
		expect(o.cuak()).to.equal("cuak!");
		expect(o.barf()).to.equal("barf!");
	});
});