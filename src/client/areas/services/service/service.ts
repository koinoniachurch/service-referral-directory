import type { Service as Model } from "defs/Types";
import { JsUtils } from "defs/JsUtils";
import { Provider } from "./provider/provider";
import style from "./service.m.css";

/** */
export class Service {
	public readonly base = JsUtils.html("div", [style["service"]]);
	readonly #providers: Provider[] = [];

	public constructor(model: Model) {
		Object.seal(this); //🧊
		this.syncData();
	}

	public async syncData(): Promise<void> {
		const res = await fetch("", {});
		const providers = await res.json() as Model.Provider[];
		this.#providers.splice(0);
		this.#providers.push(...providers.map((model) => new Provider(model)));
	}
}
Object.freeze(Service);
Object.freeze(Service.prototype);