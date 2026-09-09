const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav-links");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const quoteForm = document.querySelector("[data-quote-form]");
if (quoteForm) {
  const requestedService = new URLSearchParams(window.location.search).get("service");
  const serviceMap = {
    auto: "automotive window tinting",
    residential: "residential window tinting",
    commercial: "commercial window tinting"
  };
  const serviceSelect = quoteForm.querySelector('[name="service"]');
  if (serviceSelect && serviceMap[requestedService]) {
    serviceSelect.value = serviceMap[requestedService];
  }

  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const name = data.get("name") || "A Wichita customer";
    const service = data.get("service") || "window tinting";
    const details = data.get("details") || "Please contact me with availability.";
    const message = `Hi, this is ${name}. I am interested in ${service}. ${details}`;
    const status = quoteForm.querySelector("[data-form-status]");
    if (status) {
      status.textContent = "Opening a pre-filled text to The Tintmaster. Review it, then press send.";
    }
    window.location.href = `sms:+13162725521?body=${encodeURIComponent(message)}`;
  });
}
