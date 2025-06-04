const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
});

setTimeout(() => {
  scroll.update();
}, 1000);
