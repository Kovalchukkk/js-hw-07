import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const imagesMarkup = createMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("afterbegin", imagesMarkup);

galleryContainer.addEventListener("click", onGalleryContainerClick);

console.log(galleryItems);

function createMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
    })
    .join("");
}

function onGalleryContainerClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  const originalImageSrc = e.target.getAttribute("data-source");

  const instance = basicLightbox.create(
    `
		<img src="${originalImageSrc}">
	`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", onEscKeydown);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", onEscKeydown);
      },
    }
  );

  instance.show();

  function onEscKeydown(e) {
    if (e.code === "Escape") {
      instance.close();
    }
  }
}
