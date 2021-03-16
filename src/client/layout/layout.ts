import { JsUtils } from "defs/JsUtils";
import { Services } from "client/areas/services/services";
import { Refer } from "client/areas/refer/refer";
import style from "./layout.m.css";

/** */
export class Layout {

	public readonly base = JsUtils.html("div", [style.layout]);
	private readonly areaNav = JsUtils.html("div", [style["area-nav"]]);
	private readonly mainWrap = JsUtils.html("div", [style["main"]]);
	readonly #handle2panel = new Map<HTMLElement, HTMLElement>();

	private readonly areas = Object.freeze({
		services: new Services(),
		refer: new Refer(),
	});

	public constructor() {
		Object.seal(this); //🧊

		this.base.appendChild(this.areaNav);
		this.base.appendChild(this.mainWrap);

		const tab = (tabHandleText: string, mainEl: HTMLElement): void => {
			const handle = JsUtils.html("span", [style["tab-handle"]]);
			handle.setAttribute("role", "tab");
			handle.appendChild(JsUtils.html("div", [], { textContent: tabHandleText, tabIndex: 0 }));
			const panel  = JsUtils.html("div");
			panel.setAttribute("role", "tabpanel");
			this.#handle2panel.set(handle, panel);
			this.areaNav.appendChild(handle);
			panel.appendChild(mainEl);
			this.mainWrap.appendChild(panel);
		}
		tab("Services", this.areas.services.base);
		tab("Make Referral", this.areas.refer.base);

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
		(this.areaNav.firstChild as HTMLElement).click();
	}
}
Object.freeze(Layout);
Object.freeze(Layout.prototype);