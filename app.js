const carousel = document.querySelector(".carousel");
const buttons = document.querySelectorAll(".wrapper i");
const cardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChild = [...carousel.children];
let cardPerView = Math.round(carousel.offsetWidth / cardWidth);
let isDragging = false,
  startX,
  startScrollLeft;

carouselChild
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
carouselChild.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    carousel.scrollLeft += btn.id === "left" ? -cardWidth : cardWidth;
  });
});

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const startDragging = (e) => {
  carousel.classList.add("dragging");
  isDragging = true;
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};
const stopDragging = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};
const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
};

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mousedown", startDragging);
document.addEventListener("mouseup", stopDragging);
carousel.addEventListener("scroll", infiniteScroll);
