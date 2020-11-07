import paper from "paper";
import { App } from "./app";
import { getCanvasWdt, getCanvasHgt } from "./utility";
import { NodoRndr } from "./nodoRndr";
import { Nodo } from "./nodo";
import { TangentRndr } from "./tangentRndr";
import { ContourRndr } from "./contourRndr";
import { Contour } from "./contour";
import { Tangent } from "./tangent";

class AppRndr {
  app: App;
  canvas: HTMLCanvasElement;
  spacing: number;
  radius: number;
  dflt_ratio: number;
  ratio: number;
  origin: paper.Point;
  nodoRndrs: NodoRndr[];
  tangentRndrs: TangentRndr[];
  contourRndrs: ContourRndr[];

  constructor(app: App, canvas: HTMLCanvasElement) {
    this.app = app;
    this.canvas = canvas;
    this.dflt_ratio = Math.SQRT1_2; // Ratio such that you get 45° lines
    this.ratio = this.dflt_ratio;
    this.nodoRndrs = [];
    this.tangentRndrs = [];
    this.contourRndrs = [];
    this.setMetrics();
  }

  // -- Spacing -- //

  calcColSpacing(): number {
    return getCanvasWdt(this.canvas) / this.app.cols;
  }

  calcRowSpacing(): number {
    return getCanvasHgt(this.canvas) / this.app.rows;
  }

  calcSpacing(): number {
    return Math.min(this.calcColSpacing(), this.calcRowSpacing());
  }

  setSpacing(): void {
    this.spacing = this.calcSpacing();
  }

  // -- Radius -- //

  calcRadius(): number {
    return (this.spacing / 2) * this.ratio;
  }

  setRadius(): void {
    this.radius = this.calcRadius();
  }

  // -- Starting point -- //

  calcOrigin(): paper.Point {
    let x: number =
      getCanvasWdt(this.canvas) / 2 - (this.spacing * (this.app.cols - 1)) / 2;
    let y: number =
      getCanvasHgt(this.canvas) / 2 - (this.spacing * (this.app.rows - 1)) / 2;
    return new paper.Point(x, y);
  }

  setOrigin(): void {
    this.origin = this.calcOrigin();
  }

  // -- Metrics setter -- //

  setMetrics(): void {
    this.setSpacing();
    this.setRadius();
    this.setOrigin();
  }

  // -- Getter -- //

  getNodoRndr(nodo: Nodo): NodoRndr {
    for (let nodoRndr of this.nodoRndrs) {
      if (nodoRndr.nodo == nodo) {
        return nodoRndr;
      }
    }
  }

  getTangentRndr(tangent: Tangent): TangentRndr {
    for (let tangentRndr of this.tangentRndrs) {
      if (tangentRndr.tangent == tangent) {
        return tangentRndr;
      }
    }
  }

  getContourRndr(contour: Contour): ContourRndr {
    for (let contourRndr of this.contourRndrs) {
      if (contourRndr.contour == contour) {
        return contourRndr;
      }
    }
  }

  // -- Rendering -- //

  rndrNodos(): void {
    if (this.app.nodos.length) {
      for (let nodo of this.app.nodos) {
        let nr = new NodoRndr(nodo, this);
        this.nodoRndrs.push(nr);
      }
    }
  }

  rndrTangents(): void {
    if (this.app.tangents.length) {
      for (let tangent of this.app.tangents) {
        let tr = new TangentRndr(tangent, this);
        this.tangentRndrs.push(tr);
      }
    }
  }

  rndrContours(): void {
    if (this.app.contours.length) {
      for (let contour of this.app.contours) {
        let cr = new ContourRndr(contour, this);
        this.contourRndrs.push(cr);
      }
    }
  }

  rndr(): void {
    this.rndrNodos();
    this.rndrContours();
    this.rndrTangents();
  }

  refresh(): void {
    this.clear();
    this.setMetrics();
    this.rndr();
  }

  // -- Clearing -- //

  clearNodoRndrs(): void {
    if (this.nodoRndrs.length) {
      for (let nodoRndr of this.nodoRndrs) {
        nodoRndr.path.remove();
      }
      this.nodoRndrs = [];
    }
  }

  clearTangentRndrs(): void {
    if (this.tangentRndrs.length) {
      for (let tangentRndr of this.tangentRndrs) {
        tangentRndr.path.remove();
      }
      this.tangentRndrs = [];
    }
  }

  clearContourRndrs(): void {
    if (this.contourRndrs.length) {
      for (let contourRndr of this.contourRndrs) {
        contourRndr.path.remove();
      }
      this.contourRndrs = [];
    }
  }

  clear(): void {
    this.clearNodoRndrs();
    this.clearTangentRndrs();
    this.clearContourRndrs();
  }

  hideNodes(): void {
    this.nodoRndrs.forEach(function (nodoRndr) {
      nodoRndr.path.fillColor = undefined;
    });
  }

  showNodes(): void {
    this.nodoRndrs.forEach(function (nodoRndr) {
      nodoRndr.setColor();
    });
  }
}

export { AppRndr };
