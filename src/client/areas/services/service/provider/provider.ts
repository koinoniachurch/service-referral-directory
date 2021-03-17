import type { Service } from "defs/Types";
import { JsUtils } from "defs/JsUtils";
import style from "./provider.m.css";

/** */
export class Provider {
	public readonly base = JsUtils.html("div", [style["provider"]]);

	public constructor(model: Service.Provider) {
		Object.seal(this); //🧊
		const info = JsUtils.html("div", [style["info"]], {});
		info.appendChild(JsUtils.html("span", [], { textContent: model.name }));
		info.appendChild(JsUtils.html("a", [], { textContent: model.email, href: "mailto:"+model.email }));
		info.appendChild(JsUtils.html("span", [], { textContent: model.telephone }));
		info.appendChild(JsUtils.html("a", [], { textContent: model.website, href: model.website }));
		this.base.appendChild(info);

		const referrals = JsUtils.html("tbody", [style["referrals"]]);
		model.referrals.forEach((ref) => {
			const tr = JsUtils.html("tr", [style["referrals"]]);
			function col(...args: Parameters<typeof JsUtils["html"]>): HTMLElement {
				const td = JsUtils.html("td"); const el = JsUtils.html(...args);
				td.appendChild(el); tr.appendChild(td);
				return el;
			}
			col("div", [], { textContent: ref.referrer.name });
			col("div", [], { textContent: ref.referrer.email });
			col("div", [], { textContent: ref.referrer.telephone });
			col("div", [], { textContent: ref.referrer.dateLastUsed });
			referrals.appendChild(tr);
		});
		this.base.appendChild(referrals);
	}
}
Object.freeze(Provider);
Object.freeze(Provider.prototype);