import { JsUtils } from "defs/JsUtils";
import type { Service } from "defs/Types";
import style from "./refer.m.css";
import style_rating from "./rating.m.css";

/** */
export class Refer {
	public readonly base = JsUtils.html("div", [style["refer"]]);
	#currentService: Service;

	private providerEmail = JsUtils.html("input", [], { type: "email" });

	private readonly ratings = Object.freeze({
		overall: new Rating(),
		pricing: new Rating(),
		serviceQuality: new Rating(),
		communication: new Rating(),
		responseSpeed: new Rating(),
	});

	private readonly referrer = {
		name:  JsUtils.html("input", [], { type: "text",  autocomplete: "name" }),
		email: JsUtils.html("input", [], { type: "email", autocomplete: "email" }),
		phone: JsUtils.html("input", [], { type: "tel",   autocomplete: "tel" }),
		dateLastUsed: JsUtils.html("input", [], {
			type: "month", max: new Date().toISOString().slice(0,7),
			min: "1990-01",
		}),
	}

	readonly #submit = JsUtils.html("button", ["c-pop", style["submit"]], { textContent: "submit" });

	public constructor() {
		Object.seal(this); //🧊
		this.#submit.addEventListener("click", (ev) => {
			if (!ev.isTrusted) {
				return; //⚡
			}
			this.submit();
		});

		const f = (labelText: string, input: HTMLElement): void => {
			const label = JsUtils.html("label");
			label.textContent = labelText;
			label.appendChild(input);
			this.base.appendChild(label);
		}
		f("Service Provider's Email", this.providerEmail);

		f("Overall", this.ratings.overall.base);
		f("Pricing", this.ratings.pricing.base);
		f("Service Quality", this.ratings.serviceQuality.base);
		f("Communication", this.ratings.communication.base);
		f("Response Speed", this.ratings.responseSpeed.base);

		f("Date Last Used", this.referrer.dateLastUsed);
		f("Your Name", this.referrer.name);
		f("Your Email", this.referrer.email);
		f("Your Phone Number", this.referrer.phone);

		this.base.appendChild(this.#submit);
		this.clearInputs();
	}

	/** */
	public setCurrentService(service: Service): void {
		this.#currentService = service;
		this.clearInputs();
	}

	/** */
	public clearInputs(): void {
		this.ratings.overall.clear();
		this.ratings.pricing.clear();
		this.ratings.serviceQuality.clear();
		this.ratings.communication.clear();
		this.ratings.responseSpeed.clear();

		this.referrer.dateLastUsed.value = "";
		// this.referrer.name.value = "";
		// this.referrer.email.value = "";
		// this.referrer.phone.value = "";
	}

	/** */
	public parseInputs(): Service.Referral { return {
		referrer: {
			name: this.referrer.name.value,
			email: this.referrer.email.value,
			telephone: this.referrer.phone.value,
			dateLastUsed: this.referrer.dateLastUsed.value,
		},
		ratings: {
			overall:        this.ratings.overall.value,
			pricing:        this.ratings.pricing.value,
			serviceQuality: this.ratings.serviceQuality.value,
			communication:  this.ratings.communication.value,
			responseSpeed:  this.ratings.responseSpeed.value,
		},
	};}

	/** */
	private submit(): void {
		const referral = this.parseInputs();
		const data: Service.Referral.Req = {
			providerEmail: this.providerEmail.value,
			servicePath: this.#currentService.path,
			referral,
		};
		fetch("", {
			method: "POST", body: JSON.stringify(data),
		});
	}
}
Object.freeze(Refer);
Object.freeze(Refer.prototype);

/** */
export class Rating {

	public readonly base = JsUtils.html("div");
	readonly #slider = JsUtils.html("input", [style_rating["input"]], {
		type: "range", min: "1", max: "5", step: "1", width: 500,
	});
	readonly #describe = JsUtils.html("span", );

	public constructor() {
		Object.seal(this); //🧊
		this.#slider.addEventListener("input", (ev) => {
			this.#slider.dataset["value"] = this.#slider.value;
		});
		this.base.appendChild(this.#slider);
	}
	public clear(): void {
		this.#slider.value = "3";
	}
	public get value(): number {
		return Number.parseInt(this.#slider.value);
	}
}
Object.freeze(Rating);
Object.freeze(Rating.prototype);