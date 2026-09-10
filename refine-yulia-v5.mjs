import fs from "node:fs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";
let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

/* Yulia v8 — use the client's uploaded finished hero image as one image. */

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

/* Yulia v8 — no blending tricks: full photo, hero background matched to the photo. */
@media (max-width: 767px) {
  .mct-hero,
  .mct-hero .mct-shell,
  .mct-hero-visual {
    background: #f9f6ef !important;
    background-image: none !important;
  }

  .mct-hero-visual {
    position: relative !important;
    overflow: hidden !important;
    isolation: isolate !important;
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
    background: transparent !important;
  }

  .mct-yulia-tools::before,
  .mct-yulia-tools::after {
    display: none !important;
    content: none !important;
    background: none !important;
    filter: none !important;
    opacity: 0 !important;
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
    filter: none !important;
    opacity: 1 !important;
    -webkit-mask-image: none !important;
    mask-image: none !important;
    -webkit-mask: none !important;
    mask: none !important;
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
console.log("Applied full Yulia hero photo with a single matching hero background colour");
