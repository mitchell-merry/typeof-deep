import { describe, it, expect } from "vitest";
import { deepTypeof } from "../src/index";

describe('deepTypeof', () => {
	it('Uses typeof for primitives', () => {
		const data = [ "hello", 4, BigInt("100"), undefined, () => {}, Symbol() ];
		expect(data.map(deepTypeof)).toEqual([ "string", "number", "bigint", "undefined", "function", "symbol" ]);
	});
	
	it('Types an object one level down', () => {
		const data = {
			"hiya": "myString",
			4: 545
		};
	
		expect(deepTypeof(data)).toEqual({
			"hiya": "string",
			"4": "number"
		});
	});
	
	
	it('Types an array', () => {
		const data = [
			"myString",
			234,
			() => {},
			"anotherString"
		];
	
		expect(deepTypeof(data)).toEqual([
			"string",
			"number",
			"function"
		]);
	});
	
	it('array of objects', () => {
		const data = [
			{ id: "mmerry" },
			{ id: "bmerry" },
		];
	
		expect(deepTypeof(data)).toEqual([
			{ id: "string" }
		]);
	});

	class MyClass {
		prop: string;
		constructor() { this.prop = "hi"; }
	}
	
	it('instance of a class', () => {
		expect(deepTypeof(new MyClass())).toEqual({
			prop: "string"
		});
	});

	class MySubclass extends MyClass {
		prop2: number;
		instanceMember: MyClass;
		
		constructor() {
			super();
			this.prop2 = 4;
			this.instanceMember = new MyClass();
		}

		async anFunc() { }
	}
	
	it('instance of a subclass with instances as members', () => {
		expect(deepTypeof(new MySubclass())).toEqual({
			prop: "string",
			prop2: "number",
			instanceMember: {
				prop: "string"
			}
		});
	});

	it('snapshot test1', () => {
		const data = require('./__snapshots__/test1.json');
		expect(deepTypeof(data)).toMatchSnapshot();
	})
});