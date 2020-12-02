import paper from "paper";
import { App } from "./app";
import { AppRndr } from "./appRndr";

function mobileAndTabletCheck() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  if (check) {
    document.querySelector(".sorry").style.display = "flex";
  }
}

function resize_workspace__canvas(canvas) {
  // Getting reference to parent
  let canvas_div = canvas.parentElement;
  // Setting canvas width
  canvas.width = canvas_div.clientWidth;
  canvas.style.width = canvas_div.clientWidth + "px";
  // Getting reference to workspace
  let workspace = document.querySelector(".workspace");
  let workspace_style = window.getComputedStyle(workspace);
  // Vertical space between workspace and canvas
  let canvas_margin_ver = workspace_style["grid-template-rows"].split(" ")[0];
  // Calculating by subtraction canvas height
  let heights = [document.querySelector(".navbar").clientHeight, document.querySelector(".controls").clientHeight, parseInt(workspace_style.marginTop, 10), 4 * parseInt(canvas_margin_ver, 10), 10];
  let hgt = window.innerHeight - heights.reduce((a, b) => a + b, 0);
  if (hgt > 800) {
    hgt = 800;
  }
  // Setting the height
  canvas.height = hgt;
  canvas.style.height = hgt + "px";
}

function modal_size() {
  const modal = document.querySelector(".tutorial");
  const reference = document.querySelector(".workspace");
  console.log(reference.getBoundingClientRect());
  modal.style.top = reference.getBoundingClientRect().top + "px";
  modal.style.left = reference.getBoundingClientRect().left + "px";
  modal.style.width = reference.getBoundingClientRect().width + "px";
  modal.style.height = reference.getBoundingClientRect().height + "px";
}

window.onload = function () {
  // Checking if browser is mobile
  mobileAndTabletCheck();

  // Modal managing
  const modal = document.querySelector(".tutorial");
  // Setting the modal size (and in onresize we recalculate)

  // Opening modal
  const modal_button = document.querySelector(".controls__help");
  modal_button.addEventListener("click", function (event) {
    modal.classList.toggle("invisible");
  });
  // Closing modal
  const modal_close = document.querySelector(".tutorial__close");
  modal_close.addEventListener("click", function (event) {
    modal.classList.toggle("invisible");
  });

  // Getting a reference to the canvas object
  let canvas = document.querySelector(".workspace__canvas");

  // Resizing it correctly
  resize_workspace__canvas(canvas);
  modal_size(); // Need to call this after canvas resize bc has to take correct sizing

  paper.setup(canvas);
  // Canvas resizing
  const app: App = new App();
  const appRndr: AppRndr = new AppRndr(app, canvas);
  appRndr.rndr();

  // Setting onresize
  window.onresize = function () {
    resize_workspace__canvas(canvas);
    modal_size();
    appRndr.refresh();
  };
  // -- Buttons -- //
  // Download
  const button_download: HTMLElement = document.querySelector(".controls__download_SVG");
  button_download.onclick = function () {
    let svgData: any = paper.project.exportSVG(); // Use any when stuff is not recognized
    svgData.outerHTML; // So now we can use outerHTML even if not recognized by typescript
    const preface = '<?xml version="1.0" standalone="no"?>\r\n';
    const svgBlob = new Blob([preface, svgData.outerHTML], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);
    const name = "hoffman100.svg";
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    downloadLink.click();
  };
  const button_download_png: HTMLElement = document.querySelector(".controls__download_PNG");
  button_download_png.onclick = function () {
    const imgData = canvas.toDataURL();
    const name = "hoffman100.png";
    const downloadLink = document.createElement("a");
    downloadLink.href = imgData;
    downloadLink.download = name;
    downloadLink.click();
  };
  // Rows
  const row_bot_add: HTMLElement = document.querySelector(".btn_bot_add");
  row_bot_add.onclick = function () {
    app.addRow();
    appRndr.refresh();
  };
  const row_bot_sub: HTMLElement = document.querySelector(".btn_bot_sub");
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
  const col_rgt_add: HTMLElement = document.querySelector(".btn_rgt_add");
  col_rgt_add.onclick = function () {
    app.addCol();
    appRndr.refresh();
  };
  const col_rgt_sub: HTMLElement = document.querySelector(".btn_rgt_sub");
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
  const label: HTMLElement = document.getElementById("slider-label");
  // label.innerHTML = Math.round(appRndr.dflt_ratio * 100) / 100;
  var radius_slider: any = document.querySelector(".controls__radius__slider");
  radius_slider.value = appRndr.dflt_ratio;
  var radius_field: any = document.querySelector(".controls__radius__field");
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

  var button_clear: HTMLElement = document.querySelector(".controls__clear__btn");
  button_clear.onclick = function () {
    app.clear();
    appRndr.refresh();
  };
  //   var checkbox = document.getElementById("circles-checkbox");
  //   checkbox.onclick = function () {
  //     let c: any = checkbox;
  //     if (c.checked) {
  //       appRndr.hideNodes();
  //     } else {
  //       appRndr.showNodes();
  //     }
  //   };
};
