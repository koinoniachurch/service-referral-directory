import { JsUtils } from "defs/JsUtils";
import { Services } from "client/areas/services/services";
import { Refer } from "client/areas/refer/refer";

/** */
export class Layout {

	public readonly base = JsUtils.html("div");
	private readonly areaNav = JsUtils.html("div");
	private readonly mainWrap = JsUtils.html("div");

	private readonly areas = Object.freeze({
		services: new Services(),
		refer: new Refer(),
	});

	public constructor() {
		Object.seal(this); //🧊

		this.base.appendChild(this.areaNav);
		this.base.appendChild(this.mainWrap);

		const tab = (tabHandleText: string, baseElement: HTMLElement): void => {
			const tabHandle = JsUtils.html("span", [], { textContent: tabHandleText });
			this.areaNav.appendChild(tabHandle);
			this.mainWrap.appendChild(baseElement);
		}
		tab("Services", this.areas.services.base);
		tab("Refer", this.areas.refer.base);
	}
}
Object.freeze(Layout);
Object.freeze(Layout.prototype);