import type { Category, Service } from "defs/Types";
import { JsUtils } from "defs/JsUtils";
import { Tree } from "defs/Tree";
import style from "./navtree.m.css";

/** */
export class NavTree {
	public readonly base = JsUtils.html("div", [style.navtree]);
	private readonly localStorage = JsUtils.Web._makeSmartStorage(
		"kec-srd", localStorage, { serviceNavTreeState: {} as ReadonlyArray<string> },
	);
	readonly #categories: ReadonlyArray<Category> = [];
	readonly #serviceMap = new Map<HTMLElement, Service>();
	readonly #onChange: (_: Service) => void;

	public constructor(onChange: (_: Service) => void) {
		Object.seal(this); //🧊
		this.#onChange = onChange;
		this.base.addEventListener("click", (ev) => {
			const el = ev.target;
			if (!(el instanceof HTMLElement)) return; //⚡
			if (el.classList.contains(style["item-heading"])) {
				const parent = el.parentElement!;
				if ("expanded" in parent.dataset) {
					delete parent.dataset["expanded"];
					this.#categories
				} else {
					parent.dataset["expanded"] = "";
				}
			} else if (el.classList.contains(style.item) && this.#serviceMap.has(el)) {
				this.#onChange(this.#serviceMap.get(el)!);
			}
		});
		window.addEventListener("beforeunload", (ev) => {
			this.localStorage.serviceNavTreeState = this.#categories.map((cat) => cat.path);
		});
		const restoreState = (this.localStorage.serviceNavTreeState as string[] ?? []).freeze();
		/** */
		const registerCategory = (parent: HTMLElement, category: Category) => {
			const categoryEl = JsUtils.html("div", [style.item]);
			if (restoreState.includes(category.path)) {
				categoryEl.dataset["expanded"] = "";
			}
			categoryEl.appendChild(JsUtils.html("div", [style["item-heading"]], { textContent: category.title }));
			category.subcategories.forEach((subCategory) => {
				registerCategory(categoryEl, subCategory);
			});
			category.services.forEach((service) => {
				const serviceEl = JsUtils.html("div", [style.item], { textContent: service.title });
				this.#serviceMap.set(serviceEl, service);
				categoryEl.appendChild(serviceEl);
			});
			parent.appendChild(categoryEl);
		}
		Tree.forEach((category) => {
			registerCategory(this.base, category);
		});
	}
}
Object.freeze(NavTree);
Object.freeze(NavTree.prototype);