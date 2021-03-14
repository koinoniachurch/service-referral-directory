import express from "express";
import type { WorshipSet } from "defs/Types";
import type mongodb from "mongodb";

export function WsetRouter(db: mongodb.Db): express.Router {
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
	.post("/:dateCode", (req: express.Request<{dateCode: string}, WorshipSet>, res, next) => {
		req.params.dateCode;
		//db.collection<WorshipSet>("wset").updateOne({}, );
	});
	return router;
}