(() => {
  "use strict";

  const button = document.getElementById("open-envelope");
  const reader = document.getElementById("reader");
  const announcement = document.getElementById("announcement");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let isOpening = false;

  function showLetter(moveFocus = true) {
    document.body.dataset.state = "read";
    document.body.classList.remove("is-revealing");
    button.setAttribute("aria-expanded", "true");
    announcement.textContent = "봉투가 열렸습니다. 편지 본문을 읽은 뒤, 아래에서 직접 쓴 편지 사진 세 장을 펼쳐 볼 수 있습니다.";
    if (moveFocus) {
      window.scrollTo({ top: 0, behavior: "instant" });
      reader.focus({ preventScroll: true });
    }
  }

  button.addEventListener("click", () => {
    if (isOpening) return;
    isOpening = true;
    button.disabled = true;

    if (reduceMotion.matches) {
      showLetter();
      return;
    }

    document.body.dataset.state = "opening";
    window.setTimeout(() => document.body.classList.add("is-revealing"), 2420);
    window.setTimeout(() => showLetter(), 2860);
  });

  // A link directly to the readable transcript also works, including locally.
  function revealLinkedText() {
    if (window.location.hash !== "#transcript") return;
    showLetter(false);
    requestAnimationFrame(() => document.getElementById("transcript").scrollIntoView({ behavior: "instant" }));
  }
  revealLinkedText();
  window.addEventListener("hashchange", revealLinkedText);
})();
