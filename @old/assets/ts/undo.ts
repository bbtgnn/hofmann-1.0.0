import { Nodo } from "./nodo";
import { Tangent } from "./tangent";
import { Contour } from "./contour";
import { App } from "./app";

function copyNodo(nodo: Nodo): Nodo {
	const nodoCopy = new Nodo(nodo.i, nodo.j);
	nodoCopy.state = nodo.state;
	return nodoCopy;
}

function copyTangent(tangent: Tangent): Tangent {
	const nodoA = copyNodo(tangent.nodos.A);
	const nodoB = copyNodo(tangent.nodos.B);
	const tangentCopy = new Tangent(nodoA, nodoB, tangent.flow.A, tangent.flow.B);
	return tangentCopy;
}

function copyContour(contour: Contour): Contour {
	const contourCopy = new Contour();
	contourCopy.closed = contour.closed;
	contourCopy.tangents = contour.tangents.map((tangent) => copyTangent(tangent));
	return contourCopy;
}

interface AppState {
	nodos: Nodo[];
	tangents: Tangent[];
	contours: Contour[];
	rows: number;
	cols: number;
}

function getAppState(app: App): AppState {
	const appState: AppState = {
		nodos: app.nodos.map((nodo) => copyNodo(nodo)),
		tangents: app.tangents.map((tangent) => copyTangent(tangent)),
		contours: app.contours.map((contour) => copyContour(contour)),
		rows: app.rows,
		cols: app.cols,
	};
	return appState;
}

export { AppState, getAppState };
