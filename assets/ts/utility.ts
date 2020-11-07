import paper from "paper";
import { AppRndr } from "./appRndr";
import { Nodo } from "./nodo";

function getCanvasWdt(canvas: HTMLCanvasElement): number {
	return canvas.getBoundingClientRect().width;
}

function getCanvasHgt(canvas: HTMLCanvasElement): number {
	return canvas.getBoundingClientRect().height;
}

function calcNodoCenter(nodo: Nodo, appRndr: AppRndr): paper.Point {
	let x: number = appRndr.origin.x + nodo.j * appRndr.spacing;
	let y: number = appRndr.origin.y + nodo.i * appRndr.spacing;
	return new paper.Point(x, y);
}

function calcPointAngleFromCenter(center: paper.Point, point: paper.Point): number {
	let v = point.subtract(center);
	return v.angle;
}

function getPathLastPoint(path: paper.Path): paper.Point {
	let segments = path.segments;
	let segment_last = segments[segments.length - 1];
	let point = segment_last.point;
	return new paper.Point(point.x, point.y);
}

function cartesianPointFromPolar(c: paper.Point, r: number, a: number): paper.Point {
	var x = c.x + r * Math.cos((a / 180) * Math.PI);
	var y = c.y + r * Math.sin((a / 180) * Math.PI);
	return new paper.Point(x, y);
}

export { getCanvasWdt, getCanvasHgt, calcNodoCenter, calcPointAngleFromCenter, getPathLastPoint, cartesianPointFromPolar };
