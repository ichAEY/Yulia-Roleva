import fs from "node:fs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";
let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

/*
  Yulia v5 — final hero tools + contact icon polish.
  Keep the approved composition. Increase the comb by exactly 10% from the
  previous approved size and make the WhatsApp contact illustration use the
  same clean Telegram-style paper-plane icon language.
*/

/* Replace the WhatsApp drawing inserted earlier with a clean Telegram-style paper plane. */
source = source.replace(
  /<svg className="mct-whatsapp-svg"[\s\S]*?<\/svg>/,
  '<svg className="mct-whatsapp-svg mct-telegram-style-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.7 11.35 19.5 4.8c.73-.3 1.37.18 1.12 1.34l-2.69 12.68c-.2.9-.73 1.12-1.48.7l-4.1-3.02-1.98 1.9c-.22.22-.4.4-.82.4l.3-4.18 7.6-6.87c.33-.3-.07-.47-.51-.17l-9.4 5.92-4.04-1.26c-.88-.28-.9-.88.2-1.31Z"/></svg>',
);

css += `

/* Yulia v5 — approved scissors + comb composition. */
@media (max-width: 767px) {
  .mct-hero-visual {
    position: relative !important;
  }

  .mct-yulia-tools {
    position: absolute !important;
    z-index: 6 !important;
    inset: 0 !important;
    display: block !important;
    overflow: visible !important;
    pointer-events: none !important;
  }

  .mct-yulia-tool {
    position: absolute !important;
    display: block !important;
    object-fit: contain !important;
    object-position: center !important;
    transform-origin: 50% 50% !important;
    user-select: none !important;
    -webkit-user-drag: none !important;
    filter:
      drop-shadow(0 5px 4px rgba(45, 35, 30, .20))
      drop-shadow(0 15px 18px rgba(45, 35, 30, .11)) !important;
  }

  /* Exactly +10% versus the previous 68vw / 270px comb size. */
  .mct-yulia-comb {
    z-index: 1 !important;
    left: 52% !important;
    top: 50% !important;
    width: min(74.8vw, 297px) !important;
    height: min(74.8vw, 297px) !important;
    transform: translate(-50%, -50%) rotate(0deg) scale(1) !important;
  }

  .mct-yulia-scissors {
    z-index: 2 !important;
    left: 49% !important;
    top: 52% !important;
    width: min(76vw, 300px) !important;
    height: min(76vw, 300px) !important;
    transform: translate(-50%, -50%) rotate(-8deg) scale(1.02) !important;
    filter:
      drop-shadow(0 4px 3px rgba(45, 35, 30, .24))
      drop-shadow(0 13px 17px rgba(45, 35, 30, .12)) !important;
  }

  /* WhatsApp label, Telegram-style icon: same clean paper-plane illustration language. */
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
console.log("Applied +10% comb size and Telegram-style WhatsApp icon");
