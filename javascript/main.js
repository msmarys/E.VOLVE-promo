// фикс меню
window.addEventListener("scroll", () => {
  const menu = document.querySelector(".main-menu");
  if (window.scrollY > 250) {
    menu.classList.add("fixed");
  } else {
    menu.classList.remove("fixed");
  }
});

// скрытие меню при видимости футера
const menu = document.querySelector(".main-menu");
const footer = document.querySelector("#site-footer");

if (menu && footer) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          menu.classList.add("hide-at-footer");
        } else {
          menu.classList.remove("hide-at-footer");
        }
      });
    },
    {
      root: null,
      threshold: 0,
    }
  );

  observer.observe(footer);
}

//появление контента из блюра
window.addEventListener("load", () => {
  document.querySelectorAll(".fade-blur").forEach((el) => {
    el.classList.add("visible");
  });
});
