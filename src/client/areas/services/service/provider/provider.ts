import type { Service } from "defs/Types";
import { JsUtils } from "defs/JsUtils";
import style from "./provider.m.css";

/** */
export class Provider {
	public readonly base = JsUtils.html("div", [style["provider"]]);

	public constructor(model: Service.Provider) {
		Object.seal(this); //🧊
		// TODO.impl
	}
}
Object.freeze(Provider);
Object.freeze(Provider.prototype);