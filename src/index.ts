import { unique } from "./utils";

export function deepTypeof(value: unknown): unknown {
	if (typeof value !== "object") {
		return typeof value;
	}

	if (value === null) {
		return null;
	}

	if (Array.isArray(value)) {
		return value.map(deepTypeof).filter(unique);
	}

	const objectKeysTypes: Record<string, unknown> = {};
	for(const key in value) {
		objectKeysTypes[key] = deepTypeof((value as any)[key]);
	}

	return objectKeysTypes;
}