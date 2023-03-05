import { describe, expect, it } from "vitest";
import { unique } from "../src/utils";
import deepEquals from "deep-equals";

describe('unique filter', () => {
	it('returns an empty array for empty array input', () => {
		expect([].filter(unique)).toEqual([]);
	});
	
	it('returns the array for unique array input', () => {
		expect([1, "hi"].filter(unique)).toEqual([1, "hi"]);
	});

	it('returns a deduplicated array for string array input', () => {
		expect(["hi", "hello", "yo", "hello", "world"].filter(unique)).toEqual(["hi", "hello", "yo", "world"]);
	});
	
	it('returns a deduplicated array for string and number array input', () => {
		expect(["hi", 4, "yo", "hello", 4].filter(unique)).toEqual(["hi", 4, "yo", "hello"]);
	});
	
	it('returns a deduplicated array for object array input', () => {
		expect([{ foo: "bar" }, { foo: "bar" }].filter(unique)).toEqual([{ foo: "bar" }]);
	});
	
	it('returns a deduplicated array for nested object array input', () => {
		const obj = () => ({ foo: { bar: "baz" } });
		expect([obj(), obj()].filter(unique)).toEqual([obj()]);
	});
});

describe('deepEquals', () => {
	it('true for equal primitives', () => {
		expect(deepEquals(4, 4)).toBeTruthy();
		expect(deepEquals("4", "4")).toBeTruthy();
	});

	it('true for primitive arrays', () => {
		expect(deepEquals([4, 5], [4, 5])).toBeTruthy();
		expect(deepEquals(["4", 5], ["4", 5])).toBeTruthy();
	});

	it('true for primitive objects', () => {
		const obj = (val: unknown) => ({ hi: "hiya", hello: val });
		expect(deepEquals(obj("5"), obj("5"))).toBeTruthy();
		expect(deepEquals(obj(5), obj(5))).toBeTruthy();
	});

	it('true for complex objects', () => {
		const obj = () => ({
			hi: "hiya",
			hello: [ {
				heyAgain: 4,
				yoAgane: {
					hi: "plop"
				}
			} ]
		});
		expect(deepEquals(obj(), obj())).toBeTruthy();
	});
	
	it('true for objects with props in a diff order', () => {
		expect(deepEquals({ a: 4, b: 4 }, { b: 4, a: 4 })).toBeTruthy();
	})

	it('false for some primitives', () => {
		expect(deepEquals(4, 5)).toBeFalsy();
	});

	it('false for number and string ver of number', () => {
		expect(deepEquals(5, "5")).toBeFalsy();
	});

	it('false for some arrays', () => {
		expect(deepEquals([5, 6], ["5", "6"])).toBeFalsy();
	});

	it('false for some objs', () => {
		expect(deepEquals({ foo: { bar: "baz" } }, { foo: { bar: 4 } }));
	});
});