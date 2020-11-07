import { App } from "./app";
import { Tangent } from "./tangent";

class Contour {
	tangents: Tangent[];
	closed: boolean;

	constructor() {
		this.tangents = [];
		this.closed = false;
	}

	addTangent(tangent: Tangent): void {
		this.tangents.push(tangent);
	}

	getTangentFirst(): Tangent {
		return this.tangents[0];
	}

	getTangentLast(): Tangent {
		return this.tangents[this.tangents.length - 1];
	}

	close(): void {
		this.closed = true;
	}

	getBounds(): number[] {
		const i_lst: number[] = [];
		const j_lst: number[] = [];
		if (this.tangents.length) {
			for (let tangent of this.tangents) {
				i_lst.push(tangent.nodos.A.i);
				j_lst.push(tangent.nodos.A.j);
				i_lst.push(tangent.nodos.B.i);
				j_lst.push(tangent.nodos.B.j);
			}
			return [Math.min(...i_lst), Math.min(...j_lst), Math.max(...i_lst), Math.max(...j_lst)];
		}
	}
}

export { Contour };
