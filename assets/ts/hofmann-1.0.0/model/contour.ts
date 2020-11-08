import { Nodo } from "./nodo";
import { Flow } from "./flow";
import { NodoFlow } from "./nodoflow";

class Contour {
  nodoflows: Array<NodoFlow>;
  closed: boolean;

  constructor() {
    this.nodoflows = [];
    this.closed = false;
  }

  move_to(nodo: Nodo, flow: Flow): void {
    // Add error handling
    const nodoflow = new NodoFlow(nodo, flow);
    this.nodoflows.push(nodoflow);
  }

  close(): void {
    this.closed = true;
  }

  check_nodo_in(nodo: Nodo): boolean {
    return this.nodoflows.some((nodoflow) => {
      return nodoflow.nodo.equals(nodo);
    });
  }
}

export { Contour };
