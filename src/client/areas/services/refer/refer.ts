import { JsUtils } from "defs/JsUtils";
import type { Service } from "defs/Types";

/** */
export class Refer {
	public readonly base = JsUtils.html("div");

	private readonly ratings = Object.freeze({
		overall: new Rating(),
		pricing: new Rating(),
		serviceQuality: new Rating(),
		communication: new Rating(),
		responseSpeed: new Rating(),
	});

	private readonly referrer = {
		name:  JsUtils.html("input", [], { type: "text" }),
		email: JsUtils.html("input", [], { type: "email" }),
		phone: JsUtils.html("input", [], { type: "phone" }),
		dateLastUsed: JsUtils.html("input", [], { type: "date" }),
	}

	public constructor() {
		Object.seal(this); //🧊

		const f = (labelText: string, input: HTMLElement): void => {
			const label = JsUtils.html("label");
			label.textContent = labelText;
			label.appendChild(input);
			this.base.appendChild(label);
		}
		f("Overall", this.ratings.overall.base);
		f("Pricing", this.ratings.pricing.base);
		f("Service Quality", this.ratings.serviceQuality.base);
		f("Communication", this.ratings.communication.base);
		f("Response Speed", this.ratings.responseSpeed.base);

		f("Date Last Used", this.referrer.dateLastUsed);
		f("Your Name", this.referrer.name);
		f("Your Email", this.referrer.email);
		f("Your Phone Number", this.referrer.phone);
	}

	public clearInputs(): void {
		this.ratings.overall.clear();
		this.ratings.pricing.clear();
		this.ratings.serviceQuality.clear();
		this.ratings.communication.clear();
		this.ratings.responseSpeed.clear();

		this.referrer.dateLastUsed.value = "";
		this.referrer.name.value = "";
		this.referrer.email.value = "";
		this.referrer.phone.value = "";
	}

	/** */
	public parseInputs(): Service.ReferralFormData { return {
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
}
Object.freeze(Refer);
Object.freeze(Refer.prototype);

/** */
export class Rating {

	public readonly base = JsUtils.html("div");

	#value: number = 0;
	public get value(): number {
		return this.#value;
	}

	public constructor() {
		Object.seal(this); //🧊
	}
	public clear(): void {
		;
	}
}
Object.freeze(Rating);
Object.freeze(Rating.prototype);