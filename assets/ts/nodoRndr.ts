import paper from "paper";
import { Nodo } from "./nodo";
import { AppRndr } from "./appRndr";
import { calcNodoCenter } from "./utility";

class NodoRndr {
	nodo: Nodo;
	appRndr: AppRndr;
	c: paper.Point;
	r: number;
	path: paper.Path;

	constructor(nodo: Nodo, appRndr: AppRndr) {
		this.nodo = nodo;
		this.appRndr = appRndr;
		this.r = this.appRndr.radius;
		this.setCenter();
		this.path = this.rndr();
		this.setInteraction();
		this.setColor();
	}

	setCenter(): void {
		this.c = calcNodoCenter(this.nodo, this.appRndr);
	}

	rndr(): paper.Path {
		let path: paper.Path = new paper.Path.Circle(this.c, this.r);
		return path;
	}

	setColor(): void {
		if (this.nodo.state == "inactive") {
			this.path.fillColor = new paper.Color(0.9);
		} else if (this.nodo.state == "hover") {
			this.path.fillColor = new paper.Color(0.8);
		} else if (this.nodo.state == "target") {
			this.path.fillColor = new paper.Color(0.6, 0.6, 1);
		} else if (this.nodo.state == "active") {
			this.path.fillColor = new paper.Color(0, 0, 1);
		}
	}

	onMouseEnter(): void {
		if (this.nodo.state == "inactive") {
			this.nodo.setState("hover");
			this.setColor();
		}
	}

	setOnMouseEnter(): void {
		let nr = this;
		this.path.onMouseEnter = function (event) {
			nr.onMouseEnter();
		};
	}

	onMouseLeave(): void {
		if (this.nodo.state == "hover") {
			this.nodo.setState("inactive");
			this.setColor();
		}
	}

	setOnMouseLeave(): void {
		let nr = this;
		this.path.onMouseLeave = function (event) {
			nr.onMouseLeave();
		};
	}

	onClick(): void {
		if (this.nodo.state == "hover") {
			let nodo_active: Nodo = this.appRndr.app.getNodoActive();
			if (!nodo_active) {
				this.nodo.setState("active");
				this.setColor();
				this.appRndr.app.addContour();
			} else {
				let nodo_target: Nodo = this.appRndr.app.getNodoTarget();
				if (nodo_target) {
					nodo_target.setState("inactive");
					this.appRndr.getNodoRndr(nodo_target).setColor();
				}
				this.nodo.setState("target");
				this.setColor();
				this.appRndr.app.clearTangents();
				this.appRndr.clearTangentRndrs();
				this.appRndr.app.addTangents();
				this.appRndr.rndrTangents();
			}
		}
	}

	setOnClick(): void {
		let nr = this;
		this.path.onClick = function (event) {
			nr.onClick();
		};
	}

	setInteraction(): void {
		this.setOnMouseEnter();
		this.setOnMouseLeave();
		this.setOnClick();
	}
}

export { NodoRndr };
