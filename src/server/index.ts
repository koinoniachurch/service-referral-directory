import "defs/ModNodePlatform";

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

// =========================================
import os from "os";
import fs from "fs";
import path from "path";
import http from "http";
import type * as net from "net";

import mongodb from "mongodb";
import express from "express";
import expressStaticGzip from "express-static-gzip";
import { google } from "googleapis";

import { JsUtils } from "defs/JsUtils";
import { InfoRouter } from "./info";
import { ReferRouter } from "./refer";

(async() => {
const db = (await mongodb.connect("")).db("kec-musicchart-test", {});


// At runtime, __dirname resolves to ":/dist/server/"
const CLIENT_ROOT = path.resolve(__dirname, "../client");
const app = express()
.disable("x-powered-by")
.use("/", expressStaticGzip(CLIENT_ROOT, {
	enableBrotli: DEF.PRODUCTION, //🚩 This must match the value in the webpack config.
	serveStatic: {
		setHeaders: (res, path, stat): void => {
			res.setHeader("X-Content-Type-Options", "nosniff");
			const mime = express.static.mime.lookup(path);
			if (mime === "text/html" /* xhtml? */) {
				res.setHeader("Cache-Control", "public, max-age=0");
			}
		},
		// TODO.build enable this when long term caching is configured for webpack.
		//immutable: DEF.PRODUCTION,
		//maxAge: 31536000000, // 1 year.
	},
}))
.use(InfoRouter(db));

const _http = http.createServer({}, app);
_http.listen(<net.ListenOptions>{ port: undefined, host: undefined }, (): void => {
	const info = <net.AddressInfo>_http.address();
	console.info(`\n\nServer mounted to: \`${info.address}${info.port}\` using ${info.family}.\n`);
});

})();