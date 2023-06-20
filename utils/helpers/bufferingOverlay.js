const bufferingOverlay = document.querySelector("#buffering-overlay");
const bufferingContent = document.querySelector(".buffering-content");

export const showBufferingOverlay = () => {
  bufferingOverlay.style.display = "flex";
  bufferingContent.classList.add("buffering");
};

export const hideBufferingOverlay = () => {
  bufferingOverlay.style.display = "none";
  bufferingContent.classList.remove("buffering");
};
