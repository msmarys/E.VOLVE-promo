// фик меню
window.addEventListener("scroll", () => {
  const menu = document.querySelector(".main-menu");
  if (window.scrollY > 250) {
    menu.classList.add("fixed");
  } else {
    menu.classList.remove("fixed");
  }
});

//появление контента из блюра
window.addEventListener("load", () => {
  document.querySelectorAll(".fade-blur").forEach((el) => {
    el.classList.add("visible");
  });
});
