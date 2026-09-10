import fs from "node:fs";

const cssPath = "app/globals.css";
let css = fs.readFileSync(cssPath, "utf8");

/*
  Yulia v5 — hero tools only.
  Keep every existing hero element unchanged. The supplied PNGs already have
  the correct natural diagonal direction, so do not rotate them into a flat
  horizontal composition. Match the approved reference: comb behind, running
  lower-left -> upper-right; scissors in front, blades upper-left and handles
  lower-right, with soft contact/ambient shadows so both objects feel placed on
  the warm surface instead of pasted into the layout.
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
    /* tight contact shadow + softer ambient shadow, like the supplied reference */
    filter:
      drop-shadow(0 5px 4px rgba(45, 35, 30, .20))
      drop-shadow(0 15px 18px rgba(45, 35, 30, .11)) !important;
  }

  /* The source comb already points lower-left -> upper-right. Keep that natural angle. */
  .mct-yulia-comb {
    z-index: 1 !important;
    left: 52% !important;
    top: 49% !important;
    width: min(88vw, 345px) !important;
    height: min(88vw, 345px) !important;
    transform: translate(-50%, -50%) rotate(0deg) scale(1.04) !important;
  }

  /* Scissors cross the comb: blades upper-left, handles lower-right, as in the reference. */
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
}

@media (min-width: 768px) {
  .mct-yulia-tools { display: none !important; }
}
`;

fs.writeFileSync(cssPath, css);
console.log("Applied corrected Yulia hero tools composition and realistic shadows");
