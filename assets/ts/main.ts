import paper from "paper";
import { App } from "./app";
import { AppRndr } from "./appRndr";

function canvas_resize() {
  var canvas_div = document.getElementById("canvas-container");
  var canvas = document.getElementById("canvas");
  canvas.width = canvas_div.offsetWidth;
  canvas.style.width = canvas_div.offsetWidth + "px";
}

window.onload = function () {
  // Canvas resizing
  canvas_resize();

  // PAPERJS - Get a reference to the canvas object
  let canvas = <HTMLCanvasElement>document.getElementById("canvas");
  let canvas_div: any = document.getElementById("canvas-container");

  paper.setup(canvas);

  const app: App = new App();
  const appRndr: AppRndr = new AppRndr(app, canvas);
  appRndr.rndr();

  window.onresize = function () {
    canvas_resize();
    appRndr.refresh();
  };

  // -- Buttons -- //

  // Download

  const button_download: HTMLElement = document.getElementById("download-svg");
  button_download.onclick = function () {
    let svgData: any = paper.project.exportSVG(); // Use any when stuff is not recognized
    svgData.outerHTML; // So now we can use outerHTML even if not recognized by typescript
    const preface = '<?xml version="1.0" standalone="no"?>\r\n';
    const svgBlob = new Blob([preface, svgData.outerHTML], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);
    const name = "hoffman.svg";
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    downloadLink.click();
  };

  const button_download_png = document.getElementById("download-png");
  button_download_png.onclick = function () {
    const imgData = canvas.toDataURL("image/png;base64");
    const name = "ahoffman.png";
    const downloadLink = document.createElement("a");
    downloadLink.href = imgData;
    downloadLink.download = name;
    downloadLink.click();
  };

  // Rows

  const row_bot_add = document.getElementById("row-bot-add");
  row_bot_add.onclick = function () {
    app.addRow();
    appRndr.refresh();
  };

  const row_bot_sub = document.getElementById("row-bot-sub");
  row_bot_sub.onclick = function () {
    // Condizione sempre verificabile di partenza
    let c: boolean = app.rows > 1;
    // Quindi si procede col verificare le altre
    if (app.contours.length) {
      c =
        c &&
        app.contours.every(function (contour) {
          if (contour.tangents.length) {
            return contour.getBounds()[2] < app.rows - 1;
          } else {
            return true;
          }
        });
    }
    if (app.getNodoActive()) {
      c = c && app.getNodoActive().i < app.rows - 1;
    }
    if (app.getNodoTarget()) {
      c = c && app.getNodoTarget().i < app.rows - 1;
    }
    if (c) {
      app.delRow();
      appRndr.refresh();
    }
  };

  // Cols

  const col_rgt_add = document.getElementById("col-rgt-add");
  col_rgt_add.onclick = function () {
    app.addCol();
    appRndr.refresh();
  };

  const col_rgt_sub = document.getElementById("col-rgt-sub");
  col_rgt_sub.onclick = function () {
    // Condizione sempre verificabile di partenza
    let c: boolean = app.cols > 1;
    // Quindi si procede col verificare le altre
    if (app.contours.length) {
      c =
        c &&
        app.contours.every(function (contour) {
          if (contour.tangents.length) {
            return contour.getBounds()[3] < app.cols - 1;
          } else {
            return true;
          }
        });
    }
    if (app.getNodoActive()) {
      c = c && app.getNodoActive().j < app.cols - 1;
    }
    if (app.getNodoTarget()) {
      c = c && app.getNodoTarget().j < app.cols - 1;
    }
    if (c) {
      app.delCol();
      appRndr.refresh();
    }
  };

  // Radius

  // const label: any = document.getElementById("slider-label");
  // label.innerHTML = Math.round(appRndr.dflt_ratio * 100) / 100;

  var radius_slider: any = document.getElementById("radius-slider");
  radius_slider.value = appRndr.dflt_ratio;
  var radius_field: any = document.getElementById("radius-field");
  radius_field.value = Math.round(appRndr.dflt_ratio * 100) / 100;
  radius_slider.oninput = function () {
    const slider: any = this;
    const val: number = parseFloat(slider.value);
    appRndr.ratio = val;
    appRndr.refresh();
    radius_field.value = val;
    // const label: any = document.getElementById("slider-label");
    // label.innerHTML = val;
  };
  radius_field.oninput = function () {
    const field: any = this;
    const val: number = parseFloat(field.value);
    appRndr.ratio = val;
    appRndr.refresh();
    radius_slider.value = val;
  };

  //

  var button_clear = document.getElementById("clear");
  button_clear.onclick = function () {
    app.clear();
    appRndr.refresh();
  };

  var checkbox = document.getElementById("circles-checkbox");
  checkbox.onclick = function () {
    let c: any = checkbox;
    if (c.checked) {
      appRndr.hideNodes();
    } else {
      appRndr.showNodes();
    }
  };
};
