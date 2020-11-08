import { App } from "./hofmann-1.0.0/model/app";
import { Nodo } from "./hofmann-1.0.0/model/nodo";

window.onload = function () {
  const app = new App();

  const n1 = new Nodo();
  const n2 = new Nodo();
  const n3 = new Nodo();
  const n4 = new Nodo();

  app.add_nodos([n1, n2, n3, n4]);

  const c = app.create_contour();
  c.move_to(n1, "O");
  c.move_to(n2, "A");
  c.move_to(n3, "A");
  c.move_to(n2, "O");
  c.close();

  console.log(app);
  console.log(n4.id);
  app.del_nodos([n1, n4]);

  console.log(app);
};
