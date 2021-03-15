import express from "express";
import type { Category } from "defs/Types";
import type mongodb from "mongodb";

export function ServicesRouter(db: mongodb.Db): express.Router {
	const router = express.Router({
		caseSensitive: true,
		strict: true,
	})
	.get("/", (req, res, next) => {
		;
	})
	;
	return router;
}
Object.freeze(ServicesRouter);
Object.freeze(ServicesRouter.prototype);