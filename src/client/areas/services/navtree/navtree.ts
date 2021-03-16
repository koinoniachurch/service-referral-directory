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
			if (el.classList.contains(style["category-heading"])) {
				const categoryEl = el.parentElement!;
				const category = this.#categoryMap.get(categoryEl)!;
				if (this.#expanded.has(category)) {
					delete categoryEl.dataset["expanded"];
					this.#expanded.delete(category);
				} else {
					categoryEl.dataset["expanded"] = "";
					this.#expanded.add(category);
				}
			} else if (el.classList.contains(style["item"]) && this.#serviceMap.has(el)) {
				this.#onChange(this.#serviceMap.get(el)!);
			}
		});
		window.addEventListener("beforeunload", (ev) => {
			this.localStorage.serviceNavTreeState = [...this.#expanded].map((cat) => cat.path);
		});
		const restoreState = (this.localStorage.serviceNavTreeState as string[] ?? []).freeze();
		/** */
		const registerCategory = (parent: HTMLElement, category: Category) => {
			const catEl = JsUtils.html("div", [style["item"], style["category"]]);
			this.#categoryMap.set(catEl, category);
			if (restoreState.includes(category.path)) {
				this.#expanded.add(category);
				catEl.dataset["expanded"] = "";
			}
			catEl.appendChild(JsUtils.html("div", [style["category-heading"]], { textContent: category.title }));
			category.subcategories.forEach((subCategory) => {
				registerCategory(catEl, subCategory);
			});
			category.services.forEach((service) => {
				const serviceEl = JsUtils.html("div", [style["item"], style["service"]], { textContent: service.title });
				this.#serviceMap.set(serviceEl, service);
				catEl.appendChild(serviceEl);
			});
			parent.appendChild(catEl);
		}
		Tree.forEach((category) => {
			registerCategory(this.base, category);
		});
	}
}
Object.freeze(NavTree);
Object.freeze(NavTree.prototype);