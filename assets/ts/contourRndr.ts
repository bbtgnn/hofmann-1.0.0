import { AppRndr } from "./appRndr";
import { Contour } from "./contour";
import { TangentRndr } from "./tangentRndr";
import paper from "paper";
import { Tangent } from "./tangent";
import { calcTangentGeometricData, TangentGeometricData } from "./tangentFunctions";
import { cartesianPointFromPolar } from "./utility";

class ContourRndr {
	contour: Contour;
	appRndr: AppRndr;
	path: paper.Path;

	constructor(contour: Contour, appRndr: AppRndr) {
		this.contour = contour;
		this.appRndr = appRndr;
		this.path = this.rndr();
		this.setAppearance();
	}

	rndr(): paper.Path {
		let path = new paper.Path();
		let datas: TangentGeometricData[] = [];
		for (let t of this.contour.tangents) {
			datas.push(calcTangentGeometricData(t, this.appRndr));
		}
		for (let i: number = 0; i < datas.length; i++) {
			let segment = new paper.Path();
			let data: TangentGeometricData = datas[i];
			segment.moveTo(data.points.A);
			segment.lineTo(data.points.B);
			let data_i: TangentGeometricData = datas[i + 1];
			if (data_i || (!data_i && this.contour.closed)) {
				if (!data_i && this.contour.closed) {
					data_i = calcTangentGeometricData(this.contour.getTangentFirst(), this.appRndr);
				}
				let angA = data.angles.B;
				let angB = data_i.angles.A;
				console.log();
				if (Math.abs(angA - angB) > 0.000000001) {
					let tA = this.contour.tangents[i];
					let tB = this.contour.tangents[i + 1];
					if (angA < angB && tA.flow.B == "A") {
						angB -= 360;
					} else if (angA > angB && tA.flow.B == "O") {
						angB += 360;
					}
					let angAB = angA + (angB - angA) / 2;
					let p0A = cartesianPointFromPolar(data.centers.B, this.appRndr.radius, angAB);
					segment.arcTo(p0A, data_i.points.A);
				}
			}
			path.join(segment);
		}
		if (this.contour.closed) {
			path.closePath();
		}
		path.reduce({});
		return path;
	}

	setAppearance() {
		if (!this.contour.closed) {
			this.path.fillColor = undefined;
			this.path.strokeColor = new paper.Color(0, 0, 1);
			this.path.strokeWidth = 1;
		} else {
			this.path.fillColor = new paper.Color(0, 0, 1);
			this.path.strokeColor = undefined;
			this.path.strokeWidth = 0;
			this.path.fillRule = "evenodd";
		}
	}
}

export { ContourRndr };
