import express from "express";
import type { Category, Service } from "defs/Types";
import type mongodb from "mongodb";

/** */
export function ServicesRouter(db: mongodb.Db): express.Router {
	const router = express.Router({
		caseSensitive: true,
		strict: true,
	})
	.get("/service", (req, res, next) => {
		;
	})
	.post("/refer", (req, res, next) => {
		const data = JSON.parse(req.body) as Service.Referral.Req;
		db.collection("service").updateOne({ $where: "" }, data.referral); // TODO.impl
	})
	;
	return router;
}
Object.freeze(ServicesRouter);
Object.freeze(ServicesRouter.prototype);