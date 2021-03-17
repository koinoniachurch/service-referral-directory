import { Language, Service as Model } from "defs/Types";
import { JsUtils } from "defs/JsUtils";
import { Provider } from "./provider/provider";
import style from "./service.m.css";

/** */
export class Service {
	public readonly base = JsUtils.html("div", [style["service"]]);
	readonly #providers = JsUtils.html("div", [style["providers"]]);

	public constructor(model: Model) {
		Object.seal(this); //🧊
		this.base.appendChild(this.#providers);
		this.syncData();
	}

	/** */
	public async syncData(): Promise<void> {
		const providerModels = Service.ExampleData;
		//const providers = JSON.parse(await (await fetch("", {}).json()) as Model.Provider[];
		this.#providers.textContent = "";
		providerModels.forEach((model) => this.#providers.appendChild(new Provider(model).base))
	}
}
export namespace Service {
	/** */
	export const ExampleData: Model.Provider[] = [{
		name: "Service Provider 1",
		photo: "https://example.com/photo",
		languages: [Language.Cantonese, Language.English],
		isChristian: true,
		telephone: "604-123-4567",
		referrals: [{
			referrer: {
				name: "Referrer 1",
				email: "referrer1@example.com",
				telephone: "555-555-5555",
				dateLastUsed: "2020/12/01",
			},
			ratings: {
				overall: 4, serviceQuality: 4, pricing: 4, communication: 4, responseSpeed: 4,
			},
		}],
		avgRatings: undefined!,
	}]
}
Object.freeze(Service);
Object.freeze(Service.prototype);