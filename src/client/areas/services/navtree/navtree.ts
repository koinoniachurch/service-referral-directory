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
	readonly #expanded = new Set<Category>();
	readonly #serviceMap = new Map<HTMLElement, Service>();
	readonly #categoryMap = new Map<HTMLElement, Category>();
	readonly #onChange: (_: Service) => void;

	public constructor(onChange: (_: Service) => void) {
		Object.seal(this); //🧊
		this.#onChange = onChange;
		this.base.addEventListener("click", (ev) => {
			const el = ev.target;
			if (!(el instanceof HTMLElement)) return; //⚡
			if (el.classList.contains(style["item-heading"])) {
				const categoryEl = el.parentElement!;
				const category = this.#categoryMap.get(categoryEl)!;
				if (this.#expanded.has(category)) {
					delete categoryEl.dataset["expanded"];
					this.#expanded.delete(category);
				} else {
					categoryEl.dataset["expanded"] = "";
					this.#expanded.add(category);
				}
			} else if (el.classList.contains(style.item) && this.#serviceMap.has(el)) {
				this.#onChange(this.#serviceMap.get(el)!);
			}
		});
		window.addEventListener("beforeunload", (ev) => {
			this.localStorage.serviceNavTreeState = [...this.#expanded].map((cat) => cat.path);
		});
		const restoreState = (this.localStorage.serviceNavTreeState as string[] ?? []).freeze();
		/** */
		const registerCategory = (parent: HTMLElement, category: Category) => {
			const categoryEl = JsUtils.html("div", [style.item]);
			this.#categoryMap.set(categoryEl, category);
			if (restoreState.includes(category.path)) {
				this.#expanded.add(category);
				categoryEl.dataset["expanded"] = "";
			}
			categoryEl.appendChild(JsUtils.html("div", [style["item-heading"]], { textContent: category.title }));
			category.subcategories.forEach((subCategory) => {
				registerCategory(categoryEl, subCategory);
			});
			category.services.forEach((service) => {
				const serviceEl = JsUtils.html("div", [style.item], { textContent: service.title });
				serviceEl.dataset["isLeaf"] = "";
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