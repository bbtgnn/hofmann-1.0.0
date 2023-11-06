import { Nodo } from "./nodo";
import { Contour } from "./contour";
import { flowToTangents } from "./tangentFunctions";

type Flow = "O" | "A";
type TangentState = "inactive" | "hover";

class Tangent {
	nodos: {
		A: Nodo;
		B: Nodo;
	};
	flow: {
		A: Flow;
		B: Flow;
	};
	state: TangentState;
	tangentFunction: typeof flowToTangents[0][0];

	constructor(nodoA: Nodo, nodoB: Nodo, flowA: Flow, flowB: Flow) {
		this.nodos = {
			A: nodoA,
			B: nodoB,
		};
		this.flow = {
			A: flowA,
			B: flowB,
		};
		this.state = "inactive";
		this.tangentFunction = flowToTangents[this.flow.A][this.flow.B];
	}

	setState(state: TangentState): void {
		this.state = state;
	}
}

export { Tangent, Flow };
