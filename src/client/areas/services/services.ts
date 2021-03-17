import { JsUtils } from "defs/JsUtils";
import type { Service as ServiceModel } from "defs/Types";
import { NavTree } from "./navtree/navtree";
import { Tabs } from "../../util/tabs/tabs";
import { Service } from "./service/service";
import { Refer } from "./refer/refer";
import style from "./services.m.css";

/** */
export class Services {
	public readonly base = JsUtils.html("div", [style["services"]]);

	private readonly navtree = new NavTree((service) => this.viewService(service));
	private readonly main = new Tabs();
	private readonly areas = Object.freeze({
		service: JsUtils.html("div", []),
		refer: new Refer(),
	});
	readonly #servicePanels = new Map<ServiceModel["path"], Service>();
	#currentService: Service | undefined;

	public constructor() {
		Object.seal(this); //🧊
		this.main.addTab("View Referrals", this.areas.service);
		this.main.addTab("Add Referral", this.areas.refer.base);
		this.main.base.classList.add(style["main"]);
		this.base.appendChild(this.navtree.base);
		this.base.appendChild(this.main.base);
	}

	/** */
	private viewService(desc: ServiceModel): void {
		const curr = this.#currentService;
		if (curr) {
			curr.base.remove();
		}
		const next = this.#servicePanels.get(desc.path) ?? (() => {
			const next = new Service(desc);
			this.#servicePanels.set(desc.path, next);
			return next;
		})();
		this.areas.service.appendChild(next.base);
		this.#currentService = next;
	}
}
Object.freeze(Services);
Object.freeze(Services.prototype);