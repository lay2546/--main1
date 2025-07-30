async function setLanguage(lang) {
  const response = await fetch(`lang/${lang}.json`);
  const translations = await response.json();

  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    if (translations[key]) {
      // ✅ ถ้ามี h3 ภายใน (เช่น Navigation Card) → แก้เฉพาะ h3
      if (el.querySelector("h3")) {
        el.querySelector("h3").textContent = translations[key];
      } 
      // ✅ ถ้ามี cart-count → แก้เฉพาะข้อความหลัก
      else if (el.querySelector("#cart-count")) {
        const count = el.querySelector("#cart-count").textContent;
        el.childNodes[0].textContent = translations[key] + " ";
        el.querySelector("#cart-count").textContent = count;
      } 
      // ✅ กรณีทั่วไป
      else {
        el.textContent = translations[key];
      }
    }
  });

  localStorage.setItem("language", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "th";
  setLanguage(savedLang);

  document.getElementById("lang-th")?.addEventListener("click", () => setLanguage("th"));
  document.getElementById("lang-en")?.addEventListener("click", () => setLanguage("en"));
});
