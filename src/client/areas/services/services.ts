import { NavTree } from "./navtree/navtree";
import { JsUtils } from "defs/JsUtils";


/** */
export class Services {
	public readonly base = JsUtils.html("div");

	private readonly navtree = new NavTree();
	private readonly mainWrap = JsUtils.html("div");

	public constructor() {
		Object.seal(this); //🧊
		this.base.appendChild(this.navtree.base);
		this.base.appendChild(this.mainWrap);
	}
}
Object.freeze(Services);
Object.freeze(Services.prototype);