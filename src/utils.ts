// imp/ort deepEquals from "deep-equals";
const deepEquals = require("deep-equals"); // require to prevent "They are the same" text

export function unique<T>(target: T, index: number, array: T[]) {
	return !array.some((curr, currIndex) => currIndex < index && deepEquals(curr, target));
}