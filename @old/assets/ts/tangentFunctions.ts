import paper from "paper";
import { Nodo } from "./nodo";
import { Tangent, Flow } from "./tangent";
import { AppRndr } from "./appRndr";
import { calcNodoCenter } from "./utility";

// -- Straight Tangents -- //

function calcTangentStraightXYG(d: number, r: number): number[] {
	let x: number = d;
	let y: number = r;
	return [x, y];
}

// OOG = Orario, Orario, Generico
function calcTangentOOGPoints(d: number, r: number): paper.Point[] {
	let [x, y]: number[] = calcTangentStraightXYG(d, r);
	let pA: paper.Point = new paper.Point(-x, -y);
	let pB: paper.Point = new paper.Point(x, -y);
	return [pA, pB];
}

// AAG = Antiorario, Antiorario, Generico
function calcTangentAAGPoints(d: number, r: number): paper.Point[] {
	let [x, y]: number[] = calcTangentStraightXYG(d, r);
	let pA: paper.Point = new paper.Point(-x, y);
	let pB: paper.Point = new paper.Point(x, y);
	return [pA, pB];
}

// -- Diagonal tangents -- //

function calcTangentDiagonalXYG(d: number, r: number): number[] {
	let m: number = Math.sqrt(Math.pow(r, 2) / (Math.pow(d, 2) - Math.pow(r, 2)));
	let x: number = d / (1 + Math.pow(m, 2));
	let y: number = m * x;
	return [x, y];
}

// OAG = Orario, Antiorario, Generico
function calcTangentOAGPoints(d: number, r: number): paper.Point[] {
	let [x, y]: number[] = calcTangentDiagonalXYG(d, r);
	let pA: paper.Point = new paper.Point(-x, -y);
	let pB: paper.Point = new paper.Point(x, y);
	return [pA, pB];
}

// AOG = Antiorario, Orario, Generico
function calcTangentAOGPoints(d: number, r: number): paper.Point[] {
	let [x, y]: number[] = calcTangentDiagonalXYG(d, r);
	let pA: paper.Point = new paper.Point(-x, y);
	let pB: paper.Point = new paper.Point(x, -y);
	return [pA, pB];
}

function calcTangentActualPoints(points: paper.Point[], t: paper.Point, a: number): paper.Point[] {
	return points.map((point) => point.add(t).rotate(a, t));
}

function createTangents(nodoA: Nodo, nodoB: Nodo): Tangent[] {
	let tangents: Tangent[] = [];
	for (let a of ["O", "A"]) {
		for (let b of ["O", "A"]) {
			let t = new Tangent(nodoA, nodoB, a as Flow, b as Flow);
			tangents.push(t);
		}
	}
	return tangents;
}

function checkTangentFlowA(tangent: Tangent, flowA: Flow): boolean {
	return tangent.flow.A == flowA;
}

function checkTangentFlowB(tangent: Tangent, flowB: Flow): boolean {
	return tangent.flow.B == flowB;
}

function checkTangentFlow(tangent: Tangent, flowA: Flow, flowB: Flow): boolean {
	let temp: boolean = true;
	if (!(flowA === undefined)) {
		temp = temp && checkTangentFlowA(tangent, flowA);
	}
	if (!(flowB === undefined)) {
		temp = temp && checkTangentFlowB(tangent, flowB);
	}
	return temp;
}

function filterTangents(tangents: Tangent[], flowA: Flow, flowB: Flow): Tangent[] {
	let tangents_filtered: Tangent[] = tangents.filter((tangent) => checkTangentFlow(tangent, flowA, flowB));
	return tangents_filtered;
}

class TangentGeometricData {
	points: {
		A: paper.Point;
		B: paper.Point;
	};
	centers: {
		A: paper.Point;
		B: paper.Point;
	};
	angles: {
		A: number;
		B: number;
	};

	constructor(pointA: paper.Point, pointB: paper.Point, centerA: paper.Point, centerB: paper.Point, angleA: number, angleB: number) {
		this.points = {
			A: pointA,
			B: pointB,
		};
		this.centers = {
			A: centerA,
			B: centerB,
		};
		this.angles = {
			A: angleA,
			B: angleB,
		};
	}
}

function calcTangentGeometricData(tangent: Tangent, appRndr: AppRndr): TangentGeometricData {
	let nodeA_c: paper.Point = calcNodoCenter(tangent.nodos.A, appRndr);
	let nodeB_c: paper.Point = calcNodoCenter(tangent.nodos.B, appRndr);
	let vec: paper.Point = nodeB_c.subtract(nodeA_c);
	let trs: paper.Point = nodeA_c.add(vec.divide(2));
	let rot: number = vec.angle;
	let dst: number = vec.length;
	let [nodeA_p, nodeB_p]: paper.Point[] = tangent.tangentFunction(dst / 2, appRndr.radius);
	[nodeA_p, nodeB_p] = calcTangentActualPoints([nodeA_p, nodeB_p], trs, rot);
	let angA: number = nodeA_p.subtract(nodeA_c).angle;
	let angB: number = nodeB_p.subtract(nodeB_c).angle;
	return new TangentGeometricData(nodeA_p, nodeB_p, nodeA_c, nodeB_c, angA, angB);
}

// -- Packing Functions -- //

// fI = flow in, fO = flow out
// 0 = orario, 1 = antiorario
interface FlowToTangents {
	[fI: string]: {
		[f0: string]: typeof calcTangentAOGPoints;
	};
}

const flowToTangents: FlowToTangents = {
	"O": {
		"O": calcTangentOOGPoints,
		"A": calcTangentOAGPoints,
	},
	"A": {
		"O": calcTangentAOGPoints,
		"A": calcTangentAAGPoints,
	},
};

export { flowToTangents, calcTangentActualPoints, createTangents, filterTangents, TangentGeometricData, calcTangentGeometricData };
