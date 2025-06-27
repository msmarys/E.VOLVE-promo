document.addEventListener("DOMContentLoaded", () => {
  const mainMenu = document.querySelector(".main-menu");
  const mobileHeader = document.querySelector(".mobile-header");
  const footer = document.querySelector("#site-footer");
  const menuToggleButtons = document.querySelectorAll(".menu-toggle");
  const mobileOverlay = document.querySelector(".mobile-menu-overlay");
  const burgerIcons = document.querySelectorAll(".burger-icon");

  //фикс десктопа и мобилки
  window.addEventListener("scroll", () => {
    // Десктоп
    if (window.scrollY > 250) {
      mainMenu?.classList.add("fixed");
      mobileHeader?.classList.add("fixed");
    } else {
      mainMenu?.classList.remove("fixed");
      mobileHeader?.classList.remove("fixed");
    }
  });

  //скрытие десктоп-меню при видимости футера
  if (mainMenu && footer) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (window.innerWidth > 1024) {
            if (entry.isIntersecting) {
              mainMenu.classList.add("hide-at-footer");
            } else {
              mainMenu.classList.remove("hide-at-footer");
            }
          } else {
            mainMenu.classList.remove("hide-at-footer");
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

  // бургер
  menuToggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      mobileOverlay.classList.toggle("active");
      document.body.classList.toggle("mobile-open");
      burgerIcons.forEach((icon) => icon.classList.toggle("active"));
      menuToggleButtons.forEach((b) => b.classList.toggle("active"));
    });
  });

  // появление из блюра
  window.addEventListener("load", () => {
    document.querySelectorAll(".fade-blur").forEach((el) => {
      el.classList.add("visible");
    });
  });
});
