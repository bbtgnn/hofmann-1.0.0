import { generate_unique_id } from "../../utility/generateuniqueid";

class Nodo {
  id: string;

  constructor() {
    this.id = generate_unique_id();
  }

  equals(nodo: Nodo) {
    return this.id == nodo.id;
  }
}

export { Nodo };
