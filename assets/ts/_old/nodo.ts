import { App } from "./app";

type NodoState = "inactive" | "active" | "target" | "hover";

class Nodo {
	i: number;
	j: number;
	state: NodoState;

	constructor(i: number, j: number) {
		this.i = i;
		this.j = j;
		this.state = "inactive";
	}

	setState(state: NodoState) {
		this.state = state;
	}
}

export { Nodo, NodoState };
