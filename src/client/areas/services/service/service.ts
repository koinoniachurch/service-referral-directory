import type { Service as Model } from "defs/Types";
import { JsUtils } from "defs/JsUtils";


/** */
export class Service {
	public readonly base = JsUtils.html("div", []);

	public constructor(model: Model) {
		Object.seal(this); //🧊
	}
}
Object.freeze(Service);
Object.freeze(Service.prototype);