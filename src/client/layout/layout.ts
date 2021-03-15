import { JsUtils } from "defs/JsUtils";
import { Services } from "client/areas/services/services";
import { Refer } from "client/areas/refer/refer";
import style from "./layout.m.css";

/** */
export class Layout {

	public readonly base = JsUtils.html("div", [style.layout]);
	private readonly areaNav = JsUtils.html("div", [style["area-nav"]]);
	private readonly mainWrap = JsUtils.html("div", [style["main"]]);

	private readonly areas = Object.freeze({
		services: new Services(),
		refer: new Refer(),
	});

	public constructor() {
		Object.seal(this); //🧊

		this.base.appendChild(this.areaNav);
		this.base.appendChild(this.mainWrap);

		const tab = (tabHandleText: string, baseElement: HTMLElement): void => {
			const handle = JsUtils.html("span", [style["tab-handle"]]);
			handle.setAttribute("role", "presentation");
			handle.appendChild(JsUtils.html("div", [], { textContent: tabHandleText }));
			this.areaNav.appendChild(handle);
			this.mainWrap.appendChild(baseElement);
		}
		tab("Services", this.areas.services.base);
		tab("Make Referral", this.areas.refer.base);
	}
}
Object.freeze(Layout);
Object.freeze(Layout.prototype);