import { Nodo } from "./nodo";
import { Flow } from "./flow";

class NodoFlow {
  nodo: Nodo;
  flow: Flow;

  constructor(nodo: Nodo, flow: Flow) {
    this.nodo = nodo;
    this.flow = flow;
  }
}

export { NodoFlow };
