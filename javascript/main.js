window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-blur").forEach((el) => {
    // Добавляем класс visible, чтобы запустить анимацию появления
    el.classList.add("visible");
  });
});
