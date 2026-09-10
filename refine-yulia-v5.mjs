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

/* Yulia v5 — final uploaded hero image with only a subtle edge blend. */
@media (max-width: 767px) {
  .mct-hero-visual {
    position: relative !important;
  }

  .mct-yulia-tools {
    position: absolute !important;
    z-index: 6 !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: visible !important;
    pointer-events: none !important;
  }

  .mct-yulia-tool,
  .mct-yulia-comb,
  .mct-yulia-scissors {
    display: none !important;
  }

  .mct-yulia-hero-image {
    display: block !important;
    width: min(96vw, 398px) !important;
    max-width: none !important;
    height: auto !important;
    object-fit: contain !important;
    object-position: center !important;
    user-select: none !important;
    -webkit-user-drag: none !important;

    /* Very light feathering: almost untouched on top, slightly softer at the bottom. */
    -webkit-mask-image: radial-gradient(
      ellipse 76% 82% at 50% 43%,
      #000 0%,
      #000 48%,
      rgba(0,0,0,.995) 55%,
      rgba(0,0,0,.97) 62%,
      rgba(0,0,0,.90) 70%,
      rgba(0,0,0,.75) 82%,
      rgba(0,0,0,.45) 92%,
      transparent 100%
    ) !important;
    mask-image: radial-gradient(
      ellipse 76% 82% at 50% 43%,
      #000 0%,
      #000 48%,
      rgba(0,0,0,.995) 55%,
      rgba(0,0,0,.97) 62%,
      rgba(0,0,0,.90) 70%,
      rgba(0,0,0,.75) 82%,
      rgba(0,0,0,.45) 92%,
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
console.log("Applied uploaded hero image with subtle asymmetric feathering");
