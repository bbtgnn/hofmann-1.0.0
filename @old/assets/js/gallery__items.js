const gallery__items = [
  ["filomena_galvani", "https://www.instagram.com/filomena_galvani/"],
  ["giulio_galli", "https://www.instagram.com/giuliogalli_/"],
  ["gregorio_pandolfo", "https://www.instagram.com/gregoriopandolfo/"],
  ["gabriele_zagaglia", "https://www.instagram.com/gabriele_zagaglia/"],
  ["claudia_pazzaglia", "https://www.instagram.com/lapazz/"],
  ["flavia_tritto", "https://www.instagram.com/flaviatritto/"],
];

window.onload = function () {
  // The container
  const container = document.querySelector(".gallery");

  // Iterating over items
  gallery__items.forEach((item) => {
    // Item container
    const gallery__item = document.createElement("div");
    gallery__item.classList.add("gallery__item");

    // Image
    const gallery__image = new Image();
    gallery__image.src = "./assets/svg/" + item[0] + ".svg";

    // Appending elements to item container
    gallery__item.appendChild(gallery__image);

    // Appending the element to doc
    container.appendChild(gallery__item);
  });
};
