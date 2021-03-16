import type { Category } from "./Types";

export const Tree: Category[] = [{
	childId: "housing", path: "",
	title: "🏘 房屋",
	subcategories: [],
	services: [
		{ id: "real-estate",          title: "樓宇買賣", path: "" },
		{ id: "mortgage-and-banking", title: "銀行借貸", path: "" },
		{ id: "solicitor",            title: "律師/公証人", path: "" },
		{ id: "house-insurance",      title: "房屋保險", path: "" },
		{ id: "moving-company",       title: "搬運公司", path: "" },
		{ id: "property-management",  title: "物業管理", path: "" },
	],
},{
	childId: "finance", path: "",
	title: "💲 財務",
	subcategories: [],
	services: [
		{ id: "financial-management",     title: "財務管理", path: "" },
		{ id: "educational-fund",         title: "教育基金", path: "" },
		{ id: "accountants-and-taxation", title: "會計/稅務", path: "" },
	],
},{
	childId: "law", path: "",
	title: "⚖ 移民 / 法律",
	subcategories: [],
	services: [
		{ id: "immigration-lawyer",       title: "移民律師/顧問", path: "" },
		{ id: "lawyer-and-notary-public", title: "律師 / 公証人", path: "" },
	],
},{
	childId: "transportation", path: "",
	title: "🚗 交通",
	subcategories: [],
	services: [
		{ id: "car-dealer",         title: "汽車買賣", path: "" },
		{ id: "auto-repair",        title: "汽車維修", path: "" },
		{ id: "driving-instructor", title: "駕駛導師", path: "" },
		{ id: "car-insurance",      title: "汽車保險", path: "" },
	],
},{
	childId: "insurance", path: "",
	title: "🩹 保險",
	subcategories: [],
	services: [
		{ id: "life-insurance",   title: "人壽保險", path: "" },
		{ id: "health-insurance", title: "健康保險", path: "" },
	],
},{
	childId: "home", path: "",
	title: "🏡 家居",
	subcategories: [],
	services: [
		{ id: "decor-and-handyman", title: "家居裝修", path: "" },
		{ id: "appliance-repair",   title: "家電維修", path: "" },
		{ id: "plumber",            title: "水務/通渠", path: "" },
		{ id: "electrician",        title: "電工", path: "" },
		{ id: "gardening",          title: "園藝", path: "" },
		{ id: "housekeeping",       title: "家居清潔", path: "" },
	],
},{
	childId: "medical", path: "",
	title: "🩺 醫療",
	subcategories: [],
	services: [
		{ id: "family-doctor",       title: "家庭醫生", path: "" },
		{ id: "eye-doctor",          title: "科醫生", path: "" },
		{ id: "dentist",             title: "牙科醫生", path: "" },
		{ id: "pharmacist",          title: "藥劑", path: "" },
		{ id: "psychiatrist",        title: "精神料醫生", path: "" },
		{ id: "family-counseling",   title: "家庭輔導", path: "" },
		{ id: "marriage-counseling", title: "婚姻輔導", path: "" },
		{ id: "youth-counseling",    title: "青少年輔導", path: "" },
		{ id: "chiropractor",        title: "脊椎神經科醫生", path: "" },
		{ id: "acupuncture",         title: "針灸", path: "" },
		{ id: "herbalist",           title: "中醫", path: "" },
		{ id: "massage-therapist",   title: "按摩師", path: "" },
	],
},{
	childId: "family", path: "",
	title: "👪 家庭生活",
	subcategories: [],
	services: [
		{ id: "home-assistant", title: "家務助理", path: "" },
		{ id: "postnatal-care", title: "陪月助理", path: "" }, // TODO.learn what's the actual english translation?
		{ id: "babysitting",    title: "托兒服務", path: "" },
	],
},{
	childId: "education", path: "",
	title: "🍎 學習",
	subcategories: [],
	services: [
		{ id: "english-tutor",  title: "英文補課", path: "" },
		{ id: "academic-tutor", title: "學科補習", path: "" },
	],
},{
	childId: "hobby", path: "",
	title: "🏫 興趣",
	subcategories: [],
	services: [
		{ id: "piano",        title: "鋼琴教授", path: "" },
		{ id: "music",        title: "樂器教授", path: "" },
		{ id: "music-theory", title: "樂理", path: "" },
		{ id: "singing",      title: "聲樂", path: "" },
		{ id: "swimming",     title: "遊泳", path: "" },
		{ id: "chinese",      title: "中文班", path: "" },
	],
},];


/** */
function _SetPath(prefix: string, category: Category): void {
	const pathSep = "/";
	if (DEF.DevAssert && category.childId.includes(pathSep)) {
		throw new Error(`category id "${category.childId}" is invalid`);
	}
	prefix += category.childId + pathSep;
	// @ts-expect-error : RO=
	category.path = prefix;
	category.services.forEach((service) => {
		if (DEF.DevAssert && service.id.includes(pathSep)) {
			throw new Error(`service id "${category.childId}" is invalid`);
		}
		// @ts-expect-error : RO=
		service.path = prefix + service.id;
	});
	category.subcategories.forEach((subCategory) => {
		_SetPath(prefix, subCategory);
	});
}
Tree.forEach((category) => _SetPath("", category));