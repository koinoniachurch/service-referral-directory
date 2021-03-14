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

		this.base.appendChild(this.ratings.overall.base);
		this.base.appendChild(this.ratings.pricing.base);
		this.base.appendChild(this.ratings.serviceQuality.base);
		this.base.appendChild(this.ratings.communication.base);
		this.base.appendChild(this.ratings.responseSpeed.base);

		this.base.appendChild(this.referrer.name);
		this.base.appendChild(this.referrer.email);
		this.base.appendChild(this.referrer.phone);
		this.base.appendChild(this.referrer.dateLastUsed);
	}

	/** */
	public parseInputs(): Service.ReferralFormData {
		return {
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
		};
	}
}

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
}