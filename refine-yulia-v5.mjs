import fs from "node:fs";

const cssPath = "app/globals.css";
let css = fs.readFileSync(cssPath, "utf8");

/*
  Yulia v5 — hero tools only.
  Keep every existing hero element unchanged and only compose the two supplied
  transparent PNGs like the approved reference: comb behind, scissors in front,
  both large and overlapping in the centre of the visual area.
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
    filter: drop-shadow(0 12px 20px rgba(49, 40, 36, .11)) !important;
  }

  /* Reference composition: comb runs bottom-left → top-right and sits behind. */
  .mct-yulia-comb {
    z-index: 1 !important;
    left: 50% !important;
    top: 48% !important;
    width: min(78vw, 315px) !important;
    height: min(78vw, 315px) !important;
    transform: translate(-48%, -50%) rotate(42deg) scale(1.02) !important;
  }

  /* Scissors are the dominant foreground object, crossing the comb like the reference. */
  .mct-yulia-scissors {
    z-index: 2 !important;
    left: 50% !important;
    top: 56% !important;
    width: min(88vw, 355px) !important;
    height: min(88vw, 355px) !important;
    transform: translate(-52%, -52%) rotate(-42deg) scale(1.03) !important;
  }
}

@media (min-width: 768px) {
  .mct-yulia-tools { display: none !important; }
}
`;

fs.writeFileSync(cssPath, css);
console.log("Applied Yulia v5 hero tools composition only");
