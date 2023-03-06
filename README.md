# typeof-deep
this is not really that big of a package, but if you really want to use it:

`npm install deepTypeof`
```ts
import { deepTypeof } from "typeof-deep";

const myComplicatedType = {
	foo: [ "bar", "baz", "biz" ],
	box: {
		a: 1,
		b: 2,
		c: [
			3, "four", () => {}
		]
	}
};

console.log(JSON.stringify(deepTypeof(myComplicatedType), null, 2));
```
that's it, that's the whole package.