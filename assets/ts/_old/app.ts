import { Nodo, NodoState } from "./nodo";
import { Tangent, Flow } from "./tangent";
import { createTangents, filterTangents } from "./tangentFunctions";
import { Contour } from "./contour";

class App {
	dflt_rows: number;
	dflt_cols: number;
	rows: number;
	cols: number;
	nodos: Nodo[];
	tangents: Tangent[];
	contours: Contour[];

	constructor() {
		this.dflt_rows = 4;
		this.dflt_cols = 4;
		this.rows = this.dflt_rows;
		this.cols = this.dflt_cols;
		this.nodos = [];
		this.tangents = [];
		this.contours = [];
		this.setupNodos();
	}

	addNodo(nodo: Nodo): void {
		this.nodos.push(nodo);
	}

	getNodo(i: number, j: number): Nodo {
		for (let nodo of this.nodos) {
			if (nodo.i == i && nodo.j == j) {
				return nodo;
			}
		}
	}

	delNodo(nodo: Nodo): void {
		this.nodos.splice(this.nodos.indexOf(nodo), 1);
	}

	setupNodos(): void {
		for (let i: number = 0; i < this.rows; i++) {
			for (let j: number = 0; j < this.cols; j++) {
				this.addNodo(new Nodo(i, j));
			}
		}
	}

	getNodoByState(state: NodoState): Nodo {
		for (let nodo of this.nodos) {
			if (nodo.state == state) {
				return nodo;
			}
		}
	}

	getNodoActive(): Nodo {
		return this.getNodoByState("active");
	}

	getNodoTarget(): Nodo {
		return this.getNodoByState("target");
	}

	// -- Tangents ops -- //
	addTangents(): void {
		if (this.getNodoActive() && this.getNodoTarget()) {
			let tangents: Tangent[] = createTangents(this.getNodoActive(), this.getNodoTarget());
			let contour_active: Contour = this.getContourActive();

			let flowA: Flow;
			if (contour_active.tangents.length) {
				flowA = contour_active.getTangentLast().flow.B;
			}
			let flowB: Flow;
			if (contour_active.getTangentFirst() && this.getNodoTarget() == contour_active.getTangentFirst().nodos.A) {
				flowB = contour_active.getTangentFirst().flow.A;
			}

			tangents = filterTangents(tangents, flowA, flowB);

			this.tangents = tangents;
		}
	}

	// -- Contour ops -- //

	addContour(): void {
		this.contours.push(new Contour());
	}

	getContourActive(): Contour {
		for (let contour of this.contours) {
			if (!contour.closed) {
				return contour;
			}
		}
	}

	delContour(contour: Contour): void {
		this.contours.splice(this.contours.indexOf(contour), 1);
	}

	addRow(): void {
		for (var j = 0; j < this.cols; j++) {
			this.addNodo(new Nodo(this.rows, j));
		}
		this.rows += 1;
	}

	getRow(i: number): Nodo[] {
		const row: Nodo[] = [];
		for (let j = 0; j < this.cols; j++) {
			row.push(this.getNodo(i, j));
		}
		return row;
	}

	getLastRow(): Nodo[] {
		return this.getRow(this.rows - 1);
	}

	delRow(): void {
		this.rows -= 1;
		for (let nodo of this.getRow(this.rows)) {
			this.delNodo(nodo);
		}
	}

	addCol(): void {
		for (var i = 0; i < this.rows; i++) {
			this.addNodo(new Nodo(i, this.cols));
		}
		this.cols += 1;
	}

	getCol(j): Nodo[] {
		const col: Nodo[] = [];
		for (var i = 0; i < this.rows; i++) {
			col.push(this.getNodo(i, j));
		}
		return col;
	}

	getLastCol() {
		return this.getCol(this.cols - 1);
	}

	delCol() {
		this.cols -= 1;
		for (let nodo of this.getCol(this.cols)) {
			this.delNodo(nodo);
		}
	}

	clearNodos() {
		this.nodos.forEach((nodo) => {
			nodo.setState("inactive");
		});
	}

	clearTangents(): void {
		this.tangents = [];
	}

	clear() {
		this.clearNodos();
		this.contours = [];
		this.clearTangents();
	}
}

export { App };
