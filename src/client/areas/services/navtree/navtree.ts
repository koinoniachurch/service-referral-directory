import type { Category, Service } from "defs/Types";
import { JsUtils } from "defs/JsUtils";
import { Tree } from "defs/Tree";
import style from "./navtree.m.css";

/** */
export class NavTree {
	public readonly base = JsUtils.html("div");
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
				} else {
					parent.dataset["expanded"] = "";
				}
			} else if (el.classList.contains(style.item) && this.#serviceMap.has(el)) {
				this.#onChange(this.#serviceMap.get(el)!);
			}
		});
		/** */
		const registerCategory = (parent: HTMLElement, category: Category) => {
			const categoryEl = JsUtils.html("div", [style.item]);
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

	public getElements(): ReadonlyArray<HTMLElement> {
		const retval: HTMLElement[] = [];

		return retval;
	}
}
Object.freeze(NavTree);
Object.freeze(NavTree.prototype);