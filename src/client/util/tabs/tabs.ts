import { JsUtils } from "defs/JsUtils";
import style from "./tabs.m.css";

/** */
export class Tabs {

	public readonly base = JsUtils.html("div", [style.layout]);
	protected readonly areaNav = JsUtils.html("div", [style["area-nav"]]);
	readonly #handle2panel = new Map<HTMLElement, HTMLElement>();

	public constructor() {
		Object.seal(this); //🧊

		this.base.appendChild(this.areaNav);

		this.areaNav.setAttribute("role", "tablist");
		this.areaNav.addEventListener("click", (ev) => {
			if (!(ev.target instanceof HTMLElement) || !this.#handle2panel.has(ev.target)) { return; } //⚡
			const curr = this.areaNav.querySelector("[aria-selected='true']");
			if (curr instanceof HTMLElement) {
				curr.removeAttribute("aria-selected");
				this.#handle2panel.get(curr)!.removeAttribute("aria-current");
			}
			const next = ev.target;
			next.setAttribute("aria-selected", "true");
			this.#handle2panel.get(next)!.setAttribute("aria-current", "true");
		});
	}

	/** */
	public addTab(tabHandleText: string, mainEl: HTMLElement): void {
		const handle = JsUtils.html("span", [style["tab-handle"]]);
		handle.setAttribute("role", "tab");
		handle.appendChild(JsUtils.html("div", [], { textContent: tabHandleText, tabIndex: 0 }));
		this.areaNav.appendChild(handle);

		const panel = JsUtils.html("div", [style["main"]]);
		panel.setAttribute("role", "tabpanel");
		this.#handle2panel.set(handle, panel);
		panel.appendChild(mainEl);
		this.base.appendChild(panel);

		if (this.#handle2panel.size === 1) {
			handle.click();
		}
	}
}
Object.freeze(Tabs);
Object.freeze(Tabs.prototype);