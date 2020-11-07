import paper from "paper";
import { AppRndr } from "./appRndr";
import { Tangent } from "./tangent";
import { Contour } from "./contour";
import { Nodo } from "./nodo";
import { TangentGeometricData, calcTangentGeometricData } from "./tangentFunctions";
import { cartesianPointFromPolar } from "./utility";

class TangentRndr {
	tangent: Tangent;
	appRndr: AppRndr;
	path: paper.Path;

	constructor(tangent: Tangent, appRndr: AppRndr) {
		this.tangent = tangent;
		this.appRndr = appRndr;
		this.path = this.rndr();
		this.setAppearance();
		this.setInteraction();
	}

	rndr(): paper.Path {
		// Base points
		let data: TangentGeometricData = calcTangentGeometricData(this.tangent, this.appRndr);
		let pA: paper.Point = data.points.A;
		let pB: paper.Point = data.points.B;
		let aA: number = data.angles.A;
		let aB: number = data.angles.B;
		let cA: paper.Point = data.centers.A;
		let cB: paper.Point = data.centers.B;

		let contour_active: Contour = this.appRndr.app.getContourActive();
		let p0: paper.Point;
		let a0: number;
		if (contour_active) {
			let tangent_before: Tangent = contour_active.getTangentLast();
			if (tangent_before) {
				let data_bf: TangentGeometricData = calcTangentGeometricData(tangent_before, this.appRndr);
				p0 = data_bf.points.B;
				a0 = data_bf.angles.B;
			}
		}

		let path: paper.Path = new paper.Path();
		if (p0 && a0 && !(p0.subtract(pA).length < 0.000000001)) {
			console.log();
			if (a0 < aA && this.tangent.flow.A == "A") {
				aA -= 360;
			} else if (a0 > aA && this.tangent.flow.A == "O") {
				aA += 360;
			}
			let a0A = a0 + (aA - a0) / 2;
			let p0A = cartesianPointFromPolar(cA, this.appRndr.radius, a0A);
			path.moveTo(p0);
			path.arcTo(p0A, pA);
			path.lineTo(pB);
		} else {
			path.moveTo(pA);
			path.lineTo(pB);
		}

		let tangent_first: Tangent = this.appRndr.app.getContourActive().getTangentFirst();

		if (tangent_first && tangent_first.nodos.A == this.appRndr.app.getNodoTarget()) {
			let data_af: TangentGeometricData = calcTangentGeometricData(this.appRndr.app.getContourActive().getTangentFirst(), this.appRndr);
			let pC = data_af.points.A;
			let aC = data_af.angles.A;
			if (aB < aC && this.tangent.flow.B == "A") {
				aC -= 360;
			} else if (aB > aC && this.tangent.flow.B == "O") {
				aC += 360;
			}
			let aBC = aB + (aC - aB) / 2;
			let pBC = cartesianPointFromPolar(cB, this.appRndr.radius, aBC);
			path.arcTo(pBC, pC);
		}
		// if (this.appRndr.app.getContourActive().getTangentFirst().nodos.A == this.appRndr.app.getNodoTarget()) {
		// 	let data_af: TangentGeometricData = calcTangentGeometricData(this.appRndr.app.getContourActive().getTangentFirst(), this.appRndr);
		// 	let pC = data_af.points.A;
		// 	let aC = data_af.angles.A;
		// 	if (aB < aC && this.tangent.flow.A == "A") {
		// 		aC -= 360;
		// 	} else if (aB > aC && this.tangent.flow.A == "O") {
		// 		aC += 360;
		// 	}
		// 	let aBC = aB + (aC - aB) / 2;
		// 	let pBC = cartesianPointFromPolar(cA, this.appRndr.radius, aBC);
		// 	path.arcTo(pBC, pC);
		// }

		return path;
	}

	setAppearance(): void {
		this.path.strokeColor = new paper.Color(0);
		if (this.tangent.state == "inactive") {
			this.path.strokeWidth = 1;
		} else if (this.tangent.state == "hover") {
			this.path.strokeWidth = 5;
		}
	}

	// -- Interaction -- //

	onMouseEnter(): void {
		if (this.tangent.state == "inactive") {
			this.tangent.setState("hover");
			this.setAppearance();
		}
	}

	setOnMouseEnter(): void {
		let tr = this;
		this.path.onMouseEnter = function (event) {
			tr.onMouseEnter();
		};
	}

	onMouseLeave(): void {
		if (this.tangent.state == "hover") {
			this.tangent.setState("inactive");
			this.setAppearance();
		}
	}

	setOnMouseLeave(): void {
		let tr = this;
		this.path.onMouseLeave = function (event) {
			tr.onMouseLeave();
		};
	}

	onClick(): void {
		if (this.tangent.state == "hover") {
			let contour_active: Contour = this.appRndr.app.getContourActive();
			contour_active.addTangent(this.tangent);

			let nodo_active: Nodo = this.appRndr.app.getNodoActive();
			nodo_active.setState("inactive");
			let nodo_active_rndr = this.appRndr.getNodoRndr(nodo_active);
			nodo_active_rndr.setColor();

			let nodo_target: Nodo = this.appRndr.app.getNodoTarget();
			nodo_target.setState("active");
			let nodo_target_rndr = this.appRndr.getNodoRndr(nodo_target);
			nodo_target_rndr.setColor();

			if (this.tangent.nodos.B == contour_active.getTangentFirst().nodos.A) {
				contour_active.close();
				nodo_target.setState("inactive");
				nodo_target_rndr.setColor();
			}

			this.appRndr.clearContourRndrs();
			this.appRndr.rndrContours();

			this.appRndr.clearTangentRndrs();
			this.appRndr.app.clearTangents();
		}
	}

	setOnClick(): void {
		let tr = this;
		this.path.onClick = function (event) {
			tr.onClick();
		};
	}

	setInteraction(): void {
		this.setOnMouseEnter();
		this.setOnMouseLeave();
		this.setOnClick();
	}
}

export { TangentRndr };
