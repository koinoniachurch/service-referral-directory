import fs from "fs";
import path from "path";

Object.defineProperties(Array.prototype, {
	freeze: { value: function freeze() { return Object.freeze(this); }, enumerable: true, },
	seal: { value: function seal() { return Object.seal(this); }, enumerable: true },
});
// In-House `--frozen-intrinsics`:
(<(keyof typeof globalThis)[]>[
	"Object", "String", "Number", "RegExp", "Date",
	"Array", "Map", "Set", "WeakMap", "WeakSet",
])
.forEach((key) => {
	Object.defineProperty(globalThis, key, {
		enumerable: true,
		writable: false,
		configurable: false,
	});
	Object.freeze((globalThis as any)[key]);
	Object.freeze((globalThis as any)[key].prototype);
});

// Override stack trace to shorten file paths:
process.on("uncaughtException", function processOnUncaughtException(err) {
	const ROOT = path.resolve(__dirname, "../..");
	console.error("\n\n");
	if (err.stack !== undefined) {
		err.stack = err.stack.replace(new RegExp(ROOT.replace(/\\/g, "\\\\"), "g"), ":")
			.split("\n").map(frame => {
				const fn = frame.indexOf("(");
				return fn < 0 ? frame : frame.substring(0, fn) + " ".repeat(Math.max(0, 35-fn)) + frame.substring(fn);
			}).join("\n");
		fs.writeSync(process.stderr.fd, err.stack);
	}
	console.error("\n\n");
	process.exit(1);
});