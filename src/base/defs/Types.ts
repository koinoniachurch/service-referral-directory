
/** */
export enum Language {
	English   = "english",
	Cantonese = "cantonese",
	Mandarin  = "mandarin",
}

/** */
export interface Category {
	readonly childId: string;
	readonly path: string;
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
		readonly avgRatings: Ratings;
		readonly isChristian: boolean;
		readonly referrals: Referral[];
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
	export interface Referral {
		referrer: Referrer;
		ratings: Ratings;
	}
}
