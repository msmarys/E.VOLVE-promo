// анимированный градиент
class GradientAnimation {
  constructor() {
    this.cnv = document.querySelector("#gradient-canvas");
    if (!this.cnv) return;

    this.ctx = this.cnv.getContext("2d");
    this.circlesNum = 15;
    this.minRadius = 300;
    this.maxRadius = 600;
    this.speed = 0.005;

    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener("resize", () => {
      this.setCanvasSize();
      this.createCircles();
    });

    this.setCanvasSize();
    this.createCircles();
    this.drawAnimation();
  }

  setCanvasSize() {
    this.w = this.cnv.width = innerWidth * devicePixelRatio;
    this.h = this.cnv.height = innerHeight * devicePixelRatio;
    this.ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  createCircles() {
    this.circles = [];
    for (let i = 0; i < this.circlesNum; ++i) {
      this.circles.push(
        new Circle(this.w, this.h, this.minRadius, this.maxRadius)
      );
    }
  }

  drawCircles() {
    this.circles.forEach((circle) =>
      circle.draw(this.ctx, this.speed, this.mouse)
    );
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  drawAnimation() {
    this.clearCanvas();
    this.drawCircles();
    requestAnimationFrame(() => this.drawAnimation());
  }
}

class Circle {
  constructor(w, h, minR, maxR) {
    this.baseX = Math.random() * w;
    this.baseY = Math.random() * h;
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * (maxR - minR) + minR;

    const palette = ["#F4B9BF", "#F4D2D5", "#FFBEC0"];
    this.firstColor = palette[Math.floor(Math.random() * palette.length)];
    this.secondColor = `${this.firstColor}00`;
  }

  draw(ctx, speed, mouse) {
    this.angle += speed;
    const dx = (mouse.x - window.innerWidth / 2) * 0.05;
    const dy = (mouse.y - window.innerHeight / 2) * 0.05;

    const x = this.baseX / devicePixelRatio + Math.cos(this.angle) * 100 + dx;
    const y = this.baseY / devicePixelRatio + Math.sin(this.angle) * 100 + dy;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
    gradient.addColorStop(0, this.firstColor);
    gradient.addColorStop(1, this.secondColor);

    ctx.globalCompositeOperation = "overlay";
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mainMenu = document.querySelector(".main-menu");
  const mobileHeader = document.querySelector(".mobile-header");
  const footer = document.querySelector("#site-footer");
  const menuToggleButtons = document.querySelectorAll(".menu-toggle");
  const mobileOverlay = document.querySelector(".mobile-menu-overlay");
  const burgerIcons = document.querySelectorAll(".burger-icon");

  // фикс десктопа и мобилки
  window.addEventListener("scroll", () => {
    if (window.scrollY > 250) {
      mainMenu?.classList.add("fixed");
      mobileHeader?.classList.add("fixed");
    } else {
      mainMenu?.classList.remove("fixed");
      mobileHeader?.classList.remove("fixed");
    }
  });

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

  // появление карточек событий по скроллу
  const cards = document.querySelectorAll(".fade-sticky");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  cards.forEach((card) => observer.observe(card));

  // галерея департамента
  const track = document.querySelector(".gallery-track");
  const images = document.querySelectorAll(".gallery-img");
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");
  const wrapper = document.querySelector(".gallery-wrapper");

  if (track && images.length && prevBtn && nextBtn && wrapper) {
    let currentIndex = 0;

    function updateGallery() {
      const slideWidth = wrapper.clientWidth;
      const offset = -currentIndex * slideWidth;
      track.style.transform = `translateX(${offset}px)`;
    }

    nextBtn.addEventListener("click", () => {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        updateGallery();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateGallery();
      }
    });

    window.addEventListener("resize", updateGallery);
    updateGallery();
  }

  // галерея магазина
  // галерея магазина
  const shopTrack = document.querySelector(".shop-gallery-track");
  const shopSlides = document.querySelectorAll(".shop-slide");
  const shopPrevBtn = document.querySelector(".shop-gallery-prev");
  const shopNextBtn = document.querySelector(".shop-gallery-next");

  if (shopTrack && shopSlides.length && shopPrevBtn && shopNextBtn) {
    let shopIndex = 0;

    function updateShopGallery() {
      const slideWidth = shopSlides[0].offsetWidth;
      const offset = -shopIndex * slideWidth;
      shopTrack.style.transform = `translateX(${offset}px)`;
    }

    shopNextBtn.addEventListener("click", () => {
      if (shopIndex < shopSlides.length - 1) {
        shopIndex++;
        updateShopGallery();
      }
    });

    shopPrevBtn.addEventListener("click", () => {
      if (shopIndex > 0) {
        shopIndex--;
        updateShopGallery();
      }
    });

    window.addEventListener("resize", updateShopGallery);
    updateShopGallery();
  }

  // обработка кнопок предзаказа
  document.querySelectorAll(".shop-order").forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("Открыть popup предзаказа");
    });
  });

  // Запуск градиентной анимации — на `window.onload`
  window.addEventListener("load", () => {
    new GradientAnimation();
  });
});
