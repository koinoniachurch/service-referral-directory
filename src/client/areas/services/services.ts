import { JsUtils } from "defs/JsUtils";
import { NavTree } from "./navtree/navtree";
import { Tabs } from "../../util/tabs/tabs";
import { Service } from "./service/service";
import { Refer } from "./refer/refer";
import style from "./services.m.css";

/** */
export class Services {
	public readonly base = JsUtils.html("div", [style["services"]]);

	private readonly navtree = new NavTree((service) => {/* TODO */});
	private readonly main = new Tabs();
	private readonly areas = Object.freeze({
		service: new Service(undefined!), // TODO
		refer: new Refer(),
	});

	public constructor() {
		Object.seal(this); //🧊
		this.main.addTab("Services", this.areas.service.base);
		this.main.addTab("Add Referral", this.areas.refer.base);
		this.base.appendChild(this.navtree.base);
		this.base.appendChild(this.main.base);
	}
}
Object.freeze(Services);
Object.freeze(Services.prototype);