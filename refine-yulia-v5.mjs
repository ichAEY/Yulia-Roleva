import fs from "node:fs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";
let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

/* Yulia v5 — use the client's uploaded finished hero image as one image. */

source = source.replace(
  /<div className="mct-yulia-tools" aria-hidden="true">[\s\S]*?<\/div>/,
  '<div className="mct-yulia-tools" aria-hidden="true"><img className="mct-yulia-hero-image" src="/Yulia-Roleva/assets/yulia/tools/hero.png" alt="" /></div>',
);

/* Keep the approved Telegram-style icon for the WhatsApp row. */
source = source.replace(
  /<svg className="mct-whatsapp-svg"[\s\S]*?<\/svg>/,
  '<svg className="mct-whatsapp-svg mct-telegram-style-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.7 11.35 19.5 4.8c.73-.3 1.37.18 1.12 1.34l-2.69 12.68c-.2.9-.73 1.12-1.48.7l-4.1-3.02-1.98 1.9c-.22.22-.4.4-.82.4l.3-4.18 7.6-6.87c.33-.3-.07-.47-.51-.17l-9.4 5.92-4.04-1.26c-.88-.28-.9-.88.2-1.31Z"/></svg>',
);

css += `

/* Yulia v7 — preserve the new hero photo and remove only the visible background seam. */
@media (max-width: 767px) {
  .mct-hero-visual {
    position: relative !important;
    overflow: hidden !important;
    isolation: isolate !important;
    background: linear-gradient(
      to bottom,
      #f7f4ed 0%,
      #f4f1ea 12%,
      #efebe4 28%,
      #ede9e2 48%,
      #e9e5de 100%
    ) !important;
  }

  .mct-yulia-tools {
    position: absolute !important;
    z-index: 6 !important;
    inset: 0 -3% -3% !important;
    display: flex !important;
    align-items: flex-end !important;
    justify-content: center !important;
    overflow: hidden !important;
    pointer-events: none !important;
    isolation: isolate !important;
  }

  /* A restrained blurred copy carries the photo's real cream tones beyond its lower/side edges. */
  .mct-yulia-tools::before {
    content: "" !important;
    position: absolute !important;
    z-index: 0 !important;
    inset: 10% -10% -9% !important;
    background: url("/Yulia-Roleva/assets/yulia/tools/hero.png") center 68% / cover no-repeat !important;
    filter: blur(30px) saturate(.96) !important;
    opacity: .24 !important;
    transform: scale(1.10) !important;
    transform-origin: center bottom !important;
    pointer-events: none !important;
  }

  /* Short top veil: matches the page background first, then disappears before the tools begin. */
  .mct-yulia-tools::after {
    content: "" !important;
    position: absolute !important;
    z-index: 2 !important;
    top: -1px !important;
    left: -4% !important;
    right: -4% !important;
    height: 82px !important;
    background: linear-gradient(
      to bottom,
      #f7f4ed 0%,
      rgba(247,244,237,.98) 16%,
      rgba(246,243,236,.90) 34%,
      rgba(243,240,233,.66) 55%,
      rgba(240,237,230,.30) 76%,
      rgba(238,235,228,0) 100%
    ) !important;
    pointer-events: none !important;
  }

  .mct-yulia-tool,
  .mct-yulia-comb,
  .mct-yulia-scissors {
    display: none !important;
  }

  .mct-yulia-hero-image {
    position: relative !important;
    z-index: 1 !important;
    display: block !important;
    width: min(110vw, 452px) !important;
    max-width: none !important;
    height: auto !important;
    object-fit: contain !important;
    object-position: center bottom !important;
    transform: translateY(22px) !important;
    user-select: none !important;
    -webkit-user-drag: none !important;

    /* No fade at the top: keep the photo sharp. Only the very bottom edge softens. */
    -webkit-mask-image: linear-gradient(
      to bottom,
      #000 0%,
      #000 92%,
      rgba(0,0,0,.98) 95%,
      rgba(0,0,0,.82) 97.5%,
      rgba(0,0,0,.42) 99%,
      transparent 100%
    ) !important;
    mask-image: linear-gradient(
      to bottom,
      #000 0%,
      #000 92%,
      rgba(0,0,0,.98) 95%,
      rgba(0,0,0,.82) 97.5%,
      rgba(0,0,0,.42) 99%,
      transparent 100%
    ) !important;
    -webkit-mask-repeat: no-repeat !important;
    mask-repeat: no-repeat !important;
    -webkit-mask-position: center !important;
    mask-position: center !important;
    -webkit-mask-size: 100% 100% !important;
    mask-size: 100% 100% !important;
  }

  .mct-final-secondary.is-whatsapp .mct-contact-icon {
    display: grid !important;
    place-items: center !important;
    overflow: visible !important;
  }
  .mct-final-secondary.is-whatsapp .mct-contact-icon::before,
  .mct-final-secondary.is-whatsapp .mct-contact-icon::after {
    display: none !important;
    content: none !important;
  }
  .mct-final-secondary.is-whatsapp .mct-contact-icon .mct-whatsapp-svg {
    display: block !important;
    width: 21px !important;
    height: 21px !important;
    fill: currentColor !important;
    stroke: none !important;
  }
}

@media (min-width: 768px) {
  .mct-yulia-tools { display: none !important; }
}
`;

fs.writeFileSync(componentPath, source);
fs.writeFileSync(cssPath, css);
console.log("Applied seam-free Yulia hero background while preserving photo sharpness");
