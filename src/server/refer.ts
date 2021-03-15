import express from "express";
import type { Service } from "defs/Types";
import type mongodb from "mongodb";

export function ReferRouter(db: mongodb.Db): express.Router {
	const router = express.Router({
		caseSensitive: true,
		strict: true,
	})
	.get("/", (req, res, next) => {
		;
	})
	.get("/:dateCode", (req, res, next) => {
		;
	})
	.post("/:dateCode", (req: express.Request<{dateCode: string}, Service>, res, next) => {
		req.params.dateCode;
		//db.collection<WorshipSet>("wset").updateOne({}, );
	});
	return router;
}
Object.freeze(ReferRouter);
Object.freeze(ReferRouter.prototype);