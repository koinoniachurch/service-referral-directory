import type { Service } from "defs/Types";
import { JsUtils } from "defs/JsUtils";
import style from "./provider.m.css";
import { Referral } from "./referrer/referral";

/** */
export class Provider {
	public readonly base = JsUtils.html("div", [style["provider"]]);

	public constructor(model: Service.Provider) {
		Object.seal(this); //🧊
		model.referrals.forEach((referral) => {
			this.base.appendChild(new Referral(referral).base);
		});
	}
}
Object.freeze(Provider);
Object.freeze(Provider.prototype);