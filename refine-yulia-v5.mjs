import fs from "node:fs";

const cssPath = "app/globals.css";
let css = fs.readFileSync(cssPath, "utf8");

/*
  Yulia v5 — final hero tools + contact icon polish.
  Keep every existing hero element unchanged. Only reduce the comb so the
  scissors remain the dominant object, preserve the natural crossed layout,
  and replace the buggy WhatsApp glyph with a simple message illustration.
*/
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

  /* Smaller comb, still lower-left -> upper-right and behind the scissors. */
  .mct-yulia-comb {
    z-index: 1 !important;
    left: 52% !important;
    top: 50% !important;
    width: min(68vw, 270px) !important;
    height: min(68vw, 270px) !important;
    transform: translate(-50%, -50%) rotate(0deg) scale(1) !important;
  }

  /* Scissors remain the dominant foreground object. */
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

  /* WhatsApp: use a clean generic message-bubble illustration instead of the buggy glyph. */
  .mct-final-secondary.is-whatsapp .mct-contact-icon {
    position: relative !important;
    display: grid !important;
    place-items: center !important;
    overflow: visible !important;
  }
  .mct-final-secondary.is-whatsapp .mct-contact-icon .mct-whatsapp-svg {
    display: none !important;
  }
  .mct-final-secondary.is-whatsapp .mct-contact-icon::before {
    content: "" !important;
    display: block !important;
    position: absolute !important;
    left: 50% !important;
    top: 48% !important;
    width: 18px !important;
    height: 13px !important;
    transform: translate(-50%, -50%) !important;
    border: 1.6px solid currentColor !important;
    border-radius: 6px !important;
    background: transparent !important;
    box-sizing: border-box !important;
  }
  .mct-final-secondary.is-whatsapp .mct-contact-icon::after {
    content: "" !important;
    display: block !important;
    position: absolute !important;
    left: calc(50% - 5px) !important;
    top: calc(48% + 5px) !important;
    width: 6px !important;
    height: 6px !important;
    border-left: 1.6px solid currentColor !important;
    border-bottom: 1.6px solid currentColor !important;
    background: inherit !important;
    transform: rotate(-28deg) !important;
    border-radius: 0 0 0 2px !important;
    box-sizing: border-box !important;
  }
}

@media (min-width: 768px) {
  .mct-yulia-tools { display: none !important; }
}
`;

fs.writeFileSync(cssPath, css);
console.log("Applied smaller comb and clean WhatsApp message icon");
