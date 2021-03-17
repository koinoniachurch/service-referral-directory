import type { Service } from "defs/Types";
import { JsUtils } from "defs/JsUtils";
import style from "./referral.m.css";

/** */
export class Referral {
	public readonly base = JsUtils.html("div", [style["referral"]]);

	public constructor(model: Service.Referral) {
		Object.seal(this); //🧊
		this.base.appendChild(JsUtils.html("div", [], { textContent: model.referrer.name }));
		this.base.appendChild(JsUtils.html("div", [], { textContent: model.referrer.email }));
		this.base.appendChild(JsUtils.html("div", [], { textContent: model.referrer.telephone }));
		this.base.appendChild(JsUtils.html("div", [], { textContent: model.referrer.dateLastUsed }));
	}
}
Object.freeze(Referral);
Object.freeze(Referral.prototype);