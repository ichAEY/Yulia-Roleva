import fs from "node:fs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";

let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

function replaceRequired(from, to, label) {
  if (!source.includes(from)) throw new Error(`Yulia v6 marker not found: ${label}`);
  source = source.replace(from, to);
}

function replaceRegexRequired(pattern, replacement, label) {
  if (!pattern.test(source)) throw new Error(`Yulia v6 regex marker not found: ${label}`);
  pattern.lastIndex = 0;
  source = source.replace(pattern, replacement);
}

/* 1. Intro: keep the existing intro timing/screen animation, but render Julia's uploaded logo instead of text. */
replaceRegexRequired(
  /<div className="mct-intro-mark">[\s\S]*?<\/div>/,
  '<div className="mct-intro-mark mct-intro-mark-yulia"><img className="mct-intro-logo-yulia" src="/assets/yulia/intro-logo.png" alt="" /></div>',
  "intro logo",
);

/* 2. Top-left brand: replace the typography ЮР with the uploaded logo while keeping the same visual footprint. */
replaceRequired(
  '<a className="mct-brand mct-brand-yulia-text" href="#mobile-top" aria-label="Юлия Ролева, наверх">ЮР</a>',
  '<a className="mct-brand mct-brand-yulia-image" href="#mobile-top" aria-label="Юлия Ролева, наверх"><img src="/assets/yulia/header-logo.png" alt="" /></a>',
  "header logo",
);

/* 3. Visit/contact block: replace WhatsApp with VK and use a clean VK lettermark matching the existing contact tiles. */
replaceRegexRequired(
  /<a className="mct-final-secondary" href="https:\/\/wa\.me\/\d+" target="_blank" rel="noopener noreferrer">[\s\S]*?<span className="mct-contact-copy"><strong>WhatsApp<\/strong><small>Написать Юлии Ролевой<\/small><\/span><i className="mct-link-arrow" aria-hidden="true" \/>[\s\S]*?<\/a>/,
  '<a className="mct-final-secondary is-vk" href="https://vk.ru/roleva_st" target="_blank" rel="noopener noreferrer"><span className="mct-contact-icon" aria-hidden="true"><span className="mct-vk-letters">VK</span></span><span className="mct-contact-copy"><strong>ВКонтакте</strong><small>Написать Юлии Ролевой</small></span><i className="mct-link-arrow" aria-hidden="true" /></a>',
  "VK contact tile",
);

css += `

/* Yulia v6 — uploaded identity assets + VK contact. */
.mct-brand-yulia-image {
  display: inline-flex !important;
  width: 78px !important;
  height: 42px !important;
  align-items: center !important;
  justify-content: flex-start !important;
  overflow: visible !important;
  text-decoration: none !important;
}

.mct-brand-yulia-image img {
  display: block !important;
  width: 78px !important;
  height: 42px !important;
  max-width: 78px !important;
  max-height: 42px !important;
  object-fit: contain !important;
  object-position: left center !important;
}

.mct-intro-mark-yulia {
  display: grid !important;
  place-items: center !important;
  width: min(78vw, 360px) !important;
  min-height: 120px !important;
  transform: none !important;
}

.mct-intro-logo-yulia {
  display: block !important;
  width: min(72vw, 330px) !important;
  max-width: 330px !important;
  height: auto !important;
  max-height: 180px !important;
  object-fit: contain !important;
  object-position: center !important;
  animation: mctIntroLogoYulia 1.58s cubic-bezier(.16, .84, .32, 1) both !important;
  user-select: none !important;
  -webkit-user-drag: none !important;
}

@keyframes mctIntroLogoYulia {
  0% {
    opacity: 0;
    transform: translateY(7px) scale(.975);
    filter: blur(1.5px);
  }
  42% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
  78% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
  100% {
    opacity: .98;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

.mct-intro {
  animation-timing-function: ease-in-out !important;
}

.mct-final-secondary.is-vk .mct-contact-icon {
  display: grid !important;
  place-items: center !important;
}

.mct-vk-letters {
  display: block !important;
  color: currentColor !important;
  font: 800 11px/1 "Manrope", Arial, sans-serif !important;
  letter-spacing: -.055em !important;
}

@media (min-width: 768px) {
  .mct-intro-mark-yulia {
    width: min(32vw, 380px) !important;
  }

  .mct-intro-logo-yulia {
    width: min(28vw, 350px) !important;
    max-width: 350px !important;
    max-height: 200px !important;
  }
}
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");

console.log("Yulia v6 applied: intro logo, header logo, VK contact");
