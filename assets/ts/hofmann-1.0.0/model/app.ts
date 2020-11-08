import { Nodo } from "./nodo";
import { Contour } from "./contour";

class App {
  nodos: Array<Nodo>;
  contours: Array<Contour>;

  constructor() {
    this.nodos = [];
    this.contours = [];
  }

  get_nodo_by_id(id: string): Nodo {
    for (let i = 0; i < this.nodos.length; i++) {
      const nodo = this.nodos[i];
      if (nodo.id == id) {
        return nodo;
      }
    }
  }

  add_nodo(nodo: Nodo): void {
    this.nodos.push(nodo);
  }

  add_nodos(nodos: Array<Nodo>): void {
    nodos.forEach((nodo) => {
      this.nodos.push(nodo);
    });
  }

  del_nodo(nodo: Nodo): void {
    if (!this.check_nodo_in_contours(nodo)) {
      const app_nodo = this.get_nodo_by_id(nodo.id);
      this.nodos.splice(this.nodos.indexOf(app_nodo), 1);
    }
    //
    else {
      console.error("Can't delete node: a contour goes through it!");
    }
  }

  del_nodos(nodos: Array<Nodo>, preserve: boolean = false): void {
    const conflict: boolean = nodos.some((nodo) => this.check_nodo_in_contours(nodo));
    if (preserve && conflict) {
      console.error("Can't delete nodes: a contour goes through one of those!");
    }
    //
    else {
      for (var i = 0; i < nodos.length; i++) {
        this.del_nodo(nodos[i]);
      }
    }
  }

  create_contour(): Contour {
    const contour = new Contour();
    this.contours.push(contour);
    return contour;
  }

  check_nodo_in_contours(nodo) {
    return this.contours.some((contour) => {
      return contour.check_nodo_in(nodo);
    });
  }
}

export { App };
