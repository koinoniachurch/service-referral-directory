
/** */
export enum Language {
	English   = "english",
	Cantonese = "cantonese",
	Mandarin  = "mandarin",
}

/** */
export interface Category {
	readonly id: string;
	readonly title: string;
	readonly subcategories: ReadonlyArray<Category>;
	readonly services: ReadonlyArray<Service>;
}

/** */
export interface Service {
	readonly id: string;
	readonly path: string;
	readonly title: string;
}
export namespace Service {
	/** */
	export interface Provider {
		readonly name: string;
		readonly photo: string;
		readonly telephone: string;
		readonly languages: Language[];
		readonly ratings: Ratings;
		readonly isChristian: boolean;
		readonly referrers: Referrer[];
	}

	/** */
	export interface Referrer {
		readonly name: string;
		readonly email: string;
		readonly telephone: string;
		readonly dateLastUsed: string;
	}

	/** */
	export interface Ratings {
		overall: number;
		pricing: number;
		serviceQuality: number;
		communication: number;
		responseSpeed: number;
	}

	/** */
	export interface ReferralFormData {
		referrer: Referrer;
		ratings: Ratings;
	}
}
