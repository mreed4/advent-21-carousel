import pictures from "./data.js";

const thumbnailContainer = document.querySelector(".thumbnails ul");
const mainImage = document.querySelector(".feature img");
const mainImageDescription = document.querySelector(".feature div.caption");
const leftArrow = document.querySelector("a.left");
const rightArrow = document.querySelector("a.right");

leftArrow.addEventListener("click", previousImage);
rightArrow.addEventListener("click", nextImage);

window.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "ArrowLeft") {
    previousImage(event);
  }

  if (event.ctrlKey && event.key === "ArrowRight") {
    nextImage(event);
  }
});

pictures.forEach((picture, i) => buildLi(picture, i));

function buildLi(picture, i) {
  const li = document.createElement("li");
  const anchor = document.createElement("a");
  const img = document.createElement("img");

  if (i === 0) {
    li.classList.add("selected");
  }

  anchor.href = "#";
  anchor.addEventListener("click", handleThumbnailClick);

  img.src = "images/" + picture.src;
  img.alt = picture.caption;

  li.appendChild(anchor);
  anchor.appendChild(img);
  thumbnailContainer.appendChild(li);

  function handleThumbnailClick(event) {
    event.preventDefault();
    mainImage.src = "images/" + picture.src;
    mainImageDescription.textContent = picture.caption;
    setSelectedThumbnail();
  }
}

function setSelectedThumbnail() {
  const currentImage = mainImage.src.split("/").pop();
  const currentIndex = pictures.findIndex((picture) => picture.src === currentImage);
  const thumbnails = document.querySelectorAll(".thumbnails ul li");
  thumbnails.forEach((thumbnail) => thumbnail.classList.remove("selected"));
  thumbnails[currentIndex].classList.add("selected");
}

function previousImage(event) {
  event.preventDefault();
  const currentImage = mainImage.src.split("/").pop();
  const currentIndex = pictures.findIndex((picture) => picture.src === currentImage);
  const previousIndex = currentIndex === 0 ? pictures.length - 1 : currentIndex - 1;
  mainImage.src = "images/" + pictures[previousIndex].src;
  mainImageDescription.textContent = pictures[previousIndex].caption;
  setSelectedThumbnail();
}

function nextImage(event) {
  event.preventDefault();
  const currentImage = mainImage.src.split("/").pop();
  const currentIndex = pictures.findIndex((picture) => picture.src === currentImage);
  const nextIndex = currentIndex === pictures.length - 1 ? 0 : currentIndex + 1;
  mainImage.src = "images/" + pictures[nextIndex].src;
  mainImageDescription.textContent = pictures[nextIndex].caption;
  setSelectedThumbnail();
}
