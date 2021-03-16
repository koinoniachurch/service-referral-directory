import { JsUtils } from "defs/JsUtils";
import { Tabs } from "../util/tabs/tabs";
import { Services } from "../areas/services/services";
import style from "./layout.m.css";

/** */
export class Layout {

	public get base() { return this.#tabs.base }
	readonly #tabs = new Tabs();

	private readonly areas = Object.freeze({
		services: new Services(),
	});

	public constructor() {
		Object.seal(this); //🧊

		this.#tabs.addTab("Services", this.areas.services.base);
	}
}
Object.freeze(Layout);
Object.freeze(Layout.prototype);